import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Approach } from './Approach';
import { getPortfolioContent } from '@/content';

describe('Approach Section Component', () => {
  const content = getPortfolioContent();

  it('renders all 7 engineering philosophy pillars with summaries and key practices', () => {
    render(<Approach themes={content.profile.philosophyThemes} />);

    expect(
      screen.getByRole('heading', { level: 2, name: /how i think, build, and ship/i }),
    ).toBeInTheDocument();

    // Check titles of themes
    expect(
      screen.getByRole('heading', {
        level: 4,
        name: 'Problem Understanding Before Implementation',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 4,
        name: 'Architecture & System-Level Thinking',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 4,
        name: 'Full-Stack Ownership & Reliability',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 4,
        name: 'Resilient Third-Party Integrations',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 4,
        name: 'Security & Pragmatic Modernization',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 4,
        name: 'Cross-Functional & Agile Delivery',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 4,
        name: 'AI-Augmented Engineering',
      }),
    ).toBeInTheDocument();

    // Check specific practice items
    expect(screen.getByText('Domain requirement mapping')).toBeInTheDocument();
    expect(screen.getByText('Layered fault isolation')).toBeInTheDocument();
    expect(screen.getByText('CRM data sync (Zoho & HubSpot)')).toBeInTheDocument();
    expect(screen.getByText('Role-Based Access Control (RBAC)')).toBeInTheDocument();
  });
});
