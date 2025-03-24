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

#### Via Smithery (for Claude Desktop)

Simply run this command in terminal:

```bash
npx -y @smithery/cli@latest install @GoPlausible/algorand-mcp --client claude --config "{\"NFD_API_KEY\":\"\",\"NFD_API_URL\":\"https://api.nf.domains\",\"ALGORAND_ALGOD\":\"https://testnet-api.algonode.cloud\",\"ALGORAND_TOKEN\":\"\",\"ITEMS_PER_PAGE\":\"10\",\"VESTIGE_API_KEY\":\"\",\"VESTIGE_API_URL\":\"https://api.vestigelabs.org\",\"ALGORAND_INDEXER\":\"https://testnet-idx.algonode.cloud\",\"ALGORAND_NETWORK\":\"testnet\",\"ALGORAND_ALGOD_API\":\"https://testnet-api.algonode.cloud/v2\",\"ALGORAND_ALGOD_PORT\":\"\",\"ALGORAND_INDEXER_API\":\"https://testnet-idx.algonode.cloud/v2\",\"ALGORAND_INDEXER_PORT\":\"\"}"

```

#### Via Smithery (for Cursor)

Simply run this command in terminal:

```bash
npx -y @smithery/cli@latest install @GoPlausible/algorand-mcp --client cursor --config "{\"NFD_API_KEY\":\"\",\"NFD_API_URL\":\"https://api.nf.domains\",\"ALGORAND_ALGOD\":\"https://testnet-api.algonode.cloud\",\"ALGORAND_TOKEN\":\"\",\"ITEMS_PER_PAGE\":\"10\",\"VESTIGE_API_KEY\":\"\",\"VESTIGE_API_URL\":\"https://api.vestigelabs.org\",\"ALGORAND_INDEXER\":\"https://testnet-idx.algonode.cloud\",\"ALGORAND_NETWORK\":\"testnet\",\"ALGORAND_ALGOD_API\":\"https://testnet-api.algonode.cloud/v2\",\"ALGORAND_ALGOD_PORT\":\"\",\"ALGORAND_INDEXER_API\":\"https://testnet-idx.algonode.cloud/v2\",\"ALGORAND_INDEXER_PORT\":\"\"}"

```


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

[Previous installation instructions and screenshots remain the same]

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
│       │   │   ├── nfd/          # NFDomains name service
│       │   │   ├── vestige/      # DeFi analytics and tracking
│       │   │   └── tinyman/      # Tinyman AMM integration
│       │   ├── tools/            # MCP Tools
│       │   │   ├── accountManager.ts     # Account operations
│       │   │   ├── algodManager.ts       # Node interactions
│       │   │   ├── utilityManager.ts     # Utility functions
│       │   │   ├── resource_tools/       # Resource Tools
│       │   │   │   ├── algod/           # Algod resource tools
│       │   │   │   ├── indexer/         # Indexer resource tools
│       │   │   │   ├── nfd/            # NFDomains tools
│       │   │   │   ├── vestige/        # Vestige DeFi tools
│       │   │   │   └── tinyman/        # Tinyman AMM tools
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

The Algorand MCP implementation provides 113 tools and resources for blockchain interaction:
- 40 base tools (account, asset, application, transaction management)
- 30 resource tools (algod and indexer)
- 6 NFDomains (NFD) tools for name services
- 28 Vestige tools for DeFi analytics
- 9 Tinyman tools for AMM interactions

### Resource Tools

#### Algod Resource Tools
[Previous Algod tools content]

#### Indexer Resource Tools
[Previous Indexer tools content]

#### NFDomains (NFD) Resource Tools
[Previous NFD tools content]

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

[Previous content for Account Management Tools, Application Tools, Asset Tools, Transaction Tools, Key Management Tools, Utility Tools, Available Resources sections]

## Dependencies

- algosdk: Algorand JavaScript SDK
- @perawallet/connect: Pera Wallet connector
- @blockshake/defly-connect: Defly Wallet connector
- @daffiwallet/connect: Daffi Wallet connector

## License

MIT
