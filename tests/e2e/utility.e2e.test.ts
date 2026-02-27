import algosdk from 'algosdk';
import { describeIf, testConfig } from '../helpers/testConfig.js';
import { getE2EAccount, invokeTool, parseToolResponse } from '../helpers/e2eSetup.js';

describeIf(testConfig.isCategoryEnabled('utility'))('Utility Tools (E2E)', () => {
  describe('ping', () => {
    it('returns running status', async () => {
      const data = parseToolResponse(await invokeTool('ping', {}));
      expect(data.status).toBe('running');
    });
  });

  describe('validate_address', () => {
    it('validates the E2E account address', async () => {
      const account = getE2EAccount();
      const data = parseToolResponse(
        await invokeTool('validate_address', { address: account.address }),
      );
      expect(data.isValid).toBe(true);
    });

    it('rejects an invalid address', async () => {
      const data = parseToolResponse(
        await invokeTool('validate_address', { address: 'NOT_A_VALID_ADDRESS' }),
      );
      expect(data.isValid).toBe(false);
    });
  });

  describe('encode_address / decode_address', () => {
    it('round-trips with E2E account', async () => {
      const account = getE2EAccount();
      const decoded = parseToolResponse(
        await invokeTool('decode_address', { address: account.address }),
      );
      const encoded = parseToolResponse(
        await invokeTool('encode_address', { publicKey: decoded.publicKey }),
      );
      expect(encoded.address).toBe(account.address);
    });
  });

  describe('bytes_to_bigint / bigint_to_bytes', () => {
    it('round-trips', async () => {
      const toBytes = parseToolResponse(
        await invokeTool('bigint_to_bytes', { value: '999999', size: 8 }),
      );
      const toBigint = parseToolResponse(
        await invokeTool('bytes_to_bigint', { bytes: toBytes.bytes }),
      );
      expect(toBigint.value).toBe('999999');
    });
  });

  describe('encode_uint64 / decode_uint64', () => {
    it('round-trips', async () => {
      const encoded = parseToolResponse(
        await invokeTool('encode_uint64', { value: '12345' }),
      );
      const decoded = parseToolResponse(
        await invokeTool('decode_uint64', { bytes: encoded.bytes }),
      );
      expect(decoded.value).toBe('12345');
    });
  });

  describe('sign_bytes / verify_bytes', () => {
    it('signs and verifies with E2E account key', async () => {
      const account = getE2EAccount();
      const hexData = algosdk.bytesToHex(new Uint8Array([0xde, 0xad, 0xbe, 0xef]));

      const signed = parseToolResponse(
        await invokeTool('sign_bytes', { bytes: hexData, sk: account.secretKeyHex }),
      );
      expect(signed.signature).toBeDefined();

      const verified = parseToolResponse(
        await invokeTool('verify_bytes', {
          bytes: hexData,
          signature: signed.signature,
          address: account.address,
        }),
      );
      expect(verified.verified).toBe(true);
    });
  });

  describe('encode_obj / decode_obj', () => {
    it('round-trips an object', async () => {
      const obj = { key: 'value', num: 42 };
      const encoded = parseToolResponse(
        await invokeTool('encode_obj', { obj }),
      );
      const decoded = parseToolResponse(
        await invokeTool('decode_obj', { bytes: encoded.encoded }),
      );
      expect(decoded.key).toBe('value');
      expect(decoded.num).toBe(42);
    });
  });
});
