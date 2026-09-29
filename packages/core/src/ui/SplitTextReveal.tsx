"use client";

/**
 * SplitTextReveal
 *
 * Splits text into words, wraps each in an overflow-hidden mask,
 * and animates them upward on scroll via GSAP ScrollTrigger.
 *
 * Uses a manual word-split approach (no premium SplitText plugin needed,
 * though GSAP's free SplitText works too).
 *
 * @example
 * ```tsx
 * <SplitTextReveal
 *   text="Elevate your look"
 *   tag="h2"
 *   className="text-5xl"
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

interface SplitTextRevealProps {
  text: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  style?: React.CSSProperties;
}

export function SplitTextReveal({ text, tag: Tag = "h2", className = "", style = {} }: SplitTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    if (!containerRef.current) return;
    const spans = containerRef.current.querySelectorAll<HTMLElement>(".stl-word-inner");

    gsap.fromTo(
      spans,
      { yPercent: 110 },
      {
        yPercent: 0,
        stagger: 0.04,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      }
    );
  }, containerRef);

  const words = text.split(" ");

  return (
    <div ref={containerRef}>
      <Tag className={`${className} flex flex-wrap`} style={{ fontFamily: "var(--font-display)", ...style }}>
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block mr-[0.3em] pb-1">
            <span className="stl-word-inner inline-block">{word}</span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
