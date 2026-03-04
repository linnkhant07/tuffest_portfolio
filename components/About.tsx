import { siteData } from "@/content/siteData";
import { TerminalTypewriter } from "@/components/TerminalTypewriter";

export function About() {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-6xl border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8"
    >
      <TerminalTypewriter command="cat aboutme.txt" />
      <h2 className="mt-2 text-3xl font-semibold text-[var(--text-strong)] sm:text-4xl">
        Who is Linn?
      </h2>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          {siteData.aboutParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-[var(--text-muted)]">
              {paragraph}
            </p>
          ))}
          <a
            href={siteData.linkedin}
            className="inline-flex rounded-full border border-white/20 bg-[var(--panel-soft)] px-4 py-2 text-sm text-[var(--text-muted)] transition hover:border-[var(--accent)]/50 hover:text-[var(--text-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            View LinkedIn
          </a>
        </div>

        <div className="space-y-5 rounded-2xl border border-white/10 bg-[var(--panel-soft)] p-6">
          {siteData.skills.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--text-dim)]">
                {group.category}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/15 px-3 py-1 text-xs text-[var(--text-muted)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
