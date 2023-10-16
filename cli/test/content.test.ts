import * as fs from 'node:fs/promises';
import { beforeEach, assert, describe, expect, it, vi } from 'vitest';
import { buildContent, replaceContent, getFile, updateReadme } from '../lib/content';

beforeEach(() => {
  vi.resetAllMocks();
  vi.mock('node:fs/promises');
});

const originalContent = `# Hello World

## Courses

- [Course 1](https://example.com)
- [Course 2](https://example.com)
`;

const newContent = `- [Course 1](https://example.com)
- [Course 2](https://example.com)
- [Course 3](https://example.com)`;

describe('Content', () => {
  it('should build content with a title', () => {
    const content = buildContent({ title: 'Hello', content: 'World' });
    assert.equal(content, '### Hello\n\nWorld');
  });

  it('should build content without a title', () => {
    const content = buildContent({ content: 'Hello World' });
    assert.equal(content, 'Hello World');
  });

  it('should replace content', () => {
    const content = replaceContent(originalContent, newContent);
    expect(content).toMatchSnapshot();
  });
});

describe('getFile', () => {
  it('should return a file', async () => {
    vi.spyOn(fs, 'readFile').mockResolvedValue('file content');
    const file = await getFile('README.md');
    assert.equal(file, 'file content');
  });

  it('should return undefined if no file is found', async () => {
    vi.spyOn(fs, 'readFile').mockRejectedValueOnce('No file found');
    try {
      await getFile('README.md');
    } catch (error) {
      assert.equal(error, 'No file found');
    }
  });
});

describe('updateReadme', () => {
  it('should update the readme', async () => {
    vi.spyOn(fs, 'readFile').mockResolvedValue(originalContent);
    vi.spyOn(fs, 'writeFile').mockResolvedValue(undefined);
    await updateReadme('README.md', newContent);
    expect(fs.writeFile).toHaveBeenCalledWith('README.md', expect.any(String), 'utf-8');
  });

  it('should throw an error if no readme is found', async () => {
    vi.spyOn(fs, 'readFile').mockRejectedValueOnce('No file found');
    vi.spyOn(fs, 'writeFile').mockResolvedValue(undefined);
    try {
      await updateReadme('README.md', newContent);
    } catch (error) {
      assert.equal(error, 'No file found');
      expect(fs.writeFile).not.toHaveBeenCalled();
    }
  });
});
