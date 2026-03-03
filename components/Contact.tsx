"use client";

import { useState } from "react";
import { siteData } from "@/content/siteData";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(siteData.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-6xl border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="rounded-3xl border border-white/10 bg-[var(--panel)] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-dim)]">Contact</p>
        <h2 className="mt-3 text-4xl font-semibold text-[var(--text-strong)] sm:text-5xl">
          Let&apos;s talk
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--text-muted)]">
          I&apos;m open to software engineering internships and collaborative projects in full-stack,
          ML, and data-intensive systems.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${siteData.email}`}
            className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--bg)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
          >
            {siteData.email}
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-full border border-white/20 bg-[var(--panel-soft)] px-5 py-3 text-sm text-[var(--text-muted)] transition hover:border-white/40 hover:text-[var(--text-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            {copied ? "Copied" : "Copy email"}
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href={siteData.github}
            className="text-sm font-medium text-[var(--accent)] transition hover:text-[var(--accent-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            GitHub
          </a>
          <a
            href={siteData.linkedin}
            className="text-sm font-medium text-[var(--accent)] transition hover:text-[var(--accent-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
