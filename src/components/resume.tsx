"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { SectionHeading } from "./section-heading";
import { MagneticButton } from "./magnetic-button";
import { supabase } from "@/lib/supabase";

// pdfjs-dist needs the browser, so the sheets render client-side only.
const ResumeSheets = dynamic(
  () => import("./resume-sheets").then((m) => m.ResumeSheets),
  { ssr: false }
);

function useResumeUrl() {
  const [url, setUrl] = useState("/cv.pdf");

  useEffect(() => {
    async function check() {
      const { data } = await supabase.storage.from("portfolio").list("resume");
      if (data && data.some((f) => f.name === "cv.pdf")) {
        const { data: urlData } = supabase.storage
          .from("portfolio")
          .getPublicUrl("resume/cv.pdf");
        setUrl(urlData.publicUrl);
      }
    }
    check();
  }, []);

  return url;
}

export function Resume() {
  const resumeUrl = useResumeUrl();

  return (
    <section id="resume" className="px-8 py-11 sm:px-14">
      <SectionHeading title="Résumé" note="updated jul 2026" />

      <ResumeSheets pdfUrl={resumeUrl} />

      <div className="flex items-center gap-4 pt-7">
        <MagneticButton href={resumeUrl} download="Rifaie_Wildani_CV.pdf">
          Download CV ↓
        </MagneticButton>
      </div>
    </section>
  );
}
