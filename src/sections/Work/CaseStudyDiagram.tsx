import { type ReactElement } from 'react';
import type { CaseStudyArchitectureDiagram, ArchitectureTier } from '@/content/models';
import { MonoText } from '@/components/typography';

export interface CaseStudyDiagramProps {
  readonly diagram: CaseStudyArchitectureDiagram;
  readonly className?: string;
}

const tierConfig: Record<ArchitectureTier, { label: string; badgeClass: string; cardClass: string }> = {
  client: {
    label: 'CLIENT',
    badgeClass: 'border-accent/40 bg-accent-muted/20 text-accent',
    cardClass: 'border-accent/30 bg-surface/80',
  },
  gateway: {
    label: 'GATEWAY',
    badgeClass: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400',
    cardClass: 'border-cyan-500/30 bg-surface/80',
  },
  app: {
    label: 'APP',
    badgeClass: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
    cardClass: 'border-emerald-500/30 bg-surface/80',
  },
  worker: {
    label: 'WORKER',
    badgeClass: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
    cardClass: 'border-amber-500/30 bg-surface/80',
  },
  data: {
    label: 'DATA',
    badgeClass: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-400',
    cardClass: 'border-indigo-500/30 bg-surface/80',
  },
  external: {
    label: 'EXTERNAL',
    badgeClass: 'border-border bg-surface-raised/60 text-text-muted',
    cardClass: 'border-border-subtle bg-surface/80',
  },
};

export function CaseStudyDiagram({
  diagram,
  className = '',
}: CaseStudyDiagramProps): ReactElement {
  return (
    <figure
      aria-label={diagram.title}
      className={`rounded-lg border border-border-subtle/80 bg-surface/60 p-5 sm:p-6 backdrop-blur-sm ${className}`}
    >
      {/* Figure Caption / Title */}
      <figcaption className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle/70 pb-4">
        <div>
          <span className="font-mono text-[11px] font-semibold text-accent uppercase tracking-wider">
            [SYSTEM TOPOLOGY]
          </span>
          <h4 className="mt-1 font-heading text-base sm:text-lg font-bold text-text-primary">
            {diagram.title}
          </h4>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-muted">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span>Active Architecture Flow</span>
        </div>
      </figcaption>

      {/* Nodes Grid / Flow */}
      <div className="mb-6">
        <div
          role="list"
          aria-label="Architecture components and layers"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
        >
          {diagram.nodes.map((node, index) => {
            const config = tierConfig[node.tier] ?? tierConfig.app;
            const stepNum = String(index + 1).padStart(2, '0');

            return (
              <div
                key={node.id}
                role="listitem"
                className={`relative flex flex-col justify-between rounded-md border p-3.5 transition-all duration-200 hover:border-border ${config.cardClass}`}
              >
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span
                      className={`inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider ${config.badgeClass}`}
                    >
                      {config.label}
                    </span>
                    <span className="font-mono text-[10px] text-text-muted">
                      {stepNum}
                    </span>
                  </div>

                  <p className="font-heading text-xs sm:text-sm font-semibold text-text-primary">
                    {node.label}
                  </p>
                </div>

                <p className="mt-2 text-[11px] leading-relaxed text-text-secondary">
                  {node.role}
                </p>

                {/* Arrow Connector to next node on large screens */}
                {index < diagram.nodes.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="hidden xl:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-border"
                  >
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sequential Data Flow Steps */}
      <div className="rounded-md border border-border-subtle/70 bg-surface-raised/40 p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <MonoText size="xs" color="accent" className="font-semibold uppercase tracking-wider">
            Data Flow & Execution Sequence
          </MonoText>
        </div>

        <ol className="space-y-2.5" role="list">
          {diagram.dataFlow.map((step, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-xs text-text-secondary leading-relaxed"
            >
              <span className="shrink-0 rounded border border-accent/30 bg-accent-muted/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-accent">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
