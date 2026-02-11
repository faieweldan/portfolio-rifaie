"use client";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Resume() {
  return (
    <section id="resume" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title="Resume" />

        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-xl shadow-black/5 dark:shadow-black/20">
            <iframe
              src="/cv.pdf"
              title="Resume"
              className="h-[800px] w-full sm:h-[1000px]"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex justify-center">
            <a
              href="/cv.pdf"
              download
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
