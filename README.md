# Algorand MCP Implementation
[![smithery badge](https://smithery.ai/badge/@GoPlausible/algorand-mcp)](https://smithery.ai/server/@GoPlausible/algorand-mcp)
[![npm version](https://badge.fury.io/js/algorand-mcp.svg)](https://badge.fury.io/js/algorand-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

[Model context protocol](https://modelcontextprotocol.io/) or MCP, is an open protocol that standardizes how applications provide context to LLMs. MCP provides specification standards to give LLMs tools, resources and instructions to be more useful and effective.

![Screenshot 2025-03-15 at 17 47 54](https://github.com/user-attachments/assets/db561f9f-5f95-4b07-914b-a71f48bb5399)

[MCP Github](https://github.com/modelcontextprotocol) contains more information and different tools and specifications plus documentation of MCP.

This repository is a Model Context Protocol (MCP) implementation for Algorand blockchain interactions. The implementation consists of:
- (PRODUCTION) A server package for blockchain interactions (Node.js only)
- (WIP) A client package for wallet management and transaction signing (supports both browser and Node.js)

**📦 Packages:**
- **[Algorand MCP Server](packages/server/README.md)** - Algorand MCP server full implementation.
- **[Algorand MCP Client](packages/client/README.md)** - Algorand MCP Client for client side Wallet management and transaction signing, as well as integration by other Agent hosts.

**📦 Smithery:**
- **[Algorand MCP Server on Smithery](https://smithery.ai/server/@GoPlausible/algorand-mcp)** - Algorand MCP server implementation via smithery.


IMPORTANT: The client package is still a work in progress and is not yet fully functional. The server package, however, is fully operational and can be used for to integrate Algorand blockchain to any agent system that supports Model Context Protocol (MCP).

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
Go to [Algorand MCP Server on Smithery](https://smithery.ai/server/@GoPlausible/algorand-mcp) and select your AI tool and platform. Copy either command or copy depending on if you are using the command or MCP config JSON to connect to MCP Server. Click connect to start!

![Screenshot 2025-03-15 at 00 50 12](https://github.com/user-attachments/assets/f9ea0572-6919-44b0-85e7-c6153fce9b2f)

#### Using command

First let's copy the command from Smithery (Please make sure your tool of choice and platform are selected correctly!)

![Screenshot 2025-03-15 at 14 45 24](https://github.com/user-attachments/assets/d747ea60-732a-43e9-957f-051bfec5d134)

Then paste that in the command field of New MCP server dialog

![Screenshot 2025-03-15 at 14 51 06](https://github.com/user-attachments/assets/5f5d9c1a-297c-4685-928d-ddc6ed3950fa)

Then The MCP server is detected and loading tools and resources

![Screenshot 2025-03-15 at 14 51 31](https://github.com/user-attachments/assets/badfc6e9-fe98-4ba1-9b14-1cd4c11829ce)

And it is good to go!

![Screenshot 2025-03-15 at 14 51 43](https://github.com/user-attachments/assets/d2505413-61d7-4af4-9ba0-18eb58b70a51)


#### Using settings JSON

Copy the JSON from Smithery

![Screenshot 2025-03-15 at 15 09 04](https://github.com/user-attachments/assets/9d9dbcfe-9870-4dd6-bf0c-ebe895480951)

Now open MCP settings in your tool of choice (Claud Desktop, Cursor,...) and Paste the copied JSON there as a whole and save the file.

You are good to go!

![6z7Q0fuH (1)](https://github.com/user-attachments/assets/4f62ac1e-4e16-47ee-85c5-296d80b4039e)

#### Important note for Windows OS Users
Please not that if you receive "Server Closed" or "Connection Closed" Then you need to try and change the `cmd` command with `C:\Windows\System32\cmd.exe` as suggested by Smithery!

![Screenshot 2025-03-15 at 15 51 13](https://github.com/user-attachments/assets/c5b013a9-33c4-4a5f-bd7a-00502334e747)


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
│       │   ├── resources/         # MCP Resources
│       │   │   ├── algod/        # Real-time blockchain state
│       │   │   ├── indexer/      # Historical blockchain data
│       │   │   ├── nfd/         # NFDomains name service
│       │   │   └── vestige/     # DeFi analytics and tracking
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
    "nextPageToken": string,
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

The Algorand MCP implementation provides 104 tools and resources for blockchain interaction:
- 40 base tools (account, asset, application, transaction management)
- 30 resource tools (algod and indexer)
- 6 NFDomains (NFD) tools for name services
- 28 Vestige tools for DeFi analytics

For detailed documentation and usage instructions, please refer to the server package README.

### Available Tools (104 Total: 40 Base + 30 Resource + 6 NFD + 28 Vestige)

#### Algod Resource Tools
- resource_algod_get_account_info: Get current account balance, assets, and auth address from algod
- resource_algod_get_account_application_info: Get account-specific application information from algod
- resource_algod_get_account_asset_info: Get account-specific asset information from algod
- resource_algod_get_application_by_id: Get application information
- resource_algod_get_application_box: Get application box by name
- resource_algod_get_application_boxes: Get all application boxes
- resource_algod_get_asset_by_id: Get current asset information from algod
- resource_algod_get_pending_transaction: Get pending transaction information
- resource_algod_get_pending_transactions_by_address: Get pending transactions for an address
- resource_algod_get_pending_transactions: Get all pending transactions
- resource_algod_get_transaction_params: Get suggested transaction parameters
- resource_algod_get_node_status: Get current node status
- resource_algod_get_node_status_after_block: Get node status after a specific round

#### Indexer Resource Tools
- resource_indexer_lookup_account_by_id: Get account information from indexer
- resource_indexer_lookup_account_transactions: Get account transaction history
- resource_indexer_lookup_account_assets: Get account assets
- resource_indexer_lookup_account_app_local_states: Get account application local states
- resource_indexer_lookup_account_created_applications: Get applications created by this account
- resource_indexer_lookup_applications: Get application information from indexer
- resource_indexer_lookup_application_logs: Get application log messages
- resource_indexer_lookup_application_box: Get application box by name
- resource_indexer_lookup_application_boxes: Get all application boxes
- resource_indexer_lookup_asset_by_id: Get asset information and configuration
- resource_indexer_lookup_asset_balances: Get accounts holding this asset and their balances
- resource_indexer_lookup_asset_transactions: Get transactions involving this asset
- resource_indexer_lookup_transaction_by_id: Get transaction information by ID
- resource_indexer_search_accounts: Search for accounts with various criteria
- resource_indexer_search_for_applications: Search for applications with various criteria
- resource_indexer_search_for_assets: Search for assets with various criteria
- resource_indexer_search_for_transactions: Search for transactions with various criteria

#### NFDomains (NFD) Resource Tools
- resource_nfd_get_nfd: Get a specific NFD by name or application ID
- resource_nfd_get_nfds_for_addresses: Get NFDs for specific addresses
- resource_nfd_get_nfd_activity: Get activity/changes for NFDs
- resource_nfd_get_nfd_analytics: Get analytics data for NFDs
- resource_nfd_browse_nfds: Browse NFDs with various filters
- resource_nfd_search_nfds: Search NFDs with various filters

#### Vestige Resource Tools
- resource_vestige_view_providers: Get all supported providers
- resource_vestige_view_providers_tvl_simple_90d: Get provider TVL for the last 90 days
- resource_vestige_view_providers_tvl_simple_30d: Get provider TVL for the last 30 days
- resource_vestige_view_providers_tvl_simple_7d: Get provider TVL for the last 7 days
- resource_vestige_view_providers_tvl_simple_1d: Get provider TVL for the last day
- resource_vestige_view_assets: Get all tracked assets
- resource_vestige_view_assets_list: Get all tracked assets in a list format
- resource_vestige_view_assets_by_name: Get assets that fit search query
- resource_vestige_view_asset: Get asset info
- resource_vestige_view_asset_price: Get estimated asset price
- resource_vestige_view_asset_views: Get asset views
- resource_vestige_view_asset_holders: Get asset holders
- resource_vestige_view_asset_contributors: Get asset liquidity contributors
- resource_vestige_view_pool_volumes: Get pool volumes and APY across providers
- resource_vestige_view_pools: Get tracked pools or all pools by asset id
- resource_vestige_view_pool: Get pool info
- resource_vestige_view_pool_volume: Get pool volume and APY for a specific pool
- resource_vestige_view_pool_price: Get last price of a pool
- resource_vestige_view_pool_contributors: Get pool contributors
- resource_vestige_view_currency_prices: Get all latest currency prices
- resource_vestige_view_currency_price_history: Get currency prices by timestamp range
- resource_vestige_view_currency_price: Get currency price by timestamp
- resource_vestige_view_currency_average_price: Get average price for currency
- resource_vestige_view_currency_prices_simple_30d: Get currency prices for last 30 days
- resource_vestige_view_currency_prices_simple_7d: Get currency prices for last week
- resource_vestige_view_currency_prices_simple_1d: Get currency prices for last day
- resource_vestige_view_vault: Get vault by id
- resource_vestige_view_recent_vaults: Get last 100 vaults

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

### Available Resources (30)

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


Note: The server path in the configuration should be the absolute path to your compiled server's index.js file.

## Dependencies

- algosdk: Algorand JavaScript SDK
- @perawallet/connect: Pera Wallet connector
- @blockshake/defly-connect: Defly Wallet connector
- @daffiwallet/connect: Daffi Wallet connector

## License

MIT
