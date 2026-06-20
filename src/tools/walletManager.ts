import algosdk from 'algosdk';
import { Entry } from '@napi-rs/keyring';
import { ed25519 } from '@noble/curves/ed25519.js';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { withCommonParams } from './commonParams.js';
import { getAlgodClient, extractNetwork, type NetworkId } from '../algorand-client.js';
import initSqlJs, { type Database } from 'sql.js';
import { existsSync, mkdirSync, readFileSync, writeFileSync, chmodSync } from 'fs';
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

  // Create tables if they don't exist. For fresh installs the schema is
  // already at the latest shape; for older DBs ensureSchema() below upgrades.
  db.run(`
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      address TEXT UNIQUE NOT NULL,
      public_key TEXT NOT NULL,
      nickname TEXT NOT NULL,
      mnemonic TEXT,
      archived INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS wallet_state (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);

  // Idempotent schema migration: add mnemonic + archived columns on
  // pre-existing DBs; replace the legacy column-level UNIQUE on nickname with
  // a partial unique index that only enforces uniqueness among non-archived
  // accounts (so an archived account can keep its original nickname while a
  // new active account with the same nickname can be created).
  ensureSchema(db);

  // Initialize active index if not set
  const row = db.exec("SELECT value FROM wallet_state WHERE key = 'active_account_index'");
  if (row.length === 0) {
    db.run("INSERT INTO wallet_state (key, value) VALUES ('active_account_index', '0')");
  }

  // Eager keychain → DB migration for any pre-existing accounts whose mnemonic
  // still lives in the OS keychain. Runs once per startup; idempotent (rows
  // already populated are skipped).
  migrateKeychainToDb(db);

  // Any row that's still NULL after the migration attempt is an orphan
  // (e.g. wallet.db was restored without its keychain counterpart, or this
  // is a Docker install where the keychain never existed). Archive them so
  // the agent doesn't see unusable accounts in the default wallet_list, but
  // the rows stay in the DB and can be surfaced via wallet_list_accounts
  // { archived: true } for forensics or future recovery.
  archiveOrphanedAccounts(db);

  persistDb();
  return db;
}

/**
 * Brings older DBs forward to the latest schema:
 *   v1 → no mnemonic column, nickname is a column-level UNIQUE
 *   v2 → mnemonic column added, nickname still column-level UNIQUE
 *   v3 → archived column added, nickname UNIQUE replaced with a partial unique
 *        index (idx_active_nickname) that only enforces uniqueness among rows
 *        WHERE archived = 0
 *
 * SQLite cannot drop a column-level UNIQUE constraint via ALTER, so when the
 * upgrade to v3 is needed we recreate the table. Idempotent: subsequent
 * startups detect the archived column already exists and skip.
 */
function ensureSchema(database: Database): void {
  const info = database.exec('PRAGMA table_info(accounts)');
  if (!info.length) return;
  const cols = info[0].values.map(r => r[1] as string);

  // v1 → v2: add mnemonic column
  if (!cols.includes('mnemonic')) {
    database.run('ALTER TABLE accounts ADD COLUMN mnemonic TEXT');
    cols.push('mnemonic');
  }

  // v2 → v3: add archived column + drop nickname UNIQUE via table recreation
  if (!cols.includes('archived')) {
    database.run(`
      CREATE TABLE accounts_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        address TEXT UNIQUE NOT NULL,
        public_key TEXT NOT NULL,
        nickname TEXT NOT NULL,
        mnemonic TEXT,
        archived INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL
      )
    `);
    database.run(`
      INSERT INTO accounts_new (id, address, public_key, nickname, mnemonic, archived, created_at)
      SELECT id, address, public_key, nickname, mnemonic, 0, created_at FROM accounts
    `);
    database.run('DROP TABLE accounts');
    database.run('ALTER TABLE accounts_new RENAME TO accounts');
  }

  // Partial unique index — applies to fresh and migrated DBs. Idempotent.
  database.run('CREATE UNIQUE INDEX IF NOT EXISTS idx_active_nickname ON accounts(nickname) WHERE archived = 0');
}

function migrateKeychainToDb(database: Database): void {
  const result = database.exec("SELECT address FROM accounts WHERE (mnemonic IS NULL OR mnemonic = '') AND archived = 0");
  if (!result.length || !result[0].values.length) return;
  for (const row of result[0].values) {
    const address = row[0] as string;
    let mnemonic: string | null = null;
    try {
      mnemonic = new Entry(KEYCHAIN_SERVICE, address).getPassword();
    } catch (err) {
      // Keychain unavailable, entry not found, or permission denied. Log to
      // stderr so a user investigating a false archive can see what happened.
      // The MCP tool surface remains silent.
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`[algorand-mcp] keychain read failed for ${address.slice(0, 10)}…: ${msg}`);
    }
    if (mnemonic && mnemonic.length > 0) {
      database.run('UPDATE accounts SET mnemonic = ? WHERE address = ?', [mnemonic, address]);
    }
  }
}

/**
 * Marks any `accounts` rows that still have no mnemonic after the keychain
 * migration step as archived (archived = 1). Archived rows:
 *   - are hidden from the default wallet_list_accounts response
 *   - never become the active account
 *   - keep their original nickname (the partial unique index on
 *     idx_active_nickname allows a new active account to reuse the nickname)
 *   - are surfaced via wallet_list_accounts { archived: true } for forensics
 *
 * Silent at the MCP tool layer. The active-account index is clamped to the
 * end of the remaining active list (or 0 if no active accounts remain).
 */
function archiveOrphanedAccounts(database: Database): void {
  const orphans = database.exec("SELECT id FROM accounts WHERE (mnemonic IS NULL OR mnemonic = '') AND archived = 0");
  if (!orphans.length || !orphans[0].values.length) return;

  database.run("UPDATE accounts SET archived = 1 WHERE (mnemonic IS NULL OR mnemonic = '') AND archived = 0");

  // Clamp active_account_index against the (now reduced) active list.
  const countResult = database.exec('SELECT COUNT(*) FROM accounts WHERE archived = 0');
  const remaining = countResult.length && countResult[0].values.length
    ? Number(countResult[0].values[0][0])
    : 0;
  const activeResult = database.exec("SELECT value FROM wallet_state WHERE key = 'active_account_index'");
  const activeIdx = activeResult.length && activeResult[0].values.length
    ? parseInt(activeResult[0].values[0][0] as string, 10) || 0
    : 0;
  if (remaining === 0 || activeIdx >= remaining) {
    database.run("UPDATE wallet_state SET value = '0' WHERE key = 'active_account_index'");
  }
}

function persistDb(): void {
  if (!db) return;
  const data = db.export();
  writeFileSync(DB_PATH, Buffer.from(data), { mode: 0o600 });
  try { chmodSync(DB_PATH, 0o600); } catch { /* best-effort on platforms that don't support it */ }
}

// ── Types ────────────────────────────────────────────────────────────────────

export interface AccountRow {
  id: number;
  address: string;
  public_key: string;
  nickname: string;
  mnemonic: string | null;
  archived: number;
  created_at: string;
}

// ── Tool Schemas ─────────────────────────────────────────────────────────────

const walletToolSchemas = {
  addAccount: {
    type: 'object',
    properties: {
      nickname: { type: 'string', description: 'Human-readable nickname for this account' }
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
    properties: {
      archived: {
        type: 'boolean',
        description: 'If true, return archived accounts (rows whose mnemonic could not be recovered from the OS keychain at startup, kept in the DB for forensics). If false or omitted, returns only active (signable) accounts.'
      }
    },
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
      description: 'Create a new Algorand account, store it in the agent-wallet database with a nickname, and auto-switch to it if it is the first account. Returns address, public key, nickname, and index. The mnemonic is held internally by the MCP server and never returned to the agent.',
      inputSchema: withCommonParams(walletToolSchemas.addAccount),
    },
    {
      name: 'wallet_remove_account',
      description: 'Remove an Algorand account from the wallet by nickname or index.',
      inputSchema: withCommonParams(walletToolSchemas.removeAccount),
    },
    {
      name: 'wallet_list_accounts',
      description: 'List wallet accounts with their nicknames and addresses. By default returns only ACTIVE accounts (signable). Pass { archived: true } to return ARCHIVED accounts instead — these are accounts whose mnemonic could not be recovered from the OS keychain at startup (e.g., wallet.db moved to a new machine without keychain, or fresh Docker install over an existing DB). Archived rows stay in the DB for forensics but cannot sign; their nicknames are freed for reuse by new active accounts.',
      inputSchema: withCommonParams(walletToolSchemas.listAccounts),
    },
    {
      name: 'wallet_switch_account',
      description: 'Switch the active wallet account by nickname or index. The active account is used for signing and balance queries.',
      inputSchema: withCommonParams(walletToolSchemas.switchAccount),
    },
    {
      name: 'wallet_get_info',
      description: 'Get info for the ACTIVE wallet account (an account whose private key this MCP server owns in the OS keychain). Returns nickname, address, public key, network, on-chain balance, min-balance, opted-in apps/assets counts. Use this when you want to know the state of "the wallet you control." For an arbitrary on-chain account that this wallet does NOT own, use api_algod_get_account_info instead.',
      inputSchema: withCommonParams(walletToolSchemas.getInfo),
    },
    {
      name: 'wallet_get_assets',
      description: 'Get all ASA holdings for the ACTIVE wallet account (an account whose private key this MCP server owns). Returns the wallet nickname, address, network, and the assets array. Use this when listing holdings of "the wallet you control." For asset holdings of an arbitrary on-chain account, use api_algod_get_account_info (returns full account including assets) or api_algod_get_account_asset_info (single asset).',
      inputSchema: withCommonParams(walletToolSchemas.getAssets),
    },
    {
      name: 'wallet_sign_transaction',
      description: 'Sign a single transaction with the active wallet account.',
      inputSchema: withCommonParams(walletToolSchemas.signTransaction),
    },
    {
      name: 'wallet_sign_transaction_group',
      description: 'Sign a group of transactions with the active wallet account. Assigns group ID automatically.',
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

  /**
   * Returns accounts from wallet.db.
   *   - includeArchived = false (default): only active rows (archived = 0).
   *     Used by every signing/lookup path and by wallet_list_accounts in its
   *     default mode.
   *   - includeArchived = true: only archived rows (archived = 1). Used by
   *     wallet_list_accounts { archived: true } for forensics.
   */
  private static async getAllAccounts(includeArchived = false): Promise<AccountRow[]> {
    const database = await getDb();
    const sql = includeArchived
      ? 'SELECT * FROM accounts WHERE archived = 1 ORDER BY id'
      : 'SELECT * FROM accounts WHERE archived = 0 ORDER BY id';
    const result = database.exec(sql);
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

  // ── Mnemonic Storage ───────────────────────────────────────────────────────
  //
  // Mnemonics live in the `accounts.mnemonic` column of wallet.db. The OS
  // keychain (@napi-rs/keyring) is kept only as a backward-compatibility read
  // fallback for accounts that pre-date this change; the eager migration in
  // getDb() copies any such mnemonics into the DB at startup, and the fallback
  // below catches the rare case where the keychain was unavailable at startup
  // but becomes available later. New mnemonics are never written to the
  // keychain.

  private static async storeMnemonic(address: string, mnemonic: string): Promise<void> {
    const database = await getDb();
    database.run('UPDATE accounts SET mnemonic = ? WHERE address = ?', [mnemonic, address]);
    persistDb();
  }

  private static async getMnemonic(address: string): Promise<string> {
    const database = await getDb();
    const result = database.exec('SELECT mnemonic FROM accounts WHERE address = ?', [address]);
    if (result.length && result[0].values.length) {
      const m = result[0].values[0][0];
      if (typeof m === 'string' && m.length > 0) return m;
    }

    // Fallback: read from keychain (handles the case where eager migration
    // missed this address because the keychain wasn't available at startup).
    // On success, copy into the DB so future reads are DB-native.
    try {
      const m = new Entry(KEYCHAIN_SERVICE, address).getPassword();
      if (m) {
        database.run('UPDATE accounts SET mnemonic = ? WHERE address = ?', [m, address]);
        persistDb();
        return m;
      }
    } catch {
      // No keychain entry / keychain unavailable.
    }

    throw new McpError(ErrorCode.InvalidParams, `No mnemonic found for address: ${address}`);
  }

  private static async deleteMnemonic(address: string): Promise<boolean> {
    const database = await getDb();
    database.run('UPDATE accounts SET mnemonic = NULL WHERE address = ?', [address]);
    persistDb();
    // Best-effort cleanup of any stale keychain entry left over from a
    // pre-migration install. Failure here is harmless.
    try { new Entry(KEYCHAIN_SERVICE, address).deleteCredential(); } catch { /* ignore */ }
    return true;
  }

  private static async getActiveSecretKey(): Promise<Uint8Array> {
    const account = await WalletManager.getActiveAccount();
    const mnemonic = await WalletManager.getMnemonic(account.address);
    return algosdk.mnemonicToSecretKey(mnemonic).sk;
  }

  // ── Transaction Helpers ────────────────────────────────────────────────────

  /**
   * Converts flat JSON transaction format (as returned by make_*_txn / assign_group_id)
   * into an algosdk v3 Transaction object. Handles genesisHash in base64 string,
   * Uint8Array, or JSON-round-tripped {0:byte,...} object form.
   */
  private static prepareTransaction(flat: any): algosdk.Transaction {
    // If already in v3 format (has suggestedParams), pass through
    if (flat.suggestedParams) return new algosdk.Transaction(flat);

    const suggestedParams: any = {
      fee: flat.fee,
      firstValid: flat.firstValid,
      lastValid: flat.lastValid,
      genesisID: flat.genesisID,
      flatFee: true,
    };

    // Handle genesisHash in all possible formats
    if (typeof flat.genesisHash === 'string') {
      suggestedParams.genesisHash = algosdk.base64ToBytes(flat.genesisHash);
    } else if (flat.genesisHash instanceof Uint8Array) {
      suggestedParams.genesisHash = flat.genesisHash;
    } else if (typeof flat.genesisHash === 'object' && flat.genesisHash !== null) {
      const keys = Object.keys(flat.genesisHash).map(Number).sort((a, b) => a - b);
      suggestedParams.genesisHash = new Uint8Array(keys.map(k => flat.genesisHash[k]));
    }

    const params: any = {
      type: flat.type,
      sender: flat.sender,
      suggestedParams,
    };

    // Note (base64 string → Uint8Array)
    if (flat.note) params.note = typeof flat.note === 'string' ? algosdk.base64ToBytes(flat.note) : flat.note;
    if (flat.rekeyTo) params.rekeyTo = flat.rekeyTo;

    // Group ID — stored separately, applied after Transaction construction
    // (group is a mutable field, not a constructor param)
    let groupBytes: Uint8Array | undefined;
    if (flat.group) {
      groupBytes = typeof flat.group === 'string' ? algosdk.base64ToBytes(flat.group) : flat.group;
    }

    switch (flat.type) {
      case 'pay':
        params.paymentParams = {
          receiver: flat.receiver,
          amount: flat.amount ?? 0,
        };
        if (flat.closeRemainderTo) params.paymentParams.closeRemainderTo = flat.closeRemainderTo;
        break;
      case 'axfer':
        params.assetTransferParams = {
          assetIndex: flat.assetIndex,
          receiver: flat.receiver,
          amount: flat.amount ?? 0,
        };
        if (flat.closeRemainderTo) params.assetTransferParams.closeRemainderTo = flat.closeRemainderTo;
        break;
      case 'acfg':
        params.assetConfigParams = {
          assetIndex: flat.assetIndex,
          total: flat.total,
          decimals: flat.decimals,
          defaultFrozen: flat.defaultFrozen,
          unitName: flat.unitName,
          assetName: flat.assetName,
          assetURL: flat.assetURL || flat.url,
          assetMetadataHash: flat.assetMetadataHash,
          manager: flat.manager,
          reserve: flat.reserve,
          freeze: flat.freeze,
          clawback: flat.clawback,
        };
        break;
      case 'afrz':
        params.assetFreezeParams = {
          assetIndex: flat.assetIndex,
          freezeTarget: flat.freezeTarget || flat.freezeAccount,
          frozen: flat.frozen ?? flat.assetFrozen,
        };
        break;
      case 'appl':
        params.appCallParams = {
          appIndex: flat.appIndex ?? flat.appId ?? 0,
          onComplete: flat.onComplete ?? flat.appOnComplete ?? 0,
        };
        if (flat.approvalProgram || flat.appApprovalProgram) {
          const prog = flat.approvalProgram || flat.appApprovalProgram;
          params.appCallParams.approvalProgram = typeof prog === 'string' ? algosdk.base64ToBytes(prog) : prog;
        }
        if (flat.clearProgram || flat.appClearProgram) {
          const prog = flat.clearProgram || flat.appClearProgram;
          params.appCallParams.clearProgram = typeof prog === 'string' ? algosdk.base64ToBytes(prog) : prog;
        }
        if (flat.numGlobalInts !== undefined) params.appCallParams.numGlobalInts = flat.numGlobalInts;
        if (flat.numGlobalByteSlices !== undefined) params.appCallParams.numGlobalByteSlices = flat.numGlobalByteSlices;
        if (flat.numLocalInts !== undefined) params.appCallParams.numLocalInts = flat.numLocalInts;
        if (flat.numLocalByteSlices !== undefined) params.appCallParams.numLocalByteSlices = flat.numLocalByteSlices;
        if (flat.appArgs) {
          params.appCallParams.appArgs = flat.appArgs.map((a: string) => typeof a === 'string' ? algosdk.base64ToBytes(a) : a);
        }
        if (flat.accounts || flat.appAccounts) params.appCallParams.accounts = flat.accounts || flat.appAccounts;
        if (flat.foreignApps || flat.appForeignApps) params.appCallParams.foreignApps = flat.foreignApps || flat.appForeignApps;
        if (flat.foreignAssets || flat.appForeignAssets) params.appCallParams.foreignAssets = flat.foreignAssets || flat.appForeignAssets;
        break;
      case 'keyreg':
        params.keyregParams = {
          voteKey: flat.voteKey,
          selectionKey: flat.selectionKey,
          stateProofKey: flat.stateProofKey,
          voteFirst: flat.voteFirst,
          voteLast: flat.voteLast,
          voteKeyDilution: flat.voteKeyDilution,
          nonParticipation: flat.nonParticipation ?? false,
        };
        break;
    }

    const txn = new algosdk.Transaction(params);
    if (groupBytes) {
      txn.group = groupBytes;
    }
    return txn;
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
          // Nickname uniqueness is enforced only among ACTIVE accounts (the
          // partial unique index idx_active_nickname). Archived rows with the
          // same nickname don't conflict — the new account takes over the name.
          const existing = database.exec('SELECT id FROM accounts WHERE nickname = ? AND archived = 0', [args.nickname]);
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

          database.run(
            'INSERT INTO accounts (address, public_key, nickname, mnemonic, created_at) VALUES (?, ?, ?, ?, ?)',
            [address, publicKey, args.nickname, mnemonic, new Date().toISOString()]
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

          await WalletManager.deleteMnemonic(removed.address);

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
          const showArchived = args.archived === true;
          const accounts = await WalletManager.getAllAccounts(showArchived);
          const activeIdx = showArchived ? -1 : await WalletManager.getActiveIndex();

          return {
            content: [{
              type: 'text',
              text: JSON.stringify({
                archived: showArchived,
                activeIndex: activeIdx,
                count: accounts.length,
                accounts: accounts.map((a, i) => ({
                  index: i,
                  active: !showArchived && i === activeIdx,
                  archived: showArchived,
                  nickname: a.nickname,
                  address: a.address,
                  publicKey: a.public_key,
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

          const txn = WalletManager.prepareTransaction(txnObj);
          const sk = await WalletManager.getActiveSecretKey();
          const signedTxn = algosdk.signTransaction(txn, sk);

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

  // ── Public accessors for external tool integration (e.g., haystack-router) ──

  /** Get active account details (address, nickname). */
  static async getActiveWalletAccount(): Promise<AccountRow> {
    return WalletManager.getActiveAccount();
  }

  /** Get active account's secret key from OS keychain. */
  static async getActiveWalletSecretKey(): Promise<Uint8Array> {
    return WalletManager.getActiveSecretKey();
  }
}
