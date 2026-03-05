"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html, Center, Text3D } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

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
    smoothedProgress.current = THREE.MathUtils.damp(
      smoothedProgress.current,
      progress,
      6,
      delta,
    );
    const clamped = THREE.MathUtils.clamp(smoothedProgress.current, 0, 1);
    // Let the camera travel just a bit farther down the road.
    const targetZ = 10 - clamped * 210;
    const targetX = Math.sin(clamped * Math.PI * 0.85) * 0.38;
    const targetY = 2.45 + Math.sin(clamped * Math.PI) * 0.04;

    target.set(targetX, targetY, targetZ);
    lookAt.set(targetX * 0.18, 1.2, targetZ - 16);

    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      target.x,
      6,
      delta,
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      target.y,
      6,
      delta,
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      target.z,
      6,
      delta,
    );
    camera.lookAt(lookAt.x, lookAt.y, lookAt.z);

    // Clamp and smooth camera rotation to prevent fast reverse-scroll spin.
    const maxYaw = 0.14;
    const maxPitch = 0.08;
    const clampedYaw = THREE.MathUtils.clamp(
      camera.rotation.y,
      -maxYaw,
      maxYaw,
    );
    const clampedPitch = THREE.MathUtils.clamp(
      camera.rotation.x,
      -maxPitch,
      maxPitch,
    );
    smoothedYaw.current = THREE.MathUtils.damp(
      smoothedYaw.current,
      clampedYaw,
      8,
      delta,
    );
    smoothedPitch.current = THREE.MathUtils.damp(
      smoothedPitch.current,
      clampedPitch,
      8,
      delta,
    );
    camera.rotation.y = smoothedYaw.current;
    camera.rotation.x = smoothedPitch.current;
    camera.rotation.z = 0;
  });

  return null;
}

