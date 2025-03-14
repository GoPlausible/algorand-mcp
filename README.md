# Algorand MCP Implementation

## Overview
A Model Context Protocol (MCP) implementation for Algorand blockchain interactions. The implementation consists of:
- A client package for wallet management and transaction signing (supports both browser and Node.js)
- A server package for blockchain interactions (Node.js only)

## Features
- Complete Algorand blockchain interaction capabilities
- Extensive wallet management system
- Comprehensive transaction handling
- Rich blockchain state querying
- Built-in security features
- Support for Claude Desktop and Cursor integration

## Requirements
- Node.js v23.6.1 or later
- npm v10.2.4 or later

## Installation

```bash
# Install both client and server packages
npm install @algorand-mcp/client @algorand-mcp/server

# Or install individually
npm install @algorand-mcp/client  # For wallet and transaction signing
npm install @algorand-mcp/server  # For blockchain interactions
```

## Project Architecture

The project follows a modular architecture with two main packages:

1. **Client Package (`@algorand-mcp/client`)**
   - Handles wallet connections and transaction signing
   - Supports both local and external wallets
   - Universal compatibility (browser/Node.js)
   - Secure credential management

2. **Server Package (`@algorand-mcp/server`)**
   - Provides MCP tools and resources
   - Manages blockchain interactions
   - Handles transaction creation and submission
   - Offers comprehensive blockchain queries

## Project Structure

```
algorand-mcp/
├── packages/
│   ├── client/                    # Client Package
│   │   ├── src/
│   │   │   ├── index.ts          # Client entry point and wallet management
│   │   │   └── LocalWallet.ts    # Local wallet implementation
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── server/                    # Server Package
│       ├── src/
│       │   ├── resources/         # MCP Resources
│       │   │   ├── algod/        # Real-time blockchain state
│       │   │   └── indexer/      # Historical blockchain data
│       │   ├── tools/            # MCP Tools
│       │   │   ├── accountManager.ts     # Account operations
│       │   │   ├── algodManager.ts       # Node interactions
│       │   │   ├── utilityManager.ts     # Utility functions
│       │   │   └── transactionManager/   # Transaction handling
│       │   │       ├── accountTransactions.ts
│       │   │       ├── assetTransactions.ts
│       │   │       ├── generalTransaction.ts
│       │   │       └── appTransactions/
│       │   ├── env.ts            # Environment configuration
│       │   └── index.ts          # Server entry point
│       ├── package.json
│       └── tsconfig.json
├── package.json                   # Root package file
└── tsconfig.json                 # Root TypeScript config
```

## Core Functionalities

### Client Features
- Local wallet with secure storage
- External wallet support (Pera, Defly, Daffi)
- Transaction signing
- Session management
- Universal ES module support

### Server Features
- Account management
- Asset operations
- Application interactions
- Transaction creation and submission
- Blockchain state queries
- Comprehensive utility functions

## Available Tools and Resources

The Algorand MCP implementation provides 100+ tools and resources for blockchain interaction. For detailed documentation and usage instructions, please refer to the server package README.

### Available Tools (40)

#### Account Management Tools
- create_account
- rekey_account
- mnemonic_to_mdk
- mdk_to_mnemonic
- secret_key_to_mnemonic
- mnemonic_to_secret_key
- seed_from_mnemonic
- mnemonic_from_seed
- validate_address
- encode_address
- decode_address

#### Application Tools
- make_app_create_txn
- make_app_update_txn
- make_app_delete_txn
- make_app_optin_txn
- make_app_closeout_txn
- make_app_clear_txn
- make_app_call_txn
- get_application_address

#### Asset Tools
- make_asset_create_txn
- make_asset_config_txn
- make_asset_destroy_txn
- make_asset_freeze_txn
- make_asset_transfer_txn

#### Transaction Tools
- make_payment_txn
- assign_group_id
- sign_transaction
- sign_bytes
- send_raw_transaction
- simulate_raw_transactions

#### Key Management Tools
- generate_key_pair
- derive_key

#### Utility Tools
- encode_obj
- decode_obj
- bytes_to_bigint
- bigint_to_bytes
- encode_uint64
- decode_uint64
- compile_teal
- disassemble_teal

### Available Resources (60)

#### Algod Resources
- accounts/{address}
- accounts/{address}/application/{app-id}
- accounts/{address}/asset/{asset-id}
- applications/{app-id}
- applications/{app-id}/box/{name}
- applications/{app-id}/boxes
- assets/{asset-id}
- transactions/pending/{txid}
- accounts/{address}/transactions/pending
- transactions/pending
- transactions/params
- status

#### Block Resources
- blocks/latest
- blocks/{round}
- blocks/{round}/transactions
- indexer/blocks/{round}

#### Health Resources
- health
- indexer/health

#### Genesis Resources
- genesis
- indexer/genesis

#### Network Resources
- versions
- metrics

#### Supply Resources
- ledger/supply
- indexer/supply

#### Participation Resources
- participation
- participation/keys
- participation/keys/{id}

#### Fee Resources
- transactions/fee
- indexer/fee-distribution

#### Protocol Resources
- protocol
- indexer/protocol-upgrades

#### Node Resources
- ready
- sync
- peers
- catchup

#### Compile Resources
- compile/teal
- compile/teal/disassemble
- compile/teal/dryrun

#### Debug Resources
- debug/accounts/{address}
- debug/txns/{txid}
- debug/blocks/{round}
- debug/ledger

#### Indexer Resources
- indexer/accounts/{address}
- indexer/accounts/{address}/transactions
- indexer/accounts/{address}/apps-local-state
- indexer/accounts/{address}/created-applications
- indexer/applications/{app-id}
- indexer/applications/{app-id}/logs
- indexer/applications/{app-id}/box/{name}
- indexer/applications/{app-id}/boxes
- indexer/applications
- indexer/assets/{asset-id}
- indexer/assets/{asset-id}/balances
- indexer/assets/{asset-id}/transactions
- indexer/assets/{asset-id}/balances/{address}
- indexer/assets/{asset-id}/transactions/{txid}
- indexer/assets
- indexer/transactions/{txid}
- indexer/transactions

## Using with AI Development Environments

### Claude Desktop
1. Open Claude Desktop settings (`~/Library/Application Support/Claude/claude_desktop_config.json`)
2. Add the following configuration:
```json
{
  "mcpServers": {
    "algorand": {
      "command": "node",
      "args": ["path/to/server/dist/index.js"],
      "env": {
        "ALGORAND_NETWORK": "testnet",
        "ALGORAND_ALGOD_API": "https://testnet-api.algonode.cloud/v2",
        "ALGORAND_ALGOD": "https://testnet-api.algonode.cloud",
        "ALGORAND_INDEXER_API": "https://testnet-idx.algonode.cloud/v2",
        "ALGORAND_INDEXER": "https://testnet-idx.algonode.cloud"
      }
    }
  }
}
```

### Cursor
1. Open Cursor settings (`~/Library/Application Support/Cursor/User/settings/cursor_mcp_settings.json`)
2. Add the same configuration as above, adjusting the server path accordingly

Note: The server path in the configuration should be the absolute path to your compiled server's index.js file.

## Dependencies

- algosdk: Algorand JavaScript SDK
- @perawallet/connect: Pera Wallet connector
- @blockshake/defly-connect: Defly Wallet connector
- @daffiwallet/connect: Daffi Wallet connector

## License

MIT
