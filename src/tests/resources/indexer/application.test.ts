import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { 
  applicationResources,
  applicationResourceSchemas,
  lookupApplications,
  lookupApplicationLogs,
  searchForApplications,
  handleApplicationResources
} from '../../../src/resources/indexer/application.js';
import { indexerClient } from '../../../src/algorand-client.js';

// Mock algosdk client
jest.mock('../../../src/algorand-client.js', () => ({
  indexerClient: {
    lookupApplications: jest.fn(),
    lookupApplicationLogs: jest.fn(),
    searchForApplications: jest.fn()
  },
  API_URIS: {
    APPLICATION_STATE: 'algorand://app/{app-id}/state'
  }
}));

describe('Indexer Application Resources', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Resource Definitions', () => {
    it('should define application resources', () => {
      expect(applicationResources).toHaveLength(1);
      expect(applicationResources[0].name).toBe('Application State');
    });

    it('should define resource schemas', () => {
      expect(Object.keys(applicationResourceSchemas)).toHaveLength(1);
      expect(applicationResourceSchemas).toHaveProperty('algorand://app/{app-id}/state');
    });
  });

  describe('Application Information', () => {
    const mockAppId = 123;
    const mockResponse = {
      application: {
        id: mockAppId,
        params: {
          creator: 'MOCK_ADDRESS',
          approvalProgram: 'base64...',
          clearStateProgram: 'base64...',
          globalState: []
        }
      },
      currentRound: 1234
    };

    beforeEach(() => {
      (indexerClient.lookupApplications as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should fetch application information', async () => {
      const result = await lookupApplications(mockAppId);
      expect(result).toEqual(mockResponse);
      expect(indexerClient.lookupApplications).toHaveBeenCalledWith(mockAppId);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      (indexerClient.lookupApplications as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      await expect(lookupApplications(mockAppId))
        .rejects
        .toThrow('Failed to get application info: Network error');
    });
  });

  describe('Application Logs', () => {
    const mockAppId = 123;
    const mockResponse = {
      logs: [{ txid: 'txn1', log: 'base64...' }],
      currentRound: 1234
    };

    beforeEach(() => {
      (indexerClient.lookupApplicationLogs as jest.Mock).mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        minRound: jest.fn().mockReturnThis(),
        maxRound: jest.fn().mockReturnThis(),
        txid: jest.fn().mockReturnThis(),
        sender: jest.fn().mockReturnThis(),
        nextToken: jest.fn().mockReturnThis(),
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should fetch application logs', async () => {
      const result = await lookupApplicationLogs(mockAppId);
      expect(result).toEqual(mockResponse);
      expect(indexerClient.lookupApplicationLogs).toHaveBeenCalledWith(mockAppId);
    });

    it('should handle search parameters', async () => {
      const params = {
        limit: 10,
        minRound: 1000,
        maxRound: 2000,
        txid: 'txn1',
        sender: 'addr1',
        nextToken: 'token123'
      };

      await lookupApplicationLogs(mockAppId, params);
      const mock = indexerClient.lookupApplicationLogs as jest.Mock;
      const chain = mock.mock.results[0].value;

      expect(chain.limit).toHaveBeenCalledWith(params.limit);
      expect(chain.minRound).toHaveBeenCalledWith(params.minRound);
      expect(chain.maxRound).toHaveBeenCalledWith(params.maxRound);
      expect(chain.txid).toHaveBeenCalledWith(params.txid);
      expect(chain.sender).toHaveBeenCalledWith(params.sender);
      expect(chain.nextToken).toHaveBeenCalledWith(params.nextToken);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      (indexerClient.lookupApplicationLogs as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      await expect(lookupApplicationLogs(mockAppId))
        .rejects
        .toThrow('Failed to get application logs: Network error');
    });
  });

  describe('Search Applications', () => {
    const mockResponse = {
      applications: [{ id: 1, params: { creator: 'addr1' } }],
      currentRound: 1234
    };

    beforeEach(() => {
      (indexerClient.searchForApplications as jest.Mock).mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        creator: jest.fn().mockReturnThis(),
        nextToken: jest.fn().mockReturnThis(),
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should search applications', async () => {
      const result = await searchForApplications();
      expect(result).toEqual(mockResponse);
      expect(indexerClient.searchForApplications).toHaveBeenCalled();
    });

    it('should handle search parameters', async () => {
      const params = {
        limit: 10,
        creator: 'addr1',
        nextToken: 'token123'
      };

      await searchForApplications(params);
      const mock = indexerClient.searchForApplications as jest.Mock;
      const chain = mock.mock.results[0].value;

      expect(chain.limit).toHaveBeenCalledWith(params.limit);
      expect(chain.creator).toHaveBeenCalledWith(params.creator);
      expect(chain.nextToken).toHaveBeenCalledWith(params.nextToken);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      (indexerClient.searchForApplications as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      await expect(searchForApplications())
        .rejects
        .toThrow('Failed to search applications: Network error');
    });
  });

  describe('Resource Handler', () => {
    const mockAppId = 123;
    const mockResponse = {
      application: {
        id: mockAppId,
        params: {
          creator: 'MOCK_ADDRESS',
          globalState: []
        }
      },
      currentRound: 1234
    };

    beforeEach(() => {
      (indexerClient.lookupApplications as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should handle application state URI', async () => {
      const uri = `algorand://app/${mockAppId}/state`;
      const result = await handleApplicationResources(uri);
      expect(result).toHaveLength(1);
      expect(JSON.parse(result[0].text)).toHaveProperty('application');
      expect(JSON.parse(result[0].text)).toHaveProperty('currentRound');
    });

    it('should return empty array for unknown URI', async () => {
      const uri = 'algorand://unknown';
      const result = await handleApplicationResources(uri);
      expect(result).toHaveLength(0);
    });

    it('should handle errors with McpError', async () => {
      const error = new Error('Network error');
      (indexerClient.lookupApplications as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      const uri = `algorand://app/${mockAppId}/state`;
      await expect(handleApplicationResources(uri))
        .rejects
        .toThrow(new McpError(ErrorCode.InternalError, 'Network error'));
    });
  });
});
