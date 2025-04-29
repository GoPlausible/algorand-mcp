import type { AccountResponse, AccountsResponse, ApplicationLocalStatesResponse, AssetHoldingsResponse, ApplicationsResponse } from 'algosdk/dist/types/client/v2/indexer/models/types';
export declare const accountTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            address: {
                type: string;
                description: string;
            };
            limit?: undefined;
            assetId?: undefined;
            nextToken?: undefined;
            applicationId?: undefined;
            currencyGreaterThan?: undefined;
            currencyLessThan?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            address: {
                type: string;
                description: string;
            };
            limit: {
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
            applicationId?: undefined;
            currencyGreaterThan?: undefined;
            currencyLessThan?: undefined;
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
            assetId: {
                type: string;
                description: string;
            };
            applicationId: {
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
            address?: undefined;
        };
        required?: undefined;
    };
})[];
export declare function lookupAccountByID(address: string): Promise<AccountResponse>;
export declare function lookupAccountAssets(address: string, params?: {
    limit?: number;
    assetId?: number;
    nextToken?: string;
}): Promise<AssetHoldingsResponse>;
export declare function lookupAccountAppLocalStates(address: string): Promise<ApplicationLocalStatesResponse>;
export declare function lookupAccountCreatedApplications(address: string): Promise<ApplicationsResponse>;
export declare function searchAccounts(params?: {
    limit?: number;
    assetId?: number;
    applicationId?: number;
    currencyGreaterThan?: number;
    currencyLessThan?: number;
    nextToken?: string;
}): Promise<AccountsResponse>;
export declare const handleAccountTools: (args: any) => Promise<any>;
