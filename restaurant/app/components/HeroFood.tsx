"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { cuisine, CuisineType } from "../../demo.config";

function Mediterranean() {
  const ringRef = useRef<THREE.Group>(null);
  const ingredientRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    ingredientRefs.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.rotation.x = state.clock.elapsedTime * (0.5 + i * 0.1);
        mesh.rotation.y = state.clock.elapsedTime * (0.3 + i * 0.1);
        mesh.position.y = Math.sin(state.clock.elapsedTime * 2 + i) * 0.2;
      }
    });
  });

  return (
    <group ref={ringRef}>
      {/* Plate / Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <torusGeometry args={[3, 0.2, 16, 64]} />
        <meshStandardMaterial color="var(--accent)" roughness={0.4} />
      </mesh>
      
      {/* Floating ingredients */}
      {[...Array(6)].map((_, i) => (
        <mesh 
          key={i} 
          ref={(el) => { if (el) ingredientRefs.current[i] = el; }}
          position={[Math.cos((i / 6) * Math.PI * 2) * 2.5, 0, Math.sin((i / 6) * Math.PI * 2) * 2.5]}
        >
          {i % 2 === 0 ? <dodecahedronGeometry args={[0.4]} /> : <octahedronGeometry args={[0.4]} />}
          <meshStandardMaterial color={i % 2 === 0 ? "var(--accent)" : "var(--accent)"} />
        </mesh>
      ))}
    </group>
  );
}

function Coffee() {
  const beanRefs = useRef<THREE.Mesh[]>([]);
  
  useFrame((state) => {
    beanRefs.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;
        mesh.position.y += 0.01;
        if (mesh.position.y > 4) {
          mesh.position.y = -4;
        }
      }
    });
  });

  return (
    <group>
      {/* Steam / Beans */}
      {[...Array(15)].map((_, i) => (
        <mesh 
          key={i} 
          ref={(el) => { if (el) beanRefs.current[i] = el; }}
          position={[(Math.random() - 0.5) * 5, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 5]}
        >
          <capsuleGeometry args={[0.2, 0.3, 4, 8]} />
          <meshStandardMaterial color="var(--accent)" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function IceCream() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={[0, -1, 0]}>
        {/* Cone */}
        <mesh position={[0, -1.5, 0]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[1.5, 3, 16]} />
          <meshStandardMaterial color="var(--accent)" roughness={0.9} />
        </mesh>
        
        {/* Scoops */}
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[1.6, 32, 32]} />
          <meshStandardMaterial color="var(--accent)" roughness={0.3} />
        </mesh>
        <mesh position={[0.5, 2, 0.5]}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshStandardMaterial color="var(--accent)" roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

function Diner() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Checkerboard tile cylinder */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[3, 3, 0.5, 32]} />
        <meshStandardMaterial color="var(--accent)" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Abstract burger stack */}
      <mesh position={[0, 0, 0]}><cylinderGeometry args={[1.5, 1.5, 0.5, 32]} /><meshStandardMaterial color="var(--accent)" /></mesh>
      <mesh position={[0, 0.6, 0]}><cylinderGeometry args={[1.6, 1.6, 0.2, 32]} /><meshStandardMaterial color="var(--accent)" /></mesh>
      <mesh position={[0, 1.2, 0]}><cylinderGeometry args={[1.5, 1.5, 0.5, 32]} /><meshStandardMaterial color="var(--accent)" /></mesh>
    </group>
  );
}

export function HeroFood() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color="var(--accent)" />
      <directionalLight position={[-10, 5, -5]} intensity={0.5} />
      
      {cuisine === "mediterranean" && <Mediterranean />}
      {cuisine === "coffee" && <Coffee />}
      {cuisine === "icecream" && <IceCream />}
      {cuisine === "diner" && <Diner />}
    </>
  );
}
