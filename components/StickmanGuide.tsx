"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type WalkerPose = {
  x: number;
  y: number;
  ballX: number;
  ballY: number;
  ballAngle: number;
  mode: "hero" | "hidden";
};

const BALL_SVG_HALF = 13;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function Stickman({ mode }: { mode: WalkerPose["mode"] }) {
  return (
    <svg
      viewBox="0 0 44 74"
      className={`h-16 w-10 ${
        mode === "hidden" ? "opacity-0" : "opacity-100"
      } transition-opacity duration-300`}
      aria-hidden
    >
      <g className="stickman-body" strokeLinecap="round" stroke="var(--accent)" fill="none">
        <circle cx="22" cy="10.5" r="7.5" strokeWidth="2.4" />
        <line x1="22" y1="18.5" x2="22" y2="38" strokeWidth="2.6" />
        <line className="stickman-arm-left" x1="22" y1="24" x2="11" y2="32" strokeWidth="2.3" />
        <line className="stickman-arm-right" x1="22" y1="24" x2="33" y2="32" strokeWidth="2.3" />
        <line className="stickman-leg-left" x1="22" y1="38" x2="13.5" y2="57" strokeWidth="2.4" />
        <line className="stickman-leg-right" x1="22" y1="38" x2="30.5" y2="57" strokeWidth="2.4" />
      </g>
    </svg>
  );
}

function SoccerBall({ visible }: { visible: boolean }) {
  return (
    <svg
      viewBox="0 0 26 26"
      className={`h-6 w-6 ${
        visible ? "opacity-100 soccer-ball-spin" : "opacity-0"
      } transition-opacity duration-300`}
      aria-hidden
    >
      <circle cx="13" cy="13" r="11.5" fill="#eef3f1" stroke="#0f1212" strokeWidth="1.2" />
      <polygon points="13,8.1 16.4,10.2 15.2,14 10.8,14 9.6,10.2" fill="#11181a" />
      <path
        d="M5.4 11.3L8.6 10.5M17.4 10.5l3.2.8M8.8 17.1l-2.6 2M17.2 17.1l2.6 2"
        stroke="#11181a"
        strokeWidth="1"
      />
    </svg>
  );
}

export function StickmanGuide() {
  const reduceMotion = useReducedMotion();
  const [pose, setPose] = useState<WalkerPose>({
    x: -100,
    y: -100,
    ballX: -100,
    ballY: -100,
    ballAngle: 0,
    mode: "hidden",
  });

  useEffect(() => {
    if (reduceMotion) return;

    let rafId = 0;
    let lastTime = performance.now();

    let stickX = -100;
    let stickY = -100;
    let ballX = -100;
    let ballY = -100;
    let ballVx = 0;
    let ballVy = 0;
    let ballAngle = 0;
    let facing = 1;
    let kickCooldown = 0;

    const BALL_RADIUS = 11;
    const STICKMAN_FOOT_OFFSET = 24;
    const STICKMAN_FOOT_Y = 49;

    const update = (time: number) => {
      const hero = document.getElementById("top");
      const journey = document.getElementById("journey");
      if (!hero || !journey) {
        setPose((prev) =>
          prev.mode === "hidden"
            ? prev
            : { ...prev, mode: "hidden", x: -100, y: -100, ballX: -100, ballY: -100 },
        );
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

      const leftBoundary = 10 + BALL_RADIUS;
      const rightBoundary = viewportWidth - 10 - BALL_RADIUS;
      const topBoundary = navBottom + BALL_RADIUS + 8;
      const groundY = clamp(dividerY - 8, topBoundary + 32, viewportHeight - 12);

      if (scrollY < heroEnd) {
        // Initialize when entering hero.
        if (stickX < 0 || ballX < 0) {
          stickX = clamp(viewportWidth * 0.22, 80, viewportWidth - 140);
          stickY = groundY - STICKMAN_FOOT_Y;
          ballX = stickX + 28;
          ballY = groundY - BALL_RADIUS;
          ballVx = 0;
          ballVy = 0;
          ballAngle = 0;
          kickCooldown = 0;
        }

        // Physics integration for soccer ball.
        ballVy += 980 * dt; // gravity
        ballX += ballVx * dt;
        ballY += ballVy * dt;
        ballVx *= 1 - 0.22 * dt; // horizontal drag
        ballVy *= 1 - 0.03 * dt; // light vertical damping
        ballAngle += (ballVx * dt * 0.15);

        // Wall boundaries (left/right).
        if (ballX < leftBoundary) {
          ballX = leftBoundary;
          ballVx = Math.abs(ballVx) * 0.72;
        } else if (ballX > rightBoundary) {
          ballX = rightBoundary;
          ballVx = -Math.abs(ballVx) * 0.72;
        }

        // Top boundary (navbar bottom acts as ceiling).
        if (ballY < topBoundary) {
          ballY = topBoundary;
          ballVy = Math.abs(ballVy) * 0.58;
        }

        // Ground boundary (hero/journey separator).
        const groundBallY = groundY - BALL_RADIUS;
        if (ballY > groundBallY) {
          ballY = groundBallY;
          if (Math.abs(ballVy) > 28) {
            ballVy = -Math.abs(ballVy) * 0.56;
          } else {
            ballVy = 0;
          }
          ballVx *= 0.9;
          if (Math.abs(ballVx) < 2) ballVx = 0;
        }

        // Stickman follows the ball while staying grounded.
        const targetX = clamp(ballX - 26, 32, viewportWidth - 72);
        const dx = targetX - stickX;
        const chaseSpeed = 160 + Math.min(Math.abs(ballVx) * 0.22, 90);
        const maxStep = chaseSpeed * dt;
        const step = clamp(dx, -maxStep, maxStep);
        stickX += step;
        stickY = groundY - STICKMAN_FOOT_Y;
        if (Math.abs(dx) > 1) facing = dx > 0 ? 1 : -1;

        // Kick only when close and ball is reachable near the ground.
        kickCooldown = Math.max(kickCooldown - dt, 0);
        const footX = stickX + STICKMAN_FOOT_OFFSET * facing;
        const closeToBall = Math.abs(footX - ballX) < 14;
        const kickHeight = Math.abs(ballY - groundBallY) < 9;
        if (kickCooldown <= 0 && closeToBall && kickHeight) {
          const kickDir = Math.sign(ballX - footX) || facing;
          const impulseX = kickDir * 280;
          const impulseY = -(300 + Math.abs(dx) * 0.6);
          ballVx += impulseX;
          ballVy += impulseY;
          facing = kickDir;
          kickCooldown = 0.42;
        }

        setPose({
          x: stickX,
          y: stickY,
          ballX,
          ballY,
          ballAngle,
          mode: "hero",
        });
      } else {
        setPose((prev) =>
          prev.mode === "hidden"
            ? prev
            : {
                ...prev,
                mode: "hidden",
                x: -100,
                y: -100,
                ballX: -100,
                ballY: -100,
              },
        );
        stickX = -100;
        stickY = -100;
        ballX = -100;
        ballY = -100;
        ballVx = 0;
        ballVy = 0;
        ballAngle = 0;
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
        <Stickman mode={pose.mode} />
      </div>

      <div
        className="absolute will-change-transform"
        style={{
          transform: `translate3d(${pose.ballX - BALL_SVG_HALF}px, ${pose.ballY - BALL_SVG_HALF}px, 0) rotate(${pose.ballAngle}rad)`,
        }}
      >
        <SoccerBall visible={pose.mode === "hero"} />
      </div>
    </div>
  );
}
