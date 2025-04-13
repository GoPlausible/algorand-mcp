import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Try both src and dist paths since we don't know which environment we're in
const SRC_DIR = path.join(__dirname.replace('dist', 'src'));
const DIST_DIR = __dirname;

// Import JSON files from taxonomy-categories directory
const categoriesDir = path.join(__dirname, 'taxonomy-categories');
const arcsJson = JSON.parse(await fs.readFile(path.join(categoriesDir, 'arcs.json'), 'utf8'));
const sdksJson = JSON.parse(await fs.readFile(path.join(categoriesDir, 'sdks.json'), 'utf8'));
const algokitJson = JSON.parse(await fs.readFile(path.join(categoriesDir, 'algokit.json'), 'utf8'));
const algokitUtilsJson = JSON.parse(await fs.readFile(path.join(categoriesDir, 'algokit-utils.json'), 'utf8'));
const tealscriptJson = JSON.parse(await fs.readFile(path.join(categoriesDir, 'tealscript.json'), 'utf8'));
const puyaJson = JSON.parse(await fs.readFile(path.join(categoriesDir, 'puya.json'), 'utf8'));
const liquidAuthJson = JSON.parse(await fs.readFile(path.join(categoriesDir, 'liquid-auth.json'), 'utf8'));
const clisJson = JSON.parse(await fs.readFile(path.join(categoriesDir, 'clis.json'), 'utf8'));
const nodesJson = JSON.parse(await fs.readFile(path.join(categoriesDir, 'nodes.json'), 'utf8'));
const pythonJson = JSON.parse(await fs.readFile(path.join(categoriesDir, 'python.json'), 'utf8'));
const detailsJson = JSON.parse(await fs.readFile(path.join(categoriesDir, 'details.json'), 'utf8'));
const developersJson = JSON.parse(await fs.readFile(path.join(categoriesDir, 'developers.json'), 'utf8'));

// Create taxonomy data structure
const taxonomyData: TaxonomyData = {
  categories: {
    arcs: {
      name: arcsJson.name,
      description: arcsJson.description,
      path: arcsJson.path,
      documents: arcsJson.documents,
      subcategories: arcsJson.subcategories
    },
    sdks: {
      name: sdksJson.name,
      description: sdksJson.description,
      path: sdksJson.path,
      documents: sdksJson.documents,
      subcategories: sdksJson.subcategories
    },
    algokit: {
      name: algokitJson.name,
      description: algokitJson.description,
      path: algokitJson.path,
      documents: algokitJson.documents,
      subcategories: algokitJson.subcategories
    },
    'algokit-utils': {
      name: algokitUtilsJson.name,
      description: algokitUtilsJson.description,
      path: algokitUtilsJson.path,
      documents: algokitUtilsJson.documents,
      subcategories: algokitUtilsJson.subcategories
    },
    tealscript: {
      name: tealscriptJson.name,
      description: tealscriptJson.description,
      path: tealscriptJson.path,
      documents: tealscriptJson.documents,
      subcategories: tealscriptJson.subcategories
    },
    puya: {
      name: puyaJson.name,
      description: puyaJson.description,
      path: puyaJson.path,
      documents: puyaJson.documents,
      subcategories: puyaJson.subcategories
    },
    'liquid-auth': {
      name: liquidAuthJson.name,
      description: liquidAuthJson.description,
      path: liquidAuthJson.path,
      documents: liquidAuthJson.documents,
      subcategories: liquidAuthJson.subcategories
    },
    python: {
      name: pythonJson.name,
      description: pythonJson.description,
      path: pythonJson.path,
      documents: pythonJson.documents,
      subcategories: pythonJson.subcategories
    },
    developers: {
      name: developersJson.name,
      description: developersJson.description,
      path: developersJson.path,
      documents: developersJson.documents,
      subcategories: developersJson.subcategories
    },
    clis: {
      name: clisJson.name,
      description: clisJson.description,
      path: clisJson.path,
      documents: clisJson.documents,
      subcategories: clisJson.subcategories
    },
    nodes: {
      name: nodesJson.name,
      description: nodesJson.description,
      path: nodesJson.path,
      documents: nodesJson.documents,
      subcategories: nodesJson.subcategories
    },
    details: {
      name: detailsJson.name,
      description: detailsJson.description,
      path: detailsJson.path,
      documents: detailsJson.documents,
      subcategories: detailsJson.subcategories
    }
  }
};


