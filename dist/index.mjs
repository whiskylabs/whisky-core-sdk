// src/index.ts
import { NATIVE_MINT as NATIVE_MINT4 } from "@solana/spl-token";

// src/WhiskyProvider.ts
import * as anchor from "@coral-xyz/anchor";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync as getAssociatedTokenAddressSync2 } from "@solana/spl-token";
import { AddressLookupTableProgram, Keypair, PublicKey as PublicKey3, SystemProgram } from "@solana/web3.js";

// src/constants.ts
import { PublicKey } from "@solana/web3.js";
var PROGRAM_ID = new PublicKey("6R7S7r6KzU1A5YACXCaKuF6GcEcv5ZdXU4hh8vPozcw6");
var SYSTEM_PROGRAM = new PublicKey("11111111111111111111111111111111");
var BPS_PER_WHOLE = 1e4;
var GAME_SEED = "GAME";
var PLAYER_SEED = "PLAYER";
var POOL_SEED = "POOL";
var WHISKY_STATE_SEED = "WHISKY_STATE";
var POOL_ATA_SEED = "POOL_ATA";
var POOL_JACKPOT_SEED = "POOL_JACKPOT";
var POOL_BONUS_UNDERLYING_TA_SEED = "POOL_BONUS_UNDERLYING_TA";
var POOL_BONUS_MINT_SEED = "POOL_BONUS_MINT";
var POOL_LP_MINT_SEED = "POOL_LP_MINT";

