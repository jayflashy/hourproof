import { navLinks } from '../content/site.js';
import { Logo } from './Logo.jsx';

export function Footer() {
  return (
    <footer className="hp-footer">
      <div className="hp-container">
        <div className="hp-footer-top">
          <div>
            <a href="#top" className="hp-brand">
              <Logo />
              <span>Hourproof</span>
            </a>
            <p className="hp-muted">
              A skill exchange for developers who would rather practice with a person, then leave a
              proof someone else can read.
            </p>
          </div>
          <nav aria-label="Footer">
            <p className="hp-eyebrow">On this page</p>
            <ul className="hp-footer-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
              <li>
                <a href="#waitlist">Waitlist</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="hp-legal">
          <section aria-labelledby="about-title">
            <h2 id="about-title">About</h2>
            <p>
              Hourproof is a learning exchange for developers. You teach an hour of something you
              know. Someone else teaches you an hour of something you want. The session ends with a
              small public proof.
            </p>
          </section>
          <section id="privacy" aria-labelledby="privacy-title">
            <h2 id="privacy-title">Privacy</h2>
            <p>
              The waitlist never leaves your browser. Submitting it shows a confirmation and keeps
              what you typed in memory until you refresh. The open proofs section requests public
              repository search results from api.github.com. That request does not include your
              name, email, or skills. The only value stored on this device is your theme, under the
              localStorage key hourproof-theme.
            </p>
          </section>
          <section id="terms" aria-labelledby="terms-title">
            <h2 id="terms-title">Terms</h2>
            <p>
              This page is a product prototype. Plans, prices, and stories are illustrative. Do not
              send payment details or rely on it for a real lesson. GitHub remains the source of any
              live repository data shown here.
            </p>
          </section>
        </div>
        <p className="hp-wordmark" aria-hidden="true">
          Hourproof
        </p>
        <p className="hp-copy">© {new Date().getFullYear()} Hourproof.</p>
      </div>
    </footer>
  );
}
