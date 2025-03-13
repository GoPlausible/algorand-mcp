import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { AccountTransactionManager, accountTransactionTools } from '../../../src/tools/transactionManager/accountTransactions.js';
import { algodClient } from '../../../src/algorand-client.js';
import algosdk from 'algosdk';

// Mock algosdk
jest.mock('algosdk', () => ({
  makePaymentTxnWithSuggestedParamsFromObject: jest.fn(),
  makeKeyRegistrationTxnWithSuggestedParamsFromObject: jest.fn(),
}));

// Mock algodClient
jest.mock('../../../src/algorand-client.js', () => ({
  algodClient: {
    getTransactionParams: jest.fn().mockReturnValue({
      do: jest.fn().mockResolvedValue({
        firstRound: 1000,
        lastRound: 2000,
        genesisHash: 'hash',
        genesisID: 'testnet-v1.0',
        fee: 1000,
        flatFee: true,
      }),
    }),
  },
}));

describe('AccountTransactionManager', () => {
  const mockSuggestedParams = {
    firstRound: 1000,
    lastRound: 2000,
    genesisHash: 'hash',
    genesisID: 'testnet-v1.0',
    fee: 1000,
    flatFee: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (algodClient.getTransactionParams as jest.Mock)().do.mockResolvedValue(mockSuggestedParams);
  });

  describe('Tool Schemas', () => {
    it('should have valid tool schemas', () => {
      expect(accountTransactionTools).toHaveLength(2);
      expect(accountTransactionTools.map((t: { name: string }) => t.name)).toEqual([
        'make_payment_txn',
        'make_keyreg_txn',
      ]);
    });
  });

  describe('Payment Transactions', () => {
    const mockPaymentTxn = { type: 'pay', from: 'sender', to: 'receiver' };

    beforeEach(() => {
      (algosdk.makePaymentTxnWithSuggestedParamsFromObject as jest.Mock).mockReturnValue(mockPaymentTxn);
    });

    it('should create a basic payment transaction', async () => {
      const args = {
        from: 'sender',
        to: 'receiver',
        amount: 1000,
      };

      const result = await AccountTransactionManager.handleTool('make_payment_txn', args);

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify(mockPaymentTxn, null, 2),
        }],
      });

      expect(algosdk.makePaymentTxnWithSuggestedParamsFromObject).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'sender',
          to: 'receiver',
          amount: 1000,
          suggestedParams: expect.objectContaining(mockSuggestedParams),
        })
      );
    });

    it('should create a payment transaction with optional parameters', async () => {
      const args = {
        from: 'sender',
        to: 'receiver',
        amount: 1000,
        note: 'test note',
        closeRemainderTo: 'close-to',
        rekeyTo: 'rekey-to',
      };

      const result = await AccountTransactionManager.handleTool('make_payment_txn', args);

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify(mockPaymentTxn, null, 2),
        }],
      });

      expect(algosdk.makePaymentTxnWithSuggestedParamsFromObject).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'sender',
          to: 'receiver',
          amount: 1000,
          note: new TextEncoder().encode('test note'),
          closeRemainderTo: 'close-to',
          rekeyTo: 'rekey-to',
          suggestedParams: expect.objectContaining(mockSuggestedParams),
        })
      );
    });

    it('should throw error for missing required parameters', async () => {
      await expect(AccountTransactionManager.handleTool('make_payment_txn', {}))
        .rejects
        .toThrow(new McpError(ErrorCode.InvalidParams, 'Invalid payment transaction parameters'));
    });
  });

  describe('Key Registration Transactions', () => {
    const mockKeyRegTxn = { type: 'keyreg', from: 'sender' };

    beforeEach(() => {
      (algosdk.makeKeyRegistrationTxnWithSuggestedParamsFromObject as jest.Mock).mockReturnValue(mockKeyRegTxn);
    });

    it('should create a basic key registration transaction', async () => {
      const args = {
        from: 'sender',
        voteKey: 'vote-key',
        selectionKey: 'selection-key',
        stateProofKey: 'stateproof-key',
        voteFirst: 1000,
        voteLast: 2000,
        voteKeyDilution: 10,
      };

      const result = await AccountTransactionManager.handleTool('make_keyreg_txn', args);

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify(mockKeyRegTxn, null, 2),
        }],
      });

      expect(algosdk.makeKeyRegistrationTxnWithSuggestedParamsFromObject).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'sender',
          voteKey: 'vote-key',
          selectionKey: 'selection-key',
          stateProofKey: 'stateproof-key',
          voteFirst: 1000,
          voteLast: 2000,
          voteKeyDilution: 10,
          suggestedParams: expect.objectContaining(mockSuggestedParams),
        })
      );
    });

    it('should create a key registration transaction with optional parameters', async () => {
      const args = {
        from: 'sender',
        voteKey: 'vote-key',
        selectionKey: 'selection-key',
        stateProofKey: 'stateproof-key',
        voteFirst: 1000,
        voteLast: 2000,
        voteKeyDilution: 10,
        nonParticipation: true,
        note: 'test note',
        rekeyTo: 'rekey-to',
      };

      const result = await AccountTransactionManager.handleTool('make_keyreg_txn', args);

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify(mockKeyRegTxn, null, 2),
        }],
      });

      expect(algosdk.makeKeyRegistrationTxnWithSuggestedParamsFromObject).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'sender',
          voteKey: 'vote-key',
          selectionKey: 'selection-key',
          stateProofKey: 'stateproof-key',
          voteFirst: 1000,
          voteLast: 2000,
          voteKeyDilution: 10,
          nonParticipation: true,
          note: new TextEncoder().encode('test note'),
          rekeyTo: 'rekey-to',
          suggestedParams: expect.objectContaining(mockSuggestedParams),
        })
      );
    });

    it('should throw error for missing required parameters', async () => {
      await expect(AccountTransactionManager.handleTool('make_keyreg_txn', {}))
        .rejects
        .toThrow(new McpError(ErrorCode.InvalidParams, 'Invalid key registration parameters'));
    });
  });

  describe('Error Handling', () => {
    it('should throw error for unknown tool', async () => {
      await expect(AccountTransactionManager.handleTool('unknown_tool', {}))
        .rejects
        .toThrow(new McpError(ErrorCode.MethodNotFound, 'Unknown account transaction tool: unknown_tool'));
    });

    it('should handle algod client errors', async () => {
      const error = new Error('Network error');
      (algodClient.getTransactionParams as jest.Mock)().do.mockRejectedValue(error);

      await expect(AccountTransactionManager.handleTool('make_payment_txn', {
        from: 'sender',
        to: 'receiver',
        amount: 1000,
      }))
        .rejects
        .toThrow(error);
    });

    it('should handle transaction creation errors', async () => {
      const error = new Error('Invalid parameters');
      (algosdk.makePaymentTxnWithSuggestedParamsFromObject as jest.Mock).mockImplementation(() => {
        throw error;
      });

      await expect(AccountTransactionManager.handleTool('make_payment_txn', {
        from: 'sender',
        to: 'receiver',
        amount: 1000,
      }))
        .rejects
        .toThrow(error);
    });
  });
});
