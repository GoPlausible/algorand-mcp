import algosdk from 'algosdk';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { withCommonParams } from './commonParams.js';
import { getAlgodClient, extractNetwork, type NetworkId } from '../algorand-client.js';
import { WalletManager } from './walletManager.js';

// ── CAIP-2 ↔ MCP network mapping ─────────────────────────────────────────────

const CAIP2_GENESIS_TO_NETWORK: Record<string, NetworkId> = {
  'wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=': 'mainnet',
  'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=': 'testnet',
};

const NETWORK_TO_CAIP2: Record<NetworkId, string> = {
  mainnet: 'algorand:wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=',
  testnet: 'algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',
  localnet: 'algorand:localnet',
};

function caip2ToNetwork(caip2: string): NetworkId | null {
  if (!caip2.startsWith('algorand:')) return null;
  const hash = caip2.slice('algorand:'.length);
  return CAIP2_GENESIS_TO_NETWORK[hash] ?? null;
}

// ── Bazaar (discovery) config ────────────────────────────────────────────────

const BAZAAR_BASE_URL = process.env.BAZAAR_BASE_URL || 'https://facilitator.goplausible.xyz';

/**
 * Friendly network name → CAIP-2 identifier expected by the Bazaar API.
 * Anything starting with a known chain prefix (algorand:, eip155:, solana:) is
 * passed through unchanged. Anything else is left as-is so the agent can
 * still forward arbitrary upstream-supported network strings.
 */
function friendlyToCaip2Network(input: string): string {
  if (!input) return input;
  if (input.startsWith('algorand:') || input.startsWith('eip155:') || input.startsWith('solana:')) {
    return input;
  }
  // Algorand friendly aliases.
  if (input === 'algorand-mainnet' || input === 'mainnet') return NETWORK_TO_CAIP2.mainnet;
  if (input === 'algorand-testnet' || input === 'testnet') return NETWORK_TO_CAIP2.testnet;
  if (input === 'algorand-localnet' || input === 'localnet') return NETWORK_TO_CAIP2.localnet;
  // Pass through for non-Algorand short names — the Bazaar may or may not
  // recognize them; if not, it returns an empty items[] which is fine.
  return input;
}

// ── x402 protocol types ──────────────────────────────────────────────────────

interface PaymentRequirement {
  scheme: string;
  network: string;
  // V2 canonical field name; V1 used `maxAmountRequired`. We accept either and
  // read it via getRequirementAmount(). At least one must be present.
  amount?: string;
  maxAmountRequired?: string;
  payTo: string;
  asset: string;
  resource?: string;
  description?: string;
  mimeType?: string;
  outputSchema?: unknown;
  maxTimeoutSeconds?: number;
  extra?: {
    name?: string;
    decimals?: number;
    feePayer?: string;
    [key: string]: unknown;
  };
}

interface PaymentRequiredResponse {
  x402Version: number;
  accepts: PaymentRequirement[];
  error?: string;
  resource?: unknown;
  extensions?: Record<string, unknown>;
}

const ATOMIC_UNITS_NOTE = 'USDC amounts are expressed in atomic units. 1,000,000 atomic units = $1.00 USDC (USDC has 6 decimals).';

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const;
type HttpMethod = (typeof HTTP_METHODS)[number];

// ── Tool schemas ─────────────────────────────────────────────────────────────