// src/idl.ts
var IDL = {
  "version": "0.1.0",
  "name": "whisky_core",
  "instructions": [
    {
      "name": "whiskyInitialize",
      "docs": [
        "Initialize the global Whisky gaming protocol"
      ],
      "accounts": [
        {
          "name": "whiskyState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "whiskySetAuthority",
      "docs": [
        "Set protocol authority"
      ],
      "accounts": [
        {
          "name": "whiskyState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "authority",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "whiskySetConfig",
      "docs": [
        "Configure protocol settings"
      ],
      "accounts": [
        {
          "name": "whiskyState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "rngAddress",
          "type": "publicKey"
        },
        {
          "name": "whiskyFee",
          "type": "u64"
        },
        {
          "name": "maxCreatorFee",
          "type": "u64"
        },
        {
          "name": "poolCreationFee",
          "type": "u64"
        },
        {
          "name": "antiSpamFee",
          "type": "u64"
        },
        {
          "name": "maxHouseEdge",
          "type": "u64"
        },
        {
          "name": "defaultPoolFee",
          "type": "u64"
        },
        {
          "name": "jackpotPayoutToUserBps",
          "type": "u64"
        },
        {
          "name": "jackpotPayoutToCreatorBps",
          "type": "u64"
        },
        {
          "name": "jackpotPayoutToPoolBps",
          "type": "u64"
        },
        {
          "name": "jackpotPayoutToWhiskyBps",
          "type": "u64"
        },
        {
          "name": "bonusToJackpotRatioBps",
          "type": "u64"
        },
        {
          "name": "maxPayoutBps",
          "type": "u64"
        },
        {
          "name": "poolWithdrawFeeBps",
          "type": "u64"
        },
        {
          "name": "poolCreationAllowed",
          "type": "bool"
        },
        {
          "name": "poolDepositAllowed",
          "type": "bool"
        },
        {
          "name": "poolWithdrawAllowed",
          "type": "bool"
        },
        {
          "name": "playingAllowed",
          "type": "bool"
        },
        {
          "name": "distributionRecipient",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "poolInitialize",
      "docs": [
        "Initialize a gaming pool"
      ],
      "accounts": [
        {
          "name": "whiskyState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "underlyingTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolUnderlyingTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolJackpotTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "poolAuthority",
          "type": "publicKey"
        },
        {
          "name": "lookupAddress",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "poolDeposit",
      "docs": [
        "Deposit tokens to provide liquidity"
      ],
      "accounts": [
        {
          "name": "whiskyState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "underlyingTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolUnderlyingTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userUnderlyingAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userLpAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "poolWithdraw",
      "docs": [
        "Withdraw liquidity from pool"
      ],
      "accounts": [
        {
          "name": "whiskyState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "underlyingTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolUnderlyingTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userUnderlyingAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userLpAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "playerInitialize",
      "docs": [
        "Initialize player and game accounts"
      ],
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "game",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "playGame",
      "docs": [
        "Place a bet and start a game"
      ],
      "accounts": [
        {
          "name": "whiskyState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "game",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "underlyingTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolUnderlyingTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userUnderlyingAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "playerAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creator",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "wager",
          "type": "u64"
        },
        {
          "name": "bet",
          "type": {
            "vec": "u32"
          }
        },
        {
          "name": "clientSeed",
          "type": "string"
        },
        {
          "name": "creatorFeeBps",
          "type": "u32"
        },
        {
          "name": "jackpotFeeBps",
          "type": "u32"
        },
        {
          "name": "metadata",
          "type": "string"
        }
      ]
    },
    {
      "name": "playerClaim",
      "docs": [
        "Claim winnings after game settlement"
      ],
      "accounts": [
        {
          "name": "player",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "game",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "underlyingTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "playerAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userUnderlyingAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "playerClose",
      "docs": [
        "Close player account"
      ],
      "accounts": [
        {
          "name": "player",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "game",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "rngSettle",
      "docs": [
        "Settle game with RNG (called by RNG authority)"
      ],
      "accounts": [
        {
          "name": "whiskyState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "game",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolUnderlyingTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "poolJackpotTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "underlyingTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rng",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "rngSeed",
          "type": "string"
        },
        {
          "name": "nextRngSeedHashed",
          "type": "string"
        }
      ]
    },
    {
      "name": "rngProvideHashedSeed",
      "docs": [
        "Provide next RNG seed hash"
      ],
      "accounts": [
        {
          "name": "whiskyState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "game",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rng",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "nextRngSeedHashed",
          "type": "string"
        }
      ]
    },
    {
      "name": "distributeFees",
      "docs": [
        "Distribute protocol fees"
      ],
      "accounts": [
        {
          "name": "whiskyState",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "underlyingTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whiskyStateAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "distributionRecipientAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "nativeSol",
          "type": "bool"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "WhiskyState",
      "docs": [
        "Global protocol state account"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "Protocol authority (admin)"
            ],
            "type": "publicKey"
          },
          {
            "name": "rngAddress",
            "docs": [
              "RNG provider address"
            ],
            "type": "publicKey"
          },
          {
            "name": "rngAddress2",
            "docs": [
              "Secondary RNG provider address"
            ],
            "type": "publicKey"
          },
          {
            "name": "antiSpamFee",
            "docs": [
              "Anti-spam fee amount"
            ],
            "type": "u64"
          },
          {
            "name": "whiskyFeeBps",
            "docs": [
              "Protocol fee in basis points"
            ],
            "type": "u64"
          },
          {
            "name": "poolCreationFee",
            "docs": [
              "Pool creation fee"
            ],
            "type": "u64"
          },
          {
            "name": "defaultPoolFee",
            "docs": [
              "Default pool fee in basis points"
            ],
            "type": "u64"
          },
          {
            "name": "jackpotPayoutToUserBps",
            "docs": [
              "Jackpot payout to user (BPS)"
            ],
            "type": "u64"
          },
          {
            "name": "jackpotPayoutToCreatorBps",
            "docs": [
              "Jackpot payout to creator (BPS)"
            ],
            "type": "u64"
          },
          {
            "name": "jackpotPayoutToPoolBps",
            "docs": [
              "Jackpot payout to pool (BPS)"
            ],
            "type": "u64"
          },
          {
            "name": "jackpotPayoutToWhiskyBps",
            "docs": [
              "Jackpot payout to protocol (BPS)"
            ],
            "type": "u64"
          },
          {
            "name": "bonusToJackpotRatioBps",
            "docs": [
              "Bonus to jackpot ratio (BPS)"
            ],
            "type": "u64"
          },
          {
            "name": "maxHouseEdgeBps",
            "docs": [
              "Maximum house edge allowed (BPS)"
            ],
            "type": "u64"
          },
          {
            "name": "maxCreatorFeeBps",
            "docs": [
              "Maximum creator fee allowed (BPS)"
            ],
            "type": "u64"
          },
          {
            "name": "maxPayoutBps",
            "docs": [
              "Maximum payout percentage (BPS)"
            ],
            "type": "u64"
          },
          {
            "name": "poolWithdrawFeeBps",
            "docs": [
              "Pool withdrawal fee (BPS)"
            ],
            "type": "u64"
          },
          {
            "name": "poolCreationAllowed",
            "docs": [
              "Whether pool creation is allowed"
            ],
            "type": "bool"
          },
          {
            "name": "poolDepositAllowed",
            "docs": [
              "Whether pool deposits are allowed"
            ],
            "type": "bool"
          },
          {
            "name": "poolWithdrawAllowed",
            "docs": [
              "Whether pool withdrawals are allowed"
            ],
            "type": "bool"
          },
          {
            "name": "playingAllowed",
            "docs": [
              "Whether playing games is allowed"
            ],
            "type": "bool"
          },
          {
            "name": "distributionRecipient",
            "docs": [
              "Fee distribution recipient"
            ],
            "type": "publicKey"
          },
          {
            "name": "bump",
            "docs": [
              "PDA bump seed"
            ],
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          }
        ]
      }
    },
    {
      "name": "Pool",
      "docs": [
        "Gaming pool account"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "poolAuthority",
            "docs": [
              "Pool authority (creator)"
            ],
            "type": "publicKey"
          },
          {
            "name": "underlyingTokenMint",
            "docs": [
              "Underlying token mint"
            ],
            "type": "publicKey"
          },
          {
            "name": "lookupAddress",
            "docs": [
              "Pool lookup address for identification"
            ],
            "type": "publicKey"
          },
          {
            "name": "antiSpamFeeExempt",
            "docs": [
              "Anti-spam fee exemption"
            ],
            "type": "bool"
          },
          {
            "name": "minWager",
            "docs": [
              "Minimum wager amount"
            ],
            "type": "u64"
          },
          {
            "name": "plays",
            "docs": [
              "Number of games played"
            ],
            "type": "u64"
          },
          {
            "name": "liquidityCheckpoint",
            "docs": [
              "Liquidity checkpoint"
            ],
            "type": "u64"
          },
          {
            "name": "depositLimit",
            "docs": [
              "Whether deposit limit is enabled"
            ],
            "type": "bool"
          },
          {
            "name": "depositLimitAmount",
            "docs": [
              "Deposit limit amount"
            ],
            "type": "u64"
          },
          {
            "name": "customPoolFee",
            "docs": [
              "Whether custom pool fee is enabled"
            ],
            "type": "bool"
          },
          {
            "name": "customPoolFeeBps",
            "docs": [
              "Custom pool fee in BPS"
            ],
            "type": "u64"
          },
          {
            "name": "customWhiskyFee",
            "docs": [
              "Whether custom whisky fee is enabled"
            ],
            "type": "bool"
          },
          {
            "name": "customWhiskyFeeBps",
            "docs": [
              "Custom whisky fee in BPS"
            ],
            "type": "u64"
          },
          {
            "name": "customMaxPayout",
            "docs": [
              "Whether custom max payout is enabled"
            ],
            "type": "bool"
          },
          {
            "name": "customMaxPayoutBps",
            "docs": [
              "Custom max payout in BPS"
            ],
            "type": "u64"
          },
          {
            "name": "customBonusTokenMint",
            "docs": [
              "Custom bonus token mint"
            ],
            "type": "publicKey"
          },
          {
            "name": "customBonusToken",
            "docs": [
              "Whether custom bonus token is enabled"
            ],
            "type": "bool"
          },
          {
            "name": "customMaxCreatorFee",
            "docs": [
              "Whether custom max creator fee is enabled"
            ],
            "type": "bool"
          },
          {
            "name": "customMaxCreatorFeeBps",
            "docs": [
              "Custom max creator fee in BPS"
            ],
            "type": "u64"
          },
          {
            "name": "depositWhitelistRequired",
            "docs": [
              "Whether deposit whitelist is required"
            ],
            "type": "bool"
          },
          {
            "name": "depositWhitelistAddress",
            "docs": [
              "Deposit whitelist address"
            ],
            "type": "publicKey"
          },
          {
            "name": "bump",
            "docs": [
              "PDA bump seed"
            ],
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          }
        ]
      }
    },
    {
      "name": "Player",
      "docs": [
        "Player account for managing game state"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "docs": [
              "Player's wallet address"
            ],
            "type": "publicKey"
          },
          {
            "name": "nonce",
            "docs": [
              "Current nonce for game sequence"
            ],
            "type": "u64"
          },
          {
            "name": "bump",
            "docs": [
              "PDA bump seed"
            ],
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          }
        ]
      }
    },
    {
      "name": "Game",
      "docs": [
        "Individual game account"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nonce",
            "docs": [
              "Game nonce"
            ],
            "type": "u64"
          },
          {
            "name": "user",
            "docs": [
              "Player's wallet address"
            ],
            "type": "publicKey"
          },
          {
            "name": "tokenMint",
            "docs": [
              "Token mint used for the game"
            ],
            "type": "publicKey"
          },
          {
            "name": "pool",
            "docs": [
              "Pool used for the game"
            ],
            "type": "publicKey"
          },
          {
            "name": "status",
            "docs": [
              "Current game status"
            ],
            "type": {
              "defined": "GameStatus"
            }
          },
          {
            "name": "nextRngSeedHashed",
            "docs": [
              "Next RNG seed hash (for verification)"
            ],
            "type": "string"
          },
          {
            "name": "rngSeed",
            "docs": [
              "RNG seed used for this game"
            ],
            "type": "string"
          },
          {
            "name": "timestamp",
            "docs": [
              "Game timestamp"
            ],
            "type": "i64"
          },
          {
            "name": "creator",
            "docs": [
              "Game creator address"
            ],
            "type": "publicKey"
          },
          {
            "name": "creatorMeta",
            "docs": [
              "Creator metadata"
            ],
            "type": "string"
          },
          {
            "name": "wager",
            "docs": [
              "Wager amount"
            ],
            "type": "u64"
          },
          {
            "name": "underlyingUsed",
            "docs": [
              "Underlying tokens used"
            ],
            "type": "u64"
          },
          {
            "name": "bonusUsed",
            "docs": [
              "Bonus tokens used"
            ],
            "type": "u64"
          },
          {
            "name": "creatorFee",
            "docs": [
              "Creator fee amount"
            ],
            "type": "u64"
          },
          {
            "name": "whiskyFee",
            "docs": [
              "Protocol fee amount"
            ],
            "type": "u64"
          },
          {
            "name": "poolFee",
            "docs": [
              "Pool fee amount"
            ],
            "type": "u64"
          },
          {
            "name": "jackpotFee",
            "docs": [
              "Jackpot fee amount"
            ],
            "type": "u64"
          },
          {
            "name": "jackpotResult",
            "docs": [
              "Jackpot result (0 or 1)"
            ],
            "type": "u64"
          },
          {
            "name": "jackpotProbabilityUbps",
            "docs": [
              "Jackpot probability in micro basis points"
            ],
            "type": "u64"
          },
          {
            "name": "jackpotPayout",
            "docs": [
              "Jackpot payout amount"
            ],
            "type": "u64"
          },
          {
            "name": "clientSeed",
            "docs": [
              "Client seed provided by player"
            ],
            "type": "string"
          },
          {
            "name": "bet",
            "docs": [
              "Bet configuration (weights for each outcome)"
            ],
            "type": {
              "vec": "u32"
            }
          },
          {
            "name": "result",
            "docs": [
              "Game result index"
            ],
            "type": "u32"
          },
          {
            "name": "points",
            "docs": [
              "Whether points are enabled"
            ],
            "type": "bool"
          },
          {
            "name": "pointsAuthority",
            "docs": [
              "Points authority"
            ],
            "type": "publicKey"
          },
          {
            "name": "metadata",
            "docs": [
              "Game metadata"
            ],
            "type": "string"
          },
          {
            "name": "bump",
            "docs": [
              "PDA bump seed"
            ],
            "type": {
              "array": [
                "u8",
                1
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "WhiskyStateError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "PoolCreationNotAllowed"
          },
          {
            "name": "DepositNotAllowed"
          },
          {
            "name": "WithdrawalNotAllowed"
          },
          {
            "name": "PlaysNotAllowed"
          },
          {
            "name": "InvalidFeeConfiguration"
          },
          {
            "name": "FeatureDisabled"
          },
          {
            "name": "ConfigurationOutOfBounds"
          },
          {
            "name": "InvalidAuthority"
          },
          {
            "name": "ProtocolPaused"
          },
          {
            "name": "InvalidParameter"
          }
        ]
      }
    },
    {
      "name": "PlayerError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "NotReadyToPlay"
          },
          {
            "name": "GameInProgress"
          },
          {
            "name": "InvalidNonce"
          },
          {
            "name": "PlayerNotFound"
          },
          {
            "name": "GameNotFound"
          },
          {
            "name": "InvalidGameState"
          },
          {
            "name": "CannotClaim"
          },
          {
            "name": "NoWinningsToClaim"
          },
          {
            "name": "PlayerNotInitialized"
          },
          {
            "name": "PlayerAlreadyInitialized"
          },
          {
            "name": "InvalidPlayerState"
          },
          {
            "name": "AntiSpamFeeRequired"
          },
          {
            "name": "NonceMismatch"
          }
        ]
      }
    },
    {
      "name": "RngError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "InvalidRngAuthority"
          },
          {
            "name": "ResultNotRequested"
          },
          {
            "name": "ResultAlreadyProvided"
          },
          {
            "name": "InvalidRngSeed"
          },
          {
            "name": "SeedHashMismatch"
          },
          {
            "name": "RngTimeout"
          },
          {
            "name": "InvalidClientSeed"
          },
          {
            "name": "InvalidRngProvider"
          },
          {
            "name": "HashVerificationFailed"
          },
          {
            "name": "DuplicateSettlement"
          }
        ]
      }
    },
    {
      "name": "GameError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "TooFewOutcomes"
          },
          {
            "name": "TooManyOutcomes"
          },
          {
            "name": "InvalidBetWeights"
          },
          {
            "name": "WagerTooLow"
          },
          {
            "name": "InvalidHouseEdge"
          },
          {
            "name": "MaxPayoutExceeded"
          },
          {
            "name": "InvalidMultiplier"
          },
          {
            "name": "GameNotSettled"
          },
          {
            "name": "InvalidBetConfiguration"
          },
          {
            "name": "InvalidBetParameters"
          },
          {
            "name": "HouseEdgeTooHigh"
          },
          {
            "name": "WagerTooHigh"
          },
          {
            "name": "InvalidGameState"
          },
          {
            "name": "InvalidGameResult"
          },
          {
            "name": "RngSettlementFailed"
          },
          {
            "name": "CreatorFeeTooHigh"
          },
          {
            "name": "InvalidJackpotConfiguration"
          },
          {
            "name": "InvalidMetadata"
          }
        ]
      }
    },
    {
      "name": "PoolError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "PoolNotFound"
          },
          {
            "name": "InsufficientLiquidity"
          },
          {
            "name": "InvalidPoolAuthority"
          },
          {
            "name": "DepositLimitExceeded"
          },
          {
            "name": "InvalidWithdrawalAmount"
          },
          {
            "name": "PoolPaused"
          },
          {
            "name": "PoolNotInitialized"
          },
          {
            "name": "InvalidTokenMint"
          },
          {
            "name": "InvalidLPTokenCalculation"
          },
          {
            "name": "WhitelistCheckFailed"
          },
          {
            "name": "CustomFeeOutOfBounds"
          },
          {
            "name": "WithdrawalLimitExceeded"
          }
        ]
      }
    },
    {
      "name": "GameStatus",
      "docs": [
        "Game status enumeration"
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "None"
          },
          {
            "name": "ResultRequested"
          },
          {
            "name": "Ready"
          }
        ]
      }
    },
    {
      "name": "PoolAction",
      "docs": [
        "Pool action types for events"
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Deposit"
          },
          {
            "name": "Withdraw"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "PoolChange",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "pool",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tokenMint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "action",
          "type": {
            "defined": "PoolAction"
          },
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "postLiquidity",
          "type": "u64",
          "index": false
        },
        {
          "name": "lpSupply",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "GameSettled",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "pool",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tokenMint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "creator",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "creatorFee",
          "type": "u64",
          "index": false
        },
        {
          "name": "whiskyFee",
          "type": "u64",
          "index": false
        },
        {
          "name": "poolFee",
          "type": "u64",
          "index": false
        },
        {
          "name": "jackpotFee",
          "type": "u64",
          "index": false
        },
        {
          "name": "underlyingUsed",
          "type": "u64",
          "index": false
        },
        {
          "name": "bonusUsed",
          "type": "u64",
          "index": false
        },
        {
          "name": "wager",
          "type": "u64",
          "index": false
        },
        {
          "name": "payout",
          "type": "u64",
          "index": false
        },
        {
          "name": "multiplierBps",
          "type": "u32",
          "index": false
        },
        {
          "name": "payoutFromBonusPool",
          "type": "u64",
          "index": false
        },
        {
          "name": "payoutFromNormalPool",
          "type": "u64",
          "index": false
        },
        {
          "name": "jackpotProbabilityUbps",
          "type": "u64",
          "index": false
        },
        {
          "name": "jackpotResult",
          "type": "u64",
          "index": false
        },
        {
          "name": "nonce",
          "type": "u64",
          "index": false
        },
        {
          "name": "clientSeed",
          "type": "string",
          "index": false
        },
        {
          "name": "resultIndex",
          "type": "u32",
          "index": false
        },
        {
          "name": "bet",
          "type": {
            "vec": "u32"
          },
          "index": false
        },
        {
          "name": "jackpotPayoutToUser",
          "type": "u64",
          "index": false
        },
        {
          "name": "poolLiquidity",
          "type": "u64",
          "index": false
        },
        {
          "name": "rngSeed",
          "type": "string",
          "index": false
        },
        {
          "name": "nextRngSeedHashed",
          "type": "string",
          "index": false
        },
        {
          "name": "metadata",
          "type": "string",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6e3,
      "name": "Unauthorized",
      "msg": "Unauthorized access"
    },
    {
      "code": 6001,
      "name": "InvalidAmount",
      "msg": "Invalid amount"
    },
    {
      "code": 6002,
      "name": "InsufficientFunds",
      "msg": "Insufficient funds"
    },
    {
      "code": 6003,
      "name": "InvalidConfiguration",
      "msg": "Invalid configuration"
    },
    {
      "code": 6004,
      "name": "OperationNotAllowed",
      "msg": "Operation not allowed"
    },
    {
      "code": 6005,
      "name": "InvalidProgramState",
      "msg": "Invalid program state"
    },
    {
      "code": 6006,
      "name": "MathOverflow",
      "msg": "Math overflow"
    },
    {
      "code": 6007,
      "name": "InvalidAccount",
      "msg": "Invalid account"
    },
    {
      "code": 6008,
      "name": "AlreadyInitialized",
      "msg": "Account already initialized"
    },
    {
      "code": 6009,
      "name": "NotInitialized",
      "msg": "Account not initialized"
    },
    {
      "code": 6010,
      "name": "InvalidInstruction",
      "msg": "Invalid instruction"
    },
    {
      "code": 6011,
      "name": "InvalidMint",
      "msg": "Invalid mint"
    },
    {
      "code": 6012,
      "name": "TokenTransferFailed",
      "msg": "Token transfer failed"
    },
    {
      "code": 6013,
      "name": "InvalidSignature",
      "msg": "Invalid signature"
    },
    {
      "code": 6014,
      "name": "CalculationError",
      "msg": "Calculation error"
    },
    {
      "code": 6015,
      "name": "AccountNotInitialized",
      "msg": "Account not initialized"
    },
    {
      "code": 6016,
      "name": "AccountAlreadyInitialized",
      "msg": "Account already initialized"
    },
    {
      "code": 6017,
      "name": "InsufficientBalance",
      "msg": "Insufficient balance"
    }
  ],
  "metadata": {
    "address": "6R7S7r6KzU1A5YACXCaKuF6GcEcv5ZdXU4hh8vPozcw6"
  }
};

