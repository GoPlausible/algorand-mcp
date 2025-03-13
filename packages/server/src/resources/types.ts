import { ServerResult } from '@modelcontextprotocol/sdk/types.js';

export type ResourceContent = {
  uri: string;
  text: string;
  mimeType?: string;
};

export type ResourceResponse = {
  contents: ResourceContent[];
  [key: string]: unknown;
  _meta?: { [key: string]: unknown };
} & ServerResult;

export type ResourceDefinition = {
  uri: string;
  name: string;
  description: string;
  mimeType?: string;
  schema?: {
    type: string;
    properties: {
      [key: string]: {
        type: string;
        description: string;
      };
    };
  };
};

export type ResourceHandler = (uri: string) => Promise<ResourceContent[]>;
