import algosdk, { 
  Transaction,
  SignedTransaction,
  encodeUnsignedTransaction,
  TransactionType
} from 'algosdk';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';

// Tool schemas
export const generalTransactionSchemas = {
  assignGroupId: {
    type: 'object',
    properties: {
      transactions: {
        type: 'array',
        items: { type: 'object' }
      }
    },
    required: ['transactions']
  },
  signTransaction: {
    type: 'object',
    properties: {
      transaction: { type: 'object' },
      sk: { type: 'string' }
    },
    required: ['transaction', 'sk']
  },
  signBytes: {
    type: 'object',
    properties: {
      bytes: { type: 'string' },
      sk: { type: 'string' }
    },
    required: ['bytes', 'sk']
  },
  encodeObj: {
    type: 'object',
    properties: {
      obj: { type: 'object' }
    },
    required: ['obj']
  },
  decodeObj: {
    type: 'object',
    properties: {
      bytes: { type: 'string' }
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
          // Convert base64 note to Uint8Array if present
          if (transaction.note && typeof transaction.note === 'string') {
            transaction.note = new Uint8Array(Buffer.from(transaction.note, 'base64'));
          }
          // Convert hex string secret key to Uint8Array
          const sk = new Uint8Array(Buffer.from(args.sk, 'hex'));
          const signedTxn = algosdk.signTransaction(transaction, sk);
          return {
            content: [{
              type: 'text',
              text: JSON.stringify({
                txID: signedTxn.txID,
                blob: Buffer.from(signedTxn.blob).toString('base64')
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

      case 'sign_bytes': {
        if (!args.bytes || typeof args.bytes !== 'string' || !args.sk || typeof args.sk !== 'string') {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid sign bytes parameters');
        }

        try {
          const bytes = Buffer.from(args.bytes, 'base64');
          const sk = Buffer.from(args.sk, 'hex');
          const sig = algosdk.signBytes(bytes, sk);
          return {
            content: [{
              type: 'text',
              text: JSON.stringify({
                signature: Buffer.from(sig).toString('base64')
              }, null, 2)
            }]
          };
        } catch (error) {
          throw new McpError(
            ErrorCode.InvalidParams,
            `Failed to sign bytes: ${error instanceof Error ? error.message : String(error)}`
          );
        }
      }

      case 'encode_obj': {
        if (!args.obj || typeof args.obj !== 'object') {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid encode object parameters');
        }

        try {
          const encoded = algosdk.encodeObj(args.obj);
          return {
            content: [{
              type: 'text',
              text: JSON.stringify({
                encoded: Buffer.from(encoded).toString('base64')
              }, null, 2)
            }]
          };
        } catch (error) {
          throw new McpError(
            ErrorCode.InvalidParams,
            `Failed to encode object: ${error instanceof Error ? error.message : String(error)}`
          );
        }
      }

      case 'decode_obj': {
        if (!args.bytes || typeof args.bytes !== 'string') {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid decode object parameters');
        }

        try {
          const bytes = Buffer.from(args.bytes, 'base64');
          const decoded = algosdk.decodeObj(bytes);
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(decoded, null, 2)
            }]
          };
        } catch (error) {
          throw new McpError(
            ErrorCode.InvalidParams,
            `Failed to decode object: ${error instanceof Error ? error.message : String(error)}`
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
