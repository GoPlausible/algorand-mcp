import { jest } from '@jest/globals';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { fileURLToPath } from 'url';

const { KnowledgeManager } = await import('../../src/tools/knowledgeManager.js');

// The directory get_knowledge_doc reads from when run from source (src/tools -> ../resources/...).
const TAXONOMY_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../src/resources/knowledge/taxonomy'
);
const REPO_PACKAGE_JSON = path.resolve(TAXONOMY_DIR, '../../../../package.json');

// A sentinel file outside the taxonomy, standing in for a secret such as wallet.db.
// Never point these tests at the real wallet: a regression would print its content.
const SENTINEL = 'KNOWLEDGE-TRAVERSAL-SENTINEL';
const sentinelDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kb-traversal-'));
const sentinelFile = path.join(sentinelDir, 'secret.db');
fs.writeFileSync(sentinelFile, SENTINEL);
afterAll(() => fs.rmSync(sentinelDir, { recursive: true, force: true }));

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

    it('returns the content of a real document key', async () => {
      const result = await KnowledgeManager.handleTool('get_knowledge_doc', {
        documents: ['arcs:specs:arc-0020.md'],
      });
      const data = parseResult(result);
      expect(data.documents).toHaveLength(1);
      expect(data.documents[0].length).toBeGreaterThan(0);
    });

    it('matches keys case-insensitively, as on case-insensitive filesystems', async () => {
      const result = await KnowledgeManager.handleTool('get_knowledge_doc', {
        documents: ['ARCs:specs:arc-0020.md'],
      });
      expect(parseResult(result).documents[0].length).toBeGreaterThan(0);
    });

    it('test targets exist, so the rejections below prove real reads are blocked', () => {
      expect(fs.existsSync(REPO_PACKAGE_JSON)).toBe(true);
      expect(fs.existsSync(path.resolve(TAXONOMY_DIR, path.relative(TAXONOMY_DIR, sentinelFile)))).toBe(true);
    });

    it.each([
      ['parent-directory traversal to an existing file', () => '../../../../package.json'],
      ['traversal from a valid-looking key', () => 'arcs:specs:arc-0020.md/../../../../../package.json'],
      ['relative traversal to a secret file', () => path.relative(TAXONOMY_DIR, sentinelFile)],
      ['absolute path to a secret file', () => sentinelFile],
      ['absolute path to an existing file', () => REPO_PACKAGE_JSON],
      ['the taxonomy directory itself', () => '.'],
      ['empty key', () => ''],
      ['NUL byte', () => 'arcs:specs:arc-0020.md\u0000'],
    ])('rejects %s', async (_label, key) => {
      const docKey = key();
      let leaked = '';
      try {
        const result = await KnowledgeManager.handleTool('get_knowledge_doc', { documents: [docKey] });
        leaked = result.content[0].text;
      } catch (err: any) {
        expect(err.message).toMatch(/Unknown document key/);
      }
      expect(leaked).not.toContain(SENTINEL);
      expect(leaked).toBe('');
    });

    it('rejects the whole request when any key is invalid', async () => {
      await expect(
        KnowledgeManager.handleTool('get_knowledge_doc', {
          documents: ['arcs:specs:arc-0020.md', '../../../../package.json'],
        }),
      ).rejects.toThrow(/Unknown document key/);
    });

    it('rejects a key with no document', async () => {
      await expect(
        KnowledgeManager.handleTool('get_knowledge_doc', { documents: ['nonexistent:doc:path.md'] }),
      ).rejects.toThrow(/Unknown document key/);
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
