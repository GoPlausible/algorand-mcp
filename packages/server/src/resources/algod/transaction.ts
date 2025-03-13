import algosdk, { modelsv2 } from 'algosdk';
import { algodClient } from '../../algorand-client.js';
import { URI_TEMPLATES, mcpUriToEndpoint } from '../uri-config.js';
import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { ResourceContent, ResourceDefinition } from '../types.js';
import type { 
  PendingTransactionResponse,
  NodeStatusResponse,
  PendingTransactionsResponse
} from 'algosdk/dist/types/client/v2/algod/models/types';
import type { SuggestedParamsWithMinFee } from 'algosdk/dist/types/types/transactions/base';

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
  [URI_TEMPLATES.ALGOD_PENDING_TXN]: {
    type: 'object',
    properties: {
      transaction: {
        type: 'string',
        description: 'Pending transaction information including sender, receiver, and amount'
      },
      currentRound: {
        type: 'string',
        description: 'The round at which this information was current'
      }
    }
  },
  [URI_TEMPLATES.ALGOD_PENDING_TXNS_BY_ADDRESS]: {
    type: 'object',
    properties: {
      transactions: {
        type: 'string',
        description: 'List of pending transactions for this address'
      },
      totalTransactions: {
        type: 'string',
        description: 'Total number of pending transactions'
      }
    }
  },
  [URI_TEMPLATES.ALGOD_PENDING_TXNS]: {
    type: 'object',
    properties: {
      transactions: {
        type: 'string',
        description: 'List of all pending transactions'
      },
      totalTransactions: {
        type: 'string',
        description: 'Total number of pending transactions'
      }
    }
  },
  [URI_TEMPLATES.ALGOD_TXN_PARAMS]: {
    type: 'object',
    properties: {
      params: {
        type: 'string',
        description: 'Suggested transaction parameters including fee and first/last valid rounds'
      }
    }
  },
  [URI_TEMPLATES.ALGOD_STATUS]: {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        description: 'Current node status including last round and version'
      }
    }
  },
  [URI_TEMPLATES.ALGOD_STATUS_AFTER_BLOCK]: {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        description: 'Node status after specified round including last round and version'
      }
    }
  }
};

export const transactionResources: ResourceDefinition[] = [
  {
    uri: URI_TEMPLATES.ALGOD_PENDING_TXN,
    name: 'Pending Transaction',
    description: 'Get pending transaction information',
    mimeType: 'application/json',
    schema: transactionResourceSchemas[URI_TEMPLATES.ALGOD_PENDING_TXN]
  },
  {
    uri: URI_TEMPLATES.ALGOD_PENDING_TXNS_BY_ADDRESS,
    name: 'Pending Transactions By Address',
    description: 'Get pending transactions for an address',
    mimeType: 'application/json',
    schema: transactionResourceSchemas[URI_TEMPLATES.ALGOD_PENDING_TXNS_BY_ADDRESS]
  },
  {
    uri: URI_TEMPLATES.ALGOD_PENDING_TXNS,
    name: 'All Pending Transactions',
    description: 'Get all pending transactions',
    mimeType: 'application/json',
    schema: transactionResourceSchemas[URI_TEMPLATES.ALGOD_PENDING_TXNS]
  },
  {
    uri: URI_TEMPLATES.ALGOD_TXN_PARAMS,
    name: 'Transaction Parameters',
    description: 'Get suggested transaction parameters',
    mimeType: 'application/json',
    schema: transactionResourceSchemas[URI_TEMPLATES.ALGOD_TXN_PARAMS]
  },
  {
    uri: URI_TEMPLATES.ALGOD_STATUS,
    name: 'Node Status',
    description: 'Get current node status',
    mimeType: 'application/json',
    schema: transactionResourceSchemas[URI_TEMPLATES.ALGOD_STATUS]
  },
  {
    uri: URI_TEMPLATES.ALGOD_STATUS_AFTER_BLOCK,
    name: 'Node Status After Block',
    description: 'Get node status after a specific round',
    mimeType: 'application/json',
    schema: transactionResourceSchemas[URI_TEMPLATES.ALGOD_STATUS_AFTER_BLOCK]
  }
];

