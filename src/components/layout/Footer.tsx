import type { ReactElement } from 'react';
import { navigationItems, socialLinks, type NavigationItem, type SocialLink } from '@/config/navigation';
import { StatusDot } from '@/components/ui';
import { MonoText } from '@/components/typography';

export function Footer(): ReactElement {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border-subtle bg-surface text-text-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-12">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand & Purpose (Columns 1-6) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-heading font-semibold text-text-primary text-xl tracking-tight">
                Tajinder Singh
              </span>
              <span className="text-border-strong">/</span>
              <MonoText size="xs" color="muted">
                Senior Software Engineer
              </MonoText>
            </div>

            <p className="text-sm text-text-secondary max-w-md leading-relaxed">
              Building scalable, secure, and intelligent software systems across domains—with a focus
              on architecture, integrations, modernization, and AI-augmented engineering.
            </p>

            <div className="pt-2">
              <StatusDot status="active" label="Open to Senior Engineering & Architecture Roles" />
            </div>
          </div>

          {/* Quick Navigation (Columns 7-9) */}
          <div className="md:col-span-3 space-y-3">
            <MonoText size="xs" color="muted" className="uppercase tracking-widest font-medium">
              Navigation
            </MonoText>
            <ul role="list" className="space-y-2 text-sm">
              {navigationItems.map((item: NavigationItem) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="text-text-secondary hover:text-text-primary hover:underline underline-offset-4 transition-colors duration-150"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Direct Links (Columns 10-12) */}
          <div className="md:col-span-3 space-y-3">
            <MonoText size="xs" color="muted" className="uppercase tracking-widest font-medium">
              Connect
            </MonoText>
            <ul role="list" className="space-y-2 text-sm">
              {socialLinks.map((link: SocialLink) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target={link.isExternal ? '_blank' : undefined}
                    rel={link.isExternal ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1.5 text-text-secondary hover:text-accent transition-colors duration-150"
                  >
                    <span>{link.label}</span>
                    {link.isExternal && (
                      <svg
                        className="w-3.5 h-3.5 text-text-muted"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 17L17 7M17 7H7M17 7V17"
                        />
                      </svg>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technical Metadata & Confidentiality Guardrail */}
        <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted font-mono">
          <p>
            © {currentYear} Tajinder Singh · Client projects described by domain to preserve confidentiality.
          </p>

          <div className="flex items-center gap-4">
            <span>React 19 · TS · Tailwind v4</span>
            <a
              href="#main-content"
              className="hover:text-accent transition-colors duration-150"
              aria-label="Back to top of page"
            >
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
