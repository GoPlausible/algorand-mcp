import algosdk from 'algosdk';
import { indexerClient } from '../../algorand-client.js';
import { URI_TEMPLATES, mcpUriToEndpoint } from '../uri-config.js';
import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { ResourceContent, ResourceDefinition } from '../types.js';
import { 
  Account,
  AccountResponse,
  AccountsResponse,
  ApplicationLocalStatesResponse,
  AssetHoldingsResponse,
  AssetsResponse,
  ApplicationsResponse,
  TransactionsResponse
} from 'algosdk/dist/types/client/v2/indexer/models/types';

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
  [URI_TEMPLATES.INDEXER_ACCOUNT]: {
    type: 'object',
    properties: {
      account: {
        type: 'string',
        description: 'Account information including balance, assets, and applications'
      },
      currentRound: {
        type: 'string',
        description: 'The round at which this information was current'
      }
    }
  },
  [URI_TEMPLATES.INDEXER_ACCOUNT_TRANSACTIONS]: {
    type: 'object',
    properties: {
      transactions: {
        type: 'string',
        description: 'List of transactions for this account with details'
      },
      currentRound: {
        type: 'string',
        description: 'The round at which this information was current'
      }
    }
  },
  [URI_TEMPLATES.INDEXER_ACCOUNT_APPS_LOCAL_STATE]: {
    type: 'object',
    properties: {
      appsLocalStates: {
        type: 'string',
        description: 'List of applications this account has opted into with local state'
      },
      currentRound: {
        type: 'string',
        description: 'The round at which this information was current'
      }
    }
  },
  [URI_TEMPLATES.INDEXER_ACCOUNT_CREATED_APPS]: {
    type: 'object',
    properties: {
      applications: {
        type: 'string',
        description: 'List of applications created by this account'
      },
      currentRound: {
        type: 'string',
        description: 'The round at which this information was current'
      }
    }
  }
};

export const accountResources: ResourceDefinition[] = [
  {
    uri: URI_TEMPLATES.INDEXER_ACCOUNT,
    name: 'Account Details',
    description: 'Get account information from indexer',
    mimeType: 'application/json',
    schema: accountResourceSchemas[URI_TEMPLATES.INDEXER_ACCOUNT]
  },
  {
    uri: URI_TEMPLATES.INDEXER_ACCOUNT_TRANSACTIONS,
    name: 'Transaction History',
    description: 'Get account transaction history',
    mimeType: 'application/json',
    schema: accountResourceSchemas[URI_TEMPLATES.INDEXER_ACCOUNT_TRANSACTIONS]
  },
  {
    uri: URI_TEMPLATES.INDEXER_ACCOUNT_APPS_LOCAL_STATE,
    name: 'Application Local States',
    description: 'Get account application local states',
    mimeType: 'application/json',
    schema: accountResourceSchemas[URI_TEMPLATES.INDEXER_ACCOUNT_APPS_LOCAL_STATE]
  },
  {
    uri: URI_TEMPLATES.INDEXER_ACCOUNT_CREATED_APPS,
    name: 'Created Applications',
    description: 'Get applications created by this account',
    mimeType: 'application/json',
    schema: accountResourceSchemas[URI_TEMPLATES.INDEXER_ACCOUNT_CREATED_APPS]
  }
];

