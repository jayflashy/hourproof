import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { THEME_COLORS, THEME_STORAGE_KEY } from './lib/theme.js';

describe('theme boot script', () => {
  it('uses the same storage key and background colors as the theme module', () => {
    const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8');
    expect(html).toContain(THEME_STORAGE_KEY);
    expect(html).toContain('prefers-color-scheme: dark');
    expect(html).toContain(THEME_COLORS.light);
    expect(html).toContain(THEME_COLORS.dark);
    expect(html).toContain('localStorage.getItem');
  });
});
