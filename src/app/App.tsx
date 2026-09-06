import { type ReactElement } from 'react';
import { RootLayout } from '@/components/layout';
import { getPortfolioContent } from '@/content';
import { env } from '@/config/env';

export function App(): ReactElement {
  const content = getPortfolioContent();

  return (
    <RootLayout>
      <div className="space-y-8 max-w-3xl mx-auto py-12">
        {/* Architecture Status Banner */}
        <header className="space-y-3 border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-[#7cff6b]">
            <span className="w-2 h-2 rounded-full bg-[#7cff6b] animate-pulse" />
            Stage 1: Architecture Initialized
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight font-heading text-[#f5f5f5]">
            {content.profile.name}
          </h1>
          <p className="text-lg text-[#a3a3a3]">
            {content.profile.title} · {content.profile.experienceYears} Years Experience
          </p>
        </header>

        {/* Foundation Verification Grid */}
        <section aria-labelledby="foundation-verification-heading" className="space-y-4">
          <h2 id="foundation-verification-heading" className="text-sm font-mono uppercase tracking-wider text-[#737373]">
            Foundational Systems Verified
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-[#111111] border border-white/10 space-y-1">
              <span className="text-xs font-mono text-[#7cff6b]">01 / Content Model</span>
              <p className="text-sm font-medium text-[#f5f5f5]">Decoupled Structured Content</p>
              <p className="text-xs text-[#737373]">
                {content.skillPillars.length} Skill Pillars, {content.experiences.length} Experience Records, {content.projects.length} Case Studies.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#111111] border border-white/10 space-y-1">
              <span className="text-xs font-mono text-[#7cff6b]">02 / Environment & Security</span>
              <p className="text-sm font-medium text-[#f5f5f5]">Client-Safe Variables</p>
              <p className="text-xs text-[#737373]">
                Mode: {env.isProduction ? 'Production' : 'Development'} · Secrets Isolated from Browser.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#111111] border border-white/10 space-y-1">
              <span className="text-xs font-mono text-[#7cff6b]">03 / Type Safety</span>
              <p className="text-sm font-medium text-[#f5f5f5]">Strict TypeScript</p>
              <p className="text-xs text-[#737373]">
                Full type contracts for profile, pillars, projects, and architecture.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#111111] border border-white/10 space-y-1">
              <span className="text-xs font-mono text-[#7cff6b]">04 / Design Tokens</span>
              <p className="text-sm font-medium text-[#f5f5f5]">Tailwind CSS v4 Native</p>
              <p className="text-xs text-[#737373]">
                Dark-first palette, Space Grotesk, Inter, and JetBrains Mono tokens configured.
              </p>
            </div>
          </div>
        </section>

        {/* Next Stage Indicator */}
        <footer className="p-4 rounded-lg bg-[#161616] border border-white/10 text-xs text-[#a3a3a3] font-mono">
          <span className="text-[#7cff6b]">→ Ready for Stage 2:</span> Global layout, navigation, and theme system.
        </footer>
      </div>
    </RootLayout>
  );
}

export default App;
