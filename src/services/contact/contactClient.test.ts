import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ContactApiClient } from './contactClient';

describe('ContactApiClient', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns success response when fetch returns 200 OK', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        success: true,
        message: 'Thank you for reaching out. Your message has been received.',
      }),
    });

    const client = new ContactApiClient({ fetchFn: mockFetch, endpoint: '/api/contact' });
    const result = await client.sendContactMessage({
      name: 'Bob',
      email: 'bob@example.com',
      message: 'Testing client submission',
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain('received');
    expect(mockFetch).toHaveBeenCalledWith('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Bob',
        email: 'bob@example.com',
        message: 'Testing client submission',
      }),
      signal: expect.any(AbortSignal),
    });
  });

  it('returns validation errors when server returns 400 Bad Request', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({
        success: false,
        message: 'Invalid submission.',
        errors: { email: 'Invalid email format' },
      }),
    });

    const client = new ContactApiClient({ fetchFn: mockFetch });
    const result = await client.sendContactMessage({
      name: 'Bob',
      email: 'not-an-email',
      message: 'Testing client submission',
    });

    expect(result.success).toBe(false);
    expect(result.errors?.email).toBe('Invalid email format');
  });

  it('handles network failure safely with a user-friendly error message', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const client = new ContactApiClient({ fetchFn: mockFetch });
    const result = await client.sendContactMessage({
      name: 'Bob',
      email: 'bob@example.com',
      message: 'Testing network failure',
    });

    expect(result.success).toBe(false);
    expect(result.message).toBe('Unable to connect to contact service. Please try again.');
  });
});
