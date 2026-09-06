import { useState, type ReactElement } from 'react';
import { Section } from '@/components/layout';
import { SectionHeader } from '@/components/typography';
import { DomainSelector } from './DomainSelector';
import { DomainInspector } from './DomainInspector';
import type { DomainItem } from '@/content/models';

export interface DomainsProps {
  readonly domains: readonly DomainItem[];
  readonly className?: string;
}

export function Domains({
  domains,
  className = '',
}: DomainsProps): ReactElement {
  const [activeDomainId, setActiveDomainId] = useState<string>(
    () => domains[0]?.id ?? 'domain-ecommerce',
  );

  const activeDomain = domains.find((d) => d.id === activeDomainId) ?? domains[0];

  return (
    <Section id="domains" spacing="default" className={`border-b border-border-subtle ${className}`}>
      <div className="space-y-10 sm:space-y-12">
        {/* Section Header */}
        <SectionHeader
          kicker="04 / DOMAIN EXPERTISE"
          title="Bridging complex business domains with resilient engineering."
          description="Understanding unfamiliar domains and translating business requirements into scalable, dependable production systems across the complete software delivery lifecycle."
        />

        {/* Interactive Domain Selection Grid */}
        <DomainSelector
          domains={domains}
          activeId={activeDomainId}
          onSelect={setActiveDomainId}
        />

        {/* Selected Domain Deep Dive Inspector */}
        {activeDomain && <DomainInspector domain={activeDomain} />}
      </div>
    </Section>
  );
}
