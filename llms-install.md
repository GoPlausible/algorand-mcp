# Algorand MCP Server Installation Guide

This guide is specifically designed for AI agents like Cursor and Claude Desktop to install and configure the Algorand MCP server for use with LLM applications like Claude Desktop, Cursor and Roo Code.

## Overview

The Algorand MCP server provides a comprehensive set of tools and resources for interacting with the Algorand blockchain through the Model Context Protocol (MCP). It enables AI assistants to perform operations like creating accounts, managing assets, deploying smart contracts, and executing transactions on the Algorand network.

## Prerequisites

Before installation, you need:

1. Node.js v23.6.1 or later
2. npm v10.2.4 or later
3. Access to Algorand node (mainnet or testnet)

## Installation and Configuration

### Configure MCP Settings

Add the Algorand MCP server configuration to your MCP settings file based on your LLM client:

#### Configuration File Locations

Add configuration to your chosen client's MCP settings file:

```json
{
  "mcpServers": {
    "algorand": {
      "command": "node",
      "args": ["/path/to/algorand-mcp/packages/server/dist/index.js"],
      "disabled": false,
      "autoApprove": [],
      "env": {
        "ALGORAND_NETWORK": "testnet",
        "ALGORAND_ALGOD_API": "https://testnet-api.algonode.cloud/v2",
        "ALGORAND_ALGOD": "https://testnet-api.algonode.cloud",
        "ALGORAND_INDEXER_API": "https://testnet-idx.algonode.cloud/v2",
        "ALGORAND_INDEXER": "https://testnet-idx.algonode.cloud",
        "ITEMS_PER_PAGE": "10",
        "ALGORAND_AGENT_WALLET": ""
      }
    }
  }
}
```

Replace `/path/to/algorand-mcp` with the actual path where the server is installed.

## Tool Categories

### 1. Transaction Tools
- Account Transactions (payments, key registration)
- Asset Transactions (create, configure, transfer)
- Application Transactions (deploy, update, call)
- General Transaction Tools (signing, grouping)

### 2. API Tools
- Algod API (node interaction, account info)
- Indexer API (blockchain queries, history)

### 3. Utility Tools
- Address Management
- Byte Conversion
- Application Tools

### 4. ARC-26 Tools
- URI Generation
- QR Code Creation

## Verify Installation

To verify the installation is working:

1. Restart your LLM application (Cursor, Claude Desktop, etc.)

2. Test Transaction Tools:
   ```
   Create a payment transaction using the transaction tools.
   ```

3. Test API Tools:
   ```
   Get account information using the Algod API tools.
   ```

4. Test Utility Tools:
   ```
   Validate an Algorand address using the utility tools.
   ```

5. Test Resources:
   ```
   Access wallet information using the wallet resources.
   ```

## Available Resources

### Wallet Resources
- Secret/Public Key Management
- Mnemonic Access
- Address Management
- Balance/Asset Tracking

### Knowledge Resources
- Algorand Documentation
- Development Guides
- SDK References
- Best Practices

## Troubleshooting

### Common Issues and Solutions

1. **Node Connection Issues**
   - Verify Algorand node URLs are correct
   - Check network selection (mainnet/testnet)
   - Ensure node is accessible

2. **Transaction Failures**
   - Verify account has sufficient funds
   - Check transaction parameters
   - Validate asset configurations

3. **Resource Access Issues**
   - Verify wallet configuration
   - Check environment variables
   - Validate resource URIs

### Tool-Specific Issues

#### Transaction Tools
- Group size limits
- Proper transaction ordering
- Signature requirements

#### API Tools
- Rate limiting considerations
- Response pagination
- Error handling

#### Utility Tools
- Input validation
- Encoding formats
- Type conversions

## Security Considerations

1. **Wallet Security**
   - Secure storage of mnemonics
   - Key management best practices
   - Access control

2. **Transaction Safety**
   - Parameter validation
   - Amount verification
   - Asset verification

3. **API Security**
   - Node authentication
   - Request validation
   - Error handling

## Additional Information

For more detailed information:
- [Visit the Algorand MCP Smithery](https://smithery.ai/server/@GoPlausible/algorand-mcp)
- Check the [Algorand MCP Server Documentation](https://github.com/GoPlausible/algorand-mcp)
- Visit the builder's website at [GoPlausible](https://goplausible.com/)
