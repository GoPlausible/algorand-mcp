import { Transaction } from 'algosdk';
import { AppCreateTxnParams } from './types.js';
/**
 * Creates an application creation transaction
 * @param params The parameters for creating the application
 * @returns The created transaction
 * @throws {McpError} If the transaction creation fails
 */
export declare function makeApplicationCreateTxn(params: AppCreateTxnParams): Transaction;
/**
 * Handles the application creation tool request
 * @param args The tool arguments
 * @param suggestedParams The suggested transaction parameters
 * @returns The transaction parameters
 * @throws {McpError} If the parameters are invalid
 */
export declare function handleCreateTxn(args: Record<string, unknown>, suggestedParams: any): Record<string, any>;
