"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/content/siteData";
import { TerminalTypewriter } from "@/components/TerminalTypewriter";

const ABOUT_IMAGES = [
  "/images/aboutme1.jpeg",
  "/images/aboutme2.jpeg",
  "/images/aboutme3.jpeg",
  "/images/aboutme4.jpeg",
  "/images/aboutme5.jpeg",
  "/images/aboutme6.jpeg",
  "/images/aboutme7.jpeg",
  "/images/aboutme8.jpeg",
  "/images/aboutme9.jpeg",
];

const IMAGE_SIZE = 260;

// Varying translations and rotations for jumbled photos behind (tx, ty in px, rotation in deg)
const JUMBLE_OFFSETS: [number, number, number][] = [
  [-36, 24, -8],
  [32, -28, 6],
  [-24, -34, -12],
  [34, 18, 5],
  [-30, 30, 4],
  [28, 22, -10],
  [-20, -20, 7],
  [38, -16, -5],
];

export function About() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % ABOUT_IMAGES.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + ABOUT_IMAGES.length) % ABOUT_IMAGES.length);
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const el = document.getElementById("about-image-stack");
      if (!el || !el.contains(e.target as Node)) return;
      e.preventDefault();
      if (e.deltaY > 0) goNext();
      else if (e.deltaY < 0) goPrev();
    };
    document.addEventListener("wheel", onWheel, { passive: false });
    return () => document.removeEventListener("wheel", onWheel);
  }, [goNext, goPrev]);

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
          {siteData.aboutParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-base leading-relaxed text-[var(--text-muted)]"
            >
              {index === 2 ? (
                <>
                  <span className="line-through">When I am out of LLM tokens</span>{" "}
                  I mean when I'm not coding, I love to play soccer, running, and
                  hiking.
                </>
              ) : (
                paragraph
              )}
            </p>
          ))}
          <a
            href={siteData.linkedin}
            className="inline-flex rounded-full border border-white/20 bg-[var(--panel-soft)] px-4 py-2 text-sm text-[var(--text-muted)] transition hover:border-[var(--accent)]/50 hover:text-[var(--text-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            View LinkedIn
          </a>
        </div>

        <div
          id="about-image-stack"
          className="group relative flex min-h-[320px] w-full items-center justify-center overflow-visible rounded-2xl bg-transparent"
        >
          {/* Jumble layer: other images with varying translations and rotations behind */}
          <div className="absolute inset-0 flex items-center justify-center">
            {ABOUT_IMAGES.filter((_, i) => i !== activeIndex).map((src, j) => {
              const [tx, ty, rot] = JUMBLE_OFFSETS[j % JUMBLE_OFFSETS.length];
              return (
                <div
                  key={`jumble-${src}-${j}`}
                  className="absolute transition-transform duration-300 ease-out"
                  style={{
                    zIndex: 1,
                    transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg)`,
                    opacity: 0.5,
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    className="object-cover"
                    style={{
                      width: IMAGE_SIZE,
                      height: IMAGE_SIZE,
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Front image: current (same size, square) */}
          <div className="relative z-10 flex items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
                className="overflow-hidden"
              >
                <img
                  src={ABOUT_IMAGES[activeIndex]}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrows (visible on hover) */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-[var(--panel-soft)]/95 p-2.5 text-[var(--text-muted)] opacity-0 shadow-lg transition-opacity duration-200 hover:border-[var(--accent)]/50 hover:text-[var(--accent)] group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-[var(--panel-soft)]/95 p-2.5 text-[var(--text-muted)] opacity-0 shadow-lg transition-opacity duration-200 hover:border-[var(--accent)]/50 hover:text-[var(--accent)] group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5">
            {ABOUT_IMAGES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === activeIndex ? "bg-[var(--accent)]" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
