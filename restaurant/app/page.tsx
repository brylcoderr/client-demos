"use client";

import {
  StickyNav,
  SplitTextReveal,
  Reveal,
  Stagger,
  Tabs,
  ContactForm,
  Footer,
  HeroCanvas
} from "@client-demos/core";
import { demoConfig, cuisine } from "../demo.config";
import { HeroFood } from "./components/HeroFood";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "Our Story", href: "#story" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reservations", href: "#reservations" },
];

export default function Home() {
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      parallaxRefs.current.forEach((el, index) => {
        if (!el) return;
        gsap.to(el, {
          y: (index % 2 === 0 ? -100 : 100),
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });
      
      const mq = window.matchMedia('(min-width: 768px)');
      if (mq.matches) {
        ScrollTrigger.create({
          trigger: '#menu',
          start: 'top top',
          end: 'bottom bottom',
          pin: '.sticky-heading',
          pinSpacing: true,
          invalidateOnRefresh: true
        });
      }
      
      // Refresh after fonts and images load
      setTimeout(() => ScrollTrigger.refresh(), 500);
      window.addEventListener('load', () => ScrollTrigger.refresh());
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <>
      <StickyNav 
        logo={demoConfig.brand.name} 
        links={navLinks} 
      />
      
      {/* ─── Hero ──────────────────────────────────────────── */}
      <section data-surface="base" className="relative min-h-[100svh] w-full flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-[var(--z-base)] pointer-events-none">
          <HeroCanvas 
            scene={<HeroFood />} 
            fallback={
              <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "var(--bg)" }}>
                <div className="w-64 h-64 rounded-full opacity-20 blur-3xl animate-pulse" style={{ backgroundColor: "var(--accent)" }} />
              </div>
            } 
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-[var(--z-content)] pointer-events-none flex flex-col items-center mt-32 scrim-bottom w-full h-full pb-16 pt-32">
          <SplitTextReveal
            text={demoConfig.brand.name}
            tag="h1"
            className="text-7xl md:text-9xl lg:text-[11rem] tracking-tight text-[var(--fg)] drop-shadow-lg"
            style={{ fontFamily: "var(--font-display)" }}
          />

          <Reveal delay={0.5}>
            <p className="mt-8 text-xl md:text-3xl text-[var(--accent)] max-w-2xl font-light italic">
              {demoConfig.brand.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.8}>
            <a href="#reservations" className="pointer-events-auto mt-16 inline-block px-12 py-5 bg-[var(--accent)] text-[var(--on-accent)] text-sm uppercase tracking-[0.2em] hover:brightness-110 transition-all duration-500 rounded-[var(--radius)] shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]">
              Book a Table
            </a>
          </Reveal>
        </div>
      </section>

      {/* Special Banner */}
      <section data-surface="accent" className="py-4 text-center z-[var(--z-content)] relative">
        <p className="text-sm uppercase tracking-widest font-bold text-[var(--on-accent)]">Reserve now for our seasonal Chef's Tasting Menu</p>
      </section>

      {/* ─── Menu ──────────────────────────────────────────── */}
      <section id="menu" data-surface="raised" className="py-32 px-6 relative z-[var(--z-content)]">
        <div className="max-w-5xl mx-auto relative">
          <div ref={(el) => { parallaxRefs.current[0] = el; }} className="absolute -left-20 top-20 text-[var(--accent)] opacity-30 pointer-events-none">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
          </div>
          <div ref={(el) => { parallaxRefs.current[1] = el; }} className="absolute -right-20 bottom-20 text-[var(--fg-muted)] opacity-10 pointer-events-none">
            <svg width="150" height="150" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2z" /></svg>
          </div>

          <div className="sticky-heading z-[var(--z-sticky)] bg-[var(--bg)] py-8 text-center mb-16">
            <Reveal>
              <h2 className="text-5xl md:text-7xl mb-4 text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }}>
                The Menu
              </h2>
              <p className="text-[var(--fg-muted)] uppercase tracking-widest text-sm">Locally Sourced · Fire Roasted</p>
            </Reveal>
          </div>

          <Tabs
            tabs={[
              {
                label: "Starters",
                content: <MenuSection title="Starters" startIndex={0} />
              },
              {
                label: "Mains",
                content: <MenuSection title="Mains" startIndex={2} />
              },
              {
                label: "Desserts & Drinks",
                content: <MenuSection title="Desserts & Drinks" startIndex={4} />
              }
            ]}
          />
        </div>
      </section>

      {/* ─── Story ─────────────────────────────────────────── */}
      <section id="story" data-surface="base" className="py-32 px-6 relative z-[var(--z-content)] overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[3/4] rounded-[var(--radius)] overflow-hidden">
            <Image src="/images/chef.jpg" alt="Chef" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM2YTU2NDgiLz48L3N2Zz4=" />
            <div className="absolute inset-0 scrim-bottom" />
            <div className="absolute bottom-10 left-10 right-10 p-8 data-surface-inverse rounded-[var(--radius)] shadow-2xl bg-[var(--inverse-bg)] text-[var(--inverse-fg)]">
               <h3 className="text-2xl mb-2 text-[var(--inverse-fg)]" style={{ fontFamily: "var(--font-display)" }}>{demoConfig.team[0].name}</h3>
               <p className="text-[var(--accent)] text-sm uppercase tracking-widest mb-4">{demoConfig.team[0].role}</p>
               <p className="text-[var(--inverse-fg)]/80 font-medium leading-relaxed italic">"{demoConfig.team[0].bio}"</p>
            </div>
          </div>

          <div>
            <Reveal>
              <h2 className="text-5xl md:text-7xl text-[var(--fg)] mb-8" style={{ fontFamily: "var(--font-display)" }}>
                Our Story
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl text-[var(--fg)] leading-relaxed mb-8 font-light">
                {cuisine === "mediterranean" 
                  ? "Rooted in the ancient traditions of open-fire cooking, we bring the warmth of the Mediterranean coast to every plate."
                  : "Crafting moments of joy through meticulous attention to detail and a profound respect for ingredients."}
              </p>
            </Reveal>
            
            <div className="grid grid-cols-2 gap-8 border-t border-[var(--border)] pt-8 mt-12">
              {demoConfig.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.1}>
                  <p className="text-4xl text-[var(--accent)] mb-2" style={{ fontFamily: "var(--font-display)" }}>{stat.value}</p>
                  <p className="text-[var(--fg-muted)] text-xs uppercase tracking-widest font-bold">{stat.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Gallery ───────────────────────────────────────── */}
      <section id="gallery" data-surface="inverse" className="py-24 relative z-[var(--z-content)]">
        <div className="flex overflow-hidden">
          <Stagger className="flex gap-4 px-4 w-max">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="relative w-[60vw] md:w-[30vw] aspect-[4/5] rounded-[var(--radius)] flex items-center justify-center overflow-hidden hover:brightness-110 transition-all duration-300">
                <Image src={i % 2 === 0 ? "/images/interior.jpg" : "/images/terrace.jpg"} alt="Gallery" fill className="object-cover" sizes="30vw" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMyQjFCMTIiLz48L3N2Zz4=" />
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Testimonials ──────────────────────────────────── */}
      <section data-surface="base" className="py-32 px-6 relative z-[var(--z-content)] text-center">
        <div className="max-w-4xl mx-auto">
          <SplitTextReveal text="Guestbook" tag="h2" className="text-5xl md:text-7xl text-[var(--fg)] mb-20" style={{ fontFamily: "var(--font-display)" }} />
          
          <Stagger className="flex flex-col gap-24">
            {demoConfig.testimonials.map((t) => (
              <Reveal key={t.name}>
                <div className="flex justify-center gap-1 text-[var(--accent)] mb-8">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  ))}
                </div>
                <blockquote className="text-2xl md:text-4xl text-[var(--fg)] italic font-light leading-relaxed mb-8" style={{ fontFamily: "var(--font-display)" }}>
                  "{t.text}"
                </blockquote>
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--fg-muted)] font-bold">— {t.name}</p>
              </Reveal>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Reservations & Location ───────────────────────── */}
      <section id="reservations" data-surface="raised" className="py-32 px-6 relative z-[var(--z-content)]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="bg-[var(--bg)] p-10 rounded-[var(--radius)] shadow-2xl text-[var(--fg)]">
            <h2 className="text-4xl mb-8" style={{ fontFamily: "var(--font-display)" }}>Book a Table</h2>
            <ContactForm />
          </div>

          <div className="flex flex-col justify-center text-[var(--fg)]">
            <Reveal>
              <h2 className="text-5xl mb-8" style={{ fontFamily: "var(--font-display)" }}>Visit Us</h2>
            </Reveal>
            <div className="space-y-8 text-[var(--fg-muted)] text-lg">
              <div>
                <p className="font-bold text-[var(--fg)] uppercase tracking-widest text-sm mb-2">Location</p>
                <p>{demoConfig.brand.address}</p>
              </div>
              <div>
                <p className="font-bold text-[var(--fg)] uppercase tracking-widest text-sm mb-2">Hours</p>
                {demoConfig.brand.hours.map(h => <p key={h}>{h}</p>)}
              </div>
              <div>
                <p className="font-bold text-[var(--fg)] uppercase tracking-widest text-sm mb-2">Contact</p>
                <p>{demoConfig.brand.phone}</p>
                <p>{demoConfig.brand.email}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mobile Reserve Bar ────────────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-[var(--surface)] border-t border-[var(--border)] z-[var(--z-sticky)] flex justify-center">
        <a href="#reservations" className="w-full text-center px-6 py-4 bg-[var(--accent)] text-[var(--on-accent)] font-bold rounded shadow-lg uppercase tracking-wider text-sm">Reserve Now</a>
      </div>

      {/* ─── Footer ────────────────────────────────────────── */}
      <div className="relative z-[var(--z-content)] border-t border-[var(--border)]" data-surface="base">
        <Footer
          brand={demoConfig.brand.name}
          links={[
            { label: "Private Events", href: "#" },
            { label: "Gift Cards", href: "#" },
            { label: "Careers", href: "#" },
          ]}
        />
      </div>
    </>
  );
}

