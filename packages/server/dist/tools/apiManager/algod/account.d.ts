import type { Account, AccountApplicationResponse, AccountAssetResponse } from 'algosdk/dist/types/client/v2/algod/models/types';
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
            appId?: undefined;
            assetId?: undefined;
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
            appId: {
                type: string;
                description: string;
            };
            assetId?: undefined;
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
            assetId: {
                type: string;
                description: string;
            };
            appId?: undefined;
        };
        required: string[];
    };
})[];
export declare function getAccountInfo(address: string): Promise<Account>;
export declare function getAccountApplicationInfo(address: string, appId: number): Promise<AccountApplicationResponse>;
export declare function getAccountAssetInfo(address: string, assetId: number): Promise<AccountAssetResponse>;
export declare function handleAccountTools(name: string, args: any): Promise<any>;
