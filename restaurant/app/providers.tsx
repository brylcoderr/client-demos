"use client";

/**
 * Client-side providers wrapper.
 * Keeps the root layout.tsx as a Server Component.
 */

import { SmoothScrollProvider, CustomCursor } from "@client-demos/core";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      {children}
    </SmoothScrollProvider>
  );
}
