/**
 * Wallet Manager for Algorand Remote MCP
 * Provides tool-based access to wallet and account information
 */

import algosdk from 'algosdk';
import { z } from 'zod';
import { ResponseProcessor } from '../utils';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env, Props } from '../types';

/**
 * Create and validate an Algorand client
 */
function createAlgoClient(algodUrl: string, token: string): algosdk.Algodv2 | null {
  if (!algodUrl) {
    console.error('Algorand node URL not configured');
    return null;
  }

  return new algosdk.Algodv2(token, algodUrl, '');
}

/**
 * Get account from mnemonic
 */
function getAccountFromMnemonic(mnemonic: string | undefined): algosdk.Account | null {
  if (!mnemonic) {
    console.error('No active wallet mnemonic configured');
    return null;
  }

  try {
    return algosdk.mnemonicToSecretKey(mnemonic);
  } catch (error) {
    console.error('Invalid mnemonic:', error);
    return null;
  }
}

/**
 * Register wallet management tools to the MCP server
 */
export async function registerWalletTools(server: McpServer, env: Env, props: Props): Promise<void> {
  const ALGORAND_AGENT_WALLET = await env?.OAUTH_KV_ACCOUNTS?.get(props.email);
  if (!ALGORAND_AGENT_WALLET) {
    try {
      console.log('Generating new account for Oauth user by email:', props.email);
      const account = algosdk.generateAccount();
      if (!account) {
        throw new Error('Failed to generate account for Oauth user by email');
      }
      await env?.OAUTH_KV_ACCOUNTS?.put(props.email, algosdk.secretKeyToMnemonic(account.sk));
    } catch (error: any) {
      throw new Error(`Failed to generate account for Oauth user by email: ${error.message || 'Unknown error'}`);
    }
  }
  //Reset wallet account
  server.tool(
    'reset-wallet_account',
    'Reset the wallet account for the configured user',
    {},
    async () => {
      if (!ALGORAND_AGENT_WALLET) {
        return {
          content: [{
            type: 'text',
            text: 'No active wallet mnemonic configured'
          }]
        };
      }

      try {
        console.log('Generating new account for Oauth user by email:', props.email);
        const account = algosdk.generateAccount();
        if (!account) {
          throw new Error('Failed to generate account for Oauth user by email');
        }
        await env?.OAUTH_KV_ACCOUNTS?.put(props.email, algosdk.secretKeyToMnemonic(account.sk));

        return ResponseProcessor.processResponse({
          address: account.addr,
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Failed to reset wallet account: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  // Get wallet secret key
  server.tool(
    'get_wallet_secretkey',
    'Get the secret key for the configured wallet',
    {},
    async () => {
      if (!ALGORAND_AGENT_WALLET) {
        return {
          content: [{
            type: 'text',
            text: 'No active wallet mnemonic configured'
          }]
        };
      }

      try {
        const account = getAccountFromMnemonic(ALGORAND_AGENT_WALLET);
        if (!account) {
          throw new Error('Failed to load account from mnemonic');
        }

        return ResponseProcessor.processResponse({
          secretKey: Buffer.from(account.sk).toString('hex')
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Failed to get secret key: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );

  // Get wallet public key
  server.tool(
    'get_wallet_publickey',
    'Get the public key for the configured wallet',
    {},
    async () => {
      if (!ALGORAND_AGENT_WALLET) {
        return {
          content: [{
            type: 'text',
            text: 'No active wallet mnemonic configured'
          }]
        };
      }



      try {
        const account = getAccountFromMnemonic(ALGORAND_AGENT_WALLET);
        if (!account) {
          throw new Error('Failed to load account from mnemonic');
        }

        return ResponseProcessor.processResponse({
          publicKey: Buffer.from(account.sk.slice(32)).toString('hex')
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Failed to get public key: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );

  // Get wallet mnemonic
  server.tool(
    'get_wallet_mnemonic',
    'Get the mnemonic for the configured wallet',
    {},
    async () => {


      if (!ALGORAND_AGENT_WALLET) {
        return {
          content: [{
            type: 'text',
            text: 'No active wallet mnemonic configured'
          }]
        };
      }
      try {
        return ResponseProcessor.processResponse({
          mnemonic: ALGORAND_AGENT_WALLET
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Failed to get mnemonic: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );

  // Get wallet address
  server.tool(
    'get_wallet_address',
    'Get the address for the configured wallet',
    {},
    async () => {

      if (!ALGORAND_AGENT_WALLET) {
        return {
          content: [{
            type: 'text',
            text: 'No active wallet mnemonic configured'
          }]
        };
      }

      try {
        const account = getAccountFromMnemonic(ALGORAND_AGENT_WALLET);
        if (!account) {
          throw new Error('Failed to load account from mnemonic');
        }

        return ResponseProcessor.processResponse({
          address: account.addr
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Failed to get address: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );

  // Get wallet account information
  server.tool(
    'get_wallet_account',
    'Get the account information for the configured wallet',
    {},
    async () => {

      if (!ALGORAND_AGENT_WALLET) {
        return {
          content: [{
            type: 'text',
            text: 'No active wallet mnemonic configured'
          }]
        };
      }


      if (!env.ALGORAND_ALGOD) {
        return {
          content: [{
            type: 'text',
            text: 'Algorand node URL not configured'
          }]
        };
      }

      try {
        const account = getAccountFromMnemonic(ALGORAND_AGENT_WALLET);
        if (!account) {
          throw new Error('Failed to load account from mnemonic');
        }

        // Create algod client
        const algodClient = createAlgoClient(env.ALGORAND_ALGOD, env.ALGORAND_TOKEN || '');
        if (!algodClient) {
          throw new Error('Failed to create Algorand client');
        }

        // Get account information
        const accountInfo = await algodClient.accountInformation(account.addr).do();

        return ResponseProcessor.processResponse({
          accounts: [{
            address: account.addr,
            amount: accountInfo.amount,
            assets: accountInfo.assets || []
          }]
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Failed to get account info: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );

  // Get wallet assets
  server.tool(
    'get_wallet_assets',
    'Get the assets for the configured wallet',
    {},
    async () => {
      if (!ALGORAND_AGENT_WALLET) {
        return {
          content: [{
            type: 'text',
            text: 'No active wallet mnemonic configured'
          }]
        };
      }

      if (!env.ALGORAND_ALGOD) {
        return {
          content: [{
            type: 'text',
            text: 'Algorand node URL not configured'
          }]
        };
      }

      try {
        const account = getAccountFromMnemonic(ALGORAND_AGENT_WALLET);
        if (!account) {
          throw new Error('Failed to load account from mnemonic');
        }

        // Create algod client
        const algodClient = createAlgoClient(env.ALGORAND_ALGOD, env.ALGORAND_TOKEN || '');
        if (!algodClient) {
          throw new Error('Failed to create Algorand client');
        }

        // Get account information
        const accountInfo = await algodClient.accountInformation(account.addr).do();

        return ResponseProcessor.processResponse({
          assets: accountInfo.assets || []
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Failed to get asset info: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
}
