import SectionLabel from "@/components/ui/SectionLabel";
import SkillTag from "@/components/ui/SkillTag";
import { ctf } from "@/data/ctf";

export default function CTFAchievements() {
  // Self-hide when there are no entries (§5G / §6 amendment 4).
  if (ctf.length === 0) return null;

  return (
    <section id="ctf" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionLabel>{"// CTF"}</SectionLabel>
        <h2 className="mt-4 font-display text-3xl font-bold text-fg sm:text-4xl">
          CTF Achievements
        </h2>

        <ol className="mt-10 max-w-3xl border-l border-border-dim">
          {ctf.map((entry, i) => (
            <li key={`${entry.name}-${i}`} className="relative pb-8 pl-6 last:pb-0">
              <span
                className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent"
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-baseline gap-x-3">
                <p className="font-display text-base font-bold text-fg">
                  {entry.name}
                </p>
                {entry.placement && (
                  <span className="font-mono text-sm text-accent">
                    {entry.placement}
                  </span>
                )}
              </div>
              {(entry.date || entry.team) && (
                <p className="mt-0.5 font-mono text-xs text-muted">
                  {[entry.date, entry.team].filter(Boolean).join(" · ")}
                </p>
              )}
              {entry.categories && entry.categories.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {entry.categories.map((c) => (
                    <li key={c}>
                      <SkillTag>{c}</SkillTag>
                    </li>
                  ))}
                </ul>
              )}
              {entry.notes && (
                <p className="mt-2 text-sm text-muted">{entry.notes}</p>
              )}
              {entry.url && (
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block font-mono text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:text-fg"
                >
                  details →
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
