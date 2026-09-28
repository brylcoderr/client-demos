"use client";

/**
 * useScrollVelocity
 *
 * Returns the current scroll velocity (px/s) via ScrollTrigger.
 *
 * @example
 * ```tsx
 * const velocity = useScrollVelocity();
 * // use velocity to scale marquee speed, parallax intensity, etc.
 * ```
 */

import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useScrollVelocity(): number {
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    const st = ScrollTrigger.create({
      onUpdate: (self) => setVelocity(self.getVelocity()),
    });
    return () => st.kill();
  }, []);

  return velocity;
}