async function resolvePath(filePath: string): Promise<string> {
  console.log('MCP-RESOURCE: Resolving path for:', filePath);
  console.log('MCP-RESOURCE: SRC_DIR:', SRC_DIR);
  console.log('MCP-RESOURCE: DIST_DIR:', DIST_DIR);
  
  // Try src path first
  try {
    const srcPath = path.join(SRC_DIR, filePath);
    console.log('MCP-RESOURCE: Trying src path:', srcPath);
    await fs.access(srcPath);
    console.log('MCP-RESOURCE: Found file at src path');
    return srcPath;
  } catch (error) {
    console.log('MCP-RESOURCE: File not found in src path:', error);
    // If src path doesn't exist, try dist path
    const distPath = path.join(DIST_DIR, filePath);
    console.log('MCP-RESOURCE: Trying dist path:', distPath);
    try {
      await fs.access(distPath);
      console.log('MCP-RESOURCE: Found file at dist path');
      return distPath;
    } catch (error) {
      console.log('MCP-RESOURCE: File not found in dist path:', error);
      throw new McpError(
        ErrorCode.InvalidRequest,
        `File not found in either src or dist paths`
      );
    }
  }
}

interface TaxonomyDocument {
  name: string;
  description: string;
  content?: string;
  path: string;
}

interface TaxonomyCategory {
  name: string;
  description: string;
  path: string;
  documents?: TaxonomyDocument[];
  subcategories?: Record<string, TaxonomyCategory>;
}

interface TaxonomyData {
  categories: Record<string, TaxonomyCategory>;
}

/**
 * Find a specific document in the taxonomy
 * @param docPath Path to the document
 * @returns Document if found, undefined otherwise
 */
async function findDocument(docPath: string): Promise<TaxonomyDocument | undefined> {
  try {
    console.log('MCP-RESOURCE: Finding document:', docPath);
    const fullPath = await resolvePath(path.join('taxonomy', docPath));
    console.log('MCP-RESOURCE: Full document path:', fullPath);
    
    try {
      await fs.access(fullPath);
      console.log('MCP-RESOURCE: Document exists at:', fullPath);
    } catch (error) {
      console.log('MCP-RESOURCE: Document access error:', error);
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Document not found at ${fullPath}`
      );
    }
    
    const content = await fs.readFile(fullPath, 'utf8');
    const lines = content.split('\n');
    const firstLine = lines[0] || '';
    const description = firstLine.replace(/^#*\s*/, '');

    return {
      name: path.basename(docPath, '.md'),
      description,
      content,
      path: docPath
    };
  } catch (error) {
    console.error(`Failed to read document ${docPath}:`, error);
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to read document ${docPath}: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Handle knowledge-related resource requests
 * @param uri Resource URI
 * @returns Resource content
 */
export async function knowledgeResources(uri: string) {
  try {
    // Handle full taxonomy request
    

    // Handle category-specific taxonomy request
    console.log('MCP-RESOURCE: Checking URI:', uri);
    console.log('MCP-RESOURCE: Available categories:', Object.keys(taxonomyData.categories));
    const categoryMatch = uri.match(/^algorand:\/\/knowledge\/taxonomy\/([a-z-]+)$/);
    console.log('MCP-RESOURCE: Category match result:', categoryMatch);
    if (categoryMatch) {
      const category = categoryMatch[1];
      console.log('MCP-RESOURCE: Found category:', category);
      // Get category data from taxonomyData
      const categoryData = taxonomyData.categories[category];
      console.log('MCP-RESOURCE: Category data:', JSON.stringify(categoryData, null, 2));
      if (!categoryData) {
        throw new McpError(
          ErrorCode.InvalidRequest,
          `Category not found: ${category}`
        );
      }

      // Return category data
      return {
        contents: [{
          uri,
          mimeType: 'application/json',
          text: JSON.stringify({
            name: categoryData.name,
            description: categoryData.description,
            subcategories: categoryData.subcategories || {},
            documents: categoryData.documents || []
          })
        }]
      };
    }

    // List available taxonomy categories
    if (uri === 'algorand://knowledge/taxonomy/categories') {
      const categories = Object.keys(taxonomyData.categories).map(key => ({
        name: taxonomyData.categories[key].name,
        description: taxonomyData.categories[key].description,
        uri: `algorand://knowledge/taxonomy/${key}`
      }));

      return {
        contents: [{
          uri,
          mimeType: 'application/json',
          text: JSON.stringify({ categories })
        }]
      };
    }
    if (uri === 'algorand://knowledge/taxonomy') {
      return {
        contents: [{
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(taxonomyData)
        }]
      };
    }
    // Handle document requests
    const docMatch = uri.match(/^algorand:\/\/knowledge\/document\/(.+)$/);
    if (docMatch) {
      const docPath = decodeURIComponent(docMatch[1]);
      const document = await findDocument(docPath);
      if (!document) {
        throw new McpError(
          ErrorCode.InvalidRequest,
          `Document not found: ${docPath}`
        );
      }
      return {
        contents: [{
          uri,
          mimeType: 'text/markdown',
          text: document.content || ''
        }]
      };
    }

    throw new McpError(
      ErrorCode.InvalidRequest,
      `Invalid knowledge resource URI: ${uri}`
    );
  } catch (error: unknown) {
    if (error instanceof McpError) {
      throw error;
    }
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to handle knowledge resource: ${message}`
    );
  }
}
