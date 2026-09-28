"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import gsap from "gsap";

const HeroCanvas = dynamic(
  () => import("@/components/three/HeroCanvas").then((mod) => mod.HeroCanvas),
  { ssr: false }
);

export function Hero() {
  const h1Text = "Color that defines you.";
  const words = h1Text.split(" ");
  
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(preloaderRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut",
        delay: 0.4,
      });
    });
    return () => ctx.revert();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 1.2 * i }, // delayed to account for preloader
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
    },
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-background">
      {/* GSAP Preloader */}
      <div 
        ref={preloaderRef}
        className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="font-display text-4xl text-text-primary flex items-center gap-3">
           <Image src="/logo.jpg" alt="Color Lab 1 Logo" width={64} height={64} className="rounded-full border border-border" />
           <span className="tracking-wide">Color Lab 1<span className="text-accent">.</span></span>
        </div>
      </div>

      {/* Mobile Gradient Fallback */}
      <div className="absolute inset-0 md:hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2a2211] via-background to-background opacity-60" />
      
      <HeroCanvas />

      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center mt-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-eyebrow text-text-muted mb-8"
        >
          Bay Ridge, Brooklyn · Est. 2020
        </motion.p>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="visible"
          className="font-display text-[clamp(64px,8vw,120px)] leading-[0.9] tracking-tight mb-8 max-w-4xl flex flex-wrap justify-center gap-x-4"
        >
          {words.map((word, index) => (
            <motion.span variants={child} key={index} className="inline-block">
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-body text-text-muted text-lg md:text-xl max-w-xl mx-auto mb-12 font-light"
        >
          Precision color studio helmed by Helen — where transformation is the standard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Button asChild size="lg">
            <a href="https://book.squareup.com/appointments/65fcf06a-2b8e-47d5-8f50-3bfc9ecb746c/location/6KJC3F0ZJYJ7F/services?rwg_token=AE37R_iNQOjFYnq6W8oweF-BotqtgniprDfA-fpKZgFx4MYtnwsGQLRiACmhcD4TMey8MCOuiTrKUEAvFfkXaparbnw-5bbw1A%3D%3D" target="_blank" rel="noopener noreferrer">
              Book Appointment
            </a>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <a href="#gallery">
              Explore Work <ArrowDown className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Bottom Left Badge */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="absolute bottom-8 left-6 md:left-12 hidden md:flex items-center gap-2"
      >
        <span className="text-accent text-lg">★</span>
        <span className="font-body text-sm text-text-muted">
          <strong className="text-text-primary font-medium">4.5</strong> Google · 287 reviews
        </span>
      </motion.div>

      {/* Bottom Right Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="absolute bottom-8 right-6 md:right-12 flex flex-col items-center gap-4"
      >
        <span className="text-eyebrow text-[10px] text-text-muted" style={{ writingMode: 'vertical-rl' }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-accent to-transparent"
        />
      </motion.div>
    </section>
  );
}
