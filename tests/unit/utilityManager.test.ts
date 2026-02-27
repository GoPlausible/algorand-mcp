import { jest } from '@jest/globals';

import algosdk from 'algosdk';
import { setupNetworkMocks } from '../helpers/mockFactories.js';

jest.unstable_mockModule('../../src/algorand-client.js', () => setupNetworkMocks());

const { UtilityManager } = await import('../../src/tools/utilityManager.js');

function parseResult(result: any) {
  return JSON.parse(result.content[0].text);
}

describe('UtilityManager', () => {
  describe('ping', () => {
    it('returns server info', async () => {
      const result = await UtilityManager.handleTool('ping', {});
      const data = parseResult(result);
      expect(data.status).toBe('running');
    });
  });

  describe('validate_address', () => {
    it('returns true for a valid address', async () => {
      const account = algosdk.generateAccount();
      const result = await UtilityManager.handleTool('validate_address', {
        address: account.addr.toString(),
      });
      const data = parseResult(result);
      expect(data.isValid).toBe(true);
    });

    it('returns false for an invalid address', async () => {
      const result = await UtilityManager.handleTool('validate_address', {
        address: 'INVALID_ADDRESS_STRING',
      });
      const data = parseResult(result);
      expect(data.isValid).toBe(false);
    });

    it('throws for missing address', async () => {
      await expect(
        UtilityManager.handleTool('validate_address', {}),
      ).rejects.toThrow();
    });
  });

  describe('encode_address / decode_address', () => {
    it('round-trips correctly', async () => {
      const account = algosdk.generateAccount();
      const address = account.addr.toString();
      const pubKeyHex = algosdk.bytesToHex(account.addr.publicKey);

      const decoded = parseResult(
        await UtilityManager.handleTool('decode_address', { address }),
      );
      expect(decoded.publicKey).toBe(pubKeyHex);

      const encoded = parseResult(
        await UtilityManager.handleTool('encode_address', { publicKey: pubKeyHex }),
      );
      expect(encoded.address).toBe(address);
    });
  });

  describe('get_application_address', () => {
    it('returns a deterministic address for a given app ID', async () => {
      const result = parseResult(
        await UtilityManager.handleTool('get_application_address', { appId: 123 }),
      );
      expect(result.address).toBeDefined();
      expect(result.address).toHaveLength(58);

      // Same app ID should always produce the same address
      const result2 = parseResult(
        await UtilityManager.handleTool('get_application_address', { appId: 123 }),
      );
      expect(result2.address).toBe(result.address);
    });
  });

  describe('bytes_to_bigint / bigint_to_bytes', () => {
    it('round-trips correctly', async () => {
      const original = '12345678';
      const toBytes = parseResult(
        await UtilityManager.handleTool('bigint_to_bytes', { value: original, size: 8 }),
      );
      expect(toBytes.bytes).toBeDefined();

      const toBigint = parseResult(
        await UtilityManager.handleTool('bytes_to_bigint', { bytes: toBytes.bytes }),
      );
      expect(toBigint.value).toBe(original);
    });
  });

  describe('encode_uint64 / decode_uint64', () => {
    it('round-trips correctly', async () => {
      const encoded = parseResult(
        await UtilityManager.handleTool('encode_uint64', { value: '42' }),
      );
      expect(encoded.bytes).toBeDefined();

      const decoded = parseResult(
        await UtilityManager.handleTool('decode_uint64', { bytes: encoded.bytes }),
      );
      expect(decoded.value).toBe('42');
    });
  });

  describe('sign_bytes / verify_bytes', () => {
    it('signs and verifies successfully', async () => {
      const account = algosdk.generateAccount();
      const skHex = algosdk.bytesToHex(account.sk);
      const data = algosdk.bytesToHex(new Uint8Array([1, 2, 3, 4]));

      const signed = parseResult(
        await UtilityManager.handleTool('sign_bytes', { bytes: data, sk: skHex }),
      );
      expect(signed.signature).toBeDefined();

      const verified = parseResult(
        await UtilityManager.handleTool('verify_bytes', {
          bytes: data,
          signature: signed.signature,
          address: account.addr.toString(),
        }),
      );
      expect(verified.verified).toBe(true);
    });
  });

  describe('encode_obj / decode_obj', () => {
    it('round-trips a simple object', async () => {
      const obj = { hello: 'world', num: 42 };
      const encoded = parseResult(
        await UtilityManager.handleTool('encode_obj', { obj }),
      );
      expect(encoded.encoded).toBeDefined();

      const decoded = parseResult(
        await UtilityManager.handleTool('decode_obj', { bytes: encoded.encoded }),
      );
      expect(decoded.hello).toBe('world');
      expect(decoded.num).toBe(42);
    });
  });

  describe('error handling', () => {
    it('throws for unknown tool', async () => {
      await expect(
        UtilityManager.handleTool('unknown_tool', {}),
      ).rejects.toThrow();
    });
  });
});
