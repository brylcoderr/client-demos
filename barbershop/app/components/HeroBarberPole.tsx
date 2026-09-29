"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float time;
varying vec2 vUv;

void main() {
  // Angle for the helix (diagonal stripes)
  float angle = vUv.y * 15.0 - vUv.x * 3.14159 * 2.0 - time * 3.0;
  
  // Sine wave to generate bands
  float stripe = sin(angle);
  
  vec3 color = vec3(1.0, 1.0, 1.0); // white
  
  if (stripe > 0.33) {
    color = vec3(0.8, 0.1, 0.1); // red
  } else if (stripe < -0.33) {
    color = vec3(0.1, 0.2, 0.8); // blue
  }
  
  // Add some simple shading
  float shadow = 0.5 + 0.5 * sin(vUv.x * 3.14159);
  
  gl_FragColor = vec4(color * shadow, 1.0);
}
`;

function HairClippings() {
  const count = 100;
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

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    particles.forEach((particle, i) => {
      // Drift downwards and rotate
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
      <meshBasicMaterial color="#1a1a1a" />
    </instancedMesh>
  );
}

export function HeroBarberPole() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
    if (groupRef.current) {
      // Parallax effect based on pointer
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
          {/* Main Barber Pole */}
          <group rotation={[0, 0, 0]}>
            {/* Pole Cap Top */}
            <mesh position={[0, 2.6, 0]}>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial color="#C9A227" metalness={0.8} roughness={0.2} />
            </mesh>
            
            {/* Pole Cylinder */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.5, 0.5, 5, 32]} />
              <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{
                  time: { value: 0 }
                }}
              />
            </mesh>
            
            {/* Pole Cap Bottom */}
            <mesh position={[0, -2.6, 0]}>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial color="#C9A227" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>
        </Float>
      </group>

      <HairClippings />
    </>
  );
}
