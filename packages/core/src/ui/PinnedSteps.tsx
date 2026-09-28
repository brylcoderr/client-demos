"use client";

/**
 * PinnedSteps
 *
 * Stacked pinned cards that layer on top of each other as the user scrolls.
 * Great for process / "How it works" sections.
 *
 * @example
 * ```tsx
 * <PinnedSteps
 *   steps={[
 *     { title: "01 — Consult", description: "We discuss your goals." },
 *     { title: "02 — Create",  description: "We craft the look." },
 *   ]}
 * />
 * ```
 */

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapContext } from "../hooks/useGsapContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Step {
  title: string;
  description: string;
}

export function PinnedSteps({ steps, className }: { steps: Step[]; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    if (!containerRef.current) return;
    const cards = gsap.utils.toArray<HTMLElement>(".pinned-step-card", containerRef.current);

    cards.forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: `top ${20 + i * 2}%`,
        endTrigger: containerRef.current!,
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
      });
    });
  }, containerRef);

  return (
    <div ref={containerRef} className={`relative py-32 ${className ?? ""}`}>
      {steps.map((step, i) => (
        <div
          key={i}
          className="pinned-step-card max-w-3xl mx-auto mb-8 p-8 md:p-12 border border-[var(--muted)]/20 bg-[var(--bg)] shadow-2xl"
          style={{ borderRadius: "var(--radius)" }}
        >
          <h3 className="text-2xl md:text-4xl mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--accent)" }}>
            {step.title}
          </h3>
          <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
