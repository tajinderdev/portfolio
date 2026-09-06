import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

describe('Portfolio SEO Layer & Metadata Validation', () => {
  const rootDir = path.resolve(__dirname, '../..');
  const indexHtmlPath = path.join(rootDir, 'index.html');
  const robotsTxtPath = path.join(rootDir, 'public/robots.txt');
  const sitemapXmlPath = path.join(rootDir, 'public/sitemap.xml');
  const manifestPath = path.join(rootDir, 'public/site.webmanifest');

  const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');

  it('verifies index.html has an accurate, professional document title', () => {
    expect(indexHtmlContent).toContain('<title>Tajinder Singh — Senior Software Engineer</title>');
  });

  it('verifies meta description matches approved positioning without keyword stuffing', () => {
    expect(indexHtmlContent).toMatch(
      /<meta\s+name="description"\s+content="Senior Software Engineer specializing in scalable system architecture, full-stack development, complex integrations, legacy modernization, and AI engineering\."\s*\/>/,
    );
  });

  it('verifies canonical URL strategy pointing to https://tajinder.dev/', () => {
    expect(indexHtmlContent).toContain('<link rel="canonical" href="https://tajinder.dev/" />');
  });

  it('verifies robots meta directive allows indexing with rich snippet allowances', () => {
    expect(indexHtmlContent).toMatch(
      /<meta\s+name="robots"\s+content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"\s*\/>/,
    );
  });

  it('verifies complete Open Graph metadata for rich social sharing', () => {
    expect(indexHtmlContent).toContain('<meta property="og:site_name" content="Tajinder Singh Portfolio" />');
    expect(indexHtmlContent).toContain('<meta property="og:type" content="website" />');
    expect(indexHtmlContent).toContain('<meta property="og:url" content="https://tajinder.dev/" />');
    expect(indexHtmlContent).toContain('<meta property="og:title" content="Tajinder Singh — Senior Software Engineer" />');
    expect(indexHtmlContent).toContain('<meta property="og:image" content="https://tajinder.dev/images/hero.webp" />');
    expect(indexHtmlContent).toContain('<meta property="og:image:type" content="image/webp" />');
    expect(indexHtmlContent).toContain('<meta property="og:image:width" content="1600" />');
    expect(indexHtmlContent).toContain('<meta property="og:image:height" content="1200" />');
    expect(indexHtmlContent).toContain('<meta property="og:locale" content="en_US" />');
  });

  it('verifies Twitter Card metadata for large preview cards', () => {
    expect(indexHtmlContent).toContain('<meta name="twitter:card" content="summary_large_image" />');
    expect(indexHtmlContent).toContain('<meta name="twitter:url" content="https://tajinder.dev/" />');
    expect(indexHtmlContent).toContain('<meta name="twitter:title" content="Tajinder Singh — Senior Software Engineer" />');
    expect(indexHtmlContent).toContain('<meta name="twitter:image" content="https://tajinder.dev/images/hero.webp" />');
  });

  it('verifies site icons and webmanifest links are present', () => {
    expect(indexHtmlContent).toContain('<link rel="icon" type="image/svg+xml" href="/favicon.svg" />');
    expect(indexHtmlContent).toContain('<link rel="apple-touch-icon" href="/favicon.svg" />');
    expect(indexHtmlContent).toContain('<link rel="manifest" href="/site.webmanifest" />');
  });

  it('verifies JSON-LD structured data is parseable and contains valid Schema.org entities', () => {
    const jsonLdMatch = indexHtmlContent.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(jsonLdMatch).toBeTruthy();
    expect(jsonLdMatch?.[1]).toBeDefined();

    const rawJson = jsonLdMatch?.[1] ?? '{}';
    const jsonLd = JSON.parse(rawJson);
    expect(jsonLd['@context']).toBe('https://schema.org');
    expect(Array.isArray(jsonLd['@graph'])).toBe(true);

    const person = jsonLd['@graph'].find((item: { '@type': string }) => item['@type'] === 'Person');
    expect(person).toBeDefined();
    expect(person.name).toBe('Tajinder Singh');
    expect(person.jobTitle).toBe('Senior Software Engineer');
    expect(person.url).toBe('https://tajinder.dev/');
    expect(person.sameAs).toContain('https://github.com/tajinderdev');
    expect(person.sameAs).toContain('https://linkedin.com/in/tajinderdev');
    expect(person.knowsAbout).toContain('Full-Stack Web Development');
    expect(person.knowsAbout).toContain('System Architecture');

    const website = jsonLd['@graph'].find((item: { '@type': string }) => item['@type'] === 'WebSite');
    expect(website).toBeDefined();
    expect(website.url).toBe('https://tajinder.dev/');

    const profilePage = jsonLd['@graph'].find((item: { '@type': string }) => item['@type'] === 'ProfilePage');
    expect(profilePage).toBeDefined();
    expect(profilePage.url).toBe('https://tajinder.dev/');
  });

  it('verifies public/robots.txt exists and specifies allow-all with sitemap reference', () => {
    expect(fs.existsSync(robotsTxtPath)).toBe(true);
    const robotsTxt = fs.readFileSync(robotsTxtPath, 'utf-8');
    expect(robotsTxt).toContain('User-agent: *');
    expect(robotsTxt).toContain('Allow: /');
    expect(robotsTxt).toContain('Sitemap: https://tajinder.dev/sitemap.xml');
  });

  it('verifies public/sitemap.xml exists and is well-formed XML referencing canonical URL', () => {
    expect(fs.existsSync(sitemapXmlPath)).toBe(true);
    const sitemapXml = fs.readFileSync(sitemapXmlPath, 'utf-8');
    expect(sitemapXml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(sitemapXml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(sitemapXml).toContain('<loc>https://tajinder.dev/</loc>');
    expect(sitemapXml).toContain('<priority>1.0</priority>');
  });

  it('verifies public/site.webmanifest exists and is valid JSON', () => {
    expect(fs.existsSync(manifestPath)).toBe(true);
    const manifestJson = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    expect(manifestJson.name).toBe('Tajinder Singh — Senior Software Engineer');
    expect(manifestJson.start_url).toBe('/');
    expect(manifestJson.theme_color).toBe('#0a0a0a');
  });

  it('verifies noscript fallback content is present for non-JS crawlers', () => {
    expect(indexHtmlContent).toContain('<noscript>');
    expect(indexHtmlContent).toContain('Tajinder Singh — Senior Software Engineer');
  });
});
