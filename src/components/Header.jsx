import { useCallback, useRef } from 'react';
import { navLinks } from '../content/site.js';
import { useAppState } from '../state/AppState.jsx';
import { MenuIcon } from './Icons.jsx';
import { Logo } from './Logo.jsx';
import { MobileMenu } from './MobileMenu.jsx';
import { ThemeToggle } from './ThemeToggle.jsx';

export function Header() {
  const { menuOpen, openMenu, closeMenu } = useAppState();
  const triggerRef = useRef(null);

  const dismiss = useCallback(() => {
    closeMenu();
    queueMicrotask(() => triggerRef.current?.focus());
  }, [closeMenu]);

  const navigate = useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  return (
    <header id="top" className="hp-header">
      <div className="hp-container hp-header-bar">
        <a href="#top" className="hp-brand">
          <Logo />
          <span>Hourproof</span>
        </a>
        <nav aria-label="Primary" className="hp-nav">
          <ul className="hp-nav-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hp-nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hp-header-actions">
          <ThemeToggle />
          <a href="#waitlist" className="hp-btn hp-btn-primary hp-header-cta">
            Join the list
          </a>
          <button
            ref={triggerRef}
            type="button"
            className="hp-icon-btn hp-menu-btn"
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            aria-controls={menuOpen ? 'mobile-menu' : undefined}
            onClick={openMenu}
          >
            <span className="hp-sr">Open menu</span>
            <MenuIcon className="hp-icon" />
          </button>
        </div>
      </div>
      {menuOpen ? <MobileMenu onDismiss={dismiss} onNavigate={navigate} /> : null}
    </header>
  );
}
