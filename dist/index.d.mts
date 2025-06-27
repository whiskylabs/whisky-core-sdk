import * as _solana_spl_token from '@solana/spl-token';
export { NATIVE_MINT } from '@solana/spl-token';
import * as anchor from '@coral-xyz/anchor';
import { IdlEvents, IdlAccounts, Program, AnchorProvider } from '@coral-xyz/anchor';
import * as _solana_web3_js from '@solana/web3.js';
import { Keypair, Connection, ConfirmOptions, PublicKey, AccountInfo, ParsedTransactionWithMeta, SignaturesForAddressOptions } from '@solana/web3.js';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import * as bn_js from 'bn.js';

type WhiskyCore = {
    "version": "0.1.0";
    "name": "whisky_core";
    "instructions": [
        {
            "name": "whiskyInitialize";
            "docs": [
                "Initialize the global Whisky gaming protocol"
            ];
            "accounts": [
                {
                    "name": "whiskyState";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "initializer";
                    "isMut": true;
                    "isSigner": true;
                },
                {
                    "name": "systemProgram";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [];
        },
        {
            "name": "whiskySetAuthority";
            "docs": [
                "Set protocol authority"
            ];
            "accounts": [
                {
                    "name": "whiskyState";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "authority";
                    "isMut": false;
                    "isSigner": true;
                }
            ];
            "args": [
                {
                    "name": "authority";
                    "type": "publicKey";
                }
            ];
        },
        {
            "name": "whiskySetConfig";
            "docs": [
                "Configure protocol settings"
            ];
            "accounts": [
                {
                    "name": "whiskyState";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "authority";
                    "isMut": false;
                    "isSigner": true;
                }
            ];
            "args": [
                {
                    "name": "rngAddress";
                    "type": "publicKey";
                },
                {
                    "name": "whiskyFee";
                    "type": "u64";
                },
                {
                    "name": "maxCreatorFee";
                    "type": "u64";
                },
                {
                    "name": "poolCreationFee";
                    "type": "u64";
                },
                {
                    "name": "antiSpamFee";
                    "type": "u64";
                },
                {
                    "name": "maxHouseEdge";
                    "type": "u64";
                },
                {
                    "name": "defaultPoolFee";
                    "type": "u64";
                },
                {
                    "name": "jackpotPayoutToUserBps";
                    "type": "u64";
                },
                {
                    "name": "jackpotPayoutToCreatorBps";
                    "type": "u64";
                },
                {
                    "name": "jackpotPayoutToPoolBps";
                    "type": "u64";
                },
                {
                    "name": "jackpotPayoutToWhiskyBps";
                    "type": "u64";
                },
                {
                    "name": "bonusToJackpotRatioBps";
                    "type": "u64";
                },
                {
                    "name": "maxPayoutBps";
                    "type": "u64";
                },
                {
                    "name": "poolWithdrawFeeBps";
                    "type": "u64";
                },
                {
                    "name": "poolCreationAllowed";
                    "type": "bool";
                },
                {
                    "name": "poolDepositAllowed";
                    "type": "bool";
                },
                {
                    "name": "poolWithdrawAllowed";
                    "type": "bool";
                },
                {
                    "name": "playingAllowed";
                    "type": "bool";
                },
                {
                    "name": "distributionRecipient";
                    "type": "publicKey";
                }
            ];
        },
        {
            "name": "poolInitialize";
            "docs": [
                "Initialize a gaming pool"
            ];
            "accounts": [
                {
                    "name": "whiskyState";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "pool";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "underlyingTokenMint";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "poolAuthority";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "lpMint";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "poolUnderlyingTokenAccount";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "poolJackpotTokenAccount";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "user";
                    "isMut": true;
                    "isSigner": true;
                },
                {
                    "name": "tokenProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "associatedTokenProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "systemProgram";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [
                {
                    "name": "poolAuthority";
                    "type": "publicKey";
                },
                {
                    "name": "lookupAddress";
                    "type": "publicKey";
                }
            ];
        },
        {
            "name": "poolDeposit";
            "docs": [
                "Deposit tokens to provide liquidity"
            ];
            "accounts": [
                {
                    "name": "whiskyState";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "pool";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "underlyingTokenMint";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "lpMint";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "poolUnderlyingTokenAccount";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "userUnderlyingAta";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "userLpAta";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "user";
                    "isMut": true;
                    "isSigner": true;
                },
                {
                    "name": "tokenProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "associatedTokenProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "systemProgram";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [
                {
                    "name": "amount";
                    "type": "u64";
                }
            ];
        },
        {
            "name": "poolWithdraw";
            "docs": [
                "Withdraw liquidity from pool"
            ];
            "accounts": [
                {
                    "name": "whiskyState";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "pool";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "underlyingTokenMint";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "lpMint";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "poolUnderlyingTokenAccount";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "userUnderlyingAta";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "userLpAta";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "user";
                    "isMut": true;
                    "isSigner": true;
                },
                {
                    "name": "tokenProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "associatedTokenProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "systemProgram";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [
                {
                    "name": "amount";
                    "type": "u64";
                }
            ];
        },
        {
            "name": "playerInitialize";
            "docs": [
                "Initialize player and game accounts"
            ];
            "accounts": [
                {
                    "name": "player";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "game";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "user";
                    "isMut": true;
                    "isSigner": true;
                },
                {
                    "name": "systemProgram";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [];
        },
        {
            "name": "playGame";
            "docs": [
                "Place a bet and start a game"
            ];
            "accounts": [
                {
                    "name": "whiskyState";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "pool";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "player";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "game";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "underlyingTokenMint";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "poolUnderlyingTokenAccount";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "userUnderlyingAta";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "playerAta";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "creator";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "user";
                    "isMut": true;
                    "isSigner": true;
                },
                {
                    "name": "tokenProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "associatedTokenProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "systemProgram";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [
                {
                    "name": "wager";
                    "type": "u64";
                },
                {
                    "name": "bet";
                    "type": {
                        "vec": "u32";
                    };
                },
                {
                    "name": "clientSeed";
                    "type": "string";
                },
                {
                    "name": "creatorFeeBps";
                    "type": "u32";
                },
                {
                    "name": "jackpotFeeBps";
                    "type": "u32";
                },
                {
                    "name": "metadata";
                    "type": "string";
                }
            ];
        },
        {
            "name": "playerClaim";
            "docs": [
                "Claim winnings after game settlement"
            ];
            "accounts": [
                {
                    "name": "player";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "game";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "underlyingTokenMint";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "playerAta";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "userUnderlyingAta";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "user";
                    "isMut": false;
                    "isSigner": true;
                },
                {
                    "name": "tokenProgram";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [];
        },
        {
            "name": "playerClose";
            "docs": [
                "Close player account"
            ];
            "accounts": [
                {
                    "name": "player";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "game";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "user";
                    "isMut": false;
                    "isSigner": true;
                }
            ];
            "args": [];
        },
        {
            "name": "rngSettle";
            "docs": [
                "Settle game with RNG (called by RNG authority)"
            ];
            "accounts": [
                {
                    "name": "whiskyState";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "game";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "poolUnderlyingTokenAccount";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "poolJackpotTokenAccount";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "pool";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "underlyingTokenMint";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "rng";
                    "isMut": false;
                    "isSigner": true;
                }
            ];
            "args": [
                {
                    "name": "rngSeed";
                    "type": "string";
                },
                {
                    "name": "nextRngSeedHashed";
                    "type": "string";
                }
            ];
        },
        {
            "name": "rngProvideHashedSeed";
            "docs": [
                "Provide next RNG seed hash"
            ];
            "accounts": [
                {
                    "name": "whiskyState";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "game";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "rng";
                    "isMut": false;
                    "isSigner": true;
                }
            ];
            "args": [
                {
                    "name": "nextRngSeedHashed";
                    "type": "string";
                }
            ];
        },
        {
            "name": "distributeFees";
            "docs": [
                "Distribute protocol fees"
            ];
            "accounts": [
                {
                    "name": "whiskyState";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "underlyingTokenMint";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "whiskyStateAta";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "distributionRecipientAta";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "authority";
                    "isMut": false;
                    "isSigner": true;
                },
                {
                    "name": "tokenProgram";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [
                {
                    "name": "nativeSol";
                    "type": "bool";
                }
            ];
        }
    ];
    "accounts": [
        {
            "name": "WhiskyState";
            "docs": [
                "Global protocol state account"
            ];
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "authority";
                        "docs": [
                            "Protocol authority (admin)"
                        ];
                        "type": "publicKey";
                    },
                    {
                        "name": "rngAddress";
                        "docs": [
                            "RNG provider address"
                        ];
                        "type": "publicKey";
                    },
                    {
                        "name": "rngAddress2";
                        "docs": [
                            "Secondary RNG provider address"
                        ];
                        "type": "publicKey";
                    },
                    {
                        "name": "antiSpamFee";
                        "docs": [
                            "Anti-spam fee amount"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "whiskyFeeBps";
                        "docs": [
                            "Protocol fee in basis points"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "poolCreationFee";
                        "docs": [
                            "Pool creation fee"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "defaultPoolFee";
                        "docs": [
                            "Default pool fee in basis points"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "jackpotPayoutToUserBps";
                        "docs": [
                            "Jackpot payout to user (BPS)"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "jackpotPayoutToCreatorBps";
                        "docs": [
                            "Jackpot payout to creator (BPS)"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "jackpotPayoutToPoolBps";
                        "docs": [
                            "Jackpot payout to pool (BPS)"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "jackpotPayoutToWhiskyBps";
                        "docs": [
                            "Jackpot payout to protocol (BPS)"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "bonusToJackpotRatioBps";
                        "docs": [
                            "Bonus to jackpot ratio (BPS)"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "maxHouseEdgeBps";
                        "docs": [
                            "Maximum house edge allowed (BPS)"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "maxCreatorFeeBps";
                        "docs": [
                            "Maximum creator fee allowed (BPS)"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "maxPayoutBps";
                        "docs": [
                            "Maximum payout percentage (BPS)"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "poolWithdrawFeeBps";
                        "docs": [
                            "Pool withdrawal fee (BPS)"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "poolCreationAllowed";
                        "docs": [
                            "Whether pool creation is allowed"
                        ];
                        "type": "bool";
                    },
                    {
                        "name": "poolDepositAllowed";
                        "docs": [
                            "Whether pool deposits are allowed"
                        ];
                        "type": "bool";
                    },
                    {
                        "name": "poolWithdrawAllowed";
                        "docs": [
                            "Whether pool withdrawals are allowed"
                        ];
                        "type": "bool";
                    },
                    {
                        "name": "playingAllowed";
                        "docs": [
                            "Whether playing games is allowed"
                        ];
                        "type": "bool";
                    },
                    {
                        "name": "distributionRecipient";
                        "docs": [
                            "Fee distribution recipient"
                        ];
                        "type": "publicKey";
                    },
                    {
                        "name": "bump";
                        "docs": [
                            "PDA bump seed"
                        ];
                        "type": {
                            "array": [
                                "u8",
                                1
                            ];
                        };
                    }
                ];
            };
        },
        {
            "name": "Pool";
            "docs": [
                "Gaming pool account"
            ];
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "poolAuthority";
                        "docs": [
                            "Pool authority (creator)"
                        ];
                        "type": "publicKey";
                    },
                    {
                        "name": "underlyingTokenMint";
                        "docs": [
                            "Underlying token mint"
                        ];
                        "type": "publicKey";
                    },
                    {
                        "name": "lookupAddress";
                        "docs": [
                            "Pool lookup address for identification"
                        ];
                        "type": "publicKey";
                    },
                    {
                        "name": "antiSpamFeeExempt";
                        "docs": [
                            "Anti-spam fee exemption"
                        ];
                        "type": "bool";
                    },
                    {
                        "name": "minWager";
                        "docs": [
                            "Minimum wager amount"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "plays";
                        "docs": [
                            "Number of games played"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "liquidityCheckpoint";
                        "docs": [
                            "Liquidity checkpoint"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "depositLimit";
                        "docs": [
                            "Whether deposit limit is enabled"
                        ];
                        "type": "bool";
                    },
                    {
                        "name": "depositLimitAmount";
                        "docs": [
                            "Deposit limit amount"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "customPoolFee";
                        "docs": [
                            "Whether custom pool fee is enabled"
                        ];
                        "type": "bool";
                    },
                    {
                        "name": "customPoolFeeBps";
                        "docs": [
                            "Custom pool fee in BPS"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "customWhiskyFee";
                        "docs": [
                            "Whether custom whisky fee is enabled"
                        ];
                        "type": "bool";
                    },
                    {
                        "name": "customWhiskyFeeBps";
                        "docs": [
                            "Custom whisky fee in BPS"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "customMaxPayout";
                        "docs": [
                            "Whether custom max payout is enabled"
                        ];
                        "type": "bool";
                    },
                    {
                        "name": "customMaxPayoutBps";
                        "docs": [
                            "Custom max payout in BPS"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "customBonusTokenMint";
                        "docs": [
                            "Custom bonus token mint"
                        ];
                        "type": "publicKey";
                    },
                    {
                        "name": "customBonusToken";
                        "docs": [
                            "Whether custom bonus token is enabled"
                        ];
                        "type": "bool";
                    },
                    {
                        "name": "customMaxCreatorFee";
                        "docs": [
                            "Whether custom max creator fee is enabled"
                        ];
                        "type": "bool";
                    },
                    {
                        "name": "customMaxCreatorFeeBps";
                        "docs": [
                            "Custom max creator fee in BPS"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "depositWhitelistRequired";
                        "docs": [
                            "Whether deposit whitelist is required"
                        ];
                        "type": "bool";
                    },
                    {
                        "name": "depositWhitelistAddress";
                        "docs": [
                            "Deposit whitelist address"
                        ];
                        "type": "publicKey";
                    },
                    {
                        "name": "bump";
                        "docs": [
                            "PDA bump seed"
                        ];
                        "type": {
                            "array": [
                                "u8",
                                1
                            ];
                        };
                    }
                ];
            };
        },
        {
            "name": "Player";
            "docs": [
                "Player account for managing game state"
            ];
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "user";
                        "docs": [
                            "Player's wallet address"
                        ];
                        "type": "publicKey";
                    },
                    {
                        "name": "nonce";
                        "docs": [
                            "Current nonce for game sequence"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "bump";
                        "docs": [
                            "PDA bump seed"
                        ];
                        "type": {
                            "array": [
                                "u8",
                                1
                            ];
                        };
                    }
                ];
            };
        },
        {
            "name": "Game";
            "docs": [
                "Individual game account"
            ];
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "nonce";
                        "docs": [
                            "Game nonce"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "user";
                        "docs": [
                            "Player's wallet address"
                        ];
                        "type": "publicKey";
                    },
                    {
                        "name": "tokenMint";
                        "docs": [
                            "Token mint used for the game"
                        ];
                        "type": "publicKey";
                    },
                    {
                        "name": "pool";
                        "docs": [
                            "Pool used for the game"
                        ];
                        "type": "publicKey";
                    },
                    {
                        "name": "status";
                        "docs": [
                            "Current game status"
                        ];
                        "type": {
                            "defined": "GameStatus";
                        };
                    },
                    {
                        "name": "nextRngSeedHashed";
                        "docs": [
                            "Next RNG seed hash (for verification)"
                        ];
                        "type": "string";
                    },
                    {
                        "name": "rngSeed";
                        "docs": [
                            "RNG seed used for this game"
                        ];
                        "type": "string";
                    },
                    {
                        "name": "timestamp";
                        "docs": [
                            "Game timestamp"
                        ];
                        "type": "i64";
                    },
                    {
                        "name": "creator";
                        "docs": [
                            "Game creator address"
                        ];
                        "type": "publicKey";
                    },
                    {
                        "name": "creatorMeta";
                        "docs": [
                            "Creator metadata"
                        ];
                        "type": "string";
                    },
                    {
                        "name": "wager";
                        "docs": [
                            "Wager amount"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "underlyingUsed";
                        "docs": [
                            "Underlying tokens used"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "bonusUsed";
                        "docs": [
                            "Bonus tokens used"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "creatorFee";
                        "docs": [
                            "Creator fee amount"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "whiskyFee";
                        "docs": [
                            "Protocol fee amount"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "poolFee";
                        "docs": [
                            "Pool fee amount"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "jackpotFee";
                        "docs": [
                            "Jackpot fee amount"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "jackpotResult";
                        "docs": [
                            "Jackpot result (0 or 1)"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "jackpotProbabilityUbps";
                        "docs": [
                            "Jackpot probability in micro basis points"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "jackpotPayout";
                        "docs": [
                            "Jackpot payout amount"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "clientSeed";
                        "docs": [
                            "Client seed provided by player"
                        ];
                        "type": "string";
                    },
                    {
                        "name": "bet";
                        "docs": [
                            "Bet configuration (weights for each outcome)"
                        ];
                        "type": {
                            "vec": "u32";
                        };
                    },
                    {
                        "name": "result";
                        "docs": [
                            "Game result index"
                        ];
                        "type": "u32";
                    },
                    {
                        "name": "points";
                        "docs": [
                            "Whether points are enabled"
                        ];
                        "type": "bool";
                    },
                    {
                        "name": "pointsAuthority";
                        "docs": [
                            "Points authority"
                        ];
                        "type": "publicKey";
                    },
                    {
                        "name": "metadata";
                        "docs": [
                            "Game metadata"
                        ];
                        "type": "string";
                    },
                    {
                        "name": "bump";
                        "docs": [
                            "PDA bump seed"
                        ];
                        "type": {
                            "array": [
                                "u8",
                                1
                            ];
                        };
                    }
                ];
            };
        }
    ];
    "types": [
        {
            "name": "WhiskyStateError";
            "type": {
                "kind": "enum";
                "variants": [
                    {
                        "name": "PoolCreationNotAllowed";
                    },
                    {
                        "name": "DepositNotAllowed";
                    },
                    {
                        "name": "WithdrawalNotAllowed";
                    },
                    {
                        "name": "PlaysNotAllowed";
                    },
                    {
                        "name": "InvalidFeeConfiguration";
                    },
                    {
                        "name": "FeatureDisabled";
                    },
                    {
                        "name": "ConfigurationOutOfBounds";
                    },
                    {
                        "name": "InvalidAuthority";
                    },
                    {
                        "name": "ProtocolPaused";
                    },
                    {
                        "name": "InvalidParameter";
                    }
                ];
            };
        },
        {
            "name": "PlayerError";
            "type": {
                "kind": "enum";
                "variants": [
                    {
                        "name": "NotReadyToPlay";
                    },
                    {
                        "name": "GameInProgress";
                    },
                    {
                        "name": "InvalidNonce";
                    },
                    {
                        "name": "PlayerNotFound";
                    },
                    {
                        "name": "GameNotFound";
                    },
                    {
                        "name": "InvalidGameState";
                    },
                    {
                        "name": "CannotClaim";
                    },
                    {
                        "name": "NoWinningsToClaim";
                    },
                    {
                        "name": "PlayerNotInitialized";
                    },
                    {
                        "name": "PlayerAlreadyInitialized";
                    },
                    {
                        "name": "InvalidPlayerState";
                    },
                    {
                        "name": "AntiSpamFeeRequired";
                    },
                    {
                        "name": "NonceMismatch";
                    }
                ];
            };
        },
        {
            "name": "RngError";
            "type": {
                "kind": "enum";
                "variants": [
                    {
                        "name": "InvalidRngAuthority";
                    },
                    {
                        "name": "ResultNotRequested";
                    },
                    {
                        "name": "ResultAlreadyProvided";
                    },
                    {
                        "name": "InvalidRngSeed";
                    },
                    {
                        "name": "SeedHashMismatch";
                    },
                    {
                        "name": "RngTimeout";
                    },
                    {
                        "name": "InvalidClientSeed";
                    },
                    {
                        "name": "InvalidRngProvider";
                    },
                    {
                        "name": "HashVerificationFailed";
                    },
                    {
                        "name": "DuplicateSettlement";
                    }
                ];
            };
        },
        {
            "name": "GameError";
            "type": {
                "kind": "enum";
                "variants": [
                    {
                        "name": "TooFewOutcomes";
                    },
                    {
                        "name": "TooManyOutcomes";
                    },
                    {
                        "name": "InvalidBetWeights";
                    },
                    {
                        "name": "WagerTooLow";
                    },
                    {
                        "name": "InvalidHouseEdge";
                    },
                    {
                        "name": "MaxPayoutExceeded";
                    },
                    {
                        "name": "InvalidMultiplier";
                    },
                    {
                        "name": "GameNotSettled";
                    },
                    {
                        "name": "InvalidBetConfiguration";
                    },
                    {
                        "name": "InvalidBetParameters";
                    },
                    {
                        "name": "HouseEdgeTooHigh";
                    },
                    {
                        "name": "WagerTooHigh";
                    },
                    {
                        "name": "InvalidGameState";
                    },
                    {
                        "name": "InvalidGameResult";
                    },
                    {
                        "name": "RngSettlementFailed";
                    },
                    {
                        "name": "CreatorFeeTooHigh";
                    },
                    {
                        "name": "InvalidJackpotConfiguration";
                    },
                    {
                        "name": "InvalidMetadata";
                    }
                ];
            };
        },
        {
            "name": "PoolError";
            "type": {
                "kind": "enum";
                "variants": [
                    {
                        "name": "PoolNotFound";
                    },
                    {
                        "name": "InsufficientLiquidity";
                    },
                    {
                        "name": "InvalidPoolAuthority";
                    },
                    {
                        "name": "DepositLimitExceeded";
                    },
                    {
                        "name": "InvalidWithdrawalAmount";
                    },
                    {
                        "name": "PoolPaused";
                    },
                    {
                        "name": "PoolNotInitialized";
                    },
                    {
                        "name": "InvalidTokenMint";
                    },
                    {
                        "name": "InvalidLPTokenCalculation";
                    },
                    {
                        "name": "WhitelistCheckFailed";
                    },
                    {
                        "name": "CustomFeeOutOfBounds";
                    },
                    {
                        "name": "WithdrawalLimitExceeded";
                    }
                ];
            };
        },
        {
            "name": "GameStatus";
            "docs": [
                "Game status enumeration"
            ];
            "type": {
                "kind": "enum";
                "variants": [
                    {
                        "name": "None";
                    },
                    {
                        "name": "ResultRequested";
                    },
                    {
                        "name": "Ready";
                    }
                ];
            };
        },
        {
            "name": "PoolAction";
            "docs": [
                "Pool action types for events"
            ];
            "type": {
                "kind": "enum";
                "variants": [
                    {
                        "name": "Deposit";
                    },
                    {
                        "name": "Withdraw";
                    }
                ];
            };
        }
    ];
    "events": [
        {
            "name": "PoolChange";
            "fields": [
                {
                    "name": "user";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "pool";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "tokenMint";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "action";
                    "type": {
                        "defined": "PoolAction";
                    };
                    "index": false;
                },
                {
                    "name": "amount";
                    "type": "u64";
                    "index": false;
                },
                {
                    "name": "postLiquidity";
                    "type": "u64";
                    "index": false;
                },
                {
                    "name": "lpSupply";
                    "type": "u64";
                    "index": false;
                }
            ];
        },
        {
            "name": "GameSettled";
            "fields": [
                {
                    "name": "user";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "pool";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "tokenMint";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "creator";
                    "type": "publicKey";
                    "index": false;
                },
                {
                    "name": "creatorFee";
                    "type": "u64";
                    "index": false;
                },
                {
                    "name": "whiskyFee";
                    "type": "u64";
                    "index": false;
                },
                {
                    "name": "poolFee";
                    "type": "u64";
                    "index": false;
                },
                {
                    "name": "jackpotFee";
                    "type": "u64";
                    "index": false;
                },
                {
                    "name": "underlyingUsed";
                    "type": "u64";
                    "index": false;
                },
                {
                    "name": "bonusUsed";
                    "type": "u64";
                    "index": false;
                },
                {
                    "name": "wager";
                    "type": "u64";
                    "index": false;
                },
                {
                    "name": "payout";
                    "type": "u64";
                    "index": false;
                },
                {
                    "name": "multiplierBps";
                    "type": "u32";
                    "index": false;
                },
                {
                    "name": "payoutFromBonusPool";
                    "type": "u64";
                    "index": false;
                },
                {
                    "name": "payoutFromNormalPool";
                    "type": "u64";
                    "index": false;
                },
                {
                    "name": "jackpotProbabilityUbps";
                    "type": "u64";
                    "index": false;
                },
                {
                    "name": "jackpotResult";
                    "type": "u64";
                    "index": false;
                },
                {
                    "name": "nonce";
                    "type": "u64";
                    "index": false;
                },
                {
                    "name": "clientSeed";
                    "type": "string";
                    "index": false;
                },
                {
                    "name": "resultIndex";
                    "type": "u32";
                    "index": false;
                },
                {
                    "name": "bet";
                    "type": {
                        "vec": "u32";
                    };
                    "index": false;
                },
                {
                    "name": "jackpotPayoutToUser";
                    "type": "u64";
                    "index": false;
                },
                {
                    "name": "poolLiquidity";
                    "type": "u64";
                    "index": false;
                },
                {
                    "name": "rngSeed";
                    "type": "string";
                    "index": false;
                },
                {
                    "name": "nextRngSeedHashed";
                    "type": "string";
                    "index": false;
                },
                {
                    "name": "metadata";
                    "type": "string";
                    "index": false;
                }
            ];
        }
    ];
    "errors": [
        {
            "code": 6000;
            "name": "Unauthorized";
            "msg": "Unauthorized access";
        },
        {
            "code": 6001;
            "name": "InvalidAmount";
            "msg": "Invalid amount";
        },
        {
            "code": 6002;
            "name": "InsufficientFunds";
            "msg": "Insufficient funds";
        },
        {
            "code": 6003;
            "name": "InvalidConfiguration";
            "msg": "Invalid configuration";
        },
        {
            "code": 6004;
            "name": "OperationNotAllowed";
            "msg": "Operation not allowed";
        },
        {
            "code": 6005;
            "name": "InvalidProgramState";
            "msg": "Invalid program state";
        },
        {
            "code": 6006;
            "name": "MathOverflow";
            "msg": "Math overflow";
        },
        {
            "code": 6007;
            "name": "InvalidAccount";
            "msg": "Invalid account";
        },
        {
            "code": 6008;
            "name": "AlreadyInitialized";
            "msg": "Account already initialized";
        },
        {
            "code": 6009;
            "name": "NotInitialized";
            "msg": "Account not initialized";
        },
        {
            "code": 6010;
            "name": "InvalidInstruction";
            "msg": "Invalid instruction";
        },
        {
            "code": 6011;
            "name": "InvalidMint";
            "msg": "Invalid mint";
        },
        {
            "code": 6012;
            "name": "TokenTransferFailed";
            "msg": "Token transfer failed";
        },
        {
            "code": 6013;
            "name": "InvalidSignature";
            "msg": "Invalid signature";
        },
        {
            "code": 6014;
            "name": "CalculationError";
            "msg": "Calculation error";
        },
        {
            "code": 6015;
            "name": "AccountNotInitialized";
            "msg": "Account not initialized";
        },
        {
            "code": 6016;
            "name": "AccountAlreadyInitialized";
            "msg": "Account already initialized";
        },
        {
            "code": 6017;
            "name": "InsufficientBalance";
            "msg": "Insufficient balance";
        }
    ];
    "metadata": {
        "address": "6R7S7r6KzU1A5YACXCaKuF6GcEcv5ZdXU4hh8vPozcw6";
    };
};
declare const IDL: WhiskyCore;

type WhiskyEventType = 'GameSettled' | 'PoolChange';
type WhiskyEvent<T extends WhiskyEventType> = {
    name: string;
    data: IdlEvents<WhiskyCore>[T];
};
type AnyWhiskyEvent = WhiskyEvent<'GameSettled'> | WhiskyEvent<'PoolChange'>;
type WhiskyState = IdlAccounts<WhiskyCore>['WhiskyState'];
type PlayerState = IdlAccounts<WhiskyCore>['Player'];
type GameState = IdlAccounts<WhiskyCore>['Game'];
type PoolState = IdlAccounts<WhiskyCore>['Pool'];
type WhiskyProviderWallet = Omit<NodeWallet, 'payer'> & {
    payer?: Keypair;
};

declare class WhiskyProvider {
    whiskyProgram: anchor.Program<WhiskyCore>;
    anchorProvider: anchor.AnchorProvider;
    wallet: WhiskyProviderWallet;
    constructor(connection: Connection, walletOrKeypair: WhiskyProviderWallet | Keypair, opts?: ConfirmOptions);
    static fromAnchorProvider(provider: anchor.AnchorProvider): WhiskyProvider;
    get user(): anchor.web3.PublicKey;
    /**
     * Creates a pool for the specified token with address lookup table
     * @param underlyingTokenMint The token to use for the pool
     * @param authority The authority for the pool
     * @param slot The slot to use for the lookup table instruction
     * @returns Multiple TransactionInstruction in an array
     */
    createPool(underlyingTokenMint: PublicKey, authority: PublicKey, slot: number): (anchor.web3.TransactionInstruction | Promise<anchor.web3.TransactionInstruction>)[];
    /**
     *
     * @param pool The pool to deposit to
     * @param underlyingTokenMint Token to deposit (Has to be the same as pool.underlyingTokenMint)
     * @param amount Amount of tokens to deposit
     */
    depositToPool(pool: PublicKey, underlyingTokenMint: PublicKey, amount: bigint | number): Promise<anchor.web3.TransactionInstruction>;
    /**
     *
     * @param pool The pool to withdraw from
     * @param underlyingTokenMint Token to withdraw (Has to be the same as pool.underlyingTokenMint)
     * @param amount Amount of tokens to withdraw
     */
    withdrawFromPool(pool: PublicKey, underlyingTokenMint: PublicKey, amount: bigint | number): Promise<anchor.web3.TransactionInstruction>;
    /**
     * Initializes an associated Player account for the connected wallet
     */
    createPlayer(): Promise<anchor.web3.TransactionInstruction>;
    /**
     * Closes the associated Player account for the connected wallet
     */
    closePlayer(): Promise<anchor.web3.TransactionInstruction>;
    play(wager: number, bet: number[], clientSeed: string, pool: PublicKey, underlyingTokenMint: PublicKey, creator: PublicKey, creatorFee: number, jackpotFee: number, metadata: string): Promise<anchor.web3.TransactionInstruction>;
    /**
     * Claim winnings after game settlement
     */
    claimWinnings(): Promise<anchor.web3.TransactionInstruction>;
    /**
     * RNG Settlement - Critical function for game resolution
     * @param gameUser The user whose game needs to be settled
     * @param rngSeed The RNG seed for settlement
     * @param nextRngSeedHashed The next hashed RNG seed
     * @param pool The pool address
     * @param underlyingTokenMint The token mint
     */
    rngSettle(gameUser: PublicKey, rngSeed: string, nextRngSeedHashed: string, pool: PublicKey, underlyingTokenMint: PublicKey): Promise<anchor.web3.TransactionInstruction>;
    /**
     * Provide hashed seed for RNG
     * @param gameUser The user whose game needs the seed
     * @param nextRngSeedHashed The next hashed RNG seed
     */
    rngProvideHashedSeed(gameUser: PublicKey, nextRngSeedHashed: string): Promise<anchor.web3.TransactionInstruction>;
    /**
     * Configure Whisky protocol settings (Admin only)
     */
    setWhiskyConfig(rngAddress: PublicKey, whiskyFee: number, maxCreatorFee: number, poolCreationFee: number, antiSpamFee: number, maxHouseEdge: number, defaultPoolFee: number, jackpotPayoutToUserBps: number, jackpotPayoutToCreatorBps: number, jackpotPayoutToPoolBps: number, jackpotPayoutToWhiskyBps: number, bonusToJackpotRatioBps: number, maxPayoutBps: number, poolWithdrawFeeBps: number, poolCreationAllowed: boolean, poolDepositAllowed: boolean, poolWithdrawAllowed: boolean, playingAllowed: boolean, distributionRecipient: PublicKey): Promise<anchor.web3.TransactionInstruction>;
    /**
     * Distribute accumulated fees (Admin only)
     * @param underlyingTokenMint The token to distribute
     * @param nativeSol Whether to distribute native SOL
     */
    distributeFees(underlyingTokenMint: PublicKey, nativeSol?: boolean): Promise<anchor.web3.TransactionInstruction>;
}

interface PlayGameParams {
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
interface PoolDepositParams {
    user: PublicKey;
    underlyingTokenMint: PublicKey;
    poolAuthority: PublicKey;
    amount: number;
}
interface PoolWithdrawParams {
    user: PublicKey;
    underlyingTokenMint: PublicKey;
    poolAuthority: PublicKey;
    amount: number;
}
interface WhiskySetConfigParams {
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
interface RngSettleParams {
    user: PublicKey;
    underlyingTokenMint: PublicKey;
    poolAuthority: PublicKey;
    rng: PublicKey;
    rngSeed: string;
    nextRngSeedHashed: string;
}
interface RngProvideHashedSeedParams {
    user: PublicKey;
    rng: PublicKey;
    nextRngSeedHashed: string;
}
interface DistributeFeesParams {
    authority: PublicKey;
    underlyingTokenMint: PublicKey;
    nativeSol: boolean;
}
declare class WhiskyClient {
    program: Program<WhiskyCore>;
    connection: Connection;
    provider: AnchorProvider;
    constructor(provider: AnchorProvider);
    static create(connection: Connection, wallet: any): WhiskyClient;
    whiskyInitialize(initializer: Keypair): Promise<string>;
    whiskySetAuthority(authority: PublicKey, newAuthority: PublicKey): Promise<string>;
    whiskySetConfig(params: WhiskySetConfigParams): Promise<string>;
    poolInitialize(user: PublicKey, underlyingTokenMint: PublicKey, poolAuthority: PublicKey, lookupAddress: PublicKey): Promise<string>;
    poolDeposit(params: PoolDepositParams): Promise<string>;
    poolWithdraw(params: PoolWithdrawParams): Promise<string>;
    playerInitialize(user: PublicKey, nonce?: number): Promise<string>;
    playGame(params: PlayGameParams): Promise<string>;
    playerClaim(user: PublicKey, underlyingTokenMint: PublicKey, nonce: number): Promise<string>;
    playerClose(user: PublicKey): Promise<string>;
    rngSettle(params: RngSettleParams): Promise<string>;
    rngProvideHashedSeed(params: RngProvideHashedSeedParams): Promise<string>;
    distributeFees(params: DistributeFeesParams): Promise<string>;
    getWhiskyState(): Promise<WhiskyState>;
    getPool(underlyingTokenMint: PublicKey, poolAuthority: PublicKey): Promise<PoolState>;
    getPlayer(user: PublicKey): Promise<PlayerState>;
    getGame(user: PublicKey, nonce: number): Promise<GameState>;
    getAllPools(): Promise<PoolState[]>;
    getPoolLiquidity(underlyingTokenMint: PublicKey, poolAuthority: PublicKey): Promise<number>;
    getProgramId(): PublicKey;
}

declare const PROGRAM_ID: PublicKey;
declare const SYSTEM_PROGRAM: PublicKey;
declare const BPS_PER_WHOLE = 10000;
declare const GAME_SEED = "GAME";
declare const PLAYER_SEED = "PLAYER";
declare const POOL_SEED = "POOL";
declare const WHISKY_STATE_SEED = "WHISKY_STATE";
declare const POOL_ATA_SEED = "POOL_ATA";
declare const POOL_JACKPOT_SEED = "POOL_JACKPOT";
declare const POOL_BONUS_UNDERLYING_TA_SEED = "POOL_BONUS_UNDERLYING_TA";
declare const POOL_BONUS_MINT_SEED = "POOL_BONUS_MINT";
declare const POOL_LP_MINT_SEED = "POOL_LP_MINT";

declare const decodeAta: (acc: AccountInfo<Buffer> | null) => _solana_spl_token.RawAccount | null;
declare const decodePlayer: (info: AccountInfo<Buffer> | null) => {
    user: _solana_web3_js.PublicKey;
    nonce: bn_js;
    bump: number[];
} | null;
declare const decodeGame: (info: AccountInfo<Buffer> | null) => {
    nonce: bn_js;
    user: _solana_web3_js.PublicKey;
    tokenMint: _solana_web3_js.PublicKey;
    pool: _solana_web3_js.PublicKey;
    status: {
        none?: Record<string, never> | undefined;
        resultRequested?: Record<string, never> | undefined;
        ready?: Record<string, never> | undefined;
    };
    nextRngSeedHashed: string;
    rngSeed: string;
    timestamp: bn_js;
    creator: _solana_web3_js.PublicKey;
    creatorMeta: string;
    wager: bn_js;
    underlyingUsed: bn_js;
    bonusUsed: bn_js;
    creatorFee: bn_js;
    whiskyFee: bn_js;
    poolFee: bn_js;
    jackpotFee: bn_js;
    jackpotResult: bn_js;
    jackpotProbabilityUbps: bn_js;
    jackpotPayout: bn_js;
    clientSeed: string;
    bet: number[];
    result: number;
    points: boolean;
    pointsAuthority: _solana_web3_js.PublicKey;
    metadata: string;
    bump: number[];
} | null;
declare const decodePool: (info: AccountInfo<Buffer> | null) => {
    poolAuthority: _solana_web3_js.PublicKey;
    underlyingTokenMint: _solana_web3_js.PublicKey;
    lookupAddress: _solana_web3_js.PublicKey;
    antiSpamFeeExempt: boolean;
    minWager: bn_js;
    plays: bn_js;
    liquidityCheckpoint: bn_js;
    depositLimit: boolean;
    depositLimitAmount: bn_js;
    customPoolFee: boolean;
    customPoolFeeBps: bn_js;
    customWhiskyFee: boolean;
    customWhiskyFeeBps: bn_js;
    customMaxPayout: boolean;
    customMaxPayoutBps: bn_js;
    customBonusTokenMint: _solana_web3_js.PublicKey;
    customBonusToken: boolean;
    customMaxCreatorFee: boolean;
    customMaxCreatorFeeBps: bn_js;
    depositWhitelistRequired: boolean;
    depositWhitelistAddress: _solana_web3_js.PublicKey;
    bump: number[];
} | null;
declare const decodeWhiskyState: (info: AccountInfo<Buffer> | null) => {
    authority: _solana_web3_js.PublicKey;
    rngAddress: _solana_web3_js.PublicKey;
    rngAddress2: _solana_web3_js.PublicKey;
    antiSpamFee: bn_js;
    whiskyFeeBps: bn_js;
    poolCreationFee: bn_js;
    defaultPoolFee: bn_js;
    jackpotPayoutToUserBps: bn_js;
    jackpotPayoutToCreatorBps: bn_js;
    jackpotPayoutToPoolBps: bn_js;
    jackpotPayoutToWhiskyBps: bn_js;
    bonusToJackpotRatioBps: bn_js;
    maxHouseEdgeBps: bn_js;
    maxCreatorFeeBps: bn_js;
    maxPayoutBps: bn_js;
    poolWithdrawFeeBps: bn_js;
    poolCreationAllowed: boolean;
    poolDepositAllowed: boolean;
    poolWithdrawAllowed: boolean;
    playingAllowed: boolean;
    distributionRecipient: _solana_web3_js.PublicKey;
    bump: number[];
} | null;

type WhiskyTransaction<Event extends WhiskyEventType> = {
    signature: string;
    time: number;
    name: Event;
    data: WhiskyEvent<Event>['data'];
};
/**
 * Extracts events from transaction logs
 */
declare const parseTransactionEvents: (logs: string[]) => AnyWhiskyEvent[];
/**
 * Extracts events from a transaction
 */
declare const parseWhiskyTransaction: (transaction: ParsedTransactionWithMeta) => (WhiskyTransaction<"GameSettled"> | WhiskyTransaction<"PoolChange">)[];
declare function fetchWhiskyTransactionsFromSignatures(connection: Connection, signatures: string[]): Promise<(WhiskyTransaction<"GameSettled"> | WhiskyTransaction<"PoolChange">)[]>;
/**
 * Fetches recent Whisky events
 */
declare function fetchWhiskyTransactions(connection: Connection, address: PublicKey, options: SignaturesForAddressOptions): Promise<(WhiskyTransaction<"GameSettled"> | WhiskyTransaction<"PoolChange">)[]>;

declare const wrapSol: (from: PublicKey, amount: bigint | number, create: boolean) => Promise<_solana_web3_js.TransactionInstruction[]>;
declare const unwrapSol: (from: PublicKey) => Promise<_solana_web3_js.TransactionInstruction>;

declare const getPdaAddress: (...seeds: (Uint8Array | Buffer)[]) => PublicKey;
declare const getPoolAddress: (underlyingMint: PublicKey, authority?: PublicKey) => PublicKey;
declare const getWhiskyStateAddress: () => PublicKey;
declare const getPlayerAddress: (owner: PublicKey) => PublicKey;
declare const getGameAddress: (owner: PublicKey) => PublicKey;
declare const getPoolLpAddress: (pool: PublicKey) => PublicKey;
declare const getPoolBonusAddress: (pool: PublicKey) => PublicKey;
declare const getPoolUnderlyingTokenAccountAddress: (pool: PublicKey) => PublicKey;
declare const getPoolJackpotTokenAccountAddress: (pool: PublicKey) => PublicKey;
declare const getPoolBonusUnderlyingTokenAccountAddress: (pool: PublicKey) => PublicKey;
declare const getUserUnderlyingAta: (user: PublicKey, underlyingTokenMint: PublicKey) => PublicKey;
declare const getPlayerUnderlyingAta: (user: PublicKey, underlyingTokenMint: PublicKey) => PublicKey;
declare const getUserBonusAtaForPool: (user: PublicKey, pool: PublicKey) => PublicKey;
declare const getUserLpAtaForPool: (user: PublicKey, pool: PublicKey) => PublicKey;
declare const getPlayerBonusAtaForPool: (user: PublicKey, pool: PublicKey) => PublicKey;
declare const getUserWsolAccount: (user: PublicKey) => PublicKey;

declare const basisPoints: (percent: number) => number;
declare const isNativeMint: (pubkey: PublicKey) => boolean;
declare const hmac256: (secretKey: string, message: string) => Promise<string>;
declare const getGameHash: (rngSeed: string, clientSeed: string, nonce: number) => Promise<string>;
declare const getResultNumber: (rngSeed: string, clientSeed: string, nonce: number) => Promise<number>;
type GameResult = ReturnType<typeof parseResult>;
declare const parseResult: (state: GameState) => {
    creator: PublicKey;
    user: PublicKey;
    rngSeed: string;
    clientSeed: string;
    nonce: number;
    bet: number[];
    resultIndex: number;
    wager: number;
    payout: number;
    profit: number;
    multiplier: number;
    token: PublicKey;
    bonusUsed: number;
    jackpotWin: number;
};
declare function getNextResult(connection: Connection, user: PublicKey, prevNonce: number): Promise<{
    creator: PublicKey;
    user: PublicKey;
    rngSeed: string;
    clientSeed: string;
    nonce: number;
    bet: number[];
    resultIndex: number;
    wager: number;
    payout: number;
    profit: number;
    multiplier: number;
    token: PublicKey;
    bonusUsed: number;
    jackpotWin: number;
}>;

export { AnyWhiskyEvent, BPS_PER_WHOLE, DistributeFeesParams, GAME_SEED, GameResult, GameState, IDL, PLAYER_SEED, POOL_ATA_SEED, POOL_BONUS_MINT_SEED, POOL_BONUS_UNDERLYING_TA_SEED, POOL_JACKPOT_SEED, POOL_LP_MINT_SEED, POOL_SEED, PROGRAM_ID, PlayGameParams, PlayerState, PoolDepositParams, PoolState, PoolWithdrawParams, RngProvideHashedSeedParams, RngSettleParams, SYSTEM_PROGRAM, WHISKY_STATE_SEED, WhiskyClient, WhiskyCore, WhiskyEvent, WhiskyEventType, WhiskyProvider, WhiskyProviderWallet, WhiskySetConfigParams, WhiskyState, WhiskyTransaction, basisPoints, decodeAta, decodeGame, decodePlayer, decodePool, decodeWhiskyState, fetchWhiskyTransactions, fetchWhiskyTransactionsFromSignatures, getGameAddress, getGameHash, getNextResult, getPdaAddress, getPlayerAddress, getPlayerBonusAtaForPool, getPlayerUnderlyingAta, getPoolAddress, getPoolBonusAddress, getPoolBonusUnderlyingTokenAccountAddress, getPoolJackpotTokenAccountAddress, getPoolLpAddress, getPoolUnderlyingTokenAccountAddress, getResultNumber, getUserBonusAtaForPool, getUserLpAtaForPool, getUserUnderlyingAta, getUserWsolAccount, getWhiskyStateAddress, hmac256, isNativeMint, parseResult, parseTransactionEvents, parseWhiskyTransaction, unwrapSol, wrapSol };