// src/pdas.ts
import { NATIVE_MINT, getAssociatedTokenAddressSync } from "@solana/spl-token";
import { PublicKey as PublicKey2 } from "@solana/web3.js";
var getPdaAddress = (...seeds) => {
  const [address] = PublicKey2.findProgramAddressSync(seeds, PROGRAM_ID);
  return address;
};
var getPoolAddress = (underlyingMint, authority = new PublicKey2("11111111111111111111111111111111")) => getPdaAddress(
  Buffer.from(POOL_SEED),
  underlyingMint.toBytes(),
  authority.toBytes()
);
var getWhiskyStateAddress = () => getPdaAddress(
  Buffer.from(WHISKY_STATE_SEED)
);
var getPlayerAddress = (owner) => getPdaAddress(
  Buffer.from(PLAYER_SEED),
  owner.toBytes()
);
var getGameAddress = (owner) => getPdaAddress(
  Buffer.from(GAME_SEED),
  owner.toBytes()
);
var getPoolLpAddress = (pool) => getPdaAddress(
  Buffer.from(POOL_LP_MINT_SEED),
  pool.toBytes()
);
var getPoolBonusAddress = (pool) => getPdaAddress(
  Buffer.from(POOL_BONUS_MINT_SEED),
  pool.toBytes()
);
var getPoolUnderlyingTokenAccountAddress = (pool) => getPdaAddress(
  Buffer.from(POOL_ATA_SEED),
  pool.toBytes()
);
var getPoolJackpotTokenAccountAddress = (pool) => getPdaAddress(
  Buffer.from(POOL_JACKPOT_SEED),
  pool.toBytes()
);
var getPoolBonusUnderlyingTokenAccountAddress = (pool) => getPdaAddress(
  Buffer.from(POOL_BONUS_UNDERLYING_TA_SEED),
  pool.toBytes()
);
var getUserUnderlyingAta = (user, underlyingTokenMint) => getAssociatedTokenAddressSync(
  underlyingTokenMint,
  user
);
var getPlayerUnderlyingAta = (user, underlyingTokenMint) => getAssociatedTokenAddressSync(
  underlyingTokenMint,
  getPlayerAddress(user),
  true
);
var getUserBonusAtaForPool = (user, pool) => getAssociatedTokenAddressSync(
  getPoolBonusAddress(pool),
  user
);
var getUserLpAtaForPool = (user, pool) => getAssociatedTokenAddressSync(
  getPoolLpAddress(pool),
  user
);
var getPlayerBonusAtaForPool = (user, pool) => getAssociatedTokenAddressSync(
  getPoolBonusAddress(pool),
  getPlayerAddress(user),
  true
);
var getUserWsolAccount = (user) => {
  return getAssociatedTokenAddressSync(NATIVE_MINT, user, true);
};

