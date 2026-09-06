/**
 * Backend Contact Form Validator & Sanitizer
 *
 * Implements strict server-side validation, sanitization against header injection,
 * and bot detection (honeypot & interaction timing).
 */

export interface RawContactInput {
  readonly name?: unknown;
  readonly email?: unknown;
  readonly subject?: unknown;
  readonly message?: unknown;
  readonly _hp_verify?: unknown;
  readonly _hp_time?: unknown;
}

export interface ValidatedContactData {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}

export interface ValidationResult {
  readonly isValid: boolean;
  readonly isBot: boolean;
  readonly data?: ValidatedContactData;
  readonly errors?: Record<string, string>;
}

// RFC 5322 compliant email regex pattern (safe against ReDoS)
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// ASCII control characters excluding tab, carriage return, and newline (\x09, \x0A, \x0D)
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS_REGEX = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

// CRLF characters for preventing email header injection in single-line headers
const CRLF_REGEX = /[\r\n]/g;

export function validateAndSanitizeContactInput(
  input: RawContactInput,
  receivedAt: number = Date.now()
): ValidationResult {
  // 1. Bot Detection: Honeypot Check
  if (typeof input._hp_verify === 'string' && input._hp_verify.trim().length > 0) {
    return {
      isValid: false,
      isBot: true,
    };
  }

  // 2. Bot Detection: Interaction Timing Check (Minimum 2000ms elapsed)
  if (input._hp_time !== undefined && input._hp_time !== null && input._hp_time !== '') {
    const clientTimestamp = Number(input._hp_time);
    if (!Number.isFinite(clientTimestamp)) {
      return {
        isValid: false,
        isBot: true,
      };
    }

    const elapsed = receivedAt - clientTimestamp;
    // If elapsed is under 2000ms or negative (future timestamp), flag as bot
    if (elapsed < 2000 || elapsed < 0) {
      return {
        isValid: false,
        isBot: true,
      };
    }
  }

  const errors: Record<string, string> = {};

  // 3. Name Validation & Sanitization
  let sanitizedName = '';
  if (typeof input.name !== 'string' || !input.name.trim()) {
    errors.name = 'Please provide your name.';
  } else {
    sanitizedName = input.name
      .replace(CONTROL_CHARS_REGEX, '')
      .replace(CRLF_REGEX, ' ')
      .trim();

    if (sanitizedName.length < 2) {
      errors.name = 'Name must be at least 2 characters long.';
    } else if (sanitizedName.length > 100) {
      errors.name = 'Name cannot exceed 100 characters.';
    }
  }

  // 4. Email Validation & Sanitization
  let sanitizedEmail = '';
  if (typeof input.email !== 'string' || !input.email.trim()) {
    errors.email = 'Please provide a valid email address.';
  } else {
    // Strip CRLF to prevent SMTP header injection
    sanitizedEmail = input.email
      .replace(CONTROL_CHARS_REGEX, '')
      .replace(CRLF_REGEX, '')
      .trim();

    if (sanitizedEmail.length > 254) {
      errors.email = 'Email address cannot exceed 254 characters.';
    } else if (!EMAIL_REGEX.test(sanitizedEmail)) {
      errors.email = 'Please provide a valid email address.';
    }
  }

  // 5. Subject Sanitization & Fallback
  let sanitizedSubject = '';
  if (typeof input.subject === 'string' && input.subject.trim().length > 0) {
    sanitizedSubject = input.subject
      .replace(CONTROL_CHARS_REGEX, '')
      .replace(CRLF_REGEX, '')
      .trim();

    if (sanitizedSubject.length > 150) {
      errors.subject = 'Subject cannot exceed 150 characters.';
    }
  } else {
    sanitizedSubject = sanitizedName
      ? `Portfolio Inquiry from ${sanitizedName}`
      : 'Portfolio Inquiry';
  }

  // 6. Message Validation & Sanitization
  let sanitizedMessage = '';
  if (typeof input.message !== 'string' || !input.message.trim()) {
    errors.message = 'Please provide a message.';
  } else {
    // Strip dangerous control characters, but preserve tabs, spaces, and newlines
    sanitizedMessage = input.message.replace(CONTROL_CHARS_REGEX, '').trim();

    if (sanitizedMessage.length < 10) {
      errors.message = 'Message must be at least 10 characters long.';
    } else if (sanitizedMessage.length > 3000) {
      errors.message = 'Message cannot exceed 3,000 characters.';
    }
  }

  // 7. Evaluate Validation Outcome
  if (Object.keys(errors).length > 0) {
    return {
      isValid: false,
      isBot: false,
      errors,
    };
  }

  return {
    isValid: true,
    isBot: false,
    data: {
      name: sanitizedName,
      email: sanitizedEmail,
      subject: sanitizedSubject,
      message: sanitizedMessage,
    },
  };
}
