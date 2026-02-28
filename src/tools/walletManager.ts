import algosdk from 'algosdk';
import { Entry, findCredentials } from '@napi-rs/keyring';
import { ed25519 } from '@noble/curves/ed25519.js';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { withCommonParams } from './commonParams.js';
import { getAlgodClient, extractNetwork, type NetworkId } from '../algorand-client.js';
import initSqlJs, { type Database } from 'sql.js';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

// ── Constants ────────────────────────────────────────────────────────────────

const KEYCHAIN_SERVICE = 'algorand-mcp';
const WALLET_DIR = join(homedir(), '.algorand-mcp');
const DB_PATH = join(WALLET_DIR, 'wallet.db');

// ── Database ─────────────────────────────────────────────────────────────────

let db: Database | null = null;

async function getDb(): Promise<Database> {
  if (db) return db;

  if (!existsSync(WALLET_DIR)) {
    mkdirSync(WALLET_DIR, { recursive: true });
  }

  const SQL = await initSqlJs();

  if (existsSync(DB_PATH)) {
    const buffer = readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  // Create tables if they don't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      address TEXT UNIQUE NOT NULL,
      public_key TEXT NOT NULL,
      nickname TEXT UNIQUE NOT NULL,
      allowance INTEGER DEFAULT 0,
      daily_allowance INTEGER DEFAULT 0,
      daily_spent INTEGER DEFAULT 0,
      last_spend_date TEXT DEFAULT '',
      created_at TEXT NOT NULL
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS wallet_state (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);

  // Initialize active index if not set
  const row = db.exec("SELECT value FROM wallet_state WHERE key = 'active_account_index'");
  if (row.length === 0) {
    db.run("INSERT INTO wallet_state (key, value) VALUES ('active_account_index', '0')");
  }

  persistDb();
  return db;
}

function persistDb(): void {
  if (!db) return;
  const data = db.export();
  writeFileSync(DB_PATH, Buffer.from(data));
}

// ── Types ────────────────────────────────────────────────────────────────────

interface AccountRow {
  id: number;
  address: string;
  public_key: string;
  nickname: string;
  allowance: number;
  daily_allowance: number;
  daily_spent: number;
  last_spend_date: string;
  created_at: string;
}

// ── Tool Schemas ─────────────────────────────────────────────────────────────

const walletToolSchemas = {
  addAccount: {
    type: 'object',
    properties: {
      mnemonic: { type: 'string', description: '25-word mnemonic to import. If omitted, a new account is generated.' },
      nickname: { type: 'string', description: 'Human-readable nickname for this account' },
      allowance: { type: 'number', description: 'Max per-transaction amount in microAlgos (0 = unlimited)' },
      dailyAllowance: { type: 'number', description: 'Max daily spending total in microAlgos (0 = unlimited)' }
    },
    required: ['nickname']
  },
  removeAccount: {
    type: 'object',
    properties: {
      nickname: { type: 'string', description: 'Nickname of the account to remove' },
      index: { type: 'number', description: 'Index of the account to remove (0-based)' }
    },
    required: []
  },
  listAccounts: {
    type: 'object',
    properties: {},
    required: []
  },
  switchAccount: {
    type: 'object',
    properties: {
      nickname: { type: 'string', description: 'Nickname of the account to switch to' },
      index: { type: 'number', description: 'Index of the account to switch to (0-based)' }
    },
    required: []
  },
  getInfo: {
    type: 'object',
    properties: {},
    required: []
  },
  getAssets: {
    type: 'object',
    properties: {},
    required: []
  },
  signTransaction: {
    type: 'object',
    properties: {
      transaction: { type: 'object', description: 'Transaction object to sign with the active wallet account' }
    },
    required: ['transaction']
  },
  signTransactionGroup: {
    type: 'object',
    properties: {
      transactions: {
        type: 'array',
        items: { type: 'object' },
        description: 'Array of transaction objects to sign as a group with the active wallet account'
      }
    },
    required: ['transactions']
  },
  signData: {
    type: 'object',
    properties: {
      data: { type: 'string', description: 'Hex-encoded data to sign with the active account key (raw Ed25519, no Algorand SDK prefix)' }
    },
    required: ['data']
  },
  optinAsset: {
    type: 'object',
    properties: {
      assetId: { type: 'number', description: 'Asset ID to opt the active account into' }
    },
    required: ['assetId']
  }
};

// ── Tool Definitions ─────────────────────────────────────────────────────────

export class WalletManager {
  static readonly walletTools = [
    {
      name: 'wallet_add_account',
      description: 'Create a new Algorand account and store it securely in the OS keychain with a nickname and spending limits. Returns only address and public key.',
      inputSchema: withCommonParams(walletToolSchemas.addAccount),
    },
    {
      name: 'wallet_remove_account',
      description: 'Remove an Algorand account from the wallet by nickname or index.',
      inputSchema: withCommonParams(walletToolSchemas.removeAccount),
    },
    {
      name: 'wallet_list_accounts',
      description: 'List all wallet accounts with their nicknames, addresses, and spending limits.',
      inputSchema: withCommonParams(walletToolSchemas.listAccounts),
    },
    {
      name: 'wallet_switch_account',
      description: 'Switch the active wallet account by nickname or index. The active account is used for signing and balance queries.',
      inputSchema: withCommonParams(walletToolSchemas.switchAccount),
    },
    {
      name: 'wallet_get_info',
      description: 'Get the active wallet account info including address, public key, nickname, on-chain balance, and spending limits.',
      inputSchema: withCommonParams(walletToolSchemas.getInfo),
    },
    {
      name: 'wallet_get_assets',
      description: 'Get all asset holdings for the active wallet account.',
      inputSchema: withCommonParams(walletToolSchemas.getAssets),
    },
    {
      name: 'wallet_sign_transaction',
      description: 'Sign a single transaction with the active wallet account. Enforces per-transaction and daily spending limits.',
      inputSchema: withCommonParams(walletToolSchemas.signTransaction),
    },
    {
      name: 'wallet_sign_transaction_group',
      description: 'Sign a group of transactions with the active wallet account. Assigns group ID automatically and enforces spending limits.',
      inputSchema: withCommonParams(walletToolSchemas.signTransactionGroup),
    },
    {
      name: 'wallet_sign_data',
      description: 'Sign arbitrary data with the active wallet account using raw Ed25519 (noble library, no Algorand SDK prefix). Returns hex signature.',
      inputSchema: withCommonParams(walletToolSchemas.signData),
    },
    {
      name: 'wallet_optin_asset',
      description: 'Opt the active wallet account into an asset by ID. Creates, signs, and submits the opt-in transaction.',
      inputSchema: withCommonParams(walletToolSchemas.optinAsset),
    },
  ];

  // ── Database Helpers ───────────────────────────────────────────────────────

  private static async getAllAccounts(): Promise<AccountRow[]> {
    const database = await getDb();
    const result = database.exec('SELECT * FROM accounts ORDER BY id');
    if (result.length === 0) return [];
    const cols = result[0].columns;
    return result[0].values.map(row => {
      const obj: any = {};
      cols.forEach((col, i) => { obj[col] = row[i]; });
      return obj as AccountRow;
    });
  }

  private static async getActiveIndex(): Promise<number> {
    const database = await getDb();
    const result = database.exec("SELECT value FROM wallet_state WHERE key = 'active_account_index'");
    if (result.length === 0 || result[0].values.length === 0) return 0;
    return parseInt(result[0].values[0][0] as string, 10) || 0;
  }

  private static async setActiveIndex(index: number): Promise<void> {
    const database = await getDb();
    database.run("UPDATE wallet_state SET value = ? WHERE key = 'active_account_index'", [String(index)]);
    persistDb();
  }

  private static async getActiveAccount(): Promise<AccountRow> {
    const accounts = await WalletManager.getAllAccounts();
    if (accounts.length === 0) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        'No wallet accounts. Use wallet_add_account to create a new one.'
      );
    }
    let idx = await WalletManager.getActiveIndex();
    idx = Math.min(idx, accounts.length - 1);
    return accounts[idx];
  }

  private static async resolveAccountIndex(args: Record<string, unknown>): Promise<number> {
    const accounts = await WalletManager.getAllAccounts();
    if (typeof args.index === 'number') {
      if (args.index < 0 || args.index >= accounts.length) {
        throw new McpError(ErrorCode.InvalidParams, `Account index ${args.index} out of range (0-${accounts.length - 1})`);
      }
      return args.index;
    }
    if (typeof args.nickname === 'string') {
      const idx = accounts.findIndex(a => a.nickname === args.nickname);
      if (idx === -1) {
        throw new McpError(ErrorCode.InvalidParams, `No account with nickname "${args.nickname}"`);
      }
      return idx;
    }
    throw new McpError(ErrorCode.InvalidParams, 'Provide either nickname or index');
  }

  // ── Keychain Access ────────────────────────────────────────────────────────

  private static storeMnemonic(address: string, mnemonic: string): void {
    const entry = new Entry(KEYCHAIN_SERVICE, address);
    entry.setPassword(mnemonic);
  }

  private static getMnemonic(address: string): string {
    try {
      const entry = new Entry(KEYCHAIN_SERVICE, address);
      const mnemonic = entry.getPassword();
      if (!mnemonic) throw new Error('No mnemonic found');
      return mnemonic;
    } catch {
      throw new McpError(ErrorCode.InvalidParams, `No keychain entry found for address: ${address}`);
    }
  }

  private static deleteMnemonic(address: string): boolean {
    try {
      const entry = new Entry(KEYCHAIN_SERVICE, address);
      return entry.deleteCredential();
    } catch {
      return false;
    }
  }

  private static async getActiveSecretKey(): Promise<Uint8Array> {
    const account = await WalletManager.getActiveAccount();
    const mnemonic = WalletManager.getMnemonic(account.address);
    return algosdk.mnemonicToSecretKey(mnemonic).sk;
  }

  // ── Spending Limit Enforcement ─────────────────────────────────────────────

  private static checkSpendingLimits(account: AccountRow, amountMicroAlgos: number): void {
    if (amountMicroAlgos <= 0) return;

    if (account.allowance > 0 && amountMicroAlgos > account.allowance) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Transaction amount ${amountMicroAlgos} microAlgos exceeds per-transaction allowance of ${account.allowance} for account "${account.nickname}"`
      );
    }

    if (account.daily_allowance > 0) {
      const today = new Date().toISOString().split('T')[0];
      const spent = account.last_spend_date === today ? account.daily_spent : 0;
      if (spent + amountMicroAlgos > account.daily_allowance) {
        throw new McpError(
          ErrorCode.InvalidRequest,
          `Would exceed daily allowance: ${spent} spent + ${amountMicroAlgos} = ${spent + amountMicroAlgos} > limit ${account.daily_allowance} for "${account.nickname}"`
        );
      }
    }
  }

  private static async recordSpend(address: string, amountMicroAlgos: number): Promise<void> {
    if (amountMicroAlgos <= 0) return;
    const database = await getDb();
    const today = new Date().toISOString().split('T')[0];

    // Reset if new day, then add
    database.run(`
      UPDATE accounts SET
        daily_spent = CASE WHEN last_spend_date = ? THEN daily_spent + ? ELSE ? END,
        last_spend_date = ?
      WHERE address = ?
    `, [today, amountMicroAlgos, amountMicroAlgos, today, address]);
    persistDb();
  }

  // ── Transaction Helpers ────────────────────────────────────────────────────

  private static prepareTransaction(txnObj: any): algosdk.Transaction {
    const transaction = { ...txnObj };

    if (transaction.note) {
      transaction.note = algosdk.base64ToBytes(transaction.note);
    }

    if (transaction.type === 'appl') {
      if (transaction.approvalProgram) {
        transaction.appApprovalProgram = new Uint8Array(algosdk.base64ToBytes(transaction.approvalProgram));
      }
      if (transaction.clearProgram) {
        transaction.appClearProgram = new Uint8Array(algosdk.base64ToBytes(transaction.clearProgram));
      }
      if (transaction.numGlobalInts !== undefined) transaction.appGlobalInts = transaction.numGlobalInts;
      if (transaction.numGlobalByteSlices !== undefined) transaction.appGlobalByteSlices = transaction.numGlobalByteSlices;
      if (transaction.numLocalInts !== undefined) transaction.appLocalInts = transaction.numLocalInts;
      if (transaction.numLocalByteSlices !== undefined) transaction.appLocalByteSlices = transaction.numLocalByteSlices;
      if (transaction.onComplete) transaction.appOnComplete = transaction.onComplete;
      if (transaction.appArgs) {
        transaction.appArgs = transaction.appArgs.map((arg: string) => algosdk.base64ToBytes(arg));
      }
      if (transaction.accounts) transaction.appAccounts = transaction.accounts;
      if (transaction.foreignApps) transaction.appForeignApps = transaction.foreignApps;
      if (transaction.foreignAssets) transaction.appForeignAssets = transaction.foreignAssets;
    }

    return new algosdk.Transaction(transaction);
  }

  private static extractTxnAmount(txnObj: any): number {
    if (typeof txnObj.amount === 'number') return txnObj.amount;
    if (typeof txnObj.amt === 'number') return txnObj.amt;
    return 0;
  }

  // ── Tool Handler ───────────────────────────────────────────────────────────

  static async handleTool(name: string, args: Record<string, unknown>) {
    try {
      switch (name) {

        // ── wallet_add_account ───────────────────────────────────────────

        case 'wallet_add_account': {
          if (!args.nickname || typeof args.nickname !== 'string') {
            throw new McpError(ErrorCode.InvalidParams, 'Nickname is required');
          }

          const database = await getDb();

          // Check nickname uniqueness
          const existing = database.exec('SELECT id FROM accounts WHERE nickname = ?', [args.nickname]);
          if (existing.length > 0 && existing[0].values.length > 0) {
            throw new McpError(ErrorCode.InvalidParams, `Account with nickname "${args.nickname}" already exists`);
          }

          let address: string;
          let publicKey: string;
          let mnemonic: string;

          const account = algosdk.generateAccount();
          address = account.addr.toString();
          publicKey = algosdk.bytesToHex(account.addr.publicKey);
          mnemonic = algosdk.secretKeyToMnemonic(account.sk);

          // Check address uniqueness
          const addrExists = database.exec('SELECT id FROM accounts WHERE address = ?', [address]);
          if (addrExists.length > 0 && addrExists[0].values.length > 0) {
            throw new McpError(ErrorCode.InvalidParams, `Account with address ${address} already exists in wallet`);
          }

          // Store mnemonic in OS keychain
          WalletManager.storeMnemonic(address, mnemonic);

          const allowance = typeof args.allowance === 'number' ? args.allowance : 0;
          const dailyAllowance = typeof args.dailyAllowance === 'number' ? args.dailyAllowance : 0;

          database.run(
            'INSERT INTO accounts (address, public_key, nickname, allowance, daily_allowance, daily_spent, last_spend_date, created_at) VALUES (?, ?, ?, ?, ?, 0, \'\', ?)',
            [address, publicKey, args.nickname, allowance, dailyAllowance, new Date().toISOString()]
          );
          persistDb();

          const accounts = await WalletManager.getAllAccounts();
          const newIndex = accounts.findIndex(a => a.address === address);

          // Auto-switch to the new account if it's the first one
          if (accounts.length === 1) {
            await WalletManager.setActiveIndex(0);
          }

          return {
            content: [{
              type: 'text',
              text: JSON.stringify({
                address,
                publicKey,
                nickname: args.nickname,
                index: newIndex,
                allowance,
                dailyAllowance,
              }, null, 2),
            }],
          };
        }

        // ── wallet_remove_account ────────────────────────────────────────

        case 'wallet_remove_account': {
          const accounts = await WalletManager.getAllAccounts();
          if (accounts.length === 0) {
            throw new McpError(ErrorCode.InvalidRequest, 'No accounts in wallet');
          }

          const idx = await WalletManager.resolveAccountIndex(args);
          const removed = accounts[idx];

          WalletManager.deleteMnemonic(removed.address);

          const database = await getDb();
          database.run('DELETE FROM accounts WHERE address = ?', [removed.address]);

          // Adjust active index
          const remaining = await WalletManager.getAllAccounts();
          const activeIdx = await WalletManager.getActiveIndex();
          if (remaining.length === 0) {
            await WalletManager.setActiveIndex(0);
          } else if (activeIdx >= remaining.length) {
            await WalletManager.setActiveIndex(remaining.length - 1);
          }
          persistDb();

          return {
            content: [{
              type: 'text',
              text: JSON.stringify({
                removed: true,
                address: removed.address,
                nickname: removed.nickname,
              }, null, 2),
            }],
          };
        }

        // ── wallet_list_accounts ─────────────────────────────────────────

        case 'wallet_list_accounts': {
          const accounts = await WalletManager.getAllAccounts();
          const activeIdx = await WalletManager.getActiveIndex();
          const today = new Date().toISOString().split('T')[0];

          return {
            content: [{
              type: 'text',
              text: JSON.stringify({
                activeIndex: activeIdx,
                count: accounts.length,
                accounts: accounts.map((a, i) => ({
                  index: i,
                  active: i === activeIdx,
                  nickname: a.nickname,
                  address: a.address,
                  publicKey: a.public_key,
                  allowance: a.allowance,
                  dailyAllowance: a.daily_allowance,
                  dailySpent: a.last_spend_date === today ? a.daily_spent : 0,
                  createdAt: a.created_at,
                })),
              }, null, 2),
            }],
          };
        }

        // ── wallet_switch_account ────────────────────────────────────────

        case 'wallet_switch_account': {
          const accounts = await WalletManager.getAllAccounts();
          if (accounts.length === 0) {
            throw new McpError(ErrorCode.InvalidRequest, 'No accounts in wallet');
          }

          const idx = await WalletManager.resolveAccountIndex(args);
          await WalletManager.setActiveIndex(idx);

          const active = accounts[idx];
          return {
            content: [{
              type: 'text',
              text: JSON.stringify({
                switched: true,
                activeIndex: idx,
                nickname: active.nickname,
                address: active.address,
                publicKey: active.public_key,
              }, null, 2),
            }],
          };
        }

        // ── wallet_get_info ──────────────────────────────────────────────

        case 'wallet_get_info': {
          const account = await WalletManager.getActiveAccount();
          const network = extractNetwork(args);
          const algodClient = getAlgodClient(network);
          const today = new Date().toISOString().split('T')[0];

          let onChainInfo: any = {};
          try {
            const info = await algodClient.accountInformation(account.address).do();
            onChainInfo = {
              balance: info.amount ?? 0,
              minBalance: info.minBalance ?? 0,
              totalAppsOptedIn: info.totalAppsOptedIn ?? 0,
              totalAssetsOptedIn: info.totalAssetsOptedIn ?? 0,
              totalCreatedApps: info.totalCreatedApps ?? 0,
              totalCreatedAssets: info.totalCreatedAssets ?? 0,
            };
          } catch {
            onChainInfo = { balance: 0, error: 'Could not fetch on-chain info (account may not be funded)' };
          }

          return {
            content: [{
              type: 'text',
              text: JSON.stringify({
                nickname: account.nickname,
                address: account.address,
                publicKey: account.public_key,
                network,
                ...onChainInfo,
                allowance: account.allowance,
                dailyAllowance: account.daily_allowance,
                dailySpent: account.last_spend_date === today ? account.daily_spent : 0,
              }, null, 2),
            }],
          };
        }

        // ── wallet_get_assets ────────────────────────────────────────────

        case 'wallet_get_assets': {
          const account = await WalletManager.getActiveAccount();
          const network = extractNetwork(args);
          const algodClient = getAlgodClient(network);

          try {
            const info = await algodClient.accountInformation(account.address).do();
            return {
              content: [{
                type: 'text',
                text: JSON.stringify({
                  nickname: account.nickname,
                  address: account.address,
                  network,
                  assets: info.assets || [],
                }, null, 2),
              }],
            };
          } catch (error) {
            throw new McpError(
              ErrorCode.InternalError,
              `Failed to fetch assets: ${error instanceof Error ? error.message : String(error)}`
            );
          }
        }

        // ── wallet_sign_transaction ──────────────────────────────────────

        case 'wallet_sign_transaction': {
          if (!args.transaction || typeof args.transaction !== 'object') {
            throw new McpError(ErrorCode.InvalidParams, 'Transaction object is required');
          }

          const account = await WalletManager.getActiveAccount();
          const txnObj = args.transaction as any;
          const amount = WalletManager.extractTxnAmount(txnObj);

          WalletManager.checkSpendingLimits(account, amount);

          const txn = WalletManager.prepareTransaction(txnObj);
          const sk = await WalletManager.getActiveSecretKey();
          const signedTxn = algosdk.signTransaction(txn, sk);

          await WalletManager.recordSpend(account.address, amount);

          return {
            content: [{
              type: 'text',
              text: JSON.stringify({
                txID: signedTxn.txID,
                blob: algosdk.bytesToBase64(signedTxn.blob),
                signer: account.address,
                nickname: account.nickname,
              }, null, 2),
            }],
          };
        }

        // ── wallet_sign_transaction_group ────────────────────────────────

        case 'wallet_sign_transaction_group': {
          if (!args.transactions || !Array.isArray(args.transactions) || args.transactions.length === 0) {
            throw new McpError(ErrorCode.InvalidParams, 'Non-empty transactions array is required');
          }

          const account = await WalletManager.getActiveAccount();

          let totalAmount = 0;
          for (const txnObj of args.transactions) {
            totalAmount += WalletManager.extractTxnAmount(txnObj);
          }

          WalletManager.checkSpendingLimits(account, totalAmount);

          const txns = args.transactions.map((txnObj: any) => WalletManager.prepareTransaction(txnObj));
          const groupedTxns = algosdk.assignGroupID(txns);

          const sk = await WalletManager.getActiveSecretKey();
          const signedTxns = groupedTxns.map(txn => {
            const signed = algosdk.signTransaction(txn, sk);
            return {
              txID: signed.txID,
              blob: algosdk.bytesToBase64(signed.blob),
            };
          });

          await WalletManager.recordSpend(account.address, totalAmount);

          return {
            content: [{
              type: 'text',
              text: JSON.stringify({
                groupSize: signedTxns.length,
                signer: account.address,
                nickname: account.nickname,
                transactions: signedTxns,
              }, null, 2),
            }],
          };
        }

        // ── wallet_sign_data ─────────────────────────────────────────────

        case 'wallet_sign_data': {
          if (!args.data || typeof args.data !== 'string') {
            throw new McpError(ErrorCode.InvalidParams, 'Hex-encoded data is required');
          }

          const sk = await WalletManager.getActiveSecretKey();
          const account = await WalletManager.getActiveAccount();

          // Noble ed25519: 32-byte seed is first half of algosdk 64-byte secret key
          const seed = sk.slice(0, 32);
          const dataBytes = algosdk.hexToBytes(args.data);
          const signature = ed25519.sign(dataBytes, seed);

          return {
            content: [{
              type: 'text',
              text: JSON.stringify({
                signature: algosdk.bytesToHex(signature),
                publicKey: account.public_key,
                address: account.address,
                dataLength: dataBytes.length,
              }, null, 2),
            }],
          };
        }

        // ── wallet_optin_asset ───────────────────────────────────────────

        case 'wallet_optin_asset': {
          if (!args.assetId || typeof args.assetId !== 'number') {
            throw new McpError(ErrorCode.InvalidParams, 'assetId (number) is required');
          }

          const account = await WalletManager.getActiveAccount();
          const network = extractNetwork(args);
          const algodClient = getAlgodClient(network);

          const suggestedParams = await algodClient.getTransactionParams().do();
          const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            sender: account.address,
            receiver: account.address,
            amount: 0,
            assetIndex: args.assetId,
            suggestedParams,
          });

          const sk = await WalletManager.getActiveSecretKey();
          const signedTxn = algosdk.signTransaction(txn, sk);
          await algodClient.sendRawTransaction(signedTxn.blob).do();

          return {
            content: [{
              type: 'text',
              text: JSON.stringify({
                txID: signedTxn.txID,
                assetId: args.assetId,
                address: account.address,
                nickname: account.nickname,
                network,
                submitted: true,
              }, null, 2),
            }],
          };
        }

        default:
          throw new McpError(ErrorCode.MethodNotFound, `Unknown wallet tool: ${name}`);
      }
    } catch (error) {
      if (error instanceof McpError) throw error;
      throw new McpError(
        ErrorCode.InternalError,
        `Wallet operation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  // ── Public helpers for wallet resources ─────────────────────────────────────

  static async getAccounts(): Promise<AccountRow[]> {
    return WalletManager.getAllAccounts();
  }

  static async hasAccounts(): Promise<boolean> {
    const accounts = await WalletManager.getAllAccounts();
    return accounts.length > 0;
  }

  static async getActiveAccountInfo(): Promise<AccountRow | null> {
    try {
      return await WalletManager.getActiveAccount();
    } catch {
      return null;
    }
  }
}
