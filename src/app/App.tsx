import { type ReactElement } from 'react';
import { RootLayout, Section } from '@/components/layout';
import {
  Text,
  SectionHeader,
} from '@/components/typography';
import { Button, Link, Card } from '@/components/ui';
import { Hero, CaseStudies, About, Experience, Capabilities, Domains, AIEngineering } from '@/sections';
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

      {/* Section Anchor 5: Contact (#contact) */}
      <Section id="contact" spacing="default">
        <div className="space-y-6 max-w-2xl">
          <SectionHeader
            kicker="05 / INQUIRIES"
            title="Contact & Technical Discussion"
            description="Anchored section shell ready for Stage 13 (EmailJS contact form)."
          />

          <Card variant="default" padding="lg" className="space-y-4 text-center">
            <Text variant="body">
              Open to senior full-stack, system architecture, and technical leadership roles.
            </Text>
            <div className="flex justify-center gap-4 pt-2">
              <Button as="a" href="mailto:tajinderdev@example.com" variant="primary" size="md">
                Send Direct Message
              </Button>
              <Link href="https://linkedin.com/in/tajinderdev" variant="accent" external>
                LinkedIn Profile
              </Link>
            </div>
          </Card>
        </div>
      </Section>
    </RootLayout>
  );
}

export default App;