export async function lookupAccountByID(address: string): Promise<AccountResponse> {
  try {
    const response = await indexerClient.lookupAccountByID(address).do() as AccountResponse;
    return response;
  } catch (error) {
    throw new Error(`Failed to get account info: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function lookupAccountTransactions(address: string, params?: {
  limit?: number;
  beforeTime?: string;
  afterTime?: string;
  nextToken?: string;
}): Promise<TransactionsResponse> {
  try {
    let search = indexerClient.lookupAccountTransactions(address);

    if (params?.limit) {
      search = search.limit(params.limit);
    }
    if (params?.beforeTime) {
      search = search.beforeTime(params.beforeTime);
    }
    if (params?.afterTime) {
      search = search.afterTime(params.afterTime);
    }
    if (params?.nextToken) {
      search = search.nextToken(params.nextToken);
    }

    return await search.do() as TransactionsResponse;
  } catch (error) {
    throw new Error(`Failed to get account transactions: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function lookupAccountAssets(address: string, params?: {
  limit?: number;
  assetId?: number;
  nextToken?: string;
}): Promise<AssetHoldingsResponse> {
  try {
    let search = indexerClient.lookupAccountAssets(address);

    if (params?.limit) {
      search = search.limit(params.limit);
    }
    if (params?.assetId) {
      search = search.assetId(params.assetId);
    }
    if (params?.nextToken) {
      search = search.nextToken(params.nextToken);
    }

    return await search.do() as AssetHoldingsResponse;
  } catch (error) {
    throw new Error(`Failed to get account assets: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function lookupAccountAppLocalStates(address: string): Promise<ApplicationLocalStatesResponse> {
  try {
    return await indexerClient.lookupAccountAppLocalStates(address).do() as ApplicationLocalStatesResponse;
  } catch (error) {
    throw new Error(`Failed to get account application local states: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function lookupAccountCreatedApplications(address: string): Promise<ApplicationsResponse> {
  try {
    return await indexerClient.lookupAccountCreatedApplications(address).do() as ApplicationsResponse;
  } catch (error) {
    throw new Error(`Failed to get account created applications: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function handleAccountResources(uri: string): Promise<ResourceContent[]> {
  try {
    // Validate URI format
    if (!uri.startsWith('algorand://')) {
      return [];
    }

    let match;

    // Account details
    match = uri.match(/^algorand:\/\/indexer\/accounts\/([^/]+)$/);
    if (match) {
      const address = match[1];
      try {
        const endpoint = mcpUriToEndpoint(uri);
        const response = await lookupAccountByID(address);
        return [{
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(response, null, 2),
        }];
      } catch (error) {
        console.error('Error fetching account details:', error);
        throw new McpError(
          ErrorCode.InternalError,
          `Failed to get account details: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }

    // Transaction history
    match = uri.match(/^algorand:\/\/indexer\/accounts\/([^/]+)\/transactions$/);
    if (match) {
      const address = match[1];
      const response = await lookupAccountTransactions(address);
      return [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(response, null, 2),
      }];
    }

    // Application local states
    match = uri.match(/^algorand:\/\/indexer\/accounts\/([^/]+)\/apps-local-state$/);
    if (match) {
      const address = match[1];
      const response = await lookupAccountAppLocalStates(address);
      return [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(response, null, 2),
      }];
    }

    // Created applications
    match = uri.match(/^algorand:\/\/indexer\/accounts\/([^/]+)\/created-applications$/);
    if (match) {
      const address = match[1];
      const response = await lookupAccountCreatedApplications(address);
      return [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(response, null, 2),
      }];
    }

    return [];
  } catch (error) {
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to handle resource: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export async function searchAccounts(params?: {
  limit?: number;
  assetId?: number;
  applicationId?: number;
  currencyGreaterThan?: number;
  currencyLessThan?: number;
  nextToken?: string;
}): Promise<AccountsResponse> {
  try {
    let search = indexerClient.searchAccounts();

    if (params?.limit) {
      search = search.limit(params.limit);
    }
    if (params?.assetId) {
      search = search.assetID(params.assetId);
    }
    if (params?.applicationId) {
      search = search.applicationID(params.applicationId);
    }
    if (params?.currencyGreaterThan) {
      search = search.currencyGreaterThan(params.currencyGreaterThan);
    }
    if (params?.currencyLessThan) {
      search = search.currencyLessThan(params.currencyLessThan);
    }
    if (params?.nextToken) {
      search = search.nextToken(params.nextToken);
    }

    return await search.do() as AccountsResponse;
  } catch (error) {
    throw new Error(`Failed to search accounts: ${error instanceof Error ? error.message : String(error)}`);
  }
}
