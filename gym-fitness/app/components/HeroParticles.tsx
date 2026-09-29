"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDeviceTier, useScrollVelocity } from "@client-demos/core";

export function HeroParticles() {
  const tier = useDeviceTier();
  const velocity = useScrollVelocity();
  
  const particleCount = tier === "high" ? 8000 : 2500;
  
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Generate particles in a rough dumbbell shape
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      // 3 parts: left weight, bar, right weight
      const part = Math.random();
      let x, y, z;
      
      if (part < 0.2) {
        // Left weight
        x = -3 + (Math.random() - 0.5) * 1.5;
        y = (Math.random() - 0.5) * 4;
        z = (Math.random() - 0.5) * 4;
      } else if (part > 0.8) {
        // Right weight
        x = 3 + (Math.random() - 0.5) * 1.5;
        y = (Math.random() - 0.5) * 4;
        z = (Math.random() - 0.5) * 4;
      } else {
        // Bar
        x = (Math.random() - 0.5) * 6;
        y = (Math.random() - 0.5) * 0.5;
        z = (Math.random() - 0.5) * 0.5;
      }
      
      temp.push({
        baseX: x, baseY: y, baseZ: z,
        currentX: x, currentY: y, currentZ: z,
        speed: Math.random() * 0.2 + 0.1,
        angle: Math.random() * Math.PI * 2
      });
    }
    return temp;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Use velocity from useScrollVelocity
    const v = Math.abs(velocity) * 0.005;
    
    particles.forEach((p, i) => {
      // Add dispersion based on velocity
      if (v > 0.1) {
        p.currentX += Math.cos(p.angle) * v * p.speed;
        p.currentY += Math.sin(p.angle) * v * p.speed;
        p.currentZ += Math.sin(p.angle) * v * p.speed;
      } else {
        // Reform slowly back to base
        p.currentX = THREE.MathUtils.lerp(p.currentX, p.baseX, 0.05);
        p.currentY = THREE.MathUtils.lerp(p.currentY, p.baseY, 0.05);
        p.currentZ = THREE.MathUtils.lerp(p.currentZ, p.baseZ, 0.05);
      }
      
      // Floating effect
      const floatY = Math.sin(state.clock.elapsedTime * p.speed + p.baseX) * 0.2;
      
      dummy.position.set(p.currentX, p.currentY + floatY, p.currentZ);
      
      // Add a slight tilt to the whole shape
      dummy.position.applyAxisAngle(new THREE.Vector3(0, 0, 1), 0.2);
      dummy.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), state.clock.elapsedTime * 0.2);
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]}>
      <boxGeometry args={[0.08, 0.08, 0.08]} />
      <meshBasicMaterial color="#C6FF00" />
    </instancedMesh>
  );
}
