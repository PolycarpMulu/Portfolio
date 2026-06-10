"use client";

import { useRotatingType } from "@/hooks/useRotatingType";

interface RotatingRolesProps {
  words: string[];
  className?: string;
}

/** Hero role line: cycles roles with a typewriter effect (static under reduced-motion). */
export default function RotatingRoles({ words, className = "" }: RotatingRolesProps) {
  const { text, reduced } = useRotatingType(words, {
    typeSpeed: 65,
    deleteSpeed: 35,
    pause: 1500,
    startDelay: 400,
  });

  return (
    <span className={`font-mono text-accent ${className}`}>
      <span className="text-muted">{"> "}</span>
      {text}
      {!reduced && (
        <span className="ml-0.5 animate-pulse" aria-hidden="true">
          ▋
        </span>
      )}
    </span>
  );
}
