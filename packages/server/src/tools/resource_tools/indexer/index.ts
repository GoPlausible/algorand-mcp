import { accountTools, handleAccountTools } from './account.js';
import { applicationTools, handleApplicationTools } from './application.js';
import { assetTools, handleAssetTools } from './asset.js';
import { transactionTools, handleTransactionTools } from './transaction.js';
import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';

// Combine all indexer tools
export const indexerTools = [
  ...accountTools,
  ...applicationTools,
  ...assetTools,
  ...transactionTools
];

// Handle all indexer resource tools
export async function handleIndexerTools(name: string, args: any): Promise<any> {
  // Transaction tools (including account transactions)
  if (name.startsWith('resource_tool_lookup_transaction') || 
      name.startsWith('resource_tool_search_for_transaction') ||
      name === 'resource_tool_lookup_account_transactions') {
    return handleTransactionTools(name, args);
  }
  
  // Account tools (excluding account transactions)
  if (name.startsWith('resource_tool_lookup_account_') && 
      name !== 'resource_tool_lookup_account_transactions') {
    return handleAccountTools(name, args);
  }
  
  // Application tools
  if (name.startsWith('resource_tool_lookup_application') || 
      name.startsWith('resource_tool_search_for_application')) {
    return handleApplicationTools(name, args);
  }
  
  // Asset tools
  if (name.startsWith('resource_tool_lookup_asset') || 
      name.startsWith('resource_tool_search_for_asset')) {
    return handleAssetTools(name, args);
  }

  throw new McpError(
    ErrorCode.MethodNotFound,
    `Unknown tool: ${name}`
  );
}
