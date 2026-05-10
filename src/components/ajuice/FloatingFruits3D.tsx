'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!lightRef.current) return;
    const x = (state.pointer.x + 1) / 2;
    const y = -(state.pointer.y - 1) / 2;
    lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, x * 6 - 3, 0.05);
    lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, y * 4 - 1, 0.05);
  });

  return <pointLight ref={lightRef} position={[0, 0, 6]} intensity={0.6} color="#bae6fd" distance={15} />;
}

interface FloatingFruitProps {
  position: [number, number, number];
  color: string;
  emissive?: string;
  scale: number;
  speed: number;
  distort: number;
  rotationSpeed?: number;
}

function FloatingFruit({
  position,
  color,
  emissive = '#000000',
  scale,
  speed,
  distort,
  rotationSpeed = 1,
}: FloatingFruitProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.25 * speed * rotationSpeed;
    meshRef.current.rotation.x = Math.sin(t * 0.18 * speed) * 0.25;
    meshRef.current.rotation.z = Math.cos(t * 0.12 * speed) * 0.15;
  });

  return (
    <Float
      speed={speed * 1.2}
      rotationIntensity={0.3}
      floatIntensity={1.8}
      floatingRange={[-0.3, 0.3]}
    >
      <mesh ref={meshRef} position={position} scale={scale} castShadow>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.15}
          distort={distort}
          speed={1.5}
          roughness={0.15}
          metalness={0.15}
          transparent
          opacity={0.82}
          envMapIntensity={1.2}
        />
      </mesh>
    </Float>
  );
}

function WobbleOrb({ position, color, scale }: { position: [number, number, number]; color: string; scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
  });

  return (
    <Float speed={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshWobbleMaterial
          color={color}
          factor={0.3}
          speed={1}
          transparent
          opacity={0.3}
          roughness={0.8}
          metalness={0}
        />
      </mesh>
    </Float>
  );
}

function SceneContent() {
  const fruits = useMemo(() => [
    { position: [-3.5, 2.5, -2] as [number, number, number], color: '#ef4444', emissive: '#7f1d1d', scale: 0.65, speed: 0.7, distort: 0.4, rotationSpeed: 0.8 },
    { position: [3.8, 1.8, -1.5] as [number, number, number], color: '#22c55e', emissive: '#14532d', scale: 0.55, speed: 0.9, distort: 0.35, rotationSpeed: 1.2 },
    { position: [-2.5, -1.8, -3] as [number, number, number], color: '#f59e0b', emissive: '#78350f', scale: 0.72, speed: 0.6, distort: 0.45, rotationSpeed: 0.7 },
    { position: [2.5, -2.2, -2.5] as [number, number, number], color: '#ec4899', emissive: '#831843', scale: 0.6, speed: 0.85, distort: 0.3, rotationSpeed: 1.1 },
    { position: [0, 3.5, -4] as [number, number, number], color: '#ef4444', emissive: '#991b1b', scale: 0.48, speed: 1, distort: 0.5, rotationSpeed: 0.5 },
    { position: [-4.5, 0.5, -3.5] as [number, number, number], color: '#f97316', emissive: '#7c2d12', scale: 0.52, speed: 0.55, distort: 0.35, rotationSpeed: 1.3 },
    { position: [4.2, -0.8, -4] as [number, number, number], color: '#16a34a', emissive: '#14532d', scale: 0.58, speed: 0.75, distort: 0.4, rotationSpeed: 0.9 },
    { position: [-1.2, -3.2, -2.5] as [number, number, number], color: '#dc2626', emissive: '#7f1d1d', scale: 0.42, speed: 1.1, distort: 0.3, rotationSpeed: 1.4 },
  ], []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={0.7} color="#ffffff" castShadow />
      <directionalLight position={[-4, 4, 3]} intensity={0.25} color="#bae6fd" />
      <MouseLight />

      {fruits.map((fruit, i) => (
        <FloatingFruit key={i} {...fruit} />
      ))}

      {/* Background wobble orbs */}
      <WobbleOrb position={[-5, 3, -6]} color="#0ea5e9" scale={1.5} />
      <WobbleOrb position={[5, -3, -7]} color="#8b5cf6" scale={1.2} />
      <WobbleOrb position={[0, -4, -8]} color="#10b981" scale={1.8} />

      <Environment preset="sunset" />
      <ContactShadows
        position={[0, -4.5, 0]}
        opacity={0.15}
        scale={20}
        blur={2.5}
        far={6}
      />
    </>
  );
}

export default function FloatingFruits3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 42 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
