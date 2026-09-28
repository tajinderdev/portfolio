import type { IncomingMessage, ServerResponse } from 'node:http';
import { handleContactRequest } from '../src/server/contactHandler.js';

interface VercelRequest extends IncomingMessage {
  body?: unknown;
}

export default async function handler(
  req: VercelRequest,
  res: ServerResponse
): Promise<void> {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.end();
    return;
  }

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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (result.headers) {
    for (const [key, value] of Object.entries(result.headers)) {
      if (typeof value === 'string') {
        res.setHeader(key, value);
      }
    }
  }

  res.end(JSON.stringify(result.body));
}
