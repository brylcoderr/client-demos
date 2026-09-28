"use client";

/**
 * HorizontalScrollSection
 *
 * Pinned horizontal-scroll section using GSAP ScrollTrigger.
 * Falls back to a vertical stack on mobile (< 768px).
 *
 * @example
 * ```tsx
 * <HorizontalScrollSection>
 *   <Panel1 />
 *   <Panel2 />
 *   <Panel3 />
 * </HorizontalScrollSection>
 * ```
 */

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapContext } from "../hooks/useGsapContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HorizontalScrollSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelCount = React.Children.count(children);

  useGsapContext(() => {
    // Disable on mobile — just stack vertically
    if (window.innerWidth < 768 || !containerRef.current || !trackRef.current) return;

    const totalWidth = trackRef.current.scrollWidth - window.innerWidth;

    gsap.to(trackRef.current, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${totalWidth}`,
        invalidateOnRefresh: true,
      },
    });
  }, containerRef);

  return (
    <section ref={containerRef} className={`overflow-hidden ${className ?? ""}`}>
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row"
        style={{ width: `${panelCount * 100}vw` }}
      >
        {React.Children.map(children, (child, i) => (
          <div key={i} className="w-full md:w-screen h-auto md:h-screen flex items-center justify-center p-8 md:p-16 shrink-0">
            {child}
          </div>
        ))}
      </div>
    </section>
  );
}
