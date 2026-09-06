import { type ReactElement } from 'react';
import { RootLayout, Section } from '@/components/layout';
import {
  Heading,
  Text,
  MonoText,
  SectionHeader,
} from '@/components/typography';
import { Button, Link, Card, Badge } from '@/components/ui';
import { Hero, About } from '@/sections';
import { getPortfolioContent } from '@/content';

export function App(): ReactElement {
  const content = getPortfolioContent();

  return (
    <RootLayout>
      {/* Primary Hero Section */}
      <Hero profile={content.profile} />

      {/* Section Anchor 1: Selected Work (#work) */}
      <Section id="work" spacing="default" className="border-b border-border-subtle">
        <div className="space-y-6">
          <SectionHeader
            kicker="01 / SELECTED WORK"
            title="Work & System Case Studies"
            description="Anchored section shell ready for Stage 5 (Selected Work showcase). Demonstrates navigation state tracking."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.projects.slice(0, 2).map((project) => (
              <Card key={project.id} variant="default" padding="md" className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="mono">{project.type}</Badge>
                  <MonoText size="xs" color="accent">
                    CONFIDENTIAL
                  </MonoText>
                </div>
                <Heading as="h3" variant="project">
                  {project.title}
                </Heading>
                <Text variant="small">{project.description}</Text>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Section Anchor 2: Professional Experience (#experience) */}
      <Section id="experience" spacing="default" className="border-b border-border-subtle bg-surface/20">
        <div className="space-y-6">
          <SectionHeader
            kicker="02 / TIMELINE"
            title="Professional Experience"
            description="Anchored section shell ready for Stage 7 (Experience timeline). 7+ years across international delivery."
          />

          <Card variant="elevated" padding="md" className="space-y-4 max-w-2xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-text-primary">
                {content.experiences[0]?.role}
              </span>
              <MonoText size="xs" color="accent">
                {content.experiences[0]?.period}
              </MonoText>
            </div>
            <Text variant="small">{content.experiences[0]?.summary}</Text>
          </Card>
        </div>
      </Section>

      {/* Section Anchor 3: Architecture & Engineering (#engineering) */}
      <Section id="engineering" spacing="default" className="border-b border-border-subtle">
        <div className="space-y-6">
          <SectionHeader
            kicker="03 / ARCHITECTURE"
            title="Engineering & Systems Approach"
            description="Anchored section shell ready for Stages 6 & 8 (How I Think & Technical Capabilities)."
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {content.profile.engineeringBreadth.slice(0, 3).map((item) => (
              <Card key={item.category} variant="interactive" padding="sm" className="space-y-1">
                <MonoText size="xs" color="accent">
                  {item.category.toUpperCase()}
                </MonoText>
                <Text variant="small">{item.description}</Text>
              </Card>
            ))}
          </div>
        </div>
      </Section>

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
