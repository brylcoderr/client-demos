"use client";

import React from "react";
import {
  StickyNav,
  SplitTextReveal,
  Reveal,
  Stagger,
  HorizontalScrollSection,
  BeforeAfterSlider,
  ContactForm,
  MagneticButton,
  Footer,
} from "@client-demos/core";
import { config } from "../demo.config";
import { Hero3DWheel } from "./components/Hero3DWheel";
import { Phone, CheckCircle, MapPin, Clock } from "lucide-react";

export default function Page() {
  return (
    <>
      {/* ─── Custom Nav ────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-5 flex justify-between items-center mix-blend-difference text-white border-b border-white/10">
        <div className="text-2xl font-black tracking-widest uppercase" style={{ fontFamily: "var(--font-display)" }}>
          {config.brand.name}
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase font-semibold text-white/70">
            <a href="#services" className="hover:text-[var(--accent)] transition-colors">Services</a>
            <a href="#process" className="hover:text-[var(--accent)] transition-colors">Process</a>
            <a href="#gallery" className="hover:text-[var(--accent)] transition-colors">Gallery</a>
          </div>
          <MagneticButton className="bg-[var(--accent)] text-white px-6 py-3 font-bold uppercase tracking-widest flex items-center gap-2">
            <Phone size={18} /> Call Now
          </MagneticButton>
        </div>
      </nav>

      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 overflow-hidden">
        <Hero3DWheel />
        
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center pointer-events-none mt-[20vh] md:mt-0 drop-shadow-2xl">
          <SplitTextReveal
            text="Precision in Motion"
            tag="h1"
            className="text-5xl md:text-8xl lg:text-[7rem] font-black tracking-tighter uppercase mb-6"
          />
          <Reveal delay={0.3}>
            <p className="text-xl md:text-3xl text-[var(--fg)] max-w-2xl font-bold px-6 py-2 bg-[var(--bg)]/80 backdrop-blur-sm border-l-4 border-[var(--accent)] text-left">
              {config.brand.tagline}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── Stats Banner ──────────────────────────────────────────────────── */}
      <section className="py-12 px-6 bg-[var(--accent)] text-white">
         <Stagger className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
           {config.stats.map(s => (
             <div key={s.label}>
               <p className="text-4xl md:text-5xl font-black mb-2" style={{ fontFamily: "var(--font-display)" }}>{s.value}</p>
               <p className="text-sm uppercase tracking-widest font-semibold opacity-90">{s.label}</p>
             </div>
           ))}
         </Stagger>
      </section>

      {/* ─── Horizontal Services Track ─────────────────────────────────────── */}
      <div id="services" className="bg-[var(--bg)] text-[var(--fg)] border-y border-[var(--muted)]/20">
        <div className="pt-24 px-12 md:hidden">
          <SplitTextReveal text="Our Services" tag="h2" className="text-4xl font-black uppercase mb-12" />
        </div>
        <HorizontalScrollSection className="md:border-t md:border-[var(--muted)]/20">
           {/* Title slide for desktop */}
           <div className="hidden md:flex flex-col justify-center h-full max-w-xl pr-12">
             <SplitTextReveal text="Our Services" tag="h2" className="text-7xl font-black uppercase leading-tight mb-6" />
             <p className="text-xl text-[var(--muted)]">Industry-leading equipment, factory-certified technicians, and uncompromising standards.</p>
           </div>
           
           {config.services.map((s, i) => (
             <div key={i} className="w-full md:w-[600px] h-full flex flex-col justify-center bg-[var(--fg)]/5 p-12 md:mx-6 border border-[var(--fg)]/10 group hover:border-[var(--accent)] transition-colors relative">
               <div className="text-6xl text-[var(--muted)]/20 font-black absolute top-6 right-8 group-hover:text-[var(--accent)]/20 transition-colors" style={{ fontFamily: "var(--font-display)" }}>0{i+1}</div>
               <h3 className="text-3xl font-bold uppercase mb-6" style={{ fontFamily: "var(--font-display)" }}>{s.title}</h3>
               <p className="text-[var(--muted)] text-xl mb-12 flex-1">{s.description}</p>
               <div className="text-[var(--accent)] font-bold tracking-widest uppercase border-t border-[var(--muted)]/20 pt-6">
                 {s.price}
               </div>
             </div>
           ))}
        </HorizontalScrollSection>
      </div>

      {/* ─── Repair Process Steps ──────────────────────────────────────────── */}
      <section id="process" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <SplitTextReveal text="The Apex Process" tag="h2" className="text-4xl md:text-6xl font-black uppercase mb-20 text-center" />
          
          <div className="grid md:grid-cols-2 gap-16 relative">
             <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-[var(--muted)]/20"></div>
             
             {config.repairProcess.map((step, i) => (
               <Reveal key={step.step} delay={i * 0.1}>
                 <div className={`flex flex-col bg-[var(--fg)]/5 p-10 border-t-4 border-[var(--accent)] ${i % 2 === 0 ? 'md:mr-8 md:text-right md:items-end' : 'md:ml-8 md:mt-32'}`}>
                    <span className="text-[var(--accent)] text-5xl font-black mb-4" style={{ fontFamily: "var(--font-display)" }}>{step.step}</span>
                    <h3 className="text-2xl font-bold uppercase mb-4">{step.title}</h3>
                    <p className="text-[var(--muted)]">{step.description}</p>
                 </div>
               </Reveal>
             ))}
          </div>
        </div>
      </section>

      {/* ─── Before & After ────────────────────────────────────────────────── */}
      <section id="gallery" className="py-32 px-6 bg-[var(--fg)] text-[var(--bg)]">
        <div className="max-w-7xl mx-auto">
          <SplitTextReveal text="Results Speak" tag="h2" className="text-4xl md:text-6xl font-black uppercase mb-16 text-center" />
          
          <Stagger className="grid md:grid-cols-2 gap-12">
             {config.beforeAfter.map((ba) => (
               <div key={ba.id} className="bg-[var(--bg)] text-[var(--fg)] p-4 shadow-2xl">
                 <h3 className="text-xl font-bold uppercase tracking-widest mb-4 px-2">{ba.title}</h3>
                 <BeforeAfterSlider 
                   before={
                     <div className="w-full h-full bg-[var(--muted)] flex items-center justify-center font-black text-4xl opacity-20 uppercase tracking-widest">Before</div>
                   }
                   after={
                     <div className="w-full h-full bg-gradient-to-tr from-[var(--accent)] to-[var(--bg)] flex items-center justify-center font-black text-4xl uppercase tracking-widest text-white shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]">After</div>
                   }
                 />
                 <div className="flex justify-between px-2 mt-4 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
                   <span>Damage</span>
                   <span>Restored</span>
                 </div>
               </div>
             ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Estimate Form ─────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto bg-[var(--fg)]/5 border border-[var(--muted)]/20 p-8 md:p-16">
          <SplitTextReveal text="Request an Estimate" tag="h2" className="text-3xl md:text-5xl font-black uppercase mb-8" />
          <Reveal>
             <form className="grid md:grid-cols-2 gap-6">
               <div className="flex flex-col gap-2">
                 <label className="text-sm font-bold uppercase tracking-widest text-[var(--muted)]">Vehicle Make</label>
                 <input type="text" className="bg-[var(--bg)] border border-[var(--muted)]/30 px-4 py-3 focus:border-[var(--accent)] outline-none text-[var(--fg)]" />
               </div>
               <div className="flex flex-col gap-2">
                 <label className="text-sm font-bold uppercase tracking-widest text-[var(--muted)]">Vehicle Model & Year</label>
                 <input type="text" className="bg-[var(--bg)] border border-[var(--muted)]/30 px-4 py-3 focus:border-[var(--accent)] outline-none text-[var(--fg)]" />
               </div>
               <div className="flex flex-col gap-2 md:col-span-2">
                 <label className="text-sm font-bold uppercase tracking-widest text-[var(--muted)]">Describe the Issue</label>
                 <textarea rows={4} className="bg-[var(--bg)] border border-[var(--muted)]/30 px-4 py-3 focus:border-[var(--accent)] outline-none text-[var(--fg)]"></textarea>
               </div>
               <MagneticButton className="md:col-span-2 bg-[var(--accent)] text-white py-4 font-bold uppercase tracking-widest mt-4 hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors">
                 Submit Request
               </MagneticButton>
             </form>
          </Reveal>
        </div>
      </section>

      {/* ─── Reviews & Location Info ───────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-[var(--muted)]/20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
           {/* Reviews */}
           <div>
             <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-4">
                Client Reviews
             </h2>
             <Stagger className="flex flex-col gap-8">
               {config.testimonials.map(t => (
                 <div key={t.name} className="border-l-4 border-[var(--accent)] pl-6 py-2">
                    <p className="text-lg italic mb-4">"{t.text}"</p>
                    <p className="font-bold uppercase tracking-widest text-sm text-[var(--muted)]">{t.name}</p>
                 </div>
               ))}
             </Stagger>
           </div>
           
           {/* Info */}
           <div className="bg-[var(--fg)]/5 p-8 border border-[var(--muted)]/10">
              <h2 className="text-3xl font-black uppercase mb-8">Visit Us</h2>
              <Reveal delay={0.2}>
                <div className="flex gap-4 mb-6">
                  <MapPin className="text-[var(--accent)] shrink-0" />
                  <p className="text-lg">{config.brand.address}</p>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="flex gap-4 mb-6">
                  <Clock className="text-[var(--accent)] shrink-0" />
                  <div>
                    {config.brand.hours.map(h => <p key={h} className="text-lg">{h}</p>)}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="flex gap-4">
                  <Phone className="text-[var(--accent)] shrink-0" />
                  <p className="text-lg font-bold">{config.brand.phone}</p>
                </div>
              </Reveal>
           </div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────────────────────── */}
      <Footer
        brand={config.brand.name}
        links={[
          { label: "Home", href: "#" },
          { label: "Services", href: "#services" },
          { label: "Careers", href: "#" },
          { label: "Privacy Policy", href: "#" },
        ]}
      />
    </>
  );
}
