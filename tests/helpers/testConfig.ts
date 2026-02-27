/**
 * Category/tool enable-disable logic for E2E tests.
 *
 * Environment variables:
 *   E2E_ALL=1              — enable all categories
 *   E2E_WALLET=1           — enable wallet category
 *   E2E_ACCOUNT=1          — enable account category
 *   E2E_UTILITY=1          — enable utility category
 *   E2E_TRANSACTION=1      — enable transaction category
 *   E2E_ALGOD=1            — enable algod category
 *   E2E_ALGOD_API=1        — enable algod-api category
 *   E2E_INDEXER_API=1      — enable indexer-api category
 *   E2E_NFD=1              — enable nfd category
 *   E2E_TINYMAN=1          — enable tinyman category
 *   E2E_ARC26=1            — enable arc26 category
 *   E2E_KNOWLEDGE=1        — enable knowledge category
 *   E2E_TOOLS=tool1,tool2  — enable specific tools only
 *
 * Default (no env vars set): all categories enabled.
 */

export const TOOL_CATEGORIES = [
  'wallet', 'account', 'utility', 'transaction', 'algod',
  'algod-api', 'indexer-api', 'nfd', 'tinyman', 'arc26', 'knowledge',
] as const;

export type ToolCategory = typeof TOOL_CATEGORIES[number];

interface TestConfig {
  mnemonic: string | undefined;
  isCategoryEnabled(category: ToolCategory): boolean;
  isToolEnabled(toolName: string): boolean;
  network: 'testnet';
}

const toolCategoryMap: Record<string, ToolCategory> = {
  'wallet_': 'wallet',
  'create_account': 'account',
  'rekey_account': 'account',
  'mnemonic_': 'account',
  'mdk_': 'account',
  'secret_key_': 'account',
  'seed_': 'account',
  'ping': 'utility',
  'validate_address': 'utility',
  'encode_address': 'utility',
  'decode_address': 'utility',
  'get_application_address': 'utility',
  'bytes_to_bigint': 'utility',
  'bigint_to_bytes': 'utility',
  'encode_uint64': 'utility',
  'decode_uint64': 'utility',
  'verify_bytes': 'utility',
  'sign_bytes': 'utility',
  'encode_obj': 'utility',
  'decode_obj': 'utility',
  'make_': 'transaction',
  'assign_group_id': 'transaction',
  'sign_transaction': 'transaction',
  'compile_': 'algod',
  'disassemble_': 'algod',
  'send_raw_': 'algod',
  'simulate_': 'algod',
  'api_algod_': 'algod-api',
  'api_indexer_': 'indexer-api',
  'api_nfd_': 'nfd',
  'api_tinyman_': 'tinyman',
  'generate_algorand_uri': 'arc26',
  'get_knowledge_': 'knowledge',
};

function getToolCategory(toolName: string): ToolCategory | undefined {
  // Exact match first, then prefix
  if (toolCategoryMap[toolName]) return toolCategoryMap[toolName];
  for (const [prefix, category] of Object.entries(toolCategoryMap)) {
    if (toolName.startsWith(prefix)) return category;
  }
  return undefined;
}

function buildConfig(): TestConfig {
  const enableAll = process.env.E2E_ALL === '1';

  const specificTools = process.env.E2E_TOOLS
    ? process.env.E2E_TOOLS.split(',').map(t => t.trim())
    : [];

  const enabledCategories = new Set<ToolCategory>();
  for (const cat of TOOL_CATEGORIES) {
    const envKey = `E2E_${cat.toUpperCase().replace(/-/g, '_')}`;
    if (enableAll || process.env[envKey] === '1') {
      enabledCategories.add(cat);
    }
  }

  return {
    mnemonic: process.env.E2E_MNEMONIC,
    network: 'testnet',

    isCategoryEnabled(category: ToolCategory): boolean {
      if (enableAll) return true;
      if (enabledCategories.has(category)) return true;
      if (specificTools.length > 0) {
        return specificTools.some(t => getToolCategory(t) === category);
      }
      // Default: if nothing is set, enable all
      if (enabledCategories.size === 0 && specificTools.length === 0) return true;
      return false;
    },

    isToolEnabled(toolName: string): boolean {
      if (enableAll) return true;
      if (specificTools.length > 0) {
        return specificTools.includes(toolName);
      }
      const category = getToolCategory(toolName);
      if (!category) return false;
      return this.isCategoryEnabled(category);
    },
  };
}

export const testConfig = buildConfig();

/** Wraps describe — skips entire suite when condition is false */
export function describeIf(condition: boolean) {
  return condition ? describe : describe.skip;
}

/** Wraps it — skips individual test when condition is false */
export function itIf(condition: boolean) {
  return condition ? it : it.skip;
}
