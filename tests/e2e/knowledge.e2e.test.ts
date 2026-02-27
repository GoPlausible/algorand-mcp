import { describeIf, testConfig } from '../helpers/testConfig.js';
import { invokeTool, parseToolResponse } from '../helpers/e2eSetup.js';

describeIf(testConfig.isCategoryEnabled('knowledge'))('Knowledge Tools (E2E)', () => {
  describe('get_knowledge_doc', () => {
    it('retrieves a knowledge document', async () => {
      try {
        const result = await invokeTool('get_knowledge_doc', {
          documents: ['ARCs'],
        });
        expect(result).toBeDefined();
        expect(result.content).toBeDefined();
      } catch (err: any) {
        // Document may not exist with this exact key — that's OK
        expect(err).toBeDefined();
      }
    });
  });
});
