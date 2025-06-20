/**
 * Wallet Resources for Algorand Remote MCP
 * Provides URI-based access to wallet and account information
 */

import algosdk from 'algosdk';
import { Env, Props } from '../../types';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

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
 * Register wallet resources to the MCP server
 */
export async function registerWalletResources(server: McpServer, env: Env, props: Props): Promise<void> {

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
  // === Wallet Secret Key ===
  server.resource("Wallet Account Secret Key", "algorand://wallet/secretkey", async (uri) => {
    if (!ALGORAND_AGENT_WALLET) {
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify({
            error: "No active wallet mnemonic configured"
          }, null, 2)
        }]
      };
    }

    try {
      const account = getAccountFromMnemonic(ALGORAND_AGENT_WALLET);
      if (!account) {
        throw new Error('Failed to load account from mnemonic');
      }

      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify({
            secretKey: Buffer.from(account.sk).toString('hex')
          }, null, 2)
        }]
      };
    } catch (error: any) {
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify({
            error: `Failed to get secret key: ${error.message || 'Unknown error'}`
          }, null, 2)
        }]
      };
    }
  });

  // === Wallet Public Key ===
  server.resource("Wallet Account Public Key", "algorand://wallet/publickey", async (uri) => {
    if (!ALGORAND_AGENT_WALLET) {
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify({
            error: "No active wallet mnemonic configured"
          }, null, 2)
        }]
      };
    }

    try {
      const account = getAccountFromMnemonic(ALGORAND_AGENT_WALLET);
      if (!account) {
        throw new Error('Failed to load account from mnemonic');
      }

      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify({
            publicKey: Buffer.from(account.sk.slice(32)).toString('hex')
          }, null, 2)
        }]
      };
    } catch (error: any) {
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify({
            error: `Failed to get public key: ${error.message || 'Unknown error'}`
          }, null, 2)
        }]
      };
    }
  });

  // === Wallet Mnemonic ===
  server.resource("Wallet Account Mnemonic", "algorand://wallet/mnemonic", async (uri) => {
    if (!ALGORAND_AGENT_WALLET) {
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify({
            error: "No active wallet mnemonic configured"
          }, null, 2)
        }]
      };
    }

    try {
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify({
            mnemonic: ALGORAND_AGENT_WALLET
          }, null, 2)
        }]
      };
    } catch (error: any) {
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify({
            error: `Failed to get mnemonic: ${error.message || 'Unknown error'}`
          }, null, 2)
        }]
      };
    }
  });

  // === Wallet Address ===
  server.resource("Wallet Account Address", "algorand://wallet/address", async (uri) => {
    if (!ALGORAND_AGENT_WALLET) {
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify({
            error: "No active wallet mnemonic configured"
          }, null, 2)
        }]
      };
    }

    try {
      const account = getAccountFromMnemonic(ALGORAND_AGENT_WALLET);
      if (!account) {
        throw new Error('Failed to load account from mnemonic');
      }

      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify({
            address: account.addr
          }, null, 2)
        }]
      };
    } catch (error: any) {
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify({
            error: `Failed to get address: ${error.message || 'Unknown error'}`
          }, null, 2)
        }]
      };
    }
  });

  // === Wallet Account ===
  server.resource("Wallet Account Information", "algorand://wallet/account", async (uri) => {
    if (!ALGORAND_AGENT_WALLET) {
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify({
            error: "No active wallet mnemonic configured"
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

      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify({
            accounts: [{
              address: account.addr,
              amount: accountInfo.amount,
              assets: accountInfo.assets || []
            }]
          }, null, 2)
        }]
      };
    } catch (error: any) {
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify({
            error: `Failed to get account info: ${error.message || 'Unknown error'}`
          }, null, 2)
        }]
      };
    }
  });

  // === Wallet Assets ===
  server.resource("Wallet Account Assets", "algorand://wallet/assets", async (uri) => {
    if (!ALGORAND_AGENT_WALLET) {
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify({
            error: "No active wallet mnemonic configured"
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

      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify({
            assets: accountInfo.assets || []
          }, null, 2)
        }]
      };
    } catch (error: any) {
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify({
            error: `Failed to get asset info: ${error.message || 'Unknown error'}`
          }, null, 2)
        }]
      };
    }
  });
}
