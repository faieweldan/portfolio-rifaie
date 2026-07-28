"use client";

import { useEffect, useRef } from "react";

/**
 * A quiet, ambient signal trace behind the intro paragraph — two waveform
 * channels that swell toward the cursor. It nods at the load cells feeding
 * an Arduino and a Raspberry Pi 5 in the arthroscopy capstone below.
 */
export function Telemetry() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const mouse = { x: 0.5, y: 0.5 };
    let t = 0;
    let raf = 0;

    function size() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, rect.width * dpr);
      canvas.height = Math.max(1, rect.height * dpr);
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const observer = new ResizeObserver(size);
    observer.observe(canvas);
    size();

    const parent = canvas.parentElement;
    function onMove(e: PointerEvent) {
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = (e.clientY - rect.top) / rect.height;
    }
    parent?.addEventListener("pointermove", onMove);

    function trace(w: number, h: number, phase: number, amp: number, color: string, lw: number) {
      if (!ctx) return;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 4) {
        const n = x / w;
        const d = Math.abs(n - mouse.x);
        const swell = Math.exp(-d * d * 26) * 30 * (0.4 + mouse.y);
        const y =
          h * 0.5 +
          Math.sin(n * 7 + phase) * amp +
          Math.sin(n * 19 - phase * 1.7) * amp * 0.35 +
          Math.sin(n * 41 + phase * 0.6) * amp * 0.12 +
          Math.sin(n * 13 + phase * 2) * swell * 0.35 -
          swell * 0.5;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = lw;
      ctx.stroke();
    }

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(120,140,130,.09)";
      ctx.lineWidth = 1;
      for (let gy = 0; gy < h; gy += 34) {
        ctx.beginPath();
        ctx.moveTo(0, gy + 0.5);
        ctx.lineTo(w, gy + 0.5);
        ctx.stroke();
      }
      for (let gx = 0; gx < w; gx += 34) {
        ctx.beginPath();
        ctx.moveTo(gx + 0.5, 0);
        ctx.lineTo(gx + 0.5, h);
        ctx.stroke();
      }

      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim();

      ctx.globalAlpha = 0.3;
      trace(w, h, t, 26, accent || "#1e4d3f", 1.4);
      ctx.globalAlpha = 0.18;
      trace(w, h, t * 0.62 + 2.2, 19, "#7d8a85", 1);
      ctx.globalAlpha = 1;

      if (!reduceMotion) {
        t += 0.011;
        raf = requestAnimationFrame(draw);
      }
    }
    draw();

    return () => {
      observer.disconnect();
      parent?.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute -inset-x-5 -inset-y-3.5 [mask-image:radial-gradient(ellipse_78%_82%_at_42%_50%,#000_30%,transparent_78%)]"
    />
  );
}
