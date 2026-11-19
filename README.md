# Hourproof

Hourproof is a landing page for a fictional developer skill exchange. You teach an hour of something you know — a pull-request review, a query plan, an accessibility pass — and someone teaches you the hour you want. The session ends with a small public proof: a gist, a review comment, or a tiny commit.

The page is a static React app. The waitlist never leaves the browser. The only network call is a public GitHub search for learning repositories, and it degrades to a saved shelf if that call fails.

Live demo: _Add the deployed URL here._

## Features

- Sticky header with a desktop nav and a modal mobile menu (focus moves in, Escape and the backdrop dismiss it, focus returns to the menu button).
- Hero, how-it-works, features, testimonials, pricing, an FAQ accordion, a waitlist form, and a footer with real privacy and terms copy.
- Open proofs: live repositories from the public GitHub search API, with loading, empty, and error states. An error or an empty result shows a saved shelf of real public repos instead of a blank section.
- Theme follows the system preference until you choose, then the choice is stored in `localStorage`. A tiny script in `index.html` applies it before CSS loads, so the page does not flash the wrong theme.
- Waitlist form validates in the browser, points at the first invalid field, and replaces itself with a confirmation you can edit. Nothing is submitted.
- Dark mode, visible focus, a skip link, semantic landmarks, and motion that backs off when `prefers-reduced-motion` is set.

## Tech stack

- React 19 and Vite, written in JavaScript (JSX). No TypeScript.
- Hand-written CSS with custom properties for theming. No Tailwind and no CSS framework.
- ESLint (including `jsx-a11y` and the React hooks plugin) and Prettier.
- Vitest, Testing Library, and jsdom.
- Fonts are self-hosted with Fontsource (Outfit and Fraunces, Latin only).

There is no backend, no environment variable, and no API key.

## Setup

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

`npm run dev` starts Vite. The default URL is `http://127.0.0.1:5173`.

```bash
npm test          # Vitest, once
npm run lint      # ESLint (zero warnings) and Prettier check
npm run format    # write Prettier formatting
npm run build     # static site in dist/
npm run preview   # serve dist/ locally
```

`npm run build` emits relative asset paths (`./assets/...`), so the same `dist/` folder works at a domain root or a subpath.

## Deployment

No environment variables. Build command: `npm run build`. Publish directory: `dist`.

### Vercel

1. Import the repository.
2. Framework preset: Vite.
3. Build command: `npm run build`. Output directory: `dist`.
4. Deploy. Replace `https://hourproof.example/` in `index.html`, `public/robots.txt`, and `public/sitemap.xml` with the production origin before you rely on canonical and social tags.

### Netlify

1. New site from Git.
2. Build command: `npm run build`. Publish directory: `dist`.
3. No redirects are required. The app is one document, not a client-side router.

### Cloudflare Pages

1. Create a project from the repository.
2. Build command: `npm run build`. Build output directory: `dist`.
3. The GitHub fetch runs in the visitor's browser, so the Pages project does not need a token or a proxy.

GitHub Pages works the same way: upload or deploy `dist/`. Relative asset URLs keep the CSS and JS working from a project subpath.

## Architecture

### Folder structure

```
index.html              SEO tags, JSON-LD, theme boot script
public/                 favicon, manifest, robots.txt, sitemap.xml
src/main.jsx            font imports and React root
src/App.jsx             provider, eager hero, lazy below-fold sections
src/content/site.js     copy, plans, FAQ, saved GitHub shelf
src/lib/theme.js        storage key, system theme, DOM application
src/lib/validateWaitlist.js
src/lib/github.js       search URL, normalizer, fetch
src/state/AppState.jsx  context + useReducer for theme and UI
src/styles/tokens.css   color, type, and shadow tokens
src/styles/base.css     reset, focus, buttons, reduced motion
src/styles/sections.css section layout
src/components/         one file per section, plus icons and the menu
```

### Component tree

```
App
└── AppStateProvider
    ├── SkipLink
    ├── Header
    │   ├── ThemeToggle
    │   └── MobileMenu (mounted only while open)
    │       └── ThemeToggle
    └── main
        ├── Hero
        ├── HowItWorks
        ├── Features          lazy
        ├── Projects          lazy, own useReducer for the request
        ├── Testimonials      lazy
        ├── Pricing           lazy
        ├── Faq               lazy
        ├── Waitlist          lazy
        │   └── WaitlistForm
        └── Footer            lazy
```

Header, hero, and how-it-works stay in the first bundle because they are the first screen. Everything below is a separate chunk, loaded as soon as the shell renders, so the content is available without waiting for a scroll. Vite's build output lists those chunks under `dist/assets/`.

Below-fold sections also set `content-visibility: auto` with an intrinsic size, so the browser can skip painting them until they are near the viewport. There are no content images. Icons are inline SVG.

### State

`AppStateProvider` holds one reducer:

| Slice       | What it stores                                                                  |
| ----------- | ------------------------------------------------------------------------------- |
| `theme`     | `'light'` or `'dark'`                                                           |
| `menuOpen`  | mobile dialog                                                                   |
| `faqOpenId` | the open accordion item, or `null`                                              |
| `waitlist`  | field values, whether the visitor has tried to submit, and whether it succeeded |

