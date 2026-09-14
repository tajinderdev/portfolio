import { useEffect, useState, type ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { Heading, Text, MonoText } from '@/components/typography';
import { Badge } from '@/components/ui';
import type { DomainItem } from '@/content/models';

export interface DomainModalProps {
  readonly domain: DomainItem | null;
  readonly domains: readonly DomainItem[];
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSelectDomain: (domain: DomainItem) => void;
}

export function DomainModal({
  domain,
  domains,
  isOpen,
  onClose,
  onSelectDomain,
}: DomainModalProps): ReactElement | null {
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

  if (!isOpen || !domain || !mounted) return null;

  const currentIndex = domains.findIndex((d) => d.id === domain.id);
  const prevDomain = currentIndex > 0 ? domains[currentIndex - 1] : null;
  const nextDomain = currentIndex < domains.length - 1 ? domains[currentIndex + 1] : null;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`domain-modal-heading-${domain.id}`}
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
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] sm:max-h-[85vh] flex flex-col rounded-xl sm:rounded-2xl border border-border-strong bg-surface-elevated shadow-2xl overflow-hidden">
        {/* Fixed Header Bar */}
        <div className="flex items-start justify-between gap-3 sm:gap-4 border-b border-border-subtle p-4 sm:p-6 bg-surface-elevated/95 backdrop-blur-sm shrink-0">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="inline-flex items-center rounded border border-accent-muted/40 bg-accent-muted/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-accent uppercase tracking-wider">
                {domain.tag}
              </span>
              <MonoText size="xs" color="muted" className="font-mono text-xs">
                Domain 0{currentIndex + 1} of 0{domains.length}
              </MonoText>
              <Badge variant="outline" size="sm" className="font-mono text-xs">
                {domain.relevantTechnologies.length} Technologies
              </Badge>
            </div>

            <Heading
              as="h3"
              variant="card"
              id={`domain-modal-heading-${domain.id}`}
              className="text-xl sm:text-2xl font-bold text-text-primary pt-1"
            >
              {domain.name}
            </Heading>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close domain details"
            className="rounded-lg p-2 text-text-muted hover:text-text-primary hover:bg-surface-raised border border-border-subtle transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Summary */}
          <Text variant="body" color="secondary" className="text-sm sm:text-base leading-relaxed">
            {domain.summary}
          </Text>

          {/* Problem Space & Business Challenge */}
          <div className="rounded-lg border border-accent-muted/30 bg-accent-muted/10 p-4 sm:p-5">
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* 1. Types of Systems Involved */}
            <div className="rounded-lg border border-border-subtle bg-surface-raised/40 p-4 space-y-2.5">
              <div className="flex items-center gap-2 border-b border-border-subtle/60 pb-2">
                <span className="font-mono text-xs font-semibold text-accent">01</span>
                <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider text-[11px]">
                  System Types
                </MonoText>
              </div>
              <ul className="space-y-1.5" role="list">
                {domain.systemTypes.map((sys) => (
                  <li key={sys} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-border" />
                    <span>{sys}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Critical Engineering Concerns */}
            <div className="rounded-lg border border-border-subtle bg-surface-raised/40 p-4 space-y-2.5">
              <div className="flex items-center gap-2 border-b border-border-subtle/60 pb-2">
                <span className="font-mono text-xs font-semibold text-accent">02</span>
                <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider text-[11px]">
                  Engineering Concerns
                </MonoText>
              </div>
              <ul className="space-y-1.5" role="list">
                {domain.engineeringConcerns.map((concern) => (
                  <li key={concern} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{concern}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Integrations & Workflows */}
            <div className="rounded-lg border border-border-subtle bg-surface-raised/40 p-4 space-y-2.5">
              <div className="flex items-center gap-2 border-b border-border-subtle/60 pb-2">
                <span className="font-mono text-xs font-semibold text-accent">03</span>
                <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider text-[11px]">
                  Integrations & Workflows
                </MonoText>
              </div>
              <ul className="space-y-1.5" role="list">
                {domain.integrationsWorkflows.map((workflow) => (
                  <li key={workflow} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-border" />
                    <span>{workflow}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technologies Applied */}
          <div className="border-t border-border-subtle/70 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
              <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider text-[11px]">
                Technologies Applied
              </MonoText>
              <div className="flex flex-wrap gap-1.5" aria-label="Relevant technologies">
                {domain.relevantTechnologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-border-subtle/80 bg-surface-raised px-2.5 py-1 font-mono text-xs text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer Navigation Bar */}
        <div className="flex items-center justify-between border-t border-border-subtle p-3 sm:p-4 bg-surface-elevated/95 backdrop-blur-sm shrink-0">
          <div>
            {prevDomain ? (
              <button
                type="button"
                onClick={() => onSelectDomain(prevDomain)}
                className="flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-xs text-text-secondary hover:text-text-primary hover:bg-surface-raised border border-border-subtle transition-colors"
              >
                <span>←</span>
                <span className="hidden sm:inline">Prev:</span>
                <span className="font-semibold truncate max-w-[120px]">{prevDomain.name}</span>
              </button>
            ) : (
              <span className="text-xs font-mono text-text-muted/40 px-3 py-1.5">First domain</span>
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
            {nextDomain ? (
              <button
                type="button"
                onClick={() => onSelectDomain(nextDomain)}
                className="flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-xs text-text-secondary hover:text-text-primary hover:bg-surface-raised border border-border-subtle transition-colors"
              >
                <span className="hidden sm:inline">Next:</span>
                <span className="font-semibold truncate max-w-[120px]">{nextDomain.name}</span>
                <span>→</span>
              </button>
            ) : (
              <span className="text-xs font-mono text-text-muted/40 px-3 py-1.5">Last domain</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
