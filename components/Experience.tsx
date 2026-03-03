import { siteData } from "@/content/siteData";

export function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto w-full max-w-6xl border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8"
    >
      <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-dim)]">Experience</p>
      <h2 className="mt-2 text-3xl font-semibold text-[var(--text-strong)] sm:text-4xl">
        Built in fast-moving environments
      </h2>

      <ol className="mt-10 space-y-8 border-l border-white/10 pl-6">
        {siteData.experience.map((item) => (
          <li key={`${item.org}-${item.role}`} className="relative">
            <span
              aria-hidden
              className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border border-[var(--accent)]/70 bg-[var(--panel)]"
            />
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-lg font-semibold text-[var(--text-strong)]">
                {item.role} - {item.org}
              </h3>
              <p className="text-sm text-[var(--text-dim)]">{item.period}</p>
            </div>
            <ul className="mt-3 space-y-2">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="text-sm leading-relaxed text-[var(--text-muted)]">
                  - {bullet}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
