# Algorand MCP Client

## Overview
The Algorand MCP Client provides a unified interface for wallet connectivity and transaction signing. It offers seamless integration with multiple wallet providers and secure local wallet functionality, making it easy to manage Algorand accounts and sign transactions.

## Requirements
- Node.js v23.6.1 or later
- npm v10.2.4 or later

## Features
- Comprehensive wallet connectivity
- Local wallet with secure storage
- Support for popular external wallets:
  - Pera Wallet
  - Defly Wallet
  - Daffi Wallet
- Secure credential management
- Transaction signing and session management
- TypeScript support with full type definitions

## Installation

```bash
# Install the client package
npm install @algorand-mcp/client

# Optional: Create .env file for custom configuration
cp .env.example .env
```

The client comes with built-in defaults for testnet:
```bash
# Default configuration (no setup required)
ALGORAND_NETWORK="testnet"
```

## Project Structure

```
src/
├── index.ts        # Main client implementation and wallet management
├── LocalWallet.ts  # Local wallet implementation
└── env.ts         # Environment configuration
```

## Installation

```bash
npm install @algorand-mcp/client
```

## Features

### Universal ES Module Support
- Works in both browser and Node.js environments
- No environment-specific dependencies
- Dynamic imports for Node.js modules
- Browser-compatible credential storage

### Wallet Support

#### Local Wallet
The Local Wallet provides a secure, environment-aware wallet implementation:

**Browser Environment:**
- Uses the Web Credentials API for secure mnemonic storage
- Encrypted storage of sensitive data
- Persistent across sessions
- No external dependencies

**Node.js Environment:**
- File-based mnemonic storage
- Encrypted .mnemonic files
- Project directory storage
- Secure file permissions

**Methods:**
- `connect()`: Creates new account if none exists
- `reconnectSession()`: Reconnects to existing account
- `disconnect()`: Clears current session
- `signTransactions()`: Signs transaction groups
- `makeTransactionSigner()`: Creates algosdk-compatible signer

#### External Wallets
Support for popular Algorand wallets:

1. **Pera Wallet**
   - Most widely used Algorand wallet
   - Mobile and browser support
   - QR code connectivity

2. **Defly Wallet**
   - Advanced features
   - DeFi focused
   - Built-in analytics

3. **Daffi Wallet**
   - User-friendly interface
   - Beginner focused
   - Simple transaction flow

**Common Methods:**
- `connect()`: Initiates wallet connection
- `reconnectSession()`: Restores previous session
- `disconnect()`: Ends wallet session
- `signTransactions()`: Signs transaction groups

## Usage

### Basic Setup

```typescript
import { AlgorandMcpClient } from '@algorand-mcp/client';

// Initialize client
const client = new AlgorandMcpClient({
  network: 'testnet'  // 'mainnet' or 'localnet'
});
```

### Local Wallet

```typescript
// Connect to local wallet (creates new if none exists)
const [address] = await client.connect('local');
console.log('Connected address:', address);

// Sign transactions
const signedTxns = await client.signTransactions([[
  { txn: someTransaction, message: 'Optional message' }
]]);

// Get algosdk-compatible signer
const signer = await client.makeTransactionSigner();
const signedTxn = await signer([transaction], [0]);

// Disconnect
await client.disconnect();
```

### External Wallets

```typescript
// Connect to Pera Wallet
const addresses = await client.connect('pera');
console.log('Connected addresses:', addresses);

// Sign transaction group
const signedTxns = await client.signTransactions([
  [{ txn: tx1 }, { txn: tx2 }]  // Transaction group
]);

// Disconnect
await client.disconnect();
```

### Session Management

```typescript
// Save session for later
const addresses = await client.connect('pera');
// ... Later, in a new session:
const reconnected = await client.reconnectSession('pera');
if (reconnected) {
  console.log('Session restored');
}
```

## Advanced Usage

### Multiple Wallet Support

```typescript
// Switch between wallets
await client.connect('pera');
// ... do something with Pera
await client.disconnect();

await client.connect('local');
// ... do something with local wallet
await client.disconnect();
```

### Transaction Signing with Messages

```typescript
const signedTxns = await client.signTransactions([[
  {
    txn: paymentTxn,
    message: 'Send 1 ALGO to Bob'
  },
  {
    txn: assetTxn,
    message: 'Opt into ASA'
  }
]]);
```

### Error Handling

```typescript
try {
  await client.connect('pera');
} catch (error) {
  if (error.code === 'user-rejected') {
    console.log('User rejected connection');
  } else if (error.code === 'wallet-not-found') {
    console.log('Wallet not installed');
  } else {
    console.error('Unknown error:', error);
  }
}
```

## Environment Variables

```bash
# Optional - defaults to testnet
ALGORAND_NETWORK="mainnet"

# Optional - for custom node URLs
ALGOD_SERVER="http://localhost:4001"
ALGOD_TOKEN="your_token"
ALGOD_PORT="4001"
```

## Security Considerations

### Local Wallet
- Mnemonics are always encrypted before storage
- Secure credential management
- Memory is cleared after use

### External Wallets
- No sensitive data is stored by the client
- All signing happens in the wallet
- Session data is encrypted

## Best Practices

1. **Always handle disconnects:**
   ```typescript
   window.addEventListener('beforeunload', () => {
     client.disconnect();
   });
   ```

2. **Provide clear transaction messages:**
   ```typescript
   await client.signTransactions([[{
     txn: transaction,
     message: 'Clear description of what this does'
   }]]);
   ```

3. **Check network before connecting:**
   ```typescript
   if (client.network !== 'mainnet') {
     console.warn('Not connected to mainnet!');
   }
   ```

4. **Implement proper error handling:**
   ```typescript
   try {
     await client.connect('pera');
   } catch (error) {
     handleError(error);
   }
   ```

5. **Clean up resources:**
   ```typescript
   async function cleanup() {
     await client.disconnect();
     // other cleanup
   }
   ```

## Troubleshooting

Common issues and solutions:

1. **Wallet not connecting**
   - Check if wallet is installed
   - Verify network matches wallet
   - Clear browser cache if needed

2. **Transaction signing fails**
   - Verify account has sufficient balance
   - Check transaction parameters
   - Ensure wallet is still connected

3. **Session not restoring**
   - Clear stored session data
   - Reconnect from scratch
   - Check for wallet updates

## License

MIT
