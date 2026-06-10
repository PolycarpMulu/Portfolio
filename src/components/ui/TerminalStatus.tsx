"use client";

import { useRotatingType } from "@/hooks/useRotatingType";

interface TerminalStatusProps {
  /** prompt shown before the status, e.g. "root@qu35t ~" */
  prompt: string;
  /** rotating status messages */
  statuses: string[];
}

/**
 * On-brand terminal flourish: a shell prompt with a rotating status line
 * (decorative — adopted per PORTFOLIO_CONTENT §8). Reduced-motion shows a
 * single static status.
 */
export default function TerminalStatus({ prompt, statuses }: TerminalStatusProps) {
  const { text, reduced } = useRotatingType(statuses, {
    typeSpeed: 55,
    deleteSpeed: 25,
    pause: 1800,
    startDelay: 900,
    reducedText: statuses[0],
  });

  return (
    <div className="inline-flex max-w-full items-center gap-2 border border-border-dim bg-surface/50 px-3 py-2 font-mono text-xs">
      <span className="text-accent">{prompt}</span>
      <span className="text-muted">$</span>
      <span className="truncate text-fg">{text}</span>
      {!reduced && (
        <span className="animate-pulse text-accent" aria-hidden="true">
          ▋
        </span>
      )}
    </div>
  );
}
