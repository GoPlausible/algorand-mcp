import algosdk from 'algosdk';
import { indexerClient } from '../../algorand-client.js';
import { URI_TEMPLATES, mcpUriToEndpoint } from '../uri-config.js';
import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { ResourceContent, ResourceDefinition } from '../types.js';
import { 
  Transaction,
  TransactionResponse,
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

export const transactionResourceSchemas: { [key: string]: ResourceSchema } = {
  [URI_TEMPLATES.INDEXER_TRANSACTION]: {
    type: 'object',
    properties: {
      transaction: {
        type: 'string',
        description: 'Detailed transaction information including sender, receiver, amount, and type'
      },
      currentRound: {
        type: 'string',
        description: 'The round at which this information was current'
      }
    }
  },
  [URI_TEMPLATES.INDEXER_TRANSACTIONS]: {
    type: 'object',
    properties: {
      transactions: {
        type: 'string',
        description: 'List of transactions matching search criteria with full details'
      },
      currentRound: {
        type: 'string',
        description: 'The round at which this information was current'
      }
    }
  }
};

export const transactionResources: ResourceDefinition[] = [
  {
    uri: URI_TEMPLATES.INDEXER_TRANSACTION,
    name: 'Transaction Details',
    description: 'Get transaction information by ID',
    mimeType: 'application/json',
    schema: transactionResourceSchemas[URI_TEMPLATES.INDEXER_TRANSACTION]
  },
  {
    uri: URI_TEMPLATES.INDEXER_TRANSACTIONS,
    name: 'Search Transactions',
    description: 'Search for transactions with various criteria',
    mimeType: 'application/json',
    schema: transactionResourceSchemas[URI_TEMPLATES.INDEXER_TRANSACTIONS]
  }
];

export async function handleTransactionResources(uri: string): Promise<ResourceContent[]> {
  try {
    // Validate URI format
    if (!uri.startsWith('algorand://')) {
      return [];
    }

    let match;

    // Transaction details
    match = uri.match(/^algorand:\/\/indexer\/transactions\/([^/]+)$/);
    if (match) {
      const txId = match[1];
      const info = await lookupTransactionByID(txId);
      return [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify({
          transaction: info.transaction,
          currentRound: info.currentRound
        }, null, 2),
      }];
    }

    // Search transactions
    match = uri.match(/^algorand:\/\/indexer\/transactions$/);
    if (match) {
      const transactions = await searchForTransactions();
      return [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify({
          transactions: transactions.transactions,
          currentRound: transactions.currentRound
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

export async function lookupTransactionByID(txId: string): Promise<TransactionResponse> {
  try {
    const response = await indexerClient.lookupTransactionByID(txId).do() as TransactionResponse;
    return response;
  } catch (error) {
    throw new Error(`Failed to get transaction: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function lookupAccountTransactions(address: string, params?: {
  limit?: number;
  beforeTime?: string;
  afterTime?: string;
  minRound?: number;
  maxRound?: number;
  txType?: string;
  assetId?: number;
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
    if (params?.minRound) {
      search = search.minRound(params.minRound);
    }
    if (params?.maxRound) {
      search = search.maxRound(params.maxRound);
    }
    if (params?.txType) {
      search = search.txType(params.txType);
    }
    if (params?.assetId) {
      search = search.assetID(params.assetId);
    }

    return await search.do() as TransactionsResponse;
  } catch (error) {
    throw new Error(`Failed to get account transactions: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function searchForTransactions(params?: {
  limit?: number;
  beforeTime?: string;
  afterTime?: string;
  minRound?: number;
  maxRound?: number;
  address?: string;
  addressRole?: string;
  txType?: string;
  assetId?: number;
  applicationId?: number;
  currencyGreaterThan?: number;
  currencyLessThan?: number;
  round?: number;
  nextToken?: string;
}): Promise<TransactionsResponse> {
  try {
    let search = indexerClient.searchForTransactions();

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
    if (params?.txType) {
      search = search.txType(params.txType);
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
    if (params?.round) {
      search = search.round(params.round);
    }
    if (params?.nextToken) {
      search = search.nextToken(params.nextToken);
    }

    return await search.do() as TransactionsResponse;
  } catch (error) {
    throw new Error(`Failed to search transactions: ${error instanceof Error ? error.message : String(error)}`);
  }
}
