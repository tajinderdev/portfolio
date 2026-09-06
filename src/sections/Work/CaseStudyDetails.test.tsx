import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CaseStudyDetails } from './CaseStudyDetails';
import { getPortfolioContent } from '@/content';

describe('CaseStudyDetails Component', () => {
  const content = getPortfolioContent();
  const caseStudy = content.projects[0]!; // Content Publishing Platform

  it('renders within tabpanel with correct accessibility attributes', () => {
    render(<CaseStudyDetails project={caseStudy} />);

    const panel = screen.getByRole('tabpanel');
    expect(panel).toHaveAttribute('id', `casestudy-panel-${caseStudy.id}`);
    expect(panel).toHaveAttribute('aria-labelledby', `casestudy-tab-${caseStudy.id}`);
  });

  it('renders all 11 engineering reasoning dimensions', () => {
    render(<CaseStudyDetails project={caseStudy} />);

    // 1. Context
    expect(screen.getByText(/engineering context & role/i)).toBeInTheDocument();
    expect(screen.getByText(caseStudy.reasoning.context)).toBeInTheDocument();

    // 2. Problem
    expect(screen.getByText(/core engineering challenge/i)).toBeInTheDocument();
    expect(screen.getByText(caseStudy.reasoning.problem)).toBeInTheDocument();

    // 3. Constraints
    expect(screen.getByText(/critical constraints/i)).toBeInTheDocument();
    expect(screen.getByText(caseStudy.reasoning.constraints[0]!)).toBeInTheDocument();

    // 4. Engineering Approach
    expect(screen.getByText(/engineering approach/i)).toBeInTheDocument();
    expect(screen.getByText(caseStudy.reasoning.engineeringApproach)).toBeInTheDocument();

    // 5. Architecture & Diagram
    expect(screen.getByText(/architecture & system thinking/i)).toBeInTheDocument();
    expect(screen.getByText(caseStudy.reasoning.architectureThinking)).toBeInTheDocument();
    expect(screen.getByRole('figure')).toBeInTheDocument();

    // 6. Integrations
    expect(screen.getByText(/integrations & external systems/i)).toBeInTheDocument();
    expect(screen.getByText(caseStudy.reasoning.integrations[0]!)).toBeInTheDocument();

    // 7. Security
    expect(screen.getByText(/security considerations/i)).toBeInTheDocument();
    expect(screen.getByText(caseStudy.reasoning.securityConsiderations[0]!)).toBeInTheDocument();

    // 8. Performance
    expect(screen.getByText(/performance & reliability/i)).toBeInTheDocument();
    expect(screen.getByText(caseStudy.reasoning.performanceConsiderations[0]!)).toBeInTheDocument();

    // 9. Delivery & Collaboration
    expect(screen.getByText(/delivery & collaboration/i)).toBeInTheDocument();
    expect(screen.getByText(caseStudy.reasoning.deliveryCollaboration)).toBeInTheDocument();

    // 10. Outcome
    expect(screen.getByText(/verified outcome/i)).toBeInTheDocument();
    expect(screen.getByText(caseStudy.reasoning.outcome)).toBeInTheDocument();

    // 11. Engineering Insight
    expect(screen.getByText(/architectural insight/i)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(caseStudy.reasoning.engineeringInsight)),
    ).toBeInTheDocument();
  });

  it('renders technology tags for the case study', () => {
    render(<CaseStudyDetails project={caseStudy} />);

    caseStudy.technologies.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });
});
