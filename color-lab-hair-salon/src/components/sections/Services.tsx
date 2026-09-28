"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const services = [
  {
    num: "01",
    title: "Balayage",
    desc: "Sun-kissed gradients, hand-painted to your face shape",
    price: "From $250",
  },
  {
    num: "02",
    title: "Full Color",
    desc: "Root-to-tip transformation, seamlessly blended",
    price: "From $180",
  },
  {
    num: "03",
    title: "Bleaching",
    desc: "Safe, precise lightening for bold results",
    price: "From $200",
  },
  {
    num: "04",
    title: "Scalp Massage",
    desc: "Tension-release ritual, pre-treatment",
    price: "From $45",
  },
  {
    num: "05",
    title: "Curl Styling",
    desc: "Any curl pattern — defined, bouncy, lasting",
    price: "From $85",
  },
  {
    num: "06",
    title: "Transformations",
    desc: "Complete reinvention. Before and after guaranteed.",
    price: "Consultation",
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingText = "Every service. Perfected.";
  const words = headingText.split(" ");

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    const ctx = gsap.context(() => {
       const wordElements = gsap.utils.toArray('.word-reveal');
       gsap.fromTo(wordElements, 
         { opacity: 0.1, y: 20 },
         {
           opacity: 1,
           y: 0,
           stagger: 0.1,
           ease: "power2.out",
           scrollTrigger: {
             trigger: sectionRef.current,
             start: "top 75%",
             end: "top 40%",
             scrub: 1,
           }
         }
       );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-32 bg-surface relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-border w-full" />
      <div className="container mx-auto px-6">
        <SectionLabel>What We Do</SectionLabel>
        
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-16 md:mb-24 flex flex-wrap gap-x-3">
          {words.map((word, i) => (
             <span key={i} className="word-reveal opacity-10">{word}</span>
          ))}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-t border-l border-border">
          {services.map((svc, i) => (
            <motion.div
              key={svc.num}
              className="group relative p-8 md:p-12 border-b border-r border-border hover:bg-card transition-colors duration-500 flex flex-col justify-between min-h-[320px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="flex justify-between items-start mb-8">
                <span className="text-eyebrow text-text-muted group-hover:text-accent transition-colors duration-500">
                  {svc.num}
                </span>
                <span className="font-body text-sm text-text-muted">
                  {svc.price}
                </span>
              </div>
              
              <div>
                <h3 className="font-display text-3xl md:text-4xl mb-4 text-text-primary">
                  {svc.title}
                </h3>
                <p className="font-body text-text-muted font-light">
                  {svc.desc}
                </p>
              </div>

              {/* Animated bottom border on hover */}
              <div className="absolute bottom-0 left-0 h-[2px] bg-accent w-0 group-hover:w-full transition-all duration-700 ease-out" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

