/**
 * Utility Manager for Algorand Remote MCP
 * Provides essential Algorand utility functions
 */

import algosdk from 'algosdk';
import { z } from 'zod';
import { ResponseProcessor } from '../utils';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { guide } from '../utils/Guide.js';
import { Env, Props } from '../types';

/**
 * Register utility tools to the MCP server
 */
export function registerUtilityTools(server: McpServer,env: Env, props: Props): void {
  // Validate address
  server.tool(
    'validate_address',
    'Check if an Algorand address is valid',
    { 
      address: z.string().describe('Address in standard Algorand format (58 characters)') 
    },
    async ({ address }) => {
      try {
        const isValid = algosdk.isValidAddress(address);
        return ResponseProcessor.processResponse({ isValid });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error validating address: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Encode address
  server.tool(
    'encode_address',
    'Encode a public key to an Algorand address',
    { 
      publicKey: z.string().describe('Public key in hexadecimal format to encode into an address') 
    },
    async ({ publicKey }) => {
      try {
        const publicKeyBytes = new Uint8Array(Buffer.from(publicKey, 'hex'));
        const address = algosdk.encodeAddress(publicKeyBytes);
        return ResponseProcessor.processResponse({ address });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error encoding address: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Decode address
  server.tool(
    'decode_address',
    'Decode an Algorand address to a public key',
    { 
      address: z.string().describe('Address in standard Algorand format (58 characters) to decode') 
    },
    async ({ address }) => {
      try {
        const publicKey = algosdk.decodeAddress(address).publicKey;
        return ResponseProcessor.processResponse({ 
          publicKey: Buffer.from(publicKey).toString('hex') 
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error decoding address: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Get application address
  server.tool(
    'get_application_address',
    'Get the address for a given application ID',
    { 
      appId: z.number().int().positive().describe('Application ID to get the address for') 
    },
    async ({ appId }) => {
      try {
        const address = algosdk.getApplicationAddress(appId);
        return ResponseProcessor.processResponse({ address });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error getting application address: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Convert bytes to BigInt
  server.tool(
    'bytes_to_bigint',
    'Convert bytes to a BigInt',
    { 
      bytes: z.string().describe('Bytes in hexadecimal format to convert to a BigInt') 
    },
    async ({ bytes }) => {
      try {
        const bytesBuffer = Buffer.from(bytes, 'hex');
        const value = BigInt('0x' + bytesBuffer.toString('hex')).toString();
        return ResponseProcessor.processResponse({ value });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error converting bytes to BigInt: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Convert BigInt to bytes
  server.tool(
    'bigint_to_bytes',
    'Convert a BigInt to bytes',
    { 
      value: z.string().describe('BigInt value as a string to convert to bytes'),
      size: z.number().int().positive().describe('Size of the resulting byte array')
    },
    async ({ value, size }) => {
      try {
        const bigIntValue = BigInt(value);
        const hex = bigIntValue.toString(16).padStart(size * 2, '0');
        const bytes = Buffer.from(hex, 'hex').toString('hex');
        return ResponseProcessor.processResponse({ bytes });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error converting BigInt to bytes: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Encode uint64
  server.tool(
    'encode_uint64',
    'Encode a uint64 to bytes',
    { 
      value: z.string().describe('Uint64 value as a string to encode into bytes') 
    },
    async ({ value }) => {
      try {
        const bigIntValue = BigInt(value);
        const bytes = Buffer.from(bigIntValue.toString(16).padStart(16, '0'), 'hex').toString('hex');
        return ResponseProcessor.processResponse({ bytes });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error encoding uint64: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Decode uint64
  server.tool(
    'decode_uint64',
    'Decode bytes to a uint64',
    { 
      bytes: z.string().describe('Bytes in hexadecimal format to decode into a uint64') 
    },
    async ({ bytes }) => {
      try {
        const bytesBuffer = Buffer.from(bytes, 'hex');
        const value = BigInt('0x' + bytesBuffer.toString('hex')).toString();
        return ResponseProcessor.processResponse({ value });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error decoding uint64: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Verify bytes with signature
  server.tool(
    'verify_bytes',
    'Verify a signature against bytes with an Algorand address',
    { 
      bytes: z.string().describe('Bytes in hexadecimal format to verify'),
      signature: z.string().describe('Base64-encoded signature to verify'),
      address: z.string().describe('Algorand account address')
    },
    async ({ bytes, signature, address }) => {
      try {
        const bytesBuffer = new Uint8Array(Buffer.from(bytes, 'hex'));
        const signatureBuffer = new Uint8Array(Buffer.from(signature, 'base64'));
        const publicKey = algosdk.decodeAddress(address).publicKey;
        
        // Add "MX" prefix as in the original code
        const mxBytes = new TextEncoder().encode("MX");
        const fullBytes = new Uint8Array(mxBytes.length + bytesBuffer.length);
        fullBytes.set(mxBytes);
        fullBytes.set(bytesBuffer, mxBytes.length);
        
        // Use nacl for verification as in the original code
        const nacl = await import('tweetnacl');
        const verified = nacl.sign.detached.verify(fullBytes, signatureBuffer, publicKey);
        
        return ResponseProcessor.processResponse({ verified });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error verifying bytes: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Sign bytes
  server.tool(
    'sign_bytes',
    'Sign bytes with a secret key',
    { 
      bytes: z.string().describe('Bytes in hexadecimal format to sign'),
      sk: z.string().describe('Secret key in hexadecimal format to sign the bytes with')
    },
    async ({ bytes, sk }) => {
      try {
        const bytesBuffer = Buffer.from(bytes, 'hex');
        const skBuffer = Buffer.from(sk, 'hex');
        const signature = algosdk.signBytes(bytesBuffer, skBuffer);
        return ResponseProcessor.processResponse({
          signature: Buffer.from(signature).toString('base64')
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error signing bytes: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Encode object to msgpack
  server.tool(
    'encode_obj',
    'Encode an object to msgpack format',
    { 
      obj: z.any().describe('Object to encode') 
    },
    async ({ obj }) => {
      try {
        const encoded = algosdk.encodeObj(obj);
        return ResponseProcessor.processResponse({
          encoded: Buffer.from(encoded).toString('base64')
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error encoding object: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Decode msgpack to object
  server.tool(
    'decode_obj',
    'Decode msgpack bytes to an object',
    { 
      bytes: z.string().describe('Base64-encoded msgpack bytes to decode') 
    },
    async ({ bytes }) => {
      try {
        const bytesBuffer = Buffer.from(bytes, 'base64');
        const decoded = algosdk.decodeObj(bytesBuffer);
        return ResponseProcessor.processResponse(decoded);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error decoding object: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );

  // Get agent guide for Algorand Remote MCP
  server.tool(
    'algorand_mcp_guide',
    'Access comprehensive guide for using Algorand Remote MCP, including step-by-step workflows, examples, and best practices.',
    {},
    async () => {
      try {
        return ResponseProcessor.processResponse(guide);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error getting agents guide: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
}
