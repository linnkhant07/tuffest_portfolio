"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type WalkerPose = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  targetTilt: number;
  targetBob: number;
  shoutText: string;
  shoutOpacity: number;
  facing: 1 | -1;
  mode: "hero" | "hidden";
};

const TARGET_HALF_W = 78;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function Stickman({ mode, facing }: { mode: WalkerPose["mode"]; facing: 1 | -1 }) {
  return (
    <svg
      viewBox="0 0 44 74"
      className={`h-16 w-10 ${
        mode === "hidden" ? "opacity-0" : "opacity-100"
      } transition-opacity duration-300`}
      style={{ transform: `scaleX(${facing})` }}
      aria-hidden
    >
      <g className="stickman-body" strokeLinecap="round" stroke="var(--accent)" fill="none">
        <circle cx="22" cy="10.5" r="7.5" strokeWidth="2.4" />
        <line x1="22" y1="18.5" x2="22" y2="38" strokeWidth="2.6" />
        <line className="stickman-arm-left" x1="22" y1="24" x2="33" y2="22.5" strokeWidth="2.3" />
        <line className="stickman-arm-right" x1="22" y1="24" x2="38.5" y2="21" strokeWidth="2.3" />
        <line className="stickman-leg-left" x1="22" y1="38" x2="13.5" y2="57" strokeWidth="2.4" />
        <line className="stickman-leg-right" x1="22" y1="38" x2="30.5" y2="57" strokeWidth="2.4" />
      </g>
    </svg>
  );
}

function InternshipTarget({
  visible,
  tilt,
  bob,
}: {
  visible: boolean;
  tilt: number;
  bob: number;
}) {
  return (
    <p
      className={`px-1 text-sm font-semibold tracking-wide text-[var(--accent-strong)] [text-shadow:0_0_10px_rgba(130,214,159,0.78),0_0_26px_rgba(109,184,137,0.82),0_0_44px_rgba(109,184,137,0.62)] ${
        visible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-200`}
      style={{
        transform: `translateY(${bob}px) rotate(${tilt}deg)`,
        filter: "drop-shadow(0 0 24px rgba(109,184,137,0.68)) drop-shadow(0 0 42px rgba(109,184,137,0.42))",
      }}
      aria-hidden
    >
      &quot;Fall 2026 Internship&quot;
    </p>
  );
}

