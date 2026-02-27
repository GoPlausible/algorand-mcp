import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load JSON files
const loadJson = (filename: string) => 
  JSON.parse(fs.readFileSync(path.join(__dirname, 'taxonomy-categories', filename), 'utf-8'));

const arcs = loadJson('arcs.json');
const sdks = loadJson('sdks.json');
const algokit = loadJson('algokit.json');
const algokitUtils = loadJson('algokit-utils.json');
const tealscript = loadJson('tealscript.json');
const puya = loadJson('puya.json');
const liquidAuth = loadJson('liquid-auth.json');
const python = loadJson('python.json');
const developers = loadJson('developers.json');
const clis = loadJson('clis.json');
const nodes = loadJson('nodes.json');
const details = loadJson('details.json');

// Common schema for category resources
const categorySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    subcategories: { type: 'object' },
    documents: { 
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          path: { type: 'string' }
        }
      }
    }
  }
};

// Resource definitions
const resourceDefinitions = [
  {
    uri: 'algorand://knowledge/taxonomy',
    name: 'Algorand Knowledge Full Taxonomy',
    description: 'Markdown-based knowledge taxonomy',
    schema: {
      type: 'object',
      properties: {
        categories: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              description: { type: 'string' },
              content: { type: 'string' }
            }
          }
        }
      }
    }
  },
  {
    uri: 'algorand://knowledge/taxonomy/arcs',
    name: arcs.name,
    description: arcs.description,
    schema: categorySchema
  },
  {
    uri: 'algorand://knowledge/taxonomy/sdks',
    name: sdks.name,
    description: sdks.description,
    schema: categorySchema
  },
  {
    uri: 'algorand://knowledge/taxonomy/algokit',
    name: algokit.name,
    description: algokit.description,
    schema: categorySchema
  },
  {
    uri: 'algorand://knowledge/taxonomy/algokit-utils',
    name: algokitUtils.name,
    description: algokitUtils.description,
    schema: categorySchema
  },
  {
    uri: 'algorand://knowledge/taxonomy/tealscript',
    name: tealscript.name,
    description: tealscript.description,
    schema: categorySchema
  },
  {
    uri: 'algorand://knowledge/taxonomy/puya',
    name: puya.name,
    description: puya.description,
    schema: categorySchema
  },
  {
    uri: 'algorand://knowledge/taxonomy/liquid-auth',
    name: liquidAuth.name,
    description: liquidAuth.description,
    schema: categorySchema
  },
  {
    uri: 'algorand://knowledge/taxonomy/python',
    name: python.name,
    description: python.description,
    schema: categorySchema
  },
  {
    uri: 'algorand://knowledge/taxonomy/developers',
    name: developers.name,
    description: developers.description,
    schema: categorySchema
  },
  {
    uri: 'algorand://knowledge/taxonomy/clis',
    name: clis.name,
    description: clis.description,
    schema: categorySchema
  },
  {
    uri: 'algorand://knowledge/taxonomy/nodes',
    name: nodes.name,
    description: nodes.description,
    schema: categorySchema
  },
  {
    uri: 'algorand://knowledge/taxonomy/details',
    name: details.name,
    description: details.description,
    schema: categorySchema
  }
];

// Resource module implementation
export const knowledgeResources = {
  canHandle: (uri: string): boolean => {
    return uri.startsWith('algorand://knowledge/');
  },

  handle: async (uri: string) => {
    // Category
    const categoryMatch = uri.match(/^algorand:\/\/knowledge\/taxonomy\/([^/]+)$/);
    if (categoryMatch) {
      const category = categoryMatch[1];
      const categoryData = {
        arcs, sdks, algokit, 'algokit-utils': algokitUtils,
        tealscript, puya, 'liquid-auth': liquidAuth, python,
        developers, clis, nodes, details
      }[category];

      if (!categoryData) {
        throw new McpError(
          ErrorCode.InvalidRequest,
          `Unknown category: ${category}`
        );
      }

      return {
        contents: [{
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(categoryData, null, 2)
        }]
      };
    }

    // Full taxonomy
    if (uri === 'algorand://knowledge/taxonomy') {
      return {
        contents: [{
          uri,
          mimeType: 'application/json',
          text: JSON.stringify({
            categories: [
              arcs, sdks, algokit, algokitUtils, tealscript, puya,
              liquidAuth, python, developers, clis, nodes, details
            ]
          }, null, 2)
        }]
      };
    }

    throw new McpError(
      ErrorCode.InvalidRequest,
      `Invalid knowledge URI: ${uri}`
    );
  },

  getResourceDefinitions: () => resourceDefinitions
};
