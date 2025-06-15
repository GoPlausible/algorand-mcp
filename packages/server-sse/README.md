# Algorand Remote MCP Server
This repository contains a remote Model Context Protocol (MCP) server for Algorand, designed to facilitate interaction with the Algorand blockchain using the MCP protocol. It is built on Cloudflare Workers and utilizes Server-Sent Events (SSE) for real-time communication.

# Getting Started
## Connect Claude Desktop to your MCP server

You can also connect to your remote MCP server from local MCP clients, by using the [mcp-remote proxy](https://www.npmjs.com/package/mcp-remote). 

To connect to your MCP server from Claude Desktop, follow [Anthropic's Quickstart](https://modelcontextprotocol.io/quickstart/user) and within Claude Desktop go to Settings > Developer > Edit Config.

Update with this configuration:

```json
{
  "mcpServers": {
    "algorand-remote-mcp": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "http://localhost:8787/sse"  // or algorand-remote-mcp.your-account.workers.dev/sse
      ]
    }
  }
}
```

Restart Claude and you should see the tools become available.

# Development:

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) (Cloudflare Workers CLI)
- An Algorand node access (via AlgoNode, PureStake, or your own node)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GoPlausible/algorand-mcp.git
   cd algorand-mcp/packages/server-sse
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the example environment file and configure it:
   ```bash
   cp .env.example .env
   ```

4. Update the environment variables in `.env` with your Algorand node details and other configuration.

## Development

To run the server locally for development:

```bash
npm run dev
```

This starts the server on `localhost:8787`.

## Deployment

To deploy to Cloudflare Workers:

1. Authenticate with Cloudflare (if not already done):
   ```bash
   npx wrangler login
   ```

2. Deploy to Cloudflare Workers:
   ```bash
   npm run deploy
   ```

Your MCP server will be available at `https://algorand-remote-mcp.[your-worker-subdomain].workers.dev`.

# Available Tools and Resources

## Tools

- **count**: Increment a counter stored in the MCP server
- **add**: Simple addition of two numbers
- **calculate**: Perform basic arithmetic operations (add, subtract, multiply, divide)

*Additional tools will be added as development progresses.*

## Resources

- **counter**: Access the current session request counter value

*Additional resources like wallet information, blockchain data, and API integrations will be added in future releases.*

# Architecture

This MCP server is built using:

- **Cloudflare Workers**: For serverless, edge-based execution
- **Cloudflare Durable Objects**: For state persistence across requests
- **Server-Sent Events (SSE)**: For real-time communication with MCP clients
- **Algorand JavaScript SDK**: For interacting with the Algorand blockchain

The architecture follows these key patterns:

- **McpAgent Pattern**: For handling MCP protocol communication
- **Modular Tools & Resources**: Organized by functionality category
- **State Management**: Using Durable Objects for persistent state

# Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

# License

This project is licensed under the [MIT License](LICENSE).
