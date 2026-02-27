import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { 
  accountResources,
  accountResourceSchemas,
  lookupAccountByID,
  lookupAccountTransactions,
  lookupAccountAssets,
  searchAccounts,
  handleAccountResources
} from '../../../src/resources/indexer/account.js';
import { indexerClient } from '../../../src/algorand-client.js';

// Mock algosdk client
jest.mock('../../../src/algorand-client.js', () => ({
  indexerClient: {
    lookupAccountByID: jest.fn(),
    lookupAccountTransactions: jest.fn(),
    lookupAccountAssets: jest.fn(),
    searchAccounts: jest.fn()
  },
  API_URIS: {
    TRANSACTION_HISTORY: 'algorand://account/{address}/transactions',
    ASSET_HOLDINGS: 'algorand://account/{address}/assets'
  }
}));

describe('Indexer Account Resources', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Resource Definitions', () => {
    it('should define account resources', () => {
      expect(accountResources).toHaveLength(2);
      expect(accountResources.map(r => r.name)).toEqual([
        'Transaction History',
        'Asset Holdings'
      ]);
    });

    it('should define resource schemas', () => {
      expect(Object.keys(accountResourceSchemas)).toHaveLength(2);
      expect(accountResourceSchemas).toHaveProperty('algorand://account/{address}/transactions');
      expect(accountResourceSchemas).toHaveProperty('algorand://account/{address}/assets');
    });
  });

  describe('Account Information', () => {
    const mockAddress = 'MOCK_ADDRESS';
    const mockResponse = {
      account: {
        address: mockAddress,
        amount: 1000000,
        assets: []
      },
      currentRound: 1234
    };

    beforeEach(() => {
      (indexerClient.lookupAccountByID as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should fetch account information', async () => {
      const result = await lookupAccountByID(mockAddress);
      expect(result).toEqual(mockResponse);
      expect(indexerClient.lookupAccountByID).toHaveBeenCalledWith(mockAddress);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      (indexerClient.lookupAccountByID as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      await expect(lookupAccountByID(mockAddress))
        .rejects
        .toThrow('Failed to get account info: Network error');
    });
  });

  describe('Account Transactions', () => {
    const mockAddress = 'MOCK_ADDRESS';
    const mockResponse = {
      transactions: [{ id: 'txn1' }],
      currentRound: 1234
    };

    beforeEach(() => {
      (indexerClient.lookupAccountTransactions as jest.Mock).mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        beforeTime: jest.fn().mockReturnThis(),
        afterTime: jest.fn().mockReturnThis(),
        nextToken: jest.fn().mockReturnThis(),
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
        nextToken: 'token123'
      };

      await lookupAccountTransactions(mockAddress, params);
      const mock = indexerClient.lookupAccountTransactions as jest.Mock;
      const chain = mock.mock.results[0].value;

      expect(chain.limit).toHaveBeenCalledWith(params.limit);
      expect(chain.beforeTime).toHaveBeenCalledWith(params.beforeTime);
      expect(chain.afterTime).toHaveBeenCalledWith(params.afterTime);
      expect(chain.nextToken).toHaveBeenCalledWith(params.nextToken);
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

  describe('Account Assets', () => {
    const mockAddress = 'MOCK_ADDRESS';
    const mockResponse = {
      assets: [{ assetId: 1, amount: 100 }],
      currentRound: 1234
    };

    beforeEach(() => {
      (indexerClient.lookupAccountAssets as jest.Mock).mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        assetId: jest.fn().mockReturnThis(),
        nextToken: jest.fn().mockReturnThis(),
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should fetch account assets', async () => {
      const result = await lookupAccountAssets(mockAddress);
      expect(result).toEqual(mockResponse);
      expect(indexerClient.lookupAccountAssets).toHaveBeenCalledWith(mockAddress);
    });

    it('should handle search parameters', async () => {
      const params = {
        limit: 10,
        assetId: 123,
        nextToken: 'token123'
      };

      await lookupAccountAssets(mockAddress, params);
      const mock = indexerClient.lookupAccountAssets as jest.Mock;
      const chain = mock.mock.results[0].value;

      expect(chain.limit).toHaveBeenCalledWith(params.limit);
      expect(chain.assetId).toHaveBeenCalledWith(params.assetId);
      expect(chain.nextToken).toHaveBeenCalledWith(params.nextToken);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      (indexerClient.lookupAccountAssets as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      await expect(lookupAccountAssets(mockAddress))
        .rejects
        .toThrow('Failed to get account assets: Network error');
    });
  });

  describe('Search Accounts', () => {
    const mockResponse = {
      accounts: [{ address: 'addr1' }],
      currentRound: 1234
    };

    beforeEach(() => {
      (indexerClient.searchAccounts as jest.Mock).mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        assetID: jest.fn().mockReturnThis(),
        applicationID: jest.fn().mockReturnThis(),
        currencyGreaterThan: jest.fn().mockReturnThis(),
        currencyLessThan: jest.fn().mockReturnThis(),
        nextToken: jest.fn().mockReturnThis(),
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should search accounts', async () => {
      const result = await searchAccounts();
      expect(result).toEqual(mockResponse);
      expect(indexerClient.searchAccounts).toHaveBeenCalled();
    });

    it('should handle search parameters', async () => {
      const params = {
        limit: 10,
        assetId: 123,
        applicationId: 456,
        currencyGreaterThan: 1000,
        currencyLessThan: 2000,
        nextToken: 'token123'
      };

      await searchAccounts(params);
      const mock = indexerClient.searchAccounts as jest.Mock;
      const chain = mock.mock.results[0].value;

      expect(chain.limit).toHaveBeenCalledWith(params.limit);
      expect(chain.assetID).toHaveBeenCalledWith(params.assetId);
      expect(chain.applicationID).toHaveBeenCalledWith(params.applicationId);
      expect(chain.currencyGreaterThan).toHaveBeenCalledWith(params.currencyGreaterThan);
      expect(chain.currencyLessThan).toHaveBeenCalledWith(params.currencyLessThan);
      expect(chain.nextToken).toHaveBeenCalledWith(params.nextToken);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      (indexerClient.searchAccounts as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      await expect(searchAccounts())
        .rejects
        .toThrow('Failed to search accounts: Network error');
    });
  });

  describe('Resource Handler', () => {
    const mockAddress = 'MOCK_ADDRESS';

    beforeEach(() => {
      (indexerClient.lookupAccountTransactions as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue({
          transactions: [],
          currentRound: 1234
        })
      });
      (indexerClient.lookupAccountAssets as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue({
          assets: [],
          currentRound: 1234
        })
      });
    });

    it('should handle transaction history URI', async () => {
      const uri = `algorand://account/${mockAddress}/transactions`;
      const result = await handleAccountResources(uri);
      expect(result).toHaveLength(1);
      expect(JSON.parse(result[0].text)).toHaveProperty('transactions');
      expect(JSON.parse(result[0].text)).toHaveProperty('currentRound');
    });

    it('should handle asset holdings URI', async () => {
      const uri = `algorand://account/${mockAddress}/assets`;
      const result = await handleAccountResources(uri);
      expect(result).toHaveLength(1);
      expect(JSON.parse(result[0].text)).toHaveProperty('assets');
      expect(JSON.parse(result[0].text)).toHaveProperty('currentRound');
    });

    it('should return empty array for unknown URI', async () => {
      const uri = 'algorand://unknown';
      const result = await handleAccountResources(uri);
      expect(result).toHaveLength(0);
    });

    it('should handle errors with McpError', async () => {
      const error = new Error('Network error');
      (indexerClient.lookupAccountTransactions as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      const uri = `algorand://account/${mockAddress}/transactions`;
      await expect(handleAccountResources(uri))
        .rejects
        .toThrow(new McpError(ErrorCode.InternalError, 'Failed to get transaction history: Network error'));
    });
  });
});
