import type { ProfileContent } from '../models';

export const profileData: ProfileContent = {
  name: 'Tajinder Singh',
  title: 'Senior Software Engineer',
  positioning:
    'Full-stack engineer focused on system architecture, technical leadership, scalable web applications, modernization, and AI-augmented development.',
  summary:
    'Senior Software Engineer with 7+ years of professional experience building, modernizing, and supporting scalable web applications across diverse business domains. Experienced across the complete SDLC: requirements, analysis, system design, development, testing, deployment, and production support. Strong at understanding unfamiliar domains, translating business requirements into practical technical solutions, and taking ownership from idea to production.',
  experienceYears: '7+',
  internationalReach: ['US', 'UK', 'Canada', 'Australia', 'Europe'],
  promise: {
    headline:
      'I build scalable, secure, and intelligent software systems—turning complex business problems into practical engineering solutions.',
    supportingMessage:
      'Senior Software Engineer · Full-Stack Engineering · System Architecture · Technical Leadership · AI-Augmented Development',
  },
  principles: [
    'Understand deeply.',
    'Design deliberately.',
    'Build cleanly.',
    'Test thoroughly.',
    'Collaborate openly.',
    'Automate intelligently.',
    'Modernize pragmatically.',
    'Keep learning.',
  ],
  systemThinking: {
    summary:
      'I approach applications as complete systems rather than isolated features. For complex issues, I trace the full path to identify the root cause before choosing a solution.',
    tracePath: [
      'Frontend',
      'API',
      'Backend',
      'Database',
      'External Services',
      'Infrastructure',
    ],
    traceNodes: [
      {
        id: 'node-frontend',
        label: 'Frontend',
        layer: 'Client & UI Layer',
        diagnosticFocus:
          'State synchronization, render lifecycle, network latency perception, and contract compliance.',
        keyConsiderations: [
          'Unidirectional state flow',
          'Defensive UI error boundaries',
          'Optimistic updates with rollback',
        ],
        tools: ['react', 'tailwind', 'materialui', 'bootstrap', 'css', 'html', 'figma', 'ts', 'js'],
      },
      {
        id: 'node-api',
        label: 'API Gateway',
        layer: 'Interface & Contract Layer',
        diagnosticFocus:
          'Request payload validation, authentication verification, rate limiting, and contract consistency.',
        keyConsiderations: [
          'Strict input schema validation',
          'JWT / session authentication',
          'Consistent HTTP status semantics',
        ],
        tools: ['graphql', 'postman', 'swagger'],
      },
      {
        id: 'node-backend',
        label: 'Backend',
        layer: 'Application & Domain Logic',
        diagnosticFocus:
          'Business rule integrity, concurrency handling, idempotency, and asynchronous job processing.',
        keyConsiderations: [
          'Idempotent transaction handling',
          'Asynchronous queue dispatching',
          'Layered fault isolation',
        ],
        tools: ['laravel', 'nodejs', 'express', 'python', 'django'],
      },
      {
        id: 'node-database',
        label: 'Database',
        layer: 'Persistence & Data Integrity',
        diagnosticFocus:
          'Query efficiency, index utilization, connection pool saturation, and schema constraints.',
        keyConsiderations: [
          'Targeted composite indexing',
          'Atomic transaction boundaries',
          'N+1 query prevention',
        ],
        tools: ['postgresql', 'mysql', 'mongodb', 'redis', 'elasticsearch'],
      },
      {
        id: 'node-external',
        label: 'External Services',
        layer: 'Third-Party Integration Layer',
        diagnosticFocus:
          'External API timeouts, webhook delivery reliability, rate limit management, and data drift.',
        keyConsiderations: [
          'Idempotent webhook receivers',
          'Exponential backoff & retries',
          'Fallback states on third-party outage',
        ],
        tools: ['github', 'gitlab', 'wordpress', 'paypal', 'stripe', 'zoho', 'hubspot', 'squarespace'],
      },
      {
        id: 'node-infrastructure',
        label: 'Infrastructure',
        layer: 'Runtime, Cloud & DevOps',
        diagnosticFocus:
          'Container health, memory/CPU saturation, reverse proxy routing, and deployment consistency.',
        keyConsiderations: [
          'Dockerized environments',
          'Automated CI/CD validation pipelines',
          'Nginx reverse proxy & SSL termination',
        ],
        tools: ['docker', 'nginx', 'githubactions', 'aws', 'linux', 'bash'],
      },
    ],
    focus: 'Identify the root cause before choosing a solution.',
  },
  engineeringBreadth: [
    {
      category: 'Full Stack',
      description: 'End-to-end web engineering across frontend, backend, database, and APIs.',
    },
    {
      category: 'Architecture',
      description: 'System design, modular scalability, data flow, and reliable patterns.',
    },
    {
      category: 'AI',
      description: 'Generative AI integration, workflow automation, and AI-assisted engineering.',
    },
    {
      category: 'Domains',
      description: 'Deep business understanding across E-commerce, EdTech, Publishing, and CRM.',
    },
    {
      category: 'Integrations',
      description: 'Complex third-party APIs, payment gateways, webhooks, and sync pipelines.',
    },
    {
      category: 'Leadership',
      description: 'Technical ownership, international client collaboration, and engineer mentoring.',
    },
  ],
  philosophyThemes: [
    {
      id: 'theme-understanding',
      title: 'Problem Understanding Before Implementation',
      summary:
        'Thorough analysis of unfamiliar business domains and workflows precedes coding. Defining boundaries early avoids premature abstraction.',
      keyDecisions: [
        'Domain requirement mapping',
        'State transition blueprints',
        'Root-cause diagnostics over superficial patching',
      ],
      iconLabel: 'DIAGNOSE',
    },
    {
      id: 'theme-system-thinking',
      title: 'Architecture & System-Level Thinking',
      summary:
        'Applications are complete ecosystems. Engineering decisions balance immediate delivery with modular maintainability and long-term stability.',
      keyDecisions: [
        'End-to-end tracing (Frontend to Cloud)',
        'Decoupled presentation & data layers',
        'Layered fault isolation',
      ],
      iconLabel: 'ARCHITECT',
    },
    {
      id: 'theme-ownership',
      title: 'Full-Stack Ownership & Reliability',
      summary:
        'Accountability from initial blueprint through deployment and production monitoring. Software must be dependable in live environments.',
      keyDecisions: [
        'Complete SDLC ownership',
        'Automated CI/CD validation',
        'Production issue investigation',
      ],
      iconLabel: 'DELIVER',
    },
    {
      id: 'theme-integrations',
      title: 'Resilient Third-Party Integrations',
      summary:
        'Connecting enterprise platforms, payment gateways, and CRMs with robust webhook handling and idempotent data synchronization.',
      keyDecisions: [
        'CRM data sync (Zoho & HubSpot)',
        'Payment workflows (Stripe & PayPal)',
        'Graceful recovery on external API failures',
      ],
      iconLabel: 'INTEGRATE',
    },
    {
      id: 'theme-modernization',
      title: 'Security & Pragmatic Modernization',
      summary:
        'Protecting data exposure with strict RBAC while incrementally modernizing legacy applications without risky, expensive rewrites.',
      keyDecisions: [
        'Role-Based Access Control (RBAC)',
        'Technical debt reduction',
        'Aging dependency and security remediation',
      ],
      iconLabel: 'SECURE',
    },
    {
      id: 'theme-collaboration',
      title: 'Cross-Functional & Agile Delivery',
      summary:
        'Bridging engineering with UI/UX design (Figma), QA/SDETs, and international stakeholders across the US, UK, and Europe.',
      keyDecisions: [
        'Iterative Agile / Scrum / Kanban',
        'Clear risk and dependency communication',
        'Mentoring and engineering best practices',
      ],
      iconLabel: 'COLLABORATE',
    },
    {
      id: 'theme-ai',
      title: 'AI-Augmented Engineering',
      summary:
        'Leveraging Generative AI and LLMs to accelerate code synthesis, testing, and exploration—while architectural correctness remains a human engineering responsibility.',
      keyDecisions: [
        'Engineering quality remains human',
        'AI-accelerated testing & refactoring',
        'Continuous technical evolution',
      ],
      iconLabel: 'AUGMENT',
    },
  ],
  collaboration: {
    crossFunctional: [
      'Developers and technical leads',
      'UI/UX designers',
      'QA engineers and SDETs',
      'Infrastructure and DevOps teams',
      'Product and business stakeholders',
      'Client representatives',
    ],
    agileSdlcSteps: [
      'Requirements',
      'Analysis',
      'Design',
      'Development',
      'Testing',
      'Review',
      'CI/CD',
      'Deployment',
      'Production',
      'Improvement',
    ],
    uiUxProduct: [
      'System designs and user flows',
      'User personas and blueprints',
      'Wireframes and mockups',
      'User guides and UI/UX feasibility',
      'Translating designs into production interfaces',
      'Designer-engineer collaboration (Figma)',
    ],
    cloudReliability: [
      'AWS (EC2, S3, Cloud9)',
      'Google Cloud',
      'DigitalOcean',
      'Docker',
      'CI/CD/CT',
      'Nginx and Apache',
      'Deployment, environment configuration, reliability, and troubleshooting',
    ],
    securityModernization: [
      'Authentication, authorization, and role-based access',
      'API security and input validation',
      'Document and data exposure controls',
      'External integrations and dependency management',
      'Controlled modernization of legacy applications and technical debt',
    ],
  },
};
