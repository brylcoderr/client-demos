"use client";

/**
 * SmoothScrollProvider
 *
 * Wraps children with Lenis smooth-scroll, synced to GSAP's ticker
 * so ScrollTrigger animations stay perfectly in sync.
 *
 * - Registers ScrollTrigger once on mount.
 * - Automatically disabled when the user prefers reduced motion.
 * - Cleans up Lenis + ticker on unmount.
 *
 * @example
 * ```tsx
 * // app/layout.tsx
 * import { SmoothScrollProvider } from "@client-demos/core";
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="en">
 *       <body>
 *         <SmoothScrollProvider>{children}</SmoothScrollProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Sync Lenis scroll position → ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's unified ticker (time is in seconds)
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
