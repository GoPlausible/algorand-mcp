import algosdk, {
  Transaction,
  makePaymentTxnWithSuggestedParamsFromObject,
  makeKeyRegistrationTxnWithSuggestedParamsFromObject,
  SuggestedParams
} from 'algosdk';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { getAlgodClient, extractNetwork } from '../../algorand-client.js';
import { withCommonParams } from '../commonParams.js';

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
      from: { type: 'string', description: 'Sender address in standard Algorand format (58 characters)' },
      voteKey: { type: 'string', description: 'The root participation public key (58 bytes base64 encoded)' },
      selectionKey: { type: 'string', description: 'VRF public key (32 bytes base64 encoded)' },
      stateProofKey: { type: 'string', description: 'State proof public key (64 bytes base64 encoded)' },
      voteFirst: { type: 'integer', description: 'First round this participation key is valid' },
      voteLast: { type: 'integer', description: 'Last round this participation key is valid' },
      voteKeyDilution: { type: 'integer', description: 'Dilution for the 2-level participation key' },
      nonParticipation: { type: 'boolean', optional: true, description: 'Mark account as nonparticipating for rewards' },
      note: { type: 'string', optional: true, description: 'Transaction note field (up to 1000 bytes)' },
      rekeyTo: { type: 'string', optional: true, description: 'Address to rekey the sender account to' }
    },
    required: ['from', 'voteKey', 'selectionKey', 'stateProofKey', 'voteFirst', 'voteLast', 'voteKeyDilution']
  }
};

// Tool definitions
export const accountTransactionTools = [
  {
    name: 'make_payment_txn',
    description: 'Create a payment transaction',
    inputSchema: withCommonParams(accountTransactionSchemas.makePaymentTxn),
  },
  {
    name: 'make_keyreg_txn',
    description: 'Create a key registration transaction',
    inputSchema: withCommonParams(accountTransactionSchemas.makeKeyRegTxn),
  }
];

export class AccountTransactionManager {
  /**
   * Creates a payment transaction
   */
  static makePaymentTxn(txn: {
    sender: string;
    receiver: string;
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
    sender: string;
    note?: Uint8Array;
    rekeyTo?: string;
    suggestedParams: SuggestedParams;
    voteKey: Uint8Array | string;
    selectionKey: Uint8Array | string;
    stateProofKey: Uint8Array | string;
    voteFirst: number;
    voteLast: number;
    voteKeyDilution: number;
    nonParticipation?: boolean;
  }): Transaction {
    // Convert string keys to Uint8Array if needed
    const params = {
      ...txn,
      voteKey: typeof txn.voteKey === 'string' ? algosdk.base64ToBytes(txn.voteKey) : txn.voteKey,
      selectionKey: typeof txn.selectionKey === 'string' ? algosdk.base64ToBytes(txn.selectionKey) : txn.selectionKey,
      stateProofKey: typeof txn.stateProofKey === 'string' ? algosdk.base64ToBytes(txn.stateProofKey) : txn.stateProofKey,
    };
    return makeKeyRegistrationTxnWithSuggestedParamsFromObject(params);
  }

  // Tool handlers
  static async handleTool(name: string, args: Record<string, unknown>) {
    const network = extractNetwork(args);
    const algodClient = getAlgodClient(network);
    const suggestedParams = await algodClient.getTransactionParams().do();

    switch (name) {
      case 'make_payment_txn':
        if (!args.from || !args.to || typeof args.amount !== 'number') {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid payment transaction parameters');
        }
        try {
          // Create payment transaction using SDK's maker function
          const txn = AccountTransactionManager.makePaymentTxn({
            sender: String(args.from),
            receiver: String(args.to),
            amount: Number(args.amount),
            note: typeof args.note === 'string' ? new TextEncoder().encode(args.note) : undefined,
            closeRemainderTo: typeof args.closeRemainderTo === 'string' ? args.closeRemainderTo : undefined,
            rekeyTo: typeof args.rekeyTo === 'string' ? args.rekeyTo : undefined,
            suggestedParams
          });

          // Create a clean transaction object for JSON serialization
          const cleanTxn: Record<string, any> = {
            sender: String(args.from),
            receiver: String(args.to),
            amount: Number(args.amount),
            fee: suggestedParams.fee,
            firstValid: suggestedParams.firstValid,
            lastValid: suggestedParams.lastValid,
            genesisID: suggestedParams.genesisID,
            genesisHash: suggestedParams.genesisHash instanceof Uint8Array
              ? algosdk.bytesToBase64(suggestedParams.genesisHash)
              : suggestedParams.genesisHash,
            type: 'pay'
          };

          // Add note if provided
          if (typeof args.note === 'string') {
            const noteBytes = new TextEncoder().encode(args.note);
            cleanTxn['note'] = algosdk.bytesToBase64(noteBytes);
          }

          // Add optional parameters if they exist
          if (args.closeRemainderTo) {
            cleanTxn['closeRemainderTo'] = String(args.closeRemainderTo);
          }
          if (args.rekeyTo) {
            cleanTxn['rekeyTo'] = String(args.rekeyTo);
          }

          return {
            content: [{
              type: 'text',
              text: JSON.stringify(cleanTxn, null, 2),
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
          sender: String(args.from),
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
