"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGsapContext } from "../hooks/useGsapContext";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * DiagonalWipe
 *
 * An elegant diagonal wipe effect on scroll.
 * Animates only transform and opacity.
 *
 * @example
 * ```tsx
 * <DiagonalWipe>
 *   <div className="h-screen bg-accent" />
 * </DiagonalWipe>
 * ```
 */
export function DiagonalWipe({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGsapContext(() => {
    if (prefersReducedMotion || !containerRef.current || !wipeRef.current) return;

    gsap.fromTo(
      wipeRef.current,
      { yPercent: 100, rotation: 5, scale: 1.1, opacity: 0 },
      {
        yPercent: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          end: "top 30%",
          scrub: true,
        },
      }
    );
  }, containerRef);

  return (
    <div ref={containerRef} style={{ overflow: "hidden", position: "relative" }} className="w-full h-full">
      <div ref={wipeRef} className="w-full h-full">{children}</div>
    </div>
  );
}
