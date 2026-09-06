import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Domains } from './Domains';
import { DomainSelector } from './DomainSelector';
import { DomainInspector } from './DomainInspector';
import { getPortfolioContent } from '@/content';
import type { DomainItem } from '@/content/models';

describe('Domain Experience Section', () => {
  const content = getPortfolioContent();

  it('renders within anchored section #domains with section header', () => {
    const { container } = render(<Domains domains={content.domains} />);
    const section = container.querySelector('section#domains');
    expect(section).toBeInTheDocument();

    expect(screen.getByText('04 / DOMAIN EXPERTISE')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /bridging complex business domains with resilient engineering/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders all 6 domain tabs in the tablist', () => {
    render(<Domains domains={content.domains} />);

    const tablist = screen.getByRole('tablist', { name: /selectable business domains/i });
    expect(tablist).toBeInTheDocument();

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(6);

    const tabNames = tabs.map((t) => t.textContent);
    expect(tabNames.some((t) => t?.includes('E-commerce Platforms'))).toBe(true);
    expect(tabNames.some((t) => t?.includes('EdTech & Learning Platforms'))).toBe(true);
    expect(tabNames.some((t) => t?.includes('Content & Article Publishing'))).toBe(true);
    expect(tabNames.some((t) => t?.includes('CRM & Enterprise Applications'))).toBe(true);
    expect(tabNames.some((t) => t?.includes('Workflow & Document Systems'))).toBe(true);
    expect(tabNames.some((t) => t?.includes('AI-Enabled Applications & Automation'))).toBe(true);
  });

  it('renders the first domain in the inspector by default', () => {
    render(<Domains domains={content.domains} />);

    const firstDomain = content.domains[0]!;
    const panel = screen.getByRole('tabpanel');
    expect(panel).toHaveAttribute('id', `domain-panel-${firstDomain.id}`);
    expect(panel).toHaveAttribute('aria-labelledby', `domain-tab-${firstDomain.id}`);

    // Inspector title
    expect(screen.getByRole('heading', { level: 3, name: firstDomain.name })).toBeInTheDocument();
    expect(screen.getByText(firstDomain.problemSpace)).toBeInTheDocument();
  });

  it('switches domain inspector details when selecting another domain tab', () => {
    render(<Domains domains={content.domains} />);

    const crmTab = screen.getByRole('tab', {
      name: /CRM & Enterprise Applications/i,
    });
    fireEvent.click(crmTab);

    expect(crmTab).toHaveAttribute('aria-selected', 'true');
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'CRM & Enterprise Applications',
      }),
    ).toBeInTheDocument();

    const crmDomain = content.domains.find((d) => d.id === 'domain-crm')!;
    expect(screen.getByText(crmDomain.problemSpace)).toBeInTheDocument();

    // Verify system types & engineering concerns for CRM are rendered
    expect(screen.getByText(crmDomain.systemTypes[0]!)).toBeInTheDocument();
    expect(screen.getByText(crmDomain.engineeringConcerns[0]!)).toBeInTheDocument();
  });

  describe('DomainSelector Component', () => {
    it('handles selection callback when tab is clicked', () => {
      const onSelect = vi.fn();
      render(
        <DomainSelector
          domains={content.domains}
          activeId="domain-ecommerce"
          onSelect={onSelect}
        />,
      );

      const edtechTab = screen.getByRole('tab', {
        name: /EdTech & Learning Platforms/i,
      });
      fireEvent.click(edtechTab);

      expect(onSelect).toHaveBeenCalledWith('domain-edtech');
    });

    it('sets aria-selected and tabIndex appropriately for active and inactive tabs', () => {
      render(
        <DomainSelector
          domains={content.domains}
          activeId="domain-publishing"
          onSelect={vi.fn()}
        />,
      );

      const publishingTab = screen.getByRole('tab', {
        name: /Content & Article Publishing/i,
      });
      const ecommerceTab = screen.getByRole('tab', {
        name: /E-commerce Platforms/i,
      });

      expect(publishingTab).toHaveAttribute('aria-selected', 'true');
      expect(publishingTab).toHaveAttribute('tabIndex', '0');

      expect(ecommerceTab).toHaveAttribute('aria-selected', 'false');
      expect(ecommerceTab).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('DomainInspector Component', () => {
    const mockDomain: DomainItem = {
      id: 'mock-domain',
      name: 'Custom Enterprise System',
      tag: 'TEST-TAG',
      summary: 'High-throughput enterprise workflow orchestration.',
      problemSpace: 'Coordinating multi-tier distributed microservices.',
      systemTypes: ['Distributed Message Broker', 'Orchestration Engine'],
      engineeringConcerns: ['Idempotency Guarantees', 'Sub-millisecond Latency'],
      integrationsWorkflows: ['Stripe Invoicing', 'AWS SQS Dead-letter queues'],
      relevantTechnologies: ['Node.js', 'Redis', 'Kafka'],
    };

    it('renders domain deep dive details, execution pillars, and technology chips', () => {
      render(<DomainInspector domain={mockDomain} />);

      expect(screen.getByRole('heading', { level: 3, name: 'Custom Enterprise System' })).toBeInTheDocument();
      expect(screen.getByText('TEST-TAG')).toBeInTheDocument();
      expect(screen.getByText('3 Technologies Applied')).toBeInTheDocument();
      expect(screen.getByText('Coordinating multi-tier distributed microservices.')).toBeInTheDocument();

      expect(screen.getByText('Distributed Message Broker')).toBeInTheDocument();
      expect(screen.getByText('Idempotency Guarantees')).toBeInTheDocument();
      expect(screen.getByText('Stripe Invoicing')).toBeInTheDocument();

      expect(screen.getByText('Node.js')).toBeInTheDocument();
      expect(screen.getByText('Redis')).toBeInTheDocument();
      expect(screen.getByText('Kafka')).toBeInTheDocument();
    });
  });
});
