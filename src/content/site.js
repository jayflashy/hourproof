export const navLinks = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#features', label: 'Features' },
  { href: '#proofs', label: 'Proofs' },
  { href: '#stories', label: 'Stories' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

export const exampleSkills = [
  'Code review',
  'SQL',
  'Accessibility',
  'Git',
  'System design',
  'CSS architecture',
  'Incident notes',
  'Rust basics',
];

export const heroFacts = [
  { value: '60 min', label: 'Shared hour' },
  { value: '1 proof', label: 'Left in public' },
  { value: 'No video', label: 'Nothing stored' },
];

export const sampleSwap = {
  when: 'Thursday · Call',
  time: '7:00–8:00',
  people: [
    {
      name: 'Maya Chen',
      role: 'Staff engineer',
      offers: 'PR review',
      level: 'Can teach a working developer',
    },
    {
      name: 'Andre Walsh',
      role: 'Platform engineer',
      offers: 'Incident write-ups',
      level: 'Can teach a working developer',
    },
  ],
  agenda: [
    { time: '0–25 min', detail: 'Maya reviews a real pull request' },
    { time: '25–30', detail: 'Switch roles' },
    { time: '30–55', detail: 'Andre edits an incident timeline' },
    { time: '55–60', detail: 'Each publishes a short proof' },
  ],
};

export const steps = [
  {
    title: 'Offer a skill',
    body: 'Name something you can teach a working developer in an hour. Code review, query plans, focus order, git history. A job title is not the offer.',
  },
  {
    title: 'Ask for one',
    body: 'Name the skill you want, your level, and whether you want a call or a public table. Say what proof you hope to leave with.',
  },
  {
    title: 'Confirm one person',
    body: 'We introduce a single match. You both accept before a time is set. There is no feed and no race to reply first.',
  },
  {
    title: 'Leave a proof',
    body: 'A shared agenda splits the hour. At the end, each of you publishes a small artifact: a gist, a PR comment, or a tiny repo.',
  },
];

export const features = [
  {
    title: 'One introduction, not a feed',
    body: 'You see one person: their skill, level, and the proof they want to make. Accept or decline. A decline stays private.',
    icon: 'person',
  },
  {
    title: 'The hour is split on purpose',
    body: 'Twenty-five minutes, a switch, twenty-five minutes, then the proof. The agenda is shared so one topic does not eat the session.',
    icon: 'clock',
  },
  {
    title: 'Level is written down',
    body: 'Learning, comfortable, or ready to teach. A first Rust hour is not paired with someone who wanted a borrow-checker review.',
    icon: 'levels',
  },
  {
    title: 'Call, or a public place',
    body: 'Meet on a call, or in a café, library, or shop you both pick. Home addresses are not part of the introduction.',
    icon: 'video',
  },
  {
    title: 'A proof, not a certificate',
    body: 'The record of the hour is the artifact you publish. We do not record the call, and we do not store one.',
    icon: 'notes',
  },
  {
    title: 'Block and report reach a person',
    body: 'Block hides someone immediately. A report is read by a moderator, not closed by a script.',
    icon: 'shield',
  },
];

export const stories = [
  {
    quote:
      'We used a pull request I was actually stuck on. She marked three comments I would have rubber-stamped. I spent my half walking her through EXPLAIN on a query that was scanning the whole table. The gist is still the note I send new hires.',
    name: 'Maya Chen',
    detail: 'Staff engineer · Oakland',
    taught: 'PR review',
    learned: 'Query plans',
  },
  {
    quote:
      'He wanted incident write-ups. I wanted CSS that does not collapse when the nav wraps. We edited a timeline from a real page, then rebuilt the header at 320 pixels. Both artifacts are on the repo.',
    name: 'Andre Walsh',
    detail: 'Platform engineer · Detroit',
    taught: 'Incident notes',
    learned: 'CSS architecture',
  },
  {
    quote:
      'The guide keeps it a lesson. Half an hour on focus order in a dialog I shipped, then half an hour of Rust errors I was misreading. We each pushed a small proof before we hung up.',
    name: 'Priya Nair',
    detail: 'Design engineer · Lisbon',
    taught: 'Accessibility audits',
    learned: 'Rust basics',
  },
];

export const plans = [
  {
    id: 'plan-guest',
    name: 'Guest',
    price: '$0',
    cadence: 'forever',
    summary: 'Try a single exchange.',
    featured: false,
    cta: 'Join as a guest',
    items: ['1 confirmed swap a month', 'The shared session guide', 'Email when a match is ready'],
  },
  {
    id: 'plan-member',
    name: 'Member',
    price: '$9',
    cadence: 'per month',
    summary: 'For a weekly practice.',
    featured: true,
    cta: 'Join as a member',
    items: [
      'Unlimited confirmed swaps',
      'Priority when a rare skill appears',
      'A shelf of your public proofs',
      'Cancel before the next month',
    ],
  },
  {
    id: 'plan-circle',
    name: 'Circle',
    price: '$29',
    cadence: 'per month',
    summary: 'For a team that learns together.',
    featured: false,
    cta: 'Start a circle',
    items: [
      'A private group of up to 8',
      'A shared board of skills',
      'One host who can suggest pairs',
    ],
  },
];

export const faqs = [
  {
    id: 'expert',
    question: 'Do I have to be an expert to teach?',
    answer:
      'No. You should be able to coach a working developer for one focused hour. “I can review a small PR and explain the comments” is enough. The form asks for your level so a first lesson is not paired with someone who wanted an advanced critique.',
  },
  {
    id: 'fit',
    question: 'What if the match is not a fit?',
    answer:
      'Either of you can decline before the session, or end it if something feels off. A decline is not shared as a review. If someone makes you uncomfortable, block them and send a report if you want one read. Reports are read by a person.',
  },
  {
    id: 'where',
    question: 'Is a swap a call or in person?',
    answer:
      'You choose: a call, a public place you both agree on, or either. In-person swaps stay in cafés, libraries, shops, and other public spots. Home addresses are not part of the introduction.',
  },
  {
    id: 'price',
    question: 'Why is there a membership if the swap is free?',
    answer:
      'The hour of teaching is never billed. Membership pays for introductions, the session guide, moderation, and keeping the product free of ads. The guest plan stays free for one confirmed swap a month.',
  },
  {
    id: 'skills',
    question: 'Which skills are left out?',
    answer:
      'Anything that needs a license to practice on another person, anything sexual, and anything aimed at a minor. Programming, design, writing, data, and the craft around shipping software are welcome.',
  },
  {
    id: 'safety',
    question: 'How do you keep sessions safe?',
    answer:
      'You both confirm before a time is set. The first swap is capped at an hour. We do not show your email to the other person. There is no session recording. Block hides someone immediately, and a report goes to a moderator.',
  },
  {
    id: 'again',
    question: 'Can we swap again, and what counts as proof?',
    answer:
      'Yes, after the first guided hour. A proof is a small public artifact from the session: a gist, a pull request comment, a commit, or a written recap with a link. Private notes do not count. The point is that someone else could learn from what you made.',
  },
];

/** Real public repositories used when GitHub search is unavailable. */
export const fallbackRepos = [
  {
    name: 'freeCodeCamp/freeCodeCamp',
    url: 'https://github.com/freeCodeCamp/freeCodeCamp',
    description: 'Curriculum and codebase for learning to code and helping nonprofits.',
    language: 'TypeScript',
    stars: null,
  },
  {
    name: 'getify/You-Dont-Know-JS',
    url: 'https://github.com/getify/You-Dont-Know-JS',
    description: 'A book series on the JavaScript language, written to be taught as well as read.',
    language: 'Multiple languages',
    stars: null,
  },
  {
    name: 'ossu/computer-science',
    url: 'https://github.com/ossu/computer-science',
    description: 'A path through a computer science education using free materials.',
    language: 'Multiple languages',
    stars: null,
  },
  {
    name: 'TheAlgorithms/JavaScript',
    url: 'https://github.com/TheAlgorithms/JavaScript',
    description:
      'Algorithms and data structures implemented in JavaScript, useful as teaching material.',
    language: 'JavaScript',
    stars: null,
  },
];
