"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { getProjectImageUrl, supabase } from "@/lib/supabase";

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

const projects = [
  {
    title: "Arthroscopy Fluid Bag Monitor",
    slug: "arthroscopy-fluid.jpg",
    github: "https://github.com/faieweldan/arthroscopy-beta",
    demo: "https://youtu.be/5m5sAgjYoGg?si=VY5aC5tio8t2Lizv",
    showcase: "https://sites.psu.edu/lfshowcasesp26/2026/04/28/arthroscopy-fluid-bag-management-system/",
    description:
      "Penn State Capstone project. Monitors irrigation fluid bags during arthroscopic surgery and alerts OR staff when bags run low. Two load cells feed weight data via Arduino to a Raspberry Pi 5, which displays live fluid percentage and volume on a touchscreen GUI. Sponsored by surgeons from Hershey Medical Center.",
    tags: [
      "Python",
      "Raspberry Pi 5",
      "Arduino",
      "HX711 Load Cell",
      "GPIO",
      "Tkinter GUI",
      "Embedded Systems",
      "Capstone",
    ],
  },
  {
    title: "HRMS System",
    slug: "hrms.jpg",
    github: "https://github.com/faieweldan/hrms",
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
    slug: "secure-comm.jpg",
    github: "https://github.com/faieweldan/secure-comm-project",
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
    slug: "buffer-overflow.jpg",
    github: "https://github.com/faieweldan/x86-buffer-overflow-exploits",
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
    slug: "integrity-access.jpg",
    github: "https://github.com/faieweldan/integrity-access-control",
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
    slug: "aws-vpc.jpg",
    github: "https://github.com/faieweldan/aws-vpc-infrastructure-setup",
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
    slug: "aws-s3.jpg",
    github: "https://github.com/faieweldan/Hosting-a-Static-Website-on-AWS-S3",
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
  {
    title: "Acoustic Echolocation System",
    slug: "acoustic-echolocation.jpg",
    github: "https://github.com/faieweldan/mini-project-cybersecurity",
    description:
      "A signal processing project that estimates wall distance using acoustic echolocation. Plays white noise from a phone, records it on a laptop mic, and calculates the distance based on the delay between the direct and reflected sound.",
    tags: [
      "Python",
      "NumPy",
      "SciPy",
      "Matplotlib",
      "Signal Processing",
      "Acoustic sensing",
      "CMPEN 462",
    ],
  },
  {
    title: "Kubernetes on AWS Backend Deployment",
    slug: "kubernetes-aws.jpg",
    github: "https://github.com/faieweldan/aws-kubernetes-backend-deployment",
    description:
      "A hands-on 4-part project documenting how a backend application moves from source code to a running deployment on a Kubernetes cluster using AWS services. Covers cluster creation, Docker containerization, ECR, EKS, and manifest deployment.",
    tags: [
      "AWS",
      "Kubernetes",
      "EKS",
      "Docker",
      "ECR",
      "CloudFormation",
      "eksctl",
      "kubectl",
    ],
  },
  {
    title: "Docker MCP + Cursor (Postgres Playground)",
    slug: "docker-mcp-cursor.jpg",
    github: "https://github.com/faieweldan/Docker-Container-using-Cursor",
    description:
      "A hands-on exploration of controlling Docker containers through natural language using Cursor's AI chat and a Docker MCP server. Spins up a PostgreSQL container and an Adminer web UI via Docker Compose — all configured through AI prompts instead of manual CLI commands.",
    tags: [
      "Docker",
      "Docker Compose",
      "PostgreSQL",
      "MCP",
      "Cursor AI",
      "Adminer",
      "AI-driven DevOps",
    ],
  },
  {
    title: "AWS CI/CD Pipeline",
    slug: "aws-cicd-pipeline.jpg",
    github: "https://github.com/faieweldan/AWS-CI-CD-pipeline",
    description:
      "A complete CI/CD pipeline for a Java web application built using AWS DevOps services. Covers the full workflow from source code on GitHub through automated build, deployment, and rollback — orchestrated end-to-end with CodePipeline.",
    tags: [
      "AWS CodePipeline",
      "AWS CodeBuild",
      "AWS CodeDeploy",
      "AWS CodeArtifact",
      "CloudFormation",
      "EC2",
      "IAM",
      "CI/CD",
    ],
  },
  {
    title: "Terraform – S3 Bucket (IaC Beginner Project)",
    slug: "terraform-s3.jpg",
    github: "https://github.com/faieweldan/create-S3-bucket-and-file-with-terraform",
    description:
      "A beginner Infrastructure as Code project using Terraform to provision and manage an AWS S3 bucket. Covers installation, AWS CLI configuration, writing Terraform configuration files, and the full init → plan → apply → destroy lifecycle.",
    tags: [
      "Terraform",
      "AWS S3",
      "Infrastructure as Code",
      "AWS CLI",
      "IAM",
      "HashiCorp",
    ],
  },
  {
    title: "GuardDuty Threat Detection (Juice Shop)",
    slug: "guardduty-juiceshop.jpg",
    github: "https://github.com/faieweldan/thread-detection-with-GuardDuty",
    description:
      "A cloud security project studying how OWASP Juice Shop vulnerabilities (SQL injection, command injection) can be chained to steal EC2 IAM credentials and access S3. Demonstrates how Amazon GuardDuty detects credential exfiltration and S3 malware using behavioral analysis.",
    tags: [
      "Amazon GuardDuty",
      "AWS CloudFormation",
      "OWASP Juice Shop",
      "SQL Injection",
      "Command Injection",
      "IMDS",
      "Cloud Security",
      "Malware Protection",
    ],
  },
  {
    title: "Encryption with AWS KMS and DynamoDB",
    slug: "aws-kms-dynamodb.jpg",
    github: "https://github.com/faieweldan/encrypt-data-with-AWS-KMS",
    description:
      "A hands-on project demonstrating encryption at rest using a Customer Managed KMS Key on a DynamoDB table. Validates that KMS permissions are enforced independently of DynamoDB access — proving that decryption rights must be explicitly granted through the key policy.",
    tags: [
      "AWS KMS",
      "DynamoDB",
      "Encryption at Rest",
      "IAM",
      "Customer Managed Key",
      "Cloud Security",
    ],
  },
];


type Project = (typeof projects)[number];

const withoutExtension = (name: string) =>
  name.replace(/\.[^.]+$/, "").toLowerCase();

/**
 * Looks up what is actually in storage and indexes it two ways: by full
 * filename, and by name without its extension. That way a screenshot saved
 * as `hrms.png` or `HRMS.jpg` still matches the `hrms.jpg` this page asks
 * for. If the listing can't be read at all, each row falls back to the
 * predictable public address for its own slug.
 */
function useStoredImages() {
  const [stored, setStored] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const { data, error } = await supabase.storage
        .from("portfolio")
        .list("projects", { limit: 200 });

      if (cancelled || error || !data) {
        if (!cancelled) setStored({});
        return;
      }

      const map: Record<string, string> = {};
      for (const file of data) {
        const { data: urlData } = supabase.storage
          .from("portfolio")
          .getPublicUrl(`projects/${file.name}`);
        map[file.name.toLowerCase()] = urlData.publicUrl;
        map[withoutExtension(file.name)] = urlData.publicUrl;
      }
      setStored(map);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return stored;
}

export function Projects() {
  const stored = useStoredImages();

  return (
    <section id="projects" className="px-8 py-11 sm:px-14">
      <SectionHeading title="Selected projects" note="click to open" />
      <div className="flex flex-col">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={Math.min(i, 4) * 0.02}>
            <ProjectRow project={project} stored={stored} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  stored,
}: {
  project: Project;
  stored: Record<string, string> | null;
}) {
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const contentId = `project-${project.slug}`;

  // Prefer whatever is really in storage (which tolerates a different
  // extension or capitalisation), then fall back to the predictable address.
  // Either way the row still opens, so a storage problem can never hide the
  // project's links.
  const imageUrl =
    stored?.[project.slug.toLowerCase()] ??
    stored?.[withoutExtension(project.slug)] ??
    getProjectImageUrl(project.slug);

  function toggle() {
    setOpen((v) => !v);
    setEverOpened(true);
  }

  return (
    <div className="border-b border-border">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={toggle}
        className="block w-full py-4 text-left"
      >
        <div className="grid gap-x-10 gap-y-2 sm:grid-cols-[minmax(0,1fr)_minmax(180px,240px)]">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-[1.08rem] font-semibold tracking-tight">
                {project.title}
              </span>
              <span className="font-mono text-[0.78em] text-muted">
                {open ? "–" : "+"}
              </span>
            </div>
            <p className="mt-1 text-[0.94em] text-muted">
              {project.description}
            </p>
          </div>

          {/* Stack in the right-hand column so the wide side of the page
              carries the metadata instead of sitting empty. */}
          <ul className="flex flex-col gap-0.5 font-mono text-[0.62rem] leading-relaxed tracking-wide text-muted sm:pt-1">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </button>

      <div
        id={contentId}
        // Keeps the collapsed links out of the keyboard tab order — they are
        // invisible, so tabbing into them would strand the focus ring.
        inert={!open}
        className="overflow-hidden transition-[max-height,opacity,margin] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={
          open
            ? { maxHeight: 540, opacity: 1, marginBottom: 19 }
            : { maxHeight: 0, opacity: 0, marginBottom: 0 }
        }
      >
        {everOpened && !imageFailed && (
          <div className="relative aspect-[16/9] max-h-[420px] w-full overflow-hidden bg-card">
            <Image
              src={imageUrl}
              alt={`${project.title} screenshot`}
              fill
              unoptimized
              onError={() => setImageFailed(true)}
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 900px"
            />
          </div>
        )}
        <div className="mt-2.5 flex flex-wrap gap-2">
          <ProjectLink href={project.github}>
            <GithubIcon />
            GitHub
          </ProjectLink>
          {"demo" in project && (
            <ProjectLink href={project.demo as string}>
              <ExternalIcon />
              Demo
            </ProjectLink>
          )}
          {"showcase" in project && (
            <ProjectLink href={project.showcase as string}>
              <ExternalIcon />
              Showcase
            </ProjectLink>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 border border-border px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-wide text-muted transition-colors duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-foreground hover:text-foreground"
    >
      {children}
    </a>
  );
}
