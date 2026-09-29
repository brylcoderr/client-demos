"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function HeroScales() {
  const groupRef = useRef<THREE.Group>(null);
  const leftPanRef = useRef<THREE.Group>(null);
  const rightPanRef = useRef<THREE.Group>(null);
  
  // Wireframe material for the classic, restrained architectural look
  const material = useMemo(() => new THREE.LineBasicMaterial({
    color: "#B39B5E",
    transparent: true,
    opacity: 0.4,
  }), []);

  // Geometry for the scales
  const centerPole = useMemo(() => new THREE.CylinderGeometry(0.1, 0.2, 8, 8), []);
  const balanceBeam = useMemo(() => new THREE.BoxGeometry(6, 0.1, 0.2), []);
  const panString = useMemo(() => new THREE.CylinderGeometry(0.01, 0.01, 3, 3), []);
  const panBase = useMemo(() => new THREE.CylinderGeometry(1.2, 1, 0.2, 16), []);
  const baseBox = useMemo(() => new THREE.BoxGeometry(2, 0.4, 2), []);

  useFrame((state) => {
    if (groupRef.current) {
      // Very slow, deliberate rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      
      // Gentle floating of the entire assembly
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2 - 1;
      
      // Slight tipping of the scales based on sine wave
      const tip = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      
      // The beam tilts
      const beam = groupRef.current.children[1];
      beam.rotation.z = tip;
      
      // The pans stay upright but move up and down based on the beam tip
      if (leftPanRef.current && rightPanRef.current) {
        // Distance from center is 2.8 (half of 6 minus some padding)
        leftPanRef.current.position.y = 4 + Math.sin(tip) * -2.8;
        leftPanRef.current.position.x = Math.cos(tip) * -2.8;
        
        rightPanRef.current.position.y = 4 + Math.sin(tip) * 2.8;
        rightPanRef.current.position.x = Math.cos(tip) * 2.8;
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#F8F4EA" />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#B39B5E" />
      
      <group ref={groupRef} position={[0, -1, 0]}>
        {/* Base */}
        <lineSegments position={[0, 0, 0]}>
          <edgesGeometry args={[baseBox]} />
          <primitive object={material} />
        </lineSegments>
        
        {/* Center Pole */}
        <lineSegments position={[0, 4, 0]}>
          <edgesGeometry args={[centerPole]} />
          <primitive object={material} />
        </lineSegments>

        {/* Balance Beam (tilts) */}
        <lineSegments position={[0, 7.5, 0]}>
          <edgesGeometry args={[balanceBeam]} />
          <primitive object={material} />
        </lineSegments>

        {/* Left Pan Assembly */}
        <group ref={leftPanRef} position={[-2.8, 4, 0]}>
          {/* Strings */}
          <lineSegments position={[-0.8, -1.5, 0]} rotation={[0, 0, -0.3]}>
            <edgesGeometry args={[panString]} />
            <primitive object={material} />
          </lineSegments>
          <lineSegments position={[0.8, -1.5, 0]} rotation={[0, 0, 0.3]}>
            <edgesGeometry args={[panString]} />
            <primitive object={material} />
          </lineSegments>
          
          {/* Pan */}
          <lineSegments position={[0, -3, 0]}>
            <edgesGeometry args={[panBase]} />
            <primitive object={material} />
          </lineSegments>
        </group>

        {/* Right Pan Assembly */}
        <group ref={rightPanRef} position={[2.8, 4, 0]}>
          {/* Strings */}
          <lineSegments position={[-0.8, -1.5, 0]} rotation={[0, 0, -0.3]}>
            <edgesGeometry args={[panString]} />
            <primitive object={material} />
          </lineSegments>
          <lineSegments position={[0.8, -1.5, 0]} rotation={[0, 0, 0.3]}>
            <edgesGeometry args={[panString]} />
            <primitive object={material} />
          </lineSegments>
          
          {/* Pan */}
          <lineSegments position={[0, -3, 0]}>
            <edgesGeometry args={[panBase]} />
            <primitive object={material} />
          </lineSegments>
        </group>
      </group>
    </>
  );
}
