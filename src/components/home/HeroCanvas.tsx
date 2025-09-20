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

          {/* Centerpiece: Retro computer with holographic screens */}
          <RetroComputer position={[0, 0.1, 0]} scale={1.1} />
          <HoloScreens />

          {/* Orbiting mini solar system */}
          <SolarSystem />
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

function HoloScreens() {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((_state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.2;
    if (materialRef.current) materialRef.current.uniforms.uTime.value += delta;
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0x60a5fa) },
    }),
    []
  );

  return (
    <group ref={groupRef} position={[0, 0.9, 0]}>
      {[ -0.9, 0, 0.9 ].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.2]}>
          <planeGeometry args={[0.55, 0.35, 32, 32]} />
          <shaderMaterial
            ref={materialRef}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            uniforms={uniforms}
            vertexShader={`
              varying vec2 vUv;
              void main(){
                vUv = uv;
                vec3 pos = position;
                pos.z += sin((pos.x + pos.y) * 6.2831 + ${Math.random().toFixed(2)}) * 0.02;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
              }
            `}
            fragmentShader={`
              uniform float uTime;
              uniform vec3 uColor;
              varying vec2 vUv;
              float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
              void main(){
                float scan = step(0.98, fract(vUv.y*20.0 + uTime*0.8));
                float rain = step(0.94, fract(vUv.x*30.0 + uTime*1.3 + hash(vUv)));
                float glow = smoothstep(0.0, 1.0, 1.0 - distance(vUv, vec2(0.5)));
                float alpha = clamp(scan + rain, 0.0, 1.0) * 0.9 * glow;
                gl_FragColor = vec4(uColor, alpha);
              }
            `}
          />
        </mesh>
      ))}
    </group>
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


