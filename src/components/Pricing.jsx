import { plans } from '../content/site.js';
import { cx } from '../lib/cx.js';
import { CheckIcon } from './Icons.jsx';
import { Section } from './Section.jsx';

export function Pricing() {
  return (
    <Section
      id="pricing"
      tint
      defer
      eyebrow="Pricing"
      title="The swap is free. Membership keeps the lights on."
      intro="Teaching each other costs nothing. A plan pays for matching, the guide, and moderation. This page does not take a card."
    >
      <ul className="hp-plan-grid">
        {plans.map((plan) => (
          <li key={plan.id}>
            <article
              aria-labelledby={plan.id}
              className={cx('hp-card hp-plan', plan.featured && 'hp-plan-featured')}
            >
              <div className="hp-plan-top">
                <h3 id={plan.id}>{plan.name}</h3>
                {plan.featured ? <p className="hp-badge">For weekly swapping</p> : null}
              </div>
              <p className="hp-muted">{plan.summary}</p>
              <p className="hp-price">
                <span>{plan.price}</span>
                <span>{plan.cadence}</span>
              </p>
              <ul className="hp-checks">
                {plan.items.map((item) => (
                  <li key={item}>
                    <CheckIcon className="hp-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#waitlist"
                className={cx('hp-btn', plan.featured ? 'hp-btn-primary' : 'hp-btn-secondary')}
              >
                {plan.cta}
              </a>
            </article>
          </li>
        ))}
      </ul>
      <p className="hp-price-note">
        Prices are in USD and shown so the model is clear. The hour you teach is never billed.
        Cancel a paid plan before the next month and it stops. This preview does not check out.
      </p>
    </Section>
  );
}
