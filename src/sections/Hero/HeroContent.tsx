import type { ReactElement } from 'react';
import type { ProfileContent } from '@/content/models';
import { Heading, Text, MonoText } from '@/components/typography';
import { Button, StatusDot } from '@/components/ui';
import { handleSmoothScrollClick } from '@/lib/smoothScroll';
import { navigateTo } from '@/lib/router';

export interface HeroContentProps {
  profile: ProfileContent;
}

export function HeroContent({ profile }: HeroContentProps): ReactElement {
  return (
    <div className="space-y-8 max-w-2xl">
      {/* Availability / Senior Badge */}
      <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-surface border border-border-subtle">
        <StatusDot status="active" pulse={true} />
        <MonoText size="xs" color="accent" className="font-medium tracking-wide">
          SENIOR SOFTWARE ENGINEER · 7+ YEARS
        </MonoText>
      </div>

      {/* Hero Headings */}
      <div className="space-y-4">
        <Heading as="h1" variant="hero">
          Turning complex problems into practical software systems.
        </Heading>

        <Text variant="lead" color="secondary" className="text-base sm:text-lg lg:text-xl leading-relaxed">
          {profile.promise.headline}
        </Text>
      </div>

      {/* Senior Capability Scope */}
      <p className="text-sm text-text-muted leading-relaxed font-sans">
        Hands-on full-stack engineering with technical ownership across international teams.
        Specializing in scalable architecture, multi-tier integrations, legacy modernization, and
        AI-augmented engineering.
      </p>

      {/* Primary & Secondary Action CTAs */}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Button
          as="a"
          href="/portfolio"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('/portfolio');
            window.scrollTo(0, 0);
          }}
          variant="primary"
          size="lg"
        >
          <span>Explore Selected Work</span>
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </Button>

        <Button
          as="a"
          href="#contact"
          onClick={(e) => handleSmoothScrollClick(e, '#contact')}
          variant="secondary"
          size="lg"
        >
          Get in Touch
        </Button>
      </div>

      {/* Key Proof Metrics / Delivery Signals */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border-subtle/80">
        <div>
          <div className="text-2xl sm:text-3xl font-bold font-heading text-text-primary">
            {profile.experienceYears}
          </div>
          <MonoText size="xs" color="muted">
            Years Experience
          </MonoText>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-bold font-heading text-text-primary">
            5
          </div>
          <MonoText size="xs" color="muted">
            Business Domains
          </MonoText>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-bold font-heading text-text-primary">
            Global
          </div>
          <MonoText size="xs" color="muted">
            US · UK · EU · AU
          </MonoText>
        </div>
      </div>
    </div>
  );
}
