import type { DomainItem } from '../models';

export const domainsData: readonly DomainItem[] = [
  {
    id: 'domain-ecommerce',
    name: 'E-commerce',
    description:
      'Product and catalogue systems, customer journeys, orders, checkout, payments, business rules, and commerce integrations.',
  },
  {
    id: 'domain-edtech',
    name: 'EdTech',
    description:
      'Learner workflows, educational content, progress-oriented processes, content management, and platform integrations.',
  },
  {
    id: 'domain-publishing',
    name: 'Content & Article Publishing',
    description:
      'Submission, editorial, review, approval, document management, role-based access, content lifecycle, and publication workflows.',
  },
  {
    id: 'domain-crm',
    name: 'CRM & Enterprise Applications',
    description:
      'Business applications integrated with Zoho and HubSpot, including data synchronization, APIs, webhooks, authentication, and workflow automation.',
  },
  {
    id: 'domain-workflows',
    name: 'Workflow & Document Systems',
    description:
      'Complex processes involving multiple users, permissions, documents, approvals, and state transitions.',
  },
  {
    id: 'domain-ai',
    name: 'AI-Enabled Applications',
    description:
      'Applications and development workflows enhanced through Generative AI, intelligent automation, LLM-powered capabilities, and AI-assisted engineering.',
  },
];
