# Algorand MCP Implementation

A Model Context Protocol (MCP) implementation for Algorand blockchain interactions, providing universal ES module support for both browser and Node.js environments. This implementation includes both client and server components for wallet management, transaction signing, and blockchain state queries.

## Project Structure

```
algorand-mcp/
├── packages/
│   ├── client/                    # Client Package
│   │   ├── src/
│   │   │   ├── index.ts          # Client entry point and wallet management
│   │   │   └── LocalWallet.ts    # Local wallet implementation (browser/Node.js)
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── server/                    # Server Package
│       ├── src/
│       │   ├── resources/         # MCP Resources
│       │   │   ├── index.ts      # Resource exports (algod/indexer namespaces)
│       │   │   ├── algod/        # Real-time blockchain state
│       │   │   │   ├── index.ts  # Algod blockchain states resources
│       │   │   │   ├── account.ts        # Account information
│       │   │   │   ├── application.ts    # Application state
│       │   │   │   ├── asset.ts          # Asset details
│       │   │   │   └── transaction.ts    # Pending transactions
│       │   │   └── indexer/      # Historical blockchain data
│       │   │       ├── index.ts  # Indexer resource exports
│       │   │       ├── account.ts        # Account history
│       │   │       ├── application.ts    # Application history
│       │   │       ├── asset.ts          # Asset history
│       │   │       └── transaction.ts    # Transaction history
│       │   ├── tools/            # MCP Tools
│       │   │   ├── index.ts      # Tool exports
│       │   │   ├── accountManager.ts     # Account operations
│       │   │   ├── algodManager.ts       # Node interactions
│       │   │   ├── transactionManager.ts # Transaction handling
│       │   │   └── utilityManager.ts     # Utility functions
│       │   ├── config.ts         # Server configuration
│       │   └── index.ts          # Server entry point
│       ├── package.json
│       └── tsconfig.json
├── package.json                   # Root package file
└── tsconfig.json                 # Root TypeScript config
```

## Features

### Universal ES Module Support
- Works in both browser and Node.js environments
- No environment-specific dependencies
- Dynamic imports for Node.js modules
- Browser-compatible credential storage

### Client Capabilities

#### Wallet Support
- **Local Wallet**
  - Browser: Uses Credentials API for secure mnemonic storage
  - Node.js: Uses .mnemonic files in project directory
  - Methods:
    - `connect()`: Creates new account if none exists
    - `reconnectSession()`: Reconnects to existing account
    - `disconnect()`: Clears current session
    - `signTransactions()`: Signs transaction groups
    - `makeTransactionSigner()`: Creates algosdk-compatible transaction signer

- **External Wallets**
  - Pera Wallet
  - Defly Wallet
  - Daffi Wallet
  - Methods:
    - `connect()`: Initiates wallet connection
    - `reconnectSession()`: Restores previous session
    - `disconnect()`: Ends wallet session
    - `signTransactions()`: Signs transaction groups

### Server Resources

1. **Account Information**
   - URI: `algorand://account/{address}`
   - Returns: Account balance, assets, and auth address
   - Source: Algod API

2. **Transaction History**
   - URI: `algorand://account/{address}/transactions`
   - Returns: Account transaction history
   - Source: Indexer API

3. **Asset Holdings**
   - URI: `algorand://account/{address}/assets`
   - Returns: Account's ASA holdings
   - Source: Indexer API

4. **Application State**
   - URI: `algorand://app/{app-id}/state`
   - Returns: Application global and local state
   - Source: Algod API

### Server Tools

1. **create_account**
   - Creates new Algorand account
   - Returns: `{ address: string, mnemonic: string }`
   - No parameters required

2. **rekey_account**
   - Creates rekey transaction
   - Parameters:
     ```typescript
     {
       sourceAddress: string,  // Account to rekey
       targetAddress: string   // New authorized address
     }
     ```

## Installation

```bash
npm install @algorand-mcp/client @algorand-mcp/server
```

## Usage Examples

### Client Usage

```typescript
import { AlgorandMcpClient } from '@algorand-mcp/client';

// Initialize client
const client = new AlgorandMcpClient({
  network: 'testnet'  // or 'mainnet' or 'localnet'
});

// Using Local Wallet
async function useLocalWallet() {
  // Connect creates new account if none exists
  const [address] = await client.connect('local');
  
  // Sign transactions
  const signedTxns = await client.signTransactions([[
    { txn: someTransaction, message: 'Optional message' }
  ]]);
  
  // Get transaction signer (algosdk compatible)
  const signer = await client.makeTransactionSigner();
  const signedTxn = await signer([transaction], [0]);
  
  await client.disconnect();
}

// Using External Wallet (Pera, Defly, or Daffi)
async function useExternalWallet() {
  // Connect to Pera wallet
  const addresses = await client.connect('pera');
  
  // Sign transaction group
  const signedTxns = await client.signTransactions([
    [{ txn: tx1 }, { txn: tx2 }]  // Transaction group
  ]);
  
  await client.disconnect();
}

// Reconnecting to previous session
async function reconnect() {
  const addresses = await client.reconnectSession('pera');
  // Wallet is ready to use
}
```

### Server Usage

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { AlgorandMcpServer } from '@algorand-mcp/server';

const server = new AlgorandMcpServer();
await server.run();

// Example resource request
GET algorand://account/ABCD1234/assets
Response: {
  "assets": [
    {
      "asset-id": 123,
      "amount": 1000
    }
  ]
}

// Example tool request
POST /tools/create_account
Response: {
  "address": "ABCD1234...",
  "mnemonic": "word1 word2 ..."
}
```

## Environment Support

### Browser Environment
- Uses Credentials API for secure mnemonic storage
- Supports all major browsers
- No Node.js specific imports

### Node.js Environment
- Uses .mnemonic files in project directory
- Dynamic imports for fs/promises and path
- ES module compatible

## Development

1. Build packages:
   ```bash
   npm run build
   ```

2. Run tests:
   ```bash
   npm test
   ```

## Dependencies

- algosdk: Algorand JavaScript SDK
- @perawallet/connect: Pera Wallet connector
- @blockshake/defly-connect: Defly Wallet connector
- @daffiwallet/connect: Daffi Wallet connector

## License

MIT
