import { 
  Transaction,
  makeAssetCreateTxnWithSuggestedParamsFromObject,
  makeAssetConfigTxnWithSuggestedParamsFromObject,
  makeAssetDestroyTxnWithSuggestedParamsFromObject,
  makeAssetFreezeTxnWithSuggestedParamsFromObject,
  makeAssetTransferTxnWithSuggestedParamsFromObject,
  SuggestedParams
} from 'algosdk';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { algodClient } from '../../algorand-client.js';

// Tool schemas
export const assetTransactionSchemas = {
  makeAssetCreateTxn: {
    type: 'object',
    properties: {
      from: { type: 'string' },
      total: { type: 'integer' },
      decimals: { type: 'integer' },
      defaultFrozen: { type: 'boolean' },
      unitName: { type: 'string', optional: true },
      assetName: { type: 'string', optional: true },
      assetURL: { type: 'string', optional: true },
      assetMetadataHash: { type: 'string', optional: true },
      manager: { type: 'string', optional: true },
      reserve: { type: 'string', optional: true },
      freeze: { type: 'string', optional: true },
      clawback: { type: 'string', optional: true },
      note: { type: 'string', optional: true },
      rekeyTo: { type: 'string', optional: true }
    },
    required: ['from', 'total', 'decimals', 'defaultFrozen']
  },
  makeAssetConfigTxn: {
    type: 'object',
    properties: {
      from: { type: 'string' },
      assetIndex: { type: 'integer' },
      manager: { type: 'string', optional: true },
      reserve: { type: 'string', optional: true },
      freeze: { type: 'string', optional: true },
      clawback: { type: 'string', optional: true },
      strictEmptyAddressChecking: { type: 'boolean' },
      note: { type: 'string', optional: true },
      rekeyTo: { type: 'string', optional: true }
    },
    required: ['from', 'assetIndex', 'strictEmptyAddressChecking']
  },
  makeAssetDestroyTxn: {
    type: 'object',
    properties: {
      from: { type: 'string' },
      assetIndex: { type: 'integer' },
      note: { type: 'string', optional: true },
      rekeyTo: { type: 'string', optional: true }
    },
    required: ['from', 'assetIndex']
  },
  makeAssetFreezeTxn: {
    type: 'object',
    properties: {
      from: { type: 'string' },
      assetIndex: { type: 'integer' },
      freezeTarget: { type: 'string' },
      freezeState: { type: 'boolean' },
      note: { type: 'string', optional: true },
      rekeyTo: { type: 'string', optional: true }
    },
    required: ['from', 'assetIndex', 'freezeTarget', 'freezeState']
  },
  makeAssetTransferTxn: {
    type: 'object',
    properties: {
      from: { type: 'string' },
      to: { type: 'string' },
      assetIndex: { type: 'integer' },
      amount: { type: 'integer' },
      note: { type: 'string', optional: true },
      closeRemainderTo: { type: 'string', optional: true },
      rekeyTo: { type: 'string', optional: true }
    },
    required: ['from', 'to', 'assetIndex', 'amount']
  }
};

// Tool definitions
export const assetTransactionTools = [
  {
    name: 'make_asset_create_txn',
    description: 'Create an asset creation transaction',
    inputSchema: assetTransactionSchemas.makeAssetCreateTxn,
  },
  {
    name: 'make_asset_config_txn',
    description: 'Create an asset configuration transaction',
    inputSchema: assetTransactionSchemas.makeAssetConfigTxn,
  },
  {
    name: 'make_asset_destroy_txn',
    description: 'Create an asset destroy transaction',
    inputSchema: assetTransactionSchemas.makeAssetDestroyTxn,
  },
  {
    name: 'make_asset_freeze_txn',
    description: 'Create an asset freeze transaction',
    inputSchema: assetTransactionSchemas.makeAssetFreezeTxn,
  },
  {
    name: 'make_asset_transfer_txn',
    description: 'Create an asset transfer transaction',
    inputSchema: assetTransactionSchemas.makeAssetTransferTxn,
  }
];

export class AssetTransactionManager {
  /**
   * Creates an asset creation transaction
   */
  static makeAssetCreateTxn(params: {
    from: string;
    note?: Uint8Array;
    rekeyTo?: string;
    suggestedParams: SuggestedParams;
    total: number | bigint;
    decimals: number;
    defaultFrozen: boolean;
    unitName?: string;
    assetName?: string;
    assetURL?: string;
    assetMetadataHash?: string | Uint8Array;
    manager?: string;
    reserve?: string;
    freeze?: string;
    clawback?: string;
  }): Transaction {
    return makeAssetCreateTxnWithSuggestedParamsFromObject(params);
  }

  /**
   * Creates an asset configuration transaction
   */
  static makeAssetConfigTxn(params: {
    from: string;
    note?: Uint8Array;
    rekeyTo?: string;
    suggestedParams: SuggestedParams;
    assetIndex: number;
    manager?: string;
    reserve?: string;
    freeze?: string;
    clawback?: string;
    strictEmptyAddressChecking: boolean;
  }): Transaction {
    return makeAssetConfigTxnWithSuggestedParamsFromObject(params);
  }

  /**
   * Creates an asset destroy transaction
   */
  static makeAssetDestroyTxn(params: {
    from: string;
    note?: Uint8Array;
    rekeyTo?: string;
    suggestedParams: SuggestedParams;
    assetIndex: number;
  }): Transaction {
    return makeAssetDestroyTxnWithSuggestedParamsFromObject(params);
  }

