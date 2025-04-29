import type { ApplicationResponse, ApplicationsResponse, ApplicationLogsResponse, Box } from 'algosdk/dist/types/client/v2/indexer/models/types';
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
            limit?: undefined;
            minRound?: undefined;
            maxRound?: undefined;
            txid?: undefined;
            sender?: undefined;
            nextToken?: undefined;
            creator?: undefined;
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
            limit: {
                type: string;
                description: string;
            };
            minRound: {
                type: string;
                description: string;
            };
            maxRound: {
                type: string;
                description: string;
            };
            txid: {
                type: string;
                description: string;
            };
            sender: {
                type: string;
                description: string;
            };
            nextToken: {
                type: string;
                description: string;
            };
            creator?: undefined;
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
            limit: {
                type: string;
                description: string;
            };
            creator: {
                type: string;
                description: string;
            };
            nextToken: {
                type: string;
                description: string;
            };
            appId?: undefined;
            minRound?: undefined;
            maxRound?: undefined;
            txid?: undefined;
            sender?: undefined;
            boxName?: undefined;
            maxBoxes?: undefined;
        };
        required?: undefined;
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
            limit?: undefined;
            minRound?: undefined;
            maxRound?: undefined;
            txid?: undefined;
            sender?: undefined;
            nextToken?: undefined;
            creator?: undefined;
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
            limit?: undefined;
            minRound?: undefined;
            maxRound?: undefined;
            txid?: undefined;
            sender?: undefined;
            nextToken?: undefined;
            creator?: undefined;
            boxName?: undefined;
        };
        required: string[];
    };
})[];
export declare function lookupApplications(appId: number): Promise<ApplicationResponse>;
export declare function lookupApplicationLogs(appId: number, params?: {
    limit?: number;
    minRound?: number;
    maxRound?: number;
    txid?: string;
    sender?: string;
    nextToken?: string;
}): Promise<ApplicationLogsResponse>;
export declare function searchForApplications(params?: {
    limit?: number;
    creator?: string;
    nextToken?: string;
}): Promise<ApplicationsResponse>;
export declare function lookupApplicationBoxByIDandName(appId: number, boxName: string): Promise<Box>;
export declare function searchForApplicationBoxes(appId: number, maxBoxes?: number): Promise<any>;
export declare const handleApplicationTools: (args: any) => Promise<any>;
