import { type ReactElement } from 'react';
import { RootLayout, Section, Container } from '@/components/layout';
import {
  Heading,
  Text,
  MonoText,
  SectionHeader,
} from '@/components/typography';
import { Button, Link, Card, Badge, StatusDot } from '@/components/ui';
import { getPortfolioContent } from '@/content';

export function App(): ReactElement {
  const content = getPortfolioContent();

  return (
    <RootLayout>
      <div className="space-y-16 py-8">
        {/* Stage 2 Design System Verification Header */}
        <header className="border-b border-border-subtle pb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <StatusDot status="active" label="Stage 2: Design System Active" />
            <MonoText size="xs" color="muted">
              Tokens: Space Grotesk · Inter · JetBrains Mono
            </MonoText>
          </div>

          <Heading as="h1" variant="section">
            Design System Foundation
          </Heading>
          <Text variant="lead">
            Reusable UI primitives and design tokens translated from{' '}
            <MonoText color="accent">.agents/DESIGN_DIRECTION.md</MonoText> for{' '}
            {content.profile.name}.
          </Text>
        </header>

        {/* 1. Typography Primitives */}
        <section aria-labelledby="typography-heading" className="space-y-6">
          <SectionHeader
            kicker="01 / Typography"
            title="Type Scale & Hierarchy"
            description="Heading weights 500-600 in Space Grotesk, body in Inter, and technical metadata in JetBrains Mono."
          />

          <div className="space-y-4 p-6 rounded-lg bg-surface border border-border-subtle">
            <Heading as="h2" variant="hero">
              Hero Heading (64–88px)
            </Heading>
            <Heading as="h3" variant="section">
              Section Heading (42–56px)
            </Heading>
            <Heading as="h4" variant="project">
              Project Heading (32–44px)
            </Heading>
            <Heading as="h5" variant="card">
              Card / Subheading (24–32px)
            </Heading>

            <div className="pt-4 border-t border-border-subtle space-y-2">
              <Text variant="lead">Lead text for section intros and thesis statements.</Text>
              <Text variant="body">
                Standard body paragraph text rendered with high legibility and balanced line-height.
              </Text>
              <Text variant="small">
                Small text for secondary annotations and supporting notes.
              </Text>
              <div className="flex items-center gap-3 pt-2">
                <MonoText size="xs" color="accent">
                  MONO LABEL (XS)
                </MonoText>
                <MonoText size="sm" color="default">
                  MONO CODE (SM)
                </MonoText>
                <MonoText size="base" color="primary">
                  MONO BASE
                </MonoText>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Interactive Primitives: Buttons & Links */}
        <section aria-labelledby="interactive-heading" className="space-y-6">
          <SectionHeader
            kicker="02 / Interactive"
            title="Buttons & Links"
            description="Polymorphic buttons with restrained electric green accent (#7CFF6B) and accessible interaction states."
          />

          <div className="p-6 rounded-lg bg-surface border border-border-subtle space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" size="md">
                Primary Action
              </Button>
              <Button variant="secondary" size="md">
                Secondary Action
              </Button>
              <Button variant="outline" size="md">
                Outline Action
              </Button>
              <Button variant="ghost" size="md">
                Ghost Action
              </Button>
              <Button variant="primary" size="md" isLoading>
                Loading
              </Button>
              <Button variant="primary" size="md" disabled>
                Disabled
              </Button>
            </div>

            <div className="pt-4 border-t border-border-subtle flex flex-wrap items-center gap-6 text-sm">
              <Link href="#internal" variant="default">
                Internal Anchor Link
              </Link>
              <Link href="https://github.com" variant="accent" external>
                External Accent Link
              </Link>
              <Link href="#nav" variant="nav">
                Navigation Link
              </Link>
              <Link href="#subtle" variant="subtle">
                Subtle Link
              </Link>
            </div>
          </div>
        </section>

        {/* 3. Surface & Card Primitives */}
        <section aria-labelledby="surfaces-heading" className="space-y-6">
          <SectionHeader
            kicker="03 / Surfaces"
            title="Cards & Elevation"
            description="Subtle surfaces (#111111, #161616) with 1px border separators and generous spacing."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default" padding="md" className="space-y-2">
              <MonoText size="xs" color="muted">
                CARD / DEFAULT
              </MonoText>
              <Heading as="h4" variant="card">
                Surface #111111
              </Heading>
              <Text variant="small">
                Default content container with subtle border separator.
              </Text>
            </Card>

            <Card variant="elevated" padding="md" className="space-y-2">
              <MonoText size="xs" color="accent">
                CARD / ELEVATED
              </MonoText>
              <Heading as="h4" variant="card">
                Surface #161616
              </Heading>
              <Text variant="small">
                Elevated container for highlighted modules or active state.
              </Text>
            </Card>

            <Card variant="interactive" padding="md" className="space-y-2">
              <MonoText size="xs" color="accent">
                CARD / INTERACTIVE
              </MonoText>
              <Heading as="h4" variant="card">
                Interactive Hover
              </Heading>
              <Text variant="small">
                Cards with subtle accent border illumination on hover.
              </Text>
            </Card>
          </div>
        </section>

        {/* 4. Badges & Technical Indicators */}
        <section aria-labelledby="badges-heading" className="space-y-6">
          <SectionHeader
            kicker="04 / Metadata"
            title="Badges & Indicators"
            description="Purposeful technical tags and live status indicators."
          />

          <div className="p-6 rounded-lg bg-surface border border-border-subtle flex flex-wrap items-center gap-3">
            <Badge variant="default">Default Tag</Badge>
            <Badge variant="accent">Accent Highlight</Badge>
            <Badge variant="outline">Outline Tag</Badge>
            <Badge variant="mono">TypeScript · React 19</Badge>
            <Badge variant="mono">Tailwind CSS v4</Badge>
            <StatusDot status="active" label="Operational" />
            <StatusDot status="idle" label="Standby" />
          </div>
        </section>

        {/* 5. Section & Container Verification */}
        <Section
          spacing="compact"
          className="border border-dashed border-border-strong rounded-lg bg-surface/50"
        >
          <Container size="narrow" className="text-center space-y-2">
            <MonoText size="xs" color="accent">
              SECTION & CONTAINER PRIMITIVES
            </MonoText>
            <Heading as="h3" variant="card">
              Max-Width & Spacing Scale Verified
            </Heading>
            <Text variant="small">
              Ensures responsive container constraints (Mobile 16–24px, Desktop 1200–1280px) and
              controlled vertical rhythm across all subsequent stages.
            </Text>
          </Container>
        </Section>
      </div>
    </RootLayout>
  );
}

export default App;
