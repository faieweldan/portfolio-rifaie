"use client";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const experiences = [
  {
    role: "AI Product Engineer",
    company: "Cirqle Sdn Bhd",
    period: "Jul 2026 – Present",
    location: "Malaysia",
    description:
      "Full-time role building AI-driven products, bridging product thinking with hands-on engineering. Responsible for designing, developing, and shipping AI-powered features — from prototyping and model integration to production deployment — while working closely with product and engineering teams to turn AI capabilities into real user value.",
    skills: [
      "AI product development",
      "LLM integration",
      "Full-stack engineering",
      "Product thinking",
      "Cross-functional collaboration",
      "Production deployment",
    ],
  },
  {
    role: "Independent Software Consultant",
    company: "Awie Metal Sdn Bhd",
    period: "Jun 2026 – Present",
    location: "Malaysia",
    description:
      "Sole developer for a bespoke Human Resource Management System serving a 50–60 employee scrap metal operation. Delivered end-to-end: requirements gathering with non-technical stakeholders, system architecture, full-stack development, and production deployment. The system is live, handling daily HR operations including attendance, payroll, and employee records — replacing manual processes entirely.",
    skills: [
      "Full-stack development",
      "System architecture",
      "Client engagement",
      "Production deployment",
      "Business process digitisation",
      "Stakeholder communication",
    ],
  },
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
    <section id="experience" className="px-8 py-11 sm:px-14">
      <SectionHeading title="Experience" />
      <div className="flex flex-col">
        {experiences.map((exp, i) => (
          <Reveal key={exp.role} delay={Math.min(i, 4) * 0.02}>
            <div className="grid gap-x-10 gap-y-2 border-b border-border py-4 sm:grid-cols-[minmax(0,1fr)_minmax(180px,240px)]">
              <div>
                <span className="text-[1.08rem] font-semibold tracking-tight">
                  {exp.role}
                  <span className="font-normal text-muted"> · {exp.company}</span>
                </span>
                <p className="mt-1.5 text-[0.94em] text-muted">
                  {exp.description}
                </p>
              </div>

              {/* Dates and skills live in the right-hand column so the wide
                  side of the page carries information instead of sitting empty. */}
              <div className="font-mono text-[0.62rem] leading-relaxed tracking-wide text-muted sm:pt-1">
                <div className="tabular-nums text-foreground">{exp.period}</div>
                <div className="mt-0.5">{exp.location}</div>
                <ul className="mt-2.5 flex flex-col gap-0.5">
                  {exp.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
