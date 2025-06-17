/**
 * Indexer Transaction API Tools
 * Direct access to Algorand indexer transaction data
 */

import algosdk from 'algosdk';
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ResponseProcessor } from '../../../utils';
import { Env } from '../../../types';

/**
 * Create and validate an Indexer client
 */
function createIndexerClient(indexerUrl: string | undefined): algosdk.Indexer | null {
  if (!indexerUrl) {
    console.error('Algorand indexer URL not configured');
    return null;
  }
  
  return new algosdk.Indexer('', indexerUrl, '');
}

/**
 * Register indexer transaction API tools to the MCP server
 */
export function registerIndexerTransactionTools(server: McpServer,env: Env): void {
  // Lookup transaction by ID
  server.tool(
    'api_indexer_lookup_transaction_by_id',
    'Get transaction details from indexer',
    { 
      txid: z.string().describe('Transaction ID')
    },
    async ({ txid }) => {
      
      if (!env.ALGORAND_INDEXER) {
        return {
          content: [{
            type: 'text',
            text: 'Algorand indexer URL not configured'
          }]
        };
      }
      
      try {
        // Create indexer client
        const indexerClient = createIndexerClient(env.ALGORAND_INDEXER);
        if (!indexerClient) {
          throw new Error('Failed to create Algorand indexer client');
        }
        
        // Lookup transaction by ID
        const response = await indexerClient.lookupTransactionByID(String(txid)).do();
        
        return ResponseProcessor.processResponse(response);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error looking up transaction: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Lookup account transactions
  server.tool(
    'api_indexer_lookup_account_transactions',
    'Get transactions related to an account',
    { 
      address: z.string().describe('Account address'),
      limit: z.number().int().optional().describe('Maximum number of transactions to return'),
      txType: z.string().optional().describe('Filter by transaction type'),
      sigType: z.string().optional().describe('Filter by signature type'),
      assetId: z.number().int().optional().describe('Filter by asset ID'),
      beforeTime: z.string().optional().describe('Return transactions before this time (RFC 3339 format)'),
      afterTime: z.string().optional().describe('Return transactions after this time (RFC 3339 format)'),
      currencyGreaterThan: z.number().int().optional().describe('Return transactions with amount greater than this value'),
      currencyLessThan: z.number().int().optional().describe('Return transactions with amount less than this value'),
      round: z.number().int().optional().describe('Return transactions for a specific round'),
      minRound: z.number().int().optional().describe('Return transactions after this round'),
      maxRound: z.number().int().optional().describe('Return transactions before this round'),
      nextToken: z.string().optional().describe('Token for retrieving the next page of results')
    },
    async ({ address, limit, txType, sigType, assetId, beforeTime, afterTime,
             currencyGreaterThan, currencyLessThan, round, minRound, maxRound, nextToken }) => {
      
      if (!env.ALGORAND_INDEXER) {
        return {
          content: [{
            type: 'text',
            text: 'Algorand indexer URL not configured'
          }]
        };
      }
      
      try {
        // Create indexer client
        const indexerClient = createIndexerClient(env.ALGORAND_INDEXER);
        if (!indexerClient) {
          throw new Error('Failed to create Algorand indexer client');
        }
        
        // Setup lookup with parameters
        let search = indexerClient.lookupAccountTransactions(String(address));
        
        if (limit) {
          search = search.limit(Number(limit));
        }
        if (txType) {
          search = search.txType(String(txType));
        }
        if (sigType) {
          search = search.sigType(String(sigType));
        }
        if (assetId) {
          search = search.assetID(Number(assetId));
        }
        if (beforeTime) {
          search = search.beforeTime(String(beforeTime));
        }
        if (afterTime) {
          search = search.afterTime(String(afterTime));
        }
        if (currencyGreaterThan) {
          search = search.currencyGreaterThan(Number(currencyGreaterThan));
        }
        if (currencyLessThan) {
          search = search.currencyLessThan(Number(currencyLessThan));
        }
        if (round) {
          search = search.round(Number(round));
        }
        if (minRound) {
          search = search.minRound(Number(minRound));
        }
        if (maxRound) {
          search = search.maxRound(Number(maxRound));
        }
        if (nextToken) {
          search = search.nextToken(String(nextToken));
        }
        
        // Execute lookup
        const response = await search.do();
        
        return ResponseProcessor.processResponse(response);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error looking up account transactions: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Search for transactions
  server.tool(
    'api_indexer_search_for_transactions',
    'Search for transactions with various criteria',
    {
      limit: z.number().int().optional().describe('Maximum number of transactions to return'),
      notePrefix: z.string().optional().describe('Filter by note prefix (base64-encoded)'),
      txType: z.string().optional().describe('Filter by transaction type'),
      sigType: z.string().optional().describe('Filter by signature type'),
      address: z.string().optional().describe('Filter by address'),
      addressRole: z.enum(['sender', 'receiver', 'freeze-target']).optional().describe('Role of the address'),
      assetId: z.number().int().optional().describe('Filter by asset ID'),
      beforeTime: z.string().optional().describe('Return transactions before this time (RFC 3339 format)'),
      afterTime: z.string().optional().describe('Return transactions after this time (RFC 3339 format)'),
      currencyGreaterThan: z.number().int().optional().describe('Return transactions with amount greater than this value'),
      currencyLessThan: z.number().int().optional().describe('Return transactions with amount less than this value'),
      round: z.number().int().optional().describe('Return transactions for a specific round'),
      minRound: z.number().int().optional().describe('Return transactions after this round'),
      maxRound: z.number().int().optional().describe('Return transactions before this round'),
      applicationId: z.number().int().optional().describe('Filter by application ID'),
      rekeyTo: z.boolean().optional().describe('Filter for transactions that rekey accounts'),
      nextToken: z.string().optional().describe('Token for retrieving the next page of results')
    },
    async ({ limit, notePrefix, txType, sigType, address, addressRole, assetId, beforeTime, afterTime, 
             currencyGreaterThan, currencyLessThan, round, minRound, maxRound, 
             applicationId, rekeyTo, nextToken }) => {
      
      if (!env.ALGORAND_INDEXER) {
        return {
          content: [{
            type: 'text',
            text: 'Algorand indexer URL not configured'
          }]
        };
      }
      
      try {
        // Create indexer client
        const indexerClient = createIndexerClient(env.ALGORAND_INDEXER);
        if (!indexerClient) {
          throw new Error('Failed to create Algorand indexer client');
        }
        
        // Setup search with parameters
        let search = indexerClient.searchForTransactions();
        
        if (limit) {
          search = search.limit(Number(limit));
        }
        if (notePrefix) {
          search = search.notePrefix(Buffer.from(notePrefix, 'base64'));
        }
        if (txType) {
          search = search.txType(String(txType));
        }
        if (sigType) {
          search = search.sigType(String(sigType));
        }
        if (address) {
          search = search.address(String(address));
        }
        if (address && addressRole) {
          search = search.addressRole(String(addressRole));
        }
        if (assetId) {
          search = search.assetID(Number(assetId));
        }
        if (beforeTime) {
          search = search.beforeTime(String(beforeTime));
        }
        if (afterTime) {
          search = search.afterTime(String(afterTime));
        }
        if (currencyGreaterThan) {
          search = search.currencyGreaterThan(Number(currencyGreaterThan));
        }
        if (currencyLessThan) {
          search = search.currencyLessThan(Number(currencyLessThan));
        }
        if (round) {
          search = search.round(Number(round));
        }
        if (minRound) {
          search = search.minRound(Number(minRound));
        }
        if (maxRound) {
          search = search.maxRound(Number(maxRound));
        }
        if (applicationId) {
          search = search.applicationID(Number(applicationId));
        }
        if (rekeyTo === true) {
          search = search.rekeyTo(true);
        }
        if (nextToken) {
          search = search.nextToken(String(nextToken));
        }
        
        // Execute search
        const response = await search.do();
        
        return ResponseProcessor.processResponse(response);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error searching transactions: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
}
