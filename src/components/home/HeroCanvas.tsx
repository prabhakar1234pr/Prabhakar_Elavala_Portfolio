"use client";
import dynamic from "next/dynamic";
import { Suspense, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

function FloatingIcosahedron() {
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(2, 1), []);
  const material = useMemo(
    () => new THREE.MeshPhongMaterial({ color: 0x7c3aed, shininess: 60 }),
    []
  );
  return <mesh geometry={geometry} material={material} rotation={[0.4, 0.2, 0]} />;
}

export function HeroCanvas() {
  return (
    <div className="absolute inset-0 -z-10 md:block [@media(prefers-reduced-motion:reduce)]:hidden">
      <Suspense fallback={null}>
        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 60 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <FloatingIcosahedron />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
        </Canvas>
      </Suspense>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
    </div>
  );
}


