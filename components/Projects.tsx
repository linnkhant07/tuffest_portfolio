"use client";

import { useEffect, useRef, useState } from "react";
import { siteData } from "@/content/siteData";

export function Projects() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const updateActiveIndex = () => {
      const cards = Array.from(scroller.querySelectorAll<HTMLElement>("[data-project-card]"));
      if (!cards.length) return;

      const scrollerRect = scroller.getBoundingClientRect();
      const scrollerCenter = scrollerRect.left + scrollerRect.width / 2;
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(cardCenter - scrollerCenter);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      setActiveIndex(nearestIndex);
    };

    const centerInitialCard = () => {
      const cards = Array.from(scroller.querySelectorAll<HTMLElement>("[data-project-card]"));
      if (!cards.length) return;
      const centerIndex = Math.floor(cards.length / 2);
      cards[centerIndex]?.scrollIntoView({ behavior: "auto", inline: "center", block: "nearest" });
    };

    centerInitialCard();
    updateActiveIndex();
    scroller.addEventListener("scroll", updateActiveIndex, { passive: true });
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      scroller.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, []);

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
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-5 bg-gradient-to-r from-[var(--bg)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-5 bg-gradient-to-l from-[var(--bg)] to-transparent" />

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-4 pt-2 [perspective:1400px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {siteData.projects.map((project, index) => (
          <article
            key={project.slug}
            data-project-card
            className={`group w-[88%] min-w-[88%] snap-center rounded-2xl border border-white/10 bg-[var(--panel-soft)] p-6 transition duration-300 transform-gpu md:w-[46%] md:min-w-[46%] lg:w-[29%] lg:min-w-[29%] ${
              index === activeIndex
                ? "scale-[1.02] opacity-100 border-[var(--accent)]/35 shadow-[0_20px_48px_rgba(0,0,0,0.45)]"
                : Math.abs(index - activeIndex) === 1
                  ? "scale-[1] opacity-94 shadow-none"
                  : "scale-[0.94] opacity-68 blur-[0.3px] shadow-none"
            } hover:-translate-y-0.5 hover:border-[var(--accent)]/40 hover:opacity-100 hover:blur-0`}
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
      </div>
    </section>
  );
}
