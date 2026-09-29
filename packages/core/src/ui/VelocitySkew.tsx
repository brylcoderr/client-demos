"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGsapContext } from "../hooks/useGsapContext";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useScrollVelocity } from "../hooks/useScrollVelocity";

/**
 * VelocitySkew
 *
 * Skews content based on scroll velocity.
 *
 * @example
 * ```tsx
 * <VelocitySkew>
 *   <img src="foo.jpg" />
 * </VelocitySkew>
 * ```
 */
export function VelocitySkew({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const velocity = useScrollVelocity();

  useGsapContext(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.to(containerRef.current, {
      skewY: velocity * 0.05,
      duration: 0.1,
      overwrite: "auto"
    });
  }, containerRef, [velocity]);

  return (
    <div ref={containerRef} style={{ transformOrigin: "center center" }}>
      {children}
    </div>
  );
}
