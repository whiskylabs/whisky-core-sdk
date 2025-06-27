import * as anchor from '@coral-xyz/anchor'
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet'
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync } from '@solana/spl-token'
import { AddressLookupTableProgram, ConfirmOptions, Connection, Keypair, PublicKey, SYSVAR_RENT_PUBKEY, SystemProgram } from '@solana/web3.js'
import { PROGRAM_ID } from './constants'
import { WhiskyCore as WhiskyIdl, IDL } from './idl'
import { getWhiskyStateAddress, getGameAddress, getPlayerAddress, getPoolAddress, getPoolLpAddress, getPoolUnderlyingTokenAccountAddress } from './pdas'
import { WhiskyProviderWallet } from './types'
import { basisPoints } from './utils'

export class WhiskyProvider {
  whiskyProgram: anchor.Program<WhiskyIdl>
  anchorProvider: anchor.AnchorProvider
  wallet: WhiskyProviderWallet

  constructor(
    connection: Connection,
    walletOrKeypair: WhiskyProviderWallet | Keypair,
    opts: ConfirmOptions = anchor.AnchorProvider.defaultOptions(),
  ) {
    const wallet = walletOrKeypair instanceof Keypair ? new NodeWallet(walletOrKeypair) : walletOrKeypair

    this.anchorProvider = new anchor.AnchorProvider(
      connection,
      wallet,
      opts,
    )
    this.whiskyProgram = new anchor.Program(IDL, PROGRAM_ID, this.anchorProvider)
    this.wallet = wallet
  }

  static fromAnchorProvider(
    provider: anchor.AnchorProvider,
  ) {
    const whiskyProvider = new WhiskyProvider(
      provider.connection,
      provider.wallet,
      provider.opts,
    )
    return whiskyProvider
  }

  get user() {
    return this.wallet.publicKey
  }

