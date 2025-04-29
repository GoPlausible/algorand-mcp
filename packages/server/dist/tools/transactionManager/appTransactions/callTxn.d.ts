import { Transaction } from 'algosdk';
import { AppCallTxnParams } from './types.js';
/**
 * Creates an application call (NoOp) transaction
 * @param params The parameters for calling the application
 * @returns The created transaction
 * @throws {McpError} If the transaction creation fails
 */
export declare function makeApplicationCallTxn(params: AppCallTxnParams): Transaction;
/**
 * Handles the application call tool request
 * @param args The tool arguments
 * @param suggestedParams The suggested transaction parameters
 * @returns The transaction parameters
 * @throws {McpError} If the parameters are invalid
 */
export declare function handleCallTxn(args: Record<string, unknown>, suggestedParams: any): Record<string, any>;
