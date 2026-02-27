import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { getAlgodClient } from '../../algorand-client.js';
import { WalletManager } from '../../tools/walletManager.js';

// Resource definitions
const resourceDefinitions = [
  {
    uri: 'algorand://wallet/addresses',
    name: 'Wallet Addresses',
    description: 'All wallet account addresses with nicknames',
    schema: {
      type: 'object',
      properties: {
        accounts: { type: 'array', items: { type: 'object' } }
      }
    }
  },
  {
    uri: 'algorand://wallet/accounts',
    name: 'Wallet Accounts',
    description: 'Account balances and asset holdings for all wallet accounts',
    schema: {
      type: 'object',
      properties: {
        accounts: { type: 'array', items: { type: 'object' } }
      }
    }
  }
];

export const walletResources = {
  canHandle: (uri: string): boolean => {
    return uri.startsWith('algorand://wallet/');
  },

  handle: async (uri: string) => {
    const hasAccounts = await WalletManager.hasAccounts();
    if (!hasAccounts) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        'No wallet accounts. Use wallet_add_account to create or import one.'
      );
    }

    switch (uri) {
      case 'algorand://wallet/addresses': {
        const accounts = await WalletManager.getAccounts();
        return {
          contents: [{
            uri,
            mimeType: 'application/json',
            text: JSON.stringify({
              accounts: accounts.map((a, i) => ({
                index: i,
                nickname: a.nickname,
                address: a.address,
                publicKey: a.public_key,
              })),
            }, null, 2)
          }]
        };
      }

      case 'algorand://wallet/accounts': {
        const accounts = await WalletManager.getAccounts();
        const algodClient = getAlgodClient('mainnet');
        const results = await Promise.all(
          accounts.map(async (a, i) => {
            try {
              const info = await algodClient.accountInformation(a.address).do();
              return {
                index: i,
                nickname: a.nickname,
                address: a.address,
                balance: info.amount ?? 0,
                assets: info.assets || [],
              };
            } catch {
              return {
                index: i,
                nickname: a.nickname,
                address: a.address,
                balance: 0,
                assets: [],
                error: 'Could not fetch on-chain info',
              };
            }
          })
        );
        return {
          contents: [{
            uri,
            mimeType: 'application/json',
            text: JSON.stringify({ accounts: results }, null, 2)
          }]
        };
      }

      default:
        throw new McpError(ErrorCode.InvalidRequest, `Unknown wallet resource: ${uri}`);
    }
  },

  getResourceDefinitions: () => {
    return resourceDefinitions;
  }
};
