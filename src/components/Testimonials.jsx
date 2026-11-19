import { stories } from '../content/site.js';
import { Section } from './Section.jsx';

export function Testimonials() {
  return (
    <Section
      id="stories"
      defer
      eyebrow="Stories"
      title="What an hour actually sounds like."
      intro="These are composite sketches of the trades we are designing for. They are here so the product is concrete."
    >
      <ul className="hp-story-grid">
        {stories.map((story) => (
          <li key={story.name}>
            <figure className="hp-card hp-story">
              <blockquote>
                <p>“{story.quote}”</p>
              </blockquote>
              <figcaption>
                <p className="hp-person-name">{story.name}</p>
                <p className="hp-muted">{story.detail}</p>
                <ul className="hp-pills">
                  <li>Taught {story.taught}</li>
                  <li>Learned {story.learned}</li>
                </ul>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
