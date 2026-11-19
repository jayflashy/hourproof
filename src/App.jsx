import { lazy, Suspense } from 'react';
import { Header } from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import { HowItWorks } from './components/HowItWorks.jsx';
import { SectionFallback } from './components/Section.jsx';
import { SkipLink } from './components/SkipLink.jsx';
import { AppStateProvider } from './state/AppState.jsx';

const Features = lazy(() =>
  import('./components/Features.jsx').then((module) => ({ default: module.Features })),
);
const Projects = lazy(() =>
  import('./components/Projects.jsx').then((module) => ({ default: module.Projects })),
);
const Testimonials = lazy(() =>
  import('./components/Testimonials.jsx').then((module) => ({ default: module.Testimonials })),
);
const Pricing = lazy(() =>
  import('./components/Pricing.jsx').then((module) => ({ default: module.Pricing })),
);
const Faq = lazy(() => import('./components/Faq.jsx').then((module) => ({ default: module.Faq })));
const Waitlist = lazy(() =>
  import('./components/Waitlist.jsx').then((module) => ({ default: module.Waitlist })),
);
const Footer = lazy(() =>
  import('./components/Footer.jsx').then((module) => ({ default: module.Footer })),
);

export default function App() {
  return (
    <AppStateProvider>
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <HowItWorks />
        <Suspense fallback={<SectionFallback label="Loading features" />}>
          <Features />
        </Suspense>
        <Suspense fallback={<SectionFallback label="Loading open proofs" />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback label="Loading stories" />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionFallback label="Loading pricing" />}>
          <Pricing />
        </Suspense>
        <Suspense fallback={<SectionFallback label="Loading questions" />}>
          <Faq />
        </Suspense>
        <Suspense fallback={<SectionFallback label="Loading the waitlist" />}>
          <Waitlist />
        </Suspense>
      </main>
      <Suspense fallback={<SectionFallback label="Loading footer" />}>
        <Footer />
      </Suspense>
    </AppStateProvider>
  );
}
