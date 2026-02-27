import { jest } from '@jest/globals';

import { setupNetworkMocks } from '../helpers/mockFactories.js';

const mocks = setupNetworkMocks();
jest.unstable_mockModule('../../src/algorand-client.js', () => mocks);

const { AlgodManager } = await import('../../src/tools/algodManager.js');

function parseResult(result: any) {
  return JSON.parse(result.content[0].text);
}

describe('AlgodManager', () => {
  describe('compile_teal', () => {
    it('compiles TEAL source via algod', async () => {
      const result = await AlgodManager.handleTool('compile_teal', {
        source: '#pragma version 10\nint 1',
        network: 'testnet',
      });
      const data = parseResult(result);
      expect(data).toBeDefined();
      expect(mocks.__mockAlgod.compile).toHaveBeenCalled();
    });

    it('throws for missing source', async () => {
      await expect(
        AlgodManager.handleTool('compile_teal', {}),
      ).rejects.toThrow();
    });
  });

  describe('disassemble_teal', () => {
    it('disassembles TEAL bytecode via algod', async () => {
      const result = await AlgodManager.handleTool('disassemble_teal', {
        bytecode: 'BCAg',
        network: 'testnet',
      });
      const data = parseResult(result);
      expect(data).toBeDefined();
      expect(mocks.__mockAlgod.disassemble).toHaveBeenCalled();
    });
  });

  describe('send_raw_transaction', () => {
    it('submits signed transactions', async () => {
      const result = await AlgodManager.handleTool('send_raw_transaction', {
        signedTxns: ['AQID'],
        network: 'testnet',
      });
      expect(result).toBeDefined();
      expect(mocks.__mockAlgod.sendRawTransaction).toHaveBeenCalled();
    });

    it('throws for missing signedTxns', async () => {
      await expect(
        AlgodManager.handleTool('send_raw_transaction', {}),
      ).rejects.toThrow();
    });
  });

  describe('simulate_raw_transactions', () => {
    it('simulates raw transactions', async () => {
      const result = await AlgodManager.handleTool('simulate_raw_transactions', {
        txns: ['AQID'],
        network: 'testnet',
      });
      expect(result).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('throws for unknown algod tool', async () => {
      await expect(
        AlgodManager.handleTool('unknown_algod_tool', {}),
      ).rejects.toThrow();
    });
  });
});
