import { AnchorProvider, Program, BN } from '@coral-xyz/anchor';
import { Connection, PublicKey, Keypair, SystemProgram } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from '@solana/spl-token';
import { WhiskyCore, IDL } from './idl';
import { PROGRAM_ID } from './constants';
import { 
  getWhiskyStateAddress, 
  getPoolAddress, 
  getPlayerAddress, 
  getGameAddress,
  getPoolLpAddress,
  getPoolUnderlyingTokenAccountAddress,
  getPoolJackpotTokenAccountAddress
} from './pdas';
import { 
  WhiskyState, 
  PoolState, 
  PlayerState, 
  GameState
} from './types';

export interface PlayGameParams {
  user: PublicKey;
  underlyingTokenMint: PublicKey;
  poolAuthority: PublicKey;
  wager: number;
  bet: number[];
  clientSeed: string;
  creatorFeeBps: number;
  jackpotFeeBps: number;
  metadata: string;
  creator: PublicKey;
  nonce: number;
}

export interface PoolDepositParams {
  user: PublicKey;
  underlyingTokenMint: PublicKey;
  poolAuthority: PublicKey;
  amount: number;
}

export interface PoolWithdrawParams {
  user: PublicKey;
  underlyingTokenMint: PublicKey;
  poolAuthority: PublicKey;
  amount: number;
}

export interface WhiskySetConfigParams {
  authority: PublicKey;
  rngAddress: PublicKey;
  whiskyFee: number;
  maxCreatorFee: number;
  poolCreationFee: number;
  antiSpamFee: number;
  maxHouseEdge: number;
  defaultPoolFee: number;
  jackpotPayoutToUserBps: number;
  jackpotPayoutToCreatorBps: number;
  jackpotPayoutToPoolBps: number;
  jackpotPayoutToWhiskyBps: number;
  bonusToJackpotRatioBps: number;
  maxPayoutBps: number;
  poolWithdrawFeeBps: number;
  poolCreationAllowed: boolean;
  poolDepositAllowed: boolean;
  poolWithdrawAllowed: boolean;
  playingAllowed: boolean;
  distributionRecipient: PublicKey;
}

export interface RngSettleParams {
  user: PublicKey;
  underlyingTokenMint: PublicKey;
  poolAuthority: PublicKey;
  rng: PublicKey;
  rngSeed: string;
  nextRngSeedHashed: string;
}

export interface RngProvideHashedSeedParams {
  user: PublicKey;
  rng: PublicKey;
  nextRngSeedHashed: string;
}

export interface DistributeFeesParams {
  authority: PublicKey;
  underlyingTokenMint: PublicKey;
  nativeSol: boolean;
}

export class WhiskyClient {
  public program: Program<WhiskyCore>;
  public connection: Connection;
  public provider: AnchorProvider;

  constructor(provider: AnchorProvider) {
    this.provider = provider;
    this.connection = provider.connection;
    this.program = new Program(IDL, PROGRAM_ID, provider);
  }

  static create(connection: Connection, wallet: any): WhiskyClient {
    const provider = new AnchorProvider(connection, wallet, {});
    return new WhiskyClient(provider);
  }

