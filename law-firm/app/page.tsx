"use client";

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
  HeroCanvas
} from "@client-demos/core";
import { demoConfig } from "../demo.config";
import { HeroScales } from "./components/HeroScales";

const navLinks = [
  { label: "Practice Areas", href: "#practice-areas" },
  { label: "Attorneys", href: "#attorneys" },
  { label: "Results", href: "#results" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  return (
    <>
      <StickyNav 
        logo={demoConfig.brand.name} 
        links={navLinks} 
        // Example of a prominent phone number in the nav conceptually (StickyNav might just take links, so we add a CTA link)
      />
      
      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] w-full flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-[var(--bg)] pt-20">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0 opacity-60">
          <HeroCanvas 
            scene={<HeroScales />} 
            fallback={
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg)]">
                <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,var(--accent2)_0%,var(--bg)_100%)] opacity-50" />
                <svg className="absolute w-32 h-32 text-[var(--accent)] opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                  <path d="M12 2v20 M12 6l-6 6 M12 6l6 6 M6 12v6 M18 12v6 M3 18h18 M6 20h12" />
                </svg>
              </div>
            } 
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto pointer-events-none mt-12">
          <SplitTextReveal
            text={demoConfig.brand.name}
            tag="h1"
            className="text-5xl md:text-7xl lg:text-8xl tracking-tight text-[var(--fg)] drop-shadow-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          />

          <Reveal delay={0.8}>
            <p className="mt-8 text-xl md:text-2xl text-[var(--accent)] font-light tracking-widest uppercase">
              {demoConfig.brand.tagline}
            </p>
          </Reveal>
          
          <Reveal delay={1.2}>
            <div className="mt-12 pointer-events-auto flex flex-col md:flex-row items-center gap-6">
              <a href="#contact" className="px-10 py-4 bg-[var(--accent)] text-[var(--bg)] text-sm uppercase tracking-widest font-medium hover:bg-[var(--fg)] transition-colors duration-500">
                Free Consultation
              </a>
              <a href={`tel:${demoConfig.brand.phone.replace(/[^0-9+]/g, '')}`} className="px-10 py-4 border border-[var(--accent)] text-[var(--accent)] text-sm uppercase tracking-widest font-medium hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-colors duration-500">
                {demoConfig.brand.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Practice Areas ────────────────────────────────── */}
      <section id="practice-areas" className="py-32 px-6 bg-[var(--accent2)] relative z-20 border-t border-[var(--accent)]/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <Reveal>
              <h2 className="text-4xl md:text-6xl text-[var(--fg)] mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Practice Areas
              </h2>
              <div className="w-16 h-px bg-[var(--accent)] mx-auto" />
            </Reveal>
          </div>

          <Stagger className="grid md:grid-cols-2 gap-12">
            {demoConfig.services.map((service, i) => (
              <div key={service.title} className="group p-10 bg-[var(--bg)] border border-[var(--muted)]/10 hover:border-[var(--accent)]/50 transition-all duration-700">
                <span className="text-[var(--accent)] text-sm font-light tracking-widest mb-4 block opacity-70 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                <h3 className="text-3xl text-[var(--fg)] mb-6" style={{ fontFamily: "var(--font-display)" }}>
                  {service.title}
                </h3>
                <p className="text-[var(--muted)] font-light leading-loose text-lg">{service.description}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Case Results ──────────────────────────────────── */}
      <section id="results" className="py-32 px-6 bg-[var(--bg)] relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 text-center border-y border-[var(--accent)]/20 py-16">
            {demoConfig.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <Counter
                  target={parseInt(stat.value.replace(/\D/g, ""), 10) || 0}
                  suffix={(stat.value.includes("$") ? "$" : "") + stat.value.replace(/[\d.]/g, "")}
                  label={stat.label}
                  className="text-5xl md:text-6xl text-[var(--accent)] mb-4"
                />
                <p className="text-sm uppercase tracking-widest text-[var(--muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Attorneys ─────────────────────────────────────── */}
      <section id="attorneys" className="py-32 px-6 bg-[var(--accent2)] relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <Reveal>
              <h2 className="text-4xl md:text-6xl text-[var(--fg)] mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Our Attorneys
              </h2>
              <div className="w-16 h-px bg-[var(--accent)] mx-auto" />
            </Reveal>
          </div>
          
          <Stagger className="grid md:grid-cols-3 gap-8">
            {demoConfig.team.map((member) => (
              <div key={member.name} className="flex flex-col items-center text-center p-8">
                <div className="w-32 h-32 rounded-full bg-[var(--bg)] border border-[var(--accent)]/30 mb-8 flex items-center justify-center">
                  <span className="text-3xl text-[var(--accent)]" style={{ fontFamily: "var(--font-display)" }}>
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-2xl text-[var(--fg)] mb-2" style={{ fontFamily: "var(--font-display)" }}>{member.name}</h3>
                <p className="text-[var(--accent)] text-xs uppercase tracking-widest mb-6">{member.role}</p>
                <p className="text-[var(--muted)] font-light leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Pinned Process ────────────────────────────────── */}
      <section id="process" className="bg-[var(--bg)] relative z-20 pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6 mb-24 text-center">
          <Reveal>
            <h2 className="text-4xl md:text-6xl text-[var(--fg)] mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Our Approach
            </h2>
            <div className="w-16 h-px bg-[var(--accent)] mx-auto" />
          </Reveal>
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
      <section className="py-32 px-6 bg-[var(--accent2)] relative z-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-6xl text-[var(--fg)] mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Common Inquiries
              </h2>
              <div className="w-16 h-px bg-[var(--accent)] mx-auto" />
            </Reveal>
          </div>
          <Accordion items={demoConfig.faqs.map((f) => ({ title: f.question, content: f.answer }))} />
        </div>
      </section>

      {/* ─── Testimonials ──────────────────────────────────── */}
      <section className="py-32 px-6 bg-[var(--bg)] relative z-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-24">
            <Reveal>
              <h2 className="text-4xl md:text-6xl text-[var(--fg)] mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Client Perspectives
              </h2>
              <div className="w-16 h-px bg-[var(--accent)] mx-auto" />
            </Reveal>
          </div>

          <Stagger className="flex flex-col gap-24">
            {demoConfig.testimonials.map((t) => (
              <Reveal key={t.name}>
                <blockquote className="text-2xl md:text-4xl leading-relaxed text-[var(--fg)] italic mb-8" style={{ fontFamily: "var(--font-display)" }}>
                  "{t.text}"
                </blockquote>
                <p className="text-sm uppercase tracking-widest text-[var(--accent)]">— {t.name}</p>
              </Reveal>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Contact / Free Consultation ───────────────────── */}
      <section id="contact" className="py-32 px-6 bg-[var(--accent2)] relative z-20 border-t border-[var(--accent)]/20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <Reveal>
              <h2 className="text-4xl md:text-6xl text-[var(--fg)] mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Request a Consultation
              </h2>
              <div className="w-16 h-px bg-[var(--accent)] mb-12" />
            </Reveal>
            <p className="text-[var(--muted)] font-light text-lg mb-12 leading-loose">
              Please complete the form below to request a confidential evaluation of your case. Our team will contact you promptly to schedule an initial consultation.
            </p>
            
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <span className="text-[var(--accent)] text-xs uppercase tracking-widest">Office Location</span>
                <span className="text-[var(--fg)] font-light">{demoConfig.brand.address}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[var(--accent)] text-xs uppercase tracking-widest">Direct Line</span>
                <span className="text-[var(--fg)] font-light">{demoConfig.brand.phone}</span>
              </div>
            </div>
          </div>

          <div className="bg-[var(--bg)] p-10 border border-[var(--accent)]/20">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────── */}
      <div className="relative z-20 border-t border-[var(--bg)]">
        <Footer
          brand={demoConfig.brand.name}
          links={[
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
            { label: "Attorney Advertising", href: "#" },
          ]}
        />
        <div className="bg-[var(--accent2)] py-6 px-6 text-center text-xs text-[var(--muted)] font-light border-t border-[var(--bg)]">
          <p className="max-w-4xl mx-auto">
            Disclaimer: The information contained on this website is provided for informational purposes only, and should not be construed as legal advice on any matter. 
            The transmission and receipt of information contained on this web site, in whole or in part, or communication with Hartwell & Rowe Attorneys via the Internet or e-mail through this website does not constitute or create a lawyer-client relationship between us and any recipient. 
            Prior results do not guarantee a similar outcome.
          </p>
        </div>
      </div>
    </>
  );
}
