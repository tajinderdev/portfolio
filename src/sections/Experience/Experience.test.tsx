import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Experience } from './Experience';
import { CareerProgressionTracker } from './CareerProgressionTracker';
import { ExperienceCard } from './ExperienceCard';
import { ExperienceModal } from './ExperienceModal';
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
        name: /professional experience/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders all 5 chronological experience milestones in horizontal cards', () => {
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

  it('opens detailed popup modal when clicking on a milestone card and closes on close button', () => {
    render(<Experience experiences={content.experiences} />);

    // Initially modal is not open
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Click on the first card
    const viewDetailButtons = screen.getAllByText('View Details');
    expect(viewDetailButtons.length).toBeGreaterThanOrEqual(5);
    fireEvent.click(viewDetailButtons[0]!);

    // Modal dialog is now visible with full details
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(
      screen.getByText(/Designed role-based access control \(RBAC\)/i),
    ).toBeInTheDocument();

    // Close modal via close button
    const closeBtn = screen.getByRole('button', { name: /close details/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens modal for corresponding stage when clicking milestone in tracker', () => {
    render(<Experience experiences={content.experiences} />);

    const tracker = screen.getByRole('tablist', { name: /career progression milestones/i });
    const tabs = within(tracker).getAllByRole('tab');
    expect(tabs).toHaveLength(5);

    // Click Stage 02 (2020-2022)
    const stage2Tab = tabs[1];
    expect(stage2Tab).toBeDefined();
    fireEvent.click(stage2Tab!);

    // Modal opens with 2020-2022 card details
    expect(screen.getByRole('dialog')).toBeInTheDocument();
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
    it('renders role details, context, and triggers onOpenDetails', () => {
      const exp = content.experiences[0]!;
      const onOpen = vi.fn();

      render(<ExperienceCard experience={exp} isSelected={false} onOpenDetails={onOpen} />);

      expect(screen.getByText('2023 – Present')).toBeInTheDocument();
      expect(screen.getByText(/STAGE 05/i)).toBeInTheDocument();
      expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();

      const viewBtn = screen.getByRole('button', { name: /view details/i });
      fireEvent.click(viewBtn);
      expect(onOpen).toHaveBeenCalledTimes(1);
    });
  });

  describe('ExperienceModal Component', () => {
    it('renders full architectural, leadership, and outcome details in modal', () => {
      const exp = content.experiences[0]!;
      const onClose = vi.fn();
      const onSelect = vi.fn();

      render(
        <ExperienceModal
          experience={exp}
          experiences={content.experiences}
          isOpen={true}
          onClose={onClose}
          onSelectExperience={onSelect}
        />,
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText(/Architectural Involvement/i)).toBeInTheDocument();
      expect(screen.getByText(/Responsibilities & Technical Scope/i)).toBeInTheDocument();
      expect(screen.getByText(/Collaboration & Leadership/i)).toBeInTheDocument();
      expect(screen.getByText(/Verified Outcomes & Impact/i)).toBeInTheDocument();
    });
  });
});
