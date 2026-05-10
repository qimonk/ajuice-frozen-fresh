'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Fruit 3D shape definitions per product ─── */
interface FruitConfig {
  color: string;
  emissive: string;
  juiceColor: string;
  fruitCount: number;
  fruitScale: number;
  fruitGeometry: 'sphere' | 'elongated' | 'flat' | 'bumpy' | 'star';
  label: string;
}

const FRUIT_CONFIGS: Record<string, FruitConfig> = {
  'terong-belanda': {
    color: '#c0392b',
    emissive: '#7f1d1d',
    juiceColor: '#e74c3c',
    fruitCount: 5,
    fruitScale: 0.35,
    fruitGeometry: 'elongated',
    label: 'TB',
  },
  wortel: {
    color: '#f39c12',
    emissive: '#92400e',
    juiceColor: '#f59e0b',
    fruitCount: 4,
    fruitScale: 0.3,
    fruitGeometry: 'elongated',
    label: 'WR',
  },
  sosin: {
    color: '#22c55e',
    emissive: '#14532d',
    juiceColor: '#4ade80',
    fruitCount: 6,
    fruitScale: 0.25,
    fruitGeometry: 'flat',
    label: 'SO',
  },
  brokoli: {
    color: '#16a34a',
    emissive: '#14532d',
    juiceColor: '#22c55e',
    fruitCount: 3,
    fruitScale: 0.5,
    fruitGeometry: 'bumpy',
    label: 'BR',
  },
  'jambu-merah': {
    color: '#ef4444',
    emissive: '#991b1b',
    juiceColor: '#f87171',
    fruitCount: 4,
    fruitScale: 0.38,
    fruitGeometry: 'sphere',
    label: 'JM',
  },
  sirsak: {
    color: '#a3e635',
    emissive: '#365314',
    juiceColor: '#bef264',
    fruitCount: 3,
    fruitScale: 0.55,
    fruitGeometry: 'bumpy',
    label: 'SR',
  },
  mangga: {
    color: '#eab308',
    emissive: '#854d0e',
    juiceColor: '#facc15',
    fruitCount: 4,
    fruitScale: 0.4,
    fruitGeometry: 'elongated',
    label: 'MG',
  },
  'buah-naga': {
    color: '#ec4899',
    emissive: '#831843',
    juiceColor: '#f472b6',
    fruitCount: 5,
    fruitScale: 0.4,
    fruitGeometry: 'bumpy',
    label: 'BN',
  },
  stroberi: {
    color: '#dc2626',
    emissive: '#7f1d1d',
    juiceColor: '#ef4444',
    fruitCount: 5,
    fruitScale: 0.28,
    fruitGeometry: 'sphere',
    label: 'SB',
  },
};

/* ─── 3D Bottle Component ─── */
function Bottle({ juiceColor }: { juiceColor: string }) {
  const bottleRef = useRef<THREE.Group>(null);
  const capRef = useRef<THREE.Mesh>(null);
  const liquidRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (bottleRef.current) {
      bottleRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
    }
    if (capRef.current) {
      capRef.current.rotation.y = t * 0.8;
    }
    // Liquid bubble animation
    if (liquidRef.current) {
      const mat = liquidRef.current.material as THREE.MeshPhysicalMaterial;
      mat.clearcoat = 0.3 + Math.sin(t * 2) * 0.15;
    }
  });

  return (
    <group ref={bottleRef} position={[0, -0.3, 0]}>
      {/* Bottle body */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.65, 2.2, 32, 1, false]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.05}
          metalness={0.1}
          transparent
          opacity={0.35}
          clearcoat={1}
          clearcoatRoughness={0.05}
          transmission={0.6}
          ior={1.5}
          thickness={0.5}
        />
      </mesh>

      {/* Liquid inside */}
      <mesh ref={liquidRef} position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.48, 0.58, 2.0, 32, 1, false]} />
        <meshPhysicalMaterial
          color={juiceColor}
          roughness={0.2}
          metalness={0.05}
          transparent
          opacity={0.75}
          clearcoat={0.4}
          emissive={juiceColor}
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Bottle neck */}
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.25, 0.45, 0.5, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.05}
          metalness={0.1}
          transparent
          opacity={0.35}
          clearcoat={1}
          clearcoatRoughness={0.05}
          transmission={0.6}
        />
      </mesh>

      {/* Bottle cap */}
      <mesh ref={capRef} position={[0, 1.7, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.35, 16]} />
        <meshStandardMaterial
          color={juiceColor}
          roughness={0.3}
          metalness={0.6}
          emissive={juiceColor}
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Bottom ring */}
      <mesh position={[0, -1.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.65, 0.04, 16, 32]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Label ring on bottle */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.6, 0.015, 8, 64]} />
        <meshStandardMaterial color={juiceColor} metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  );
}

