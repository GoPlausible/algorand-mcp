import { 
  Transaction,
  OnApplicationComplete,
  makeApplicationCreateTxnFromObject,
  makeApplicationUpdateTxnFromObject,
  makeApplicationDeleteTxnFromObject,
  makeApplicationOptInTxnFromObject,
  makeApplicationCloseOutTxnFromObject,
  makeApplicationClearStateTxnFromObject,
  makeApplicationNoOpTxnFromObject,
  SuggestedParams
} from 'algosdk';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { algodClient } from '../../algorand-client.js';

// Tool schemas
export const appTransactionSchemas = {
  makeAppCreateTxn: {
    type: 'object',
    properties: {
      from: { type: 'string' },
      approvalProgram: { type: 'string' },
      clearProgram: { type: 'string' },
      numGlobalByteSlices: { type: 'integer' },
      numGlobalInts: { type: 'integer' },
      numLocalByteSlices: { type: 'integer' },
      numLocalInts: { type: 'integer' },
      extraPages: { type: 'integer', optional: true },
      note: { type: 'string', optional: true },
      lease: { type: 'string', optional: true },
      rekeyTo: { type: 'string', optional: true },
      appArgs: { 
        type: 'array',
        items: { type: 'string' },
        optional: true
      },
      accounts: {
        type: 'array',
        items: { type: 'string' },
        optional: true
      },
      foreignApps: {
        type: 'array',
        items: { type: 'integer' },
        optional: true
      },
      foreignAssets: {
        type: 'array',
        items: { type: 'integer' },
        optional: true
      }
    },
    required: ['from', 'approvalProgram', 'clearProgram', 'numGlobalByteSlices', 'numGlobalInts', 'numLocalByteSlices', 'numLocalInts']
  },
  makeAppUpdateTxn: {
    type: 'object',
    properties: {
      from: { type: 'string' },
      appIndex: { type: 'integer' },
      approvalProgram: { type: 'string' },
      clearProgram: { type: 'string' },
      note: { type: 'string', optional: true },
      lease: { type: 'string', optional: true },
      rekeyTo: { type: 'string', optional: true },
      appArgs: { 
        type: 'array',
        items: { type: 'string' },
        optional: true
      },
      accounts: {
        type: 'array',
        items: { type: 'string' },
        optional: true
      },
      foreignApps: {
        type: 'array',
        items: { type: 'integer' },
        optional: true
      },
      foreignAssets: {
        type: 'array',
        items: { type: 'integer' },
        optional: true
      }
    },
    required: ['from', 'appIndex', 'approvalProgram', 'clearProgram']
  },
  makeAppDeleteTxn: {
    type: 'object',
    properties: {
      from: { type: 'string' },
      appIndex: { type: 'integer' },
      note: { type: 'string', optional: true },
      lease: { type: 'string', optional: true },
      rekeyTo: { type: 'string', optional: true },
      appArgs: { 
        type: 'array',
        items: { type: 'string' },
        optional: true
      },
      accounts: {
        type: 'array',
        items: { type: 'string' },
        optional: true
      },
      foreignApps: {
        type: 'array',
        items: { type: 'integer' },
        optional: true
      },
      foreignAssets: {
        type: 'array',
        items: { type: 'integer' },
        optional: true
      }
    },
    required: ['from', 'appIndex']
  },
  makeAppOptInTxn: {
    type: 'object',
    properties: {
      from: { type: 'string' },
      appIndex: { type: 'integer' },
      note: { type: 'string', optional: true },
      lease: { type: 'string', optional: true },
      rekeyTo: { type: 'string', optional: true },
      appArgs: { 
        type: 'array',
        items: { type: 'string' },
        optional: true
      },
      accounts: {
        type: 'array',
        items: { type: 'string' },
        optional: true
      },
      foreignApps: {
        type: 'array',
        items: { type: 'integer' },
        optional: true
      },
      foreignAssets: {
        type: 'array',
        items: { type: 'integer' },
        optional: true
      }
    },
    required: ['from', 'appIndex']
  },
  makeAppCloseOutTxn: {
    type: 'object',
    properties: {
      from: { type: 'string' },
      appIndex: { type: 'integer' },
      note: { type: 'string', optional: true },
      lease: { type: 'string', optional: true },
      rekeyTo: { type: 'string', optional: true },
      appArgs: { 
        type: 'array',
        items: { type: 'string' },
        optional: true
      },
      accounts: {
        type: 'array',
        items: { type: 'string' },
        optional: true
      },
      foreignApps: {
        type: 'array',
        items: { type: 'integer' },
        optional: true
      },
      foreignAssets: {
        type: 'array',
        items: { type: 'integer' },
        optional: true
      }
    },
    required: ['from', 'appIndex']
  },
  makeAppClearTxn: {
    type: 'object',
    properties: {
      from: { type: 'string' },
      appIndex: { type: 'integer' },
      note: { type: 'string', optional: true },
      lease: { type: 'string', optional: true },
      rekeyTo: { type: 'string', optional: true },
      appArgs: { 
        type: 'array',
        items: { type: 'string' },
        optional: true
      },
      accounts: {
        type: 'array',
        items: { type: 'string' },
        optional: true
      },
      foreignApps: {
        type: 'array',
        items: { type: 'integer' },
        optional: true
      },
      foreignAssets: {
        type: 'array',
        items: { type: 'integer' },
        optional: true
      }
    },
    required: ['from', 'appIndex']
  },
  makeAppCallTxn: {
    type: 'object',
    properties: {
      from: { type: 'string' },
      appIndex: { type: 'integer' },
      appArgs: { 
        type: 'array',
        items: { type: 'string' },
        optional: true
      },
      accounts: {
        type: 'array',
        items: { type: 'string' },
        optional: true
      },
      foreignApps: {
        type: 'array',
        items: { type: 'integer' },
        optional: true
      },
      foreignAssets: {
        type: 'array',
        items: { type: 'integer' },
        optional: true
      },
      note: { type: 'string', optional: true }
    },
    required: ['from', 'appIndex']
  }
};

