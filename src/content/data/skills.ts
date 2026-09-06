import type { SkillPillarGroup } from '../models';

export const skillPillarsData: readonly SkillPillarGroup[] = [
  {
    pillar: 'BUILD',
    label: 'Build',
    purpose: 'Full-stack application engineering from reactive user interfaces to scalable MVC backend systems.',
    description:
      'Constructing robust web applications with modern frontend frameworks and structured, high-performance backends.',
    architecturalRole: 'Core Application Layer (Presentation & Business Logic)',
    subcategories: [
      {
        name: 'Frontend Engineering',
        skills: [
          'React',
          'TypeScript',
          'Vue',
          'Angular',
          'JavaScript (ES6+)',
          'Tailwind CSS',
          'HTML5 / CSS3',
          'Bootstrap',
          'Webpack',
        ],
        context: 'Type-safe component architectures, reactive state management, and accessible responsive interfaces.',
      },
      {
        name: 'Backend Systems',
        skills: [
          'Laravel',
          'PHP',
          'Node.js',
          'Express.js',
          'Python',
          'FastAPI',
          'Django',
        ],
        context: 'Clean MVC structures, RESTful micro-services, and asynchronous event handling.',
      },
    ],
  },
  {
    pillar: 'ARCHITECT',
    label: 'Architect',
    purpose: 'Designing scalable system topologies, interface contracts, state transitions, and asynchronous workflows.',
    description:
      'Formulating end-to-end system designs that isolate faults, enforce strong contracts, and scale gracefully.',
    architecturalRole: 'System Design & State Coordination',
    subcategories: [
      {
        name: 'API & Contract Design',
        skills: ['RESTful APIs', 'GraphQL', 'OAuth 2.0', 'JSON / XML', 'Swagger / OpenAPI'],
        context: 'Consistent API contracts, versioning, rate limiting, and strict input validation schemas.',
      },
      {
        name: 'System Topology & Flows',
        skills: [
          'Modular Architecture',
          'State Transition Design',
          'Asynchronous Queues',
          'User Flows',
          'System Blueprints',
        ],
        context: 'Decoupled presentation/data boundaries, event queues, and state machine transitions.',
      },
    ],
  },
  {
    pillar: 'INTEGRATE',
    label: 'Integrate',
    purpose: 'Connecting enterprise CRMs, payment gateways, and third-party ecosystems with resilient event flows.',
    description:
      'Implementing idempotent webhook handlers, secure payment lifecycles, and bidirectional data synchronization.',
    architecturalRole: 'External Ecosystems & Webhook Pipelines',
    subcategories: [
      {
        name: 'Payment & Subscription Gateways',
        skills: ['Stripe', 'PayPal', 'Webhook Handlers', 'Recurring Billing Automation', 'Payment Gateways'],
        context: 'Idempotent transaction processing, failure recovery, and automated subscription access governance.',
      },
      {
        name: 'CRM & Enterprise Synchronization',
        skills: ['Zoho CRM', 'HubSpot', 'Google APIs', 'Social APIs', 'Data Synchronization Pipelines'],
        context: 'Bi-directional contact and deal synchronization, batch processing, and event-driven automation.',
      },
      {
        name: 'Commerce & Content Platforms',
        skills: ['Magento 2', 'WordPress', 'Shopify', 'Webflow', 'Custom Module Extensions'],
        context: 'Custom extension engineering, catalogue/cart workflows, and enterprise commerce integration.',
      },
    ],
  },
  {
    pillar: 'DATA',
    label: 'Data',
    purpose: 'Modeling relational schemas, persistence strategies, low-latency caching, and full-text search indexing.',
    description:
      'Ensuring relational integrity, sub-second query execution, and resilient data storage at scale.',
    architecturalRole: 'Persistence, Caching & Query Optimization',
    subcategories: [
      {
        name: 'Relational & Document Persistence',
        skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQL Schema Design', 'Database Normalization'],
        context: 'Complex relational schemas, ACID transactions, foreign key constraints, and indexing.',
      },
      {
        name: 'Caching & Search Engines',
        skills: ['Redis Caching', 'Elasticsearch', 'Query Optimization', 'Index Tuning', 'In-Memory Queues'],
        context: 'Targeted composite indexing, query execution plan tuning, and cache invalidation strategies.',
      },
    ],
  },
  {
    pillar: 'DEPLOY',
    label: 'Deploy',
    purpose: 'Packaging containerized workloads, configuring web servers, and maintaining reliable cloud environments.',
    description:
      'Managing predictable deployments across cloud infrastructure with automated CI/CD validation.',
    architecturalRole: 'Infrastructure, Cloud & Runtime Operations',
    subcategories: [
      {
        name: 'Cloud Hosting & Containers',
        skills: ['Docker', 'AWS (EC2, S3, Cloud9)', 'Google Cloud', 'DigitalOcean', 'Environment Configuration'],
        context: 'Containerized development and production environments with cloud storage and compute.',
      },
      {
        name: 'Web Servers & Pipelines',
        skills: ['Nginx', 'Apache', 'CI/CD/CT Pipelines', 'SSL Termination', 'Production Troubleshooting'],
        context: 'Reverse proxy routing, static asset caching, automated build pipelines, and production diagnostics.',
      },
    ],
  },
  {
    pillar: 'TEST',
    label: 'Test',
    purpose: 'Safeguarding system correctness through automated test suites, regression prevention, and contract validation.',
    description:
      'Applying test-driven discipline across unit, integration, and end-to-end user journeys.',
    architecturalRole: 'Automated Verification & Quality Assurance',
    subcategories: [
      {
        name: 'Automated Testing Frameworks',
        skills: ['PHPUnit', 'Jest', 'Selenium', 'Test-Driven Development (TDD)', 'Regression Testing'],
        context: 'Unit testing backend business logic, UI component verification, and end-to-end regression runs.',
      },
      {
        name: 'API Validation & Version Control',
        skills: ['Postman', 'Swagger', 'Git', 'GitHub', 'GitLab', 'Bitbucket'],
        context: 'Automated endpoint contract testing, branch protection rules, and peer review workflows.',
      },
    ],
  },
  {
    pillar: 'MODERNIZE',
    label: 'Modernize',
    purpose: 'Pragmatically reducing technical debt, updating deprecated dependencies, and hardening application security.',
    description:
      'Transforming legacy codebases into modern, maintainable architectures without risky all-at-once rewrites.',
    architecturalRole: 'Refactoring, Security Hardening & Debt Reduction',
    subcategories: [
      {
        name: 'Legacy Refactoring & Architecture',
        skills: [
          'Incremental Modernization',
          'Technical Debt Reduction',
          'Dependency Auditing',
          'Deprecation Remediation',
        ],
        context: 'Replacing fragile subsystems incrementally while preserving live production traffic.',
      },
      {
        name: 'Security Posture & Governance',
        skills: [
          'Role-Based Access Control (RBAC)',
          'Input Validation',
          'API Security',
          'Vulnerability Remediation',
        ],
        context: 'Enforcing least-privilege access, eliminating data exposure, and addressing legacy CVEs.',
      },
    ],
  },
  {
    pillar: 'INTELLIGENCE',
    label: 'Intelligence',
    purpose: 'Amplifying engineering velocity and application capability with Generative AI and LLM workflows.',
    description:
      'Employing AI models for code synthesis, testing, and intelligent features while maintaining human architectural rigor.',
    architecturalRole: 'AI Augmentation & Accelerated Workflows',
    subcategories: [
      {
        name: 'LLM & AI Feature Integration',
        skills: ['Generative AI', 'LLM Integration', 'AI Application Integration', 'Workflow Automation'],
        context: 'Embedding intelligent capabilities into business applications and automate repetitive workflows.',
      },
      {
        name: 'AI-Augmented Engineering',
        skills: [
          'AI-Assisted Coding',
          'Automated Refactoring & Debugging',
          'Test Case Synthesis',
          'Requirement Decomposition',
        ],
        context: 'Accelerating exploration, test coverage generation, and rapid prototyping with LLM tools.',
      },
    ],
  },
];
