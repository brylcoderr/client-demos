"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGsapContext } from "../hooks/useGsapContext";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * Timeline
 *
 * A vertical timeline that reveals items on scroll.
 *
 * @example
 * ```tsx
 * <Timeline items={[{ title: "Step 1", description: "Do this" }]} />
 * ```
 */
export function Timeline({ items }: { items: Array<{ title: string; description: string }> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGsapContext(() => {
    if (prefersReducedMotion || !containerRef.current) return;
    
    const elements = gsap.utils.toArray<HTMLElement>(".timeline-item", containerRef.current);
    elements.forEach((el, i) => {
      gsap.fromTo(el, 
        { opacity: 0, x: -30 }, 
        { 
          opacity: 1, x: 0, 
          scrollTrigger: { trigger: el, start: "top 85%" }
        }
      );
    });
  }, containerRef);

  return (
    <div ref={containerRef} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {items.map((item, idx) => (
        <div key={idx} className="timeline-item" style={{ borderLeft: "2px solid var(--accent)", paddingLeft: "1rem" }}>
          <h3 style={{ margin: "0 0 0.5rem 0", color: "var(--accent)" }}>{item.title}</h3>
          <p style={{ margin: 0, color: "var(--muted)" }}>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
