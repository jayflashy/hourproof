/** Keep in sync with the boot script in index.html. */
export const THEME_STORAGE_KEY = 'hourproof-theme';

export const THEME_COLORS = {
  light: '#e7e0d0',
  dark: '#0e100c',
};

/**
 * @returns {'light' | 'dark' | null}
 */
export function readStoredTheme() {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    if (value === 'light' || value === 'dark') return value;
    return null;
  } catch {
    return null;
  }
}

/** @returns {'light' | 'dark'} */
export function systemTheme() {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

/** @returns {'light' | 'dark'} */
export function resolveTheme() {
  return readStoredTheme() ?? systemTheme();
}

/** @param {'light' | 'dark'} theme */
export function applyTheme(theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', THEME_COLORS[theme]);
}

/** @param {'light' | 'dark'} theme */
export function persistTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode can block storage. The class on <html> still updates.
  }
}
