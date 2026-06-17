import SectionLabel from "@/components/ui/SectionLabel";
import { experience } from "@/data/experience";
import type { Experience as ExperienceItem } from "@/types";

function TimelineGroup({
  title,
  items,
}: {
  title: string;
  items: ExperienceItem[];
}) {
  if (items.length === 0) return null;

  return (
    <div className="mt-10 first:mt-0">
      <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
        {title}
      </h3>
      <ol className="mt-4 border-l border-border-dim">
        {items.map((item, i) => (
          <li key={`${item.title}-${i}`} className="relative pb-8 pl-6 last:pb-0">
            <span
              className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent"
              aria-hidden="true"
            />
            <p className="font-display text-base font-bold text-fg">
              {item.title}
            </p>
            <p className="mt-0.5 font-mono text-sm">
              <span className="text-accent">{item.org}</span>
              {item.location && <span className="text-muted"> · {item.location}</span>}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Experience() {
  const work = experience.filter((e) => e.kind === "work");
  const education = experience.filter((e) => e.kind === "education");
  const certs = experience.filter((e) => e.kind === "certification");

  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionLabel>{"// CAREER"}</SectionLabel>
        <h2 className="mt-4 font-display text-3xl font-bold text-fg sm:text-4xl">
          Professional Experience
        </h2>
        <div className="mt-10 max-w-3xl">
          <TimelineGroup title="Experience" items={work} />
          <TimelineGroup title="Education" items={education} />
          <TimelineGroup title="Certifications" items={certs} />
        </div>
      </div>
    </section>
  );
}
