"use client";

import { useEffect, useRef, useState } from "react";

const TYPE_SPEED = 72; // ms per character

type Props = { command: string };

export function TerminalTypewriter({ command }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  // Kick off typing the first time the element enters the viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Type one character at a time, stop when done
  useEffect(() => {
    if (!started || displayed.length >= command.length) return;
    const t = setTimeout(
      () => setDisplayed(command.slice(0, displayed.length + 1)),
      TYPE_SPEED,
    );
    return () => clearTimeout(t);
  }, [started, displayed, command]);

  return (
    <p ref={ref} className="font-mono text-sm tracking-[0.08em] text-[#ff5f56]">
      <span aria-hidden>$ </span>
      <span>{displayed}</span>
      <span className="command-cursor" aria-hidden>_</span>
    </p>
  );
}
