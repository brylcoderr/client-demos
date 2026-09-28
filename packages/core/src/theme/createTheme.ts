/**
 * createTheme
 *
 * Applies a DemoConfig's theme object as CSS custom properties on <html>.
 * Call once in your root layout's client-side effect.
 *
 * @example
 * ```tsx
 * "use client";
 * import { createTheme } from "@client-demos/core";
 * import { config } from "../demo.config";
 * useEffect(() => createTheme(config.theme), []);
 * ```
 */

import type { DemoConfig } from "../config/types";

export function createTheme(theme: DemoConfig["theme"]) {
  if (typeof document === "undefined") return;
  const s = document.documentElement.style;
  s.setProperty("--bg", theme.bg);
  s.setProperty("--fg", theme.fg);
  s.setProperty("--muted", theme.muted);
  s.setProperty("--accent", theme.accent);
  s.setProperty("--accent-2", theme.accent2);
  s.setProperty("--radius", theme.radius);
  s.setProperty("--font-display", theme.fontDisplay);
  s.setProperty("--font-body", theme.fontBody);
}
