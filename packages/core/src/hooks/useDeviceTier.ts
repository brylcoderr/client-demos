"use client";

/**
 * useDeviceTier
 *
 * Classifies the device as 'low' or 'high' based on viewport width,
 * navigator.hardwareConcurrency, and pointer coarseness.
 *
 * @example
 * ```tsx
 * const tier = useDeviceTier();
 * if (tier === "low") return <SimpleFallback />;
 * ```
 */

import { useState, useEffect } from "react";

export type DeviceTier = "low" | "high";

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("high");

  useEffect(() => {
    const narrow = window.innerWidth < 768;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const fewCores = (navigator.hardwareConcurrency ?? 4) < 4;
    setTier(narrow || coarse || fewCores ? "low" : "high");
  }, []);

  return tier;
}
