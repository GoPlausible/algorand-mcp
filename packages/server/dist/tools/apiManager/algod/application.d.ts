import type { Box } from 'algosdk/dist/types/client/v2/algod/models/types';
export declare const applicationTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            appId: {
                type: string;
                description: string;
            };
            boxName?: undefined;
            maxBoxes?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            appId: {
                type: string;
                description: string;
            };
            boxName: {
                type: string;
                description: string;
            };
            maxBoxes?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            appId: {
                type: string;
                description: string;
            };
            maxBoxes: {
                type: string;
                description: string;
            };
            boxName?: undefined;
        };
        required: string[];
    };
})[];
export declare function getApplicationByID(appId: number): Promise<any>;
export declare function getApplicationBoxByName(appId: number, boxName: string): Promise<Box>;
export declare function getApplicationBoxes(appId: number, maxBoxes?: number): Promise<any>;
export declare function handleApplicationTools(name: string, args: any): Promise<any>;
