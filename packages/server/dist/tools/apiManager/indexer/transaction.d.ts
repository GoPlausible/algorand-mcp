import type { TransactionResponse, TransactionsResponse } from 'algosdk/dist/types/client/v2/indexer/models/types';
export declare const transactionTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            txId: {
                type: string;
                description: string;
            };
            address?: undefined;
            limit?: undefined;
            beforeTime?: undefined;
            afterTime?: undefined;
            minRound?: undefined;
            maxRound?: undefined;
            txType?: undefined;
            assetId?: undefined;
            addressRole?: undefined;
            applicationId?: undefined;
            currencyGreaterThan?: undefined;
            currencyLessThan?: undefined;
            round?: undefined;
            nextToken?: undefined;
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
            txType: {
                type: string;
                description: string;
            };
            assetId: {
                type: string;
                description: string;
            };
            txId?: undefined;
            addressRole?: undefined;
            applicationId?: undefined;
            currencyGreaterThan?: undefined;
            currencyLessThan?: undefined;
            round?: undefined;
            nextToken?: undefined;
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
            txType: {
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
            round: {
                type: string;
                description: string;
            };
            nextToken: {
                type: string;
                description: string;
            };
            txId?: undefined;
        };
        required?: undefined;
    };
})[];
export declare function lookupTransactionByID(txId: string): Promise<TransactionResponse>;
export declare function lookupAccountTransactions(address: string, params?: {
    limit?: number;
    beforeTime?: string;
    afterTime?: string;
    minRound?: number;
    maxRound?: number;
    txType?: string;
    assetId?: number;
}): Promise<TransactionsResponse>;
export declare function searchForTransactions(params?: {
    limit?: number;
    beforeTime?: string;
    afterTime?: string;
    minRound?: number;
    maxRound?: number;
    address?: string;
    addressRole?: string;
    txType?: string;
    assetId?: number;
    applicationId?: number;
    currencyGreaterThan?: number;
    currencyLessThan?: number;
    round?: number;
    nextToken?: string;
}): Promise<TransactionsResponse>;
export declare const handleTransactionTools: (args: any) => Promise<any>;
