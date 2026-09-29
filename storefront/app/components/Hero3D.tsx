"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  MeshTransmissionMaterial, 
  PresentationControls, 
  Float, 
  Environment, 
  Lightformer 
} from "@react-three/drei";
import * as THREE from "three";
import { config, StoreType } from "../../demo.config";
import { useDeviceTier } from "@client-demos/core";

// ─── Jewelry Gem ──────────────────────────────────────────────
function Gem() {
  return (
    <Float floatIntensity={2} rotationIntensity={1} speed={2}>
      <mesh rotation={[Math.PI / 4, 0, Math.PI / 4]}>
        <octahedronGeometry args={[2, 0]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={1}
          thickness={0.5}
          chromaticAberration={0.05}
          anisotropicBlur={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={2}
          distortion={0.5}
        />
      </mesh>
    </Float>
  );
}

// ─── Holographic Card ────────────────────────────────────────
function HoloCard() {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    // pointer tilt response + gentle hover
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, (state.pointer.y * Math.PI) / 6, 0.1);
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, (state.pointer.x * Math.PI) / 6, 0.1);
  });

  return (
    <Float floatIntensity={1} speed={1.5}>
      <mesh ref={mesh}>
        <boxGeometry args={[3, 4.2, 0.1]} />
        <meshPhysicalMaterial
          roughness={0.2}
          metalness={0.8}
          iridescence={1}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[100, 400]}
          color="#222"
          envMapIntensity={3}
        />
      </mesh>
    </Float>
  );
}

// ─── Fashion Sneaker Shape ───────────────────────────────────
function SneakerShape() {
  return (
    <Float floatIntensity={3} rotationIntensity={2} speed={3}>
      <mesh>
        <capsuleGeometry args={[1, 2, 4, 16]} />
        <meshPhysicalMaterial
          color={config.theme.accent}
          roughness={0.1}
          metalness={0.5}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
        />
      </mesh>
    </Float>
  );
}

// ─── General / Fallback Shape ───────────────────────────────
function DefaultShape() {
  return (
    <Float floatIntensity={2} rotationIntensity={1.5} speed={2}>
      <mesh>
        <torusKnotGeometry args={[1.5, 0.4, 128, 32]} />
        <meshPhysicalMaterial
          color={config.theme.accent}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
    </Float>
  );
}

export function Hero3D() {
  const tier = useDeviceTier();

  if (tier === "low") {
    // Low tier: static gradient with SVG product fallback
    return (
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30" 
           style={{ background: `radial-gradient(circle at center, ${config.theme.accent}22 0%, transparent 70%)` }}>
        <div className="w-64 h-64 border-4 border-dashed rounded-full animate-spin-slow opacity-20" style={{ borderColor: config.theme.accent }} />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 4, -0.3, 0]}>
            <Lightformer intensity={10} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
            <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
            <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
          </group>
        </Environment>
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        
        <PresentationControls 
          global 
          rotation={[0, 0, 0]} 
          polar={[-0.4, 0.2]} 
          azimuth={[-1, 0.75]} 
          config={{ mass: 2, tension: 400 }} 
          snap={{ mass: 4, tension: 400 }}
        >
          {config.storeType === "jewelry" && <Gem />}
          {config.storeType === "cards" && <HoloCard />}
          {config.storeType === "fashion" && <SneakerShape />}
          {(config.storeType === "pet" || config.storeType === "general") && <DefaultShape />}
        </PresentationControls>
      </Canvas>
    </div>
  );
}
