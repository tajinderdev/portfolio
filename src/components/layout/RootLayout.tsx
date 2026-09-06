import type { ReactNode, ReactElement } from 'react';

interface RootLayoutProps {
  readonly children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps): ReactElement {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-[#f5f5f5] selection:bg-[#7cff6b]/20 selection:text-[#7cff6b]">
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#111111] focus:text-[#7cff6b] focus:border focus:border-[#7cff6b] focus:rounded-sm text-sm"
      >
        Skip to main content
      </a>

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Minimal Footer Boundary */}
      <footer className="w-full border-t border-white/10 py-6 text-center text-xs text-[#737373]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Tajinder Singh. Built with React & TypeScript.</p>
        </div>
      </footer>
    </div>
  );
}
