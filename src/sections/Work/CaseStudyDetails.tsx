import { type ReactElement } from 'react';
import type { ProjectCaseStudy } from '@/content/models';
import { Heading, Text, MonoText } from '@/components/typography';
import { Badge } from '@/components/ui';
import { CaseStudyDiagram } from './CaseStudyDiagram';

export interface CaseStudyDetailsProps {
  readonly project: ProjectCaseStudy;
  readonly className?: string;
}

export function CaseStudyDetails({
  project,
  className = '',
}: CaseStudyDetailsProps): ReactElement {
  const { reasoning } = project;

  return (
    <div
      id={`casestudy-panel-${project.id}`}
      role="tabpanel"
      aria-labelledby={`casestudy-tab-${project.id}`}
      className={`rounded-lg border border-border-subtle bg-surface/50 p-6 backdrop-blur-sm sm:p-8 space-y-10 transition-all duration-200 ${className}`}
    >
      {/* 1. Header & Meta Information */}
      <div className="border-b border-border-subtle/70 pb-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded border border-accent-muted/40 bg-accent-muted/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-accent uppercase tracking-wider">
              {project.domainTag}
            </span>
            <MonoText size="xs" color="muted" className="font-mono text-xs">
              // ARCHITECTURAL TEARDOWN & REASONING
            </MonoText>
          </div>
          <Badge variant="outline" size="sm" className="font-mono text-xs text-text-muted">
            CONFIDENTIAL ARCHITECTURE
          </Badge>
        </div>

        <Heading as="h3" variant="card" className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary">
          {project.title}
        </Heading>

        {project.subtitle && (
          <p className="mt-1.5 font-heading text-sm sm:text-base font-medium text-accent">
            {project.subtitle}
          </p>
        )}

        <Text variant="small" color="secondary" className="mt-3 text-sm sm:text-base leading-relaxed">
          {project.description}
        </Text>

        {/* Applied Technologies */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider text-[11px] mr-1">
            Technologies Applied:
          </MonoText>
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded border border-border-subtle/80 bg-surface-raised/60 px-2.5 py-0.5 font-mono text-xs text-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 2. Context, Problem Space & Constraints (Dimensions 1, 2, 3) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Dimension 1: Context */}
        <div className="rounded-md border border-border-subtle/80 bg-surface-raised/40 p-5 space-y-2.5">
          <div className="flex items-center gap-2 border-b border-border-subtle/60 pb-2">
            <span className="font-mono text-xs font-semibold text-accent">01</span>
            <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider text-[11px]">
              Engineering Context & Role
            </MonoText>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-text-secondary">
            {reasoning.context}
          </p>
        </div>

        {/* Dimension 2: Problem */}
        <div className="rounded-md border border-border-subtle/80 bg-surface-raised/40 p-5 space-y-2.5">
          <div className="flex items-center gap-2 border-b border-border-subtle/60 pb-2">
            <span className="font-mono text-xs font-semibold text-accent">02</span>
            <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider text-[11px]">
              Core Engineering Challenge
            </MonoText>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-text-secondary">
            {reasoning.problem}
          </p>
        </div>

        {/* Dimension 3: Constraints */}
        <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-5 space-y-2.5">
          <div className="flex items-center gap-2 border-b border-amber-500/20 pb-2">
            <span className="font-mono text-xs font-semibold text-amber-400">03</span>
            <MonoText size="xs" className="font-semibold uppercase tracking-wider text-[11px] text-amber-400">
              Critical Constraints
            </MonoText>
          </div>
          <ul className="space-y-1.5" role="list">
            {reasoning.constraints.map((c) => (
              <li key={c} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-400" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 3. Engineering Approach & Architecture Thinking (Dimensions 4, 5 with Diagram) */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Dimension 4: Engineering Approach */}
          <div className="rounded-md border border-accent-muted/30 bg-accent-muted/10 p-5 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <MonoText size="xs" color="accent" className="font-semibold uppercase tracking-wider">
                Engineering Approach
              </MonoText>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-text-primary">
              {reasoning.engineeringApproach}
            </p>
          </div>

          {/* Dimension 5: Architecture Thinking */}
          <div className="rounded-md border border-border-subtle/80 bg-surface-raised/40 p-5 space-y-2.5">
            <div className="flex items-center gap-2 border-b border-border-subtle/60 pb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider">
                Architecture & System Thinking
              </MonoText>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-text-secondary">
              {reasoning.architectureThinking}
            </p>
          </div>
        </div>

        {/* Architectural Visualizer / Diagram */}
        <CaseStudyDiagram diagram={reasoning.architectureDiagram} />
      </div>

      {/* 4. Engineering Pillars: Integrations, Security, Performance (Dimensions 6, 7, 8) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Dimension 6: Integrations */}
        <div className="rounded-md border border-border-subtle/80 bg-surface-raised/40 p-5 space-y-3">
          <div className="flex items-center gap-2 border-b border-border-subtle/60 pb-2.5">
            <span className="font-mono text-xs font-semibold text-accent">06</span>
            <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider text-[11px]">
              Integrations & External Systems
            </MonoText>
          </div>
          <ul className="space-y-2" role="list">
            {reasoning.integrations.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-border" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Dimension 7: Security Considerations */}
        <div className="rounded-md border border-border-subtle/80 bg-surface-raised/40 p-5 space-y-3">
          <div className="flex items-center gap-2 border-b border-border-subtle/60 pb-2.5">
            <span className="font-mono text-xs font-semibold text-accent">07</span>
            <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider text-[11px]">
              Security Considerations
            </MonoText>
          </div>
          <ul className="space-y-2" role="list">
            {reasoning.securityConsiderations.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Dimension 8: Performance Considerations */}
        <div className="rounded-md border border-border-subtle/80 bg-surface-raised/40 p-5 space-y-3">
          <div className="flex items-center gap-2 border-b border-border-subtle/60 pb-2.5">
            <span className="font-mono text-xs font-semibold text-accent">08</span>
            <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider text-[11px]">
              Performance & Reliability
            </MonoText>
          </div>
          <ul className="space-y-2" role="list">
            {reasoning.performanceConsiderations.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-border" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 5. Delivery, Outcome & Architectural Insight (Dimensions 9, 10, 11) */}
      <div className="space-y-6 border-t border-border-subtle/70 pt-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Dimension 9: Delivery & Collaboration */}
          <div className="rounded-md border border-border-subtle/80 bg-surface-raised/40 p-5 space-y-2.5">
            <div className="flex items-center gap-2 border-b border-border-subtle/60 pb-2">
              <span className="font-mono text-xs font-semibold text-accent">09</span>
              <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider text-[11px]">
                Delivery & Collaboration
              </MonoText>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-text-secondary">
              {reasoning.deliveryCollaboration}
            </p>
          </div>

          {/* Dimension 10: Verified Outcome */}
          <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-2.5">
            <div className="flex items-center gap-2 border-b border-emerald-500/20 pb-2">
              <span className="font-mono text-xs font-semibold text-emerald-400">10</span>
              <MonoText size="xs" className="font-semibold uppercase tracking-wider text-[11px] text-emerald-400">
                Verified Outcome
              </MonoText>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-text-primary">
              {reasoning.outcome}
            </p>
          </div>
        </div>

        {/* Dimension 11: Engineering Insight Callout */}
        <div className="rounded-md border border-accent/40 bg-accent-muted/15 p-5 sm:p-6">
          <div className="mb-2 flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-accent">11</span>
            <MonoText size="xs" color="accent" className="font-semibold uppercase tracking-wider">
              Architectural Insight & Takeaway
            </MonoText>
          </div>
          <p className="text-xs sm:text-sm font-medium leading-relaxed text-text-primary italic">
            "{reasoning.engineeringInsight}"
          </p>
        </div>
      </div>
    </div>
  );
}
