#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ReadResourceRequestSchema,
  ServerResult,
} from '@modelcontextprotocol/sdk/types.js';
import { 
  AccountManager,
  UtilityManager,
  TransactionManager,
  AlgodManager,
  transactionTools
} from './tools/index.js';
import { ResourceManager } from './resources/index.js';

class AlgorandMcpServer {
  protected server: Server;
  private name: string;

  constructor(name: string = 'algorand-mcp-server', version: string = '1.0.0') {
    this.name = name;
    this.server = new Server(
      {
        name,
        version,
      },
      {
        capabilities: {
          resources: {
            schemas: ResourceManager.schemas,
            templates: ResourceManager.resources.map(resource => ({
              uriTemplate: resource.uri,
              name: resource.name,
              description: resource.description,
              mimeType: 'application/json',
              schema: ResourceManager.schemas[resource.uri]
            }))
          },
          tools: {},
        },
      }
    );

    this.setupResourceHandlers();
    this.setupToolHandlers();
    
    // Error handling
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  protected setupResourceHandlers() {
    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: ResourceManager.resources
    }));

    // List resource templates
    this.server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => ({
      resourceTemplates: ResourceManager.resources.map(resource => ({
        uriTemplate: resource.uri,
        name: resource.name,
        description: resource.description,
        mimeType: 'application/json',
        schema: ResourceManager.schemas[resource.uri]
      }))
    }));

    // Handle resource reads
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      return await ResourceManager.handleResource(request.params.uri);
    });
  }

  protected setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        // Account Management Tools
        ...AccountManager.accountTools,
        // Utility Tools
        ...UtilityManager.utilityTools,
        // Algod Tools
        ...AlgodManager.algodTools,
        // Transaction Tools
        ...transactionTools,
      ],
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args = {} as Record<string, unknown> } = request.params;

      // Handle account tools
      if (name.startsWith('create_account') || 
          name.startsWith('rekey_account') || 
          name.startsWith('mnemonic_') || 
          name.startsWith('mdk_') || 
          name.startsWith('seed_') || 
          name.startsWith('secret_key_')) {
        return AccountManager.handleTool(name, args);
      }

      // Handle utility tools
      if (name.startsWith('validate_') ||
          name.startsWith('encode_') ||
          name.startsWith('decode_') ||
          name.startsWith('get_application_address') ||
          name.startsWith('bytes_to_') ||
          name.startsWith('bigint_to_')) {
        return UtilityManager.handleTool(name, args);
      }

      // Handle algod tools
      if (name.startsWith('compile_') ||
          name.startsWith('disassemble_') ||
          name.startsWith('send_raw_') ||
          name.startsWith('simulate_')) {
        return AlgodManager.handleTool(name, args);
      }

      // Handle transaction tools
      if (name.startsWith('make_') || 
          name === 'assign_group_id' ||
          name === 'sign_transaction' ||
          name === 'sign_bytes' ||
          name === 'encode_obj' ||
          name === 'decode_obj') {
        return TransactionManager.handleTool(name, args);
      }

      throw new McpError(
        ErrorCode.MethodNotFound,
        `Unknown tool: ${name}`
      );
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error(`${this.name} running on stdio`);
  }
}

const server = new AlgorandMcpServer();
server.run().catch(console.error);
