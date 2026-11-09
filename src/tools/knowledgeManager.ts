import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { withCommonParams } from './commonParams.js';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Knowledge documents live as flat files in this directory.
const TAXONOMY_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../resources/knowledge/taxonomy'
);

// Document keys use ':' as their separator (e.g. "arcs:specs:arc-0020.md"), but ':' is not
// allowed in Windows file names, so each document is stored under its key with every ':'
// replaced by '~' ("arcs~specs~arc-0020.md"). No key contains '~', so the mapping is reversible.
const KEY_SEPARATOR = ':';
const FILE_SEPARATOR = '~';

export function docKeyToFileName(key: string): string {
  return key.split(KEY_SEPARATOR).join(FILE_SEPARATOR);
}

export function fileNameToDocKey(fileName: string): string {
  return fileName.split(FILE_SEPARATOR).join(KEY_SEPARATOR);
}

// Allowlist of document keys: lowercased key -> actual file name, for the regular files in
// TAXONOMY_DIR, read once. Only file names from this map are ever read, so a key can never
// resolve outside the directory. Lookup ignores case (keys are unique when lowercased),
// matching how keys resolved on case-insensitive filesystems before.
let knownDocKeys: Promise<Map<string, string>> | null = null;

function getKnownDocKeys(): Promise<Map<string, string>> {
  if (!knownDocKeys) {
    knownDocKeys = fs.readdir(TAXONOMY_DIR, { withFileTypes: true })
      .then((entries) => new Map(
        entries
          .filter((e) => e.isFile())
          .map((e) => [fileNameToDocKey(e.name).toLowerCase(), e.name] as [string, string])
      ))
      .catch((error) => {
        knownDocKeys = null;
        console.error('[MCP Error] Knowledge taxonomy unavailable:', error);
        throw new McpError(ErrorCode.InternalError, 'Knowledge base is not available');
      });
  }
  return knownDocKeys;
}

// Tool schemas
export const knowledgeToolSchemas = {
  getKnowledgeDoc: {
    type: 'object',
    properties: {
      documents: {
        type: 'array',
        items: { type: 'string' },
        description: 'Array of document keys (e.g. ["arcs:specs:arc-0020.md"]), as listed by the algorand://knowledge resources.'
      }
    },
    required: ['documents']
  }
};

export class KnowledgeManager {
  static readonly knowledgeTools = [
    {
      name: 'get_knowledge_doc',
      description: 'Get markdown content for specified knowledge documents',
      inputSchema: withCommonParams(knowledgeToolSchemas.getKnowledgeDoc),
    }
  ];

  // Tool handlers
  static async handleTool(name: string, args: Record<string, unknown>) {
    try {
      switch (name) {
        case 'get_knowledge_doc':
          if (!Array.isArray(args.documents)) {
            throw new McpError(ErrorCode.InvalidParams, 'Documents array is required');
          }

          const knownKeys = await getKnownDocKeys();
          const results = await Promise.all(args.documents.map(async (docKey) => {
            if (typeof docKey !== 'string') {
              throw new McpError(ErrorCode.InvalidParams, 'Document key must be a string');
            }
            // Allowlist: only keys of files in the taxonomy directory are accepted.
            // Rejects "../" segments, absolute paths, on-disk file names and anything else.
            const fileName = knownKeys.get(docKey.toLowerCase());
            if (!fileName) {
              throw new McpError(ErrorCode.InvalidParams, `Unknown document key: ${docKey}`);
            }
            try {
              return await fs.readFile(path.join(TAXONOMY_DIR, fileName), 'utf-8');
            } catch (error) {
              console.error(`[MCP Error] Failed to read document ${docKey}:`, error);
              throw new McpError(ErrorCode.InternalError, `Failed to read document ${docKey}`);
            }
          }));

          return {
            content: [{
              type: 'text',
              text: JSON.stringify({ documents: results }, null, 2)
            }]
          };

        default:
          console.error(`[MCP Error] Unknown tool requested: ${name}`);
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Unknown tool: ${name}`
          );
      }
    } catch (error) {
      if (error instanceof McpError) {
        console.error(`[MCP Error] ${error.code}: ${error.message}`);
        throw error;
      }
      console.error('[MCP Error] Unexpected error:', error);
      throw new McpError(
        ErrorCode.InternalError,
        `Operation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}
