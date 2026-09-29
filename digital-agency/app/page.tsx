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
  Accordion,
} from "@client-demos/core";
import { config } from "../demo.config";
import { Hero3DShader } from "./components/Hero3DShader";
import { ScrambleText } from "./components/ScrambleText";
import { ScrubReveal } from "./components/ScrubReveal";
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
      <CustomCursor />
      
      <StickyNav 
        logo={<span className="font-bold text-2xl tracking-tighter mix-blend-difference">{config.brand.name}</span>} 
        links={navLinks} 
      />

      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <Hero3DShader />
        
        <div className="relative z-10 pointer-events-none w-full max-w-5xl mx-auto flex flex-col items-center mt-20">
          <ScrambleText 
            text="Defy Gravity." 
            tag="h1" 
            className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-none mb-6 mix-blend-difference" 
          />
          <Reveal delay={0.3}>
            <p className="text-xl md:text-3xl text-[var(--muted)] max-w-2xl font-light mix-blend-difference">
              {config.brand.tagline}
            </p>
          </Reveal>
          
          <Reveal delay={0.6} className="mt-12 pointer-events-auto">
            <MagneticButton className="bg-[var(--accent2)] text-black px-10 py-5 font-bold uppercase tracking-widest rounded-full hover:bg-[var(--accent)] transition-colors duration-500">
              Start a Project
            </MagneticButton>
          </Reveal>
        </div>
      </section>

      {/* ─── Services ──────────────────────────────────────────────────────── */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
             <ScrambleText text="Our Capabilities" className="text-4xl md:text-7xl font-bold uppercase" />
             <p className="max-w-md text-xl text-[var(--muted)]">
               We blend deep technical expertise with avant-garde design to build the impossible.
             </p>
          </div>
          
          <Stagger className="grid md:grid-cols-2 gap-8">
             {config.services.map((s, i) => (
               <div key={i} className="group p-10 bg-[var(--fg)]/5 hover:bg-[var(--accent)]/10 transition-colors duration-500 rounded-[var(--radius)] border border-[var(--fg)]/10 hover:border-[var(--accent)]/50 relative overflow-hidden cursor-pointer">
                  <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-[var(--accent2)]">
                     <ArrowUpRight size={40} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{s.title}</h3>
                  <p className="text-[var(--muted)] text-lg mb-8 max-w-sm">{s.description}</p>
                  <p className="text-sm uppercase tracking-widest font-semibold text-[var(--accent)]">{s.price}</p>
               </div>
             ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Case Studies (Scrubbed) ───────────────────────────────────────── */}
      <section id="work" className="py-32 px-6 bg-[var(--fg)] text-[var(--bg)] rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
             <h2 className="text-4xl md:text-7xl font-bold uppercase mb-24">Selected Work</h2>
          </Reveal>

          <div className="flex flex-col gap-32">
             {config.caseStudies.map((work, i) => (
               <ScrubReveal key={work.id}>
                 <div className={`flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
                    <div className="flex-1 w-full relative aspect-[4/3] rounded-[var(--radius)] overflow-hidden bg-[var(--accent)]/20">
                       <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/40 to-[var(--accent2)]/40 mix-blend-overlay"></div>
                       {/* Placeholder for actual image */}
                    </div>
                    
                    <div className="flex-1 w-full">
                       <div className="flex gap-4 mb-6">
                         {work.tags.map(tag => (
                           <span key={tag} className="text-xs font-bold uppercase tracking-widest border border-[var(--bg)]/20 px-3 py-1 rounded-full">
                             {tag}
                           </span>
                         ))}
                       </div>
                       <h3 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{work.title}</h3>
                       <p className="text-xl opacity-70 mb-12 max-w-lg">{work.description}</p>
                       
                       <div className="grid grid-cols-2 gap-8 border-t border-[var(--bg)]/10 pt-8">
                         {work.metrics.map(m => (
                           <div key={m.label}>
                             <p className="text-4xl font-bold mb-2 text-[var(--accent2)]">{m.value}</p>
                             <p className="text-sm uppercase tracking-widest opacity-60 font-semibold">{m.label}</p>
                           </div>
                         ))}
                       </div>
                    </div>
                 </div>
               </ScrubReveal>
             ))}
          </div>
        </div>
      </section>

      {/* ─── Process ───────────────────────────────────────────────────────── */}
      <section id="process" className="py-32 px-6 bg-[var(--accent)] text-[var(--fg)]">
        <div className="max-w-5xl mx-auto">
          <ScrambleText text="The Process" className="text-4xl md:text-7xl font-bold uppercase mb-20 text-center" />
          
          <Stagger className="flex flex-col gap-8">
             {config.process.map(p => (
               <div key={p.step} className="flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center border-b border-[var(--fg)]/20 pb-8">
                  <span className="text-6xl md:text-8xl font-bold text-[var(--fg)]/30 tracking-tighter">{p.step}</span>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">{p.title}</h3>
                    <p className="text-lg opacity-90 max-w-2xl">{p.description}</p>
                  </div>
               </div>
             ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Tech Stack Marquee ────────────────────────────────────────────── */}
      <section className="py-24 overflow-hidden border-b border-[var(--fg)]/10">
         <Reveal>
           <p className="text-center text-sm uppercase tracking-widest text-[var(--muted)] font-semibold mb-12">Powered by modern tech</p>
         </Reveal>
         <div className="text-5xl md:text-8xl font-bold text-[var(--fg)]/10 uppercase whitespace-nowrap">
           <Marquee items={config.techStack} />
         </div>
      </section>

      {/* ─── Pricing Tiers ─────────────────────────────────────────────────── */}
      <section id="pricing" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrambleText text="Engagement Models" className="text-4xl md:text-7xl font-bold uppercase mb-20 text-center" />
          
          <div className="grid md:grid-cols-3 gap-8">
             {config.pricing.map(tier => (
               <div key={tier.tier} className={`p-10 rounded-[var(--radius)] border ${tier.highlight ? 'border-[var(--accent2)] bg-[var(--accent2)]/10' : 'border-[var(--fg)]/10 bg-[var(--fg)]/5'} relative flex flex-col`}>
                 {tier.highlight && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--accent2)] text-black text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">Most Popular</div>}
                 
                 <h3 className="text-2xl font-bold uppercase mb-2">{tier.tier}</h3>
                 <p className="text-[var(--muted)] mb-8 h-12">{tier.description}</p>
                 <div className="text-4xl md:text-5xl font-bold mb-10">{tier.price}</div>
                 
                 <div className="flex-1 flex flex-col gap-4 mb-10">
                   {tier.features.map(f => (
                     <div key={f} className="flex items-center gap-3">
                       <Check size={18} className="text-[var(--accent2)]" />
                       <span className="opacity-90">{f}</span>
                     </div>
                   ))}
                 </div>
                 
                 <MagneticButton className={`w-full py-4 text-center font-bold uppercase tracking-widest ${tier.highlight ? 'bg-[var(--accent2)] text-black' : 'bg-[var(--fg)] text-[var(--bg)]'}`}>
                   Select Plan
                 </MagneticButton>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ──────────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-[var(--fg)]/5">
        <div className="max-w-3xl mx-auto text-center">
          <ScrambleText text="Testimonials" className="text-4xl md:text-7xl font-bold uppercase mb-16" />
          <Accordion 
            items={config.testimonials.map(t => ({
              title: t.name,
              content: `"${t.text}"`
            }))} 
          />
        </div>
      </section>

      {/* ─── Contact ───────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <ScrambleText text="Let's Talk." className="text-5xl md:text-8xl font-bold uppercase mb-8" />
            <p className="text-xl text-[var(--muted)] mb-8">Ready to build the impossible? Drop us a line.</p>
            <div className="flex flex-col gap-4">
              <a href={`mailto:${config.brand.email}`} className="text-2xl hover:text-[var(--accent2)] transition-colors">{config.brand.email}</a>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────────────────────── */}
      <Footer
        brand={config.brand.name}
        links={[
          { label: "Twitter", href: "#" },
          { label: "Dribbble", href: "#" },
          { label: "Github", href: "#" },
        ]}
      />
    </>
  );
}
