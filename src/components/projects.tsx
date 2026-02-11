"use client";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const projects = [
  {
    title: "HRMS System",
    description:
      "A full-stack Human Resource Management System built for a small-to-medium business (50–60 employees). Supports attendance tracking, leave management, employee records, and role-based dashboards for HR and employees.",
    tags: [
      "Next.js 14",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn/ui",
      "Supabase",
      "Role-based access control",
      "Full-stack system design",
    ],
  },
  {
    title: "Secure Communication Project",
    description:
      "A hands-on cryptography project implementing secure communication using hybrid encryption and authentication mechanisms. Designed around real-world security concepts such as key exchange, encrypted storage, and password security.",
    tags: [
      "Cryptography",
      "RSA",
      "ChaCha20",
      "AES-CCM",
      "SRP authentication",
      "Python",
      "Secure file storage",
    ],
  },
  {
    title: "x86 Buffer Overflow Exploits",
    description:
      "Security research project exploring memory corruption vulnerabilities on x86 systems. Includes practical exploitation of buffer overflows to bypass authentication and hijack control flow.",
    tags: [
      "C",
      "x86 architecture",
      "Linux",
      "Buffer overflow exploitation",
      "GDB",
      "Stack memory analysis",
      "Control flow hijacking",
    ],
  },
  {
    title: "Integrity Access Control System",
    description:
      "A reference monitor implemented in C that enforces multiple mandatory integrity protection models. Focuses on enforcing and comparing different integrity policies at the operating system level.",
    tags: [
      "C",
      "Operating Systems",
      "Mandatory Access Control",
      "Biba Integrity Model",
      "Windows MIC",
      "LOMAC",
      "Policy enforcement design",
    ],
  },
  {
    title: "AWS VPC Infrastructure Setup",
    description:
      "Hands-on cloud project building a secure AWS Virtual Private Cloud from scratch. Covers subnet design, routing, internet gateways, and infrastructure configuration via console and CLI.",
    tags: [
      "AWS",
      "VPC",
      "Subnets",
      "Internet Gateway",
      "CIDR planning",
      "Cloud networking",
      "Infrastructure documentation",
    ],
  },
  {
    title: "Hosting a Static Website on AWS S3",
    description:
      "A practical cloud project demonstrating how to host and expose a public static website using Amazon S3. Focuses on permissions, public access configuration, and basic cloud hosting concepts.",
    tags: [
      "AWS S3",
      "Static website hosting",
      "Cloud permissions",
      "Public access configuration",
      "HTML",
    ],
  },
];

export function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title="Projects" />
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.1}>
              <div className="group block rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20">
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
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
