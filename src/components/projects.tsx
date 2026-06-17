"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { supabase } from "@/lib/supabase";

const projects = [
  {
    title: "HRMS System",
    slug: "hrms.jpg",
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
    report: "/reports/secure-comm-report.pdf",
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
    report: "/reports/buffer-overflow-report.pdf",
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
    report: "/reports/integrity-report.pdf",
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

function useProjectImages() {
  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    async function load() {
      const { data } = await supabase.storage.from("portfolio").list("projects");
      if (!data) return;
      const map: Record<string, string> = {};
      for (const file of data) {
        const { data: urlData } = supabase.storage
          .from("portfolio")
          .getPublicUrl(`projects/${file.name}`);
        map[file.name] = urlData.publicUrl;
      }
      setImages(map);
    }
    load();
  }, []);

  return images;
}

export function Projects() {
  const images = useProjectImages();

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title="Projects" />
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project, i) => {
            const imageUrl = images[project.slug];
            return (
              <Reveal key={project.title} delay={i * 0.1}>
                <div className="group block rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 overflow-hidden">
                  {imageUrl && (
                    <div className="relative w-full aspect-video overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={`${project.title} screenshot`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
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
                    {"report" in project && (
                      <a
                        href={project.report as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                          <polyline points="14 2 14 8 20 8"/>
                        </svg>
                        View Report
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
