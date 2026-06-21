# Algorand MCP Server
[![npm version](https://img.shields.io/npm/v/@goplausible/algorand-mcp.svg)](https://www.npmjs.com/package/@goplausible/algorand-mcp)
[![npm downloads](https://img.shields.io/npm/dm/@goplausible/algorand-mcp.svg)](https://www.npmjs.com/package/@goplausible/algorand-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server that gives AI agents and LLMs full access to the Algorand blockchain. Built by [GoPlausible](https://goplausible.com).

Algorand is a carbon-negative, pure proof-of-stake Layer 1 blockchain with instant finality, low fees, and built-in support for smart contracts (AVM), standard assets (ASAs), and atomic transactions.

## What is MCP?

[Model Context Protocol](https://modelcontextprotocol.io/) is an open standard that lets AI applications connect to external tools and data sources. This server exposes Algorand blockchain operations as MCP tools that any compatible AI client can use — Claude Desktop, Claude Code, Cursor, Windsurf, and others.

## Features

- Agent wallet — mnemonics stored in a local SQLite database, used by the MCP server to sign on the agent's behalf (mnemonics never returned in tool responses)
- Wallet accounts with human-readable nicknames
- Account creation, key management, and rekeying
- Transaction building, signing, and submission (payments, assets, applications, key registration)
- Atomic transaction groups
- TEAL compilation and disassembly
- Full Algod and Indexer API access
- NFDomains (NFD) name service integration
- x402 HTTP micropayments — automatic discovery and one-call paid requests using the active wallet (USDC/ALGO)
- AP2 tooling for Algorand
- Tinyman AMM integration (pools, swaps, liquidity)
- Haystack Router DEX aggregation (best-price swaps across Tinyman, Pact, Folks)
- Alpha Arcade prediction market trading (browse markets, orderbooks, limit/market orders, positions, claims)
- ARC-26 URI and QR code generation
- Algorand knowledge base with full developer documentation taxonomy
- Per-tool-call network selection (mainnet, testnet, localnet) and pagination

## Requirements

- Node.js v20 or later
- npm, pnpm, or yarn

## Installation

### From npm

```bash
npm install -g @goplausible/algorand-mcp
```

### From source

```bash
git clone https://github.com/GoPlausible/algorand-mcp.git
cd algorand-mcp
npm install
npm run build
```

## MCP Configuration

The server runs over **stdio**. There are three ways to invoke it — pick whichever suits your setup:

| Method | Command | When to use |
|---|---|---|
| **npx** (recommended) | `npx @goplausible/algorand-mcp` | No install needed, always latest version |
| **Global install** | `algorand-mcp` | After `npm install -g @goplausible/algorand-mcp` |
| **Absolute path** | `node /path/to/dist/index.js` | Built from source or local clone |

**No environment variables are required** for standard use. Network selection, pagination, and node URLs are all handled dynamically per tool call.

---

### OpenClaw

No manual configuration needed — install the [`@goplausible/openclaw-algorand-plugin`](https://www.npmjs.com/package/@goplausible/openclaw-algorand-plugin) npm package and the Algorand MCP server is configured automatically:

```bash
npm install -g @goplausible/openclaw-algorand-plugin
```

---

### Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

**Using npx:**
```json
{
  "mcpServers": {
    "algorand-mcp": {
      "command": "npx",
      "args": ["@goplausible/algorand-mcp"]
    }
  }
}
```

**Using global install:**
```json
{
  "mcpServers": {
    "algorand-mcp": {
      "command": "algorand-mcp"
    }
  }
}
```

**Using absolute path:**
```json
{
  "mcpServers": {
    "algorand-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/algorand-mcp/dist/index.js"]
    }
  }
}
```

---

### Claude Code

Create `.mcp.json` in your project root (project scope) or `~/.claude.json` (user scope):

```json
{
  "mcpServers": {
    "algorand-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": ["@goplausible/algorand-mcp"]
    }
  }
}
```

Or add interactively:
```bash
claude mcp add algorand-mcp -- npx @goplausible/algorand-mcp
```

---

### Cursor

Add via **Settings > MCP Servers**, or edit `.cursor/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "algorand-mcp": {
      "command": "npx",
      "args": ["@goplausible/algorand-mcp"]
    }
  }
}
```

---

### Windsurf

Add via **Settings > MCP**, or edit `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "algorand-mcp": {
      "command": "npx",
      "args": ["@goplausible/algorand-mcp"]
    }
  }
}
```

---

### VS Code / GitHub Copilot

Edit `.vscode/mcp.json` in your workspace root, or open **Settings > MCP Servers**:

```json
{
  "servers": {
    "algorand-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": ["@goplausible/algorand-mcp"]
    }
  }
}
```

---

### Cline

Add via the **MCP Servers** panel in the Cline sidebar, or edit `~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json` (macOS):

```json
{
  "mcpServers": {
    "algorand-mcp": {
      "command": "npx",
      "args": ["@goplausible/algorand-mcp"],
      "disabled": false
    }
  }
}
```

---

### OpenAI Codex CLI

Create `.codex/mcp.json` in your project root or `~/.codex/mcp.json` for global scope:

```json
{
  "mcpServers": {
    "algorand-mcp": {
      "command": "npx",
      "args": ["@goplausible/algorand-mcp"]
    }
  }
}
```

---

### Open Code

Edit `~/.config/opencode/config.json`:

```json
{
  "mcp": {
    "algorand-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": ["@goplausible/algorand-mcp"]
    }
  }
}
```

---

### Any MCP-compatible client

The server speaks the standard MCP stdio protocol. For any client not listed above, configure it with:

- **Command:** `npx` (or `algorand-mcp` if globally installed, or `node /path/to/dist/index.js`)
- **Args:** `["@goplausible/algorand-mcp"]` (for npx)
- **Transport:** `stdio`

## Network Selection

Every tool accepts an optional `network` parameter: `"mainnet"` (default), `"testnet"`, or `"localnet"`. Algod and Indexer URLs are built-in for mainnet and testnet via [AlgoNode](https://algonode.io/).

Example tool call:
```json
{ "name": "api_algod_get_account_info", "arguments": { "address": "ABC...", "network": "testnet" } }
```

If no `network` is provided, tools default to **mainnet**.

## Pagination

API responses are automatically paginated. Every tool accepts an optional `itemsPerPage` parameter (default: 10). Pass the `pageToken` from a previous response to fetch the next page.

## Agent Wallet

### Architecture

The agent wallet is a local SQLite database that the MCP server controls on the agent's behalf. The server holds the mnemonics and signs transactions for the agent — the agent never sees the mnemonics in any tool response.

| Layer | What it stores | Where |
|---|---|---|
| **SQLite (`wallet.db`)** | Account rows (`address`, `public_key`, `nickname`, `mnemonic`, `created_at`) and the active-account index | `~/.algorand-mcp/wallet.db` (mode `0600`) |

**Threat model.** The wallet.db file is the secret. Anyone with read access to it can recover every mnemonic stored in the wallet. The mitigations are filesystem permissions (`0600`, owner-only), keeping the data directory off shared/world-readable volumes, and treating the data directory like any other secret store (snapshot it carefully, restrict backups, encrypt the host disk for at-rest protection). For Docker deployments, mount `~/.algorand-mcp` as a named volume and restrict access to it like you would any secret material.

### How it works

```
  Agent (LLM)                    MCP Server                          Storage
  ──────────                     ──────────                          ───────
       │                              │                                  │
       │  wallet_add_account          │                                  │
       │  { nickname: "main" }        │                                  │
       │ ──────────────────────────►  │  generate keypair                │
       │                              │  INSERT (address, public_key,    │
       │                              │           nickname, mnemonic) ──►│  wallet.db
       │  ◄─ { address, publicKey,    │                                  │
       │       nickname, index }      │                                  │
       │                              │                                  │
       │  wallet_sign_transaction     │                                  │
       │  { transaction: {...} }      │                                  │
       │ ──────────────────────────►  │  SELECT mnemonic FROM accounts ◄─│
       │                              │   WHERE address=<active>         │
       │                              │  sign in memory                  │
       │  ◄─ { txID, blob }           │  (key discarded after sign)      │
       │                              │                                  │
```

1. **Account creation** (`wallet_add_account`) — Generates a keypair and inserts a row containing the mnemonic into `accounts`. Returns address, public key, nickname, and index. The mnemonic is never returned.
2. **Active account** — One account is active at a time. `wallet_switch_account` changes it by nickname or index. All signing and query tools operate on the active account.
3. **Transaction signing** (`wallet_sign_transaction`) — Reads the mnemonic from the DB, signs in memory, returns only the signed blob.
4. **Data signing** (`wallet_sign_data`) — Signs arbitrary hex data using raw Ed25519 via the [`@noble/curves`](https://github.com/paulmillr/noble-curves) library (no Algorand SDK prefix). Useful for off-chain authentication.
5. **Asset opt-in** (`wallet_optin_asset`) — Creates, signs, and submits an opt-in transaction for the active account in one step.

### Backward compatibility (silent migration from OS keychain)

Older installs of this MCP stored mnemonics in the OS keychain (`@napi-rs/keyring`). On first startup after upgrading, the server runs a one-shot, silent migration:

- For every `accounts` row whose `mnemonic` column is `NULL` or empty, it attempts to read the mnemonic from the OS keychain under the service name `algorand-mcp` keyed by the address.
- If found, the mnemonic is copied into the DB column.
- The original keychain entry is left in place as a redundant backup; nothing is deleted.

After this completes, the DB is the sole source of truth. The keychain is consulted only as a fallback if the DB still has a `NULL` mnemonic for an address (e.g., the keychain was unavailable during startup and became available later). All new accounts created after the upgrade are written directly to the DB and never touch the keychain.

**Orphan handling (archive, not delete).** If an `accounts` row exists but its mnemonic isn't in the keychain *and* isn't already in the DB (e.g., the user copied `wallet.db` to a new machine without also moving the keychain entries, restored from a partial backup, or installed in Docker where the keychain never existed), that row is unusable for signing. Rather than delete it, the server marks the row as **archived** (`UPDATE accounts SET archived = 1 WHERE mnemonic IS NULL OR mnemonic = ''`). Archived rows:

- are **hidden from the default** `wallet_list_accounts` response
- **never become the active account** (the active-account index is clamped to the end of the remaining active list, or reset to `0` if no active accounts remain)
- keep their **original nickname** (a partial unique index `idx_active_nickname` enforces nickname uniqueness only among active rows, so a new `wallet_add_account` can reuse the same nickname for a fresh keypair)
- are **surfaced via `wallet_list_accounts { archived: true }`** for forensics or future recovery

Archiving is silent at the MCP tool layer. The only diagnostic is a one-line stderr log per failed keychain read (`[algorand-mcp] keychain read failed for <addr>…: <msg>`), so if a user investigates a false archive they can see whether the keychain threw "no entry" vs "access denied" vs "no DBus" etc.

No user action is required for any of this. No prompts, no env vars, no migration tools.

### Schema versions

The DB schema evolves additively via an idempotent migration that runs at startup:

| Version | Change |
|---|---|
| v1 | initial — `accounts` columns: `id`, `address`, `public_key`, `nickname` (UNIQUE), `created_at` |
| v2 | added `mnemonic TEXT` column |
| v3 | added `archived INTEGER NOT NULL DEFAULT 0` column; dropped the column-level UNIQUE on `nickname` and replaced it with `CREATE UNIQUE INDEX idx_active_nickname ON accounts(nickname) WHERE archived = 0` so archived rows can keep their original nicknames without blocking reuse |

The v2→v3 step recreates the `accounts` table (SQLite cannot drop a column-level UNIQUE constraint via ALTER) and copies data forward with `archived = 0`. Existing wallets keep working unchanged.

## x402 HTTP Payments

[x402](https://x402.org) is an HTTP-native micropayments protocol. It uses the long-reserved `402 Payment Required` status as a real handshake: when a client requests a paid resource without paying, the server returns 402 with a JSON body listing what it accepts (networks, assets, amounts, the recipient address). The client constructs a payment, attaches it as an HTTP header, retries the same request, and the server returns 200 with the resource. No API keys, no Stripe webhooks, no accounts to manage — payment is part of the request itself.

This MCP implements the Algorand flavor of x402, where payments are USDC (or native ALGO) transfers on Algorand. It exposes two tools that collapse the seven-step manual flow (probe → parse → opt-in check → build fee payer → build payment → group → sign → encode → header → retry) into a single tool call.

### Protocol shape (Algorand variant)

```
  Agent (LLM)                  algorand-mcp                   Endpoint                Facilitator
  ──────────                   ────────────                   ────────                ───────────
       │                            │                            │                          │
       │  make_http_request_       │                            │                          │
       │  with_x402 { url, ... }   │                            │                          │
       │ ────────────────────────► │  HTTP request              │                          │
       │                            │ ─────────────────────────► │                          │
       │                            │  402 PaymentRequired      │                          │
       │                            │ ◄───────────────────────── │                          │
       │                            │  pick accepts[i] for      │                          │
       │                            │  Algorand network          │                          │
       │                            │  build fee-payer + payment │                          │
       │                            │  (atomic group of 2)       │                          │
       │                            │  sign payment leg          │                          │
       │                            │  via agent wallet DB       │                          │
       │                            │  encode unsigned fee-payer │                          │
       │                            │  base64 PAYMENT-SIGNATURE  │                          │
       │                            │ ─────────────────────────► │                          │
       │                            │  HTTP request +            │  forward + settle        │
       │                            │  PAYMENT-SIGNATURE         │ ───────────────────────► │
       │                            │                            │  sign fee-payer,         │
       │                            │                            │  submit atomic group     │
       │                            │  200 + resource            │ ◄─────────────────────── │
       │                            │ ◄───────────────────────── │                          │
       │ ◄─ { result, paid: {...}}│                            │                          │
       │                            │                            │                          │
```

### What's different from the Coinbase/EVM version

1. **Header name is `PAYMENT-SIGNATURE`**, not `X-PAYMENT`. The header body is base64-encoded JSON with `x402Version`, `scheme`, `network` (a CAIP-2 identifier like `algorand:wGHE2Pw…` for mainnet), a `payload`, and a verbatim copy of the `accepts[]` entry the client chose.
2. **Payment is an atomic 2-transaction group.** Index 0 is a fee-payer transaction (sender = facilitator, amount = 0, fee = 2000 µAlgo for the whole group); index 1 is the actual USDC ASA transfer (sender = wallet, fee = 0). The wallet signs only index 1 — the facilitator signs index 0 server-side at settlement. The user's wallet pays only the USDC, not even network fees.
3. **Network strings are Algorand CAIP-2.** This MCP recognizes mainnet (`wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=`) and testnet (`SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=`). Endpoints that only accept Base, Solana, or other non-Algorand networks are not satisfiable here and the tool returns a clear error.

### Coinbase Wallet MCP compatibility (x402 surface)

The x402 tools — `make_http_request_with_x402` and `x402_discover_payment_requirements` — are intentionally name- and shape-compatible with the Coinbase Wallet MCP's x402 tools. The input parameters (`baseURL`, `path`, `method`, `queryParams`, `body`, `headers`, `correlationId`, `maxAmountPerRequest`, `paymentRequirements`, `preferredNetwork`, `extensions`) are the same. The output envelope (`result`, `_atomicUnitsNote`) is the same.

What this means in practice:
- **Drop-in for Algorand x402.** Agents and MCP apps written against the Coinbase Wallet MCP's x402 tools work against this server without any prompt changes — they just hit Algorand x402 endpoints instead of Base/Solana ones.
- **Same agent reflexes.** Models trained on tool-call traces from the Coinbase ecosystem use these tools correctly on first call. Nothing to relearn.
- **Compatibility is scoped to the x402 surface only.** The wallet, account, transaction-building, and DEX tools in this MCP are Algorand-specific and do not mirror Coinbase's wallet API. Only `make_http_request_with_x402` and `x402_discover_payment_requirements` are drop-in compatible.

The one parameter that necessarily differs: `preferredNetwork` accepts `mainnet | testnet | localnet` only (Algorand networks), because the wallet only signs Algorand transactions. Coinbase's enum lists `base | base-sepolia | solana | solana-devnet`. Agents that pass one of those values get a clear error indicating no Algorand-payable accepts entry exists.

### Example — paid weather API

```
# Step 1 (optional): peek at the cost
x402_discover_payment_requirements {
  "baseURL": "https://example.x402.goplausible.xyz",
  "path": "/weather",
  "method": "GET"
}
# returns: { result: { accepts: [{ scheme: "exact", network: "algorand:SGO1...",
#                                  maxAmountRequired: "100", asset: "10458941",
#                                  payTo: "AAAA...", extra: { feePayer: "BBBB..." } }] } }

# Step 2: pay and fetch in one call
make_http_request_with_x402 {
  "baseURL": "https://example.x402.goplausible.xyz",
  "path": "/weather",
  "method": "GET",
  "maxAmountPerRequest": 10000,
  "preferredNetwork": "testnet"
}
# returns: { result: <weather payload>, paid: { network: "testnet",
#                                                asset: "10458941",
#                                                amount: "100", payTo: "AAAA..." },
#           paymentResponse: <decoded X-PAYMENT-RESPONSE> }
```

The active wallet account must be opted into the target ASA (e.g. USDC) and hold enough balance to cover `maxAmountRequired`. If it isn't opted in, the payment fails at settlement — opt in first with `wallet_optin_asset`.

### Prerequisites

- An active wallet account exists (`wallet_get_info` to verify)
- That account is opted into the payment asset (USDC mainnet ASA `31566704`, testnet ASA `10458941`)
- The account has enough of the payment asset for `maxAmountRequired`
- The endpoint's `accepts[]` includes at least one entry with an Algorand network the MCP recognizes

## Optional Environment Variables

Environment variables are only needed for special setups. Pass them via the `env` block in your MCP config.

| Variable | Description | Default | When needed |
|---|---|---|---|
| `ALGORAND_TOKEN` | API token for private/authenticated nodes | `""` | Connecting to a private Algod/Indexer node |
| `ALGORAND_LOCALNET_URL` | Localnet base URL | `""` | Using `network: "localnet"` (e.g. `http://localhost:4001`) |
| `ALPHA_API_KEY` | Alpha Arcade API key | `""` | Accessing reward market data |


### Example: localnet (AlgoKit)

```json
{
  "mcpServers": {
    "algorand-mcp": {
      "command": "node",
      "args": ["/path/to/algorand-mcp/dist/index.js"],
      "env": {
        "ALGORAND_LOCALNET_URL": "http://localhost:4001",
        "ALGORAND_TOKEN": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      }
    }
  }
}
```

Then use `"network": "localnet"` in your tool calls.

## Available Tools

### Wallet Tools (10 tools)

See [Secure Wallet](#secure-wallet) for full architecture details.

| Tool | Description |
|---|---|
| `wallet_add_account` | Create a new Algorand account with nickname (returns address + public key only) |
| `wallet_remove_account` | Remove an account from the wallet by nickname or index |
| `wallet_list_accounts` | List active accounts with nicknames and addresses. Pass `{ archived: true }` to list archived accounts instead (rows whose mnemonic couldn't be recovered from the OS keychain at startup — kept in the DB for forensics, not signable). |
| `wallet_switch_account` | Switch the active account by nickname or index |
| `wallet_get_info` | Get info for the **active account this MCP server owns** (DB-backed): address, public key, balance, opted-in counts. For arbitrary on-chain accounts use `api_algod_get_account_info`. |
| `wallet_get_assets` | Get all ASA holdings for the **active account this MCP server owns**. For arbitrary on-chain accounts use `api_algod_get_account_info` or `api_algod_get_account_asset_info`. |
| `wallet_sign_transaction` | Sign a single transaction with the active account |
| `wallet_sign_transaction_group` | Sign a group of transactions with the active account (auto-assigns group ID) |
| `wallet_sign_data` | Sign arbitrary hex data with raw Ed25519 (noble, no SDK prefix) |
| `wallet_optin_asset` | Opt the active account into an asset (creates, signs, and submits) |

### x402 HTTP Payment Tools (5 tools)

See [x402 HTTP Payments](#x402-http-payments) for the full protocol explanation.

| Tool | Description |
|---|---|
| `x402_discover_payment_requirements` | Probe an x402-protected endpoint and return its `accepts[]` array (cost, asset, network, payTo) without paying. Read-only. |
| `make_http_request_with_x402` | Call an x402-protected endpoint with automatic USDC/ALGO payment from the active wallet. Discovers internally if `paymentRequirements` is not supplied, builds the atomic fee-payer + payment group, signs, and retries with the `PAYMENT-SIGNATURE` header. |
| `bazaar_list` | Browse paid API resources cataloged in the Bazaar discovery directory hosted by the configured facilitator (`facilitator.goplausible.xyz` by default). Compact summary by default; `full: true` returns verbatim records. Filters: `network`, `method`, `merchantId`, `limit`, `offset`. |
| `bazaar_search` | Keyword search over Bazaar resources (URL + description). Server-side: `query`, `network`. Client-side post-filters: `scheme`, `maxUsdPrice`, `asset`, `payTo`, `extensions`, `includeTestnets`. |
| `bazaar_get_resource_details` | Fetch a single Bazaar resource by its exact `resource` URL. Returns the verbatim record (accepts[], discoveryInfo, popularity counters). |

### Account Management (8 tools)

| Tool | Description |
|---|---|
| `create_account` | Create a new Algorand account (returns address + mnemonic in the clear) |
| `rekey_account` | Rekey an account to a new address |
| `mnemonic_to_mdk` | Convert mnemonic to master derivation key |
| `mdk_to_mnemonic` | Convert master derivation key to mnemonic |
| `secret_key_to_mnemonic` | Convert secret key to mnemonic |
| `mnemonic_to_secret_key` | Convert mnemonic to secret key |
| `seed_from_mnemonic` | Generate seed from mnemonic |
| `mnemonic_from_seed` | Generate mnemonic from seed |

### Utility Tools (13 tools)

| Tool | Description |
|---|---|
| `ping` | Server connectivity check and info |
| `validate_address` | Check if an Algorand address is valid |
| `encode_address` | Encode a public key to an Algorand address |
| `decode_address` | Decode an Algorand address to a public key |
| `get_application_address` | Get address for a given application ID |
| `bytes_to_bigint` | Convert bytes to BigInt |
| `bigint_to_bytes` | Convert BigInt to bytes |
| `encode_uint64` | Encode uint64 to bytes |
| `decode_uint64` | Decode bytes to uint64 |
| `verify_bytes` | Verify signature against bytes |
| `sign_bytes` | Sign bytes with a secret key |
| `encode_obj` | Encode object to msgpack |
| `decode_obj` | Decode msgpack to object |

### Transaction Tools (18 tools)

| Tool | Description |
|---|---|
| `make_payment_txn` | Create a payment transaction |
| `make_keyreg_txn` | Create a key registration transaction |
| `make_asset_create_txn` | Create an asset creation transaction |
| `make_asset_config_txn` | Create an asset configuration transaction |
| `make_asset_destroy_txn` | Create an asset destroy transaction |
| `make_asset_freeze_txn` | Create an asset freeze transaction |
| `make_asset_transfer_txn` | Create an asset transfer transaction |
| `make_app_create_txn` | Create an application creation transaction |
| `make_app_update_txn` | Create an application update transaction |
| `make_app_delete_txn` | Create an application delete transaction |
| `make_app_optin_txn` | Create an application opt-in transaction |
| `make_app_closeout_txn` | Create an application close-out transaction |
| `make_app_clear_txn` | Create an application clear state transaction |
| `make_app_call_txn` | Create an application call transaction |
| `assign_group_id` | Assign group ID for atomic transactions |
| `sign_transaction` | Sign a transaction with a secret key |
| `encode_unsigned_transaction` | Encode an unsigned transaction to base64 msgpack bytes |
| `decode_signed_transaction` | Decode a signed transaction blob back to JSON with signature details |

### Algod Tools (5 tools)

| Tool | Description |
|---|---|
| `compile_teal` | Compile TEAL source code |
| `disassemble_teal` | Disassemble TEAL bytecode to source |
| `send_raw_transaction` | Submit signed transactions to the network |
| `simulate_raw_transactions` | Simulate already-encoded transactions (base64 bytes). Pass/fail + log/cost only — no trace, no extra budget. |
| `simulate_transactions` | Simulate decoded transaction groups with full `SimulateRequest` config (trace, extra opcode budget, unnamed-resource handling, unsigned txns). |

### Algod API Tools (13 tools)

Live, current-state reads against an Algod node. **Default choice for account/application/asset lookups** — the matching indexer endpoints were intentionally disabled to keep the tool surface lean (see [.notes/redundant-tools-report.md](.notes/redundant-tools-report.md)). Use the indexer family below only when you need historical or filtered queries that algod cannot serve.

| Tool | Description |
|---|---|
| `api_algod_get_account_info` | Get account balance, assets, and auth address |
| `api_algod_get_account_application_info` | Get account-specific application info |
| `api_algod_get_account_asset_info` | Get account-specific asset info |
| `api_algod_get_application_by_id` | Get application information |
| `api_algod_get_application_box` | Get application box by name |
| `api_algod_get_application_boxes` | Get all application boxes |
| `api_algod_get_asset_by_id` | Get asset information |
| `api_algod_get_pending_transaction` | Get pending transaction info |
| `api_algod_get_pending_transactions_by_address` | Get pending transactions for an address |
| `api_algod_get_pending_transactions` | Get all pending transactions |
| `api_algod_get_transaction_params` | Get suggested transaction parameters |
| `api_algod_get_node_status` | Get current node status |
| `api_algod_get_node_status_after_block` | Get node status after a specific round |

### Indexer API Tools (10 tools)

Historical / filtered queries against an Algorand Indexer instance. Use these for time-range scans, paginated searches, log retrieval, and creator/holder discovery — anything algod's current-state endpoints cannot answer.

Seven indexer endpoints that duplicated algod equivalents (account-by-id, account assets, account app local states, application by id, application box, application boxes, asset by id) were intentionally disabled. They live commented-out in [src/tools/apiManager/indexer/](src/tools/apiManager/indexer/) and can be re-enabled in one place if needed.

| Tool | Description |
|---|---|
| `api_indexer_lookup_account_created_applications` | Get apps created by account |
| `api_indexer_search_for_accounts` | Search accounts with filters (asset/app holdings, balance ranges) |
| `api_indexer_lookup_application_logs` | Get application log messages over a round range |
| `api_indexer_search_for_applications` | Search applications by creator |
| `api_indexer_lookup_asset_balances` | Get all accounts holding an asset with their balances |
| `api_indexer_lookup_asset_transactions` | Get transactions involving an asset (time/round/address-role filters) |
| `api_indexer_search_for_assets` | Search assets by creator, name, or unit |
| `api_indexer_lookup_transaction_by_id` | Get a confirmed transaction by ID |
| `api_indexer_lookup_account_transactions` | Get an account's transaction history (time/round/type/asset filters) |
| `api_indexer_search_for_transactions` | Search transactions across the chain with filters |

### NFDomains Tools (6 tools)

| Tool | Description |
|---|---|
| `api_nfd_get_nfd` | Get NFD by name or application ID |
| `api_nfd_get_nfds_for_addresses` | Get NFDs for specific addresses |
| `api_nfd_get_nfd_activity` | Get activity/changes for NFDs |
| `api_nfd_get_nfd_analytics` | Get NFD analytics data |
| `api_nfd_browse_nfds` | Browse NFDs with filters |
| `api_nfd_search_nfds` | Search NFDs |

### Tinyman AMM Tools (9 tools)

| Tool | Description |
|---|---|
| `api_tinyman_get_pool` | Get pool info by asset pair |
| `api_tinyman_get_pool_analytics` | Get pool analytics |
| `api_tinyman_get_pool_creation_quote` | Get quote for creating a pool |
| `api_tinyman_get_liquidity_quote` | Get quote for adding liquidity |
| `api_tinyman_get_remove_liquidity_quote` | Get quote for removing liquidity |
| `api_tinyman_get_swap_quote` | Get quote for swapping assets |
| `api_tinyman_get_asset_optin_quote` | Get quote for asset opt-in |
| `api_tinyman_get_validator_optin_quote` | Get quote for validator opt-in |
| `api_tinyman_get_validator_optout_quote` | Get quote for validator opt-out |

### Haystack Router Tools (3 tools)

| Tool | Description |
|---|---|
| `api_haystack_get_swap_quote` | Get optimized swap quote with routing across Tinyman V2, Pact, Folks, and LST protocols |
| `api_haystack_execute_swap` | All-in-one swap: quote → sign (via wallet) → submit → confirm |
| `api_haystack_needs_optin` | Check if address needs asset opt-in before swapping |

### Pera Wallet Tools (3 tools)

| Tool | Description |
|---|---|
| `api_pera_asset_verification_status` | Get verification status of a mainnet asset (verified, trusted, suspicious, unknown) |
| `api_pera_verified_asset_details` | Get detailed asset info from Pera (name, unit, logo, decimals, verification) |
| `api_pera_verified_asset_search` | Search Pera verified assets by name, unit name, or keyword |

> Pera Wallet tools are **mainnet only** — the Pera public API does not support testnet or localnet.

### Alpha Arcade Tools (14 tools)

Trade on-chain prediction markets (YES/NO outcomes) denominated in USDC. All prices and quantities use microunits (1,000,000 = $1.00 or 1 share). Read-only tools work without a wallet; trading tools require an active wallet account.

| Tool | Description |
|---|---|
| `alpha_get_live_markets` | Fetch all live prediction markets with prices, volume, and categories |
| `alpha_get_reward_markets` | Fetch markets with liquidity rewards (requires `ALPHA_API_KEY` env var) |
| `alpha_get_market` | Fetch full details for a single market by app ID |
| `alpha_get_orderbook` | Unified YES-perspective orderbook with spread calculation |
| `alpha_get_open_orders` | Open orders for a wallet on a specific market |
| `alpha_get_positions` | YES/NO token positions across all markets |
| `alpha_create_limit_order` | Place a limit order at a specific price (locks ~0.957 ALGO collateral) |
| `alpha_create_market_order` | Place a market order with auto-matching and slippage tolerance |
| `alpha_cancel_order` | Cancel an open order (refunds USDC/tokens and ALGO collateral) |
| `alpha_amend_order` | Edit an existing unfilled order in-place (price, quantity, slippage) |
| `alpha_propose_match` | Propose a match between an existing maker order and your wallet |
| `alpha_split_shares` | Split USDC into equal YES + NO outcome tokens |
| `alpha_merge_shares` | Merge equal YES + NO tokens back into USDC |
| `alpha_claim` | Claim USDC from a resolved market by redeeming winning tokens |

> Optional env var: `ALPHA_API_KEY` — needed for reward market data. `ALPHA_API_BASE_URL` — custom API endpoint (default: `https://platform.alphaarcade.com/api`).

### ARC-26 URI Tools (1 tool)

| Tool | Description |
|---|---|
| `generate_algorand_qrcode` | Generate Algorand URI and QR code per ARC-26 spec |

### Knowledge Tools (1 tool)

| Tool | Description |
|---|---|
| `get_knowledge_doc` | Get markdown content for Algorand knowledge documents |


## Resources

The server exposes MCP resources for direct data access. Wallet resources are described in the [Secure Wallet](#secure-wallet) section above.

### Knowledge Resources

| URI | Description |
|---|---|
| `algorand://knowledge/taxonomy` | Full Algorand knowledge taxonomy |
| `algorand://knowledge/taxonomy/arcs` | Algorand Request for Comments |
| `algorand://knowledge/taxonomy/sdks` | SDK documentation |
| `algorand://knowledge/taxonomy/algokit` | AlgoKit documentation |
| `algorand://knowledge/taxonomy/algokit-utils` | AlgoKit Utils documentation |
| `algorand://knowledge/taxonomy/tealscript` | TEALScript documentation |
| `algorand://knowledge/taxonomy/puya` | Puya documentation |
| `algorand://knowledge/taxonomy/liquid-auth` | Liquid Auth documentation |
| `algorand://knowledge/taxonomy/python` | Python SDK documentation |
| `algorand://knowledge/taxonomy/developers` | Developer documentation |
| `algorand://knowledge/taxonomy/clis` | CLI tools documentation |
| `algorand://knowledge/taxonomy/nodes` | Node management documentation |
| `algorand://knowledge/taxonomy/details` | Technical details documentation |

## Project Structure

```
algorand-mcp/
├── src/                         # TypeScript source
│   ├── index.ts                 # Server entry point
│   ├── networkConfig.ts         # Hardcoded network URLs and client factories
│   ├── algorand-client.ts       # Re-exports from networkConfig
│   ├── env.ts                   # Legacy env shim (unused)
│   ├── types.ts                 # Shared types (Zod schemas)
│   ├── resources/               # MCP Resources
│   │   ├── knowledge/           # Documentation taxonomy
│   │   └── wallet/              # Wallet resources
│   ├── tools/                   # MCP Tools
│   │   ├── commonParams.ts      # Network + pagination schema fragments
│   │   ├── walletManager.ts     # Agent wallet (SQLite-backed)
│   │   ├── accountManager.ts    # Account operations
│   │   ├── utilityManager.ts    # Utility functions
│   │   ├── algodManager.ts      # TEAL compile, simulate, submit
│   │   ├── arc26Manager.ts      # ARC-26 URI generation
│   │   ├── knowledgeManager.ts  # Knowledge document access
│   │   ├── transactionManager/  # Transaction building
│   │   │   ├── accountTransactions.ts
│   │   │   ├── assetTransactions.ts
│   │   │   ├── appTransactions/
│   │   │   └── generalTransaction.ts
│   │   └── apiManager/          # API integrations
│   │       ├── algod/           # Algod API
│   │       ├── indexer/         # Indexer API
│   │       ├── nfd/             # NFDomains
│   │       ├── tinyman/         # Tinyman AMM
│   │       ├── hayrouter/       # Haystack Router DEX aggregator
│   │       ├── pera/            # Pera Wallet verified assets
│   │       └── alpha/           # Alpha Arcade prediction markets
│   └── utils/
│       └── responseProcessor.ts # Pagination and formatting
├── tests/                       # Test suite
│   ├── helpers/                 # Shared test utilities
│   │   ├── mockFactories.ts     # Mock algod/indexer/keychain factories
│   │   ├── testConfig.ts        # Category enable/disable logic
│   │   ├── e2eSetup.ts          # E2E account provisioning + invokeTool()
│   │   └── testConstants.ts     # Well-known testnet addresses and asset IDs
│   ├── unit/                    # 11 unit test suites (mocked, fast)
│   ├── e2e/                     # 11 E2E test suites (live testnet)
│   │   ├── globalSetup.ts       # Account provisioning + fund-check
│   │   └── globalTeardown.ts    # Cleanup
│   └── jest.config.e2e.js       # E2E-specific Jest config
├── dist/                        # Compiled output
├── jest.config.js               # Unit test Jest config
├── tsconfig.json                # Production TypeScript config
├── tsconfig.test.json           # Test TypeScript config
└── package.json
```

## Response Format

All tool responses follow the MCP content format. API responses include automatic pagination when datasets exceed `itemsPerPage` (default 10):

```json
{
  "data": { ... },
  "metadata": {
    "totalItems": 100,
    "itemsPerPage": 10,
    "currentPage": 1,
    "totalPages": 10,
    "hasNextPage": true,
    "pageToken": "eyJ..."
  }
}
```

Pass `pageToken` from a previous response to fetch the next page. Set `itemsPerPage` on any tool call to control page size.

## Development

```bash
# Install dependencies
npm install

# Type-check
npm run typecheck

# Build
npm run build

# Clean build output
npm run clean
```

## Testing

The project has a comprehensive dual-layer test suite: fast **unit tests** (mocked, no network) and real **E2E tests** (live testnet). Both use [Jest 29](https://jestjs.io/) with [ts-jest](https://kulshekhar.github.io/ts-jest/) and ESM support.

### Quick start

```bash
npm test                    # Unit tests (fast, no network)
npm run test:e2e            # E2E tests (testnet, generates account + fund link)
npm run test:all            # Both
```

### Unit tests

Unit tests cover all 11 tool categories with fully mocked network dependencies. They run in parallel and finish in ~5 seconds. No environment variables or funded accounts are needed.

```bash
npm test
```

**Coverage:** 11 suites, 75+ tests covering success paths, error handling, and edge cases for every tool category.

| Suite | What it tests |
|---|---|
| `accountManager` | Account creation, mnemonic round-trips, rekey parameter validation |
| `utilityManager` | Ping, address validation, encode/decode, sign/verify bytes, encode/decode objects |
| `walletManager` | Full lifecycle: add → list → switch → get info → sign data → remove (mocked keychain + SQLite) |
| `transactionManager` | Payment, asset, app transaction building; sign_transaction; assign_group_id |
| `algodManager` | TEAL compile/disassemble, send raw, simulate |
| `apiAlgod` | All 13 algod API tools with correct mock routing |
| `apiIndexer` | All 10 active indexer API tools with fluent builder mocks |
| `apiNfd` | NFD get/search/browse with mocked fetch |
| `apiTinyman` | Tinyman pool/swap with error handling |
| `arc26Manager` | ARC-26 URI generation and QR code SVG output |
| `knowledgeManager` | Knowledge document retrieval and missing-doc error handling |

#### How mocking works

Unit tests use `jest.unstable_mockModule()` (ESM-compatible) to intercept imports before they load. The shared [tests/helpers/mockFactories.ts](tests/helpers/mockFactories.ts) provides:

- **`setupNetworkMocks()`** — Replaces `algorand-client.ts` with mock algod/indexer clients that return deterministic responses without any network calls.
- **`createKeychainMock()`** — Replaces `@napi-rs/keyring` with an in-memory `Map`, so wallet tests work without an OS keychain.
- **Fluent Proxy mocks** — Algorand's Indexer SDK uses a builder pattern (`.searchForAssets().limit(5).do()`). The mock factory uses ES `Proxy` objects that return themselves for any chained method and resolve when `.do()` is called.

### E2E tests

E2E tests call tool handlers directly against **Algorand testnet** (via [AlgoNode](https://algonode.io/) public nodes). They run serially to avoid rate-limiting.

```bash
npm run test:e2e
```

On first run (no mnemonic provided), the test setup:
1. Generates a new Algorand account
2. Prints the address and mnemonic
3. Prints a fund link: https://lora.algokit.io/testnet/fund
4. Runs all tests (unfunded tests still pass)

To run with a funded account:

```bash
E2E_MNEMONIC="word1 word2 ... word25" npm run test:e2e
```

**Coverage:** 11 suites, 35+ tests covering real network interactions.

| Suite | What it tests |
|---|---|
| `account` | Account creation, mnemonic-to-key round-trip chain |
| `utility` | Ping, address validation, encode/decode, sign/verify bytes, encode/decode objects |
| `wallet` | Full wallet lifecycle: add → list → switch → get info → get assets → sign data → remove |
| `transaction` | Build payment → sign → verify txID; build asset opt-in; build group with assign_group_id |
| `algod` | Compile + disassemble TEAL round-trip |
| `algodApi` | Account info, suggested params, node status, asset info via algod |
| `indexerApi` | Account lookup, asset/transaction/account search via indexer |
| `nfd` | Look up "algo.algo", search NFDs, browse NFDs |
| `tinyman` | Get ALGO/USDC pool |
| `arc26` | Generate ARC-26 URI, verify format + QR SVG |
| `knowledge` | Retrieve known knowledge doc content |

### Category activation

E2E tests can be selectively enabled by category or individual tool via environment variables. **By default all categories are enabled.**

#### Enable specific categories

```bash
E2E_WALLET=1 npm run test:e2e            # Only wallet tests
E2E_ALGOD=1 E2E_UTILITY=1 npm run test:e2e  # Algod + utility tests
```

#### Available category flags

| Env var | Category |
|---|---|
| `E2E_ALL=1` | All categories (explicit) |
| `E2E_WALLET=1` | Wallet tools |
| `E2E_ACCOUNT=1` | Account tools |
| `E2E_UTILITY=1` | Utility tools |
| `E2E_TRANSACTION=1` | Transaction tools |
| `E2E_ALGOD=1` | Algod tools |
| `E2E_ALGOD_API=1` | Algod API tools |
| `E2E_INDEXER_API=1` | Indexer API tools |
| `E2E_NFD=1` | NFDomains tools |
| `E2E_TINYMAN=1` | Tinyman tools |
| `E2E_ARC26=1` | ARC-26 tools |
| `E2E_KNOWLEDGE=1` | Knowledge tools |

**Important:** Setting any individual flag (e.g. `E2E_WALLET=1`) disables all other categories unless `E2E_ALL=1` is also set.

#### Enable specific tools

```bash
E2E_TOOLS=ping,validate_address npm run test:e2e
```

The `E2E_TOOLS` variable accepts a comma-separated list of tool names. Only tests for those specific tools will run.

### Test file structure

```
tests/
├── helpers/
│   ├── mockFactories.ts       # Mock algod/indexer/keychain factories
│   ├── testConfig.ts          # Category enable/disable logic
│   ├── e2eSetup.ts            # E2E account provisioning + invokeTool()
│   └── testConstants.ts       # Well-known testnet addresses and asset IDs
├── unit/                      # 11 unit test files (*.test.ts)
│   ├── accountManager.test.ts
│   ├── utilityManager.test.ts
│   ├── walletManager.test.ts
│   ├── transactionManager.test.ts
│   ├── algodManager.test.ts
│   ├── apiAlgod.test.ts
│   ├── apiIndexer.test.ts
│   ├── apiNfd.test.ts
│   ├── apiTinyman.test.ts
│   ├── arc26Manager.test.ts
│   └── knowledgeManager.test.ts
├── e2e/                       # 11 E2E test files (*.e2e.test.ts)
│   ├── globalSetup.ts         # Account provisioning + fund-check
│   ├── globalTeardown.ts      # Cleanup
│   ├── account.e2e.test.ts
│   ├── utility.e2e.test.ts
│   ├── wallet.e2e.test.ts
│   ├── transaction.e2e.test.ts
│   ├── algod.e2e.test.ts
│   ├── algodApi.e2e.test.ts
│   ├── indexerApi.e2e.test.ts
│   ├── nfd.e2e.test.ts
│   ├── tinyman.e2e.test.ts
│   ├── arc26.e2e.test.ts
│   └── knowledge.e2e.test.ts
└── jest.config.e2e.js         # E2E-specific Jest config
```

### Jest configuration

| Config | Purpose | Key settings |
|---|---|---|
| `jest.config.js` (root) | Unit tests | `testTimeout: 10s`, parallel workers, `testMatch: tests/unit/**` |
| `tests/jest.config.e2e.js` | E2E tests | `testTimeout: 60s`, `maxWorkers: 1` (serial), `globalSetup/globalTeardown` |
| `tsconfig.test.json` | TypeScript for tests | `rootDir: "."`, includes both `src/` and `tests/` |

### Writing new tests

**Unit test template:**

```typescript
import { jest } from '@jest/globals';
import { setupNetworkMocks } from '../helpers/mockFactories.js';

jest.unstable_mockModule('../../src/algorand-client.js', () => setupNetworkMocks());

const { YourManager } = await import('../../src/tools/yourManager.js');

describe('YourManager', () => {
  it('does something', async () => {
    const result = await YourManager.handleTool('tool_name', { arg: 'value' });
    const data = JSON.parse(result.content[0].text);
    expect(data.field).toBeDefined();
  });
});
```

**E2E test template:**

```typescript
import { describeIf, testConfig } from '../helpers/testConfig.js';
import { invokeTool, parseToolResponse } from '../helpers/e2eSetup.js';

describeIf(testConfig.isCategoryEnabled('your-category'))('Your Tools (E2E)', () => {
  it('does something on testnet', async () => {
    const data = parseToolResponse(
      await invokeTool('tool_name', { arg: 'value', network: 'testnet' }),
    );
    expect(data.field).toBeDefined();
  });
});
```

## Dependencies

- [algosdk](https://github.com/algorand/js-algorand-sdk) v3 — Algorand JavaScript SDK
- [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk) — MCP TypeScript SDK
- [@napi-rs/keyring](https://github.com/nicolo-ribaudo/napi-keyring) — Native OS keychain access (macOS Keychain, Linux libsecret, Windows Credential Manager). Used as a backward-compatibility read fallback for accounts created by pre-DB-migration installs; new mnemonics are written only to `wallet.db`.
- [sql.js](https://github.com/sql-js/sql.js) — Embedded SQLite (WASM) for wallet metadata persistence
- [@noble/curves](https://github.com/paulmillr/noble-curves) — Pure JS Ed25519 for raw data signing (`wallet_sign_data`)
- [@tinymanorg/tinyman-js-sdk](https://github.com/tinymanorg/tinyman-js-sdk) — Tinyman AMM SDK
- [@alpha-arcade/sdk](https://github.com/pfrfrfr/alpha-js-sdk) — Alpha Arcade prediction market SDK
- [zod](https://github.com/colinhacks/zod) — Runtime type validation
- [qrcode](https://github.com/soldair/node-qrcode) — QR code generation for ARC-26

## License

MIT
