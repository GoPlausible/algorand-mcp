import { Transaction } from 'algosdk';
export type WalletType = 'pera' | 'defly' | 'daffi' | 'local';
export interface WalletConnectOptions {
    network: 'mainnet' | 'testnet';
}
export declare class AlgorandMcpClient {
    private peraWallet;
    private deflyWallet;
    private daffiWallet;
    private activeWallet;
    private localWallet;
    private connectedAccounts;
    private activeWalletType;
    constructor(options: WalletConnectOptions);
    connect(walletType: WalletType): Promise<string[]>;
    makeTransactionSigner: (txnGroup: Uint8Array[], indexesToSign: number[]) => Promise<() => Promise<any[]>>;
    getAccounts(): string[];
    signTransactions(transactions: {
        txn: Transaction;
        message?: string;
    }[][]): Promise<Uint8Array[][]>;
    signTransaction(txn: Transaction): Promise<Uint8Array>;
    disconnect(): Promise<void>;
    reconnectSession(walletType: WalletType): Promise<string[]>;
}
