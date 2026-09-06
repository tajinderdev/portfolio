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

          {/* Verified Profiles */}
          <div className="space-y-2 pt-2">
            <MonoText size="xs" color="muted" className="uppercase tracking-wider">
              VERIFIED CHANNELS
            </MonoText>
            <div className="flex flex-wrap gap-3">
              <Button
                as="a"
                href="https://github.com/tajinderdev"
                variant="secondary"
                size="sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </Button>
              <Button
                as="a"
                href="https://linkedin.com/in/tajinderdev"
                variant="secondary"
                size="sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
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
