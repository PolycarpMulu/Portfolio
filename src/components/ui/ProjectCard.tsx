import SkillTag from "@/components/ui/SkillTag";
import type { Project } from "@/types";

export default function ProjectCard({ project }: { project: Project }) {
  const meta = [project.status, project.year ? String(project.year) : ""]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="flex flex-col border border-border-dim bg-surface p-6 transition-colors hover:border-accent">
      {(project.category || meta) && (
        <div className="flex items-center justify-between gap-3">
          {project.category && (
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
              {project.category}
            </span>
          )}
          {meta && (
            <span className="font-mono text-xs text-muted">{meta}</span>
          )}
        </div>
      )}

      <h3 className="mt-3 font-display text-lg font-bold text-fg">
        {project.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      {project.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <SkillTag>{tag}</SkillTag>
            </li>
          ))}
        </ul>
      )}

      {(project.repo || project.demo) && (
        <div className="mt-5 flex flex-wrap gap-5">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:text-fg"
            >
              repo →
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:text-fg"
            >
              live →
            </a>
          )}
        </div>
      )}
    </article>
  );
}
