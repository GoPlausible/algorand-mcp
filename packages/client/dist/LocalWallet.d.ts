import { Transaction } from 'algosdk';
export declare class LocalWallet {
    private fsPromises;
    private path;
    private connectedAddress;
    private isBrowser;
    constructor();
    private initNodeModules;
    private listStoredAccounts;
    private storeMnemonic;
    private retrieveMnemonic;
    connect(): Promise<string[]>;
    reconnectSession(): Promise<string[]>;
    disconnect(): Promise<void>;
    makeTransactionSigner(): Promise<(txnGroup: Transaction[], indexesToSign: number[]) => Promise<Uint8Array[]>>;
    signTransactions(transactions: {
        txn: Transaction;
        message?: string;
    }[][]): Promise<Uint8Array[][]>;
    signTransaction(transactions: {
        txn: Transaction;
        message?: string;
    }[]): Promise<Uint8Array[]>;
}
