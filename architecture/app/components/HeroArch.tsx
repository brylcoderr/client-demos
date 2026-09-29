"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroArch() {
  const solidMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const wireMaterialRef = useRef<THREE.LineBasicMaterial>(null);
  
  // Create a minimal geometric building
  const { geometries, edges } = useMemo(() => {
    const geos = [];
    const eds = [];
    
    // Base block
    const b1 = new THREE.BoxGeometry(4, 2, 4);
    geos.push({ geo: b1, pos: [0, 1, 0] });
    eds.push({ geo: new THREE.EdgesGeometry(b1), pos: [0, 1, 0] });
    
    // Tower 1
    const b2 = new THREE.BoxGeometry(1.5, 6, 1.5);
    geos.push({ geo: b2, pos: [-0.5, 5, 0.5] });
    eds.push({ geo: new THREE.EdgesGeometry(b2), pos: [-0.5, 5, 0.5] });

    // Cantilever block
    const b3 = new THREE.BoxGeometry(3, 1.5, 1.5);
    geos.push({ geo: b3, pos: [1, 4, 0.5] });
    eds.push({ geo: new THREE.EdgesGeometry(b3), pos: [1, 4, 0.5] });

    return { geometries: geos, edges: eds };
  }, []);

  const scrollObj = useMemo(() => ({ progress: 0 }), []);
  
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        scrollObj.progress = self.progress;
      }
    });
    return () => trigger.kill();
  }, [scrollObj]);

  const solidMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#FAFAFA",
    transparent: true,
    opacity: 0,
    roughness: 0.1,
    metalness: 0.2
  }), []);

  const wireMaterial = useMemo(() => new THREE.LineBasicMaterial({
    color: "#C4552D", // Use terracotta for the wireframe to pop
    transparent: true,
    opacity: 1
  }), []);

  useFrame(() => {
    // Scale progress so the transition happens relatively early in the page scroll
    const p = Math.min(1, scrollObj.progress * 3.33);
    
    solidMaterial.opacity = p;
    wireMaterial.opacity = 1 - (p * 0.8);
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#FAFAFA" />
      <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#C4552D" />

      {/* OrbitControls configured for gentle dragging, no scroll hijack */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.05}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />

      <group position={[0, -2, 0]}>
        {/* Solid blocks */}
        {geometries.map((g, i) => (
          <mesh key={`solid-${i}`} position={g.pos as [number, number, number]} geometry={g.geo} material={solidMaterial} />
        ))}

        {/* Wireframe blocks */}
        {edges.map((e, i) => (
          <lineSegments key={`wire-${i}`} position={e.pos as [number, number, number]} geometry={e.geo} material={wireMaterial} />
        ))}
      </group>
    </>
  );
}
