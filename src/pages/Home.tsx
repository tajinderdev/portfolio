import { type ReactElement } from 'react';
import { Hero, About, Contact } from '@/sections';
import { getPortfolioContent } from '@/content';

export function Home(): ReactElement {
  const content = getPortfolioContent();

  return (
    <>
      {/* Primary Hero Section */}
      <Hero profile={content.profile} />

      {/* Section Anchor: About / Engineering Philosophy (#about) */}
      <About profile={content.profile} />

      {/* Section Anchor: Contact & Technical Discussion (#contact) */}
      <Contact />
    </>
  );
}