export async function handleTransactionResources(uri: string): Promise<ResourceContent[]> {
  try {
    // Validate URI format
    if (!uri.startsWith('algorand://')) {
      return [];
    }

    let match;

    // Pending transaction
    match = uri.match(/^algorand:\/\/algod\/transactions\/pending\/([^/]+)$/);
    if (match) {
      const txId = match[1];
      const info = await pendingTransactionInformation(txId);
      return [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify({
          transaction: info,
          currentRound: info.poolError ? 0 : info.confirmedRound
        }, null, 2),
      }];
    }

    // Pending transactions by address
    match = uri.match(/^algorand:\/\/algod\/accounts\/([^/]+)\/transactions\/pending$/);
    if (match) {
      const address = match[1];
      const info = await pendingTransactionsByAddress(address);
      return [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify({
          transactions: info.topTransactions,
          totalTransactions: info.totalTransactions
        }, null, 2),
      }];
    }

    // All pending transactions
    match = uri.match(/^algorand:\/\/algod\/transactions\/pending$/);
    if (match) {
      const info = await pendingTransactions();
      return [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify({
          transactions: info.topTransactions,
          totalTransactions: info.totalTransactions
        }, null, 2),
      }];
    }

    // Transaction parameters
    match = uri.match(/^algorand:\/\/algod\/transactions\/params$/);
    if (match) {
      const params = await getTransactionParams();
      return [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify({ params }, null, 2),
      }];
    }

    // Node status
    match = uri.match(/^algorand:\/\/algod\/status$/);
    if (match) {
      const nodeStatus = await status();
      return [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify({ status: nodeStatus }, null, 2),
      }];
    }

    // Node status after block
    match = uri.match(/^algorand:\/\/algod\/status\/wait-for-block-after\/([^/]+)$/);
    if (match) {
      const round = parseInt(match[1], 10);
      const nodeStatus = await statusAfterBlock(round);
      return [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify({ status: nodeStatus }, null, 2),
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

export async function pendingTransactionInformation(txId: string): Promise<PendingTransactionResponse> {
  try {
    const response = await algodClient.pendingTransactionInformation(txId).do() as PendingTransactionResponse;
    return response;
  } catch (error) {
    throw new Error(`Failed to get pending transaction: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function pendingTransactionsByAddress(address: string): Promise<PendingTransactionsResponse> {
  try {
    const response = await algodClient.pendingTransactionByAddress(address).do() as PendingTransactionsResponse;
    return response;
  } catch (error) {
    throw new Error(`Failed to get pending transactions by address: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function pendingTransactions(maxTxns?: number): Promise<PendingTransactionsResponse> {
  try {
    let search = algodClient.pendingTransactionsInformation();
    if (maxTxns !== undefined) {
      search = search.max(maxTxns);
    }
    return await search.do() as PendingTransactionsResponse;
  } catch (error) {
    throw new Error(`Failed to get pending transactions: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function getTransactionParams(): Promise<SuggestedParamsWithMinFee> {
  try {
    const response = await algodClient.getTransactionParams().do();
    return response;
  } catch (error) {
    throw new Error(`Failed to get transaction params: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function status(): Promise<NodeStatusResponse> {
  try {
    const response = await algodClient.status().do() as NodeStatusResponse;
    return response;
  } catch (error) {
    throw new Error(`Failed to get status: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function statusAfterBlock(round: number): Promise<NodeStatusResponse> {
  try {
    const response = await algodClient.statusAfterBlock(round).do() as NodeStatusResponse;
    return response;
  } catch (error) {
    throw new Error(`Failed to get status after block: ${error instanceof Error ? error.message : String(error)}`);
  }
}