// src/utils.ts
import { NATIVE_MINT as NATIVE_MINT2 } from "@solana/spl-token";

// src/decoders.ts
import { BorshAccountsCoder } from "@coral-xyz/anchor";
import { AccountLayout } from "@solana/spl-token";
var accountsCoder = new BorshAccountsCoder(IDL);
var decodeAccount = (accountName, info) => {
  if (!info?.data?.length)
    return null;
  return accountsCoder.decode(accountName, info.data);
};
var decodeAta = (acc) => {
  if (!acc)
    return null;
  return AccountLayout.decode(acc.data);
};
var makeDecoder = (accountName) => {
  return (info) => {
    return decodeAccount(accountName, info);
  };
};
var decodePlayer = makeDecoder("Player");
var decodeGame = makeDecoder("Game");
var decodePool = makeDecoder("Pool");
var decodeWhiskyState = makeDecoder("WhiskyState");

// src/utils.ts
var basisPoints = (percent) => {
  return Math.round(percent * BPS_PER_WHOLE);
};
var isNativeMint = (pubkey) => NATIVE_MINT2.equals(pubkey);
var hmac256 = async (secretKey, message) => {
  const encoder = new TextEncoder();
  const messageUint8Array = encoder.encode(message);
  const keyUint8Array = encoder.encode(secretKey);
  const cryptoKey = await crypto.subtle.importKey("raw", keyUint8Array, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageUint8Array);
  return Array.from(new Uint8Array(signature)).map((b) => b.toString(16).padStart(2, "0")).join("");
};
var getGameHash = (rngSeed, clientSeed, nonce) => {
  return hmac256(rngSeed, [clientSeed, nonce].join("-"));
};
var getResultNumber = async (rngSeed, clientSeed, nonce) => {
  const hash = await getGameHash(rngSeed, clientSeed, nonce);
  return parseInt(hash.substring(0, 5), 16);
};
var parseResult = (state) => {
  const clientSeed = state.clientSeed;
  const bet = state.bet.map((x) => x / BPS_PER_WHOLE);
  const nonce = state.nonce.toNumber() - 1;
  const rngSeed = state.rngSeed;
  const resultIndex = state.result;
  const multiplier = bet[resultIndex];
  const wager = state.wager.toNumber();
  const payout = wager * multiplier;
  const profit = payout - wager;
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
    jackpotWin: state.jackpotPayout.toNumber()
  };
};
async function getNextResult(connection, user, prevNonce) {
  return new Promise((resolve, reject) => {
    if (!connection || !connection.onAccountChange) {
      return reject("Connection not available or missing onAccountChange method");
    }
    let listener;
    try {
      listener = connection.onAccountChange(
        getGameAddress(user),
        async (account) => {
          const current = decodeGame(account);
          if (!current) {
            if (listener !== void 0 && connection?.removeAccountChangeListener) {
              connection.removeAccountChangeListener(listener);
            }
            return reject("Game account was closed");
          }
          if (current.nonce.toNumber() === prevNonce + 1) {
            if (listener !== void 0 && connection?.removeAccountChangeListener) {
              connection.removeAccountChangeListener(listener);
            }
            const result = await parseResult(current);
            return resolve(result);
          }
        }
      );
    } catch (error) {
      return reject(`Error setting up account change listener: ${error}`);
    }
  });
}

