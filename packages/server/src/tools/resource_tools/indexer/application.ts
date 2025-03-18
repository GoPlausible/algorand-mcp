import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { indexerClient } from '../../../algorand-client.js';
import type { 
  ApplicationResponse,
  ApplicationsResponse,
  ApplicationLogsResponse,
  Box
} from 'algosdk/dist/types/client/v2/indexer/models/types';
import algosdk from 'algosdk';

export const applicationTools = [
  {
    name: 'resource_tool_lookup_applications',
    description: 'Get application information from indexer',
    inputSchema: {
      type: 'object',
      properties: {
        appId: {
          type: 'integer',
          description: 'Application ID'
        }
      },
      required: ['appId']
    }
  },
  {
    name: 'resource_tool_lookup_application_logs',
    description: 'Get application log messages',
    inputSchema: {
      type: 'object',
      properties: {
        appId: {
          type: 'integer',
          description: 'Application ID'
        },
        limit: {
          type: 'integer',
          description: 'Maximum number of logs to return'
        },
        minRound: {
          type: 'integer',
          description: 'Only return logs after this round'
        },
        maxRound: {
          type: 'integer',
          description: 'Only return logs before this round'
        },
        txid: {
          type: 'string',
          description: 'Filter by transaction ID'
        },
        sender: {
          type: 'string',
          description: 'Filter by sender address'
        },
        nextToken: {
          type: 'string',
          description: 'Token for retrieving the next page of results'
        }
      },
      required: ['appId']
    }
  },
  {
    name: 'resource_tool_search_for_applications',
    description: 'Search for applications with various criteria',
    inputSchema: {
      type: 'object',
      properties: {
        limit: {
          type: 'integer',
          description: 'Maximum number of applications to return'
        },
        creator: {
          type: 'string',
          description: 'Filter by creator address'
        },
        nextToken: {
          type: 'string',
          description: 'Token for retrieving the next page of results'
        }
      }
    }
  },
  {
    name: 'resource_tool_lookup_application_box',
    description: 'Get application box by name',
    inputSchema: {
      type: 'object',
      properties: {
        appId: {
          type: 'integer',
          description: 'Application ID'
        },
        boxName: {
          type: 'string',
          description: 'Box name in format encoding:value. For ints use int:1234, for raw bytes use b64:A==, for strings use str:hello, for addresses use addr:XYZ...'
        }
      },
      required: ['appId', 'boxName']
    }
  },
  {
    name: 'resource_tool_lookup_application_boxes',
    description: 'Get all application boxes',
    inputSchema: {
      type: 'object',
      properties: {
        appId: {
          type: 'integer',
          description: 'Application ID'
        },
        maxBoxes: {
          type: 'integer',
          description: 'Maximum number of boxes to return'
        }
      },
      required: ['appId']
    }
  }
];

