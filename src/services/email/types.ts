/**
 * Contact and Email Service Interfaces
 */

export interface ContactFormData {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
  readonly company?: string;
  /** Honeypot field for bot detection (must be empty on valid submissions) */
  readonly botField?: string;
}

export interface EmailSendResult {
  readonly success: boolean;
  readonly message: string;
}

export interface EmailService {
  sendMessage(data: ContactFormData): Promise<EmailSendResult>;
}
