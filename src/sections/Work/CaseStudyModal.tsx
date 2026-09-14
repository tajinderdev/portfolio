import { useEffect, useState, type ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { Heading, Text, MonoText } from '@/components/typography';
import { Badge } from '@/components/ui';
import { CaseStudyDiagram } from './CaseStudyDiagram';
import type { ProjectCaseStudy } from '@/content/models';

export interface CaseStudyModalProps {
  readonly project: ProjectCaseStudy | null;
  readonly projects: readonly ProjectCaseStudy[];
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSelectProject: (project: ProjectCaseStudy) => void;
}

export function CaseStudyModal({
  project,
  projects,
  isOpen,
  onClose,
  onSelectProject,
}: CaseStudyModalProps): ReactElement | null {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project || !mounted) return null;

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
  const { reasoning } = project;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`casestudy-modal-heading-${project.id}`}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-8"
      style={{ isolation: 'isolate' }}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centered Modal Window Card */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] sm:max-h-[85vh] flex flex-col rounded-xl sm:rounded-2xl border border-border-strong bg-surface-elevated shadow-2xl overflow-hidden">
        {/* Fixed Header Bar */}
        <div className="flex items-start justify-between gap-3 sm:gap-4 border-b border-border-subtle p-4 sm:p-6 bg-surface-elevated/95 backdrop-blur-sm shrink-0">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="inline-flex items-center rounded border border-accent-muted/40 bg-accent-muted/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-accent uppercase tracking-wider">
                {project.domainTag}
              </span>
              <MonoText size="xs" color="muted" className="font-mono text-xs">
                Case Study 0{currentIndex + 1} of 0{projects.length}
              </MonoText>
              <Badge variant="outline" size="sm" className="font-mono text-[10px] sm:text-xs text-text-muted">
                CONFIDENTIAL ARCHITECTURE
              </Badge>
            </div>

            <Heading
              as="h3"
              variant="card"
              id={`casestudy-modal-heading-${project.id}`}
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary pt-1"
            >
              {project.title}
            </Heading>

            {project.subtitle && (
              <p className="font-heading text-xs sm:text-sm font-medium text-accent">
                {project.subtitle}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study details"
            className="rounded-lg p-2 text-text-muted hover:text-text-primary hover:bg-surface-raised border border-border-subtle transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-8">
          {/* Summary & Technologies */}
          <div className="space-y-4">
            <Text variant="body" color="secondary" className="text-sm sm:text-base leading-relaxed">
              {project.description}
            </Text>

            <div className="flex flex-wrap items-center gap-2 border-t border-border-subtle/50 pt-3">
              <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider text-[11px] mr-1">
                Technologies:
              </MonoText>
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-border-subtle/80 bg-surface-raised px-2.5 py-0.5 font-mono text-xs text-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 1. Context, Challenge & Constraints (Dimensions 1, 2, 3) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Context */}
            <div className="rounded-lg border border-border-subtle bg-surface-raised/40 p-4 space-y-2">
              <div className="flex items-center gap-2 border-b border-border-subtle/60 pb-2">
                <span className="font-mono text-xs font-semibold text-accent">01</span>
                <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider text-[11px]">
                  Context & Role
                </MonoText>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-text-secondary">
                {reasoning.context}
              </p>
            </div>

            {/* Core Challenge */}
            <div className="rounded-lg border border-border-subtle bg-surface-raised/40 p-4 space-y-2">
              <div className="flex items-center gap-2 border-b border-border-subtle/60 pb-2">
                <span className="font-mono text-xs font-semibold text-accent">02</span>
                <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider text-[11px]">
                  Core Challenge
                </MonoText>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-text-secondary">
                {reasoning.problem}
              </p>
            </div>

            {/* Constraints */}
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 space-y-2">
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

          {/* 2. Engineering Approach & Architecture Thinking */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Engineering Approach */}
              <div className="rounded-lg border border-accent-muted/30 bg-accent-muted/10 p-4 space-y-2">
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

              {/* Architecture Thinking */}
              <div className="rounded-lg border border-border-subtle bg-surface-raised/40 p-4 space-y-2">
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

            {/* Architecture Visualizer Diagram */}
            <CaseStudyDiagram diagram={reasoning.architectureDiagram} />
          </div>

          {/* 3. Integrations, Security, Performance */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Integrations */}
            <div className="rounded-lg border border-border-subtle bg-surface-raised/40 p-4 space-y-2.5">
              <div className="flex items-center gap-2 border-b border-border-subtle/60 pb-2">
                <span className="font-mono text-xs font-semibold text-accent">06</span>
                <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider text-[11px]">
                  Integrations
                </MonoText>
              </div>
              <ul className="space-y-1.5" role="list">
                {reasoning.integrations.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-border" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Security */}
            <div className="rounded-lg border border-border-subtle bg-surface-raised/40 p-4 space-y-2.5">
              <div className="flex items-center gap-2 border-b border-border-subtle/60 pb-2">
                <span className="font-mono text-xs font-semibold text-accent">07</span>
                <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider text-[11px]">
                  Security
                </MonoText>
              </div>
              <ul className="space-y-1.5" role="list">
                {reasoning.securityConsiderations.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Performance */}
            <div className="rounded-lg border border-border-subtle bg-surface-raised/40 p-4 space-y-2.5">
              <div className="flex items-center gap-2 border-b border-border-subtle/60 pb-2">
                <span className="font-mono text-xs font-semibold text-accent">08</span>
                <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider text-[11px]">
                  Performance
                </MonoText>
              </div>
              <ul className="space-y-1.5" role="list">
                {reasoning.performanceConsiderations.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-border" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4. Outcomes & Engineering Insight */}
          <div className="space-y-4 border-t border-border-subtle/70 pt-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Delivery & Collaboration */}
              <div className="rounded-lg border border-border-subtle bg-surface-raised/40 p-4 space-y-2">
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

              {/* Verified Outcome */}
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-2">
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

            {/* Architectural Insight Callout */}
            <div className="rounded-lg border border-accent/40 bg-accent-muted/15 p-4 sm:p-5">
              <div className="mb-1.5 flex items-center gap-2">
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

        {/* Fixed Footer Navigation Bar */}
        <div className="flex items-center justify-between border-t border-border-subtle p-3 sm:p-4 bg-surface-elevated/95 backdrop-blur-sm shrink-0">
          <div>
            {prevProject ? (
              <button
                type="button"
                onClick={() => onSelectProject(prevProject)}
                className="flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-xs text-text-secondary hover:text-text-primary hover:bg-surface-raised border border-border-subtle transition-colors"
              >
                <span>←</span>
                <span className="hidden sm:inline">Prev:</span>
                <span className="font-semibold truncate max-w-[120px]">{prevProject.title}</span>
              </button>
            ) : (
              <span className="text-xs font-mono text-text-muted/40 px-3 py-1.5">First study</span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-4 py-1.5 font-mono text-xs font-medium text-text-primary hover:bg-surface-raised border border-border-subtle transition-colors"
          >
            Close
          </button>

          <div>
            {nextProject ? (
              <button
                type="button"
                onClick={() => onSelectProject(nextProject)}
                className="flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-xs text-text-secondary hover:text-text-primary hover:bg-surface-raised border border-border-subtle transition-colors"
              >
                <span className="hidden sm:inline">Next:</span>
                <span className="font-semibold truncate max-w-[120px]">{nextProject.title}</span>
                <span>→</span>
              </button>
            ) : (
              <span className="text-xs font-mono text-text-muted/40 px-3 py-1.5">Last study</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
