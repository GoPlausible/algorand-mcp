import { describeIf, testConfig } from '../helpers/testConfig.js';
import { getE2EAccount, invokeTool, parseToolResponse } from '../helpers/e2eSetup.js';

describeIf(testConfig.isCategoryEnabled('transaction'))('Transaction Tools (E2E)', () => {
  const account = getE2EAccount();

  describe('make_payment_txn + sign_transaction', () => {
    it('builds and signs a 0-amount self-payment', async () => {
      const txn = parseToolResponse(
        await invokeTool('make_payment_txn', {
          from: account.address,
          to: account.address,
          amount: 0,
          network: 'testnet',
        }),
      );
      expect(txn.type).toBe('pay');

      const signed = parseToolResponse(
        await invokeTool('sign_transaction', {
          transaction: txn,
          sk: account.secretKeyHex,
        }),
      );
      expect(signed.txID).toBeDefined();
      expect(signed.blob).toBeDefined();
    });
  });

  describe('make_asset_transfer_txn', () => {
    it('builds an asset opt-in transaction (0-amount self-transfer)', async () => {
      const txn = parseToolResponse(
        await invokeTool('make_asset_transfer_txn', {
          from: account.address,
          to: account.address,
          assetIndex: 10458941,
          amount: 0,
          network: 'testnet',
        }),
      );
      expect(txn.type).toBe('axfer');
    });
  });

  describe('assign_group_id', () => {
    it('assigns group ID to 2 transactions', async () => {
      const txn1 = parseToolResponse(
        await invokeTool('make_payment_txn', {
          from: account.address,
          to: account.address,
          amount: 0,
          network: 'testnet',
        }),
      );
      const txn2 = parseToolResponse(
        await invokeTool('make_payment_txn', {
          from: account.address,
          to: account.address,
          amount: 0,
          network: 'testnet',
        }),
      );

      const grouped = parseToolResponse(
        await invokeTool('assign_group_id', { transactions: [txn1, txn2] }),
      );
      expect(Array.isArray(grouped)).toBe(true);
      expect(grouped).toHaveLength(2);
    });
  });
});
