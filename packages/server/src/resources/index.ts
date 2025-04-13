import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { walletResources } from './wallet/index.js';
import { knowledgeResources } from './knowledge/index.js';

import { env } from '../env.js';

// Define wallet resources that will be included if active wallet is configured
const walletResourceDefinitions = [
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
    },
    handler: walletResources
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
    },
    handler: walletResources
  }
];

export class ResourceManager {
  static resources = [
    // Only include wallet resources if active wallet is configured
    ...(env.algorand_agent_wallet_active ? walletResourceDefinitions : []),
    // Knowledge resources
    {
      uri: 'algorand://knowledge/taxonomy',
      name: 'Algorand Knowledge Taxonomy',
      description: 'Markdown-based knowledge taxonomy',
      schema: {
        type: 'object',
        properties: {
          categories: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                content: { type: 'string' }
              }
            }
          }
        }
      },
      handler: knowledgeResources
    },
    {
      uri: 'algorand://knowledge/document/*',
      name: 'Algorand Knowledge Document',
      description: 'Individual document from the knowledge taxonomy',
      schema: {
        type: 'object',
        properties: {
          content: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' }
        }
      },
      handler: knowledgeResources
    }
  ];

  static schemas: Record<string, any> = ResourceManager.resources.reduce((acc, resource) => ({
    ...acc,
    [resource.uri]: resource.schema
  }), {} as Record<string, any>);

  static async handleResource(uri: string) {
    const resource = ResourceManager.resources.find(r => {
      // Exact match
      if (r.uri === uri) return true;
      // Wildcard match (e.g. algorand://knowledge/document/*)
      if (r.uri.endsWith('*')) {
        const prefix = r.uri.slice(0, -1);
        return uri.startsWith(prefix);
      }
      return false;
    });

    if (!resource) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Resource not found: ${uri}`
      );
    }

    try {
      return await resource.handler(uri);
    } catch (error: unknown) {
      if (error instanceof McpError) {
        throw error;
      }
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to handle resource: ${message}`
      );
    }
  }
}
