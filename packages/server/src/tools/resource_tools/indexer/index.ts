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
  const toolArgs = { ...args, name };

  // Transaction tools (including account transactions)
  if (name === 'resource_indexer_lookup_transaction_by_id' ||
      name === 'resource_indexer_lookup_account_transactions' ||
      name.startsWith('resource_indexer_search_for_transaction')) {
    return handleTransactionTools(toolArgs);
  }
  
  // Account tools (excluding account transactions)
  if ((name.startsWith('resource_indexer_lookup_account_') && 
      name !== 'resource_indexer_lookup_account_transactions') ||
      name === 'resource_indexer_search_for_accounts') {
    return handleAccountTools(toolArgs);
  }
  
  // Application tools
  if (name.startsWith('resource_indexer_lookup_application') || 
      name.startsWith('resource_indexer_search_for_application')) {
    return handleApplicationTools(toolArgs);
  }
  
  // Asset tools
  if (name.startsWith('resource_indexer_lookup_asset') || 
      name.startsWith('resource_indexer_search_for_asset')) {
    return handleAssetTools(toolArgs);
  }

  throw new McpError(
    ErrorCode.MethodNotFound,
    `Unknown tool: ${name}`
  );
}
