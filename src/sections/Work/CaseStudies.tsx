import { useState, type ReactElement } from 'react';
import { Section } from '@/components/layout';
import { SectionHeader } from '@/components/typography';
import { CaseStudySelector } from './CaseStudySelector';
import { CaseStudyDetails } from './CaseStudyDetails';
import type { ProjectCaseStudy } from '@/content/models';

export interface CaseStudiesProps {
  readonly projects: readonly ProjectCaseStudy[];
  readonly className?: string;
}

export function CaseStudies({
  projects,
  className = '',
}: CaseStudiesProps): ReactElement {
  const [activeId, setActiveId] = useState<string>(
    () => projects[0]?.id ?? 'project-content-platform',
  );

  const activeProject = projects.find((p) => p.id === activeId) ?? projects[0];

  return (
    <Section id="work" spacing="default" className={`border-b border-border-subtle ${className}`}>
      <div className="space-y-10 sm:space-y-12">
        {/* Section Header */}
        <SectionHeader
          kicker="01 / SELECTED WORK & CASE STUDIES"
          title="Architectural teardowns of mission-critical production systems."
          description="In-depth analysis of technical challenges, system constraints, architectural decisions, and verified engineering outcomes across complex enterprise domains."
        />

        {/* Interactive Case Study Selector Tabs */}
        <CaseStudySelector
          projects={projects}
          activeId={activeId}
          onSelect={setActiveId}
        />

        {/* Active Case Study Details Panel */}
        {activeProject && <CaseStudyDetails project={activeProject} />}
      </div>
    </Section>
  );
}
