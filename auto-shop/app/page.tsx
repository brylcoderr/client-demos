"use client";

import React, { useState } from "react";
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
import { demoConfig as config } from "../demo.config";
import { Hero3DWheel } from "./components/Hero3DWheel";
import { Phone, CheckCircle, MapPin, Clock, Upload } from "lucide-react";

export default function Page() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  // Mock data for make/year as requested
  const vehicleMakes = ["Acura", "Audi", "BMW", "Chevrolet", "Ford", "Honda", "Lexus", "Mercedes-Benz", "Porsche", "Toyota"];
  const vehicleYears = Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i);

  return (
    <>
      {/* ─── Custom Nav ────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 w-full z-[var(--z-nav)] px-6 py-5 flex justify-between items-center mix-blend-difference text-[var(--on-accent)] border-b border-[var(--on-accent)]/10">
        <div className="text-2xl font-black tracking-widest uppercase" style={{ fontFamily: "var(--font-display)" }}>
          {config.brand.name}
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase font-semibold text-[var(--on-accent)] opacity-70">
            <a href="#services" className="hover:text-[var(--accent)] hover:opacity-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded">Services</a>
            <a href="#process" className="hover:text-[var(--accent)] hover:opacity-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded">Process</a>
            <a href="#gallery" className="hover:text-[var(--accent)] hover:opacity-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded">Gallery</a>
          </div>
          <a href={`tel:${config.brand.phone.replace(/[^0-9+]/g, '')}`} className="bg-[var(--accent)] text-[var(--on-accent)] px-6 py-3 font-bold uppercase tracking-widest flex items-center gap-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] hover:brightness-110 transition-all">
            <Phone size={18} /> Call Now
          </a>
        </div>
      </nav>

      <main id="main-content">
        {/* ─── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-6 pt-24 overflow-hidden bg-[var(--bg)]" data-surface="base">
          <Hero3DWheel />
          <div className="absolute inset-0 z-0 bg-[var(--bg)]/40 pointer-events-none" />
          
          <div className="relative z-[var(--z-content)] w-full max-w-5xl mx-auto flex flex-col items-center pointer-events-none mt-[20vh] md:mt-0 drop-shadow-2xl">
            <SplitTextReveal
              text="Precision in Motion"
              tag="h1"
              className="text-5xl md:text-8xl lg:text-[7rem] font-black tracking-tighter uppercase mb-6 text-[var(--fg)] drop-shadow-[0_4px_12px_rgba(0,0,0,1)]"
            />
            <Reveal delay={0.3}>
              <p className="text-xl md:text-3xl text-[var(--fg)] max-w-2xl font-bold px-6 py-2 bg-[var(--bg)]/90 backdrop-blur-sm border-l-4 border-[var(--accent)] text-left shadow-2xl">
                {config.brand.tagline}
              </p>
            </Reveal>
            <div className="md:hidden mt-8 pointer-events-auto">
               <a href={`tel:${config.brand.phone.replace(/[^0-9+]/g, '')}`} className="bg-[var(--accent)] text-[var(--on-accent)] px-8 py-4 font-bold uppercase tracking-widest flex items-center gap-2 rounded">
                 <Phone size={18} /> Call Now
               </a>
            </div>
          </div>
        </section>

        {/* ─── Stats Banner ──────────────────────────────────────────────────── */}
        <section className="py-12 px-6" data-surface="accent">
           <Stagger className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[var(--on-accent)]/20">
             {config.stats.map(s => (
               <div key={s.label}>
                 <p className="text-4xl md:text-5xl font-black mb-2 text-[var(--on-accent)]" style={{ fontFamily: "var(--font-display)" }}>{s.value}</p>
                 <p className="text-sm uppercase tracking-widest font-semibold text-[var(--on-accent)] opacity-90">{s.label}</p>
               </div>
             ))}
           </Stagger>
        </section>

        {/* ─── Horizontal Services Track ─────────────────────────────────────── */}
        <div id="services" data-surface="base" className="border-y border-[var(--border)]">
          <div className="pt-24 px-12 md:hidden">
            <SplitTextReveal text="Our Services" tag="h2" className="text-4xl font-black uppercase mb-12 text-[var(--fg)]" />
          </div>
          <HorizontalScrollSection className="md:border-t md:border-[var(--border)]">
             {/* Title slide for desktop */}
             <div className="hidden md:flex flex-col justify-center h-full max-w-xl pr-12">
               <SplitTextReveal text="Our Services" tag="h2" className="text-7xl font-black uppercase leading-tight mb-6 text-[var(--fg)]" />
               <p className="text-xl text-[var(--fg-muted)]">Industry-leading equipment, factory-certified technicians, and uncompromising standards.</p>
             </div>
             
             {config.services.map((s, i) => (
               <div key={i} className="w-full md:w-[600px] h-full flex flex-col justify-center p-12 md:mx-6 border border-[var(--border)] group hover:border-[var(--accent)] transition-colors relative bg-[var(--surface)]" data-surface="raised">
                 <div className="text-6xl text-[var(--fg-muted)] opacity-20 font-black absolute top-6 right-8 group-hover:text-[var(--accent)] transition-colors" style={{ fontFamily: "var(--font-display)" }}>0{i+1}</div>
                 <h3 className="text-3xl font-bold uppercase mb-6 text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }}>{s.title}</h3>
                 <p className="text-[var(--fg-muted)] text-xl mb-12 flex-1">{s.description}</p>
                 <div className="text-[var(--accent)] font-bold tracking-widest uppercase border-t border-[var(--border)] pt-6">
                   {s.price}
                 </div>
               </div>
             ))}
          </HorizontalScrollSection>
        </div>

        {/* ─── Repair Process Steps ──────────────────────────────────────────── */}
        <section id="process" className="py-32 px-6" data-surface="base">
          <div className="max-w-5xl mx-auto">
            <SplitTextReveal text="The Apex Process" tag="h2" className="text-4xl md:text-6xl font-black uppercase mb-20 text-center text-[var(--fg)]" />
            
            <div className="grid md:grid-cols-2 gap-16 relative">
               <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-[var(--border)]"></div>
               
               {config.repairProcess.map((step, i) => (
                 <Reveal key={step.step} delay={i * 0.1}>
                   <div className={`flex flex-col bg-[var(--surface)] p-10 border-t-4 border-[var(--accent)] ${i % 2 === 0 ? 'md:mr-8 md:text-right md:items-end' : 'md:ml-8 md:mt-32'}`} data-surface="raised">
                      <span className="text-[var(--accent)] text-5xl font-black mb-4" style={{ fontFamily: "var(--font-display)" }}>{step.step}</span>
                      <h3 className="text-2xl font-bold uppercase mb-4 text-[var(--fg)]">{step.title}</h3>
                      <p className="text-[var(--fg-muted)]">{step.description}</p>
                   </div>
                 </Reveal>
               ))}
            </div>
          </div>
        </section>

        {/* ─── Before & After ────────────────────────────────────────────────── */}
        <section id="gallery" className="py-32 px-6" data-surface="inverse">
          <div className="max-w-7xl mx-auto">
            <SplitTextReveal text="Results Speak" tag="h2" className="text-4xl md:text-6xl font-black uppercase mb-16 text-center text-[var(--inverse-fg)]" />
            
            <Stagger className="grid md:grid-cols-2 gap-12">
               {config.beforeAfter.map((ba) => (
                 <div key={ba.id} className="p-4 shadow-2xl bg-[var(--surface)] border border-[var(--border)]" data-surface="raised">
                   <h3 className="text-xl font-bold uppercase tracking-widest mb-4 px-2 text-[var(--fg)]">{ba.title}</h3>
                   <BeforeAfterSlider 
                     before={
                       <div className="w-full h-full bg-[var(--surface-2)] flex items-center justify-center font-black text-4xl uppercase tracking-widest text-[var(--fg-muted)]">Before</div>
                     }
                     after={
                       <div className="w-full h-full flex items-center justify-center font-black text-4xl uppercase tracking-widest text-[var(--on-accent)] shadow-[inset_0_0_100px_var(--scrim)]" style={{ backgroundColor: "var(--accent)" }}>After</div>
                     }
                   />
                   <div className="flex justify-between px-2 mt-4 text-xs font-bold uppercase tracking-widest text-[var(--fg-muted)]">
                     <span>Damage</span>
                     <span>Restored</span>
                   </div>
                 </div>
               ))}
            </Stagger>
          </div>
        </section>

        {/* ─── Estimate Form ─────────────────────────────────────────────────── */}
        <section className="py-32 px-6" data-surface="base">
          <div className="max-w-4xl mx-auto bg-[var(--surface)] border border-[var(--border)] p-8 md:p-16" data-surface="raised">
            <SplitTextReveal text="Request an Estimate" tag="h2" className="text-3xl md:text-5xl font-black uppercase mb-8 text-[var(--fg)]" />
            
            {formSubmitted ? (
              <Reveal>
                <div className="bg-[var(--surface-2)] p-12 text-center rounded border border-[var(--border)] flex flex-col items-center gap-6">
                   <div className="w-20 h-20 rounded-full bg-[var(--accent)] text-[var(--on-accent)] flex items-center justify-center mb-4">
                     <CheckCircle size={40} />
                   </div>
                   <h3 className="text-3xl font-black uppercase text-[var(--fg)]">Request Received</h3>
                   <p className="text-[var(--fg-muted)] text-lg max-w-md">Our certified technicians will review your details and contact you within 24 hours.</p>
                   <button 
                     onClick={() => setFormSubmitted(false)}
                     className="mt-6 font-bold uppercase tracking-widest text-[var(--accent)] hover:text-[var(--fg)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] rounded px-2"
                   >
                     Submit Another
                   </button>
                </div>
              </Reveal>
            ) : (
              <Reveal>
                 <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                   <div className="flex flex-col gap-2">
                     <label htmlFor="make" className="text-sm font-bold uppercase tracking-widest text-[var(--fg-muted)]">Vehicle Make</label>
                     <select id="make" required className="bg-[var(--bg)] border border-[var(--border)] px-4 py-4 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none text-[var(--fg)]">
                       <option value="">Select Make...</option>
                       {vehicleMakes.map(m => <option key={m} value={m}>{m}</option>)}
                     </select>
                   </div>
                   <div className="flex flex-col gap-2">
                     <label htmlFor="year" className="text-sm font-bold uppercase tracking-widest text-[var(--fg-muted)]">Vehicle Year</label>
                     <select id="year" required className="bg-[var(--bg)] border border-[var(--border)] px-4 py-4 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none text-[var(--fg)]">
                       <option value="">Select Year...</option>
                       {vehicleYears.map(y => <option key={y} value={y}>{y}</option>)}
                     </select>
                   </div>
                   <div className="flex flex-col gap-2 md:col-span-2">
                     <label htmlFor="issue" className="text-sm font-bold uppercase tracking-widest text-[var(--fg-muted)]">Describe the Issue</label>
                     <textarea id="issue" required rows={4} className="bg-[var(--bg)] border border-[var(--border)] px-4 py-3 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none text-[var(--fg)]"></textarea>
                   </div>
                   
                   <div className="flex flex-col gap-2 md:col-span-2">
                     <label className="text-sm font-bold uppercase tracking-widest text-[var(--fg-muted)]">Upload Photo (Optional)</label>
                     <div className="relative">
                       <input 
                         type="file" 
                         id="photo" 
                         accept="image/*"
                         onChange={handleFileChange}
                         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                         aria-label="Upload photo"
                       />
                       <div className="bg-[var(--bg)] border border-[var(--border)] border-dashed px-4 py-6 flex flex-col items-center justify-center gap-3 text-[var(--fg-muted)] hover:border-[var(--accent)] transition-colors">
                         <Upload size={24} />
                         <span className="font-semibold">{fileName ? fileName : "Drag & drop or click to browse"}</span>
                       </div>
                     </div>
                   </div>

                   <button type="submit" className="md:col-span-2 bg-[var(--accent)] text-[var(--on-accent)] py-4 font-bold uppercase tracking-widest mt-4 hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]">
                     Submit Request
                   </button>
                 </form>
              </Reveal>
            )}
          </div>
        </section>

        {/* ─── Reviews & Location Info ───────────────────────────────────────── */}
        <section className="py-24 px-6 border-t border-[var(--border)]" data-surface="base">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
             {/* Reviews */}
             <div>
               <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-4 text-[var(--fg)]">
                  Client Reviews
               </h2>
               <Stagger className="flex flex-col gap-8">
                 {config.testimonials.map(t => (
                   <div key={t.name} className="border-l-4 border-[var(--accent)] pl-6 py-2">
                      <p className="text-lg italic mb-4 text-[var(--fg)]">"{t.text}"</p>
                      <p className="font-bold uppercase tracking-widest text-sm text-[var(--fg-muted)]">{t.name}</p>
                   </div>
                 ))}
               </Stagger>
             </div>
             
             {/* Info */}
             <div className="bg-[var(--surface)] p-8 border border-[var(--border)]" data-surface="raised">
                <h2 className="text-3xl font-black uppercase mb-8 text-[var(--fg)]">Visit Us</h2>
                <Reveal delay={0.2}>
                  <div className="flex gap-4 mb-6 text-[var(--fg)]">
                    <MapPin className="text-[var(--accent)] shrink-0" />
                    <p className="text-lg">{config.brand.address}</p>
                  </div>
                </Reveal>
                <Reveal delay={0.3}>
                  <div className="flex gap-4 mb-6 text-[var(--fg)]">
                    <Clock className="text-[var(--accent)] shrink-0" />
                    <div>
                      {config.brand.hours.map(h => <p key={h} className="text-lg">{h}</p>)}
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.4}>
                  <div className="flex gap-4 text-[var(--fg)]">
                    <Phone className="text-[var(--accent)] shrink-0" />
                    <a href={`tel:${config.brand.phone.replace(/[^0-9+]/g, '')}`} className="text-lg font-bold hover:text-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded">{config.brand.phone}</a>
                  </div>
                </Reveal>
             </div>
          </div>
        </section>
      </main>

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
