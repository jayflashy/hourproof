import { faqs } from '../content/site.js';
import { cx } from '../lib/cx.js';
import { useAppState } from '../state/AppState.jsx';
import { ChevronIcon } from './Icons.jsx';
import { Section } from './Section.jsx';

export function Faq() {
  const { faqOpenId, toggleFaq } = useAppState();

  function onTriggerKeyDown(event, index) {
    let nextIndex = null;
    const last = faqs.length - 1;
    switch (event.key) {
      case 'ArrowDown':
        nextIndex = index === last ? 0 : index + 1;
        break;
      case 'ArrowUp':
        nextIndex = index === 0 ? last : index - 1;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = last;
        break;
      default:
        return;
    }
    event.preventDefault();
    const root = event.currentTarget.closest('[data-accordion]');
    const buttons = root?.querySelectorAll('[data-accordion-trigger]');
    buttons?.item(nextIndex)?.focus();
  }

  return (
    <Section
      id="faq"
      defer
      eyebrow="FAQ"
      title="Questions we hear before the first swap."
      intro="Short answers. If yours is not here, the waitlist note is a fine place to ask it."
    >
      <div className="hp-accordion" data-accordion="">
        {faqs.map((item, index) => {
          const open = faqOpenId === item.id;
          const buttonId = `faq-button-${item.id}`;
          const panelId = `faq-panel-${item.id}`;
          return (
            <div key={item.id} className="hp-acc-item">
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  data-accordion-trigger=""
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => toggleFaq(item.id)}
                  onKeyDown={(event) => onTriggerKeyDown(event, index)}
                >
                  <span>{item.question}</span>
                  <ChevronIcon className={cx('hp-icon hp-chevron', open && 'hp-chevron-open')} />
                </button>
              </h3>
              <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}>
                <p>{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
