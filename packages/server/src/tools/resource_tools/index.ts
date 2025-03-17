import { algodTools, handleAlgodTools } from './algod/index.js';
import { indexerTools, handleIndexerTools } from './indexer/index.js';
import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';

// Combine all resource tools
export const resourceTools = [
  ...algodTools,
  ...indexerTools
];

// Handle all resource tools
export async function handleResourceTools(name: string, args: any): Promise<any> {
  try {
    // Algod tools
    if (name.startsWith('resource_tool_get_')) {
      return handleAlgodTools(name, args);
    }
    
    // Indexer tools
    if (name.startsWith('resource_tool_lookup_') || 
        name.startsWith('resource_tool_search_')) {
      return handleIndexerTools(name, args);
    }

    throw new McpError(
      ErrorCode.MethodNotFound,
      `Unknown tool: ${name}`
    );
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to handle resource tool: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