// src/WhiskyProvider.ts
var WhiskyProvider = class _WhiskyProvider {
  constructor(connection, walletOrKeypair, opts = anchor.AnchorProvider.defaultOptions()) {
    const wallet = walletOrKeypair instanceof Keypair ? new NodeWallet(walletOrKeypair) : walletOrKeypair;
    this.anchorProvider = new anchor.AnchorProvider(
      connection,
      wallet,
      opts
    );
    this.whiskyProgram = new anchor.Program(IDL, PROGRAM_ID, this.anchorProvider);
    this.wallet = wallet;
  }
  static fromAnchorProvider(provider) {
    const whiskyProvider = new _WhiskyProvider(
      provider.connection,
      provider.wallet,
      provider.opts
    );
    return whiskyProvider;
  }
  get user() {
    return this.wallet.publicKey;
  }
  /**
   * Creates a pool for the specified token with address lookup table
   * @param underlyingTokenMint The token to use for the pool
   * @param authority The authority for the pool
   * @param slot The slot to use for the lookup table instruction
   * @returns Multiple TransactionInstruction in an array
   */
  createPool(underlyingTokenMint, authority, slot) {
    const whiskyStateAta = getAssociatedTokenAddressSync2(
      underlyingTokenMint,
      getWhiskyStateAddress(),
      true
    );
    const pool = getPoolAddress(underlyingTokenMint, authority);
    const lpMint = getPoolLpAddress(pool);
    const poolUnderlyingTokenAccount = getPoolUnderlyingTokenAccountAddress(pool);
    const poolJackpotTokenAccount = PublicKey3.findProgramAddressSync([Buffer.from("POOL_JACKPOT"), pool.toBuffer()], PROGRAM_ID)[0];
    const [lookupTableInst, lookupTableAddress] = AddressLookupTableProgram.createLookupTable({
      authority: this.wallet.publicKey,
      payer: this.wallet.publicKey,
      recentSlot: slot - 1
    });
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
        lpMint
      ]
    });
    const freezeInstruction = AddressLookupTableProgram.freezeLookupTable({
      authority: this.wallet.publicKey,
      lookupTable: lookupTableAddress
    });
    const createPoolInstruction = this.whiskyProgram.methods.poolInitialize(authority, lookupTableAddress).accounts({
      whiskyState: getWhiskyStateAddress(),
      pool,
      underlyingTokenMint,
      poolAuthority: authority,
      lpMint,
      poolUnderlyingTokenAccount,
      poolJackpotTokenAccount,
      user: this.wallet.publicKey,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId
    }).instruction();
    return [lookupTableInst, addAddressesInstruction, freezeInstruction, createPoolInstruction];
  }
  /**
   *
   * @param pool The pool to deposit to
   * @param underlyingTokenMint Token to deposit (Has to be the same as pool.underlyingTokenMint)
   * @param amount Amount of tokens to deposit
   */
  depositToPool(pool, underlyingTokenMint, amount) {
    const poolUnderlyingTokenAccount = getPoolUnderlyingTokenAccountAddress(pool);
    const poolLpMint = getPoolLpAddress(pool);
    const userUnderlyingAta = getAssociatedTokenAddressSync2(
      underlyingTokenMint,
      this.wallet.publicKey
    );
    const userLpAta = getAssociatedTokenAddressSync2(
      poolLpMint,
      this.wallet.publicKey
    );
    return this.whiskyProgram.methods.poolDeposit(new anchor.BN(amount)).accounts({
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
      systemProgram: SystemProgram.programId
    }).instruction();
  }
  /**
   *
   * @param pool The pool to withdraw from
   * @param underlyingTokenMint Token to withdraw (Has to be the same as pool.underlyingTokenMint)
   * @param amount Amount of tokens to withdraw
   */
  withdrawFromPool(pool, underlyingTokenMint, amount) {
    const poolUnderlyingTokenAccount = getPoolUnderlyingTokenAccountAddress(pool);
    const poolLpMint = getPoolLpAddress(pool);
    const userUnderlyingAta = getAssociatedTokenAddressSync2(
      underlyingTokenMint,
      this.wallet.publicKey
    );
    const userLpAta = getAssociatedTokenAddressSync2(
      poolLpMint,
      this.wallet.publicKey
    );
    return this.whiskyProgram.methods.poolWithdraw(new anchor.BN(amount)).accounts({
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
      systemProgram: SystemProgram.programId
    }).instruction();
  }
  /**
   * Initializes an associated Player account for the connected wallet
   */
  createPlayer() {
    return this.whiskyProgram.methods.playerInitialize().accounts({
      player: getPlayerAddress(this.user),
      game: getGameAddress(this.user),
      user: this.user,
      systemProgram: SystemProgram.programId
    }).instruction();
  }
  /**
   * Closes the associated Player account for the connected wallet
   */
  closePlayer() {
    const gameAddress = getGameAddress(this.user);
    return this.whiskyProgram.methods.playerClose().accounts({
      player: getPlayerAddress(this.user),
      game: gameAddress,
      user: this.user
    }).instruction();
  }
  play(wager, bet, clientSeed, pool, underlyingTokenMint, creator, creatorFee, jackpotFee, metadata) {
    const player = getPlayerAddress(this.user);
    const game = getGameAddress(this.user);
    const userUnderlyingAta = getAssociatedTokenAddressSync2(
      underlyingTokenMint,
      this.user
    );
    const playerAta = getAssociatedTokenAddressSync2(
      underlyingTokenMint,
      player,
      true
    );
    const poolUnderlyingTokenAccount = getPoolUnderlyingTokenAccountAddress(pool);
    return this.whiskyProgram.methods.playGame(
      new anchor.BN(wager),
      bet.map(basisPoints),
      clientSeed,
      basisPoints(creatorFee),
      basisPoints(jackpotFee),
      metadata
    ).accounts({
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
      systemProgram: SystemProgram.programId
    }).instruction();
  }
  /**
   * Claim winnings after game settlement
   */
  claimWinnings() {
    const player = getPlayerAddress(this.user);
    const game = getGameAddress(this.user);
    return this.whiskyProgram.methods.playerClaim().accounts({
      player,
      game,
      user: this.user
    }).instruction();
  }
  /**
   * RNG Settlement - Critical function for game resolution
   * @param gameUser The user whose game needs to be settled
   * @param rngSeed The RNG seed for settlement
   * @param nextRngSeedHashed The next hashed RNG seed
   * @param pool The pool address
   * @param underlyingTokenMint The token mint
   */
  rngSettle(gameUser, rngSeed, nextRngSeedHashed, pool, underlyingTokenMint) {
    const game = getGameAddress(gameUser);
    const poolUnderlyingTokenAccount = getPoolUnderlyingTokenAccountAddress(pool);
    const poolJackpotTokenAccount = PublicKey3.findProgramAddressSync([Buffer.from("POOL_JACKPOT"), pool.toBuffer()], this.whiskyProgram.programId)[0];
    return this.whiskyProgram.methods.rngSettle(rngSeed, nextRngSeedHashed).accounts({
      whiskyState: getWhiskyStateAddress(),
      game,
      poolUnderlyingTokenAccount,
      poolJackpotTokenAccount,
      pool,
      underlyingTokenMint,
      rng: this.user
      // Assuming the current user is the RNG provider
    }).instruction();
  }
  /**
   * Provide hashed seed for RNG
   * @param gameUser The user whose game needs the seed
   * @param nextRngSeedHashed The next hashed RNG seed
   */
  rngProvideHashedSeed(gameUser, nextRngSeedHashed) {
    const game = getGameAddress(gameUser);
    return this.whiskyProgram.methods.rngProvideHashedSeed(nextRngSeedHashed).accounts({
      whiskyState: getWhiskyStateAddress(),
      game,
      rng: this.user
    }).instruction();
  }
  /**
   * Configure Whisky protocol settings (Admin only)
   */
  setWhiskyConfig(rngAddress, whiskyFee, maxCreatorFee, poolCreationFee, antiSpamFee, maxHouseEdge, defaultPoolFee, jackpotPayoutToUserBps, jackpotPayoutToCreatorBps, jackpotPayoutToPoolBps, jackpotPayoutToWhiskyBps, bonusToJackpotRatioBps, maxPayoutBps, poolWithdrawFeeBps, poolCreationAllowed, poolDepositAllowed, poolWithdrawAllowed, playingAllowed, distributionRecipient) {
    return this.whiskyProgram.methods.whiskySetConfig(
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
      distributionRecipient
    ).accounts({
      whiskyState: getWhiskyStateAddress(),
      authority: this.user
    }).instruction();
  }
  /**
   * Distribute accumulated fees (Admin only)
   * @param underlyingTokenMint The token to distribute
   * @param nativeSol Whether to distribute native SOL
   */
  distributeFees(underlyingTokenMint, nativeSol = false) {
    const whiskyState = getWhiskyStateAddress();
    const whiskyStateAta = getAssociatedTokenAddressSync2(
      underlyingTokenMint,
      whiskyState,
      true
    );
    const distributionRecipientAta = getAssociatedTokenAddressSync2(
      underlyingTokenMint,
      this.user
      // Placeholder - should be the actual distribution recipient
    );
    return this.whiskyProgram.methods.distributeFees(nativeSol).accounts({
      whiskyState,
      underlyingTokenMint,
      whiskyStateAta,
      distributionRecipientAta,
      authority: this.user,
      tokenProgram: TOKEN_PROGRAM_ID
    }).instruction();
  }
};