export async function lookupApplications(appId: number): Promise<ApplicationResponse> {
  try {
    console.log(`Looking up application info for ID ${appId}`);
    const response = await indexerClient.lookupApplications(appId).do() as ApplicationResponse;
    console.log('Application response:', JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error('Application lookup error:', error);
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to get application info: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export async function lookupApplicationLogs(appId: number, params?: {
  limit?: number;
  minRound?: number;
  maxRound?: number;
  txid?: string;
  sender?: string;
  nextToken?: string;
}): Promise<ApplicationLogsResponse> {
  try {
    console.log(`Looking up logs for application ${appId}`);
    let search = indexerClient.lookupApplicationLogs(appId);

    if (params?.limit) {
      search = search.limit(params.limit);
    }
    if (params?.minRound) {
      search = search.minRound(params.minRound);
    }
    if (params?.maxRound) {
      search = search.maxRound(params.maxRound);
    }
    if (params?.txid) {
      search = search.txid(params.txid);
    }
    if (params?.sender) {
      search = search.sender(params.sender);
    }
    if (params?.nextToken) {
      search = search.nextToken(params.nextToken);
    }

    const response = await search.do() as ApplicationLogsResponse;
    console.log('Application logs response:', JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error('Application logs lookup error:', error);
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to get application logs: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export async function searchForApplications(params?: {
  limit?: number;
  creator?: string;
  nextToken?: string;
}): Promise<ApplicationsResponse> {
  try {
    console.log('Searching applications with params:', params);
    let search = indexerClient.searchForApplications();

    if (params?.limit) {
      search = search.limit(params.limit);
    }
    if (params?.creator) {
      search = search.creator(params.creator);
    }
    if (params?.nextToken) {
      search = search.nextToken(params.nextToken);
    }

    const response = await search.do() as ApplicationsResponse;
    console.log('Search applications response:', JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error('Search applications error:', error);
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to search applications: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export async function getApplicationBoxByName(appId: number, boxNameWithEncoding: string): Promise<Box> {
  try {
    // Parse box name format encoding:value
    const [encoding, value] = boxNameWithEncoding.split(':');
    if (!encoding || !value) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        'Box name must be in format encoding:value'
      );
    }

    let boxName: Uint8Array;
    switch (encoding) {
      case 'str':
        boxName = new TextEncoder().encode(value);
        break;
      case 'int':
        let intValue = parseInt(value, 10);
        if (isNaN(intValue)) {
          throw new McpError(
            ErrorCode.InvalidRequest,
            'Invalid integer value for box name'
          );
        }
        boxName = new Uint8Array(8);
        for (let i = 0; i < 8; i++) {
          boxName[7 - i] = intValue & 0xff;
          intValue = intValue >> 8;
        }
        break;
      case 'b64':
        try {
          boxName = new Uint8Array(Buffer.from(value, 'base64'));
        } catch (error) {
          throw new McpError(
            ErrorCode.InvalidRequest,
            'Invalid base64 value for box name'
          );
        }
        break;
      case 'addr':
        if (!algosdk.isValidAddress(value)) {
          throw new McpError(
            ErrorCode.InvalidRequest,
            'Invalid address value for box name'
          );
        }
        boxName = new Uint8Array(algosdk.decodeAddress(value).publicKey);
        break;
      default:
        throw new McpError(
          ErrorCode.InvalidRequest,
          'Invalid encoding. Must be one of: str, int, b64, addr'
        );
    }

    console.log(`Box name decoded from ${encoding}:${value} to:`, boxName);
    const response = await indexerClient.lookupApplicationBoxByIDandName(appId, boxName).do() as Box;
    console.log('Box response:', JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error('Box fetch error:', error);
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to get application box: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export async function getApplicationBoxes(appId: number, maxBoxes?: number): Promise<any> {
  try {
    console.log(`Getting boxes for application ${appId}`);
    let search = indexerClient.searchForApplicationBoxes(appId);
    if (maxBoxes !== undefined) {
      search = search.limit(maxBoxes);
    }
    const response = await search.do();
    console.log('Application boxes response:', JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error('Application boxes fetch error:', error);
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to get application boxes: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export async function handleApplicationTools(name: string, args: any): Promise<any> {
  switch (name) {
    case 'resource_tool_lookup_applications': {
      const { appId } = args;
      const info = await lookupApplications(appId);
      return {
        content: [{
          type: 'text',
          text: JSON.stringify(info, null, 2)
        }]
      };
    }
    case 'resource_tool_lookup_application_logs': {
      const { appId, ...params } = args;
      const logs = await lookupApplicationLogs(appId, params);
      return {
        content: [{
          type: 'text',
          text: JSON.stringify(logs, null, 2)
        }]
      };
    }
    case 'resource_tool_search_for_applications': {
      const info = await searchForApplications(args);
      return {
        content: [{
          type: 'text',
          text: JSON.stringify(info, null, 2)
        }]
      };
    }
    case 'resource_tool_lookup_application_box': {
      const { appId, boxName } = args;
      const box = await getApplicationBoxByName(appId, boxName);
      return {
        content: [{
          type: 'text',
          text: JSON.stringify(box, null, 2)
        }]
      };
    }
    case 'resource_tool_lookup_application_boxes': {
      const { appId, maxBoxes } = args;
      const boxes = await getApplicationBoxes(appId, maxBoxes);
      return {
        content: [{
          type: 'text',
          text: JSON.stringify(boxes, null, 2)
        }]
      };
    }
    default:
      throw new McpError(
        ErrorCode.MethodNotFound,
        `Unknown tool: ${name}`
      );
  }
}
