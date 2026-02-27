import { describeIf, testConfig } from '../helpers/testConfig.js';
import { invokeTool, parseToolResponse } from '../helpers/e2eSetup.js';

describeIf(testConfig.isCategoryEnabled('algod'))('Algod Tools (E2E)', () => {
  describe('compile_teal + disassemble_teal', () => {
    it('compiles and disassembles a simple TEAL program', async () => {
      const compiled = parseToolResponse(
        await invokeTool('compile_teal', {
          source: '#pragma version 10\nint 1',
          network: 'testnet',
        }),
      );
      expect(compiled.result).toBeDefined();
      expect(compiled.hash).toBeDefined();

      const disassembled = parseToolResponse(
        await invokeTool('disassemble_teal', {
          bytecode: compiled.result,
          network: 'testnet',
        }),
      );
      // algosdk v3 disassembles `int 1` as `pushint 1`
      expect(disassembled.result).toMatch(/int 1|pushint 1/);
    });
  });
});
