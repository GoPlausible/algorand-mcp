import { describeIf, testConfig } from '../helpers/testConfig.js';
import { invokeTool, parseToolResponse } from '../helpers/e2eSetup.js';

describeIf(testConfig.isCategoryEnabled('knowledge'))('Knowledge Tools (E2E)', () => {
  describe('get_knowledge_doc', () => {
    it('retrieves a knowledge document by its key', async () => {
      const result = await invokeTool('get_knowledge_doc', {
        documents: ['arcs:specs:arc-0090.md'],
      });
      const data = parseToolResponse(result);
      expect(data.documents).toHaveLength(1);
      expect(data.documents[0]).toContain('title: URI scheme');
    });

    it('rejects a key that is not a document', async () => {
      await expect(
        invokeTool('get_knowledge_doc', { documents: ['ARCs'] }),
      ).rejects.toThrow(/Unknown document key/);
    });
  });
});
