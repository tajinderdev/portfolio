import { useEffect, useRef, type ReactElement } from 'react';
import { navigationItems, type NavigationItem } from '@/config/navigation';
import { useScrollLock } from '@/hooks';
import { Button, StatusDot } from '@/components/ui';
import { MonoText } from '@/components/typography';
import { cn } from '@/lib/utils';

export interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string | null;
}

export function MobileNavigation({
  isOpen,
  onClose,
  activeSection,
}: MobileNavigationProps): ReactElement | null {
  useScrollLock(isOpen);
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus management and keyboard trap inside modal dialog
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        if (!containerRef.current) return;
        const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus first link when opened
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const firstLink = containerRef.current.querySelector<HTMLAnchorElement>('a');
      firstLink?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-navigation"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      ref={containerRef}
      className="fixed inset-0 z-40 md:hidden bg-background/95 backdrop-blur-lg flex flex-col pt-24 px-6 pb-12 transition-all duration-200"
    >
      {/* Mobile Nav Header Meta */}
      <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-6">
        <StatusDot status="active" label="Available for Senior Roles" />
        <MonoText size="xs" color="muted">
          ESC to close
        </MonoText>
      </div>

      {/* Navigation List */}
      <nav aria-label="Mobile Navigation Links" className="flex-1">
        <ul className="flex flex-col space-y-4">
          {navigationItems.map((item: NavigationItem, idx: number) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'flex items-center justify-between py-3 text-2xl font-heading font-medium tracking-tight transition-colors duration-150',
                    isActive
                      ? 'text-accent'
                      : 'text-text-secondary hover:text-text-primary',
                  )}
                >
                  <span>{item.label}</span>
                  <MonoText size="xs" color={isActive ? 'accent' : 'muted'}>
                    0{idx + 1}
                  </MonoText>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile Menu Footer CTA */}
      <div className="pt-6 border-t border-border-subtle space-y-4">
        <Button
          as="a"
          href="#contact"
          variant="primary"
          size="lg"
          className="w-full"
          onClick={onClose}
        >
          Get in Touch
        </Button>
        <p className="text-xs text-text-muted text-center font-mono">
          Tajinder Singh · Senior Software Engineer
        </p>
      </div>
    </div>
  );
}
