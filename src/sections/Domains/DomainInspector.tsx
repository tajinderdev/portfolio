import { type ReactElement } from 'react';
import { Heading, Text, MonoText } from '@/components/typography';
import { Badge } from '@/components/ui';
import type { DomainItem } from '@/content/models';

export interface DomainInspectorProps {
  readonly domain: DomainItem;
  readonly className?: string;
}

export function DomainInspector({
  domain,
  className = '',
}: DomainInspectorProps): ReactElement {
  return (
    <div
      id={`domain-panel-${domain.id}`}
      role="tabpanel"
      aria-labelledby={`domain-tab-${domain.id}`}
      className={`rounded-lg border border-border-subtle bg-surface/50 p-6 backdrop-blur-sm sm:p-8 transition-all duration-200 ${className}`}
    >
      {/* Domain Header */}
      <div className="mb-6 border-b border-border-subtle/70 pb-5">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded border border-accent-muted/40 bg-accent-muted/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-accent uppercase tracking-wider">
              {domain.tag}
            </span>
            <MonoText size="xs" color="muted" className="font-mono text-xs">
              Domain Deep Dive
            </MonoText>
          </div>
          <Badge variant="outline" size="sm" className="font-mono text-xs">
            {domain.relevantTechnologies.length} Technologies Applied
          </Badge>
        </div>

        <Heading as="h3" variant="card" className="text-xl sm:text-2xl font-bold text-text-primary">
          {domain.name}
        </Heading>

        <Text variant="small" color="secondary" className="mt-2 text-sm sm:text-base leading-relaxed">
          {domain.summary}
        </Text>
      </div>

      {/* Problem Space & Business Challenge */}
      <div className="mb-8 rounded-md border border-accent-muted/30 bg-accent-muted/10 p-4 sm:p-5">
        <div className="mb-1.5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <MonoText size="xs" color="accent" className="font-semibold uppercase tracking-wider">
            Problem Space & Business Challenge
          </MonoText>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-text-primary">
          {domain.problemSpace}
        </p>
      </div>

      {/* 3 Core Execution Pillars */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 1. Types of Systems Involved */}
        <div className="rounded-md border border-border-subtle/80 bg-surface-raised/40 p-5 space-y-3">
          <div className="flex items-center gap-2 border-b border-border-subtle/60 pb-2.5">
            <span className="font-mono text-xs font-semibold text-accent">01</span>
            <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider text-[11px]">
              Types of Systems Involved
            </MonoText>
          </div>
          <ul className="space-y-2" role="list">
            {domain.systemTypes.map((sys) => (
              <li key={sys} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-border" />
                <span>{sys}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. Critical Engineering Concerns */}
        <div className="rounded-md border border-border-subtle/80 bg-surface-raised/40 p-5 space-y-3">
          <div className="flex items-center gap-2 border-b border-border-subtle/60 pb-2.5">
            <span className="font-mono text-xs font-semibold text-accent">02</span>
            <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider text-[11px]">
              Critical Engineering Concerns
            </MonoText>
          </div>
          <ul className="space-y-2" role="list">
            {domain.engineeringConcerns.map((concern) => (
              <li key={concern} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{concern}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Integrations & Workflows */}
        <div className="rounded-md border border-border-subtle/80 bg-surface-raised/40 p-5 space-y-3">
          <div className="flex items-center gap-2 border-b border-border-subtle/60 pb-2.5">
            <span className="font-mono text-xs font-semibold text-accent">03</span>
            <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider text-[11px]">
              Integrations & Workflows
            </MonoText>
          </div>
          <ul className="space-y-2" role="list">
            {domain.integrationsWorkflows.map((workflow) => (
              <li key={workflow} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-border" />
                <span>{workflow}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Applied Technologies Rail */}
      <div className="mt-6 border-t border-border-subtle/60 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider text-[11px]">
            Relevant Technologies in This Domain
          </MonoText>
          <div className="flex flex-wrap gap-1.5" aria-label="Relevant technologies">
            {domain.relevantTechnologies.map((tech) => (
              <span
                key={tech}
                className="rounded border border-border-subtle/80 bg-surface-raised/60 px-2.5 py-1 font-mono text-xs text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
