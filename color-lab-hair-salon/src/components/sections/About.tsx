"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-32 container mx-auto px-6 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        
        {/* Left Col: Image */}
        <motion.div 
          className="lg:col-span-5 relative aspect-[3/4] w-full bg-surface overflow-hidden"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-accent mix-blend-multiply opacity-20 z-10 transition-opacity hover:opacity-0 duration-700 pointer-events-none" />
          <Image
            ref={imageRef}
            src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1000&auto=format&fit=crop"
            alt="Helen at work in the salon"
            fill
            className="object-cover scale-[1.15] origin-top"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </motion.div>

        {/* Right Col: Content */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <SectionLabel>The Stylist</SectionLabel>
          
          <motion.h2 
            className="font-display text-4xl md:text-5xl lg:text-6xl mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            Helen knows exactly what your hair needs.
          </motion.h2>

          <motion.div 
            className="flex flex-col gap-6 font-body text-text-muted text-lg max-w-xl font-light mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p>
              With over a decade of precision color experience, Helen approaches every appointment not just as a service, but as a complete structural and visual transformation.
            </p>
            <p>
              We specialize in complex balayage, safe bleaching protocols, and comprehensive color corrections that other salons turn away. 
            </p>
            <p>
              Trust is earned at the chair. Whether you&apos;re looking for subtle dimension or a completely new identity, we ensure the integrity of your hair always comes first.
            </p>
          </motion.div>

          <motion.blockquote 
            className="mb-12 border-l-2 border-accent pl-6 py-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="font-display italic text-2xl md:text-3xl text-text-primary mb-4 leading-snug max-w-lg">
              &quot;She delivered an absolutely epic transformation.&quot;
            </p>
            <footer className="text-sm font-body text-text-muted">
              — Wendi M., verified Google review
            </footer>
          </motion.blockquote>

          <motion.div
            className="flex items-center gap-8 w-full justify-between sm:justify-start"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button asChild variant="ghost">
              <a href="https://book.squareup.com/appointments/65fcf06a-2b8e-47d5-8f50-3bfc9ecb746c/location/6KJC3F0ZJYJ7F/services?rwg_token=AE37R_iNQOjFYnq6W8oweF-BotqtgniprDfA-fpKZgFx4MYtnwsGQLRiACmhcD4TMey8MCOuiTrKUEAvFfkXaparbnw-5bbw1A%3D%3D" target="_blank" rel="noopener noreferrer">
                Meet Helen →
              </a>
            </Button>
            <Badge variant="outline" className="border-accent text-accent">
              Asian-Owned
            </Badge>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

