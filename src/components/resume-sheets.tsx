"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

const THUMB_WIDTH = 330; // css px, sheet grows up to this before wrapping

type Rect = { left: number; top: number; width: number; height: number };

async function getPdfjs() {
  // The legacy build is the bundler-friendly one; the modern build fails at
  // module evaluation under Turbopack.
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  // Self-hosted worker — bundled by Next, no third-party CDN in the path.
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();
  return pdfjs;
}

async function renderPageToCanvas(
  doc: PDFDocumentProxy,
  pageNumber: number,
  canvas: HTMLCanvasElement,
  cssWidth: number
) {
  const page = await doc.getPage(pageNumber);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const baseViewport = page.getViewport({ scale: 1 });
  const scale = (cssWidth * dpr) / baseViewport.width;
  const viewport = page.getViewport({ scale });

  canvas.width = viewport.width;
  canvas.height = viewport.height;
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssWidth * (viewport.height / viewport.width)}px`;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  await page.render({ canvas, canvasContext: ctx, viewport }).promise;
}

export function ResumeSheets({ pdfUrl }: { pdfUrl: string }) {
  const [numPages, setNumPages] = useState(0);
  const [failed, setFailed] = useState(false);
  const [dealt, setDealt] = useState(false);
  const [openPage, setOpenPage] = useState<number | null>(null);
  const [fromRect, setFromRect] = useState<Rect | null>(null);
  const [entered, setEntered] = useState(false);

  const docRef = useRef<PDFDocumentProxy | null>(null);
  const sheetsWrapRef = useRef<HTMLDivElement>(null);
  const thumbCanvases = useRef<Record<number, HTMLCanvasElement | null>>({});
  const readerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Load the document once, render thumbnails for every page.
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const pdfjs = await getPdfjs();
        const doc = await pdfjs.getDocument({ url: pdfUrl }).promise;
        if (cancelled) return;
        docRef.current = doc;
        setNumPages(doc.numPages);
        setFailed(false);
      } catch {
        // A preview is a nicety; the download link is the real thing. Never
        // leave the section as an empty gap if rendering can't happen.
        if (!cancelled) setFailed(true);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  useEffect(() => {
    if (!numPages || !docRef.current) return;
    let cancelled = false;
    async function renderThumbs() {
      const doc = docRef.current;
      if (!doc) return;
      for (let i = 1; i <= numPages; i++) {
        const canvas = thumbCanvases.current[i];
        if (!canvas || cancelled) continue;
        await renderPageToCanvas(doc, i, canvas, THUMB_WIDTH);
      }
    }
    renderThumbs();
    return () => {
      cancelled = true;
    };
  }, [numPages]);

  // Deal the sheets in once, the first time they scroll into view.
  useEffect(() => {
    const el = sheetsWrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setDealt(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const readerTarget = useCallback(() => {
    const h = Math.min(window.innerHeight * 0.86, window.innerWidth * 0.86 * 1.414);
    const w = h / 1.414;
    return { w, h, x: (window.innerWidth - w) / 2, y: (window.innerHeight - h) / 2 };
  }, []);

  const openReader = useCallback(
    async (pageNumber: number) => {
      const thumb = thumbCanvases.current[pageNumber];
      const doc = docRef.current;
      if (!thumb || !doc) return;

      const rect = thumb.getBoundingClientRect();
      setFromRect({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      });
      lastFocusRef.current = document.activeElement as HTMLElement;
      setOpenPage(pageNumber);
      setEntered(false);

      // Render the reader canvas at a larger size once it exists.
      requestAnimationFrame(async () => {
        const canvas = readerCanvasRef.current;
        if (!canvas) return;
        const target = readerTarget();
        await renderPageToCanvas(doc, pageNumber, canvas, target.w);
        requestAnimationFrame(() => setEntered(true));
        setTimeout(() => closeButtonRef.current?.focus(), 80);
      });
    },
    [readerTarget]
  );

  const closeReader = useCallback(() => {
    setEntered(false);
    setTimeout(() => {
      setOpenPage(null);
      lastFocusRef.current?.focus();
    }, 380);
  }, []);

  useEffect(() => {
    if (openPage === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeReader();
      if (e.key === "ArrowLeft") setOpenPage((p) => (p && p > 1 ? p - 1 : p));
      if (e.key === "ArrowRight")
        setOpenPage((p) => (p && p < numPages ? p + 1 : p));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openPage, numPages, closeReader]);

  // Re-render the reader canvas whenever the open page changes via arrows.
  useEffect(() => {
    if (openPage === null) return;
    const doc = docRef.current;
    const canvas = readerCanvasRef.current;
    if (!doc || !canvas) return;
    const target = readerTarget();
    renderPageToCanvas(doc, openPage, canvas, target.w);
  }, [openPage, readerTarget]);

  const target = openPage !== null ? readerTarget() : null;
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (failed) {
    return (
      <p className="py-2 font-mono text-xs text-muted">
        Preview unavailable — the PDF is still available to download below.
      </p>
    );
  }

  return (
    <>
      <div
        ref={sheetsWrapRef}
        className="flex gap-6 pt-1"
        style={{ perspective: 1600 }}
      >
        {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            aria-label={`Open résumé page ${pageNumber}`}
            onClick={() => openReader(pageNumber)}
            className="group block max-w-[330px] flex-1 cursor-zoom-in text-left"
            style={{
              transform: dealt
                ? "none"
                : `translateY(34px) rotate(${pageNumber % 2 ? -3 : 3}deg) scale(0.94)`,
              opacity: dealt ? 1 : 0,
              transition: reduceMotion
                ? "none"
                : `transform 750ms cubic-bezier(0.16,1,0.3,1) ${(pageNumber - 1) * 130}ms, opacity 750ms ease ${(pageNumber - 1) * 130}ms`,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="relative overflow-hidden border border-border bg-white shadow-[0_1px_2px_rgba(30,32,28,.06),0_6px_16px_rgba(30,32,28,.05)] transition-[box-shadow,transform] duration-[380ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:shadow-[0_3px_6px_rgba(30,32,28,.07),0_20px_44px_rgba(30,32,28,.17)]"
              style={{ aspectRatio: "1 / 1.414" }}
            >
              <canvas
                ref={(el) => {
                  thumbCanvases.current[pageNumber] = el;
                }}
                className="block h-full w-full"
              />
            </div>
            <div className="mt-2.5 font-mono text-[0.68rem] tracking-wider text-muted">
              PAGE {pageNumber} / {numPages}
            </div>
          </button>
        ))}
      </div>

      {openPage !== null && target && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Résumé reader"
          className="fixed inset-0 z-50"
        >
          <div
            className="absolute inset-0 bg-black/70 transition-opacity duration-300"
            style={{ opacity: entered ? 1 : 0 }}
            onClick={closeReader}
          />
          <div
            className="fixed overflow-hidden border border-border bg-white shadow-[0_30px_90px_rgba(0,0,0,0.42)]"
            style={
              reduceMotion
                ? { left: target.x, top: target.y, width: target.w, height: target.h }
                : {
                    left: target.x,
                    top: target.y,
                    width: target.w,
                    height: target.h,
                    transformOrigin: "top left",
                    transition: entered
                      ? "transform 460ms cubic-bezier(0.16,1,0.3,1)"
                      : "none",
                    transform:
                      entered || !fromRect
                        ? "none"
                        : `translate(${fromRect.left - target.x}px, ${fromRect.top - target.y}px) scale(${fromRect.width / target.w}, ${fromRect.height / target.h})`,
                  }
            }
          >
            <canvas ref={readerCanvasRef} className="block h-full w-full" />
          </div>
          <div
            className="fixed bottom-6 left-1/2 flex -translate-x-1/2 gap-2 bg-[#141614]/90 p-2 transition-[opacity,transform] duration-300"
            style={{
              opacity: entered ? 1 : 0,
              transform: entered
                ? "translate(-50%, 0)"
                : "translate(-50%, 14px)",
            }}
          >
            <button
              type="button"
              onClick={() => setOpenPage((p) => (p && p > 1 ? p - 1 : p))}
              disabled={openPage <= 1}
              aria-label="Previous page"
              className="border border-[#4a4f46] px-2.5 py-1 font-mono text-xs text-[#e6e8e4] disabled:opacity-30"
            >
              ←
            </button>
            <span className="self-center px-1 font-mono text-xs tabular-nums text-[#9aa09a]">
              {openPage} / {numPages}
            </span>
            <button
              type="button"
              onClick={() => setOpenPage((p) => (p && p < numPages ? p + 1 : p))}
              disabled={openPage >= numPages}
              aria-label="Next page"
              className="border border-[#4a4f46] px-2.5 py-1 font-mono text-xs text-[#e6e8e4] disabled:opacity-30"
            >
              →
            </button>
            <a
              href={pdfUrl}
              download="Rifaie_Wildani_CV.pdf"
              className="border border-[#4a4f46] px-2.5 py-1 font-mono text-xs text-[#e6e8e4]"
            >
              download ↓
            </a>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeReader}
              className="border border-[#4a4f46] px-2.5 py-1 font-mono text-xs text-[#e6e8e4]"
            >
              ✕ esc
            </button>
          </div>
        </div>
      )}
    </>
  );
}
