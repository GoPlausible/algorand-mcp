import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { env } from '../../../env.js';
export const systemTools = [
    {
        name: 'api_ultrade_system_time',
        description: 'Get current system time',
        inputSchema: {
            type: 'object',
            properties: {}
        }
    },
    {
        name: 'api_ultrade_system_maintenance',
        description: 'Get system maintenance status',
        inputSchema: {
            type: 'object',
            properties: {}
        }
    },
    {
        name: 'api_ultrade_system_version',
        description: 'Get system version',
        inputSchema: {
            type: 'object',
            properties: {}
        }
    }
];
async function getSystemTime() {
    try {
        const response = await fetch(`${env.ultrade_api_url}/system/time`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new McpError(ErrorCode.InternalError, `Ultrade API error: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    }
    catch (error) {
        if (error instanceof McpError) {
            throw error;
        }
        throw new McpError(ErrorCode.InternalError, `Failed to get system time: ${error instanceof Error ? error.message : String(error)}`);
    }
}
async function getSystemMaintenance() {
    try {
        const response = await fetch(`${env.ultrade_api_url}/system/maintenance`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new McpError(ErrorCode.InternalError, `Ultrade API error: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    }
    catch (error) {
        if (error instanceof McpError) {
            throw error;
        }
        throw new McpError(ErrorCode.InternalError, `Failed to get system maintenance status: ${error instanceof Error ? error.message : String(error)}`);
    }
}
async function getSystemVersion() {
    try {
        const response = await fetch(`${env.ultrade_api_url}/system/version`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new McpError(ErrorCode.InternalError, `Ultrade API error: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    }
    catch (error) {
        if (error instanceof McpError) {
            throw error;
        }
        throw new McpError(ErrorCode.InternalError, `Failed to get system version: ${error instanceof Error ? error.message : String(error)}`);
    }
}
export async function handleSystemTools(args) {
    switch (args.name) {
        case 'api_ultrade_system_time':
            return await getSystemTime();
        case 'api_ultrade_system_maintenance':
            return await getSystemMaintenance();
        case 'api_ultrade_system_version':
            return await getSystemVersion();
        default:
            throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${args.name}`);
    }
}
