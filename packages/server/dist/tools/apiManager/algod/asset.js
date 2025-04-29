import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { algodClient } from '../../../algorand-client.js';
export const assetTools = [
    {
        name: 'api_algod_get_asset_by_id',
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
export async function getAssetByID(assetId) {
    try {
        console.log(`Fetching asset info for ID ${assetId}`);
        const response = await algodClient.getAssetByID(assetId).do();
        console.log('Asset response:', JSON.stringify(response, null, 2));
        return response;
    }
    catch (error) {
        console.error('Asset fetch error:', error);
        if (error instanceof McpError) {
            throw error;
        }
        throw new McpError(ErrorCode.InternalError, `Failed to get asset info: ${error instanceof Error ? error.message : String(error)}`);
    }
}
export async function handleAssetTools(name, args) {
    switch (name) {
        case 'api_algod_get_asset_by_id': {
            const { assetId } = args;
            const info = await getAssetByID(assetId);
            return info;
        }
        default:
            throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
    }
}
