import { BorshAccountsCoder, IdlAccounts } from '@coral-xyz/anchor'
import { AccountLayout } from '@solana/spl-token'
import { AccountInfo } from '@solana/web3.js'
import { WhiskyCore, IDL } from './idl'

const accountsCoder = new BorshAccountsCoder(IDL)

const decodeAccount = <T>(accountName: string, info: AccountInfo<Buffer> | null) => {
  if (!info?.data?.length)
    return null
  return accountsCoder.decode<T>(accountName, info.data)
}

export const decodeAta = (acc: AccountInfo<Buffer> | null) => {
  if (!acc) return null
  return AccountLayout.decode(acc.data)
}

type WhiskyAccounts = IdlAccounts<WhiskyCore>

const makeDecoder = <N extends keyof WhiskyAccounts>(accountName: N) => {
  return (info: AccountInfo<Buffer> | null) => {
    return decodeAccount<WhiskyAccounts[N]>(accountName, info) as WhiskyAccounts[N] | null
  }
}

export const decodePlayer = makeDecoder('Player')
export const decodeGame = makeDecoder('Game')
export const decodePool = makeDecoder('Pool')
export const decodeWhiskyState = makeDecoder('WhiskyState') 