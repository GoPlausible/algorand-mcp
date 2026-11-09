import { jest } from '@jest/globals';
import algosdk from 'algosdk';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { extractNetwork } from '../../src/networkConfig.js';

// Real extractNetwork; a stub algod for the localnet genesis hash read.
const versionsDo = jest.fn<() => Promise<any>>();
const getAlgodClient = jest.fn(() => ({ versionsCheck: () => ({ do: versionsDo }) }));
jest.unstable_mockModule('../../src/algorand-client.js', () => ({
  extractNetwork,
  getAlgodClient,
  getIndexerClient: jest.fn(),
}));

// QRClaw is mocked: this suite never touches the network.
const fetchMock = jest.fn<(...args: any[]) => Promise<any>>();
global.fetch = fetchMock as any;

const { arc90Manager } = await import('../../src/tools/arc90Manager.js');

/** The address used in the ARC-90 payment examples. */
const SPEC_ADDRESS = 'TMTAD6N22HCS2LKH7677L2KFLT3PAQWY6M4JFQFXQS32ECBFC23F57RYX4';
const TESTNET_GH = 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9_cOUJOiI';
const MAINNET_GENESIS = algosdk.base64ToBytes('wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=');

const uriOf = async (args: Record<string, unknown>) => (await arc90Manager.generatePaymentUri(args)).uri;
const mainnet = (args: Record<string, unknown>) => uriOf({ address: SPEC_ADDRESS, network: 'mainnet', ...args });

async function expectMcpError(promise: Promise<unknown>, code: ErrorCode, message?: RegExp) {
  const error: any = await promise.then(() => null, (e) => e);
  expect(error).toBeInstanceOf(McpError);
  expect(error.code).toBe(code);
  if (message) expect(error.message).toMatch(message);
}

function qrclawReturns(body: unknown, init: { ok?: boolean; status?: number } = {}) {
  fetchMock.mockResolvedValue({
    ok: init.ok ?? true,
    status: init.status ?? 200,
    json: async () => body,
  });
}

beforeEach(() => {
  fetchMock.mockReset();
  versionsDo.mockReset();
  getAlgodClient.mockClear();
});

