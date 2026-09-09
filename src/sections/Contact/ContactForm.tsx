import { type ReactElement } from 'react';
import { useContactForm } from './useContactForm';
import type { ContactClient } from '@/services/contact/contactClient';
import { Button } from '@/components/ui';
import { MonoText } from '@/components/typography';

export interface ContactFormProps {
  readonly client?: ContactClient;
  readonly className?: string;
}

export function ContactForm({
  client,
  className = '',
}: ContactFormProps): ReactElement {
  const {
    values,
    errors,
    status,
    statusMessage,
    isSubmitting,
    isSuccess,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useContactForm(client);

  if (isSuccess) {
    return (
      <div
        className={`rounded-lg border border-accent/40 bg-surface/80 p-6 sm:p-8 backdrop-blur-sm space-y-6 text-center ${className}`}
        aria-live="polite"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-accent/60 bg-accent/10 text-accent text-xl">
          ✓
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-text-primary">
            Message Sent Successfully
          </h3>
          <p className="text-sm text-text-secondary max-w-md mx-auto">
            {statusMessage ||
              'Thank you for reaching out. Your message has been received. I will review and reply promptly.'}
          </p>
        </div>
        <div>
          <Button variant="secondary" onClick={resetForm}>
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`rounded-lg border border-border-subtle bg-surface/70 p-6 sm:p-8 backdrop-blur-sm space-y-5 transition-all duration-200 hover:border-border ${className}`}
    >
      {/* Honeypot anti-spam field (hidden from assistive tech and visual layout) */}
      <div
        style={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
          height: 0,
          width: 0,
          overflow: 'hidden',
          zIndex: -1,
        }}
        aria-hidden="true"
      >
        <label htmlFor="_hp_verify">Do not fill this field</label>
        <input
          id="_hp_verify"
          name="_hp_verify"
          type="text"
          value={values._hp_verify}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </div>

      {/* Global error banner */}
      {status === 'error' && (
        <div
          className="rounded border border-red-500/40 bg-red-950/30 p-3.5 text-xs sm:text-sm text-red-300 space-y-1"
          role="alert"
          aria-live="assertive"
        >
          <div className="flex items-center gap-2 font-semibold">
            <span>⚠</span>
            <span>Submission Error</span>
          </div>
          <p>{statusMessage || 'Unable to deliver message. Please try again.'}</p>
        </div>
      )}

      {/* Name Field */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-baseline">
          <label
            htmlFor="contact-name"
            className="block text-xs font-mono font-medium text-text-secondary uppercase tracking-wider"
          >
            Your Name <span className="text-accent">*</span>
          </label>
          <MonoText size="xs" color="muted" className="text-[11px]">
            REQUIRED
          </MonoText>
        </div>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          placeholder="e.g. Alex Miller"
          className={`w-full rounded border bg-background/60 px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:outline-none focus-visible:ring-1 ${
            errors.name
              ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500'
              : 'border-border-subtle focus-visible:border-accent focus-visible:ring-accent'
          } disabled:opacity-60 disabled:cursor-not-allowed`}
        />
        {errors.name && (
          <p id="contact-name-error" className="text-xs text-red-400 pt-0.5">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-baseline">
          <label
            htmlFor="contact-email"
            className="block text-xs font-mono font-medium text-text-secondary uppercase tracking-wider"
          >
            Email Address <span className="text-accent">*</span>
          </label>
          <MonoText size="xs" color="muted" className="text-[11px]">
            REQUIRED
          </MonoText>
        </div>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          placeholder="e.g. alex@company.com"
          className={`w-full rounded border bg-background/60 px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:outline-none focus-visible:ring-1 ${
            errors.email
              ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500'
              : 'border-border-subtle focus-visible:border-accent focus-visible:ring-accent'
          } disabled:opacity-60 disabled:cursor-not-allowed`}
        />
        {errors.email && (
          <p id="contact-email-error" className="text-xs text-red-400 pt-0.5">
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject Field */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-baseline">
          <label
            htmlFor="contact-subject"
            className="block text-xs font-mono font-medium text-text-secondary uppercase tracking-wider"
          >
            Subject
          </label>
          <MonoText size="xs" color="muted" className="text-[11px]">
            OPTIONAL
          </MonoText>
        </div>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          value={values.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
          placeholder="e.g. System Architecture / Senior Role"
          className={`w-full rounded border bg-background/60 px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:outline-none focus-visible:ring-1 ${
            errors.subject
              ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500'
              : 'border-border-subtle focus-visible:border-accent focus-visible:ring-accent'
          } disabled:opacity-60 disabled:cursor-not-allowed`}
        />
        {errors.subject && (
          <p id="contact-subject-error" className="text-xs text-red-400 pt-0.5">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-baseline">
          <label
            htmlFor="contact-message"
            className="block text-xs font-mono font-medium text-text-secondary uppercase tracking-wider"
          >
            Message <span className="text-accent">*</span>
          </label>
          <MonoText size="xs" color="muted" className="text-[11px]">
            MIN 10 CHARS
          </MonoText>
        </div>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          placeholder="Briefly describe your project, system challenge, or role..."
          className={`w-full rounded border bg-background/60 px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:outline-none focus:ring-1 resize-y ${
            errors.message
              ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500'
              : 'border-border-subtle focus-visible:border-accent focus-visible:ring-accent'
          } disabled:opacity-60 disabled:cursor-not-allowed`}
        />
        {errors.message && (
          <p id="contact-message-error" className="text-xs text-red-400 pt-0.5">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-background border-t-transparent" />
              <span>Sending Message...</span>
            </span>
          ) : (
            'Send Message'
          )}
        </Button>
      </div>
    </form>
  );
}