/* ─── Floating Fruit ─── */
function FloatingFruit({
  position,
  color,
  emissive,
  scale,
  speed,
  orbitRadius,
  orbitSpeed,
  geometry,
  index,
}: {
  position: [number, number, number];
  color: string;
  emissive: string;
  scale: number;
  speed: number;
  orbitRadius: number;
  orbitSpeed: number;
  geometry: string;
  index: number;
}) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const angle = t * orbitSpeed + (index * Math.PI * 2) / 5;
    meshRef.current.position.x = Math.cos(angle) * orbitRadius;
    meshRef.current.position.z = Math.sin(angle) * orbitRadius;
    meshRef.current.position.y = position[1] + Math.sin(t * speed + index) * 0.3;
    meshRef.current.rotation.x = t * 0.5 + index;
    meshRef.current.rotation.y = t * 0.7 + index * 0.5;
  });

  const getGeometry = () => {
    switch (geometry) {
      case 'elongated':
        return <capsuleGeometry args={[scale * 0.8, scale * 1.2, 8, 16]} />;
      case 'flat':
        return <sphereGeometry args={[scale, 16, 8]} />;
      case 'bumpy':
        return <icosahedronGeometry args={[scale, 1]} />;
      case 'star':
        return <dodecahedronGeometry args={[scale, 0]} />;
      default:
        return <sphereGeometry args={[scale, 32, 32]} />;
    }
  };

  return (
    <group ref={meshRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh castShadow>
          {getGeometry()}
          <MeshDistortMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={0.2}
            distort={0.3}
            speed={2}
            roughness={0.15}
            metalness={0.2}
            transparent
            opacity={0.9}
          />
        </mesh>
      </Float>
    </group>
  );
}

/* ─── Juice Bubbles ─── */
function JuiceBubbles({ juiceColor }: { juiceColor: string }) {
  const bubblesRef = useRef<THREE.InstancedMesh>(null);
  const count = 12;

  const bubbleData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        offset: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.5,
        x: (Math.random() - 0.5) * 0.6,
        size: 0.03 + Math.random() * 0.06,
      });
    }
    return data;
  }, []);

  useFrame((state) => {
    if (!bubblesRef.current) return;
    const t = state.clock.elapsedTime;
    const dummy = new THREE.Object3D();

    bubbleData.forEach((b, i) => {
      const y = ((t * b.speed + b.offset) % 2.0) - 1.0;
      dummy.position.set(b.x, y, 0);
      dummy.scale.setScalar(b.size * 8);
      dummy.updateMatrix();
      bubblesRef.current!.setMatrixAt(i, dummy.matrix);
    });
    bubblesRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={bubblesRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshPhysicalMaterial
        color={juiceColor}
        transparent
        opacity={0.3}
        roughness={0}
        metalness={0.1}
        emissive={juiceColor}
        emissiveIntensity={0.1}
      />
    </instancedMesh>
  );
}

/* ─── Glow Ring behind bottle ─── */
function GlowRing({ color }: { color: string }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    const t = state.clock.elapsedTime;
    ringRef.current.rotation.z = t * 0.2;
    ringRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.05);
  });

  return (
    <mesh ref={ringRef} position={[0, -0.3, -0.8]} rotation={[0, 0, 0]}>
      <ringGeometry args={[1.2, 1.5, 64]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.08}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ─── Full Scene per product ─── */
function ProductScene({ productId, isHovered }: { productId: string; isHovered: boolean }) {
  const config = FRUIT_CONFIGS[productId] || FRUIT_CONFIGS['stroberi'];

  const fruits = useMemo(() => {
    const items = [];
    for (let i = 0; i < config.fruitCount; i++) {
      const angle = (i / config.fruitCount) * Math.PI * 2;
      items.push({
        position: [Math.cos(angle) * 1.5, -0.5 + Math.sin(i * 1.5) * 0.8, Math.sin(angle) * 1.5] as [number, number, number],
        color: config.color,
        emissive: config.emissive,
        scale: config.fruitScale * (0.8 + Math.random() * 0.4),
        speed: 0.8 + Math.random() * 0.6,
        orbitRadius: 1.2 + Math.random() * 0.6,
        orbitSpeed: 0.3 + Math.random() * 0.3,
        geometry: config.fruitGeometry,
        index: i,
      });
    }
    return items;
  }, [config]);

  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!lightRef.current) return;
    const t = state.clock.elapsedTime;
    lightRef.current.intensity = isHovered ? 1.2 + Math.sin(t * 3) * 0.3 : 0.6;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 4]} intensity={0.8} color="#ffffff" castShadow />
      <directionalLight position={[-3, 2, 2]} intensity={0.3} color="#bae6fd" />
      <pointLight ref={lightRef} position={[0, 2, 3]} intensity={0.6} color={config.juiceColor} distance={10} />
      <pointLight position={[0, -2, 2]} intensity={0.3} color={config.juiceColor} distance={8} />

      {/* Glow backdrop */}
      <GlowRing color={config.juiceColor} />

      {/* The bottle */}
      <Bottle juiceColor={config.juiceColor} />

      {/* Floating fruits orbiting */}
      {fruits.map((fruit, i) => (
        <FloatingFruit key={i} {...fruit} />
      ))}

      {/* Juice bubbles inside bottle */}
      <JuiceBubbles juiceColor={config.juiceColor} />
    </>
  );
}

/* ─── Main exported component ─── */
export default function ProductBottle3D({
  productId,
  isHovered = false,
}: {
  productId: string;
  isHovered?: boolean;
}) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0.5, 4.5], fov: 35 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <ProductScene productId={productId} isHovered={isHovered} />
      </Canvas>
    </div>
  );
}
