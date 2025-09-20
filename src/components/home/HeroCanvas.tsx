"use client";
import dynamic from "next/dynamic";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { OrbitControls, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

export function HeroCanvas() {
  return (
    <div className="absolute inset-0 -z-10 md:block [@media(prefers-reduced-motion:reduce)]:hidden">
      <Suspense fallback={null}>
        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 60 }}>
          {/* Background star field */}
          <Stars radius={60} depth={50} count={4000} factor={2} fade speed={0.6} />

          {/* Lights */}
          <ambientLight intensity={0.55} />
          <directionalLight position={[5, 7, 5]} intensity={1} />

          {/* Centerpiece: Retro computer */}
          <RetroComputer position={[0, -0.2, 0]} scale={1.15} />

          {/* Orbiting mini solar system */}
          <SolarSystem />

          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </Suspense>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
    </div>
  );
}

function SolarSystem() {
  const groupRef = useRef<THREE.Group>(null);
  const moonOrbitRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.2;
    if (moonOrbitRef.current) moonOrbitRef.current.rotation.y += delta * 0.8;
    if (planetRef.current) planetRef.current.rotation.y += delta * 0.4;
  });

  return (
    <group ref={groupRef} position={[-2.6, -0.8, -1.2]}>
      {/* Sun */}
      <mesh>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial emissive={new THREE.Color(0xffa500)} emissiveIntensity={1.5} color={0x333333} />
      </mesh>
      {/* Planet + moon */}
      <group ref={moonOrbitRef}>
        <mesh ref={planetRef} position={[1.1, 0, 0]}> 
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshStandardMaterial color={0x4f46e5} roughness={0.6} metalness={0.2} />
        </mesh>
        <mesh position={[1.1 + 0.38, 0, 0]}> 
          <sphereGeometry args={[0.08, 18, 18]} />
          <meshStandardMaterial color={0xb6b6b6} roughness={0.9} metalness={0.1} />
        </mesh>
      </group>
      {/* Orbit ring (subtle) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}> 
        <ringGeometry args={[1.08, 1.1, 64]} />
        <meshBasicMaterial color={0xffffff} opacity={0.15} transparent />
      </mesh>
    </group>
  );
}

function RetroComputer({ position = [0, 0, 0] as [number, number, number], scale = 1 }: { position?: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* Monitor */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.9, 0.6, 0.5]} />
        <meshStandardMaterial color={0xdedede} roughness={0.9} metalness={0.05} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.42, 0.26]}> 
        <planeGeometry args={[0.7, 0.42]} />
        <meshStandardMaterial color={0x0ea5e9} emissive={new THREE.Color(0x0ea5e9)} emissiveIntensity={0.25} />
      </mesh>
      {/* Base */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.7, 0.1, 0.5]} />
        <meshStandardMaterial color={0xcfcfcf} roughness={0.9} />
      </mesh>
      {/* Keyboard */}
      <mesh position={[0, -0.1, 0.25]} rotation={[ -0.2, 0, 0 ]}>
        <boxGeometry args={[0.9, 0.06, 0.3]} />
        <meshStandardMaterial color={0xcccccc} roughness={0.95} />
      </mesh>
    </group>
  );
}


