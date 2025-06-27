import { describe, test, expect } from '@jest/globals';
import { PublicKey } from '@solana/web3.js';
import { PROGRAM_ID, BPS_PER_WHOLE } from '../constants';
import { getWhiskyStateAddress, getPoolAddress, getPlayerAddress } from '../pdas';

declare const jest: any;

describe('Whisky Core SDK Basic Tests', () => {
  test('should validate constants', () => {
    expect(PROGRAM_ID).toBeInstanceOf(PublicKey);
    expect(PROGRAM_ID.toString()).toBe('6R7S7r6KzU1A5YACXCaKuF6GcEcv5ZdXU4hh8vPozcw6');
    expect(BPS_PER_WHOLE).toBe(10000);
  });

  test('should create mock wallet without errors', () => {
    const mockConnection = {} as any;
    const mockWallet = {
      publicKey: new PublicKey('So11111111111111111111111111111111111111112'),
      signTransaction: () => Promise.resolve(),
      signAllTransactions: () => Promise.resolve([])
    };
    
    expect(mockWallet.publicKey).toBeInstanceOf(PublicKey);
    expect(mockConnection).toBeDefined();
  });

  test('should generate PDAs correctly', () => {
    const testUser = new PublicKey('So11111111111111111111111111111111111111112');
    const testMint = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
    
    const whiskyState = getWhiskyStateAddress();
    const pool = getPoolAddress(testMint, testUser);
    const player = getPlayerAddress(testUser);
    
    expect(whiskyState).toBeInstanceOf(PublicKey);
    expect(pool).toBeInstanceOf(PublicKey);
    expect(player).toBeInstanceOf(PublicKey);
  });

  test('should validate PublicKey operations', () => {
    const key1 = new PublicKey('So11111111111111111111111111111111111111112');
    const key2 = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
    
    expect(key1.toString()).toBe('So11111111111111111111111111111111111111112');
    expect(key2.toString()).toBe('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
    expect(key1.equals(key2)).toBe(false);
    expect(key1.equals(key1)).toBe(true);
  });

  test('should validate IDL structure', () => {
    const { IDL } = require('../idl');
    
    expect(IDL).toBeDefined();
    expect(IDL.version).toBe('0.1.0');
    expect(IDL.name).toBe('whisky_core');
    expect(Array.isArray(IDL.instructions)).toBe(true);
    expect(Array.isArray(IDL.accounts)).toBe(true);
    expect(IDL.instructions.length).toBeGreaterThan(0);
    expect(IDL.accounts.length).toBeGreaterThan(0);
  });

  test('should validate types', () => {
    const types = require('../types');
    expect(types).toBeDefined();
    expect(typeof types).toBe('object');
  });

  test('should validate client module', () => {
    const clientModule = require('../client');
    expect(clientModule.WhiskyClient).toBeDefined();
    expect(typeof clientModule.WhiskyClient).toBe('function');
  });
}); 