// src/client.ts
import { AnchorProvider as AnchorProvider2, Program as Program2, BN as BN2 } from "@coral-xyz/anchor";
import { SystemProgram as SystemProgram2 } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID2, ASSOCIATED_TOKEN_PROGRAM_ID as ASSOCIATED_TOKEN_PROGRAM_ID2, getAssociatedTokenAddress } from "@solana/spl-token";
var WhiskyClient = class _WhiskyClient {
  constructor(provider) {
    this.provider = provider;
    this.connection = provider.connection;
    this.program = new Program2(IDL, PROGRAM_ID, provider);
  }
  static create(connection, wallet) {
    const provider = new AnchorProvider2(connection, wallet, {});
    return new _WhiskyClient(provider);
  }
  // Protocol Management Functions
  async whiskyInitialize(initializer) {
    const whiskyState = getWhiskyStateAddress();
    const tx = await this.program.methods.whiskyInitialize().accounts({
      whiskyState,
      initializer: initializer.publicKey,
      systemProgram: SystemProgram2.programId
    }).signers([initializer]).rpc();
    return tx;
  }
  async whiskySetAuthority(authority, newAuthority) {
    const whiskyState = getWhiskyStateAddress();
    const tx = await this.program.methods.whiskySetAuthority(newAuthority).accounts({
      whiskyState,
      authority
    }).rpc();
    return tx;
  }
  async whiskySetConfig(params) {
    const whiskyState = getWhiskyStateAddress();
    const tx = await this.program.methods.whiskySetConfig(
      params.rngAddress,
      new BN2(params.whiskyFee),
      new BN2(params.maxCreatorFee),
      new BN2(params.poolCreationFee),
      new BN2(params.antiSpamFee),
      new BN2(params.maxHouseEdge),
      new BN2(params.defaultPoolFee),
      new BN2(params.jackpotPayoutToUserBps),
      new BN2(params.jackpotPayoutToCreatorBps),
      new BN2(params.jackpotPayoutToPoolBps),
      new BN2(params.jackpotPayoutToWhiskyBps),
      new BN2(params.bonusToJackpotRatioBps),
      new BN2(params.maxPayoutBps),
      new BN2(params.poolWithdrawFeeBps),
      params.poolCreationAllowed,
      params.poolDepositAllowed,
      params.poolWithdrawAllowed,
      params.playingAllowed,
      params.distributionRecipient
    ).accounts({
      whiskyState,
      authority: params.authority
    }).rpc();
    return tx;
  }
  // Pool Management Functions
  async poolInitialize(user, underlyingTokenMint, poolAuthority, lookupAddress) {
    const whiskyState = getWhiskyStateAddress();
    const pool = getPoolAddress(underlyingTokenMint, poolAuthority);
    const lpMint = getPoolLpAddress(pool);
    const poolUnderlyingTokenAccount = getPoolUnderlyingTokenAccountAddress(pool);
    const poolJackpotTokenAccount = getPoolJackpotTokenAccountAddress(pool);
    const tx = await this.program.methods.poolInitialize(poolAuthority, lookupAddress).accounts({
      whiskyState,
      pool,
      underlyingTokenMint,
      poolAuthority,
      lpMint,
      poolUnderlyingTokenAccount,
      poolJackpotTokenAccount,
      user,
      tokenProgram: TOKEN_PROGRAM_ID2,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID2,
      systemProgram: SystemProgram2.programId
    }).rpc();
    return tx;
  }
  async poolDeposit(params) {
    const whiskyState = getWhiskyStateAddress();
    const pool = getPoolAddress(params.underlyingTokenMint, params.poolAuthority);
    const lpMint = getPoolLpAddress(pool);
    const poolUnderlyingTokenAccount = getPoolUnderlyingTokenAccountAddress(pool);
    const userUnderlyingAta = await getAssociatedTokenAddress(
      params.underlyingTokenMint,
      params.user
    );
    const userLpAta = await getAssociatedTokenAddress(lpMint, params.user);
    const tx = await this.program.methods.poolDeposit(new BN2(params.amount)).accounts({
      whiskyState,
      pool,
      underlyingTokenMint: params.underlyingTokenMint,
      lpMint,
      poolUnderlyingTokenAccount,
      userUnderlyingAta,
      userLpAta,
      user: params.user,
      tokenProgram: TOKEN_PROGRAM_ID2,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID2,
      systemProgram: SystemProgram2.programId
    }).rpc();
    return tx;
  }
  async poolWithdraw(params) {
    const whiskyState = getWhiskyStateAddress();
    const pool = getPoolAddress(params.underlyingTokenMint, params.poolAuthority);
    const lpMint = getPoolLpAddress(pool);
    const poolUnderlyingTokenAccount = getPoolUnderlyingTokenAccountAddress(pool);
    const userUnderlyingAta = await getAssociatedTokenAddress(
      params.underlyingTokenMint,
      params.user
    );
    const userLpAta = await getAssociatedTokenAddress(lpMint, params.user);
    const tx = await this.program.methods.poolWithdraw(new BN2(params.amount)).accounts({
      whiskyState,
      pool,
      underlyingTokenMint: params.underlyingTokenMint,
      lpMint,
      poolUnderlyingTokenAccount,
      userUnderlyingAta,
      userLpAta,
      user: params.user,
      tokenProgram: TOKEN_PROGRAM_ID2,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID2,
      systemProgram: SystemProgram2.programId
    }).rpc();
    return tx;
  }
  // Gaming Functions
  async playerInitialize(user, nonce = 0) {
    const player = getPlayerAddress(user);
    const game = getGameAddress(user);
    const tx = await this.program.methods.playerInitialize().accounts({
      player,
      game,
      user,
      systemProgram: SystemProgram2.programId
    }).rpc();
    return tx;
  }
  async playGame(params) {
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
    const tx = await this.program.methods.playGame(
      new BN2(params.wager),
      params.bet,
      params.clientSeed,
      params.creatorFeeBps,
      params.jackpotFeeBps,
      params.metadata
    ).accounts({
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
      tokenProgram: TOKEN_PROGRAM_ID2,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID2,
      systemProgram: SystemProgram2.programId
    }).rpc();
    return tx;
  }
  async playerClaim(user, underlyingTokenMint, nonce) {
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
    const tx = await this.program.methods.playerClaim().accounts({
      player,
      game,
      underlyingTokenMint,
      playerAta,
      userUnderlyingAta,
      user,
      tokenProgram: TOKEN_PROGRAM_ID2
    }).rpc();
    return tx;
  }
  async playerClose(user) {
    const player = getPlayerAddress(user);
    const game = getGameAddress(user);
    const tx = await this.program.methods.playerClose().accounts({
      player,
      game,
      user
    }).rpc();
    return tx;
  }
  // RNG Functions
  async rngSettle(params) {
    const whiskyState = getWhiskyStateAddress();
    const game = getGameAddress(params.user);
    const pool = getPoolAddress(params.underlyingTokenMint, params.poolAuthority);
    const poolUnderlyingTokenAccount = getPoolUnderlyingTokenAccountAddress(pool);
    const poolJackpotTokenAccount = getPoolJackpotTokenAccountAddress(pool);
    const tx = await this.program.methods.rngSettle(params.rngSeed, params.nextRngSeedHashed).accounts({
      whiskyState,
      game,
      poolUnderlyingTokenAccount,
      poolJackpotTokenAccount,
      pool,
      underlyingTokenMint: params.underlyingTokenMint,
      rng: params.rng
    }).rpc();
    return tx;
  }
  async rngProvideHashedSeed(params) {
    const whiskyState = getWhiskyStateAddress();
    const game = getGameAddress(params.user);
    const tx = await this.program.methods.rngProvideHashedSeed(params.nextRngSeedHashed).accounts({
      whiskyState,
      game,
      rng: params.rng
    }).rpc();
    return tx;
  }
  // Fee Distribution Functions
  async distributeFees(params) {
    const whiskyState = getWhiskyStateAddress();
    const whiskyStateAta = await getAssociatedTokenAddress(
      params.underlyingTokenMint,
      whiskyState
    );
    const whiskyStateAccount = await this.getWhiskyState();
    const distributionRecipientAta = await getAssociatedTokenAddress(
      params.underlyingTokenMint,
      whiskyStateAccount.distributionRecipient
    );
    const tx = await this.program.methods.distributeFees(params.nativeSol).accounts({
      whiskyState,
      underlyingTokenMint: params.underlyingTokenMint,
      whiskyStateAta,
      distributionRecipientAta,
      authority: params.authority,
      tokenProgram: TOKEN_PROGRAM_ID2
    }).rpc();
    return tx;
  }
  // Query Functions
  async getWhiskyState() {
    const whiskyState = getWhiskyStateAddress();
    const account = await this.program.account.WhiskyState.fetch(whiskyState);
    return account;
  }
  async getPool(underlyingTokenMint, poolAuthority) {
    const pool = getPoolAddress(underlyingTokenMint, poolAuthority);
    const account = await this.program.account.Pool.fetch(pool);
    return account;
  }
  async getPlayer(user) {
    const player = getPlayerAddress(user);
    const account = await this.program.account.Player.fetch(player);
    return account;
  }
  async getGame(user, nonce) {
    const game = getGameAddress(user);
    const account = await this.program.account.Game.fetch(game);
    return account;
  }
  // Utility Functions
  async getAllPools() {
    const pools = await this.program.account.Pool.all();
    return pools.map((pool) => pool.account);
  }
  async getPoolLiquidity(underlyingTokenMint, poolAuthority) {
    const pool = getPoolAddress(underlyingTokenMint, poolAuthority);
    const poolUnderlyingTokenAccount = getPoolUnderlyingTokenAccountAddress(pool);
    const tokenAccount = await this.connection.getTokenAccountBalance(poolUnderlyingTokenAccount);
    return tokenAccount.value.uiAmount || 0;
  }
  getProgramId() {
    return this.program.programId;
  }
};

