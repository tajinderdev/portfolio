/**
 * In-Memory Sliding-Window Rate Limiter
 *
 * Enforces per-IP request limits within a rolling time window.
 * Lightweight, zero-dependency, suitable for serverless and dev middleware runtimes.
 */

export interface RateLimitResult {
  readonly allowed: boolean;
  readonly limit: number;
  readonly remaining: number;
  readonly resetInSeconds: number;
}

export interface RateLimiterOptions {
  readonly windowMs: number;
  readonly maxRequests: number;
}

const DEFAULT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const DEFAULT_MAX_REQUESTS = 5;

export class RateLimiter {
  private readonly windowMs: number;
  private readonly maxRequests: number;
  private readonly hits = new Map<string, number[]>();

  constructor(options?: Partial<RateLimiterOptions>) {
    this.windowMs = options?.windowMs ?? DEFAULT_WINDOW_MS;
    this.maxRequests = options?.maxRequests ?? DEFAULT_MAX_REQUESTS;
  }

  check(ip: string, now: number = Date.now()): RateLimitResult {
    const windowStart = now - this.windowMs;
    const existingHits = this.hits.get(ip) ?? [];

    // Filter out hits older than the current sliding window
    const recentHits = existingHits.filter((timestamp) => timestamp > windowStart);

    if (recentHits.length >= this.maxRequests) {
      // Oldest request in the active window determines the reset point
      const oldestHit = recentHits[0] ?? now;
      const resetTime = oldestHit + this.windowMs;
      const resetInSeconds = Math.max(1, Math.ceil((resetTime - now) / 1000));

      this.hits.set(ip, recentHits);

      return {
        allowed: false,
        limit: this.maxRequests,
        remaining: 0,
        resetInSeconds,
      };
    }

    // Record the current hit
    recentHits.push(now);
    this.hits.set(ip, recentHits);

    return {
      allowed: true,
      limit: this.maxRequests,
      remaining: this.maxRequests - recentHits.length,
      resetInSeconds: 0,
    };
  }

  reset(): void {
    this.hits.clear();
  }
}

export const defaultRateLimiter = new RateLimiter();
