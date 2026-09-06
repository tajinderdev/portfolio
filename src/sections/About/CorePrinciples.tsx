import { type ReactElement } from 'react';
import { MonoText, Text } from '@/components/typography';

export interface CorePrinciplesProps {
  readonly principles: readonly string[];
  readonly className?: string;
}

export function CorePrinciples({
  principles,
  className = '',
}: CorePrinciplesProps): ReactElement {
  return (
    <div
      className={`rounded-lg border border-border-subtle bg-surface/40 p-5 backdrop-blur-sm sm:p-6 ${className}`}
      aria-label="Core Engineering Principles"
    >
      <div className="mb-4 flex items-center justify-between border-b border-border-subtle/60 pb-3">
        <MonoText size="xs" color="muted" className="uppercase tracking-wider font-semibold">
          Core Principles
        </MonoText>
        <MonoText size="xs" color="accent" className="font-medium">
          [ 01 — 08 ]
        </MonoText>
      </div>

      <ol className="grid grid-cols-1 gap-2.5 sm:grid-cols-2" role="list">
        {principles.map((principle, index) => {
          const formattedIndex = String(index + 1).padStart(2, '0');
          return (
            <li
              key={principle}
              className="group flex items-start gap-3 rounded-md border border-transparent p-2.5 transition-colors duration-150 hover:border-border-subtle hover:bg-surface-raised/40"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-border-subtle/80 bg-background/60 font-mono text-[11px] text-accent">
                {formattedIndex}
              </span>
              <Text
                variant="small"
                className="text-text-primary font-medium transition-colors group-hover:text-accent"
              >
                {principle}
              </Text>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
