import algosdk, {
  Transaction
} from 'algosdk';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { withCommonParams } from '../commonParams.js';

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
    inputSchema: withCommonParams(generalTransactionSchemas.assignGroupId),
  },
  {
    name: 'sign_transaction',
    description: 'Sign a transaction with a secret key',
    inputSchema: withCommonParams(generalTransactionSchemas.signTransaction),
  },
  {
    name: 'sign_bytes',
    description: 'Sign arbitrary bytes with a secret key',
    inputSchema: withCommonParams(generalTransactionSchemas.signBytes),
  },
  {
    name: 'encode_obj',
    description: 'Encode an object to msgpack format',
    inputSchema: withCommonParams(generalTransactionSchemas.encodeObj),
  },
  {
    name: 'decode_obj',
    description: 'Decode msgpack bytes to an object',
    inputSchema: withCommonParams(generalTransactionSchemas.decodeObj),
  }
];

/**
 * Converts a flat transaction object (as returned by make_*_txn tools)
 * into the format expected by algosdk v3's Transaction constructor.
 */
function toV3TransactionParams(flat: any): any {
  // If already in v3 format (has suggestedParams), return as-is
  if (flat.suggestedParams) return flat;

  const suggestedParams: any = {
    fee: flat.fee,
    firstValid: flat.firstValid,
    lastValid: flat.lastValid,
    genesisID: flat.genesisID,
    flatFee: true,
  };

  // genesisHash may be a base64 string, a Uint8Array, or an object {0:72,...} from JSON round-trip
  if (typeof flat.genesisHash === 'string') {
    suggestedParams.genesisHash = algosdk.base64ToBytes(flat.genesisHash);
  } else if (flat.genesisHash instanceof Uint8Array) {
    suggestedParams.genesisHash = flat.genesisHash;
  } else if (typeof flat.genesisHash === 'object' && flat.genesisHash !== null) {
    // Reconstruct Uint8Array from {0: byte, 1: byte, ...} JSON form
    const keys = Object.keys(flat.genesisHash).map(Number).sort((a, b) => a - b);
    suggestedParams.genesisHash = new Uint8Array(keys.map(k => flat.genesisHash[k]));
  }

  const params: any = {
    type: flat.type,
    sender: flat.sender,
    suggestedParams,
  };

  if (flat.note) params.note = typeof flat.note === 'string' ? algosdk.base64ToBytes(flat.note) : flat.note;
  if (flat.rekeyTo) params.rekeyTo = flat.rekeyTo;

  switch (flat.type) {
    case 'pay':
      params.paymentParams = {
        receiver: flat.receiver,
        amount: flat.amount ?? 0,
      };
      if (flat.closeRemainderTo) params.paymentParams.closeRemainderTo = flat.closeRemainderTo;
      break;
    case 'axfer':
      params.assetTransferParams = {
        assetIndex: flat.assetIndex,
        receiver: flat.receiver,
        amount: flat.amount ?? 0,
      };
      if (flat.closeRemainderTo) params.assetTransferParams.closeRemainderTo = flat.closeRemainderTo;
      break;
    case 'acfg':
      params.assetConfigParams = {
        assetIndex: flat.assetIndex,
        total: flat.total,
        decimals: flat.decimals,
        defaultFrozen: flat.defaultFrozen,
        unitName: flat.unitName,
        assetName: flat.assetName,
        assetURL: flat.assetURL || flat.url,
        assetMetadataHash: flat.assetMetadataHash,
        manager: flat.manager,
        reserve: flat.reserve,
        freeze: flat.freeze,
        clawback: flat.clawback,
      };
      break;
    case 'afrz':
      params.assetFreezeParams = {
        assetIndex: flat.assetIndex,
        freezeTarget: flat.freezeTarget || flat.freezeAccount,
        frozen: flat.frozen ?? flat.assetFrozen,
      };
      break;
    case 'appl':
      params.appCallParams = {
        appIndex: flat.appIndex ?? flat.appId ?? 0,
        onComplete: flat.onComplete ?? flat.appOnComplete ?? 0,
      };
      if (flat.approvalProgram || flat.appApprovalProgram) {
        const prog = flat.approvalProgram || flat.appApprovalProgram;
        params.appCallParams.approvalProgram = typeof prog === 'string' ? algosdk.base64ToBytes(prog) : prog;
      }
      if (flat.clearProgram || flat.appClearProgram) {
        const prog = flat.clearProgram || flat.appClearProgram;
        params.appCallParams.clearProgram = typeof prog === 'string' ? algosdk.base64ToBytes(prog) : prog;
      }
      if (flat.numGlobalInts !== undefined) params.appCallParams.numGlobalInts = flat.numGlobalInts;
      if (flat.numGlobalByteSlices !== undefined) params.appCallParams.numGlobalByteSlices = flat.numGlobalByteSlices;
      if (flat.numLocalInts !== undefined) params.appCallParams.numLocalInts = flat.numLocalInts;
      if (flat.numLocalByteSlices !== undefined) params.appCallParams.numLocalByteSlices = flat.numLocalByteSlices;
      if (flat.appArgs) {
        params.appCallParams.appArgs = flat.appArgs.map((a: string) => typeof a === 'string' ? algosdk.base64ToBytes(a) : a);
      }
      if (flat.accounts || flat.appAccounts) params.appCallParams.accounts = flat.accounts || flat.appAccounts;
      if (flat.foreignApps || flat.appForeignApps) params.appCallParams.foreignApps = flat.foreignApps || flat.appForeignApps;
      if (flat.foreignAssets || flat.appForeignAssets) params.appCallParams.foreignAssets = flat.foreignAssets || flat.appForeignAssets;
      break;
    case 'keyreg':
      params.keyregParams = {
        voteKey: flat.voteKey,
        selectionKey: flat.selectionKey,
        stateProofKey: flat.stateProofKey,
        voteFirst: flat.voteFirst,
        voteLast: flat.voteLast,
        voteKeyDilution: flat.voteKeyDilution,
        nonParticipation: flat.nonParticipation ?? false,
      };
      break;
  }

  return params;
}

export class GeneralTransactionManager {
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
          txns = args.transactions.map(txn => new algosdk.Transaction(toV3TransactionParams(txn)));
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
          throw new McpError(ErrorCode.InvalidParams, 'Transaction object and sk (secret key hex) are required');
        }

        try {
          const transaction = args.transaction as any;
          const v3Params = toV3TransactionParams(transaction);

          const sk = algosdk.hexToBytes(args.sk);
          const signedTxn = algosdk.signTransaction(new algosdk.Transaction(v3Params), sk);
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
