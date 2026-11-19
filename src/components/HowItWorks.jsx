import { steps } from '../content/site.js';
import { Section } from './Section.jsx';

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      tint
      eyebrow="How it works"
      title="Four steps, then you are in a room with the right person."
      intro="No catalog to browse and no streak to keep. You offer one skill, ask for one skill, and leave a proof."
    >
      <ol className="hp-steps">
        {steps.map((step, index) => (
          <li key={step.title} className="hp-card">
            <p className="hp-step-num" aria-hidden="true">
              {index + 1}
            </p>
            <h3>
              <span className="hp-sr">Step {index + 1}. </span>
              {step.title}
            </h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
