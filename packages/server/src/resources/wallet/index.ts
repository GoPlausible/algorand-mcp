import { env } from '../../env.js';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';

// Resource definitions
const resourceDefinitions = [
  {
    uri: 'algorand://wallet/accounts',
    name: 'Algorand Accounts',
    description: 'List of Algorand accounts and their balances',
    schema: {
      type: 'object',
      properties: {
        accounts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              address: { type: 'string' },
              amount: { type: 'number' },
              assets: { type: 'array' }
            }
          }
        }
      }
    }
  },
  {
    uri: 'algorand://wallet/assets',
    name: 'Account Assets',
    description: 'Asset holdings for Algorand accounts',
    schema: {
      type: 'object',
      properties: {
        assets: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              amount: { type: 'number' },
              frozen: { type: 'boolean' }
            }
          }
        }
      }
    }
  }
];

// Resource module implementation
export const walletResources = {
  canHandle: (uri: string): boolean => {
    return uri.startsWith('algorand://wallet/');
  },

  handle: async (uri: string) => {
    if (!env.algorand_agent_wallet_active) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        'Wallet resources are not available - no active wallet configured'
      );
    }

    switch (uri) {
      case 'algorand://wallet/accounts':
        return {
          contents: [{
            uri,
            mimeType: 'application/json',
            text: JSON.stringify({
              accounts: [
                // Mock data - replace with actual wallet implementation
                {
                  address: "example-address",
                  amount: 1000000,
                  assets: []
                }
              ]
            }, null, 2)
          }]
        };

      case 'algorand://wallet/assets':
        return {
          contents: [{
            uri,
            mimeType: 'application/json',
            text: JSON.stringify({
              assets: [
                // Mock data - replace with actual wallet implementation
                {
                  id: 1,
                  amount: 100,
                  frozen: false
                }
              ]
            }, null, 2)
          }]
        };

      default:
        throw new McpError(
          ErrorCode.InvalidRequest,
          `Unknown wallet resource: ${uri}`
        );
    }
  },

  getResourceDefinitions: () => {
    if (!env.algorand_agent_wallet_active) {
      return [];
    }
    return resourceDefinitions;
  }
};
