import { exampleSkills, heroFacts, sampleSwap } from '../content/site.js';
import { SwapIcon } from './Icons.jsx';

export function Hero() {
  return (
    <section className="hp-hero" aria-labelledby="hero-title">
      <div className="hp-container hp-hero-grid">
        <div>
          <p className="hp-eyebrow">Developer skill exchange</p>
          <h1 id="hero-title" className="hp-h1">
            <span>Teach one hour.</span>
            <span className="hp-h1-em">Leave a proof.</span>
          </h1>
          <p className="hp-lede">
            Hourproof matches developers who can teach each other. You offer an hour of review,
            debugging, or a craft you know. They offer the hour you want. You both leave a small
            public artifact.
          </p>
          <div className="hp-actions">
            <a href="#waitlist" className="hp-btn hp-btn-primary">
              Join the waitlist
            </a>
            <a href="#how-it-works" className="hp-btn hp-btn-secondary">
              See how a swap works
            </a>
          </div>
          <p className="hp-note">
            Free to join. We write when a fair match opens, not on a weekly drip.
          </p>
          <dl className="hp-facts">
            {heroFacts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="hp-chip-block">
            <p id="skill-examples">Skills you might trade</p>
            <ul aria-labelledby="skill-examples" className="hp-chips">
              {exampleSkills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
        <SampleSwap />
      </div>
    </section>
  );
}

function SampleSwap() {
  return (
    <figure className="hp-ticket-wrap">
      <div className="hp-ticket">
        <div className="hp-ticket-top">
          <p>Sample swap</p>
          <p>{sampleSwap.when}</p>
        </div>
        <p className="hp-ticket-time">{sampleSwap.time}</p>
        <div className="hp-people">
          {sampleSwap.people.map((person, index) => (
            <div key={person.name}>
              {index === 1 ? (
                <div className="hp-swap-row" aria-hidden="true">
                  <span />
                  <span className="hp-swap-badge">
                    <SwapIcon className="hp-icon" />
                  </span>
                  <span />
                </div>
              ) : null}
              <div className="hp-person">
                <p className="hp-person-name">{person.name}</p>
                <p className="hp-muted">{person.role}</p>
                <p>
                  <span className="hp-muted">Offers </span>
                  {person.offers}
                </p>
                <p className="hp-muted">{person.level}</p>
              </div>
            </div>
          ))}
        </div>
        <ol className="hp-agenda">
          {sampleSwap.agenda.map((item) => (
            <li key={item.time}>
              <span>{item.time}</span>
              <span>{item.detail}</span>
            </li>
          ))}
        </ol>
      </div>
      <figcaption>An example hour. The names are illustrative.</figcaption>
    </figure>
  );
}
