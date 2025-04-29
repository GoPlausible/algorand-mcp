import type { Asset } from 'algosdk/dist/types/client/v2/algod/models/types';
export declare const assetTools: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            assetId: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
}[];
export declare function getAssetByID(assetId: number): Promise<Asset>;
export declare function handleAssetTools(name: string, args: any): Promise<any>;
