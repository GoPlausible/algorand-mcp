import { algodTools, handleAlgodTools } from './algod/index.js';
import { indexerTools, handleIndexerTools } from './indexer/index.js';
import { nfdTools, handleNFDTools } from './nfd/index.js';
import { vestigeTools, handleVestigeTools } from './vestige/index.js';
import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';

// Combine all resource tools
export const resourceTools = [
  ...algodTools,
  ...indexerTools,
  ...nfdTools,
  ...vestigeTools
];

// Handle all resource tools
export async function handleResourceTools(name: string, args: any): Promise<any> {
  try {
    // Vestige tools
    if (name.startsWith('resource_tool_view_')) {
      return handleVestigeTools(name, args);
    }

    // NFD tools - check first since they're most specific
    if (name.startsWith('resource_tool_get_nfd') || 
        name.startsWith('resource_tool_browse_nfds') ||
        name.startsWith('resource_tool_search_nfds')) {
      return handleNFDTools(name, args);
    }
    
    // Indexer tools
    if (name.startsWith('resource_tool_lookup_') || 
        name.startsWith('resource_tool_search_')) {
      return handleIndexerTools(name, args);
    }

    // Algod tools - most general get_ prefix, check last
    if (name.startsWith('resource_tool_get_')) {
      return handleAlgodTools(name, args);
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
