import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ResendEmailProvider } from './emailProvider';
import type { ValidatedContactData } from './validator';

describe('ResendEmailProvider', () => {
  const mockContactData: ValidatedContactData = {
    name: 'Alice Cooper',
    email: 'alice@example.com',
    subject: 'System Modernization Consultation',
    message: 'Hello, we would like to modernize our enterprise platform.',
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('runs in dev simulation mode when apiKey is omitted without calling fetch', async () => {
    const mockFetch = vi.fn();
    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});

    const provider = new ResendEmailProvider({
      apiKey: '',
      receiverEmail: 'tajinder@example.com',
      fetchFn: mockFetch,
    });

    const result = await provider.send(mockContactData);

    expect(result.success).toBe(true);
    expect(result.messageId).toContain('dev-simulation-');
    expect(mockFetch).not.toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('dispatches email to Resend API when apiKey is provided', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ id: 'resend_msg_abc123' }),
    });

    const provider = new ResendEmailProvider({
      apiKey: 're_test_key_123',
      receiverEmail: 'target@example.com',
      senderEmail: 'Portfolio <onboarding@resend.dev>',
      fetchFn: mockFetch,
    });

    const result = await provider.send(mockContactData);

    expect(result.success).toBe(true);
    expect(result.messageId).toBe('resend_msg_abc123');
    expect(mockFetch).toHaveBeenCalledWith('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer re_test_key_123',
        'Content-Type': 'application/json',
      },
      body: expect.stringContaining('"to":["target@example.com"]'),
    });

    // Verify payload includes reply_to and subject
    const firstCall = mockFetch.mock.calls[0];
    const callOptions = (firstCall?.[1] ?? {}) as RequestInit;
    const requestBody = JSON.parse((callOptions.body as string) ?? '{}');
    expect(requestBody.reply_to).toBe('alice@example.com');
    expect(requestBody.subject).toBe('System Modernization Consultation');
    expect(requestBody.text).toContain('From: Alice Cooper');
    expect(requestBody.html).toContain('Alice Cooper');
  });

  it('handles API failure safely without throwing or leaking the API key', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      json: async () => ({ message: 'Forbidden: Restricted key' }),
    });
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const provider = new ResendEmailProvider({
      apiKey: 're_secret_key_hidden',
      receiverEmail: 'target@example.com',
      fetchFn: mockFetch,
    });

    const result = await provider.send(mockContactData);

    expect(result.success).toBe(false);
    expect(result.error).toBe('Failed to deliver notification email.');
    expect(result.error).not.toContain('re_secret_key_hidden');
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('handles network error safely without throwing or leaking error details', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('Network connectivity lost'));
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const provider = new ResendEmailProvider({
      apiKey: 're_secret_key_hidden',
      receiverEmail: 'target@example.com',
      fetchFn: mockFetch,
    });

    const result = await provider.send(mockContactData);

    expect(result.success).toBe(false);
    expect(result.error).toBe('Failed to deliver notification email.');
  });
});
