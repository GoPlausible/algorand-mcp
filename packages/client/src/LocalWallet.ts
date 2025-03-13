import algosdk, { Transaction } from 'algosdk';

export class LocalWallet {
  private fsPromises: typeof import('fs/promises') | null = null;
  private path: typeof import('path') | null = null;
  private connectedAddress: string | null = null;
  private isBrowser: boolean;

  constructor() {
    this.isBrowser = typeof window !== 'undefined';
  }

  private async initNodeModules(): Promise<void> {
    if (!this.isBrowser && !this.fsPromises) {
      this.fsPromises = await import('fs/promises');
      this.path = await import('path');
    }
  }

  private async listStoredAccounts(): Promise<string[]> {
    if (this.isBrowser) {
      try {
        const creds = await navigator.credentials.get({
          password: true,
          mediation: 'optional'
        } as CredentialRequestOptions) as { id: string; password: string }[] | null;
        
        return creds ? creds.map(cred => cred.id) : [];
      } catch {
        return [];
      }
    } else {
      try {
        await this.initNodeModules();
        const mnemonicPath = this.path!.join(process.cwd(), '.mnemonic');
        const files = await this.fsPromises!.readdir(mnemonicPath);
        return files.map((file: string) => file.replace('.mnemonic', ''));
      } catch {
        return [];
      }
    }
  }

  private async storeMnemonic(address: string, mnemonic: string): Promise<void> {
    if (this.isBrowser) {
      // Store mnemonic using PasswordCredential
      const credInit = {
        id: address,
        name: `Algorand Account ${address}`,
        origin: window.location.origin,
        password: mnemonic
      };
      await navigator.credentials.create({
        password: credInit
      } as CredentialCreationOptions);
    } else {
      // Use filesystem in non-browser environment
      await this.initNodeModules();
      const mnemonicPath = this.path!.join(process.cwd(), '.mnemonic');
      await this.fsPromises!.mkdir(mnemonicPath, { recursive: true });
      await this.fsPromises!.writeFile(
        this.path!.join(mnemonicPath, `${address}.mnemonic`),
        mnemonic,
        { mode: 0o600 }
      );
    }
  }

  private async retrieveMnemonic(address: string): Promise<string | null> {
    if (this.isBrowser) {
      try {
        // Retrieve mnemonic using PasswordCredential
        const cred = await navigator.credentials.get({
          password: true
        } as CredentialRequestOptions) as { id: string; password: string } | null;
        
        if (cred && cred.id === address) {
          return cred.password;
        }
        return null;
      } catch {
        return null;
      }
    } else {
      try {
        await this.initNodeModules();
        const mnemonicPath = this.path!.join(process.cwd(), '.mnemonic', `${address}.mnemonic`);
        const mnemonic = await this.fsPromises!.readFile(mnemonicPath, 'utf8');
        return mnemonic;
      } catch {
        return null;
      }
    }
  }

  async connect(): Promise<string[]> {
    try {
      // Check for existing accounts first
      const existingAccounts = await this.listStoredAccounts();
      if (existingAccounts.length > 0) {
        this.connectedAddress = existingAccounts[0];
        return [this.connectedAddress];
      }

      // Create new account if none exists
      const account = algosdk.generateAccount();
      const mnemonic = algosdk.secretKeyToMnemonic(account.sk);
      
      await this.storeMnemonic(account.addr, mnemonic);
      this.connectedAddress = account.addr;
      return [account.addr];
    } catch (error) {
      throw new Error(`Failed to connect to LocalWallet: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async reconnectSession(): Promise<string[]> {
    try {
      const accounts = await this.listStoredAccounts();
      if (accounts.length === 0) {
        throw new Error('No local accounts found. Call connect() first.');
      }
      this.connectedAddress = accounts[0];
      return [this.connectedAddress];
    } catch (error) {
      throw new Error(`Failed to reconnect session: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async disconnect(): Promise<void> {
    this.connectedAddress = null;
  }

  async makeTransactionSigner(): Promise<(txnGroup: Transaction[], indexesToSign: number[]) => Promise<Uint8Array[]>> {
    if (!this.connectedAddress) {
      throw new Error('No local account exists. Call connect() first.');
    }

    try {
      const mnemonic = await this.retrieveMnemonic(this.connectedAddress);
      if (!mnemonic) {
        throw new Error('Failed to retrieve account mnemonic');
      }

      const account = algosdk.mnemonicToSecretKey(mnemonic);
      return algosdk.makeBasicAccountTransactionSigner(account);
    } catch (error) {
      throw new Error(`Failed to create transaction signer: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async signTransactions(
    transactions: { txn: Transaction; message?: string }[][]
  ): Promise<Uint8Array[][]> {
    if (!this.connectedAddress) {
      throw new Error('No local account exists. Call connect() first.');
    }

    try {
      const mnemonic = await this.retrieveMnemonic(this.connectedAddress);
      if (!mnemonic) {
        throw new Error('Failed to retrieve account mnemonic');
      }

      const account = algosdk.mnemonicToSecretKey(mnemonic);
      
      return Promise.all(transactions.map(async (group) => {
        return group.map(({ txn }) => {
          const signedTxn = algosdk.signTransaction(txn, account.sk);
          return signedTxn.blob;
        });
      }));
    } catch (error) {
      throw new Error(`Failed to sign transactions: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // Backward compatibility
  async signTransaction(
    transactions: { txn: Transaction; message?: string }[]
  ): Promise<Uint8Array[]> {
    const results = await this.signTransactions([transactions]);
    return results[0];
  }
}
