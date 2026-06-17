"use client";

import { useState, useRef } from "react";

const PROJECT_SLUGS = [
  { label: "HRMS System", slug: "hrms.jpg" },
  { label: "Secure Communication Project", slug: "secure-comm.jpg" },
  { label: "x86 Buffer Overflow Exploits", slug: "buffer-overflow.jpg" },
  { label: "Integrity Access Control System", slug: "integrity-access.jpg" },
  { label: "AWS VPC Infrastructure Setup", slug: "aws-vpc.jpg" },
  { label: "Hosting a Static Website on AWS S3", slug: "aws-s3.jpg" },
  { label: "Acoustic Echolocation System", slug: "acoustic-echolocation.jpg" },
  { label: "Kubernetes on AWS Backend Deployment", slug: "kubernetes-aws.jpg" },
  { label: "Docker MCP + Cursor (Postgres Playground)", slug: "docker-mcp-cursor.jpg" },
  { label: "AWS CI/CD Pipeline", slug: "aws-cicd-pipeline.jpg" },
  { label: "Terraform – S3 Bucket (IaC Beginner Project)", slug: "terraform-s3.jpg" },
  { label: "GuardDuty Threat Detection (Juice Shop)", slug: "guardduty-juiceshop.jpg" },
  { label: "Encryption with AWS KMS and DynamoDB", slug: "aws-kms-dynamodb.jpg" },
];

type UploadStatus = "idle" | "uploading" | "success" | "error";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);

  const [selectedProject, setSelectedProject] = useState(PROJECT_SLUGS[0].slug);
  const [projectFile, setProjectFile] = useState<File | null>(null);
  const [projectStatus, setProjectStatus] = useState<UploadStatus>("idle");

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeStatus, setResumeStatus] = useState<UploadStatus>("idle");

  const projectInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  async function verify() {
    const fd = new FormData();
    fd.append("password", password);
    fd.append("verify_only", "true");
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (res.ok) {
      setAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  }

  async function uploadProjectImage() {
    if (!projectFile) return;
    setProjectStatus("uploading");
    const fd = new FormData();
    fd.append("password", password);
    fd.append("file", projectFile);
    fd.append("path", `projects/${selectedProject}`);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    setProjectStatus(res.ok ? "success" : "error");
    if (res.ok) {
      setProjectFile(null);
      if (projectInputRef.current) projectInputRef.current.value = "";
    }
  }

  async function uploadResume() {
    if (!resumeFile) return;
    setResumeStatus("uploading");
    const fd = new FormData();
    fd.append("password", password);
    fd.append("file", resumeFile);
    fd.append("path", "resume/cv.pdf");
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    setResumeStatus(res.ok ? "success" : "error");
    if (res.ok) {
      setResumeFile(null);
      if (resumeInputRef.current) resumeInputRef.current.value = "";
    }
  }

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground">
              <span className="text-sm font-semibold text-background">RW</span>
            </div>
            <h1 className="text-xl font-semibold">Admin Access</h1>
            <p className="mt-1 text-sm text-muted">Portfolio management</p>
          </div>
          <div className="space-y-3">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && verify()}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
            />
            {authError && (
              <p className="text-xs text-red-500">Incorrect password.</p>
            )}
            <button
              onClick={verify}
              className="w-full rounded-xl bg-accent px-4 py-3 text-sm font-medium text-white transition-all hover:opacity-90 active:scale-[0.98]"
            >
              Continue
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-20 space-y-10">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-foreground">
            <span className="text-xs font-semibold text-background">RW</span>
          </div>
          <h1 className="text-xl font-semibold">Portfolio Admin</h1>
        </div>
        <p className="text-sm text-muted">Manage your project images and resume.</p>
      </div>

      {/* Project Image Upload */}
      <section className="rounded-2xl border border-border bg-card p-6 space-y-5">
        <div>
          <h2 className="font-medium">Project Image</h2>
          <p className="text-sm text-muted mt-0.5">Upload a screenshot for a specific project.</p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted mb-1.5 block">Select project</label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-accent transition-colors"
            >
              {PROJECT_SLUGS.map((p) => (
                <option key={p.slug} value={p.slug}>{p.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-muted mb-1.5 block">Image file (JPG, PNG, WebP)</label>
            <input
              ref={projectInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => setProjectFile(e.target.files?.[0] ?? null)}
              className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm outline-none file:mr-3 file:rounded-lg file:border-0 file:bg-accent/10 file:px-3 file:py-1 file:text-xs file:text-accent cursor-pointer"
            />
          </div>
        </div>

        <button
          onClick={uploadProjectImage}
          disabled={!projectFile || projectStatus === "uploading"}
          className="rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {projectStatus === "uploading" ? "Uploading…" : "Upload Image"}
        </button>

        {projectStatus === "success" && (
          <p className="text-xs text-green-500">Image uploaded successfully.</p>
        )}
        {projectStatus === "error" && (
          <p className="text-xs text-red-500">Upload failed. Check your Supabase setup.</p>
        )}
      </section>

      {/* Resume Upload */}
      <section className="rounded-2xl border border-border bg-card p-6 space-y-5">
        <div>
          <h2 className="font-medium">Resume / CV</h2>
          <p className="text-sm text-muted mt-0.5">Replace the resume shown on your portfolio.</p>
        </div>

        <div>
          <label className="text-xs text-muted mb-1.5 block">PDF file</label>
          <input
            ref={resumeInputRef}
            type="file"
            accept=".pdf"
            onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
            className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm outline-none file:mr-3 file:rounded-lg file:border-0 file:bg-accent/10 file:px-3 file:py-1 file:text-xs file:text-accent cursor-pointer"
          />
        </div>

        <button
          onClick={uploadResume}
          disabled={!resumeFile || resumeStatus === "uploading"}
          className="rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {resumeStatus === "uploading" ? "Uploading…" : "Upload Resume"}
        </button>

        {resumeStatus === "success" && (
          <p className="text-xs text-green-500">Resume uploaded successfully.</p>
        )}
        {resumeStatus === "error" && (
          <p className="text-xs text-red-500">Upload failed. Check your Supabase setup.</p>
        )}
      </section>
    </main>
  );
}
