import algosdk, {
  Transaction
} from 'algosdk';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';

// Tool schemas
export const generalTransactionSchemas = {
  assignGroupId: {
    type: 'object',
    properties: {
      transactions: {
        type: 'array',
        items: { type: 'object' },
        description: 'Array of transaction objects to be assigned a group ID'
      }
    },
    required: ['transactions']
  },
  signTransaction: {
    type: 'object',
    properties: {
      transaction: { type: 'object', description: 'Transaction object to be signed' },
      sk: { type: 'string', description: 'Secret key in hexadecimal format to sign the transaction with' }
    },
    required: ['transaction', 'sk']
  },
  signBytes: {
    type: 'object',
    properties: {
      bytes: { type: 'string', description: 'Base64-encoded bytes to be signed' },
      sk: { type: 'string', description: 'Secret key in hexadecimal format to sign the bytes with' }
    },
    required: ['bytes', 'sk']
  },
  encodeObj: {
    type: 'object',
    properties: {
      obj: { type: 'object', description: 'Object to be encoded into msgpack format' }
    },
    required: ['obj']
  },
  decodeObj: {
    type: 'object',
    properties: {
      bytes: { type: 'string', description: 'Base64-encoded msgpack bytes to be decoded into an object' }
    },
    required: ['bytes']
  }
};

// Tool definitions
export const generalTransactionTools = [
  {
    name: 'assign_group_id',
    description: 'Assign a group ID to a list of transactions',
    inputSchema: generalTransactionSchemas.assignGroupId,
  },
  {
    name: 'sign_transaction',
    description: 'Sign a transaction with a secret key',
    inputSchema: generalTransactionSchemas.signTransaction,
  },
  {
    name: 'sign_bytes',
    description: 'Sign arbitrary bytes with a secret key',
    inputSchema: generalTransactionSchemas.signBytes,
  },
  {
    name: 'encode_obj',
    description: 'Encode an object to msgpack format',
    inputSchema: generalTransactionSchemas.encodeObj,
  },
  {
    name: 'decode_obj',
    description: 'Decode msgpack bytes to an object',
    inputSchema: generalTransactionSchemas.decodeObj,
  }
];

export class GeneralTransactionManager {
  /**
   * Assigns a group ID to a list of transactions
   */
  // Tool handlers
  static async handleTool(name: string, args: Record<string, unknown>) {
    switch (name) {
      case 'assign_group_id': {
        if (!args.transactions || !Array.isArray(args.transactions)) {
          throw new McpError(ErrorCode.InvalidParams, 'Transactions array is required');
        }

        // Validate each transaction object
        for (const txn of args.transactions) {
          if (typeof txn !== 'object' || txn === null) {
            throw new McpError(ErrorCode.InvalidParams, 'Each transaction must be a valid transaction object');
          }
        }

        // Create all transactions first
        let txns;
        try {
          txns = args.transactions.map(txn => new algosdk.Transaction(txn));
        } catch (error) {
          throw new McpError(
            ErrorCode.InvalidParams,
            `Failed to assign group ID: ${error instanceof Error ? error.message : String(error)}`
          );
        }

        // Then try to assign group ID
        try {
          const groupedTxns = algosdk.assignGroupID(txns);
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(groupedTxns, null, 2)
            }]
          };
        } catch (error) {
          throw new McpError(
            ErrorCode.InvalidParams,
            `Failed to assign group ID: ${error instanceof Error ? error.message : String(error)}`
          );
        }
      }

      case 'sign_transaction': {
        if (!args.transaction || typeof args.transaction !== 'object' || !args.sk || typeof args.sk !== 'string') {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid sign transaction parameters');
        }

        try {
          const transaction = args.transaction as any;

          // Convert base64 fields
          if (transaction.note) {
            transaction.note = algosdk.base64ToBytes(transaction.note);
          }

          // Handle application-specific fields
          if (transaction.type === 'appl') {
            // Set approval program
            if (transaction.approvalProgram) {
              const approvalBytes = algosdk.base64ToBytes(transaction.approvalProgram);
              transaction.appApprovalProgram = new Uint8Array(approvalBytes);
            }

            // Set clear program
            if (transaction.clearProgram) {
              const clearBytes = algosdk.base64ToBytes(transaction.clearProgram);
              transaction.appClearProgram = new Uint8Array(clearBytes);
            }

            // Set schema

            if (transaction.numGlobalInts !== undefined) {
              transaction.appGlobalInts = transaction.numGlobalInts;
            }
            if (transaction.numGlobalByteSlices !== undefined) {
              transaction.appGlobalByteSlices = transaction.numGlobalByteSlices;
            }
            if (transaction.numLocalInts !== undefined) {
              transaction.appLocalInts = transaction.numLocalInts;
            }
            if (transaction.numLocalByteSlices !== undefined) {
              transaction.appLocalByteSlices = transaction.numLocalByteSlices;
            }
            if(transaction.onComplete)transaction.appOnComplete = transaction.onComplete;

            // Set optional arrays
            if (transaction.appArgs) {
              transaction.appArgs = transaction.appArgs.map((arg: string) =>
                algosdk.base64ToBytes(arg)
              );
            }
            if (transaction.accounts) {
              transaction.appAccounts = transaction.accounts;
            }
            if (transaction.foreignApps) {
              transaction.appForeignApps = transaction.foreignApps;
            }
            if (transaction.foreignAssets) {
              transaction.appForeignAssets = transaction.foreignAssets;
            }
          }
          // Convert hex string secret key to Uint8Array
          const sk = algosdk.hexToBytes(args.sk);
          const signedTxn = algosdk.signTransaction(new algosdk.Transaction(transaction), sk);
          return {
            content: [{
              type: 'text',
              text: JSON.stringify({
                txID: signedTxn.txID,
                blob: algosdk.bytesToBase64(signedTxn.blob)
              }, null, 2)
            }]
          };
        } catch (error) {
          throw new McpError(
            ErrorCode.InvalidParams,
            `Failed to sign transaction: ${error instanceof Error ? error.message : String(error)}`
          );
        }
      }



      default:
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown general transaction tool: ${name}`
        );
    }
  }
}
