import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { algodClient } from '../../../algorand-client.js';
import type { Asset } from 'algosdk/dist/types/client/v2/algod/models/types';

export const assetTools = [
  {
    name: 'resource_tool_get_asset_by_id',
    description: 'Get current asset information from algod',
    inputSchema: {
      type: 'object',
      properties: {
        assetId: {
          type: 'integer',
          description: 'Asset ID'
        }
      },
      required: ['assetId']
    }
  }
];

export async function getAssetByID(assetId: number): Promise<Asset> {
  try {
    console.log(`Fetching asset info for ID ${assetId}`);
    const response = await algodClient.getAssetByID(assetId).do() as Asset;
    console.log('Asset response:', JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error('Asset fetch error:', error);
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to get asset info: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export async function handleAssetTools(name: string, args: any): Promise<any> {
  switch (name) {
    case 'resource_tool_get_asset_by_id': {
      const { assetId } = args;
      const info = await getAssetByID(assetId);
      return {
        content: [{
          type: 'text',
          text: JSON.stringify(info, null, 2)
        }]
      };
    }
    default:
      throw new McpError(
        ErrorCode.MethodNotFound,
        `Unknown tool: ${name}`
      );
  }
}
