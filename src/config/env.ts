/**
 * Environment Configuration
 *
 * Provides typed, centralized access to client-safe environment variables.
 * Under Vite, only variables prefixed with VITE_ are exposed to the client bundle.
 *
 * Private server secrets, keys, or tokens must NEVER be prefixed with VITE_ or accessed here.
 */

export interface EmailJsConfig {
  readonly serviceId: string;
  readonly templateId: string;
  readonly publicKey: string;
  readonly isConfigured: boolean;
}

export interface EnvConfig {
  readonly siteUrl: string;
  readonly emailJs: EmailJsConfig;
  readonly isProduction: boolean;
  readonly isDevelopment: boolean;
}

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

export const env: EnvConfig = {
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://tajinder.dev',
  emailJs: {
    serviceId,
    templateId,
    publicKey,
    isConfigured: Boolean(serviceId && templateId && publicKey),
  },
  isProduction: Boolean(import.meta.env.PROD),
  isDevelopment: Boolean(import.meta.env.DEV),
};
