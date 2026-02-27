import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { getAlgodClient, extractNetwork } from '../../../algorand-client.js';
import { withCommonParams } from '../../commonParams.js';
import type {
  Application,
  Box,
  BoxesResponse
} from 'algosdk/dist/types/client/v2/algod/models/types';
import algosdk from 'algosdk';

export const applicationTools = [
  {
    name: 'api_algod_get_application_by_id',
    description: 'Get application information',
    inputSchema: withCommonParams({
      type: 'object',
      properties: {
        appId: {
          type: 'integer',
          description: 'Application ID'
        }
      },
      required: ['appId']
    })
  },
  {
    name: 'api_algod_get_application_box',
    description: 'Get application box by name',
    inputSchema: withCommonParams({
      type: 'object',
      properties: {
        appId: {
          type: 'integer',
          description: 'Application ID'
        },
        boxName: {
          type: 'string',
          description: 'Box name. '
        }
      },
      required: ['appId', 'boxName']
    })
  },
  {
    name: 'api_algod_get_application_boxes',
    description: 'Get all application boxes',
    inputSchema: withCommonParams({
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
    })
  }
];

export async function getApplicationByID(appId: number, args: any): Promise<any> {
  try {
    const network = extractNetwork(args);
    const algodClient = getAlgodClient(network);

    console.error(`Fetching application info for ID ${appId}`);
    const response = await algodClient.getApplicationByID(appId).do() as any;
    console.error('Application response:', JSON.stringify(response, null, 2));
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

export async function getApplicationBoxByName(appId: number, boxName: string, args: any): Promise<Box> {
  try {
    const network = extractNetwork(args);
    const algodClient = getAlgodClient(network);

    const encoder = new TextEncoder();
    let boxNameBytes: Uint8Array;

    // Check if string is a valid number
    if (!isNaN(Number(boxName))) {
      boxNameBytes = encoder.encode(boxName);
    }
    // Check if string is a valid Algorand address
    else if (algosdk.isValidAddress(boxName)) {
      boxNameBytes = encoder.encode(boxName);
    }
    // Try to decode as base64, if it fails then treat as regular string
    else {
      try {
        // Test if the string is valid base64 by decoding and re-encoding
        const decoded = algosdk.base64ToBytes(boxName);
        const reencoded = algosdk.bytesToBase64(decoded);
        if (reencoded === boxName) {
          // Valid base64
          boxNameBytes = decoded;
        } else {
          boxNameBytes = encoder.encode(boxName);
        }
      } catch {
        // If base64 decoding fails, treat as regular string
        boxNameBytes = encoder.encode(boxName);
      }
    }

    console.error('Box name bytes:', boxNameBytes);
    const response = await algodClient.getApplicationBoxByName(appId, boxNameBytes).do() as Box;
    console.error('Box response:', JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error('Box fetch error:', error);
    console.error('Box name in error:', boxName);
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to get application box: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export async function getApplicationBoxes(appId: number, args: any, maxBoxes?: number): Promise<any> {
  try {
    const network = extractNetwork(args);
    const algodClient = getAlgodClient(network);

    console.error(`Fetching boxes for application ${appId}`);
    let search = algodClient.getApplicationBoxes(appId);
    if (maxBoxes !== undefined) {
      search = search.max(maxBoxes);
    }
    const response = await search.do() as BoxesResponse;
    console.error('Boxes response:', JSON.stringify(response, null, 2));
    // Ensure the response has the correct structure with boxes array
    return {
      boxes: response.boxes || []
    };
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
    case 'api_algod_get_application_by_id': {
      const { appId } = args;
      const info = await getApplicationByID(appId, args);
      return info;
    }
    case 'api_algod_get_application_box': {
      const { appId, boxName } = args;
      const box = await getApplicationBoxByName(appId, boxName, args);
      return box;
    }
    case 'api_algod_get_application_boxes': {
      const { appId, maxBoxes } = args;
      const boxes = await getApplicationBoxes(appId, args, maxBoxes);
      return boxes;
    }
    default:
      throw new McpError(
        ErrorCode.MethodNotFound,
        `Unknown tool: ${name}`
      );
  }
}
