import { makeApplicationUpdateTxnFromObject } from 'algosdk';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
/**
 * Creates an application update transaction
 * @param params The parameters for updating the application
 * @returns The created transaction
 * @throws {McpError} If the transaction creation fails
 */
export function makeApplicationUpdateTxn(params) {
    try {
        // Create a new object with the required structure
        const txnParams = {
            from: params.from,
            appIndex: params.appIndex,
            approvalProgram: params.approvalProgram,
            clearProgram: params.clearProgram,
            suggestedParams: params.suggestedParams,
            note: params.note,
            lease: params.lease,
            rekeyTo: params.rekeyTo,
            appArgs: params.appArgs,
            accounts: params.accounts,
            foreignApps: params.foreignApps,
            foreignAssets: params.foreignAssets,
            boxes: params.boxes,
            onComplete: 4
        };
        return makeApplicationUpdateTxnFromObject(txnParams);
    }
    catch (error) {
        console.error('[MCP Error] Failed to create application update transaction:', error);
        throw new McpError(ErrorCode.InternalError, `Failed to create application update transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
/**
 * Handles the application update tool request
 * @param args The tool arguments
 * @param suggestedParams The suggested transaction parameters
 * @returns The transaction parameters
 * @throws {McpError} If the parameters are invalid
 */
export function handleUpdateTxn(args, suggestedParams) {
    try {
        if (!args.from || !args.appIndex || !args.approvalProgram || !args.clearProgram) {
            console.error('[MCP Error] Invalid application update parameters');
            throw new McpError(ErrorCode.InvalidParams, 'Invalid application update parameters');
        }
        // Create transaction with proper parameter handling
        const txnParams = {
            from: String(args.from),
            appIndex: Number(args.appIndex),
            fee: suggestedParams.fee,
            firstRound: suggestedParams.firstRound,
            lastRound: suggestedParams.lastRound,
            genesisID: suggestedParams.genesisID,
            genesisHash: suggestedParams.genesisHash,
            type: 'appl',
            onComplete: 4,
            // Programs are already base64 encoded
            approvalProgram: args.approvalProgram,
            clearProgram: args.clearProgram
        };
        // Handle optional fields
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
            txnParams.accounts = args.accounts.filter((acc) => typeof acc === 'string');
        }
        if (Array.isArray(args.foreignApps)) {
            txnParams.foreignApps = args.foreignApps.filter((app) => typeof app === 'number');
        }
        if (Array.isArray(args.foreignAssets)) {
            txnParams.foreignAssets = args.foreignAssets.filter((asset) => typeof asset === 'number');
        }
        return txnParams;
    }
    catch (error) {
        if (error instanceof McpError) {
            throw error;
        }
        console.error('[MCP Error] Failed to handle application update:', error);
        throw new McpError(ErrorCode.InternalError, `Failed to handle application update: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
