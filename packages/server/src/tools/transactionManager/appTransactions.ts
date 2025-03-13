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
  static makeApplicationUpdateTxn(txn: {
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
    return makeApplicationUpdateTxnFromObject(txn);
  }

  /**
   * Creates an application delete transaction
   */
  static makeApplicationDeleteTxn(txn: {
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
    return makeApplicationDeleteTxnFromObject(txn);
  }

  /**
   * Creates an application opt-in transaction
   */
  static makeApplicationOptInTxn(txn: {
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
    return makeApplicationOptInTxnFromObject(txn);
  }

  /**
   * Creates an application close out transaction
   */
  static makeApplicationCloseOutTxn(txn: {
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
    return makeApplicationCloseOutTxnFromObject(txn);
  }

  /**
   * Creates an application clear state transaction
   */
  static makeApplicationClearStateTxn(txn: {
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
    return makeApplicationClearStateTxnFromObject(txn);
  }

  /**
   * Creates an application no-op transaction
   */
  static makeApplicationNoOpTxn(txn: {
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
    return makeApplicationNoOpTxnFromObject(txn);
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
        // Create transaction with proper parameter handling
        const txnParams: Record<string, any> = {
          from: String(args.from),
          globalByteSlices: Number(args.numGlobalByteSlices),
          globalInts: Number(args.numGlobalInts),
          localByteSlices: Number(args.numLocalByteSlices),
          localInts: Number(args.numLocalInts),
          fee: suggestedParams.fee,
          firstRound: suggestedParams.firstRound,
          lastRound: suggestedParams.lastRound,
          genesisID: suggestedParams.genesisID,
          genesisHash: suggestedParams.genesisHash,
          type: 'appl',
          onComplete: 0 // NoOp
        };

        // Handle required program fields - keep as base64 strings
        txnParams.approvalProgram = args.approvalProgram as string;
        txnParams.clearProgram = args.clearProgram as string;

        // Handle optional fields
        if (typeof args.extraPages === 'number') {
          txnParams.extraPages = args.extraPages;
        }
       
        if (typeof args.note === 'string') {
          const noteBytes = new TextEncoder().encode(args.note);
          txnParams.note = Buffer.from(noteBytes).toString('base64');
        }
        if (typeof args.lease === 'string') {
          const leaseBytes = new TextEncoder().encode(args.lease);
          txnParams.lease = Buffer.from(leaseBytes).toString('base64');
        }
        if (typeof args.rekeyTo === 'string') {
          txnParams.rekeyTo = String(args.rekeyTo);
        }
        if (Array.isArray(args.appArgs)) {
          txnParams.appArgs = args.appArgs.map(arg => {
            const bytes = new TextEncoder().encode(String(arg));
            return Buffer.from(bytes).toString('base64');
          });
        }
        if (Array.isArray(args.accounts)) {
          txnParams.accounts = args.accounts.filter((acc): acc is string => typeof acc === 'string');
        }
        if (Array.isArray(args.foreignApps)) {
          txnParams.foreignApps = args.foreignApps.filter((app): app is number => typeof app === 'number');
        }
        if (Array.isArray(args.foreignAssets)) {
          txnParams.foreignAssets = args.foreignAssets.filter((asset): asset is number => typeof asset === 'number');
        }

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(txnParams, null, 2),
          }],
        };

      case 'make_app_update_txn':
        if (!args.from || !args.appIndex || !args.approvalProgram || !args.clearProgram) {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid application update parameters');
        }
        // Create transaction with proper parameter handling
        const updateTxnParams: Record<string, any> = {
          from: String(args.from),
          appIndex: Number(args.appIndex),
          fee: suggestedParams.fee,
          firstRound: suggestedParams.firstRound,
          lastRound: suggestedParams.lastRound,
          genesisID: suggestedParams.genesisID,
          genesisHash: suggestedParams.genesisHash,
          type: 'appl',
          onComplete: 4 // UpdateApplication
        };

        // Handle required program fields
        const updateApprovalProgram = new TextEncoder().encode(args.approvalProgram as string);
        const updateClearProgram = new TextEncoder().encode(args.clearProgram as string);
        updateTxnParams.approvalProgram = Buffer.from(updateApprovalProgram).toString('base64');
        updateTxnParams.clearProgram = Buffer.from(updateClearProgram).toString('base64');

        // Handle optional fields
        if (typeof args.note === 'string') {
          const noteBytes = new TextEncoder().encode(args.note);
          updateTxnParams.note = Buffer.from(noteBytes).toString('base64');
        }
        if (typeof args.lease === 'string') {
          const leaseBytes = new TextEncoder().encode(args.lease);
          updateTxnParams.lease = Buffer.from(leaseBytes).toString('base64');
        }
        if (typeof args.rekeyTo === 'string') {
          updateTxnParams.rekeyTo = String(args.rekeyTo);
        }
        if (Array.isArray(args.appArgs)) {
          updateTxnParams.appArgs = args.appArgs.map(arg => {
            const bytes = new TextEncoder().encode(String(arg));
            return Buffer.from(bytes).toString('base64');
          });
        }
        if (Array.isArray(args.accounts)) {
          updateTxnParams.accounts = args.accounts.filter((acc): acc is string => typeof acc === 'string');
        }
        if (Array.isArray(args.foreignApps)) {
          updateTxnParams.foreignApps = args.foreignApps.filter((app): app is number => typeof app === 'number');
        }
        if (Array.isArray(args.foreignAssets)) {
          updateTxnParams.foreignAssets = args.foreignAssets.filter((asset): asset is number => typeof asset === 'number');
        }

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(updateTxnParams, null, 2),
          }],
        };

      case 'make_app_delete_txn':
        if (!args.from || !args.appIndex) {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid application delete parameters');
        }
        // Create transaction with proper parameter handling
        const deleteTxnParams: Record<string, any> = {
          from: String(args.from),
          appIndex: Number(args.appIndex),
          fee: suggestedParams.fee,
          firstRound: suggestedParams.firstRound,
          lastRound: suggestedParams.lastRound,
          genesisID: suggestedParams.genesisID,
          genesisHash: suggestedParams.genesisHash,
          type: 'appl',
          onComplete: 5 // DeleteApplication
        };

        // Handle optional fields
        if (typeof args.note === 'string') {
          const noteBytes = new TextEncoder().encode(args.note);
          deleteTxnParams.note = Buffer.from(noteBytes).toString('base64');
        }
        if (typeof args.lease === 'string') {
          const leaseBytes = new TextEncoder().encode(args.lease);
          deleteTxnParams.lease = Buffer.from(leaseBytes).toString('base64');
        }
        if (typeof args.rekeyTo === 'string') {
          deleteTxnParams.rekeyTo = String(args.rekeyTo);
        }
        if (Array.isArray(args.appArgs)) {
          deleteTxnParams.appArgs = args.appArgs.map(arg => {
            const bytes = new TextEncoder().encode(String(arg));
            return Buffer.from(bytes).toString('base64');
          });
        }
        if (Array.isArray(args.accounts)) {
          deleteTxnParams.accounts = args.accounts.filter((acc): acc is string => typeof acc === 'string');
        }
        if (Array.isArray(args.foreignApps)) {
          deleteTxnParams.foreignApps = args.foreignApps.filter((app): app is number => typeof app === 'number');
        }
        if (Array.isArray(args.foreignAssets)) {
          deleteTxnParams.foreignAssets = args.foreignAssets.filter((asset): asset is number => typeof asset === 'number');
        }

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(deleteTxnParams, null, 2),
          }],
        };

      case 'make_app_optin_txn':
        if (!args.from || !args.appIndex) {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid application opt-in parameters');
        }
        // Create transaction with proper parameter handling
        const optInTxnParams: Record<string, any> = {
          from: String(args.from),
          appIndex: Number(args.appIndex),
          fee: suggestedParams.fee,
          firstRound: suggestedParams.firstRound,
          lastRound: suggestedParams.lastRound,
          genesisID: suggestedParams.genesisID,
          genesisHash: suggestedParams.genesisHash,
          type: 'appl',
          onComplete: 1 // OptIn
        };

        // Handle optional fields
        if (typeof args.note === 'string') {
          const noteBytes = new TextEncoder().encode(args.note);
          optInTxnParams.note = Buffer.from(noteBytes).toString('base64');
        }
        if (typeof args.lease === 'string') {
          const leaseBytes = new TextEncoder().encode(args.lease);
          optInTxnParams.lease = Buffer.from(leaseBytes).toString('base64');
        }
        if (typeof args.rekeyTo === 'string') {
          optInTxnParams.rekeyTo = String(args.rekeyTo);
        }
        if (Array.isArray(args.appArgs)) {
          optInTxnParams.appArgs = args.appArgs.map(arg => {
            const bytes = new TextEncoder().encode(String(arg));
            return Buffer.from(bytes).toString('base64');
          });
        }
        if (Array.isArray(args.accounts)) {
          optInTxnParams.accounts = args.accounts.filter((acc): acc is string => typeof acc === 'string');
        }
        if (Array.isArray(args.foreignApps)) {
          optInTxnParams.foreignApps = args.foreignApps.filter((app): app is number => typeof app === 'number');
        }
        if (Array.isArray(args.foreignAssets)) {
          optInTxnParams.foreignAssets = args.foreignAssets.filter((asset): asset is number => typeof asset === 'number');
        }

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(optInTxnParams, null, 2),
          }],
        };

      case 'make_app_closeout_txn':
        if (!args.from || !args.appIndex) {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid application close out parameters');
        }
        // Create transaction with proper parameter handling
        const closeOutTxnParams: Record<string, any> = {
          from: String(args.from),
          appIndex: Number(args.appIndex),
          fee: suggestedParams.fee,
          firstRound: suggestedParams.firstRound,
          lastRound: suggestedParams.lastRound,
          genesisID: suggestedParams.genesisID,
          genesisHash: suggestedParams.genesisHash,
          type: 'appl',
          onComplete: 2 // CloseOut
        };

        // Handle optional fields
        if (typeof args.note === 'string') {
          const noteBytes = new TextEncoder().encode(args.note);
          closeOutTxnParams.note = Buffer.from(noteBytes).toString('base64');
        }
        if (typeof args.lease === 'string') {
          const leaseBytes = new TextEncoder().encode(args.lease);
          closeOutTxnParams.lease = Buffer.from(leaseBytes).toString('base64');
        }
        if (typeof args.rekeyTo === 'string') {
          closeOutTxnParams.rekeyTo = String(args.rekeyTo);
        }
        if (Array.isArray(args.appArgs)) {
          closeOutTxnParams.appArgs = args.appArgs.map(arg => {
            const bytes = new TextEncoder().encode(String(arg));
            return Buffer.from(bytes).toString('base64');
          });
        }
        if (Array.isArray(args.accounts)) {
          closeOutTxnParams.accounts = args.accounts.filter((acc): acc is string => typeof acc === 'string');
        }
        if (Array.isArray(args.foreignApps)) {
          closeOutTxnParams.foreignApps = args.foreignApps.filter((app): app is number => typeof app === 'number');
        }
        if (Array.isArray(args.foreignAssets)) {
          closeOutTxnParams.foreignAssets = args.foreignAssets.filter((asset): asset is number => typeof asset === 'number');
        }

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(closeOutTxnParams, null, 2),
          }],
        };

      case 'make_app_clear_txn':
        if (!args.from || !args.appIndex) {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid application clear state parameters');
        }
        // Create transaction with proper parameter handling
        const clearTxnParams: Record<string, any> = {
          from: String(args.from),
          appIndex: Number(args.appIndex),
          fee: suggestedParams.fee,
          firstRound: suggestedParams.firstRound,
          lastRound: suggestedParams.lastRound,
          genesisID: suggestedParams.genesisID,
          genesisHash: suggestedParams.genesisHash,
          type: 'appl',
          onComplete: 3 // ClearState
        };

        // Handle optional fields
        if (typeof args.note === 'string') {
          const noteBytes = new TextEncoder().encode(args.note);
          clearTxnParams.note = Buffer.from(noteBytes).toString('base64');
        }
        if (typeof args.lease === 'string') {
          const leaseBytes = new TextEncoder().encode(args.lease);
          clearTxnParams.lease = Buffer.from(leaseBytes).toString('base64');
        }
        if (typeof args.rekeyTo === 'string') {
          clearTxnParams.rekeyTo = String(args.rekeyTo);
        }
        if (Array.isArray(args.appArgs)) {
          clearTxnParams.appArgs = args.appArgs.map(arg => {
            const bytes = new TextEncoder().encode(String(arg));
            return Buffer.from(bytes).toString('base64');
          });
        }
        if (Array.isArray(args.accounts)) {
          clearTxnParams.accounts = args.accounts.filter((acc): acc is string => typeof acc === 'string');
        }
        if (Array.isArray(args.foreignApps)) {
          clearTxnParams.foreignApps = args.foreignApps.filter((app): app is number => typeof app === 'number');
        }
        if (Array.isArray(args.foreignAssets)) {
          clearTxnParams.foreignAssets = args.foreignAssets.filter((asset): asset is number => typeof asset === 'number');
        }

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(clearTxnParams, null, 2),
          }],
        };

      case 'make_app_call_txn':
        if (!args.from || !args.appIndex) {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid application call parameters');
        }
        // Create transaction with proper parameter handling
        const callTxnParams: Record<string, any> = {
          from: String(args.from),
          appIndex: Number(args.appIndex),
          fee: suggestedParams.fee,
          firstRound: suggestedParams.firstRound,
          lastRound: suggestedParams.lastRound,
          genesisID: suggestedParams.genesisID,
          genesisHash: suggestedParams.genesisHash,
          type: 'appl',
          onComplete: 0 // NoOp
        };

        // Handle optional fields
        if (typeof args.note === 'string') {
          const noteBytes = new TextEncoder().encode(args.note);
          callTxnParams.note = Buffer.from(noteBytes).toString('base64');
        }
        if (typeof args.lease === 'string') {
          const leaseBytes = new TextEncoder().encode(args.lease);
          callTxnParams.lease = Buffer.from(leaseBytes).toString('base64');
        }
        if (typeof args.rekeyTo === 'string') {
          callTxnParams.rekeyTo = String(args.rekeyTo);
        }
        if (Array.isArray(args.appArgs)) {
          callTxnParams.appArgs = args.appArgs.map(arg => {
            const bytes = new TextEncoder().encode(String(arg));
            return Buffer.from(bytes).toString('base64');
          });
        }
        if (Array.isArray(args.accounts)) {
          callTxnParams.accounts = args.accounts.filter((acc): acc is string => typeof acc === 'string');
        }
        if (Array.isArray(args.foreignApps)) {
          callTxnParams.foreignApps = args.foreignApps.filter((app): app is number => typeof app === 'number');
        }
        if (Array.isArray(args.foreignAssets)) {
          callTxnParams.foreignAssets = args.foreignAssets.filter((asset): asset is number => typeof asset === 'number');
        }

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(callTxnParams, null, 2),
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
