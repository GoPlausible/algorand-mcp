import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { algodClient } from '../../algorand-client.js';
import { URI_TEMPLATES, mcpUriToEndpoint } from '../uri-config.js';
import type { 
  Account,
  AccountApplicationResponse,
  AccountAssetResponse
} from 'algosdk/dist/types/client/v2/algod/models/types';
import { ResourceContent, ResourceDefinition } from '../types.js';
import algosdk from 'algosdk';

type ResourceSchema = {
  type: string;
  properties: {
    [key: string]: {
      type: string;
      description: string;
    };
  };
};

export const accountResourceSchemas: { [key: string]: ResourceSchema } = {
  [URI_TEMPLATES.ALGOD_ACCOUNT]: {
    type: 'object',
    properties: {
      address: {
        type: 'string',
        description: 'The account public key'
      },
      amount: {
        type: 'integer',
        description: 'Total number of MicroAlgos in the account'
      },
      amount_without_pending_rewards: {
        type: 'integer',
        description: 'Amount without pending rewards'
      },
      min_balance: {
        type: 'integer',
        description: 'Minimum balance required'
      },
      pending_rewards: {
        type: 'integer',
        description: 'Amount of pending rewards'
      },
      rewards: {
        type: 'integer',
        description: 'Total rewards'
      },
      round: {
        type: 'integer',
        description: 'The round for which this information is relevant'
      },
      status: {
        type: 'string',
        description: 'Online status (online, offline, not participating)'
      }
    }
  },
  [URI_TEMPLATES.ALGOD_ACCOUNT_APPLICATION]: {
    type: 'object',
    properties: {
      'app-local-state': {
        type: 'object',
        description: 'Application local state'
      },
      'created-app': {
        type: 'object',
        description: 'Parameters of created application'
      },
      round: {
        type: 'integer',
        description: 'The round for which this information is relevant'
      }
    }
  },
  [URI_TEMPLATES.ALGOD_ACCOUNT_ASSET]: {
    type: 'object',
    properties: {
      'asset-holding': {
        type: 'object',
        description: 'Asset holding information'
      },
      'created-asset': {
        type: 'object',
        description: 'Parameters of created asset'
      },
      round: {
        type: 'integer',
        description: 'The round for which this information is relevant'
      }
    }
  }
};

export const accountResources: ResourceDefinition[] = [
  {
    uri: URI_TEMPLATES.ALGOD_ACCOUNT,
    name: 'Account Details',
    description: 'Get current account balance, assets, and auth address from algod',
    mimeType: 'application/json',
    schema: accountResourceSchemas[URI_TEMPLATES.ALGOD_ACCOUNT]
  },
  {
    uri: URI_TEMPLATES.ALGOD_ACCOUNT_APPLICATION,
    name: 'Account Application Info',
    description: 'Get account-specific application information from algod',
    mimeType: 'application/json',
    schema: accountResourceSchemas[URI_TEMPLATES.ALGOD_ACCOUNT_APPLICATION]
  },
  {
    uri: URI_TEMPLATES.ALGOD_ACCOUNT_ASSET,
    name: 'Account Asset Info',
    description: 'Get account-specific asset information from algod',
    mimeType: 'application/json',
    schema: accountResourceSchemas[URI_TEMPLATES.ALGOD_ACCOUNT_ASSET]
  }
];

export async function accountInformation(address: string): Promise<Account> {
  try {
    // Validate address format
    if (!algosdk.isValidAddress(address)) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        'Invalid Algorand address format'
      );
    }

    console.log('Fetching account info from algod for address:', address);
    // Get account information from algod
    const response = await algodClient.accountInformation(address).do() as Account;
    console.log('Algod response:', JSON.stringify(response, null, 2));
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

export async function accountApplicationInformation(address: string, appId: number): Promise<AccountApplicationResponse> {
  try {
    // Validate address format
    if (!algosdk.isValidAddress(address)) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        'Invalid Algorand address format'
      );
    }

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

export async function accountAssetInformation(address: string, assetId: number): Promise<AccountAssetResponse> {
  try {
    // Validate address format
    if (!algosdk.isValidAddress(address)) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        'Invalid Algorand address format'
      );
    }

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

export async function handleAccountResources(uri: string): Promise<ResourceContent[]> {
  try {
    // Validate URI format
    if (!uri.startsWith('algorand://')) {
      throw new McpError(ErrorCode.InvalidRequest, 'URI must start with algorand://');
    }

    // Account details
    let match = uri.match(/^algorand:\/\/algod\/accounts\/([^/]+)$/);
    if (match) {
      const address = match[1];
      const endpoint = mcpUriToEndpoint(uri);
      const details = await accountInformation(address);
      return [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(details, null, 2),
      }];
    }

    // Account application info
    match = uri.match(/^algorand:\/\/algod\/accounts\/([^/]+)\/application\/([^/]+)$/);
    if (match) {
      const [, address, appId] = match;
      const endpoint = mcpUriToEndpoint(uri);
      const info = await accountApplicationInformation(address, parseInt(appId, 10));
      return [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(info, null, 2),
      }];
    }

    // Account asset info
    match = uri.match(/^algorand:\/\/algod\/accounts\/([^/]+)\/asset\/([^/]+)$/);
    if (match) {
      const [, address, assetId] = match;
      const endpoint = mcpUriToEndpoint(uri);
      const info = await accountAssetInformation(address, parseInt(assetId, 10));
      return [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(info, null, 2),
      }];
    }

    throw new McpError(ErrorCode.InvalidRequest, 'Invalid account URI format');
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