// Tool definitions
export const appTransactionTools = [
  {
    name: 'make_app_create_txn',
    description: 'Create an application creation transaction',
    inputSchema: appTransactionSchemas.makeAppCreateTxn,
  },
  {
    name: 'make_app_update_txn',
    description: 'Create an application update transaction',
    inputSchema: appTransactionSchemas.makeAppUpdateTxn,
  },
  {
    name: 'make_app_delete_txn',
    description: 'Create an application delete transaction',
    inputSchema: appTransactionSchemas.makeAppDeleteTxn,
  },
  {
    name: 'make_app_optin_txn',
    description: 'Create an application opt-in transaction',
    inputSchema: appTransactionSchemas.makeAppOptInTxn,
  },
  {
    name: 'make_app_closeout_txn',
    description: 'Create an application close out transaction',
    inputSchema: appTransactionSchemas.makeAppCloseOutTxn,
  },
  {
    name: 'make_app_clear_txn',
    description: 'Create an application clear state transaction',
    inputSchema: appTransactionSchemas.makeAppClearTxn,
  },
  {
    name: 'make_app_call_txn',
    description: 'Create an application call transaction',
    inputSchema: appTransactionSchemas.makeAppCallTxn,
  }
];

export class AppTransactionManager {
  /**
   * Creates an application creation transaction
   */
  static makeApplicationCreateTxn(params: {
    from: string;
    suggestedParams: SuggestedParams;
    approvalProgram: Uint8Array;
    clearProgram: Uint8Array;
    numGlobalByteSlices: number;
    numGlobalInts: number;
    numLocalByteSlices: number;
    numLocalInts: number;
    note?: Uint8Array;
    lease?: Uint8Array;
    rekeyTo?: string;
    extraPages?: number;
    appArgs?: Array<Uint8Array>;
    accounts?: string[];
    foreignApps?: number[];
    foreignAssets?: number[];
    boxes?: Array<{ appIndex: number; name: Uint8Array }>;
    onComplete: OnApplicationComplete;
  }): Transaction {
    return makeApplicationCreateTxnFromObject(params);
  }

  /**
   * Creates an application update transaction
   */
  static makeApplicationUpdateTxn(params: {
    from: string;
    suggestedParams: SuggestedParams;
    appIndex: number;
    approvalProgram: Uint8Array;
    clearProgram: Uint8Array;
    note?: Uint8Array;
    lease?: Uint8Array;
    rekeyTo?: string;
    appArgs?: Array<Uint8Array>;
    accounts?: string[];
    foreignApps?: number[];
    foreignAssets?: number[];
    boxes?: Array<{ appIndex: number; name: Uint8Array }>;
    onComplete: OnApplicationComplete;
  }): Transaction {
    return makeApplicationUpdateTxnFromObject(params);
  }

