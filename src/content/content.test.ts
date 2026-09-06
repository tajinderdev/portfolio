import { describe, it, expect } from 'vitest';
import { getPortfolioContent } from './index';

describe('Portfolio Content Model & Data Integrity', () => {
  const content = getPortfolioContent();

  it('provides verified profile data without hallucinations', () => {
    expect(content.profile.name).toBe('Tajinder Singh');
    expect(content.profile.title).toBe('Senior Software Engineer');
    expect(content.profile.experienceYears).toBe('7+');
    expect(content.profile.promise.headline).toContain('scalable, secure, and intelligent');
  });

  it('contains the 5 core engineering skill pillars', () => {
    const pillars = content.skillPillars.map((p) => p.pillar);
    expect(pillars).toEqual(['BUILD', 'SCALE', 'INTEGRATE', 'MODERNIZE', 'INTELLIGENCE']);

    content.skillPillars.forEach((pillar) => {
      expect(pillar.subcategories.length).toBeGreaterThan(0);
      pillar.subcategories.forEach((sub) => {
        expect(sub.skills.length).toBeGreaterThan(0);
      });
    });
  });

  it('preserves client confidentiality on enterprise case studies', () => {
    expect(content.projects.length).toBeGreaterThanOrEqual(5);
    content.projects.forEach((project) => {
      expect(project.isConfidential).toBe(true);
      // Ensure no confidential internal company names leaked into title
      expect(project.title).not.toMatch(/client secret|internal/i);
    });
  });

  it('loads public references correctly', () => {
    expect(content.publicReferences.length).toBe(4);
    const urls = content.publicReferences.map((r) => r.url);
    expect(urls).toContain('https://captainpicks.com');
    expect(urls).toContain('https://estate4.co.uk');
    expect(urls).toContain('https://vetplus.co.uk');
    expect(urls).toContain('https://marcusrusbournemedia.com');
  });

  it('contains all 6 domain areas and achievements', () => {
    expect(content.domains.length).toBe(6);
    expect(content.achievements.length).toBe(4);
    expect(content.education.length).toBe(2);
  });

  it('contains verified engineering philosophy themes and trace nodes', () => {
    expect(content.profile.philosophyThemes.length).toBe(7);
    expect(content.profile.principles.length).toBe(8);
    expect(content.profile.systemThinking.tracePath.length).toBe(6);
    expect(content.profile.systemThinking.traceNodes.length).toBe(6);

    const themeIds = content.profile.philosophyThemes.map((t) => t.id);
    expect(themeIds).toContain('theme-understanding');
    expect(themeIds).toContain('theme-system-thinking');
    expect(themeIds).toContain('theme-ownership');
    expect(themeIds).toContain('theme-integrations');
    expect(themeIds).toContain('theme-modernization');
    expect(themeIds).toContain('theme-collaboration');
    expect(themeIds).toContain('theme-ai');
  });
});
