"use client";

/**
 * MagneticButton
 *
 * Button that magnetically follows the cursor within its bounds.
 * Spring-based return to center on mouse leave.
 *
 * @example
 * ```tsx
 * <MagneticButton>Book Now</MagneticButton>
 * ```
 */

import React, { useRef, useState } from "react";
import { motion } from "motion/react";

export function MagneticButton({
  children,
  className,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - (left + width / 2)) * 0.25,
      y: (e.clientY - (top + height / 2)) * 0.25,
    });
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`min-h-[44px] bg-[var(--accent)] text-[var(--bg)] font-semibold uppercase tracking-widest text-sm py-4 px-8 hover:opacity-90 transition-opacity ${className ?? ""}`}
      style={{ borderRadius: "var(--radius)" }}
    >
      {children}
    </motion.button>
  );
}
