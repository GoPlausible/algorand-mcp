import type { AssetResponse, AssetsResponse, AssetBalancesResponse, TransactionsResponse } from 'algosdk/dist/types/client/v2/indexer/models/types';
export declare const assetTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            assetId: {
                type: string;
                description: string;
            };
            limit?: undefined;
            currencyGreaterThan?: undefined;
            currencyLessThan?: undefined;
            nextToken?: undefined;
            address?: undefined;
            beforeTime?: undefined;
            afterTime?: undefined;
            minRound?: undefined;
            maxRound?: undefined;
            addressRole?: undefined;
            excludeCloseTo?: undefined;
            txid?: undefined;
            creator?: undefined;
            name?: undefined;
            unit?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            assetId: {
                type: string;
                description: string;
            };
            limit: {
                type: string;
                description: string;
            };
            currencyGreaterThan: {
                type: string;
                description: string;
            };
            currencyLessThan: {
                type: string;
                description: string;
            };
            nextToken: {
                type: string;
                description: string;
            };
            address: {
                type: string;
                description: string;
            };
            beforeTime?: undefined;
            afterTime?: undefined;
            minRound?: undefined;
            maxRound?: undefined;
            addressRole?: undefined;
            excludeCloseTo?: undefined;
            txid?: undefined;
            creator?: undefined;
            name?: undefined;
            unit?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            assetId: {
                type: string;
                description: string;
            };
            limit: {
                type: string;
                description: string;
            };
            beforeTime: {
                type: string;
                description: string;
            };
            afterTime: {
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
            address: {
                type: string;
                description: string;
            };
            addressRole: {
                type: string;
                description: string;
            };
            excludeCloseTo: {
                type: string;
                description: string;
            };
            nextToken: {
                type: string;
                description: string;
            };
            txid: {
                type: string;
                description: string;
            };
            currencyGreaterThan?: undefined;
            currencyLessThan?: undefined;
            creator?: undefined;
            name?: undefined;
            unit?: undefined;
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
            name: {
                type: string;
                description: string;
            };
            unit: {
                type: string;
                description: string;
            };
            assetId: {
                type: string;
                description: string;
            };
            nextToken: {
                type: string;
                description: string;
            };
            currencyGreaterThan?: undefined;
            currencyLessThan?: undefined;
            address?: undefined;
            beforeTime?: undefined;
            afterTime?: undefined;
            minRound?: undefined;
            maxRound?: undefined;
            addressRole?: undefined;
            excludeCloseTo?: undefined;
            txid?: undefined;
        };
        required?: undefined;
    };
})[];
export declare function lookupAssetByID(assetId: number): Promise<AssetResponse>;
export declare function lookupAssetBalances(assetId: number, params?: {
    limit?: number;
    currencyGreaterThan?: number;
    currencyLessThan?: number;
    nextToken?: string;
    address?: string;
}): Promise<AssetBalancesResponse>;
export declare function lookupAssetTransactions(assetId: number, params?: {
    limit?: number;
    beforeTime?: string;
    afterTime?: string;
    minRound?: number;
    maxRound?: number;
    address?: string;
    addressRole?: string;
    excludeCloseTo?: boolean;
    nextToken?: string;
    txid?: string;
}): Promise<TransactionsResponse>;
export declare function searchForAssets(params?: {
    limit?: number;
    creator?: string;
    name?: string;
    unit?: string;
    assetId?: number;
    nextToken?: string;
}): Promise<AssetsResponse>;
export declare const handleAssetTools: (args: any) => Promise<any>;
