import { type ReactElement } from 'react';
import { Section } from '@/components/layout';
import { SectionHeader, Heading, MonoText } from '@/components/typography';
import { Button } from '@/components/ui';
import { ContactForm } from './ContactForm';
import type { ContactClient } from '@/services/contact/contactClient';

export interface ContactProps {
  readonly client?: ContactClient;
  readonly className?: string;
}

export function Contact({ client, className = '' }: ContactProps): ReactElement {
  return (
    <Section id="contact" className={className}>
      <SectionHeader
        kicker="07 / CONTACT"
        title="LET'S CONNECT"
        description="Open for senior engineering roles, system architecture consulting, and high-impact technical collaboration."
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
        {/* Left Column: Context, Availability & Social Profiles */}
        <div className="space-y-6 lg:col-span-5">
          <div className="space-y-3">
            <Heading as="h3" variant="card" className="text-xl sm:text-2xl font-bold text-text-primary">
              Let&apos;s discuss systems, architecture, or collaboration.
            </Heading>
            <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
              Whether you are architecting a new platform, modernizing a legacy stack, navigating complex third-party integrations, or exploring AI-augmented workflows—I welcome technical conversations and opportunities.
            </p>
          </div>

          {/* Operational Details Card */}
          <div className="rounded-lg border border-border-subtle bg-surface/50 p-5 sm:p-6 backdrop-blur-sm space-y-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-2 w-2 shrink-0 rounded-full bg-accent animate-pulse" />
              <div className="space-y-0.5">
                <span className="font-mono text-xs font-semibold text-text-primary uppercase tracking-wide">
                  Current Availability
                </span>
                <p className="text-xs text-text-secondary">
                  Open to full-time senior engineering roles, technical leadership, and strategic architecture advisory.
                </p>
              </div>
            </div>

            <div className="border-t border-border-subtle/50 pt-3 flex items-start gap-3">
              <span className="mt-0.5 flex h-2 w-2 shrink-0 rounded-full bg-border" />
              <div className="space-y-0.5">
                <span className="font-mono text-xs font-semibold text-text-primary uppercase tracking-wide">
                  Response Time
                </span>
                <p className="text-xs text-text-secondary">
                  Typically within 24–48 business hours. Messages are sent securely via serverless dispatch.
                </p>
              </div>
            </div>

            <div className="border-t border-border-subtle/50 pt-3 flex items-start gap-3">
              <span className="mt-0.5 flex h-2 w-2 shrink-0 rounded-full bg-border" />
              <div className="space-y-0.5">
                <span className="font-mono text-xs font-semibold text-text-primary uppercase tracking-wide">
                  Collaboration
                </span>
                <p className="text-xs text-text-secondary">
                  Experienced working across international time zones (US, UK, Canada, Australia, Europe).
                </p>
              </div>
            </div>
          </div>

          {/* Social Links of a Non-Social Person */}
          <div className="space-y-3 pt-2">
            <MonoText size="xs" color="muted" className="uppercase tracking-wider font-medium">
              SOCIAL LINKS OF A NON-SOCIAL PERSON
            </MonoText>
            <div className="flex flex-wrap gap-3">
              <Button
                as="a"
                href="https://github.com/tajinderdev"
                variant="secondary"
                size="sm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 group"
              >
                <svg
                  className="w-4 h-4 text-text-secondary group-hover:text-accent transition-colors duration-150"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                <span>GitHub</span>
                <span className="text-text-muted text-xs">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </Button>

              <Button
                as="a"
                href="https://www.linkedin.com/in/tajinder-developer/"
                variant="secondary"
                size="sm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 group"
              >
                <svg
                  className="w-4 h-4 text-text-secondary group-hover:text-accent transition-colors duration-150"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v7.6H9.2v-7.6H6.46M7.83 6.25c-.91 0-1.64.73-1.64 1.64s.73 1.64 1.64 1.64 1.64-.73 1.64-1.64-.73-1.64-1.64-1.64z" />
                </svg>
                <span>LinkedIn</span>
                <span className="text-text-muted text-xs">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </Button>

              <Button
                as="a"
                href="https://www.instagram.com/tajindr_singh_"
                variant="secondary"
                size="sm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 group"
              >
                <svg
                  className="w-4 h-4 text-text-secondary group-hover:text-accent transition-colors duration-150"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>Instagram</span>
                <span className="text-text-muted text-xs">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </Button>

              <Button
                as="a"
                href="mailto:imtj.human@gmail.com"
                variant="secondary"
                size="sm"
                className="inline-flex items-center gap-2 group"
                title="imtj.human@gmail.com"
              >
                <svg
                  className="w-4 h-4 text-text-secondary group-hover:text-accent transition-colors duration-150"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                </svg>
                <span>Gmail</span>
                <span className="text-text-muted text-xs">↗</span>
                <span className="sr-only"> (opens email client: imtj.human@gmail.com)</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <ContactForm client={client} />
        </div>
      </div>
    </Section>
  );
}
