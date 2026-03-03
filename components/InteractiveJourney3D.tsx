"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

type JourneyStop = {
  id: string;
  title: string;
  period: string;
  copy: string;
};

type InteractiveJourney3DProps = {
  milestones: JourneyStop[];
  progress: number;
  activeIndex: number;
};

function CameraRig({ progress }: { progress: number }) {
  const target = new THREE.Vector3();
  const lookAt = new THREE.Vector3();

  useFrame(({ camera }) => {
    const clamped = THREE.MathUtils.clamp(progress, 0, 1);
    const targetZ = 10 - clamped * 150;
    const targetX = Math.sin(clamped * Math.PI * 2) * 1.8;
    const targetY = 2.6 + Math.sin(clamped * Math.PI) * 0.18;

    target.set(targetX, targetY, targetZ);
    lookAt.set(targetX * 0.35, 1.15, targetZ - 12);

    camera.position.lerp(target, 0.08);
    camera.lookAt(lookAt);
  });

  return null;
}

function PathMeshes() {
  const segments = useMemo(
    () =>
      Array.from({ length: 86 }, (_, i) => {
        const z = 8 - i * 1.9;
        const x = Math.sin(i * 0.23) * 2.2;
        return { z, x, tilt: Math.sin(i * 0.18) * 0.04 };
      }),
    [],
  );

  return (
    <group>
      {segments.map((segment, index) => (
        <mesh
          key={`path-${index}`}
          position={[segment.x, -0.2, segment.z]}
          rotation={[segment.tilt, 0, 0]}
        >
          <boxGeometry args={[3.8, 0.12, 1.75]} />
          <meshStandardMaterial color="#23302b" roughness={0.92} metalness={0.04} />
        </mesh>
      ))}
    </group>
  );
}

function SignPosts({
  milestones,
  activeIndex,
}: {
  milestones: JourneyStop[];
  activeIndex: number;
}) {
  return (
    <group>
      {milestones.map((item, index) => {
        const z = -20 - index * 34;
        const x = index % 2 === 0 ? -3.9 : 3.9;
        const isActive = index <= activeIndex;

        return (
          <Float key={item.id} speed={1.2} floatIntensity={0.28} rotationIntensity={0.04}>
            <group position={[x, 0.6, z]}>
              <mesh position={[0, 0.6, 0]}>
                <boxGeometry args={[0.16, 1.4, 0.16]} />
                <meshStandardMaterial color="#6db889" roughness={0.75} metalness={0.08} />
              </mesh>
              <mesh position={[0, 1.33, 0]}>
                <boxGeometry args={[1.9, 0.72, 0.22]} />
                <meshStandardMaterial
                  color={isActive ? "#2d4138" : "#202625"}
                  roughness={0.7}
                  metalness={0.12}
                />
              </mesh>
              <Html transform position={[0, 1.33, 0.16]} distanceFactor={14}>
                <div
                  className={`min-w-44 rounded-lg border px-3 py-2 shadow-xl backdrop-blur ${
                    isActive
                      ? "border-[var(--accent)]/60 bg-[rgba(21,27,25,0.85)]"
                      : "border-white/15 bg-[rgba(18,22,22,0.8)]"
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--text-dim)]">
                    {item.period}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[var(--text-strong)]">
                    {item.title}
                  </p>
                </div>
              </Html>
            </group>
          </Float>
        );
      })}
    </group>
  );
}

export function InteractiveJourney3D({
  milestones,
  progress,
  activeIndex,
}: InteractiveJourney3DProps) {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 2.5, 10], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#0f1212"]} />
        <fog attach="fog" args={["#0f1212", 18, 175]} />
        <ambientLight intensity={0.65} />
        <directionalLight position={[5, 10, 6]} intensity={1} color="#b8ffe0" />
        <directionalLight position={[-6, 5, -6]} intensity={0.4} color="#6b8190" />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.45, -68]}>
          <planeGeometry args={[170, 260]} />
          <meshStandardMaterial color="#141919" roughness={0.98} metalness={0.02} />
        </mesh>

        <PathMeshes />
        <SignPosts milestones={milestones} activeIndex={activeIndex} />
        <CameraRig progress={progress} />
      </Canvas>
    </div>
  );
}
