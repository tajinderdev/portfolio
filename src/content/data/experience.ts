import type { ExperienceItem } from '../models';

export const experienceData: readonly ExperienceItem[] = [
  {
    id: 'exp-current',
    period: '2023 – Present',
    role: 'Senior Software Engineer',
    environment: 'Enterprise Workflow & Modernization Systems',
    progressionStage: 'Architecture, Modernization & Scale',
    progressionIndex: 5,
    summary:
      'Leading end-to-end architecture and development of enterprise applications involving complex business workflows, role-based access, document processes, external integrations, and legacy modernization.',
    highlights: [
      'Led end-to-end development from requirements through deployment.',
      'Designed role-based application architecture and scalable database structures.',
      'Built secure MVC-based backend systems and complex business workflows.',
      'Developed modern interfaces for complex workflows.',
      'Integrated external platforms and APIs for file, content, and business processes.',
      'Optimized file-processing workflows and application performance.',
      'Investigated production, database, security, and integration issues.',
      'Worked with international development teams within Agile delivery environments.',
      'Applied testing and quality practices to improve reliability.',
    ],
    architecturalInvolvement: [
      'Designed role-based access control (RBAC) and scalable relational database structures.',
      'Engineered secure MVC backend architectures with fault-isolated integration pipelines.',
      'Formulated incremental modernization strategies to retire technical debt and legacy bottlenecks.',
      'Architected resilient external API integrations for file and document processing.',
    ],
    technicalScope:
      'Full-stack architecture, relational database modeling, external API integrations, automated testing, and production diagnostics.',
    responsibilities: [
      'Drive full-lifecycle software engineering from domain analysis through deployment.',
      'Build performant, intuitive user interfaces for high-complexity workflows.',
      'Remediate complex production, database, security, and integration issues.',
      'Collaborate in distributed Agile environments across global time zones.',
    ],
    collaboration:
      'Distributed international engineering teams across the US and Europe; close collaboration with QA/SDETs, product managers, and infrastructure engineers.',
    leadership:
      'Technical ownership, architectural direction, peer code reviews, and quality standardization.',
    outcomes: [
      'Successfully optimized high-throughput file-processing and data workflows.',
      'Maintained zero-regression stability across legacy modernization initiatives.',
    ],
    technologies: [
      'TypeScript',
      'React',
      'Laravel',
      'PHP',
      'PostgreSQL',
      'MySQL',
      'Docker',
      'AWS',
      'REST APIs',
    ],
  },
  {
    id: 'exp-2023',
    period: '2023',
    role: 'Senior Software Engineer',
    environment: 'Customer & Subscription Management Platform',
    progressionStage: 'End-to-End Lifecycle & Integrations',
    progressionIndex: 4,
    summary:
      'Owned full application lifecycle and technical delivery for a customer subscription management platform featuring automated recurring billing and access governance.',
    highlights: [
      'Led development of a customer and subscription management platform.',
      'Owned the full application lifecycle and technical delivery.',
      'Integrated Stripe payments and webhook-driven subscription workflows.',
      'Integrated external communication/platform APIs for automated access management.',
      'Built administrative dashboards and real-time business statistics.',
      'Implemented subscription automation using background jobs and queues.',
      'Managed cloud deployment and application reliability.',
      'Collaborated with design, QA, and business teams.',
    ],
    architecturalInvolvement: [
      'Architected webhook-driven Stripe payment workflows with idempotent event handling.',
      'Designed background worker queues for automated subscription renewals and access provisioning.',
      'Engineered real-time administrative analytics dashboards and reporting pipelines.',
    ],
    technicalScope:
      'Subscription platform architecture, payment gateway webhooks, asynchronous background workers, and cloud operations.',
    responsibilities: [
      'Owned complete technical delivery from blueprint to cloud deployment.',
      'Integrated communication APIs for instant user access provisioning.',
      'Maintained cloud deployment pipelines, uptime, and database integrity.',
    ],
    collaboration:
      'Cross-functional partnership with UI/UX designers, QA engineers, and business stakeholders.',
    leadership: 'Complete technical delivery ownership and production accountability.',
    outcomes: [
      'Automated recurring billing cycles, eliminating manual access management.',
      'Established resilient webhook synchronization with automatic retry handling.',
    ],
    technologies: ['Node.js', 'Express', 'Stripe API', 'Webhooks', 'Redis', 'Docker', 'Cloud Platforms'],
  },
  {
    id: 'exp-ecommerce-2022-2023',
    period: '2022 – 2023',
    role: 'Software Developer',
    specialization: 'E-commerce Specialization',
    environment: 'High-Volume B2C E-commerce',
    progressionStage: 'Specialized Scale & Ecosystem Architecture',
    progressionIndex: 3,
    summary:
      'Completed intensive Magento 2 engineering specialization while contributing directly to a live, high-volume B2C e-commerce platform.',
    highlights: [
      'Completed intensive Magento 2 specialization while contributing to a live B2C e-commerce environment.',
      'Worked with product catalogue, shopping cart, and checkout workflows.',
      'Implemented and enhanced custom modules and third-party extensions.',
      'Contributed to debugging, optimization, code reviews, and Agile ceremonies.',
    ],
    architecturalInvolvement: [
      'Developed and extended modular e-commerce extensions for catalog, cart, and checkout funnels.',
      'Optimized query performance and cache strategies for large catalog search operations.',
      'Integrated third-party extensions within enterprise commerce frameworks.',
    ],
    technicalScope:
      'E-commerce module architecture, catalog caching, checkout optimization, and search indexing.',
    responsibilities: [
      'Contributed enhancements and fixes to live B2C e-commerce systems.',
      'Investigated and resolved performance bottlenecks across customer checkout paths.',
      'Participated in code reviews, technical discussions, and sprint planning.',
    ],
    collaboration:
      'Agile engineering team utilizing sprint planning, daily standups, and rigorous peer code reviews.',
    outcomes: [
      'Completed comprehensive Magento 2 engineering specialization.',
      'Enhanced shopping cart and checkout stability on high-volume production stores.',
    ],
    technologies: ['Magento 2', 'PHP', 'MySQL', 'Elasticsearch', 'Redis', 'Git', 'Agile/Scrum'],
  },
  {
    id: 'exp-2020-2022',
    period: '2020 – 2022',
    role: 'Senior Web Developer',
    environment: 'Multi-Domain Client Platforms & Digital Solutions',
    progressionStage: 'Technical Ownership, Leadership & Client Trust',
    progressionIndex: 2,
    summary:
      'Led software development across multiple client applications and diverse business domains, acting as the primary technical point of contact for international clients and mentoring engineers.',
    highlights: [
      'Led development across multiple client applications and business domains.',
      'Served as a technical point of contact for international clients.',
      'Collaborated with design, QA, business, and development teams.',
      'Mentored junior developers and promoted engineering best practices.',
      'Improved development and project-management processes.',
      'Worked with remote US-based teams across time zones.',
      'Contributed to company growth from 4 to 20+ team members.',
      'Received Employee of the Year recognition for outstanding contributions.',
    ],
    architecturalInvolvement: [
      'Delivered multi-application architectures balancing diverse client constraints and timeline requirements.',
      'Established standardized project structures and deployment hygiene across project teams.',
    ],
    technicalScope:
      'Full-lifecycle web application development, RESTful APIs, database design, and CMS solutions.',
    responsibilities: [
      'Led technical execution across diverse client applications from discovery through launch.',
      'Served as primary technical advisor and liaison for international and US-based clients.',
      'Enhanced team project management workflows and coding guidelines.',
    ],
    collaboration:
      'Direct collaboration with remote US-based teams and international clients across time zones.',
    leadership:
      'Mentored junior developers, established code review standards, and guided technical decisions.',
    outcomes: [
      'Awarded Employee of the Year recognition for outstanding leadership and engineering contribution.',
      'Key engineering contributor during organization scaling from 4 to 20+ team members.',
    ],
    technologies: ['PHP', 'JavaScript', 'MySQL', 'REST APIs', 'WordPress', 'Git', 'Jira'],
  },
  {
    id: 'exp-2019-2020',
    period: '2019 – 2020',
    role: 'Junior Web Developer',
    environment: 'Full-Stack Web Development Foundations',
    progressionStage: 'Implementation & SDLC Foundations',
    progressionIndex: 1,
    summary:
      'Built foundational software engineering discipline across the complete SDLC, developing web applications, maintaining client sites, and collaborating under senior guidance.',
    highlights: [
      'Built professional software development foundations across the SDLC.',
      'Developed with HTML, CSS, JavaScript, PHP, and MySQL.',
      'Worked on website development, maintenance, and bug fixing.',
      'Collaborated with senior developers on client projects and coding standards.',
    ],
    architecturalInvolvement: [
      'Applied core MVC principles and clean relational database schema design under senior guidance.',
    ],
    technicalScope:
      'Frontend and backend web development, database queries, and defect resolution.',
    responsibilities: [
      'Developed responsive UI components and backend functionality.',
      'Maintained live client websites and addressed production bug tickets.',
      'Adhered strictly to team coding standards and version control practices.',
    ],
    collaboration:
      'Direct pairing with senior software engineers, actively incorporating code review feedback.',
    outcomes: [
      'Mastered the complete SDLC process: requirements → development → testing → deployment.',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'Git'],
  },
];
