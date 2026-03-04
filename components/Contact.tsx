"use client";

import { useState } from "react";
import { TerminalTypewriter } from "@/components/TerminalTypewriter";
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
        <TerminalTypewriter command="ping linn --for opportunities" />
        <h2 className="mt-3 text-4xl font-semibold text-[var(--text-strong)] sm:text-5xl">
          Let&apos;s build something that matters
        </h2>
        <p className="mt-4 max-w-3xl text-[var(--text-muted)]">
          Open to internships, full-time roles, mentorship, startup ideas, and impactful
          collaborations across backend, full-stack, and agentic systems.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {["Internships", "Full-time", "Mentorship", "Startups", "Collabs"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/15 bg-[var(--panel-soft)] px-3 py-1 text-xs text-[var(--text-dim)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${siteData.email}`}
            className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--bg)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
          >
            Email me
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-full border border-white/20 bg-[var(--panel-soft)] px-5 py-3 text-sm text-[var(--text-muted)] transition hover:border-white/40 hover:text-[var(--text-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            {copied ? "Copied email" : "Copy email"}
          </button>
          <a
            href={siteData.linkedin}
            className="rounded-full border border-white/20 px-5 py-3 text-sm text-[var(--text-muted)] transition hover:border-[#0a66c2]/60 hover:text-[#8ec1ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a66c2]"
          >
            LinkedIn
          </a>
          <a
            href={siteData.github}
            className="rounded-full border border-white/20 px-5 py-3 text-sm text-[var(--text-muted)] transition hover:border-white/40 hover:text-[var(--text-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
