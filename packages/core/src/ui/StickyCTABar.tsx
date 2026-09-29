"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGsapContext } from "../hooks/useGsapContext";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * StickyCTABar
 *
 * A sticky CTA bar that slides up from the bottom when scrolled past a certain point.
 *
 * @example
 * ```tsx
 * <StickyCTABar>
 *   <button>Book Now</button>
 * </StickyCTABar>
 * ```
 */
export function StickyCTABar({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGsapContext(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.to(containerRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "body",
        start: "500px top",
        toggleActions: "play reverse play reverse",
      },
    });
  }, containerRef);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        padding: "1rem",
        background: "var(--bg)",
        borderTop: "1px solid var(--muted)",
        transform: prefersReducedMotion ? "none" : "translateY(100%)",
        opacity: prefersReducedMotion ? 1 : 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
}
