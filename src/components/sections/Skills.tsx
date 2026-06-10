import SectionLabel from "@/components/ui/SectionLabel";
import SkillTag from "@/components/ui/SkillTag";
import { focusAreas, skillGroups } from "@/data/skills";

// Skills as Focus Areas (PORTFOLIO_CONTENT §7) — capability cards are the primary
// presentation; the grouped professional-skills cloud (§2) sits below as the fuller
// list. Numeric radar intentionally omitted (STEP 6).
export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionLabel>{"// SKILLS"}</SectionLabel>
        <h2 className="mt-4 font-display text-3xl font-bold text-fg sm:text-4xl">
          Focus Areas
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Areas of practice and ongoing study across offensive and defensive
          security.
        </p>

        {/* Primary: capability cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {focusAreas.map((area) => (
            <article
              key={area.title}
              className="border border-border-dim bg-surface p-6 transition-colors hover:border-accent"
            >
              <h3 className="font-display text-lg font-bold text-fg">
                {area.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {area.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {area.chips.map((chip) => (
                  <li key={chip}>
                    <SkillTag>{chip}</SkillTag>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Fuller list: grouped professional skills */}
        <div className="mt-16">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Professional Skills
          </h3>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.name}>
                <p className="font-mono text-sm text-accent">{group.name}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li key={skill}>
                      <SkillTag>{skill}</SkillTag>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
