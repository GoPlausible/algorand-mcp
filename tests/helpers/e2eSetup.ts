/**
 * E2E shared state and utilities.
 * All E2E test files import from here.
 */

// Global BigInt JSON serialization — algosdk v3 returns BigInt for numeric fields
(BigInt.prototype as any).toJSON = function () { return Number(this); };

import algosdk from 'algosdk';

export interface E2EAccount {
  address: string;
  secretKeyHex: string;
  mnemonic: string;
}

/** Gets the provisioned E2E account (set by globalSetup via env var). */
export function getE2EAccount(): E2EAccount {
  const mnemonic = process.env.__E2E_MNEMONIC;
  if (!mnemonic) {
    throw new Error(
      'E2E account not provisioned. Run with E2E_MNEMONIC env var or let globalSetup create one.',
    );
  }
  const { sk, addr } = algosdk.mnemonicToSecretKey(mnemonic);
  return {
    address: addr.toString(),
    secretKeyHex: algosdk.bytesToHex(sk),
    mnemonic,
  };
}

/**
 * Invokes a tool handler directly (bypasses MCP transport).
 * Mirrors the routing in src/index.ts.
 */
export async function invokeTool(
  toolName: string,
  args: Record<string, unknown>,
): Promise<any> {
  const {
    AccountManager,
    WalletManager,
    UtilityManager,
    TransactionManager,
    AlgodManager,
    handleApiManager,
    arc26Manager,
    KnowledgeManager,
  } = await import('../../src/tools/index.js');

  if (toolName.startsWith('wallet_')) return WalletManager.handleTool(toolName, args);

  if (
    toolName.startsWith('create_account') ||
    toolName.startsWith('rekey_account') ||
    toolName.startsWith('mnemonic_') ||
    toolName.startsWith('mdk_') ||
    toolName.startsWith('seed_') ||
    toolName.startsWith('secret_key_')
  ) {
    return AccountManager.handleTool(toolName, args);
  }

  if (
    toolName === 'ping' ||
    toolName.startsWith('validate_address') ||
    toolName.startsWith('encode_address') ||
    toolName.startsWith('decode_address') ||
    toolName.startsWith('get_application_address') ||
    toolName.startsWith('bytes_to_bigint') ||
    toolName.startsWith('bigint_to_bytes') ||
    toolName.startsWith('encode_uint64') ||
    toolName.startsWith('decode_uint64') ||
    toolName.startsWith('verify_bytes') ||
    toolName.startsWith('sign_bytes') ||
    toolName.startsWith('encode_obj') ||
    toolName.startsWith('decode_obj')
  ) {
    return UtilityManager.handleTool(toolName, args);
  }

  if (
    toolName.startsWith('compile_') ||
    toolName.startsWith('disassemble_') ||
    toolName.startsWith('send_raw_') ||
    toolName.startsWith('simulate_')
  ) {
    return AlgodManager.handleTool(toolName, args);
  }

  if (toolName.startsWith('make_') || toolName === 'assign_group_id' || toolName === 'sign_transaction') {
    return TransactionManager.handleTool(toolName, args);
  }

  if (toolName.startsWith('api_')) return handleApiManager(toolName, args);
  if (toolName === 'generate_algorand_uri') return arc26Manager.handleTool(toolName, args);
  if (toolName.startsWith('get_knowledge_')) return KnowledgeManager.handleTool(toolName, args);

  throw new Error(`Unknown tool: ${toolName}`);
}

/** Parses the JSON text from a standard MCP tool response */
export function parseToolResponse(result: any): any {
  const text = result?.content?.[0]?.text;
  if (!text) return result;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
