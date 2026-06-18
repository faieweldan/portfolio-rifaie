"use client";

import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { supabase } from "@/lib/supabase";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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

export default function PdfViewer() {
  const [numPages, setNumPages] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(700);
  const containerRef = useRef<HTMLDivElement>(null);
  const resumeUrl = useResumeUrl();

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      setContainerWidth(Math.min(width, 700));
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center gap-6">
      <Document
        file={resumeUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        className="flex flex-col items-center gap-6"
      >
        {Array.from({ length: numPages }, (_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-border shadow-xl shadow-black/5 dark:shadow-black/20"
          >
            <Page
              pageNumber={i + 1}
              width={containerWidth}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </div>
        ))}
      </Document>
    </div>
  );
}
