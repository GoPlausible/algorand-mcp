import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { ResourceContent, ResourceResponse, ResourceDefinition } from './types.js';
import { URI_TEMPLATES } from './uri-config.js';

// Import NFD resources
import {
  nfdResources,
  nfdResourceSchemas,
  handleNFDResources
} from './nfd/index.js';

// Import Vestige resources
import {
  vestigeResources,
  vestigeResourceSchemas,
  handleVestigeResources
} from './vestige/index.js';

// Import algod resources
import { 
  accountResources as algodAccountResources, 
  accountResourceSchemas as algodAccountSchemas,
  handleAccountResources as handleAlgodAccountResource,
  applicationResources as algodApplicationResources,
  applicationResourceSchemas as algodApplicationSchemas,
  handleApplicationResources as handleAlgodApplicationResources,
  assetResources as algodAssetResources,
  assetResourceSchemas as algodAssetSchemas,
  handleAssetResources as handleAlgodAssetResources,
  transactionResources,
  transactionResourceSchemas,
  handleTransactionResources
} from './algod/index.js';

// Import indexer resources
import { 
  accountResources as indexerAccountResources, 
  accountResourceSchemas as indexerAccountSchemas,
  handleAccountResources as handleIndexerAccountResources,
  applicationResources as indexerApplicationResources,
  applicationResourceSchemas as indexerApplicationSchemas,
  handleApplicationResources as handleIndexerApplicationResources,
  assetResources,
  assetResourceSchemas,
  handleAssetResources,
  transactionResources as indexerTransactionResources,
  transactionResourceSchemas as indexerTransactionSchemas,
  handleTransactionResources as handleIndexerTransactionResources
} from './indexer/index.js';

export class ResourceManager {
  static resources = [
    ...algodAccountResources,
    ...indexerAccountResources,
    ...algodApplicationResources,
    ...indexerApplicationResources,
    ...algodAssetResources,
    ...assetResources,
    ...transactionResources,
    ...indexerTransactionResources,
    ...nfdResources,
    ...vestigeResources
  ];

  static schemas = {
    ...algodAccountSchemas,
    ...indexerAccountSchemas,
    ...algodApplicationSchemas,
    ...indexerApplicationSchemas,
    ...algodAssetSchemas,
    ...assetResourceSchemas,
    ...transactionResourceSchemas,
    ...indexerTransactionSchemas,
    ...nfdResourceSchemas,
    ...vestigeResourceSchemas
  };

  static async handleResource(uri: string): Promise<ResourceResponse> {
    try {
      // Route to appropriate handler based on URI prefix and path
      let contents: ResourceContent[] = [];

      if (!uri.startsWith('algorand://')) {
        throw new McpError(ErrorCode.InvalidRequest, 'URI must start with algorand://');
      }

      // Extract the source (algod/indexer/nfd/vestige) and resource type from URI
      const [, source, resourceType] = uri.match(/^algorand:\/\/([^/]+)\/([^/]+)/) || [];

      if (!source || !resourceType) {
        throw new McpError(ErrorCode.InvalidRequest, `Invalid URI format: ${uri}`);
      }

      // Handle resources based on source and type
      switch (source) {
        case 'algod':
          switch (resourceType) {
            case 'accounts':
              contents = await handleAlgodAccountResource(uri);
              break;
            case 'applications':
              contents = await handleAlgodApplicationResources(uri);
              break;
            case 'assets':
              contents = await handleAlgodAssetResources(uri);
              break;
            case 'transactions':
              contents = await handleTransactionResources(uri);
              break;
              case 'status':
              contents = await handleTransactionResources(uri);
              break;
            default:
              throw new McpError(ErrorCode.InvalidRequest, `Invalid algod resource type: ${resourceType}`);
          }
          break;

        case 'indexer':
          switch (resourceType) {
            case 'accounts':
              contents = await handleIndexerAccountResources(uri);
              break;
            case 'applications':
              contents = await handleIndexerApplicationResources(uri);
              break;
            case 'assets':
              contents = await handleAssetResources(uri);
              break;
            case 'transactions':
              contents = await handleIndexerTransactionResources(uri);
              break;
            default:
              throw new McpError(ErrorCode.InvalidRequest, `Invalid indexer resource type: ${resourceType}`);
          }
          break;

        case 'nfd':
          contents = await handleNFDResources(uri);
          break;

        case 'vestige':
          contents = await handleVestigeResources(uri);
          break;

        default:
          throw new McpError(ErrorCode.InvalidRequest, `Invalid source type: ${source}`);
      }

      if (contents.length > 0) {
        return { contents };
      }

      throw new McpError(ErrorCode.InvalidRequest, `Invalid URI format: ${uri}`);
    } catch (error) {
      if (error instanceof McpError) {
        throw error;
      }
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to handle resource: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}
