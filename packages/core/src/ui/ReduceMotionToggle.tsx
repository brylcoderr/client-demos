"use client";

import React from "react";

/**
 * ReduceMotionToggle
 *
 * A toggle button to let the user prefer reduced motion.
 * For this demo, it just toggles a class on body or uses a simple state.
 * Real implementation might use a context or local storage.
 *
 * @example
 * ```tsx
 * <ReduceMotionToggle />
 * ```
 */
export function ReduceMotionToggle() {
  const toggleMotion = () => {
    document.documentElement.classList.toggle("reduced-motion");
  };

  return (
    <button onClick={toggleMotion} style={{ padding: "0.5rem 1rem", borderRadius: "var(--radius)", background: "var(--muted)", cursor: "pointer", border: "none" }}>
      Toggle Motion
    </button>
  );
}
