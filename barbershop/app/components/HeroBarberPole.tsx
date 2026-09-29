"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import { getToken } from "../../lib/token";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float time;
uniform vec3 colorRed;
uniform vec3 colorWhite;
uniform vec3 colorBlue;
varying vec2 vUv;

void main() {
  // Angle for the helix (diagonal stripes)
  float angle = vUv.y * 15.0 - vUv.x * 3.14159 * 2.0 - time * 3.0;
  
  // Sine wave to generate bands
  float stripe = sin(angle);
  
  vec3 color = colorWhite;
  
  if (stripe > 0.33) {
    color = colorRed;
  } else if (stripe < -0.33) {
    color = colorBlue;
  }
  
  // Add some simple shading
  float shadow = 0.5 + 0.5 * sin(vUv.x * 3.14159);
  
  gl_FragColor = vec4(color * shadow, 1.0);
}
`;

function HairClippings() {
  const count = 60; // 60 particles mobile per spec
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 10,
        speed: 0.01 + Math.random() * 0.02,
        rotSpeed: Math.random() * 0.1
      });
    }
    return temp;
  }, [count]);

  const accent = typeof window !== 'undefined' ? getToken('--accent') || 'gold' : 'gold';

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    particles.forEach((particle, i) => {
      particle.y -= particle.speed + delta;
      if (particle.y < -5) particle.y = 5;
      
      dummy.position.set(particle.x, particle.y, particle.z);
      dummy.rotation.x += particle.rotSpeed;
      dummy.rotation.y += particle.rotSpeed;
      dummy.scale.set(0.1, 0.02, 0.02);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry />
      <meshBasicMaterial color={accent} />
    </instancedMesh>
  );
}

export function HeroBarberPole() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);

  const accent = typeof window !== 'undefined' ? getToken('--accent') || 'gold' : 'gold';
  
  // Read pole colors
  const poleRedStr = typeof window !== 'undefined' ? getToken('--pole-red') || 'darkred' : 'darkred';
  const poleWhiteStr = typeof window !== 'undefined' ? getToken('--pole-white') || 'white' : 'white';
  const poleBlueStr = typeof window !== 'undefined' ? getToken('--pole-blue') || 'darkblue' : 'darkblue';

  const uniforms = useMemo(() => ({
    time: { value: 0 },
    colorRed: { value: new THREE.Color(poleRedStr) },
    colorWhite: { value: new THREE.Color(poleWhiteStr) },
    colorBlue: { value: new THREE.Color(poleBlueStr) }
  }), [poleRedStr, poleWhiteStr, poleBlueStr]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
    if (groupRef.current) {
      const targetX = (state.pointer.x * 0.5);
      const targetY = (state.pointer.y * 0.5);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
    }
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      
      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <group rotation={[0, 0, 0]}>
            <mesh position={[0, 2.6, 0]}>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial color={accent} metalness={0.8} roughness={0.2} />
            </mesh>
            
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.5, 0.5, 5, 32]} />
              <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
              />
            </mesh>
            
            <mesh position={[0, -2.6, 0]}>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial color={accent} metalness={0.8} roughness={0.2} />
            </mesh>
          </group>
        </Float>
      </group>

      <HairClippings />
    </>
  );
}
