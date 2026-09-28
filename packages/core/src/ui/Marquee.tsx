"use client";

/**
 * Marquee
 *
 * Infinitely scrolling text strip using CSS transform (no layout shifts).
 * Pausable on hover. Speed reacts to scroll velocity via GSAP.
 *
 * @example
 * ```tsx
 * <Marquee items={["Hair Color", "Balayage", "Highlights"]} speed={40} />
 * ```
 */

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapContext } from "../hooks/useGsapContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MarqueeProps {
  items: string[];
  speed?: number;
  separator?: string;
  className?: string;
}

export function Marquee({ items, speed = 40, separator = " · ", className }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    if (!trackRef.current || !containerRef.current) return;

    // Base infinite loop
    const tl = gsap.to(trackRef.current, {
      xPercent: -50,
      ease: "none",
      duration: items.join(separator).length / speed,
      repeat: -1,
    });

    // Speed boost on scroll
    ScrollTrigger.create({
      trigger: containerRef.current,
      onUpdate(self) {
        const v = Math.abs(self.getVelocity());
        gsap.to(tl, { timeScale: 1 + v / 2000, duration: 0.3, overwrite: true });
        gsap.to(tl, { timeScale: 1, duration: 1, delay: 0.3, overwrite: "auto" });
      },
    });
  }, containerRef);

  const strip = items.join(separator) + separator;

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap py-5 border-y border-[var(--muted)]/20 group ${className ?? ""}`}
    >
      <div ref={trackRef} className="inline-flex">
        {/* Two copies for seamless loop */}
        {[0, 1].map((n) => (
          <span
            key={n}
            className="text-3xl md:text-5xl tracking-wider uppercase px-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--accent)" }}
          >
            {strip}
          </span>
        ))}
      </div>
    </div>
  );
}
