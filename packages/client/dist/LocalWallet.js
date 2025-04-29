import algosdk from 'algosdk';
export class LocalWallet {
    constructor() {
        this.fsPromises = null;
        this.path = null;
        this.connectedAddress = null;
        this.isBrowser = typeof window !== 'undefined';
    }
    async initNodeModules() {
        if (!this.isBrowser && !this.fsPromises) {
            this.fsPromises = await import('fs/promises');
            this.path = await import('path');
        }
    }
    async listStoredAccounts() {
        if (this.isBrowser) {
            try {
                const creds = await navigator.credentials.get({
                    password: true,
                    mediation: 'optional'
                });
                return creds ? creds.map(cred => cred.id) : [];
            }
            catch {
                return [];
            }
        }
        else {
            try {
                await this.initNodeModules();
                const mnemonicPath = this.path.join(process.cwd(), '.mnemonic');
                const files = await this.fsPromises.readdir(mnemonicPath);
                return files.map((file) => file.replace('.mnemonic', ''));
            }
            catch {
                return [];
            }
        }
    }
    async storeMnemonic(address, mnemonic) {
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
            });
        }
        else {
            // Use filesystem in non-browser environment
            await this.initNodeModules();
            const mnemonicPath = this.path.join(process.cwd(), '.mnemonic');
            await this.fsPromises.mkdir(mnemonicPath, { recursive: true });
            await this.fsPromises.writeFile(this.path.join(mnemonicPath, `${address}.mnemonic`), mnemonic, { mode: 0o600 });
        }
    }
    async retrieveMnemonic(address) {
        if (this.isBrowser) {
            try {
                // Retrieve mnemonic using PasswordCredential
                const cred = await navigator.credentials.get({
                    password: true
                });
                if (cred && cred.id === address) {
                    return cred.password;
                }
                return null;
            }
            catch {
                return null;
            }
        }
        else {
            try {
                await this.initNodeModules();
                const mnemonicPath = this.path.join(process.cwd(), '.mnemonic', `${address}.mnemonic`);
                const mnemonic = await this.fsPromises.readFile(mnemonicPath, 'utf8');
                return mnemonic;
            }
            catch {
                return null;
            }
        }
    }
    async connect() {
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
        }
        catch (error) {
            throw new Error(`Failed to connect to LocalWallet: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async reconnectSession() {
        try {
            const accounts = await this.listStoredAccounts();
            if (accounts.length === 0) {
                throw new Error('No local accounts found. Call connect() first.');
            }
            this.connectedAddress = accounts[0];
            return [this.connectedAddress];
        }
        catch (error) {
            throw new Error(`Failed to reconnect session: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async disconnect() {
        this.connectedAddress = null;
    }
    async makeTransactionSigner() {
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
        }
        catch (error) {
            throw new Error(`Failed to create transaction signer: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async signTransactions(transactions) {
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
        }
        catch (error) {
            throw new Error(`Failed to sign transactions: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    // Backward compatibility
    async signTransaction(transactions) {
        const results = await this.signTransactions([transactions]);
        return results[0];
    }
}
