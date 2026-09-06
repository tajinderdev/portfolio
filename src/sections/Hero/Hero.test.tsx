import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Hero } from './Hero';
import { getPortfolioContent } from '@/content';

describe('Hero Section Component', () => {
  const content = getPortfolioContent();

  it('renders primary positioning headline and senior title', () => {
    render(<Hero profile={content.profile} />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /turning complex problems into practical software systems/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/SENIOR SOFTWARE ENGINEER · 7\+ YEARS/i)).toBeInTheDocument();
  });

  it('renders homepage promise from approved profile content', () => {
    render(<Hero profile={content.profile} />);
    expect(screen.getByText(content.profile.promise.headline)).toBeInTheDocument();
  });

  it('renders primary and secondary action CTAs with correct anchors', () => {
    render(<Hero profile={content.profile} />);
    const workCTA = screen.getByRole('link', { name: /explore selected work/i });
    const contactCTA = screen.getByRole('link', { name: /get in touch/i });

    expect(workCTA).toHaveAttribute('href', '#work');
    expect(contactCTA).toHaveAttribute('href', '#contact');
  });

  it('renders proof metrics (7+ years, 5 domains, global)', () => {
    render(<Hero profile={content.profile} />);
    expect(screen.getByText('7+')).toBeInTheDocument();
    expect(screen.getByText('Years Experience')).toBeInTheDocument();
    expect(screen.getByText('Business Domains')).toBeInTheDocument();
    expect(screen.getByText('US · UK · EU · AU')).toBeInTheDocument();
  });

  it('renders interactive Engineering Breadth component and updates detail on click', () => {
    render(<Hero profile={content.profile} />);
    expect(screen.getByLabelText('Engineering Breadth Map')).toBeInTheDocument();

    const archBtn = screen.getByRole('button', { name: /architecture/i });
    fireEvent.click(archBtn);
    expect(archBtn).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText(/System design, modular scalability/i)).toBeInTheDocument();
  });

  it('renders System Architecture Flow visualizer with accessible text and interactive tier selection', () => {
    render(<Hero profile={content.profile} />);
    expect(screen.getByLabelText('Interactive System Architecture Visualizer')).toBeInTheDocument();

    // Verify screen-reader alternative is present
    expect(
      screen.getByText(/Full stack architecture flow: Frontend/i),
    ).toBeInTheDocument();

    // Click API tier and verify principle details update
    const apiBtn = screen.getByRole('button', { name: /api & integration/i });
    fireEvent.click(apiBtn);
    expect(apiBtn).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText(/Strict validation, authentication, and error boundaries/i)).toBeInTheDocument();
  });
});
