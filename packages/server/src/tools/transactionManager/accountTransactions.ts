import { 
  Transaction,
  makePaymentTxnWithSuggestedParamsFromObject,
  makeKeyRegistrationTxnWithSuggestedParamsFromObject,
  SuggestedParams
} from 'algosdk';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { algodClient } from '../../algorand-client.js';

// Tool schemas
export const accountTransactionSchemas = {
  makePaymentTxn: {
    type: 'object',
    description: 'Create a payment transaction with proper Algorand address strings',
    properties: {
      from: { 
        type: 'string',
        description: 'Sender address in standard Algorand format (58 characters)'
      },
      to: { 
        type: 'string',
        description: 'Receiver address in standard Algorand format (58 characters)'
      },
      amount: { 
        type: 'integer',
        description: 'Amount in microAlgos'
      },
      note: { 
        type: 'string', 
        optional: true,
        description: 'Optional transaction note'
      },
      closeRemainderTo: { 
        type: 'string', 
        optional: true,
        description: 'Optional close remainder to address in standard Algorand format'
      },
      rekeyTo: { 
        type: 'string', 
        optional: true,
        description: 'Optional rekey to address in standard Algorand format'
      }
    },
    required: ['from', 'to', 'amount']
  },
  makeKeyRegTxn: {
    type: 'object',
    properties: {
      from: { type: 'string' },
      voteKey: { type: 'string' },
      selectionKey: { type: 'string' },
      stateProofKey: { type: 'string' },
      voteFirst: { type: 'integer' },
      voteLast: { type: 'integer' },
      voteKeyDilution: { type: 'integer' },
      nonParticipation: { type: 'boolean', optional: true },
      note: { type: 'string', optional: true },
      rekeyTo: { type: 'string', optional: true }
    },
    required: ['from', 'voteKey', 'selectionKey', 'stateProofKey', 'voteFirst', 'voteLast', 'voteKeyDilution']
  }
};

// Tool definitions
export const accountTransactionTools = [
  {
    name: 'make_payment_txn',
    description: 'Create a payment transaction',
    inputSchema: accountTransactionSchemas.makePaymentTxn,
  },
  {
    name: 'make_keyreg_txn',
    description: 'Create a key registration transaction',
    inputSchema: accountTransactionSchemas.makeKeyRegTxn,
  }
];

export class AccountTransactionManager {
  /**
   * Creates a payment transaction
   */
  static makePaymentTxn(txn: {
    from: string;
    to: string;
    amount: number;
    closeRemainderTo?: string;
    note?: Uint8Array;
    rekeyTo?: string;
    suggestedParams: SuggestedParams;
  }): Transaction {
    return makePaymentTxnWithSuggestedParamsFromObject(txn);
  }

  /**
   * Creates a key registration transaction
   */
  static makeKeyRegTxn(txn: {
    from: string;
    note?: Uint8Array;
    rekeyTo?: string;
    suggestedParams: SuggestedParams;
    voteKey: string;
    selectionKey: string;
    stateProofKey: string;
    voteFirst: number;
    voteLast: number;
    voteKeyDilution: number;
    nonParticipation?: boolean;
  }): Transaction {
    return makeKeyRegistrationTxnWithSuggestedParamsFromObject(txn);
  }

  // Tool handlers
  static async handleTool(name: string, args: Record<string, unknown>) {
    const params = await algodClient.getTransactionParams().do();
    const suggestedParams = { ...params, flatFee: true, fee: params.minFee  };

    switch (name) {
      case 'make_payment_txn':
        if (!args.from || !args.to || typeof args.amount !== 'number') {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid payment transaction parameters');
        }
        try {
          // Create payment transaction using SDK's maker function
          const txn = AccountTransactionManager.makePaymentTxn({
            from: String(args.from),
            to: String(args.to),
            amount: Number(args.amount),
            note: typeof args.note === 'string' ? new TextEncoder().encode(args.note) : undefined,
            closeRemainderTo: typeof args.closeRemainderTo === 'string' ? args.closeRemainderTo : undefined,
            rekeyTo: typeof args.rekeyTo === 'string' ? args.rekeyTo : undefined,
            suggestedParams
          });

          // Return the transaction directly
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(txn, null, 2),
            }],
          };
        } catch (error) {
          throw new McpError(
            ErrorCode.InvalidParams,
            `Failed to create payment transaction: ${error instanceof Error ? error.message : String(error)}`
          );
        }

      case 'make_keyreg_txn':
        if (!args.from || !args.voteKey || !args.selectionKey || !args.stateProofKey ||
            typeof args.voteFirst !== 'number' || typeof args.voteLast !== 'number' ||
            typeof args.voteKeyDilution !== 'number') {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid key registration parameters');
        }
        const keyRegTxn = AccountTransactionManager.makeKeyRegTxn({
          from: String(args.from),
          voteKey: String(args.voteKey),
          selectionKey: String(args.selectionKey),
          stateProofKey: String(args.stateProofKey),
          voteFirst: Number(args.voteFirst),
          voteLast: Number(args.voteLast),
          voteKeyDilution: Number(args.voteKeyDilution),
          nonParticipation: typeof args.nonParticipation === 'boolean' ? args.nonParticipation : undefined,
          note: typeof args.note === 'string' ? new TextEncoder().encode(args.note) : undefined,
          rekeyTo: typeof args.rekeyTo === 'string' ? args.rekeyTo : undefined,
          suggestedParams,
        });
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(keyRegTxn, null, 2),
          }],
        };

      default:
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown account transaction tool: ${name}`
        );
    }
  }
}
