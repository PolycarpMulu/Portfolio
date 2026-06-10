import { bio } from "@/data/bio";

// Credibility strip below the hero: affiliations + focus + location, separated by
// ● nodes (PORTFOLIO_CONTENT §1). No invented metrics.
export default function CredibilityStrip() {
  return (
    <div className="border-y border-border-dim bg-surface/30">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-2 px-4 py-4">
        {bio.credibility.map((item, i) => (
          <li key={item} className="flex items-center gap-3">
            {i > 0 && (
              <span className="text-accent" aria-hidden="true">
                ●
              </span>
            )}
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
