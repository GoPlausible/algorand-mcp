import { PeraWalletConnect } from '@perawallet/connect';
import { DeflyWalletConnect } from '@blockshake/defly-connect';
import { DaffiWalletConnect } from '@daffiwallet/connect';
import algosdk, { Transaction } from 'algosdk';
import { LocalWallet } from './LocalWallet.js';

export type WalletType = 'pera' | 'defly' | 'daffi' | 'local';

export interface WalletConnectOptions {
  network: 'mainnet' | 'testnet';
}

interface WalletProvider {
  connect(): Promise<string[]>;
  reconnectSession(): Promise<string[]>;
  disconnect(): Promise<void>;
  signTransactions(transactions: { txn: Transaction; message?: string }[][]): Promise<Uint8Array[][]>;
}

export class AlgorandMcpClient {
  private peraWallet: PeraWalletConnect;
  private deflyWallet: DeflyWalletConnect;
  private daffiWallet: DaffiWalletConnect;
  private activeWallet: WalletProvider | null = null;
  private localWallet: LocalWallet;
  private connectedAccounts: string[] = [];
  private activeWalletType: WalletType | null = null;

  constructor(options: WalletConnectOptions) {
    this.localWallet = new LocalWallet();
    this.peraWallet = new PeraWalletConnect({
      chainId: options.network === 'mainnet' ? 416001 : 416002
    });
    this.deflyWallet = new DeflyWalletConnect({
      chainId: options.network === 'mainnet' ? 416001 : 416002
    });
    this.daffiWallet = new DaffiWalletConnect({
      chainId: options.network === 'mainnet' ? 416001 : 416002
    });
  }

  async connect(walletType: WalletType): Promise<string[]> {
    try {
      let accounts: string[] = [];
      
      switch (walletType) {
        case 'local':
          accounts = await this.localWallet.connect();
          this.activeWallet = this.localWallet;
          break;
        case 'pera':
          accounts = await this.peraWallet.connect();
          this.activeWallet = this.peraWallet as unknown as WalletProvider;
          break;
        case 'defly':
          accounts = await this.deflyWallet.connect();
          this.activeWallet = this.deflyWallet as unknown as WalletProvider;
          break;
        case 'daffi':
          accounts = await this.daffiWallet.connect();
          this.activeWallet = this.daffiWallet as unknown as WalletProvider;
          break;
        default:
          throw new Error('Unsupported wallet type');
      }

      this.connectedAccounts = accounts;
      this.activeWalletType = walletType;
      return accounts;
    } catch (error: unknown) {
      throw new Error(`Failed to connect wallet: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  makeTransactionSigner = async (txnGroup: Uint8Array[], indexesToSign: number[]) => {
    if (!this.activeWallet || !this.activeWalletType) {
      throw new Error('No active wallet');
    }

    if (this.activeWalletType === 'local') {
      const signer = await this.localWallet.makeTransactionSigner();
      const decodedTxns = txnGroup.map(txn => algosdk.decodeUnsignedTransaction(txn));
      return () => signer(decodedTxns, indexesToSign);
    }

    return async () => {
      if (!this.activeWallet) {
        throw new Error('Wallet not connected');
      }

      try {
        // Decode transactions from Uint8Array
        const decodedTxns = txnGroup.map(txn => algosdk.decodeUnsignedTransaction(txn));
        
        // Format transactions for signing
        const txnsToSign = decodedTxns.map(txn => ({
          txn: txn,
          message: 'Please sign the transaction'
        }));

        const result = await this.activeWallet.signTransactions([txnsToSign]);
        return result[0];
      } catch (error: any) {
        // Handle specific error cases
        if (error?.data?.type === "SIGN_MODAL_CLOSED") {
          console.error('Transaction signing cancelled');
          return new Array(indexesToSign.length).fill(null);
        }
        
        const msg = error?.message || "Failed to sign transaction";
        console.error(`Wallet signer error: ${msg}`);
        return new Array(indexesToSign.length).fill(null);
      }
    };
  }

  getAccounts(): string[] {
    return this.connectedAccounts;
  }

  async signTransactions(transactions: { txn: Transaction; message?: string }[][]): Promise<Uint8Array[][]> {
    if (!this.activeWallet) {
      throw new Error('No active wallet connection. Call connect() first.');
    }

    try {
      return await this.activeWallet.signTransactions(transactions);
    } catch (error: unknown) {
      throw new Error(`Failed to sign transactions: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // Backward compatibility
  async signTransaction(txn: Transaction): Promise<Uint8Array> {
    const result = await this.signTransactions([[{ txn, message: 'Transaction to sign' }]]);
    return result[0][0];
  }

  async disconnect(): Promise<void> {
    if (this.activeWallet) {
      await this.activeWallet.disconnect();
      this.activeWallet = null;
      this.connectedAccounts = [];
    }
  }

  async reconnectSession(walletType: WalletType): Promise<string[]> {
    try {
      let accounts: string[] = [];
      
      switch (walletType) {
        case 'local':
          accounts = await this.localWallet.reconnectSession();
          this.activeWallet = this.localWallet;
          break;
        case 'pera':
          accounts = await this.peraWallet.reconnectSession();
          this.activeWallet = this.peraWallet as unknown as WalletProvider;
          break;
        case 'defly':
          accounts = await this.deflyWallet.reconnectSession();
          this.activeWallet = this.deflyWallet as unknown as WalletProvider;
          break;
        case 'daffi':
          accounts = await this.daffiWallet.reconnectSession();
          this.activeWallet = this.daffiWallet as unknown as WalletProvider;
          break;
        default:
          throw new Error('Unsupported wallet type');
      }

      this.connectedAccounts = accounts;
      this.activeWalletType = walletType;
      return accounts;
    } catch (error: unknown) {
      throw new Error(`Failed to reconnect session: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
