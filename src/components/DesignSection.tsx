import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";

export function DesignSection() {
  return (
    <section className="design" id="design" aria-labelledby="design-title">
      <h2 id="design-title">Impactful products crafted with care and collaboration</h2>
      <ul className="project-list">
        {projects.map((p, i) => (
          <li key={p.slug}>
            {/* scroll={false}: opening the project modal shouldn't move the page underneath */}
            <Link className="project-card" href={`/design/${p.slug}`} scroll={false}>
              <Image src={p.cover.src} width={p.cover.width} height={p.cover.height} alt={p.cover.alt} sizes="(max-width: 1088px) 100vw, 1040px"
                loading={i === 0 ? "eager" : "lazy"} /* first image is on screen when /design opens */ />
              <span className="project-card-meta">
                <span className="project-card-title">{p.title}</span>
                <span className="muted">{p.role} · {p.year}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
