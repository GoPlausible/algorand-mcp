# Algorand MCP Server Installation Guide

This guide is specifically designed for AI agents like Cursor and Claude Desktop to install and configure the Algorand MCP server for use with LLM applications like Claude Desktop, Cursor and Roo Code.

## Overview

The Algorand MCP server provides a comprehensive set of tools and resources for interacting with the Algorand blockchain through the Model Context Protocol (MCP). It enables AI assistants to perform operations like creating accounts, managing assets, deploying smart contracts, and executing transactions on the Algorand network.

## Prerequisites

Before installation, you need:

1. Node.js v23.6.1 or later
2. npm v10.2.4 or later

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
        "NFD_API_URL":"https://api.nf.domains",
        "VESTIGE_API_URL":"https://free-api.vestige.fi",
        "ITEMS_PER_PAGE":"10"
      }
    }
  }
}
```

Replace `/path/to/algorand-mcp` with the actual path where the server is installed.

## Verify Installation

To verify the installation is working:

1. Restart your LLM application (Cursor, Claude Desktop, etc.)
2. Test the connection by running a simple command like:
   ```
   Please create a new Algorand account using the Algorand MCP server.
   ```

## Troubleshooting

### Common Issues and Solutions

1. **MCP server connection issues**
   - Verify the syntax in your MCP settings file is correct
   - Ensure Node.js and npm versions meet the requirements
   - Check if any other MCP servers are causing conflicts

2. **Transaction failures**
   - Verify you have sufficient funds for the operation
   - Check if you're using the correct address format
   - Ensure your node connection is working

3. **JSON parsing errors in configuration**
   - Make sure your MCP settings file is properly formatted
   - Verify all paths use forward slashes, even on Windows
   - Check for any missing commas or brackets in the configuration

## Additional Information

For more detailed information:
- [Visit the Algorand MCP Smithery](https://smithery.ai/server/@GoPlausible/algorand-mcp)
- Check the [Algorand MCP Server Documentation](https://github.com/GoPlausible/algorand-mcp)
- Visit the builder's website at [GoPlausible](https://goplausible.com/)
