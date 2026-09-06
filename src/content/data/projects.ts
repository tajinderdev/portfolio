import type { ProjectCaseStudy, PublicReference } from '../models';

export const projectsData: readonly ProjectCaseStudy[] = [
  {
    id: 'project-content-platform',
    title: 'Enterprise Content Publishing Platform',
    subtitle: 'High-Governance Editorial Lifecycle & Document Pipeline',
    type: 'Confidential enterprise application',
    domainTag: 'PUBLISHING',
    description:
      'Complex submission, editorial, review, document, approval, and publication workflows.',
    focus: [
      'Full-stack engineering',
      'Workflow architecture',
      'Integrations',
      'Security',
      'Modernization',
    ],
    technologies: [
      'React',
      'TypeScript',
      'Laravel',
      'PHP',
      'PostgreSQL',
      'Docker',
      'AWS S3',
      'REST APIs',
    ],
    isConfidential: true,
    reasoning: {
      context:
        'Senior Software Engineer (2023 – Present) leading full-stack delivery for a high-governance enterprise publishing platform handling thousands of academic and specialized manuscripts.',
      problem:
        'Managing multi-stage editorial lifecycles—author manuscript submissions, peer review coordination, revision tracking, multi-tier editorial approval ladders, and final publication—within an aging legacy codebase prone to workflow bottlenecks and untracked document modifications.',
      constraints: [
        'Strict client, author, and manuscript confidentiality throughout all review stages.',
        'Zero downtime allowable for active ongoing publication and review cycles.',
        'Pragmatic modernization required without risky full-system rewrites.',
        'Rigid role separation between Authors, Peer Reviewers, Section Editors, and Chief Editors.',
      ],
      engineeringApproach:
        'Applied incremental modernization over a high-risk rewrite. Replaced fragmented conditional logic with an explicit, auditable finite state machine (Draft → Submitted → Peer Review → Revision Requested → Editorial Approval → Published) with strict transition guards and automated event emission.',
      architectureThinking:
        'Decoupled the user interface into modular React components with accessible forms, backed by a clean MVC backend. Separated intensive file conversion and notification dispatching into dedicated background workers to keep interactive API response times low.',
      architectureDiagram: {
        title: 'Editorial Workflow & Document Pipeline Topology',
        nodes: [
          { id: 'n1', label: 'Editorial Web Client', role: 'React / TypeScript Author & Editor Portal', tier: 'client' },
          { id: 'n2', label: 'Auth & RBAC Middleware', role: 'Role verification & CSRF protection', tier: 'gateway' },
          { id: 'n3', label: 'Workflow State Machine', role: 'Deterministic editorial lifecycle engine', tier: 'app' },
          { id: 'n4', label: 'Asynchronous Worker Pool', role: 'Document transformation & notification queues', tier: 'worker' },
          { id: 'n5', label: 'Revision & Audit Store', role: 'PostgreSQL immutable version histories', tier: 'data' },
          { id: 'n6', label: 'Cloud Document Storage', role: 'Encrypted asset and manuscript repository', tier: 'external' },
        ],
        dataFlow: [
          'Author uploads manuscript through authenticated React portal with granular access tokens.',
          'Gateway validates role permissions, sanitizes payload, and invokes Workflow State Machine.',
          'State machine transitions document status and queues asynchronous document transformation.',
          'Worker pool generates blinded review copies and dispatches peer review invitations.',
          'Audit store logs non-repudiable timestamped events for every reviewer and editor decision.',
        ],
      },
      integrations: [
        'External cloud document storage (AWS S3) with pre-signed access URLs for secure file handling.',
        'Automated multi-format document conversion pipeline (manuscript formatting and PDF generation).',
        'Transactional notification system for peer-review reminders and editorial stage milestones.',
        'Comprehensive audit logging integration tracking every user decision and file modification.',
      ],
      securityConsiderations: [
        'Strict Role-Based Access Control (RBAC) isolating author, reviewer, and editor views.',
        'Blind-review document sanitization preventing metadata leakage on confidential submissions.',
        'Immutable audit trails ensuring full traceability across all editorial actions and reviews.',
        'Encrypted document storage with time-limited pre-signed URLs to prevent unauthorized direct downloads.',
      ],
      performanceConsiderations: [
        'Offloaded compute-heavy document conversions and PDF generation to asynchronous background workers.',
        'Indexed query optimization across deep manuscript revision tables and review histories.',
        'Client-side optimistic status updates paired with deterministic server-side reconciliation.',
      ],
      deliveryCollaboration:
        'Delivered in iterative Agile sprints with distributed international teams (UK/Europe). Collaborated directly with QA engineers on end-to-end regression suites and with domain stakeholders to validate compliance rules.',
      outcome:
        'Successfully eliminated workflow bottlenecks, established verifiable document states, protected confidential submission data, and modernized legacy architectural components without disrupting production publishing operations.',
      engineeringInsight:
        'When modernizing complex legacy workflows, an explicit finite state machine with immutable audit logging provides the highest architectural return on investment—it transforms unpredictable side-effects into deterministic, testable transitions.',
    },
  },
  {
    id: 'project-subscription-platform',
    title: 'Subscription & Customer Management Platform',
    subtitle: 'Event-Driven SaaS Billing & Automated Account Lifecycle',
    type: 'Customer and subscription management',
    domainTag: 'SUBSCRIPTION',
    description:
      'Business platform with recurring payments, subscription workflows, dashboards, and automated account processes.',
    focus: [
      'Laravel',
      'Stripe',
      'Webhooks',
      'Background jobs and queues',
      'Cloud deployment',
    ],
    technologies: [
      'Laravel',
      'PHP',
      'Stripe API',
      'Redis',
      'PostgreSQL',
      'Docker',
      'Tailwind CSS',
      'REST APIs',
    ],
    isConfidential: true,
    reasoning: {
      context:
        'Senior Software Engineer (2023) leading the end-to-end technical development and architecture of a customer and subscription management platform.',
      problem:
        'Coordinating recurring subscription billing, dynamic account provisioning, and access revocations across external platforms without state drift, payment drop-offs, or webhook race conditions.',
      constraints: [
        'Out-of-order and duplicate webhook deliveries from external payment providers.',
        'Strict PCI compliance: zero raw credit card data handled on application servers.',
        'Zero tolerance for double billing, missed access revocations, or failed subscription renewals.',
      ],
      engineeringApproach:
        'Engineered an event-driven webhook processing pipeline backed by cryptographic signature verification, idempotency keys, and asynchronous queue workers. Decoupled billing transaction processing from core web request threads.',
      architectureThinking:
        'Adopted a service-oriented backend structure separating HTTP controllers, billing domain services, queue dispatchers, and external platform adapters. Built administrative dashboards with real-time operational metrics and caching.',
      architectureDiagram: {
        title: 'Event-Driven Subscription & Webhook Pipeline',
        nodes: [
          { id: 'n1', label: 'Customer / Admin UI', role: 'Responsive subscription portal & dashboard', tier: 'client' },
          { id: 'n2', label: 'API & Webhook Ingestion', role: 'HMAC signature verification & route handler', tier: 'gateway' },
          { id: 'n3', label: 'Subscription Engine', role: 'Subscription state and entitlement domain services', tier: 'app' },
          { id: 'n4', label: 'Queue Worker Pool', role: 'Redis-backed asynchronous account provisioning', tier: 'worker' },
          { id: 'n5', label: 'Database & Redis Cache', role: 'PostgreSQL customer data & Redis metrics store', tier: 'data' },
          { id: 'n6', label: 'Stripe Billing & Platforms', role: 'Stripe payment gateway & external access APIs', tier: 'external' },
        ],
        dataFlow: [
          'Customer selects plan; Stripe Elements securely collects payment tokens directly.',
          'Stripe dispatches signed webhook events upon successful payment or recurring renewal.',
          'Gateway validates cryptographic signature, checks idempotency key, and acknowledges 200 OK.',
          'Background queue worker processes subscription entitlement and syncs external access.',
          'Real-time administrative dashboards reflect active subscriber counts and MRR via cached aggregates.',
        ],
      },
      integrations: [
        'Stripe Payment Gateway & Billing APIs for recurring customer subscription lifecycles.',
        'Webhook listener architecture handling asynchronous invoice, payment, and cancellation events.',
        'External platform communication and identity APIs for automated credential provisioning.',
      ],
      securityConsiderations: [
        'Cryptographic HMAC signature verification on all incoming Stripe webhook events.',
        'PCI-compliant tokenized payment handling with zero sensitive payment card data touched.',
        'Role-based access controls for administrative dashboards with rate-limited sensitive actions.',
      ],
      performanceConsiderations: [
        'Immediate 200 OK responses to webhook dispatches, offloading heavy processing to Redis queues.',
        'Redis caching for heavy administrative dashboard metrics to minimize analytical database load.',
        'Exponential backoff and dead-letter queues preventing queue worker exhaustion on third-party outages.',
      ],
      deliveryCollaboration:
        'Owned full technical delivery from architecture through deployment. Collaborated with UI/UX designers on checkout funnels, QA engineers on edge-case payment scenarios, and business stakeholders on subscription business rules.',
      outcome:
        'Delivered an automated subscription lifecycle from checkout to cancellation, resilient webhook processing with zero dropped payment events, and real-time operational visibility for stakeholders.',
      engineeringInsight:
        'Treat external webhooks as untrusted, asynchronous message boundaries: always verify signatures, record event payloads before execution, and enforce strict idempotency keys to guarantee at-least-once resilience without duplicate actions.',
    },
  },
  {
    id: 'project-ecommerce-platform',
    title: 'E-commerce Platform',
    subtitle: 'High-Concurrency Commerce Architecture & Checkout Optimization',
    type: 'B2C e-commerce',
    domainTag: 'COMMERCE',
    description:
      'Commerce workflows covering products, catalogue, cart, checkout, customer journeys, and integrations.',
    focus: [
      'Magento',
      'Full-stack engineering',
      'APIs',
      'Commerce architecture',
    ],
    technologies: [
      'Magento 2',
      'PHP',
      'MySQL',
      'Elasticsearch',
      'Redis',
      'Stripe',
      'PayPal',
      'REST APIs',
    ],
    isConfidential: true,
    reasoning: {
      context:
        'Software Developer — E-commerce Specialization (2022 – 2023) contributing to a high-volume live B2C digital storefront during intensive Magento 2 specialization.',
      problem:
        'Maintaining high-speed catalogue browsing, checkout funnel reliability, and consistent inventory during peak seasonal traffic spikes across a complex multi-category product catalogue.',
      constraints: [
        'Complex Magento 2 module dependency graph and third-party extension overhead.',
        'Strict payment gateway PCI compliance across international payment flows.',
        'High business cost of checkout drop-off caused by latency or inventory race conditions.',
      ],
      engineeringApproach:
        'Systematically profiled database queries on high-traffic catalogue and cart recalculation endpoints. Refactored custom modules to leverage asynchronous indexers and full-page caching while optimizing third-party extension execution paths.',
      architectureThinking:
        'Engineered a multi-tiered architecture utilizing Elasticsearch for rapid catalog search and filtering, Redis for session and cache storage, and decoupled payment adapters for third-party checkout flows.',
      architectureDiagram: {
        title: 'High-Volume Commerce & Checkout Topology',
        nodes: [
          { id: 'n1', label: 'B2C Storefront Client', role: 'Responsive mobile & desktop shopping interface', tier: 'client' },
          { id: 'n2', label: 'Web Tier & Varnish/Nginx', role: 'Full Page Cache & SSL termination', tier: 'gateway' },
          { id: 'n3', label: 'Magento 2 Commerce Core', role: 'Catalogue, cart, pricing, & custom modules', tier: 'app' },
          { id: 'n4', label: 'Indexer & Cron Workers', role: 'Asynchronous inventory & catalog indexing', tier: 'worker' },
          { id: 'n5', label: 'MySQL & Elasticsearch', role: 'Transactional store & Elasticsearch cluster', tier: 'data' },
          { id: 'n6', label: 'Payment Gateways & ERP', role: 'Stripe, PayPal, & fulfillment integrations', tier: 'external' },
        ],
        dataFlow: [
          'User searches catalogue; Elasticsearch returns faceted results with sub-50ms query times.',
          'Cart additions update Redis session state with optimized item recalculation.',
          'Checkout funnel invokes payment gateway adapter for tokenized card verification.',
          'Order commit triggers inventory reservation and schedules asynchronous indexing.',
          'Webhook confirms payment settlement and dispatches order details to fulfillment services.',
        ],
      },
      integrations: [
        'Stripe and PayPal payment gateway adapters for secure customer checkout transactions.',
        'Elasticsearch cluster integration for high-speed product catalog indexing and search.',
        'Custom Magento 2 module extensions and third-party order dispatch pipelines.',
      ],
      securityConsiderations: [
        'PCI-compliant payment redirects and hosted fields preventing raw card data exposure.',
        'Strict CSRF token validation on all shopping cart mutations and checkout transitions.',
        'Secure session handling and rate limiting protecting against automated inventory reservation abuse.',
      ],
      performanceConsiderations: [
        'Full-page cache optimization and database query minimization on cart recalculation.',
        'Asynchronous indexer scheduling ensuring inventory updates do not block checkout transactions.',
        'Elasticsearch query tuning across deep hierarchical product attributes and variants.',
      ],
      deliveryCollaboration:
        'Worked within an Agile engineering team participating in sprint ceremonies, peer code reviews, and collaborating closely with SDETs and infrastructure specialists.',
      outcome:
        'Maintained resilient storefront availability and checkout stability during seasonal peak volume, reduced catalog search latency, and eliminated payment transaction discrepancies.',
      engineeringInsight:
        'In high-concurrency commerce systems, database performance bottlenecks concentrate in cart recalculations and deep catalogue taxonomy queries—caching must be aggressively layered, and catalog queries must be offloaded to dedicated search engines.',
    },
  },
  {
    id: 'project-crm-platform',
    title: 'CRM-Integrated Business Platform',
    subtitle: 'Bi-Directional SaaS Middleware & Conflict-Resilient Data Sync',
    type: 'Enterprise business application',
    domainTag: 'ENTERPRISE',
    description:
      'Business platform integrated with external CRM and business systems.',
    focus: [
      'Zoho',
      'HubSpot',
      'APIs',
      'Webhooks',
      'Data synchronization',
      'Workflow automation',
    ],
    technologies: [
      'Node.js',
      'Express.js',
      'PHP',
      'Zoho CRM API',
      'HubSpot API',
      'Webhooks',
      'Redis',
      'MySQL',
    ],
    isConfidential: true,
    reasoning: {
      context:
        'Senior Web Developer / Senior Engineer (2020 – 2022 / 2023) leading the integration architecture connecting enterprise web applications to external business CRM ecosystems.',
      problem:
        'Customer records and lead interactions were siloed between customer-facing web platforms and external CRM systems (Zoho and HubSpot), causing data discrepancies and manual sync errors.',
      constraints: [
        'Strict third-party API rate limits enforced by external CRM providers.',
        'Risk of circular update loops between bi-directional synchronization triggers.',
        'Network timeouts and external platform API downtime.',
      ],
      engineeringApproach:
        'Designed a bi-directional data synchronization middleware with deterministic conflict resolution rules (last-write-wins with entity change hashing), batched queue dispatchers, and circuit breakers for external API downtime.',
      architectureThinking:
        'Built an integration middleware layer with centralized OAuth token lifecycle management, message queues for outbound sync events, and dedicated webhook listeners for inbound CRM updates.',
      architectureDiagram: {
        title: 'Bi-Directional CRM Synchronization Architecture',
        nodes: [
          { id: 'n1', label: 'Enterprise Web App', role: 'Customer-facing application & admin portal', tier: 'client' },
          { id: 'n2', label: 'Sync Middleware API', role: 'Inbound webhook receiver & authentication', tier: 'gateway' },
          { id: 'n3', label: 'Integration & Sync Engine', role: 'Schema translation & circular loop prevention', tier: 'app' },
          { id: 'n4', label: 'Batched Queue Workers', role: 'Rate-limit-aware outbound request dispatcher', tier: 'worker' },
          { id: 'n5', label: 'Sync Ledger & Cache', role: 'Entity change hashes & OAuth token cache', tier: 'data' },
          { id: 'n6', label: 'Zoho & HubSpot APIs', role: 'External CRM platforms and webhook dispatches', tier: 'external' },
        ],
        dataFlow: [
          'Entity updated in web app triggers change event with SHA-256 payload hash.',
          'Sync Engine checks ledger; if hash matches previous sync, event is ignored (preventing loop).',
          'Batched worker groups changes and dispatches to Zoho/HubSpot REST API within rate limits.',
          'External CRM webhook notifies middleware of remote updates made by sales agents.',
          'Inbound payload is normalized and reconciled with local database without overwriting newer state.',
        ],
      },
      integrations: [
        'Zoho CRM REST APIs for contact, account, and pipeline management.',
        'HubSpot REST APIs for marketing automation and deal status synchronization.',
        'Bidirectional webhook pipelines for real-time contact and deal updates.',
        'OAuth 2.0 automated token refresh and credential lifecycle routines.',
      ],
      securityConsiderations: [
        'Automated OAuth token rotation and secure storage preventing token leakage.',
        'TLS transport encryption and webhook shared secret validation on all inbound endpoints.',
        'PII data isolation and field-level masking for external CRM logs.',
      ],
      performanceConsiderations: [
        'Batched API request dispatching to optimize external provider rate-limit allowances.',
        'Differential payload synchronization (only transmitting mutated fields rather than full records).',
        'Redis-backed rate-limit counters and exponential backoff retry policies.',
      ],
      deliveryCollaboration:
        'Served as the primary technical point of contact for international US/UK clients, gathering workflow requirements, coordinating deployment schedules, and mentoring junior developers on API integration best practices.',
      outcome:
        'Delivered continuous, automated bi-directional synchronization across customer records, eliminated manual data entry errors, and maintained 100% compliance with external API rate limits.',
      engineeringInsight:
        'When integrating third-party SaaS ecosystems, never assume instant availability or infinite rate limits—build resilient retry mechanisms, circuit breakers, and hash-based loop prevention from day one.',
    },
  },
];

export const publicReferencesData: readonly PublicReference[] = [
  {
    id: 'ref-captainpicks',
    url: 'https://captainpicks.com',
    domainName: 'captainpicks.com',
  },
  {
    id: 'ref-estate4',
    url: 'https://estate4.co.uk',
    domainName: 'estate4.co.uk',
  },
  {
    id: 'ref-vetplus',
    url: 'https://vetplus.co.uk',
    domainName: 'vetplus.co.uk',
  },
  {
    id: 'ref-marcusrusbourne',
    url: 'https://marcusrusbournemedia.com',
    domainName: 'marcusrusbournemedia.com',
  },
];