  /**
   * Creates an application delete transaction
   */
  static makeApplicationDeleteTxn(params: {
    from: string;
    suggestedParams: SuggestedParams;
    appIndex: number;
    note?: Uint8Array;
    lease?: Uint8Array;
    rekeyTo?: string;
    appArgs?: Array<Uint8Array>;
    accounts?: string[];
    foreignApps?: number[];
    foreignAssets?: number[];
    boxes?: Array<{ appIndex: number; name: Uint8Array }>;
    onComplete: OnApplicationComplete;
  }): Transaction {
    return makeApplicationDeleteTxnFromObject(params);
  }

  /**
   * Creates an application opt-in transaction
   */
  static makeApplicationOptInTxn(params: {
    from: string;
    suggestedParams: SuggestedParams;
    appIndex: number;
    note?: Uint8Array;
    lease?: Uint8Array;
    rekeyTo?: string;
    appArgs?: Array<Uint8Array>;
    accounts?: string[];
    foreignApps?: number[];
    foreignAssets?: number[];
    boxes?: Array<{ appIndex: number; name: Uint8Array }>;
    onComplete: OnApplicationComplete;
  }): Transaction {
    return makeApplicationOptInTxnFromObject(params);
  }

  /**
   * Creates an application close out transaction
   */
  static makeApplicationCloseOutTxn(params: {
    from: string;
    suggestedParams: SuggestedParams;
    appIndex: number;
    note?: Uint8Array;
    lease?: Uint8Array;
    rekeyTo?: string;
    appArgs?: Array<Uint8Array>;
    accounts?: string[];
    foreignApps?: number[];
    foreignAssets?: number[];
    boxes?: Array<{ appIndex: number; name: Uint8Array }>;
    onComplete: OnApplicationComplete;
  }): Transaction {
    return makeApplicationCloseOutTxnFromObject(params);
  }

  /**
   * Creates an application clear state transaction
   */
  static makeApplicationClearStateTxn(params: {
    from: string;
    suggestedParams: SuggestedParams;
    appIndex: number;
    note?: Uint8Array;
    lease?: Uint8Array;
    rekeyTo?: string;
    appArgs?: Array<Uint8Array>;
    accounts?: string[];
    foreignApps?: number[];
    foreignAssets?: number[];
    boxes?: Array<{ appIndex: number; name: Uint8Array }>;
    onComplete: OnApplicationComplete;
  }): Transaction {
    return makeApplicationClearStateTxnFromObject(params);
  }

  /**
   * Creates an application no-op transaction
   */
  static makeApplicationNoOpTxn(params: {
    from: string;
    suggestedParams: SuggestedParams;
    appIndex: number;
    note?: Uint8Array;
    lease?: Uint8Array;
    rekeyTo?: string;
    appArgs?: Array<Uint8Array>;
    accounts?: string[];
    foreignApps?: number[];
    foreignAssets?: number[];
    boxes?: Array<{ appIndex: number; name: Uint8Array }>;
    onComplete: OnApplicationComplete;
  }): Transaction {
    return makeApplicationNoOpTxnFromObject(params);
  }

