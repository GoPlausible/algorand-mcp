import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { algodClient } from '../../../algorand-client.js';
import algosdk from 'algosdk';
export const accountTools = [
    {
        name: 'api_algod_get_account_info',
        description: 'Get current account balance, assets, and auth address from algod',
        inputSchema: {
            type: 'object',
            properties: {
                address: {
                    type: 'string',
                    description: 'The account public key'
                }
            },
            required: ['address']
        }
    },
    {
        name: 'api_algod_get_account_application_info',
        description: 'Get account-specific application information from algod',
        inputSchema: {
            type: 'object',
            properties: {
                address: {
                    type: 'string',
                    description: 'The account public key'
                },
                appId: {
                    type: 'integer',
                    description: 'The application ID'
                }
            },
            required: ['address', 'appId']
        }
    },
    {
        name: 'api_algod_get_account_asset_info',
        description: 'Get account-specific asset information from algod',
        inputSchema: {
            type: 'object',
            properties: {
                address: {
                    type: 'string',
                    description: 'The account public key'
                },
                assetId: {
                    type: 'integer',
                    description: 'The asset ID'
                }
            },
            required: ['address', 'assetId']
        }
    }
];
export async function getAccountInfo(address) {
    try {
        // Validate address format
        if (!algosdk.isValidAddress(address)) {
            throw new McpError(ErrorCode.InvalidRequest, 'Invalid Algorand address format');
        }
        console.log('Fetching account info from algod for address:', address);
        // Get account information from algod
        const response = await algodClient.accountInformation(address).do();
        console.log('Algod response:', JSON.stringify(response, null, 2));
        return response;
    }
    catch (error) {
        console.error('Algod error:', error);
        if (error instanceof McpError) {
            throw error;
        }
        throw new McpError(ErrorCode.InternalError, `Failed to get account information: ${error instanceof Error ? error.message : String(error)}`);
    }
}
export async function getAccountApplicationInfo(address, appId) {
    try {
        // Validate address format
        if (!algosdk.isValidAddress(address)) {
            throw new McpError(ErrorCode.InvalidRequest, 'Invalid Algorand address format');
        }
        const response = await algodClient.accountApplicationInformation(address, appId).do();
        return response;
    }
    catch (error) {
        if (error instanceof McpError) {
            throw error;
        }
        throw new McpError(ErrorCode.InternalError, `Failed to get account application info: ${error instanceof Error ? error.message : String(error)}`);
    }
}
export async function getAccountAssetInfo(address, assetId) {
    try {
        // Validate address format
        if (!algosdk.isValidAddress(address)) {
            throw new McpError(ErrorCode.InvalidRequest, 'Invalid Algorand address format');
        }
        const response = await algodClient.accountAssetInformation(address, assetId).do();
        return response;
    }
    catch (error) {
        if (error instanceof McpError) {
            throw error;
        }
        throw new McpError(ErrorCode.InternalError, `Failed to get account asset info: ${error instanceof Error ? error.message : String(error)}`);
    }
}
export async function handleAccountTools(name, args) {
    switch (name) {
        case 'api_algod_get_account_info': {
            const { address } = args;
            const info = await getAccountInfo(address);
            return info;
        }
        case 'api_algod_get_account_application_info': {
            const { address, appId } = args;
            const info = await getAccountApplicationInfo(address, appId);
            return info;
        }
        case 'api_algod_get_account_asset_info': {
            const { address, assetId } = args;
            const info = await getAccountAssetInfo(address, assetId);
            return info;
        }
        default:
            throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
    }
}
