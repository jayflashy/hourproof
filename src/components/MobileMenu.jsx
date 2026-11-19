import { useEffect, useRef } from 'react';
import { navLinks } from '../content/site.js';
import { CloseIcon } from './Icons.jsx';
import { Logo } from './Logo.jsx';
import { ThemeToggle } from './ThemeToggle.jsx';

export function MobileMenu({ onDismiss, onNavigate }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.setAttribute('closedby', 'any');
    if (!dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    }
    closeButtonRef.current?.focus();

    const onCancel = (event) => {
      event.preventDefault();
      onDismiss();
    };
    const onClick = (event) => {
      if (event.target === dialog) onDismiss();
    };
    dialog.addEventListener('cancel', onCancel);
    dialog.addEventListener('click', onClick);
    return () => {
      dialog.removeEventListener('cancel', onCancel);
      dialog.removeEventListener('click', onClick);
      if (dialog.open) dialog.close();
    };
  }, [onDismiss]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 64rem)');
    const onChange = () => {
      if (media.matches) onDismiss();
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [onDismiss]);

  return (
    <dialog
      id="mobile-menu"
      ref={dialogRef}
      aria-labelledby="mobile-menu-title"
      aria-modal="true"
      className="hp-menu"
    >
      <div className="hp-menu-inner">
        <div className="hp-menu-top">
          <p id="mobile-menu-title" className="hp-brand">
            <Logo />
            Menu
          </p>
          <button ref={closeButtonRef} type="button" onClick={onDismiss} className="hp-icon-btn">
            <span className="hp-sr">Close menu</span>
            <CloseIcon className="hp-icon" />
          </button>
        </div>
        <nav aria-label="Mobile">
          <ul className="hp-menu-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={onNavigate} className="hp-menu-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hp-menu-appearance">
          <p>Appearance</p>
          <ThemeToggle />
        </div>
        <a href="#waitlist" onClick={onNavigate} className="hp-btn hp-btn-primary hp-btn-block">
          Join the waitlist
        </a>
      </div>
    </dialog>
  );
}
