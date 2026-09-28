"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const REVIEWS = [
  {
    name: "Wendi Marissa",
    text: "She is a true master stylist of everything. She delivered an absolutely epic transformation that left me speechless.",
  },
  {
    name: "Muhammad Waqas",
    text: "Helen is the best hairdresser around! Highly skilled, attentive, and really understands how to work with different hair textures.",
  },
  {
    name: "Sarah Lin",
    text: "I've been going to Color Lab 1 for years. Helen's balayage technique is unmatched. The grow-out is always so seamless.",
  },
  {
    name: "Emily Chen",
    text: "Finally found someone who can lighten my dark Asian hair without destroying it. The blonde is icy and perfect.",
  },
  {
    name: "Jessica R.",
    text: "The scalp massage before the color service is heavenly. The whole experience feels like luxury from start to finish.",
  },
];

export function Reviews() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: "start",
    loop: true,
    skipSnaps: false,
    dragFree: true
  });
  
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="reviews" className="py-32 bg-surface relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-border w-full" />
      <div className="container mx-auto px-6">
        <SectionLabel>Client Love</SectionLabel>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <motion.h2 
            className="font-display text-4xl md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            287 reasons to visit.
          </motion.h2>
          
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <button 
              onClick={scrollPrev} 
              disabled={!canScrollPrev}
              className="w-12 h-12 border border-border flex items-center justify-center rounded-full hover:border-accent hover:text-accent transition-colors disabled:opacity-30 disabled:hover:border-border disabled:hover:text-text-primary"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="w-12 h-12 border border-border flex items-center justify-center rounded-full hover:border-accent hover:text-accent transition-colors disabled:opacity-30 disabled:hover:border-border disabled:hover:text-text-primary"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Carousel */}
        <motion.div 
          className="embla -mx-6 px-6 cursor-none" 
          ref={emblaRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          data-cursor="DRAG"
        >
          <div className="embla__container flex gap-6">
            {REVIEWS.map((review, i) => (
              <div key={i} className="embla__slide flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_35%]">
                <div className="h-full bg-card border border-border p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-8 text-accent">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <blockquote className="font-display italic text-2xl md:text-3xl text-text-primary mb-12 leading-relaxed">
                      &quot;{review.text}&quot;
                    </blockquote>
                  </div>
                  <div>
                    <p className="font-body font-medium text-text-primary uppercase tracking-widest text-xs mb-1">
                      {review.name}
                    </p>
                    <p className="font-body text-xs text-text-muted">
                      Verified Google Review
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Aggregate Score */}
        <motion.div 
          className="mt-24 flex flex-col items-center justify-center text-center border-t border-border pt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className="font-display text-8xl text-text-primary mb-4 leading-none">4.5</span>
          <div className="flex gap-2 text-accent mb-4">
            {[...Array(4)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-current" />
            ))}
            <div className="relative w-6 h-6">
              <Star className="w-6 h-6 text-border absolute top-0 left-0" />
              <div className="overflow-hidden w-[50%] absolute top-0 left-0 text-accent">
                <Star className="w-6 h-6 fill-current" />
              </div>
            </div>
          </div>
          <p className="font-body text-text-muted uppercase tracking-widest text-sm">
            287 Google Reviews
          </p>
        </motion.div>
      </div>
    </section>
  );
}

