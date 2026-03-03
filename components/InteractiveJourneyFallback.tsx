type JourneyStop = {
  id: string;
  title: string;
  period: string;
  copy: string;
};

type InteractiveJourneyFallbackProps = {
  milestones: JourneyStop[];
  progress: number;
  activeIndex: number;
};

export function InteractiveJourneyFallback({
  milestones,
  progress,
  activeIndex,
}: InteractiveJourneyFallbackProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 hero-grid opacity-35" aria-hidden />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-dim)]">
              Interactive Journey
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-[var(--text-strong)] sm:text-4xl">
              Built through hard environments
            </h2>
          </div>
          <div className="rounded-xl border border-white/10 bg-[var(--panel-soft)] px-3 py-2">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-dim)]">Progress</p>
            <p className="text-sm font-semibold text-[var(--text-strong)]">
              {Math.round(progress * 100)}% - {milestones[activeIndex]?.title}
            </p>
          </div>
        </div>

        <ol className="space-y-6 border-l border-white/10 pl-6">
          {milestones.map((item, index) => (
            <li key={item.id} className="relative">
              <span
                aria-hidden
                className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border ${
                  index <= activeIndex
                    ? "border-[var(--accent)] bg-[var(--accent)]"
                    : "border-white/20 bg-[var(--panel)]"
                }`}
              />
              <article className="rounded-2xl border border-white/10 bg-[var(--panel-soft)] p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-dim)]">
                  {item.period}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-[var(--text-strong)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{item.copy}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
