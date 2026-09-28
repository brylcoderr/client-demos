"use client";

/**
 * Accordion
 *
 * Expandable FAQ / info sections with smooth height animation via Motion.
 * Only one panel open at a time. 44px min touch targets.
 *
 * @example
 * ```tsx
 * <Accordion
 *   items={[
 *     { title: "How long does it take?", content: "About 2 hours." },
 *   ]}
 * />
 * ```
 */

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface AccordionItem {
  title: string;
  content: string;
}

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className={`w-full max-w-2xl mx-auto border-t border-[var(--muted)]/20 ${className ?? ""}`}>
      {items.map((item, i) => (
        <div key={i} className="border-b border-[var(--muted)]/20 overflow-hidden">
          <button
            className="w-full min-h-[44px] py-5 px-1 flex justify-between items-center text-left hover:text-[var(--accent)] transition-colors duration-300"
            onClick={() => setActive(active === i ? null : i)}
            aria-expanded={active === i}
          >
            <span className="text-lg md:text-2xl" style={{ fontFamily: "var(--font-display)" }}>
              {item.title}
            </span>
            <motion.span
              animate={{ rotate: active === i ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl leading-none"
            >
              +
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {active === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className="pb-6 px-1 text-[var(--muted)] leading-relaxed">{item.content}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
