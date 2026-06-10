import { useEffect, useState } from "react";

interface TerminalTypeOptions {
  /** ms per character */
  speed?: number;
  /** ms to wait before typing begins */
  startDelay?: number;
}

/**
 * Progressively reveals `text` one character at a time (typewriter effect).
 * Honors prefers-reduced-motion by rendering the full string immediately.
 *
 * State (the revealed character count) is only mutated inside async callbacks,
 * never synchronously in the effect body, per react-hooks/set-state-in-effect.
 */
export function useTerminalType(
  text: string,
  options: TerminalTypeOptions = {},
): { typed: string; done: boolean } {
  const { speed = 45, startDelay = 0 } = options;
  const [count, setCount] = useState(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      const id = setTimeout(() => setCount(text.length), 0);
      return () => clearTimeout(id);
    }

    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const startTimer = setTimeout(() => {
      setCount(0);
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  const typed = text.slice(0, count);
  const done = count >= text.length;

  return { typed, done };
}
