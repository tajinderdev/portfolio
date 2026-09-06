/**
 * Email Dispatch Provider
 *
 * Dispatches notification emails via Resend REST API.
 * Supports zero-credential local development simulation.
 * Keeps all API keys strictly on the server-side.
 */

import type { ValidatedContactData } from './validator.js';

export interface EmailDispatchResult {
  readonly success: boolean;
  readonly messageId?: string;
  readonly error?: string;
}

export interface EmailProvider {
  send(data: ValidatedContactData): Promise<EmailDispatchResult>;
}

export interface ResendEmailConfig {
  readonly apiKey?: string;
  readonly receiverEmail?: string;
  readonly senderEmail?: string;
  readonly fetchFn?: typeof fetch;
}

const DEFAULT_SENDER = 'Portfolio Contact <onboarding@resend.dev>';

export class ResendEmailProvider implements EmailProvider {
  private readonly apiKey?: string;
  private readonly receiverEmail?: string;
  private readonly senderEmail?: string;
  private readonly fetchFn: typeof fetch;

  constructor(config?: ResendEmailConfig) {
    this.apiKey = config?.apiKey;
    this.receiverEmail = config?.receiverEmail;
    this.senderEmail = config?.senderEmail;
    this.fetchFn = config?.fetchFn ?? globalThis.fetch;
  }

  async send(data: ValidatedContactData): Promise<EmailDispatchResult> {
    const apiKey =
      this.apiKey !== undefined
        ? this.apiKey
        : (process.env.RESEND_API_KEY || '');
    const receiverEmail =
      this.receiverEmail !== undefined
        ? this.receiverEmail
        : (process.env.CONTACT_RECEIVER_EMAIL || '');
    const senderEmail =
      this.senderEmail !== undefined
        ? this.senderEmail
        : (process.env.CONTACT_SENDER_EMAIL || DEFAULT_SENDER);

    // 1. Safe Development / Testing Simulation Mode
    if (!apiKey) {
      console.info('[DEV SIMULATION] Contact form message received:', {
        name: data.name,
        email: data.email,
        subject: data.subject,
        messagePreview: data.message.slice(0, 100),
      });

      return {
        success: true,
        messageId: `dev-simulation-${Date.now()}`,
      };
    }

    // 2. Production Resend REST Dispatch
    try {
      const recipient = receiverEmail || 'delivered@resend.dev';

      const textBody = [
        `New message received via portfolio contact form:`,
        ``,
        `From: ${data.name} (${data.email})`,
        `Subject: ${data.subject}`,
        ``,
        `Message:`,
        data.message,
        ``,
        `---`,
        `Received at: ${new Date().toISOString()}`,
      ].join('\n');

      const htmlBody = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111827; line-height: 1.6;">
          <div style="border-bottom: 2px solid #00F5D4; padding-bottom: 16px; margin-bottom: 24px;">
            <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #111827;">Portfolio Contact Submission</h2>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #6B7280;">Tajinder Singh — Senior Software Engineer</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #4B5563; width: 100px;">From:</td>
              <td style="padding: 8px 0; font-size: 14px; color: #111827;">${this.escapeHtml(data.name)} &lt;<a href="mailto:${this.escapeHtml(data.email)}" style="color: #0F766E;">${this.escapeHtml(data.email)}</a>&gt;</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #4B5563;">Subject:</td>
              <td style="padding: 8px 0; font-size: 14px; color: #111827;">${this.escapeHtml(data.subject)}</td>
            </tr>
          </table>

          <div style="background-color: #F9FAFB; border-left: 4px solid #00F5D4; padding: 16px 20px; border-radius: 4px; margin-bottom: 24px;">
            <div style="white-space: pre-wrap; font-size: 14px; color: #1F2937;">${this.escapeHtml(data.message)}</div>
          </div>

          <p style="font-size: 12px; color: #9CA3AF; margin: 0; border-top: 1px solid #E5E7EB; padding-top: 16px;">
            Dispatched via Tajinder Singh Portfolio Serverless Endpoint · ${new Date().toISOString()}
          </p>
        </div>
      `.trim();

      const response = await this.fetchFn('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: senderEmail,
          to: [recipient],
          reply_to: data.email,
          subject: data.subject,
          text: textBody,
          html: htmlBody,
        }),
      });

      if (!response.ok) {
        console.error('[Resend Error] API responded with status:', response.status);
        return {
          success: false,
          error: 'Failed to deliver notification email.',
        };
      }

      const json = (await response.json()) as { id?: string };

      return {
        success: true,
        messageId: json?.id,
      };
    } catch (err) {
      console.error('[Resend Network/Runtime Error]:', err instanceof Error ? err.message : err);
      return {
        success: false,
        error: 'Failed to deliver notification email.',
      };
    }
  }

  private escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

export const defaultEmailProvider = new ResendEmailProvider();
