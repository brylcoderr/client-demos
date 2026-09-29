"use client";

import {
  StickyNav,
  SplitTextReveal,
  Reveal,
  Stagger,
  PinnedSteps,
  ContactForm,
  Footer,
  HeroCanvas
} from "@client-demos/core";
import { demoConfig } from "../demo.config";
import { HeroConstruction } from "./components/HeroConstruction";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Get a Quote", href: "#quote" },
];

export default function Home() {
  return (
    <>
      <StickyNav 
        logo={demoConfig.brand.name} 
        links={navLinks} 
      />
      
      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="relative h-[150vh] w-full flex flex-col items-center pt-32 px-6 text-center bg-[var(--bg)]">
        {/* 3D Background - Fixed while scrolling through the section to see the construction assemble */}
        <div className="sticky top-0 left-0 w-full h-screen z-0">
          <HeroCanvas 
            scene={<HeroConstruction />} 
            fallback={
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg)]">
                <svg className="w-64 h-64 text-[var(--accent)] opacity-20 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M3 21h18 M5 21V8l7-5 7 5v13 M9 21v-5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5" />
                </svg>
              </div>
            } 
          />
        </div>

        {/* Hero Content */}
        <div className="absolute top-40 z-10 flex flex-col items-center max-w-5xl mx-auto pointer-events-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
          <SplitTextReveal
            text={demoConfig.brand.name}
            tag="h1"
            className="text-6xl md:text-8xl lg:text-[10rem] uppercase text-[var(--fg)] leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          />

          <Reveal delay={0.5}>
            <p className="mt-6 text-2xl md:text-4xl text-[var(--accent)] uppercase font-bold tracking-tight bg-[var(--bg)]/80 px-6 py-2 border-2 border-[var(--accent)]">
              {demoConfig.brand.tagline}
            </p>
          </Reveal>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center opacity-70">
          <span className="text-[var(--accent)] font-bold uppercase tracking-widest text-sm mb-2">Scroll to Build</span>
          <div className="w-1 h-16 bg-[var(--muted)]/30 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[var(--accent)] animate-[bounce_2s_infinite]" />
          </div>
        </div>
      </section>

      {/* ─── Services ──────────────────────────────────────── */}
      <section id="services" className="py-32 px-6 bg-[var(--fg)] text-[var(--bg)] relative z-20 border-t-8 border-[var(--accent)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <Reveal>
              <h2 className="text-6xl md:text-8xl uppercase tracking-tighter" style={{ fontFamily: "var(--font-display)" }}>
                Core Capabilities
              </h2>
            </Reveal>
            <Reveal delay={0.3}>
              <a href="#quote" className="inline-block mt-8 md:mt-0 px-8 py-4 bg-[var(--accent)] text-[var(--bg)] font-bold uppercase tracking-widest hover:bg-[var(--bg)] hover:text-[var(--fg)] transition-colors">
                Request Bid
              </a>
            </Reveal>
          </div>

          <Stagger className="grid md:grid-cols-2 gap-12">
            {demoConfig.services.map((service, i) => (
              <div key={service.title} className="group flex gap-8 items-start border-b-4 border-[var(--muted)]/20 pb-8 hover:border-[var(--accent)] transition-colors">
                <span className="text-[var(--accent)] text-5xl opacity-40 font-black" style={{ fontFamily: "var(--font-display)" }}>0{i + 1}</span>
                <div>
                  <h3 className="text-3xl md:text-4xl uppercase mb-4 tracking-tight font-black" style={{ fontFamily: "var(--font-display)" }}>
                    {service.title}
                  </h3>
                  <p className="text-[var(--bg)]/70 font-medium text-lg leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Project Gallery ───────────────────────────────── */}
      <section id="projects" className="py-32 px-6 bg-[var(--accent2)] relative z-20">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-6xl md:text-8xl uppercase tracking-tighter text-[var(--fg)] mb-24" style={{ fontFamily: "var(--font-display)" }}>
              Featured Work
            </h2>
          </Reveal>
          
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-[var(--bg)] border-2 border-[var(--muted)]/20 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--bg)] to-transparent opacity-80" />
                <svg className="w-3/4 h-3/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 text-[var(--fg)] group-hover:scale-110 group-hover:text-[var(--accent)] transition-all duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                  <path d="M3 21h18 M5 21V8l7-5 7 5v13 M9 21v-5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5 M12 3v2" />
                </svg>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="h-1 w-12 bg-[var(--accent)] mb-4 transform origin-left group-hover:scale-x-150 transition-transform" />
                  <p className="text-[var(--fg)] font-bold uppercase tracking-widest">Project 0{i + 1}</p>
                  <p className="text-[var(--muted)] text-sm">Industrial / Commercial</p>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Process ───────────────────────────────────────── */}
      <section id="process" className="bg-[var(--bg)] relative z-20 pt-32 pb-16 border-t-2 border-[var(--accent)]/30">
        <div className="max-w-7xl mx-auto px-6 mb-24">
          <Reveal>
            <h2 className="text-6xl md:text-8xl uppercase tracking-tighter text-[var(--accent)]" style={{ fontFamily: "var(--font-display)" }}>
              How We Build
            </h2>
          </Reveal>
        </div>
        <PinnedSteps 
          steps={[
            { title: "Pre-Construction", description: "Rigorous planning, permitting, and engineering checks before a single shovel hits the dirt." },
            { title: "Site Prep & Foundation", description: "Clearing, grading, and pouring the bedrock of the project." },
            { title: "Vertical Construction", description: "Framing and structure. The vision becomes reality." },
            { title: "Finishing & Handover", description: "Meticulous quality control, final inspections, and handing over the keys." }
          ]}
        />
      </section>

      {/* ─── Badges & Service Area ─────────────────────────── */}
      <section className="py-24 px-6 bg-[var(--accent)] relative z-20 text-[var(--bg)]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl uppercase tracking-tighter mb-8" style={{ fontFamily: "var(--font-display)" }}>
              Certified. Bonded. Proven.
            </h2>
            <div className="flex flex-wrap gap-4 mb-8">
              <span className="px-4 py-2 border-2 border-[var(--bg)] font-bold uppercase tracking-widest text-sm">OSHA 30 Certified</span>
              <span className="px-4 py-2 border-2 border-[var(--bg)] font-bold uppercase tracking-widest text-sm">A+ BBB Rating</span>
              <span className="px-4 py-2 border-2 border-[var(--bg)] font-bold uppercase tracking-widest text-sm">Fully Insured $10M+</span>
            </div>
          </div>
          <div className="bg-[var(--bg)] text-[var(--fg)] p-10 shadow-[16px_16px_0_0_#111111]">
            <h3 className="text-3xl uppercase tracking-tight mb-4 font-black" style={{ fontFamily: "var(--font-display)" }}>Service Areas</h3>
            <p className="text-[var(--muted)] font-medium mb-6">Serving the greater Denver metro and surrounding counties within a 50-mile radius.</p>
            <ul className="grid grid-cols-2 gap-4 font-bold uppercase tracking-widest text-sm">
              <li>• Denver County</li>
              <li>• Arapahoe County</li>
              <li>• Jefferson County</li>
              <li>• Adams County</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ──────────────────────────────────── */}
      <section className="py-32 px-6 bg-[var(--accent2)] relative z-20">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-6xl md:text-8xl uppercase tracking-tighter text-[var(--fg)] mb-24 text-center" style={{ fontFamily: "var(--font-display)" }}>
              Track Record
            </h2>
          </Reveal>

          <Stagger className="grid md:grid-cols-3 gap-8">
            {demoConfig.testimonials.map((t) => (
              <div key={t.name} className="bg-[var(--bg)] p-8 border-t-8 border-[var(--accent)]">
                <div className="flex gap-1 text-[var(--accent)] mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  ))}
                </div>
                <blockquote className="text-[var(--fg)] font-medium leading-relaxed mb-8">
                  "{t.text}"
                </blockquote>
                <p className="font-black uppercase tracking-widest text-[var(--accent)] text-sm">{t.name}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Quote Form ────────────────────────────────────── */}
      <section id="quote" className="py-32 px-6 bg-[var(--bg)] relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-6xl md:text-8xl uppercase tracking-tighter text-[var(--fg)] mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Start a Project
              </h2>
            </Reveal>
            <p className="text-[var(--muted)] text-xl">Fill out the form below and our estimating team will reach out within 24 hours.</p>
          </div>
          
          <div className="bg-[var(--accent2)] p-8 md:p-12 border-2 border-[var(--accent)]/30">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────── */}
      <div className="relative z-20 border-t-8 border-[var(--accent)]">
        <Footer
          brand={demoConfig.brand.name}
          links={[
            { label: "Careers", href: "#" },
            { label: "Subcontractor Portal", href: "#" },
            { label: "Privacy Policy", href: "#" },
          ]}
        />
      </div>
    </>
  );
}
