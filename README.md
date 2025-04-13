# Algorand MCP Implementation
[![smithery badge](https://smithery.ai/badge/@GoPlausible/algorand-mcp)](https://smithery.ai/server/@GoPlausible/algorand-mcp)
[![npm downloads](https://img.shields.io/npm/dm/algorand-mcp.svg)](https://www.npmjs.com/package/algorand-mcp)
[![npm version](https://badge.fury.io/js/algorand-mcp.svg)](https://badge.fury.io/js/algorand-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

[Model context protocol](https://modelcontextprotocol.io/) or MCP, is an open protocol that standardizes how applications provide context to LLMs. MCP provides specification standards to give LLMs tools, resources and instructions to be more useful and effective.

![Screenshot 2025-03-15 at 17 47 54](https://github.com/user-attachments/assets/db561f9f-5f95-4b07-914b-a71f48bb5399)

[MCP Github](https://github.com/modelcontextprotocol) contains more information and different tools and specifications plus documentation of MCP.

This repository is a Model Context Protocol (MCP) implementation for Algorand blockchain interactions. The implementation consists of:
- (PRODUCTION) A server package for blockchain interactions (Node.js only)
- (WIP) A client package for wallet management and transaction signing (supports both browser and Node.js)

**📦 Packages in this repository:**
- **[Algorand MCP Server](packages/server/README.md)** - Algorand MCP server full implementation.
- **[Algorand MCP Client](packages/client/README.md)** - Algorand MCP Client for client side Wallet management and transaction signing, as well as integration by other Agent hosts.

**📦 NPM:**
- **[Algorand MCP Server NPM package](https://www.npmjs.com/package/algorand-mcp)** - Algorand MCP server implementation via NPM package installation.

**📦 Smithery:**
- **[Algorand MCP Server on Smithery](https://smithery.ai/server/@GoPlausible/algorand-mcp)** - Algorand MCP server implementation via smithery.


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

### Via NPM (for developers who wish to run their own instances)
```bash
# Install both client and server packages
npm install algorand-mcp
```

### Via Smithery (For all users)

#### Via Smithery (for Claude Desktop)

Simply run this command in the terminal:

```bash
npx -y @smithery/cli@latest install @GoPlausible/algorand-mcp --client claude --config "{\"NFD_API_KEY\":\"\",\"NFD_API_URL\":\"https://api.nf.domains\",\"ALGORAND_ALGOD\":\"https://testnet-api.algonode.cloud\",\"ALGORAND_TOKEN\":\"\",\"ITEMS_PER_PAGE\":\"10\",\"VESTIGE_API_KEY\":\"\",\"VESTIGE_API_URL\":\"https://api.vestigelabs.org\",\"ALGORAND_INDEXER\":\"https://testnet-idx.algonode.cloud\",\"ALGORAND_NETWORK\":\"testnet\",\"ALGORAND_ALGOD_API\":\"https://testnet-api.algonode.cloud/v2\",\"ALGORAND_ALGOD_PORT\":\"\",\"ALGORAND_INDEXER_API\":\"https://testnet-idx.algonode.cloud/v2\",\"ALGORAND_INDEXER_PORT\":\"\"}"

```

#### Via Smithery (for Cursor)

Simply run this command in terminal:

```bash
npx -y @smithery/cli@latest install @GoPlausible/algorand-mcp --client cursor --config "{\"NFD_API_KEY\":\"\",\"NFD_API_URL\":\"https://api.nf.domains\",\"ALGORAND_ALGOD\":\"https://testnet-api.algonode.cloud\",\"ALGORAND_TOKEN\":\"\",\"ITEMS_PER_PAGE\":\"10\",\"VESTIGE_API_KEY\":\"\",\"VESTIGE_API_URL\":\"https://api.vestigelabs.org\",\"ALGORAND_INDEXER\":\"https://testnet-idx.algonode.cloud\",\"ALGORAND_NETWORK\":\"testnet\",\"ALGORAND_ALGOD_API\":\"https://testnet-api.algonode.cloud/v2\",\"ALGORAND_ALGOD_PORT\":\"\",\"ALGORAND_INDEXER_API\":\"https://testnet-idx.algonode.cloud/v2\",\"ALGORAND_INDEXER_PORT\":\"\"}"

```
**IMPORTANT NOTE**
When using Smithery UI to copy the command, make sure you set ITEMS_PER_PAGE before clicking connect so that all ENV variables are brought to command, otherwise your command will not contain environment variables required for Algorand MCP to run!

![Screenshot 2025-03-24 at 13 46 49](https://github.com/user-attachments/assets/98473c4a-b242-4000-bcf4-8cf6fd3e37c2)

![Screenshot 2025-03-24 at 13 46 42](https://github.com/user-attachments/assets/1c8f4342-4bd2-4afa-83c8-fae3a0c27afa)


## Project Architecture

The project follows a modular architecture with two main packages:

1. **Server Package (`@algorand-mcp/server`)**
   - Provides MCP tools and resources
   - Manages blockchain interactions
   - Handles transaction creation and submission
   - Offers comprehensive blockchain queries

2. **Client Package (`@algorand-mcp/client`)**
   - Handles wallet connections and transaction signing
   - Supports both local and external wallets
   - Universal compatibility (browser/Node.js)
   - Secure credential management
   - Still work in progress (Server works irrelevant to client status)

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
│       │   ├── resources/         # MCP Resources (User-invokable endpoints)
│       │   │   ├── knowledge/     # Documentation and taxonomy
│       │   │   │   ├── taxonomy/  # Markdown documentation
│       │   │   │   └── index.ts   # Knowledge resource handler
│       │   │   ├── wallet/       # Wallet management
│       │   │   │   └── index.ts   # Wallet resource handler
│       │   │   └── index.ts       # Resource registration
│       │   ├── tools/            # MCP Tools (Agent-invokable operations)
│       │   │   ├── accountManager.ts     # Account operations
│       │   │   ├── algodManager.ts       # Node interactions
│       │   │   ├── utilityManager.ts     # Utility functions
│       │   │   ├── resource_tools/       # Resource Tools
│       │   │   │   ├── algod/           # Algod resource tools
│       │   │   │   ├── indexer/         # Indexer resource tools
│       │   │   │   ├── nfd/            # NFDomains tools
│       │   │   │   ├── vestige/        # Vestige DeFi tools
│       │   │   │   ├── tinyman/        # Tinyman AMM tools
│       │   │   │   └── ultrade/        # Ultrade DEX tools
│       │   │   └── transactionManager/   # Transaction handling
│       │   ├── env.ts            # Environment configuration
│       │   └── index.ts          # Server entry point
│       ├── package.json
│       └── tsconfig.json
├── package.json                   # Root package file
└── tsconfig.json                 # Root TypeScript config
```

## Core Functionalities

### Server Features
- Account management
- Asset operations
- Application interactions
- Transaction creation and submission
- Blockchain state queries
- Comprehensive utility functions
- Standardized response format
- Built-in pagination support
- NFDomains integration
- Vestige DeFi analytics
- Tinyman AMM integration
- Ultrade DEX integration
- Knowledge taxonomy resources:
  - Full documentation taxonomy access
  - Category-specific documentation browsing (ARCs, SDKs, tools, etc.)
  - Individual document retrieval
  - Markdown-based content format

### Client Features (Work in Progress)
- Local wallet with secure storage
- External wallet support (Pera, Defly, Daffi)
- Transaction signing
- Session management
- Universal ES module support

## Response Format

All responses follow a standardized format:

```typescript
{
  "data": {
    // Response data here
  },
  "metadata": {  // Only for paginated responses
    "totalItems": number,
    "itemsPerPage": number,
    "currentPage": number,
    "totalPages": number,
    "hasNextPage": boolean,
    "pageToken": string,
    "arrayField": string  // Name of paginated array field
  }
}
```

Errors are returned in a standardized format:
```typescript
{
  "error": {
    "code": string,
    "message": string
  }
}
```

## Available Tools and Resources

The Algorand MCP implementation provides 125 tools and resources for blockchain interaction:
- 40 base tools (account, asset, application, transaction management)
- 30 resource tools (algod and indexer)
- 6 NFDomains (NFD) tools for name services
- 28 Vestige tools for DeFi analytics
- 9 Tinyman tools for AMM interactions
- 12 Ultrade tools for DEX functionality

### Resource Tools

#### Algod Resource Tools
- resource_algod_get_account_info: Get current account balance, assets, and auth address
- resource_algod_get_account_application_info: Get account-specific application information
- resource_algod_get_account_asset_info: Get account-specific asset information
- resource_algod_get_application_by_id: Get application information
- resource_algod_get_application_box: Get application box by name
- resource_algod_get_application_boxes: Get all application boxes
- resource_algod_get_asset_by_id: Get current asset information
- resource_algod_get_pending_transaction: Get pending transaction information
- resource_algod_get_pending_transactions_by_address: Get pending transactions for an address
- resource_algod_get_pending_transactions: Get all pending transactions
- resource_algod_get_transaction_params: Get suggested transaction parameters
- resource_algod_get_node_status: Get current node status
- resource_algod_get_node_status_after_block: Get node status after a specific round

#### Indexer Resource Tools
- resource_indexer_lookup_account_by_id: Get account information
- resource_indexer_lookup_account_assets: Get account assets
- resource_indexer_lookup_account_app_local_states: Get account application local states
- resource_indexer_lookup_account_created_applications: Get applications created by account
- resource_indexer_search_for_accounts: Search for accounts with various criteria
- resource_indexer_lookup_applications: Get application information
- resource_indexer_lookup_application_logs: Get application log messages
- resource_indexer_search_for_applications: Search for applications
- resource_indexer_lookup_asset_by_id: Get asset information and configuration
- resource_indexer_lookup_asset_balances: Get accounts holding this asset
- resource_indexer_lookup_asset_transactions: Get transactions involving this asset
- resource_indexer_search_for_assets: Search for assets
- resource_indexer_lookup_transaction_by_id: Get transaction information
- resource_indexer_lookup_account_transactions: Get account transaction history
- resource_indexer_search_for_transactions: Search for transactions

#### NFDomains (NFD) Resource Tools
- resource_nfd_get_nfd: Get NFD by name or application ID
- resource_nfd_get_nfds_for_addresses: Get NFDs for specific addresses
- resource_nfd_get_nfd_activity: Get activity/changes for NFDs
- resource_nfd_get_nfd_analytics: Get analytics data for NFDs
- resource_nfd_browse_nfds: Browse NFDs with various filters
- resource_nfd_search_nfds: Search NFDs with various filters

#### Vestige Resource Tools

1. View Tools:
- resource_vestige_view_networks: Get all networks
- resource_vestige_view_network_by_id: Get network by id
- resource_vestige_view_protocols: Get all protocols
- resource_vestige_view_protocol_by_id: Get protocol by id
- resource_vestige_view_protocol_volumes: Get protocol volumes at specific day
- resource_vestige_view_assets: Get data about assets
- resource_vestige_view_assets_list: Get asset list
- resource_vestige_view_assets_search: Search assets by query
- resource_vestige_view_asset_price: Get asset prices
- resource_vestige_view_asset_candles: Get asset candles
- resource_vestige_view_asset_history: Get asset volume, swaps, total lockup, vwap and confidence history
- resource_vestige_view_asset_composition: Get asset lockups based on protocol and pair
- resource_vestige_view_pools: Get pools
- resource_vestige_view_vaults: Get all vaults
- resource_vestige_view_balances: Get balances by network id, protocol id and asset id
- resource_vestige_view_notes: Get notes by network id and optionally asset id
- resource_vestige_view_first_asset_notes: Get first note for assets
- resource_vestige_view_asset_notes_count: Get notes count for assets
- resource_vestige_view_swaps: Get swaps

2. Swap Tools:
- resource_vestige_get_best_v4_swap_data: Get best V4 swap data
- resource_vestige_get_v4_swap_discount: Get V4 swap discount
- resource_vestige_get_v4_swap_data_transactions: Get V4 swap data transactions
- resource_vestige_get_aggregator_stats: Get aggregator stats

3. Currency Tools:
- resource_vestige_view_currency_prices: Get all latest currency prices
- resource_vestige_view_currency_price_history: Get currency prices by timestamp range
- resource_vestige_view_currency_price: Get currency price by timestamp
- resource_vestige_view_currency_average_price: Get average price for currency
- resource_vestige_view_currency_prices_simple_30d: Get currency prices for last 30 days

#### Tinyman Resource Tools
- resource_tinyman_get_pool: Get Tinyman pool information by asset pair
- resource_tinyman_get_pool_analytics: Get analytics for a Tinyman pool
- resource_tinyman_get_pool_creation_quote: Get quote for creating a new pool
- resource_tinyman_get_liquidity_quote: Get quote for adding liquidity
- resource_tinyman_get_remove_liquidity_quote: Get quote for removing liquidity
- resource_tinyman_get_swap_quote: Get quote for swapping assets
- resource_tinyman_get_asset_optin_quote: Get quote for opting into pool token
- resource_tinyman_get_validator_optin_quote: Get quote for opting into validator
- resource_tinyman_get_validator_optout_quote: Get quote for opting out of validator

#### Ultrade Resource Tools
1. Wallet Tools:
- resource_ultrade_wallet_signin_message: Generate message from the sign in data
- resource_ultrade_wallet_signin: Sign in to trading account
- resource_ultrade_wallet_add_key: Add a trading key
- resource_ultrade_wallet_revoke_key: Revoke a trading key
- resource_ultrade_wallet_keys: Get trading keys
- resource_ultrade_wallet_key_message: Generate message from the trading key data
- resource_ultrade_wallet_trades: Get filtered wallet trades
- resource_ultrade_wallet_transactions: Get filtered wallet transactions
- resource_ultrade_wallet_withdraw: Withdraw token
- resource_ultrade_wallet_withdraw_message: Generate message from the withdrawal data

2. Market Tools:
- resource_ultrade_market_symbols: Get market symbols
- resource_ultrade_market_details: Get market details
- resource_ultrade_market_price: Get last market price by pair symbol
- resource_ultrade_market_depth: Get order book depth
- resource_ultrade_market_last_trades: Get last trades
- resource_ultrade_market_history: Get market history
- resource_ultrade_market_assets: Get trading assets
- resource_ultrade_market_fee_rates: Get fee rates
- resource_ultrade_market_chains: Get blockchain chains
- resource_ultrade_market_withdrawal_fee: Get withdrawal fee
- resource_ultrade_market_operation_details: Get operation details
- resource_ultrade_market_settings: Get market settings
- resource_ultrade_market_orders: Get orders
- resource_ultrade_market_open_orders: Get open orders
- resource_ultrade_market_order_by_id: Get order by ID
- resource_ultrade_market_order_message: Generate message from the order data
- resource_ultrade_market_create_order: Create new order
- resource_ultrade_market_create_orders: Create new orders
- resource_ultrade_market_cancel_order: Cancel open order
- resource_ultrade_market_cancel_orders: Cancel multiple open orders

3. System Tools:
- resource_ultrade_system_time: Get current system time
- resource_ultrade_system_maintenance: Get system maintenance status
- resource_ultrade_system_version: Get system version

### Account Management Tools
- create_account: Create a new Algorand account
- rekey_account: Rekey an account to a new address
- validate_address: Check if an Algorand address is valid
- encode_address: Encode a public key to an Algorand address
- decode_address: Decode an Algorand address to a public key

### Application Tools
- make_app_create_txn: Create an application creation transaction
- make_app_update_txn: Create an application update transaction
- make_app_delete_txn: Create an application delete transaction
- make_app_optin_txn: Create an application opt-in transaction
- make_app_closeout_txn: Create an application close-out transaction
- make_app_clear_txn: Create an application clear state transaction
- make_app_call_txn: Create an application call transaction
- get_application_address: Get the address for a given application ID
- compile_teal: Compile TEAL source code
- disassemble_teal: Disassemble TEAL bytecode back to source

### Asset Tools
- make_asset_create_txn: Create an asset creation transaction
- make_asset_config_txn: Create an asset configuration transaction
- make_asset_destroy_txn: Create an asset destroy transaction
- make_asset_freeze_txn: Create an asset freeze transaction
- make_asset_transfer_txn: Create an asset transfer transaction

### Transaction Tools
- send_raw_transaction: Submit signed transactions to the network
- simulate_raw_transactions: Simulate raw transactions
- simulate_transactions: Simulate transactions with detailed configuration
- make_payment_txn: Create a payment transaction
- assign_group_id: Assign a group ID to a list of transactions
- sign_transaction: Sign a transaction with a secret key

### Key Management Tools
- mnemonic_to_mdk: Convert a mnemonic to a master derivation key
- mdk_to_mnemonic: Convert a master derivation key to a mnemonic
- secret_key_to_mnemonic: Convert a secret key to a mnemonic
- mnemonic_to_secret_key: Convert a mnemonic to a secret key
- seed_from_mnemonic: Generate a seed from a mnemonic
- mnemonic_from_seed: Generate a mnemonic from a seed
- sign_bytes: Sign arbitrary bytes with a secret key

### Utility Tools
- bytes_to_bigint: Convert bytes to a BigInt
- bigint_to_bytes: Convert a BigInt to bytes
- encode_uint64: Encode a uint64 to bytes
- decode_uint64: Decode bytes to a uint64
- generate_algorand_uri: Generate an Algorand URI and QR code according to ARC-26 specification

## Dependencies

- algosdk: Algorand JavaScript SDK
- @perawallet/connect: Pera Wallet connector
- @blockshake/defly-connect: Defly Wallet connector
- @daffiwallet/connect: Daffi Wallet connector

## License

MIT