The reducer is pure. Writing `localStorage` and toggling the `dark` class happen in the provider, next to the event that asked for them. A stored choice wins over the system preference. If nothing is stored, a `prefers-color-scheme` listener keeps the page in step with the OS.

The GitHub request has its own reducer inside `Projects` (`loading` → `success`, `empty`, or `error`). A network update should not re-render the header and the form. The request is aborted on unmount and gives up after eight seconds.

### Theming

Tokens live on `:root` and `:root.dark` in `src/styles/tokens.css`. Components never hard-code a second palette; they use `var(--bg)`, `var(--fg)`, `var(--accent)`, and the rest.

`index.html` runs a blocking script that reads `hourproof-theme` or `prefers-color-scheme` and sets the class, `color-scheme`, and `theme-color` before the body paints. A few lines of critical CSS paint the same background so the first frame is not white in dark mode. `src/theme-boot.test.js` fails if that script drifts from `src/lib/theme.js`.

### Accessibility

- One `h1`. Section titles are `h2`. Cards, plans, and questions are `h3`.
- Landmarks: `header`, `nav` (named Primary, Mobile, or Footer), `main`, `footer`, and sections labelled by their headings.
- Skip link, then a `main` tab stop (`tabIndex={-1}`) so the link moves focus as well as scroll.
- Menu is a modal `<dialog>`: labelled, Escape cancels, backdrop click dismisses, the close button is focused on open, and the trigger is focused again when the menu is dismissed without navigating.
- FAQ follows the accordion keyboard pattern: Enter or Space toggles, Arrow Up/Down move between headers and wrap, Home and End jump to the ends. Closed panels use the `hidden` attribute so they leave the accessibility tree. Arrow keys do not toggle.
- The form uses visible labels, `aria-invalid`, `aria-describedby` for the hint and the error, a summary `role="alert"`, and a success region with `role="status"` that receives focus.
- Focus rings use the `--ring` token, checked against both themes. `prefers-contrast: more` strengthens muted text and borders. `forced-colors` keeps a system outline.
- `prefers-reduced-motion: reduce` cuts animation, transition, and smooth-scroll duration. The ticket float and the menu slide are additionally gated on `no-preference`.

Text colors were chosen for WCAG AA (at least 4.5:1) on the background, surface, and tinted bands in both themes. Input borders use a stronger token than decorative card borders so the control boundary stays visible.

### SEO

`index.html` sets the title, description, canonical URL, Open Graph tags, Twitter card tags, and a `WebSite` JSON-LD block. `public/robots.txt` allows crawling and points at `public/sitemap.xml`. The placeholder origin is `https://hourproof.example/` — change it when you deploy. Headings are real heading elements, and links say where they go (including “opens in a new tab” for GitHub).

## Decisions and trade-offs

- **JavaScript, not TypeScript.** The brief asks for React and JavaScript. Shapes that a typechecker would have carried — theme, waitlist values, repository records, reducer actions — are documented with short JSDoc on the helpers instead. The cost is that a misspelled action type fails at runtime; the reducer ignores unknown actions rather than throwing.
- **One stylesheet, not CSS modules.** The page is one visual system. Tokens, focus, and reduced motion need a single cascade. Class names are prefixed `hp-` so they stay searchable. CSS modules would have split that cascade across files without a boundary the design actually has.
- **ESLint 9 rather than 10.** Current `eslint-plugin-jsx-a11y` and `eslint-plugin-react` peer-depend on ESLint 9. The accessibility plugin was worth more than being on the newest ESLint major.
- **No component library and no Tailwind.** The accordion, dialog, and form are small enough to implement against the patterns we test. A widget library would have hidden the keyboard behavior the tests are there to lock in.
- **Global reducer for shared UI, local reducer for the request.** Theme, menu, FAQ, and the form are read from more than one component, so they live in context. The GitHub call is local so a loading flag does not re-render the whole page, and so the section can be deleted without touching the store.
- **GitHub search, unauthenticated.** `topic:learn-to-code` with a star floor returns real teaching repositories and needs no token. The trade-off is the unauthenticated rate limit (60 requests an hour per IP). The saved shelf is the graceful path: the section still links to real public repos, and the alert says the live search did not load. We do not send a `User-Agent` override; browsers forbid it, and the `Accept` header is enough.
- **Code-split, but do not wait for scroll to mount.** Lazy chunks shrink the first script. Gating those sections on an intersection observer would also hide them from anyone who does not scroll during a quick pass, including some automated checks. `content-visibility` does the paint deferral without removing the nodes.
- **Relative `base`.** `base: './'` makes `dist/` portable. The cost is that the canonical URL cannot be inferred from the bundle, so it stays a documented placeholder.
- **The form does not pretend to submit.** The success state says the answer stayed on the page. Wiring a real endpoint later means replacing `submitWaitlist` with a request and keeping the same validation and focus behavior.
- **Illustrative pricing and stories.** They explain the product. The page says it does not take payment, and the footer says the stories are sketches.

## Tests

- Theme: system default, stored choice over the system, toggle, persistence, and the polite announcement.
- Waitlist: empty submit, short name, bad email, success copy, focus, and returning to the saved answers.
- FAQ: click and Enter toggle `aria-expanded`; Arrow Up/Down, Home, and End move focus without toggling.
- Proofs: loading then a live repo, HTTP failure with the saved shelf, and an empty search with the saved shelf.
- Boot script: `index.html` still mentions the storage key and both background colors.
