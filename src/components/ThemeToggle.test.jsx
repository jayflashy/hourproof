import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { THEME_STORAGE_KEY } from '../lib/theme.js';
import { mockMatchMedia } from '../test/matchMedia.js';
import { AppStateProvider } from '../state/AppState.jsx';
import { ThemeToggle } from './ThemeToggle.jsx';

function renderToggle() {
  return render(
    <AppStateProvider>
      <ThemeToggle />
    </AppStateProvider>,
  );
}

describe('theme toggle', () => {
  it('uses the light theme when the system is light and nothing is stored', () => {
    mockMatchMedia(false);
    renderToggle();
    expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('uses the dark theme when the system prefers dark and nothing is stored', () => {
    mockMatchMedia((query) => query.includes('prefers-color-scheme: dark'));
    renderToggle();
    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(document.documentElement).toHaveClass('dark');
  });

  it('prefers a stored choice over the system theme', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    mockMatchMedia(false);
    renderToggle();
    expect(document.documentElement).toHaveClass('dark');
  });

  it('toggles the theme, persists the choice, and announces it', async () => {
    const user = userEvent.setup();
    renderToggle();
    await user.click(screen.getByRole('button', { name: 'Switch to dark theme' }));
    expect(document.documentElement).toHaveClass('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByText('Dark theme on')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Switch to light theme' }));
    expect(document.documentElement).not.toHaveClass('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
    expect(screen.getByText('Light theme on')).toBeInTheDocument();
  });
});
