import type { ProjectCaseStudy, PublicReference } from '../models';

export const projectsData: readonly ProjectCaseStudy[] = [
  {
    id: 'project-content-platform',
    title: 'Enterprise Content Publishing Platform',
    type: 'Confidential enterprise application',
    description:
      'Complex submission, editorial, review, document, approval, and publication workflows.',
    focus: [
      'Full-stack engineering',
      'Workflow architecture',
      'Integrations',
      'Security',
      'Modernization',
    ],
    isConfidential: true,
  },
  {
    id: 'project-subscription-platform',
    title: 'Subscription & Customer Management Platform',
    type: 'Customer and subscription management',
    description:
      'Business platform with recurring payments, subscription workflows, dashboards, and automated account processes.',
    focus: [
      'Laravel',
      'Stripe',
      'Webhooks',
      'Background jobs and queues',
      'Cloud deployment',
    ],
    isConfidential: true,
  },
  {
    id: 'project-ecommerce-platform',
    title: 'E-commerce Platform',
    type: 'B2C e-commerce',
    description:
      'Commerce workflows covering products, catalogue, cart, checkout, customer journeys, and integrations.',
    focus: [
      'Magento',
      'Full-stack engineering',
      'APIs',
      'Commerce architecture',
    ],
    isConfidential: true,
  },
  {
    id: 'project-crm-platform',
    title: 'CRM-Integrated Business Platform',
    type: 'Enterprise business application',
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
    isConfidential: true,
  },
  {
    id: 'project-ai-application',
    title: 'AI-Enabled Application',
    type: 'AI-enhanced application',
    description:
      'Application enhanced with Generative AI and automation capabilities.',
    focus: [
      'LLM integration',
      'AI workflows',
      'Automation',
      'Application architecture',
    ],
    capabilities: [
      'Content processing',
      'Summarization',
      'Classification',
      'Information extraction',
      'Intelligent search',
      'Natural-language interfaces',
      'Workflow automation',
    ],
    isConfidential: true,
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
