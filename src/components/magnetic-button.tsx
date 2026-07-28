"use client";

import { useRef } from "react";

/**
 * One button on the whole site gets this — the CV download. It leans
 * toward the cursor as you approach. Kept to a single use on purpose:
 * one magnetic button reads as crafted, several reads as noise.
 */
export function MagneticButton({
  children,
  ...props
}: React.ComponentProps<"a">) {
  const zoneRef = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  function handleMove(e: React.PointerEvent) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const btn = btnRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const pull = Math.max(0, 1 - Math.hypot(dx, dy) / 190);
    btn.style.transform = `translate(${dx * pull * 0.34}px, ${dy * pull * 0.34}px)`;
  }

  function handleLeave() {
    const btn = btnRef.current;
    if (btn) btn.style.transform = "";
  }

  return (
    <span
      ref={zoneRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="inline-block p-6 -m-6"
    >
      <a
        ref={btnRef}
        {...props}
        className="inline-flex items-center gap-2 border border-foreground px-[19px] py-[11px] font-mono text-[0.68rem] uppercase tracking-wider text-foreground hover:bg-foreground hover:text-background"
        style={{
          transition:
            "transform 260ms cubic-bezier(0.16,1,0.3,1), background-color 200ms ease, color 200ms ease",
        }}
      >
        {children}
      </a>
    </span>
  );
}
