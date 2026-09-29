"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGsapContext } from "../hooks/useGsapContext";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * MapBlock
 *
 * A stylized map container that animates in.
 *
 * @example
 * ```tsx
 * <MapBlock address="123 Fake St." />
 * ```
 */
export function MapBlock({ address }: { address: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGsapContext(() => {
    if (prefersReducedMotion || !containerRef.current) return;
    
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });
  }, containerRef);

  return (
    <div ref={containerRef} className="map-block" style={{ width: "100%", height: "400px", background: "var(--muted)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p>Map Placeholder: {address}</p>
    </div>
  );
}