const x402ToolSchemas = {
  discoverPaymentRequirements: {
    type: 'object',
    properties: {
      baseURL: { type: 'string', description: 'Base URL of the x402-protected endpoint, e.g. https://example.x402.goplausible.xyz' },
      path: { type: 'string', description: 'Path under baseURL, e.g. /weather' },
      method: { type: 'string', enum: HTTP_METHODS, description: 'HTTP method to probe' },
      queryParams: { type: 'object', description: 'Optional query string parameters', additionalProperties: { type: 'string' } },
      body: { description: 'Optional request body. Strings are sent verbatim; objects are JSON-encoded.' },
    },
    required: ['baseURL', 'path', 'method'],
  },
  makeHttpRequestWithX402: {
    type: 'object',
    properties: {
      baseURL: { type: 'string', description: 'Base URL of the x402-protected endpoint' },
      path: { type: 'string', description: 'Path under baseURL' },
      method: { type: 'string', enum: HTTP_METHODS, description: 'HTTP method' },
      queryParams: { type: 'object', description: 'Optional query string parameters', additionalProperties: { type: 'string' } },
      body: { description: 'Optional request body. Strings are sent verbatim; objects are JSON-encoded.' },
      headers: { type: 'object', description: 'Optional additional request headers', additionalProperties: { type: 'string' } },
      correlationId: { type: 'string', description: 'Optional correlation id; forwarded as X-Correlation-ID header' },
      maxAmountPerRequest: { type: 'integer', description: 'Maximum payment in USDC atomic units (1,000,000 = $1.00). If a payment requirement exceeds this, the call is refused.' },
      paymentRequirements: {
        type: 'array',
        description: 'Pre-fetched accepts[] array from a prior x402_discover_payment_requirements call. If omitted, this tool discovers internally. Each element must be an OBJECT with at least { scheme, network, payTo, asset, amount }. Common mistake: passing `preferredNetwork` or `maxAmountPerRequest` as array elements instead of sibling top-level fields.',
        items: {
          type: 'object',
          required: ['scheme', 'network', 'payTo', 'asset'],
          properties: {
            scheme: { type: 'string' },
            network: { type: 'string', description: 'CAIP-2 network identifier, e.g. "algorand:SGO1…" for testnet.' },
            amount: { type: 'string', description: 'x402 V2 canonical amount field (atomic units as decimal string).' },
            maxAmountRequired: { type: 'string', description: 'x402 V1 legacy amount field. Either `amount` or `maxAmountRequired` must be present.' },
            payTo: { type: 'string' },
            asset: { type: 'string' },
            maxTimeoutSeconds: { type: 'integer' },
            extra: { type: 'object' }
          }
        }
      },
      preferredNetwork: {
        type: 'string',
        enum: ['mainnet', 'testnet', 'localnet'],
        description: 'TOP-LEVEL sibling of paymentRequirements (NOT an array element). Preferred Algorand network when multiple accepts entries match. If omitted, the cheapest affordable Algorand entry is chosen.'
      },
      extensions: { type: 'object', description: 'Optional pre-fetched PaymentRequired extensions (e.g. Bazaar resource details). Passed through to the response under `extensions`.' },
    },
    required: ['baseURL', 'path', 'method'],
  },
  bazaarList: {
    type: 'object',
    properties: {
      network: { type: 'string', description: 'Filter by network. Accepts friendly names ("algorand-mainnet", "algorand-testnet", "algorand-localnet", or bare "mainnet"/"testnet"/"localnet") or raw CAIP-2 strings ("algorand:wGHE2Pw…", "eip155:84532", "solana:EtWT…"). Friendly names are translated to CAIP-2 before the request.' },
      method: { type: 'string', enum: HTTP_METHODS, description: 'Filter by HTTP method.' },
      merchantId: { type: 'string', description: 'Filter by merchant id.' },
      limit: { type: 'integer', description: 'Results per page (default 50, max 100).' },
      offset: { type: 'integer', description: 'Pagination offset.' },
      full: { type: 'boolean', description: 'If true, returns each item verbatim from the facilitator (large — includes full accepts[] and discoveryInfo). If false or omitted, returns a compact summary per item (URL, method, description, popularity counters, and just the Algorand-payable accepts).' },
    },
    required: [],
  },
  bazaarSearch: {
    type: 'object',
    properties: {
      query: { type: 'string', description: 'Keyword to match in resource URL and description (minimum 1 char).', minLength: 1 },
      limit: { type: 'integer', description: 'Max results to return (1–20, default 10).', minimum: 1, maximum: 20 },
      network: { type: 'string', description: 'Filter by network (friendly name or CAIP-2). See bazaar_list for accepted values.' },
      includeTestnets: { type: 'boolean', description: 'If true, include testnet/devnet networks in the results. Default false (mainnet-only).' },
      scheme: { type: 'string', enum: ['exact', 'upto'], description: 'Client-side filter — only return resources whose accepts[] includes this payment scheme.' },
      maxUsdPrice: { type: 'number', description: 'Client-side filter — exclude resources whose cheapest accepts entry exceeds this USD price (computed from amount + asset decimals). Assumes USDC pricing.', exclusiveMinimum: 0 },
      asset: { type: 'string', description: 'Client-side filter — only return resources whose accepts[] includes this asset id.' },
      payTo: { type: 'string', description: 'Client-side filter — only return resources whose accepts[] includes this recipient address.' },
      extensions: { type: 'string', description: 'Client-side filter — only return resources whose discoveryInfo / extensions object contains this key (e.g. "bazaar", "outputSchema").' },
    },
    required: ['query'],
  },
  bazaarGetResourceDetails: {
    type: 'object',
    properties: {
      resource: { type: 'string', description: 'Exact resource URL to fetch details for (must match the resourceUrl as registered in the Bazaar).' },
    },
    required: ['resource'],
  },
};

// ── X402Manager ──────────────────────────────────────────────────────────────

