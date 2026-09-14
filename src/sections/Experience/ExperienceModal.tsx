import { useEffect, useState, type ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { Heading, Text, MonoText } from '@/components/typography';
import { Badge } from '@/components/ui';
import type { ExperienceItem } from '@/content/models';

export interface ExperienceModalProps {
  readonly experience: ExperienceItem | null;
  readonly experiences: readonly ExperienceItem[];
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSelectExperience: (experience: ExperienceItem) => void;
}

export function ExperienceModal({
  experience,
  experiences,
  isOpen,
  onClose,
  onSelectExperience,
}: ExperienceModalProps): ReactElement | null {
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
    // Lock body scroll while modal is open
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !experience || !mounted) return null;

  const currentIndex = experiences.findIndex((e) => e.id === experience.id);
  const prevExperience = currentIndex > 0 ? experiences[currentIndex - 1] : null;
  const nextExperience = currentIndex < experiences.length - 1 ? experiences[currentIndex + 1] : null;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-heading-${experience.id}`}
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
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] sm:max-h-[84vh] flex flex-col rounded-xl sm:rounded-2xl border border-border-strong bg-surface-elevated shadow-2xl overflow-hidden">
        {/* Fixed Header Bar */}
        <div className="flex items-start justify-between gap-3 sm:gap-4 border-b border-border-subtle p-4 sm:p-6 bg-surface-elevated/95 backdrop-blur-sm shrink-0">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <Badge variant="accent" size="sm" className="font-mono font-semibold text-[10px] sm:text-xs">
                {experience.period}
              </Badge>
              {experience.specialization && (
                <Badge variant="outline" size="sm" className="font-mono text-[10px] sm:text-xs">
                  {experience.specialization}
                </Badge>
              )}
              <div className="flex items-center gap-1.5 font-mono text-xs text-text-muted">
                <span className="text-accent font-semibold">STAGE 0{experience.progressionIndex}</span>
                <span>·</span>
                <span>{experience.progressionStage}</span>
              </div>
            </div>

            <Heading
              as="h3"
              variant="card"
              id={`modal-heading-${experience.id}`}
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary pt-1.5"
            >
              {experience.role}
            </Heading>

            <MonoText size="xs" color="muted" className="block font-medium">
              Context: {experience.environment}
            </MonoText>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="rounded-lg p-2 text-text-secondary hover:text-text-primary hover:bg-surface-raised focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors cursor-pointer shrink-0"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {/* Primary Summary */}
          <div>
            <Text variant="body" color="secondary" className="leading-relaxed text-sm sm:text-base">
              {experience.summary}
            </Text>
          </div>

          {/* Technologies Used */}
          <div>
            <MonoText size="xs" color="muted" className="mb-2 block font-semibold uppercase tracking-wider text-[11px]">
              Technologies Applied
            </MonoText>
            <div className="flex flex-wrap gap-1.5" aria-label="Technologies used">
              {experience.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-border-subtle/80 bg-surface px-2.5 py-1 font-mono text-xs text-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Architectural Involvement */}
          <div className="rounded-xl border border-border-subtle bg-surface/60 p-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <MonoText size="xs" color="accent" className="font-semibold uppercase tracking-wider">
                Architectural Involvement
              </MonoText>
            </div>
            <ul className="space-y-2 pl-2" role="list">
              {experience.architecturalInvolvement.map((arch) => (
                <li key={arch} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                  <span className="leading-relaxed">{arch}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Scope & Responsibilities */}
          <div className="rounded-xl border border-border-subtle bg-surface/60 p-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <MonoText size="xs" color="accent" className="font-semibold uppercase tracking-wider">
                Responsibilities & Technical Scope
              </MonoText>
            </div>
            <p className="text-xs italic text-text-muted">
              Scope: {experience.technicalScope}
            </p>
            <ul className="space-y-2 pl-2" role="list">
              {experience.responsibilities.map((resp) => (
                <li key={resp} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                  <span className="leading-relaxed">{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Collaboration & Leadership */}
          <div className="rounded-xl border border-border-subtle bg-surface/60 p-5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <MonoText size="xs" color="accent" className="font-semibold uppercase tracking-wider">
                Collaboration & Leadership
              </MonoText>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              {experience.collaboration}
            </p>
            {experience.leadership && (
              <p className="mt-1 text-xs text-text-muted font-mono">
                Role: {experience.leadership}
              </p>
            )}
          </div>

          {/* Verified Outcomes & Impact */}
          {experience.outcomes && experience.outcomes.length > 0 && (
            <div className="rounded-xl border border-accent/25 bg-accent-muted/10 p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <MonoText size="xs" color="accent" className="font-semibold uppercase tracking-wider">
                  Verified Outcomes & Impact
                </MonoText>
              </div>
              <ul className="space-y-2 pl-2" role="list">
                {experience.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-text-primary">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="leading-relaxed">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Fixed Footer Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border-subtle p-3.5 sm:p-5 bg-surface-elevated/95 backdrop-blur-sm shrink-0">
          <div>
            {prevExperience ? (
              <button
                type="button"
                onClick={() => onSelectExperience(prevExperience)}
                className="inline-flex items-center gap-1 sm:gap-1.5 rounded-lg border border-border-subtle px-2.5 sm:px-3 py-1 sm:py-1.5 font-mono text-[11px] sm:text-xs text-text-secondary hover:border-accent hover:text-text-primary transition-colors cursor-pointer"
              >
                ← STAGE 0{prevExperience.progressionIndex}
              </button>
            ) : <div />}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-surface px-4 sm:px-5 py-1 sm:py-1.5 font-mono text-[11px] sm:text-xs font-semibold text-text-primary hover:bg-surface-raised border border-border transition-colors cursor-pointer"
          >
            Close
          </button>

          <div>
            {nextExperience ? (
              <button
                type="button"
                onClick={() => onSelectExperience(nextExperience)}
                className="inline-flex items-center gap-1 sm:gap-1.5 rounded-lg border border-border-subtle px-2.5 sm:px-3 py-1 sm:py-1.5 font-mono text-[11px] sm:text-xs text-text-secondary hover:border-accent hover:text-text-primary transition-colors cursor-pointer"
              >
                STAGE 0{nextExperience.progressionIndex} →
              </button>
            ) : <div />}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
