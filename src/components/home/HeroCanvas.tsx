"use client";
import dynamic from "next/dynamic";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

export function HeroCanvas() {
  return (
    <div className="absolute inset-0 -z-10 md:block [@media(prefers-reduced-motion:reduce)]:hidden">
      <Suspense fallback={null}>
        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 1.2, 7.5], fov: 60 }}>
          {/* Background star field */}
          <Stars radius={60} depth={50} count={4000} factor={2} fade speed={0.6} />

          {/* Lights */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 7, 5]} intensity={1} />

          {/* Camera rig for subtle motion */}
          <CameraRig />

          {/* Futuristic grid floor */}
          <GridFloor />

          {/* Removed: Computer, sun, earth and moon as requested */}
        </Canvas>
      </Suspense>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
    </div>
  );
}




function GridFloor() {
  const gridRef = useRef<THREE.Mesh>(null);
  useFrame((_state, delta) => {
    if (gridRef.current) gridRef.current.rotation.z += delta * 0.02;
  });

  const gridTex = useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,size,size);
    ctx.strokeStyle = "#5b21b6";
    ctx.globalAlpha = 0.8;
    for (let i=0;i<size;i+=16){
      ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,size); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0,i); ctx.lineTo(size,i); ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(40, 40);
    return tex;
  }, []);

  return (
    <mesh ref={gridRef} rotation={[-Math.PI/2.4, 0, 0]} position={[0, -1.2, 0]}>
      <planeGeometry args={[200, 200]} />
      <meshBasicMaterial map={gridTex} color={0x60a5fa} opacity={0.35} transparent />
    </mesh>
  );
}

function CameraRig() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ camera }) => {
    const t = performance.now() * 0.00025;
    const x = Math.sin(t) * 0.4;
    const y = 1.2 + Math.cos(t * 0.7) * 0.2;
    const z = 7.5 + Math.sin(t * 0.5) * 0.2;
    camera.position.lerp(new THREE.Vector3(x, y, z), 0.05);
    camera.lookAt(0, 0.2, 0);
  });
  return <group ref={group} />;
}


