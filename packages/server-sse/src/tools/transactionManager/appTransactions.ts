/**
 * Application Transaction Manager for Algorand Remote MCP
 * Handles smart contract (application) operations on the Algorand blockchain
 */

import algosdk, { OnApplicationComplete } from 'algosdk';
import { z } from 'zod';
import { ResponseProcessor } from '../../utils';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env, Props } from '../../types';

/**
 * Create and validate an Algorand client
 */
function createAlgoClient(algodUrl: string, token: string): algosdk.Algodv2 | null {
  if (!algodUrl) {
    console.error('Algorand node URL not configured');
    return null;
  }
  
  return new algosdk.Algodv2(token, algodUrl, '');
}

/**
 * Process application arguments with type detection
 * @param args Array of arguments to process
 * @returns Array of Uint8Array processed arguments
 */
function processAppArgs(args: string[]): Uint8Array[] {
  return args.map(arg => {
    // Try to determine if the arg is an address, a number, or a string
    if (algosdk.isValidAddress(arg)) {
      return algosdk.decodeAddress(arg).publicKey;
    } else if (/^\d+$/.test(arg)) {
      return algosdk.encodeUint64(parseInt(arg));
    } else {
      const encoder = new TextEncoder();
      return encoder.encode(arg);
    }
  });
}

/**
 * Process optional note field
 * @param note Optional note string
 * @returns Uint8Array of the note or undefined
 */
function processNote(note?: string): Uint8Array | undefined {
  if (!note) return undefined;
  
  const encoder = new TextEncoder();
  return encoder.encode(note);
}

/**
 * Register application (smart contract) transaction management tools to the MCP server
 */
