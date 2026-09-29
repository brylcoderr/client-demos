"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  SplitTextReveal,
  Reveal,
  Stagger,
  Accordion,
  MagneticButton,
  Footer,
  Drawer,
  useGsapContext
} from "@client-demos/core";
import { ShoppingBag, Star, ArrowRight } from "lucide-react";
import { config } from "../demo.config";
import { Hero3D } from "./components/Hero3D";
import { HorizontalCarousel } from "./components/HorizontalCarousel";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showStickyCart, setShowStickyCart] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const zoomSectionRef = useRef<HTMLElement>(null);
  const zoomImageRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useGsapContext(() => {
    // Show sticky add-to-cart after hero
    if (heroRef.current) {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "bottom top",
        onEnter: () => setShowStickyCart(true),
        onLeaveBack: () => setShowStickyCart(false),
      });
    }

    // Pinned product zoom
    if (zoomSectionRef.current && zoomImageRef.current) {
      gsap.to(zoomImageRef.current, {
        scale: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: zoomSectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
        },
      });
    }
  }, heroRef);

  return (
    <>
      {/* ─── Custom Nav with Cart ────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-5 flex justify-between items-center mix-blend-difference text-white">
        <div className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          {config.brand.name}
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase">
            <a href="#collections" className="hover:text-[var(--accent)] transition-colors">Collections</a>
            <a href="#featured" className="hover:text-[var(--accent)] transition-colors">Featured</a>
            <a href="#reviews" className="hover:text-[var(--accent)] transition-colors">Reviews</a>
          </div>
          <button 
            className="relative w-11 h-11 flex items-center justify-center hover:text-[var(--accent)] transition-colors"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag size={24} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--accent)] rounded-full"></span>
          </button>
        </div>
      </nav>

      {/* ─── Cart Drawer ─────────────────────────────────────────────────── */}
      <Drawer open={isCartOpen} onClose={() => setIsCartOpen(false)} title="Your Cart">
        <div className="flex flex-col h-full">
          <div className="flex-1 flex flex-col gap-6 py-6">
            <div className="flex gap-4 border-b border-[var(--muted)]/20 pb-4">
              <div className="w-20 h-20 bg-[var(--muted)]/20 rounded-md"></div>
              <div className="flex-1">
                <h4 className="font-bold">{config.heroProduct.name}</h4>
                <p className="text-sm text-[var(--muted)]">Qty: 1</p>
                <p className="mt-2 text-[var(--accent)]">{config.heroProduct.price}</p>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-[var(--muted)]/20">
            <div className="flex justify-between mb-4">
              <span className="text-lg">Subtotal</span>
              <span className="text-lg font-bold">{config.heroProduct.price}</span>
            </div>
            <MagneticButton className="w-full py-4 text-center block bg-[var(--fg)] text-[var(--bg)] font-bold uppercase tracking-widest">
              Checkout
            </MagneticButton>
          </div>
        </div>
      </Drawer>

      {/* ─── Sticky Add to Cart ──────────────────────────────────────────── */}
      <AnimatePresence>
        {showStickyCart && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 w-full z-40 bg-[var(--bg)] border-t border-[var(--muted)]/20 p-4 md:p-6 flex justify-between items-center"
          >
            <div className="hidden md:block">
              <h3 className="font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>{config.heroProduct.name}</h3>
              <p className="text-sm text-[var(--muted)]">{config.heroProduct.price}</p>
            </div>
            <MagneticButton className="px-8 py-3 bg-[var(--accent)] text-[var(--bg)] font-bold w-full md:w-auto">
              Add to Cart - {config.heroProduct.price}
            </MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Hero ────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-end md:justify-center px-6 text-center pb-24 md:pb-0">
        <Hero3D />
        
        <div className="relative z-10 pointer-events-none w-full max-w-4xl mx-auto flex flex-col items-center mt-[40vh] md:mt-[30vh]">
          <SplitTextReveal
            text={config.brand.name}
            tag="h1"
            className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tight text-[var(--fg)] drop-shadow-xl"
            style={{ fontFamily: "var(--font-display)" }}
          />
          <Reveal delay={0.3}>
            <p className="mt-4 md:mt-6 text-lg md:text-2xl text-[var(--fg)]/80 max-w-xl bg-[var(--bg)]/30 backdrop-blur-sm p-4 rounded-full">
              {config.brand.tagline}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── Pinned Product Zoom ─────────────────────────────────────────── */}
      <section ref={zoomSectionRef} className="h-screen relative overflow-hidden bg-[var(--bg)]">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div ref={zoomImageRef} className="relative w-full max-w-2xl aspect-square md:aspect-video rounded-2xl overflow-hidden border border-[var(--muted)]/20 shadow-2xl">
            {/* Using a solid color fallback with text if no image exists, but realistically it'd be an image */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg)] to-[var(--muted)]/30 flex items-center justify-center">
               <h2 className="text-4xl md:text-7xl font-bold text-[var(--fg)]/50 mix-blend-overlay" style={{ fontFamily: "var(--font-display)" }}>
                 {config.heroProduct.name}
               </h2>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mix-blend-difference text-white">
           <Reveal>
             <h2 className="text-6xl md:text-9xl font-bold tracking-tighter" style={{ fontFamily: "var(--font-display)" }}>
               Closer Look.
             </h2>
           </Reveal>
        </div>
      </section>

      {/* ─── Featured Product Details ────────────────────────────────────── */}
      <section id="featured" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SplitTextReveal text={config.heroProduct.name} tag="h2" className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }} />
            <Reveal delay={0.2}>
              <p className="text-xl text-[var(--muted)] mb-8 leading-relaxed">
                {config.heroProduct.description}
              </p>
            </Reveal>
            <Stagger className="space-y-4 mb-10">
              {config.heroProduct.features.map(feature => (
                <div key={feature} className="flex items-center gap-3 text-lg border-b border-[var(--muted)]/20 pb-4">
                  <ArrowRight size={20} className="text-[var(--accent)]" />
                  <span>{feature}</span>
                </div>
              ))}
            </Stagger>
            <MagneticButton className="px-8 py-4 bg-[var(--fg)] text-[var(--bg)] font-bold" onClick={() => setIsCartOpen(true)}>
              Buy Now - {config.heroProduct.price}
            </MagneticButton>
          </div>
          <div className="aspect-[4/5] bg-[var(--accent)]/10 rounded-2xl relative overflow-hidden border border-[var(--muted)]/20 flex items-center justify-center">
             <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-tr from-[var(--accent)] to-transparent blur-3xl opacity-30"></div>
          </div>
        </div>
      </section>

      {/* ─── Horizontal Collections Carousel ─────────────────────────────── */}
      <div id="collections">
        <HorizontalCarousel>
          {config.collections.map((collection, i) => (
            <div key={i} className="w-full h-full relative rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-[var(--muted)]/20 transition-transform duration-1000 group-hover:scale-105">
                {/* Fallback pattern since we don't have images */}
                <div className="w-full h-full bg-gradient-to-b from-transparent to-[var(--bg)] opacity-80 z-10 absolute inset-0"></div>
              </div>
              <div className="absolute inset-0 z-20 flex items-end p-8 md:p-16">
                <div>
                  <h3 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
                    {collection.name}
                  </h3>
                  <button className="flex items-center gap-2 text-[var(--accent)] font-semibold uppercase tracking-widest hover:gap-4 transition-all">
                    Shop Collection <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </HorizontalCarousel>
      </div>

      {/* ─── Reviews ─────────────────────────────────────────────────────── */}
      <section id="reviews" className="py-24 px-6 bg-[var(--accent)] text-[var(--bg)]">
        <div className="max-w-4xl mx-auto text-center">
          <SplitTextReveal text="Client Love" tag="h2" className="text-4xl md:text-6xl font-bold mb-16" style={{ fontFamily: "var(--font-display)" }} />
          <Stagger className="grid md:grid-cols-2 gap-12 text-left">
            {config.testimonials.map((t, i) => (
              <div key={i} className="p-8 bg-[var(--bg)] text-[var(--fg)] rounded-2xl">
                <div className="flex text-[var(--accent)] mb-4">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={20} fill="currentColor" />)}
                </div>
                <blockquote className="text-xl mb-6 leading-relaxed">"{t.text}"</blockquote>
                <p className="font-bold uppercase tracking-widest text-sm text-[var(--muted)]">{t.name}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Newsletter ──────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Join the Inner Circle
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[var(--muted)] mb-10 text-lg">
              Subscribe for exclusive releases and insider updates.
            </p>
          </Reveal>
          <form className="flex flex-col md:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-6 py-4 bg-[var(--muted)]/10 rounded-full border border-[var(--muted)]/30 focus:border-[var(--accent)] outline-none transition-colors"
            />
            <MagneticButton className="px-8 py-4 bg-[var(--fg)] text-[var(--bg)] font-bold rounded-full">
              Subscribe
            </MagneticButton>
          </form>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────────────── */}
      <Footer
        brand={config.brand.name}
        links={[
          { label: "Shop", href: "#" },
          { label: "About Us", href: "#" },
          { label: "Contact", href: "#" },
          { label: "Privacy Policy", href: "#" },
        ]}
      />
    </>
  );
}
