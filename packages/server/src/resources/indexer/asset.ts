import algosdk from 'algosdk';
import { indexerClient } from '../../algorand-client.js';
import { URI_TEMPLATES, mcpUriToEndpoint } from '../uri-config.js';
import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { ResourceContent, ResourceDefinition } from '../types.js';
import { 
  Asset,
  AssetResponse,
  AssetsResponse,
  AssetBalancesResponse,
  MiniAssetHolding,
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

export const assetResourceSchemas: { [key: string]: ResourceSchema } = {
  [URI_TEMPLATES.INDEXER_ASSETS]: {
    type: 'object',
    properties: {
      assets: {
        type: 'string',
        description: 'List of assets matching the search criteria with their configurations'
      },
      currentRound: {
        type: 'string',
        description: 'The round at which this information was current'
      }
    }
  },
  [URI_TEMPLATES.INDEXER_ASSET]: {
    type: 'object',
    properties: {
      asset: {
        type: 'string',
        description: 'Asset information including total supply, decimals, and creator'
      },
      currentRound: {
        type: 'string',
        description: 'The round at which this information was current'
      }
    }
  },
  [URI_TEMPLATES.INDEXER_ASSET_BALANCES]: {
    type: 'object',
    properties: {
      balances: {
        type: 'string',
        description: 'List of accounts holding this asset with their balances'
      },
      currentRound: {
        type: 'string',
        description: 'The round at which this information was current'
      }
    }
  },
  [URI_TEMPLATES.INDEXER_ASSET_TRANSACTIONS]: {
    type: 'object',
    properties: {
      transactions: {
        type: 'string',
        description: 'List of transactions involving this asset with details'
      },
      currentRound: {
        type: 'string',
        description: 'The round at which this information was current'
      }
    }
  },
  [URI_TEMPLATES.INDEXER_ASSET_BALANCE_BY_ADDRESS]: {
    type: 'object',
    properties: {
      balance: {
        type: 'string',
        description: 'Asset balance and opt-in status for the specified account'
      },
      currentRound: {
        type: 'string',
        description: 'The round at which this information was current'
      }
    }
  },
  [URI_TEMPLATES.INDEXER_ASSET_TRANSACTION_BY_ID]: {
    type: 'object',
    properties: {
      transaction: {
        type: 'string',
        description: 'Detailed transaction information including sender, receiver, and amount'
      },
      currentRound: {
        type: 'string',
        description: 'The round at which this information was current'
      }
    }
  }
};

export const assetResources: ResourceDefinition[] = [
  {
    uri: URI_TEMPLATES.INDEXER_ASSET,
    name: 'Asset Details',
    description: 'Get asset information and configuration',
    mimeType: 'application/json',
    schema: assetResourceSchemas[URI_TEMPLATES.INDEXER_ASSET]
  },
  {
    uri: URI_TEMPLATES.INDEXER_ASSET_BALANCES,
    name: 'Asset Balances',
    description: 'Get accounts holding this asset and their balances',
    mimeType: 'application/json',
    schema: assetResourceSchemas[URI_TEMPLATES.INDEXER_ASSET_BALANCES]
  },
  {
    uri: URI_TEMPLATES.INDEXER_ASSET_TRANSACTIONS,
    name: 'Asset Transactions',
    description: 'Get transactions involving this asset',
    mimeType: 'application/json',
    schema: assetResourceSchemas[URI_TEMPLATES.INDEXER_ASSET_TRANSACTIONS]
  },
  {
    uri: URI_TEMPLATES.INDEXER_ASSET_BALANCE_BY_ADDRESS,
    name: 'Asset Balance By Address',
    description: 'Get specific account balance for this asset',
    mimeType: 'application/json',
    schema: assetResourceSchemas[URI_TEMPLATES.INDEXER_ASSET_BALANCE_BY_ADDRESS]
  },
  {
    uri: URI_TEMPLATES.INDEXER_ASSET_TRANSACTION_BY_ID,
    name: 'Asset Transaction By ID',
    description: 'Get specific transaction details for this asset',
    mimeType: 'application/json',
    schema: assetResourceSchemas[URI_TEMPLATES.INDEXER_ASSET_TRANSACTION_BY_ID]
  },
  {
    uri: URI_TEMPLATES.INDEXER_ASSETS,
    name: 'Search Assets',
    description: 'Search for assets with various criteria',
    mimeType: 'application/json',
    schema: assetResourceSchemas[URI_TEMPLATES.INDEXER_ASSETS]
  }
];

export async function lookupAssetByID(assetId: number): Promise<AssetResponse> {
  try {
    const response = await indexerClient.lookupAssetByID(assetId).do() as AssetResponse;
    return response;
  } catch (error) {
    throw new Error(`Failed to get asset info: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function lookupAssetBalances(assetId: number, params?: {
  limit?: number;
  currencyGreaterThan?: number;
  currencyLessThan?: number;
  nextToken?: string;
  address?: string;
}): Promise<AssetBalancesResponse> {
  try {
    let search = indexerClient.lookupAssetBalances(assetId);

    if (params?.limit) {
      search = search.limit(params.limit);
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

    return await search.do() as AssetBalancesResponse;
  } catch (error) {
    throw new Error(`Failed to get asset balances: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function lookupAssetTransactions(assetId: number, params?: {
  limit?: number;
  beforeTime?: string;
  afterTime?: string;
  minRound?: number;
  maxRound?: number;
  address?: string;
  addressRole?: string;
  excludeCloseTo?: boolean;
  nextToken?: string;
  txid?: string;
}): Promise<TransactionsResponse> {
  try {
    let search = indexerClient.lookupAssetTransactions(assetId);

    if (params?.limit) {
      search = search.limit(params.limit);
    }
    if (params?.beforeTime) {
      search = search.beforeTime(params.beforeTime);
    }
    if (params?.afterTime) {
      search = search.afterTime(params.afterTime);
    }
    if (params?.minRound) {
      search = search.minRound(params.minRound);
    }
    if (params?.maxRound) {
      search = search.maxRound(params.maxRound);
    }
    if (params?.address) {
      search = search.address(params.address);
    }
    if (params?.addressRole) {
      search = search.addressRole(params.addressRole);
    }
    if (params?.excludeCloseTo) {
      search = search.excludeCloseTo(params.excludeCloseTo);
    }
    if (params?.nextToken) {
      search = search.nextToken(params.nextToken);
    }

    return await search.do() as TransactionsResponse;
  } catch (error) {
    throw new Error(`Failed to get asset transactions: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function handleAssetResources(uri: string): Promise<ResourceContent[]> {
  try {
    // Validate URI format
    if (!uri.startsWith('algorand://')) {
      return [];
    }

    let match;

    // Asset details
    match = uri.match(/^algorand:\/\/indexer\/assets\/([^/]+)$/);
    if (match) {
      const assetId = parseInt(match[1], 10);
      const details = await lookupAssetByID(assetId);
      return [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify({
          asset: details.asset,
          currentRound: details.currentRound
        }, null, 2),
      }];
    }

    // Asset balances
    match = uri.match(/^algorand:\/\/indexer\/assets\/([^/]+)\/balances$/);
    if (match) {
      const assetId = parseInt(match[1], 10);
      const balances = await lookupAssetBalances(assetId);
      return [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify({
          balances: balances.balances,
          currentRound: balances.currentRound
        }, null, 2),
      }];
    }

    // Asset transactions
    match = uri.match(/^algorand:\/\/indexer\/assets\/([^/]+)\/transactions$/);
    if (match) {
      const assetId = parseInt(match[1], 10);
      const transactions = await lookupAssetTransactions(assetId);
      return [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify({
          transactions: transactions.transactions,
          currentRound: transactions.currentRound
        }, null, 2),
      }];
    }

    // Asset balance by address
    match = uri.match(/^algorand:\/\/indexer\/assets\/([^/]+)\/balances\/([^/]+)$/);
    if (match) {
      const [, assetId, address] = match;
      const balances = await lookupAssetBalances(parseInt(assetId, 10), { address });
      return [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify({
          balance: balances.balances[0],
          currentRound: balances.currentRound
        }, null, 2),
      }];
    }

    // Asset transaction by ID
    match = uri.match(/^algorand:\/\/indexer\/assets\/([^/]+)\/transactions\/([^/]+)$/);
    if (match) {
      const [, assetId, txid] = match;
      const transactions = await lookupAssetTransactions(parseInt(assetId, 10), { txid });
      return [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify({
          transaction: transactions.transactions[0],
          currentRound: transactions.currentRound
        }, null, 2),
      }];
    }

    // Search assets
    match = uri.match(/^algorand:\/\/indexer\/assets$/);
    if (match) {
      const assets = await searchForAssets();
      return [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify({
          assets: assets.assets,
          currentRound: assets.currentRound
        }, null, 2),
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

export async function searchForAssets(params?: {
  limit?: number;
  creator?: string;
  name?: string;
  unit?: string;
  assetId?: number;
  nextToken?: string;
}): Promise<AssetsResponse> {
  try {
    let search = indexerClient.searchForAssets();

    if (params?.limit) {
      search = search.limit(params.limit);
    }
    if (params?.creator) {
      search = search.creator(params.creator);
    }
    if (params?.name) {
      search = search.name(params.name);
    }
    if (params?.unit) {
      search = search.unit(params.unit);
    }
    if (params?.assetId) {
      search = search.index(params.assetId);
    }
    if (params?.nextToken) {
      search = search.nextToken(params.nextToken);
    }

    return await search.do() as AssetsResponse;
  } catch (error) {
    throw new Error(`Failed to search assets: ${error instanceof Error ? error.message : String(error)}`);
  }
}
