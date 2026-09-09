import type { ReactNode, ReactElement } from 'react';
import { Header, ScrollProgressBar } from '@/components/navigation';
import { Footer } from './Footer';
import { GlobalBackground } from './GlobalBackground';
import { useSmoothScroll } from '@/hooks';

interface RootLayoutProps {
  readonly children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps): ReactElement {
  // Global smooth scroll interceptor for all in-page anchors
  useSmoothScroll();

  return (
    <div className="min-h-screen flex flex-col text-text-primary selection:bg-accent/20 selection:text-accent">
      <GlobalBackground />
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
      <main id="main-content" tabIndex={-1} className="flex-1 w-full focus:outline-none relative z-10">
        {children}
      </main>

      {/* Global Technical Footer */}
      <Footer />
    </div>
  );
}
