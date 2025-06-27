import { NATIVE_MINT } from '@solana/spl-token'
import { Connection, PublicKey } from '@solana/web3.js'
import { BPS_PER_WHOLE, GameState } from '.'
import { decodeGame } from './decoders'
import { getGameAddress } from './pdas'

export const basisPoints = (percent: number) => {
  return Math.round(percent * BPS_PER_WHOLE)
}

export const isNativeMint = (pubkey: PublicKey) => NATIVE_MINT.equals(pubkey)

export const hmac256 = async (secretKey: string, message: string) => {
  const encoder = new TextEncoder
  const messageUint8Array = encoder.encode(message)
  const keyUint8Array = encoder.encode(secretKey)
  const cryptoKey = await crypto.subtle.importKey('raw', keyUint8Array, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageUint8Array)
  return Array.from(new Uint8Array(signature)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

export const getGameHash = (rngSeed: string, clientSeed: string, nonce: number) => {
  return hmac256(rngSeed, [clientSeed, nonce].join('-'))
}

export const getResultNumber = async (rngSeed: string, clientSeed: string, nonce: number) => {
  const hash = await getGameHash(rngSeed, clientSeed, nonce)
  return parseInt(hash.substring(0, 5), 16)
}

export type GameResult = ReturnType<typeof parseResult>

export const parseResult = (
  state: GameState,
) => {
  const clientSeed = state.clientSeed
  const bet = state.bet.map((x) => x / BPS_PER_WHOLE)
  const nonce = state.nonce.toNumber() - 1
  const rngSeed = state.rngSeed
  const resultIndex = state.result
  const multiplier = bet[resultIndex]
  const wager = state.wager.toNumber()
  const payout = (wager * multiplier)
  const profit = (payout - wager)

  return {
    creator: state.creator,
    user: state.user,
    rngSeed,
    clientSeed,
    nonce,
    bet,
    resultIndex,
    wager,
    payout,
    profit,
    multiplier,
    token: state.tokenMint,
    bonusUsed: state.bonusUsed.toNumber(),
    jackpotWin: state.jackpotPayout.toNumber(),
  }
}

export async function getNextResult(
  connection: Connection,
  user: PublicKey,
  prevNonce: number,
) {
  return new Promise<GameResult>((resolve, reject) => {
    if (!connection || !connection.onAccountChange) {
      return reject(new Error('Connection not available or missing onAccountChange method'))
    }

    let listener: number | undefined
    let timeout: NodeJS.Timeout | undefined
    let resolved = false

    const cleanup = () => {
      if (listener !== undefined && connection?.removeAccountChangeListener) {
        try {
          connection.removeAccountChangeListener(listener)
        } catch (err) {
          console.warn('Error removing account listener:', err)
        }
        listener = undefined
      }
      if (timeout) {
        clearTimeout(timeout)
        timeout = undefined
      }
    }

    // Set a timeout to prevent infinite waiting
    timeout = setTimeout(() => {
      if (!resolved) {
        resolved = true
        cleanup()
        reject(new Error('Timeout waiting for game result'))
      }
    }, 30000) // 30 second timeout

    try {
      listener = connection.onAccountChange(
        getGameAddress(user),
        async (account) => {
          if (resolved) return

          try {
            const current = decodeGame(account)
            if (!current) {
              resolved = true
              cleanup()
              return reject(new Error('Game account was closed'))
            }
            
            const currentNonce = current.nonce.toNumber()
            if (currentNonce === prevNonce + 1) {
              resolved = true
              cleanup()
              try {
                const result = await parseResult(current)
                return resolve(result)
              } catch (err) {
                return reject(new Error(`Error parsing result: ${err}`))
              }
            }
          } catch (err) {
            console.warn('Error processing account change:', err)
            // Don't reject here, just log and continue waiting
          }
        },
        'confirmed'
      )
    } catch (error) {
      resolved = true
      cleanup()
      return reject(new Error(`Error setting up account change listener: ${error}`))
    }

    // Handle the case where connection is lost
    if (!listener) {
      resolved = true
      cleanup()
      return reject(new Error('Failed to set up account change listener'))
    }
  })
} 