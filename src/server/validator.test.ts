import { describe, it, expect } from 'vitest';
import {
  validateAndSanitizeContactInput,
  type RawContactInput,
} from './validator.js';

describe('validateAndSanitizeContactInput', () => {
  const validPayload: RawContactInput = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    subject: 'Project Consultation',
    message: 'Hello Tajinder, I would like to discuss a potential collaboration.',
    _hp_verify: '',
    _hp_time: 1000,
  };

  describe('Valid Submissions', () => {
    it('passes validation with all valid fields and returns cleaned data', () => {
      const result = validateAndSanitizeContactInput(validPayload, 4000);

      expect(result.isValid).toBe(true);
      expect(result.isBot).toBe(false);
      expect(result.errors).toBeUndefined();
      expect(result.data).toEqual({
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        subject: 'Project Consultation',
        message: 'Hello Tajinder, I would like to discuss a potential collaboration.',
      });
    });

    it('defaults subject when subject is omitted', () => {
      const input: RawContactInput = {
        name: 'Alex Smith',
        email: 'alex@example.com',
        message: 'Interested in your architectural consulting services.',
      };

      const result = validateAndSanitizeContactInput(input);

      expect(result.isValid).toBe(true);
      expect(result.data?.subject).toBe('Portfolio Inquiry from Alex Smith');
    });

    it('defaults subject when subject is whitespace only', () => {
      const input: RawContactInput = {
        name: 'Alex Smith',
        email: 'alex@example.com',
        subject: '   \t  ',
        message: 'Interested in your architectural consulting services.',
      };

      const result = validateAndSanitizeContactInput(input);

      expect(result.isValid).toBe(true);
      expect(result.data?.subject).toBe('Portfolio Inquiry from Alex Smith');
    });

    it('trims leading and trailing whitespace from fields', () => {
      const input: RawContactInput = {
        name: '  Morgan Freeman  ',
        email: '  morgan@example.org  ',
        subject: '  System Design  ',
        message: '  Here is a message that has leading and trailing spaces.  ',
      };

      const result = validateAndSanitizeContactInput(input);

      expect(result.isValid).toBe(true);
      expect(result.data).toEqual({
        name: 'Morgan Freeman',
        email: 'morgan@example.org',
        subject: 'System Design',
        message: 'Here is a message that has leading and trailing spaces.',
      });
    });

    it('accepts exact boundary lengths for name, message, and subject', () => {
      const input: RawContactInput = {
        name: 'Bo', // exactly 2 chars
        email: 'bo@example.com',
        subject: 'A'.repeat(150), // exactly 150 chars
        message: 'A'.repeat(3000), // exactly 3000 chars
      };

      const result = validateAndSanitizeContactInput(input);

      expect(result.isValid).toBe(true);
      expect(result.data?.name).toHaveLength(2);
      expect(result.data?.subject).toHaveLength(150);
      expect(result.data?.message).toHaveLength(3000);
    });
  });

  describe('Required Field Validation', () => {
    it('fails when name is missing or empty', () => {
      const missingName = validateAndSanitizeContactInput({
        email: 'test@example.com',
        message: 'Valid length message here.',
      });
      expect(missingName.isValid).toBe(false);
      expect(missingName.errors).toHaveProperty('name');

      const emptyName = validateAndSanitizeContactInput({
        name: '   ',
        email: 'test@example.com',
        message: 'Valid length message here.',
      });
      expect(emptyName.isValid).toBe(false);
      expect(emptyName.errors).toHaveProperty('name');
    });

    it('fails when email is missing or empty', () => {
      const missingEmail = validateAndSanitizeContactInput({
        name: 'John Doe',
        message: 'Valid length message here.',
      });
      expect(missingEmail.isValid).toBe(false);
      expect(missingEmail.errors).toHaveProperty('email');

      const emptyEmail = validateAndSanitizeContactInput({
        name: 'John Doe',
        email: '  ',
        message: 'Valid length message here.',
      });
      expect(emptyEmail.isValid).toBe(false);
      expect(emptyEmail.errors).toHaveProperty('email');
    });

    it('fails when message is missing or empty', () => {
      const missingMsg = validateAndSanitizeContactInput({
        name: 'John Doe',
        email: 'test@example.com',
      });
      expect(missingMsg.isValid).toBe(false);
      expect(missingMsg.errors).toHaveProperty('message');

      const emptyMsg = validateAndSanitizeContactInput({
        name: 'John Doe',
        email: 'test@example.com',
        message: '   ',
      });
      expect(emptyMsg.isValid).toBe(false);
      expect(emptyMsg.errors).toHaveProperty('message');
    });

    it('fails when non-string types are provided for string fields', () => {
      const result = validateAndSanitizeContactInput({
        name: 12345,
        email: { address: 'bad' },
        message: ['array of stuff'],
      });

      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveProperty('name');
      expect(result.errors).toHaveProperty('email');
      expect(result.errors).toHaveProperty('message');
    });
  });

  describe('Length and Format Validation', () => {
    it('fails when name is shorter than 2 characters', () => {
      const result = validateAndSanitizeContactInput({
        name: 'A',
        email: 'test@example.com',
        message: 'Valid length message here.',
      });

      expect(result.isValid).toBe(false);
      expect(result.errors?.name).toBeDefined();
    });

    it('fails when name exceeds 100 characters', () => {
      const result = validateAndSanitizeContactInput({
        name: 'A'.repeat(101),
        email: 'test@example.com',
        message: 'Valid length message here.',
      });

      expect(result.isValid).toBe(false);
      expect(result.errors?.name).toBeDefined();
    });

    it('fails when message is shorter than 10 characters', () => {
      const result = validateAndSanitizeContactInput({
        name: 'John Doe',
        email: 'test@example.com',
        message: 'Too short',
      });

      expect(result.isValid).toBe(false);
      expect(result.errors?.message).toBeDefined();
    });

    it('fails when message exceeds 3000 characters', () => {
      const result = validateAndSanitizeContactInput({
        name: 'John Doe',
        email: 'test@example.com',
        message: 'A'.repeat(3001),
      });

      expect(result.isValid).toBe(false);
      expect(result.errors?.message).toBeDefined();
    });

    it('fails when subject exceeds 150 characters', () => {
      const result = validateAndSanitizeContactInput({
        name: 'John Doe',
        email: 'test@example.com',
        subject: 'S'.repeat(151),
        message: 'Valid length message here.',
      });

      expect(result.isValid).toBe(false);
      expect(result.errors?.subject).toBeDefined();
    });

    it('fails with invalid email formats', () => {
      const invalidEmails = [
        'plainaddress',
        '@missinguser.com',
        'user@.com',
        'user@domain',
        'user@domain..com',
        'user name@domain.com',
        'user@domain,com',
      ];

      for (const email of invalidEmails) {
        const result = validateAndSanitizeContactInput({
          name: 'John Doe',
          email,
          message: 'Valid length message here.',
        });
        expect(result.isValid).toBe(false);
        expect(result.errors).toHaveProperty('email');
      }
    });

    it('fails when email exceeds 254 characters', () => {
      const localPart = 'a'.repeat(245);
      const email = `${localPart}@example.com`; // 257 characters
      expect(email.length).toBeGreaterThan(254);

      const result = validateAndSanitizeContactInput({
        name: 'John Doe',
        email,
        message: 'Valid length message here.',
      });

      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveProperty('email');
    });

    it('accepts complex valid email addresses conforming to RFC 5322', () => {
      const validEmails = [
        'simple@example.com',
        'very.common@example.com',
        'disposable.style.email.with+symbol@example.com',
        'other.email-with-hyphen@example.com',
        'fully-qualified-domain@example.co.uk',
        'user.name+tag+sorting@sub.domain.org',
      ];

      for (const email of validEmails) {
        const result = validateAndSanitizeContactInput({
          name: 'John Doe',
          email,
          message: 'Valid length message here.',
        });
        expect(result.isValid).toBe(true);
        expect(result.data?.email).toBe(email);
      }
    });
  });

  describe('Sanitization & Header Injection Prevention', () => {
    it('strips CRLF characters (\\r, \\n) from email and subject', () => {
      const input: RawContactInput = {
        name: 'Security Tester',
        email: 'tester\r\n@example.com',
        subject: 'Inquiry\r\nBcc: spam@victim.com\r\n',
        message: 'Message with preserved\nmultiple\r\nlines of content.',
      };

      const result = validateAndSanitizeContactInput(input);

      expect(result.isValid).toBe(true);
      expect(result.data?.email).toBe('tester@example.com');
      expect(result.data?.subject).toBe('InquiryBcc: spam@victim.com');
      // Message newlines must be preserved
      expect(result.data?.message).toContain('\n');
    });

    it('strips control characters from name and subject', () => {
      const input: RawContactInput = {
        name: 'Jane\x00\x07Doe',
        email: 'jane@example.com',
        subject: 'Urgent\x1B\x08 Request',
        message: 'Valid length message for testing.',
      };

      const result = validateAndSanitizeContactInput(input);

      expect(result.isValid).toBe(true);
      expect(result.data?.name).toBe('JaneDoe');
      expect(result.data?.subject).toBe('Urgent Request');
    });
  });

  describe('Bot & Abuse Prevention (Honeypot & Timing)', () => {
    it('flags isBot: true when honeypot field _hp_verify is populated', () => {
      const input: RawContactInput = {
        ...validPayload,
        _hp_verify: 'http://spam-link.ru',
      };

      const result = validateAndSanitizeContactInput(input, 5000);

      expect(result.isBot).toBe(true);
      expect(result.isValid).toBe(false);
      expect(result.data).toBeUndefined();
    });

    it('flags isBot: true when submission timing is less than 2000ms', () => {
      const clientMountTime = 10000;
      const fastSubmitTime = 11500; // 1500ms elapsed (< 2000ms)

      const input: RawContactInput = {
        ...validPayload,
        _hp_verify: '',
        _hp_time: clientMountTime,
      };

      const result = validateAndSanitizeContactInput(input, fastSubmitTime);

      expect(result.isBot).toBe(true);
      expect(result.isValid).toBe(false);
      expect(result.data).toBeUndefined();
    });

    it('flags isBot: false when submission timing is greater than or equal to 2000ms', () => {
      const clientMountTime = 10000;
      const validSubmitTime = 12500; // 2500ms elapsed (>= 2000ms)

      const input: RawContactInput = {
        ...validPayload,
        _hp_verify: '',
        _hp_time: clientMountTime,
      };

      const result = validateAndSanitizeContactInput(input, validSubmitTime);

      expect(result.isBot).toBe(false);
      expect(result.isValid).toBe(true);
    });

    it('flags isBot: true when _hp_time indicates a future timestamp', () => {
      const clientMountTime = 15000;
      const serverReceiveTime = 10000; // Elapsed is negative (-5000ms)

      const input: RawContactInput = {
        ...validPayload,
        _hp_time: clientMountTime,
      };

      const result = validateAndSanitizeContactInput(input, serverReceiveTime);

      expect(result.isBot).toBe(true);
      expect(result.isValid).toBe(false);
    });

    it('flags isBot: true when _hp_time is a malformed non-numeric string', () => {
      const input: RawContactInput = {
        ...validPayload,
        _hp_time: 'not-a-timestamp',
      };

      const result = validateAndSanitizeContactInput(input, 5000);

      expect(result.isBot).toBe(true);
      expect(result.isValid).toBe(false);
    });

    it('does not flag isBot when _hp_time is undefined/omitted in manual API calls', () => {
      const input: RawContactInput = {
        name: 'Manual Caller',
        email: 'manual@example.com',
        message: 'This is a message sent without timing token.',
      };

      const result = validateAndSanitizeContactInput(input);

      expect(result.isBot).toBe(false);
      expect(result.isValid).toBe(true);
    });
  });
});
