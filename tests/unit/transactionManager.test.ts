import { jest } from '@jest/globals';

import algosdk from 'algosdk';
import { setupNetworkMocks, MOCK_SUGGESTED_PARAMS } from '../helpers/mockFactories.js';

jest.unstable_mockModule('../../src/algorand-client.js', () => setupNetworkMocks());

const { TransactionManager } = await import('../../src/tools/transactionManager/index.js');

function parseResult(result: any) {
  return JSON.parse(result.content[0].text);
}

describe('TransactionManager', () => {
  const account = algosdk.generateAccount();
  const address = account.addr.toString();
  const skHex = algosdk.bytesToHex(account.sk);

  const baseTxnParams = {
    fee: 1000,
    firstRound: 1000,
    lastRound: 2000,
    genesisID: 'testnet-v1.0',
    genesisHash: 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',
  };

  describe('make_payment_txn', () => {
    it('creates a valid payment transaction', async () => {
      const result = await TransactionManager.handleTool('make_payment_txn', {
        from: address,
        to: address,
        amount: 1000,
        network: 'testnet',
      });
      const data = parseResult(result);
      expect(data).toBeDefined();
      expect(data.type).toBe('pay');
    });

    it('throws for missing required fields', async () => {
      await expect(
        TransactionManager.handleTool('make_payment_txn', { from: address }),
      ).rejects.toThrow();
    });
  });

  describe('make_asset_create_txn', () => {
    it('creates a valid asset creation transaction', async () => {
      const result = await TransactionManager.handleTool('make_asset_create_txn', {
        from: address,
        total: 1000000,
        decimals: 6,
        defaultFrozen: false,
        unitName: 'TST',
        assetName: 'Test Asset',
        network: 'testnet',
      });
      const data = parseResult(result);
      expect(data).toBeDefined();
      expect(data.type).toBe('acfg');
    });
  });

  describe('make_asset_transfer_txn', () => {
    it('creates a valid asset transfer transaction', async () => {
      const result = await TransactionManager.handleTool('make_asset_transfer_txn', {
        from: address,
        to: address,
        assetIndex: 12345,
        amount: 0,
        network: 'testnet',
      });
      const data = parseResult(result);
      expect(data).toBeDefined();
      expect(data.type).toBe('axfer');
    });
  });

  describe('make_app_create_txn', () => {
    it('creates a valid app creation transaction', async () => {
      // Simple approval program: #pragma version 10; int 1
      const approvalB64 = algosdk.bytesToBase64(new Uint8Array([0x0a, 0x20, 0x01, 0x01, 0x22]));
      const clearB64 = approvalB64;

      const result = await TransactionManager.handleTool('make_app_create_txn', {
        from: address,
        approvalProgram: approvalB64,
        clearProgram: clearB64,
        numGlobalByteSlices: 0,
        numGlobalInts: 1,
        numLocalByteSlices: 0,
        numLocalInts: 0,
        network: 'testnet',
      });
      const data = parseResult(result);
      expect(data).toBeDefined();
      expect(data.type).toBe('appl');
    });
  });

  describe('sign_transaction', () => {
    it('signs a transaction and returns txID + blob', async () => {
      // algosdk v3 Transaction constructor requires suggestedParams nested
      // and paymentParams instead of direct fields
      const txnParams = {
        type: 'pay',
        sender: address,
        suggestedParams: {
          fee: 1000, firstValid: 1000, lastValid: 2000,
          genesisID: 'testnet-v1.0',
          genesisHash: MOCK_SUGGESTED_PARAMS.genesisHash,
          flatFee: true,
        },
        paymentParams: { receiver: address, amount: 0 },
      };

      const signResult = await TransactionManager.handleTool('sign_transaction', {
        transaction: txnParams,
        sk: skHex,
      });
      const signed = parseResult(signResult);
      expect(signed.txID).toBeDefined();
      expect(signed.blob).toBeDefined();
    });

    it('throws for missing transaction', async () => {
      await expect(
        TransactionManager.handleTool('sign_transaction', { sk: skHex }),
      ).rejects.toThrow();
    });

    it('throws for missing sk', async () => {
      await expect(
        TransactionManager.handleTool('sign_transaction', { transaction: {} }),
      ).rejects.toThrow();
    });
  });

  describe('assign_group_id', () => {
    it('assigns group ID to multiple transactions', async () => {
      // algosdk v3 Transaction constructor requires suggestedParams nested
      const txnParams = {
        type: 'pay',
        sender: address,
        suggestedParams: {
          fee: 1000, firstValid: 1000, lastValid: 2000,
          genesisID: 'testnet-v1.0',
          genesisHash: MOCK_SUGGESTED_PARAMS.genesisHash,
          flatFee: true,
        },
        paymentParams: { receiver: address, amount: 0 },
      };

      const result = await TransactionManager.handleTool('assign_group_id', {
        transactions: [txnParams, { ...txnParams }],
      });
      const grouped = parseResult(result);
      expect(Array.isArray(grouped)).toBe(true);
      expect(grouped).toHaveLength(2);
    });

    it('throws for empty transactions array', async () => {
      await expect(
        TransactionManager.handleTool('assign_group_id', { transactions: [] }),
      ).rejects.toThrow();
    });
  });

  describe('error handling', () => {
    it('throws for unknown tool name', async () => {
      await expect(
        TransactionManager.handleTool('unknown_transaction_tool', {}),
      ).rejects.toThrow();
    });
  });
});
