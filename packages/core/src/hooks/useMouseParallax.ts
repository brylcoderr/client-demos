"use client";

/**
 * useMouseParallax
 *
 * Returns an `{ x, y }` offset in px based on cursor position,
 * useful for subtle parallax on hero images or cards.
 *
 * @param multiplier  Sensitivity factor (default 0.05)
 *
 * @example
 * ```tsx
 * const { x, y } = useMouseParallax(0.03);
 * <div style={{ transform: `translate(${x}px, ${y}px)` }} />
 * ```
 */

import { useState, useEffect } from "react";

export function useMouseParallax(multiplier = 0.05) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * multiplier * 100;
      const y = (e.clientY / window.innerHeight - 0.5) * multiplier * 100;
      setOffset({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [multiplier]);

  return offset;
}
