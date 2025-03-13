import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { algodClient } from '../../algorand-client.js';
import { URI_TEMPLATES, mcpUriToEndpoint } from '../uri-config.js';
import type { Asset } from 'algosdk/dist/types/client/v2/algod/models/types';
import { ResourceContent, ResourceDefinition } from '../types.js';

type ResourceSchema = {
  type: string;
  properties: {
    [key: string]: {
      type: string;
      description: string;
    };
  };
};

export const assetResourceSchemas: { [key: string]: ResourceSchema } = {
  [URI_TEMPLATES.ALGOD_ASSET]: {
    type: 'object',
    properties: {
      index: {
        type: 'integer',
        description: 'Asset ID'
      },
      params: {
        type: 'object',
        description: 'Asset parameters including creator, total supply, decimals, etc.'
      }
    }
  }
};

export const assetResources: ResourceDefinition[] = [
  {
    uri: URI_TEMPLATES.ALGOD_ASSET,
    name: 'Asset Info',
    description: 'Get current asset information from algod',
    mimeType: 'application/json',
    schema: assetResourceSchemas[URI_TEMPLATES.ALGOD_ASSET]
  }
];

export async function getAssetByID(assetId: number): Promise<Asset> {
  try {
    const response = await algodClient.getAssetByID(assetId).do() as Asset;
    return response;
  } catch (error) {
    throw new Error(`Failed to get asset info: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function handleAssetResources(uri: string): Promise<ResourceContent[]> {
  try {
    // Validate URI format
    if (!uri.startsWith('algorand://')) {
      throw new McpError(ErrorCode.InvalidRequest, 'URI must start with algorand://');
    }

    const match = uri.match(/^algorand:\/\/algod\/assets\/([^/]+)$/);
    if (!match) {
      return []; // Return empty array if URI doesn't match asset pattern
    }

    const assetId = parseInt(match[1], 10);
    const info = await getAssetByID(assetId);

    return [{
      uri,
      mimeType: 'application/json',
      text: JSON.stringify(info, null, 2),
    }];
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
