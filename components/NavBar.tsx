"use client";

import { useState } from "react";
import { siteData } from "@/content/siteData";

const navItems = [
  { label: "Journey", href: "#journey" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(15,18,18,0.8)] backdrop-blur-xl">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <a
          href="#top"
          className="text-sm font-semibold tracking-wide text-white transition-colors hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
        >
          {siteData.name}
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm text-[var(--text-muted)] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={siteData.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-[var(--text-muted)] transition hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] md:inline-flex"
          >
            View Resume
          </a>
          <a
            href={`mailto:${siteData.email}`}
            className="hidden rounded-full border border-[var(--accent)]/40 bg-[var(--panel-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)] transition hover:border-[var(--accent)] hover:bg-[var(--panel)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] md:inline-flex"
          >
            Email me
          </a>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-md border border-white/15 p-2 text-[var(--text-muted)] transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] md:hidden"
          >
            <span className="sr-only">Open mobile menu</span>
            <span className="h-0.5 w-5 bg-current" />
          </button>
        </div>
      </nav>

      {isOpen ? (
        <div className="border-t border-white/10 bg-[var(--panel)] md:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-md px-2 py-2 text-sm text-[var(--text-muted)] transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="mt-2 space-y-1 border-t border-white/10 pt-2">
              <a
                href={siteData.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-2 py-2 text-sm text-[var(--text-muted)] transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                View Resume
              </a>
              <a
                href={`mailto:${siteData.email}`}
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-2 py-2 text-sm font-medium text-[var(--accent)] transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                Email me
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
