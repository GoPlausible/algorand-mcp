import { Transaction } from 'algosdk';
import { AppOptInTxnParams } from './types.js';
/**
 * Creates an application opt-in transaction
 * @param params The parameters for opting into the application
 * @returns The created transaction
 * @throws {McpError} If the transaction creation fails
 */
export declare function makeApplicationOptInTxn(params: AppOptInTxnParams): Transaction;
/**
 * Handles the application opt-in tool request
 * @param args The tool arguments
 * @param suggestedParams The suggested transaction parameters
 * @returns The transaction parameters
 * @throws {McpError} If the parameters are invalid
 */
export declare function handleOptInTxn(args: Record<string, unknown>, suggestedParams: any): Record<string, any>;
