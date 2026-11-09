import { jest } from '@jest/globals';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { fileURLToPath } from 'url';

const { KnowledgeManager, docKeyToFileName, fileNameToDocKey } = await import('../../src/tools/knowledgeManager.js');

// The directory get_knowledge_doc reads from when run from source (src/tools -> ../resources/...).
const TAXONOMY_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../src/resources/knowledge/taxonomy'
);
const CATEGORIES_DIR = path.resolve(TAXONOMY_DIR, '../taxonomy-categories');
const REPO_PACKAGE_JSON = path.resolve(TAXONOMY_DIR, '../../../../package.json');

/** Every document key listed anywhere in the category indexes (documents[].path, items[], ...). */
function listedDocKeys(): string[] {
  const keys = new Set<string>();
  const walk = (node: unknown) => {
    if (typeof node === 'string') {
      if (/\.(md|rst|txt)$/i.test(node)) keys.add(node);
    } else if (node && typeof node === 'object') {
      Object.values(node).forEach(walk);
    }
  };
  for (const file of fs.readdirSync(CATEGORIES_DIR).filter((f) => f.endsWith('.json'))) {
    walk(JSON.parse(fs.readFileSync(path.join(CATEGORIES_DIR, file), 'utf8')));
  }
  return [...keys];
}

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

    it('rejects the on-disk file name in place of the key', async () => {
      expect(fs.existsSync(path.join(TAXONOMY_DIR, 'arcs~specs~arc-0020.md'))).toBe(true);
      await expect(
        KnowledgeManager.handleTool('get_knowledge_doc', { documents: ['arcs~specs~arc-0020.md'] }),
      ).rejects.toThrow(/Unknown document key/);
    });

    it('opens every document key listed in the category indexes', async () => {
      const keys = listedDocKeys();
      expect(keys.length).toBeGreaterThan(380);
      const unopenable: string[] = [];
      for (const key of keys) {
        try {
          const result = await KnowledgeManager.handleTool('get_knowledge_doc', { documents: [key] });
          if (!(parseResult(result).documents[0].length > 0)) unopenable.push(key);
        } catch {
          unopenable.push(key);
        }
      }
      expect(unopenable).toEqual([]);
    });
  });

  describe('document file names', () => {
    const fileNames = fs.readdirSync(TAXONOMY_DIR);

    it('are valid on Windows', () => {
      const reserved = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\.|$)/i;
      const invalid = fileNames.filter((name) =>
        /[<>:"/\\|?*\u0000-\u001f]/.test(name) || /[. ]$/.test(name) || reserved.test(name),
      );
      expect(invalid).toEqual([]);
    });

    it('are unique when compared without case', () => {
      expect(new Set(fileNames.map((n) => n.toLowerCase())).size).toBe(fileNames.length);
    });

    it('map to and from document keys', () => {
      expect(docKeyToFileName('arcs:specs:arc-0020.md')).toBe('arcs~specs~arc-0020.md');
      expect(fileNameToDocKey('arcs~specs~arc-0020.md')).toBe('arcs:specs:arc-0020.md');
      for (const name of fileNames) expect(docKeyToFileName(fileNameToDocKey(name))).toBe(name);
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
