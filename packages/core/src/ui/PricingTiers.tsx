"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGsapContext } from "../hooks/useGsapContext";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * PricingTiers
 *
 * Displays pricing tiers with a staggered entrance animation.
 *
 * @example
 * ```tsx
 * <PricingTiers tiers={[{ name: "Basic", price: "$10", features: ["A", "B"] }]} />
 * ```
 */
export function PricingTiers({ tiers }: { tiers: Array<{ name: string; price: string; features: string[] }> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGsapContext(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.fromTo(
      ".pricing-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, containerRef);

  return (
    <div ref={containerRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
      {tiers.map((tier, idx) => (
        <div key={idx} className="pricing-card" style={{ padding: "2rem", border: "1px solid var(--muted)", borderRadius: "var(--radius)" }}>
          <h3>{tier.name}</h3>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{tier.price}</div>
          <ul style={{ paddingLeft: "1.5rem" }}>
            {tier.features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
