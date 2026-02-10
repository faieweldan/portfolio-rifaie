"use client";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const experiences = [
  {
    role: "Software Engineering Intern",
    company: "Company Name",
    period: "Jun 2025 — Aug 2025",
    description:
      "Worked on the frontend team building internal tools. Shipped features used by 200+ employees.",
  },
  {
    role: "Teaching Assistant",
    company: "University CS Department",
    period: "Jan 2025 — May 2025",
    description:
      "Held office hours and graded assignments for an introductory data structures course.",
  },
  {
    role: "Freelance Developer",
    company: "Self-employed",
    period: "2024",
    description:
      "Built landing pages and small web apps for local businesses using React and Tailwind.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <SectionHeading title="Experience" />
        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <Reveal key={exp.role} delay={i * 0.1}>
              <div className="group relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-accent/40 before:transition-colors before:duration-200 hover:before:bg-accent">
                <div className="mb-1 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                  <h3 className="text-base font-medium">{exp.role}</h3>
                  <span className="text-xs text-muted">{exp.period}</span>
                </div>
                <p className="mb-2 text-sm text-accent/80">{exp.company}</p>
                <p className="text-sm leading-relaxed text-muted">
                  {exp.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
