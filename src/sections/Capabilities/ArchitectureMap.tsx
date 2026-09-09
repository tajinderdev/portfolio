import { type ReactElement } from 'react';
import { Heading, Text, MonoText } from '@/components/typography';
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
    layer: 'Presentation & Business Logic',
    sampleTech: 'React · TypeScript · Laravel · Node',
  },
  {
    pillar: 'ARCHITECT',
    step: '02',
    label: 'Contract & Topology',
    layer: 'API Contracts & State Coordination',
    sampleTech: 'REST · GraphQL · OAuth · Queues',
  },
  {
    pillar: 'INTEGRATE',
    step: '03',
    label: 'External Services',
    layer: 'Payments, CRMs & Webhooks',
    sampleTech: 'Stripe · Zoho · HubSpot · Webhooks',
  },
  {
    pillar: 'DATA',
    step: '04',
    label: 'Persistence & Cache',
    layer: 'Relational Integrity & Low-Latency Search',
    sampleTech: 'PostgreSQL · MySQL · Redis · Elastic',
  },
  {
    pillar: 'DEPLOY',
    step: '05',
    label: 'Cloud & Runtime',
    layer: 'Containers, Web Servers & CI/CD',
    sampleTech: 'Docker · AWS · Nginx · Cloud',
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
    sampleTech: 'PHPUnit · Jest · Selenium · TDD',
  },
  {
    pillar: 'MODERNIZE',
    label: 'Security & Modernization',
    role: 'Debt Reduction & RBAC',
    sampleTech: 'RBAC · Dependency Auditing · Refactoring',
  },
  {
    pillar: 'INTELLIGENCE',
    label: 'AI Augmentation',
    role: 'Velocity & Workflows',
    sampleTech: 'Generative AI · LLM Tooling · Automation',
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
      className={`rounded-lg border border-border-subtle bg-surface/50 p-6 backdrop-blur-sm sm:p-8 ${className}`}
      aria-label="Interactive Architecture & Dependency Map"
    >
      <div className="mb-6 flex flex-col gap-2 border-b border-border-subtle/70 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <StatusDot status="active" label="System Architecture Map" />
            <MonoText size="xs" color="accent" className="font-semibold uppercase tracking-wider">
              Dependency Topology
            </MonoText>
          </div>
          <Heading as="h3" variant="card" className="text-lg sm:text-xl font-bold">
            How Technical Capabilities Connect in Production
          </Heading>
        </div>
        <MonoText size="xs" color="muted" className="font-mono">
          [ Click any layer to inspect ]
        </MonoText>
      </div>

      <Text variant="small" color="muted" className="mb-6 max-w-3xl">
        Rather than isolated technology badges, software systems require synchronized layers:
        interfaces communicate through strict API contracts to resilient backends, persistent data
        stores, external platforms, and containerized cloud runtime environments.
      </Text>

      {/* Primary Linear Flow: 5 Tiers */}
      <div className="space-y-3 mb-6">
        <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider block text-[11px]">
          Linear Execution Pipeline
        </MonoText>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
          {mainTiers.map((tier, idx) => {
            const isSelected = activePillar === tier.pillar;
            const isLast = idx === mainTiers.length - 1;

            return (
              <button
                key={tier.pillar}
                type="button"
                onClick={() => onSelectPillar?.(tier.pillar)}
                aria-pressed={isSelected}
                className={`group relative flex flex-col justify-between rounded-md border p-3.5 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  isSelected
                    ? 'border-accent bg-accent-muted/20 ring-1 ring-accent'
                    : 'border-border-subtle bg-surface-raised/40 hover:border-border hover:bg-surface-raised/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] text-accent font-semibold">
                      TIER {tier.step}
                    </span>
                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className="hidden lg:inline-block font-mono text-[11px] text-text-muted select-none"
                      >
                        →
                      </span>
                    )}
                  </div>
                  <span
                    className={`font-heading text-sm font-semibold tracking-tight transition-colors ${
                      isSelected ? 'text-accent' : 'text-text-primary group-hover:text-accent'
                    }`}
                  >
                    {tier.label}
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-text-muted">
                    {tier.layer}
                  </span>
                </div>

                <div className="mt-3 border-t border-border-subtle/50 pt-2 font-mono text-[10px] text-text-secondary truncate">
                  {tier.sampleTech}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cross-Cutting Engineering Guardrails */}
      <div className="border-t border-border-subtle/60 pt-4">
        <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider block text-[11px] mb-2.5">
          Cross-Cutting System Guardrails
        </MonoText>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {crossCuttingPillars.map((guardrail) => {
            const isSelected = activePillar === guardrail.pillar;
            return (
              <button
                key={guardrail.pillar}
                type="button"
                onClick={() => onSelectPillar?.(guardrail.pillar)}
                aria-pressed={isSelected}
                className={`group flex items-center justify-between rounded-md border p-3 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  isSelected
                    ? 'border-accent bg-accent-muted/20 ring-1 ring-accent'
                    : 'border-border-subtle/80 bg-surface-raised/30 hover:border-border hover:bg-surface-raised/70'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    <span
                      className={`font-heading text-xs font-semibold ${
                        isSelected ? 'text-accent' : 'text-text-primary group-hover:text-accent'
                      }`}
                    >
                      {guardrail.label}
                    </span>
                  </div>
                  <span className="mt-0.5 block text-[11px] text-text-muted font-mono">
                    {guardrail.sampleTech}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-accent uppercase ml-2 shrink-0">
                  [{guardrail.pillar}]
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
