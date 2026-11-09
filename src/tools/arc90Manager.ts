import algosdk from 'algosdk';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { withCommonParams } from './commonParams.js';
import { extractNetwork, getAlgodClient } from '../algorand-client.js';
import type { NetworkId } from '../algorand-client.js';

/**
 * ARC-90 payment URIs (the payment section of ARC-90, which supersedes ARC-26):
 *
 *   paymenturn = "algorand://" [ netauth "/" ] algorandaddress [ "?" paymentparams ]
 *
 * Network selection is the URI authority. Emitters targeting MainNet MUST omit it;
 * for other networks this tool emits the authoritative `gh:<genesis hash>` selector
 * (unpadded base64url of the 32-byte genesis hash, RFC 4648 section 5).
 */

/** MainNet genesis hash, unpadded base64url. MainNet URIs carry no authority. */
const MAINNET_GENESIS_HASH_B64URL = 'wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8';
/** TestNet genesis hash, unpadded base64url. A genesis hash never changes for a network. */
const TESTNET_GENESIS_HASH_B64URL = 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9_cOUJOiI';

const QRCLAW_URL = 'https://qrclaw.goplausible.xyz/';

interface QrClawResponse {
  qr: string;
  link: string;
  data?: string;
  expires_in?: string;
}

/**
 * ARC-90: characters outside the RFC 3986 unreserved set (ALPHA / DIGIT / "-" / "." / "_" / "~")
 * are UTF-8 encoded, then percent-encoded. encodeURIComponent leaves ! ' ( ) * as they are,
 * so those are encoded here as well.
 */
