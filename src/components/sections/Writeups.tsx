import SectionLabel from "@/components/ui/SectionLabel";
import SkillTag from "@/components/ui/SkillTag";
import { writeups } from "@/data/writeups";

export default function Writeups() {
  // Self-hide when there are no entries (§5H / §6 amendment 4).
  if (writeups.length === 0) return null;

  return (
    <section id="writeups" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionLabel>{"// WRITEUPS"}</SectionLabel>
        <h2 className="mt-4 font-display text-3xl font-bold text-fg sm:text-4xl">
          Writeups
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {writeups.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col border border-border-dim bg-surface p-6 transition-colors hover:border-accent"
            >
              <div className="flex items-center justify-between gap-3">
                {post.category && (
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
                    {post.category}
                  </span>
                )}
                <span className="font-mono text-xs text-muted">{post.date}</span>
              </div>
              <h3 className="mt-3 font-display text-lg font-bold text-fg">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {post.summary}
              </p>
              {post.tags.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li key={tag}>
                      <SkillTag>{tag}</SkillTag>
                    </li>
                  ))}
                </ul>
              )}
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block font-mono text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:text-fg"
              >
                read →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
