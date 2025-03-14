# Algorand MCP Implementation

## Overview
A Model Context Protocol (MCP) implementation for Algorand blockchain interactions, providing universal ES module support for both browser and Node.js environments. This implementation includes both client and server components for wallet management, transaction signing, and blockchain state queries.

## Features
- Universal ES module support for browser and Node.js
- Complete Algorand blockchain interaction capabilities
- Extensive wallet management system
- Comprehensive transaction handling
- Rich blockchain state querying
- Built-in security features

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

### Tool Categories
1. Account Management Tools
2. Transaction Creation Tools
3. Application Interaction Tools
4. Asset Management Tools
5. Utility Tools
6. Blockchain Query Tools

### Resource Categories
1. Account Resources
2. Transaction Resources
3. Application Resources
4. Asset Resources
5. Node Status Resources
6. Indexer Resources

## Environment Support

### Browser Environment
- Uses Credentials API for secure storage
- Supports all major browsers
- No Node.js specific dependencies

### Node.js Environment
- File-based secure storage
- Dynamic module imports
- ES module compatible

## Dependencies

- algosdk: Algorand JavaScript SDK
- @perawallet/connect: Pera Wallet connector
- @blockshake/defly-connect: Defly Wallet connector
- @daffiwallet/connect: Daffi Wallet connector

## License

MIT
