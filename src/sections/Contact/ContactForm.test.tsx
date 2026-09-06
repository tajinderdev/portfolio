import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ContactForm } from './ContactForm';
import type { ContactClient } from '@/services/contact/contactClient';

describe('ContactForm Component', () => {
  const createMockClient = (overrides?: Partial<ContactClient>): ContactClient => ({
    sendContactMessage: vi.fn().mockResolvedValue({
      success: true,
      message: 'Thank you for reaching out. Your message has been received.',
    }),
    ...overrides,
  });

  it('renders all fields, accessible labels, and submit button', () => {
    render(<ContactForm client={createMockClient()} />);

    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /send message/i })
    ).toBeInTheDocument();
  });

  it('has hidden honeypot field with aria-hidden and tabIndex -1', () => {
    const { container } = render(<ContactForm client={createMockClient()} />);
    const honeypot = container.querySelector(
      'input[name="_hp_verify"]'
    ) as HTMLInputElement;

    expect(honeypot).toBeInTheDocument();
    expect(honeypot).toHaveAttribute('aria-hidden', 'true');
    expect(honeypot).toHaveAttribute('tabindex', '-1');
  });

  it('renders validation errors with aria-describedby and aria-invalid on empty submit', async () => {
    render(<ContactForm client={createMockClient()} />);

    const submitBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitBtn);

    const nameInput = screen.getByLabelText(/your name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const messageInput = screen.getByLabelText(/message/i);

    expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    expect(messageInput).toHaveAttribute('aria-invalid', 'true');

    expect(screen.getByText('Please provide your name.')).toBeInTheDocument();
    expect(
      screen.getByText('Please provide a valid email address.')
    ).toBeInTheDocument();
    expect(screen.getByText('Please provide a message.')).toBeInTheDocument();
    expect(nameInput).toHaveFocus();
  });

  it('submits successfully and shows confirmation with reset button', async () => {
    const mockClient = createMockClient();
    render(<ContactForm client={mockClient} />);

    fireEvent.change(screen.getByLabelText(/your name/i), {
      target: { value: 'Bruce Wayne' },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'bruce@wayne-enterprises.com' },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'We are expanding our core infrastructure systems.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/your message has been received/i)
      ).toBeInTheDocument();
    });

    // Reset form button is displayed
    const resetBtn = screen.getByRole('button', { name: /send another message/i });
    expect(resetBtn).toBeInTheDocument();

    fireEvent.click(resetBtn);

    // Form returns to idle input state
    expect(screen.getByLabelText(/your name/i)).toHaveValue('');
  });

  it('displays error banner when server submission fails', async () => {
    const mockClient = createMockClient({
      sendContactMessage: vi.fn().mockResolvedValue({
        success: false,
        message: 'Too many requests. Please wait a few minutes.',
      }),
    });

    render(<ContactForm client={mockClient} />);

    fireEvent.change(screen.getByLabelText(/your name/i), {
      target: { value: 'Bruce Wayne' },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'bruce@wayne-enterprises.com' },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'We are expanding our core infrastructure systems.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/too many requests\. please wait a few minutes\./i)
      ).toBeInTheDocument();
    });
  });

  it('supports keyboard-only form interaction and correct tab order', () => {
    const { container } = render(<ContactForm client={createMockClient()} />);

    const nameInput = screen.getByLabelText(/your name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitBtn = screen.getByRole('button', { name: /send message/i });
    const honeypot = container.querySelector('input[name="_hp_verify"]') as HTMLInputElement;

    // Focus starts on name
    act(() => {
      nameInput.focus();
    });
    expect(document.activeElement).toBe(nameInput);

    act(() => {
      emailInput.focus();
    });
    expect(document.activeElement).toBe(emailInput);

    act(() => {
      subjectInput.focus();
    });
    expect(document.activeElement).toBe(subjectInput);

    act(() => {
      messageInput.focus();
    });
    expect(document.activeElement).toBe(messageInput);

    act(() => {
      submitBtn.focus();
    });
    expect(document.activeElement).toBe(submitBtn);

    // Honeypot is removed from tab flow
    expect(honeypot.tabIndex).toBe(-1);
  });

  it('provides mobile-friendly form attributes (autocomplete, email type)', () => {
    render(<ContactForm client={createMockClient()} />);

    const nameInput = screen.getByLabelText(/your name/i);
    expect(nameInput).toHaveAttribute('autocomplete', 'name');

    const emailInput = screen.getByLabelText(/email address/i);
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('autocomplete', 'email');

    const submitBtn = screen.getByRole('button', { name: /send message/i });
    expect(submitBtn.className).toContain('w-full');
  });
});
