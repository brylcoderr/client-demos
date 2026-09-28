"use client";

/**
 * Modal
 *
 * Accessible overlay modal with backdrop blur, focus trap concept,
 * and Motion enter/exit animations.
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 * <button onClick={() => setOpen(true)}>Open</button>
 * <Modal open={open} onClose={() => setOpen(false)} title="Book Now">
 *   <p>Modal content here</p>
 * </Modal>
 * ```
 */

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-lg bg-[var(--bg)] border border-[var(--muted)]/20 p-8 shadow-2xl"
            style={{ borderRadius: "var(--radius)" }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            {/* Close button */}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