function PathMeshes() {
  const segments = useMemo(
    () =>
      Array.from({ length: 116 }, (_, i) => {
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
          <meshStandardMaterial
            color="#23302b"
            roughness={0.92}
            metalness={0.04}
          />
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
          <Float
            key={item.id}
            speed={1.05}
            floatIntensity={0.12}
            rotationIntensity={0}
          >
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
                  <p className="text-xs font-semibold text-[var(--text-strong)]">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-[var(--text-dim)]">
                    {item.period}
                  </p>
                  <div className="relative mt-2 h-28 w-full overflow-hidden rounded border border-white/12 bg-black/20">
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
                          className="pointer-events-none absolute inset-0 rounded border-none bg-[rgba(13,28,22,0.52)] mix-blend-multiply"
                          aria-hidden
                        />
                      </>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] text-[var(--text-dim)]">
                        Image
                      </div>
                    )}
                  </div>
                  <p className="mt-2 line-clamp-2 text-[10px] leading-relaxed text-[var(--text-muted)]">
                    {[item.line1, item.line2, item.line3].filter(Boolean).join(" ")}
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

// Theatrical ground uplight — aims from floor level up at the text
// Optionally sweeps its target horizontally for a \"light show\" effect.
function GroundUplight({
  from,
  to,
  intensity,
  color,
  scanCenterX,
  scanAmplitude = 0,
  scanSpeed = 0,
  phaseOffset = 0,
}: {
  from: [number, number, number];
  to: [number, number, number];
  intensity: number;
  color: string;
  scanCenterX?: number;
  scanAmplitude?: number;
  scanSpeed?: number;
  phaseOffset?: number;
}) {
  const { scene } = useThree();
  const lightRef = useRef<THREE.SpotLight>(null!);

  useEffect(() => {
    const light = lightRef.current;
    if (!light) return;
    light.target.position.set(to[0], to[1], to[2]);
    light.target.updateMatrixWorld();
    scene.add(light.target);
    return () => {
      scene.remove(light.target);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  // Keep target synced every frame; optionally sweep horizontally
  useFrame(({ clock }) => {
    const light = lightRef.current;
    if (!light) return;

    if (scanCenterX !== undefined && scanAmplitude > 0 && scanSpeed > 0) {
      const t = clock.elapsedTime;
      const x =
        scanCenterX + Math.sin(t * scanSpeed + phaseOffset) * scanAmplitude;
      light.target.position.set(x, to[1], to[2]);
    }

    light.target.updateMatrixWorld();
  });

  return (
    <spotLight
      ref={lightRef}
      position={from}
      intensity={intensity}
      color={color}
      angle={Math.PI / 8}
      penumbra={0.4}
      distance={50}
      decay={2}
      castShadow={false}
    />
  );
}

// Physical LED-style ground fixture that visually tracks the moving spotlight target.
function GroundEmitter({
  base,
  scanCenterX,
  scanAmplitude,
  scanSpeed,
  phaseOffset = 0,
  targetY,
  targetZ,
  revealed,
}: {
  base: [number, number, number];
  scanCenterX: number;
  scanAmplitude: number;
  scanSpeed: number;
  phaseOffset?: number;
  targetY: number;
  targetZ: number;
  revealed: number;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const target = useRef(new THREE.Vector3());

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    const x =
      scanCenterX + Math.sin(t * scanSpeed + phaseOffset) * scanAmplitude;
    target.current.set(x, targetY, targetZ);
    groupRef.current.position.set(base[0], base[1], base[2]);
    groupRef.current.lookAt(target.current);
  });

  return (
    <group ref={groupRef}>
      {/* Heavy base */}
      <mesh>
        <cylinderGeometry args={[0.9, 0.9, 0.12, 28]} />
        <meshStandardMaterial color="#dadfdd" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* Vertical stem */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.9, 16]} />
        <meshStandardMaterial
          color="#f3f5f4"
          metalness={0.6}
          roughness={0.35}
        />
      </mesh>

      {/* Pivot joint */}
      <mesh position={[0, 0.98, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color="#f3f5f4"
          metalness={0.6}
          roughness={0.35}
        />
      </mesh>

      {/* Upper arm */}
      <mesh position={[0, 1.25, 0.45]}>
        <boxGeometry args={[0.08, 0.08, 0.9]} />
        <meshStandardMaterial
          color="#f3f5f4"
          metalness={0.6}
          roughness={0.35}
        />
      </mesh>

      {/* Lamp head (Pixar-style) */}
      <group position={[0, 1.25, 0.9]}>
        <mesh rotation={[Math.PI / 2.2, 0, 0]}>
          {/* Shade */}
          <coneGeometry args={[0.45, 0.6, 24, 1, true]} />
          <meshStandardMaterial
            color="#f3f5f4"
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>
        <mesh position={[0, 0.18, 0.16]}>
          {/* Glowing inner face */}
          <circleGeometry args={[0.3, 28]} />
          <meshStandardMaterial
            color="#f5f5f5"
            emissive="#f5f5f5"
            emissiveIntensity={3.2 * revealed}
            roughness={0.08}
            metalness={0.2}
          />
        </mesh>
      </group>
    </group>
  );
}

const CREED_FONT =
  "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json";
const CREED_TEXT = "UNTIL DEATH ALL DEFEAT IS PSYCHOLOGICAL";

function Firefly({ origin }: { origin: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);
  // Deterministic seeds via golden-ratio spacing so the pattern is always organic
  const seeds = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => (i * 2.618 + 0.4) % (Math.PI * 2)),
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    // Four waves with irrational frequency ratios — never repeat, never pendulum
    const rawX =
      Math.sin(t * 0.21 + seeds[0]) * 7.0 + // wide drift
      Math.sin(t * 0.57 + seeds[1]) * 4.2 + // medium wander
      Math.sin(t * 1.29 + seeds[2]) * 1.6 + // wobble
      Math.sin(t * 0.33 + seeds[3]) * 1.8; // cross-drift
    const x = origin[0] + Math.max(-14, Math.min(14, rawX));
    const rawY =
      Math.sin(t * 0.39 + seeds[4]) * 0.9 +
      Math.sin(t * 1.11 + seeds[5]) * 0.45;
    const y = origin[1] + Math.max(-0.8, rawY);
    const z = origin[2] + Math.sin(t * 0.51 + seeds[6]) * 2.8;
    // Flicker: fast irregular pulse
    const flicker =
      4.2 +
      Math.sin(t * 11.7 + seeds[7]) * 1.4 +
      Math.sin(t * 19.3 + seeds[0]) * 0.8;

    groupRef.current?.position.set(x, y, z);
    if (lightRef.current) lightRef.current.intensity = flicker;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshBasicMaterial color="#9effc8" />
      </mesh>
      <pointLight
        ref={lightRef}
        color="#42e87c"
        intensity={4.2}
        distance={60}
        decay={1.4}
      />
    </group>
  );
}

function WarriorCreed({ progress = 0 }: { progress?: number }) {
  const revealed = Math.max(0, Math.min(1, (progress - 0.78) / 0.18));
  const origin: [number, number, number] = [2, 3.2, -230];

  return (
    <group>
      {/* Dim dark-green backlight for depth */}
      <pointLight
        position={[origin[0], origin[1] + 4, origin[2] - 4]}
        intensity={revealed * 1.2}
        color="#0f2e1a"
        distance={45}
      />

      <group position={origin}>
        <Suspense fallback={null}>
          <Center>
            <Text3D
              font={CREED_FONT}
              size={0.82}
              height={0.12}
              curveSegments={6}
              bevelEnabled
              bevelThickness={0.015}
              bevelSize={0.01}
              bevelSegments={2}
            >
              {CREED_TEXT}
              <meshStandardMaterial
                color="#2c5b3c"
                metalness={0.65}
                roughness={0.32}
                emissive="#184128"
                emissiveIntensity={0.9}
                transparent
                opacity={revealed}
              />
            </Text3D>
          </Center>
        </Suspense>
      </group>

      <Firefly origin={origin} />
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
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <color attach="background" args={["#0f1212"]} />
        <fog attach="fog" args={["#0f1212", 18, 260]} />
        <ambientLight intensity={0.65} />
        <directionalLight position={[5, 10, 6]} intensity={1} color="#b8ffe0" />
        <directionalLight
          position={[-6, 5, -6]}
          intensity={0.4}
          color="#6b8190"
        />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.45, -68]}>
          <planeGeometry args={[170, 380]} />
          <meshStandardMaterial
            color="#141919"
            roughness={0.98}
            metalness={0.02}
          />
        </mesh>

        <PathMeshes />
        <SignPosts milestones={milestones} activeIndex={activeIndex} />
        <WarriorCreed progress={progress} />
        <CameraRig progress={progress} />
      </Canvas>
    </div>
  );
}