const dishes = [
  { title: "mezze platter", description: "Hummus, baba ganoush, muhammara with fresh pita", price: "$18", badges: ["V", "VG"] },
  { title: "grilled octopus", description: "Charred tentacle, fingerling potatoes, salsa verde", price: "$24", badges: ["GF"] },
  { title: "lamb chops", description: "Wood-fired chops, mint gremolata, ancient grains", price: "$38", badges: ["GF", "Halal"] },
  { title: "flatbread", description: "Artisan dough, za'atar, labneh, olives", price: "$16", badges: ["V"] },
  { title: "tiramisu", description: "Espresso-soaked ladyfingers, mascarpone cream", price: "$12", badges: ["V"] },
  { title: "baklava", description: "Phyllo pastry, pistachios, honey syrup", price: "$10", badges: ["V"] },
  { title: "espresso", description: "Single origin dark roast", price: "$5", badges: ["V", "VG", "GF"] },
  { title: "lemonade", description: "Fresh squeezed lemons, mint, agave", price: "$6", badges: ["V", "VG", "GF"] },
];

function MenuSection({ title, startIndex }: { title: string, startIndex: number }) {
  const items = dishes.slice(startIndex, startIndex + 4);
  
  return (
    <div className="pt-8">
      <h3 className="text-3xl text-[var(--accent)] mb-8 border-b border-[var(--border)] pb-4" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
      <div className="grid md:grid-cols-2 gap-12">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col gap-4 group">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius)] bg-[var(--surface-2)]">
              <Image src={`/images/menu-${startIndex + i + 1}.jpg`} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNFQUQ5QkEiLz48L3N2Zz4=" />
            </div>
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h4 className="text-xl font-bold uppercase tracking-widest mb-2 text-[var(--fg)]">{item.title}</h4>
                <div className="flex gap-2 mb-2">
                  {item.badges.map(b => (
                    <span key={b} className="px-2 py-1 bg-[var(--surface-2)] text-[var(--fg)] text-xs font-bold rounded uppercase">
                      {b}
                    </span>
                  ))}
                </div>
                <p className="text-[var(--fg-muted)] text-sm font-medium leading-relaxed">{item.description}</p>
              </div>
              <div className="text-lg font-bold text-[var(--fg)]">
                {item.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
