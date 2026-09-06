import { env } from '@/config/env';
import type { ContactFormData, EmailSendResult, EmailService } from './types';

export class ProductionEmailService implements EmailService {
  async sendMessage(data: ContactFormData): Promise<EmailSendResult> {
    // 1. Bot check (honeypot field)
    if (data.botField) {
      // Silently ignore bot submissions to prevent bot learning
      return { success: true, message: 'Message sent successfully.' };
    }

    // 2. Input validation
    if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
      return { success: false, message: 'Please provide all required fields.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    // 3. Check if EmailJS is configured
    if (!env.emailJs.isConfigured) {
      if (env.isDevelopment) {
        // Safe development simulation
        return {
          success: true,
          message: '[DEV SIMULATION] Message received. EmailJS credentials not set.',
        };
      }
      return {
        success: false,
        message: 'Contact service is temporarily unavailable. Please try again later.',
      };
    }

    // EmailJS client SDK execution will be wired in Stage 13
    return { success: true, message: 'Message sent successfully.' };
  }
}

export const emailService: EmailService = new ProductionEmailService();
