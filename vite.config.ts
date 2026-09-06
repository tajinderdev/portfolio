import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

import type { Plugin } from 'vite';
import { handleContactRequest } from './src/server/contactHandler';

function contactDevPlugin(): Plugin {
  return {
    name: 'contact-api-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Allow', 'POST');
          res.end(
            JSON.stringify({
              success: false,
              message: 'Method Not Allowed. Only POST requests are supported.',
            })
          );
          return;
        }

        const chunks: Buffer[] = [];
        for await (const chunk of req) {
          chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
        }
        const rawBody = Buffer.concat(chunks).toString('utf8');

        let body: unknown = {};
        try {
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

        const forwardedFor = req.headers['x-forwarded-for'];
        const clientIp =
          (Array.isArray(forwardedFor)
            ? forwardedFor[0]
            : forwardedFor?.split(',')[0]?.trim()) ||
          (req.headers['x-real-ip'] as string) ||
          req.socket.remoteAddress ||
          '127.0.0.1';

        const contentLengthHeader = req.headers['content-length'];
        const contentLength = contentLengthHeader
          ? Number(contentLengthHeader)
          : undefined;

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
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), contactDevPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: false,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}', 'tests/**/*.{test,spec}.{ts,tsx}'],
  },
});
