import algosdk, { Transaction, makeApplicationDeleteTxnFromObject, OnApplicationComplete } from 'algosdk';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { AppDeleteTxnParams } from './types.js';

/**
 * Creates an application delete transaction
 * @param params The parameters for deleting the application
 * @returns The created transaction
 * @throws {McpError} If the transaction creation fails
 */
export function makeApplicationDeleteTxn(params: AppDeleteTxnParams): Transaction {
  try {
    // Create a new object with the required structure
    const txnParams = {
      sender: params.sender,
      appIndex: params.appIndex,
      suggestedParams: params.suggestedParams,
      note: params.note,
      lease: params.lease,
      rekeyTo: params.rekeyTo,
      appArgs: params.appArgs,
      accounts: params.accounts,
      foreignApps: params.foreignApps,
      foreignAssets: params.foreignAssets,
      boxes: params.boxes
    };

    return makeApplicationDeleteTxnFromObject(txnParams);
  } catch (error) {
    console.error('[MCP Error] Failed to create application delete transaction:', error);
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to create application delete transaction: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Handles the application delete tool request
 * @param args The tool arguments
 * @param suggestedParams The suggested transaction parameters
 * @returns The transaction parameters
 * @throws {McpError} If the parameters are invalid
 */
export function handleDeleteTxn(args: Record<string, unknown>, suggestedParams: any): Record<string, any> {
  try {
    if (!args.from || !args.appIndex) {
      console.error('[MCP Error] Invalid application delete parameters');
      throw new McpError(ErrorCode.InvalidParams, 'Invalid application delete parameters');
    }

    // Create transaction with proper parameter handling
    const txnParams: Record<string, any> = {
      sender: String(args.from),
      appIndex: Number(args.appIndex),
      fee: suggestedParams.fee,
      firstValid: suggestedParams.firstValid,
      lastValid: suggestedParams.lastValid,
      genesisID: suggestedParams.genesisID,
      genesisHash: suggestedParams.genesisHash instanceof Uint8Array
        ? algosdk.bytesToBase64(suggestedParams.genesisHash)
        : suggestedParams.genesisHash,
      type: 'appl',
      onComplete: OnApplicationComplete.DeleteApplicationOC
    };

    // Handle optional fields
    if (typeof args.note === 'string') {
      const noteBytes = new TextEncoder().encode(args.note);
      txnParams.note = algosdk.bytesToBase64(noteBytes);
    }
    if (typeof args.lease === 'string') {
      const leaseBytes = new TextEncoder().encode(args.lease);
      txnParams.lease = algosdk.bytesToBase64(leaseBytes);
    }
    if (typeof args.rekeyTo === 'string') {
      txnParams.rekeyTo = String(args.rekeyTo);
    }
    if (Array.isArray(args.appArgs)) {
      txnParams.appArgs = args.appArgs.map(arg => {
        const bytes = new TextEncoder().encode(String(arg));
        return algosdk.bytesToBase64(bytes);
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

    return txnParams;
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    console.error('[MCP Error] Failed to handle application delete:', error);
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to handle application delete: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
