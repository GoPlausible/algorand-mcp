import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { algodClient } from '../../../algorand-client.js';
import type { 
  Application,
  Box,
  BoxesResponse
} from 'algosdk/dist/types/client/v2/algod/models/types';
import algosdk from 'algosdk';

export const applicationTools = [
  {
    name: 'resource_algod_get_application_by_id',
    description: 'Get application information',
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
    name: 'resource_algod_get_application_box',
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
    name: 'resource_algod_get_application_boxes',
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

export async function getApplicationByID(appId: number): Promise<any> {
  try {
    console.log(`Fetching application info for ID ${appId}`);
    const response = await algodClient.getApplicationByID(appId).do() as any;
    console.log('Application response:', JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error('Application fetch error:', error);
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to get application info: ${error instanceof Error ? error.message : String(error)}`
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
    const response = await algodClient.getApplicationBoxByName(appId, boxName).do() as Box;
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

export async function getApplicationBoxes(appId: number, maxBoxes?: number): Promise<BoxesResponse> {
  try {
    console.log(`Fetching boxes for application ${appId}`);
    let search = algodClient.getApplicationBoxes(appId);
    if (maxBoxes !== undefined) {
      search = search.max(maxBoxes);
    }
    const response = await search.do() as BoxesResponse;
    console.log('Boxes response:', JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error('Boxes fetch error:', error);
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
    case 'resource_algod_get_application_by_id': {
      const { appId } = args;
      const info = await getApplicationByID(appId);
      return info;
    }
    case 'resource_algod_get_application_box': {
      const { appId, boxName } = args;
      const box = await getApplicationBoxByName(appId, boxName);
      return box;
    }
    case 'resource_algod_get_application_boxes': {
      const { appId, maxBoxes } = args;
      const boxes = await getApplicationBoxes(appId, maxBoxes);
      return boxes;
    }
    default:
      throw new McpError(
        ErrorCode.MethodNotFound,
        `Unknown tool: ${name}`
      );
  }
}
