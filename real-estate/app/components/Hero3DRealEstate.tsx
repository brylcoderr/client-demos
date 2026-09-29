"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrthographicCamera, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { config } from "../../demo.config";
import { useDeviceTier } from "@client-demos/core";

// ─── Low Poly Building ───────────────────────────────────────
function Building({ position, scale }: { position: [number, number, number], scale: [number, number, number] }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const targetScale = hovered ? scale[1] * 1.1 : scale[1];
    meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScale, 0.1);
    
    // update position y so it scales up from bottom
    meshRef.current.position.y = meshRef.current.scale.y / 2;
  });

  return (
    <group position={[position[0], 0, position[2]]}>
      <mesh 
        ref={meshRef}
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[scale[0], 1, scale[2]]} />
        <meshStandardMaterial 
          color={hovered ? config.theme.accent : config.theme.fg} 
          roughness={0.7}
        />
      </mesh>
    </group>
  );
}

// ─── City Block ───────────────────────────────────────────────
function City() {
  const group = useRef<THREE.Group>(null);
  
  // Subtle camera drift effect on the whole city block
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  return (
    <group ref={group}>
      <Building position={[-3, 0, -2]} scale={[1.5, 4, 1.5]} />
      <Building position={[0, 0, -4]} scale={[2, 6, 2]} />
      <Building position={[3, 0, -1]} scale={[1.5, 3, 1.5]} />
      <Building position={[-2, 0, 2]} scale={[2, 2.5, 2]} />
      <Building position={[2, 0, 3]} scale={[1.5, 5, 1.5]} />
      <Building position={[0, 0, 1]} scale={[1.5, 2, 1.5]} />
      
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={config.theme.bg} />
      </mesh>
    </group>
  );
}

export function Hero3DRealEstate() {
  const tier = useDeviceTier();

  if (tier === "low") {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[200%] h-64 flex">
           {/* Fallback CSS parallax skyline */}
           <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full text-[var(--fg)] animate-pan-skyline">
             <path fill="currentColor" d="M0,20 L0,15 L5,15 L5,10 L10,10 L10,18 L15,18 L15,8 L20,8 L20,12 L25,12 L25,5 L30,5 L30,16 L35,16 L35,10 L40,10 L40,14 L45,14 L45,6 L50,6 L50,20 Z" />
             <path fill="currentColor" d="M50,20 L50,15 L55,15 L55,10 L60,10 L60,18 L65,18 L65,8 L70,8 L70,12 L75,12 L75,5 L80,5 L80,16 L85,16 L85,10 L90,10 L90,14 L95,14 L95,6 L100,6 L100,20 Z" />
           </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-auto">
      <Canvas shadows>
        <OrthographicCamera makeDefault position={[10, 10, 10]} zoom={40} />
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 20, 5]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        <City />
        <ContactShadows resolution={512} scale={20} blur={2} opacity={0.5} far={10} color={config.theme.fg} />
      </Canvas>
    </div>
  );
}
