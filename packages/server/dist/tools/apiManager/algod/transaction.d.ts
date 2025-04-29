import type { PendingTransactionResponse, NodeStatusResponse, PendingTransactionsResponse } from 'algosdk/dist/types/client/v2/algod/models/types';
import type { SuggestedParamsWithMinFee } from 'algosdk/dist/types/types/transactions/base';
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
            maxTxns?: undefined;
            round?: undefined;
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
            txId?: undefined;
            maxTxns?: undefined;
            round?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            maxTxns: {
                type: string;
                description: string;
            };
            txId?: undefined;
            address?: undefined;
            round?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            txId?: undefined;
            address?: undefined;
            maxTxns?: undefined;
            round?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            round: {
                type: string;
                description: string;
            };
            txId?: undefined;
            address?: undefined;
            maxTxns?: undefined;
        };
        required: string[];
    };
})[];
export declare function getPendingTransaction(txId: string): Promise<PendingTransactionResponse>;
export declare function getPendingTransactionsByAddress(address: string): Promise<PendingTransactionsResponse>;
export declare function getPendingTransactions(maxTxns?: number): Promise<PendingTransactionsResponse>;
export declare function getTransactionParams(): Promise<SuggestedParamsWithMinFee>;
export declare function getNodeStatus(): Promise<NodeStatusResponse>;
export declare function getNodeStatusAfterBlock(round: number): Promise<NodeStatusResponse>;
export declare function handleTransactionTools(name: string, args: any): Promise<any>;
