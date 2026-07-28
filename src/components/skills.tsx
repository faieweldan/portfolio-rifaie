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
    <section id="skills" className="px-8 py-11 sm:px-14">
      <SectionHeading title="Skills" />
      <div>
        {skillGroups.map((group, i) => (
          <Reveal key={group.label} delay={Math.min(i, 8) * 0.06}>
            <div className="grid grid-cols-1 gap-1 border-b border-border py-2.5 sm:grid-cols-[150px_1fr] sm:gap-5">
              <span className="pt-0.5 font-mono text-[0.65rem] uppercase tracking-[0.11em] text-muted">
                {group.label}
              </span>
              <span className="text-[0.95em] text-foreground">
                {group.items.join(", ")}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
