/**
 * Contact API Tests (no browser required)
 * Tests the /api/contact endpoint directly at the HTTP level.
 */

import { test, expect } from '@playwright/test';

const BASE_URL = process.env.E2E_BASE_URL ?? 'http://localhost:3000';

test.describe('Contact API — HTTP level', () => {
  test('OPTIONS preflight returns 204 with CORS headers — bug fix verification', async ({ request }) => {
    const res = await request.fetch(`${BASE_URL}/api/contact`, {
      method: 'OPTIONS',
      headers: {
        Origin: BASE_URL,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'content-type',
      },
    });

    console.log('OPTIONS status:', res.status());
    console.log('OPTIONS headers:', res.headers());

    // THE BUG WAS: 405 Method Not Allowed
    // THE FIX IS:  204 No Content
    expect(res.status()).toBe(204);
    expect(res.headers()['access-control-allow-origin']).toBeTruthy();
    expect(res.headers()['access-control-allow-methods']).toContain('POST');
  });

  test('POST with valid payload returns 200 success', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/contact`, {
      headers: { 'Content-Type': 'application/json' },
      data: {
        name: 'API Test User',
        email: 'apitest@playwright.dev',
        subject: 'Playwright API Test',
        message: 'This is an automated API-level test of the contact endpoint.',
        _hp_time: 3000, // 3 seconds — above the 1000ms bot threshold
      },
    });

    const body = await res.json() as { success: boolean; message: string };
    console.log('POST status:', res.status(), 'body:', body);

    expect(res.status()).toBe(200);
    expect(body.success).toBe(true);
    expect(body.message).toContain('received');
  });

  test('POST with honeypot filled returns silent 200 but does not actually send', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/contact`, {
      headers: { 'Content-Type': 'application/json' },
      data: {
        name: 'Bot',
        email: 'bot@spam.com',
        subject: 'Spam',
        message: 'This is a bot message.',
        _hp_verify: 'I am a bot', // honeypot triggered
        _hp_time: 3000,
      },
    });

    const body = await res.json() as { success: boolean };
    console.log('Honeypot test status:', res.status(), 'body:', body);

    // Returns silent 200 to fool bots — but does NOT email
    expect(res.status()).toBe(200);
    expect(body.success).toBe(true);
  });

  test('POST with timing too fast (500ms) returns silent 200 for bot', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/contact`, {
      headers: { 'Content-Type': 'application/json' },
      data: {
        name: 'Fast Bot',
        email: 'fast@bot.com',
        subject: 'Quick',
        message: 'Submitted too fast.',
        _hp_time: 500, // 500ms — below 1000ms bot threshold
      },
    });

    const body = await res.json() as { success: boolean };
    console.log('Fast bot test status:', res.status(), 'body:', body);

    expect(res.status()).toBe(200);
    expect(body.success).toBe(true);
  });

  test('POST with empty required fields returns 400 with field errors', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/contact`, {
      headers: { 'Content-Type': 'application/json' },
      data: {
        name: '',
        email: 'not-an-email',
        message: 'x',
        _hp_time: 3000,
      },
    });

    const body = await res.json() as { success: boolean; errors?: Record<string, string> };
    console.log('Validation test status:', res.status(), 'body:', body);

    expect(res.status()).toBe(400);
    expect(body.success).toBe(false);
    expect(body.errors).toBeDefined();
  });

  test('POST with oversized payload returns 413', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/contact`, {
      headers: { 'Content-Type': 'application/json' },
      data: {
        name: 'Test',
        email: 'test@test.com',
        subject: 'Big',
        message: 'x'.repeat(12000), // > 10KB
        _hp_time: 3000,
      },
    });

    console.log('Oversized test status:', res.status());
    expect(res.status()).toBe(413);
  });
});
