"use client";

import { useState, useEffect } from "react";
import {
  StickyNav,
  SplitTextReveal,
  Reveal,
  Stagger,
  PinnedSteps,
  ContactForm,
  Footer,
  HeroCanvas,
  SmartImage,
  BeforeAfterSlider,
  Tabs
} from "@client-demos/core";
import { demoConfig, demoFeatures } from "../demo.config";
import { HeroConstruction } from "./components/HeroConstruction";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Get a Quote", href: "#quote" },
];

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero-scroll-container");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        if (rect.top <= 0) {
           const p = Math.min(100, Math.max(0, Math.round((Math.abs(rect.top) / rect.height) * 100 * 1.5)));
           setScrollProgress(p);
        } else {
           setScrollProgress(0);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const projects = [
    { title: "Project 01", category: "Framing", src: "/images/hero-framing.jpg" },
    { title: "Project 02", category: "Roofing", src: "/images/roof-install.jpg" },
    { title: "Project 03", category: "Kitchen", src: "/images/kitchen-a.jpg" },
    { title: "Project 04", category: "Concrete", src: "/images/concrete-pour.jpg" },
    { title: "Project 05", category: "Exterior", src: "/images/finished-home.jpg" },
    { title: "Project 06", category: "Carpentry", src: "/images/project-2.jpg" },
  ];

  return (
    <main className="overflow-x-clip pb-20 md:pb-0">
      <div className="relative z-[var(--z-nav)]">
        <StickyNav 
          logo={demoConfig.brand.name} 
          links={navLinks} 
          aria-label="Main Navigation"
        />
      </div>
      
      {/* ─── Hero ──────────────────────────────────────────── */}
      <section id="hero-scroll-container" className="relative h-[200svh] w-full bg-[var(--bg)]" data-surface="base">
        <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden flex flex-col items-center pt-32 px-6 text-center">
          
          <div className="absolute inset-0 z-[var(--z-base)] pointer-events-none opacity-80">
            <HeroCanvas 
              scene={<HeroConstruction />} 
              fallback={
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg)]" aria-hidden="true">
                  <SmartImage src="/images/blueprint.jpg" alt="Blueprint Background" width={2000} height={1000} className="w-full h-full object-cover opacity-20 grayscale" />
                </div>
              } 
            />
          </div>

          {/* Scrim */}
          <div className="absolute inset-0 z-[var(--z-base)] pointer-events-none scrim-bottom opacity-50" />

          {/* Hero Content */}
          <div className="relative z-[var(--z-content)] flex flex-col items-center max-w-5xl mx-auto pointer-events-none drop-shadow-2xl">
            <SplitTextReveal
              text={demoConfig.brand.name}
              tag="h1"
              className="text-6xl md:text-8xl lg:text-[10rem] uppercase text-[var(--fg)] leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            />

            <Reveal delay={0.5}>
              <p className="mt-6 text-2xl md:text-4xl text-[var(--bg)] uppercase font-bold tracking-tight bg-[var(--fg)] px-6 py-2 border-2 border-[var(--border)]">
                {demoConfig.brand.tagline}
              </p>
            </Reveal>
            
            <Reveal delay={1}>
               <div className="mt-8 px-6 py-3 bg-[var(--inverse-bg)] text-[var(--inverse-fg)] font-bold text-xl uppercase tracking-widest border border-[var(--accent)] pointer-events-auto shadow-xl" data-surface="inverse">
                 {scrollProgress}% BUILT
               </div>
            </Reveal>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[var(--z-content)] flex flex-col items-center opacity-90">
            <span className="text-[var(--accent-2)] font-bold uppercase tracking-widest text-sm mb-2">Scroll to Build</span>
            <div className="w-1 h-16 bg-[var(--fg-muted)]/30 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-[var(--accent)] animate-[bounce_2s_infinite]" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Services ──────────────────────────────────────── */}
      <section id="services" className="py-32 px-6 bg-[var(--fg)] text-[var(--inverse-fg)] relative z-[var(--z-content)] border-t-8 border-[var(--accent)]" data-surface="inverse">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <Reveal>
              <h2 className="text-6xl md:text-8xl uppercase tracking-tighter" style={{ fontFamily: "var(--font-display)" }}>
                Core Capabilities
              </h2>
            </Reveal>
            <Reveal delay={0.3}>
              <a href="#quote" className="inline-block mt-8 md:mt-0 px-8 py-4 bg-[var(--accent)] text-[var(--on-accent)] font-bold uppercase tracking-widest hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--fg)] transition-all min-h-[44px]">
                Request Bid
              </a>
            </Reveal>
          </div>

          <Stagger className="grid md:grid-cols-2 gap-12">
            {demoConfig.services.map((service, i) => (
              <div key={service.title} className="group flex gap-8 items-start border-b-4 border-[var(--fg-muted)]/20 pb-8 hover:border-[var(--accent)] transition-colors">
                <span className="text-[var(--accent)] text-5xl font-black" style={{ fontFamily: "var(--font-display)" }}>0{i + 1}</span>
                <div>
                  <h3 className="text-3xl md:text-4xl uppercase mb-4 tracking-tight font-black" style={{ fontFamily: "var(--font-display)" }}>
                    {service.title}
                  </h3>
                  <p className="text-[var(--fg-muted)] font-medium text-lg leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Before/Afters ─────────────────────────────────── */}
      <section className="py-32 px-6 bg-[var(--surface-2)] relative z-[var(--z-content)]" data-surface="raised">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-5xl md:text-7xl uppercase tracking-tighter text-[var(--fg)] mb-16 text-center" style={{ fontFamily: "var(--font-display)" }}>
              Transformation
            </h2>
          </Reveal>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <BeforeAfterSlider 
                before={<SmartImage src="/images/kitchen-a.jpg" alt="Before" width={800} height={600} className="w-full h-full object-cover" priority />}
                after={<SmartImage src="/images/kitchen-b.jpg" alt="After" width={800} height={600} className="w-full h-full object-cover" priority />}
              />
              <p className="mt-4 text-center font-bold uppercase tracking-widest text-[var(--fg-muted)] text-sm">Representative project: Kitchen Remodel</p>
            </div>
            <div>
              <BeforeAfterSlider 
                before={<SmartImage src="/images/project-1.jpg" alt="Before" width={800} height={600} className="w-full h-full object-cover" priority />}
                after={<SmartImage src="/images/finished-home.jpg" alt="After" width={800} height={600} className="w-full h-full object-cover" priority />}
              />
              <p className="mt-4 text-center font-bold uppercase tracking-widest text-[var(--fg-muted)] text-sm">Representative project: Exterior Renovation</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Project Gallery ───────────────────────────────── */}
      <section id="projects" className="py-32 px-6 bg-[var(--surface)] relative z-[var(--z-content)]" data-surface="raised">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-6xl md:text-8xl uppercase tracking-tighter text-[var(--fg)] mb-12" style={{ fontFamily: "var(--font-display)" }}>
              Featured Work
            </h2>
          </Reveal>
          
          <Tabs 
            tabs={[
              { label: "All Projects", content: (
                <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                  {projects.map((proj, i) => (
                    <div key={i} className="aspect-[4/3] bg-[var(--bg)] border-2 border-[var(--border)]/20 relative group overflow-hidden shadow-lg">
                      <div className="absolute inset-0 z-0">
                        <SmartImage src={proj.src} alt={proj.title} width={800} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" priority={i < 6} />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--inverse-bg)] via-[var(--inverse-bg)]/20 to-transparent opacity-80 z-10" />
                      <div className="absolute bottom-6 left-6 right-6 z-20">
                        <div className="h-1 w-12 bg-[var(--accent)] mb-4 transform origin-left group-hover:scale-x-150 transition-transform" />
                        <p className="text-[var(--inverse-fg)] font-bold uppercase tracking-widest text-lg">{proj.title}</p>
                        <p className="text-[var(--fg-muted)] text-sm font-medium">{proj.category}</p>
                      </div>
                    </div>
                  ))}
                </Stagger>
              )}
            ]}
          />
        </div>
      </section>

      {/* ─── Process ───────────────────────────────────────── */}
      <section id="process" className="bg-[var(--bg)] relative z-[var(--z-content)] pt-32 pb-16 border-t-2 border-[var(--border)]/30" data-surface="base">
        <div className="max-w-7xl mx-auto px-6 mb-24 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <Reveal>
              <h2 className="text-6xl md:text-8xl uppercase tracking-tighter text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }}>
                How We Build
              </h2>
            </Reveal>
          </div>
          <div className="md:w-1/2">
            <div className="border-l-4 border-[var(--accent)] pl-6">
               <p className="text-xl text-[var(--fg-muted)] font-medium leading-relaxed">
                 From blueprints to final inspection, our process is built on precision, transparency, and relentless quality control.
               </p>
            </div>
          </div>
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

      {/* ─── Badges ────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[var(--fg)] relative z-[var(--z-content)] text-[var(--inverse-fg)]" data-surface="inverse">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-7xl uppercase tracking-tighter mb-8" style={{ fontFamily: "var(--font-display)" }}>
            Certified. Bonded. Proven.
          </h2>
          <div className="flex flex-wrap gap-4 mb-8">
            <span className="px-4 py-2 border-2 border-[var(--inverse-fg)] font-bold uppercase tracking-widest text-sm bg-[var(--inverse-bg)]/50 backdrop-blur">OSHA 30 Certified</span>
            <span className="px-4 py-2 border-2 border-[var(--inverse-fg)] font-bold uppercase tracking-widest text-sm bg-[var(--inverse-bg)]/50 backdrop-blur">A+ BBB Rating</span>
            <span className="px-4 py-2 border-2 border-[var(--inverse-fg)] font-bold uppercase tracking-widest text-sm bg-[var(--inverse-bg)]/50 backdrop-blur">Fully Insured $10M+</span>
            <span className="px-4 py-2 border-2 border-[var(--accent)] font-bold uppercase tracking-widest text-sm bg-[var(--inverse-bg)]/80 backdrop-blur text-[var(--on-accent)]">License: {(demoFeatures as any).licenseNumber || "LIC-123456"}</span>
          </div>
        </div>
      </section>

      {/* ─── Service Area ──────────────────────────────────── */}
      <section className="py-16 px-6 bg-[var(--bg)] relative z-[var(--z-content)]" data-surface="base">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-md shadow-[16px_16px_0_0_var(--accent)] p-10 border-t-4 border-[var(--accent)]">
            <h2 className="text-3xl uppercase tracking-tight mb-4 font-black text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }}>Service Areas</h2>
            <p className="text-[var(--fg-muted)] font-medium mb-6">Serving the greater metropolitan region and surrounding counties.</p>
            <ul className="grid grid-cols-2 gap-4 font-bold uppercase tracking-widest text-sm text-[var(--fg)]">
              <li className="flex items-center gap-2"><div className="w-2 h-2 flex-shrink-0 bg-[var(--accent)]"/> Denver County</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 flex-shrink-0 bg-[var(--accent)]"/> Arapahoe County</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 flex-shrink-0 bg-[var(--accent)]"/> Jefferson County</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 flex-shrink-0 bg-[var(--accent)]"/> Adams County</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ──────────────────────────────────── */}
      <section className="py-32 px-6 bg-[var(--surface-2)] relative z-[var(--z-content)]" data-surface="raised">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-6xl md:text-8xl uppercase tracking-tighter text-[var(--fg)] mb-24 text-center" style={{ fontFamily: "var(--font-display)" }}>
              Track Record
            </h2>
          </Reveal>

          <Stagger className="grid md:grid-cols-3 gap-8">
            {demoConfig.testimonials.map((t) => (
              <div key={t.name} className="bg-[var(--surface)] p-8 border-t-8 border-[var(--accent)] shadow-xl hover:-translate-y-2 transition-transform">
                <div className="flex gap-1 text-[var(--accent)] mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  ))}
                </div>
                <blockquote className="text-[var(--fg)] font-medium leading-relaxed mb-8">
                  "{t.text}"
                </blockquote>
                <p className="font-black uppercase tracking-widest text-[var(--fg-muted)] text-sm">{t.name}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Quote Form ────────────────────────────────────── */}
      <section id="quote" className="py-32 px-6 bg-[var(--bg)] relative z-[var(--z-content)]" data-surface="base">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-6xl md:text-8xl uppercase tracking-tighter text-[var(--fg)] mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Start a Project
              </h2>
            </Reveal>
            <p className="text-[var(--fg-muted)] text-xl font-medium">Fill out the form below and our estimating team will reach out within 24 hours.</p>
          </div>
          
          <div className="bg-[var(--surface)] p-8 md:p-12 border-2 border-[var(--border)]/30 shadow-2xl" data-surface="raised">
             <style dangerouslySetInnerHTML={{ __html: `
              .contact-form-error, [role="alert"] { 
                 color: var(--fg) !important; 
                 font-weight: bold;
              }
            `}} />
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────── */}
      <div className="relative z-[var(--z-content)] border-t-8 border-[var(--accent)] bg-[var(--fg)] text-[var(--inverse-fg)]" data-surface="inverse">
        <Footer
          brand={demoConfig.brand.name}
          links={[
            { label: "Careers", href: "#" },
            { label: "Subcontractor Portal", href: "#" },
            { label: "Privacy Policy", href: "#" },
          ]}
        />
      </div>
      
      {/* ─── Sticky Mobile CTA ─────────────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[var(--z-sticky)] bg-[var(--inverse-bg)] text-[var(--inverse-fg)] p-4 border-t-4 border-[var(--accent)] shadow-[0_-4px_10px_var(--inverse-bg)]">
         <div className="flex justify-between items-center gap-4 max-w-md mx-auto">
           <a href={`tel:${demoConfig.brand.phone.replace(/[^0-9+]/g, '')}`} className="flex-1 text-center min-h-[44px] flex items-center justify-center font-bold uppercase tracking-widest text-sm bg-[var(--accent)] text-[var(--on-accent)] hover:brightness-110 active:brightness-90 transition-all">
             Call Now
           </a>
           <a href="#quote" className="flex-1 text-center min-h-[44px] flex items-center justify-center font-bold uppercase tracking-widest text-sm border-2 border-[var(--inverse-fg)] hover:bg-[var(--inverse-fg)] hover:text-[var(--inverse-bg)] transition-colors">
             Get Quote
           </a>
         </div>
      </div>
    </main>
  );
}