export class X402Manager {
  static readonly x402Tools = [
    {
      name: 'x402_discover_payment_requirements',
      description: 'Probe an x402-protected HTTP endpoint and return its payment requirements (the `accepts` array from the 402 response) without paying. Use this to inspect cost and supported networks/assets before calling `make_http_request_with_x402`.',
      inputSchema: withCommonParams(x402ToolSchemas.discoverPaymentRequirements),
    },
    {
      name: 'make_http_request_with_x402',
      description: 'Call an x402-protected HTTP endpoint with automatic USDC/ALGO payment from the active wallet. If `paymentRequirements` is not supplied, this tool runs discovery internally (one extra request). Builds an atomic 2-transaction group (facilitator fee-payer + wallet payment), signs the payment leg with the wallet, and resends with the `PAYMENT-SIGNATURE` header.',
      inputSchema: withCommonParams(x402ToolSchemas.makeHttpRequestWithX402),
    },
    {
      name: 'bazaar_list',
      description: 'Browse paid API resources cataloged in the Bazaar (the discovery directory hosted by the configured facilitator). Returns a compact summary per resource by default; pass `full: true` for the verbatim facilitator response. Supports filtering by `network`, `method`, `merchantId`, plus standard `limit`/`offset` pagination.',
      inputSchema: withCommonParams(x402ToolSchemas.bazaarList),
    },
    {
      name: 'bazaar_search',
      description: 'Search Bazaar paid API resources by keyword. Hits the same /discovery/resources endpoint as bazaar_list but with the `search` query forwarded to the facilitator. Additional filters (`scheme`, `maxUsdPrice`, `asset`, `payTo`, `extensions`, `includeTestnets`) are applied client-side after the response. Defaults to mainnet-only.',
      inputSchema: withCommonParams(x402ToolSchemas.bazaarSearch),
    },
    {
      name: 'bazaar_get_resource_details',
      description: 'Fetch full details for a single Bazaar resource by its exact `resource` URL. Internally calls /discovery/resources?search=<url> and exact-matches against resourceUrl. Returns the verbatim resource record (accepts[], discoveryInfo / extensions, popularity counters) or an error if no match is found.',
      inputSchema: withCommonParams(x402ToolSchemas.bazaarGetResourceDetails),
    },
  ];

  // ── Public dispatch ────────────────────────────────────────────────────────

