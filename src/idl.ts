export type WhiskyCore = {
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
      "code": 6000,
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
}

export const IDL: WhiskyCore = {
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
        "code": 6000,
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
  }
