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
- **Complete Algorand Documentation Integration**
  - **Full Algorand knowledge taxonomy**
  - **Comprehensive developer documentation**
  - **ARCs, SDKs, and tools documentation**
  - **Direct document access via knowledge tool**
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

To install or update the Algorand MCP implementation, clone the repository, install the dependencies and build the project":

First check node version to be 23.6.1 or later:
```bash
node -v
```

Upgrade to 23.6.1 or later if needed!

Then check the Claude or Cursor container folders to have mcp-servers folder (if not create one):
```bash
mkdir PATH_ON_YOUR_MACHINE/Claude/mcp-servers
# or for Cursor 
mkdir PATH_ON_YOUR_MACHINE/Cursor/mcp-servers
```
Then clone this repository under mcp-servers folder and install dependencies:

```bash
cd PATH_ON_YOUR_MACHINE/Claude/mcp-servers
# or for Cursor 
cd PATH_ON_YOUR_MACHINE/Cursor/mcp-servers
# Clone the repository
git clone https://github.com/GoPlausible/algorand-mcp.git
cd algorand-mcp
# Install dependencies
npm install
# Build the project
npm run build
# Edit the .env file to set your configurations
```
And you are done! Now you can open you MCP config and add the server as :

```json
{
  "mcpServers": {
    "algorand-mcp": {
      "command": "node",
      "args": [
        "PATH_ON_YOUR_MACHINE/Claude/mcp-servers/algorand-mcp/packages/server/dist/index.js"
     ],
      "env": {
        "ALGORAND_NETWORK": "testnet",
        "ALGORAND_ALGOD_API": "https://testnet-api.algonode.cloud/v2",
        "ALGORAND_ALGOD": "https://testnet-api.algonode.cloud",
        "ALGORAND_INDEXER_API": "https://testnet-idx.algonode.cloud/v2",
        "ALGORAND_INDEXER": "https://testnet-idx.algonode.cloud",
        "ALGORAND_ALGOD_PORT": "",
        "ALGORAND_INDEXER_PORT": "",
        "ALGORAND_TOKEN": "",
        "ALGORAND_AGENT_WALLET": "problem aim online jaguar upper oil flight stumble mystery aerobic toy avoid file tomato moment exclude witness guard lab opera crunch noodle dune abandon broccoli",
        "NFD_API_URL": "https://api.nf.domains",
        "NFD_API_KEY": "",
        "TINYMAN_ACTIVE": "false",
        "ULTRADE_ACTIVE": "false",
        "ULTRADE_API_URL": "https://api.ultrade.io",
        "VESTIGE_ACTIVE": "false",
        "VESTIGE_API_URL": "https://api.vestigelabs.org",
        "VESTIGE_API_KEY": "",
        "ITEMS_PER_PAGE": "10"

      }
    }
  }
}
```
Make sure yopu change the paths to match your local system's paths.

For example on MACOS and Claud, the path would be something like this:

