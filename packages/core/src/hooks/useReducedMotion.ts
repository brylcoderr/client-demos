"use client";

/**
 * useReducedMotion
 *
 * Returns `true` when the user's OS-level "prefers-reduced-motion" is set.
 * Listens for live changes.
 *
 * @example
 * ```tsx
 * const reduced = useReducedMotion();
 * if (reduced) return <StaticHero />;
 * ```
 */

import { useState, useEffect } from "react";

export function useReducedMotion(): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMatches(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return matches;
}
