import { Transaction } from 'algosdk';
import { AppUpdateTxnParams } from './types.js';
/**
 * Creates an application update transaction
 * @param params The parameters for updating the application
 * @returns The created transaction
 * @throws {McpError} If the transaction creation fails
 */
export declare function makeApplicationUpdateTxn(params: AppUpdateTxnParams): Transaction;
/**
 * Handles the application update tool request
 * @param args The tool arguments
 * @param suggestedParams The suggested transaction parameters
 * @returns The transaction parameters
 * @throws {McpError} If the parameters are invalid
 */
export declare function handleUpdateTxn(args: Record<string, unknown>, suggestedParams: any): Record<string, any>;
