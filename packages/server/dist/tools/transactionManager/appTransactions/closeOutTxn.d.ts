import { Transaction } from 'algosdk';
import { AppCloseOutTxnParams } from './types.js';
/**
 * Creates an application close-out transaction
 * @param params The parameters for closing out from the application
 * @returns The created transaction
 * @throws {McpError} If the transaction creation fails
 */
export declare function makeApplicationCloseOutTxn(params: AppCloseOutTxnParams): Transaction;
/**
 * Handles the application close-out tool request
 * @param args The tool arguments
 * @param suggestedParams The suggested transaction parameters
 * @returns The transaction parameters
 * @throws {McpError} If the parameters are invalid
 */
export declare function handleCloseOutTxn(args: Record<string, unknown>, suggestedParams: any): Record<string, any>;
