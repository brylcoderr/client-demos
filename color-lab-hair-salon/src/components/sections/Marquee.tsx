"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function Marquee() {
  const text = "Balayage · Hair Color · Bleaching · Scalp Massage · Curl Styling · Full Transformation · ";
  const repeats = 4;
  
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const tl = gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: 15,
        repeat: -1
      });

      let scrollTimeout: NodeJS.Timeout;

      ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const direction = velocity > 0 ? 1 : -1;
          const targetTimeScale = 1 + Math.abs(velocity / 1000); 
          
          gsap.to(tl, { timeScale: targetTimeScale * direction, duration: 0.1 });
          gsap.to(containerRef.current, { skewY: (velocity / 2000) - 1.5, duration: 0.1 });

          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            gsap.to(tl, { timeScale: 1, duration: 0.5 });
            gsap.to(containerRef.current, { skewY: -1.5, duration: 0.5 });
          }, 150);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-6 bg-surface overflow-hidden border-y border-border origin-center -skew-y-[1.5deg] z-10">
      <div className="flex whitespace-nowrap overflow-hidden">
        <div ref={trackRef} className="flex min-w-max">
          {[0, 1].map((set) => (
            <div key={set} className="flex">
              {[...Array(repeats)].map((_, i) => (
                <span
                  key={i}
                  className="text-2xl md:text-4xl font-display text-accent mx-4 select-none uppercase tracking-wide"
                >
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

