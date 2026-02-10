"use client";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const projects = [
  {
    title: "Project One",
    description: "A brief description of what this project does and the problem it solves.",
    tags: ["React", "TypeScript", "Tailwind"],
    href: "#",
  },
  {
    title: "Project Two",
    description: "A brief description of what this project does and the problem it solves.",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    href: "#",
  },
  {
    title: "Project Three",
    description: "A brief description of what this project does and the problem it solves.",
    tags: ["Python", "FastAPI", "Docker"],
    href: "#",
  },
];

export function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <SectionHeading title="Projects" />
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.1}>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20"
              >
                <h3 className="mb-2 text-base font-medium group-hover:text-accent transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
