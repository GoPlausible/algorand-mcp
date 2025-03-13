import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { GeneralTransactionManager, generalTransactionTools } from '../../../src/tools/transactionManager/generalTransaction.js';
import algosdk from 'algosdk';
import type { Transaction } from 'algosdk';

// Mock algosdk
jest.mock('algosdk');

// Create mock functions
const mockTransaction = jest.fn().mockImplementation((txn: any) => ({
  ...txn,
  get_obj_for_encoding: () => txn,
}));

const mockAssignGroupID = jest.fn().mockImplementation((txns: any[]) => 
  txns.map(txn => ({
    ...txn,
    group: 'group1',
  }))
);

// Override mock implementations
(algosdk as any).Transaction = mockTransaction;
(algosdk as any).assignGroupID = mockAssignGroupID;

describe('GeneralTransactionManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Tool Schemas', () => {
    it('should have valid tool schemas', () => {
      expect(generalTransactionTools).toHaveLength(1);
      expect(generalTransactionTools.map((t: { name: string }) => t.name)).toEqual([
        'assign_group_id',
      ]);
    });
  });

  describe('Group ID Assignment', () => {
    const mockTxn1 = { type: 'pay', from: 'sender1' };
    const mockTxn2 = { type: 'pay', from: 'sender2' };
    const mockGroupedTxns = [
      { ...mockTxn1, group: 'group1' },
      { ...mockTxn2, group: 'group1' },
    ];

    beforeEach(() => {
      // Reset mock implementations
      mockTransaction.mockImplementation((txn: any) => ({
        ...txn,
        get_obj_for_encoding: () => txn,
      }));
      mockAssignGroupID.mockImplementation((txns: any[]) => 
        txns.map(txn => ({
          ...txn,
          group: 'group1',
        }))
      );
    });

    it('should assign group ID to transactions', async () => {
      const args = {
        transactions: [mockTxn1, mockTxn2],
      };

      const result = await GeneralTransactionManager.handleTool('assign_group_id', args);

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify(mockGroupedTxns, null, 2),
        }],
      });

      expect(mockTransaction).toHaveBeenCalledTimes(2);
      expect(mockTransaction).toHaveBeenCalledWith(mockTxn1);
      expect(mockTransaction).toHaveBeenCalledWith(mockTxn2);
      expect(mockAssignGroupID).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining(mockTxn1),
          expect.objectContaining(mockTxn2),
        ])
      );
    });

    it('should handle single transaction', async () => {
      const args = {
        transactions: [mockTxn1],
      };

      const result = await GeneralTransactionManager.handleTool('assign_group_id', args);

      expect(mockTransaction).toHaveBeenCalledTimes(1);
      expect(mockTransaction).toHaveBeenCalledWith(mockTxn1);
      expect(mockAssignGroupID).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining(mockTxn1),
        ])
      );
    });
  });

  describe('Error Handling', () => {
    it('should throw error for unknown tool', async () => {
      await expect(GeneralTransactionManager.handleTool('unknown_tool', {}))
        .rejects
        .toThrow(new McpError(ErrorCode.MethodNotFound, 'Unknown general transaction tool: unknown_tool'));
    });

    it('should throw error for missing transactions array', async () => {
      await expect(GeneralTransactionManager.handleTool('assign_group_id', {}))
        .rejects
        .toThrow(new McpError(ErrorCode.InvalidParams, 'Transactions array is required'));
    });

    it('should throw error for invalid transactions array', async () => {
      await expect(GeneralTransactionManager.handleTool('assign_group_id', {
        transactions: 'not-an-array'
      }))
        .rejects
        .toThrow(new McpError(ErrorCode.InvalidParams, 'Transactions array is required'));
    });

    it('should throw error for invalid transaction object', async () => {
      await expect(GeneralTransactionManager.handleTool('assign_group_id', {
        transactions: [null]
      }))
        .rejects
        .toThrow(new McpError(ErrorCode.InvalidParams, 'Each transaction must be a valid transaction object'));
    });

    it('should handle transaction creation errors', async () => {
      const error = new Error('Invalid transaction format');
      mockTransaction.mockImplementation(() => {
        throw error;
      });

      await expect(GeneralTransactionManager.handleTool('assign_group_id', {
        transactions: [{ type: 'invalid' }]
      }))
        .rejects
        .toThrow(new McpError(ErrorCode.InvalidParams, 'Failed to assign group ID: Invalid transaction format'));
    });

    it('should handle group ID assignment errors', async () => {
      // Reset Transaction mock to succeed
      mockTransaction.mockImplementation((txn: any) => ({
        ...txn,
        get_obj_for_encoding: () => txn,
      }));

      // Make assignGroupID throw
      const error = new Error('Group ID assignment failed');
      mockAssignGroupID.mockImplementation(() => {
        throw error;
      });

      await expect(GeneralTransactionManager.handleTool('assign_group_id', {
        transactions: [
          { type: 'pay', from: 'sender1' },
          { type: 'pay', from: 'sender2' }
        ]
      }))
        .rejects
        .toThrow(new McpError(ErrorCode.InvalidParams, 'Failed to assign group ID: Group ID assignment failed'));
    });
  });

  describe('Transaction Object Conversion', () => {
    beforeEach(() => {
      // Reset mock implementations
      mockTransaction.mockImplementation((txn: any) => ({
        ...txn,
        get_obj_for_encoding: () => txn,
      }));
      mockAssignGroupID.mockImplementation((txns: any[]) => 
        txns.map(txn => ({
          ...txn,
          group: 'group1',
        }))
      );
    });

    it('should convert transaction objects to Transaction instances', async () => {
      const mockTxn = {
        type: 'pay',
        from: 'sender',
        to: 'receiver',
        amount: 1000,
      };

      await GeneralTransactionManager.handleTool('assign_group_id', {
        transactions: [mockTxn, { ...mockTxn, from: 'sender2' }]
      });

      expect(mockTransaction).toHaveBeenCalledWith(mockTxn);
    });

    it('should preserve transaction properties after conversion', async () => {
      const mockTxn = {
        type: 'pay',
        from: 'sender',
        to: 'receiver',
        amount: 1000,
        note: new Uint8Array([1, 2, 3]),
        lease: new Uint8Array([4, 5, 6]),
      };

      const result = await GeneralTransactionManager.handleTool('assign_group_id', {
        transactions: [mockTxn, { ...mockTxn, from: 'sender2' }]
      });

      const resultTxn = JSON.parse(result.content[0].text)[0];
      expect(resultTxn).toEqual(expect.objectContaining({
        type: 'pay',
        from: 'sender',
        to: 'receiver',
        amount: 1000,
      }));
    });
  });
});
