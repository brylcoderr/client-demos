"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function BookingCTA() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section className="w-full relative py-32 md:py-48 bg-[linear-gradient(135deg,#1A1400_0%,#0D0D0D_60%,#1C1700_100%)] overflow-hidden">
      {/* Background visual noise / texture could go here if needed, keeping it clean for now */}
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center max-w-4xl mx-auto"
        >
          <motion.h2 
            variants={item}
            className="font-display text-[clamp(48px,6vw,96px)] leading-[1] tracking-tight mb-8"
          >
            Ready for your<br />transformation?
          </motion.h2>

          <motion.p 
            variants={item}
            className="font-body text-text-muted text-xl md:text-2xl font-light mb-16"
          >
            Helen is booking now. Spots fill fast.
          </motion.p>

          <motion.div 
            variants={item}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Button asChild size="lg" className="min-w-[200px]">
              <a href="https://book.squareup.com/appointments/65fcf06a-2b8e-47d5-8f50-3bfc9ecb746c/location/6KJC3F0ZJYJ7F/services?rwg_token=AE37R_iNQOjFYnq6W8oweF-BotqtgniprDfA-fpKZgFx4MYtnwsGQLRiACmhcD4TMey8MCOuiTrKUEAvFfkXaparbnw-5bbw1A%3D%3D" target="_blank" rel="noopener noreferrer">
                Book Online
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg" className="min-w-[200px]">
              <a href="tel:9173765481">
                Text Us: 917-376-5481
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