  // Protocol Management Functions
  async whiskyInitialize(initializer: Keypair): Promise<string> {
    const whiskyState = getWhiskyStateAddress();

    const tx = await this.program.methods
      .whiskyInitialize()
      .accounts({
        whiskyState,
        initializer: initializer.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([initializer])
      .rpc();

    return tx;
  }

  async whiskySetAuthority(authority: PublicKey, newAuthority: PublicKey): Promise<string> {
    const whiskyState = getWhiskyStateAddress();

    const tx = await this.program.methods
      .whiskySetAuthority(newAuthority)
      .accounts({
        whiskyState,
        authority,
      })
      .rpc();

    return tx;
  }

  async whiskySetConfig(params: WhiskySetConfigParams): Promise<string> {
    const whiskyState = getWhiskyStateAddress();

    const tx = await this.program.methods
      .whiskySetConfig(
        params.rngAddress,
        new BN(params.whiskyFee),
        new BN(params.maxCreatorFee),
        new BN(params.poolCreationFee),
        new BN(params.antiSpamFee),
        new BN(params.maxHouseEdge),
        new BN(params.defaultPoolFee),
        new BN(params.jackpotPayoutToUserBps),
        new BN(params.jackpotPayoutToCreatorBps),
        new BN(params.jackpotPayoutToPoolBps),
        new BN(params.jackpotPayoutToWhiskyBps),
        new BN(params.bonusToJackpotRatioBps),
        new BN(params.maxPayoutBps),
        new BN(params.poolWithdrawFeeBps),
        params.poolCreationAllowed,
        params.poolDepositAllowed,
        params.poolWithdrawAllowed,
        params.playingAllowed,
        params.distributionRecipient
      )
      .accounts({
        whiskyState,
        authority: params.authority,
      })
      .rpc();

    return tx;
  }

  // Pool Management Functions
  async poolInitialize(
    user: PublicKey,
    underlyingTokenMint: PublicKey,
    poolAuthority: PublicKey,
    lookupAddress: PublicKey
  ): Promise<string> {
    const whiskyState = getWhiskyStateAddress();
    const pool = getPoolAddress(underlyingTokenMint, poolAuthority);
    const lpMint = getPoolLpAddress(pool);
    const poolUnderlyingTokenAccount = getPoolUnderlyingTokenAccountAddress(pool);
    const poolJackpotTokenAccount = getPoolJackpotTokenAccountAddress(pool);

    const tx = await this.program.methods
      .poolInitialize(poolAuthority, lookupAddress)
      .accounts({
        whiskyState,
        pool,
        underlyingTokenMint,
        poolAuthority,
        lpMint,
        poolUnderlyingTokenAccount,
        poolJackpotTokenAccount,
        user,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    return tx;
  }

  async poolDeposit(params: PoolDepositParams): Promise<string> {
    const whiskyState = getWhiskyStateAddress();
    const pool = getPoolAddress(params.underlyingTokenMint, params.poolAuthority);
    const lpMint = getPoolLpAddress(pool);
    const poolUnderlyingTokenAccount = getPoolUnderlyingTokenAccountAddress(pool);

    const userUnderlyingAta = await getAssociatedTokenAddress(
      params.underlyingTokenMint,
      params.user
    );
    const userLpAta = await getAssociatedTokenAddress(lpMint, params.user);

    const tx = await this.program.methods
      .poolDeposit(new BN(params.amount))
      .accounts({
        whiskyState,
        pool,
        underlyingTokenMint: params.underlyingTokenMint,
        lpMint,
        poolUnderlyingTokenAccount,
        userUnderlyingAta,
        userLpAta,
        user: params.user,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    return tx;
  }

  async poolWithdraw(params: PoolWithdrawParams): Promise<string> {
    const whiskyState = getWhiskyStateAddress();
    const pool = getPoolAddress(params.underlyingTokenMint, params.poolAuthority);
    const lpMint = getPoolLpAddress(pool);
    const poolUnderlyingTokenAccount = getPoolUnderlyingTokenAccountAddress(pool);

    const userUnderlyingAta = await getAssociatedTokenAddress(
      params.underlyingTokenMint,
      params.user
    );
    const userLpAta = await getAssociatedTokenAddress(lpMint, params.user);

    const tx = await this.program.methods
      .poolWithdraw(new BN(params.amount))
      .accounts({
        whiskyState,
        pool,
        underlyingTokenMint: params.underlyingTokenMint,
        lpMint,
        poolUnderlyingTokenAccount,
        userUnderlyingAta,
        userLpAta,
        user: params.user,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    return tx;
  }

  // Gaming Functions
  async playerInitialize(user: PublicKey, nonce: number = 0): Promise<string> {
    const player = getPlayerAddress(user);
    const game = getGameAddress(user);

    const tx = await this.program.methods
      .playerInitialize()
      .accounts({
        player,
        game,
        user,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    return tx;
  }

  async playGame(params: PlayGameParams): Promise<string> {
    const whiskyState = getWhiskyStateAddress();
    const pool = getPoolAddress(params.underlyingTokenMint, params.poolAuthority);
    const player = getPlayerAddress(params.user);
    const game = getGameAddress(params.user);
    const poolUnderlyingTokenAccount = getPoolUnderlyingTokenAccountAddress(pool);

    const userUnderlyingAta = await getAssociatedTokenAddress(
      params.underlyingTokenMint,
      params.user
    );
    const playerAta = await getAssociatedTokenAddress(
      params.underlyingTokenMint,
      player
    );

    const tx = await this.program.methods
      .playGame(
        new BN(params.wager),
        params.bet,
        params.clientSeed,
        params.creatorFeeBps,
        params.jackpotFeeBps,
        params.metadata
      )
      .accounts({
        whiskyState,
        pool,
        player,
        game,
        underlyingTokenMint: params.underlyingTokenMint,
        poolUnderlyingTokenAccount,
        userUnderlyingAta,
        playerAta,
        creator: params.creator,
        user: params.user,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    return tx;
  }

  async playerClaim(
    user: PublicKey,
    underlyingTokenMint: PublicKey,
    nonce: number
  ): Promise<string> {
    const player = getPlayerAddress(user);
    const game = getGameAddress(user);

    const userUnderlyingAta = await getAssociatedTokenAddress(
      underlyingTokenMint,
      user
    );
    const playerAta = await getAssociatedTokenAddress(
      underlyingTokenMint,
      player
    );

    const tx = await this.program.methods
      .playerClaim()
      .accounts({
        player,
        game,
        underlyingTokenMint,
        playerAta,
        userUnderlyingAta,
        user,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();

    return tx;
  }

  async playerClose(user: PublicKey): Promise<string> {
    const player = getPlayerAddress(user);
    const game = getGameAddress(user);

    const tx = await this.program.methods
      .playerClose()
      .accounts({
        player,
        game,
        user,
      })
      .rpc();

    return tx;
  }

  // RNG Functions
  async rngSettle(params: RngSettleParams): Promise<string> {
    const whiskyState = getWhiskyStateAddress();
    const game = getGameAddress(params.user);
    const pool = getPoolAddress(params.underlyingTokenMint, params.poolAuthority);
    const poolUnderlyingTokenAccount = getPoolUnderlyingTokenAccountAddress(pool);
    const poolJackpotTokenAccount = getPoolJackpotTokenAccountAddress(pool);

    const tx = await this.program.methods
      .rngSettle(params.rngSeed, params.nextRngSeedHashed)
      .accounts({
        whiskyState,
        game,
        poolUnderlyingTokenAccount,
        poolJackpotTokenAccount,
        pool,
        underlyingTokenMint: params.underlyingTokenMint,
        rng: params.rng,
      })
      .rpc();

    return tx;
  }

  async rngProvideHashedSeed(params: RngProvideHashedSeedParams): Promise<string> {
    const whiskyState = getWhiskyStateAddress();
    const game = getGameAddress(params.user);

    const tx = await this.program.methods
      .rngProvideHashedSeed(params.nextRngSeedHashed)
      .accounts({
        whiskyState,
        game,
        rng: params.rng,
      })
      .rpc();

    return tx;
  }

  // Fee Distribution Functions
  async distributeFees(params: DistributeFeesParams): Promise<string> {
    const whiskyState = getWhiskyStateAddress();
    
    const whiskyStateAta = await getAssociatedTokenAddress(
      params.underlyingTokenMint,
      whiskyState
    );
    
    // Get the distribution recipient from whisky state
    const whiskyStateAccount = await this.getWhiskyState();
    const distributionRecipientAta = await getAssociatedTokenAddress(
      params.underlyingTokenMint,
      whiskyStateAccount.distributionRecipient
    );

    const tx = await this.program.methods
      .distributeFees(params.nativeSol)
      .accounts({
        whiskyState,
        underlyingTokenMint: params.underlyingTokenMint,
        whiskyStateAta,
        distributionRecipientAta,
        authority: params.authority,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();

    return tx;
  }

  // Query Functions
  async getWhiskyState(): Promise<WhiskyState> {
    const whiskyState = getWhiskyStateAddress();
    const account = await this.program.account.WhiskyState.fetch(whiskyState);
    return account;
  }

  async getPool(underlyingTokenMint: PublicKey, poolAuthority: PublicKey): Promise<PoolState> {
    const pool = getPoolAddress(underlyingTokenMint, poolAuthority);
    const account = await this.program.account.Pool.fetch(pool);
    return account;
  }

  async getPlayer(user: PublicKey): Promise<PlayerState> {
    const player = getPlayerAddress(user);
    const account = await this.program.account.Player.fetch(player);
    return account;
  }

  async getGame(user: PublicKey, nonce: number): Promise<GameState> {
    const game = getGameAddress(user);
    const account = await this.program.account.Game.fetch(game);
    return account;
  }

  // Utility Functions
  async getAllPools(): Promise<PoolState[]> {
    const pools = await this.program.account.Pool.all();
    return pools.map((pool: any) => pool.account);
  }

  async getPoolLiquidity(underlyingTokenMint: PublicKey, poolAuthority: PublicKey): Promise<number> {
    const pool = getPoolAddress(underlyingTokenMint, poolAuthority);
    const poolUnderlyingTokenAccount = getPoolUnderlyingTokenAccountAddress(pool);
    
    const tokenAccount = await this.connection.getTokenAccountBalance(poolUnderlyingTokenAccount);
    return tokenAccount.value.uiAmount || 0;
  }

  getProgramId(): PublicKey {
    return this.program.programId;
  }
}

export default WhiskyClient; 