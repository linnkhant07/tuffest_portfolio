"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { InteractiveJourneyFallback } from "@/components/InteractiveJourneyFallback";

type JourneyStop = {
  id: string;
  title: string;
  period: string;
  copy: string;
  detail: string;
  imageHint: string;
};

const milestones: JourneyStop[] = [
  {
    id: "pcc-foundation",
    title: "PCC – New Country, New Start",
    period: "Foundation",
    copy: "Landed at Pasadena City College with a chip on my shoulder and something to prove.",
    detail:
      "Figured out college, work, and immigration all at once. Built core CS fundamentals and the study discipline that still carries everything else.",
    imageHint: "PCC campus at dusk, notebook open next to a cheap laptop",
  },
  {
    id: "caltech-research",
    title: "Caltech Research",
    period: "Touching the Frontier",
    copy: "Stepped into Caltech labs to work on real research, not just problem sets.",
    detail:
      "Learned how to read papers, design experiments, and ship code that scientists can trust. Got comfortable being the least experienced person in the room and catching up fast.",
    imageHint: "Terminal window next to messy whiteboard equations",
  },
  {
    id: "jpl-intern",
    title: "NASA JPL – Engineering",
    period: "Mission-Scale Work",
    copy: "Joined JPL to build tools that support actual space missions, not class projects.",
    detail:
      "Shipped data pipelines and internal tools used by mission teams. Wrote code that had to be correct, documented, and reproducible — not just clever.",
    imageHint: "Earth and Venus side‑by‑side on mission dashboards",
  },
  {
    id: "jpl-striker",
    title: "JPL Striker",
    period: "Pressure + Play",
    copy: "Led the line as striker for JPL’s soccer team — same competitive edge, different field.",
    detail:
      "Learned how much engineering feels like sport: communication, positioning, and knowing when to take the risky shot instead of passing responsibility away.",
    imageHint: "Floodlit field, boots and ball next to a JPL badge",
  },
  {
    id: "ucla",
    title: "UCLA",
    period: "Systems & Scale",
    copy: "Leveled up in systems, algorithms, and shipping work that has to handle real load.",
    detail:
      "Balanced heavy theory with projects, clubs, and mentoring. Learned to move from \"I can code this\" to \"I can design, communicate, and own this end‑to‑end.\"",
    imageHint: "UCLA campus evening skyline with terminal open on a laptop",
  },
  {
    id: "linkedin-intern",
    title: "LinkedIn (Incoming)",
    period: "Next Chapter",
    copy: "Now aiming at internet scale — bringing the same scrappy PCC energy into LinkedIn.",
    detail:
      "Focused on landing quickly, learning the stack, and shipping changes that actually move product metrics, not just look good on a résumé.",
    imageHint: "LinkedIn feed UI with devtools open and breakpoints set",
  },
];

const InteractiveJourney3D = dynamic(
  () => import("@/components/InteractiveJourney3D").then((mod) => mod.InteractiveJourney3D),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,rgba(22,27,26,0.85),rgba(34,44,40,0.75),rgba(22,27,26,0.85))]" />
    ),
  },
);

function canUseWebGL() {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => undefined;
      const media = window.matchMedia(query);
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    () => (typeof window !== "undefined" ? window.matchMedia(query).matches : serverValue),
    () => serverValue,
  );
}

export function InteractiveJourney() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 1023px)", true);
  const [nearViewport, setNearViewport] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => {
      setWebglAvailable(canUseWebGL());
    });
    return () => window.cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Scale progress so the journey \"finishes\" slightly before the end of the section
    // (e.g. latest = 0.8 maps to clamped = 1).
    const scaled = latest * 1.25;
    const clamped = Math.min(Math.max(scaled, 0), 1);
    setProgress(clamped);
    const index = Math.round(clamped * (milestones.length - 1));
    setActiveIndex(index);
  });

  const useFallback = reduceMotion || isMobile || webglAvailable !== true;
  const enable3D = nearViewport && webglAvailable === true && !reduceMotion && !isMobile;

  return (
    <section
      id="journey"
      ref={sectionRef}
      className={`relative border-y border-white/10 ${useFallback ? "" : "h-[600vh]"}`}
    >
      {useFallback ? (
        <InteractiveJourneyFallback
          milestones={milestones}
          progress={progress}
          activeIndex={activeIndex}
        />
      ) : (
        <>
          <div className="absolute inset-0 hero-grid opacity-30" aria-hidden />

          <div className="sticky top-0 h-screen overflow-hidden">
            {nearViewport && enable3D ? (
              <InteractiveJourney3D
                milestones={milestones}
                progress={progress}
                activeIndex={activeIndex}
              />
            ) : (
              <div className="absolute inset-0 bg-[var(--panel-soft)]" />
            )}

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,18,18,0.6)_0%,transparent_24%,transparent_72%,rgba(15,18,18,0.7)_100%)]" />

            <div className="absolute left-4 top-4 z-20 rounded-xl border border-white/10 bg-[rgba(17,22,21,0.72)] px-4 py-3 backdrop-blur-md sm:left-6 sm:top-6">
              <p className="text-xs uppercase tracking-[0.13em] text-[var(--text-dim)]">Journey</p>
              <p className="text-sm font-semibold text-[var(--text-strong)]">
                {milestones[activeIndex]?.title}
              </p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                {Math.round(progress * 100)}%
              </p>
            </div>

            <div className="absolute inset-x-4 bottom-6 z-20 sm:inset-x-6 lg:inset-x-8">
              <div className="rounded-xl border border-white/10 bg-[rgba(17,22,21,0.72)] p-3 backdrop-blur-md">
                <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    style={{ scaleX: scrollYProgress, transformOrigin: "left center" }}
                    className="h-full rounded-full bg-[var(--accent)]"
                  />
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                  {milestones.map((item, index) => (
                    <span
                      key={item.id}
                      className={
                        index === activeIndex
                          ? "font-semibold text-[var(--accent)]"
                          : "text-[var(--text-dim)]"
                      }
                    >
                      {item.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
