"use client";

import React, { useState, useRef, useEffect, useReducer } from "react";
import {
  SplitTextReveal,
  Reveal,
  Stagger,
  MagneticButton,
  Footer,
  useGsapContext
} from "@client-demos/core";
import { ShoppingBag, Star, ArrowRight, X, Heart, Plus, Minus } from "lucide-react";
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

// ─── Cart Reducer ──────────────────────────────────────────────────────────
type CartState = { items: { id: string; qty: number }[]; isOpen: boolean };
type CartAction = 
  | { type: "ADD"; id: string }
  | { type: "REMOVE"; id: string }
  | { type: "INC"; id: string }
  | { type: "DEC"; id: string }
  | { type: "TOGGLE" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD":
      if (state.items.find(i => i.id === action.id)) {
        return { ...state, items: state.items.map(i => i.id === action.id ? { ...i, qty: i.qty + 1 } : i), isOpen: true };
      }
      return { ...state, items: [...state.items, { id: action.id, qty: 1 }], isOpen: true };
    case "REMOVE":
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case "INC":
      return { ...state, items: state.items.map(i => i.id === action.id ? { ...i, qty: i.qty + 1 } : i) };
    case "DEC":
      return { ...state, items: state.items.map(i => i.id === action.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i) };
    case "TOGGLE":
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
}

