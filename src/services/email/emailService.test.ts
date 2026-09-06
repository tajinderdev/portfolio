import { describe, it, expect } from 'vitest';
import { emailService } from './emailService';

describe('EmailService', () => {
  it('validates required fields', async () => {
    const result = await emailService.sendMessage({
      name: '',
      email: '',
      subject: '',
      message: '',
    });

    expect(result.success).toBe(false);
    expect(result.message).toContain('Please provide all required fields');
  });

  it('validates email formatting', async () => {
    const result = await emailService.sendMessage({
      name: 'Test Visitor',
      email: 'invalid-email-address',
      subject: 'Inquiry',
      message: 'Hello world',
    });

    expect(result.success).toBe(false);
    expect(result.message).toContain('valid email address');
  });

  it('silently absorbs bot submissions via honeypot field', async () => {
    const result = await emailService.sendMessage({
      name: 'Bot',
      email: 'bot@spam.com',
      subject: 'Spam',
      message: 'Spam content',
      botField: 'I am a spam bot',
    });

    expect(result.success).toBe(true);
  });
});
