"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  SplitTextReveal,
  Reveal,
  Stagger,
  Counter,
  ContactForm,
  MagneticButton,
  Footer,
  useGsapContext
} from "@client-demos/core";
import { config } from "../demo.config";
import { Hero3DRealEstate } from "./components/Hero3DRealEstate";
import { Search, MapPin, Home, DollarSign, Star, Heart, X, Calculator } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const navLinks = [
  { label: "Listings", href: "#listings" },
  { label: "Neighborhoods", href: "#neighborhoods" },
  { label: "Journey", href: "#journey" },
  { label: "Valuation", href: "#valuation" },
];

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [showMortgage, setShowMortgage] = useState(false);
  
  const journeyRef = useRef<HTMLElement>(null);
  const journeyContentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGsapContext(() => {
    setTimeout(() => ScrollTrigger.refresh(), 500);
    window.addEventListener('load', () => ScrollTrigger.refresh());

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      if (journeyRef.current && journeyContentRef.current) {
        ScrollTrigger.create({
          trigger: journeyRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          animation: gsap.to(journeyContentRef.current, {
            y: () => -(journeyContentRef.current!.scrollHeight - window.innerHeight + 100),
            ease: "none"
          }),
          scrub: true
        });
      }
    });
  }, journeyRef);

  // Focus trap for Modal
  useEffect(() => {
    if (!showMortgage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowMortgage(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showMortgage]);

  const filters = ["All", "Houses", "Condos", "Townhomes"];

  return (
    <main>
      {/* ─── Custom Sticky Nav ─────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 w-full z-[var(--z-nav)] px-6 py-4 flex justify-between items-center transition-all duration-300 ${scrolled ? "bg-[var(--bg)]/85 backdrop-blur-md shadow-sm border-b border-[var(--border)]" : "bg-transparent"}`}>
        <div className="text-2xl font-bold tracking-tight text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }}>
          {config.brand.name}
        </div>
        <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase text-[var(--fg)]">
          {navLinks.map(link => (
            <a key={link.label} href={link.href} className="min-h-[44px] flex items-center hover:text-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]">
              {link.label}
            </a>
          ))}
          <button onClick={() => setShowMortgage(true)} className="min-h-[44px] flex items-center hover:text-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]">
            <Calculator size={18} className="mr-2" /> Calculator
          </button>
        </div>
      </nav>

      {/* ─── Mortgage Calculator Modal ─────────────────────────────────────── */}
      <AnimatePresence>
        {showMortgage && (
          <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowMortgage(false)}
              className="absolute inset-0 bg-[var(--scrim)]/80 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="relative w-full max-w-md bg-[var(--surface)] text-[var(--fg)] rounded-[var(--radius)] shadow-2xl overflow-hidden border border-[var(--border)]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mortgage-title"
            >
              <div className="flex justify-between items-center p-6 border-b border-[var(--muted)]/20">
                <h2 id="mortgage-title" className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Mortgage Calculator</h2>
                <button aria-label="Close" onClick={() => setShowMortgage(false)} className="min-w-[44px] min-h-[44px] flex items-center justify-center hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)]">
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <label className="flex flex-col gap-2">
                  <span className="font-bold text-sm uppercase tracking-widest text-[var(--fg-muted)]">Home Price ($)</span>
                  <input type="number" defaultValue="1000000" className="w-full min-h-[44px] px-4 bg-[var(--bg)] border border-[var(--muted)]/30 rounded-[var(--radius)] focus:border-[var(--accent)] outline-none text-[var(--fg)]" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-bold text-sm uppercase tracking-widest text-[var(--fg-muted)]">Down Payment (%)</span>
                  <input type="number" defaultValue="20" className="w-full min-h-[44px] px-4 bg-[var(--bg)] border border-[var(--muted)]/30 rounded-[var(--radius)] focus:border-[var(--accent)] outline-none text-[var(--fg)]" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-bold text-sm uppercase tracking-widest text-[var(--fg-muted)]">Interest Rate (%)</span>
                  <input type="number" defaultValue="6.5" step="0.1" className="w-full min-h-[44px] px-4 bg-[var(--bg)] border border-[var(--muted)]/30 rounded-[var(--radius)] focus:border-[var(--accent)] outline-none text-[var(--fg)]" />
                </label>
                <button className="w-full min-h-[44px] mt-4 bg-[var(--accent)] text-[var(--on-accent)] font-bold uppercase tracking-widest rounded-[var(--radius)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] transition-all">
                  Calculate
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Hero with Search ──────────────────────────────────────────────── */}
      <section data-surface="base" className="relative min-h-[100svh] flex flex-col items-center justify-end md:justify-center px-6 pt-32 pb-24 text-center">
        <Hero3DRealEstate />
        
        <div className="absolute inset-0 z-[calc(var(--z-base)+1)] pointer-events-none scrim-bottom" />

        <div className="relative z-[var(--z-content)] w-full max-w-5xl mx-auto flex flex-col items-center pointer-events-none mt-[20vh] md:mt-auto">
          <SplitTextReveal
            text={config.brand.name}
            tag="h1"
            className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tight drop-shadow-xl"
          />
          <Reveal delay={0.3}>
            <p className="mt-6 text-xl md:text-2xl text-[var(--fg)] font-medium">
              {config.brand.tagline}
            </p>
          </Reveal>
        </div>

        {/* Search Bar UI */}
        <div data-surface="raised" className="relative z-[var(--z-content)] w-full max-w-4xl mx-auto mt-16 p-4 shadow-2xl flex flex-col md:flex-row gap-4 pointer-events-auto rounded-[var(--radius)] border border-[var(--muted)]/10">
          <div className="flex-1 flex items-center gap-3 border-b md:border-b-0 md:border-r border-[var(--muted)]/20 pb-4 md:pb-0 md:pr-4">
            <MapPin className="text-[var(--accent)]" size={20} />
            <select aria-label="Location" className="w-full bg-transparent outline-none text-[var(--fg)] cursor-pointer appearance-none min-h-[44px]">
              <option value="">Location</option>
              {config.searchOptions.locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>
          <div className="flex-1 flex items-center gap-3 border-b md:border-b-0 md:border-r border-[var(--muted)]/20 pb-4 md:pb-0 md:pr-4">
            <Home className="text-[var(--accent)]" size={20} />
            <select aria-label="Property Type" className="w-full bg-transparent outline-none text-[var(--fg)] cursor-pointer appearance-none min-h-[44px]">
              <option value="">Property Type</option>
              {config.searchOptions.types.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div className="flex-1 flex items-center gap-3 pb-4 md:pb-0">
            <DollarSign className="text-[var(--accent)]" size={20} />
            <select aria-label="Price Range" className="w-full bg-transparent outline-none text-[var(--fg)] cursor-pointer appearance-none min-h-[44px]">
              <option value="">Price Range</option>
              <option value="1m-2m">$1M - $2M</option>
              <option value="2m-5m">$2M - $5M</option>
              <option value="5m+">$5M+</option>
            </select>
          </div>
          <button className="bg-[var(--accent)] text-[var(--on-accent)] min-h-[44px] px-8 py-3 font-bold flex items-center justify-center gap-2 w-full md:w-auto rounded-[var(--radius)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] hover:brightness-110 transition-all uppercase tracking-widest">
            <Search size={18} /> Search
          </button>
        </div>
      </section>

      {/* ─── Animated Stats ────────────────────────────────────────────────── */}
      <section data-surface="base" className="py-24 px-6 border-b border-[var(--muted)]/10 relative z-[var(--z-content)]">
        <Stagger className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {config.stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-5xl md:text-6xl font-bold mb-4 text-[var(--accent)]" style={{ fontFamily: "var(--font-display)" }}>
                {stat.value.includes('$') || stat.value.includes('.') ? (
                  <span>{stat.value}</span>
                ) : (
                  <Counter
                    target={parseInt(stat.value.replace(/\D/g, ""), 10) || 0}
                    suffix={stat.value.replace(/[\d]/g, "")}
                    label=""
                  />
                )}
              </div>
              <p className="text-sm uppercase tracking-widest text-[var(--fg-muted)] font-bold">{stat.label}</p>
            </div>
          ))}
        </Stagger>
      </section>

      {/* ─── Featured Listings ─────────────────────────────────────────────── */}
      <section id="listings" data-surface="inverse" className="py-32 px-6 relative z-[var(--z-content)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <SplitTextReveal text="Featured Properties" tag="h2" className="text-4xl md:text-6xl font-bold" />
            <Reveal>
              <button className="bg-[var(--accent)] text-[var(--on-accent)] min-h-[44px] px-8 py-3 font-bold rounded-[var(--radius)] uppercase tracking-widest hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] transition-all">
                View All
              </button>
            </Reveal>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-4 mb-12">
            {filters.map(f => (
              <button 
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`min-h-[44px] px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] ${
                  activeFilter === f 
                    ? "bg-[var(--accent)] text-[var(--on-accent)] border-[var(--accent)]" 
                    : "bg-transparent text-[var(--fg)] border-[var(--fg-muted)] hover:bg-[var(--fg)]/10"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <Stagger className="grid md:grid-cols-3 gap-8">
            {config.featuredListings.map(listing => (
              <motion.div layout key={listing.id} className="group flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-[var(--surface)] rounded-[var(--radius)]">
                  <Image 
                    src={listing.image} 
                    alt={listing.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    sizes="(max-width: 768px) 100vw, 33vw"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM1NTUiLz48L3N2Zz4="
                  />
                  {listing.tag && (
                    <div className="absolute top-4 left-4 bg-[var(--bg)] text-[var(--fg)] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                      {listing.tag}
                    </div>
                  )}
                  <button 
                    onClick={() => setWishlist(p => ({ ...p, [listing.id]: !p[listing.id] }))}
                    className="absolute top-4 right-4 min-w-[44px] min-h-[44px] bg-[var(--bg)]/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[var(--fg)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] shadow-lg"
                    aria-pressed={!!wishlist[listing.id]}
                    aria-label="Add to wishlist"
                  >
                    <Heart size={20} fill={wishlist[listing.id] ? "currentColor" : "none"} className={wishlist[listing.id] ? "text-[var(--accent)]" : ""} />
                  </button>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{listing.title}</h3>
                  <span className="text-[var(--accent)] font-bold text-xl">{listing.price}</span>
                </div>
                <div className="flex gap-4 text-sm text-[var(--fg-muted)] uppercase tracking-wide font-bold">
                  <span>{listing.beds} Beds</span>
                  <span>{listing.baths} Baths</span>
                  <span>{listing.sqft} SqFt</span>
                </div>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Buying Journey (Pinned) ───────────────────────────────────────── */}
      <section id="journey" ref={journeyRef} data-surface="base" className="relative z-[var(--z-content)] overflow-hidden flex flex-col md:flex-row min-h-[100svh]">
        <div className="w-full md:w-1/2 p-12 md:p-24 flex items-center bg-[var(--bg)] z-20">
          <div>
            <SplitTextReveal text="The Buying Journey" tag="h2" className="text-4xl md:text-6xl font-bold mb-6" />
            <p className="text-xl text-[var(--fg-muted)] font-medium">A seamless, end-to-end experience designed around you.</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 relative bg-[var(--surface)]">
           <div ref={journeyContentRef} className="p-12 md:p-24 flex flex-col gap-24 md:pt-[50vh]">
             {config.buyingJourney.map((j, i) => (
               <div key={i} className="flex gap-8 items-start">
                 <div className="text-4xl font-bold text-[var(--accent)]" style={{ fontFamily: "var(--font-display)" }}>{j.step}</div>
                 <div>
                   <h3 className="text-3xl font-bold mb-4">{j.title}</h3>
                   <p className="text-[var(--fg-muted)] text-lg leading-relaxed font-medium">{j.description}</p>
                 </div>
               </div>
             ))}
             {/* Padding to allow scroll past last item */}
             <div className="h-[50vh] hidden md:block"></div>
           </div>
        </div>
      </section>

      {/* ─── Agent Profiles ────────────────────────────────────────────────── */}
      <section data-surface="raised" className="py-32 px-6 border-t border-[var(--muted)]/10 relative z-[var(--z-content)]">
        <div className="max-w-6xl mx-auto">
          <SplitTextReveal text="Meet The Experts" tag="h2" className="text-4xl md:text-6xl font-bold mb-16 text-center" />
          <Stagger className="grid md:grid-cols-2 gap-16 justify-center max-w-4xl mx-auto">
            {config.team.map((member, i) => (
              <div key={member.name} className="flex flex-col items-center text-center">
                <div className="w-56 h-56 rounded-full overflow-hidden bg-[var(--surface-2)] mb-8 border-4 border-[var(--bg)] shadow-xl relative shrink-0">
                   <Image priority src={`/images/agent-${i + 1}.jpg`} alt={member.name} fill className="object-cover" sizes="224px" />
                </div>
                <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>{member.name}</h3>
                <p className="text-[var(--accent)] font-bold text-sm uppercase tracking-widest mb-4">{member.role}</p>
                <p className="text-[var(--fg-muted)] leading-relaxed font-medium">{member.bio}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Neighborhoods ─────────────────────────────────────────────────── */}
      <section id="neighborhoods" data-surface="base" className="py-32 px-6 relative z-[var(--z-content)]">
         <div className="max-w-7xl mx-auto">
           <SplitTextReveal text="Explore Neighborhoods" tag="h2" className="text-4xl md:text-6xl font-bold mb-16" />
           <div className="grid md:grid-cols-4 gap-6">
             {config.neighborhoods.map((n, i) => (
               <Reveal key={n.name} delay={i * 0.1}>
                 <div className="group relative aspect-[3/4] overflow-hidden bg-[var(--surface-2)] rounded-[var(--radius)] cursor-pointer">
                    <Image priority src={n.image} alt={n.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 25vw" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM1NTUiLz48L3N2Zz4=" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-20" />
                    <div className="absolute bottom-0 left-0 p-6 z-30 transform group-hover:-translate-y-4 transition-transform duration-500">
                      <h3 className="text-2xl font-bold mb-2 text-white" style={{ fontFamily: "var(--font-display)" }}>{n.name}</h3>
                      <p className="text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-medium">{n.description}</p>
                    </div>
                 </div>
               </Reveal>
             ))}
           </div>
         </div>
      </section>

      {/* ─── Home Valuation Form ───────────────────────────────────────────── */}
      <section id="valuation" data-surface="accent" className="py-32 px-6 relative z-[var(--z-content)]">
        <div className="max-w-xl mx-auto text-center">
          <Reveal>
             <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>What's your home worth?</h2>
          </Reveal>
          <Reveal delay={0.2}>
             <p className="text-[var(--on-accent)]/80 mb-12 text-lg font-medium">Enter your address for an exclusive, data-driven market analysis from our experts.</p>
          </Reveal>
          <Reveal delay={0.4}>
             <form className="flex flex-col gap-4">
               <input aria-label="Property Address" type="text" placeholder="Property Address" className="w-full px-6 min-h-[56px] bg-[var(--bg)] text-[var(--fg)] border border-transparent focus:border-[var(--fg)] outline-none rounded-[var(--radius)]" />
               <div className="flex flex-col md:flex-row gap-4">
                 <input aria-label="Email Address" type="email" placeholder="Your Email Address" className="flex-1 px-6 min-h-[56px] bg-[var(--bg)] text-[var(--fg)] border border-transparent focus:border-[var(--fg)] outline-none rounded-[var(--radius)]" />
                 <button className="bg-[var(--fg)] text-[var(--bg)] min-h-[56px] px-8 font-bold uppercase tracking-widest shrink-0 rounded-[var(--radius)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--accent)] hover:brightness-110 transition-all">
                   Analyze
                 </button>
               </div>
             </form>
          </Reveal>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────────────────────── */}
      <div data-surface="base" className="relative z-[var(--z-content)] border-t border-[var(--border)]">
        <Footer
          brand={config.brand.name}
          links={[
            { label: "Properties", href: "#listings" },
            { label: "Agents", href: "#" },
            { label: "Contact Us", href: "#" },
            { label: "Privacy Policy", href: "#" },
          ]}
        />
      </div>
    </main>
  );
}
