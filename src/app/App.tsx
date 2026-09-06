import { type ReactElement } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { RootLayout } from '@/components/layout';
import {
  Hero,
  CaseStudies,
  About,
  Experience,
  Capabilities,
  Domains,
  AIEngineering,
  Contact,
} from '@/sections';
import { getPortfolioContent } from '@/content';

export function App(): ReactElement {
  const content = getPortfolioContent();

  return (
    <RootLayout>
      {/* Primary Hero Section */}
      <Hero profile={content.profile} />

      {/* Section Anchor 1: Selected Work & Case Studies (#work) */}
      <CaseStudies projects={content.projects} />

      {/* Section Anchor 2: Professional Experience (#experience) */}
      <Experience experiences={content.experiences} />

      {/* Section Anchor 3: Architecture & Technical Capabilities (#engineering) */}
      <Capabilities skillPillars={content.skillPillars} />

      {/* Section Anchor: Domain Experience (#domains) */}
      <Domains domains={content.domains} />

      {/* Section Anchor: AI-Augmented Engineering (#ai) */}
      <AIEngineering data={content.aiEngineering} />

      {/* Section Anchor 4: About / Engineering Philosophy (#about) */}
      <About profile={content.profile} />

      {/* Section Anchor 5: Contact & Technical Discussion (#contact) */}
      <Contact />

      {/* Vercel Web Analytics */}
      <Analytics />
    </RootLayout>
  );
}

export default App;
