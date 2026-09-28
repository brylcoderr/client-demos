"use client";

/**
 * CustomCursor
 *
 * Spring-physics custom cursor (desktop only, hidden on touch devices).
 * Supports `data-cursor="TEXT"` on any element to show contextual labels.
 * Grows on hover over links/buttons. Mix-blend-difference for visibility.
 *
 * @example
 * ```tsx
 * // Add once in layout.tsx
 * <CustomCursor />
 *
 * // Then on any element:
 * <img data-cursor="VIEW" src="..." />
 * ```
 */

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";

export function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true);
  const [label, setLabel] = useState("");
  const [hovering, setHovering] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const sx = useSpring(mx, { damping: 25, stiffness: 300, mass: 0.5 });
  const sy = useSpring(my, { damping: 25, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setTimeout(() => setIsTouch(coarse), 0);
    if (coarse) return;

    const onMove = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const cursorEl = el?.closest("[data-cursor]") as HTMLElement | null;
      const interactive = el?.closest("a, button") as HTMLElement | null;

      const newLabel = cursorEl?.getAttribute("data-cursor") ?? "";
      const isHover = !!(cursorEl || interactive);
      const size = newLabel ? 72 : isHover ? 48 : 24;

      setLabel(newLabel);
      setHovering(isHover);
      mx.set(e.clientX - size / 2);
      my.set(e.clientY - size / 2);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  if (isTouch) return null;

  const size = label ? 72 : hovering ? 48 : 24;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full border border-[var(--accent)] pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
      style={{ x: sx, y: sy }}
      animate={{
        width: size,
        height: size,
        backgroundColor: hovering ? "var(--accent)" : "rgba(0,0,0,0)",
      }}
      transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
    >
      <AnimatePresence>
        {label && (
          <motion.span
            key={label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-[9px] font-bold tracking-widest text-[var(--bg)] uppercase"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
