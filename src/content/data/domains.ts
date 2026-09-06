import type { DomainItem } from '../models';

export const domainsData: readonly DomainItem[] = [
  {
    id: 'domain-ecommerce',
    name: 'E-commerce Platforms',
    tag: 'COMMERCE',
    summary:
      'High-volume B2C commerce architectures covering product catalogues, shopping carts, checkout funnels, and payment settlement.',
    problemSpace:
      'Converting visitors into buyers through fast product discovery, reliable shopping carts, dynamic stock updates, and frictionless checkout while ensuring high concurrency resilience.',
    systemTypes: [
      'B2C digital storefronts',
      'Hierarchical product catalogue systems',
      'Multi-step checkout pipelines',
      'Customer account & order management portals',
    ],
    engineeringConcerns: [
      'Cart abandonment minimization through low-latency checkout paths',
      'Cache invalidation and inventory concurrency synchronization',
      'Database query performance across deep product taxonomy structures',
      'Idempotent payment transactions and PCI-compliant processing',
    ],
    integrationsWorkflows: [
      'Stripe & PayPal payment gateway integrations',
      'Webhook-driven order confirmation & fulfillment dispatches',
      'Custom Magento 2 module extensions and third-party plugin optimization',
      'Inventory and ERP order synchronization workflows',
    ],
    relevantTechnologies: [
      'Magento 2',
      'PHP',
      'MySQL',
      'Elasticsearch',
      'Redis',
      'Stripe',
      'PayPal',
      'REST APIs',
    ],
  },
  {
    id: 'domain-edtech',
    name: 'EdTech & Learning Platforms',
    tag: 'EDTECH',
    summary:
      'Learner progress tracking, modular courseware delivery, educational content management, and platform integrations.',
    problemSpace:
      'Delivering engaging, structured digital learning pathways that maintain progress state, authenticate diverse student roles, and scale across academic cohorts.',
    systemTypes: [
      'Learning management systems (LMS)',
      'Interactive student progress dashboards',
      'Modular educational content repositories',
      'Assessment and certification delivery workflows',
    ],
    engineeringConcerns: [
      'Accurate asynchronous learner progress persistence across devices',
      'Role-based authorization separating students, instructors, and administrators',
      'Optimized media and document delivery with minimal latency',
      'Resilient state management during intermittent student network connectivity',
    ],
    integrationsWorkflows: [
      'Third-party educational content and video streaming embeds',
      'Automated milestone completion and certificate issuance pipelines',
      'Single Sign-On (SSO) and student profile synchronization',
      'Instructor evaluation and student feedback submission loops',
    ],
    relevantTechnologies: [
      'React',
      'TypeScript',
      'Laravel',
      'PHP',
      'PostgreSQL',
      'MySQL',
      'REST APIs',
    ],
  },
  {
    id: 'domain-publishing',
    name: 'Content & Article Publishing',
    tag: 'PUBLISHING',
    summary:
      'Multi-stage editorial lifecycles, submission pipelines, peer review coordination, and role-based document publication.',
    problemSpace:
      'Managing high-volume content pipelines with complex governance—ensuring confidential review processes, versioned editorial revisions, and structured publication approval ladders.',
    systemTypes: [
      'Enterprise content publishing platforms',
      'Author manuscript submission portals',
      'Editorial review and peer-feedback engines',
      'Digital asset and document staging repositories',
    ],
    engineeringConcerns: [
      'Strict role-based access control (RBAC) isolating author, reviewer, and editor views',
      'Deterministic document state transitions (Draft → Review → Revision → Approval → Published)',
      'Document and media exposure prevention on confidential submissions',
      'Controlled modernization of legacy editorial codebases without workflow interruptions',
    ],
    integrationsWorkflows: [
      'External cloud storage and document transformation APIs',
      'Automated editorial milestone notifications and reviewer assignment queues',
      'Multi-format publication dispatchers (Web, PDF, structured archives)',
      'Audit trails tracking every editorial modification and decision',
    ],
    relevantTechnologies: [
      'Laravel',
      'React',
      'TypeScript',
      'PostgreSQL',
      'Docker',
      'AWS S3',
      'REST APIs',
    ],
  },
  {
    id: 'domain-crm',
    name: 'CRM & Enterprise Applications',
    tag: 'ENTERPRISE',
    summary:
      'Business applications integrated with Zoho and HubSpot, featuring bi-directional synchronization, webhooks, and process automation.',
    problemSpace:
      'Eliminating data silos between customer-facing platforms and back-office enterprise tools, keeping contacts, deals, and service accounts synchronized in real time.',
    systemTypes: [
      'CRM integration middleware',
      'Customer and subscription management platforms',
      'Executive analytics and operational dashboards',
      'Automated account and lead processing services',
    ],
    engineeringConcerns: [
      'Bi-directional synchronization consistency and conflict resolution',
      'Managing third-party API rate limits through batching and queue dispatching',
      'Idempotent webhook receivers with failure backoff and retry policies',
      'Securing sensitive customer PII across network boundaries',
    ],
    integrationsWorkflows: [
      'Zoho CRM and HubSpot bi-directional API pipelines',
      'Stripe subscription and payment webhook handlers',
      'Automated user provisioning and credential lifecycle triggers',
      'Real-time metrics calculation for administrative dashboards',
    ],
    relevantTechnologies: [
      'Node.js',
      'Express',
      'PHP',
      'Zoho CRM API',
      'HubSpot API',
      'Stripe API',
      'Webhooks',
      'Redis',
    ],
  },
  {
    id: 'domain-workflows',
    name: 'Workflow & Document Systems',
    tag: 'WORKFLOWS',
    summary:
      'Complex business processes involving multi-user collaboration, granular permissions, documents, approvals, and state machines.',
    problemSpace:
      'Automating mission-critical organizational workflows where multiple departments must approve, sign, or verify documents under strict compliance and auditability requirements.',
    systemTypes: [
      'Multi-party workflow orchestration engines',
      'Contract and document approval platforms',
      'Administrative compliance and audit dashboards',
      'Asynchronous background processing worker pools',
    ],
    engineeringConcerns: [
      'Finite state machine enforcement preventing invalid transition paths',
      'Immutable audit trails and non-repudiable user action logging',
      'High-throughput background file processing without degrading interactive web requests',
      'Mitigating legacy technical debt through modular architectural decoupling',
    ],
    integrationsWorkflows: [
      'Multi-stage approval ladders with conditional escalation rules',
      'Asynchronous document generation, watermarking, and conversion queues',
      'Email and internal webhook notification dispatches upon status updates',
      'Document access revocation and permission expiry automation',
    ],
    relevantTechnologies: [
      'TypeScript',
      'Laravel',
      'PHP',
      'PostgreSQL',
      'MySQL',
      'Docker',
      'Queue Workers',
      'Nginx',
    ],
  },
  {
    id: 'domain-ai',
    name: 'AI-Enabled Applications & Automation',
    tag: 'INTELLIGENCE',
    summary:
      'Intelligent applications and software delivery workflows augmented with Generative AI, LLMs, and workflow automation.',
    problemSpace:
      'Solving complex informational bottlenecks by extracting insights from unstructured text, automating classification, and synthesizing content without sacrificing engineering correctness.',
    systemTypes: [
      'LLM-augmented business applications',
      'Intelligent search and information retrieval pipelines',
      'Automated document classification and extraction tools',
      'AI-accelerated software engineering workflows',
    ],
    engineeringConcerns: [
      'Deterministic validation of non-deterministic LLM responses',
      'Latency masking and optimistic user feedback during model inference',
      'Isolating model failures so core business workflows continue unimpeded',
      'Engineering rigor: ensuring human oversight of architecture, security, and test quality',
    ],
    integrationsWorkflows: [
      'Generative AI and LLM API integrations with rate and cost management',
      'Automated document summarization and metadata tagging pipelines',
      'AI-assisted test generation and code refactoring workflows',
      'Contextual semantic information extraction routines',
    ],
    relevantTechnologies: [
      'Generative AI',
      'LLMs',
      'Python',
      'FastAPI',
      'TypeScript',
      'Node.js',
      'Redis',
      'Docker',
    ],
  },
];
