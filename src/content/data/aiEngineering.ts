import type { AIEngineeringModel } from '../models';

export const aiEngineeringData: AIEngineeringModel = {
  kicker: '05 / MODERN ENGINEERING',
  headline: 'AI-Augmented Engineering: An engineering multiplier grounded in architectural control.',
  positioning:
    'I integrate Generative AI into modern software delivery to accelerate exploration, prototyping, and developer velocity—while retaining complete human responsibility for architecture, security, correctness, and production reliability.',
  philosophy: {
    multiplier:
      'Generative AI multiplies development velocity, eliminates boilerplate friction, synthesizes comprehensive test vectors, and accelerates the comprehension of complex codebases.',
    control:
      'System topology, threat modeling, security perimeters, deterministic correctness, and production reliability remain strictly human-governed engineering disciplines.',
  },
  workflowSteps: [
    {
      id: 'step-idea',
      stepNumber: '01',
      name: 'Idea & Requirements',
      tag: 'DISCOVERY',
      summary:
        'Unpacking domain ambiguity, exploring user edge cases, and establishing boundary conditions.',
      aiRole:
        'Accelerates brainstorming alternative functional approaches, generates user journey edge-case checklists, and drafts domain specifications.',
      humanControl:
        'Filters unrealistic assumptions, anchors business priorities, and strictly verifies confidentiality and regulatory boundaries.',
      technologies: ['Requirement Analysis', 'User Journey Mapping', 'Scope Definition'],
    },
    {
      id: 'step-reason',
      stepNumber: '02',
      name: 'Reason & Technical Research',
      tag: 'ANALYSIS',
      summary:
        'Rapidly evaluating architectural options, third-party libraries, and unfamiliar APIs.',
      aiRole:
        'Parses complex technical documentation, compares library trade-offs, and drafts proof-of-concept interface contracts.',
      humanControl:
        'Validates API constraints, assesses vendor lock-in risks, reviews rate limits, and verifies architectural fit.',
      technologies: ['API Analysis', 'Trade-off Evaluation', 'Pattern Comparison'],
    },
    {
      id: 'step-architect',
      stepNumber: '03',
      name: 'Architect & System Design',
      tag: 'TOPOLOGY',
      summary:
        'Establishing service boundaries, database schemas, and integration topology.',
      aiRole:
        'Drafts normalized schema variations, suggests state machine transition diagrams, and simulates boundary failure modes.',
      humanControl:
        'Establishes service decoupling, defines security perimeters, enforces idempotency rules, and designs data models.',
      technologies: ['System Design', 'State Machines', 'Database Schemas'],
    },
    {
      id: 'step-build',
      stepNumber: '04',
      name: 'Build & Scaffolding',
      tag: 'IMPLEMENTATION',
      summary:
        'Writing robust application code, eliminating boilerplate, and crafting interfaces.',
      aiRole:
        'Accelerates boilerplate scaffolding, suggests idiomatic refactoring patterns, and speeds up syntax translation.',
      humanControl:
        'Enforces strict TypeScript types, maintains cohesive component boundaries, eliminates bloat, and adheres to clean architecture.',
      technologies: ['Full-Stack Engineering', 'TypeScript', 'Clean Architecture'],
    },
    {
      id: 'step-validate',
      stepNumber: '05',
      name: 'Validate & Verification',
      tag: 'QUALITY',
      summary:
        'Discovering regressions, generating edge-case tests, and confirming production safety.',
      aiRole:
        'Generates comprehensive unit test vectors, synthesizes realistic mock payloads, and tests obscure error branches.',
      humanControl:
        'Verifies test assertion validity, prevents hallucinated test passes, enforces red-green TDD cycles, and conducts rigorous peer reviews.',
      technologies: ['Test-Driven Development', 'Vitest / Jest', 'Edge-Case Testing'],
    },
    {
      id: 'step-improve',
      stepNumber: '06',
      name: 'Improve & Modernization',
      tag: 'EVOLUTION',
      summary:
        'Remediating technical debt, optimizing queries, and modernizing legacy services.',
      aiRole:
        'Identifies query optimization opportunities, surfaces deprecation paths, and drafts operational runbooks.',
      humanControl:
        'Plans incremental rollback-safe rollouts, monitors production telemetry, and ensures zero downtime during modernization.',
      technologies: ['Legacy Modernization', 'Query Tuning', 'Refactoring'],
    },
  ],
  capabilitySpheres: [
    {
      id: 'sphere-developer-workflow',
      title: 'Developer Workflow Acceleration',
      kicker: 'SPHERE 01 // ENGINEERING HARNESS',
      description:
        'Using AI developer tools, automated harnesses, and LLM-assisted workflows to multiply individual and team output across the complete software delivery lifecycle.',
      capabilities: [
        'Code generation, targeted refactoring, and syntactic boilerplate elimination',
        'Automated test harness synthesis and boundary-condition test generation',
        'Rapid comprehension and dependency mapping across unfamiliar codebases',
        'Documentation generation, API contract analysis, and migration planning',
      ],
    },
    {
      id: 'sphere-app-capabilities',
      title: 'In-Application AI Capabilities',
      kicker: 'SPHERE 02 // APPLICATION CAPABILITIES',
      description:
        'Integrating Generative AI and LLM APIs directly into software applications to solve complex informational, extraction, and automation challenges.',
      capabilities: [
        'Content processing, structured summarization, and automated classification',
        'Contextual information extraction and intelligent document search',
        'Natural-language interfaces and AI-assisted workflow automation',
        'Deterministic validation and strict guardrails for non-deterministic model outputs',
      ],
    },
  ],
};
