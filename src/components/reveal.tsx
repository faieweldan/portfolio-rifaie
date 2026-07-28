"use client";

import { useEffect, useRef } from "react";

const EASE = "cubic-bezier(0.16,1,0.3,1)";

/**
 * Reveals its children on first scroll into view.
 *
 * Fails safe: the markup renders visible, and it is only hidden once we know
 * the observer is attached and the element is genuinely below the fold. If
 * JavaScript, IntersectionObserver, or the effect never runs, the content
 * simply shows — it can never get stuck invisible.
 *
 * Styles are set on the node directly rather than through state, so a page
 * full of these doesn't trigger a re-render per item as you scroll.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already on screen — leave it be rather than flashing it out and back.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    const wait = Math.min(delay, 0.5);
    el.style.opacity = "0";
    el.style.transform = "translateY(9px)";

    function show() {
      if (!el) return;
      el.style.transition = `opacity 480ms ${EASE} ${wait}s, transform 480ms ${EASE} ${wait}s`;
      el.style.opacity = "1";
      el.style.transform = "none";
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          show();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);

    // Safety net: if anything goes wrong, show the content anyway.
    const failsafe = window.setTimeout(show, 3000);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
