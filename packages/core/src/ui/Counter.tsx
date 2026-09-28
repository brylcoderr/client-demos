"use client";

/**
 * Counter
 *
 * Animates a number from 0 → target using GSAP, triggered on scroll.
 *
 * @example
 * ```tsx
 * <Counter target={250} suffix="+" label="Happy Clients" />
 * ```
 */

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapContext } from "../hooks/useGsapContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CounterProps {
  target: number;
  label: string;
  suffix?: string;
  className?: string;
}

export function Counter({ target, label, suffix = "", className }: CounterProps) {
  const numRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    if (!numRef.current) return;
    const obj = { val: 0 };

    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: "power2.out",
      snap: { val: 1 },
      scrollTrigger: {
        trigger: wrapRef.current,
        start: "top 80%",
      },
      onUpdate() {
        if (numRef.current) numRef.current.textContent = String(obj.val) + suffix;
      },
    });
  }, wrapRef);

  return (
    <div ref={wrapRef} className={`flex flex-col items-center gap-2 ${className ?? ""}`}>
      <span
        ref={numRef}
        className="text-5xl md:text-7xl font-bold"
        style={{ fontFamily: "var(--font-display)", color: "var(--accent)" }}
      >
        0{suffix}
      </span>
      <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--muted)]">{label}</span>
    </div>
  );
}
