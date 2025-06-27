import { BorshCoder, EventParser } from '@coral-xyz/anchor'
import { Connection, ParsedTransactionWithMeta, PublicKey, SignaturesForAddressOptions } from '@solana/web3.js'
import { AnyWhiskyEvent, WhiskyEvent, WhiskyEventType, IDL, PROGRAM_ID } from '.'

export type WhiskyTransaction<Event extends WhiskyEventType> = {
  signature: string
  time: number
  name: Event
  data: WhiskyEvent<Event>['data']
}

const eventParser = new EventParser(PROGRAM_ID, new BorshCoder(IDL))

/**
 * Extracts events from transaction logs
 */
export const parseTransactionEvents = (logs: string[]) => {
  try {
    const parsedEvents: AnyWhiskyEvent[] = []
    const events = eventParser.parseLogs(logs) as any as AnyWhiskyEvent[]
    for (const event of events) {
      parsedEvents.push(event)
    }
    return parsedEvents
  } catch {
    return []
  }
}

/**
 * Extracts events from a transaction
 */
export const parseWhiskyTransaction = (
  transaction: ParsedTransactionWithMeta,
) => {
  const logs = transaction.meta?.logMessages ?? []
  const events = parseTransactionEvents(logs)

  return events.map((event) => {
    return {
      signature: transaction.transaction.signatures[0],
      time: (transaction.blockTime ?? 0) * 1000,
      name: event.name,
      data: event.data,
    } as WhiskyTransaction<'GameSettled'> | WhiskyTransaction<'PoolChange'>
  })
}

export async function fetchWhiskyTransactionsFromSignatures(
  connection: Connection,
  signatures: string[],
) {
  const transactions = (await connection.getParsedTransactions(
    signatures,
    {
      maxSupportedTransactionVersion: 0,
      commitment: 'confirmed',
    },
  )).flatMap((x) => x ? [x] : [])

  return transactions.flatMap(parseWhiskyTransaction)
}

/**
 * Fetches recent Whisky events
 */
export async function fetchWhiskyTransactions(
  connection: Connection,
  address: PublicKey,
  options: SignaturesForAddressOptions,
) {
  const signatureInfo = await connection.getSignaturesForAddress(
    address,
    options,
    'confirmed',
  )
  const events = await fetchWhiskyTransactionsFromSignatures(connection, signatureInfo.map((x) => x.signature))

  return events
} 