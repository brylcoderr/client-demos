"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useDeviceTier } from "@client-demos/core";
import { config } from "../../demo.config";

function FloatingParticles({ reducedMotion }: { reducedMotion: boolean }) {
  const count = 300;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 15;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 15;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return arr;
  }, []);

  const pointsRef = useRef<any>(null);

  useFrame((state) => {
    if (!pointsRef.current || reducedMotion) return;
    const t = state.clock.elapsedTime * 0.05; // Very slow
    pointsRef.current.rotation.y = Math.sin(t) * 0.5;
    pointsRef.current.rotation.x = Math.cos(t) * 0.2;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial 
        transparent 
        color={config.theme.accent} 
        size={0.15} 
        sizeAttenuation={true} 
        depthWrite={false} 
        opacity={0.4} 
      />
    </Points>
  );
}

export function Hero3DSoft({ reducedMotion }: { reducedMotion: boolean }) {
  const tier = useDeviceTier();

  if (tier === "low" || reducedMotion) {
    return (
      <div className="absolute inset-0 z-0 opacity-40 bg-gradient-to-br from-[var(--accent2)] to-[var(--bg)]">
         {/* Simple SVG pattern for low motion/low tier */}
         <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
           <defs>
             <pattern id="softPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
               <circle cx="20" cy="20" r="2" fill="var(--accent)" opacity="0.3" />
             </pattern>
           </defs>
           <rect width="100%" height="100%" fill="url(#softPattern)" />
         </svg>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-[var(--accent2)]/30 to-[var(--bg)] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={1} />
        <FloatingParticles reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