  /**
   * Creates an asset freeze transaction
   */
  static makeAssetFreezeTxn(params: {
    from: string;
    note?: Uint8Array;
    rekeyTo?: string;
    suggestedParams: SuggestedParams;
    assetIndex: number;
    freezeTarget: string;
    freezeState: boolean;
  }): Transaction {
    return makeAssetFreezeTxnWithSuggestedParamsFromObject(params);
  }

  /**
   * Creates an asset transfer transaction
   */
  static makeAssetTransferTxn(params: {
    from: string;
    to: string;
    closeRemainderTo?: string;
    revocationTarget?: string;
    amount: number | bigint;
    note?: Uint8Array;
    rekeyTo?: string;
    suggestedParams: SuggestedParams;
    assetIndex: number;
  }): Transaction {
    return makeAssetTransferTxnWithSuggestedParamsFromObject(params);
  }

  // Tool handlers
  static async handleTool(name: string, args: Record<string, unknown>) {
    const params = await algodClient.getTransactionParams().do();
    const suggestedParams = { ...params, flatFee: true, fee: params.minFee  };

    switch (name) {
      case 'make_asset_create_txn':
        if (!args.from || typeof args.total !== 'number' || typeof args.decimals !== 'number' ||
            typeof args.defaultFrozen !== 'boolean') {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid asset creation parameters');
        }
        const assetCreateTxn = AssetTransactionManager.makeAssetCreateTxn({
          from: String(args.from),
          total: Number(args.total),
          decimals: Number(args.decimals),
          defaultFrozen: Boolean(args.defaultFrozen),
          unitName: typeof args.unitName === 'string' ? args.unitName : undefined,
          assetName: typeof args.assetName === 'string' ? args.assetName : undefined,
          assetURL: typeof args.assetURL === 'string' ? args.assetURL : undefined,
          assetMetadataHash: typeof args.assetMetadataHash === 'string' ? args.assetMetadataHash : undefined,
          manager: typeof args.manager === 'string' ? args.manager : undefined,
          reserve: typeof args.reserve === 'string' ? args.reserve : undefined,
          freeze: typeof args.freeze === 'string' ? args.freeze : undefined,
          clawback: typeof args.clawback === 'string' ? args.clawback : undefined,
          note: typeof args.note === 'string' ? new TextEncoder().encode(args.note) : undefined,
          rekeyTo: typeof args.rekeyTo === 'string' ? args.rekeyTo : undefined,
          suggestedParams,
        });
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(assetCreateTxn, null, 2),
          }],
        };

      case 'make_asset_config_txn':
        if (!args.from || typeof args.assetIndex !== 'number' || typeof args.strictEmptyAddressChecking !== 'boolean') {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid asset configuration parameters');
        }
        const assetConfigTxn = AssetTransactionManager.makeAssetConfigTxn({
          from: String(args.from),
          assetIndex: Number(args.assetIndex),
          manager: typeof args.manager === 'string' ? args.manager : undefined,
          reserve: typeof args.reserve === 'string' ? args.reserve : undefined,
          freeze: typeof args.freeze === 'string' ? args.freeze : undefined,
          clawback: typeof args.clawback === 'string' ? args.clawback : undefined,
          strictEmptyAddressChecking: Boolean(args.strictEmptyAddressChecking),
          note: typeof args.note === 'string' ? new TextEncoder().encode(args.note) : undefined,
          rekeyTo: typeof args.rekeyTo === 'string' ? args.rekeyTo : undefined,
          suggestedParams,
        });
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(assetConfigTxn, null, 2),
          }],
        };

      case 'make_asset_destroy_txn':
        if (!args.from || typeof args.assetIndex !== 'number') {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid asset destroy parameters');
        }
        const assetDestroyTxn = AssetTransactionManager.makeAssetDestroyTxn({
          from: String(args.from),
          assetIndex: Number(args.assetIndex),
          note: typeof args.note === 'string' ? new TextEncoder().encode(args.note) : undefined,
          rekeyTo: typeof args.rekeyTo === 'string' ? args.rekeyTo : undefined,
          suggestedParams,
        });
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(assetDestroyTxn, null, 2),
          }],
        };

      case 'make_asset_freeze_txn':
        if (!args.from || typeof args.assetIndex !== 'number' || !args.freezeTarget ||
            typeof args.freezeState !== 'boolean') {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid asset freeze parameters');
        }
        const assetFreezeTxn = AssetTransactionManager.makeAssetFreezeTxn({
          from: String(args.from),
          assetIndex: Number(args.assetIndex),
          freezeTarget: String(args.freezeTarget),
          freezeState: Boolean(args.freezeState),
          note: typeof args.note === 'string' ? new TextEncoder().encode(args.note) : undefined,
          rekeyTo: typeof args.rekeyTo === 'string' ? args.rekeyTo : undefined,
          suggestedParams,
        });
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(assetFreezeTxn, null, 2),
          }],
        };

      case 'make_asset_transfer_txn':
        if (!args.from || !args.to || !args.assetIndex || typeof args.amount !== 'number') {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid asset transfer parameters');
        }
        const assetTxn = AssetTransactionManager.makeAssetTransferTxn({
          from: String(args.from),
          to: String(args.to),
          assetIndex: Number(args.assetIndex),
          amount: Number(args.amount),
          note: typeof args.note === 'string' ? new TextEncoder().encode(args.note) : undefined,
          closeRemainderTo: typeof args.closeRemainderTo === 'string' ? args.closeRemainderTo : undefined,
          rekeyTo: typeof args.rekeyTo === 'string' ? args.rekeyTo : undefined,
          suggestedParams,
        });
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(assetTxn, null, 2),
          }],
        };

      default:
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown asset transaction tool: ${name}`
        );
    }
  }
}