  // Tool handlers
  static async handleTool(name: string, args: Record<string, unknown>) {
    const params = await algodClient.getTransactionParams().do();
    const suggestedParams = { ...params, flatFee: true, fee: params.minFee  };

    switch (name) {
      case 'make_app_create_txn':
        if (!args.from || !args.approvalProgram || !args.clearProgram ||
            typeof args.numGlobalByteSlices !== 'number' || typeof args.numGlobalInts !== 'number' ||
            typeof args.numLocalByteSlices !== 'number' || typeof args.numLocalInts !== 'number') {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid application creation parameters');
        }
        const appCreateTxn = AppTransactionManager.makeApplicationCreateTxn({
          from: String(args.from),
          approvalProgram: new TextEncoder().encode(args.approvalProgram as string),
          clearProgram: new TextEncoder().encode(args.clearProgram as string),
          numGlobalByteSlices: Number(args.numGlobalByteSlices),
          numGlobalInts: Number(args.numGlobalInts),
          numLocalByteSlices: Number(args.numLocalByteSlices),
          numLocalInts: Number(args.numLocalInts),
          extraPages: typeof args.extraPages === 'number' ? args.extraPages : undefined,
          note: typeof args.note === 'string' ? new TextEncoder().encode(args.note) : undefined,
          lease: typeof args.lease === 'string' ? new TextEncoder().encode(args.lease) : undefined,
          rekeyTo: typeof args.rekeyTo === 'string' ? args.rekeyTo : undefined,
          appArgs: Array.isArray(args.appArgs) ? args.appArgs.map(arg => new TextEncoder().encode(String(arg))) : undefined,
          accounts: Array.isArray(args.accounts) ? args.accounts.filter((acc): acc is string => typeof acc === 'string') : undefined,
          foreignApps: Array.isArray(args.foreignApps) ? args.foreignApps.filter((app): app is number => typeof app === 'number') : undefined,
          foreignAssets: Array.isArray(args.foreignAssets) ? args.foreignAssets.filter((asset): asset is number => typeof asset === 'number') : undefined,
          suggestedParams,
          onComplete: 0, // NoOp
        });
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(appCreateTxn, null, 2),
          }],
        };

      case 'make_app_update_txn':
        if (!args.from || !args.appIndex || !args.approvalProgram || !args.clearProgram) {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid application update parameters');
        }
        const appUpdateTxn = AppTransactionManager.makeApplicationUpdateTxn({
          from: String(args.from),
          appIndex: Number(args.appIndex),
          approvalProgram: new TextEncoder().encode(args.approvalProgram as string),
          clearProgram: new TextEncoder().encode(args.clearProgram as string),
          note: typeof args.note === 'string' ? new TextEncoder().encode(args.note) : undefined,
          lease: typeof args.lease === 'string' ? new TextEncoder().encode(args.lease) : undefined,
          rekeyTo: typeof args.rekeyTo === 'string' ? args.rekeyTo : undefined,
          appArgs: Array.isArray(args.appArgs) ? args.appArgs.map(arg => new TextEncoder().encode(String(arg))) : undefined,
          accounts: Array.isArray(args.accounts) ? args.accounts.filter((acc): acc is string => typeof acc === 'string') : undefined,
          foreignApps: Array.isArray(args.foreignApps) ? args.foreignApps.filter((app): app is number => typeof app === 'number') : undefined,
          foreignAssets: Array.isArray(args.foreignAssets) ? args.foreignAssets.filter((asset): asset is number => typeof asset === 'number') : undefined,
          suggestedParams,
          onComplete: 4, // UpdateApplication
        });
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(appUpdateTxn, null, 2),
          }],
        };

      case 'make_app_delete_txn':
        if (!args.from || !args.appIndex) {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid application delete parameters');
        }
        const appDeleteTxn = AppTransactionManager.makeApplicationDeleteTxn({
          from: String(args.from),
          appIndex: Number(args.appIndex),
          note: typeof args.note === 'string' ? new TextEncoder().encode(args.note) : undefined,
          lease: typeof args.lease === 'string' ? new TextEncoder().encode(args.lease) : undefined,
          rekeyTo: typeof args.rekeyTo === 'string' ? args.rekeyTo : undefined,
          appArgs: Array.isArray(args.appArgs) ? args.appArgs.map(arg => new TextEncoder().encode(String(arg))) : undefined,
          accounts: Array.isArray(args.accounts) ? args.accounts.filter((acc): acc is string => typeof acc === 'string') : undefined,
          foreignApps: Array.isArray(args.foreignApps) ? args.foreignApps.filter((app): app is number => typeof app === 'number') : undefined,
          foreignAssets: Array.isArray(args.foreignAssets) ? args.foreignAssets.filter((asset): asset is number => typeof asset === 'number') : undefined,
          suggestedParams,
          onComplete: 5, // DeleteApplication
        });
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(appDeleteTxn, null, 2),
          }],
        };

      case 'make_app_optin_txn':
        if (!args.from || !args.appIndex) {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid application opt-in parameters');
        }
        const appOptInTxn = AppTransactionManager.makeApplicationOptInTxn({
          from: String(args.from),
          appIndex: Number(args.appIndex),
          note: typeof args.note === 'string' ? new TextEncoder().encode(args.note) : undefined,
          lease: typeof args.lease === 'string' ? new TextEncoder().encode(args.lease) : undefined,
          rekeyTo: typeof args.rekeyTo === 'string' ? args.rekeyTo : undefined,
          appArgs: Array.isArray(args.appArgs) ? args.appArgs.map(arg => new TextEncoder().encode(String(arg))) : undefined,
          accounts: Array.isArray(args.accounts) ? args.accounts.filter((acc): acc is string => typeof acc === 'string') : undefined,
          foreignApps: Array.isArray(args.foreignApps) ? args.foreignApps.filter((app): app is number => typeof app === 'number') : undefined,
          foreignAssets: Array.isArray(args.foreignAssets) ? args.foreignAssets.filter((asset): asset is number => typeof asset === 'number') : undefined,
          suggestedParams,
          onComplete: 1, // OptIn
        });
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(appOptInTxn, null, 2),
          }],
        };

      case 'make_app_closeout_txn':
        if (!args.from || !args.appIndex) {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid application close out parameters');
        }
        const appCloseOutTxn = AppTransactionManager.makeApplicationCloseOutTxn({
          from: String(args.from),
          appIndex: Number(args.appIndex),
          note: typeof args.note === 'string' ? new TextEncoder().encode(args.note) : undefined,
          lease: typeof args.lease === 'string' ? new TextEncoder().encode(args.lease) : undefined,
          rekeyTo: typeof args.rekeyTo === 'string' ? args.rekeyTo : undefined,
          appArgs: Array.isArray(args.appArgs) ? args.appArgs.map(arg => new TextEncoder().encode(String(arg))) : undefined,
          accounts: Array.isArray(args.accounts) ? args.accounts.filter((acc): acc is string => typeof acc === 'string') : undefined,
          foreignApps: Array.isArray(args.foreignApps) ? args.foreignApps.filter((app): app is number => typeof app === 'number') : undefined,
          foreignAssets: Array.isArray(args.foreignAssets) ? args.foreignAssets.filter((asset): asset is number => typeof asset === 'number') : undefined,
          suggestedParams,
          onComplete: 2, // CloseOut
        });
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(appCloseOutTxn, null, 2),
          }],
        };

      case 'make_app_clear_txn':
        if (!args.from || !args.appIndex) {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid application clear state parameters');
        }
        const appClearTxn = AppTransactionManager.makeApplicationClearStateTxn({
          from: String(args.from),
          appIndex: Number(args.appIndex),
          note: typeof args.note === 'string' ? new TextEncoder().encode(args.note) : undefined,
          lease: typeof args.lease === 'string' ? new TextEncoder().encode(args.lease) : undefined,
          rekeyTo: typeof args.rekeyTo === 'string' ? args.rekeyTo : undefined,
          appArgs: Array.isArray(args.appArgs) ? args.appArgs.map(arg => new TextEncoder().encode(String(arg))) : undefined,
          accounts: Array.isArray(args.accounts) ? args.accounts.filter((acc): acc is string => typeof acc === 'string') : undefined,
          foreignApps: Array.isArray(args.foreignApps) ? args.foreignApps.filter((app): app is number => typeof app === 'number') : undefined,
          foreignAssets: Array.isArray(args.foreignAssets) ? args.foreignAssets.filter((asset): asset is number => typeof asset === 'number') : undefined,
          suggestedParams,
          onComplete: 3, // ClearState
        });
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(appClearTxn, null, 2),
          }],
        };

      case 'make_app_call_txn':
        if (!args.from || !args.appIndex) {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid application call parameters');
        }
        const appCallTxn = AppTransactionManager.makeApplicationNoOpTxn({
          from: String(args.from),
          appIndex: Number(args.appIndex),
          note: typeof args.note === 'string' ? new TextEncoder().encode(args.note) : undefined,
          lease: typeof args.lease === 'string' ? new TextEncoder().encode(args.lease) : undefined,
          rekeyTo: typeof args.rekeyTo === 'string' ? args.rekeyTo : undefined,
          appArgs: Array.isArray(args.appArgs) ? args.appArgs.map(arg => new TextEncoder().encode(String(arg))) : undefined,
          accounts: Array.isArray(args.accounts) ? args.accounts.filter((acc): acc is string => typeof acc === 'string') : undefined,
          foreignApps: Array.isArray(args.foreignApps) ? args.foreignApps.filter((app): app is number => typeof app === 'number') : undefined,
          foreignAssets: Array.isArray(args.foreignAssets) ? args.foreignAssets.filter((asset): asset is number => typeof asset === 'number') : undefined,
          suggestedParams,
          onComplete: 0, // NoOp
        });
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(appCallTxn, null, 2),
          }],
        };

      default:
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown application transaction tool: ${name}`
        );
    }
  }
}
