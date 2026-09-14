import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CaseStudies } from './CaseStudies';
import { CaseStudyModal } from './CaseStudyModal';
import { getPortfolioContent } from '@/content';

describe('CaseStudies Section', () => {
  const content = getPortfolioContent();

  it('renders within anchored section #work with section header', () => {
    const { container } = render(<CaseStudies projects={content.projects} />);
    const section = container.querySelector('section#work');
    expect(section).toBeInTheDocument();

    expect(screen.getByText('01 / SELECTED WORK')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /case studies/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders all 4 case study selector tabs', () => {
    render(<CaseStudies projects={content.projects} />);

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(4);
  });

  it('opens case study modal when clicking a case study card', () => {
    render(<CaseStudies projects={content.projects} />);

    const crmTab = screen.getByRole('tab', {
      name: /CRM-Integrated Business Platform/i,
    });
    fireEvent.click(crmTab);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'CRM-Integrated Business Platform',
      }),
    ).toBeInTheDocument();

    const crmProject = content.projects.find((p) => p.id === 'project-crm-platform')!;
    expect(screen.getByText(crmProject.reasoning.problem)).toBeInTheDocument();
  });

  describe('CaseStudyModal Component', () => {
    const mockProject = content.projects[0]!;

    it('renders modal when open and handles close action', () => {
      const onClose = vi.fn();
      const onSelectProject = vi.fn();

      render(
        <CaseStudyModal
          project={mockProject}
          projects={content.projects}
          isOpen={true}
          onClose={onClose}
          onSelectProject={onSelectProject}
        />,
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: mockProject.title })).toBeInTheDocument();

      const closeBtn = screen.getByRole('button', { name: /close case study details/i });
      fireEvent.click(closeBtn);
      expect(onClose).toHaveBeenCalled();
    });
  });
});
