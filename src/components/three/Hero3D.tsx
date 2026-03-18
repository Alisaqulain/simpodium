"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";

function RacingWheel() {
  const group = useRef<THREE.Group>(null);
  const rim = useRef<THREE.Mesh>(null);

  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0f1115"),
        metalness: 0.55,
        roughness: 0.25,
      }),
    [],
  );

  const red = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#ff2b3c"),
        emissive: new THREE.Color("#ff2b3c"),
        emissiveIntensity: 0.55,
        metalness: 0.25,
        roughness: 0.3,
      }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.45) * 0.35;
      group.current.rotation.x = Math.cos(t * 0.35) * 0.12;
      group.current.position.y = Math.sin(t * 0.8) * 0.05;
    }
    if (rim.current) rim.current.rotation.z = t * 0.55;
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <mesh ref={rim} material={mat}>
        <torusGeometry args={[1.1, 0.18, 18, 80]} />
      </mesh>

      {/* spokes */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh
          key={i}
          material={mat}
          rotation={[0, 0, (i * Math.PI * 2) / 3]}
        >
          <boxGeometry args={[1.5, 0.12, 0.16]} />
        </mesh>
      ))}

      <mesh material={mat}>
        <cylinderGeometry args={[0.28, 0.28, 0.22, 40]} />
      </mesh>

      {/* center glow */}
      <mesh material={red}>
        <cylinderGeometry args={[0.18, 0.18, 0.08, 32]} />
      </mesh>
    </group>
  );
}

export function Hero3D() {
  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-[22px] border border-white/10 bg-white/5 backdrop-blur sm:h-[380px]">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(450px 240px at 30% 20%, rgba(255,43,60,0.20), transparent 60%), radial-gradient(520px 300px at 70% 70%, rgba(255,77,94,0.14), transparent 60%)",
        }}
      />
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.2, 3.2], fov: 48 }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[2, 2, 2]} intensity={1.2} />
        <pointLight position={[-2, 1, 2]} intensity={0.8} color="#ff2b3c" />
        <RacingWheel />
        <Environment preset="city" />
      </Canvas>
      <div
        className="pointer-events-none absolute inset-x-6 bottom-5 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[rgba(20,24,33,0.50)] px-4 py-3 backdrop-blur"
        style={{ boxShadow: "0 18px 50px rgba(0,0,0,0.55)" }}
      >
        <div className="text-xs font-semibold tracking-[0.26em] text-white/80">
          3D COCKPIT ACCENT
        </div>
        <div className="font-mono text-xs tracking-[0.22em] text-white/60">
          READY • SET • RACE
        </div>
      </div>
    </div>
  );
}

