"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Environment, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useMouseParallax, useDeviceTilt } from "@client-demos/core";
import { getToken } from "../../lib/token";

export function HeroScene() {
  const group = useRef<THREE.Group>(null);
  
  // Custom hooks from core
  const mouse = useMouseParallax();
  const tilt = useDeviceTilt();

  // Read tokens on client (Three.js needs real strings, generic names are allowed)
  const bg = typeof window !== 'undefined' ? getToken('--bg') || 'white' : 'white';
  const surface = typeof window !== 'undefined' ? getToken('--surface') || 'white' : 'white';
  const surface2 = typeof window !== 'undefined' ? getToken('--surface-2') || 'white' : 'white';
  const accent = typeof window !== 'undefined' ? getToken('--accent') || 'black' : 'black';

  useFrame(() => {
    if (group.current) {
      // Combine mouse and tilt
      const targetX = (mouse.x * 0.5) + (tilt.gamma * 0.05);
      const targetY = (mouse.y * 0.5) + (tilt.beta * 0.05);
      
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetY, 0.05);
    }
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color={surface} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color={accent} />
      
      <group ref={group}>
        {/* Main Pearl Blob */}
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
          <Sphere args={[1.8, 64, 64]} position={[0, 0, 0]}>
            <meshPhysicalMaterial 
              color={bg}
              emissive={surface}
              emissiveIntensity={0.1}
              roughness={0.1}
              metalness={0.2}
              iridescence={1}
              iridescenceIOR={1.4}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </Sphere>
        </Float>
        
        {/* Orbiting Glass Orbs */}
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
          <Sphere args={[0.6, 32, 32]} position={[-2.8, 1.2, 1]}>
            <MeshTransmissionMaterial 
              color={surface2}
              transmission={1}
              thickness={0.6}
              roughness={0}
              ior={1.5}
              iridescence={1}
              chromaticAberration={0.05}
            />
          </Sphere>
        </Float>

        <Float speed={2.5} rotationIntensity={2} floatIntensity={2.5}>
          <Sphere args={[0.4, 32, 32]} position={[2.5, -1.5, 1.5]}>
            <MeshTransmissionMaterial 
              color={surface}
              transmission={1}
              thickness={0.6}
              roughness={0}
              ior={1.2}
              chromaticAberration={0.05}
            />
          </Sphere>
        </Float>
      </group>
    </>
  );
}
