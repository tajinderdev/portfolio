import { describe, it, expect } from 'vitest';
import { env } from './env';

describe('Environment Configuration', () => {
  it('loads default site URL if not provided', () => {
    expect(env.siteUrl).toBeDefined();
    expect(typeof env.siteUrl).toBe('string');
  });

  it('provides safe EmailJS configuration structure', () => {
    expect(env.emailJs).toHaveProperty('serviceId');
    expect(env.emailJs).toHaveProperty('templateId');
    expect(env.emailJs).toHaveProperty('publicKey');
    expect(env.emailJs).toHaveProperty('isConfigured');
    expect(typeof env.emailJs.isConfigured).toBe('boolean');
  });

  it('exposes boolean development/production flags', () => {
    expect(typeof env.isProduction).toBe('boolean');
    expect(typeof env.isDevelopment).toBe('boolean');
  });
});