// src/events.ts
import { BorshCoder, EventParser } from "@coral-xyz/anchor";
var eventParser = new EventParser(PROGRAM_ID, new BorshCoder(IDL));
var parseTransactionEvents = (logs) => {
  try {
    const parsedEvents = [];
    const events = eventParser.parseLogs(logs);
    for (const event of events) {
      parsedEvents.push(event);
    }
    return parsedEvents;
  } catch {
    return [];
  }
};
var parseWhiskyTransaction = (transaction) => {
  const logs = transaction.meta?.logMessages ?? [];
  const events = parseTransactionEvents(logs);
  return events.map((event) => {
    return {
      signature: transaction.transaction.signatures[0],
      time: (transaction.blockTime ?? 0) * 1e3,
      name: event.name,
      data: event.data
    };
  });
};
async function fetchWhiskyTransactionsFromSignatures(connection, signatures) {
  const transactions = (await connection.getParsedTransactions(
    signatures,
    {
      maxSupportedTransactionVersion: 0,
      commitment: "confirmed"
    }
  )).flatMap((x) => x ? [x] : []);
  return transactions.flatMap(parseWhiskyTransaction);
}
async function fetchWhiskyTransactions(connection, address, options) {
  const signatureInfo = await connection.getSignaturesForAddress(
    address,
    options,
    "confirmed"
  );
  const events = await fetchWhiskyTransactionsFromSignatures(connection, signatureInfo.map((x) => x.signature));
  return events;
}

