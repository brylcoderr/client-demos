"use client";

import { MagneticButton } from "@client-demos/core";

export function MagneticLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <MagneticButton 
      onClick={() => window.location.href = href} 
      className={className}
    >
      {children}
    </MagneticButton>
  );
}
