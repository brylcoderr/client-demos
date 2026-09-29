"use client";

import {
  StickyNav,
  SplitTextReveal,
  Reveal,
  Stagger,
  HorizontalScrollSection,
  ContactForm,
  Footer
} from "@client-demos/core";
import { SmartImage, HeroCanvas } from "@client-demos/core";
import { demoConfig } from "../demo.config";
import { HeroArch } from "./components/HeroArch";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const navLinks = [
  { label: "Selected Works", href: "#works" },
  { label: "Studio", href: "#studio" },
  { label: "Practice", href: "#practice" },
  { label: "Inquiries", href: "#inquiries" },
];

export default function Home() {
  const clipRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      clipRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(el, 
          { clipPath: "inset(100% 0 0 0)" },
          { 
            clipPath: "inset(0% 0 0 0)", 
            duration: 1.5, 
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: el,
              start: "top 85%"
            }
          }
        );
      });
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
      <section className="relative h-[100svh] w-full flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-[var(--bg)]" data-surface="base">
        {/* 3D Background */}
        <div className="absolute inset-0 z-[var(--z-base)]">
          <HeroCanvas 
            scene={<HeroArch />} 
            fallback={
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg)]">
                <svg className="w-1/2 h-1/2 text-[var(--accent)] opacity-10" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                  <path d="M10 90 L90 90 M30 90 L30 30 L70 30 L70 90 M40 90 L40 50 L60 50 L60 90" />
                </svg>
              </div>
            } 
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-[var(--z-content)] pointer-events-none flex flex-col items-center mt-32">
          <SplitTextReveal
            text={demoConfig.brand.name}
            tag="h1"
            className="text-6xl md:text-8xl lg:text-9xl font-light tracking-[0.1em] text-[var(--fg)] uppercase drop-shadow-md"
          />

          <Reveal delay={0.5}>
            <p className="mt-8 text-lg md:text-xl text-[var(--fg-muted)] max-w-2xl font-light tracking-widest uppercase">
              {demoConfig.brand.tagline}
            </p>
          </Reveal>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center gap-4">
          <span className="text-xs uppercase tracking-widest text-[var(--fg-muted)]">Drag to rotate</span>
          <div className="w-px h-16 bg-gradient-to-b from-[var(--fg-muted)] to-transparent" />
        </div>
      </section>

      {/* ─── Horizontal Selected Works ─────────────────────── */}
      <section id="works" className="bg-[var(--accent2)] relative z-[var(--z-content)] overflow-hidden py-32" data-surface="raised">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-light tracking-widest text-[var(--fg)] uppercase">
              Selected Works
            </h2>
          </Reveal>
        </div>

        {/* Generate dynamic placeholder slides for the horizontal scroller */}
        <HorizontalScrollSection>
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-[60vh] w-[80vw] md:w-[50vw] bg-[var(--bg)] relative overflow-hidden group">
              {/* Image reveal effect */}
              <div 
                ref={(el) => { clipRefs.current[i] = el; }}
                className="absolute inset-0 z-[var(--z-base)]"
              >
                <SmartImage src={`/images/project-${i+1}.jpg`} alt={`Project ${i+1}`} width={1200} height={800} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" priority={i < 2} />
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-[var(--bg)] to-transparent text-[var(--fg)] z-[var(--z-content)]">
                <span className="text-[var(--accent)] text-xs uppercase tracking-widest font-bold">0{i+1}</span>
                <h3 className="text-3xl font-light tracking-widest mt-2 uppercase text-[var(--fg)]">Project {i+1}</h3>
                <p className="text-[var(--fg-muted)] text-sm uppercase tracking-widest mt-2">Residential / 202{i%4+3}</p>
              </div>
            </div>
          ))}
        </HorizontalScrollSection>
      </section>

      {/* ─── Studio Philosophy & Parallax ──────────────────── */}
      <section id="studio" className="py-40 px-6 bg-[var(--bg)] relative z-[var(--z-content)] overflow-hidden" data-surface="inverse">
        <div className="absolute inset-0 z-[var(--z-base)]">
          <SmartImage src="/images/studio.jpg" alt="Architecture Model Desk" width={1600} height={900} className="w-full h-full object-cover opacity-40 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--scrim)] to-[var(--scrim)] opacity-70" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-[var(--z-content)]">
          <Reveal>
            <p className="text-3xl md:text-5xl font-light leading-relaxed tracking-wide text-[var(--fg)]">
              "We practice critical regionalism—designing modern spaces that deeply respond to their geographical and cultural context."
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── Practice & Services ───────────────────────────── */}
      <section id="practice" className="py-32 px-6 bg-[var(--accent2)] relative z-[var(--z-content)]" data-surface="raised">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24">
          <div>
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-light tracking-widest text-[var(--fg)] uppercase mb-16">
                Practice
              </h2>
            </Reveal>
            
            <div className="space-y-16">
              {demoConfig.services.map((service, i) => (
                <Reveal key={service.title} delay={i * 0.1}>
                  <div className="border-t border-[var(--fg-muted)]/20 pt-8">
                    <h3 className="text-2xl font-light tracking-widest uppercase mb-4 text-[var(--fg)]">
                      {service.title}
                    </h3>
                    <p className="text-[var(--fg-muted)] font-light leading-relaxed text-lg">
                      {service.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-end">
            <div className="grid grid-cols-2 gap-12 border-t border-[var(--fg-muted)]/20 pt-8">
              {demoConfig.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.1}>
                  <div>
                    <p className="text-5xl font-light text-[var(--accent)] mb-2">{stat.value}</p>
                    <p className="text-[var(--fg-muted)] text-xs uppercase tracking-widest">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Team ──────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-[var(--bg)] relative z-[var(--z-content)]" data-surface="base">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-light tracking-widest text-[var(--fg)] uppercase mb-24 text-center">
              Leadership
            </h2>
          </Reveal>

          <Stagger className="grid md:grid-cols-3 gap-16">
            {demoConfig.team.map((member, i) => (
              <div key={member.name} className="flex flex-col text-left group">
                <div 
                  ref={(el) => { clipRefs.current[10 + i] = el; }}
                  className="aspect-[3/4] bg-[var(--accent2)] mb-8 overflow-hidden relative"
                >
                  <SmartImage src={`/images/team-${i+1}.jpg`} alt={member.name} width={600} height={800} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--scrim)] via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none" />
                </div>
                <h3 className="text-2xl font-light uppercase tracking-widest text-[var(--fg)] mb-2">{member.name}</h3>
                <p className="text-[var(--accent)] text-xs uppercase tracking-widest mb-6 font-bold">{member.role}</p>
                <p className="text-[var(--fg-muted)] font-light leading-relaxed text-sm">{member.bio}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Inquiries Form ────────────────────────────────── */}
      <section id="inquiries" className="py-32 px-6 bg-[var(--accent2)] relative z-[var(--z-content)] border-t border-[var(--border)]" data-surface="raised">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-light tracking-widest text-[var(--fg)] uppercase mb-6 text-center">
              New Projects
            </h2>
            <p className="text-center text-[var(--fg-muted)] font-light mb-16">
              We are currently accepting inquiries for late 2026 / 2027.
            </p>
          </Reveal>
          
          <div className="bg-[var(--bg)] p-12" data-surface="base">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────── */}
      <div className="relative z-[var(--z-content)] border-t border-[var(--border)]" data-surface="base">
        <Footer
          brand={demoConfig.brand.name}
          links={[
            { label: "Journal", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Instagram", href: "#" },
          ]}
        />
      </div>
    </>
  );
}
