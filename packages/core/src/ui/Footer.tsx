/**
 * Footer
 *
 * Minimal footer with brand name, nav links, and copyright.
 * Accepts theme via CSS variables.
 *
 * @example
 * ```tsx
 * <Footer
 *   brand="Studio X"
 *   links={[
 *     { label: "Instagram", href: "#" },
 *     { label: "Privacy", href: "/privacy" },
 *   ]}
 * />
 * ```
 */

import React from "react";

interface FooterLink {
  label: string;
  href: string;
}

export function Footer({ brand, links, className }: { brand: string; links: FooterLink[]; className?: string }) {
  return (
    <footer className={`w-full border-t border-[var(--muted)]/20 mt-32 py-12 px-6 md:px-16 ${className ?? ""}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <span className="text-xl" style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}>
          {brand}
        </span>

        <nav className="flex flex-wrap gap-6 text-sm text-[var(--muted)]">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="hover:text-[var(--accent)] transition-colors min-h-[44px] flex items-center">
              {l.label}
            </a>
          ))}
        </nav>

        <span className="text-xs text-[var(--muted)]">
          © {new Date().getFullYear()} {brand}. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
