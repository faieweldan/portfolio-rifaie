"use client";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const experiences = [
  {
    role: "AI Integrator Intern",
    company: "NABO / Chairman Sdn. Bhd.",
    period: "May 2025 – Jul 2025",
    location: "Sentul, Malaysia",
    description:
      "Worked with internal teams to understand existing workflows and identify opportunities to improve efficiency using AI tools. Focused on practical AI adoption, process optimization, and educating employees on realistic AI use cases.",
    skills: [
      "Workflow analysis",
      "AI integration concepts",
      "Process optimization",
      "Cross-team communication",
      "Practical automation",
    ],
  },
  {
    role: "Senior Culinary Assistant & Student Manager",
    company: "Pollock Dining, Penn State",
    period: "Feb 2023 – May 2026",
    location: "University Park, PA",
    description:
      "Promoted multiple times over three years, progressing from crew member to senior culinary assistant and student manager. Handled customer inquiries, guided large groups during summer programs, supervised staff, and trained new student employees.",
    skills: [
      "Leadership & supervision",
      "Training and onboarding",
      "Customer service",
      "Team coordination",
      "Responsibility in high-traffic environments",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title="Experience" />
        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <Reveal key={exp.role} delay={i * 0.1}>
              <div className="group relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-accent/40 before:transition-colors before:duration-200 hover:before:bg-accent">
                <div className="mb-1 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                  <h3 className="text-base font-medium">{exp.role}</h3>
                  <span className="text-xs text-muted">{exp.period}</span>
                </div>
                <p className="mb-1 text-sm text-accent/80">{exp.company}</p>
                <p className="mb-3 text-xs text-muted">{exp.location}</p>
                <p className="mb-4 text-sm leading-relaxed text-muted">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs text-accent"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
