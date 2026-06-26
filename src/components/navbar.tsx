"use client";

import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { label: "projects", href: "#projects" },
  { label: "about me", href: "#about" },
  { label: "resume", href: "#resume" },
  { label: "contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="#" className="text-sm font-medium tracking-wide">
          portfolio
        </a>
        <div className="flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden text-sm text-muted transition-colors duration-200 hover:text-foreground sm:block"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
          <button
            className="flex flex-col gap-1.5 sm:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-5 bg-foreground transition-transform duration-200 ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-foreground transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-foreground transition-transform duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/50 bg-background/95 px-6 py-4 sm:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-muted transition-colors duration-200 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
