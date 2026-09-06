import { useState, type ReactElement } from 'react';
import { MonoText } from '@/components/typography';
import { cn } from '@/lib/utils';

interface SystemTier {
  id: string;
  name: string;
  layer: string;
  technologies: string;
  architecturePrinciple: string;
}

const systemTiers: readonly SystemTier[] = [
  {
    id: 'tier-frontend',
    name: '01 / Presentation Tier',
    layer: 'Frontend & UI',
    technologies: 'React · TypeScript · Tailwind CSS · Accessible UI',
    architecturePrinciple: 'Responsive, accessible, decoupled from presentation data.',
  },
  {
    id: 'tier-api',
    name: '02 / Gateway & Interface',
    layer: 'API & Integration',
    technologies: 'RESTful · GraphQL · OAuth · Webhook Ingestion',
    architecturePrinciple: 'Strict validation, authentication, and error boundaries.',
  },
  {
    id: 'tier-backend',
    name: '03 / Core Engine',
    layer: 'Backend Services',
    technologies: 'Laravel · Python · Node.js · Background Queues',
    architecturePrinciple: 'Modular business logic with asynchronous job queues.',
  },
  {
    id: 'tier-database',
    name: '04 / Persistence & Cache',
    layer: 'Data & Storage',
    technologies: 'PostgreSQL · MySQL · Redis · Elasticsearch',
    architecturePrinciple: 'Optimized schema indexing, query caching, and ACID transactions.',
  },
  {
    id: 'tier-integrations',
    name: '05 / Connected Services',
    layer: 'Third-Party Ecosystems',
    technologies: 'Stripe · HubSpot · Zoho · Payment Gateways',
    architecturePrinciple: 'Resilient event-driven sync with idempotent webhooks.',
  },
  {
    id: 'tier-cloud',
    name: '06 / Runtime & Ops',
    layer: 'Cloud & Infrastructure',
    technologies: 'AWS (EC2, S3) · Docker · CI/CD · Nginx',
    architecturePrinciple: 'Reproducible containerization, automated testing, and zero-downtime deployment.',
  },
];

export interface SystemFlowVisualizerProps {
  className?: string;
}

export function SystemFlowVisualizer({
  className,
}: SystemFlowVisualizerProps): ReactElement {
  const [selectedTierId, setSelectedTierId] = useState<string>('tier-frontend');

  const selectedTier =
    systemTiers.find((tier) => tier.id === selectedTierId) || systemTiers[0];

  return (
    <div
      className={cn(
        'rounded-xl border border-border-subtle bg-surface/90 p-5 sm:p-6 backdrop-blur-md space-y-5',
        'shadow-lg relative overflow-hidden',
        className,
      )}
      aria-label="Interactive System Architecture Visualizer"
    >
      {/* Visual Header */}
      <div className="flex items-center justify-between border-b border-border-subtle pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <MonoText size="xs" color="primary" className="font-semibold uppercase tracking-wider">
            System Architecture Model
          </MonoText>
        </div>
        <MonoText size="xs" color="muted">
          Active Trace Flow
        </MonoText>
      </div>

      {/* Screen Reader Semantic Alternative */}
      <div className="sr-only">
        Full stack architecture flow: Frontend (React, TypeScript), API Gateway (REST, GraphQL),
        Backend (Laravel, Python), Database (PostgreSQL, Redis), Integrations (Stripe, HubSpot, Zoho),
        and Cloud Infrastructure (AWS, Docker).
      </div>

      {/* Interactive System Flow Stack */}
      <div className="space-y-2 relative" aria-label="System architecture tiers">
        {systemTiers.map((tier, index) => {
          const isSelected = tier.id === selectedTierId;
          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => setSelectedTierId(tier.id)}
              className={cn(
                'w-full text-left p-2.5 sm:p-3 rounded-lg border transition-all duration-200 relative',
                'flex items-center justify-between group cursor-pointer',
                isSelected
                  ? 'bg-surface-elevated border-accent/60 shadow-sm'
                  : 'bg-surface/40 border-border-subtle hover:border-border-strong hover:bg-surface/80',
              )}
              aria-pressed={isSelected}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    'w-6 h-6 rounded flex items-center justify-center font-mono text-[10px] font-bold transition-colors',
                    isSelected
                      ? 'bg-accent text-background'
                      : 'bg-white/5 text-text-muted group-hover:text-text-secondary',
                  )}
                >
                  {index + 1}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'text-xs sm:text-sm font-heading font-medium tracking-tight',
                        isSelected ? 'text-text-primary' : 'text-text-secondary',
                      )}
                    >
                      {tier.layer}
                    </span>
                    {isSelected && (
                      <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-accent" />
                    )}
                  </div>
                  <MonoText size="xs" color={isSelected ? 'accent' : 'muted'} className="text-[10px] sm:text-[11px]">
                    {tier.technologies}
                  </MonoText>
                </div>
              </div>

              {/* Status Signal Indicator */}
              <div className="flex items-center gap-1.5">
                <span
                  className={cn(
                    'w-1.5 h-1.5 rounded-full transition-all',
                    isSelected ? 'bg-accent scale-125' : 'bg-border-strong',
                  )}
                  aria-hidden="true"
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Architectural Trace Detail Card */}
      {selectedTier && (
        <div className="p-3.5 rounded-lg bg-surface-elevated/70 border border-border-subtle text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <MonoText size="xs" color="accent" className="font-semibold uppercase tracking-wider text-[11px]">
              {selectedTier.name} Principle
            </MonoText>
            <span className="text-[10px] font-mono text-text-muted">
              End-to-End Tracing
            </span>
          </div>
          <p className="text-text-secondary leading-relaxed">
            {selectedTier.architecturePrinciple}
          </p>
        </div>
      )}
    </div>
  );
}
