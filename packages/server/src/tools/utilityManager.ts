import algosdk from 'algosdk';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';

// Tool schemas
export const utilityToolSchemas = {
  validateAddress: {
    type: 'object',
    properties: {
      address: { type: 'string' }
    },
    required: ['address']
  },
  encodeAddress: {
    type: 'object',
    properties: {
      publicKey: { type: 'string' }
    },
    required: ['publicKey']
  },
  decodeAddress: {
    type: 'object',
    properties: {
      address: { type: 'string' }
    },
    required: ['address']
  },
  getApplicationAddress: {
    type: 'object',
    properties: {
      appId: { type: 'integer' }
    },
    required: ['appId']
  },
  bytesToBigint: {
    type: 'object',
    properties: {
      bytes: { type: 'string' }
    },
    required: ['bytes']
  },
  bigintToBytes: {
    type: 'object',
    properties: {
      value: { type: 'string' },
      size: { type: 'integer' }
    },
    required: ['value', 'size']
  },
  encodeUint64: {
    type: 'object',
    properties: {
      value: { type: 'string' }
    },
    required: ['value']
  },
  decodeUint64: {
    type: 'object',
    properties: {
      bytes: { type: 'string' }
    },
    required: ['bytes']
  }
};

export class UtilityManager {
  static readonly utilityTools = [
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
    }
  ];

  // Tool handlers
  static async handleTool(name: string, args: Record<string, unknown>) {
    try {
      switch (name) {
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
        const encodedAddress = UtilityManager.encodeAddress(Buffer.from(args.publicKey, 'hex'));
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
            text: JSON.stringify({ publicKey: Buffer.from(decodedPublicKey).toString('hex') }, null, 2),
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
        const bigInt = UtilityManager.bytesToBigInt(Buffer.from(args.bytes, 'hex'));
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
        const bytes = UtilityManager.bigIntToBytes(BigInt(args.value), args.size);
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ bytes: Buffer.from(bytes).toString('hex') }, null, 2),
          }],
        };

      case 'encode_uint64':
        if (!args.value || typeof args.value !== 'string') {
          throw new McpError(ErrorCode.InvalidParams, 'Value is required');
        }
        const encodedUint64 = UtilityManager.encodeUint64(BigInt(args.value));
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ bytes: Buffer.from(encodedUint64).toString('hex') }, null, 2),
          }],
        };

      case 'decode_uint64':
        if (!args.bytes || typeof args.bytes !== 'string') {
          throw new McpError(ErrorCode.InvalidParams, 'Bytes are required');
        }
        const decodedUint64 = UtilityManager.decodeUint64(Buffer.from(args.bytes, 'hex'));
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ value: decodedUint64.toString() }, null, 2),
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

  /**
   * Checks if an address is valid
   * @param address The address to validate
   * @returns True if the address is valid, false otherwise
   */
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

  /**
   * Encodes a public key to an Algorand address
   * @param publicKey The public key to encode
   * @returns The encoded address
   */
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

  /**
   * Decodes an Algorand address to a public key
   * @param address The address to decode
   * @returns The decoded public key
   */
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

  /**
   * Gets the application address for a given application ID
   * @param appId The application ID
   * @returns The application address
   */
  static getApplicationAddress(appId: number): string {
    try {
      return algosdk.getApplicationAddress(appId);
    } catch (error) {
      console.error('[MCP Error] Failed to get application address:', error);
      throw new McpError(
        ErrorCode.InvalidParams,
        `Invalid application ID: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Converts bytes to a BigInt
   * @param bytes The bytes to convert
   * @returns The BigInt value
   */
  static bytesToBigInt(bytes: Uint8Array): bigint {
    try {
      return BigInt('0x' + Buffer.from(bytes).toString('hex'));
    } catch (error) {
      console.error('[MCP Error] Failed to convert bytes to BigInt:', error);
      throw new McpError(
        ErrorCode.InvalidParams,
        `Invalid bytes format: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Converts a BigInt to bytes
   * @param value The BigInt value to convert
   * @param size The size of the resulting byte array
   * @returns The bytes representation
   */
  static bigIntToBytes(value: bigint, size: number): Uint8Array {
    try {
      const hex = value.toString(16).padStart(size * 2, '0');
      return Buffer.from(hex, 'hex');
    } catch (error) {
      console.error('[MCP Error] Failed to convert BigInt to bytes:', error);
      throw new McpError(
        ErrorCode.InvalidParams,
        `Invalid BigInt value or size: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Encodes a uint64 to bytes
   * @param value The uint64 value to encode
   * @returns The encoded bytes
   */
  static encodeUint64(value: bigint): Uint8Array {
    try {
      return this.bigIntToBytes(value, 8);
    } catch (error) {
      console.error('[MCP Error] Failed to encode uint64:', error);
      throw new McpError(
        ErrorCode.InvalidParams,
        `Invalid uint64 value: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Decodes bytes to a uint64
   * @param bytes The bytes to decode
   * @returns The decoded uint64 value
   */
  static decodeUint64(bytes: Uint8Array): bigint {
    try {
      return this.bytesToBigInt(bytes);
    } catch (error) {
      console.error('[MCP Error] Failed to decode uint64:', error);
      throw new McpError(
        ErrorCode.InvalidParams,
        `Invalid uint64 bytes: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}
