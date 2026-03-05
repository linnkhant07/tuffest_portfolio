type JourneyStop = {
  id: string;
  title: string;
  period: string;
  line1: string;
  line2: string;
  line3: string;
  image?: string;
  imagePosition?: "top" | "center" | "bottom";
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
              <article className="rounded-2xl border border-white/10 bg-[var(--panel-soft)] p-6 sm:p-7">
                <h3 className="text-xl font-semibold text-[var(--text-strong)]">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--text-dim)]">
                  {item.period}
                </p>
                <div className="relative mt-4 h-60 w-full overflow-hidden rounded-lg border border-white/10 bg-black/20">
                  {item.image ? (
                    <>
                      <img
                        src={item.image}
                        alt=""
                        className={`h-full w-full object-cover ${
                          item.imagePosition === "top"
                            ? "object-[50%_35%]"
                            : item.imagePosition === "bottom"
                              ? "object-bottom"
                              : "object-center"
                        }`}
                      />
                      <div
                        className="pointer-events-none absolute inset-0 rounded-lg border-none bg-[rgba(13,28,22,0.52)] mix-blend-multiply"
                        aria-hidden
                      />
                    </>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-[var(--text-dim)]">
                      Image
                    </div>
                  )}
                </div>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  {[item.line1, item.line2, item.line3].filter(Boolean).join(" ")}
                </p>
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-8 rounded-2xl border border-white/10 bg-[var(--panel-soft)] p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-dim)]">Destination</p>
          <div className="mt-3 flex h-24 items-end justify-center gap-3 rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(61,75,70,0.34),rgba(19,23,23,0.8))] px-4 pb-2">
            <div className="h-10 w-10 rotate-45 rounded-sm border border-white/15 bg-white/10" />
            <div className="h-14 w-14 rotate-45 rounded-sm border border-white/20 bg-white/12" />
            <div className="h-8 w-8 rotate-45 rounded-sm border border-white/15 bg-white/10" />
          </div>
          <p className="mt-3 text-xs text-[var(--text-dim)]">Mountain destination placeholder</p>
        </div>
      </div>
    </div>
  );
}
