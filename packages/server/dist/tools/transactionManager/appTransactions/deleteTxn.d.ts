import { Transaction } from 'algosdk';
import { AppDeleteTxnParams } from './types.js';
/**
 * Creates an application delete transaction
 * @param params The parameters for deleting the application
 * @returns The created transaction
 * @throws {McpError} If the transaction creation fails
 */
export declare function makeApplicationDeleteTxn(params: AppDeleteTxnParams): Transaction;
/**
 * Handles the application delete tool request
 * @param args The tool arguments
 * @param suggestedParams The suggested transaction parameters
 * @returns The transaction parameters
 * @throws {McpError} If the parameters are invalid
 */
export declare function handleDeleteTxn(args: Record<string, unknown>, suggestedParams: any): Record<string, any>;
