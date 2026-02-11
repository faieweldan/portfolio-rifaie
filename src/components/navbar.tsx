"use client";

import { ThemeToggle } from "./theme-toggle";

const links = [
  { label: "projects", href: "#projects" },
  { label: "about me", href: "#about" },
  { label: "resume", href: "#resume" },
  { label: "contact", href: "#contact" },
];

export function Navbar() {
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
        </div>
      </div>
    </nav>
  );
}
