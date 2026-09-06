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
});
