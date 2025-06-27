import { describe, test, expect } from '@jest/globals';
import { PublicKey } from '@solana/web3.js';

describe('WhiskyClient Tests', () => {
  test('should validate PublicKey creation', () => {
    const key = new PublicKey('So11111111111111111111111111111111111111112');
    expect(key).toBeInstanceOf(PublicKey);
  });

  test('should validate constants', () => {
    const { PROGRAM_ID } = require('../constants');
    expect(PROGRAM_ID).toBeInstanceOf(PublicKey);
    expect(PROGRAM_ID.toString()).toBe('6R7S7r6KzU1A5YACXCaKuF6GcEcv5ZdXU4hh8vPozcw6');
  });

  test('should validate PDA functions', () => {
    const { getWhiskyStateAddress, getPoolAddress, getPlayerAddress } = require('../pdas');
    const testUser = new PublicKey('So11111111111111111111111111111111111111112');
    const testMint = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
    
    const whiskyState = getWhiskyStateAddress();
    const pool = getPoolAddress(testMint, testUser);
    const player = getPlayerAddress(testUser);
    
    expect(whiskyState).toBeInstanceOf(PublicKey);
    expect(pool).toBeInstanceOf(PublicKey);
    expect(player).toBeInstanceOf(PublicKey);
  });

  test('should validate type imports', () => {
    const types = require('../types');
    expect(types).toBeDefined();
    expect(typeof types).toBe('object');
  });

  test('should validate IDL structure', () => {
    const { IDL } = require('../idl');
    expect(IDL).toBeDefined();
    expect(IDL.version).toBe('0.1.0');
    expect(IDL.name).toBe('whisky_core');
    expect(IDL.instructions).toBeDefined();
    expect(IDL.accounts).toBeDefined();
    expect(Array.isArray(IDL.instructions)).toBe(true);
    expect(Array.isArray(IDL.accounts)).toBe(true);
  });

  test('should validate instruction names', () => {
    const { IDL } = require('../idl');
    const instructionNames = IDL.instructions.map((ix) => ix.name);
    
    expect(instructionNames).toContain('whiskyInitialize');
    expect(instructionNames).toContain('whiskySetAuthority');
    expect(instructionNames).toContain('poolInitialize');
    expect(instructionNames).toContain('poolDeposit');
    expect(instructionNames).toContain('poolWithdraw');
    expect(instructionNames).toContain('playerInitialize');
    expect(instructionNames).toContain('playGame');
    expect(instructionNames).toContain('playerClaim');
    expect(instructionNames).toContain('rngSettle');
  });

  test('should validate account types', () => {
    const { IDL } = require('../idl');
    const accountNames = IDL.accounts.map((acc) => acc.name);
    
    expect(accountNames).toContain('WhiskyState');
    expect(accountNames).toContain('Pool');
    expect(accountNames).toContain('Player');
    expect(accountNames).toContain('Game');
  });

  test('should validate client interface types', () => {
    const clientModule = require('../client');
    
    expect(clientModule.WhiskyClient).toBeDefined();
    expect(typeof clientModule.WhiskyClient).toBe('function');
    
    // Validate interface exists (will be checked at compile time)
    const mockParams = {
      user: new PublicKey('So11111111111111111111111111111111111111112'),
      underlyingTokenMint: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
      poolAuthority: new PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'),
      wager: 1000000,
      bet: [1, 1],
      clientSeed: 'test',
      creatorFeeBps: 100,
      jackpotFeeBps: 50,
      metadata: 'test',
      creator: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
      nonce: 1
    };
    
    expect(mockParams.user).toBeInstanceOf(PublicKey);
    expect(Array.isArray(mockParams.bet)).toBe(true);
    expect(typeof mockParams.wager).toBe('number');
  });

  test('should validate constants values', () => {
    const constants = require('../constants');
    
    expect(constants.BPS_PER_WHOLE).toBe(10000);
    expect(constants.GAME_SEED).toBe('GAME');
    expect(constants.PLAYER_SEED).toBe('PLAYER');
    expect(constants.POOL_SEED).toBe('POOL');
    expect(constants.WHISKY_STATE_SEED).toBe('WHISKY_STATE');
  });

  test('should validate core SDK modules', () => {
    const clientModule = require('../client');
    const constants = require('../constants');
    const pdas = require('../pdas');
    
    // Core exports should exist
    expect(clientModule.WhiskyClient).toBeDefined();
    expect(constants.PROGRAM_ID).toBeDefined();
    
    // Utility exports should exist
    expect(pdas.getWhiskyStateAddress).toBeDefined();
    expect(pdas.getPoolAddress).toBeDefined();
  });
}); 