/**
 * Client-Side Contact API Service
 *
 * Dispatches form data to the secure serverless endpoint (/api/contact).
 * Does not require or contain any private credentials.
 */

export interface ContactPayload {
  readonly name: string;
  readonly email: string;
  readonly subject?: string;
  readonly message: string;
  readonly _hp_verify?: string;
  readonly _hp_time?: number;
}

export interface ContactApiResponse {
  readonly success: boolean;
  readonly message: string;
  readonly errors?: Record<string, string>;
}

export interface ContactClient {
  sendContactMessage(payload: ContactPayload): Promise<ContactApiResponse>;
}

export interface ContactClientConfig {
  readonly endpoint?: string;
  readonly fetchFn?: typeof fetch;
  readonly timeoutMs?: number;
}

const DEFAULT_ENDPOINT = '/api/contact';
const DEFAULT_TIMEOUT_MS = 10000; // 10 seconds

export class ContactApiClient implements ContactClient {
  private readonly endpoint: string;
  private readonly fetchFn: typeof fetch;
  private readonly timeoutMs: number;

  constructor(config?: ContactClientConfig) {
    this.endpoint = config?.endpoint ?? DEFAULT_ENDPOINT;
    this.fetchFn = config?.fetchFn ?? globalThis.fetch;
    this.timeoutMs = config?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  }

  async sendContactMessage(payload: ContactPayload): Promise<ContactApiResponse> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await this.fetchFn(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = (await response.json()) as ContactApiResponse;
      return {
        success: Boolean(data.success),
        message: data.message || (data.success ? 'Message sent successfully.' : 'Failed to send message.'),
        errors: data.errors,
      };
    } catch {
      clearTimeout(timeoutId);
      return {
        success: false,
        message: 'Unable to connect to contact service. Please try again.',
      };
    }
  }
}

export const defaultContactClient: ContactClient = new ContactApiClient();
