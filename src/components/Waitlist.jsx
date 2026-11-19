import { useEffect, useId, useRef } from 'react';
import {
  errorSummary,
  invalidFields,
  meetingFormatCopy,
  meetingFormats,
  normalizeWaitlist,
  validateWaitlist,
} from '../lib/validateWaitlist.js';
import { useAppState } from '../state/AppState.jsx';

export function Waitlist() {
  return (
    <section
      id="waitlist"
      aria-labelledby="waitlist-title"
      className="hp-section hp-section-tint hp-defer"
    >
      <div className="hp-container hp-wait-grid">
        <div>
          <p className="hp-eyebrow">Waitlist</p>
          <h2 id="waitlist-title" className="hp-h2">
            Tell us the skill you would trade.
          </h2>
          <p className="hp-lede">
            We are opening city by city. Leave what you can teach and what you want. We will write
            when there is a fair match, and only then.
          </p>
          <ol className="hp-mini-steps">
            <li className="hp-card">
              <p className="hp-person-name">1. We read the pair of skills</p>
              <p>Not a blast to the whole list. One possible person.</p>
            </li>
            <li className="hp-card">
              <p className="hp-person-name">2. You both confirm</p>
              <p>No time is set until the two of you say yes.</p>
            </li>
            <li className="hp-card">
              <p className="hp-person-name">3. The hour ends with a proof</p>
              <p>Half the time each way, then a gist, a comment, or a tiny commit.</p>
            </li>
          </ol>
        </div>
        <WaitlistForm />
      </div>
    </section>
  );
}

export function WaitlistForm() {
  const { waitlist, updateWaitlist, submitWaitlist, editWaitlist } = useAppState();
  const successRef = useRef(null);
  const pendingFocus = useRef(null);
  const errors = waitlist.attempted ? validateWaitlist(waitlist.values) : {};
  const summary = waitlist.attempted ? errorSummary(invalidFields(errors).length) : null;
  const normalized = normalizeWaitlist(waitlist.values);

  useEffect(() => {
    if (pendingFocus.current === 'success' && waitlist.succeeded) {
      successRef.current?.focus();
      pendingFocus.current = null;
    }
    if (pendingFocus.current === 'name' && !waitlist.succeeded) {
      document.getElementById('name')?.focus();
      pendingFocus.current = null;
    }
  }, [waitlist.succeeded]);

  function onSubmit(event) {
    event.preventDefault();
    const nextErrors = validateWaitlist(waitlist.values);
    const invalid = invalidFields(nextErrors);
    submitWaitlist();
    if (invalid.length > 0) {
      const first = invalid[0];
      if (first) document.getElementById(first)?.focus();
      return;
    }
    pendingFocus.current = 'success';
  }

  function edit() {
    pendingFocus.current = 'name';
    editWaitlist();
  }

  if (waitlist.succeeded) {
    return (
      <div ref={successRef} role="status" tabIndex={-1} className="hp-card hp-success">
        <h3>You are on the list, {normalized.name}.</h3>
        <p>
          We will write to <strong>{normalized.email}</strong> when a match opens for{' '}
          {normalized.learn}. You offered {normalized.teach}, and you asked to meet{' '}
          {meetingFormatCopy[normalized.format]}.
        </p>
        <p className="hp-muted">
          Nothing left this browser. This preview keeps your answer on the page and does not send it
          to a server.
        </p>
        <button type="button" className="hp-btn hp-btn-secondary" onClick={edit}>
          Edit my answers
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-labelledby="waitlist-title"
      className="hp-card hp-form"
    >
      <p className="hp-muted">All fields are required.</p>
      {summary ? (
        <div role="alert" className="hp-alert">
          {summary}
        </div>
      ) : null}
      <div className="hp-fields">
        <TextField
          id="name"
          label="Name"
          hint="This is what your match will see."
          autoComplete="name"
          value={waitlist.values.name}
          error={errors.name}
          onChange={(value) => updateWaitlist('name', value)}
        />
        <TextField
          id="email"
          label="Email"
          hint="Used when a match opens. No weekly newsletter."
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          value={waitlist.values.email}
          error={errors.email}
          onChange={(value) => updateWaitlist('email', value)}
        />
        <TextField
          id="teach"
          label="Skill you can teach"
          hint="Something you can explain for an hour."
          autoComplete="off"
          value={waitlist.values.teach}
          error={errors.teach}
          onChange={(value) => updateWaitlist('teach', value)}
        />
        <TextField
          id="learn"
          label="Skill you want to learn"
          hint="The skill you want back."
          autoComplete="off"
          value={waitlist.values.learn}
          error={errors.learn}
          onChange={(value) => updateWaitlist('learn', value)}
        />
        <FormatField
          value={waitlist.values.format}
          onChange={(value) => updateWaitlist('format', value)}
        />
      </div>
      <button type="submit" className="hp-btn hp-btn-primary">
        Join the waitlist
      </button>
    </form>
  );
}

function TextField({
  id,
  label,
  hint,
  error,
  value,
  onChange,
  type = 'text',
  autoComplete,
  inputMode,
  spellCheck,
}) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = error ? `${hintId} ${errorId}` : hintId;
  return (
    <div className="hp-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        spellCheck={spellCheck}
        maxLength={id === 'email' ? 254 : 80}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        aria-required="true"
        required
        className={error ? 'hp-input-invalid' : undefined}
      />
      <p id={hintId}>{hint}</p>
      {error ? (
        <p id={errorId} className="hp-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function FormatField({ value, onChange }) {
  const legendId = useId();
  return (
    <fieldset className="hp-fieldset">
      <legend id={legendId}>How do you want to meet?</legend>
      <div className="hp-radios">
        {meetingFormats.map((option) => (
          <label key={option.value} className="hp-radio">
            <input
              type="radio"
              name="format"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