  static async handleTool(name: string, args: Record<string, unknown>) {
    try {
      switch (name) {
        case 'x402_discover_payment_requirements':
          return await X402Manager.handleDiscover(args);
        case 'make_http_request_with_x402':
          return await X402Manager.handlePaidRequest(args);
        case 'bazaar_list':
          return await X402Manager.handleBazaarList(args);
        case 'bazaar_search':
          return await X402Manager.handleBazaarSearch(args);
        case 'bazaar_get_resource_details':
          return await X402Manager.handleBazaarGetResourceDetails(args);
        default:
          throw new McpError(ErrorCode.MethodNotFound, `Unknown x402 tool: ${name}`);
      }
    } catch (error) {
      if (error instanceof McpError) throw error;
      throw new McpError(
        ErrorCode.InternalError,
        `x402 operation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  // ── Tool handlers ──────────────────────────────────────────────────────────

  private static async handleDiscover(args: Record<string, unknown>) {
    const { baseURL, path, method, queryParams, body } = X402Manager.requireHttpArgs(args);
    const result = await X402Manager.discover({ baseURL, path, method, queryParams, body });
    return X402Manager.textResponse({ result });
  }

  private static async handlePaidRequest(args: Record<string, unknown>) {
    const { baseURL, path, method, queryParams, body } = X402Manager.requireHttpArgs(args);
    const headers = (args.headers as Record<string, string> | undefined) ?? {};
    const correlationId = typeof args.correlationId === 'string' ? args.correlationId : undefined;
    const maxAmountPerRequest = typeof args.maxAmountPerRequest === 'number' ? args.maxAmountPerRequest : undefined;
    const preferredNetwork = typeof args.preferredNetwork === 'string' ? (args.preferredNetwork as NetworkId) : undefined;
    const extensions = (args.extensions as Record<string, unknown> | undefined) ?? undefined;
    let accepts = Array.isArray(args.paymentRequirements) ? (args.paymentRequirements as unknown[]) : undefined;

    // 1a. Defensive validation: every paymentRequirements entry must be an
    //     object with at least { network, payTo, asset } and an amount field
    //     (either x402 V2 `amount` or V1 `maxAmountRequired`). LLMs frequently
    //     malform JSON by appending sibling field names (e.g. "preferredNetwork")
    //     as bare strings inside this array — catch that here with an actionable
    //     message rather than crashing later in selectRequirement.
    if (accepts) {
      for (let i = 0; i < accepts.length; i++) {
        const entry = accepts[i];
        const isObject = !!entry && typeof entry === 'object' && !Array.isArray(entry);
        if (!isObject) {
          throw new McpError(
            ErrorCode.InvalidParams,
            `paymentRequirements[${i}] must be an OBJECT (got ${entry === null ? 'null' : Array.isArray(entry) ? 'array' : typeof entry}: ${JSON.stringify(entry)}). Tip: pass the accepts[] array verbatim from x402_discover_payment_requirements. Other arguments like preferredNetwork and maxAmountPerRequest are TOP-LEVEL siblings of paymentRequirements, not array members.`
          );
        }
        const e = entry as Record<string, unknown>;
        const missing: string[] = [];
        if (typeof e.network !== 'string') missing.push('network');
        if (typeof e.payTo !== 'string') missing.push('payTo');
        if (typeof e.asset !== 'string') missing.push('asset');
        if (typeof e.amount !== 'string' && typeof e.maxAmountRequired !== 'string') missing.push('amount (or maxAmountRequired)');
        if (missing.length > 0) {
          throw new McpError(
            ErrorCode.InvalidParams,
            `paymentRequirements[${i}] is missing required string field(s): ${missing.join(', ')}. Expected shape: { scheme, network, payTo, asset, amount, extra: { feePayer, ... } }. Pass the accepts[] entry verbatim from x402_discover_payment_requirements.`
          );
        }
      }
    }

    // 1b. Discover if needed
    if (!accepts || accepts.length === 0) {
      const discovered = await X402Manager.discover({ baseURL, path, method, queryParams, body });
      if (!discovered.x402 || !Array.isArray(discovered.accepts) || discovered.accepts.length === 0) {
        throw new McpError(
          ErrorCode.InvalidRequest,
          `Endpoint did not return an x402 payment requirement (status ${discovered.status}). Use a non-x402 HTTP tool, or pass paymentRequirements explicitly.`
        );
      }
      accepts = discovered.accepts;
    }

    // 2. Select a requirement we can satisfy on Algorand
    const { requirement, mcpNetwork } = X402Manager.selectRequirement(accepts as PaymentRequirement[], preferredNetwork, maxAmountPerRequest);

    // 3. Build and sign the payment group
    const paymentHeader = await X402Manager.buildPaymentHeader(requirement, mcpNetwork);

    // 4. Retry with PAYMENT-SIGNATURE
    const paidHeaders: Record<string, string> = { ...headers, 'PAYMENT-SIGNATURE': paymentHeader };
    if (correlationId) paidHeaders['X-Correlation-ID'] = correlationId;

    const response = await X402Manager.httpRequest({ baseURL, path, method, queryParams, body, headers: paidHeaders });

    if (response.status === 402) {
      // Surface the server's rejection rather than retrying.
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Payment rejected by server: ${X402Manager.snippet(response.bodyText)}`
      );
    }

    const result = X402Manager.tryParseJson(response.bodyText) ?? response.bodyText;
    // Algorand x402 V2 uses lowercase `payment-response`; older deployments
    // may use Coinbase's `x-payment-response`. Accept either.
    const paymentResponseHeader = response.headers['payment-response']
      ?? response.headers['x-payment-response'];
    return X402Manager.textResponse({
      result,
      status: response.status,
      paymentResponse: paymentResponseHeader ? X402Manager.decodeBase64Json(paymentResponseHeader) : undefined,
      paid: {
        network: mcpNetwork,
        asset: requirement.asset,
        amount: X402Manager.getRequirementAmount(requirement),
        payTo: requirement.payTo,
      },
      extensions,
    });
  }

  // ── x402 protocol helpers ──────────────────────────────────────────────────

  /**
   * Returns the amount field from a PaymentRequirement, supporting both x402
   * spec versions:
   *   - V2 (current): `amount`
   *   - V1 (legacy):  `maxAmountRequired`
   * Prefers V2 if both are set (V2 deployments may include both for compat).
   */
  private static getRequirementAmount(req: PaymentRequirement): string | undefined {
    return req.amount ?? req.maxAmountRequired;
  }

  private static isValidPaymentRequiredResponse(v: unknown): v is PaymentRequiredResponse {
    return !!v
      && typeof v === 'object'
      && typeof (v as PaymentRequiredResponse).x402Version === 'number'
      && Array.isArray((v as PaymentRequiredResponse).accepts);
  }

