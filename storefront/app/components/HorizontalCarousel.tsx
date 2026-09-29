"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapContext } from "@client-demos/core";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HorizontalCarousel({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelCount = React.Children.count(children);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
  }, []);

  useGsapContext(() => {
    // Only apply GSAP pinning on desktop
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
    <section ref={containerRef} className="overflow-hidden md:h-screen w-full relative">
      {/* Mobile: native horizontal scroll (snap), Desktop: GSAP horizontal translation */}
      <div
        ref={trackRef}
        className="flex md:h-screen w-full overflow-x-auto snap-x snap-mandatory md:overflow-x-visible md:snap-none hide-scrollbar"
        style={{ width: isDesktop ? `${panelCount * 100}vw` : 'auto' }}
      >
        {React.Children.map(children, (child, i) => (
          <div key={i} className="w-[85vw] md:w-screen h-[60vh] md:h-screen flex items-center justify-center p-4 md:p-16 shrink-0 snap-center">
            {child}
          </div>
        ))}
      </div>
    </section>
  );
}
