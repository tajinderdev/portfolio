import { type ReactElement } from 'react';
import { Heading, MonoText } from '@/components/typography';
import { StatusDot } from '@/components/ui';
import type { SkillPillar } from '@/content/models';

export interface ArchitectureMapProps {
  readonly activePillar?: SkillPillar | 'ALL';
  readonly onSelectPillar?: (pillar: SkillPillar | 'ALL') => void;
  readonly className?: string;
}

interface TierDefinition {
  readonly pillar: SkillPillar;
  readonly step: string;
  readonly label: string;
  readonly layer: string;
  readonly sampleTech: string;
}

const mainTiers: readonly TierDefinition[] = [
  {
    pillar: 'BUILD',
    step: '01',
    label: 'Application Tier',
    layer: 'Presentation & Logic',
    sampleTech: 'React · TS · Laravel · Node',
  },
  {
    pillar: 'ARCHITECT',
    step: '02',
    label: 'Contract & Topology',
    layer: 'APIs & Coordination',
    sampleTech: 'REST · GraphQL · Queues',
  },
  {
    pillar: 'INTEGRATE',
    step: '03',
    label: 'External Services',
    layer: 'Payments & CRMs',
    sampleTech: 'Stripe · Zoho · Webhooks',
  },
  {
    pillar: 'DATA',
    step: '04',
    label: 'Persistence & Cache',
    layer: 'Relational & Search',
    sampleTech: 'PostgreSQL · MySQL · Redis',
  },
  {
    pillar: 'DEPLOY',
    step: '05',
    label: 'Cloud & Runtime',
    layer: 'Containers & CI/CD',
    sampleTech: 'Docker · AWS · Nginx',
  },
];

interface CrossCuttingDefinition {
  readonly pillar: SkillPillar;
  readonly label: string;
  readonly role: string;
  readonly sampleTech: string;
}

const crossCuttingPillars: readonly CrossCuttingDefinition[] = [
  {
    pillar: 'TEST',
    label: 'Automated Testing',
    role: 'Quality & Regressions',
    sampleTech: 'Jest · Vitest · TDD',
  },
  {
    pillar: 'MODERNIZE',
    label: 'Security & Modernization',
    role: 'Debt Reduction & RBAC',
    sampleTech: 'RBAC · Auditing · Refactoring',
  },
  {
    pillar: 'INTELLIGENCE',
    label: 'AI Augmentation',
    role: 'Velocity & Workflows',
    sampleTech: 'GenAI · LLM Automation',
  },
];

export function ArchitectureMap({
  activePillar = 'ALL',
  onSelectPillar,
  className = '',
}: ArchitectureMapProps): ReactElement {
  return (
    <div
      role="region"
      className={`rounded-xl border border-border-subtle bg-surface/40 p-4 sm:p-5 backdrop-blur-sm ${className}`}
      aria-label="Interactive Architecture & Dependency Map"
    >
      {/* Header bar */}
      <div className="mb-3 flex items-center justify-between border-b border-border-subtle/70 pb-2.5">
        <div className="flex items-center gap-2">
          <StatusDot status="active" label="System Architecture Map" />
          <Heading as="h3" variant="card" className="text-xs sm:text-sm font-bold text-text-primary">
            Production Architecture & Dependency Pipeline
          </Heading>
        </div>
        <MonoText size="xs" color="muted" className="text-[10px] hidden sm:inline-block font-mono">
          Click any layer to filter
        </MonoText>
      </div>

      {/* Primary Linear Pipeline (5 Tiers) */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-5 mb-3">
        {mainTiers.map((tier, idx) => {
          const isSelected = activePillar === tier.pillar;
          const isLast = idx === mainTiers.length - 1;

          return (
            <button
              key={tier.pillar}
              type="button"
              onClick={() => onSelectPillar?.(tier.pillar)}
              aria-pressed={isSelected}
              className={`group flex flex-col justify-between rounded-lg border p-2.5 text-left transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer ${
                isSelected
                  ? 'border-accent bg-accent-muted/20 ring-1 ring-accent'
                  : 'border-border-subtle/80 bg-surface/60 hover:border-accent/40 hover:bg-surface-raised'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[9px] text-accent font-semibold">
                    TIER {tier.step}
                  </span>
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className="hidden lg:inline-block font-mono text-[10px] text-text-muted select-none"
                    >
                      →
                    </span>
                  )}
                </div>
                <span
                  className={`font-heading text-xs font-bold tracking-tight block ${
                    isSelected ? 'text-accent' : 'text-text-primary group-hover:text-accent'
                  }`}
                >
                  {tier.label}
                </span>
                <span className="text-[10px] text-text-muted block line-clamp-1">
                  {tier.layer}
                </span>
              </div>

              <div className="mt-2 pt-1.5 border-t border-border-subtle/50 font-mono text-[9px] text-text-secondary truncate">
                {tier.sampleTech}
              </div>
            </button>
          );
        })}
      </div>

      {/* Cross-Cutting Guardrails */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 pt-2 border-t border-border-subtle/50">
        {crossCuttingPillars.map((guardrail) => {
          const isSelected = activePillar === guardrail.pillar;
          return (
            <button
              key={guardrail.pillar}
              type="button"
              onClick={() => onSelectPillar?.(guardrail.pillar)}
              aria-pressed={isSelected}
              className={`group flex items-center justify-between rounded-lg border px-3 py-2 text-left transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer ${
                isSelected
                  ? 'border-accent bg-accent-muted/20 ring-1 ring-accent'
                  : 'border-border-subtle/80 bg-surface/40 hover:border-accent/40 hover:bg-surface-raised'
              }`}
            >
              <div>
                <span
                  className={`font-heading text-xs font-semibold block ${
                    isSelected ? 'text-accent' : 'text-text-primary group-hover:text-accent'
                  }`}
                >
                  {guardrail.label}
                </span>
                <span className="text-[10px] text-text-muted font-mono block">
                  {guardrail.sampleTech}
                </span>
              </div>
              <span className="font-mono text-[9px] text-accent uppercase shrink-0 ml-2">
                [{guardrail.pillar}]
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
