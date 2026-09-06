import type { ReactNode, ReactElement } from 'react';
import { Header, ScrollProgressBar } from '@/components/navigation';
import { Footer } from './Footer';

interface RootLayoutProps {
  readonly children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps): ReactElement {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary selection:bg-accent/20 selection:text-accent">
      {/* Top Precision Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-surface focus:text-accent focus:border focus:border-accent focus:rounded-sm text-sm font-mono shadow-md"
      >
        Skip to main content
      </a>

      {/* Global Header & Navigation */}
      <Header />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 w-full focus:outline-none">
        {children}
      </main>

      {/* Global Technical Footer */}
      <Footer />
    </div>
  );
}
