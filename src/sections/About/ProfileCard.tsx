import { type ReactElement } from 'react';
import { Heading, Text, MonoText } from '@/components/typography';
import { Badge } from '@/components/ui';
import type { ProfileContent } from '@/content/models';

export interface ProfileCardProps {
  readonly profile: ProfileContent;
  readonly className?: string;
}

export function ProfileCard({
  profile,
  className = '',
}: ProfileCardProps): ReactElement {
  return (
    <div
      className={`rounded-lg border border-border-subtle bg-surface/50 p-6 backdrop-blur-sm sm:p-7 ${className}`}
      aria-label="Engineer Profile & Background"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        {/* Profile Portrait */}
        <div className="relative shrink-0">
          <div className="relative h-28 w-28 overflow-hidden rounded-lg border-2 border-border-subtle bg-surface-raised shadow-md sm:h-32 sm:w-32">
            <img
              src="/images/face.webp"
              alt={`${profile.name} - ${profile.title}`}
              width={128}
              height={128}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center grayscale contrast-105 filter transition-all duration-300 hover:grayscale-0"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 rounded border border-border-subtle bg-background px-2 py-0.5 shadow-sm">
            <MonoText size="xs" color="accent" className="font-semibold">
              {profile.experienceYears} EXP
            </MonoText>
          </div>
        </div>

        {/* Identity & Core Positioning */}
        <div className="flex-1 space-y-3">
          <div>
            <MonoText size="xs" color="muted" className="uppercase tracking-wider font-medium">
              {profile.title}
            </MonoText>
            <Heading as="h3" variant="card" className="text-xl sm:text-2xl font-bold">
              {profile.name}
            </Heading>
          </div>

          <Text variant="small" color="secondary" className="leading-relaxed">
            {profile.summary}
          </Text>

          {/* International Reach */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <MonoText size="xs" color="muted" className="mr-1 font-mono text-[11px]">
              Global Reach:
            </MonoText>
            {profile.internationalReach.map((region) => (
              <Badge key={region} variant="outline" size="sm" className="font-mono text-[11px] py-0 px-1.5">
                {region}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Engineering Stance Block */}
      <div className="mt-6 rounded-md border border-accent-muted/30 bg-accent-muted/10 p-4">
        <div className="mb-1 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <MonoText size="xs" color="accent" className="uppercase tracking-wider font-semibold">
            Engineering Perspective
          </MonoText>
        </div>
        <blockquote className="text-xs font-mono italic text-text-primary leading-relaxed">
          &ldquo;AI improves speed and capability, while architecture, correctness, security, testing,
          and production quality remain engineering responsibilities.&rdquo;
        </blockquote>
      </div>

      {/* Cross-Functional Collaboration Capabilities */}
      <div className="mt-5 border-t border-border-subtle/60 pt-4">
        <MonoText size="xs" color="muted" className="mb-2 block uppercase tracking-wider text-[11px] font-semibold">
          Cross-Functional Delivery
        </MonoText>
        <div className="flex flex-wrap gap-1.5">
          {profile.collaboration.crossFunctional.map((stakeholder) => (
            <span
              key={stakeholder}
              className="rounded border border-border-subtle/70 bg-surface-raised/50 px-2 py-1 text-[11px] font-mono text-text-muted"
            >
              {stakeholder}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
