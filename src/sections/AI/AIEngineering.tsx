import { useState, type ReactElement } from 'react';
import { Section } from '@/components/layout';
import { SectionHeader, MonoText } from '@/components/typography';
import { GovernanceMatrix } from './GovernanceMatrix';
import { WorkflowPipeline } from './WorkflowPipeline';
import { WorkflowStepModal } from './WorkflowStepModal';
import { ApplicationCapabilities } from './ApplicationCapabilities';
import type { AIEngineeringModel } from '@/content/models';

export interface AIEngineeringProps {
  readonly data: AIEngineeringModel;
  readonly className?: string;
}

export function AIEngineering({
  data,
  className = '',
}: AIEngineeringProps): ReactElement {
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);

  const activeStep = data.workflowSteps.find((s) => s.id === selectedStepId) ?? null;

  return (
    <Section id="ai" spacing="default" className={`border-b border-border-subtle ${className}`}>
      <div className="space-y-8 sm:space-y-10">
        {/* Section Header */}
        <SectionHeader
          kicker={data.kicker}
          title="Modern Engineering"
          description={data.positioning}
        />

        {/* 1. Core Philosophy / Multiplier vs Governance Matrix */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <MonoText size="xs" color="accent" className="font-semibold uppercase tracking-wider">
              PHILOSOPHY // SPEED MULTIPLIER VS ARCHITECTURAL GOVERNANCE
            </MonoText>
          </div>
          <GovernanceMatrix philosophy={data.philosophy} />
        </div>

        {/* 2. Interactive 6-Stage Workflow Pipeline */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <MonoText size="xs" color="accent" className="font-semibold uppercase tracking-wider">
              PRACTICAL WORKFLOW // IDEA TO PRODUCTION
            </MonoText>
          </div>
          <WorkflowPipeline
            steps={data.workflowSteps}
            activeStepId={selectedStepId ?? ''}
            onSelectStep={(id) => setSelectedStepId(id)}
          />
        </div>

        {/* Centered Workflow Stage Deep Dive Modal */}
        <WorkflowStepModal
          step={activeStep}
          steps={data.workflowSteps}
          isOpen={activeStep !== null}
          onClose={() => setSelectedStepId(null)}
          onSelectStep={(step) => setSelectedStepId(step.id)}
        />

        {/* 3. Two Capability Spheres */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <MonoText size="xs" color="accent" className="font-semibold uppercase tracking-wider">
              CAPABILITY SPHERES // TOOLING & APPLICATION INTEGRATIONS
            </MonoText>
          </div>
          <ApplicationCapabilities spheres={data.capabilitySpheres} />
        </div>
      </div>
    </Section>
  );
}
