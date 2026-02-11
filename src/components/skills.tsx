"use client";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const skillGroups = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "C", "HTML"],
  },
  {
    label: "Frameworks & Libraries",
    items: ["React", "Next.js", "Tailwind CSS", "Shadcn/ui"],
  },
  {
    label: "Security",
    items: [
      "Cryptography (RSA, ChaCha20, AES-CCM)",
      "Buffer overflow exploitation",
      "Mandatory Access Control",
      "SRP authentication",
    ],
  },
  {
    label: "Cloud & Infrastructure",
    items: ["AWS (S3, VPC)", "Supabase", "Cloud networking", "CIDR planning"],
  },
  {
    label: "Tools",
    items: ["Git", "GDB", "Linux", "VS Code"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title="Skills" />
        <div className="grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.08}>
              <div>
                <h3 className="mb-3 text-sm font-medium text-accent">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border px-3 py-1 text-sm text-muted transition-colors duration-200 hover:border-accent/40 hover:text-foreground"
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
