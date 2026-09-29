"use client";

/**
 * Tabs
 *
 * Horizontal tab switcher with animated underline indicator and
 * cross-fade content transition via Motion.
 *
 * @example
 * ```tsx
 * <Tabs
 *   tabs={[
 *     { label: "Cuts", content: <CutsGrid /> },
 *     { label: "Color", content: <ColorGrid /> },
 *   ]}
 * />
 * ```
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Tab {
  label: string;
  content: React.ReactNode;
}

export function Tabs({ tabs, className }: { tabs: Tab[]; className?: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className={`w-full ${className ?? ""}`}>
      {/* Tab bar */}
      <div className="flex gap-6 md:gap-10 border-b border-[var(--fg-muted)]/20 mb-8 overflow-x-auto">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative pb-3 text-sm md:text-base uppercase tracking-widest min-h-[44px] transition-colors duration-300 ${
              active === i ? "text-[var(--fg)]" : "text-[var(--fg-muted)]"
            }`}
          >
            {tab.label}
            {active === i && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)]"
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {tabs[active].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
