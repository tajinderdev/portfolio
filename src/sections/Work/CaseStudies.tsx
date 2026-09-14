import { useState, type ReactElement } from 'react';
import { Section } from '@/components/layout';
import { SectionHeader } from '@/components/typography';
import { CaseStudySelector } from './CaseStudySelector';
import { CaseStudyModal } from './CaseStudyModal';
import type { ProjectCaseStudy } from '@/content/models';

export interface CaseStudiesProps {
  readonly projects: readonly ProjectCaseStudy[];
  readonly className?: string;
}

export function CaseStudies({
  projects,
  className = '',
}: CaseStudiesProps): ReactElement {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const activeProject = projects.find((p) => p.id === selectedProjectId) ?? null;

  return (
    <Section id="work" spacing="default" className={`border-b border-border-subtle ${className}`}>
      <div className="space-y-6 sm:space-y-8">
        {/* Section Header */}
        <SectionHeader
          kicker="01 / SELECTED WORK"
          title="Case Studies"
          description="In-depth analysis of technical challenges, system constraints, architectural decisions, and verified engineering outcomes across complex enterprise domains."
        />

        {/* Compact Interactive Case Study Cards Grid */}
        <CaseStudySelector
          projects={projects}
          activeId={selectedProjectId ?? ''}
          onSelect={(id) => setSelectedProjectId(id)}
        />

        {/* Centered Case Study Deep Dive Teardown Modal */}
        <CaseStudyModal
          project={activeProject}
          projects={projects}
          isOpen={activeProject !== null}
          onClose={() => setSelectedProjectId(null)}
          onSelectProject={(project) => setSelectedProjectId(project.id)}
        />
      </div>
    </Section>
  );
}
