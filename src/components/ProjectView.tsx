import Image from "next/image";
import type { Project } from "@/content/projects";

// Project content — shared by the modal and the full /design/[slug] page.
export function ProjectView({ project, headingId }: { project: Project; headingId?: string }) {
  return (
    <article className="project">
      <h1 id={headingId}>{project.title}</h1>
      <div className="project-meta muted">
        <span>{project.role}</span>
        <span>{project.year}</span>
      </div>
      <Image src={project.cover.src} width={project.cover.width} height={project.cover.height} alt={project.cover.alt} sizes="(max-width: 1088px) 100vw, 1040px" />
      <p>{project.summary}</p>
    </article>
  );
}