function encodeQueryValue(field: string, value: string): string {
  try {
    return encodeURIComponent(value).replace(
      /[!'()*]/g,
      (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
    );
  } catch {
    throw new McpError(ErrorCode.InvalidParams, `${field} is not valid Unicode text`);
  }
}

function optionalText(args: Record<string, unknown>, field: string): string | undefined {
  const value = args[field];
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value !== 'string') {
    throw new McpError(ErrorCode.InvalidParams, `${field} must be a string`);
  }
  return value;
}

/** Largest uint64, the range of transaction amounts and asset IDs. */
const UINT64_MAX = 18446744073709551615n;

/**
 * Reads an optional uint64 given as a JSON integer (up to Number.MAX_SAFE_INTEGER) or as a
 * decimal-digit string (any uint64). Returns it as a plain decimal string without leading zeros.
 */
function optionalUint64(
  args: Record<string, unknown>,
  field: string,
  min: bigint,
  rule: string,
): string | undefined {
  const value = args[field];
  if (value === undefined || value === null) return undefined;
  let n: bigint | undefined;
  if (typeof value === 'number' && Number.isSafeInteger(value)) n = BigInt(value);
  else if (typeof value === 'string' && /^[0-9]+$/.test(value)) n = BigInt(value);
  if (n === undefined || n < min || n > UINT64_MAX) {
    throw new McpError(ErrorCode.InvalidParams, `${field} must be ${rule}`);
  }
  return n.toString();
}

/** The URI authority plus its trailing "/", or "" for MainNet. */
async function networkAuthority(network: NetworkId): Promise<string> {
  if (network === 'mainnet') return '';
  if (network === 'testnet') return `gh:${TESTNET_GENESIS_HASH_B64URL}/`;

  // Every localnet has its own genesis, so read it from the node.
  let genesisHash: Uint8Array;
  try {
    const versions = await getAlgodClient('localnet').versionsCheck().do();
    genesisHash = versions.genesisHashB64;
  } catch (error) {
    throw new McpError(
      ErrorCode.InternalError,
      `Could not read the localnet genesis hash: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
  if (!(genesisHash instanceof Uint8Array) || genesisHash.length !== 32) {
    throw new McpError(ErrorCode.InternalError, 'Localnet algod returned a genesis hash that is not 32 bytes');
  }
  const b64url = Buffer.from(genesisHash).toString('base64url');
  // A node that reports MainNet's genesis is MainNet, and MainNet URIs omit the authority.
  return b64url === MAINNET_GENESIS_HASH_B64URL ? '' : `gh:${b64url}/`;
}

async function requestQrClaw(uri: string): Promise<QrClawResponse> {
  const fail = (reason: string) =>
    new McpError(ErrorCode.InternalError, `QR Tool Error: ${reason} (URI: ${uri})`);

  let response: Response;
  try {
    response = await fetch(`${QRCLAW_URL}?q=${encodeURIComponent(uri)}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
  } catch (error) {
    throw fail(error instanceof Error ? error.message : String(error));
  }
  if (!response.ok) throw fail(`QRClaw returned HTTP ${response.status}`);

  let data: Partial<QrClawResponse>;
  try {
    data = (await response.json()) as Partial<QrClawResponse>;
  } catch {
    throw fail('QRClaw returned a response that is not JSON');
  }
  if (typeof data?.qr !== 'string' || typeof data?.link !== 'string') {
    throw fail('QRClaw response has no qr or link');
  }
  return data as QrClawResponse;
}

export class Arc90Manager {
  public arc90Tools = [
    {
      name: 'generate_algorand_qrcode',
      description:
        'Generate an Algorand payment URI per ARC-90 (the URI scheme that supersedes ARC-26) and a QR code for it ' +
        'via the QRClaw service. The URI names the network: mainnet URIs have no authority, as ARC-90 requires; ' +
        'testnet and localnet URIs carry the network genesis hash as a gh: authority ' +
        '(algorand://gh:<genesis hash>/<address>?...). Pass the network the payment is meant for. ' +
        'Returns text with the QR code, the URI, a shareable link and its expiry.',
      inputSchema: withCommonParams({
        type: 'object',
        properties: {
          address: {
            type: 'string',
            description: 'Receiver Algorand address (58 characters)',
          },
          label: {
            type: 'string',
            description: 'Label for the address (e.g. name of receiver)',
          },
          amount: {
            type: ['integer', 'string'],
            minimum: 0,
            pattern: '^[0-9]+$',
            description:
              'Amount in base units: microAlgos for Algo, the smallest unit for an ASA. ' +
              'A number, or a decimal string for amounts above 9007199254740991 (up to the uint64 maximum)',
          },
          asset: {
            type: ['integer', 'string'],
            minimum: 1,
            pattern: '^[0-9]+$',
            description: 'Asset ID for an ASA transfer (a number or a decimal string); omit for Algo',
          },
          note: {
            type: 'string',
            description: 'Default note that the wallet may let the user edit (plain text; the tool percent-encodes it)',
          },
          xnote: {
            type: 'string',
            description: 'Note that the wallet must not let the user edit (plain text; the tool percent-encodes it)',
          },
        },
        required: ['address'],
      }),
    },
  ];

  /**
   * Builds an ARC-90 payment URI. All inputs are validated before the localnet
   * genesis hash is read, so invalid input never needs the network.
   */
  async generatePaymentUri(args: Record<string, unknown>): Promise<{ uri: string }> {
    const input = args.address;
    if (typeof input !== 'string' || !algosdk.isValidAddress(input)) {
      throw new McpError(ErrorCode.InvalidParams, 'address must be a valid 58-character Algorand address');
    }
    // The last base32 character carries 2 padding bits that the checksum ignores, so several
    // strings decode to the same account. Emit the canonical encoding of that account.
    const address = algosdk.Address.fromString(input).toString();
    const label = optionalText(args, 'label');
    const amount = optionalUint64(
      args, 'amount', 0n,
      'a non-negative integer in base units (microAlgos for Algo, the smallest unit for an ASA), ' +
      'at most 18446744073709551615; pass amounts above 9007199254740991 as a decimal string',
    );
    const asset = optionalUint64(
      args, 'asset', 1n,
      'a positive integer asset ID (a number or a decimal string, at most 18446744073709551615); omit it for Algo',
    );
    const note = optionalText(args, 'note');
    const xnote = optionalText(args, 'xnote');

    let network: NetworkId;
    try {
      network = extractNetwork(args);
    } catch (error) {
      throw new McpError(ErrorCode.InvalidParams, error instanceof Error ? error.message : String(error));
    }

    const query: string[] = [];
    if (label !== undefined) query.push(`label=${encodeQueryValue('label', label)}`);
    if (amount !== undefined) query.push(`amount=${amount}`);
    if (asset !== undefined) query.push(`asset=${asset}`);
    if (note !== undefined) query.push(`note=${encodeQueryValue('note', note)}`);
    if (xnote !== undefined) query.push(`xnote=${encodeQueryValue('xnote', xnote)}`);

    const authority = await networkAuthority(network);
    const uri = `algorand://${authority}${address}${query.length > 0 ? `?${query.join('&')}` : ''}`;
    return { uri };
  }

  async handleTool(name: string, args: Record<string, unknown>) {
    if (name !== 'generate_algorand_qrcode') {
      throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
    }
    const { uri } = await this.generatePaymentUri(args);
    const data = await requestQrClaw(uri);
    const lines = [data.qr, '', `URI: ${uri}`, `Link: ${data.link}`];
    if (typeof data.expires_in === 'string' && data.expires_in !== '') {
      lines.push(`Expires in: ${data.expires_in}`);
    }
    return {
      content: [{ type: 'text', text: lines.join('\n') }],
    };
  }
}

export const arc90Manager = new Arc90Manager();