  /**
   * Creates a pool for the specified token with address lookup table
   * @param underlyingTokenMint The token to use for the pool
   * @param authority The authority for the pool
   * @param slot The slot to use for the lookup table instruction
   * @returns Multiple TransactionInstruction in an array
   */
  createPool(underlyingTokenMint: PublicKey, authority: PublicKey, slot: number) {
    const whiskyStateAta = getAssociatedTokenAddressSync(
      underlyingTokenMint,
      getWhiskyStateAddress(),
      true,
    )
    const pool = getPoolAddress(underlyingTokenMint, authority)
    const lpMint = getPoolLpAddress(pool)
    const poolUnderlyingTokenAccount = getPoolUnderlyingTokenAccountAddress(pool)
    const poolJackpotTokenAccount = PublicKey.findProgramAddressSync([Buffer.from('POOL_JACKPOT'), pool.toBuffer()], PROGRAM_ID)[0]

    const [lookupTableInst, lookupTableAddress] = AddressLookupTableProgram.createLookupTable({
      authority: this.wallet.publicKey,
      payer: this.wallet.publicKey,
      recentSlot: slot - 1,
    })

    const addAddressesInstruction = AddressLookupTableProgram.extendLookupTable({
      payer: this.wallet.publicKey,
      authority: this.wallet.publicKey,
      lookupTable: lookupTableAddress,
      addresses: [
        pool,
        underlyingTokenMint,
        poolUnderlyingTokenAccount,
        getWhiskyStateAddress(),
        whiskyStateAta,
        poolJackpotTokenAccount,
        lpMint,
      ],
    })

    const freezeInstruction = AddressLookupTableProgram.freezeLookupTable({
      authority: this.wallet.publicKey,
      lookupTable: lookupTableAddress,
    })

    const createPoolInstruction = this.whiskyProgram.methods
      .poolInitialize(authority, lookupTableAddress)
      .accounts({
        whiskyState: getWhiskyStateAddress(),
        pool,
        underlyingTokenMint: underlyingTokenMint,
        poolAuthority: authority,
        lpMint,
        poolUnderlyingTokenAccount,
        poolJackpotTokenAccount,
        user: this.wallet.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .instruction()

    return [lookupTableInst, addAddressesInstruction, freezeInstruction, createPoolInstruction]
  }

  /**
   *
   * @param pool The pool to deposit to
   * @param underlyingTokenMint Token to deposit (Has to be the same as pool.underlyingTokenMint)
   * @param amount Amount of tokens to deposit
   */
  depositToPool(
    pool: PublicKey,
    underlyingTokenMint: PublicKey,
    amount: bigint | number,
  ) {
    const poolUnderlyingTokenAccount = getPoolUnderlyingTokenAccountAddress(pool)
    const poolLpMint = getPoolLpAddress(pool)

    const userUnderlyingAta = getAssociatedTokenAddressSync(
      underlyingTokenMint,
      this.wallet.publicKey,
    )

    const userLpAta = getAssociatedTokenAddressSync(
      poolLpMint,
      this.wallet.publicKey,
    )

    return this.whiskyProgram.methods
      .poolDeposit(new anchor.BN(amount))
      .accounts({
        whiskyState: getWhiskyStateAddress(),
        pool,
        underlyingTokenMint,
        lpMint: poolLpMint,
        poolUnderlyingTokenAccount,
        userUnderlyingAta,
        userLpAta,
        user: this.wallet.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .instruction()
  }

  /**
   *
   * @param pool The pool to withdraw from
   * @param underlyingTokenMint Token to withdraw (Has to be the same as pool.underlyingTokenMint)
   * @param amount Amount of tokens to withdraw
   */
  withdrawFromPool(
    pool: PublicKey,
    underlyingTokenMint: PublicKey,
    amount: bigint | number,
  ) {
    const poolUnderlyingTokenAccount = getPoolUnderlyingTokenAccountAddress(pool)
    const poolLpMint = getPoolLpAddress(pool)

    const userUnderlyingAta = getAssociatedTokenAddressSync(
      underlyingTokenMint,
      this.wallet.publicKey,
    )

    const userLpAta = getAssociatedTokenAddressSync(
      poolLpMint,
      this.wallet.publicKey,
    )

    return this.whiskyProgram.methods
      .poolWithdraw(new anchor.BN(amount))
      .accounts({
        whiskyState: getWhiskyStateAddress(),
        pool,
        underlyingTokenMint,
        lpMint: poolLpMint,
        poolUnderlyingTokenAccount,
        userUnderlyingAta,
        userLpAta,
        user: this.wallet.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .instruction()
  }

  /**
   * Initializes an associated Player account for the connected wallet
   */
  createPlayer() {
    return this.whiskyProgram.methods
      .playerInitialize()
      .accounts({
        player: getPlayerAddress(this.user),
        game: getGameAddress(this.user),
        user: this.user,
        systemProgram: SystemProgram.programId,
      })
      .instruction()
  }

  /**
   * Closes the associated Player account for the connected wallet
   */
  closePlayer() {
    const gameAddress = getGameAddress(this.user)
    return this.whiskyProgram.methods
      .playerClose()
      .accounts({ 
        player: getPlayerAddress(this.user),
        game: gameAddress,
        user: this.user,
      })
      .instruction()
  }

  play(
    wager: number,
    bet: number[],
    clientSeed: string,
    pool: PublicKey,
    underlyingTokenMint: PublicKey,
    creator: PublicKey,
    creatorFee: number,
    jackpotFee: number,
    metadata: string,
  ) {
    const player = getPlayerAddress(this.user)
    const game = getGameAddress(this.user)

    const userUnderlyingAta = getAssociatedTokenAddressSync(
      underlyingTokenMint,
      this.user,
    )

    const playerAta = getAssociatedTokenAddressSync(
      underlyingTokenMint,
      player,
      true,
    )

    const poolUnderlyingTokenAccount = getPoolUnderlyingTokenAccountAddress(pool)

    return this.whiskyProgram.methods
      .playGame(
        new anchor.BN(wager),
        bet.map(basisPoints),
        clientSeed,
        basisPoints(creatorFee),
        basisPoints(jackpotFee),
        metadata,
      )
      .accounts({
        whiskyState: getWhiskyStateAddress(),
        pool,
        player,
        game,
        underlyingTokenMint,
        poolUnderlyingTokenAccount,
        userUnderlyingAta,
        playerAta,
        creator,
        user: this.user,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .instruction()
  }

  /**
   * Claim winnings after game settlement
   */
  claimWinnings() {
    const player = getPlayerAddress(this.user)
    const game = getGameAddress(this.user)

    return this.whiskyProgram.methods
      .playerClaim()
      .accounts({
        player,
        game,
        user: this.user,
      })
      .instruction()
  }

  /**
   * RNG Settlement - Critical function for game resolution
   * @param gameUser The user whose game needs to be settled
   * @param rngSeed The RNG seed for settlement
   * @param nextRngSeedHashed The next hashed RNG seed
   * @param pool The pool address
   * @param underlyingTokenMint The token mint
   */
  rngSettle(
    gameUser: PublicKey,
    rngSeed: string,
    nextRngSeedHashed: string,
    pool: PublicKey,
    underlyingTokenMint: PublicKey,
  ) {
    const game = getGameAddress(gameUser)
    const poolUnderlyingTokenAccount = getPoolUnderlyingTokenAccountAddress(pool)
    const poolJackpotTokenAccount = PublicKey.findProgramAddressSync([Buffer.from('POOL_JACKPOT'), pool.toBuffer()], this.whiskyProgram.programId)[0]

    return this.whiskyProgram.methods
      .rngSettle(rngSeed, nextRngSeedHashed)
      .accounts({
        whiskyState: getWhiskyStateAddress(),
        game,
        poolUnderlyingTokenAccount,
        poolJackpotTokenAccount,
        pool,
        underlyingTokenMint,
        rng: this.user, // Assuming the current user is the RNG provider
      })
      .instruction()
  }

  /**
   * Provide hashed seed for RNG
   * @param gameUser The user whose game needs the seed
   * @param nextRngSeedHashed The next hashed RNG seed
   */
  rngProvideHashedSeed(
    gameUser: PublicKey,
    nextRngSeedHashed: string,
  ) {
    const game = getGameAddress(gameUser)

    return this.whiskyProgram.methods
      .rngProvideHashedSeed(nextRngSeedHashed)
      .accounts({
        whiskyState: getWhiskyStateAddress(),
        game,
        rng: this.user,
      })
      .instruction()
  }

  /**
   * Configure Whisky protocol settings (Admin only)
   */
  setWhiskyConfig(
    rngAddress: PublicKey,
    whiskyFee: number,
    maxCreatorFee: number,
    poolCreationFee: number,
    antiSpamFee: number,
    maxHouseEdge: number,
    defaultPoolFee: number,
    jackpotPayoutToUserBps: number,
    jackpotPayoutToCreatorBps: number,
    jackpotPayoutToPoolBps: number,
    jackpotPayoutToWhiskyBps: number,
    bonusToJackpotRatioBps: number,
    maxPayoutBps: number,
    poolWithdrawFeeBps: number,
    poolCreationAllowed: boolean,
    poolDepositAllowed: boolean,
    poolWithdrawAllowed: boolean,
    playingAllowed: boolean,
    distributionRecipient: PublicKey,
  ) {
    return this.whiskyProgram.methods
      .whiskySetConfig(
        rngAddress,
        new anchor.BN(whiskyFee),
        new anchor.BN(maxCreatorFee),
        new anchor.BN(poolCreationFee),
        new anchor.BN(antiSpamFee),
        new anchor.BN(maxHouseEdge),
        new anchor.BN(defaultPoolFee),
        new anchor.BN(jackpotPayoutToUserBps),
        new anchor.BN(jackpotPayoutToCreatorBps),
        new anchor.BN(jackpotPayoutToPoolBps),
        new anchor.BN(jackpotPayoutToWhiskyBps),
        new anchor.BN(bonusToJackpotRatioBps),
        new anchor.BN(maxPayoutBps),
        new anchor.BN(poolWithdrawFeeBps),
        poolCreationAllowed,
        poolDepositAllowed,
        poolWithdrawAllowed,
        playingAllowed,
        distributionRecipient,
      )
      .accounts({
        whiskyState: getWhiskyStateAddress(),
        authority: this.user,
      })
      .instruction()
  }

  /**
   * Distribute accumulated fees (Admin only)
   * @param underlyingTokenMint The token to distribute
   * @param nativeSol Whether to distribute native SOL
   */
  distributeFees(
    underlyingTokenMint: PublicKey,
    nativeSol: boolean = false,
  ) {
    const whiskyState = getWhiskyStateAddress()
    const whiskyStateAta = getAssociatedTokenAddressSync(
      underlyingTokenMint,
      whiskyState,
      true,
    )

    // Note: In a real implementation, you'd need to fetch the whisky state
    // to get the actual distribution recipient
    const distributionRecipientAta = getAssociatedTokenAddressSync(
      underlyingTokenMint,
      this.user, // Placeholder - should be the actual distribution recipient
    )

    return this.whiskyProgram.methods
      .distributeFees(nativeSol)
      .accounts({
        whiskyState,
        underlyingTokenMint,
        whiskyStateAta,
        distributionRecipientAta,
        authority: this.user,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .instruction()
  }
} 