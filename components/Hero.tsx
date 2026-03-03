import { siteData } from "@/content/siteData";

const stats = ["Research + Systems", "ML + Infra", "Ship fast"];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-white/10"
    >
      <div className="absolute inset-0 hero-grid opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-20 sm:px-6 sm:pb-24 sm:pt-24 lg:px-8 lg:pb-28 lg:pt-32">
        <p className="mb-6 text-sm uppercase tracking-[0.24em] text-[var(--text-muted)]">
          {siteData.location}
        </p>
        <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-tight text-[var(--text-strong)] sm:text-5xl lg:text-6xl">
          Products earn trust when every layer is intentional.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">
          {siteData.tagline}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#journey"
            className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--bg)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
          >
            See Journey
          </a>
          <a
            href="#projects"
            className="rounded-full border border-white/20 bg-[var(--panel-soft)] px-5 py-3 text-sm font-semibold text-[var(--text-strong)] transition hover:border-white/40 hover:bg-[var(--panel)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
          >
            View Projects
          </a>
        </div>
        <dl className="mt-12 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-[var(--panel-soft)] px-4 py-4"
            >
              <dt className="text-xs uppercase tracking-[0.18em] text-[var(--text-dim)]">
                Focus
              </dt>
              <dd className="mt-1 text-sm font-medium text-[var(--text-strong)]">
                {item}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
