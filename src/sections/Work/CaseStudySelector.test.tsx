import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CaseStudySelector } from './CaseStudySelector';
import { getPortfolioContent } from '@/content';

describe('CaseStudySelector Component', () => {
  const content = getPortfolioContent();

  it('renders all 4 case study tabs in an accessible tablist', () => {
    render(
      <CaseStudySelector
        projects={content.projects}
        activeId="project-content-platform"
        onSelect={vi.fn()}
      />,
    );

    const tablist = screen.getByRole('tablist', {
      name: /case studies and architecture teardowns/i,
    });
    expect(tablist).toBeInTheDocument();

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(4);

    expect(screen.getByText('Enterprise Content Publishing Platform')).toBeInTheDocument();
    expect(screen.getByText('Subscription & Customer Management Platform')).toBeInTheDocument();
    expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
    expect(screen.getByText('CRM-Integrated Business Platform')).toBeInTheDocument();
  });

  it('sets aria-selected and tabIndex on active and inactive tabs', () => {
    render(
      <CaseStudySelector
        projects={content.projects}
        activeId="project-ecommerce-platform"
        onSelect={vi.fn()}
      />,
    );

    const ecommerceTab = screen.getByRole('tab', { name: /E-commerce Platform/i });
    const contentTab = screen.getByRole('tab', {
      name: /Enterprise Content Publishing Platform/i,
    });

    expect(ecommerceTab).toHaveAttribute('aria-selected', 'true');
    expect(ecommerceTab).toHaveAttribute('tabIndex', '0');

    expect(contentTab).toHaveAttribute('aria-selected', 'false');
    expect(contentTab).toHaveAttribute('tabIndex', '-1');
  });

  it('calls onSelect when a tab is clicked', () => {
    const onSelect = vi.fn();
    render(
      <CaseStudySelector
        projects={content.projects}
        activeId="project-content-platform"
        onSelect={onSelect}
      />,
    );

    const subscriptionTab = screen.getByRole('tab', {
      name: /Subscription & Customer Management Platform/i,
    });
    fireEvent.click(subscriptionTab);

    expect(onSelect).toHaveBeenCalledWith('project-subscription-platform');
  });

  it('navigates tabs using ArrowRight, ArrowLeft, Home, and End keys', () => {
    const onSelect = vi.fn();
    render(
      <CaseStudySelector
        projects={content.projects}
        activeId="project-content-platform"
        onSelect={onSelect}
      />,
    );

    const firstTab = screen.getByRole('tab', {
      name: /Enterprise Content Publishing Platform/i,
    });

    // ArrowRight moves to next tab
    fireEvent.keyDown(firstTab, { key: 'ArrowRight' });
    expect(onSelect).toHaveBeenCalledWith(content.projects[1]?.id);

    // End key moves to last tab
    fireEvent.keyDown(firstTab, { key: 'End' });
    expect(onSelect).toHaveBeenCalledWith(content.projects[content.projects.length - 1]?.id);

    // ArrowLeft wraps from first to last
    fireEvent.keyDown(firstTab, { key: 'ArrowLeft' });
    expect(onSelect).toHaveBeenCalledWith(content.projects[content.projects.length - 1]?.id);

    // Home key moves to first tab
    fireEvent.keyDown(firstTab, { key: 'Home' });
    expect(onSelect).toHaveBeenCalledWith(content.projects[0]?.id);
  });
});
