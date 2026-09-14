import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Approach } from './Approach';
import { ApproachModal } from './ApproachModal';
import { getPortfolioContent } from '@/content';

describe('Approach Section Component', () => {
  const content = getPortfolioContent();

  it('renders all 7 engineering philosophy pillars with summaries and titles', () => {
    render(<Approach themes={content.profile.philosophyThemes} />);

    expect(
      screen.getByRole('heading', { level: 2, name: /approach & methodology/i }),
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
  });

  it('opens modal on clicking a pillar card to show detailed key practices', () => {
    render(<Approach themes={content.profile.philosophyThemes} />);

    const understandingCard = screen.getByRole('heading', {
      level: 4,
      name: 'Problem Understanding Before Implementation',
    });
    fireEvent.click(understandingCard);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('Domain requirement mapping')).toBeInTheDocument();
  });

  describe('ApproachModal Component', () => {
    const mockTheme = content.profile.philosophyThemes[0]!;

    it('renders modal when open and handles close action', () => {
      const onClose = vi.fn();
      const onSelectTheme = vi.fn();

      render(
        <ApproachModal
          theme={mockTheme}
          themes={content.profile.philosophyThemes}
          isOpen={true}
          onClose={onClose}
          onSelectTheme={onSelectTheme}
        />,
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: mockTheme.title })).toBeInTheDocument();

      const closeBtn = screen.getByRole('button', { name: /close approach details/i });
      fireEvent.click(closeBtn);
      expect(onClose).toHaveBeenCalled();
    });
  });
});
