import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { algodClient } from '../../algorand-client.js';
import { URI_TEMPLATES, mcpUriToEndpoint } from '../uri-config.js';
import type { 
  Application,
  Box,
  BoxesResponse
} from 'algosdk/dist/types/client/v2/algod/models/types';
import { ResourceContent, ResourceDefinition } from '../types.js';
import algosdk from 'algosdk';

type ResourceSchema = {
  type: string;
  properties: {
    [key: string]: {
      type: string;
      description: string;
    };
  };
};

export const applicationResourceSchemas: { [key: string]: ResourceSchema } = {
  [URI_TEMPLATES.ALGOD_APPLICATION]: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'Application ID'
      },
      params: {
        type: 'object',
        description: 'Application parameters including programs, creator, and state'
      }
    }
  },
  [URI_TEMPLATES.ALGOD_APPLICATION_BOX]: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Box name Buffer'
      },
      value: {
        type: 'array',
        description: 'Box value as byte array'
      },
      round: {
        type: 'integer',
        description: 'The round for which this information is relevant'
      }
    }
  },
  [URI_TEMPLATES.ALGOD_APPLICATION_BOXES]: {
    type: 'object',
    properties: {
      boxes: {
        type: 'array',
        description: 'List of application boxes'
      }
    }
  }
};

export const applicationResources: ResourceDefinition[] = [
  {
    uri: URI_TEMPLATES.ALGOD_APPLICATION,
    name: 'Application Info',
    description: 'Get application information',
    mimeType: 'application/json',
    schema: applicationResourceSchemas[URI_TEMPLATES.ALGOD_APPLICATION]
  },
  {
    uri: URI_TEMPLATES.ALGOD_APPLICATION_BOX,
    name: 'Application Box',
    description: 'Get application box by name',
    mimeType: 'application/json',
    schema: applicationResourceSchemas[URI_TEMPLATES.ALGOD_APPLICATION_BOX]
  },
  {
    uri: URI_TEMPLATES.ALGOD_APPLICATION_BOXES,
    name: 'Application Boxes',
    description: 'Get all application boxes',
    mimeType: 'application/json',
    schema: applicationResourceSchemas[URI_TEMPLATES.ALGOD_APPLICATION_BOXES]
  }
];

export async function getApplicationByID(appId: number): Promise<Application> {
  try {
    console.log(`Fetching application info for ID ${appId}`);
    const response = await algodClient.getApplicationByID(appId).do() as Application;
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

export async function getApplicationBoxByName(appId: number, boxName: string): Promise<Box> {
  try {
    console.log(`Fetching box for application ${appId} with name:`, boxName);
    
    let boxNameBytes: Buffer;

    // Check if string is a valid number
    if (!isNaN(Number(boxName))) {
      boxNameBytes = Buffer.from(boxName);
    }
    // Check if string is a valid Algorand address
    else if (algosdk.isValidAddress(boxName)) {
      boxNameBytes = Buffer.from(boxName);
    }
    // Try to decode as base64, if it fails then treat as regular string
    else {
      try {
        // Test if the string is valid base64
        Buffer.from(boxName, 'base64').toString('base64');
        // If we get here, it's valid base64
        boxNameBytes = Buffer.from(boxName, 'base64');
      } catch {
        // If base64 decoding fails, treat as regular string
        boxNameBytes = Buffer.from(boxName);
      }
    }

    console.log('Box name bytes:', boxNameBytes);
    const response = await algodClient.getApplicationBoxByName(appId, boxNameBytes).do() as Box;
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


export async function handleApplicationResources(uri: string): Promise<ResourceContent[]> {
  try {
    // Validate URI format
    if (!uri.startsWith('algorand://')) {
      throw new McpError(ErrorCode.InvalidRequest, 'URI must start with algorand://');
    }

    // Application info
    let match = uri.match(/^algorand:\/\/algod\/applications\/([^/]+)$/);
    if (match) {
      const appId = parseInt(match[1], 10);
      const info = await getApplicationByID(appId);
      return [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(info, null, 2),
      }];
    }

    // Application box
    match = uri.match(/^algorand:\/\/algod\/applications\/([^/]+)\/box\/([^/]+)$/);
    if (match) {
      const [, appId, encodedBoxName] = match;
      try {
        // Just decode the URI component - SDK will handle the box name format
        const boxName = decodeURIComponent(encodedBoxName);
        const box = await getApplicationBoxByName(parseInt(appId, 10), boxName);
        return [{
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(box, null, 2),
        }];
      } catch (error) {
        if (error instanceof McpError) {
          throw error;
        }
        throw new McpError(
          ErrorCode.InvalidRequest,
          `Invalid box name format: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }

    // Application boxes
    match = uri.match(/^algorand:\/\/algod\/applications\/([^/]+)\/boxes$/);
    if (match) {
      const appId = parseInt(match[1], 10);
      const boxes = await getApplicationBoxes(appId);
      return [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(boxes, null, 2),
      }];
    }

    throw new McpError(ErrorCode.InvalidRequest, 'Invalid application URI format');
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to handle resource: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
