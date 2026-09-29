"use client";

import React from "react";
import {
  StickyNav,
  SplitTextReveal,
  Reveal,
  Stagger,
  Counter,
  PinnedSteps,
  ContactForm,
  MagneticButton,
  Footer
} from "@client-demos/core";
import { config } from "../demo.config";
import { Hero3DRealEstate } from "./components/Hero3DRealEstate";
import { Search, MapPin, Home, DollarSign, Star } from "lucide-react";

const navLinks = [
  { label: "Listings", href: "#listings" },
  { label: "Neighborhoods", href: "#neighborhoods" },
  { label: "Journey", href: "#journey" },
  { label: "Valuation", href: "#valuation" },
];

export default function Page() {
  return (
    <>
      <StickyNav logo={config.brand.name} links={navLinks} />

      {/* ─── Hero with Search ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-end md:justify-center px-6 pt-32 pb-24 text-center">
        <Hero3DRealEstate />
        
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center pointer-events-none mt-[20vh] md:mt-auto">
          <SplitTextReveal
            text={config.brand.name}
            tag="h1"
            className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tight drop-shadow-xl"
            style={{ color: "var(--fg)" }}
          />
          <Reveal delay={0.3}>
            <p className="mt-6 text-xl md:text-2xl text-[var(--fg)] bg-[var(--bg)]/50 backdrop-blur-md px-6 py-2 rounded-full inline-block font-medium">
              {config.brand.tagline}
            </p>
          </Reveal>
        </div>

        {/* Search Bar UI */}
        <div className="relative z-20 w-full max-w-4xl mx-auto mt-16 bg-[var(--bg)] p-4 shadow-2xl flex flex-col md:flex-row gap-4 pointer-events-auto" style={{ borderRadius: "var(--radius)" }}>
          <div className="flex-1 flex items-center gap-3 border-b md:border-b-0 md:border-r border-[var(--muted)]/20 pb-4 md:pb-0 md:pr-4">
            <MapPin className="text-[var(--accent)]" size={20} />
            <select className="w-full bg-transparent outline-none text-[var(--fg)] cursor-pointer appearance-none">
              <option value="">Location</option>
              {config.searchOptions.locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>
          <div className="flex-1 flex items-center gap-3 border-b md:border-b-0 md:border-r border-[var(--muted)]/20 pb-4 md:pb-0 md:pr-4">
            <Home className="text-[var(--accent)]" size={20} />
            <select className="w-full bg-transparent outline-none text-[var(--fg)] cursor-pointer appearance-none">
              <option value="">Property Type</option>
              {config.searchOptions.types.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div className="flex-1 flex items-center gap-3 pb-4 md:pb-0">
            <DollarSign className="text-[var(--accent)]" size={20} />
            <select className="w-full bg-transparent outline-none text-[var(--fg)] cursor-pointer appearance-none">
              <option value="">Price Range</option>
              <option value="1m-2m">$1M - $2M</option>
              <option value="2m-5m">$2M - $5M</option>
              <option value="5m+">$5M+</option>
            </select>
          </div>
          <MagneticButton className="bg-[var(--fg)] text-[var(--bg)] px-8 py-4 font-bold flex items-center justify-center gap-2 w-full md:w-auto">
            <Search size={18} /> Search
          </MagneticButton>
        </div>
      </section>

      {/* ─── Animated Stats ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-b border-[var(--muted)]/10">
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
              <p className="text-sm uppercase tracking-widest text-[var(--muted)] font-semibold">{stat.label}</p>
            </div>
          ))}
        </Stagger>
      </section>

      {/* ─── Featured Listings ─────────────────────────────────────────────── */}
      <section id="listings" className="py-32 px-6 bg-[var(--accent2)] text-[var(--bg)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <SplitTextReveal text="Featured Properties" tag="h2" className="text-4xl md:text-6xl font-bold" />
            <Reveal>
              <MagneticButton className="border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent2)] px-8 py-3 transition-colors">
                View All Listings
              </MagneticButton>
            </Reveal>
          </div>

          <Stagger className="grid md:grid-cols-3 gap-8">
            {config.featuredListings.map(listing => (
              <div key={listing.id} className="group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-[var(--fg)]" style={{ borderRadius: "var(--radius)" }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg)]/10 to-[var(--muted)]/20 transition-transform duration-700 group-hover:scale-105" />
                  {listing.tag && (
                    <div className="absolute top-4 left-4 bg-[var(--accent)] text-[var(--accent2)] text-xs font-bold uppercase tracking-widest px-3 py-1">
                      {listing.tag}
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{listing.title}</h3>
                  <span className="text-[var(--accent)] font-bold text-xl">{listing.price}</span>
                </div>
                <div className="flex gap-4 text-sm text-[var(--bg)]/70 uppercase tracking-wide">
                  <span>{listing.beds} Beds</span>
                  <span>{listing.baths} Baths</span>
                  <span>{listing.sqft} SqFt</span>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Buying Journey (Pinned) ───────────────────────────────────────── */}
      <section id="journey" className="bg-[var(--bg)]">
        <div className="pt-32 text-center px-6">
          <SplitTextReveal text="The Buying Journey" tag="h2" className="text-4xl md:text-6xl font-bold" />
        </div>
        <PinnedSteps 
          steps={config.buyingJourney.map(j => ({
            title: `${j.step} — ${j.title}`,
            description: j.description
          }))} 
        />
      </section>

      {/* ─── Agent Profiles ────────────────────────────────────────────────── */}
      <section className="py-32 px-6 border-t border-[var(--muted)]/10">
        <div className="max-w-6xl mx-auto">
          <SplitTextReveal text="Meet The Experts" tag="h2" className="text-4xl md:text-6xl font-bold mb-16 text-center" />
          <Stagger className="grid md:grid-cols-3 gap-12">
            {config.team.map(member => (
              <div key={member.name} className="flex flex-col items-center text-center">
                <div className="w-48 h-48 rounded-full overflow-hidden bg-[var(--muted)]/20 mb-8 border-4 border-[var(--bg)] shadow-xl relative">
                   <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/20 to-transparent"></div>
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>{member.name}</h3>
                <p className="text-[var(--accent)] font-semibold text-sm uppercase tracking-widest mb-4">{member.role}</p>
                <p className="text-[var(--muted)] leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Neighborhoods ─────────────────────────────────────────────────── */}
      <section id="neighborhoods" className="py-32 px-6 bg-[var(--fg)] text-[var(--bg)]">
         <div className="max-w-7xl mx-auto">
           <SplitTextReveal text="Explore Neighborhoods" tag="h2" className="text-4xl md:text-6xl font-bold mb-16" />
           <div className="grid md:grid-cols-3 gap-6">
             {config.neighborhoods.map((n, i) => (
               <Reveal key={n.name} delay={i * 0.1}>
                 <div className="group relative aspect-[3/4] overflow-hidden bg-[var(--accent2)] cursor-pointer" style={{ borderRadius: "var(--radius)" }}>
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-20" />
                    <div className="absolute bottom-0 left-0 p-8 z-30 transform group-hover:-translate-y-4 transition-transform duration-500">
                      <h3 className="text-3xl font-bold mb-3 text-white" style={{ fontFamily: "var(--font-display)" }}>{n.name}</h3>
                      <p className="text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{n.description}</p>
                    </div>
                 </div>
               </Reveal>
             ))}
           </div>
         </div>
      </section>

      {/* ─── Testimonials ──────────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-[var(--bg)]">
        <div className="max-w-4xl mx-auto text-center">
          <SplitTextReveal text="Client Perspectives" tag="h2" className="text-4xl md:text-6xl font-bold mb-16" />
          <Stagger className="flex flex-col gap-16">
            {config.testimonials.map(t => (
              <div key={t.name} className="relative">
                <div className="text-6xl absolute -top-8 -left-8 text-[var(--accent)]/20" style={{ fontFamily: "var(--font-display)" }}>"</div>
                <p className="text-2xl md:text-4xl italic leading-relaxed mb-6" style={{ fontFamily: "var(--font-display)" }}>
                  {t.text}
                </p>
                <div className="flex items-center justify-center gap-4">
                   <div className="h-[1px] w-12 bg-[var(--accent)]"></div>
                   <p className="font-bold uppercase tracking-widest text-sm">{t.name}</p>
                   <div className="h-[1px] w-12 bg-[var(--accent)]"></div>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Home Valuation Form ───────────────────────────────────────────── */}
      <section id="valuation" className="py-32 px-6 border-t border-[var(--muted)]/10">
        <div className="max-w-xl mx-auto text-center">
          <Reveal>
             <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>What's your home worth?</h2>
          </Reveal>
          <Reveal delay={0.2}>
             <p className="text-[var(--muted)] mb-12">Enter your address for an exclusive, data-driven market analysis from our experts.</p>
          </Reveal>
          <Reveal delay={0.4}>
             <form className="flex flex-col gap-4">
               <input type="text" placeholder="Property Address" className="w-full px-6 py-4 bg-[var(--bg)] border border-[var(--muted)]/30 focus:border-[var(--accent)] outline-none" style={{ borderRadius: "var(--radius)" }} />
               <div className="flex gap-4">
                 <input type="email" placeholder="Your Email Address" className="flex-1 px-6 py-4 bg-[var(--bg)] border border-[var(--muted)]/30 focus:border-[var(--accent)] outline-none" style={{ borderRadius: "var(--radius)" }} />
                 <MagneticButton className="bg-[var(--fg)] text-[var(--bg)] px-8 py-4 font-bold uppercase tracking-widest shrink-0">
                   Analyze
                 </MagneticButton>
               </div>
             </form>
          </Reveal>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────────────────────── */}
      <Footer
        brand={config.brand.name}
        links={[
          { label: "Properties", href: "#listings" },
          { label: "Agents", href: "#" },
          { label: "Contact Us", href: "#" },
          { label: "Privacy Policy", href: "#" },
        ]}
      />
    </>
  );
}
