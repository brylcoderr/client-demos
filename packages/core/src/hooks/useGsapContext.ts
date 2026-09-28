"use client";

/**
 * useGsapContext
 *
 * Creates a gsap.context scoped to a ref, and reverts it on unmount.
 * Every GSAP animation in the monorepo should use this hook.
 *
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 * useGsapContext(() => {
 *   gsap.to(".box", { x: 100 });
 * }, containerRef);
 * ```
 */

import { useEffect, useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useGsapContext(
  callback: (ctx: gsap.Context) => void,
  scope?: RefObject<HTMLElement | null>,
  deps: React.DependencyList = []
) {
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(callback, scope?.current ?? undefined);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