export default function Home() {
  const [cart, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });
  const [showStickyCart, setShowStickyCart] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [ageVerified, setAgeVerified] = useState(false);
  
  const heroRef = useRef<HTMLElement>(null);
  const zoomSectionRef = useRef<HTMLElement>(null);
  const zoomImageRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Animations
  useGsapContext(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    // Refresh after fonts/images load
    setTimeout(() => ScrollTrigger.refresh(), 500);
    window.addEventListener('load', () => ScrollTrigger.refresh());

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
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to(zoomImageRef.current, {
          scale: prefersReduced ? 1 : 1.5,
          ease: "none",
          scrollTrigger: {
            trigger: zoomSectionRef.current,
            start: "top top",
            end: "+=100%",
            scrub: true,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true
          },
        });
      });
    }
  }, heroRef);

  // Cart Focus Trap & Esc
  useEffect(() => {
    if (!cart.isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch({ type: "TOGGLE" });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cart.isOpen]);

  if (!ageVerified) {
    return (
      <main className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-[var(--bg)] text-[var(--fg)]">
        <div role="dialog" aria-labelledby="age-gate-title" aria-modal="true" className="text-center max-w-md p-8">
          <h1 id="age-gate-title" className="text-4xl mb-4 font-bold" style={{ fontFamily: "var(--font-display)" }}>Are you over 18?</h1>
          <p className="text-[var(--fg-muted)] mb-8">Please verify your age to enter.</p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => setAgeVerified(true)} className="min-w-[120px] min-h-[44px] bg-[var(--accent)] text-[var(--on-accent)] rounded-[var(--radius)] font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]">Yes</button>
            <button onClick={() => window.location.href = "https://google.com"} className="min-w-[120px] min-h-[44px] bg-[var(--surface-2)] text-[var(--fg)] rounded-[var(--radius)] font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]">No</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      {/* ─── Custom Nav ─────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 w-full z-[var(--z-nav)] px-6 py-4 flex justify-between items-center transition-all duration-300 ${scrolled ? "bg-[var(--bg)]/85 backdrop-blur-md shadow-sm border-b border-[var(--border)]" : "bg-transparent"}`}>
        <div className="text-2xl font-bold tracking-tight text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }}>
          {config.brand.name}
        </div>
        <div className="flex items-center gap-8 text-[var(--fg)]">
          <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase">
            <a href="#collections" className="min-h-[44px] flex items-center hover:text-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]">Collections</a>
            <a href="#featured" className="min-h-[44px] flex items-center hover:text-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]">Featured</a>
            <a href="#reviews" className="min-h-[44px] flex items-center hover:text-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]">Reviews</a>
          </div>
          <button 
            className="relative min-w-[44px] min-h-[44px] flex items-center justify-center hover:text-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
            onClick={() => dispatch({ type: "TOGGLE" })}
            aria-label="Cart"
          >
            <ShoppingBag size={24} />
            {cart.items.length > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--accent)] rounded-full"></span>}
          </button>
        </div>
      </nav>

      {/* ─── Cart Drawer ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {cart.isOpen && (
          <div className="fixed inset-0 z-[var(--z-drawer)] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => dispatch({ type: "TOGGLE" })}
              className="absolute inset-0" 
              style={{ background: "linear-gradient(to right, color-mix(in srgb, var(--scrim) 60%, transparent), color-mix(in srgb, var(--scrim) 60%, transparent))" }}
            />
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }} 
              transition={{ type: "tween", ease: "circOut", duration: 0.3 }}
              className="relative w-full max-w-md bg-[var(--bg)] h-full shadow-2xl flex flex-col"
              ref={cartRef}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex justify-between items-center p-6 border-b border-[var(--border)]">
                <h2 className="text-2xl font-bold text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }}>Your Cart</h2>
                <button onClick={() => dispatch({ type: "TOGGLE" })} className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[var(--fg)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                {cart.items.length === 0 ? (
                  <p className="text-[var(--fg-muted)]">Your cart is empty.</p>
                ) : (
                  <div className="flex flex-col gap-6">
                    {cart.items.map(item => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b border-[var(--border)]">
                        <div className="w-24 h-24 relative rounded-[var(--radius)] overflow-hidden bg-[var(--surface)] shrink-0">
                          <Image src="/images/hero-ring.jpg" alt="Product" fill className="object-cover" sizes="96px" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-bold text-[var(--fg)]">{config.heroProduct.name}</h4>
                            <p className="text-[var(--accent)] font-medium">{config.heroProduct.price}</p>
                          </div>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
                              <button onClick={() => dispatch({ type: "DEC", id: item.id })} className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[var(--fg)] hover:bg-[var(--surface)]"><Minus size={16} /></button>
                              <span className="min-w-[24px] text-center text-[var(--fg)]">{item.qty}</span>
                              <button onClick={() => dispatch({ type: "INC", id: item.id })} className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[var(--fg)] hover:bg-[var(--surface)]"><Plus size={16} /></button>
                            </div>
                            <button onClick={() => dispatch({ type: "REMOVE", id: item.id })} className="min-w-[44px] min-h-[44px] text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] underline">Remove</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-6 border-t border-[var(--border)] bg-[var(--surface)]">
                <div className="flex justify-between mb-6 text-[var(--fg)]">
                  <span className="text-lg">Subtotal</span>
                  <span className="text-lg font-bold">{config.heroProduct.price}</span>
                </div>
                <button className="w-full min-h-[44px] py-4 bg-[var(--accent)] text-[var(--on-accent)] font-bold uppercase tracking-widest rounded-[var(--radius)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] hover:brightness-110 transition-all">
                  Checkout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Sticky Add to Cart ──────────────────────────────────────────── */}
      <AnimatePresence>
        {showStickyCart && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 w-full z-[calc(var(--z-drawer)-1)] bg-[var(--surface)] border-t border-[var(--border)] p-4 md:px-6 flex justify-between items-center shadow-2xl"
          >
            <div className="hidden md:block">
              <h3 className="font-bold text-lg text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }}>{config.heroProduct.name}</h3>
              <p className="text-sm text-[var(--fg-muted)]">{config.heroProduct.price}</p>
            </div>
            <button onClick={() => dispatch({ type: "ADD", id: "hero" })} className="px-8 min-h-[44px] py-3 bg-[var(--accent)] text-[var(--on-accent)] font-bold w-full md:w-auto rounded-[var(--radius)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] hover:brightness-110 transition-all">
              Add to Cart - {config.heroProduct.price}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Hero ────────────────────────────────────────────────────────── */}
      <section ref={heroRef} data-surface="base" className="relative min-h-[100svh] w-full flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <div className="absolute inset-0 z-[var(--z-base)] pointer-events-none">
          <Hero3D />
        </div>
        
        <div className="relative z-[var(--z-content)] pointer-events-none w-full max-w-4xl mx-auto flex flex-col items-center mt-32 scrim-bottom pb-16 pt-32 h-full justify-end">
          <SplitTextReveal
            text={config.brand.name}
            tag="h1"
            className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tight text-[var(--fg)] drop-shadow-xl"
            style={{ fontFamily: "var(--font-display)" }}
          />
          <Reveal delay={0.3}>
            <p className="mt-4 md:mt-6 text-lg md:text-2xl text-[var(--fg)] max-w-xl font-light leading-relaxed">
              {config.brand.tagline}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── Pinned Product Zoom ─────────────────────────────────────────── */}
      <section ref={zoomSectionRef} data-surface="raised" className="min-h-[100svh] w-full relative overflow-hidden flex flex-col items-center pt-24 md:pt-0 md:justify-center px-6">
        <div className="relative z-[var(--z-content)] w-full max-w-5xl mx-auto flex flex-col items-center">
          <div ref={zoomImageRef} className="relative w-full max-w-xl aspect-square md:aspect-video rounded-[var(--radius)] overflow-hidden shadow-2xl bg-[var(--surface-2)] mb-8 shrink-0">
             <Image src="/images/hero-ring.jpg" alt={config.heroProduct.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM1NTUiLz48L3N2Zz4=" />
          </div>
          
          <div className="text-center z-[var(--z-content)] bg-[var(--surface)] p-6 rounded-[var(--radius)] shadow-xl w-full max-w-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-3xl font-bold text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }}>{config.heroProduct.name}</h2>
                <p className="text-xl text-[var(--fg-muted)] mt-1">{config.heroProduct.price}</p>
              </div>
              <button onClick={() => setWishlist(!wishlist)} className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[var(--accent)] hover:bg-[var(--surface-2)] rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)]">
                <Heart size={24} fill={wishlist ? "currentColor" : "none"} />
              </button>
            </div>
            <button onClick={() => dispatch({ type: "ADD", id: "hero" })} className="w-full min-h-[44px] py-4 bg-[var(--accent)] text-[var(--on-accent)] font-bold uppercase tracking-widest rounded-[var(--radius)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] hover:brightness-110 transition-all">
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* ─── Featured Product Details ────────────────────────────────────── */}
      <section id="featured" data-surface="base" className="py-32 px-6 relative z-[var(--z-content)]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SplitTextReveal text={config.heroProduct.name} tag="h2" className="text-4xl md:text-6xl font-bold mb-6 text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }} />
            <Reveal delay={0.2}>
              <p className="text-xl text-[var(--fg-muted)] mb-12 leading-relaxed font-light">
                {config.heroProduct.description}
              </p>
            </Reveal>
            <Stagger className="space-y-6 mb-12">
              {config.heroProduct.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-4 text-lg border-b border-[var(--border)] pb-6 text-[var(--fg)]">
                  <ArrowRight size={24} className="text-[var(--accent)] shrink-0" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </Stagger>
            <button onClick={() => dispatch({ type: "ADD", id: "hero" })} className="min-w-[44px] px-8 py-4 bg-[var(--accent)] text-[var(--on-accent)] font-bold rounded-[var(--radius)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] hover:brightness-110 transition-all uppercase tracking-widest">
              Buy Now - {config.heroProduct.price}
            </button>
          </div>
          <div className="aspect-[4/5] bg-[var(--surface)] rounded-[var(--radius)] relative overflow-hidden flex items-center justify-center">
             <Image src="/images/collection-model.jpg" alt="Model" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM1NTUiLz48L3N2Zz4=" />
          </div>
        </div>
      </section>

      {/* ─── Horizontal Collections Carousel ─────────────────────────────── */}
      <section id="collections" data-surface="raised" className="py-32 relative z-[var(--z-content)] overflow-hidden">
        <div className="px-6 max-w-7xl mx-auto mb-16">
          <h2 className="text-5xl md:text-7xl font-bold text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }}>Curated Collections</h2>
        </div>
        <HorizontalCarousel>
          {config.collections.map((collection, i) => (
            <div key={i} className="w-full h-full relative rounded-[var(--radius)] overflow-hidden group bg-[var(--surface-2)]">
              <Image src={`/images/product-${i + 1}.jpg`} alt={collection.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM1NTUiLz48L3N2Zz4=" />
              <div className="absolute inset-0 scrim-bottom z-10"></div>
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
                <h3 className="text-3xl md:text-5xl font-bold mb-6 text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }}>
                  {collection.name}
                </h3>
                <button className="flex items-center gap-4 text-[var(--accent)] font-bold uppercase tracking-widest hover:gap-6 transition-all min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] w-max">
                  Shop Collection <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </HorizontalCarousel>
      </section>

      {/* ─── Reviews ─────────────────────────────────────────────────────── */}
      <section id="reviews" data-surface="accent" className="py-32 px-6 relative z-[var(--z-content)]">
        <div className="max-w-6xl mx-auto text-center">
          <SplitTextReveal text="Client Love" tag="h2" className="text-5xl md:text-7xl font-bold mb-20 text-[var(--on-accent)]" style={{ fontFamily: "var(--font-display)" }} />
          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {config.testimonials.map((t, i) => (
              <div key={i} className="p-8 bg-[var(--bg)] text-[var(--fg)] rounded-[var(--radius)] shadow-xl flex flex-col justify-between h-full">
                <div>
                  <div className="flex text-[var(--accent)] mb-6">
                    {[...Array(t.rating)].map((_, j) => <Star key={j} size={20} fill="currentColor" />)}
                  </div>
                  <blockquote className="text-xl mb-8 leading-relaxed font-light italic">"{t.text}"</blockquote>
                </div>
                <p className="font-bold uppercase tracking-widest text-sm text-[var(--fg-muted)]">— {t.name}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Newsletter ──────────────────────────────────────────────────── */}
      <section data-surface="base" className="py-32 px-6 relative z-[var(--z-content)]">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }}>
              Join the Inner Circle
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[var(--fg-muted)] mb-12 text-lg font-light">
              Subscribe for exclusive releases and insider updates.
            </p>
          </Reveal>
          <form className="flex flex-col md:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-6 min-h-[56px] bg-[var(--surface)] text-[var(--fg)] rounded-[var(--radius)] border border-[var(--border)] focus:border-[var(--accent)] outline-none transition-colors placeholder:text-[var(--fg-muted)]"
              required
            />
            <button type="submit" className="min-w-[160px] min-h-[56px] px-8 bg-[var(--accent)] text-[var(--on-accent)] font-bold rounded-[var(--radius)] uppercase tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] hover:brightness-110 transition-all">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────────────── */}
      <div data-surface="raised" className="relative z-[var(--z-content)] border-t border-[var(--border)]">
        <Footer
          brand={config.brand.name}
          links={[
            { label: "Shop", href: "#" },
            { label: "About Us", href: "#" },
            { label: "Contact", href: "#" },
            { label: "Privacy Policy", href: "#" },
          ]}
        />
      </div>
    </>
  );
}
