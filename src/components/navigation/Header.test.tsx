import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';

describe('Header & Navigation Component', () => {
  it('renders brand identity and role designation', () => {
    render(<Header />);
    expect(screen.getByText('Tajinder Singh')).toBeInTheDocument();
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
  });

  it('renders all primary desktop navigation links with correct anchors', () => {
    render(<Header />);
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(nav).toBeInTheDocument();

    const expectedLinks = [
      { name: 'Work', href: '#work' },
      { name: 'Experience', href: '#experience' },
      { name: 'Engineering', href: '#engineering' },
      { name: 'About', href: '#about' },
      { name: 'Contact', href: '#contact' },
    ];

    expectedLinks.forEach(({ name, href }) => {
      const link = screen.getAllByRole('link', { name: new RegExp(`^${name}`, 'i') })[0];
      expect(link).toHaveAttribute('href', href);
    });
  });

  it('toggles mobile menu on button click and updates aria-expanded', () => {
    render(<Header />);
    const toggleBtn = screen.getByRole('button', { name: /open navigation menu/i });
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

    // Open menu
    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog', { name: /mobile navigation/i })).toBeInTheDocument();

    // Close menu
    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes mobile menu when Escape key is pressed', () => {
    render(<Header />);
    const toggleBtn = screen.getByRole('button', { name: /open navigation menu/i });
    fireEvent.click(toggleBtn);
    expect(screen.getByRole('dialog', { name: /mobile navigation/i })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: /mobile navigation/i })).not.toBeInTheDocument();
  });
});
