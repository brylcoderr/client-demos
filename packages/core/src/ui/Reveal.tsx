"use client";

/**
 * Reveal
 *
 * Fades and slides children into view using Motion's whileInView.
 * Animates only transform + opacity (no layout shifts).
 *
 * @example
 * ```tsx
 * <Reveal delay={0.2}>
 *   <p>This content fades up when scrolled into view.</p>
 * </Reveal>
 * ```
 */

import React from "react";
import { motion } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

const dirMap = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
};

export function Reveal({ children, delay = 0, className, direction = "up" }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...dirMap[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
