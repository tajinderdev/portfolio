import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Contact } from './Contact';

describe('Contact Section', () => {
  it('renders within anchored section #contact with section header', () => {
    const { container } = render(<Contact />);

    const section = container.querySelector('section#contact');
    expect(section).toBeInTheDocument();

    expect(screen.getByText(/07 \/ CONTACT/i)).toBeInTheDocument();
    expect(screen.getByText(/LET'S CONNECT/i)).toBeInTheDocument();
  });

  it('renders technical availability details and working preferences', () => {
    render(<Contact />);

    expect(screen.getByText(/Current Availability/i)).toBeInTheDocument();
    expect(screen.getByText(/Response Time/i)).toBeInTheDocument();
    expect(screen.getByText(/^Collaboration$/i)).toBeInTheDocument();
  });

  it('renders social links section with external links to GitHub, LinkedIn, Instagram, and Gmail', () => {
    render(<Contact />);

    expect(
      screen.getByText(/SOCIAL LINKS OF A NON-SOCIAL PERSON/i),
    ).toBeInTheDocument();

    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/tajinderdev');

    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/tajinder-developer/');

    const instagramLink = screen.getByRole('link', { name: /instagram/i });
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/tajindr_singh_');

    const gmailLink = screen.getByRole('link', { name: /gmail/i });
    expect(gmailLink).toHaveAttribute('href', 'mailto:imtj.human@gmail.com');
  });

  it('renders the contact form inside the section', () => {
    render(<Contact />);

    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });
});
