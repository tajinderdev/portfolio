import { useState, useRef, type ReactElement } from 'react';
import { navigationItems, type NavigationItem } from '@/config/navigation';
import { useActiveSection } from '@/hooks';
import { Button, StatusDot, ThemeToggle } from '@/components/ui';
import { MonoText } from '@/components/typography';
import { MobileNavigation } from './MobileNavigation';
import { handleSmoothScrollClick } from '@/lib/smoothScroll';
import { cn } from '@/lib/utils';
import { navigateTo, useRouterPath } from '@/lib/router';

const SECTION_IDS = navigationItems.map((item) => item.id);

export function Header(): ReactElement {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  
  const currentPath = useRouterPath();
  const intersectionSection = useActiveSection(SECTION_IDS, {}, currentPath);
  const activeSection = currentPath === '/portfolio' ? 'portfolio' : intersectionSection;

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
    toggleButtonRef.current?.focus();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border-subtle transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand / Professional Identity */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            const isCurrentlyHome = currentPath === '/';
            if (isCurrentlyHome) {
              handleSmoothScrollClick(e, '#');
            } else {
              navigateTo('/');
              window.scrollTo(0, 0);
            }
          }}
          className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm py-1"
          aria-label="Tajinder Singh - Home"
        >
          <StatusDot status="active" pulse={true} className="hidden sm:inline-flex" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="font-heading font-semibold text-text-primary text-base sm:text-lg tracking-tight group-hover:text-accent transition-colors duration-150">
              Tajinder Singh
            </span>
            <span className="hidden sm:inline-block text-border-strong">/</span>
            <MonoText
              size="xs"
              color="muted"
              className="text-[11px] sm:text-xs leading-none"
            >
              Senior Software Engineer
            </MonoText>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 lg:gap-2"
        >
          <ul role="list" className="flex items-center gap-1">
            {navigationItems.map((item: NavigationItem) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      
                      if (item.href === '/portfolio') {
                        navigateTo('/portfolio');
                        window.scrollTo(0, 0);
                        return;
                      }

                      if (item.href === '/') {
                        if (currentPath !== '/') {
                          navigateTo('/');
                          window.scrollTo(0, 0);
                        } else {
                          handleSmoothScrollClick(e, '/');
                        }
                        return;
                      }

                      const isCurrentlyHome = currentPath === '/';
                      if (!isCurrentlyHome && item.href.startsWith('#')) {
                        navigateTo('/');
                        setTimeout(() => handleSmoothScrollClick(e, item.href), 100);
                      } else {
                        handleSmoothScrollClick(e, item.href);
                      }
                    }}
                    className={cn(
                      'relative px-3 py-2 text-sm font-sans rounded-md transition-colors duration-150',
                      isActive
                        ? 'text-text-primary font-medium'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated',
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent rounded-full animate-fade-in"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="ml-4 pl-4 flex items-center gap-4 border-l border-border-subtle">
            <ThemeToggle />
            <Button
              as="a"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const isCurrentlyHome = currentPath === '/';
                if (!isCurrentlyHome) {
                  navigateTo('/');
                  setTimeout(() => handleSmoothScrollClick(e, '#contact'), 100);
                } else {
                  handleSmoothScrollClick(e, '#contact');
                }
              }}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              Get in Touch
            </Button>
          </div>
        </nav>

        {/* Mobile Actions */}
        <div className="flex items-center md:hidden gap-2">
          <ThemeToggle />
          <button
            ref={toggleButtonRef}
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-elevated rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={handleCloseMobileMenu}
        activeSection={activeSection}
      />
    </header>
  );
}
