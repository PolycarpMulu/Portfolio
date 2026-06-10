import SectionLabel from "@/components/ui/SectionLabel";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  // Defensive: render nothing if there are no projects (keeps the page tidy).
  if (projects.length === 0) return null;

  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionLabel>{"// PROJECTS"}</SectionLabel>
        <h2 className="mt-4 font-display text-3xl font-bold text-fg sm:text-4xl">
          Projects
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
