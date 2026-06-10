"use client";

import { useTerminalType } from "@/hooks/useTerminalType";

interface TerminalTextProps {
  text: string;
  /** ms per character */
  speed?: number;
  /** ms before typing starts */
  startDelay?: number;
  /** leading prompt glyph, e.g. "> " or "$ " (rendered in accent) */
  prompt?: string;
  /** show the blinking block cursor */
  showCursor?: boolean;
  className?: string;
}

export default function TerminalText({
  text,
  speed,
  startDelay,
  prompt,
  showCursor = true,
  className = "",
}: TerminalTextProps) {
  const { typed } = useTerminalType(text, { speed, startDelay });

  return (
    <span className={`font-mono ${className}`}>
      {prompt && <span className="text-accent">{prompt}</span>}
      <span>{typed}</span>
      {showCursor && (
        <span className="ml-0.5 animate-pulse text-accent" aria-hidden="true">
          ▋
        </span>
      )}
    </span>
  );
}
