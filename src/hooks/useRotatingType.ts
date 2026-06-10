import { useEffect, useState } from "react";

interface RotatingTypeOptions {
  /** ms per character while typing */
  typeSpeed?: number;
  /** ms per character while deleting */
  deleteSpeed?: number;
  /** ms to hold a fully-typed word before deleting */
  pause?: number;
  /** ms before the cycle starts */
  startDelay?: number;
  /** static text to show under prefers-reduced-motion (default: words joined by " · ") */
  reducedText?: string;
}

/**
 * Cycles through `words` with a typewriter type → pause → delete → next loop.
 * Under prefers-reduced-motion it renders a single static string instead
 * (no animation). State is only mutated inside async callbacks, never
 * synchronously in the effect body (react-hooks/set-state-in-effect safe).
 *
 * `reduced` is true when motion is disabled, so callers can hide the cursor.
 */
export function useRotatingType(
  words: string[],
  options: RotatingTypeOptions = {},
): { text: string; reduced: boolean } {
  const {
    typeSpeed = 70,
    deleteSpeed = 40,
    pause = 1400,
    startDelay = 0,
    reducedText,
  } = options;

  const [text, setText] = useState("");
  const [reduced, setReduced] = useState(false);

  const key = words.join("|");

  useEffect(() => {
    const list = key ? key.split("|") : [];
    if (list.length === 0) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      const id = setTimeout(() => {
        setReduced(true);
        setText(reducedText ?? list.join(" · "));
      }, 0);
      return () => clearTimeout(id);
    }

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = list[wordIndex];
      if (!deleting) {
        charIndex += 1;
        setText(current.slice(0, charIndex));
        if (charIndex === current.length) {
          deleting = true;
          timer = setTimeout(tick, pause);
          return;
        }
        timer = setTimeout(tick, typeSpeed);
      } else {
        charIndex -= 1;
        setText(current.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % list.length;
        }
        timer = setTimeout(tick, deleteSpeed);
      }
    };

    const start = setTimeout(tick, startDelay);
    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [key, typeSpeed, deleteSpeed, pause, startDelay, reducedText]);

  return { text, reduced };
}
