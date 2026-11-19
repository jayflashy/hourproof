import { cx } from '../lib/cx.js';

export function Section({ id, eyebrow, title, intro, children, tint = false, defer = false }) {
  const titleId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cx('hp-section', tint && 'hp-section-tint', defer && 'hp-defer')}
    >
      <div className="hp-container">
        <div className="hp-section-intro">
          {eyebrow ? <p className="hp-eyebrow">{eyebrow}</p> : null}
          <h2 id={titleId} className="hp-h2">
            {title}
          </h2>
          {intro ? <p className="hp-lede">{intro}</p> : null}
        </div>
        <div className="hp-section-body">{children}</div>
      </div>
    </section>
  );
}

export function SectionFallback({ label }) {
  return (
    <div className="hp-fallback" role="status">
      {label}
    </div>
  );
}
