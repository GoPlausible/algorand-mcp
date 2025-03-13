import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { UtilityManager } from '../../src/tools/utilityManager';
import algosdk from 'algosdk';

// Rest of the file remains the same...
// Mock algosdk
jest.mock('algosdk', () => ({
  isValidAddress: jest.fn(),
  encodeAddress: jest.fn(),
  decodeAddress: jest.fn(),
  getApplicationAddress: jest.fn(),
}));

describe('UtilityManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Tool Schemas', () => {
    it('should have valid tool schemas', () => {
      expect(UtilityManager.utilityTools).toHaveLength(8);
      expect(UtilityManager.utilityTools.map((t: { name: string; }) => t.name)).toEqual([
        'validate_address',
        'encode_address',
        'decode_address',
        'get_application_address',
        'bytes_to_bigint',
        'bigint_to_bytes',
        'encode_uint64',
        'decode_uint64',
      ]);
    });
  });

  describe('Address Operations', () => {
    const testAddress = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    const testPublicKey = Buffer.from('0'.repeat(64), 'hex');

    it('should validate address', () => {
      (algosdk.isValidAddress as jest.Mock).mockReturnValue(true);
      
      const result = UtilityManager.isValidAddress(testAddress);
      
      expect(result).toBe(true);
      expect(algosdk.isValidAddress).toHaveBeenCalledWith(testAddress);
    });

    it('should encode address', () => {
      (algosdk.encodeAddress as jest.Mock).mockReturnValue(testAddress);
      
      const result = UtilityManager.encodeAddress(testPublicKey);
      
      expect(result).toBe(testAddress);
      expect(algosdk.encodeAddress).toHaveBeenCalledWith(testPublicKey);
    });

    it('should decode address', () => {
      (algosdk.decodeAddress as jest.Mock).mockReturnValue({ publicKey: testPublicKey });
      
      const result = UtilityManager.decodeAddress(testAddress);
      
      expect(result).toBe(testPublicKey);
      expect(algosdk.decodeAddress).toHaveBeenCalledWith(testAddress);
    });

    it('should get application address', () => {
      const appId = 123;
      const appAddress = 'APP_ADDRESS';
      (algosdk.getApplicationAddress as jest.Mock).mockReturnValue(appAddress);
      
      const result = UtilityManager.getApplicationAddress(appId);
      
      expect(result).toBe(appAddress);
      expect(algosdk.getApplicationAddress).toHaveBeenCalledWith(appId);
    });
  });

  describe('BigInt Operations', () => {
    it('should convert bytes to BigInt', () => {
      const bytes = Buffer.from('0001', 'hex');
      const result = UtilityManager.bytesToBigInt(bytes);
      expect(result.toString()).toBe('1');
    });

    it('should convert BigInt to bytes', () => {
      const value = BigInt(1);
      const size = 2;
      const result = UtilityManager.bigIntToBytes(value, size);
      expect(Buffer.from(result).toString('hex')).toBe('0001');
    });

    it('should encode uint64', () => {
      const value = BigInt(1);
      const result = UtilityManager.encodeUint64(value);
      expect(Buffer.from(result).toString('hex')).toBe('0000000000000001');
    });

    it('should decode uint64', () => {
      const bytes = Buffer.from('0000000000000001', 'hex');
      const result = UtilityManager.decodeUint64(bytes);
      expect(result.toString()).toBe('1');
    });
  });

  describe('handleTool', () => {
    it('should handle validate_address', async () => {
      (algosdk.isValidAddress as jest.Mock).mockReturnValue(true);
      
      const result = await UtilityManager.handleTool('validate_address', {
        address: 'test-address',
      });

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify({ isValid: true }, null, 2),
        }],
      });
    });

    it('should handle encode_address', async () => {
      const testAddress = 'encoded-address';
      (algosdk.encodeAddress as jest.Mock).mockReturnValue(testAddress);
      
      const result = await UtilityManager.handleTool('encode_address', {
        publicKey: '00',
      });

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify({ address: testAddress }, null, 2),
        }],
      });
    });

    it('should handle decode_address', async () => {
      const testPublicKey = Buffer.from('00', 'hex');
      (algosdk.decodeAddress as jest.Mock).mockReturnValue({ publicKey: testPublicKey });
      
      const result = await UtilityManager.handleTool('decode_address', {
        address: 'test-address',
      });

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify({ publicKey: '00' }, null, 2),
        }],
      });
    });

    it('should handle get_application_address', async () => {
      const appAddress = 'app-address';
      (algosdk.getApplicationAddress as jest.Mock).mockReturnValue(appAddress);
      
      const result = await UtilityManager.handleTool('get_application_address', {
        appId: 123,
      });

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify({ address: appAddress }, null, 2),
        }],
      });
    });

    it('should handle bytes_to_bigint', async () => {
      const result = await UtilityManager.handleTool('bytes_to_bigint', {
        bytes: '0001',
      });

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify({ value: '1' }, null, 2),
        }],
      });
    });

    it('should handle bigint_to_bytes', async () => {
      const result = await UtilityManager.handleTool('bigint_to_bytes', {
        value: '1',
        size: 2,
      });

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify({ bytes: '0001' }, null, 2),
        }],
      });
    });

    it('should handle encode_uint64', async () => {
      const result = await UtilityManager.handleTool('encode_uint64', {
        value: '1',
      });

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify({ bytes: '0000000000000001' }, null, 2),
        }],
      });
    });

    it('should handle decode_uint64', async () => {
      const result = await UtilityManager.handleTool('decode_uint64', {
        bytes: '0000000000000001',
      });

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify({ value: '1' }, null, 2),
        }],
      });
    });

    describe('Error Handling', () => {
      it('should throw error for unknown tool', async () => {
        await expect(UtilityManager.handleTool('unknown_tool', {}))
          .rejects
          .toThrow(new McpError(ErrorCode.MethodNotFound, 'Unknown tool: unknown_tool'));
      });

      it('should throw error for missing address in validate_address', async () => {
        await expect(UtilityManager.handleTool('validate_address', {}))
          .rejects
          .toThrow(new McpError(ErrorCode.InvalidParams, 'Address is required'));
      });

      it('should throw error for missing public key in encode_address', async () => {
        await expect(UtilityManager.handleTool('encode_address', {}))
          .rejects
          .toThrow(new McpError(ErrorCode.InvalidParams, 'Public key is required'));
      });

      it('should throw error for missing address in decode_address', async () => {
        await expect(UtilityManager.handleTool('decode_address', {}))
          .rejects
          .toThrow(new McpError(ErrorCode.InvalidParams, 'Address is required'));
      });

      it('should throw error for missing app ID in get_application_address', async () => {
        await expect(UtilityManager.handleTool('get_application_address', {}))
          .rejects
          .toThrow(new McpError(ErrorCode.InvalidParams, 'Application ID is required'));
      });

      it('should throw error for missing bytes in bytes_to_bigint', async () => {
        await expect(UtilityManager.handleTool('bytes_to_bigint', {}))
          .rejects
          .toThrow(new McpError(ErrorCode.InvalidParams, 'Bytes are required'));
      });

      it('should throw error for missing value or size in bigint_to_bytes', async () => {
        await expect(UtilityManager.handleTool('bigint_to_bytes', {}))
          .rejects
          .toThrow(new McpError(ErrorCode.InvalidParams, 'Value and size are required'));
      });

      it('should throw error for missing value in encode_uint64', async () => {
        await expect(UtilityManager.handleTool('encode_uint64', {}))
          .rejects
          .toThrow(new McpError(ErrorCode.InvalidParams, 'Value is required'));
      });

      it('should throw error for missing bytes in decode_uint64', async () => {
        await expect(UtilityManager.handleTool('decode_uint64', {}))
          .rejects
          .toThrow(new McpError(ErrorCode.InvalidParams, 'Bytes are required'));
      });
    });
  });
});
