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

  it('contains the 8 core engineering capability pillars', () => {
    const pillars = content.skillPillars.map((p) => p.pillar);
    expect(pillars).toEqual([
      'BUILD',
      'ARCHITECT',
      'INTEGRATE',
      'DATA',
      'DEPLOY',
      'TEST',
      'MODERNIZE',
      'INTELLIGENCE',
    ]);

    content.skillPillars.forEach((pillar) => {
      expect(pillar.label.length).toBeGreaterThan(0);
      expect(pillar.purpose.length).toBeGreaterThan(0);
      expect(pillar.architecturalRole.length).toBeGreaterThan(0);
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

  it('contains all 6 domain areas with problem spaces, system types, and engineering concerns', () => {
    expect(content.domains.length).toBe(6);
    expect(content.achievements.length).toBe(4);
    expect(content.education.length).toBe(2);

    content.domains.forEach((domain) => {
      expect(domain.name.length).toBeGreaterThan(0);
      expect(domain.tag.length).toBeGreaterThan(0);
      expect(domain.summary.length).toBeGreaterThan(0);
      expect(domain.problemSpace.length).toBeGreaterThan(0);
      expect(domain.systemTypes.length).toBeGreaterThan(0);
      expect(domain.engineeringConcerns.length).toBeGreaterThan(0);
      expect(domain.integrationsWorkflows.length).toBeGreaterThan(0);
      expect(domain.relevantTechnologies.length).toBeGreaterThan(0);
    });
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

  it('contains 5 chronological experience milestones with progression stages and confidentiality safety', () => {
    expect(content.experiences.length).toBe(5);

    // Verify chronologically descending order (Present -> 2019)
    expect(content.experiences[0]?.period).toContain('Present');
    expect(content.experiences[4]?.period).toContain('2019');

    // Verify progression indices (5 -> 1)
    const indices = content.experiences.map((e) => e.progressionIndex);
    expect(indices).toEqual([5, 4, 3, 2, 1]);

    content.experiences.forEach((exp) => {
      expect(exp.role.length).toBeGreaterThan(0);
      expect(exp.environment.length).toBeGreaterThan(0);
      expect(exp.progressionStage.length).toBeGreaterThan(0);
      expect(exp.summary.length).toBeGreaterThan(0);
      expect(exp.architecturalInvolvement.length).toBeGreaterThan(0);
      expect(exp.responsibilities.length).toBeGreaterThan(0);
      expect(exp.technologies.length).toBeGreaterThan(0);

      // Verify no confidential leakages
      expect(exp.summary).not.toMatch(/secret|client proprietary|confidential/i);
      expect(exp.environment).not.toMatch(/secret|internal-only/i);
    });
  });
});
