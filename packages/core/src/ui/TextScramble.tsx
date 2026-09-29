"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGsapContext } from "../hooks/useGsapContext";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * TextScramble
 *
 * Scrambles text characters on mount or when scrolled into view.
 *
 * @example
 * ```tsx
 * <TextScramble text="Hello World" />
 * ```
 */
export function TextScramble({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState(prefersReducedMotion ? text : "");

  useGsapContext(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const chars = "!<>-_\\\\/[]{}—=+*^?#________";
    let progress = { value: 0 };

    gsap.to(progress, {
      value: 1,
      duration: 1.5,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      },
      onUpdate: () => {
        const p = progress.value;
        const result = text.split("").map((char, index) => {
          if (char === " ") return " ";
          if (index < p * text.length) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        });
        setDisplayText(result.join(""));
      },
      onComplete: () => setDisplayText(text)
    });
  }, containerRef);

  return (
    <span ref={containerRef} className={className}>
      {displayText}
    </span>
  );
}
