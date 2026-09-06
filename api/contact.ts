import type { IncomingMessage, ServerResponse } from 'node:http';
import { handleContactRequest } from '../src/server/contactHandler';

interface VercelRequest extends IncomingMessage {
  body?: unknown;
}

export default async function handler(
  req: VercelRequest,
  res: ServerResponse
): Promise<void> {
  let body: unknown = req.body;

  // If body has not been parsed by Vercel middleware, buffer the stream
  if (!body && req.method === 'POST') {
    try {
      const chunks: Buffer[] = [];
      for await (const chunk of req) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
      }
      const rawBody = Buffer.concat(chunks).toString('utf8');
      if (rawBody.trim()) {
        body = JSON.parse(rawBody);
      }
    } catch {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          success: false,
          message: 'Invalid JSON payload received.',
        })
      );
      return;
    }
  }

  // Extract client IP address from Vercel headers
  const forwardedFor = req.headers['x-forwarded-for'];
  const clientIp =
    (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor?.split(',')[0]?.trim()) ||
    (req.headers['x-real-ip'] as string) ||
    req.socket.remoteAddress ||
    '127.0.0.1';

  const contentLengthHeader = req.headers['content-length'];
  const contentLength = contentLengthHeader ? Number(contentLengthHeader) : undefined;

  const result = await handleContactRequest({
    method: req.method,
    body,
    ip: clientIp,
    contentLength,
  });

  res.statusCode = result.status;
  res.setHeader('Content-Type', 'application/json');

  if (result.headers) {
    for (const [key, value] of Object.entries(result.headers)) {
      res.setHeader(key, value);
    }
  }

  res.end(JSON.stringify(result.body));
}
