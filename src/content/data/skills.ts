import type { SkillPillarGroup } from '../models';

export const skillPillarsData: readonly SkillPillarGroup[] = [
  {
    pillar: 'BUILD',
    label: 'Build',
    description:
      'Designing and developing scalable, maintainable full-stack systems across frontend, backend, and data tiers.',
    subcategories: [
      {
        name: 'Frontend Engineering',
        skills: [
          'React',
          'TypeScript',
          'Vue',
          'Angular',
          'JavaScript (ES6+)',
          'HTML5',
          'CSS3',
          'Tailwind CSS',
          'Bootstrap',
          'jQuery',
          'Webpack',
        ],
      },
      {
        name: 'Backend Systems',
        skills: [
          'Laravel',
          'PHP',
          'Python',
          'Django',
          'FastAPI',
          'Node.js',
          'Express.js',
        ],
      },
      {
        name: 'Database Architecture & Search',
        skills: [
          'MySQL',
          'PostgreSQL',
          'MongoDB',
          'Redis',
          'Elasticsearch',
          'SQL',
          'NoSQL',
        ],
      },
      {
        name: 'API Design',
        skills: ['RESTful APIs', 'GraphQL', 'OAuth', 'JSON', 'XML'],
      },
    ],
  },
  {
    pillar: 'SCALE',
    label: 'Scale',
    description:
      'Architecting for reliability, low latency, caching, and robust cloud infrastructure.',
    subcategories: [
      {
        name: 'Architecture & Performance',
        skills: [
          'System Architecture',
          'Modular Architecture',
          'Performance Optimization',
          'Query Optimization',
          'State Management',
        ],
      },
      {
        name: 'Cloud & Infrastructure',
        skills: [
          'AWS (EC2, S3, Cloud9)',
          'Google Cloud',
          'DigitalOcean',
          'Docker',
          'Nginx',
          'Apache',
        ],
      },
      {
        name: 'Caching & Background Jobs',
        skills: ['Redis Caching', 'Queues', 'Background Jobs', 'Asynchronous Processing'],
      },
    ],
  },
  {
    pillar: 'INTEGRATE',
    label: 'Integrate',
    description:
      'Connecting platforms, payment gateways, CRMs, and third-party ecosystems with resilient event flows.',
    subcategories: [
      {
        name: 'CRM & Enterprise Systems',
        skills: ['Zoho CRM', 'HubSpot', 'Data Synchronization', 'Business Workflow Automation'],
      },
      {
        name: 'Payments & Commerce',
        skills: ['Stripe', 'PayPal', 'Payment Gateways', 'Subscription Workflows', 'Magento 2', 'Shopify', 'WordPress'],
      },
      {
        name: 'External Services & Webhooks',
        skills: ['Webhooks', 'Google APIs', 'Social APIs', 'Event-Driven Synchronization'],
      },
    ],
  },
  {
    pillar: 'MODERNIZE',
    label: 'Modernize',
    description:
      'Refactoring legacy codebases, strengthening security postures, reducing technical debt, and automating pipelines.',
    subcategories: [
      {
        name: 'Legacy Migration & Refactoring',
        skills: [
          'Incremental Modernization',
          'Technical Debt Reduction',
          'Dependency Auditing',
          'Deprecation Remediation',
        ],
      },
      {
        name: 'Security & Access Control',
        skills: [
          'Role-Based Access Control (RBAC)',
          'Input Validation',
          'API Security',
          'Vulnerability Remediation',
        ],
      },
      {
        name: 'Testing & CI/CD',
        skills: [
          'PHPUnit',
          'Jest',
          'Selenium',
          'TDD',
          'CI/CD/CT Pipelines',
          'Git',
          'GitHub',
          'GitLab',
          'Bitbucket',
        ],
      },
    ],
  },
  {
    pillar: 'INTELLIGENCE',
    label: 'Intelligence',
    description:
      'Applying Generative AI, LLM tooling, and workflow automation as engineering multipliers without compromising correctness.',
    subcategories: [
      {
        name: 'Generative AI & LLMs',
        skills: [
          'LLM Integration',
          'Generative AI',
          'Intelligent Search',
          'Summarization & Classification',
        ],
      },
      {
        name: 'AI-Assisted Development',
        skills: [
          'AI-Assisted Coding',
          'Automated Refactoring & Debugging',
          'Test Generation',
          'Code Analysis',
          'Requirement Decomposition',
        ],
      },
    ],
  },
];
