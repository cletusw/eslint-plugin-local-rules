import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it, expect } from 'vitest';

import { requireUp } from './requireUp';
import { DEFAULT_EXTENSIONS } from './constants';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Path to the 'fixtures' directory
const fixturesDir = path.resolve(__dirname, './fixtures');

describe('requireUp', () => {
  it('should find the file at eslint-local-rules.js', () => {
    const file = requireUp(
      'eslint-local-rules',
      DEFAULT_EXTENSIONS,
      path.join(fixturesDir, './projectWithResolution/a')
    );
    expect(file).toBeDefined();
  });

  it('should find the file at eslint-local-rules.cjs', () => {
    const file = requireUp(
      'eslint-local-rules',
      DEFAULT_EXTENSIONS,
      path.join(fixturesDir, './projectWithResolutionCjs/a')
    );
    expect(file).toBeDefined();
  });

  it('should find the file at eslint-local-rules/index.js', () => {
    const file = requireUp(
      'eslint-local-rules',
      DEFAULT_EXTENSIONS,
      path.join(fixturesDir, './projectWithResolutionIndex/a')
    );
    expect(file).toBeDefined();
  });

  it('should fail to find a file that does not exist', () => {
    const file = requireUp(
      'some-file-that-will-not-resolve',
      DEFAULT_EXTENSIONS,
      path.join(fixturesDir, './projectWithNoResolution/a')
    );
    expect(file).not.toBeDefined();
  });

  it('should throw MODULE_NOT_FOUND errors for modules other than the target', () => {
    expect(() => {
      requireUp(
        'eslint-local-rules',
        DEFAULT_EXTENSIONS,
        path.join(fixturesDir, './projectWithBadImport/a')
      );
    }).toThrowError(`Cannot find module './does-not-exist'`);
  });
});
