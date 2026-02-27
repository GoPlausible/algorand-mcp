
import algosdk from 'algosdk';

const { arc26Manager } = await import('../../src/tools/arc26Manager.js');

function parseResult(result: any) {
  // arc26Manager returns 2 content items: text + image
  return {
    text: JSON.parse(result.content[0].text),
    hasQrCode: result.content.length > 1 && result.content[1].type === 'image',
  };
}

describe('arc26Manager', () => {
  const account = algosdk.generateAccount();
  const address = account.addr.toString();

  describe('generate_algorand_uri', () => {
    it('generates a valid algorand:// URI', async () => {
      const result = await arc26Manager.handleTool('generate_algorand_uri', { address });
      const data = parseResult(result);
      expect(data.text.uri).toMatch(/^algorand:\/\//);
      expect(data.text.uri).toContain(address);
    });

    it('includes optional parameters in URI', async () => {
      const result = await arc26Manager.handleTool('generate_algorand_uri', {
        address,
        amount: 1000000,
        label: 'Test Payment',
        note: 'test note',
      });
      const data = parseResult(result);
      expect(data.text.uri).toContain('amount=1000000');
      expect(data.text.uri).toContain('label=');
    });

    it('throws for missing address', async () => {
      await expect(
        arc26Manager.handleTool('generate_algorand_uri', {}),
      ).rejects.toThrow();
    });
  });
});
