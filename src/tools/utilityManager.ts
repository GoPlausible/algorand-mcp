import algosdk from 'algosdk';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';

// Tool schemas
export const utilityToolSchemas = {
  ping: {
    type: 'object',
    properties: {},
    required: []
  },
  validateAddress: {
    type: 'object',
    properties: {
      address: { type: 'string', description: 'Address in standard Algorand format (58 characters)' }
    },
    required: ['address']
  },
  encodeAddress: {
    type: 'object',
    properties: {
      publicKey: { type: 'string', description: 'Public key in hexadecimal format to encode into an address' }
    },
    required: ['publicKey']
  },
  decodeAddress: {
    type: 'object',
    properties: {
      address: { type: 'string', description: 'Address in standard Algorand format (58 characters) to decode' }
    },
    required: ['address']
  },
  getApplicationAddress: {
    type: 'object',
    properties: {
      appId: { type: 'integer', description: 'Application ID to get the address for' }
    },
    required: ['appId']
  },
  bytesToBigint: {
    type: 'object',
    properties: {
      bytes: { type: 'string', description: 'Bytes in hexadecimal format to convert to a BigInt' }
    },
    required: ['bytes']
  },
  bigintToBytes: {
    type: 'object',
    properties: {
      value: { type: 'string', description: 'BigInt value as a string to convert to bytes' },
      size: { type: 'integer', description: 'Size of the resulting byte array' }
    },
    required: ['value', 'size']
  },
  encodeUint64: {
    type: 'object',
    properties: {
      value: { type: 'string', description: 'Uint64 value as a string to encode into bytes' }
    },
    required: ['value']
  },
  decodeUint64: {
    type: 'object',
    properties: {
      bytes: { type: 'string', description: 'Bytes in hexadecimal format to decode into a uint64' }
    },
    required: ['bytes']
  },
  verifyBytes: {
    type: 'object',
    properties: {
      bytes: { type: 'string', description: 'Bytes in hexadecimal format to verify' },
      signature: { type: 'string', description: 'Base64-encoded signature to verify' },
      address: { type: 'string', description: 'Algorand account address' }
    },
    required: ['bytes', 'signature', 'address']
  }
};

export class UtilityManager {
  static readonly utilityTools = [
    {
      name: 'ping',
      description: 'Basic protocol utility to verify server connectivity',
      inputSchema: utilityToolSchemas.ping,
    },
    {
      name: 'validate_address',
      description: 'Check if an Algorand address is valid',
      inputSchema: utilityToolSchemas.validateAddress,
    },
    {
      name: 'encode_address',
      description: 'Encode a public key to an Algorand address',
      inputSchema: utilityToolSchemas.encodeAddress,
    },
    {
      name: 'decode_address',
      description: 'Decode an Algorand address to a public key',
      inputSchema: utilityToolSchemas.decodeAddress,
    },
    {
      name: 'get_application_address',
      description: 'Get the address for a given application ID',
      inputSchema: utilityToolSchemas.getApplicationAddress,
    },
    {
      name: 'bytes_to_bigint',
      description: 'Convert bytes to a BigInt',
      inputSchema: utilityToolSchemas.bytesToBigint,
    },
    {
      name: 'bigint_to_bytes',
      description: 'Convert a BigInt to bytes',
      inputSchema: utilityToolSchemas.bigintToBytes,
    },
    {
      name: 'encode_uint64',
      description: 'Encode a uint64 to bytes',
      inputSchema: utilityToolSchemas.encodeUint64,
    },
    {
      name: 'decode_uint64',
      description: 'Decode bytes to a uint64',
      inputSchema: utilityToolSchemas.decodeUint64,
    },
    {
      name: 'verify_bytes',
      description: 'Verify a signature against bytes with an Algorand address',
      inputSchema: utilityToolSchemas.verifyBytes,
    },
    {
      name: 'sign_bytes',
      description: 'Sign bytes with a secret key',
      inputSchema: {
        type: 'object',
        properties: {
          bytes: { type: 'string', description: 'Bytes in hexadecimal format to sign' },
          sk: { type: 'string', description: 'Secret key in hexadecimal format to sign the bytes with' }
        },
        required: ['bytes', 'sk']
      },

    },
    {
      name: 'encode_obj',
      description: 'Encode an object to msgpack format',
      inputSchema: {
        type: 'object',
        properties: {
          obj: { type: 'object', description: 'Object to encode' }
        },
        required: ['obj']
      },
    },
    {
      name: 'decode_obj',
      description: 'Decode msgpack bytes to an object',
      inputSchema: {
        type: 'object',
        properties: {
          bytes: { type: 'string', description: 'Base64-encoded msgpack bytes to decode' }
        },
        required: ['bytes']
      },
    }

  ];

