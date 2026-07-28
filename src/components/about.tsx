"use client";

import { Telemetry } from "./telemetry";

export function About() {
  return (
    <section className="px-8 pb-4 pt-10 sm:px-14 sm:pt-13">
      <div className="relative py-6">
        <Telemetry />
        <div className="relative">
          <h2 className="max-w-[19ch] text-[2rem] font-semibold leading-[1.05] tracking-tight text-balance sm:text-[2.35rem]">
            Systems that have to work the first time.
          </h2>
          <p className="mt-5 max-w-[58ch] text-muted">
            AI Product Engineer at <strong className="font-semibold text-foreground">Cirqle Sdn Bhd</strong>. Computer
            Engineering at Penn State with a minor in Cybersecurity — cloud
            and security work, usually ending up on the hardware side of the
            problem. A surgical fluid monitor for Hershey Medical Center one
            term, an HR system running payroll for sixty people the next.
          </p>
        </div>
      </div>
    </section>
  );
}
