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
  ];

  // ── Public dispatch ────────────────────────────────────────────────────────

  static async handleTool(name: string, args: Record<string, unknown>) {
    try {
      switch (name) {
        case 'x402_discover_payment_requirements':
          return await X402Manager.handleDiscover(args);
        case 'make_http_request_with_x402':
          return await X402Manager.handlePaidRequest(args);
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
}

// extractNetwork is imported above but the x402 tools do not currently use the
// generic `network` arg — they derive the working network from the chosen
// payment requirement's CAIP-2 identifier instead. The import remains for
// future use (e.g. localnet discovery against a private facilitator).
void extractNetwork;
