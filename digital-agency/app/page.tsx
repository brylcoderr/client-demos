"use client";

import React from "react";
import {
  StickyNav,
  CustomCursor,
  MagneticButton,
  Marquee,
  Stagger,
  Reveal,
  ContactForm,
  Footer,
  Accordion
} from "@client-demos/core";
import { demoConfig as config } from "../demo.config";
import { Hero3DShader } from "./components/Hero3DShader";
import { ScrambleText } from "./components/ScrambleText";
import { ScrubReveal } from "./components/ScrubReveal";
import { ROISlider } from "./components/ROISlider";
import { DrawerChartTrigger } from "./components/DrawerChartTrigger";
import { ArrowUpRight, Check } from "lucide-react";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
];

export default function Page() {
  return (
    <>
      <div className="hidden md:block pointer-events-none">
        <CustomCursor />
      </div>
      
      <StickyNav 
        logo={<span className="font-bold text-2xl tracking-tighter mix-blend-difference text-white">{config.brand.name}</span>} 
        links={navLinks} 
      />

      <main id="main-content">
        {/* ─── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[var(--bg)]">
          <Hero3DShader />
          <div className="absolute inset-0 z-[var(--z-content)] bg-black/75 pointer-events-none" />
          
          <div className="relative z-[var(--z-content)] pointer-events-none w-full max-w-5xl mx-auto flex flex-col items-center mt-20">
            <ScrambleText 
              text="Defy Gravity." 
              tag="h1" 
              className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-none mb-6 mix-blend-difference text-[var(--fg)]" 
            />
            <Reveal delay={0.3}>
              <p className="text-xl md:text-3xl text-[var(--fg)] max-w-2xl font-light mix-blend-difference">
                {config.brand.tagline}
              </p>
            </Reveal>
            
            <Reveal delay={0.6} className="mt-12 pointer-events-auto">
              <MagneticButton className="bg-[var(--accent)] text-[var(--on-accent)] px-10 py-5 font-bold uppercase tracking-widest rounded-full hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] transition-all duration-500">
                Start a Project
              </MagneticButton>
            </Reveal>
          </div>
        </section>

        {/* ─── Services ──────────────────────────────────────────────────────── */}
        <section id="services" className="py-32 px-6" data-surface="base">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
               <ScrambleText text="Our Capabilities" className="text-4xl md:text-7xl font-bold uppercase" />
               <p className="max-w-md text-xl text-[var(--fg-muted)]">
                 We blend deep technical expertise with avant-garde design to build the impossible.
               </p>
            </div>
            
            <Stagger className="grid md:grid-cols-2 gap-8">
               {config.services.map((s, i) => (
                 <div key={i} className="group p-10 bg-[var(--surface)] hover:bg-[var(--surface-2)] transition-colors duration-500 rounded-[var(--radius)] border border-[var(--border)] relative overflow-hidden cursor-pointer" data-surface="raised">
                    <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-[var(--accent-2)]">
                       <ArrowUpRight size={40} />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{s.title}</h3>
                    <p className="text-[var(--fg-muted)] text-lg mb-8 max-w-sm">{s.description}</p>
                    <p className="text-sm uppercase tracking-widest font-semibold text-[var(--accent)]">{s.price}</p>
                 </div>
               ))}
            </Stagger>
          </div>
        </section>

        {/* ─── Case Studies (Scrubbed) ───────────────────────────────────────── */}
        <section id="work" className="py-32 px-6 bg-[var(--fg)] text-[var(--bg)] rounded-t-[3rem]" data-surface="inverse">
          <div className="max-w-7xl mx-auto">
            <Reveal>
               <h2 className="text-4xl md:text-7xl font-bold uppercase mb-24 text-[var(--inverse-fg)]">Selected Work</h2>
            </Reveal>

            <div className="flex flex-col gap-32">
               {config.caseStudies.map((work, i) => (
                 <ScrubReveal key={work.id}>
                   <div className={`flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
                      <div className="flex-1 w-full relative aspect-[4/3] rounded-[var(--radius)] overflow-hidden bg-[var(--surface)]">
                         <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
                            {work.tags.includes('Dashboard') ? (
                              <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="800" height="600" rx="24" fill="var(--surface-2)" />
                                <rect x="40" y="40" width="200" height="520" rx="12" fill="var(--bg)" opacity="0.3" />
                                <rect x="280" y="40" width="480" height="200" rx="12" fill="currentColor" className="text-[var(--accent)]" opacity="0.4" />
                                <circle cx="520" cy="140" r="60" fill="currentColor" className="text-[var(--accent-2)]" opacity="0.8" />
                                <rect x="280" y="280" width="220" height="280" rx="12" fill="var(--bg)" opacity="0.3" />
                                <rect x="540" y="280" width="220" height="280" rx="12" fill="var(--bg)" opacity="0.3" />
                              </svg>
                            ) : work.tags.includes('E-Commerce') ? (
                              <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="800" height="600" rx="24" fill="var(--surface-2)" />
                                <rect x="100" y="100" width="300" height="400" rx="12" fill="currentColor" className="text-[var(--accent-2)]" opacity="0.4" />
                                <rect x="460" y="200" width="200" height="30" rx="8" fill="var(--bg)" opacity="0.3" />
                                <rect x="460" y="260" width="150" height="20" rx="8" fill="var(--bg)" opacity="0.3" />
                                <rect x="460" y="400" width="240" height="60" rx="12" fill="currentColor" className="text-[var(--accent)]" />
                              </svg>
                            ) : (
                              <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="800" height="600" rx="24" fill="var(--surface-2)" />
                                <circle cx="400" cy="300" r="150" fill="currentColor" className="text-[var(--accent-3)]" opacity="0.4" />
                                <rect x="200" y="200" width="400" height="200" rx="24" fill="currentColor" className="text-[var(--accent)]" opacity="0.6" style={{ backdropFilter: 'blur(10px)' }} />
                              </svg>
                            )}
                         </div>
                         {/* SVG wordmark overlay for logo */}
                         <div className="absolute top-4 left-4 mix-blend-difference pointer-events-none">
                           <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <text x="0" y="25" fill="white" fontSize="20" fontWeight="bold" fontFamily="var(--font-display)">{work.client}</text>
                           </svg>
                         </div>
                      </div>
                      
                      <div className="flex-1 w-full text-[var(--inverse-fg)]">
                         <div className="flex gap-4 mb-6">
                           {work.tags.map(tag => (
                             <span key={tag} className="text-xs font-bold uppercase tracking-widest border border-[var(--inverse-fg)] px-3 py-1 rounded-full opacity-70">
                               {tag}
                             </span>
                           ))}
                         </div>
                         <h3 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{work.title}</h3>
                         <p className="text-xl opacity-80 mb-12 max-w-lg">{work.description}</p>
                         
                         <div className="grid grid-cols-2 gap-8 border-t border-[var(--bg)]/10 pt-8">
                           {work.metrics.map(m => (
                             <div key={m.label}>
                               <p className="text-4xl font-bold mb-2" style={{ color: "var(--bg)" }}>{m.value}</p>
                               <p className="text-sm uppercase tracking-widest opacity-80 font-semibold">{m.label}</p>
                             </div>
                           ))}
                         </div>
                         
                         <div className="mt-12 inline-block">
                           <DrawerChartTrigger title={work.title} client={work.client} />
                         </div>
                      </div>
                   </div>
                 </ScrubReveal>
               ))}
            </div>
          </div>
        </section>

        {/* ─── Process ───────────────────────────────────────────────────────── */}
        <section id="process" className="py-32 px-6" data-surface="accent">
          <div className="max-w-5xl mx-auto">
            <ScrambleText text="The Process" className="text-4xl md:text-7xl font-bold uppercase mb-20 text-center text-[var(--on-accent)]" />
            
            <Stagger className="flex flex-col gap-8">
               {config.process.map(p => (
                 <div key={p.step} className="flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center border-b border-[var(--on-accent)]/20 pb-8 text-[var(--on-accent)]">
                    <span className="text-6xl md:text-8xl font-bold text-[var(--on-accent)]/30 tracking-tighter">{p.step}</span>
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold mb-4">{p.title}</h3>
                      <p className="text-lg opacity-90 max-w-2xl text-[var(--on-accent)]">{p.description}</p>
                    </div>
                 </div>
               ))}
            </Stagger>
          </div>
        </section>

        {/* ─── Tech Stack Marquee ────────────────────────────────────────────── */}
        <section className="py-24 overflow-hidden border-b border-[var(--border)]" data-surface="base">
           <Reveal>
             <p className="text-center text-sm uppercase tracking-widest text-[var(--fg-muted)] font-semibold mb-12">Powered by modern tech</p>
           </Reveal>
           <div className="text-5xl md:text-8xl font-bold text-[var(--fg)]/20 uppercase whitespace-nowrap">
             <Marquee items={config.techStack} />
           </div>
        </section>
        
        {/* ─── ROI Calculator ─────────────────────────────────────────────────── */}
        <section className="py-32 px-6" data-surface="base">
          <div className="max-w-4xl mx-auto p-12 bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--border)]" data-surface="raised">
            <h2 className="text-4xl md:text-5xl font-bold uppercase mb-12 text-center text-[var(--fg)]">Calculate Your ROI</h2>
            <div className="flex flex-col gap-12">
              <ROISlider label="Monthly Visitors" min={1000} max={100000} />
              <ROISlider label="Conversion Rate" min={1} max={15} suffix="%" />
              <ROISlider label="Average Order Value" min={50} max={1000} prefix="$" />
            </div>
          </div>
        </section>

        {/* ─── Pricing Tiers ─────────────────────────────────────────────────── */}
        <section id="pricing" className="py-32 px-6" data-surface="base">
          <div className="max-w-7xl mx-auto">
            <ScrambleText text="Engagement Models" className="text-4xl md:text-7xl font-bold uppercase mb-20 text-center text-[var(--fg)]" />
            
            <div className="grid md:grid-cols-3 gap-8">
               {config.pricing.map(tier => (
                 <div key={tier.tier} className={`p-10 rounded-[var(--radius)] border ${tier.highlight ? 'border-[var(--accent-2)] bg-[var(--surface-2)]' : 'border-[var(--border)] bg-[var(--surface)]'} relative flex flex-col`} data-surface="raised">
                   {tier.highlight && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--accent-2)] text-[var(--bg)] text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">Most Popular</div>}
                   
                   <h3 className="text-2xl font-bold uppercase mb-2 text-[var(--fg)]">{tier.tier}</h3>
                   <p className="text-[var(--fg-muted)] mb-8 h-12">{tier.description}</p>
                   <div className="text-4xl md:text-5xl font-bold mb-10 text-[var(--fg)]">{tier.price}</div>
                   
                   <div className="flex-1 flex flex-col gap-4 mb-10 text-[var(--fg)]">
                     {tier.features.map(f => (
                       <div key={f} className="flex items-center gap-3">
                         <Check size={18} className="text-[var(--accent-2)]" />
                         <span className="text-[var(--fg)]">{f}</span>
                       </div>
                     ))}
                   </div>
                   
                   <MagneticButton className={`w-full py-4 text-center font-bold uppercase tracking-widest ${tier.highlight ? 'bg-[var(--accent-2)] text-[var(--bg)]' : 'bg-[var(--surface-2)] text-[var(--fg)]'} hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]`}>
                     Select Plan
                   </MagneticButton>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* ─── Testimonials ──────────────────────────────────────────────────── */}
        <section className="py-32 px-6" data-surface="raised">
          <div className="max-w-3xl mx-auto text-center">
            <ScrambleText text="Testimonials" className="text-4xl md:text-7xl font-bold uppercase mb-16 text-[var(--fg)]" />
            <Accordion 
              items={config.testimonials.map(t => ({
                title: t.name,
                content: `"${t.text}"`
              }))} 
            />
          </div>
        </section>

        {/* ─── Contact ───────────────────────────────────────────────────────── */}
        <section className="py-32 px-6" data-surface="base">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
            <div>
              <ScrambleText text="Let's Talk." className="text-5xl md:text-8xl font-bold uppercase mb-8 text-[var(--fg)]" />
              <p className="text-xl text-[var(--fg-muted)] mb-8">Ready to build the impossible? Drop us a line.</p>
              <div className="flex flex-col gap-4">
                <a href={`mailto:${config.brand.email}`} className="text-2xl hover:text-[var(--accent-2)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-4 rounded text-[var(--fg)]">{config.brand.email}</a>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ────────────────────────────────────────────────────────── */}
      <div data-surface="raised">
        <Footer
          brand={config.brand.name}
          links={[
            { label: "Twitter", href: "#" },
            { label: "Dribbble", href: "#" },
            { label: "Github", href: "#" },
          ]}
        />
      </div>
    </>
  );
}
