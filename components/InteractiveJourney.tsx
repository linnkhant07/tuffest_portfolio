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
};

const milestones: JourneyStop[] = [
  {
    id: "pcc",
    title: "PCC",
    period: "Foundation",
    copy: "Built the discipline: problem decomposition, coding fundamentals, and shipping under constraints.",
  },
  {
    id: "ucla",
    title: "UCLA",
    period: "Systems + Research",
    copy: "Leveled up in algorithms, product thinking, and collaboration across technical and non-technical teams.",
  },
  {
    id: "jpl-veritas",
    title: "JPL / VERITAS",
    period: "Mission-Scale Engineering",
    copy: "Applied rigorous engineering in a high-stakes environment where precision, reliability, and documentation matter.",
  },
  {
    id: "linkedin-intern",
    title: "LinkedIn Internship (Incoming)",
    period: "Next Chapter",
    copy: "Preparing to operate at internet scale, learn fast, and contribute to product impact from day one.",
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
    const clamped = Math.min(Math.max(latest, 0), 1);
    setProgress(clamped);
    const index = Math.round(clamped * (milestones.length - 1));
    setActiveIndex(index);
  });

  const useFallback = reduceMotion || isMobile || webglAvailable === false;
  const enable3D = nearViewport && webglAvailable === true && !reduceMotion && !isMobile;

  return (
    <section
      id="journey"
      ref={sectionRef}
      className={`relative border-y border-white/10 ${useFallback ? "" : "h-[320vh]"}`}
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
