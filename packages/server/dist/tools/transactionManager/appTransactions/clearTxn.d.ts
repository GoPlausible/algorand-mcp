import { Transaction } from 'algosdk';
import { AppClearStateTxnParams } from './types.js';
/**
 * Creates an application clear state transaction
 * @param params The parameters for clearing application state
 * @returns The created transaction
 * @throws {McpError} If the transaction creation fails
 */
export declare function makeApplicationClearStateTxn(params: AppClearStateTxnParams): Transaction;
/**
 * Handles the application clear state tool request
 * @param args The tool arguments
 * @param suggestedParams The suggested transaction parameters
 * @returns The transaction parameters
 * @throws {McpError} If the parameters are invalid
 */
export declare function handleClearTxn(args: Record<string, unknown>, suggestedParams: any): Record<string, any>;
