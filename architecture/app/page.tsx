"use client";

import {
  StickyNav,
  SplitTextReveal,
  Reveal,
  Stagger,
  HorizontalScrollSection,
  ContactForm,
  Footer,
  HeroCanvas
} from "@client-demos/core";
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
    // Subtle clip-path reveals on images as they enter viewport
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
  }, []);

  return (
    <>
      <StickyNav 
        logo={demoConfig.brand.name} 
        links={navLinks} 
      />
      
      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-[var(--bg)]">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
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
        <div className="relative z-10 pointer-events-none flex flex-col items-center mt-32">
          <SplitTextReveal
            text={demoConfig.brand.name}
            tag="h1"
            className="text-6xl md:text-8xl lg:text-9xl font-light tracking-[0.1em] text-[var(--fg)] uppercase drop-shadow-md"
          />

          <Reveal delay={0.5}>
            <p className="mt-8 text-lg md:text-xl text-[var(--muted)] max-w-2xl font-light tracking-widest uppercase">
              {demoConfig.brand.tagline}
            </p>
          </Reveal>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center gap-4 opacity-50">
          <span className="text-xs uppercase tracking-widest text-[var(--fg)]">Drag to rotate</span>
          <div className="w-px h-16 bg-gradient-to-b from-[var(--fg)] to-transparent" />
        </div>
      </section>

      {/* ─── Horizontal Selected Works ─────────────────────── */}
      <section id="works" className="bg-[var(--accent2)] relative z-20 overflow-hidden py-32">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-light tracking-widest text-[var(--fg)] uppercase">
              Selected Works
            </h2>
          </Reveal>
        </div>

        {/* Generate dynamic placeholder slides for the horizontal scroller */}
        <HorizontalScrollSection>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-[60vh] w-[80vw] md:w-[50vw] bg-[var(--bg)] relative overflow-hidden group">
              {/* Image reveal effect */}
              <div 
                ref={(el) => { clipRefs.current[i] = el; }}
                className="absolute inset-0 bg-gradient-to-br from-[var(--accent2)] to-[var(--muted)] opacity-50 transition-transform duration-1000 group-hover:scale-105"
              />
              {/* SVG Architectural graphic */}
              <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 text-[var(--bg)] opacity-30 mix-blend-overlay" viewBox="0 0 100 100" stroke="currentColor" fill="none" strokeWidth="0.5">
                {i % 2 === 0 ? <path d="M10 90L90 90M50 10L10 90M50 10L90 90" /> : <path d="M10 90h80M30 90V30h40v60M40 90V50h20v40" />}
              </svg>
              
              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-[var(--bg)] to-transparent text-[var(--fg)]">
                <span className="text-[var(--accent)] text-xs uppercase tracking-widest font-bold">0{i+1}</span>
                <h3 className="text-3xl font-light tracking-widest mt-2 uppercase">Project {i+1}</h3>
                <p className="text-[var(--muted)] text-sm uppercase tracking-widest mt-2">Residential / 202{i+3}</p>
              </div>
            </div>
          ))}
        </HorizontalScrollSection>
      </section>

      {/* ─── Studio Philosophy & Parallax ──────────────────── */}
      <section id="studio" className="py-40 px-6 bg-[var(--bg)] relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="text-3xl md:text-5xl font-light leading-relaxed tracking-wide text-[var(--fg)]">
              "We practice critical regionalism—designing modern spaces that deeply respond to their geographical and cultural context."
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── Practice & Services ───────────────────────────── */}
      <section id="practice" className="py-32 px-6 bg-[var(--accent2)] relative z-20">
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
                  <div className="border-t border-[var(--muted)]/20 pt-8">
                    <h3 className="text-2xl font-light tracking-widest uppercase mb-4 text-[var(--fg)]">
                      {service.title}
                    </h3>
                    <p className="text-[var(--muted)] font-light leading-relaxed text-lg">
                      {service.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-end">
            <div className="grid grid-cols-2 gap-12 border-t border-[var(--muted)]/20 pt-8">
              {demoConfig.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.1}>
                  <div>
                    <p className="text-5xl font-light text-[var(--accent)] mb-2">{stat.value}</p>
                    <p className="text-[var(--muted)] text-xs uppercase tracking-widest">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Team ──────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-[var(--bg)] relative z-20">
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
                  <div className="absolute inset-0 bg-[var(--muted)] opacity-10 group-hover:opacity-30 transition-opacity duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                     <span className="text-[var(--bg)] font-light text-xl tracking-widest uppercase">{member.name.split(' ')[0]}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-light uppercase tracking-widest text-[var(--fg)] mb-2">{member.name}</h3>
                <p className="text-[var(--accent)] text-xs uppercase tracking-widest mb-6 font-bold">{member.role}</p>
                <p className="text-[var(--muted)] font-light leading-relaxed text-sm">{member.bio}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Inquiries Form ────────────────────────────────── */}
      <section id="inquiries" className="py-32 px-6 bg-[var(--accent2)] relative z-20 border-t border-[var(--muted)]/20">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-light tracking-widest text-[var(--fg)] uppercase mb-6 text-center">
              New Projects
            </h2>
            <p className="text-center text-[var(--muted)] font-light mb-16">
              We are currently accepting inquiries for late 2026 / 2027.
            </p>
          </Reveal>
          
          <div className="bg-[var(--bg)] p-12">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────── */}
      <div className="relative z-20 border-t border-[var(--muted)]/10">
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
