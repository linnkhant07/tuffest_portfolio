"use client";

import { useMemo, useState } from "react";
import { siteData } from "@/content/siteData";

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = useMemo(() => {
    return showAll ? siteData.projects : siteData.projects.slice(0, 3);
  }, [showAll]);

  return (
    <section id="projects" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-dim)]">
            Projects
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-[var(--text-strong)] sm:text-4xl">
            Selected work
          </h2>
        </div>
        {siteData.projects.length > 3 ? (
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="rounded-full border border-white/20 bg-[var(--panel-soft)] px-4 py-2 text-sm text-[var(--text-muted)] transition hover:border-[var(--accent)]/60 hover:text-[var(--text-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            {showAll ? "Show less" : "View all"}
          </button>
        ) : null}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleProjects.map((project) => (
          <article
            key={project.slug}
            className="group rounded-2xl border border-white/10 bg-[var(--panel-soft)] p-6 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]/40"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-dim)]">
              {project.oneLiner}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-[var(--text-strong)]">
              {project.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
              {project.description}
            </p>
            <ul className="mt-4 space-y-2">
              {project.highlights.slice(0, 2).map((item) => (
                <li key={item} className="text-sm text-[var(--text-muted)]">
                  - {item}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-[var(--text-dim)]"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={`${project.slug}-${link.label}`}
                  href={link.href}
                  className="text-sm font-medium text-[var(--accent)] transition hover:text-[var(--accent-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