  private static async discover(opts: {
    baseURL: string;
    path: string;
    method: HttpMethod;
    queryParams?: Record<string, string>;
    body?: unknown;
  }): Promise<{
    status: number;
    x402: boolean;
    accepts?: PaymentRequirement[];
    x402Version?: number;
    rawBody?: unknown;
  }> {
    const response = await X402Manager.httpRequest(opts);

    // 1. Canonical Algorand x402 V2 transport: requirements arrive in the
    //    `payment-required` HTTP header as base64-encoded JSON. The body is
    //    usually empty (`{}`). Check this first.
    const headerPayload = response.headers['payment-required'];
    if (headerPayload) {
      const decoded = X402Manager.decodeBase64Json(headerPayload);
      if (X402Manager.isValidPaymentRequiredResponse(decoded)) {
        return { status: response.status, x402: true, accepts: decoded.accepts, x402Version: decoded.x402Version };
      }
    }

    // 2. Fallback transport (some x402 servers put requirements in the 402 body).
    if (response.status === 402) {
      const parsed = X402Manager.tryParseJson(response.bodyText);
      if (X402Manager.isValidPaymentRequiredResponse(parsed)) {
        return { status: 402, x402: true, accepts: parsed.accepts, x402Version: parsed.x402Version };
      }
      return { status: 402, x402: false, rawBody: parsed ?? response.bodyText };
    }

    // 3. Not an x402-protected response at all.
    return { status: response.status, x402: false, rawBody: X402Manager.tryParseJson(response.bodyText) ?? response.bodyText };
  }

