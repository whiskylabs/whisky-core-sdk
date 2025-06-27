# Whisky Gaming Protocol [WORK IN PROGRESS]

A comprehensive, production-ready decentralized gaming infrastructure built on Solana, providing provably fair randomness, liquidity pooling, and complete game state management for blockchain-based gaming applications.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Security](#security)
- [Economic Model](#economic-model)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

Whisky is a sophisticated gaming protocol that enables developers to build trustless, verifiable gaming experiences on the Solana blockchain. The protocol features a robust architecture with built-in randomness verification, liquidity management, and economic sustainability through a carefully designed fee structure.

### Key Benefits

- **Provably Fair**: Cryptographically verifiable randomness generation
- **Decentralized Liquidity**: Community-driven liquidity pools for any SPL token
- **Economic Sustainability**: Built-in fee structure supporting long-term viability
- **Developer Friendly**: Comprehensive SDK and documentation
- **Production Ready**: Thoroughly tested and audited codebase

## Features

### Core Functionality

- **Multi-token Support**: Create gaming pools for any SPL token
- **Flexible Betting Structure**: Support for any probability distribution
- **Provably Fair RNG**: Verifiable random number generation
- **Liquidity Management**: Automated yield distribution to LP token holders
- **Progressive Jackpots**: Dynamic jackpot accumulation system
- **Emergency Controls**: Protocol-wide safety mechanisms

### Advanced Features

- **Program Derived Addresses**: Secure account management
- **Mathematical Overflow Protection**: Safe arithmetic operations
- **Comprehensive Error Handling**: Robust error management system
- **Authority Management**: Granular permission controls
- **Fee Customization**: Configurable fee structures

## Architecture

### Core Data Structures

#### WhiskyState (Global Protocol)
```rust
pub struct WhiskyState {
    pub authority: Pubkey,           // Protocol governance authority
    pub rng_address: Pubkey,         // Random number provider
    pub whisky_fee_bps: u64,        // Protocol fee (basis points)
    pub playing_allowed: bool,       // Emergency stop switch
    // Additional configuration fields
}
```

#### Pool (Liquidity Management)
```rust
pub struct Pool {
    pub pool_authority: Pubkey,      // Pool owner
    pub underlying_token_mint: Pubkey,  // Token type (USDC, SOL, etc.)
    pub min_wager: u64,             // Minimum bet amount
    pub plays: u64,                 // Total games played
    // Additional pool settings
}
```

#### Game (Individual Sessions)
```rust
pub struct Game {
    pub wager: u64,                 // Player bet amount
    pub bet: Vec<u32>,              // Outcome probability weights
    pub client_seed: String,        // Player randomness input
    pub rng_seed: String,           // Server randomness input
    pub status: GameStatus,         // Current game state
    pub result: u32,                // Winning outcome index
    // Additional game fields
}
```

### Instruction Set

The protocol implements 17 core instructions divided into three categories:

**Gaming Instructions:**
- `play_game` - Initiate new gaming session
- `rng_settle` - Process randomness and determine outcome
- `player_claim` - Claim winnings

**Pool Management:**
- `pool_initialize` - Create new liquidity pool
- `pool_deposit` - Add liquidity to pool
- `pool_withdraw` - Remove liquidity from pool

**Administrative:**
- `whisky_initialize` - Initialize protocol
- `update_authority` - Modify protocol settings

## Installation

### Prerequisites

- Node.js 16.0.0 or higher
- Solana CLI tools
- Anchor framework
- TypeScript 4.5.0 or higher

### Install Dependencies

```bash
npm install @whisky-core/sdk
```

### Anchor Program

```bash
anchor build
anchor deploy
```

## Quick Start

### Initialize Protocol

```typescript
import { WhiskySDK } from '@whisky-core/sdk';

const sdk = new WhiskySDK({
  connection: new Connection('https://api.mainnet-beta.solana.com'),
  wallet: yourWallet,
  programId: WHISKY_PROGRAM_ID
});

// Initialize protocol (one-time setup)
await sdk.initializeProtocol({
  authority: authorityPublicKey,
  rngProvider: rngProviderPublicKey,
  protocolFee: 200 // 2%
});
```

### Create Gaming Pool

```typescript
// Create USDC gaming pool
const poolAddress = await sdk.createPool({
  tokenMint: USDC_MINT_ADDRESS,
  minimumWager: 1_000_000, // 1 USDC
  poolAuthority: poolAuthorityKeypair
});
```

### Add Liquidity

```typescript
// Deposit 1000 USDC to earn fees from games
await sdk.depositLiquidity(poolAddress, 1000_000_000);
```

### Play Game

```typescript
// Simple coinflip game
const gameResult = await sdk.playGame({
  poolAddress,
  wager: 10_000_000, // 10 USDC
  bet: [50, 50], // Equal probability outcomes
  clientSeed: 'player_randomness_123',
  creatorFee: 100, // 1%
  jackpotFee: 50,  // 0.5%
  metadata: 'Coinflip Game #1'
});

// Wait for RNG settlement
await sdk.waitForSettlement(gameResult.gameAddress);

// Claim winnings if won
if (gameResult.won) {
  await sdk.claimWinnings(gameResult.gameAddress);
}
```

## API Reference

### Core Methods

#### `playGame(params: PlayGameParams): Promise<GameResult>`

Initiates a new gaming session.

**Parameters:**
- `poolAddress: PublicKey` - Target liquidity pool
- `wager: number` - Bet amount in token base units
- `bet: number[]` - Outcome probability weights
- `clientSeed: string` - Player randomness contribution
- `creatorFee: number` - Creator fee in basis points
- `jackpotFee: number` - Jackpot fee in basis points
- `metadata: string` - Game identification string

**Returns:**
- `GameResult` - Game session details and outcome

#### `createPool(params: CreatePoolParams): Promise<PublicKey>`

Creates a new liquidity pool for specified token.

**Parameters:**
- `tokenMint: PublicKey` - SPL token mint address
- `minimumWager: number` - Minimum acceptable bet
- `poolAuthority: Keypair` - Pool management authority

**Returns:**
- `PublicKey` - Created pool address

#### `depositLiquidity(poolAddress: PublicKey, amount: number): Promise<string>`

Deposits tokens into liquidity pool.

**Parameters:**
- `poolAddress: PublicKey` - Target pool address
- `amount: number` - Token amount to deposit

**Returns:**
- `string` - Transaction signature

### Utility Functions

#### `validateBet(bet: number[]): boolean`

Validates betting structure for mathematical correctness.

```typescript
// Valid examples
validateBet([50, 50]);           // Equal probability
validateBet([25, 25, 25, 25]);   // Four equal outcomes
validateBet([90, 10]);           // Asymmetric probability

// Invalid examples
validateBet([0, 0]);             // No winning outcomes
validateBet([]);                 // Empty bet array
```

#### `calculatePayout(wager: number, bet: number[], outcome: number): number`

Calculates payout for specific outcome.

```typescript
const payout = calculatePayout(1000000, [50, 50], 0); // 2x multiplier
```

#### `calculateJackpotOdds(wager: number, poolSize: number): number`

Determines jackpot probability based on wager size.

```typescript
const odds = calculateJackpotOdds(10000000, 1000000000); // 0.001% base odds
```

## Examples

### Binary Prediction Market

```typescript
// Create yes/no prediction market
const predictionGame = await sdk.playGame({
  poolAddress: usdcPool,
  wager: 50_000_000, // 50 USDC
  bet: [60, 40], // 60% probability for "Yes"
  clientSeed: 'prediction_12345',
  creatorFee: 200, // 2% to market creator
  jackpotFee: 0,   // No jackpot for predictions
  metadata: 'Election Outcome Prediction'
});
```

### Multi-Outcome Casino Game

```typescript
// Six-sided dice roll
const diceGame = await sdk.playGame({
  poolAddress: solPool,
  wager: 5_000_000_000, // 5 SOL
  bet: [16, 16, 16, 16, 16, 20], // Slightly favor outcome 6
  clientSeed: 'dice_roll_789',
  creatorFee: 300, // 3% house edge
  jackpotFee: 100, // 1% progressive jackpot
  metadata: 'Lucky Dice Roll'
});
```

### Slot Machine Simulation

```typescript
// Complex probability distribution
const slotGame = await sdk.playGame({
  poolAddress: bonkPool,
  wager: 1_000_000_000, // 1B BONK tokens
  bet: [
    500, // 50% - No win
    300, // 30% - Small win (2x)
    150, // 15% - Medium win (5x)
    40,  // 4% - Large win (20x)
    9,   // 0.9% - Huge win (100x)
    1    // 0.1% - Jackpot (1000x)
  ],
  clientSeed: 'slot_machine_456',
  creatorFee: 500, // 5% house edge
  jackpotFee: 200, // 2% progressive jackpot
  metadata: 'Triple 7s Slot Machine'
});
```

## Security

### Randomness Generation

The protocol implements a dual-seed randomness system ensuring provable fairness:

1. **Client Seed**: Player provides randomness input
2. **Server Seed**: RNG provider contributes entropy
3. **Combination**: Seeds are cryptographically combined using SHA-256
4. **Verification**: All randomness is publicly verifiable on-chain

### Mathematical Integrity

- **Overflow Protection**: All arithmetic operations use checked math
- **Bet Validation**: Comprehensive validation of probability distributions
- **Payout Limits**: Maximum payout restrictions prevent pool drainage
- **House Edge Caps**: Maximum 3% house edge enforcement

### Access Controls

- **Authority Management**: Granular permission system
- **PDA Security**: Program Derived Addresses prevent account manipulation
- **Emergency Controls**: Protocol-wide emergency stop functionality
- **Audit Trail**: Complete on-chain transaction history

### Known Security Considerations

- RNG provider must be trusted for seed generation
- Pool liquidity affects maximum possible payouts
- Smart contract upgrades require governance approval
- Client seed predictability could affect fairness

## Economic Model

### Fee Structure

From each gaming session, fees are distributed as follows:

| Recipient | Default Rate | Purpose |
|-----------|--------------|---------|
| Protocol Treasury | 2.0% | Development and maintenance |
| Game Creator | 1.0% | Application development incentives |
| Liquidity Providers | 1.0% | Yield for LP token holders |
| Progressive Jackpot | 0.5% | Exceptional payout accumulation |
| **Available for Payout** | **95.5%** | **Player winnings pool** |

### Liquidity Provider Benefits

- **Passive Income**: Earn fees from all gaming activity
- **LP Tokens**: Tradeable tokens representing pool ownership
- **Proportional Rewards**: Earnings scale with liquidity contribution
- **No Gaming Risk**: Earn fees without direct betting participation

### Economic Sustainability

- Protocol fees fund ongoing development
- Creator incentives encourage ecosystem growth
- Liquidity provider rewards ensure adequate pool funding
- Progressive jackpots drive player engagement

## Development

### Project Structure

```
whisky-protocol/
├── programs/
│   └── whisky/
│       ├── src/
│       │   ├── lib.rs          # Main program entry
│       │   ├── state.rs        # Data structures
│       │   ├── instructions/   # Instruction handlers
│       │   ├── utils.rs        # Mathematical utilities
│       │   └── errors.rs       # Error definitions
│       └── Cargo.toml
├── sdk/
│   ├── src/
│   │   ├── index.ts           # Main SDK export
│   │   ├── instructions.ts    # Instruction builders
│   │   ├── accounts.ts        # Account management
│   │   └── utils.ts           # Utility functions
│   └── package.json
├── tests/
│   ├── integration/           # Integration tests
│   ├── unit/                  # Unit tests
│   └── fixtures/              # Test data
└── docs/                      # Documentation
```

### Building from Source

```bash
# Clone repository
git clone https://github.com/weknowyourgame/whisky-gaming.git
cd whisky-gaming

# Install dependencies
npm install

# Build Anchor program
anchor build

# Build TypeScript SDK
npm run build:sdk

# Run tests
npm test
```

### Environment Setup

```bash
# Set Solana cluster
solana config set --url devnet

# Create keypair for testing
solana-keygen new --outfile ~/.config/solana/id.json

# Request airdrop for testing
solana airdrop 2
```

## Testing

### Test Suite

The protocol includes comprehensive testing covering:

- **Unit Tests**: Individual function validation
- **Integration Tests**: End-to-end workflow testing
- **Mathematical Tests**: Probability and payout calculations
- **Security Tests**: Error handling and edge cases
- **Performance Tests**: Transaction throughput and costs

### Running Tests

```bash
# Run all tests
npm test

# Run specific test category
npm run test:unit
npm run test:integration
npm run test:security

# Run tests with coverage
npm run test:coverage
```

### Test Examples

```typescript
describe('Gaming Mathematics', () => {
  test('calculates correct payout multipliers', () => {
    const multiplier = calculateMultiplier([25, 25, 25, 25], 0);
    expect(multiplier).toBe(4.0);
  });

  test('validates betting structures', () => {
    expect(validateBet([50, 50])).toBe(true);
    expect(validateBet([0, 0])).toBe(false);
  });

  test('prevents mathematical overflow', () => {
    expect(() => calculatePayout(MAX_U64, [1, 99], 0))
      .toThrow('Arithmetic overflow');
  });
});
```

## Deployment

### Mainnet Deployment

```bash
# Build optimized program
anchor build --verifiable

# Deploy to mainnet
anchor deploy --provider.cluster mainnet-beta

# Initialize protocol
anchor run initialize-mainnet
```

### Configuration

```typescript
// Production configuration
const MAINNET_CONFIG = {
  programId: new PublicKey('WHISKY_PROGRAM_ID'),
  rpcEndpoint: 'https://api.mainnet-beta.solana.com',
  protocolFee: 200, // 2%
  maxHouseEdge: 300, // 3%
  minWager: 1000, // 0.001 token units
};
```

### Monitoring

- **Transaction Success Rate**: Monitor settlement success
- **Pool Liquidity Levels**: Ensure adequate funding
- **Fee Collection**: Track protocol revenue
- **RNG Provider Uptime**: Monitor randomness availability

## Contributing

### Development Workflow

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Standards

- **Rust**: Follow official Rust style guidelines
- **TypeScript**: Use Prettier and ESLint configurations
- **Testing**: Maintain 90%+ test coverage
- **Documentation**: Update docs for all public APIs

### Contribution Areas

- **Protocol Enhancements**: Core functionality improvements
- **SDK Development**: Client library features
- **Documentation**: User guides and API documentation
- **Testing**: Additional test coverage
- **Security**: Audit and security improvements

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

### Documentation

- [Technical Documentation]()
- [API Reference]()
- [Integration Guide]()
- [Security Best Practices]()

### Community

- [Discord Server]()
- [GitHub Discussions]()
- [Developer Forum]()

### Professional Support

For enterprise integration and custom development:
- Email: 
- Documentation: [Enterprise Guide]()

---

**WhiskyState Protocol** - Building the future of decentralized gaming on Solana.
