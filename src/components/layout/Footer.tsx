import type { ReactElement } from 'react';
import { navigationItems, socialLinks, type NavigationItem, type SocialLink } from '@/config/navigation';
import { StatusDot } from '@/components/ui';
import { MonoText } from '@/components/typography';
import { handleSmoothScrollClick } from '@/lib/smoothScroll';

export function Footer(): ReactElement {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 w-full border-t border-border-subtle bg-surface text-text-secondary">
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
                    onClick={(e) => handleSmoothScrollClick(e, item.href)}
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
            <ul role="list" className="space-y-3 text-sm">
              {socialLinks.map((link: SocialLink) => {
                const isGithub = link.id === 'github';
                const isLinkedIn = link.id === 'linkedin';
                const isInstagram = link.id === 'instagram';
                const isEmail = link.id === 'email';

                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      onClick={!link.isExternal ? (e) => handleSmoothScrollClick(e, link.href) : undefined}
                      target={link.isExternal && !link.href.startsWith('mailto:') ? '_blank' : undefined}
                      rel={link.isExternal && !link.href.startsWith('mailto:') ? 'noopener noreferrer' : undefined}
                      className="group inline-flex items-center gap-2.5 text-text-secondary hover:text-text-primary transition-colors duration-150"
                    >
                      {isGithub && (
                        <svg className="w-4 h-4 text-text-primary group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                      )}
                      {isLinkedIn && (
                        <svg className="w-4 h-4 text-[#0A66C2] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      )}
                      {isInstagram && (
                        <svg className="w-4 h-4 text-[#E1306C] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                      )}
                      {isEmail && (
                        <svg className="w-4 h-4 text-[#EA4335] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                        </svg>
                      )}
                      
                      <span className="font-medium">{link.label}</span>
                      
                      {link.isExternal && (
                        <span className="sr-only">
                          {link.href.startsWith('mailto:') ? ' (opens email client)' : ' (opens in a new tab)'}
                        </span>
                      )}
                    </a>
                  </li>
                );
              })}
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
              onClick={(e) => handleSmoothScrollClick(e, '#')}
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
