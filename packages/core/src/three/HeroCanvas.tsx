"use client";

/**
 * HeroCanvas
 *
 * Dynamic-imported R3F Canvas wrapper with smart defaults:
 * - dpr clamped to [1, 1.5] for perf
 * - frameloop="demand" when off-screen (IntersectionObserver)
 * - CSS-gradient fallback when device tier is "low" or reduced motion
 * - Suspense boundary with a custom fallback node
 *
 * @example
 * ```tsx
 * import { HeroCanvas } from "@client-demos/core";
 * import MyScene from "./MyScene";
 *
 * <HeroCanvas
 *   scene={<MyScene />}
 *   fallback={<div className="hero-gradient" />}
 * />
 * ```
 */

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useDeviceTier } from "../hooks/useDeviceTier";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface HeroCanvasProps {
  /** The R3F scene content (lights, meshes, etc.) */
  scene: React.ReactNode;
  /** Fallback shown while loading or on low-tier / reduced-motion devices */
  fallback: React.ReactNode;
  /** Extra className on the wrapper div */
  className?: string;
}

export function HeroCanvas({ scene, fallback, className = "" }: HeroCanvasProps) {
  const tier = useDeviceTier();
  const reducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  // Pause the render loop when the canvas scrolls out of view
  useEffect(() => {
    if (!wrapperRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  // Low-tier or reduced-motion → show the CSS fallback instead
  if (tier === "low" || reducedMotion) {
    return <div className={className}>{fallback}</div>;
  }

  return (
    <div ref={wrapperRef} className={`${className} pointer-events-none`}>
      <Suspense fallback={fallback}>
        <Canvas dpr={[1, 1.5]} frameloop={inView ? "always" : "demand"}>
          {scene}
        </Canvas>
      </Suspense>
    </div>
  );
}
