"use client";

/**
 * Drawer
 *
 * Slide-in side panel (right by default). Uses Motion for enter/exit.
 * Locks body scroll and closes on Escape.
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 * <Drawer open={open} onClose={() => setOpen(false)} title="Cart">
 *   <CartItems />
 * </Drawer>
 * ```
 */

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  side?: "left" | "right";
}

export function Drawer({ open, onClose, title, children, side = "right" }: DrawerProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const xInit = side === "right" ? "100%" : "-100%";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100]"
        >
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />

          <motion.aside
            initial={{ x: xInit }}
            animate={{ x: 0 }}
            exit={{ x: xInit }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute top-0 bottom-0 ${side === "right" ? "right-0" : "left-0"} w-full max-w-md bg-[var(--bg)] border-l border-[var(--muted)]/20 p-8 overflow-y-auto`}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
              aria-label="Close"
            >
              ✕
            </button>

            {title && (
              <h2 className="text-2xl mb-6" style={{ fontFamily: "var(--font-display)" }}>
                {title}
              </h2>
            )}

            {children}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
