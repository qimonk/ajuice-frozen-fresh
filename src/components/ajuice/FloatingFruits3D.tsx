'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingFruitProps {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
  distort: number;
}

function FloatingFruit({ position, color, scale, speed, distort }: FloatingFruitProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2 * speed) * 0.2;
  });

  return (
    <Float
      speed={speed * 1.5}
      rotationIntensity={0.4}
      floatIntensity={1.5}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 3]} />
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingFruits3D() {
  const fruits: FloatingFruitProps[] = [
    { position: [-3, 2, -2], color: '#ef4444', scale: 0.6, speed: 0.8, distort: 0.4 },
    { position: [3.5, 1.5, -1], color: '#22c55e', scale: 0.5, speed: 1, distort: 0.35 },
    { position: [-2, -1.5, -3], color: '#f59e0b', scale: 0.7, speed: 0.7, distort: 0.45 },
    { position: [2, -2, -2], color: '#ec4899', scale: 0.55, speed: 0.9, distort: 0.3 },
    { position: [0, 3, -4], color: '#ef4444', scale: 0.45, speed: 1.1, distort: 0.5 },
    { position: [-4, 0, -3], color: '#f97316', scale: 0.5, speed: 0.6, distort: 0.35 },
    { position: [4, -0.5, -3.5], color: '#16a34a', scale: 0.55, speed: 0.85, distort: 0.4 },
    { position: [-1, -3, -2], color: '#dc2626', scale: 0.4, speed: 1.2, distort: 0.3 },
  ];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <directionalLight position={[-3, 3, 2]} intensity={0.3} color="#bae6fd" />
        <pointLight position={[0, 0, 5]} intensity={0.4} color="#7dd3fc" />

        {fruits.map((fruit, i) => (
          <FloatingFruit key={i} {...fruit} />
        ))}

        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}
