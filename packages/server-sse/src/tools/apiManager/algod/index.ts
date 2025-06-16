/**
 * Algod API Manager
 * Exports and registers all Algorand node API tools
 */

import { registerAccountApiTools } from './account';
import { registerApplicationApiTools } from './application';
import { registerAssetApiTools } from './asset';
import { registerTransactionApiTools } from './transaction';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * Register all Algorand node API tools to the MCP server
 */
export function registerAlgodApiTools(server: McpServer): void {
  registerAccountApiTools(server);
  registerApplicationApiTools(server);
  registerAssetApiTools(server);
  registerTransactionApiTools(server);
}
