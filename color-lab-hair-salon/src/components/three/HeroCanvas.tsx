"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FiberSystem() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Create 300 strands of hair/fiber, each with 60 segments
  const strandCount = 300;
  const segments = 60;
  const vertexCount = strandCount * segments;
  
  const { positions, indices, uvs } = useMemo(() => {
    const p = new Float32Array(vertexCount * 3);
    const uvArray = new Float32Array(vertexCount * 2);
    const ind = [];
    
    for (let i = 0; i < strandCount; i++) {
      // eslint-disable-next-line react-hooks/purity
      const startX = (Math.random() - 0.5) * 20;
      // eslint-disable-next-line react-hooks/purity
      const startY = (Math.random() - 0.5) * 20;
      // eslint-disable-next-line react-hooks/purity
      const startZ = (Math.random() - 0.5) * 10 - 2;
      
      // eslint-disable-next-line react-hooks/purity
      const strandOffset = Math.random() * 100;
      
      for (let j = 0; j < segments; j++) {
        const idx = (i * segments + j) * 3;
        p[idx] = startX;
        p[idx + 1] = startY - (j * 0.15); // Drop down
        p[idx + 2] = startZ;
        
        // Pass normalized position along strand (0 to 1) and random strand ID to shader
        uvArray[(i * segments + j) * 2] = j / segments; 
        uvArray[(i * segments + j) * 2 + 1] = strandOffset;
        
        if (j < segments - 1) {
          ind.push(i * segments + j, i * segments + j + 1);
        }
      }
    }
    return { positions: p, indices: new Uint16Array(ind), uvs: uvArray };
  }, [vertexCount]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColor: { value: new THREE.Color("var(--accent)") } // The exact website gold
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uMouse.value.x += (state.mouse.x * 2.0 - materialRef.current.uniforms.uMouse.value.x) * 0.05;
      materialRef.current.uniforms.uMouse.value.y += (state.mouse.y * 2.0 - materialRef.current.uniforms.uMouse.value.y) * 0.05;
    }
  });

  const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    varying float vAlpha;
    
    // UV x = progress along strand (0.0 to 1.0)
    // UV y = random strand offset
    
    void main() {
      vec3 pos = position;
      
      float progress = uv.x;
      float offset = uv.y;
      
      // Elegant flowing wave logic
      float wave1 = sin(pos.y * 0.5 + uTime * 0.5 + offset) * 1.5;
      float wave2 = cos(pos.y * 0.3 - uTime * 0.3 + offset * 0.5) * 1.0;
      
      // Displacement scales up as it goes down the strand
      pos.x += wave1 * progress;
      pos.z += wave2 * progress;
      
      // Mouse interaction causes strands to gracefully sway
      pos.x += uMouse.x * progress * 0.5;
      pos.y += uMouse.y * progress * 0.5;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      // Fade out ends of strands
      vAlpha = smoothstep(0.0, 0.2, progress) * smoothstep(1.0, 0.6, progress);
    }
  `;

  const fragmentShader = `
    uniform vec3 uColor;
    varying float vAlpha;
    
    void main() {
      // Soft glowing lines
      gl_FragColor = vec4(uColor, vAlpha * 0.3);
    }
  `;

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-uv" args={[uvs, 2]} />
        <bufferAttribute attach="index" args={[indices, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

export function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0 hidden md:block opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]} eventSource={typeof document !== 'undefined' ? document.body : undefined}>
        <Suspense fallback={null}>
          <FiberSystem />
        </Suspense>
      </Canvas>
    </div>
  );
}
