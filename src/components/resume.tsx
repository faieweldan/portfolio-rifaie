"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { supabase } from "@/lib/supabase";

const PdfViewer = dynamic(() => import("./pdf-viewer"), { ssr: false });

function useDownloadUrl() {
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
  const downloadUrl = useDownloadUrl();

  return (
    <section id="resume" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title="Resume" />

        <Reveal>
          <PdfViewer />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex justify-center">
            <a
              href={downloadUrl}
              download="Rifaie_Wildani_CV.pdf"
              className="rounded-full border border-border px-6 py-2.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              Download CV
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
