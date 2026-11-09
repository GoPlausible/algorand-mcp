import * as QRCode from 'qrcode';
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

function optionalInteger(
  args: Record<string, unknown>,
  field: string,
  min: number,
  rule: string,
): number | undefined {
  const value = args[field];
  if (value === undefined || value === null) return undefined;
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < min) {
    throw new McpError(ErrorCode.InvalidParams, `${field} must be ${rule}`);
  }
  return value;
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
            type: 'integer',
            minimum: 0,
            description: 'Amount in base units: microAlgos for Algo, the smallest unit for an ASA',
          },
          asset: {
            type: 'integer',
            minimum: 1,
            description: 'Asset ID for an ASA transfer; omit for Algo',
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
    const address = args.address;
    if (typeof address !== 'string' || !algosdk.isValidAddress(address)) {
      throw new McpError(ErrorCode.InvalidParams, 'address must be a valid 58-character Algorand address');
    }
    const label = optionalText(args, 'label');
    const amount = optionalInteger(
      args, 'amount', 0,
      'a non-negative integer in base units (microAlgos for Algo, the smallest unit for an ASA)',
    );
    const asset = optionalInteger(args, 'asset', 1, 'a positive integer asset ID; omit it for Algo');
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

  // Parked alternative to QRClaw: render the QR code locally with `qrcode`.
  // async generateUriAndQr(args: Record<string, unknown>): Promise<{ uri: string; qrCodePng: string; qrCodeUtf8: string }> {
  //   const { uri } = await this.generatePaymentUri(args);
  //   const qrCodeUtf8Raw = await QRCode.toString(uri, { type: 'utf8', errorCorrectionLevel: 'H', width: 128 });
  //   // Invert for better terminal contrast
  //   const qrCodeUtf8 = qrCodeUtf8Raw
  //     .replace(/█/g, '⬜').replace(/ /g, '█').replace(/⬜/g, ' ')
  //     .replace(/▀/g, '⬛').replace(/▄/g, '▀').replace(/⬛/g, '▄');
  //   const qrCodePng = await QRCode.toDataURL(uri, {
  //     type: 'image/png',
  //     errorCorrectionLevel: 'H',
  //     color: { dark: '#000000', light: '#FFFFFF' },
  //     margin: 4,
  //     width: 128,
  //   });
  //   return { uri, qrCodePng, qrCodeUtf8 };
  // }
  //
  // Matching handleTool result:
  //   content: [
  //     { type: 'text', text: qrCodeUtf8 + '\n\n```\n' + uri + '\n```' },
  //     { type: 'image', data: qrCodePng.replace(/^data:image\/png;base64,/, ''), mimeType: 'image/png' },
  //   ]

  async handleTool(name: string, args: Record<string, unknown>) {
    if (name !== 'generate_algorand_qrcode') {
      throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
    }
    const { uri } = await this.generatePaymentUri(args);
    const data = await requestQrClaw(uri);
    return {
      content: [
        { type: 'text', text: data.qr + '\n\nURI: ' + uri + '\nLink: ' + data.link + '\nExpires in: ' + data.expires_in },
      ],
    };
  }
}

export const arc90Manager = new Arc90Manager();
