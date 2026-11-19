export const meetingFormats = [
  { value: 'online', label: 'Online' },
  { value: 'in-person', label: 'In person' },
  { value: 'either', label: 'Either' },
];

export const meetingFormatCopy = {
  online: 'online',
  'in-person': 'in person',
  either: 'either online or in person',
};

export const fieldOrder = ['name', 'email', 'teach', 'learn'];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u;

function tidy(value) {
  return value.trim().replace(/\s+/gu, ' ');
}

export function normalizeWaitlist(values) {
  return {
    name: tidy(values.name),
    email: values.email.trim(),
    teach: tidy(values.teach),
    learn: tidy(values.learn),
    format: values.format,
  };
}

function checkText(value, messages) {
  if (!value) return messages.empty;
  if (value.length < 2) return messages.short;
  if (value.length > 80) return messages.long;
  return undefined;
}

export function validateWaitlist(values) {
  const normalized = normalizeWaitlist(values);
  /** @type {Record<string, string>} */
  const errors = {};

  const nameError = checkText(normalized.name, {
    empty: 'Enter the name your match should see.',
    short: 'Use at least 2 characters.',
    long: 'Keep your name under 80 characters.',
  });
  if (nameError) errors.name = nameError;

  if (!normalized.email) {
    errors.email = 'Enter an email so we can tell you when a match opens.';
  } else if (!EMAIL_PATTERN.test(normalized.email) || normalized.email.length > 254) {
    errors.email = 'That email looks incomplete. Use a format like name@example.com.';
  }

  const teachError = checkText(normalized.teach, {
    empty: 'Name a skill you can teach for an hour.',
    short: 'Use at least 2 characters.',
    long: 'Keep this under 80 characters.',
  });
  if (teachError) errors.teach = teachError;

  const learnError = checkText(normalized.learn, {
    empty: 'Name a skill you want to learn.',
    short: 'Use at least 2 characters.',
    long: 'Keep this under 80 characters.',
  });
  if (learnError) errors.learn = learnError;

  return errors;
}

export function invalidFields(errors) {
  return fieldOrder.filter((field) => Boolean(errors[field]));
}

export function errorSummary(count) {
  if (count <= 0) return null;
  if (count === 1) return '1 field needs attention before you join.';
  return `${count} fields need attention before you join.`;
}
