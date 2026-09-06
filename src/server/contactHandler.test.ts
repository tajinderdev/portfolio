import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleContactRequest, type ServerRequest } from './contactHandler.js';
import { RateLimiter } from './rateLimiter.js';
import type { EmailProvider } from './emailProvider.js';

describe('handleContactRequest', () => {
  let mockEmailProvider: EmailProvider;
  let testLimiter: RateLimiter;

  const validBody = {
    name: 'Sarah Connor',
    email: 'sarah@example.com',
    subject: 'Security Audit',
    message: 'We would like to request an architecture and security audit.',
    _hp_verify: '',
    _hp_time: 1000,
  };

  beforeEach(() => {
    testLimiter = new RateLimiter({ windowMs: 60000, maxRequests: 3 });
    mockEmailProvider = {
      send: vi.fn().mockResolvedValue({ success: true, messageId: 'msg_test_123' }),
    };
  });

  it('rejects non-POST HTTP methods with 405 Method Not Allowed', async () => {
    const req: ServerRequest = {
      method: 'GET',
      ip: '127.0.0.1',
      body: {},
    };

    const res = await handleContactRequest(req, {
      rateLimiter: testLimiter,
      emailProvider: mockEmailProvider,
    });

    expect(res.status).toBe(405);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('Method Not Allowed');
    expect(res.headers?.Allow).toBe('POST');
  });

  it('rejects oversized payloads (> 10KB) with 413 Payload Too Large', async () => {
    const req: ServerRequest = {
      method: 'POST',
      ip: '127.0.0.1',
      contentLength: 10241,
      body: validBody,
    };

    const res = await handleContactRequest(req, {
      rateLimiter: testLimiter,
      emailProvider: mockEmailProvider,
    });

    expect(res.status).toBe(413);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('exceeds allowed size');
  });

  it('enforces rate limiting and returns 429 when threshold exceeded', async () => {
    const req: ServerRequest = {
      method: 'POST',
      ip: '192.168.1.50',
      body: validBody,
    };

    // Make 3 allowed requests
    await handleContactRequest(req, {
      rateLimiter: testLimiter,
      emailProvider: mockEmailProvider,
    });
    await handleContactRequest(req, {
      rateLimiter: testLimiter,
      emailProvider: mockEmailProvider,
    });
    await handleContactRequest(req, {
      rateLimiter: testLimiter,
      emailProvider: mockEmailProvider,
    });

    // 4th request should be rate-limited
    const res = await handleContactRequest(req, {
      rateLimiter: testLimiter,
      emailProvider: mockEmailProvider,
    });

    expect(res.status).toBe(429);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('Too many requests');
    expect(res.headers?.['Retry-After']).toBeDefined();
    expect(res.headers?.['X-RateLimit-Remaining']).toBe('0');
  });

  it('silently discards bot submissions (honeypot populated) with fake 200 OK without emailing', async () => {
    const req: ServerRequest = {
      method: 'POST',
      ip: '127.0.0.1',
      body: {
        ...validBody,
        _hp_verify: 'http://automated-spam.com',
      },
    };

    const res = await handleContactRequest(req, {
      rateLimiter: testLimiter,
      emailProvider: mockEmailProvider,
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(mockEmailProvider.send).not.toHaveBeenCalled();
  });

  it('silently discards automated submissions (< 2000ms elapsed) with fake 200 OK without emailing', async () => {
    const now = 5000;
    const req: ServerRequest = {
      method: 'POST',
      ip: '127.0.0.1',
      body: {
        ...validBody,
        _hp_time: 4000, // Only 1000ms elapsed
      },
    };

    const res = await handleContactRequest(req, {
      rateLimiter: testLimiter,
      emailProvider: mockEmailProvider,
      now,
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(mockEmailProvider.send).not.toHaveBeenCalled();
  });

  it('returns 400 Bad Request with field errors when input fails validation', async () => {
    const req: ServerRequest = {
      method: 'POST',
      ip: '127.0.0.1',
      body: {
        name: '',
        email: 'invalid-email',
        message: 'short',
      },
    };

    const res = await handleContactRequest(req, {
      rateLimiter: testLimiter,
      emailProvider: mockEmailProvider,
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toHaveProperty('name');
    expect(res.body.errors).toHaveProperty('email');
    expect(res.body.errors).toHaveProperty('message');
    expect(mockEmailProvider.send).not.toHaveBeenCalled();
  });

  it('successfully delivers email and returns 200 OK on valid submission', async () => {
    const req: ServerRequest = {
      method: 'POST',
      ip: '127.0.0.1',
      body: validBody,
    };

    const res = await handleContactRequest(req, {
      rateLimiter: testLimiter,
      emailProvider: mockEmailProvider,
      now: 10000, // 9000ms elapsed since _hp_time=1000
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toContain('received');
    expect(mockEmailProvider.send).toHaveBeenCalledWith({
      name: 'Sarah Connor',
      email: 'sarah@example.com',
      subject: 'Security Audit',
      message: 'We would like to request an architecture and security audit.',
    });
  });

  it('returns safe 500 response without leaking internal errors when provider fails', async () => {
    const failingEmailProvider: EmailProvider = {
      send: vi.fn().mockResolvedValue({
        success: false,
        error: 'Database connection failed at internal-db.aws.corp:5432 with credential secret-pass',
      }),
    };

    const req: ServerRequest = {
      method: 'POST',
      ip: '127.0.0.1',
      body: validBody,
    };

    const res = await handleContactRequest(req, {
      rateLimiter: testLimiter,
      emailProvider: failingEmailProvider,
      now: 10000,
    });

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe(
      'Unable to send message at this time. Please try again later.'
    );
    expect(res.body.message).not.toContain('internal-db');
    expect(res.body.message).not.toContain('secret-pass');
  });
});
