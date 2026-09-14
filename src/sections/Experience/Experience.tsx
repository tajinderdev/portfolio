import { useState, type ReactElement } from 'react';
import { Section } from '@/components/layout';
import { SectionHeader, MonoText } from '@/components/typography';
import { CareerProgressionTracker } from './CareerProgressionTracker';
import { ExperienceCard } from './ExperienceCard';
import { ExperienceModal } from './ExperienceModal';
import type { ExperienceItem } from '@/content/models';

export interface ExperienceProps {
  readonly experiences: readonly ExperienceItem[];
  readonly className?: string;
}

export function Experience({
  experiences,
  className = '',
}: ExperienceProps): ReactElement {
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | undefined>(
    experiences[0]?.id,
  );
  const [modalExperience, setModalExperience] = useState<ExperienceItem | null>(null);

  const handleSelectStage = (id: string): void => {
    setSelectedMilestoneId(id);
    const targetExp = experiences.find((e) => e.id === id);
    if (targetExp) {
      setModalExperience(targetExp);
    }
  };

  const handleOpenModal = (experience: ExperienceItem): void => {
    setSelectedMilestoneId(experience.id);
    setModalExperience(experience);
  };

  const handleCloseModal = (): void => {
    setModalExperience(null);
  };

  return (
    <Section id="experience" spacing="default" className={`border-b border-border-subtle ${className}`}>
      <div className="space-y-6 sm:space-y-8">
        {/* Section Header */}
        <SectionHeader
          kicker="02 / CAREER PROGRESSION"
          title="Professional Experience"
          description="7+ years building, modernizing, and supporting web platforms across diverse business domains—progressing from core implementation to architectural ownership, technical leadership, and AI augmentation."
        />

        {/* Visual Progression Stepper Arc (Trajectory) */}
        <CareerProgressionTracker
          activeId={selectedMilestoneId}
          onSelectStage={handleSelectStage}
        />

        {/* Global Toolbar: Count & Quick Instruction */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider">
              {experiences.length} Chronological Milestones (2019 — Present)
            </MonoText>
          </div>

          <MonoText size="xs" color="muted" className="text-[11px]">
            Click any milestone card to view complete architectural details
          </MonoText>
        </div>

        {/* Horizontal Milestones Grid (Compact, Minimal Scroll) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 items-stretch">
          {experiences.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              isSelected={selectedMilestoneId === experience.id}
              onOpenDetails={() => handleOpenModal(experience)}
            />
          ))}
        </div>

        {/* Detailed Experience Modal / Popup */}
        <ExperienceModal
          experience={modalExperience}
          experiences={experiences}
          isOpen={modalExperience !== null}
          onClose={handleCloseModal}
          onSelectExperience={(exp) => {
            setSelectedMilestoneId(exp.id);
            setModalExperience(exp);
          }}
        />
      </div>
    </Section>
  );
}
