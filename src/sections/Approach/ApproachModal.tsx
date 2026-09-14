import { useEffect, useState, type ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { Heading, Text, MonoText } from '@/components/typography';
import { Badge } from '@/components/ui';
import type { PhilosophyTheme } from '@/content/models';

export interface ApproachModalProps {
  readonly theme: PhilosophyTheme | null;
  readonly themes: readonly PhilosophyTheme[];
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSelectTheme: (theme: PhilosophyTheme) => void;
}

export function ApproachModal({
  theme,
  themes,
  isOpen,
  onClose,
  onSelectTheme,
}: ApproachModalProps): ReactElement | null {
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

  if (!isOpen || !theme || !mounted) return null;

  const currentIndex = themes.findIndex((t) => t.id === theme.id);
  const prevTheme = currentIndex > 0 ? themes[currentIndex - 1] : null;
  const nextTheme = currentIndex < themes.length - 1 ? themes[currentIndex + 1] : null;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`approach-modal-heading-${theme.id}`}
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
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] flex flex-col rounded-xl sm:rounded-2xl border border-border-strong bg-surface-elevated shadow-2xl overflow-hidden">
        {/* Fixed Header Bar */}
        <div className="flex items-start justify-between gap-3 sm:gap-4 border-b border-border-subtle p-4 sm:p-6 bg-surface-elevated/95 backdrop-blur-sm shrink-0">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="inline-flex items-center rounded border border-accent-muted/40 bg-accent-muted/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-accent uppercase tracking-wider">
                [{theme.iconLabel}]
              </span>
              <MonoText size="xs" color="muted" className="font-mono text-xs">
                Pillar 0{currentIndex + 1} of 0{themes.length}
              </MonoText>
              <Badge variant="outline" size="sm" className="font-mono text-[10px] sm:text-xs">
                {theme.keyDecisions.length} Key Practices
              </Badge>
            </div>

            <Heading
              as="h3"
              variant="card"
              id={`approach-modal-heading-${theme.id}`}
              className="text-xl sm:text-2xl font-bold text-text-primary pt-1"
            >
              {theme.title}
            </Heading>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close approach details"
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
            {theme.summary}
          </Text>

          {/* Key Engineering Practices & Decisions */}
          <div className="rounded-lg border border-border-subtle bg-surface-raised/40 p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-border-subtle/60 pb-2.5">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <MonoText size="xs" color="accent" className="font-semibold uppercase tracking-wider text-[11px]">
                Key Decisions & Engineering Practices
              </MonoText>
            </div>
            <ul className="space-y-2.5" role="list">
              {theme.keyDecisions.map((decision) => (
                <li key={decision} className="flex items-start gap-3 text-xs sm:text-sm text-text-secondary leading-relaxed">
                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-accent/40 bg-accent-muted/20 text-accent font-mono text-[10px]">
                    ✓
                  </span>
                  <span>{decision}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Fixed Footer Navigation Bar */}
        <div className="flex items-center justify-between border-t border-border-subtle p-3 sm:p-4 bg-surface-elevated/95 backdrop-blur-sm shrink-0">
          <div>
            {prevTheme ? (
              <button
                type="button"
                onClick={() => onSelectTheme(prevTheme)}
                className="flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-xs text-text-secondary hover:text-text-primary hover:bg-surface-raised border border-border-subtle transition-colors"
              >
                <span>←</span>
                <span className="hidden sm:inline">Prev:</span>
                <span className="font-semibold truncate max-w-[120px]">{prevTheme.title}</span>
              </button>
            ) : (
              <span className="text-xs font-mono text-text-muted/40 px-3 py-1.5">First pillar</span>
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
            {nextTheme ? (
              <button
                type="button"
                onClick={() => onSelectTheme(nextTheme)}
                className="flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-xs text-text-secondary hover:text-text-primary hover:bg-surface-raised border border-border-subtle transition-colors"
              >
                <span className="hidden sm:inline">Next:</span>
                <span className="font-semibold truncate max-w-[120px]">{nextTheme.title}</span>
                <span>→</span>
              </button>
            ) : (
              <span className="text-xs font-mono text-text-muted/40 px-3 py-1.5">Last pillar</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
