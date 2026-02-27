import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { 
  applicationResources,
  applicationResourceSchemas,
  getApplicationByID,
  getApplicationBoxByName,
  getApplicationBoxes,
  handleApplicationResources
} from '../../../src/resources/algod/application.js';
import { algodClient } from '../../../src/algorand-client.js';

// Mock algosdk client
jest.mock('../../../src/algorand-client.js', () => ({
  algodClient: {
    getApplicationByID: jest.fn(),
    getApplicationBoxByName: jest.fn(),
    getApplicationBoxes: jest.fn()
  },
  API_URIS: {
    APPLICATION_INFO: 'algorand://app/{app-id}',
    APPLICATION_BOX: 'algorand://app/{app-id}/box/{name}',
    APPLICATION_BOXES: 'algorand://app/{app-id}/boxes'
  }
}));

describe('Algod Application Resources', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Resource Definitions', () => {
    it('should define application resources', () => {
      expect(applicationResources).toHaveLength(3);
      expect(applicationResources.map(r => r.name)).toEqual([
        'Application Info',
        'Application Box',
        'Application Boxes'
      ]);
    });

    it('should define resource schemas', () => {
      expect(Object.keys(applicationResourceSchemas)).toHaveLength(3);
      expect(applicationResourceSchemas).toHaveProperty('algorand://app/{app-id}');
      expect(applicationResourceSchemas).toHaveProperty('algorand://app/{app-id}/box/{name}');
      expect(applicationResourceSchemas).toHaveProperty('algorand://app/{app-id}/boxes');
    });
  });

  describe('Application Information', () => {
    const mockAppId = 123;
    const mockResponse = {
      id: mockAppId,
      params: {
        creator: 'MOCK_ADDRESS',
        approvalProgram: 'base64...',
        clearStateProgram: 'base64...'
      },
      createdAtRound: 1234
    };

    beforeEach(() => {
      (algodClient.getApplicationByID as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should fetch application information', async () => {
      const result = await getApplicationByID(mockAppId);
      expect(result).toEqual(mockResponse);
      expect(algodClient.getApplicationByID).toHaveBeenCalledWith(mockAppId);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      (algodClient.getApplicationByID as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      await expect(getApplicationByID(mockAppId))
        .rejects
        .toThrow('Failed to get application info: Network error');
    });
  });

  describe('Application Box', () => {
    const mockAppId = 123;
    const mockBoxName = new TextEncoder().encode('test-box');
    const mockResponse = {
      name: mockBoxName,
      value: new Uint8Array([1, 2, 3])
    };

    beforeEach(() => {
      (algodClient.getApplicationBoxByName as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should fetch box by name', async () => {
      const result = await getApplicationBoxByName(mockAppId, mockBoxName);
      expect(result).toEqual(mockResponse);
      expect(algodClient.getApplicationBoxByName).toHaveBeenCalledWith(mockAppId, mockBoxName);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      (algodClient.getApplicationBoxByName as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      await expect(getApplicationBoxByName(mockAppId, mockBoxName))
        .rejects
        .toThrow('Failed to get application box: Network error');
    });
  });

  describe('Application Boxes', () => {
    const mockAppId = 123;
    const mockResponse = {
      boxes: [
        { name: new Uint8Array([1]), value: new Uint8Array([1]) },
        { name: new Uint8Array([2]), value: new Uint8Array([2]) }
      ]
    };

    beforeEach(() => {
      (algodClient.getApplicationBoxes as jest.Mock).mockReturnValue({
        max: jest.fn().mockReturnThis(),
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should fetch all boxes', async () => {
      const result = await getApplicationBoxes(mockAppId);
      expect(result).toEqual(mockResponse);
      expect(algodClient.getApplicationBoxes).toHaveBeenCalledWith(mockAppId);
    });

    it('should handle max boxes parameter', async () => {
      const maxBoxes = 10;
      await getApplicationBoxes(mockAppId, maxBoxes);
      const mockMax = (algodClient.getApplicationBoxes as jest.Mock).mock.results[0].value.max;
      expect(mockMax).toHaveBeenCalledWith(maxBoxes);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      (algodClient.getApplicationBoxes as jest.Mock).mockReturnValue({
        max: jest.fn().mockReturnThis(),
        do: jest.fn().mockRejectedValue(error)
      });

      await expect(getApplicationBoxes(mockAppId))
        .rejects
        .toThrow('Failed to get application boxes: Network error');
    });
  });

  describe('Resource Handler', () => {
    const mockAppId = 123;
    const mockResponse = {
      id: mockAppId,
      params: {
        creator: 'MOCK_ADDRESS'
      },
      createdAtRound: 1234
    };

    beforeEach(() => {
      (algodClient.getApplicationByID as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should handle application info URI', async () => {
      const uri = `algorand://app/${mockAppId}`;
      const result = await handleApplicationResources(uri);
      expect(result).toHaveLength(1);
      expect(JSON.parse(result[0].text)).toEqual(mockResponse);
    });

    it('should return empty array for unknown URI', async () => {
      const uri = 'algorand://unknown';
      const result = await handleApplicationResources(uri);
      expect(result).toHaveLength(0);
    });

    it('should handle errors with McpError', async () => {
      const error = new Error('Network error');
      (algodClient.getApplicationByID as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      const uri = `algorand://app/${mockAppId}`;
      await expect(handleApplicationResources(uri))
        .rejects
        .toThrow(new McpError(ErrorCode.InternalError, 'Network error'));
    });

    it('should handle box URI', async () => {
      const uri = `algorand://app/${mockAppId}/box/test-box`;
      const mockBoxResponse = {
        name: new TextEncoder().encode('test-box'),
        value: new Uint8Array([1, 2, 3])
      };

      (algodClient.getApplicationBoxByName as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue(mockBoxResponse)
      });

      const result = await handleApplicationResources(uri);
      expect(result).toHaveLength(1);
      expect(JSON.parse(result[0].text)).toEqual({
        box: {
          name: Array.from(mockBoxResponse.name),
          value: Array.from(mockBoxResponse.value)
        },
        currentRound: 0
      });
    });

    it('should handle boxes URI', async () => {
      const uri = `algorand://app/${mockAppId}/boxes`;
      const mockBoxesResponse = {
        boxes: [
          { name: new Uint8Array([1]), value: new Uint8Array([1]) }
        ]
      };

      (algodClient.getApplicationBoxes as jest.Mock).mockReturnValue({
        max: jest.fn().mockReturnThis(),
        do: jest.fn().mockResolvedValue(mockBoxesResponse)
      });

      const result = await handleApplicationResources(uri);
      expect(result).toHaveLength(1);
      expect(JSON.parse(result[0].text)).toEqual({
        boxes: mockBoxesResponse.boxes.map(box => ({
          name: Array.from(box.name)
        })),
        currentRound: 0
      });
    });
  });
});
