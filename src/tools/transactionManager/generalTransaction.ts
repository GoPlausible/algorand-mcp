import algosdk, {
  Transaction,
  decodeSignedTransaction
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
  },
  encodeUnsignedTransaction: {
    type: 'object',
    properties: {
      transaction: { type: 'object', description: 'Transaction object (from make_*_txn or assign_group_id) to encode as unsigned transaction bytes' }
    },
    required: ['transaction']
  },
  decodeSignedTransaction: {
    type: 'object',
    properties: {
      bytes: { type: 'string', description: 'Base64-encoded signed transaction bytes (blob from sign_transaction or wallet_sign_transaction)' }
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
  },
  {
    name: 'encode_unsigned_transaction',
    description: 'Encode a transaction object into base64 unsigned transaction bytes (msgpack). Accepts output from make_*_txn or assign_group_id.',
    inputSchema: withCommonParams(generalTransactionSchemas.encodeUnsignedTransaction),
  },
  {
    name: 'decode_signed_transaction',
    description: 'Decode base64 signed transaction bytes back into a transaction object with signature details. Accepts the blob from sign_transaction or wallet_sign_transaction.',
    inputSchema: withCommonParams(generalTransactionSchemas.decodeSignedTransaction),
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
  if (flat.lease) params.lease = typeof flat.lease === 'string' ? algosdk.base64ToBytes(flat.lease) : flat.lease;

  // group is set after Transaction construction (mutable field, not a constructor param)
  if (flat.group) {
    params._group = typeof flat.group === 'string' ? algosdk.base64ToBytes(flat.group) : flat.group;
  }

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

/**
 * Creates a Transaction from flat JSON, applying the group field if present.
 */
function createTransactionFromFlat(flat: any): Transaction {
  const v3Params = toV3TransactionParams(flat);
  const groupBytes = v3Params._group;
  delete v3Params._group;
  const txn = new algosdk.Transaction(v3Params);
  if (groupBytes) {
    txn.group = groupBytes;
  }
  return txn;
}

/**
 * Serializes a Transaction object to flat JSON format matching make_*_txn output.
 * Converts Uint8Arrays to base64 strings for safe JSON serialization.
 */
function serializeTransaction(txn: Transaction): Record<string, any> {
  const result: Record<string, any> = {
    type: txn.type,
    sender: txn.sender.toString(),
    fee: Number(txn.fee),
    firstValid: Number(txn.firstValid),
    lastValid: Number(txn.lastValid),
    genesisID: txn.genesisID,
    genesisHash: txn.genesisHash ? algosdk.bytesToBase64(txn.genesisHash) : undefined,
  };

  // Group ID (present after assignGroupID)
  if (txn.group) {
    result.group = algosdk.bytesToBase64(txn.group);
  }

  // Note
  if (txn.note && txn.note.length > 0) {
    result.note = algosdk.bytesToBase64(txn.note);
  }

  // Lease
  if (txn.lease && txn.lease.length > 0) {
    result.lease = algosdk.bytesToBase64(txn.lease);
  }

  // Rekey
  if (txn.rekeyTo) {
    result.rekeyTo = txn.rekeyTo.toString();
  }

  // Payment fields
  if (txn.type === 'pay' && txn.payment) {
    result.receiver = txn.payment.receiver.toString();
    result.amount = Number(txn.payment.amount);
    if (txn.payment.closeRemainderTo) {
      result.closeRemainderTo = txn.payment.closeRemainderTo.toString();
    }
  }

  // Asset transfer fields
  if (txn.type === 'axfer' && txn.assetTransfer) {
    result.assetIndex = Number(txn.assetTransfer.assetIndex);
    result.receiver = txn.assetTransfer.receiver.toString();
    result.amount = Number(txn.assetTransfer.amount);
    if (txn.assetTransfer.closeRemainderTo) {
      result.closeRemainderTo = txn.assetTransfer.closeRemainderTo.toString();
    }
  }

  // Asset config fields
  if (txn.type === 'acfg' && txn.assetConfig) {
    const p = txn.assetConfig;
    if (p.assetIndex) result.assetIndex = Number(p.assetIndex);
    if (p.total !== undefined) result.total = Number(p.total);
    if (p.decimals !== undefined) result.decimals = p.decimals;
    if (p.defaultFrozen !== undefined) result.defaultFrozen = p.defaultFrozen;
    if (p.unitName) result.unitName = p.unitName;
    if (p.assetName) result.assetName = p.assetName;
    if (p.assetURL) result.assetURL = p.assetURL;
    if (p.assetMetadataHash) result.assetMetadataHash = algosdk.bytesToBase64(p.assetMetadataHash);
    if (p.manager) result.manager = p.manager.toString();
    if (p.reserve) result.reserve = p.reserve.toString();
    if (p.freeze) result.freeze = p.freeze.toString();
    if (p.clawback) result.clawback = p.clawback.toString();
  }

  // Asset freeze fields
  if (txn.type === 'afrz' && txn.assetFreeze) {
    result.assetIndex = Number(txn.assetFreeze.assetIndex);
    result.freezeTarget = txn.assetFreeze.freezeAccount.toString();
    result.frozen = txn.assetFreeze.frozen;
  }

  // Application call fields
  if (txn.type === 'appl' && txn.applicationCall) {
    const p = txn.applicationCall;
    result.appIndex = Number(p.appIndex ?? 0n);
    result.onComplete = p.onComplete ?? 0;
    if (p.approvalProgram && p.approvalProgram.length > 0) result.approvalProgram = algosdk.bytesToBase64(p.approvalProgram);
    if (p.clearProgram && p.clearProgram.length > 0) result.clearProgram = algosdk.bytesToBase64(p.clearProgram);
    if (p.numGlobalInts !== undefined) result.numGlobalInts = p.numGlobalInts;
    if (p.numGlobalByteSlices !== undefined) result.numGlobalByteSlices = p.numGlobalByteSlices;
    if (p.numLocalInts !== undefined) result.numLocalInts = p.numLocalInts;
    if (p.numLocalByteSlices !== undefined) result.numLocalByteSlices = p.numLocalByteSlices;
    if (p.appArgs && p.appArgs.length > 0) {
      result.appArgs = p.appArgs.map((a: Uint8Array) => algosdk.bytesToBase64(a));
    }
    if (p.accounts && p.accounts.length > 0) {
      result.accounts = p.accounts.map((a: any) => a.toString());
    }
    if (p.foreignApps && p.foreignApps.length > 0) {
      result.foreignApps = p.foreignApps.map((a: bigint) => Number(a));
    }
    if (p.foreignAssets && p.foreignAssets.length > 0) {
      result.foreignAssets = p.foreignAssets.map((a: bigint) => Number(a));
    }
  }

  // Key registration fields
  if (txn.type === 'keyreg' && txn.keyreg) {
    const p = txn.keyreg;
    if (p.voteKey) result.voteKey = algosdk.bytesToBase64(p.voteKey);
    if (p.selectionKey) result.selectionKey = algosdk.bytesToBase64(p.selectionKey);
    if (p.stateProofKey) result.stateProofKey = algosdk.bytesToBase64(p.stateProofKey);
    if (p.voteFirst !== undefined) result.voteFirst = Number(p.voteFirst);
    if (p.voteLast !== undefined) result.voteLast = Number(p.voteLast);
    if (p.voteKeyDilution !== undefined) result.voteKeyDilution = Number(p.voteKeyDilution);
    result.nonParticipation = p.nonParticipation ?? false;
  }

  return result;
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
          txns = args.transactions.map(txn => createTransactionFromFlat(txn));
        } catch (error) {
          throw new McpError(
            ErrorCode.InvalidParams,
            `Failed to assign group ID: ${error instanceof Error ? error.message : String(error)}`
          );
        }

        // Then try to assign group ID
        try {
          const groupedTxns = algosdk.assignGroupID(txns);
          // Serialize each grouped transaction to flat JSON format
          // matching the output of make_*_txn tools (base64 strings, not raw Uint8Arrays)
          const serialized = groupedTxns.map(txn => serializeTransaction(txn));
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(serialized, null, 2)
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
          const txn = createTransactionFromFlat(transaction);

          const sk = algosdk.hexToBytes(args.sk);
          const signedTxn = algosdk.signTransaction(txn, sk);
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



      case 'encode_unsigned_transaction': {
        if (!args.transaction || typeof args.transaction !== 'object') {
          throw new McpError(ErrorCode.InvalidParams, 'Transaction object is required');
        }

        try {
          const transaction = args.transaction as any;
          const txn = createTransactionFromFlat(transaction);
          const encoded = algosdk.encodeUnsignedTransaction(txn);
          return {
            content: [{
              type: 'text',
              text: JSON.stringify({
                txID: txn.txID(),
                bytes: algosdk.bytesToBase64(encoded)
              }, null, 2)
            }]
          };
        } catch (error) {
          throw new McpError(
            ErrorCode.InvalidParams,
            `Failed to encode unsigned transaction: ${error instanceof Error ? error.message : String(error)}`
          );
        }
      }

      case 'decode_signed_transaction': {
        if (!args.bytes || typeof args.bytes !== 'string') {
          throw new McpError(ErrorCode.InvalidParams, 'Base64-encoded signed transaction bytes are required');
        }

        try {
          const rawBytes = algosdk.base64ToBytes(args.bytes);
          const decoded = decodeSignedTransaction(rawBytes);
          const txn = decoded.txn;

          const result: Record<string, any> = {
            txID: txn.txID(),
            transaction: serializeTransaction(txn),
          };

          if (decoded.sig) {
            result.signature = algosdk.bytesToBase64(decoded.sig);
          }
          if (decoded.sgnr) {
            result.authAddr = decoded.sgnr.toString();
          }
          if (decoded.msig) {
            result.multisig = {
              version: decoded.msig.v,
              threshold: decoded.msig.thr,
              subsigs: decoded.msig.subsig?.map((s: any) => ({
                publicKey: s.pk ? algosdk.bytesToBase64(s.pk) : undefined,
                signature: s.s ? algosdk.bytesToBase64(s.s) : undefined,
              })),
            };
          }
          if (decoded.lsig) {
            result.logicSig = {
              logic: algosdk.bytesToBase64(decoded.lsig.logic),
              args: decoded.lsig.args?.map((a: Uint8Array) => algosdk.bytesToBase64(a)),
            };
          }

          return {
            content: [{
              type: 'text',
              text: JSON.stringify(result, null, 2)
            }]
          };
        } catch (error) {
          throw new McpError(
            ErrorCode.InvalidParams,
            `Failed to decode signed transaction: ${error instanceof Error ? error.message : String(error)}`
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
