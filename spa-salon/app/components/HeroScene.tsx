"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Environment, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export function HeroScene() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      // Parallax effect based on pointer
      const targetX = (state.pointer.x * 2);
      const targetY = (state.pointer.y * 2);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetY, 0.05);
    }
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      
      <group ref={group}>
        {/* Main Blob */}
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
            <MeshDistortMaterial 
              color="#F6E4E1" // Blush
              emissive="#4A1942" // Plum accent
              emissiveIntensity={0.1}
              roughness={0.1}
              metalness={0.8}
              distort={0.4}
              speed={1.5}
              iridescence={1}
              iridescenceIOR={1.3}
            />
          </Sphere>
        </Float>
        
        {/* Orbiting Glass Orbs */}
        <Float speed={1.5} rotationIntensity={2} floatIntensity={3}>
          <Sphere args={[0.5, 32, 32]} position={[-2.5, 1, 1]}>
            <MeshTransmissionMaterial 
              color="#E8D5B5" // Champagne
              transmission={1}
              thickness={0.5}
              roughness={0}
              ior={1.5}
              iridescence={1}
            />
          </Sphere>
        </Float>

        <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2.5}>
          <Sphere args={[0.3, 32, 32]} position={[2.5, -1, 1.5]}>
            <MeshTransmissionMaterial 
              color="#F6E4E1"
              transmission={1}
              thickness={0.3}
              roughness={0}
              ior={1.2}
              chromaticAberration={0.2}
            />
          </Sphere>
        </Float>
      </group>
    </>
  );
}
