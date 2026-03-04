"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type JourneyStop = {
  id: string;
  title: string;
  period: string;
  copy: string;
  detail: string;
  imageHint: string;
};

type InteractiveJourney3DProps = {
  milestones: JourneyStop[];
  progress: number;
  activeIndex: number;
};

function CameraRig({ progress }: { progress: number }) {
  const target = new THREE.Vector3();
  const lookAt = new THREE.Vector3();
  const smoothedProgress = useRef(progress);
  const smoothedYaw = useRef(0);
  const smoothedPitch = useRef(0);

  useFrame(({ camera }, delta) => {
    smoothedProgress.current = THREE.MathUtils.damp(smoothedProgress.current, progress, 6, delta);
    const clamped = THREE.MathUtils.clamp(smoothedProgress.current, 0, 1);
    const targetZ = 10 - clamped * 150;
    const targetX = Math.sin(clamped * Math.PI * 0.85) * 0.38;
    const targetY = 2.45 + Math.sin(clamped * Math.PI) * 0.04;

    target.set(targetX, targetY, targetZ);
    lookAt.set(targetX * 0.18, 1.2, targetZ - 16);

    camera.position.x = THREE.MathUtils.damp(camera.position.x, target.x, 6, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, target.y, 6, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, target.z, 6, delta);
    camera.lookAt(lookAt.x, lookAt.y, lookAt.z);

    // Clamp and smooth camera rotation to prevent fast reverse-scroll spin.
    const maxYaw = 0.14;
    const maxPitch = 0.08;
    const clampedYaw = THREE.MathUtils.clamp(camera.rotation.y, -maxYaw, maxYaw);
    const clampedPitch = THREE.MathUtils.clamp(camera.rotation.x, -maxPitch, maxPitch);
    smoothedYaw.current = THREE.MathUtils.damp(smoothedYaw.current, clampedYaw, 8, delta);
    smoothedPitch.current = THREE.MathUtils.damp(smoothedPitch.current, clampedPitch, 8, delta);
    camera.rotation.y = smoothedYaw.current;
    camera.rotation.x = smoothedPitch.current;
    camera.rotation.z = 0;
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
          <Float key={item.id} speed={1.05} floatIntensity={0.12} rotationIntensity={0}>
            <group position={[x, 0.6, z]}>
              <mesh position={[0, 2.22, 0]}>
                <boxGeometry args={[2.6, 2.65, 0.22]} />
                <meshStandardMaterial
                  color={isActive ? "#2d4138" : "#202625"}
                  roughness={0.7}
                  metalness={0.12}
                />
              </mesh>
              <Html transform position={[0, 2.22, 0.16]} distanceFactor={14}>
                <div
                  className={`w-64 rounded-xl border px-3 py-4 shadow-xl backdrop-blur ${
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
                  <div className="mt-2 rounded border border-white/12 bg-[linear-gradient(135deg,rgba(61,75,70,0.42),rgba(24,30,29,0.72))] p-2">
                    <div className="flex h-32 items-center justify-center rounded border border-dashed border-white/20 bg-black/20 px-2 text-center text-[10px] text-[var(--text-dim)]">
                      {item.imageHint}
                    </div>
                  </div>
                  <p className="mt-2 text-[10px] leading-relaxed text-[var(--text-muted)]">
                    {item.detail}
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

function EndMountains() {
  return (
    <group position={[0, 0.05, -162]}>
      <mesh position={[-2.8, 1.2, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[4.2, 5.2, 4]} />
        <meshStandardMaterial color="#233a2f" roughness={0.95} metalness={0.03} />
      </mesh>
      <mesh position={[2.2, 1.7, -2]}>
        <coneGeometry args={[5.8, 7.2, 4]} />
        <meshStandardMaterial color="#2b4638" roughness={0.92} metalness={0.04} />
      </mesh>
      <mesh position={[6.4, 1.1, 0.8]}>
        <coneGeometry args={[3.6, 4.8, 4]} />
        <meshStandardMaterial color="#1f342a" roughness={0.95} metalness={0.03} />
      </mesh>
      <pointLight position={[2.4, 6.4, 2]} intensity={0.5} color="#8ec8a8" distance={28} />
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
        <EndMountains />
        <CameraRig progress={progress} />
      </Canvas>
    </div>
  );
}
