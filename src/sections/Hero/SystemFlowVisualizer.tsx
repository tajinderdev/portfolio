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

  return (
    <div
      className={cn(
        'rounded-xl border border-border-subtle bg-surface/40 p-5 sm:p-6 backdrop-blur-lg space-y-5',
        'shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] relative overflow-hidden',
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

      {/* Interactive System Flow Stack with Inline Smooth Expand/Collapse */}
      <div className="space-y-2.5 relative" aria-label="System architecture tiers">
        {systemTiers.map((tier, index) => {
          const isSelected = tier.id === selectedTierId;
          return (
            <div
              key={tier.id}
              className={cn(
                'rounded-lg border transition-all duration-300 relative overflow-hidden',
                isSelected
                  ? 'bg-surface-elevated/90 border-accent/60 shadow-sm ring-1 ring-accent/20'
                  : 'bg-surface/40 border-border-subtle hover:border-border-strong hover:bg-surface/80',
              )}
            >
              <button
                type="button"
                onClick={() => setSelectedTierId(tier.id)}
                className="w-full text-left p-2.5 sm:p-3 flex items-center justify-between group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
                aria-pressed={isSelected}
                aria-expanded={isSelected}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'w-6 h-6 rounded flex items-center justify-center font-mono text-[10px] font-bold transition-colors duration-200',
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
                          'text-xs sm:text-sm font-heading font-medium tracking-tight transition-colors duration-200',
                          isSelected ? 'text-text-primary font-semibold' : 'text-text-secondary',
                        )}
                      >
                        {tier.layer}
                      </span>
                      {isSelected && (
                        <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      )}
                    </div>
                    <MonoText
                      size="xs"
                      color={isSelected ? 'accent' : 'muted'}
                      className="text-[10px] sm:text-[11px] transition-colors duration-200"
                    >
                      {tier.technologies}
                    </MonoText>
                  </div>
                </div>

                {/* Expand / Status Indicator Icon */}
                <div className="flex items-center gap-1.5">
                  <svg
                    className={cn(
                      'w-4 h-4 text-text-muted transition-transform duration-300 ease-in-out',
                      isSelected ? 'rotate-180 text-accent' : 'group-hover:text-text-secondary',
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Inline Smooth Expand/Collapse Content Container */}
              <div
                className={cn(
                  'grid transition-[grid-template-rows,opacity] duration-300 ease-in-out',
                  isSelected ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-3 pb-3 pt-0 sm:px-3.5 sm:pb-3.5">
                    <div className="p-2.5 sm:p-3 rounded-md bg-background/60 border border-border-subtle/80 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <MonoText
                          size="xs"
                          color="accent"
                          className="font-semibold uppercase tracking-wider text-[10px] sm:text-[11px]"
                        >
                          {tier.name} Principle
                        </MonoText>
                        <span className="text-[9px] sm:text-[10px] font-mono text-text-muted">
                          Live Architecture
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed font-sans">
                        {tier.architecturePrinciple}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
