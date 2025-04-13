import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { 
  transactionResources,
  transactionResourceSchemas,
  lookupTransactionByID,
  lookupAccountTransactions,
  searchForTransactions,
  handleTransactionResources
} from '../../../src/resources/indexer/transaction.js';
import { indexerClient } from '../../../src/algorand-client.js';

// Mock algosdk client
jest.mock('../../../src/algorand-client.js', () => ({
  indexerClient: {
    lookupTransactionByID: jest.fn(),
    lookupAccountTransactions: jest.fn(),
    searchForTransactions: jest.fn()
  },
  API_URIS: {
    TRANSACTION_DETAILS: 'algorand://transaction/{txid}',
    TRANSACTION_SEARCH: 'algorand://transactions/search'
  }
}));

describe('Indexer Transaction Resources', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Resource Definitions', () => {
    it('should define transaction resources', () => {
      expect(transactionResources).toHaveLength(2);
      expect(transactionResources.map(r => r.name)).toEqual([
        'Transaction Details',
        'Search Transactions'
      ]);
    });

    it('should define resource schemas', () => {
      expect(Object.keys(transactionResourceSchemas)).toHaveLength(2);
      expect(transactionResourceSchemas).toHaveProperty('algorand://transaction/{txid}');
      expect(transactionResourceSchemas).toHaveProperty('algorand://transactions/search');
    });
  });

  describe('Transaction Information', () => {
    const mockTxId = 'MOCK_TX_ID';
    const mockResponse = {
      transaction: {
        id: mockTxId,
        type: 'pay',
        sender: 'MOCK_SENDER',
        receiver: 'MOCK_RECEIVER',
        amount: 1000
      },
      currentRound: 1234
    };

    beforeEach(() => {
      (indexerClient.lookupTransactionByID as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should fetch transaction information', async () => {
      const result = await lookupTransactionByID(mockTxId);
      expect(result).toEqual(mockResponse);
      expect(indexerClient.lookupTransactionByID).toHaveBeenCalledWith(mockTxId);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      (indexerClient.lookupTransactionByID as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      await expect(lookupTransactionByID(mockTxId))
        .rejects
        .toThrow('Failed to get transaction: Network error');
    });
  });

  describe('Account Transactions', () => {
    const mockAddress = 'MOCK_ADDRESS';
    const mockResponse = {
      transactions: [{ id: 'txn1', type: 'pay' }],
      currentRound: 1234
    };

    beforeEach(() => {
      (indexerClient.lookupAccountTransactions as jest.Mock).mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        beforeTime: jest.fn().mockReturnThis(),
        afterTime: jest.fn().mockReturnThis(),
        minRound: jest.fn().mockReturnThis(),
        maxRound: jest.fn().mockReturnThis(),
        txType: jest.fn().mockReturnThis(),
        assetID: jest.fn().mockReturnThis(),
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should fetch account transactions', async () => {
      const result = await lookupAccountTransactions(mockAddress);
      expect(result).toEqual(mockResponse);
      expect(indexerClient.lookupAccountTransactions).toHaveBeenCalledWith(mockAddress);
    });

    it('should handle search parameters', async () => {
      const params = {
        limit: 10,
        beforeTime: '2023-01-01',
        afterTime: '2022-01-01',
        minRound: 1000,
        maxRound: 2000,
        txType: 'pay',
        assetId: 123
      };

      await lookupAccountTransactions(mockAddress, params);
      const mock = indexerClient.lookupAccountTransactions as jest.Mock;
      const chain = mock.mock.results[0].value;

      expect(chain.limit).toHaveBeenCalledWith(params.limit);
      expect(chain.beforeTime).toHaveBeenCalledWith(params.beforeTime);
      expect(chain.afterTime).toHaveBeenCalledWith(params.afterTime);
      expect(chain.minRound).toHaveBeenCalledWith(params.minRound);
      expect(chain.maxRound).toHaveBeenCalledWith(params.maxRound);
      expect(chain.txType).toHaveBeenCalledWith(params.txType);
      expect(chain.assetID).toHaveBeenCalledWith(params.assetId);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      (indexerClient.lookupAccountTransactions as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      await expect(lookupAccountTransactions(mockAddress))
        .rejects
        .toThrow('Failed to get account transactions: Network error');
    });
  });

  describe('Search Transactions', () => {
    const mockResponse = {
      transactions: [{ id: 'txn1', type: 'pay' }],
      currentRound: 1234
    };

    beforeEach(() => {
      (indexerClient.searchForTransactions as jest.Mock).mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        beforeTime: jest.fn().mockReturnThis(),
        afterTime: jest.fn().mockReturnThis(),
        minRound: jest.fn().mockReturnThis(),
        maxRound: jest.fn().mockReturnThis(),
        address: jest.fn().mockReturnThis(),
        addressRole: jest.fn().mockReturnThis(),
        txType: jest.fn().mockReturnThis(),
        assetID: jest.fn().mockReturnThis(),
        applicationID: jest.fn().mockReturnThis(),
        currencyGreaterThan: jest.fn().mockReturnThis(),
        currencyLessThan: jest.fn().mockReturnThis(),
        round: jest.fn().mockReturnThis(),
        nextToken: jest.fn().mockReturnThis(),
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should search transactions', async () => {
      const result = await searchForTransactions();
      expect(result).toEqual(mockResponse);
      expect(indexerClient.searchForTransactions).toHaveBeenCalled();
    });

    it('should handle search parameters', async () => {
      const params = {
        limit: 10,
        beforeTime: '2023-01-01',
        afterTime: '2022-01-01',
        minRound: 1000,
        maxRound: 2000,
        address: 'addr1',
        addressRole: 'sender',
        txType: 'pay',
        assetId: 123,
        applicationId: 456,
        currencyGreaterThan: 1000,
        currencyLessThan: 2000,
        round: 1234,
        nextToken: 'token123'
      };

      await searchForTransactions(params);
      const mock = indexerClient.searchForTransactions as jest.Mock;
      const chain = mock.mock.results[0].value;

      expect(chain.limit).toHaveBeenCalledWith(params.limit);
      expect(chain.beforeTime).toHaveBeenCalledWith(params.beforeTime);
      expect(chain.afterTime).toHaveBeenCalledWith(params.afterTime);
      expect(chain.minRound).toHaveBeenCalledWith(params.minRound);
      expect(chain.maxRound).toHaveBeenCalledWith(params.maxRound);
      expect(chain.address).toHaveBeenCalledWith(params.address);
      expect(chain.addressRole).toHaveBeenCalledWith(params.addressRole);
      expect(chain.txType).toHaveBeenCalledWith(params.txType);
      expect(chain.assetID).toHaveBeenCalledWith(params.assetId);
      expect(chain.applicationID).toHaveBeenCalledWith(params.applicationId);
      expect(chain.currencyGreaterThan).toHaveBeenCalledWith(params.currencyGreaterThan);
      expect(chain.currencyLessThan).toHaveBeenCalledWith(params.currencyLessThan);
      expect(chain.round).toHaveBeenCalledWith(params.round);
      expect(chain.nextToken).toHaveBeenCalledWith(params.nextToken);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      (indexerClient.searchForTransactions as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      await expect(searchForTransactions())
        .rejects
        .toThrow('Failed to search transactions: Network error');
    });
  });

  describe('Resource Handler', () => {
    const mockTxId = 'MOCK_TX_ID';

    beforeEach(() => {
      (indexerClient.lookupTransactionByID as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue({
          transaction: { id: mockTxId },
          currentRound: 1234
        })
      });
      (indexerClient.searchForTransactions as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue({
          transactions: [{ id: 'txn1' }],
          currentRound: 1234
        })
      });
    });

    it('should handle transaction details URI', async () => {
      const uri = `algorand://transaction/${mockTxId}`;
      const result = await handleTransactionResources(uri);
      expect(result).toHaveLength(1);
      expect(JSON.parse(result[0].text)).toHaveProperty('transaction');
      expect(JSON.parse(result[0].text)).toHaveProperty('currentRound');
    });

    it('should handle transaction search URI', async () => {
      const uri = 'algorand://transactions/search';
      const result = await handleTransactionResources(uri);
      expect(result).toHaveLength(1);
      expect(JSON.parse(result[0].text)).toHaveProperty('transactions');
      expect(JSON.parse(result[0].text)).toHaveProperty('currentRound');
    });

    it('should return empty array for unknown URI', async () => {
      const uri = 'algorand://unknown';
      const result = await handleTransactionResources(uri);
      expect(result).toHaveLength(0);
    });

    it('should handle errors with McpError', async () => {
      const error = new Error('Network error');
      (indexerClient.lookupTransactionByID as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      const uri = `algorand://transaction/${mockTxId}`;
      await expect(handleTransactionResources(uri))
        .rejects
        .toThrow(new McpError(ErrorCode.InternalError, 'Network error'));
    });
  });
});
