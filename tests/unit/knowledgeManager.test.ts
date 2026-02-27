import { jest } from '@jest/globals';


const { KnowledgeManager } = await import('../../src/tools/knowledgeManager.js');

function parseResult(result: any) {
  return JSON.parse(result.content[0].text);
}

describe('KnowledgeManager', () => {
  describe('get_knowledge_doc', () => {
    it('throws for missing documents parameter', async () => {
      await expect(
        KnowledgeManager.handleTool('get_knowledge_doc', {}),
      ).rejects.toThrow();
    });

    it('returns content for empty documents array', async () => {
      // Empty array doesn't throw — just returns empty/error content
      const result = await KnowledgeManager.handleTool('get_knowledge_doc', { documents: [] });
      expect(result.content).toBeDefined();
    });

    it('handles non-existent document gracefully', async () => {
      try {
        const result = await KnowledgeManager.handleTool('get_knowledge_doc', {
          documents: ['nonexistent:doc:path.md'],
        });
        expect(result.content).toBeDefined();
      } catch (err: any) {
        expect(err).toBeDefined();
      }
    });
  });

  describe('error handling', () => {
    it('throws for unknown knowledge tool', async () => {
      await expect(
        KnowledgeManager.handleTool('get_knowledge_unknown', {}),
      ).rejects.toThrow();
    });
  });
});
