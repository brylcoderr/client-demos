"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { demoFeatures } from "../../demo.config";
import { getToken } from "../../lib/token";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroConstruction() {
  const variant = demoFeatures.heroVariant || "house";
  
  const groupRef = useRef<THREE.Group>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Shared scroll proxy object
  const scrollObj = useMemo(() => ({ progress: 0 }), []);
  
  useEffect(() => {
    // Only scrub pinning on screens >= 768px
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    
    if (isDesktop) {
      const trigger = ScrollTrigger.create({
        trigger: "#hero-scroll-container",
        start: "top top",
        end: "+=100%",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          scrollObj.progress = self.progress;
          setScrollProgress(Math.round(self.progress * 100));
        }
      });
      return () => trigger.kill();
    } else {
      // Mobile = static stacked illustration
      scrollObj.progress = 1;
      setScrollProgress(100);
    }
  }, [scrollObj]);

  const yellowColor = typeof window !== "undefined" ? getToken("--accent") || String.fromCharCode(35) + "FFC400" : String.fromCharCode(35) + "FFC400";
  const greyColor = typeof window !== "undefined" ? getToken("--surface-2") || String.fromCharCode(35) + "D8D8D6" : String.fromCharCode(35) + "D8D8D6";
  const concreteColor = typeof window !== "undefined" ? getToken("--surface") || String.fromCharCode(35) + "E5E5E5" : String.fromCharCode(35) + "E5E5E5";

  const yellowMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: yellowColor }), [yellowColor]);
  const greyMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: greyColor }), [greyColor]);
  const concreteMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: concreteColor }), [concreteColor]);

  useFrame(() => {
    if (!groupRef.current) return;
    const p = scrollObj.progress; // 0 to 1
    
    // Animate overall group slowly rotating
    groupRef.current.rotation.y = p * Math.PI * 2 + 0.5;

    // We have different parts in the group:
    // 0: foundation, 1: floor, 2: studs, 3: roof beams, 4: roof panels
    
    const children = groupRef.current.children;
    if (variant === "house" && children.length >= 5) {
      // Foundation (appears early)
      children[0].position.y = THREE.MathUtils.lerp(-10, -2, Math.min(1, p * 5));
      children[0].visible = p > 0;
      
      // Floor (appears next)
      children[1].position.y = THREE.MathUtils.lerp(-10, -1.8, Math.max(0, Math.min(1, (p - 0.1) * 5)));
      children[1].visible = p > 0.1;
      
      // Studs
      children[2].position.y = THREE.MathUtils.lerp(-10, 0, Math.max(0, Math.min(1, (p - 0.2) * 5)));
      children[2].visible = p > 0.2;
      
      // Roof Beams
      children[3].position.y = THREE.MathUtils.lerp(-10, 2, Math.max(0, Math.min(1, (p - 0.3) * 5)));
      children[3].visible = p > 0.3;
      
      // Roof Panels
      children[4].position.y = THREE.MathUtils.lerp(10, 2, Math.max(0, Math.min(1, (p - 0.4) * 5)));
      children[4].visible = p > 0.4;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} color={yellowColor} />
      <directionalLight position={[-10, 10, -10]} intensity={0.5} />
      
      <group ref={groupRef}>
        {/* 0: Foundation */}
        <mesh>
          <boxGeometry args={[4.2, 0.4, 4.2]} />
          <primitive object={concreteMaterial} />
        </mesh>
        
        {/* 1: Floor */}
        <mesh>
          <boxGeometry args={[4, 0.2, 4]} />
          <primitive object={greyMaterial} />
        </mesh>
        
        {/* 2: Studs (group of boxes) */}
        <group>
          {/* 4 corner pillars */}
          <mesh position={[-1.9, 1.8, -1.9]}><boxGeometry args={[0.1, 3.6, 0.1]} /><primitive object={yellowMaterial}/></mesh>
          <mesh position={[1.9, 1.8, -1.9]}><boxGeometry args={[0.1, 3.6, 0.1]} /><primitive object={yellowMaterial}/></mesh>
          <mesh position={[-1.9, 1.8, 1.9]}><boxGeometry args={[0.1, 3.6, 0.1]} /><primitive object={yellowMaterial}/></mesh>
          <mesh position={[1.9, 1.8, 1.9]}><boxGeometry args={[0.1, 3.6, 0.1]} /><primitive object={yellowMaterial}/></mesh>
          {/* Top connecting beams */}
          <mesh position={[0, 3.6, -1.9]}><boxGeometry args={[4, 0.1, 0.1]} /><primitive object={yellowMaterial}/></mesh>
          <mesh position={[0, 3.6, 1.9]}><boxGeometry args={[4, 0.1, 0.1]} /><primitive object={yellowMaterial}/></mesh>
          <mesh position={[-1.9, 3.6, 0]}><boxGeometry args={[0.1, 0.1, 4]} /><primitive object={yellowMaterial}/></mesh>
          <mesh position={[1.9, 3.6, 0]}><boxGeometry args={[0.1, 0.1, 4]} /><primitive object={yellowMaterial}/></mesh>
        </group>
        
        {/* 3: Roof Beams (A-frame) */}
        <group position={[0, 3.6, 0]}>
          <mesh position={[0, 0.8, -1.9]} rotation={[0, 0, 0.5]}><boxGeometry args={[2.5, 0.1, 0.1]} /><primitive object={yellowMaterial}/></mesh>
          <mesh position={[0, 0.8, -1.9]} rotation={[0, 0, -0.5]}><boxGeometry args={[2.5, 0.1, 0.1]} /><primitive object={yellowMaterial}/></mesh>
          
          <mesh position={[0, 0.8, 1.9]} rotation={[0, 0, 0.5]}><boxGeometry args={[2.5, 0.1, 0.1]} /><primitive object={yellowMaterial}/></mesh>
          <mesh position={[0, 0.8, 1.9]} rotation={[0, 0, -0.5]}><boxGeometry args={[2.5, 0.1, 0.1]} /><primitive object={yellowMaterial}/></mesh>
          
          <mesh position={[0, 1.3, 0]}><boxGeometry args={[0.1, 0.1, 4]} /><primitive object={yellowMaterial}/></mesh>
        </group>
        
        {/* 4: Roof Panels */}
        <group position={[0, 3.6, 0]}>
          <mesh position={[-1, 0.8, 0]} rotation={[0, 0, 0.5]}>
            <boxGeometry args={[2.6, 0.05, 4.2]} />
            <primitive object={greyMaterial} />
          </mesh>
          <mesh position={[1, 0.8, 0]} rotation={[0, 0, -0.5]}>
            <boxGeometry args={[2.6, 0.05, 4.2]} />
            <primitive object={greyMaterial} />
          </mesh>
        </group>
      </group>
      
      {/* Progress Chip */}
      {typeof window !== 'undefined' && (
        <group position={[0, 6, 0]}>
          <mesh>
             <boxGeometry args={[2.5, 0.8, 0.1]} />
             <meshBasicMaterial color={typeof window !== "undefined" ? getToken("--inverse-bg") || String.fromCharCode(35) + "1C1C1E" : String.fromCharCode(35) + "1C1C1E"} />
          </mesh>
        </group>
      )}
    </>
  );
}
