"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Résumé", href: "#resume" },
];

export function Rail() {
  const [active, setActive] = useState("#projects");
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="border-b border-border bg-card sm:border-b-0 sm:border-r" ref={railRef}>
      <div className="flex flex-col gap-5 px-6 py-9 sm:sticky sm:top-0 sm:h-[100dvh] sm:overflow-y-auto">
        {/* Centred on phones, where the rail becomes a full-width header;
            flush left again once it is a sidebar. */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[132px] overflow-hidden sm:mx-0 sm:max-w-none">
          <Image
            src="/profile.jpg"
            alt="Rifaie Wildani Bin Nazori"
            fill
            // Without this the full 2MB original is downloaded and decoded,
            // even though it is never shown wider than ~250px.
            sizes="(max-width: 640px) 132px, 250px"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="text-lg font-semibold leading-tight tracking-tight">
            Rifaie Wildani
            <br />
            Bin Nazori
          </h1>
          <p className="mt-1 text-sm text-muted">AI Product Engineer, Cirqle</p>
        </div>

        <nav className="flex flex-row flex-wrap gap-x-4 gap-y-1 sm:flex-col sm:gap-px">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`border-b-2 py-1 font-mono text-xs uppercase tracking-wider transition-colors duration-200 sm:border-b-0 sm:border-l-2 sm:py-1.5 sm:pl-3 ${
                active === link.href
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-4 sm:mt-auto">
          <p className="font-mono text-xs leading-relaxed text-muted">
            Computer Engineering, Penn State
            <br />
            Minor in Cybersecurity
            <br />
            <br />
            <a href="mailto:rifaienazori@gmail.com" className="border-b border-border hover:border-foreground">
              rifaienazori@gmail.com
            </a>
            <br />
            <a
              href="https://github.com/faieweldan"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-border hover:border-foreground"
            >
              GitHub
            </a>
            {" · "}
            <a
              href="https://www.linkedin.com/in/faieweldan/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-border hover:border-foreground"
            >
              LinkedIn
            </a>
            {" · "}
            <a
              href="https://instagram.com/faieweldan"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-border hover:border-foreground"
            >
              Instagram
            </a>
          </p>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
