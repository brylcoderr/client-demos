"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useScrollVelocity, useDeviceTier } from "@client-demos/core";
import { config } from "../../demo.config";

function WheelModel() {
  const groupRef = useRef<THREE.Group>(null);
  const velocity = useScrollVelocity();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Base rotation + extra based on scroll velocity
      const extraSpeed = Math.abs(velocity) * 0.005;
      groupRef.current.rotation.x -= (2 + extraSpeed) * delta;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, Math.PI / 4, 0]}>
      {/* Tire */}
      <mesh>
        <torusGeometry args={[2.5, 0.8, 32, 100]} />
        <meshStandardMaterial color="#111111" roughness={0.9} />
      </mesh>
      
      {/* Rim Base */}
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[2.4, 2.4, 1.2, 64]} />
        <meshStandardMaterial color="#444444" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Spokes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI) / 3]}>
          <boxGeometry args={[4.8, 0.4, 0.8]} />
          <meshStandardMaterial color={config.theme.fg} metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Center Cap */}
      <mesh position={[0, 0, 0.6]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
        <meshStandardMaterial color={config.theme.accent} metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Brake Disc */}
      <mesh position={[0, 0, -0.4]}>
        <torusGeometry args={[1.5, 0.5, 16, 64]} />
        <meshStandardMaterial color="#888888" metalness={1} roughness={0.4} />
      </mesh>

      {/* Caliper */}
      <mesh position={[1.5, 0, -0.4]}>
        <boxGeometry args={[1, 0.6, 1.2]} />
        <meshStandardMaterial color={config.theme.accent} metalness={0.3} roughness={0.5} />
      </mesh>
    </group>
  );
}

function SpeedLines() {
  const count = 300;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  const pointsRef = useRef<any>(null);
  const velocity = useScrollVelocity();

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const extraSpeed = Math.abs(velocity) * 0.05;
    const speed = (5 + extraSpeed) * delta;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 2] += speed; // Move forward
      if (positions[i * 3 + 2] > 10) {
        positions[i * 3 + 2] = -10; // Reset to back
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial transparent color={config.theme.accent} size={0.1} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
    </Points>
  );
}

export function Hero3DWheel() {
  const tier = useDeviceTier();

  if (tier === "low") {
    return (
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30">
        <svg viewBox="0 0 100 100" className="w-96 h-96 animate-spin-wheel text-[var(--fg)]">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="4" />
          <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="4" />
          <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="4" />
          <circle cx="50" cy="50" r="10" fill="var(--accent)" />
        </svg>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 bg-[var(--bg)] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Environment preset="night" />
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-5, 5, -5]} intensity={5} color={config.theme.accent} />
        
        <WheelModel />
        <SpeedLines />
      </Canvas>
    </div>
  );
}
