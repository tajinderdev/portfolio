/**
 * Portfolio Content Data Models
 *
 * Sourced strictly from .agents/ and .agents/content/
 * Guarantees zero hallucinations and keeps content decoupled from UI presentation.
 */

export interface HomepagePromise {
  readonly headline: string;
  readonly supportingMessage: string;
}

export interface TraceNode {
  readonly id: string;
  readonly label: string;
  readonly layer: string;
  readonly diagnosticFocus: string;
  readonly keyConsiderations: readonly string[];
}

export interface SystemThinkingModel {
  readonly summary: string;
  readonly tracePath: readonly string[];
  readonly traceNodes: readonly TraceNode[];
  readonly focus: string;
}

export interface CollaborationModel {
  readonly crossFunctional: readonly string[];
  readonly agileSdlcSteps: readonly string[];
  readonly uiUxProduct: readonly string[];
  readonly cloudReliability: readonly string[];
  readonly securityModernization: readonly string[];
}

export interface EngineeringBreadthItem {
  readonly category: string;
  readonly description: string;
}

export interface PhilosophyTheme {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly keyDecisions: readonly string[];
  readonly iconLabel: string;
}

export interface ProfileContent {
  readonly name: string;
  readonly title: string;
  readonly positioning: string;
  readonly summary: string;
  readonly experienceYears: string;
  readonly internationalReach: readonly string[];
  readonly promise: HomepagePromise;
  readonly principles: readonly string[];
  readonly systemThinking: SystemThinkingModel;
  readonly collaboration: CollaborationModel;
  readonly engineeringBreadth: readonly EngineeringBreadthItem[];
  readonly philosophyThemes: readonly PhilosophyTheme[];
}

export type SkillPillar =
  | 'BUILD'
  | 'ARCHITECT'
  | 'INTEGRATE'
  | 'DATA'
  | 'DEPLOY'
  | 'TEST'
  | 'MODERNIZE'
  | 'INTELLIGENCE';

export interface SkillSubcategory {
  readonly name: string;
  readonly skills: readonly string[];
  readonly context?: string;
}

export interface SkillPillarGroup {
  readonly pillar: SkillPillar;
  readonly label: string;
  readonly purpose: string;
  readonly description: string;
  readonly architecturalRole: string;
  readonly subcategories: readonly SkillSubcategory[];
}

export interface ExperienceItem {
  readonly id: string;
  readonly period: string;
  readonly role: string;
  readonly specialization?: string;
  readonly environment: string;
  readonly progressionStage: string;
  readonly progressionIndex: number;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly architecturalInvolvement: readonly string[];
  readonly technicalScope: string;
  readonly responsibilities: readonly string[];
  readonly collaboration: string;
  readonly leadership?: string;
  readonly outcomes?: readonly string[];
  readonly technologies: readonly string[];
}

export interface ProjectCaseStudy {
  readonly id: string;
  readonly title: string;
  readonly type: string;
  readonly description: string;
  readonly focus: readonly string[];
  readonly capabilities?: readonly string[];
  readonly isConfidential: boolean;
  readonly publicReferenceUrl?: string;
  readonly technologies?: readonly string[];
  readonly architecturalHighlights?: readonly string[];
}

export interface PublicReference {
  readonly id: string;
  readonly url: string;
  readonly domainName: string;
}

export interface DomainItem {
  readonly id: string;
  readonly name: string;
  readonly tag: string;
  readonly summary: string;
  readonly problemSpace: string;
  readonly systemTypes: readonly string[];
  readonly engineeringConcerns: readonly string[];
  readonly integrationsWorkflows: readonly string[];
  readonly relevantTechnologies: readonly string[];
}

export interface AchievementItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export interface EducationItem {
  readonly id: string;
  readonly title: string;
  readonly institution: string;
  readonly period: string;
}

export interface PortfolioData {
  readonly profile: ProfileContent;
  readonly skillPillars: readonly SkillPillarGroup[];
  readonly experiences: readonly ExperienceItem[];
  readonly projects: readonly ProjectCaseStudy[];
  readonly publicReferences: readonly PublicReference[];
  readonly domains: readonly DomainItem[];
  readonly achievements: readonly AchievementItem[];
  readonly education: readonly EducationItem[];
}
