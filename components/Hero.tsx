import { siteData } from "@/content/siteData";

const timeline = [
  { label: "Prev", value: "NASA JPL" },
  { label: "Current", value: "UCLA" },
  { label: "Next", value: "Intern @ LinkedIn (Summer)" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-white/10"
    >
      <div className="absolute inset-0 hero-grid opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 pb-32 pt-32 sm:px-6 sm:pb-36 sm:pt-36 lg:px-8 lg:pb-48 lg:pt-52">
        <p className="mb-6 text-sm uppercase tracking-[0.24em] text-[var(--text-muted)]">
          {siteData.location}
        </p>
        <p className="font-mono text-base text-[#ff5f56] sm:text-lg">
          <span className="hero-command-text">$whoami</span>
          <span className="hero-command-cursor" aria-hidden>
            _
          </span>
        </p>
        <h1 className="hero-name-reveal mt-4 max-w-4xl text-balance text-4xl font-semibold leading-tight text-[var(--text-strong)] sm:text-5xl lg:text-6xl">
          {siteData.name}
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
          {timeline.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-[var(--panel-soft)] px-4 py-4"
            >
              <dt className="text-xs uppercase tracking-[0.16em] text-[var(--text-dim)]">
                {item.label}
              </dt>
              <dd className="mt-1 text-sm font-medium text-[var(--text-strong)]">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
