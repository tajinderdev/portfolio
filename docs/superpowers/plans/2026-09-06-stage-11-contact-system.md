# Stage 11: Contact Section & Secure Serverless Backend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the accessible, responsive `#contact` portfolio section and secure, zero-client-secret `/api/contact` serverless endpoint deployable on Vercel with zero paid API keys and full local Vite dev-server parity.

**Architecture:** A decoupled client-server architecture where the React frontend (`useContactForm` + `ContactForm` + `Contact`) communicates with a platform-agnostic serverless handler (`src/server/contactHandler.ts`). The handler enforces strict server-side schema validation, anti-bot honeypots, interaction timing, and sliding-window IP rate limiting before dispatching emails via Resend's free tier (with graceful console simulation fallback in development/tests). Vercel natively serves `api/contact.ts`, while a lightweight Vite dev middleware serves `/api/contact` during local development.

**Tech Stack:** React 19, TypeScript, Vite 6, Tailwind CSS v4, Vitest, Testing Library, Resend REST API (Zero external npm backend dependencies; uses native `fetch`).

**Spec:** [`docs/superpowers/specs/2026-09-06-stage-11-contact-system-design.md`](file:///home/tj/projects/portfolio/docs/superpowers/specs/2026-09-06-stage-11-contact-system-design.md)

## Global Constraints

- Never expose private credentials, API keys, or Tajinder's personal email in client-side bundles or source code.
- Server validation is mandatory: never trust client input.
- Zero paid API key requirements: Resend free tier (or dev simulation mode) out of the box.
- All errors must be safe: no stack traces or server internals leaked to the client.
- Strict accessibility: explicit labels, `aria-describedby` error associations, `aria-invalid`, `aria-live="polite"` status notifications, visible focus rings, keyboard navigable.
- Zero build or type errors (`npm run typecheck`, `npm run lint`, `npm test`, `npm run build` must pass).

---

### Task 1: Backend Input Validator & Sanitizer

**Files:**
- Create: `src/server/validator.ts`
- Test: `src/server/validator.test.ts`

**Interfaces:**
- Produces:
  ```typescript
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

  export function validateAndSanitizeContactInput(
    input: RawContactInput,
    receivedAt?: number
  ): ValidationResult;
  ```

- [ ] **Step 1: Write the failing tests in `src/server/validator.test.ts`**
  Cover:
  - Valid submission passes validation and returns cleaned data.
  - Missing name, email, or message fails with specific error keys.
  - Invalid email regex fails with email error.
  - Name > 100 chars, message > 3000 chars, subject > 150 chars truncated or rejected.
  - CRLF characters (`\r`, `\n`) in subject and email stripped.
  - Honeypot populated (`_hp_verify`) flags `isBot: true`.
  - Submission timing < 2000ms flags `isBot: true`.

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run src/server/validator.test.ts`
  Expected: FAIL (module not found).

- [ ] **Step 3: Implement `src/server/validator.ts`**
  Implement strict string trimming, control char removal, RFC 5322 regex validation, honeypot check, and timing evaluation.

- [ ] **Step 4: Run test to verify it passes**
  Run: `npx vitest run src/server/validator.test.ts`
  Expected: PASS (all tests pass).

---

### Task 2: In-Memory Sliding-Window Rate Limiter

**Files:**
- Create: `src/server/rateLimiter.ts`
- Test: `src/server/rateLimiter.test.ts`

**Interfaces:**
- Produces:
  ```typescript
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

  export class RateLimiter {
    constructor(options?: Partial<RateLimiterOptions>);
    check(ip: string, now?: number): RateLimitResult;
    reset(): void;
  }

  export const defaultRateLimiter: RateLimiter;
  ```

- [ ] **Step 1: Write failing tests in `src/server/rateLimiter.test.ts`**
  Cover:
  - Allows first 5 requests within a 15-minute window for a specific IP.
  - Rejects 6th request with `allowed: false`, `remaining: 0`, and positive `resetInSeconds`.
  - Independent tracking across different IPs.
  - Timestamps outside the sliding window are pruned and allow new requests.

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run src/server/rateLimiter.test.ts`
  Expected: FAIL (module not found).

- [ ] **Step 3: Implement `src/server/rateLimiter.ts`**
  Implement timestamp filtering, window eviction, remaining quota calculation, and reset functionality.

- [ ] **Step 4: Run test to verify it passes**
  Run: `npx vitest run src/server/rateLimiter.test.ts`
  Expected: PASS (all tests pass).

---

### Task 3: Email Dispatch Provider (Resend & Dev Simulation)

**Files:**
- Create: `src/server/emailProvider.ts`
- Test: `src/server/emailProvider.test.ts`

**Interfaces:**
- Consumes: `ValidatedContactData` from `src/server/validator.ts`
- Produces:
  ```typescript
  export interface EmailDispatchResult {
    readonly success: boolean;
    readonly messageId?: string;
    readonly error?: string;
  }

  export interface EmailProvider {
    send(data: ValidatedContactData): Promise<EmailDispatchResult>;
  }

  export class ResendEmailProvider implements EmailProvider {
    constructor(config?: {
      readonly apiKey?: string;
      readonly receiverEmail?: string;
      readonly senderEmail?: string;
      readonly fetchFn?: typeof fetch;
    });
    send(data: ValidatedContactData): Promise<EmailDispatchResult>;
  }
  ```

- [ ] **Step 1: Write failing tests in `src/server/emailProvider.test.ts`**
  Cover:
  - Dispatches email via mock `fetch` to `https://api.resend.com/emails` with correct Authorization header, `to`, `reply_to`, `subject`, and HTML/text payload when API key is provided.
  - If API key is absent, logs safely to console and returns successful dev simulation result without calling fetch.
  - Handles API error response (e.g. 401 or 500) gracefully without throwing or leaking API key.

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run src/server/emailProvider.test.ts`
  Expected: FAIL (module not found).

- [ ] **Step 3: Implement `src/server/emailProvider.ts`**
  Implement `ResendEmailProvider` with HTML and plain text email formatting, error handling, and safe development fallback.

- [ ] **Step 4: Run test to verify it passes**
  Run: `npx vitest run src/server/emailProvider.test.ts`
  Expected: PASS (all tests pass).

---

### Task 4: Serverless Contact Handler, Vercel Function & Vite Dev Middleware

**Files:**
- Create: `src/server/contactHandler.ts`
- Create: `api/contact.ts`
- Modify: `vite.config.ts`
- Test: `src/server/contactHandler.test.ts`

**Interfaces:**
- Consumes: `validateAndSanitizeContactInput`, `defaultRateLimiter`, `ResendEmailProvider`
- Produces:
  ```typescript
  export interface ServerRequest {
    readonly method?: string;
    readonly body?: unknown;
    readonly ip?: string;
    readonly contentLength?: number;
  }

  export interface ServerResponse {
    readonly status: number;
    readonly body: {
      readonly success: boolean;
      readonly message: string;
      readonly errors?: Record<string, string>;
    };
    readonly headers?: Record<string, string>;
  }

  export function handleContactRequest(
    req: ServerRequest,
    options?: {
      rateLimiter?: RateLimiter;
      emailProvider?: EmailProvider;
    }
  ): Promise<ServerResponse>;
  ```

- [ ] **Step 1: Write failing tests in `src/server/contactHandler.test.ts`**
  Cover:
  - Rejects non-POST HTTP methods with 405 Method Not Allowed.
  - Rejects oversized payload (> 10KB) with 413 Payload Too Large.
  - Returns 429 when rate limiter limit is exceeded with `Retry-After` header.
  - Returns 200 silently when bot honeypot is tripped (no email sent).
  - Returns 400 with field errors on invalid input.
  - Dispatches email and returns 200 on valid input.
  - Returns 500 with generic safe error when email provider encounters an unexpected failure.

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run src/server/contactHandler.test.ts`
  Expected: FAIL (module not found).

- [ ] **Step 3: Implement `src/server/contactHandler.ts`**
  Implement the request pipeline connecting rate limiter, validator, and email provider.

- [ ] **Step 4: Create `api/contact.ts` for Vercel**
  Implement the Vercel Serverless Function entry point delegating to `handleContactRequest`.

- [ ] **Step 5: Add Vite dev middleware in `vite.config.ts`**
  Add a Vite plugin with `configureServer` hook that intercepts `POST /api/contact` during `npm run dev` and feeds it into `handleContactRequest`.

- [ ] **Step 6: Run test to verify it passes**
  Run: `npx vitest run src/server/contactHandler.test.ts`
  Expected: PASS (all tests pass).

---

### Task 5: Client-Side Contact API Client & `useContactForm` Hook

**Files:**
- Create: `src/services/contact/contactClient.ts`
- Create: `src/sections/Contact/useContactForm.ts`
- Test: `src/services/contact/contactClient.test.ts`
- Test: `src/sections/Contact/useContactForm.test.ts`

**Interfaces:**
- Produces:
  ```typescript
  export interface ContactFormValues {
    readonly name: string;
    readonly email: string;
    readonly subject: string;
    readonly message: string;
    readonly _hp_verify: string;
  }

  export type ContactFormStatus = 'idle' | 'submitting' | 'success' | 'error';

  export interface UseContactFormReturn {
    readonly values: ContactFormValues;
    readonly errors: Partial<Record<keyof ContactFormValues, string>>;
    readonly status: ContactFormStatus;
    readonly statusMessage: string;
    readonly isSubmitting: boolean;
    readonly isSuccess: boolean;
    readonly handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    readonly handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    readonly handleSubmit: (e: React.FormEvent) => Promise<void>;
    readonly resetForm: () => void;
  }

  export function useContactForm(client?: ContactClient): UseContactFormReturn;
  ```

- [ ] **Step 1: Write failing tests in `src/services/contact/contactClient.test.ts`**
  Cover:
  - Successful 200 response resolves with `{ success: true, message: "..." }`.
  - 400 validation error rejects or resolves with `{ success: false, errors: {...} }`.
  - Network failure / timeout returns safe error message.

- [ ] **Step 2: Implement `src/services/contact/contactClient.ts`**
  Implement `contactClient` with fetch call to `/api/contact`, 10-second timeout via `AbortController`, and response normalization.

- [ ] **Step 3: Run client tests to verify they pass**
  Run: `npx vitest run src/services/contact/contactClient.test.ts`
  Expected: PASS.

- [ ] **Step 4: Write failing tests in `src/sections/Contact/useContactForm.test.ts`**
  Cover:
  - Initial values are empty, status is `idle`, honeypot timestamp recorded on mount.
  - Updates field values on `handleChange`.
  - Validates required fields on submit.
  - Submits valid form via `contactClient` and transitions to `success` state.
  - Handles server error and transitions to `error` state.
  - `resetForm` clears fields and returns to `idle`.

- [ ] **Step 5: Implement `src/sections/Contact/useContactForm.ts`**
  Implement hook managing form state, validation, timing token, and submission lifecycle.

- [ ] **Step 6: Run tests to verify they pass**
  Run: `npx vitest run src/sections/Contact/useContactForm.test.ts`
  Expected: PASS (all tests pass).

---

### Task 6: Contact Section Components & Homepage Integration

**Files:**
- Create: `src/sections/Contact/ContactForm.tsx`
- Create: `src/sections/Contact/Contact.tsx`
- Create: `src/sections/Contact/index.ts`
- Modify: `src/sections/index.ts`
- Modify: `src/app/App.tsx`
- Modify: `src/app/App.test.tsx`
- Test: `src/sections/Contact/ContactForm.test.tsx`
- Test: `src/sections/Contact/Contact.test.tsx`

- [ ] **Step 1: Write tests in `src/sections/Contact/ContactForm.test.tsx`**
  Cover:
  - Renders all fields (`name`, `email`, `subject`, `message`) and submit button.
  - Hidden honeypot field has `aria-hidden="true"` and `tabIndex={-1}`.
  - Inline error messages render with `aria-describedby` linking input to error element.
  - Submitting state disables inputs and shows loading indicator.
  - Success state renders confirmation message and reset button.

- [ ] **Step 2: Implement `src/sections/Contact/ContactForm.tsx`**
  Build the form using design system tokens, visible focus states, labels, and accessible error banners.

- [ ] **Step 3: Write tests in `src/sections/Contact/Contact.test.tsx`**
  Cover:
  - Wrapped in `<Section id="contact">` with section counter `07 / CONTACT`.
  - Renders introductory copy and availability notice.
  - Renders GitHub and LinkedIn social links.
  - Contains `<ContactForm />`.

- [ ] **Step 4: Implement `src/sections/Contact/Contact.tsx` and barrel exports**
  Create `Contact.tsx`, export via `src/sections/Contact/index.ts` and `src/sections/index.ts`.

- [ ] **Step 5: Integrate `<Contact />` into `src/app/App.tsx` and update `App.test.tsx`**
  Mount `<Contact />` after `<About />` at the `#contact` anchor.
  Update `App.test.tsx` asserting `#contact` section rendering.

- [ ] **Step 6: Run all section tests to verify they pass**
  Run: `npx vitest run src/sections/Contact/ src/app/App.test.tsx`
  Expected: PASS.

---

### Task 7: Environment Documentation & Full Verification Suite

**Files:**
- Create: `.env.example`
- Modify: `task.md`

- [ ] **Step 1: Create `.env.example`**
  Document server-side keys (`RESEND_API_KEY`, `CONTACT_RECEIVER_EMAIL`, `CONTACT_SENDER_EMAIL`) and client-side keys (`VITE_SITE_URL`) with instructions on deploying to Vercel without paid keys.

- [ ] **Step 2: Run full TypeScript check**
  Run: `npm run typecheck`
  Expected: 0 errors.

- [ ] **Step 3: Run full ESLint check**
  Run: `npm run lint`
  Expected: 0 errors, 0 warnings.

- [ ] **Step 4: Run full Vitest suite**
  Run: `npm test`
  Expected: All test suites pass.

- [ ] **Step 5: Run production build**
  Run: `npm run build`
  Expected: Exit code 0, production bundle compiled cleanly in `dist/`.

- [ ] **Step 6: Update task tracking artifact**
  Mark all checklist items in `task.md` complete.
