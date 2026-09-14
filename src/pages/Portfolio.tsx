import { type ReactElement, useEffect } from 'react';
import {
  CaseStudies,
  Experience,
  Capabilities,
  Domains,
  Approach,
} from '@/sections';
import { getPortfolioContent } from '@/content';

export function Portfolio(): ReactElement {
  const content = getPortfolioContent();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="portfolio" className="pt-24 sm:pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
        <h1 className="text-4xl font-bold font-heading text-text-primary mb-4">Engineering Portfolio</h1>
        <p className="text-text-secondary text-base sm:text-lg max-w-3xl leading-relaxed">
          A comprehensive deep-dive into my professional experience, system architectures, and technical capabilities. It is an in-depth read, but if you want to understand how I think, build, and deliver engineering impact, it is well worth exploring.
        </p>
      </div>

      {/* Section Anchor 1: Selected Work & Case Studies (#work) */}
      <CaseStudies projects={content.projects} />

      {/* Section Anchor 2: Professional Experience (#experience) */}
      <Experience experiences={content.experiences} />

      {/* Section Anchor 3: Architecture & Technical Capabilities (#engineering) */}
      <Capabilities skillPillars={content.skillPillars} />

      {/* Section Anchor 4: Domain Experience (#domains) */}
      <Domains domains={content.domains} />

      {/* Section Anchor 5: Approach & Methodology (#approach) */}
      <Approach themes={content.profile.philosophyThemes} />
    </div>
  );
}
