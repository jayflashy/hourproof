import { useState } from 'react';
import { useAppState } from '../state/AppState.jsx';
import { MoonIcon, SunIcon } from './Icons.jsx';

export function ThemeToggle() {
  const { theme, toggleTheme } = useAppState();
  const [announcement, setAnnouncement] = useState('');
  const isDark = theme === 'dark';

  function onClick() {
    const next = isDark ? 'light' : 'dark';
    toggleTheme();
    setAnnouncement(next === 'dark' ? 'Dark theme on' : 'Light theme on');
  }

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        aria-pressed={isDark}
        aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        className="hp-icon-btn"
      >
        {isDark ? <SunIcon className="hp-icon" /> : <MoonIcon className="hp-icon" />}
      </button>
      <span className="hp-sr" aria-live="polite">
        {announcement}
      </span>
    </>
  );
}
