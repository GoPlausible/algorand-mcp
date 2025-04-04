import { algodTools, handleAlgodTools } from './algod/index.js';
import { indexerTools, handleIndexerTools } from './indexer/index.js';
import { nfdTools, handleNFDTools } from './nfd/index.js';
import { vestigeTools, handleVestigeTools } from './vestige/index.js';
import { tinymanTools, handleTinymanTools } from './tinyman/index.js';
import { ultradeTools, handleUltradeTools } from './ultrade/index.js';
import { exampleTools, handleExampleTools } from './example/index.js';
import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { ResponseProcessor } from '../utils/responseProcessor.js';

// Combine all resource tools
export const resourceTools = [
  ...algodTools,
  ...indexerTools,
  ...nfdTools,
  ...vestigeTools,
  ...tinymanTools,
  ...ultradeTools,
  ...exampleTools
];

// Handle all resource tools
export async function handleResourceTools(name: string, args: any): Promise<any> {
  try {
    let response;

    // Tinyman tools
    if (name.startsWith('resource_tinyman_')) {
      response = await handleTinymanTools(name, args);
    }
    // Vestige tools
    else if (name.startsWith('resource_vestige_')) {
      response = await handleVestigeTools(name, args);
    }
    // Ultrade tools
    else if (name.startsWith('resource_ultrade_')) {
      response = await handleUltradeTools(name, args);
    }
    // NFD tools - check first since they're most specific
    else if (name.startsWith('resource_nfd_')) {
      response = await handleNFDTools(name, args);
    }
    // Indexer tools
    else if (name.startsWith('resource_indexer_')) {
      response = await handleIndexerTools(name, args);
    }
    // Algod tools - most general get_ prefix, check last
    else if (name.startsWith('resource_algod_')) {
      response = await handleAlgodTools(name, args);
    }
    else if (name.startsWith('resource_example_')) {
      response = await handleExampleTools(name, args);
    }
    else {
      throw new McpError(
        ErrorCode.MethodNotFound,
        `Unknown tool: ${name}`
      );
    }

    // Process and format the response
    return ResponseProcessor.processResponse(response, args?.pageToken);

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
