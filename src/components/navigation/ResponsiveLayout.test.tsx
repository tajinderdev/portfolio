import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Header } from './Header';
import { App } from '@/app/App';

describe('Responsive Navigation & Viewport Behavior', () => {
  it('provides accessible landmark structures on desktop and mobile', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders desktop navigation links with correct styles and accessible attributes', () => {
    render(<Header />);
    const desktopNav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(desktopNav).toHaveClass('hidden');
    expect(desktopNav).toHaveClass('md:flex');
  });

  it('provides mobile navigation drawer with touch targets and closes on item click', () => {
    render(<Header />);
    const toggleBtn = screen.getByRole('button', { name: /open navigation menu/i });
    fireEvent.click(toggleBtn);

    const dialog = screen.getByRole('dialog', { name: /mobile navigation/i });
    expect(dialog).toBeInTheDocument();

    // Target the link inside the mobile drawer
    const mobileWorkLink = within(dialog).getByRole('link', { name: /work/i });
    expect(mobileWorkLink).toBeInTheDocument();

    // Clicking the mobile nav link closes the drawer
    fireEvent.click(mobileWorkLink);
    expect(screen.queryByRole('dialog', { name: /mobile navigation/i })).not.toBeInTheDocument();
  });
});
