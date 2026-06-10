import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view using an IntersectionObserver
 * (no scroll polling, per BUILD_SPEC §6 amendment 3). Returns the id of the
 * section nearest the viewport's activation band.
 */
export function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = useState<string>(sectionIds[0] ?? "");

  // Stable primitive dependency so the effect only re-runs when the set of
  // ids actually changes (not on every render that passes a new array literal).
  const key = sectionIds.join("|");

  useEffect(() => {
    const ids = key ? key.split("|") : [];
    if (ids.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        // Activation band: ignore the top 40% and bottom 55% of the viewport
        // so the "current" section is the one crossing the upper-center.
        rootMargin: "-40% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
