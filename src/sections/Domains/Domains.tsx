import { useState, type ReactElement } from 'react';
import { Section } from '@/components/layout';
import { SectionHeader } from '@/components/typography';
import { DomainSelector } from './DomainSelector';
import { DomainModal } from './DomainModal';
import type { DomainItem } from '@/content/models';

export interface DomainsProps {
  readonly domains: readonly DomainItem[];
  readonly className?: string;
}

export function Domains({
  domains,
  className = '',
}: DomainsProps): ReactElement {
  const [selectedDomainId, setSelectedDomainId] = useState<string | null>(null);

  const activeDomain = domains.find((d) => d.id === selectedDomainId) ?? null;

  return (
    <Section id="domains" spacing="default" className={`border-b border-border-subtle ${className}`}>
      <div className="space-y-6 sm:space-y-8">
        {/* Section Header */}
        <SectionHeader
          kicker="04 / DOMAIN EXPERTISE"
          title="Domain Expertise"
          description="Understanding unfamiliar domains and translating complex business rules into dependable, high-throughput production systems."
        />

        {/* Consolidated Interactive Domain Cards */}
        <DomainSelector
          domains={domains}
          activeId={selectedDomainId ?? ''}
          onSelect={(id) => setSelectedDomainId(id)}
        />

        {/* Centered Deep Dive Details Modal */}
        <DomainModal
          domain={activeDomain}
          domains={domains}
          isOpen={activeDomain !== null}
          onClose={() => setSelectedDomainId(null)}
          onSelectDomain={(domain) => setSelectedDomainId(domain.id)}
        />
      </div>
    </Section>
  );
}
