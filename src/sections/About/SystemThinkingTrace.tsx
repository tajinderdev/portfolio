import { useState, type ReactElement } from 'react';
import { Heading, Text, MonoText } from '@/components/typography';
import { Badge, StatusDot } from '@/components/ui';
import type { SystemThinkingModel } from '@/content/models';
import { useThemeContext } from '@/app/ThemeProvider';

export interface SystemThinkingTraceProps {
  readonly systemThinking: SystemThinkingModel;
  readonly className?: string;
}

export function SystemThinkingTrace({
  systemThinking,
  className = '',
}: SystemThinkingTraceProps): ReactElement {
  const nodes = systemThinking.traceNodes ?? [];
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const { theme } = useThemeContext();

  const activeNode = nodes[activeNodeIndex] ?? nodes[0];

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % nodes.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + nodes.length) % nodes.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = nodes.length - 1;
    }

    if (nextIndex !== null) {
      setActiveNodeIndex(nextIndex);
      const nextNode = nodes[nextIndex];
      if (nextNode) {
        // Use setTimeout to ensure DOM has updated before scrolling
        setTimeout(() => {
          const nextButton = document.getElementById(`tab-${nextNode.id}`);
          nextButton?.focus();
          const container = nextButton?.closest('.overflow-x-auto');
          if (container && nextButton) {
            const targetRect = nextButton.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const scrollAmount = targetRect.left - containerRect.left - (containerRect.width / 2) + (targetRect.width / 2);
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
          }
        }, 0);
      }
    }
  };

  return (
    <div
      className={`rounded-lg border border-border-subtle bg-surface/50 p-6 backdrop-blur-sm sm:p-8 ${className}`}
      aria-labelledby="system-thinking-heading"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border-subtle/70 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <StatusDot status="active" label="Diagnostic Pipeline" />
            <MonoText size="xs" color="accent" className="font-medium">
              FULL-PATH ROOT CAUSE TRACE
            </MonoText>
          </div>
          <Heading as="h3" variant="card" id="system-thinking-heading">
            System Thinking in Practice
          </Heading>
        </div>
        <Badge variant="outline" size="sm" className="self-start sm:self-auto font-mono">
          6 Architectural Layers
        </Badge>
      </div>

      <Text variant="small" color="muted" className="mb-6">
        {systemThinking.summary}
      </Text>

      {/* Trace Pipeline Navigation */}
      <div className="mb-6" role="tablist" aria-label="Architectural Trace Layers">
        <div className="flex items-center justify-between overflow-x-auto pb-2 pt-1 gap-1.5 scrollbar-none sm:gap-2">
          {nodes.map((node, index) => {
            const isActive = index === activeNodeIndex;
            const isLast = index === nodes.length - 1;

            return (
              <div key={node.id} className="flex items-center shrink-0">
                <button
                  type="button"
                  role="tab"
                  id={`tab-${node.id}`}
                  aria-controls={`panel-${node.id}`}
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={(e) => {
                    setActiveNodeIndex(index);
                    const target = e.currentTarget;
                    const container = target.closest('.overflow-x-auto');
                    if (container) {
                      const targetRect = target.getBoundingClientRect();
                      const containerRect = container.getBoundingClientRect();
                      // Center the target within the container
                      const scrollAmount = targetRect.left - containerRect.left - (containerRect.width / 2) + (targetRect.width / 2);
                      container.scrollBy({
                        left: scrollAmount,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`group relative flex flex-col items-start rounded-md border px-3 py-2 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isActive
                    ? 'border-accent bg-accent-muted/20 text-accent ring-1 ring-accent'
                    : 'border-border-subtle bg-surface-raised/40 text-text-secondary hover:border-border hover:bg-surface-raised/70'
                    }`}
                >
                  <div className="flex items-center gap-1.5 w-full justify-between">
                    <span className="font-mono text-[10px] text-text-muted">
                      0{index + 1}
                    </span>
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-accent' : 'bg-border'
                        }`}
                    />
                  </div>
                  <span
                    className={`mt-1 font-mono text-xs font-semibold tracking-tight transition-colors ${isActive ? 'text-accent' : 'text-text-primary group-hover:text-accent'
                      }`}
                  >
                    {node.label}
                  </span>
                </button>

                {!isLast && (
                  <div
                    aria-hidden="true"
                    className="mx-1 text-border text-xs sm:mx-1.5 select-none font-mono"
                  >
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Node Diagnostic Inspector */}
      {activeNode && (
        <div
          id={`panel-${activeNode.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeNode.id}`}
          className="rounded-md border border-border-subtle bg-background/80 p-5 transition-all duration-200"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-accent font-semibold">
                STAGE 0{activeNodeIndex + 1}
              </span>
              <span className="text-text-muted">·</span>
              <span className="font-mono text-xs text-text-secondary">
                {activeNode.layer}
              </span>
            </div>
            <span className="font-mono text-[11px] text-text-muted">
              {systemThinking.focus}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <MonoText size="xs" color="muted" className="uppercase tracking-wider block mb-1.5 font-semibold">
                Diagnostic Focus
              </MonoText>
              <Text variant="small" color="primary" className="leading-relaxed">
                {activeNode.diagnosticFocus}
              </Text>
            </div>

            {activeNode.keyConsiderations && activeNode.keyConsiderations.length > 0 && (
              <div>
                <MonoText size="xs" color="muted" className="uppercase tracking-wider block mb-2 font-semibold">
                  Key Engineering Considerations
                </MonoText>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {activeNode.keyConsiderations.map((consideration) => (
                    <li
                      key={consideration}
                      className="flex items-center gap-2 rounded border border-border-subtle/60 bg-surface/40 px-3 py-2 text-xs font-mono text-text-secondary"
                    >
                      <span className="h-1 w-1 rounded-full bg-accent shrink-0" />
                      <span className="truncate">{consideration}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeNode.tools && activeNode.tools.length > 0 && (
              <div className="pt-1">
                <MonoText size="xs" color="muted" className="uppercase tracking-wider block mb-3 font-semibold">
                  Core Technology Stack
                </MonoText>
                <div className="flex flex-wrap gap-3.5 pt-1 pb-2">
                  {activeNode.tools.map((tool) => {
                    // Format the tool string for display
                    const formatToolName = (name: string) => {
                      const map: Record<string, string> = {
                        react: 'React', tailwind: 'Tailwind CSS', materialui: 'Material UI',
                        bootstrap: 'Bootstrap', css: 'CSS3', html: 'HTML5', figma: 'Figma',
                        ts: 'TypeScript', js: 'JavaScript', graphql: 'GraphQL', postman: 'Postman',
                        swagger: 'Swagger',
                        php: 'PHP', laravel: 'Laravel', nodejs: 'Node.js', express: 'Express.js',
                        python: 'Python', fastapi: 'FastAPI', django: 'Django',
                        postgresql: 'PostgreSQL', mysql: 'MySQL', mongodb: 'MongoDB', redis: 'Redis',
                        elasticsearch: 'Elasticsearch', github: 'GitHub', gitlab: 'GitLab', wordpress: 'WordPress',
                        paypal: 'PayPal', stripe: 'Stripe', zoho: 'Zoho', hubspot: 'HubSpot', squarespace: 'Squarespace',
                        docker: 'Docker', nginx: 'Nginx', githubactions: 'GitHub Actions', aws: 'AWS',
                        gcp: 'Google Cloud', linux: 'Linux', bash: 'Bash'
                      };
                      return map[name] || name.charAt(0).toUpperCase() + name.slice(1);
                    };

                    const isSimpleIcon = ['swagger', 'paypal', 'stripe', 'zoho', 'hubspot', 'squarespace'].includes(tool);
                    const iconSrc = `/icons/skills/${tool}-${theme}.svg`;

                    return (
                      <div key={tool} className="group relative flex items-center justify-center">
                        <a
                          href={isSimpleIcon ? `https://simpleicons.org/?q=${tool}` : `#`}
                          rel="noreferrer"
                          className={`inline-block transition-transform duration-300 hover:scale-110 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm ${isSimpleIcon ? 'bg-surface-elevated/30 rounded-lg p-1.5 border border-border-subtle/40 backdrop-blur-sm' : ''}`}
                        >
                          <img
                            src={iconSrc}
                            alt={formatToolName(tool)}
                            className="h-9 w-9 sm:h-10 sm:w-10 object-contain drop-shadow-sm transition-all duration-300 group-hover:drop-shadow-md"
                            loading="lazy"
                          />
                        </a>
                        {/* Custom Tooltip */}
                        <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 scale-95 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 rounded bg-surface-elevated px-2.5 py-1 text-xs font-mono text-text-primary shadow-xl border border-border-subtle whitespace-nowrap z-10">
                          {formatToolName(tool)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
