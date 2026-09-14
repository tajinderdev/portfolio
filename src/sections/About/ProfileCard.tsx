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
      {/* Top 2-Column Layout: Portrait (Col 1) and Designation / Name (Col 2) */}
      <div className="grid grid-cols-[auto_1fr] items-center gap-5 sm:gap-6">
        {/* Column 1: Profile Portrait (Larger Size) */}
        <div className="relative shrink-0">
          <div className="group relative h-36 w-36 overflow-hidden rounded-xl border-2 border-border-subtle bg-surface-raised shadow-md sm:h-44 sm:w-44 cursor-pointer">
            <img
              src="/images/face.webp"
              alt={`${profile.name} - ${profile.title}`}
              width={176}
              height={176}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top origin-top grayscale contrast-105 filter transition-all duration-500 ease-out group-hover:scale-135 group-hover:grayscale-0 hover:scale-135 hover:grayscale-0"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 rounded border border-border-subtle bg-background px-2.5 py-0.5 shadow-sm pointer-events-none">
            <MonoText size="xs" color="accent" className="font-semibold">
              {profile.experienceYears} EXP
            </MonoText>
          </div>
        </div>

        {/* Column 2: Designation, Name & Global Reach */}
        <div className="flex flex-col justify-center space-y-2 sm:space-y-3">
          <div>
            <MonoText size="xs" color="muted" className="uppercase tracking-wider font-semibold text-[11px] sm:text-xs">
              {profile.title}
            </MonoText>
            <Heading as="h3" variant="card" className="mt-0.5 text-2xl sm:text-3xl font-bold tracking-tight">
              {profile.name}
            </Heading>
          </div>

          {/* International Reach */}
          <div className="space-y-1.5 pt-0.5">
            <MonoText size="xs" color="muted" className="block font-mono text-[11px] font-medium">
              Global Reach:
            </MonoText>
            <div className="flex flex-wrap items-center gap-1.5">
              {profile.internationalReach.map((region) => (
                <Badge key={region} variant="outline" size="sm" className="font-mono text-[11px] py-0 px-1.5">
                  {region}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width Description / About Text Below the 2 Columns */}
      <div className="mt-5 pt-4 border-t border-border-subtle/50">
        <Text variant="body" color="secondary" className="text-sm sm:text-base leading-relaxed">
          {profile.summary}
        </Text>
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
