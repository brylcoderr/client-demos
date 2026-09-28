"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop", alt: "Balayage styling" },
  { src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop", alt: "Salon interior" },
  { src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800&auto=format&fit=crop", alt: "Hair color application" },
  { src: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=800&auto=format&fit=crop", alt: "Blonde highlights" },
  { src: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop", alt: "Hair salon station" },
  { src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop", alt: "Hair transformation" },
  { src: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=800&auto=format&fit=crop", alt: "Styling process" },
  { src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop", alt: "Finished balayage" },
];

export function Gallery() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    // Check if mobile, parallax usually looks better disabled or reduced on small screens
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.gallery-item');
      items.forEach((item, i) => {
        // Middle column moves slightly faster down the page
        const speed = i % 3 === 1 ? 50 : 0; 
        if (speed !== 0) {
           gsap.to(item, {
             y: speed,
             ease: "none",
             scrollTrigger: {
               trigger: gridRef.current,
               start: "top bottom",
               end: "bottom top",
               scrub: true,
             }
           });
        }
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" className="py-32 container mx-auto px-6">
      <SectionLabel>The Work</SectionLabel>
      
      <motion.h2 
        className="font-display text-4xl md:text-5xl lg:text-6xl mb-16 md:mb-24"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        Results that speak.
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={gridRef}>
        {IMAGES.map((img, i) => (
          <motion.div
            key={i}
            className="gallery-item relative overflow-hidden group border border-border"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
            data-cursor="VIEW"
          >
            <div className="relative w-full aspect-[4/5]">
              <div className="absolute inset-0 bg-background/10 mix-blend-overlay z-10 transition-opacity group-hover:opacity-0 duration-500 pointer-events-none" />
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent z-20 transition-colors duration-500 pointer-events-none" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

