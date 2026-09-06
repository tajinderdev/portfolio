# Stage 11: Contact Section & Secure Serverless Backend Specification

**Date:** 2026-09-06  
**Status:** Approved  
**Author:** Antigravity (Pair Programming with Tajinder Singh)  

---

## 1. Overview & Context

This specification defines the architecture, security perimeter, frontend interaction, and serverless backend integration for the **Contact section (`#contact`)** of Tajinder Singh's portfolio.

### 1.1 Goals
- Provide visitors with a streamlined, accessible channel to contact Tajinder regarding architecture, consulting, and engineering roles.
- Implement a **zero-client-secret, secure serverless endpoint** at `/api/contact` deployable on Vercel without paid API keys or deployment blockers.
- Enforce strict server-side validation, abuse prevention (rate limiting, honeypots, interaction timing, payload limits), and sanitization.
- Maintain full dev-prod parity via a lightweight Vite dev server middleware so local development works smoothly without running secondary backend processes.
- Ensure strict confidentiality: Tajinder's personal email address is never embedded in source code, client bundles, or public repositories.

---

## 2. Architecture & Components

```text
[Browser Client: React 19]
  └── Contact Section (#contact)
        └── useContactForm Hook
              └── contactClient.sendContactMessage()
                    │
                    ▼ HTTP POST /api/contact (JSON payload < 10KB)
┌────────────────────────────────────────────────────────┐
│ Runtime Boundary: Vercel Serverless / Vite Dev Plugin │
│                                                        │
│  api/contact.ts / vite dev middleware                  │
│    └── handleContactSubmission(request)                │
│          ├── 1. Payload Size Check (< 10KB)            │
│          ├── 2. Sliding-Window Rate Limiter (IP-based) │
│          ├── 3. Honeypot & Timing Check (Anti-Bot)     │
│          ├── 4. Strict Schema Validation & Sanitize    │
│          └── 5. Email Dispatch Service                 │
│                   ├── Resend Free API (Production)     │
│                   └── Console Logger (Dev/CI fallback) │
└────────────────────────────────────────────────────────┘
                    │
                    ▼ Verified Notification Email
       [Tajinder's Inbox: CONTACT_RECEIVER_EMAIL]
```

### 2.1 Component Responsibilities

1. **Frontend Presentation (`src/sections/Contact/`):**
   - `Contact.tsx`: Outer container wrapped in `<Section id="contact">` with section counter `07 / CONTACT`, title, introductory message, availability notice, and external links.
   - `ContactForm.tsx`: Controlled form component with fields for name, email, subject, message, and hidden honeypot.
   - `useContactForm.ts`: Custom hook managing field state, validation errors, submission status (`idle` | `submitting` | `success` | `error`), and ARIA error associations.
   - `contactClient.ts` (`src/services/contact/contactClient.ts`): Client-side API abstraction calling `/api/contact` with timeout and error handling.

2. **Backend Serverless Core (`src/server/`):**
   - `contactHandler.ts`: Pure handler accepting parsed request attributes (`body`, `ip`, `method`) and returning `{ status, body, headers }`. Agnostic of whether invoked by Vercel or Vite dev server.
   - `rateLimiter.ts`: In-memory sliding-window rate limiter tracking requests per IP. Returns status, remaining quota, and reset timestamp.
   - `validator.ts`: Validates input types, lengths, email format, and sanitizes strings (stripping control chars and CRLF sequences to prevent header injection).
   - `emailProvider.ts`: Dispatches notification emails using Resend REST API or logs safely in development mode when `RESEND_API_KEY` is not set.

3. **Runtime Integrations:**
   - `api/contact.ts`: Vercel Serverless Function entry point conforming to Node/Vercel HTTP handler signature (`req`, `res`).
   - `vite.config.ts`: Dev plugin integrating `contactHandler` during `npm run dev`.

---

## 3. Data Contracts & API Specification

### 3.1 HTTP Endpoint: `POST /api/contact`

**Request Headers:**
- `Content-Type: application/json`

**Request Payload:**
```typescript
export interface ContactPayload {
  readonly name: string;
  readonly email: string;
  readonly subject?: string;
  readonly message: string;
  readonly _hp_verify?: string; // Honeypot: must be empty
  readonly _hp_time?: number;   // Timestamp token: must be >= 2000ms old
}
```

**Response Payload (Success - 200 OK):**
```json
{
  "success": true,
  "message": "Thank you for reaching out. Your message has been received."
}
```

**Response Payload (Validation Error - 400 Bad Request):**
```json
{
  "success": false,
  "message": "Invalid submission. Please check the form fields and try again.",
  "errors": {
    "email": "Please provide a valid email address."
  }
}
```

**Response Payload (Rate Limit Exceeded - 429 Too Many Requests):**
```json
{
  "success": false,
  "message": "Too many requests. Please wait a few minutes before trying again."
}
```
*Headers:* `Retry-After: 900`, `X-RateLimit-Limit: 5`, `X-RateLimit-Remaining: 0`

**Response Payload (Payload Too Large - 413 Payload Too Large):**
```json
{
  "success": false,
  "message": "Submission payload exceeds allowed size limit."
}
```

**Response Payload (Internal Server Error - 500 Internal Server Error):**
```json
{
  "success": false,
  "message": "Unable to send message at this time. Please try again later."
}
```

---

## 4. Security, Abuse Prevention & Confidentiality

