import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CaseStudies } from './CaseStudies';
import { getPortfolioContent } from '@/content';

describe('CaseStudies Section', () => {
  const content = getPortfolioContent();

  it('renders within anchored section #work with section header', () => {
    const { container } = render(<CaseStudies projects={content.projects} />);
    const section = container.querySelector('section#work');
    expect(section).toBeInTheDocument();

    expect(screen.getByText('01 / SELECTED WORK & CASE STUDIES')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /architectural teardowns of mission-critical production systems/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders all 4 case study selector tabs', () => {
    render(<CaseStudies projects={content.projects} />);

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(4);
  });

  it('renders the first case study in the details viewer by default', () => {
    render(<CaseStudies projects={content.projects} />);

    const firstProject = content.projects[0]!;
    const panel = screen.getByRole('tabpanel');
    expect(panel).toHaveAttribute('id', `casestudy-panel-${firstProject.id}`);
    expect(screen.getByRole('heading', { level: 3, name: firstProject.title })).toBeInTheDocument();
  });

  it('switches the case study details when a user clicks a different tab', () => {
    render(<CaseStudies projects={content.projects} />);

    const crmTab = screen.getByRole('tab', {
      name: /CRM-Integrated Business Platform/i,
    });
    fireEvent.click(crmTab);

    expect(crmTab).toHaveAttribute('aria-selected', 'true');
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'CRM-Integrated Business Platform',
      }),
    ).toBeInTheDocument();

    const crmProject = content.projects.find((p) => p.id === 'project-crm-platform')!;
    expect(screen.getByText(crmProject.reasoning.problem)).toBeInTheDocument();
  });
});