// src/instructions.ts
import { NATIVE_MINT as NATIVE_MINT3, createAssociatedTokenAccountInstruction, createCloseAccountInstruction, createSyncNativeInstruction } from "@solana/spl-token";
import { SystemProgram as SystemProgram3 } from "@solana/web3.js";
var wrapSol = async (from, amount, create) => {
  const wsolAta = getUserWsolAccount(from);
  const instructions = [
    SystemProgram3.transfer({
      fromPubkey: from,
      toPubkey: wsolAta,
      lamports: amount
    }),
    createSyncNativeInstruction(wsolAta)
  ];
  if (create) {
    return [
      createAssociatedTokenAccountInstruction(
        from,
        wsolAta,
        from,
        NATIVE_MINT3
      ),
      ...instructions
    ];
  }
  return instructions;
};
var unwrapSol = async (from) => {
  const wsolAta = getUserWsolAccount(from);
  return createCloseAccountInstruction(
    wsolAta,
    from,
    from
  );
};
export {
  BPS_PER_WHOLE,
  GAME_SEED,
  IDL,
  NATIVE_MINT4 as NATIVE_MINT,
  PLAYER_SEED,
  POOL_ATA_SEED,
  POOL_BONUS_MINT_SEED,
  POOL_BONUS_UNDERLYING_TA_SEED,
  POOL_JACKPOT_SEED,
  POOL_LP_MINT_SEED,
  POOL_SEED,
  PROGRAM_ID,
  SYSTEM_PROGRAM,
  WHISKY_STATE_SEED,
  WhiskyClient,
  WhiskyProvider,
  basisPoints,
  decodeAta,
  decodeGame,
  decodePlayer,
  decodePool,
  decodeWhiskyState,
  fetchWhiskyTransactions,
  fetchWhiskyTransactionsFromSignatures,
  getGameAddress,
  getGameHash,
  getNextResult,
  getPdaAddress,
  getPlayerAddress,
  getPlayerBonusAtaForPool,
  getPlayerUnderlyingAta,
  getPoolAddress,
  getPoolBonusAddress,
  getPoolBonusUnderlyingTokenAccountAddress,
  getPoolJackpotTokenAccountAddress,
  getPoolLpAddress,
  getPoolUnderlyingTokenAccountAddress,
  getResultNumber,
  getUserBonusAtaForPool,
  getUserLpAtaForPool,
  getUserUnderlyingAta,
  getUserWsolAccount,
  getWhiskyStateAddress,
  hmac256,
  isNativeMint,
  parseResult,
  parseTransactionEvents,
  parseWhiskyTransaction,
  unwrapSol,
  wrapSol
};
