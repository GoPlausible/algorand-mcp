import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { getAlgodClient, extractNetwork } from '../../../algorand-client.js';
import { withCommonParams } from '../../commonParams.js';
import type {
  Account,
  AccountApplicationResponse,
  AccountAssetResponse
} from 'algosdk/dist/types/client/v2/algod/models/types';
import algosdk from 'algosdk';

export const accountTools = [
  {
    name: 'api_algod_get_account_info',
    description: 'Get current account balance, assets, and auth address from algod',
    inputSchema: withCommonParams({
      type: 'object',
      properties: {
        address: {
          type: 'string',
          description: 'The account public key'
        }
      },
      required: ['address']
    })
  },
  {
    name: 'api_algod_get_account_application_info',
    description: 'Get account-specific application information from algod',
    inputSchema: withCommonParams({
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
    })
  },
  {
    name: 'api_algod_get_account_asset_info',
    description: 'Get account-specific asset information from algod',
    inputSchema: withCommonParams({
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
    })
  }
];

export async function getAccountInfo(address: string, args: any): Promise<Account> {
  try {
    // Validate address format
    if (!algosdk.isValidAddress(address)) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        'Invalid Algorand address format'
      );
    }

    const network = extractNetwork(args);
    const algodClient = getAlgodClient(network);

    console.error('Fetching account info from algod for address:', address);
    // Get account information from algod
    const response = await algodClient.accountInformation(address).do() as Account;
    console.error('Algod response:', JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error('Algod error:', error);
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to get account information: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export async function getAccountApplicationInfo(address: string, appId: number, args: any): Promise<AccountApplicationResponse> {
  try {
    // Validate address format
    if (!algosdk.isValidAddress(address)) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        'Invalid Algorand address format'
      );
    }

    const network = extractNetwork(args);
    const algodClient = getAlgodClient(network);

    const response = await algodClient.accountApplicationInformation(address, appId).do() as AccountApplicationResponse;
    return response;
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to get account application info: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export async function getAccountAssetInfo(address: string, assetId: number, args: any): Promise<AccountAssetResponse> {
  try {
    // Validate address format
    if (!algosdk.isValidAddress(address)) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        'Invalid Algorand address format'
      );
    }

    const network = extractNetwork(args);
    const algodClient = getAlgodClient(network);

    const response = await algodClient.accountAssetInformation(address, assetId).do() as AccountAssetResponse;
    return response;
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to get account asset info: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export async function handleAccountTools(name: string, args: any): Promise<any> {
  switch (name) {
    case 'api_algod_get_account_info': {
      const { address } = args;
      const info = await getAccountInfo(address, args);
      return info;
    }
    case 'api_algod_get_account_application_info': {
      const { address, appId } = args;
      const info = await getAccountApplicationInfo(address, appId, args);
      return info;
    }
    case 'api_algod_get_account_asset_info': {
      const { address, assetId } = args;
      const info = await getAccountAssetInfo(address, assetId, args);
      return info;
    }
    default:
      throw new McpError(
        ErrorCode.MethodNotFound,
        `Unknown tool: ${name}`
      );
  }
}
