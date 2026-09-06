import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Experience } from './Experience';
import { CareerProgressionTracker } from './CareerProgressionTracker';
import { ExperienceCard } from './ExperienceCard';
import { getPortfolioContent } from '@/content';

describe('Professional Experience Section', () => {
  const content = getPortfolioContent();

  it('renders within an anchored section #experience with section header', () => {
    const { container } = render(<Experience experiences={content.experiences} />);
    const section = container.querySelector('section#experience');
    expect(section).toBeInTheDocument();

    expect(screen.getByText('02 / CAREER PROGRESSION')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /engineering progression from implementation to systems architecture/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders all 5 chronological experience milestones', () => {
    render(<Experience experiences={content.experiences} />);

    expect(
      screen.getByText(/5 Chronological Milestones \(2019 — Present\)/i),
    ).toBeInTheDocument();

    // Check headings for the 5 roles
    const headings = screen.getAllByRole('heading', { level: 3 });
    const headingTexts = headings.map((h) => h.textContent);
    expect(headingTexts).toContain('Senior Software Engineer');
    expect(headingTexts).toContain('Software Developer');
    expect(headingTexts).toContain('Senior Web Developer');
    expect(headingTexts).toContain('Junior Web Developer');
  });

  it('has the most recent experience expanded by default and allows toggling details', () => {
    render(<Experience experiences={content.experiences} />);

    // Default expanded: current role
    expect(
      screen.getByText('Hide Architectural & Delivery Details'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Designed role-based access control \(RBAC\)/i),
    ).toBeInTheDocument();

    // Toggle collapse on current role
    const hideBtn = screen.getByText('Hide Architectural & Delivery Details');
    fireEvent.click(hideBtn);

    // Now it should show View
    expect(
      screen.queryByText(/Designed role-based access control \(RBAC\)/i),
    ).not.toBeInTheDocument();
  });

  it('supports Expand All and Collapse All global actions', () => {
    render(<Experience experiences={content.experiences} />);

    const expandAllBtn = screen.getByRole('button', { name: /expand all details/i });
    fireEvent.click(expandAllBtn);

    // All 5 should be expanded
    const hideButtons = screen.getAllByText('Hide Architectural & Delivery Details');
    expect(hideButtons).toHaveLength(5);

    // Verified outcomes from multiple roles are visible
    expect(screen.getByText('Awarded Employee of the Year recognition for outstanding leadership and engineering contribution.')).toBeInTheDocument();
    expect(screen.getByText(/Key engineering contributor during organization scaling from 4 to 20\+ team members/i)).toBeInTheDocument();

    // Collapse All
    const collapseAllBtn = screen.getByRole('button', { name: /collapse all/i });
    fireEvent.click(collapseAllBtn);

    expect(
      screen.queryByText('Hide Architectural & Delivery Details'),
    ).not.toBeInTheDocument();
  });

  it('expands experience and highlights stage when clicking milestone in tracker', () => {
    // Mock scrollIntoView
    window.HTMLElement.prototype.scrollIntoView = vi.fn();

    render(<Experience experiences={content.experiences} />);

    const tracker = screen.getByRole('tablist', { name: /career progression milestones/i });
    const tabs = within(tracker).getAllByRole('tab');
    expect(tabs).toHaveLength(5);

    // Click Stage 02 (2020-2022)
    const stage2Tab = tabs[1];
    expect(stage2Tab).toBeDefined();
    fireEvent.click(stage2Tab!);

    // Should expand 2020-2022 card details
    expect(
      screen.getByText(/Delivered multi-application architectures balancing diverse client constraints/i),
    ).toBeInTheDocument();
  });

  describe('CareerProgressionTracker Component', () => {
    it('renders the 5 progression milestones with correct chronological arc', () => {
      render(<CareerProgressionTracker activeId="exp-current" />);

      expect(screen.getByText(/Implementation → Ownership → Architecture → Leadership → Modern Systems/i)).toBeInTheDocument();
      expect(screen.getByText('STAGE 01')).toBeInTheDocument();
      expect(screen.getByText('STAGE 02')).toBeInTheDocument();
      expect(screen.getByText('STAGE 03')).toBeInTheDocument();
      expect(screen.getByText('STAGE 04')).toBeInTheDocument();
      expect(screen.getByText('STAGE 05')).toBeInTheDocument();

      const activeTab = screen.getByRole('tab', { selected: true });
      expect(activeTab).toHaveTextContent('Architecture & Modernization');
    });
  });

  describe('ExperienceCard Component', () => {
    it('renders role details, context, technologies and accessible disclosure panel', () => {
      const exp = content.experiences[0]!;
      const onToggle = vi.fn();

      const { rerender } = render(
        <ExperienceCard experience={exp} isExpanded={false} onToggleExpand={onToggle} />,
      );

      expect(screen.getByText('2023 – Present')).toBeInTheDocument();
      expect(screen.getByText(/STAGE 05/i)).toBeInTheDocument();
      expect(screen.getByText('Architecture, Modernization & Scale')).toBeInTheDocument();
      expect(screen.getByText(/Context: Enterprise Workflow & Modernization Systems/i)).toBeInTheDocument();

      const toggleButton = screen.getByRole('button', {
        name: /view architectural & delivery details/i,
      });
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(toggleButton);
      expect(onToggle).toHaveBeenCalledTimes(1);

      // Re-render expanded
      rerender(<ExperienceCard experience={exp} isExpanded={true} onToggleExpand={onToggle} />);
      const expandedButton = screen.getByRole('button', {
        name: /hide architectural & delivery details/i,
      });
      expect(expandedButton).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText(/Architectural Involvement/i)).toBeInTheDocument();
      expect(screen.getByText(/Responsibilities & Technical Scope/i)).toBeInTheDocument();
      expect(screen.getByText(/Collaboration & Leadership/i)).toBeInTheDocument();
    });
  });
});