describe('arc90Manager', () => {
  describe('ARC-90 payment examples (mainnet, no authority)', () => {
    it('address only', async () => {
      expect(await mainnet({})).toBe(`algorand://${SPEC_ADDRESS}`);
    });

    it('address with label', async () => {
      expect(await mainnet({ label: 'Silvio' })).toBe(`algorand://${SPEC_ADDRESS}?label=Silvio`);
    });

    it('request 150.5 Algos', async () => {
      expect(await mainnet({ amount: 150500000 })).toBe(`algorand://${SPEC_ADDRESS}?amount=150500000`);
    });

    it('request 150 units of asset 45', async () => {
      expect(await mainnet({ amount: 150, asset: 45 })).toBe(`algorand://${SPEC_ADDRESS}?amount=150&asset=45`);
    });
  });

  describe('network authority', () => {
    it('defaults to testnet and emits its gh: genesis hash', async () => {
      expect(await uriOf({ address: SPEC_ADDRESS, amount: 1000 }))
        .toBe(`algorand://gh:${TESTNET_GH}/${SPEC_ADDRESS}?amount=1000`);
    });

    it('emits the testnet gh: authority without calling algod', async () => {
      expect(await uriOf({ address: SPEC_ADDRESS, network: 'testnet' })).toBe(`algorand://gh:${TESTNET_GH}/${SPEC_ADDRESS}`);
      expect(getAlgodClient).not.toHaveBeenCalled();
    });

    it('omits the authority for mainnet without calling algod', async () => {
      await mainnet({});
      expect(getAlgodClient).not.toHaveBeenCalled();
    });

    it('reads the localnet genesis hash from algod and emits it as unpadded base64url', async () => {
      const genesis = new Uint8Array(32).fill(0xfb); // base64 "+/v7..." exercises the url-safe alphabet
      versionsDo.mockResolvedValue({ genesisHashB64: genesis });
      const uri = await uriOf({ address: SPEC_ADDRESS, network: 'localnet' });
      const gh = Buffer.from(genesis).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      expect(uri).toBe(`algorand://gh:${gh}/${SPEC_ADDRESS}`);
      expect(gh.startsWith('-_v7')).toBe(true);
      expect(uri.split('/')[2]).toMatch(/^gh:[A-Za-z0-9_-]{43}$/);
      expect(getAlgodClient).toHaveBeenCalledWith('localnet');
    });

    it('omits the authority when the localnet node reports the MainNet genesis', async () => {
      versionsDo.mockResolvedValue({ genesisHashB64: MAINNET_GENESIS });
      expect(await uriOf({ address: SPEC_ADDRESS, network: 'localnet' })).toBe(`algorand://${SPEC_ADDRESS}`);
    });

    it('rejects a localnet genesis hash that is not 32 bytes', async () => {
      versionsDo.mockResolvedValue({ genesisHashB64: new Uint8Array(31) });
      await expectMcpError(uriOf({ address: SPEC_ADDRESS, network: 'localnet' }), ErrorCode.InternalError, /not 32 bytes/);
    });

    it('reports an unreachable localnet algod', async () => {
      versionsDo.mockRejectedValue(new Error('connect ECONNREFUSED'));
      await expectMcpError(
        uriOf({ address: SPEC_ADDRESS, network: 'localnet' }),
        ErrorCode.InternalError,
        /Could not read the localnet genesis hash: connect ECONNREFUSED/,
      );
    });

    it('rejects an unknown network', async () => {
      await expectMcpError(uriOf({ address: SPEC_ADDRESS, network: 'betanet' }), ErrorCode.InvalidParams, /Invalid network/);
    });

    it('validates input before reading the localnet genesis hash', async () => {
      await expectMcpError(uriOf({ address: SPEC_ADDRESS, network: 'localnet', amount: -1 }), ErrorCode.InvalidParams);
      expect(getAlgodClient).not.toHaveBeenCalled();
    });
  });

  describe('query value encoding', () => {
    it('percent-encodes "=" and "&" inside values (ARC-90 example)', async () => {
      expect(await mainnet({ note: 'foo=bar&baz' })).toBe(`algorand://${SPEC_ADDRESS}?note=foo%3Dbar%26baz`);
    });

    it('encodes spaces as %20 (ARC-90 example)', async () => {
      expect(await mainnet({ note: 'Donation for Event' })).toBe(`algorand://${SPEC_ADDRESS}?note=Donation%20for%20Event`);
    });

    it("percent-encodes ! ' ( ) *, which are outside the unreserved set", async () => {
      expect(await mainnet({ label: "a!b'c(d)e*f" })).toBe(`algorand://${SPEC_ADDRESS}?label=a%21b%27c%28d%29e%2Af`);
    });

    it('leaves unreserved characters as they are', async () => {
      expect(await mainnet({ label: 'Az09-._~' })).toBe(`algorand://${SPEC_ADDRESS}?label=Az09-._~`);
    });

    it('UTF-8 encodes non-ASCII text before percent-encoding it', async () => {
      expect(await mainnet({ xnote: 'café ✓' })).toBe(`algorand://${SPEC_ADDRESS}?xnote=caf%C3%A9%20%E2%9C%93`);
    });

    it('keeps the order label, amount, asset, note, xnote', async () => {
      expect(await mainnet({ xnote: 'x', note: 'n', asset: 7, amount: 5, label: 'l' }))
        .toBe(`algorand://${SPEC_ADDRESS}?label=l&amount=5&asset=7&note=n&xnote=x`);
    });

    it('omits empty text values', async () => {
      expect(await mainnet({ label: '', note: '', xnote: '' })).toBe(`algorand://${SPEC_ADDRESS}`);
    });

    it('rejects text that is not valid Unicode', async () => {
      await expectMcpError(mainnet({ note: '\uD800' }), ErrorCode.InvalidParams, /note is not valid Unicode/);
    });
  });

  describe('input validation', () => {
    it('rejects a missing address', async () => {
      await expectMcpError(uriOf({}), ErrorCode.InvalidParams, /address/);
    });

    it('rejects an address with a bad checksum', async () => {
      const bad = SPEC_ADDRESS.slice(0, -1) + (SPEC_ADDRESS.endsWith('A') ? 'B' : 'A');
      await expectMcpError(uriOf({ address: bad }), ErrorCode.InvalidParams, /address/);
    });

    it('accepts amount 0', async () => {
      expect(await mainnet({ amount: 0 })).toBe(`algorand://${SPEC_ADDRESS}?amount=0`);
    });

    it.each([[-1], [1.5], ['1000'], [2 ** 53]])('rejects amount %p', async (amount) => {
      await expectMcpError(mainnet({ amount }), ErrorCode.InvalidParams, /amount must be a non-negative integer/);
    });

    it.each([[0], [-1], [1.5], ['45']])('rejects asset %p', async (asset) => {
      await expectMcpError(mainnet({ asset }), ErrorCode.InvalidParams, /asset must be a positive integer/);
    });

    it('rejects a label that is not a string', async () => {
      await expectMcpError(mainnet({ label: 42 }), ErrorCode.InvalidParams, /label must be a string/);
    });
  });

  describe('generate_algorand_qrcode', () => {
    it('sends the URI to QRClaw and returns the QR code, URI, link and expiry', async () => {
      qrclawReturns({ qr: 'QR-BLOCK', link: 'https://qrclaw.goplausible.xyz/q/abc', data: 'x', expires_in: '24h' });
      const result = await arc90Manager.handleTool('generate_algorand_qrcode', { address: SPEC_ADDRESS, amount: 1000 });
      const uri = `algorand://gh:${TESTNET_GH}/${SPEC_ADDRESS}?amount=1000`;
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock.mock.calls[0][0]).toBe(`https://qrclaw.goplausible.xyz/?q=${encodeURIComponent(uri)}`);
      expect(result.content).toEqual([
        { type: 'text', text: `QR-BLOCK\n\nURI: ${uri}\nLink: https://qrclaw.goplausible.xyz/q/abc\nExpires in: 24h` },
      ]);
    });

    it('reports a QRClaw HTTP error as an internal error that carries the URI', async () => {
      qrclawReturns({}, { ok: false, status: 503 });
      await expectMcpError(
        arc90Manager.handleTool('generate_algorand_qrcode', { address: SPEC_ADDRESS, network: 'mainnet' }),
        ErrorCode.InternalError,
        new RegExp(`QRClaw returned HTTP 503 \\(URI: algorand://${SPEC_ADDRESS}\\)`),
      );
    });

    it('reports a failed QRClaw request', async () => {
      fetchMock.mockRejectedValue(new Error('getaddrinfo ENOTFOUND'));
      await expectMcpError(
        arc90Manager.handleTool('generate_algorand_qrcode', { address: SPEC_ADDRESS }),
        ErrorCode.InternalError,
        /QR Tool Error: getaddrinfo ENOTFOUND/,
      );
    });

    it('reports a QRClaw response that is not JSON', async () => {
      fetchMock.mockResolvedValue({ ok: true, status: 200, json: async () => { throw new SyntaxError('bad'); } });
      await expectMcpError(
        arc90Manager.handleTool('generate_algorand_qrcode', { address: SPEC_ADDRESS }),
        ErrorCode.InternalError,
        /not JSON/,
      );
    });

    it('reports a QRClaw response without qr or link', async () => {
      qrclawReturns({ link: 'https://qrclaw.goplausible.xyz/q/abc' });
      await expectMcpError(
        arc90Manager.handleTool('generate_algorand_qrcode', { address: SPEC_ADDRESS }),
        ErrorCode.InternalError,
        /no qr or link/,
      );
    });

    it('rejects invalid input without calling QRClaw', async () => {
      await expectMcpError(arc90Manager.handleTool('generate_algorand_qrcode', {}), ErrorCode.InvalidParams);
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('rejects an unknown tool name', async () => {
      await expectMcpError(arc90Manager.handleTool('generate_qr', { address: SPEC_ADDRESS }), ErrorCode.MethodNotFound);
    });
  });
});
