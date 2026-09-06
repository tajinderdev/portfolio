import { useState, type ReactElement } from 'react';
import { Heading, Text, MonoText } from '@/components/typography';
import { Badge, StatusDot } from '@/components/ui';
import type { SystemThinkingModel } from '@/content/models';

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

  const activeNode = nodes[activeNodeIndex] ?? nodes[0];

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
                  onClick={() => setActiveNodeIndex(index)}
                  className={`group relative flex flex-col items-start rounded-md border px-3 py-2 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background ${
                    isActive
                      ? 'border-accent bg-accent-muted/20 text-accent ring-1 ring-accent'
                      : 'border-border-subtle bg-surface-raised/40 text-text-secondary hover:border-border hover:bg-surface-raised/70'
                  }`}
                >
                  <div className="flex items-center gap-1.5 w-full justify-between">
                    <span className="font-mono text-[10px] text-text-muted">
                      0{index + 1}
                    </span>
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isActive ? 'bg-accent' : 'bg-border'
                      }`}
                    />
                  </div>
                  <span
                    className={`mt-1 font-mono text-xs font-semibold tracking-tight transition-colors ${
                      isActive ? 'text-accent' : 'text-text-primary group-hover:text-accent'
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
          </div>
        </div>
      )}
    </div>
  );
}
