"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer() {
  const [numPages, setNumPages] = useState<number>(0);

  return (
    <div className="flex flex-col items-center gap-6">
      <Document
        file="/cv.pdf"
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
              width={700}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </div>
        ))}
      </Document>
    </div>
  );
}
