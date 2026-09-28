"use client";

/**
 * StickyNav
 *
 * Fixed top nav with mix-blend-difference text. Animated full-screen
 * mobile menu powered by Motion.
 *
 * @example
 * ```tsx
 * <StickyNav
 *   logo={<span>BRAND</span>}
 *   links={[
 *     { label: "Services", href: "#services" },
 *     { label: "Contact", href: "#contact" },
 *   ]}
 * />
 * ```
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface NavLink {
  label: string;
  href: string;
}

export function StickyNav({ logo, links }: { logo: React.ReactNode; links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-6 py-5 flex justify-between items-center text-[var(--fg)]">
        <div className="text-xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          {logo}
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-[var(--accent)] transition-colors duration-300">
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger – min 44px touch target */}
        <button
          className="md:hidden flex flex-col gap-[5px] w-11 h-11 items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} className="block w-6 h-[2px] bg-current origin-center" />
          <motion.span animate={{ opacity: open ? 0 : 1 }} className="block w-6 h-[2px] bg-current" />
          <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} className="block w-6 h-[2px] bg-current origin-center" />
        </button>
      </nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-[var(--bg)] z-40 flex flex-col items-center justify-center gap-10"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.08 }}
                className="text-4xl text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
