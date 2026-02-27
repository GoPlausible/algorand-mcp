import { jest } from '@jest/globals';
import algosdk from 'algosdk';

import { setupNetworkMocks } from '../helpers/mockFactories.js';

const mocks = setupNetworkMocks();
jest.unstable_mockModule('../../src/algorand-client.js', () => mocks);

const { handleApiManager } = await import('../../src/tools/apiManager/index.js');

// Generate a real valid address for tests
const testAccount = algosdk.generateAccount();
const VALID_ADDRESS = testAccount.addr.toString();

describe('Algod API Tools', () => {
  describe('api_algod_get_account_info', () => {
    it('returns account information', async () => {
      const result = await handleApiManager('api_algod_get_account_info', {
        address: VALID_ADDRESS,
        network: 'testnet',
      });
      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
    });

    it('throws for missing address', async () => {
      await expect(
        handleApiManager('api_algod_get_account_info', {}),
      ).rejects.toThrow();
    });
  });

  describe('api_algod_get_transaction_params', () => {
    it('returns suggested params', async () => {
      const result = await handleApiManager('api_algod_get_transaction_params', {
        network: 'testnet',
      });
      expect(result).toBeDefined();
    });
  });

  describe('api_algod_get_node_status', () => {
    it('returns node status', async () => {
      const result = await handleApiManager('api_algod_get_node_status', {
        network: 'testnet',
      });
      expect(result).toBeDefined();
    });
  });

  describe('api_algod_get_application_by_id', () => {
    it('returns application info', async () => {
      const result = await handleApiManager('api_algod_get_application_by_id', {
        appId: 123,
        network: 'testnet',
      });
      expect(result).toBeDefined();
    });
  });

  describe('api_algod_get_asset_by_id', () => {
    it('returns asset info', async () => {
      const result = await handleApiManager('api_algod_get_asset_by_id', {
        assetId: 456,
        network: 'testnet',
      });
      expect(result).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('throws for unknown API tool', async () => {
      await expect(
        handleApiManager('api_algod_unknown', {}),
      ).rejects.toThrow();
    });
  });
});
