// Minimal environment config — most settings are now per-tool-call args
// or hardcoded in networkConfig.ts

export const env = {
  // Agent wallet mnemonic (will move to keychain in a future phase)
  algorand_agent_wallet: process.env.ALGORAND_AGENT_WALLET || '',

  // NFDomains
  nfd_api_url: process.env.NFD_API_URL || 'https://api.nf.domains',
};
