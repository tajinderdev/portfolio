import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Capabilities } from './Capabilities';
import { ArchitectureMap } from './ArchitectureMap';
import { CapabilityFilter } from './CapabilityFilter';
import { CapabilityGroupCard } from './CapabilityGroupCard';
import { getPortfolioContent } from '@/content';

describe('Technical Capabilities Section', () => {
  const content = getPortfolioContent();

  it('renders within anchored section #engineering with section header', () => {
    const { container } = render(<Capabilities skillPillars={content.skillPillars} />);
    const section = container.querySelector('section#engineering');
    expect(section).toBeInTheDocument();

    expect(screen.getByText('03 / TECHNICAL CAPABILITIES')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /engineered for capability, resilience, and architectural clarity/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders all 8 capability groups by default', () => {
    render(<Capabilities skillPillars={content.skillPillars} />);

    expect(screen.getByText('8 areas')).toBeInTheDocument();

    const groupHeadings = screen.getAllByRole('heading', { level: 3 });
    const texts = groupHeadings.map((h) => h.textContent);

    expect(texts).toContain('Build');
    expect(texts).toContain('Architect');
    expect(texts).toContain('Integrate');
    expect(texts).toContain('Data');
    expect(texts).toContain('Deploy');
    expect(texts).toContain('Test');
    expect(texts).toContain('Modernize');
    expect(texts).toContain('Intelligence');
  });

  it('filters capabilities when selecting a tier in ArchitectureMap', () => {
    render(<Capabilities skillPillars={content.skillPillars} />);

    // Click 'Integrate' in architecture map
    const integrateBtn = screen.getByRole('button', { name: /external services/i });
    fireEvent.click(integrateBtn);

    expect(integrateBtn).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('1 area')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Integrate' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 3, name: 'Build' })).not.toBeInTheDocument();
  });

  it('filters capabilities by search query', () => {
    render(<Capabilities skillPillars={content.skillPillars} />);

    const searchInput = screen.getByRole('searchbox', {
      name: /search technologies and capabilities/i,
    });
    fireEvent.change(searchInput, { target: { value: 'PostgreSQL' } });

    // Should only show Data group
    expect(screen.getByRole('heading', { level: 3, name: 'Data' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 3, name: 'Build' })).not.toBeInTheDocument();

    // Clear search
    const clearBtn = screen.getByRole('button', { name: /clear search input/i });
    fireEvent.click(clearBtn);
    expect(screen.getByText('8 areas')).toBeInTheDocument();
  });

  it('shows empty state and allows resetting when search matches nothing', () => {
    render(<Capabilities skillPillars={content.skillPillars} />);

    const searchInput = screen.getByRole('searchbox', {
      name: /search technologies and capabilities/i,
    });
    fireEvent.change(searchInput, { target: { value: 'nonexistent-query-xyz' } });

    expect(
      screen.getByText(/no capabilities found matching/i),
    ).toBeInTheDocument();

    const resetBtn = screen.getByRole('button', {
      name: /reset filter and view all capabilities/i,
    });
    fireEvent.click(resetBtn);

    expect(screen.getByText('8 areas')).toBeInTheDocument();
  });

  describe('ArchitectureMap Component', () => {
    it('renders 5 pipeline tiers and 3 cross-cutting guardrails', () => {
      render(<ArchitectureMap activePillar="ALL" />);

      expect(screen.getByText('Application Tier')).toBeInTheDocument();
      expect(screen.getByText('Contract & Topology')).toBeInTheDocument();
      expect(screen.getByText('External Services')).toBeInTheDocument();
      expect(screen.getByText('Persistence & Cache')).toBeInTheDocument();
      expect(screen.getByText('Cloud & Runtime')).toBeInTheDocument();

      expect(screen.getByText('Automated Testing')).toBeInTheDocument();
      expect(screen.getByText('Security & Modernization')).toBeInTheDocument();
      expect(screen.getByText('AI Augmentation')).toBeInTheDocument();
    });
  });

  describe('CapabilityGroupCard Component', () => {
    it('renders capability group details, purpose, and technology badges', () => {
      const buildGroup = content.skillPillars.find((g) => g.pillar === 'BUILD')!;
      render(<CapabilityGroupCard group={buildGroup} searchQuery="React" />);

      expect(screen.getByText('BUILD')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: 'Build' })).toBeInTheDocument();
      expect(screen.getByText(/Core Application Layer/i)).toBeInTheDocument();
      expect(screen.getByText('Frontend Engineering')).toBeInTheDocument();
      expect(screen.getByText('Backend Systems')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Laravel')).toBeInTheDocument();
    });
  });

  describe('CapabilityFilter Component', () => {
    it('renders all filter options and handles selection & search callbacks', () => {
      const onSelect = vi.fn();
      const onSearch = vi.fn();

      render(
        <CapabilityFilter
          activePillar="BUILD"
          onSelectPillar={onSelect}
          searchQuery="React"
          onSearchChange={onSearch}
          resultCount={1}
        />,
      );

      const buildBtn = screen.getByRole('button', { name: 'Build' });
      expect(buildBtn).toHaveAttribute('aria-pressed', 'true');

      const dataBtn = screen.getByRole('button', { name: 'Data' });
      fireEvent.click(dataBtn);
      expect(onSelect).toHaveBeenCalledWith('DATA');

      const searchInput = screen.getByRole('searchbox');
      fireEvent.change(searchInput, { target: { value: 'TypeScript' } });
      expect(onSearch).toHaveBeenCalledWith('TypeScript');
    });
  });
});
