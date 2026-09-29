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
    // Subtle parallax on floating decorative elements
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
  }, []);

  return (
    <>
      <StickyNav 
        logo={demoConfig.brand.name} 
        links={navLinks} 
      />
      
      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] w-full flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-[var(--bg)]">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <HeroCanvas 
            scene={<HeroFood />} 
            fallback={
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg)]">
                <div className="w-64 h-64 rounded-full bg-[var(--accent)] opacity-20 blur-3xl animate-pulse" />
              </div>
            } 
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 pointer-events-none flex flex-col items-center mt-32">
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
            <a href="#reservations" className="pointer-events-auto mt-16 inline-block px-12 py-5 bg-[var(--fg)] text-[var(--bg)] text-sm uppercase tracking-[0.2em] hover:bg-[var(--accent)] transition-colors duration-500 rounded-[var(--radius)] shadow-xl">
              Book a Table
            </a>
          </Reveal>
        </div>
      </section>

      {/* ─── Menu ──────────────────────────────────────────── */}
      <section id="menu" className="py-32 px-6 bg-[var(--accent2)] relative z-20 text-[var(--bg)]">
        <div className="max-w-5xl mx-auto relative">
          
          {/* Decorative floating ingredients for parallax */}
          <div ref={(el) => { parallaxRefs.current[0] = el; }} className="absolute -left-20 top-20 text-[var(--accent)] opacity-30 pointer-events-none">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
          </div>
          <div ref={(el) => { parallaxRefs.current[1] = el; }} className="absolute -right-20 bottom-20 text-[var(--bg)] opacity-10 pointer-events-none">
            <svg width="150" height="150" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2z" /></svg>
          </div>

          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-5xl md:text-7xl mb-4" style={{ fontFamily: "var(--font-display)" }}>
                The Menu
              </h2>
              <p className="text-[var(--bg)]/70 uppercase tracking-widest text-sm">Locally Sourced · Fire Roasted</p>
            </Reveal>
          </div>

          <Tabs
            tabs={[
              {
                label: "Starters",
                content: <MenuSection title="Starters" items={demoConfig.services.slice(0, 2)} />
              },
              {
                label: "Mains",
                content: <MenuSection title="Mains" items={demoConfig.services} />
              },
              {
                label: "Desserts",
                content: <MenuSection title="Desserts" items={demoConfig.services.slice(2, 4)} />
              }
            ]}
          />
        </div>
      </section>

      {/* ─── Story ─────────────────────────────────────────── */}
      <section id="story" className="py-32 px-6 bg-[var(--bg)] relative z-20 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[3/4] bg-[var(--accent2)] rounded-[var(--radius)] overflow-hidden">
            <div className="absolute inset-0 bg-[var(--fg)] opacity-10 mix-blend-multiply" />
            <svg className="absolute inset-0 w-full h-full text-[var(--accent)] opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,100 C30,80 70,20 100,0 L100,100 Z" fill="currentColor" />
            </svg>
            <div className="absolute bottom-10 left-10 right-10 p-8 bg-[var(--bg)] rounded-[var(--radius)] shadow-2xl">
               <h3 className="text-2xl text-[var(--fg)] mb-2" style={{ fontFamily: "var(--font-display)" }}>{demoConfig.team[0].name}</h3>
               <p className="text-[var(--accent)] text-sm uppercase tracking-widest mb-4">{demoConfig.team[0].role}</p>
               <p className="text-[var(--muted)] font-medium leading-relaxed italic">"{demoConfig.team[0].bio}"</p>
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
            
            <div className="grid grid-cols-2 gap-8 border-t border-[var(--accent)]/20 pt-8 mt-12">
              {demoConfig.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.1}>
                  <p className="text-4xl text-[var(--accent)] mb-2" style={{ fontFamily: "var(--font-display)" }}>{stat.value}</p>
                  <p className="text-[var(--muted)] text-xs uppercase tracking-widest font-bold">{stat.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Gallery ───────────────────────────────────────── */}
      <section id="gallery" className="py-24 bg-[var(--accent)] relative z-20">
        <div className="flex overflow-hidden">
          <Stagger className="flex gap-4 px-4 w-max">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-[60vw] md:w-[30vw] aspect-[4/5] bg-[var(--bg)] rounded-[var(--radius)] flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity">
                <svg className="w-1/3 h-1/3 text-[var(--accent2)] opacity-30" viewBox="0 0 24 24" fill="currentColor">
                   {i % 2 === 0 
                     ? <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /> 
                     : <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-7v20h2V2h-2z" />
                   }
                </svg>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Testimonials ──────────────────────────────────── */}
      <section className="py-32 px-6 bg-[var(--bg)] relative z-20 text-center">
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
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)] font-bold">— {t.name}</p>
              </Reveal>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Reservations & Location ───────────────────────── */}
      <section id="reservations" className="py-32 px-6 bg-[var(--accent2)] relative z-20 text-[var(--bg)]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="bg-[var(--bg)] p-10 rounded-[var(--radius)] shadow-2xl">
            <h2 className="text-4xl text-[var(--fg)] mb-8" style={{ fontFamily: "var(--font-display)" }}>Book a Table</h2>
            <ContactForm />
          </div>

          <div className="flex flex-col justify-center">
            <Reveal>
              <h2 className="text-5xl text-[var(--bg)] mb-8" style={{ fontFamily: "var(--font-display)" }}>Visit Us</h2>
            </Reveal>
            <div className="space-y-8 text-[var(--bg)]/80 text-lg">
              <div>
                <p className="font-bold text-[var(--bg)] uppercase tracking-widest text-sm mb-2">Location</p>
                <p>{demoConfig.brand.address}</p>
              </div>
              <div>
                <p className="font-bold text-[var(--bg)] uppercase tracking-widest text-sm mb-2">Hours</p>
                {demoConfig.brand.hours.map(h => <p key={h}>{h}</p>)}
              </div>
              <div>
                <p className="font-bold text-[var(--bg)] uppercase tracking-widest text-sm mb-2">Contact</p>
                <p>{demoConfig.brand.phone}</p>
                <p>{demoConfig.brand.email}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────── */}
      <div className="relative z-20 border-t border-[var(--bg)]/10">
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

function MenuSection({ title, items }: { title: string, items: typeof demoConfig.services }) {
  return (
    <div className="pt-8">
      <h3 className="text-3xl text-[var(--accent)] mb-8 border-b border-[var(--bg)]/20 pb-4" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
      <div className="space-y-8">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between items-start gap-8 group">
            <div className="flex-1">
              <h4 className="text-xl font-bold uppercase tracking-widest mb-2 group-hover:text-[var(--accent)] transition-colors">{item.title}</h4>
              <p className="text-[var(--bg)]/60 text-sm font-medium leading-relaxed">{item.description}</p>
            </div>
            <div className="text-lg font-bold">
              {item.price || (i % 2 === 0 ? "$18" : "$24")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
