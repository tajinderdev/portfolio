import { type ReactElement } from 'react';
import { Heading } from '@/components/typography';
import { Card3D } from '@/components/ui';

export interface GovernanceMatrixProps {
  readonly philosophy: {
    readonly multiplier: string;
    readonly control: string;
  };
  readonly className?: string;
}

const multiplierPoints = [
  'Rapid prototyping of unfamiliar domain interfaces and schemas',
  'Syntactic boilerplate elimination and routine scaffolding',
  'Comprehensive edge-case test vector synthesis and mock generation',
  'Accelerated comprehension of complex third-party codebases and APIs',
];

const controlPoints = [
  'System topology, service decoupling, and state machines',
  'Threat modeling, auth perimeters, and RBAC enforcement',
  'Deterministic verification and strict red-green testing',
  'Production telemetry, rollback safety, and data integrity',
];

export function GovernanceMatrix({
  philosophy,
  className = '',
}: GovernanceMatrixProps): ReactElement {
  return (
    <div className={`grid grid-cols-1 gap-6 lg:grid-cols-2 ${className}`}>
      {/* Column 1: AI as Multiplier */}
      <Card3D
        maxTilt={8}
        glare={true}
        className="h-full"
        innerClassName="h-full border-accent-muted/40 bg-accent-muted/10 hover:border-accent/60 hover:bg-accent-muted/20 transition-all duration-200"
      >
        <div className="group h-full p-6 sm:p-7 backdrop-blur-sm space-y-4">
          <div className="flex items-center justify-between border-b border-accent-muted/20 pb-3">
            <span className="font-mono text-[11px] font-semibold text-accent uppercase tracking-wider">
              [SPEED & AMPLIFICATION]
            </span>
            <span className="font-mono text-xs text-text-muted">MULTIPLIER</span>
          </div>

          <Heading as="h3" variant="card" className="text-lg sm:text-xl font-bold text-text-primary group-hover:text-accent transition-colors">
            The Multiplier Effect
          </Heading>

          <p className="text-xs sm:text-sm leading-relaxed text-text-primary">
            {philosophy.multiplier}
          </p>

          <ul className="space-y-2 pt-2" role="list">
            {multiplierPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card3D>

      {/* Column 2: Engineering Control */}
      <Card3D
        maxTilt={8}
        glare={true}
        className="h-full"
        innerClassName="h-full border-border-subtle bg-surface/50 hover:border-border hover:bg-surface-raised/60 transition-all duration-200"
      >
        <div className="group h-full p-6 sm:p-7 backdrop-blur-sm space-y-4">
          <div className="flex items-center justify-between border-b border-border-subtle/70 pb-3">
            <span className="font-mono text-[11px] font-semibold text-text-muted uppercase tracking-wider">
              [RIGOR & RESPONSIBILITY]
            </span>
            <span className="font-mono text-xs text-text-muted">GOVERNANCE</span>
          </div>

          <Heading as="h3" variant="card" className="text-lg sm:text-xl font-bold text-text-primary group-hover:text-accent transition-colors">
            The Architectural Perimeter
          </Heading>

          <p className="text-xs sm:text-sm leading-relaxed text-text-secondary">
            {philosophy.control}
          </p>

          <ul className="space-y-2 pt-2" role="list">
            {controlPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-border" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card3D>
    </div>
  );
}
