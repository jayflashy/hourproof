function Icon({ className, children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export function SwapIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M4 8h12" />
      <path d="m13 5 4 3-4 3" />
      <path d="M20 16H8" />
      <path d="m11 13-4 3 4 3" />
    </Icon>
  );
}

export function MenuIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </Icon>
  );
}

export function CloseIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </Icon>
  );
}

export function SunIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v1.6M12 19.4V21M3 12h1.6M19.4 12H21" />
      <path d="m5.6 5.6 1.1 1.1M17.3 17.3l1.1 1.1M18.4 5.6l-1.1 1.1M6.7 17.3 5.6 18.4" />
    </Icon>
  );
}

export function MoonIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M20 14.5A7.5 7.5 0 0 1 9.5 4 7 7 0 1 0 20 14.5Z" />
    </Icon>
  );
}

export function ChevronIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
}

export function CheckIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="m5 12.5 4.2 4.2L19 7.5" />
    </Icon>
  );
}

export function PersonIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="8" r="3" />
      <path d="M6 19c.7-3 2.8-4.5 6-4.5s5.3 1.5 6 4.5" />
    </Icon>
  );
}

export function ClockIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </Icon>
  );
}

export function LevelsIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M5 18V11" />
      <path d="M12 18V7" />
      <path d="M19 18v-4" />
    </Icon>
  );
}

export function VideoIcon({ className }) {
  return (
    <Icon className={className}>
      <rect x="3" y="7" width="12" height="10" rx="2" />
      <path d="m15 11 6-3v8l-6-3" />
    </Icon>
  );
}

export function NotesIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M7 3.5h9a1 1 0 0 1 1 1V20l-3-2-2.5 2-2.5-2L6 20V4.5a1 1 0 0 1 1-1Z" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
    </Icon>
  );
}

export function ShieldIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M12 3 19 6v6c0 4.2-2.8 6.5-7 8-4.2-1.5-7-3.8-7-8V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </Icon>
  );
}

const featureIcons = {
  person: PersonIcon,
  clock: ClockIcon,
  levels: LevelsIcon,
  video: VideoIcon,
  notes: NotesIcon,
  shield: ShieldIcon,
};

export function FeatureIcon({ name, className }) {
  const Selected = featureIcons[name] ?? NotesIcon;
  return <Selected className={className} />;
}
