"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapContext } from "@client-demos/core";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrubReveal({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const elRef = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    if (!elRef.current) return;
    gsap.fromTo(
      elRef.current,
      { opacity: 0, y: 100, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: elRef.current,
          start: "top 95%",
          end: "top 40%",
          scrub: 1,
        }
      }
    );
  }, elRef);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
}
