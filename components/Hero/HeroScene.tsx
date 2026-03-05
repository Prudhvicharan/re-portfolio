"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import * as THREE from "three";

// ─── Central Wireframe Icosahedron ────────────────────────────────────────
function CoreMesh({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const outerRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.005;
      // Mouse influence
      meshRef.current.rotation.x += (mouse.current[1] * 0.3 - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += (mouse.current[0] * 0.3 - meshRef.current.rotation.y) * 0.05;
    }
    if (outerRef.current) {
      outerRef.current.rotation.x -= 0.002;
      outerRef.current.rotation.y -= 0.003;
      outerRef.current.rotation.z += 0.001;
      // Pulsing scale
      const scale = 1 + Math.sin(t * 1.5) * 0.015;
      outerRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.04} />
      </mesh>

      {/* Core wireframe icosahedron */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color="#00E5FF" wireframe transparent opacity={0.55} />
      </mesh>

      {/* Outer rotating octahedron */}
      <mesh ref={outerRef}>
        <octahedronGeometry args={[2.2, 0]} />
        <meshBasicMaterial color="#FF9F1C" wireframe transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

// ─── Orbiting Tech Node ───────────────────────────────────────────────────
function OrbitNode({
  label,
  color,
  orbitRadius,
  orbitSpeed,
  orbitOffset,
  size = 0.18,
  shape = "box",
}: {
  label: string;
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset: number;
  size?: number;
  shape?: "box" | "torus" | "sphere" | "cylinder" | "cone";
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime * orbitSpeed + orbitOffset;
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(t) * orbitRadius;
      groupRef.current.position.z = Math.sin(t) * orbitRadius;
      groupRef.current.position.y = Math.sin(t * 0.7) * 0.6;
    }
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.02;
      meshRef.current.rotation.y += 0.03;
    }
    if (glowRef.current) {
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.3 + Math.sin(state.clock.elapsedTime * 2 + orbitOffset) * 0.15;
    }
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case "torus":      return <torusGeometry args={[size, size * 0.35, 8, 16]} />;
      case "sphere":     return <sphereGeometry args={[size, 8, 8]} />;
      case "cylinder":   return <cylinderGeometry args={[size * 0.7, size * 0.7, size * 1.4, 6]} />;
      case "cone":       return <coneGeometry args={[size, size * 2, 6]} />;
      default:           return <boxGeometry args={[size * 1.4, size * 1.4, size * 1.4]} />;
    }
  }, [shape, size]);

  return (
    <group ref={groupRef}>
      {/* Glow halo */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[size * 2, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </mesh>
      {/* Main shape */}
      <mesh ref={meshRef}>
        {geometry}
        <meshBasicMaterial color={color} wireframe />
      </mesh>
    </group>
  );
}

// ─── Aurora Plane ─────────────────────────────────────────────────────────
function Aurora() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.15 + Math.sin(state.clock.elapsedTime * 0.5) * 0.06;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[30, 30, 1, 1]} />
      <meshBasicMaterial
        color="#00E5FF"
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ─── Mouse Tracker ─────────────────────────────────────────────────────────
function MouseTracker({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  useThree(({ gl }) => {
    const canvas = gl.domElement;
    const handler = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = [
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1,
      ];
    };
    canvas.addEventListener("mousemove", handler);
    return () => canvas.removeEventListener("mousemove", handler);
  });
  return null;
}

// ─── The Scene ────────────────────────────────────────────────────────────
function Scene({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const techNodes = [
    { label: "React",     color: "#61DAFB", orbitRadius: 3.2, orbitSpeed: 0.45, orbitOffset: 0,    shape: "torus"    as const },
    { label: "Node",      color: "#68A063", orbitRadius: 3.8, orbitSpeed: 0.35, orbitOffset: 1.2,  shape: "cylinder" as const },
    { label: "AWS",       color: "#FF9900", orbitRadius: 2.9, orbitSpeed: 0.55, orbitOffset: 2.4,  shape: "box"      as const },
    { label: "Docker",    color: "#0DB7ED", orbitRadius: 4.2, orbitSpeed: 0.30, orbitOffset: 3.6,  shape: "sphere"   as const },
    { label: "OpenAI",    color: "#00E5FF", orbitRadius: 3.5, orbitSpeed: 0.42, orbitOffset: 4.8,  shape: "cone"     as const },
    { label: "TypeScript",color: "#3178C6", orbitRadius: 2.7, orbitSpeed: 0.60, orbitOffset: 0.9,  shape: "box"      as const },
  ];

  return (
    <>
      <ambientLight intensity={0.1} />
      <Stars radius={80} depth={50} count={4000} factor={4} saturation={0} fade speed={1.5} />
      <CoreMesh mouse={mouse} />
      {techNodes.map((node) => (
        <OrbitNode key={node.label} {...node} />
      ))}
      <Aurora />
      <MouseTracker mouse={mouse} />
    </>
  );
}

// ─── Exported Component ───────────────────────────────────────────────────
export default function HeroScene({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
}
