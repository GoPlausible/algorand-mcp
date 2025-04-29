import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { walletResources } from './wallet/index.js';
import { knowledgeResources } from './knowledge/index.js';
// Resource modules registry
const resourceModules = [
    walletResources,
    knowledgeResources
];
export class ResourceManager {
    // Get all resource definitions from all modules
    static get resources() {
        return resourceModules.flatMap(module => module.getResourceDefinitions());
    }
    // Get schemas for all resources
    static get schemas() {
        return this.resources.reduce((acc, resource) => ({
            ...acc,
            [resource.uri]: resource.schema
        }), {});
    }
    // Handle resource request
    static async handleResource(uri) {
        // Find module that can handle this URI
        const module = resourceModules.find(m => m.canHandle(uri));
        if (!module) {
            throw new McpError(ErrorCode.InvalidRequest, `No module found to handle resource: ${uri}`);
        }
        try {
            return await module.handle(uri);
        }
        catch (error) {
            if (error instanceof McpError) {
                throw error;
            }
            const message = error instanceof Error ? error.message : 'Unknown error';
            throw new McpError(ErrorCode.InternalError, `Failed to handle resource: ${message}`);
        }
    }
}
