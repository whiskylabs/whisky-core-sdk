import { IdlAccounts, IdlEvents } from '@coral-xyz/anchor'
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet'
import { Keypair } from '@solana/web3.js'
import { WhiskyCore } from './idl'

export type WhiskyEventType = 'GameSettled' | 'PoolChange'

export type WhiskyEvent<T extends WhiskyEventType> = {name: string, data: IdlEvents<WhiskyCore>[T]}

export type AnyWhiskyEvent = WhiskyEvent<'GameSettled'> | WhiskyEvent<'PoolChange'>

export type WhiskyState = IdlAccounts<WhiskyCore>['WhiskyState']
export type PlayerState = IdlAccounts<WhiskyCore>['Player']
export type GameState = IdlAccounts<WhiskyCore>['Game']
export type PoolState = IdlAccounts<WhiskyCore>['Pool']
export type WhiskyProviderWallet = Omit<NodeWallet, 'payer'> & {payer?: Keypair} 