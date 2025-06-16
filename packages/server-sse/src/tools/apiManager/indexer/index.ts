/**
 * Indexer API Manager
 * Exports and registers all Algorand indexer API tools
 */

import { registerIndexerAccountTools } from './account';
import { registerIndexerApplicationTools } from './application';
import { registerIndexerAssetTools } from './asset';
import { registerIndexerTransactionTools } from './transaction';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * Register all indexer API tools to the MCP server
 */
export function registerIndexerApiTools(server: McpServer): void {
  registerIndexerAccountTools(server);
  registerIndexerApplicationTools(server);
  registerIndexerAssetTools(server);
  registerIndexerTransactionTools(server);
}
