import { features } from '../content/site.js';
import { FeatureIcon } from './Icons.jsx';
import { Section } from './Section.jsx';

export function Features() {
  return (
    <Section
      id="features"
      defer
      eyebrow="Features"
      title="Built for a fair trade."
      intro="The product is the introduction, the agenda, and a public proof. Everything else stays out of the hour."
    >
      <ul className="hp-feature-grid">
        {features.map((feature) => (
          <li key={feature.title} className="hp-card">
            <span className="hp-feature-icon">
              <FeatureIcon name={feature.icon} className="hp-icon" />
            </span>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