### 4.1 Server-Side Validation Rules
- `name`: String, non-empty, trimmed, min length 2, max length 100 characters. Stripped of control characters.
- `email`: String, non-empty, trimmed, max length 254 characters. Must match RFC 5322 email regex. All `\r` and `\n` characters stripped.
- `subject`: String, optional, max length 150 characters. Defaults to `"Portfolio Inquiry from [name]"`. All `\r` and `\n` characters stripped to eliminate SMTP header injection risk.
- `message`: String, non-empty, trimmed, min length 10, max length 3000 characters.
- Payload total size: Max 10,240 bytes (10KB).

### 4.2 Abuse Prevention
- **Honeypot (`_hp_verify`):** Rendered off-screen with `aria-hidden="true"`, `tabIndex={-1}`, and CSS `position: absolute; opacity: 0; pointer-events: none;`. If populated, the server returns a fake `200 OK` without sending email.
- **Timing Guard (`_hp_time`):** Captured when the form component mounts. If submitted within < 2 seconds, the request is treated as automated and discarded with a fake `200 OK`.
- **IP Rate Limiting:** Sliding-window tracking of client IP (`x-forwarded-for` / `x-real-ip` / `remoteAddress`). Max 5 requests per 15 minutes per IP.
- **Safe Error Responses:** Server logs error diagnostics internally to stderr; client receives sanitized, non-leaking messages.

### 4.3 Confidentiality & Zero Secret Exposure
- Tajinder's personal email is strictly stored in the server environment variable `CONTACT_RECEIVER_EMAIL`.
- The email service API key is strictly stored in `RESEND_API_KEY`.
- No server secrets are ever prefixed with `VITE_` or included in client bundles.

---

## 5. Email Service Integration & Zero-Cost Strategy

### 5.1 Resend Free Tier
- Resend offers 3,000 emails/month free forever (100 emails/day) with no credit card required.
- Uses direct REST API call `https://api.resend.com/emails` via standard `fetch` (built-in to Node 18+ and Vercel runtime, zero dependencies required).
- Sender: `Portfolio Contact <onboarding@resend.dev>` (default Resend free domain) or custom domain when configured.
- Recipient: Processed through `process.env.CONTACT_RECEIVER_EMAIL`.
- Reply-To: Set to the visitor's submitted email address (`payload.email`), allowing direct replies from Tajinder's mail client.

### 5.2 Development & CI Fallback Simulation
- If `RESEND_API_KEY` is not defined (e.g. during local tests, Vitest, CI, or fresh clone without setup):
  - Server logs a structured notification to the console:
    `[DEV SIMULATION] Message from ${payload.name} <${payload.email}>: ${payload.message}`
  - Returns `200 OK` with `{ success: true, message: "[DEV SIMULATION] Message received. Credentials not configured." }`.
  - Ensures development and evaluation proceed without blockers.

---

## 6. Frontend UI, UX & Accessibility

### 6.1 Layout & Visual Language
- Follows `.agents/DESIGN_DIRECTION.md`: Dark, technical aesthetic using tokens from `src/styles/tokens.css` and existing primitives (`Button`, `Card`, `Heading`, `MonoText`).
- Responsive 2-column layout (1 column on mobile, 2 columns on `lg` screens):
  - **Left column:** Direct contact copy, working preferences, response expectations, and social links (GitHub, LinkedIn).
  - **Right column:** The contact form embedded within an elevated card.

### 6.2 Accessibility Requirements
- All inputs have explicit `<label>` tags with `htmlFor` bindings.
- Active validation errors display below the field with unique IDs referenced by `aria-describedby` on the input.
- Erroneous fields have `aria-invalid="true"`.
- Form submission state updates an `aria-live="polite"` status region.
- All elements have visible focus rings (`focus-visible:ring-2 focus-visible:ring-accent`).
- Tab navigation follows natural source order. Honeypot is removed from the tab sequence with `tabIndex={-1}`.

---

## 7. Environment Variables & Documentation

### 7.1 `.env.example`
A comprehensive `.env.example` file will document all environment variables:
```bash
# Server-Side Variables (Vercel Serverless Function & Vite Dev Server)
# Never expose these with VITE_ prefix
RESEND_API_KEY=re_your_free_api_key_here
CONTACT_RECEIVER_EMAIL=your_email@example.com
CONTACT_SENDER_EMAIL=Portfolio Contact <onboarding@resend.dev>

# Client-Side Variables (Vite Public Variables)
VITE_SITE_URL=https://tajinder.dev
```

---

## 8. Testing Strategy

1. **Backend Unit & Security Tests:**
   - `validator.test.ts`: Valid input, invalid email formats, empty fields, field truncation, CRLF stripping, oversized payload rejection.
   - `rateLimiter.test.ts`: Allows requests within limit, blocks 6th request with 429, expires after window.
   - `contactHandler.test.ts`: Valid submission, bot honeypot trigger, fast timing trigger, rate limiting trigger, provider error handling, dev simulation mode.
2. **Frontend Unit & Accessibility Tests:**
   - `useContactForm.test.ts`: Field editing, client validation, honeypot injection, submission lifecycle.
   - `ContactForm.test.tsx`: Accessible labels, error message rendering with `aria-describedby`, loading disabled states, success state rendering.
   - `Contact.test.tsx`: Section rendering, anchor `#contact`, responsive layout, social link buttons.
   - `App.test.tsx`: Integration of Contact section into page flow.
3. **End-to-End Build & Validation:**
   - Full test suite execution: `npm test`.
   - Linter check: `npm run lint`.
   - TypeScript compilation: `npm run typecheck`.
   - Production bundle build: `npm run build`.
