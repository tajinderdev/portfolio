import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useContactForm } from './useContactForm';
import type { ContactClient } from '@/services/contact/contactClient';

describe('useContactForm Hook', () => {
  const createMockClient = (overrides?: Partial<ContactClient>): ContactClient => ({
    sendContactMessage: vi.fn().mockResolvedValue({
      success: true,
      message: 'Thank you for reaching out.',
    }),
    ...overrides,
  });

  it('initializes with default empty values, idle status, and no errors', () => {
    const { result } = renderHook(() => useContactForm(createMockClient()));

    expect(result.current.values).toEqual({
      name: '',
      email: '',
      subject: '',
      message: '',
      _hp_verify: '',
    });
    expect(result.current.status).toBe('idle');
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.errors).toEqual({});
  });

  it('updates field values on handleChange', () => {
    const { result } = renderHook(() => useContactForm(createMockClient()));

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'John Doe' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.values.name).toBe('John Doe');
  });

  it('performs client-side validation on blur', () => {
    const { result } = renderHook(() => useContactForm(createMockClient()));

    act(() => {
      result.current.handleBlur({
        target: { name: 'email', value: 'not-an-email' },
      } as React.FocusEvent<HTMLInputElement>);
    });

    expect(result.current.errors.email).toBe('Please provide a valid email address.');
  });

  it('prevents submission and sets errors when required fields are empty', async () => {
    const mockClient = createMockClient();
    const { result } = renderHook(() => useContactForm(mockClient));

    const fakeEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent;

    await act(async () => {
      await result.current.handleSubmit(fakeEvent);
    });

    expect(result.current.errors.name).toBeDefined();
    expect(result.current.errors.email).toBeDefined();
    expect(result.current.errors.message).toBeDefined();
    expect(mockClient.sendContactMessage).not.toHaveBeenCalled();
    expect(result.current.status).toBe('idle');
  });

  it('successfully submits valid form data and transitions to success state', async () => {
    const mockClient = createMockClient();
    const { result } = renderHook(() => useContactForm(mockClient));

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Diana Prince' },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: 'email', value: 'diana@themyscira.gov' },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: 'subject', value: 'System Architecture' },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: 'message', value: 'We need help scaling our distributed architecture.' },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });

    const fakeEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent;

    await act(async () => {
      await result.current.handleSubmit(fakeEvent);
    });

    expect(mockClient.sendContactMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Diana Prince',
        email: 'diana@themyscira.gov',
        subject: 'System Architecture',
        message: 'We need help scaling our distributed architecture.',
        _hp_verify: '',
        _hp_time: expect.any(Number),
      })
    );
    expect(result.current.status).toBe('success');
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.statusMessage).toBe('Thank you for reaching out.');
  });

  it('handles server failure and transitions to error state', async () => {
    const mockClient = createMockClient({
      sendContactMessage: vi.fn().mockResolvedValue({
        success: false,
        message: 'Too many requests. Please wait a few minutes.',
      }),
    });
    const { result } = renderHook(() => useContactForm(mockClient));

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Diana Prince' },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: 'email', value: 'diana@themyscira.gov' },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: 'message', value: 'We need help scaling our distributed architecture.' },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent);
    });

    expect(result.current.status).toBe('error');
    expect(result.current.statusMessage).toBe('Too many requests. Please wait a few minutes.');
  });

  it('clears fields and resets status on resetForm', async () => {
    const mockClient = createMockClient();
    const { result } = renderHook(() => useContactForm(mockClient));

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Diana Prince' },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.resetForm();
    });

    expect(result.current.values.name).toBe('');
    expect(result.current.status).toBe('idle');
    expect(result.current.errors).toEqual({});
  });
});