  // Tool handlers
  static async handleTool(name: string, args: Record<string, unknown>) {
    try {
      switch (name) {
      case 'ping':
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              name: 'Algorand MCP Server',
              version: '2.7.9',
              builder: 'GoPlausible',
              description: 'A Model Context Protocol (MCP) server providing comprehensive access to the Algorand blockchain. Supports account management, transaction building and signing, smart contract interaction, asset operations, ARC-26 URI generation, and deep integration with Algorand ecosystem services including NFDomains, Tinyman, Vestige, and Ultrade.',
              blockchain: 'Algorand — a carbon-negative, pure proof-of-stake Layer 1 blockchain delivering instant finality, low fees, and advanced smart contract capabilities via AVM (Algorand Virtual Machine).',
              capabilities: [
                'Account creation and management',
                'Transaction building, signing, and submission',
                'Smart contract (application) deployment and interaction',
                'ASA (Algorand Standard Asset) operations',
                'Algod and Indexer API access',
                'ARC-26 URI and QR code generation',
                'Algorand knowledge base and documentation',
                'NFDomains (NFD) integration',
                'Tinyman DEX integration',
                'Vestige analytics integration',
                'Ultrade orderbook DEX integration',
              ],
              links: {
                repository: 'https://github.com/GoPlausible/algorand-mcp',
                algorand: 'https://algorand.co',
                builder: 'https://goplausible.com',
              },
              status: 'running',
            }, null, 2),
          }],
        };

      case 'validate_address':
        if (!args.address || typeof args.address !== 'string') {
          throw new McpError(ErrorCode.InvalidParams, 'Address is required');
        }
        const isValid = UtilityManager.isValidAddress(args.address);
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ isValid }, null, 2),
          }],
        };

      case 'encode_address':
        if (!args.publicKey || typeof args.publicKey !== 'string') {
          throw new McpError(ErrorCode.InvalidParams, 'Public key is required');
        }
        const encodedAddress = UtilityManager.encodeAddress(algosdk.hexToBytes(args.publicKey));
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ address: encodedAddress }, null, 2),
          }],
        };

      case 'decode_address':
        if (!args.address || typeof args.address !== 'string') {
          throw new McpError(ErrorCode.InvalidParams, 'Address is required');
        }
        const decodedPublicKey = UtilityManager.decodeAddress(args.address);
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ publicKey: algosdk.bytesToHex(decodedPublicKey) }, null, 2),
          }],
        };

      case 'get_application_address':
        if (!args.appId || typeof args.appId !== 'number') {
          throw new McpError(ErrorCode.InvalidParams, 'Application ID is required');
        }
        const appAddress = UtilityManager.getApplicationAddress(args.appId);
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ address: appAddress }, null, 2),
          }],
        };

      case 'bytes_to_bigint':
        if (!args.bytes || typeof args.bytes !== 'string') {
          throw new McpError(ErrorCode.InvalidParams, 'Bytes are required');
        }
        const bigInt = algosdk.bytesToBigInt(algosdk.hexToBytes(args.bytes));
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ value: bigInt.toString() }, null, 2),
          }],
        };

      case 'bigint_to_bytes':
        if (!args.value || typeof args.value !== 'string' || !args.size || typeof args.size !== 'number') {
          throw new McpError(ErrorCode.InvalidParams, 'Value and size are required');
        }
        const bytes = algosdk.bigIntToBytes(BigInt(args.value), args.size);
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ bytes: algosdk.bytesToHex(bytes) }, null, 2),
          }],
        };

      case 'encode_uint64':
        if (!args.value || typeof args.value !== 'string') {
          throw new McpError(ErrorCode.InvalidParams, 'Value is required');
        }
        const encodedUint64 = algosdk.encodeUint64(BigInt(args.value));
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ bytes: algosdk.bytesToHex(encodedUint64) }, null, 2),
          }],
        };

      case 'decode_uint64':
        if (!args.bytes || typeof args.bytes !== 'string') {
          throw new McpError(ErrorCode.InvalidParams, 'Bytes are required');
        }
        const decodedUint64 = algosdk.decodeUint64(algosdk.hexToBytes(args.bytes));
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ value: decodedUint64.toString() }, null, 2),
          }],
        };
      case 'sign_bytes': {
        if (!args.bytes || typeof args.bytes !== 'string' || !args.sk || typeof args.sk !== 'string') {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid sign bytes parameters');
        }

        try {
          const signBytesInput = algosdk.hexToBytes(args.bytes);
          const sk = algosdk.hexToBytes(args.sk);
          const sig = algosdk.signBytes(signBytesInput, sk);
          return {
            content: [{
              type: 'text',
              text: JSON.stringify({
                signature: algosdk.bytesToBase64(sig)
              }, null, 2)
            }]
          };
        } catch (error) {
          throw new McpError(
            ErrorCode.InvalidParams,
            `Failed to sign bytes: ${error instanceof Error ? error.message : String(error)}`
          );
        }
      }

      case 'encode_obj': {
        if (!args.obj || typeof args.obj !== 'object') {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid encode object parameters');
        }

        try {
          const encoded = algosdk.msgpackRawEncode(args.obj);
          return {
            content: [{
              type: 'text',
              text: JSON.stringify({
                encoded: algosdk.bytesToBase64(encoded)
              }, null, 2)
            }]
          };
        } catch (error) {
          throw new McpError(
            ErrorCode.InvalidParams,
            `Failed to encode object: ${error instanceof Error ? error.message : String(error)}`
          );
        }
      }

      case 'decode_obj': {
        if (!args.bytes || typeof args.bytes !== 'string') {
          throw new McpError(ErrorCode.InvalidParams, 'Invalid decode object parameters');
        }

        try {
          const decodeBytes = algosdk.base64ToBytes(args.bytes);
          const decoded = algosdk.msgpackRawDecode(decodeBytes);
          return {
            content: [{
              type: 'text',
              text: algosdk.stringifyJSON(decoded)
            }]
          };
        } catch (error) {
          throw new McpError(
            ErrorCode.InvalidParams,
            `Failed to decode object: ${error instanceof Error ? error.message : String(error)}`
          );
        }
      }

      case 'verify_bytes':
        if (!args.bytes || typeof args.bytes !== 'string' || !args.signature || typeof args.signature !== 'string' || !args.address || typeof args.address !== 'string') {
          throw new McpError(ErrorCode.InvalidParams, 'Bytes, signature, and public key are required');
        }
        const verified = UtilityManager.verifyBytes(algosdk.hexToBytes(args.bytes), algosdk.base64ToBytes(args.signature), args.address);
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ verified }, null, 2),
          }],
        };

      default:
        console.error(`[MCP Error] Unknown tool requested: ${name}`);
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown tool: ${name}`
        );
    }
    } catch (error) {
      if (error instanceof McpError) {
        console.error(`[MCP Error] ${error.code}: ${error.message}`);
        throw error;
      }
      console.error('[MCP Error] Unexpected error:', error);
      throw new McpError(
        ErrorCode.InternalError,
        `Operation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  static isValidAddress(address: string): boolean {
    try {
      return algosdk.isValidAddress(address);
    } catch (error) {
      console.error('[MCP Error] Failed to validate address:', error);
      throw new McpError(
        ErrorCode.InvalidParams,
        `Invalid address format: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  static encodeAddress(publicKey: Uint8Array): string {
    try {
      return algosdk.encodeAddress(publicKey);
    } catch (error) {
      console.error('[MCP Error] Failed to encode address:', error);
      throw new McpError(
        ErrorCode.InvalidParams,
        `Invalid public key: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  static decodeAddress(address: string): Uint8Array {
    try {
      return algosdk.decodeAddress(address).publicKey;
    } catch (error) {
      console.error('[MCP Error] Failed to decode address:', error);
      throw new McpError(
        ErrorCode.InvalidParams,
        `Invalid address: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  static getApplicationAddress(appId: number | bigint): string {
    try {
      return algosdk.getApplicationAddress(appId).toString();
    } catch (error) {
      console.error('[MCP Error] Failed to get application address:', error);
      throw new McpError(
        ErrorCode.InvalidParams,
        `Invalid application ID: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  static verifyBytes(bytes: Uint8Array, signature: Uint8Array, address: string): boolean {
    console.error('Verifying bytes:', {
      bytes: algosdk.bytesToHex(bytes),
      signature: algosdk.bytesToBase64(signature),
      address,
    });
    try {
      return algosdk.verifyBytes(bytes, signature, address);
    } catch (error) {
      console.error('[MCP Error] Failed to verify bytes:', error);
      throw new McpError(
        ErrorCode.InvalidParams,
        `Failed to verify: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}
