import { SuggestedParams, OnApplicationComplete } from 'algosdk';
import { on } from 'events';

// Base transaction parameters interface
export interface BaseAppTxnParams {
  from: string;
  suggestedParams: SuggestedParams;
  note?: Uint8Array;
  lease?: Uint8Array;
  rekeyTo?: string;
  appArgs?: Array<Uint8Array>;
  accounts?: string[];
  foreignApps?: number[];
  foreignAssets?: number[];
  boxes?: Array<{ appIndex: number; name: Uint8Array }>;
  onComplete?: OnApplicationComplete;
}

// Application creation parameters
export interface AppCreateTxnParams extends BaseAppTxnParams {
  approvalProgram: Uint8Array;
  clearProgram: Uint8Array;
  numGlobalByteSlices: number;
  numGlobalInts: number;
  numLocalByteSlices: number;
  numLocalInts: number;
  extraPages?: number;
}

// Application update parameters
export interface AppUpdateTxnParams extends BaseAppTxnParams {
  appIndex: number;
  approvalProgram: Uint8Array;
  clearProgram: Uint8Array;
}

// Application delete parameters
export interface AppDeleteTxnParams extends BaseAppTxnParams {
  appIndex: number;
}

// Application opt-in parameters
export interface AppOptInTxnParams extends BaseAppTxnParams {
  appIndex: number;
}

// Application close-out parameters
export interface AppCloseOutTxnParams extends BaseAppTxnParams {
  appIndex: number;
}

// Application clear state parameters
export interface AppClearStateTxnParams extends BaseAppTxnParams {
  appIndex: number;
}

// Application call parameters
export interface AppCallTxnParams extends BaseAppTxnParams {
  appIndex: number;
}

// Tool schemas for MCP
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
      },
      onComplete: { type: 'integer', optional: true }
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
      },
      onComplete: { type: 'integer', optional: true }
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
      },
      onComplete: { type: 'integer', optional: true }
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
      },
      onComplete: { type: 'integer', optional: true }
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
      },
      onComplete: { type: 'integer', optional: true }
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
