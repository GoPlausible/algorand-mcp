import algosdk from 'algosdk';
import { indexerClient } from '../../algorand-client.js';
import { URI_TEMPLATES, mcpUriToEndpoint } from '../uri-config.js';
import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { ResourceContent, ResourceDefinition } from '../types.js';
import { 
  ApplicationResponse,
  ApplicationsResponse,
  ApplicationLogsResponse,
  Box
} from 'algosdk/dist/types/client/v2/indexer/models/types';

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
  [URI_TEMPLATES.INDEXER_APPLICATION]: {
    type: 'object',
    properties: {
      application: {
        type: 'string',
        description: 'Application information including global and local state'
      },
      currentRound: {
        type: 'string',
        description: 'The round at which this information was current'
      }
    }
  },
  [URI_TEMPLATES.INDEXER_APPLICATION_LOGS]: {
    type: 'object',
    properties: {
      logs: {
        type: 'string',
        description: 'Log messages generated by the application'
      },
      currentRound: {
        type: 'string',
        description: 'The round at which this information was current'
      }
    }
  },
  [URI_TEMPLATES.INDEXER_APPLICATION_BOX]: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Name of the box'
      },
      value: {
        type: 'string',
        description: 'Value stored in the box'
      }
    }
  },
  [URI_TEMPLATES.INDEXER_APPLICATION_BOXES]: {
    type: 'object',
    properties: {
      boxes: {
        type: 'string',
        description: 'List of application boxes'
      },
      nextToken: {
        type: 'string',
        description: 'Token for retrieving the next page of results'
      }
    }
  },
  [URI_TEMPLATES.INDEXER_APPLICATIONS]: {
    type: 'object',
    properties: {
      applications: {
        type: 'string',
        description: 'List of applications matching the search criteria'
      },
      currentRound: {
        type: 'string',
        description: 'The round at which this information was current'
      }
    }
  }
};

export const applicationResources: ResourceDefinition[] = [
  {
    uri: URI_TEMPLATES.INDEXER_APPLICATION,
    name: 'Application Details',
    description: 'Get application information from indexer',
    mimeType: 'application/json',
    schema: applicationResourceSchemas[URI_TEMPLATES.INDEXER_APPLICATION]
  },
  {
    uri: URI_TEMPLATES.INDEXER_APPLICATION_LOGS,
    name: 'Application Logs',
    description: 'Get application log messages',
    mimeType: 'application/json',
    schema: applicationResourceSchemas[URI_TEMPLATES.INDEXER_APPLICATION_LOGS]
  },
  {
    uri: URI_TEMPLATES.INDEXER_APPLICATION_BOX,
    name: 'Application Box',
    description: 'Get application box by name',
    mimeType: 'application/json',
    schema: applicationResourceSchemas[URI_TEMPLATES.INDEXER_APPLICATION_BOX]
  },
  {
    uri: URI_TEMPLATES.INDEXER_APPLICATION_BOXES,
    name: 'Application Boxes',
    description: 'Get all application boxes',
    mimeType: 'application/json',
    schema: applicationResourceSchemas[URI_TEMPLATES.INDEXER_APPLICATION_BOXES]
  },
  {
    uri: URI_TEMPLATES.INDEXER_APPLICATIONS,
    name: 'Search Applications',
    description: 'Search for applications with various criteria',
    mimeType: 'application/json',
    schema: applicationResourceSchemas[URI_TEMPLATES.INDEXER_APPLICATIONS]
  }
];

export async function lookupApplications(appId: number): Promise<ApplicationResponse> {
  try {
    const response = await indexerClient.lookupApplications(appId).do() as ApplicationResponse;
    return response;
  } catch (error) {
    throw new Error(`Failed to get application info: ${error instanceof Error ? error.message : String(error)}`);
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

    return await search.do() as ApplicationLogsResponse;
  } catch (error) {
    throw new Error(`Failed to get application logs: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function searchForApplications(params?: {
  limit?: number;
  creator?: string;
  nextToken?: string;
}): Promise<ApplicationsResponse> {
  try {
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

    return await search.do() as ApplicationsResponse;
  } catch (error) {
    throw new Error(`Failed to search applications: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function lookupApplicationBoxByIDandName(appId: number, boxName: string): Promise<Box> {
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
    const response = await indexerClient.lookupApplicationBoxByIDandName(appId, boxNameBytes).do() as Box;
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

export async function handleApplicationResources(uri: string): Promise<ResourceContent[]> {
  try {
    // Validate URI format
    if (!uri.startsWith('algorand://')) {
      return [];
    }

    let match;

    // Application details
    match = uri.match(/^algorand:\/\/indexer\/applications\/([^/]+)$/);
    if (match) {
      const appId = parseInt(match[1], 10);
      const info = await lookupApplications(appId);
      return [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify({
          application: info.application,
          currentRound: info.currentRound
        }, null, 2),
      }];
    }

    // Application logs
    match = uri.match(/^algorand:\/\/indexer\/applications\/([^/]+)\/logs$/);
    if (match) {
      const appId = Number(match[1]);
      const logs = await lookupApplicationLogs(appId);
      return [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify({
          logs: logs.logData,
          currentRound: logs.currentRound
        }, null, 2),
      }];
    }

    // Application boxes
    match = uri.match(/^algorand:\/\/indexer\/applications\/([^/]+)\/boxes$/);
    if (match) {
      const appId = Number(match[1]);
      const boxes = await indexerClient.searchForApplicationBoxes(appId).do();
      return [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(boxes, null, 2),
      }];
    }

    // Application box by name
    match = uri.match(/^algorand:\/\/indexer\/applications\/([^/]+)\/box\/([^/]+)$/);
    if (match) {
      const [, appId, encodedBoxName] = match;
      try {
        // Just decode the URI component - SDK will handle the box name format
        const boxName = decodeURIComponent(encodedBoxName);
        const box = await lookupApplicationBoxByIDandName(Number(appId), boxName);
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

    // Search applications
    match = uri.match(/^algorand:\/\/indexer\/applications$/);
    if (match) {
      const apps = await searchForApplications();
      return [{
        uri,
        mimeType: 'application/json',
        text: JSON.stringify({
          applications: apps.applications,
          currentRound: apps.currentRound
        }, null, 2),
      }];
    }

    return [];
  } catch (error) {
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to handle resource: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
