import { useState, useMemo, type ReactElement } from 'react';
import { Section } from '@/components/layout';
import { SectionHeader, Text } from '@/components/typography';
import { ArchitectureMap } from './ArchitectureMap';
import { CapabilityFilter } from './CapabilityFilter';
import { CapabilityGroupCard } from './CapabilityGroupCard';
import type { SkillPillar, SkillPillarGroup } from '@/content/models';

export interface CapabilitiesProps {
  readonly skillPillars: readonly SkillPillarGroup[];
  readonly className?: string;
}

export function Capabilities({
  skillPillars,
  className = '',
}: CapabilitiesProps): ReactElement {
  const [activePillar, setActivePillar] = useState<SkillPillar | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter groups based on active pillar and search query
  const filteredGroups = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return skillPillars.filter((group) => {
      // 1. Pillar match
      const matchesPillar = activePillar === 'ALL' || group.pillar === activePillar;
      if (!matchesPillar) return false;

      // 2. Search query match
      if (!query) return true;

      const matchesGroupLabel = group.label.toLowerCase().includes(query);
      const matchesPillarName = group.pillar.toLowerCase().includes(query);
      const matchesPurpose = group.purpose.toLowerCase().includes(query);
      const matchesSubcategory = group.subcategories.some(
        (sub) =>
          sub.name.toLowerCase().includes(query) ||
          sub.skills.some((skill) => skill.toLowerCase().includes(query)),
      );

      return (
        matchesGroupLabel ||
        matchesPillarName ||
        matchesPurpose ||
        matchesSubcategory
      );
    });
  }, [skillPillars, activePillar, searchQuery]);

  return (
    <Section id="engineering" spacing="default" className={`border-b border-border-subtle ${className}`}>
      <div className="space-y-10 sm:space-y-12">
        {/* Section Header */}
        <SectionHeader
          kicker="03 / TECHNICAL CAPABILITIES"
          title="Engineered for capability, resilience, and architectural clarity."
          description="Technologies organized by engineering function across the application lifecycle—from interface construction and API contracts to cloud deployment and legacy modernization."
        />

        {/* Interactive Architecture & Dependency Flow Map */}
        <ArchitectureMap
          activePillar={activePillar}
          onSelectPillar={(pillar) => setActivePillar(pillar)}
        />

        {/* Search & Pillar Navigation Filter */}
        <CapabilityFilter
          activePillar={activePillar}
          onSelectPillar={setActivePillar}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          resultCount={filteredGroups.length}
        />

        {/* Capability Groups Grid */}
        {filteredGroups.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {filteredGroups.map((group) => (
              <CapabilityGroupCard
                key={group.pillar}
                group={group}
                searchQuery={searchQuery}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border-subtle bg-surface/30 p-8 text-center">
            <Text variant="body" color="muted">
              No capabilities found matching &ldquo;{searchQuery}&rdquo;.
            </Text>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActivePillar('ALL');
              }}
              className="mt-3 font-mono text-xs text-accent underline hover:text-text-primary"
            >
              Reset filter and view all capabilities
            </button>
          </div>
        )}
      </div>
    </Section>
  );
}
