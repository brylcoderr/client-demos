"use client";

import { useState } from "react";
import {
  StickyNav,
  SplitTextReveal,
  Reveal,
  Stagger,
  Counter,
  PinnedSteps,
  Accordion,
  ContactForm,
  Footer,
  HeroCanvas,
  SmartImage
} from "@client-demos/core";
import { demoConfig } from "../demo.config";
import { HeroScales } from "./components/HeroScales";

const navLinks = [
  { label: "Practice Areas", href: "#practice-areas" },
  { label: "Attorneys", href: "#attorneys" },
  { label: "Results", href: "#results" },
  { label: "Contact", href: "#contact" },
];

function EmergencyBanner() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div data-surface="inverse" className="absolute top-0 left-0 right-0 z-[var(--z-sticky)] p-4 flex justify-between items-center text-sm font-medium border-b border-black/10">
      <span>Emergency Legal Assistance: Available 24/7 for Criminal Defense.</span>
      <button onClick={() => setOpen(false)} aria-label="Dismiss banner" className="min-h-[44px] min-w-[44px] flex items-center justify-center bg-black/10 hover:bg-black/20 rounded">
        ✕
      </button>
    </div>
  );
}

export default function Home() {
  return (
    <main className="overflow-x-clip pb-20 md:pb-0">
      <div className="relative z-[var(--z-nav)]">
        <EmergencyBanner />
      </div>

      <StickyNav 
        logo={demoConfig.brand.name} 
        links={navLinks} 
        aria-label="Main Navigation"
      />
      
      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] w-full flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-[var(--bg)] pt-20" data-surface="base">
        {/* Parallax BG */}
        <div className="absolute inset-0 z-[var(--z-base)] opacity-15 pointer-events-none">
          <SmartImage src="/images/hero-courthouse.jpg" alt="Courthouse" width={2000} height={1000} className="w-full h-full object-cover" />
        </div>

        {/* 3D Background */}
        <div className="absolute inset-0 z-[var(--z-base)] opacity-60 pointer-events-none">
          <HeroCanvas 
            scene={<HeroScales />} 
            fallback={
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg)]" aria-hidden="true">
                <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,var(--accent-2)_0%,var(--bg)_100%)] opacity-30" />
                <svg className="absolute w-32 h-32 text-[var(--accent)] opacity-[0.05]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                  <path d="M12 2v20 M12 6l-6 6 M12 6l6 6 M6 12v6 M18 12v6 M3 18h18 M6 20h12" />
                </svg>
              </div>
            } 
          />
        </div>

        <div className="absolute inset-0 z-[var(--z-base)] pointer-events-none scrim-bottom" />

        {/* Hero Content */}
        <div className="relative z-[var(--z-content)] flex flex-col items-center max-w-4xl mx-auto pointer-events-none mt-12">
          <SplitTextReveal
            text={demoConfig.brand.name}
            tag="h1"
            className="text-5xl md:text-7xl lg:text-8xl tracking-tight text-[var(--fg)] drop-shadow-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          />

          <Reveal delay={0.8}>
            <p className="mt-8 text-xl md:text-2xl text-[var(--accent-2)] font-light tracking-widest uppercase bg-[var(--scrim)]/80 px-4 py-2 border border-[var(--accent-2)]/30 backdrop-blur-sm">
              {demoConfig.brand.tagline}
            </p>
          </Reveal>
          
          <Reveal delay={1.2}>
            <div className="mt-12 pointer-events-auto flex flex-col md:flex-row items-center gap-6">
              <a href="#contact" className="min-h-[44px] px-10 py-4 bg-[var(--accent)] text-[var(--on-accent)] text-sm uppercase tracking-widest font-medium hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--fg)] transition-all duration-300">
                Free Consultation
              </a>
              <a href={`tel:${demoConfig.brand.phone.replace(/[^0-9+]/g, '')}`} className="min-h-[44px] px-10 py-4 border border-[var(--accent-2)] text-[var(--fg)] text-sm uppercase tracking-widest font-bold hover:bg-[var(--accent-2)] hover:text-[var(--bg)] transition-colors duration-500 bg-[var(--bg)]/90 backdrop-blur">
                {demoConfig.brand.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Practice Areas ────────────────────────────────── */}
      <section id="practice-areas" className="py-32 px-6 bg-[var(--surface-2)] relative z-[var(--z-content)] border-t border-[var(--border)]/20" data-surface="raised">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <Reveal>
              <h2 className="text-4xl md:text-6xl text-[var(--fg)] mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Practice Areas
              </h2>
              <div className="w-16 h-px bg-[var(--accent-2)] mx-auto" />
            </Reveal>
          </div>

          <div className="mb-24 aspect-[21/9] relative overflow-hidden group border border-[var(--border)]/20 shadow-2xl">
            <SmartImage src="/images/elder-hands.jpg" alt="Elderly couple reviewing legal documents" width={1600} height={900} className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-8 left-8 text-[var(--on-accent)] max-w-lg">
              <h3 className="text-3xl font-display mb-2">Dedicated Protection</h3>
              <p className="text-sm font-light">We advocate fiercely for those who have been wronged.</p>
            </div>
          </div>

          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {demoConfig.services.map((service, i) => (
              <div key={service.title} className="group p-10 bg-[var(--surface)] border border-[var(--muted)]/10 hover:border-[var(--accent-2)]/80 hover:-translate-y-2 transition-all duration-700 shadow-lg">
                <span className="text-[var(--accent-2)] text-sm font-bold tracking-widest mb-4 block opacity-80 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                <h3 className="text-3xl text-[var(--fg)] mb-6" style={{ fontFamily: "var(--font-display)" }}>
                  {service.title}
                </h3>
                <p className="text-[var(--fg-muted)] font-light leading-loose text-lg">{service.description}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Case Results ──────────────────────────────────── */}
      <section id="results" className="py-32 px-6 bg-[var(--accent)] text-[var(--on-accent)] relative z-[var(--z-content)] overflow-hidden" data-surface="accent">
        <div className="absolute inset-0 z-[-1] opacity-10 pointer-events-none">
          <SmartImage src="/images/scales.jpg" alt="Scales of Justice" width={1600} height={900} className="w-full h-full object-cover grayscale" />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16 text-center border-y border-[var(--on-accent)]/20 py-20 relative z-10 bg-[var(--accent)]/80 backdrop-blur-sm">
            {demoConfig.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <Counter
                  target={parseInt(stat.value.replace(/\D/g, ""), 10) || 0}
                  suffix={(stat.value.includes("$") ? "$" : "") + stat.value.replace(/[\d.]/g, "")}
                  label={stat.label}
                  className="text-6xl md:text-7xl text-[var(--accent-2)] mb-4 font-bold"
                />
                <p className="text-sm uppercase tracking-widest text-[var(--on-accent)] opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 text-sm text-[var(--on-accent)]/70 uppercase tracking-widest font-light relative z-10">
            * Past results do not guarantee future outcomes.
          </div>
        </div>
      </section>

      {/* ─── Attorneys ─────────────────────────────────────── */}
      <section id="attorneys" className="py-32 px-6 bg-[var(--surface-2)] relative z-[var(--z-content)]" data-surface="raised">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <Reveal>
              <h2 className="text-4xl md:text-6xl text-[var(--fg)] mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Our Attorneys
              </h2>
              <div className="w-16 h-px bg-[var(--accent-2)] mx-auto" />
            </Reveal>
          </div>
          
          <Stagger className="grid md:grid-cols-3 gap-8">
            {demoConfig.team.map((member, i) => (
              <div key={member.name} className="flex flex-col items-center text-center p-8 bg-[var(--surface)] border border-[var(--border)]/10 hover:shadow-xl transition-shadow duration-500">
                <div className="w-48 h-48 rounded-full bg-[var(--surface-2)] border-4 border-[var(--bg)] shadow-inner mb-8 overflow-hidden">
                  <SmartImage src={`/images/attorney-${i+1}.jpg`} alt={member.name} width={400} height={400} className="w-full h-full object-cover grayscale contrast-125" />
                </div>
                <h3 className="text-2xl text-[var(--fg)] mb-2" style={{ fontFamily: "var(--font-display)" }}>{member.name}</h3>
                <p className="text-[var(--accent-2)] text-xs font-bold uppercase tracking-widest mb-6">{member.role}</p>
                <p className="text-[var(--fg-muted)] font-light leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Pinned Process ────────────────────────────────── */}
      <section id="process" className="bg-[var(--bg)] relative z-[var(--z-content)] pt-32 pb-16" data-surface="base">
        <div className="max-w-6xl mx-auto px-6 mb-24 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <Reveal>
              <h2 className="text-4xl md:text-6xl text-[var(--fg)] mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Our Approach
              </h2>
              <div className="w-16 h-px bg-[var(--accent-2)]" />
            </Reveal>
          </div>
          <div className="md:w-1/2 aspect-video overflow-hidden border border-[var(--border)]/20 shadow-lg">
            <SmartImage src="/images/office-lobby.jpg" alt="Law office interior" width={800} height={450} className="w-full h-full object-cover" />
          </div>
        </div>

        <PinnedSteps 
          steps={[
            { title: "Initial Consultation", description: "A confidential review of your case to assess legal standing, strategy, and potential outcomes." },
            { title: "Strategic Planning", description: "Our team develops a bespoke legal strategy tailored to your specific objectives and risk profile." },
            { title: "Aggressive Advocacy", description: "We execute the strategy with precision, utilizing our extensive resources and courtroom experience." },
            { title: "Resolution", description: "Achieving the optimal outcome, whether through negotiated settlement or a decisive trial verdict." }
          ]}
        />
      </section>

      {/* ─── FAQ ───────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-[var(--surface-2)] relative z-[var(--z-content)]" data-surface="raised">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-6xl text-[var(--fg)] mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Common Inquiries
              </h2>
              <div className="w-16 h-px bg-[var(--accent-2)] mx-auto" />
            </Reveal>
          </div>
          <Accordion items={demoConfig.faqs.map((f) => ({ title: f.question, content: f.answer }))} />
        </div>
      </section>

      {/* ─── Testimonials ──────────────────────────────────── */}
      <section className="py-32 px-6 bg-[var(--bg)] relative z-[var(--z-content)] border-t border-[var(--border)]/10" data-surface="base">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-24">
            <Reveal>
              <h2 className="text-4xl md:text-6xl text-[var(--fg)] mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Client Perspectives
              </h2>
              <div className="w-16 h-px bg-[var(--accent-2)] mx-auto" />
            </Reveal>
          </div>

          <Stagger className="flex flex-col gap-24">
            {demoConfig.testimonials.map((t) => (
              <Reveal key={t.name}>
                <blockquote className="text-2xl md:text-4xl leading-relaxed text-[var(--fg)] italic mb-8" style={{ fontFamily: "var(--font-display)" }}>
                  "{t.text}"
                </blockquote>
                <p className="text-sm uppercase tracking-widest text-[var(--accent-2)] font-bold">— {t.name}</p>
              </Reveal>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Contact / Free Consultation ───────────────────── */}
      <section id="contact" className="py-32 px-6 bg-[var(--accent)] text-[var(--on-accent)] relative z-[var(--z-content)]" data-surface="accent">
        <div className="absolute inset-0 z-[-1] opacity-5 pointer-events-none">
          <SmartImage src="/images/handshake-client.jpg" alt="Lawyer Client Consultation" width={2000} height={1000} className="w-full h-full object-cover" />
        </div>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start relative z-10">
          <div>
            <Reveal>
              <h2 className="text-4xl md:text-6xl text-[var(--on-accent)] mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Request a Consultation
              </h2>
              <div className="w-16 h-px bg-[var(--accent-2)] mb-12" />
            </Reveal>
            <p className="text-[var(--on-accent)] opacity-80 font-light text-lg mb-12 leading-loose">
              Please complete the form below to request a confidential evaluation of your case. Our team will contact you promptly to schedule an initial consultation.
            </p>
            
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <span className="text-[var(--accent-2)] text-xs uppercase tracking-widest font-bold">Office Location</span>
                <span className="text-[var(--on-accent)] font-light">{demoConfig.brand.address}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[var(--accent-2)] text-xs uppercase tracking-widest font-bold">Direct Line</span>
                <span className="text-[var(--on-accent)] font-light">{demoConfig.brand.phone}</span>
              </div>
            </div>
          </div>

          <div className="bg-[var(--surface)] text-[var(--fg)] p-10 border border-[var(--border)]/20 shadow-2xl" data-surface="raised">
            {/* Provide a global style rule to override the contact form error styles inside this container to meet the prompt requirement */}
            <style dangerouslySetInnerHTML={{ __html: `
              .contact-form-error, [role="alert"] { 
                 color: var(--fg) !important; 
                 font-weight: bold;
              }
              .contact-form-error::before {
                 content: "⚠️ ";
              }
            `}} />
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────── */}
      <div className="relative z-[var(--z-content)] bg-[var(--bg)]" data-surface="base">
        <Footer
          brand={demoConfig.brand.name}
          links={[
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
            { label: "Attorney Advertising", href: "#" },
          ]}
        />
        <div className="bg-[var(--surface-2)] py-6 px-6 text-center text-xs text-[var(--fg-muted)] font-light border-t border-[var(--border)]/10">
          <p className="max-w-4xl mx-auto">
            Disclaimer: The information contained on this website is provided for informational purposes only, and should not be construed as legal advice on any matter. 
            The transmission and receipt of information contained on this web site, in whole or in part, or communication with {demoConfig.brand.name} via the Internet or e-mail through this website does not constitute or create a lawyer-client relationship between us and any recipient. 
            Prior results do not guarantee a similar outcome.
          </p>
        </div>
      </div>
      
      {/* Mobile sticky phone bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[var(--z-sticky)] bg-[var(--accent)] text-[var(--on-accent)] border-t border-black/10">
        <a href={`tel:${demoConfig.brand.phone.replace(/[^0-9+]/g, '')}`} className="min-h-[44px] flex items-center justify-center font-bold text-sm uppercase tracking-widest w-full py-4 text-[var(--on-accent)] hover:brightness-110">
          Call {demoConfig.brand.phone}
        </a>
      </div>
    </main>
  );
}
