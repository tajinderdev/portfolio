import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer Component', () => {
  it('renders Tajinder Singh identity and positioning', () => {
    render(<Footer />);
    expect(screen.getByText('Tajinder Singh')).toBeInTheDocument();
    expect(screen.getByText(/Building scalable, secure, and intelligent software systems/i)).toBeInTheDocument();
  });

  it('renders navigation links and social links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/tajinderdev');
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', 'https://www.linkedin.com/in/tajinder-developer/');
  });

  it('contains confidentiality notice and current copyright year', () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
    expect(screen.getByText(/preserve confidentiality/i)).toBeInTheDocument();
  });
});
