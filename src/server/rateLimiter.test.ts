import { describe, it, expect, beforeEach } from 'vitest';
import { RateLimiter, defaultRateLimiter } from './rateLimiter.js';

describe('RateLimiter', () => {
  let limiter: RateLimiter;

  beforeEach(() => {
    limiter = new RateLimiter({
      windowMs: 60 * 1000, // 1 minute window for tests
      maxRequests: 3,
    });
  });

  it('allows requests within the allowed threshold', () => {
    const now = 10000;

    const res1 = limiter.check('192.168.1.1', now);
    expect(res1.allowed).toBe(true);
    expect(res1.limit).toBe(3);
    expect(res1.remaining).toBe(2);

    const res2 = limiter.check('192.168.1.1', now + 1000);
    expect(res2.allowed).toBe(true);
    expect(res2.remaining).toBe(1);

    const res3 = limiter.check('192.168.1.1', now + 2000);
    expect(res3.allowed).toBe(true);
    expect(res3.remaining).toBe(0);
  });

  it('blocks the request when limit is exceeded', () => {
    const now = 10000;

    limiter.check('10.0.0.1', now);
    limiter.check('10.0.0.1', now + 1000);
    limiter.check('10.0.0.1', now + 2000);

    const blocked = limiter.check('10.0.0.1', now + 3000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.resetInSeconds).toBeGreaterThan(0);
    // Should reset 60 seconds after the first request (at 10000 + 60000 = 70000)
    // At now + 3000 = 13000, remaining seconds = (70000 - 13000) / 1000 = 57s
    expect(blocked.resetInSeconds).toBe(57);
  });

  it('tracks different IP addresses independently', () => {
    const now = 10000;

    limiter.check('1.1.1.1', now);
    limiter.check('1.1.1.1', now);
    limiter.check('1.1.1.1', now);
    const blockedIP1 = limiter.check('1.1.1.1', now);
    expect(blockedIP1.allowed).toBe(false);

    const allowedIP2 = limiter.check('2.2.2.2', now);
    expect(allowedIP2.allowed).toBe(true);
    expect(allowedIP2.remaining).toBe(2);
  });

  it('evicts expired timestamps and allows new requests after the window slides', () => {
    const startTime = 10000;

    limiter.check('192.168.1.100', startTime);
    limiter.check('192.168.1.100', startTime + 1000);
    limiter.check('192.168.1.100', startTime + 2000);

    // Blocked at 15 seconds
    expect(limiter.check('192.168.1.100', startTime + 5000).allowed).toBe(false);

    // After 61 seconds from start, the first request at 10000 has expired
    const timeAfterWindow = startTime + 61000;
    const res = limiter.check('192.168.1.100', timeAfterWindow);
    expect(res.allowed).toBe(true);
  });

  it('supports reset() to clear all tracked rates', () => {
    limiter.check('192.168.1.5', 1000);
    limiter.check('192.168.1.5', 1000);
    limiter.check('192.168.1.5', 1000);
    expect(limiter.check('192.168.1.5', 1000).allowed).toBe(false);

    limiter.reset();

    expect(limiter.check('192.168.1.5', 1000).allowed).toBe(true);
  });

  it('defaultRateLimiter has a 15-minute window and 5 max requests', () => {
    expect(defaultRateLimiter).toBeInstanceOf(RateLimiter);
    const res = defaultRateLimiter.check('test-client-ip', 0);
    expect(res.limit).toBe(5);
    expect(res.allowed).toBe(true);
    defaultRateLimiter.reset();
  });
});