export function StickmanGuide() {
  const reduceMotion = useReducedMotion();
  const [pose, setPose] = useState<WalkerPose>({
    x: -100,
    y: -100,
    targetX: -100,
    targetY: -100,
    targetTilt: 0,
    targetBob: 0,
    shoutText: "",
    shoutOpacity: 0,
    facing: 1,
    mode: "hidden",
  });

  useEffect(() => {
    if (reduceMotion) return;

    let rafId = 0;
    let lastTime = performance.now();

    let stickX = -100;
    let stickY = -100;
    let targetX = -100;
    let targetY = -100;
    let targetTilt = 0;
    let targetBob = 0;
    let shoutText = "";
    let shoutTimer = 0;
    let shoutCooldown = 0;
    let facing = 1;
    const STICKMAN_FOOT_Y = 49;
    const SAFE_GAP = 300;
    const REACH_THRESHOLD = 128;

    const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

    const pickSafeTarget = (
      viewportWidth: number,
      groundY: number,
      topBoundary: number,
      fromStickX: number,
      fromTargetX: number,
    ) => {
      const minX = 24 + TARGET_HALF_W;
      const maxX = viewportWidth - 24 - TARGET_HALF_W;
      const groundedY = clamp(groundY - 44, topBoundary + 18, groundY - 44);

      for (let i = 0; i < 28; i += 1) {
        const x = randomBetween(minX, maxX);
        const farFromStick = Math.abs(x - fromStickX) >= SAFE_GAP;
        const farFromPrev = Math.abs(x - fromTargetX) >= 120;
        if (farFromStick && farFromPrev) return { x, y: groundedY };
      }

      const fallbackX =
        fromStickX < viewportWidth * 0.5
          ? maxX - randomBetween(12, 56)
          : minX + randomBetween(12, 56);
      return { x: fallbackX, y: groundedY };
    };

    const update = (time: number) => {
      const hero = document.getElementById("top");
      const journey = document.getElementById("journey");
      if (!hero || !journey) {
        setPose({
          x: -100,
          y: -100,
          targetX: -100,
          targetY: -100,
          targetTilt: 0,
          targetBob: 0,
          shoutText: "",
          shoutOpacity: 0,
          facing: 1,
          mode: "hidden",
        });
        rafId = window.requestAnimationFrame(update);
        return;
      }

      const dt = Math.min((time - lastTime) / 1000, 0.033);
      lastTime = time;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const dividerY = journey.offsetTop - scrollY;
      const heroEnd = journey.offsetTop - viewportHeight * 0.08;
      const nav = document.querySelector("header");
      const navBottom = nav ? nav.getBoundingClientRect().bottom : 64;

      const topBoundary = navBottom + 8;
      const groundY = clamp(dividerY - 8, topBoundary + 32, viewportHeight - 12);

      if (scrollY < heroEnd) {
        // Initialize when entering hero.
        if (stickX < 0 || targetX < 0) {
          stickX = clamp(viewportWidth * 0.22, 80, viewportWidth - 140);
          stickY = groundY - STICKMAN_FOOT_Y;
          const spawn = pickSafeTarget(viewportWidth, groundY, topBoundary, stickX, stickX + 200);
          targetX = spawn.x;
          targetY = spawn.y;
        }

        // Target stays grounded/catchable visually.
        const t = time * 0.001;
        targetY = clamp(groundY - 44, topBoundary + 18, groundY - 44);
        targetBob = Math.sin(t * 5.4) * 2.4 + Math.sin(t * 8.2) * 0.9;
        targetTilt = Math.sin(t * 3.8) * 4.2;

        // Stickman follows target while staying grounded.
        const runTargetX = clamp(targetX - 12 * facing, 34, viewportWidth - 76);
        const dx = runTargetX - stickX;
        const chaseSpeed = 175 + Math.min(Math.abs(dx) * 0.25, 110);
        const maxStep = chaseSpeed * dt;
        const step = clamp(dx, -maxStep, maxStep);
        stickX += step;
        stickY = groundY - STICKMAN_FOOT_Y;
        if (Math.abs(dx) > 1) facing = dx > 0 ? 1 : -1;

        // Timed microtext: encouragement while closing in.
        shoutCooldown = Math.max(shoutCooldown - dt, 0);
        shoutTimer = Math.max(shoutTimer - dt, 0);
        if (shoutTimer <= 0) {
          shoutText = "";
        }
        const closeBandStart = REACH_THRESHOLD * 1.8;
        const closeBandEnd = REACH_THRESHOLD * 1.1;
        const distance = Math.abs(stickX + 22 - targetX);
        const approaching = distance < closeBandStart && distance > closeBandEnd;
        if (approaching && shoutCooldown <= 0 && shoutText !== "yesss") {
          shoutText = "yesss";
          shoutTimer = 0.9;
          shoutCooldown = 1.05;
        }

        // Spawn randomly only when stickman is about to reach it.
        const almostCaught = distance < REACH_THRESHOLD;
        if (almostCaught) {
          const next = pickSafeTarget(viewportWidth, groundY, topBoundary, stickX, targetX);
          targetX = next.x;
          targetY = next.y;
          shoutText = "nooo";
          shoutTimer = 1.05;
          shoutCooldown = 0.95;
        }

        setPose({
          x: stickX,
          y: stickY,
          targetX,
          targetY,
          targetTilt,
          targetBob,
          shoutText,
          shoutOpacity: shoutTimer > 0 ? clamp(shoutTimer / 1.05, 0.24, 1) : 0,
          facing: facing as 1 | -1,
          mode: "hero",
        });
      } else {
        setPose({
          x: -100,
          y: -100,
          targetX: -100,
          targetY: -100,
          targetTilt: 0,
          targetBob: 0,
          shoutText: "",
          shoutOpacity: 0,
          facing: 1,
          mode: "hidden",
        });
        stickX = -100;
        stickY = -100;
        targetX = -100;
        targetY = -100;
        targetTilt = 0;
        targetBob = 0;
        shoutText = "";
        shoutTimer = 0;
        shoutCooldown = 0;
      }

      rafId = window.requestAnimationFrame(update);
    };

    rafId = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(rafId);
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 hidden md:block">
      <div
        className={`absolute will-change-transform ${pose.mode === "hero" ? "stickman-pace" : ""}`}
        style={{ transform: `translate3d(${pose.x}px, ${pose.y}px, 0)` }}
      >
        <Stickman mode={pose.mode} facing={pose.facing} />
        <p
          className="absolute -top-6 left-7 text-[12px] font-semibold tracking-wide text-[#eafff1] [text-shadow:0_0_8px_rgba(130,214,159,0.62),0_0_18px_rgba(130,214,159,0.36)] transition-opacity duration-150"
          style={{ opacity: pose.shoutOpacity }}
          aria-hidden
        >
          {pose.shoutText}
        </p>
      </div>

      <div
        className="absolute will-change-transform"
        style={{ transform: `translate3d(${pose.targetX - TARGET_HALF_W}px, ${pose.targetY}px, 0)` }}
      >
        <InternshipTarget
          visible={pose.mode === "hero"}
          tilt={pose.targetTilt}
          bob={pose.targetBob}
        />
      </div>
    </div>
  );
}