export function registerAppTransactionTools(server: McpServer,env: Env, props: Props): void {
  // Create application (smart contract)
  server.tool(
    'create_application',
    'Create a new smart contract application on Algorand',
    { 
      creator: z.string().describe('Creator address'),
      approvalProgram: z.string().describe('TEAL approval program (compiled)'),
      clearProgram: z.string().describe('TEAL clear program (compiled)'),
      numGlobalInts: z.number().min(0).default(0).describe('Number of global integers'),
      numGlobalBytes: z.number().min(0).default(0).describe('Number of global byte slices'),
      numLocalInts: z.number().min(0).default(0).describe('Number of local integers'),
      numLocalBytes: z.number().min(0).default(0).describe('Number of local byte slices'),
      args: z.array(z.string()).optional().describe('Application arguments'),
      note: z.string().optional().describe('Optional transaction note'),
      extraPages: z.number().min(0).max(3).default(0).describe('Extra pages allocated to the app')
    },
    async ({ creator, approvalProgram, clearProgram, numGlobalInts, numGlobalBytes, 
            numLocalInts, numLocalBytes, args = [], note, extraPages }) => {
      
      if (!env.ALGORAND_ALGOD) {
        return {
          content: [{
            type: 'text',
            text: 'Algorand node URL not configured'
          }]
        };
      }
      
      try {
        // Create algod client
        const algodClient = createAlgoClient(env.ALGORAND_ALGOD, env.ALGORAND_TOKEN || '');
        if (!algodClient) {
          throw new Error('Failed to create Algorand client');
        }
        
        // Get suggested transaction parameters
        const params = await algodClient.getTransactionParams().do();
        
        // Process optional note
        const noteBytes = processNote(note);
        
        // Decode programs from base64
        let approvalProgramBytes: Uint8Array;
        let clearProgramBytes: Uint8Array;
        try {
          approvalProgramBytes = new Uint8Array(Buffer.from(approvalProgram, 'base64'));
          clearProgramBytes = new Uint8Array(Buffer.from(clearProgram, 'base64'));
        } catch (error) {
          throw new Error('Invalid program format. Expected base64 encoded strings.');
        }
        
        // Process application arguments
        const appArgs = processAppArgs(args);
        
        // Create application creation transaction
        const txn = algosdk.makeApplicationCreateTxnFromObject({
          from: creator,
          suggestedParams: params,
          approvalProgram: approvalProgramBytes,
          clearProgram: clearProgramBytes,
          numGlobalByteSlices: numGlobalBytes,
          numGlobalInts: numGlobalInts,
          numLocalByteSlices: numLocalBytes,
          numLocalInts: numLocalInts,
          appArgs,
          note: noteBytes,
          extraPages,
          onComplete: algosdk.OnApplicationComplete.NoOpOC
        });
        
        // Return the encoded transaction
        return ResponseProcessor.processResponse({
          txID: txn.txID(),
          encodedTxn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64'),
          txnInfo: {
            type: 'app-create',
            creator,
            schema: {
              globalBytes: numGlobalBytes,
              globalInts: numGlobalInts,
              localBytes: numLocalBytes,
              localInts: numLocalInts
            },
            extraPages,
            fee: params.fee,
            firstRound: params.firstRound,
            lastRound: params.lastRound
          }
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error creating application transaction: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Update application
  server.tool(
    'update_application',
    'Update an existing smart contract application on Algorand',
    { 
      sender: z.string().describe('Sender address (must be the app creator)'),
      appId: z.number().describe('Application ID to update'),
      approvalProgram: z.string().describe('New TEAL approval program (compiled)'),
      clearProgram: z.string().describe('New TEAL clear program (compiled)'),
      appArgs: z.array(z.string()).optional().describe('Application arguments'),
      accounts: z.array(z.string()).optional().describe('Accounts to be passed to the application'),
      foreignApps: z.array(z.number()).optional().describe('Foreign apps to be passed to the application'),
      foreignAssets: z.array(z.number()).optional().describe('Foreign assets to be passed to the application'),
      note: z.string().optional().describe('Optional transaction note')
    },
    async ({ sender, appId, approvalProgram, clearProgram, appArgs = [], accounts = [], 
            foreignApps = [], foreignAssets = [], note }) => {
      
      if (!env.ALGORAND_ALGOD) {
        return {
          content: [{
            type: 'text',
            text: 'Algorand node URL not configured'
          }]
        };
      }
      
      try {
        // Create algod client
        const algodClient = createAlgoClient(env.ALGORAND_ALGOD,env.ALGORAND_TOKEN || '');
        if (!algodClient) {
          throw new Error('Failed to create Algorand client');
        }
        
        // Get suggested transaction parameters
        const params = await algodClient.getTransactionParams().do();
        
        // Process optional note
        const noteBytes = processNote(note);
        
        // Decode programs from base64
        let approvalProgramBytes: Uint8Array;
        let clearProgramBytes: Uint8Array;
        try {
          approvalProgramBytes = new Uint8Array(Buffer.from(approvalProgram, 'base64'));
          clearProgramBytes = new Uint8Array(Buffer.from(clearProgram, 'base64'));
        } catch (error) {
          throw new Error('Invalid program format. Expected base64 encoded strings.');
        }
        
        // Process application arguments
        const processedAppArgs = processAppArgs(appArgs);
        
        // Create application update transaction
        const txn = algosdk.makeApplicationUpdateTxnFromObject({
          from: sender,
          suggestedParams: params,
          appIndex: appId,
          approvalProgram: approvalProgramBytes,
          clearProgram: clearProgramBytes,
          appArgs: processedAppArgs,
          accounts,
          foreignApps,
          foreignAssets,
          note: noteBytes
        });
        
        // Return the encoded transaction
        return ResponseProcessor.processResponse({
          txID: txn.txID(),
          encodedTxn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64'),
          txnInfo: {
            type: 'app-update',
            sender,
            appId,
            fee: params.fee,
            firstRound: params.firstRound,
            lastRound: params.lastRound
          }
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error creating application update transaction: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Delete application
  server.tool(
    'delete_application',
    'Delete an existing smart contract application on Algorand',
    { 
      sender: z.string().describe('Sender address (must be the app creator)'),
      appId: z.number().describe('Application ID to delete'),
      appArgs: z.array(z.string()).optional().describe('Application arguments'),
      accounts: z.array(z.string()).optional().describe('Accounts to be passed to the application'),
      foreignApps: z.array(z.number()).optional().describe('Foreign apps to be passed to the application'),
      foreignAssets: z.array(z.number()).optional().describe('Foreign assets to be passed to the application'),
      note: z.string().optional().describe('Optional transaction note')
    },
    async ({ sender, appId, appArgs = [], accounts = [], 
            foreignApps = [], foreignAssets = [], note }) => {
      
      if (!env.ALGORAND_ALGOD) {
        return {
          content: [{
            type: 'text',
            text: 'Algorand node URL not configured'
          }]
        };
      }
      
      try {
        // Create algod client
        const algodClient = createAlgoClient(env.ALGORAND_ALGOD, env.ALGORAND_TOKEN || '');
        if (!algodClient) {
          throw new Error('Failed to create Algorand client');
        }
        
        // Get suggested transaction parameters
        const params = await algodClient.getTransactionParams().do();
        
        // Process optional note
        const noteBytes = processNote(note);
        
        // Process application arguments
        const processedAppArgs = processAppArgs(appArgs);
        
        // Create application delete transaction
        const txn = algosdk.makeApplicationDeleteTxnFromObject({
          from: sender,
          suggestedParams: params,
          appIndex: appId,
          appArgs: processedAppArgs,
          accounts,
          foreignApps,
          foreignAssets,
          note: noteBytes
        });
        
        // Return the encoded transaction
        return ResponseProcessor.processResponse({
          txID: txn.txID(),
          encodedTxn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64'),
          txnInfo: {
            type: 'app-delete',
            sender,
            appId,
            fee: params.fee,
            firstRound: params.firstRound,
            lastRound: params.lastRound
          }
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error creating application delete transaction: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Close out from application
  server.tool(
    'closeout_application',
    'Close out from an Algorand application',
    { 
      account: z.string().describe('Account address to close out'),
      appId: z.number().describe('Application ID to close out from'),
      appArgs: z.array(z.string()).optional().describe('Application arguments'),
      accounts: z.array(z.string()).optional().describe('Accounts to be passed to the application'),
      foreignApps: z.array(z.number()).optional().describe('Foreign apps to be passed to the application'),
      foreignAssets: z.array(z.number()).optional().describe('Foreign assets to be passed to the application'),
      note: z.string().optional().describe('Optional transaction note')
    },
    async ({ account, appId, appArgs = [], accounts = [], 
            foreignApps = [], foreignAssets = [], note }) => {
      
      if (!env.ALGORAND_ALGOD) {
        return {
          content: [{
            type: 'text',
            text: 'Algorand node URL not configured'
          }]
        };
      }
      
      try {
        // Create algod client
        const algodClient = createAlgoClient(env.ALGORAND_ALGOD, env.ALGORAND_TOKEN || '');
        if (!algodClient) {
          throw new Error('Failed to create Algorand client');
        }
        
        // Get suggested transaction parameters
        const params = await algodClient.getTransactionParams().do();
        
        // Process optional note
        const noteBytes = processNote(note);
        
        // Process application arguments
        const processedAppArgs = processAppArgs(appArgs);
        
        // Create application close-out transaction
        const txn = algosdk.makeApplicationCloseOutTxnFromObject({
          from: account,
          suggestedParams: params,
          appIndex: appId,
          appArgs: processedAppArgs,
          accounts,
          foreignApps,
          foreignAssets,
          note: noteBytes
        });
        
        // Return the encoded transaction
        return ResponseProcessor.processResponse({
          txID: txn.txID(),
          encodedTxn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64'),
          txnInfo: {
            type: 'app-closeout',
            account,
            appId,
            fee: params.fee,
            firstRound: params.firstRound,
            lastRound: params.lastRound
          }
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error creating application close-out transaction: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Clear application state
  server.tool(
    'clear_application',
    'Clear state for an Algorand application',
    { 
      account: z.string().describe('Account address to clear state for'),
      appId: z.number().describe('Application ID to clear state from'),
      appArgs: z.array(z.string()).optional().describe('Application arguments'),
      accounts: z.array(z.string()).optional().describe('Accounts to be passed to the application'),
      foreignApps: z.array(z.number()).optional().describe('Foreign apps to be passed to the application'),
      foreignAssets: z.array(z.number()).optional().describe('Foreign assets to be passed to the application'),
      note: z.string().optional().describe('Optional transaction note')
    },
    async ({ account, appId, appArgs = [], accounts = [], 
            foreignApps = [], foreignAssets = [], note }) => {
      
      if (!env.ALGORAND_ALGOD) {
        return {
          content: [{
            type: 'text',
            text: 'Algorand node URL not configured'
          }]
        };
      }
      
      try {
        // Create algod client
        const algodClient = createAlgoClient(env.ALGORAND_ALGOD,env.ALGORAND_TOKEN || '');
        if (!algodClient) {
          throw new Error('Failed to create Algorand client');
        }
        
        // Get suggested transaction parameters
        const params = await algodClient.getTransactionParams().do();
        
        // Process optional note
        const noteBytes = processNote(note);
        
        // Process application arguments
        const processedAppArgs = processAppArgs(appArgs);
        
        // Create application clear state transaction
        const txn = algosdk.makeApplicationClearStateTxnFromObject({
          from: account,
          suggestedParams: params,
          appIndex: appId,
          appArgs: processedAppArgs,
          accounts,
          foreignApps,
          foreignAssets,
          note: noteBytes
        });
        
        // Return the encoded transaction
        return ResponseProcessor.processResponse({
          txID: txn.txID(),
          encodedTxn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64'),
          txnInfo: {
            type: 'app-clear-state',
            account,
            appId,
            fee: params.fee,
            firstRound: params.firstRound,
            lastRound: params.lastRound
          }
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error creating application clear state transaction: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Call application
  server.tool(
    'call_application',
    'Call a smart contract application on Algorand',
    { 
      sender: z.string().describe('Sender address'),
      appId: z.number().describe('Application ID'),
      appArgs: z.array(z.string()).optional().describe('Application arguments'),
      accounts: z.array(z.string()).optional().describe('Accounts to be passed to the application'),
      foreignApps: z.array(z.number()).optional().describe('Foreign apps to be passed to the application'),
      foreignAssets: z.array(z.number()).optional().describe('Foreign assets to be passed to the application'),
      onComplete: z.enum(['noop', 'optin', 'closeout', 'clear', 'update', 'delete']).default('noop').describe('OnComplete action'),
      note: z.string().optional().describe('Optional transaction note')
    },
    async ({ sender, appId, appArgs = [], accounts = [], foreignApps = [], 
            foreignAssets = [], onComplete, note }) => {
      
      if (!env.ALGORAND_ALGOD) {
        return {
          content: [{
            type: 'text',
            text: 'Algorand node URL not configured'
          }]
        };
      }
      
      try {
        // Create algod client
        const algodClient = createAlgoClient(env.ALGORAND_ALGOD,env.ALGORAND_TOKEN || '');
        if (!algodClient) {
          throw new Error('Failed to create Algorand client');
        }
        
        // Get suggested transaction parameters
        const params = await algodClient.getTransactionParams().do();
        
        // Process optional note
        const noteBytes = processNote(note);
        
        // Process application arguments
        const processedAppArgs = processAppArgs(appArgs);
        
        // Create transaction based on onComplete value
        let txn;
        const baseParams = {
          from: sender,
          suggestedParams: params,
          appIndex: appId,
          appArgs: processedAppArgs,
          accounts,
          foreignApps,
          foreignAssets,
          note: noteBytes
        };
        
        switch (onComplete) {
          case 'optin':
            txn = algosdk.makeApplicationOptInTxnFromObject(baseParams);
            break;
          case 'closeout':
            txn = algosdk.makeApplicationCloseOutTxnFromObject(baseParams);
            break;
          case 'clear':
            txn = algosdk.makeApplicationClearStateTxnFromObject(baseParams);
            break;
          case 'update':
            throw new Error("Application update requires approval and clear programs. Use update_application instead.");
          case 'delete':
            txn = algosdk.makeApplicationDeleteTxnFromObject(baseParams);
            break;
          case 'noop':
          default:
            txn = algosdk.makeApplicationNoOpTxnFromObject(baseParams);
            break;
        }
        
        // Return the encoded transaction
        return ResponseProcessor.processResponse({
          txID: txn.txID(),
          encodedTxn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64'),
          txnInfo: {
            type: 'app-call',
            sender,
            appId,
            onComplete,
            fee: params.fee,
            firstRound: params.firstRound,
            lastRound: params.lastRound
          }
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error creating application call transaction: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Opt-in to application
  server.tool(
    'optin_application',
    'Opt-in to an Algorand application',
    { 
      account: z.string().describe('Account address to opt-in'),
      appId: z.number().describe('Application ID to opt-in to'),
      appArgs: z.array(z.string()).optional().describe('Optional application arguments'),
      note: z.string().optional().describe('Optional transaction note')
    },
    async ({ account, appId, appArgs = [], note }) => {
      
      if (!env.ALGORAND_ALGOD) {
        return {
          content: [{
            type: 'text',
            text: 'Algorand node URL not configured'
          }]
        };
      }
      
      try {
        // Create algod client
        const algodClient = createAlgoClient(env.ALGORAND_ALGOD, env.ALGORAND_TOKEN || '');
        if (!algodClient) {
          throw new Error('Failed to create Algorand client');
        }
        
        // Get suggested transaction parameters
        const params = await algodClient.getTransactionParams().do();
        
        // Process optional note
        const noteBytes = processNote(note);
        
        // Process application arguments
        const processedAppArgs = processAppArgs(appArgs);
        
        // Create application opt-in transaction
        const txn = algosdk.makeApplicationOptInTxnFromObject({
          from: account,
          suggestedParams: params,
          appIndex: appId,
          appArgs: processedAppArgs,
          note: noteBytes
        });
        
        // Return the encoded transaction
        return ResponseProcessor.processResponse({
          txID: txn.txID(),
          encodedTxn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64'),
          txnInfo: {
            type: 'app-optin',
            account,
            appId,
            fee: params.fee,
            firstRound: params.firstRound,
            lastRound: params.lastRound
          }
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error creating application opt-in transaction: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
}
