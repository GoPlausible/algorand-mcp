/**
 * Wallet Resources for Algorand Remote MCP
 * Provides URI-based access to wallet and account information
 */

import algosdk from 'algosdk';
import { Env } from '../../types';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * Create and validate an Algorand client
 */
function createAlgoClient(algodUrl: string | undefined): algosdk.Algodv2 | null {
  if (!algodUrl) {
    console.error('Algorand node URL not configured');
    return null;
  }
  
  return new algosdk.Algodv2('', algodUrl, '');
}

/**
 * Register wallet resources to the MCP server
 */
export function registerWalletResources(server: McpServer, env: Env): void {
  // Wallet index resource
  server.resource("wallets", "algorand://wallets", (uri) => {
    return {
      contents: [{
        uri: uri.href,
        text: JSON.stringify({
          description: "Algorand wallet resources",
          resources: [
            {
              name: "account",
              description: "Get information about a specific account",
              uri: "algorand://wallets/account/{address}"
            }
          ]
        }, null, 2)
      }]
    };
  });
  
  // Specific account resource
  server.resource("account", "algorand://wallets/account/{address}", async (uri, params: any) => {
    const address = params.address;
    
    if (!address || typeof address !== 'string') {
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify({
            error: "Invalid address parameter"
          }, null, 2)
        }]
      };
    }
    
    if (!env.ALGORAND_ALGOD) {
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify({
            error: "Algorand node URL not configured"
          }, null, 2)
        }]
      };
    }
    
    try {
      // Create algod client
      const algodClient = createAlgoClient(env.ALGORAND_ALGOD);
      if (!algodClient) {
        throw new Error('Failed to create Algorand client');
      }
      
      // Get account information
      const accountInfo = await algodClient.accountInformation(address).do();
      
      // Format response with both microAlgos and Algos
      const formattedInfo = {
        address,
        balance: {
          microAlgos: accountInfo.amount,
          algos: accountInfo.amount / 1000000
        },
        status: accountInfo.status,
        minBalance: accountInfo['min-balance'],
        totalApps: accountInfo['total-apps-opted-in'] || 0,
        totalAssets: accountInfo['total-assets-opted-in'] || 0,
        pendingRewards: accountInfo['pending-rewards'],
        rewardsBase: accountInfo['rewards-base'],
        createdAtRound: accountInfo['created-at-round'],
        lastUsedOn: new Date().toISOString()
      };
      
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(formattedInfo, null, 2)
        }]
      };
    } catch (error: any) {
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify({
            error: `Error fetching account info: ${error.message || 'Unknown error'}`,
            address
          }, null, 2)
        }]
      };
    }
  });
}