  private static selectRequirement(
    accepts: PaymentRequirement[],
    preferredNetwork: NetworkId | undefined,
    maxAmountPerRequest: number | undefined,
  ): { requirement: PaymentRequirement; mcpNetwork: NetworkId } {
    // Map each accepts entry to its MCP network (or null if non-Algorand).
    const ranked = accepts
      .map(req => ({ req, mcpNetwork: caip2ToNetwork(req.network) }))
      .filter((e): e is { req: PaymentRequirement; mcpNetwork: NetworkId } => e.mcpNetwork !== null);

    if (ranked.length === 0) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `No payment requirement is satisfiable on Algorand. Endpoint accepts networks: [${accepts.map(r => r.network).join(', ')}]`
      );
    }

    const amountOf = (req: PaymentRequirement): number => Number(X402Manager.getRequirementAmount(req));
    const inBudget = (req: PaymentRequirement) =>
      maxAmountPerRequest === undefined || amountOf(req) <= maxAmountPerRequest;

    const affordable = ranked.filter(e => inBudget(e.req));
    if (affordable.length === 0) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `All Algorand payment requirements exceed maxAmountPerRequest=${maxAmountPerRequest}. Cheapest: ${Math.min(...ranked.map(e => amountOf(e.req)))}.`
      );
    }

    if (preferredNetwork) {
      const preferred = affordable.find(e => e.mcpNetwork === preferredNetwork);
      if (preferred) return { requirement: preferred.req, mcpNetwork: preferred.mcpNetwork };
    }

    // No preference (or preference not matched): pick the cheapest affordable.
    const chosen = affordable.reduce((a, b) => amountOf(a.req) <= amountOf(b.req) ? a : b);
    return { requirement: chosen.req, mcpNetwork: chosen.mcpNetwork };
  }

  private static async buildPaymentHeader(requirement: PaymentRequirement, mcpNetwork: NetworkId): Promise<string> {
    const feePayer = requirement.extra?.feePayer;
    if (!feePayer || typeof feePayer !== 'string') {
      throw new McpError(ErrorCode.InvalidRequest, 'Payment requirement is missing `extra.feePayer` (facilitator address).');
    }

    const amountStr = X402Manager.getRequirementAmount(requirement);
    const amount = Number(amountStr);
    if (!Number.isFinite(amount) || amount < 0) {
      throw new McpError(ErrorCode.InvalidRequest, `Invalid payment amount: ${amountStr ?? '(missing `amount` / `maxAmountRequired` field)'}`);
    }

    const account = await WalletManager.getActiveWalletAccount();
    const sk = await WalletManager.getActiveWalletSecretKey();
    const algodClient = getAlgodClient(mcpNetwork);
    const suggestedParams = await algodClient.getTransactionParams().do();

    // Fee payer covers fees for both txns in the group.
    const feePayerParams: algosdk.SuggestedParams = { ...suggestedParams, fee: BigInt(2000), flatFee: true };
    const innerParams: algosdk.SuggestedParams = { ...suggestedParams, fee: BigInt(0), flatFee: true };

    const feePayerTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      sender: feePayer,
      receiver: feePayer,
      amount: 0,
      suggestedParams: feePayerParams,
    });

    const isAlgo = requirement.asset === '0' || requirement.asset === '';
    const paymentTxn = isAlgo
      ? algosdk.makePaymentTxnWithSuggestedParamsFromObject({
          sender: account.address,
          receiver: requirement.payTo,
          amount,
          suggestedParams: innerParams,
        })
      : algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
          sender: account.address,
          receiver: requirement.payTo,
          assetIndex: Number(requirement.asset),
          amount,
          suggestedParams: innerParams,
        });

    const grouped = algosdk.assignGroupID([feePayerTxn, paymentTxn]);
    const groupedFeePayer = grouped[0];
    const groupedPayment = grouped[1];

    const signedPayment = algosdk.signTransaction(groupedPayment, sk);
    const unsignedFeePayer = algosdk.encodeUnsignedTransaction(groupedFeePayer);

    const headerBody = {
      x402Version: 2,
      scheme: requirement.scheme,
      network: requirement.network,
      payload: {
        paymentGroup: [
          algosdk.bytesToBase64(unsignedFeePayer),
          algosdk.bytesToBase64(signedPayment.blob),
        ],
        paymentIndex: 1,
      },
      accepted: requirement,
    };

    return Buffer.from(JSON.stringify(headerBody), 'utf8').toString('base64');
  }

  // ── HTTP helpers ───────────────────────────────────────────────────────────

  private static async httpRequest(opts: {
    baseURL: string;
    path: string;
    method: HttpMethod;
    queryParams?: Record<string, string>;
    body?: unknown;
    headers?: Record<string, string>;
  }): Promise<{ status: number; bodyText: string; headers: Record<string, string> }> {
    const url = X402Manager.buildUrl(opts.baseURL, opts.path, opts.queryParams);
    const init: RequestInit = { method: opts.method, headers: { ...(opts.headers ?? {}) } };

    if (opts.body !== undefined && opts.method !== 'GET') {
      if (typeof opts.body === 'string') {
        init.body = opts.body;
      } else {
        init.body = JSON.stringify(opts.body);
        (init.headers as Record<string, string>)['content-type'] ??= 'application/json';
      }
    }

    const response = await fetch(url, init);
    const bodyText = await response.text();
    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => { headers[key.toLowerCase()] = value; });
    return { status: response.status, bodyText, headers };
  }

  private static buildUrl(baseURL: string, path: string, queryParams?: Record<string, string>): string {
    const base = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
    const tail = path.startsWith('/') ? path : `/${path}`;
    const url = new URL(base + tail);
    if (queryParams) {
      for (const [k, v] of Object.entries(queryParams)) url.searchParams.set(k, String(v));
    }
    return url.toString();
  }

  // ── Misc helpers ───────────────────────────────────────────────────────────

  private static requireHttpArgs(args: Record<string, unknown>): {
    baseURL: string;
    path: string;
    method: HttpMethod;
    queryParams?: Record<string, string>;
    body?: unknown;
  } {
    const baseURL = typeof args.baseURL === 'string' ? args.baseURL : null;
    const path = typeof args.path === 'string' ? args.path : null;
    const method = typeof args.method === 'string' ? args.method.toUpperCase() : null;

    if (!baseURL) throw new McpError(ErrorCode.InvalidParams, 'baseURL (string) is required');
    if (!path) throw new McpError(ErrorCode.InvalidParams, 'path (string) is required');
    if (!method || !(HTTP_METHODS as readonly string[]).includes(method)) {
      throw new McpError(ErrorCode.InvalidParams, `method must be one of: ${HTTP_METHODS.join(', ')}`);
    }

    try { new URL(baseURL); }
    catch { throw new McpError(ErrorCode.InvalidParams, `baseURL is not a valid URL: ${baseURL}`); }

    return {
      baseURL,
      path,
      method: method as HttpMethod,
      queryParams: args.queryParams as Record<string, string> | undefined,
      body: args.body,
    };
  }

  private static tryParseJson(text: string): unknown {
    try { return JSON.parse(text); } catch { return null; }
  }

  private static decodeBase64Json(b64: string): unknown {
    try { return JSON.parse(Buffer.from(b64, 'base64').toString('utf8')); } catch { return b64; }
  }

  private static snippet(text: string, max = 300): string {
    return text.length <= max ? text : `${text.slice(0, max)}…`;
  }

  private static textResponse(payload: Record<string, unknown>) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ ...payload, _atomicUnitsNote: ATOMIC_UNITS_NOTE }, null, 2),
        },
      ],
    };
  }

  // ── Bazaar (discovery) handlers ────────────────────────────────────────────

  private static async handleBazaarList(args: Record<string, unknown>) {
    const network = typeof args.network === 'string' ? friendlyToCaip2Network(args.network) : undefined;
    const method = typeof args.method === 'string' ? args.method.toUpperCase() : undefined;
    const merchantId = typeof args.merchantId === 'string' ? args.merchantId : undefined;
    const limit = typeof args.limit === 'number' ? args.limit : undefined;
    const offset = typeof args.offset === 'number' ? args.offset : undefined;
    const full = args.full === true;

    const params: Record<string, string> = {};
    if (network) params.network = network;
    if (method) params.method = method;
    if (merchantId) params.merchantId = merchantId;
    if (limit !== undefined) params.limit = String(limit);
    if (offset !== undefined) params.offset = String(offset);

    const body = await X402Manager.bazaarRequest('/discovery/resources', params);
    const items = Array.isArray((body as any)?.items) ? (body as any).items : [];
    const pagination = (body as any)?.pagination;

    return X402Manager.textResponse({
      source: BAZAAR_BASE_URL,
      pagination,
      count: items.length,
      items: full ? items : items.map((it: any) => X402Manager.summarizeBazaarItem(it)),
    });
  }

  private static async handleBazaarSearch(args: Record<string, unknown>) {
    const query = typeof args.query === 'string' ? args.query : '';
    if (!query || query.length < 1) {
      throw new McpError(ErrorCode.InvalidParams, '`query` is required and must be a non-empty string.');
    }
    const limit = typeof args.limit === 'number' ? args.limit : 10;
    if (limit < 1 || limit > 20) {
      throw new McpError(ErrorCode.InvalidParams, '`limit` must be between 1 and 20.');
    }
    const network = typeof args.network === 'string' ? friendlyToCaip2Network(args.network) : undefined;
    const includeTestnets = args.includeTestnets === true;
    const scheme = typeof args.scheme === 'string' ? args.scheme : undefined;
    const maxUsdPrice = typeof args.maxUsdPrice === 'number' ? args.maxUsdPrice : undefined;
    const assetFilter = typeof args.asset === 'string' ? args.asset : undefined;
    const payToFilter = typeof args.payTo === 'string' ? args.payTo : undefined;
    const extensionsFilter = typeof args.extensions === 'string' ? args.extensions : undefined;

    // Server-side params we can forward.
    const params: Record<string, string> = { search: query, limit: String(Math.min(100, Math.max(limit * 5, 50))) };
    if (network) params.network = network;

    const body = await X402Manager.bazaarRequest('/discovery/resources', params);
    let items: any[] = Array.isArray((body as any)?.items) ? (body as any).items : [];

    // Client-side filters not supported by the server.
    if (!includeTestnets) {
      items = items.filter((it: any) =>
        Array.isArray(it?.accepts) && it.accepts.some((a: any) => !X402Manager.isTestnetNetwork(a?.network)),
      );
    }
    if (scheme) {
      items = items.filter((it: any) =>
        Array.isArray(it?.accepts) && it.accepts.some((a: any) => a?.scheme === scheme),
      );
    }
    if (assetFilter) {
      items = items.filter((it: any) =>
        Array.isArray(it?.accepts) && it.accepts.some((a: any) => String(a?.asset) === assetFilter),
      );
    }
    if (payToFilter) {
      items = items.filter((it: any) =>
        Array.isArray(it?.accepts) && it.accepts.some((a: any) => a?.payTo === payToFilter),
      );
    }
    if (maxUsdPrice !== undefined) {
      items = items.filter((it: any) => {
        const cheapest = X402Manager.cheapestUsdPrice(it?.accepts);
        return cheapest !== null && cheapest <= maxUsdPrice;
      });
    }
    if (extensionsFilter) {
      items = items.filter((it: any) => {
        const info = it?.discoveryInfo;
        if (extensionsFilter === 'bazaar') return !!info;
        if (info && typeof info === 'object' && extensionsFilter in info) return true;
        return false;
      });
    }

    items = items.slice(0, limit);

    return X402Manager.textResponse({
      source: BAZAAR_BASE_URL,
      query,
      filtersApplied: { network, includeTestnets, scheme, maxUsdPrice, asset: assetFilter, payTo: payToFilter, extensions: extensionsFilter },
      count: items.length,
      items: items.map((it: any) => X402Manager.summarizeBazaarItem(it)),
    });
  }

  private static async handleBazaarGetResourceDetails(args: Record<string, unknown>) {
    const resource = typeof args.resource === 'string' ? args.resource : '';
    if (!resource) {
      throw new McpError(ErrorCode.InvalidParams, '`resource` is required (the exact resourceUrl as registered in the Bazaar).');
    }
    try { new URL(resource); }
    catch { throw new McpError(ErrorCode.InvalidParams, `\`resource\` is not a valid URL: ${resource}`); }

    // The facilitator API has no GET-by-id endpoint; we search by URL substring
    // and exact-match on resourceUrl client-side.
    const body = await X402Manager.bazaarRequest('/discovery/resources', { search: resource, limit: '100' });
    const items: any[] = Array.isArray((body as any)?.items) ? (body as any).items : [];
    const exact = items.find((it: any) => it?.resourceUrl === resource);
    if (!exact) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `No Bazaar resource found with resourceUrl=${resource}. The facilitator returned ${items.length} partial match(es) for the substring search.`
      );
    }
    return X402Manager.textResponse({ source: BAZAAR_BASE_URL, resource: exact });
  }

  // ── Bazaar helpers ─────────────────────────────────────────────────────────

  private static async bazaarRequest(path: string, query: Record<string, string>): Promise<unknown> {
    const base = BAZAAR_BASE_URL.endsWith('/') ? BAZAAR_BASE_URL.slice(0, -1) : BAZAAR_BASE_URL;
    const tail = path.startsWith('/') ? path : `/${path}`;
    const url = new URL(base + tail);
    for (const [k, v] of Object.entries(query)) url.searchParams.set(k, v);

    const response = await fetch(url.toString(), { method: 'GET', headers: { accept: 'application/json' } });
    const text = await response.text();
    if (!response.ok) {
      throw new McpError(
        ErrorCode.InternalError,
        `Bazaar request failed (${response.status} ${response.statusText}) for ${url.pathname}${url.search}: ${X402Manager.snippet(text)}`
      );
    }
    const parsed = X402Manager.tryParseJson(text);
    if (parsed === null) {
      throw new McpError(ErrorCode.InternalError, `Bazaar returned non-JSON body: ${X402Manager.snippet(text)}`);
    }
    return parsed;
  }

  private static summarizeBazaarItem(item: any): Record<string, unknown> {
    const accepts: any[] = Array.isArray(item?.accepts) ? item.accepts : [];
    const algorandAccepts = accepts
      .filter(a => typeof a?.network === 'string' && a.network.startsWith('algorand:'))
      .map(a => ({
        network: a.network,
        mcpNetwork: caip2ToNetwork(a.network) ?? null,
        scheme: a.scheme,
        amount: a.amount ?? a.maxAmountRequired,
        asset: a.asset,
        payTo: a.payTo,
        usdPrice: X402Manager.usdPriceOfAccept(a),
      }));

    return {
      resourceUrl: item?.resourceUrl,
      method: item?.method,
      description: item?.description,
      merchantId: item?.merchantId,
      algorandPayable: algorandAccepts.length > 0,
      algorandAccepts,
      totalAcceptedNetworks: accepts.length,
      otherNetworks: accepts.filter(a => !algorandAccepts.find(ao => ao.network === a.network)).map(a => a?.network).filter(Boolean),
      hasDiscoveryInfo: !!item?.discoveryInfo,
      popularity: { verifyCount: item?.verifyCount ?? 0, settleCount: item?.settleCount ?? 0 },
      firstSeen: item?.firstSeen,
      lastSeen: item?.lastSeen,
      id: item?.id,
    };
  }

  /** USDC has 6 decimals; assume non-USDC assets are USDC-like for ballpark filtering. */
  private static usdPriceOfAccept(accept: any): number | null {
    const amountStr = accept?.amount ?? accept?.maxAmountRequired;
    const decimals = typeof accept?.extra?.decimals === 'number' ? accept.extra.decimals : 6;
    const n = Number(amountStr);
    if (!Number.isFinite(n)) return null;
    return n / Math.pow(10, decimals);
  }

  private static cheapestUsdPrice(accepts: any): number | null {
    if (!Array.isArray(accepts) || accepts.length === 0) return null;
    const prices = accepts.map(a => X402Manager.usdPriceOfAccept(a)).filter((p): p is number => p !== null);
    if (prices.length === 0) return null;
    return Math.min(...prices);
  }

  private static isTestnetNetwork(caip2: unknown): boolean {
    if (typeof caip2 !== 'string') return false;
    if (caip2 === NETWORK_TO_CAIP2.testnet) return true;
    return /sepolia|devnet|testnet/i.test(caip2);
  }
}

// extractNetwork is imported above but the x402 tools do not currently use the
// generic `network` arg — they derive the working network from the chosen
// payment requirement's CAIP-2 identifier instead. The import remains for
// future use (e.g. localnet discovery against a private facilitator).
void extractNetwork;