```json
{
  "mcpServers": {
    "algorand-mcp": {
      "command": "node",
      "args": [
        " /Users/YOUR_USERNAME/Library/Application\ Support/Claude/mcp-servers/algorand-mcp/packages/server/dist/index.js"
     ]
    }
  }
}
```

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
│       │   │   ├── apiManager/       # API Tools
│       │   │   │   ├── algod/           # Algod API tools
│       │   │   │   ├── indexer/         # Indexer API tools
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
- Vestige DeFi analytics (optional, disabled by default)
- Tinyman AMM integration (optional, disabled by default)
- Ultrade DEX integration (optional, disabled by default)
- Knowledge taxonomy resources:
  - Full documentation taxonomy (algorand://knowledge/taxonomy)
  - Category-specific documentation:
    - ARCs (algorand://knowledge/taxonomy/arcs)
    - SDKs (algorand://knowledge/taxonomy/sdks)
    - AlgoKit (algorand://knowledge/taxonomy/algokit)
    - AlgoKit Utils (algorand://knowledge/taxonomy/algokit-utils)
    - TEALScript (algorand://knowledge/taxonomy/tealscript)
    - Puya (algorand://knowledge/taxonomy/puya)
    - Liquid Auth (algorand://knowledge/taxonomy/liquid-auth)
    - Python (algorand://knowledge/taxonomy/python)
    - Developer Docs (algorand://knowledge/taxonomy/developers)
    - CLI Tools (algorand://knowledge/taxonomy/clis)
    - Node Management (algorand://knowledge/taxonomy/nodes)
    - Technical Details (algorand://knowledge/taxonomy/details)

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
- 30 API tools (algod and indexer)
- 6 NFDomains (NFD) tools for name services
- 28 Vestige tools for DeFi analytics
- 9 Tinyman tools for AMM interactions
- 12 Ultrade tools for DEX functionality

### API Tools

#### Algod API Tools
- api_algod_get_account_info: Get current account balance, assets, and auth address
- api_algod_get_account_application_info: Get account-specific application information
- api_algod_get_account_asset_info: Get account-specific asset information
- api_algod_get_application_by_id: Get application information
- api_algod_get_application_box: Get application box by name
- api_algod_get_application_boxes: Get all application boxes
- api_algod_get_asset_by_id: Get current asset information
- api_algod_get_pending_transaction: Get pending transaction information
- api_algod_get_pending_transactions_by_address: Get pending transactions for an address
- api_algod_get_pending_transactions: Get all pending transactions
- api_algod_get_transaction_params: Get suggested transaction parameters
- api_algod_get_node_status: Get current node status
- api_algod_get_node_status_after_block: Get node status after a specific round

#### Indexer API Tools
- api_indexer_lookup_account_by_id: Get account information
- api_indexer_lookup_account_assets: Get account assets
- api_indexer_lookup_account_app_local_states: Get account application local states
- api_indexer_lookup_account_created_applications: Get applications created by account
- api_indexer_search_for_accounts: Search for accounts with various criteria
- api_indexer_lookup_applications: Get application information
- api_indexer_lookup_application_logs: Get application log messages
- api_indexer_search_for_applications: Search for applications
- api_indexer_lookup_asset_by_id: Get asset information and configuration
- api_indexer_lookup_asset_balances: Get accounts holding this asset
- api_indexer_lookup_asset_transactions: Get transactions involving this asset
- api_indexer_search_for_assets: Search for assets
- api_indexer_lookup_transaction_by_id: Get transaction information
- api_indexer_lookup_account_transactions: Get account transaction history
- api_indexer_search_for_transactions: Search for transactions

#### NFDomains (NFD) API Tools
- api_nfd_get_nfd: Get NFD by name or application ID
- api_nfd_get_nfds_for_addresses: Get NFDs for specific addresses
- api_nfd_get_nfd_activity: Get activity/changes for NFDs
- api_nfd_get_nfd_analytics: Get analytics data for NFDs
- api_nfd_browse_nfds: Browse NFDs with various filters
- api_nfd_search_nfds: Search NFDs with various filters

#### Vestige API Tools

1. View Tools:
- api_vestige_view_networks: Get all networks
- api_vestige_view_network_by_id: Get network by id
- api_vestige_view_protocols: Get all protocols
- api_vestige_view_protocol_by_id: Get protocol by id
- api_vestige_view_protocol_volumes: Get protocol volumes at specific day
- api_vestige_view_assets: Get data about assets
- api_vestige_view_assets_list: Get asset list
- api_vestige_view_assets_search: Search assets by query
- api_vestige_view_asset_price: Get asset prices
- api_vestige_view_asset_candles: Get asset candles
- api_vestige_view_asset_history: Get asset volume, swaps, total lockup, vwap and confidence history
- api_vestige_view_asset_composition: Get asset lockups based on protocol and pair
- api_vestige_view_pools: Get pools
- api_vestige_view_vaults: Get all vaults
- api_vestige_view_balances: Get balances by network id, protocol id and asset id
- api_vestige_view_notes: Get notes by network id and optionally asset id
- api_vestige_view_first_asset_notes: Get first note for assets
- api_vestige_view_asset_notes_count: Get notes count for assets
- api_vestige_view_swaps: Get swaps

2. Swap Tools:
- api_vestige_get_best_v4_swap_data: Get best V4 swap data
- api_vestige_get_v4_swap_discount: Get V4 swap discount
- api_vestige_get_v4_swap_data_transactions: Get V4 swap data transactions
- api_vestige_get_aggregator_stats: Get aggregator stats

3. Currency Tools:
- api_vestige_view_currency_prices: Get all latest currency prices
- api_vestige_view_currency_price_history: Get currency prices by timestamp range
- api_vestige_view_currency_price: Get currency price by timestamp
- api_vestige_view_currency_average_price: Get average price for currency
- api_vestige_view_currency_prices_simple_30d: Get currency prices for last 30 days

#### Tinyman API Tools
- api_tinyman_get_pool: Get Tinyman pool information by asset pair
- api_tinyman_get_pool_analytics: Get analytics for a Tinyman pool
- api_tinyman_get_pool_creation_quote: Get quote for creating a new pool
- api_tinyman_get_liquidity_quote: Get quote for adding liquidity
- api_tinyman_get_remove_liquidity_quote: Get quote for removing liquidity
- api_tinyman_get_swap_quote: Get quote for swapping assets
- api_tinyman_get_asset_optin_quote: Get quote for opting into pool token
- api_tinyman_get_validator_optin_quote: Get quote for opting into validator
- api_tinyman_get_validator_optout_quote: Get quote for opting out of validator

#### Ultrade API Tools
1. Wallet Tools:
- api_ultrade_wallet_signin_message: Generate message from the sign in data
- api_ultrade_wallet_signin: Sign in to trading account
- api_ultrade_wallet_add_key: Add a trading key
- api_ultrade_wallet_revoke_key: Revoke a trading key
- api_ultrade_wallet_keys: Get trading keys
- api_ultrade_wallet_key_message: Generate message from the trading key data
- api_ultrade_wallet_trades: Get filtered wallet trades
- api_ultrade_wallet_transactions: Get filtered wallet transactions
- api_ultrade_wallet_withdraw: Withdraw token
- api_ultrade_wallet_withdraw_message: Generate message from the withdrawal data

2. Market Tools:
- api_ultrade_market_symbols: Get market symbols
- api_ultrade_market_details: Get market details
- api_ultrade_market_price: Get last market price by pair symbol
- api_ultrade_market_depth: Get order book depth
- api_ultrade_market_last_trades: Get last trades
- api_ultrade_market_history: Get market history
- api_ultrade_market_assets: Get trading assets
- api_ultrade_market_fee_rates: Get fee rates
- api_ultrade_market_chains: Get blockchain chains
- api_ultrade_market_withdrawal_fee: Get withdrawal fee
- api_ultrade_market_operation_details: Get operation details
- api_ultrade_market_settings: Get market settings
- api_ultrade_market_orders: Get orders
- api_ultrade_market_open_orders: Get open orders
- api_ultrade_market_order_by_id: Get order by ID
- api_ultrade_market_order_message: Generate message from the order data
- api_ultrade_market_create_order: Create new order
- api_ultrade_market_create_orders: Create new orders
- api_ultrade_market_cancel_order: Cancel open order
- api_ultrade_market_cancel_orders: Cancel multiple open orders

3. System Tools:
- api_ultrade_system_time: Get current system time
- api_ultrade_system_maintenance: Get system maintenance status
- api_ultrade_system_version: Get system version

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
