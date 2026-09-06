/**
 * Serverless Contact Handler Core
 *
 * Implements the request processing pipeline:
 * 1. HTTP method check (POST only)
 * 2. Payload size guard (max 10KB)
 * 3. Sliding-window IP rate limiting
 * 4. Bot honeypot & timing detection (silent discard)
 * 5. Strict schema validation & sanitization
 * 6. Email dispatch via provider
 * 7. Safe error responses
 */

import {
  validateAndSanitizeContactInput,
  type RawContactInput,
} from './validator.js';
import { defaultRateLimiter, type RateLimiter } from './rateLimiter.js';
import { defaultEmailProvider, type EmailProvider } from './emailProvider.js';

export interface ServerRequest {
  readonly method?: string;
  readonly body?: unknown;
  readonly ip?: string;
  readonly contentLength?: number;
}

export interface ServerResponseBody {
  readonly success: boolean;
  readonly message: string;
  readonly errors?: Record<string, string>;
}

export interface ServerResponse {
  readonly status: number;
  readonly body: ServerResponseBody;
  readonly headers?: Record<string, string>;
}

export interface ContactHandlerOptions {
  readonly rateLimiter?: RateLimiter;
  readonly emailProvider?: EmailProvider;
  readonly now?: number;
}

const MAX_PAYLOAD_BYTES = 10 * 1024; // 10KB limit

export async function handleContactRequest(
  req: ServerRequest,
  options?: ContactHandlerOptions
): Promise<ServerResponse> {
  const now = options?.now ?? Date.now();

  // 1. HTTP Method Check
  const method = (req.method ?? 'POST').toUpperCase();
  if (method !== 'POST') {
    return {
      status: 405,
      body: {
        success: false,
        message: 'Method Not Allowed. Only POST requests are supported.',
      },
      headers: {
        Allow: 'POST',
      },
    };
  }

  // 2. Payload Size Check
  const declaredLength = req.contentLength ?? 0;
  const bodyString = req.body ? JSON.stringify(req.body) : '';
  const calculatedLength = Buffer.byteLength(bodyString, 'utf8');

  if (declaredLength > MAX_PAYLOAD_BYTES || calculatedLength > MAX_PAYLOAD_BYTES) {
    return {
      status: 413,
      body: {
        success: false,
        message: 'Submission payload exceeds allowed size limit (10KB).',
      },
    };
  }

  // 3. Sliding-Window Rate Limiting
  const clientIp = req.ip || '127.0.0.1';
  const limiter = options?.rateLimiter ?? defaultRateLimiter;
  const rateLimitResult = limiter.check(clientIp, now);

  if (!rateLimitResult.allowed) {
    return {
      status: 429,
      body: {
        success: false,
        message: 'Too many requests. Please wait a few minutes before trying again.',
      },
      headers: {
        'Retry-After': String(rateLimitResult.resetInSeconds),
        'X-RateLimit-Limit': String(rateLimitResult.limit),
        'X-RateLimit-Remaining': '0',
      },
    };
  }

  // 4. Input Validation, Sanitization & Bot Detection
  const rawInput = (req.body as RawContactInput) ?? {};
  const validation = validateAndSanitizeContactInput(rawInput, now);

  // Bot honeypot or timing guard tripped: silently discard to prevent bot adaptation
  if (validation.isBot) {
    return {
      status: 200,
      body: {
        success: true,
        message: 'Thank you for reaching out. Your message has been received.',
      },
    };
  }

  // Schema or validation failures
  if (!validation.isValid || !validation.data) {
    return {
      status: 400,
      body: {
        success: false,
        message: 'Invalid submission. Please check the form fields and try again.',
        errors: validation.errors,
      },
    };
  }

  // 5. Email Dispatch
  const provider = options?.emailProvider ?? defaultEmailProvider;
  const dispatchResult = await provider.send(validation.data);

  if (!dispatchResult.success) {
    return {
      status: 500,
      body: {
        success: false,
        message: 'Unable to send message at this time. Please try again later.',
      },
    };
  }

  return {
    status: 200,
    body: {
      success: true,
      message: 'Thank you for reaching out. Your message has been received.',
    },
  };
}
