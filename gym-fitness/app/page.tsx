"use client";

import { useState } from "react";
import {
  StickyNav,
  SplitTextReveal,
  Reveal,
  Stagger,
  Marquee,
  Counter,
  PinnedSteps,
  Tabs,
  ContactForm,
  Footer,
  HeroCanvas,
  useScrollVelocity,
  useReducedMotion,
  SmartImage,
  PricingTiers,
} from "@client-demos/core";
import { demoConfig } from "../demo.config";
import { HeroParticles } from "./components/HeroParticles";

const navLinks = [
  { label: "Programs", href: "#programs" },
  { label: "Schedule", href: "#schedule" },
  { label: "Results", href: "#results" },
  { label: "Pricing", href: "#pricing" },
  { label: "Join", href: "#join" },
];

export default function Home() {
  const velocity = useScrollVelocity();
  const reducedMotion = useReducedMotion();
  const skew = reducedMotion ? 0 : Math.max(-8, Math.min(8, -(velocity / 1000) * 5));

  return (
    <main className="overflow-x-clip bg-[var(--bg)] text-[var(--fg)]">
      <StickyNav logo={demoConfig.brand.name} links={navLinks} aria-label="Main Navigation" />

      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="relative h-[100svh] w-full flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-[var(--bg)]" data-surface="base">
        {/* 3D Background */}
        <div className="absolute inset-0 z-[var(--z-base)] pointer-events-none">
          <HeroCanvas 
            scene={<HeroParticles />} 
            fallback={
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg)]">
                <svg className="w-1/2 h-1/2 text-[var(--accent)] animate-pulse opacity-10" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="9" width="4" height="6" />
                  <rect x="18" y="9" width="4" height="6" />
                  <rect x="6" y="11" width="12" height="2" />
                </svg>
              </div>
            } 
          />
        </div>

        {/* Scrim */}
        <div className="absolute inset-0 z-[var(--z-base)] pointer-events-none scrim-bottom" />

        {/* Hero Content */}
        <div className="relative z-[var(--z-content)] pointer-events-none flex flex-col items-center">
          <div style={{ transform: `skewX(${skew}deg)` }} className="transition-transform duration-100 ease-out">
            <SplitTextReveal
              text={demoConfig.brand.name}
              tag="h1"
              className="text-7xl md:text-9xl lg:text-[12rem] tracking-tighter text-[var(--fg)] uppercase leading-none drop-shadow-2xl"
              style={{ fontFamily: "var(--font-display)" }}
            />
          </div>

          <Reveal delay={0.3}>
            <p className="mt-8 text-xl md:text-3xl text-[var(--fg)] max-w-2xl uppercase tracking-widest font-black italic bg-[var(--scrim)] px-4 py-2 border-l-4 border-[var(--accent)]">
              {demoConfig.brand.tagline}
            </p>
          </Reveal>
          
          <Reveal delay={0.5}>
            <a href="#join" className="pointer-events-auto mt-12 inline-block px-12 py-6 bg-[var(--accent)] text-[var(--on-accent)] text-xl font-black uppercase tracking-tighter hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-2 transition-all duration-300 shadow-[8px_8px_0_0_var(--accent-2)]">
              Claim Free Trial
            </a>
          </Reveal>
        </div>
      </section>

      {/* Hazard stripe divider */}
      <div aria-hidden="true" className="h-4 w-full bg-[repeating-linear-gradient(45deg,var(--accent)_0_10px,var(--bg)_10px_20px)] relative z-[var(--z-content)] border-y border-[var(--bg)]" />

      {/* Dual Marquee */}
      <div className="overflow-x-clip relative z-[var(--z-content)]">
        <div className="py-8 bg-[var(--accent)] overflow-hidden rotate-[-2deg] scale-110 relative z-[var(--z-content)] shadow-2xl">
          <Marquee items={["NO EXCUSES", "BREAK LIMITS", "FORGE LEGACIES", "DO THE WORK"]} />
        </div>
        <div className="py-8 bg-[var(--fg)] overflow-hidden rotate-[2deg] scale-110 relative z-[var(--z-base)] -mt-12 shadow-2xl text-[var(--bg)]">
          <Marquee items={["UNYIELDING", "RELENTLESS", "IRON SHARPENS IRON"]} />
        </div>
      </div>

      {/* ─── Programs (Services) ───────────────────────────── */}
      <section id="programs" className="py-32 px-6 bg-[var(--bg)] relative z-[var(--z-content)]" data-surface="base">
        <div className="max-w-7xl mx-auto">
          <SplitTextReveal text="The Crucible" tag="h2" className="text-6xl md:text-8xl mb-20 uppercase tracking-tighter text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }} />

          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {['boxing-bag.jpg', 'battle-ropes.jpg', 'class-group.jpg'].map((img, i) => (
               <div key={i} className="aspect-[3/2] relative overflow-hidden group">
                 <SmartImage src={`/images/${img}`} alt={`Program ${i}`} width={800} height={600} className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700" />
               </div>
            ))}
          </Stagger>

          <Stagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {demoConfig.services.map((service, i) => (
              <div key={service.title} className="group p-8 bg-[var(--surface)] border-t-4 border-transparent hover:border-[var(--accent)] hover:-translate-y-4 transition-all duration-300">
                <span className="text-[var(--accent)] font-black text-6xl opacity-[0.2] block mb-4" style={{ fontFamily: "var(--font-display)" }}>0{i + 1}</span>
                <h3 className="text-3xl uppercase tracking-tighter text-[var(--fg)] mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  {service.title}
                </h3>
                <p className="text-[var(--fg-muted)] font-medium leading-relaxed mb-8">{service.description}</p>
                <span className="inline-block bg-[var(--bg)] text-[var(--fg)] font-bold px-4 py-2 text-sm">{service.price}</span>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Schedule ──────────────────────────────────────── */}
      <section id="schedule" className="py-32 px-6 bg-[var(--surface-2)] relative z-[var(--z-content)]" data-surface="raised">
        <div className="max-w-5xl mx-auto">
          <SplitTextReveal text="Schedule" tag="h2" className="text-6xl md:text-8xl mb-16 uppercase tracking-tighter text-[var(--fg)] text-center" style={{ fontFamily: "var(--font-display)" }} />
          
          <Tabs
            tabs={[
              {
                label: "Monday",
                content: <ScheduleTable day="Mon" />
              },
              {
                label: "Wednesday",
                content: <ScheduleTable day="Wed" />
              },
              {
                label: "Friday",
                content: <ScheduleTable day="Fri" />
              }
            ]}
          />
        </div>
      </section>

      {/* Hazard stripe divider */}
      <div aria-hidden="true" className="h-4 w-full bg-[repeating-linear-gradient(-45deg,var(--accent)_0_10px,var(--bg)_10px_20px)] relative z-[var(--z-content)] border-y border-[var(--bg)]" />

      {/* ─── Pinned Transformation Timeline ────────────────── */}
      <section id="results" className="bg-[var(--bg)] relative z-[var(--z-content)]" data-surface="base">
        <div className="pt-32 pb-24">
          <div className="max-w-6xl mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-center">
            <SplitTextReveal text="The Transformation" tag="h2" className="text-6xl md:text-8xl uppercase tracking-tighter text-[var(--accent)]" style={{ fontFamily: "var(--font-display)" }} />
            <div className="mt-8 md:mt-0 p-6 border-2 border-[var(--accent)] bg-[var(--surface)] text-center min-w-[200px]">
              <div className="text-sm uppercase tracking-widest text-[var(--fg-muted)] font-bold mb-2">Avg Results</div>
              <div className="text-4xl text-[var(--accent)] font-black" style={{ fontFamily: "var(--font-display)" }}>-12%</div>
              <div className="text-sm text-[var(--fg)]">Body Fat</div>
            </div>
          </div>
          
          <div className="max-w-6xl mx-auto px-6 mb-12">
             <div className="w-full h-2 bg-[var(--surface)] relative overflow-hidden">
               <div className="absolute inset-y-0 left-0 bg-[var(--accent)] w-1/2 animate-pulse" />
             </div>
             <div className="flex justify-between text-xs text-[var(--fg-muted)] mt-2 uppercase font-bold tracking-widest">
               <span>Day 1</span>
               <span>Day 30</span>
               <span>Day 90</span>
             </div>
          </div>

          <PinnedSteps 
            steps={[
              { title: "Week 1: The Shock", description: "Your body adapts to the new stimulus. You will be sore. You will question it. You will survive." },
              { title: "Week 4: The Build", description: "Neurological adaptations peak. Weights feel lighter. Endurance stretches further." },
              { title: "Week 8: The Forge", description: "Physical changes become undeniable. Muscle density increases. Body fat drops." },
              { title: "Week 12: The Legacy", description: "You are unrecognizable from day one. You have forged a new standard of living." }
            ]}
          />
        </div>
      </section>

      {/* ─── Stats & Team ──────────────────────────────────── */}
      <section className="py-32 px-6 bg-[var(--accent)] text-[var(--on-accent)] relative z-[var(--z-content)]" data-surface="accent">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-32 border-b-4 border-[var(--bg)] pb-16">
            {demoConfig.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <Counter
                  target={parseInt(stat.value.replace(/\D/g, ""), 10) || 0}
                  suffix={stat.value.replace(/[\d]/g, "")}
                  label={stat.label}
                  className="text-6xl md:text-7xl font-black mb-2 text-[var(--on-accent)]"
                />
                <p className="font-bold uppercase tracking-widest text-[var(--on-accent)]">{stat.label}</p>
              </div>
            ))}
          </div>

          <SplitTextReveal text="The Vanguard" tag="h2" className="text-6xl md:text-8xl mb-16 uppercase tracking-tighter text-[var(--on-accent)]" style={{ fontFamily: "var(--font-display)" }} />
          
          <Stagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {demoConfig.team.map((member, i) => (
              <div key={member.name} className="bg-[var(--bg)] text-[var(--fg)] shadow-[12px_12px_0_0_var(--accent-2)] border-2 border-[var(--bg)] hover:border-[var(--accent-2)] transition-colors group">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <SmartImage src={`/images/trainer-${i+1}.jpg`} alt={member.name} width={600} height={800} className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="p-8">
                  <h3 className="text-3xl uppercase tracking-tighter mb-2" style={{ fontFamily: "var(--font-display)" }}>{member.name}</h3>
                  <p className="text-[var(--bg)] uppercase font-black text-sm mb-6 bg-[var(--accent)] inline-block px-3 py-1">{member.role}</p>
                  <p className="text-[var(--fg-muted)] font-medium leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Testimonials & Pricing ──────────────────────────── */}
      <section id="pricing" className="py-32 px-6 relative z-[var(--z-content)] overflow-hidden" data-surface="base">
        {/* Parallax Image Background */}
        <div className="absolute inset-0 z-[-1] opacity-[0.15]">
           <SmartImage src="/images/hero-lifting.jpg" alt="Lifting Background" width={2000} height={1000} className="w-full h-full object-cover" />
        </div>
        
        <div className="max-w-5xl mx-auto text-center mb-32">
          <SplitTextReveal text="Blood & Sweat" tag="h2" className="text-6xl md:text-8xl uppercase tracking-tighter text-[var(--fg)] mb-20" style={{ fontFamily: "var(--font-display)" }} />

          <Stagger className="flex flex-col gap-24">
            {demoConfig.testimonials.map((t) => (
              <Reveal key={t.name}>
                <blockquote className="text-3xl md:text-5xl uppercase tracking-tighter leading-tight text-[var(--accent)] font-black italic">
                  "{t.text}"
                </blockquote>
                <p className="mt-8 text-xl uppercase tracking-widest text-[var(--fg)] font-bold">— {t.name}</p>
              </Reveal>
            ))}
          </Stagger>
        </div>

        <div className="max-w-6xl mx-auto">
           <SplitTextReveal text="No Contracts" tag="h2" className="text-6xl md:text-8xl uppercase tracking-tighter text-[var(--fg)] mb-16 text-center" style={{ fontFamily: "var(--font-display)" }} />
           <PricingTiers 
              tiers={[
                { name: "Basic", price: "$49", features: ["Full Gym Access", "Locker Room", "1 Free Assessment"] },
                { name: "Athlete", price: "$99", features: ["Unlimited Classes", "Recovery Zone", "Monthly Check-in"] },
                { name: "Elite", price: "$199", features: ["Personal Coaching", "Nutrition Plan", "Priority Booking"] }
              ]} 
           />
        </div>
      </section>

      {/* ─── Join / Form ───────────────────────────────────── */}
      <section id="join" className="py-32 px-6 bg-[var(--surface-2)] relative z-[var(--z-content)]" data-surface="raised">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SplitTextReveal text="Step Into The Forge" tag="h2" className="text-6xl md:text-8xl mb-8 uppercase tracking-tighter text-[var(--fg)] leading-none" style={{ fontFamily: "var(--font-display)" }} />
            <p className="text-2xl text-[var(--fg-muted)] font-medium mb-12">Claim your free 3-day trial pass. No commitments, just pure work.</p>
            
            <div className="bg-[var(--surface)] p-8 border-l-4 border-[var(--accent)] mb-8 shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 opacity-[0.2] group-hover:opacity-[0.4] transition-opacity duration-700">
                <SmartImage src="/images/gym-floor.jpg" alt="Gym Floor" width={600} height={400} className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-[var(--fg)] uppercase mb-2">Location</h3>
                <p className="text-[var(--fg-muted)]">{demoConfig.brand.address}</p>
              </div>
            </div>
            
            <div className="bg-[var(--surface)] p-8 border-l-4 border-[var(--accent)] shadow-xl relative z-10">
              <h3 className="text-xl font-bold text-[var(--fg)] uppercase mb-2">Hours</h3>
              {demoConfig.brand.hours.map(h => (
                <p key={h} className="text-[var(--fg-muted)] font-medium">{h}</p>
              ))}
            </div>
          </div>

          <div className="bg-[var(--surface)] p-10 shadow-[16px_16px_0_0_var(--accent)] relative z-10 border border-[var(--border)]/20">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────── */}
      <div className="relative z-[var(--z-content)] bg-[var(--bg)]" data-surface="base">
        <Footer
          brand={demoConfig.brand.name}
          links={[
            { label: "Instagram", href: "#" },
            { label: "YouTube", href: "#" },
            { label: "Waiver", href: "#" },
          ]}
        />
      </div>
    </main>
  );
}

function ScheduleTable({ day }: { day: string }) {
  const classes = [
    { time: "05:30 AM", name: "Metcon X", trainer: "Jax" },
    { time: "07:00 AM", name: "Strength Lab", trainer: "Marcus" },
    { time: "12:00 PM", name: "Endurance", trainer: "Sarah" },
    { time: "05:30 PM", name: "Metcon X", trainer: "Jax" },
    { time: "07:00 PM", name: "Recovery", trainer: "Marcus" },
  ];

  return (
    <div className="w-full bg-[var(--surface)] p-4 md:p-8 mt-8 border border-[var(--border)]/20 shadow-xl" aria-label={`Schedule for ${day}`}>
      {classes.map((c, i) => {
        const isNext = i === 1; // Arbitrary "Next" class for demo
        return (
          <div key={i} className={`flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-b border-[var(--border)]/10 last:border-0 px-4 transition-colors relative ${isNext ? 'bg-[var(--bg)] border-l-4 border-l-[var(--accent)]' : 'hover:bg-[var(--surface-2)]'}`}>
            
            {isNext && (
              <span className="absolute top-2 right-4 text-[10px] font-black uppercase tracking-widest text-[var(--accent)] border border-[var(--accent)] px-2 py-1">
                Next
              </span>
            )}
            
            <div className="text-[var(--accent)] font-black text-2xl w-40">{c.time}</div>
            <div className="text-[var(--fg)] text-xl font-bold uppercase tracking-widest flex-1">{c.name}</div>
            <div className="text-[var(--fg-muted)] font-medium mt-2 md:mt-0">Coach: {c.trainer}</div>
          </div>
        );
      })}
    </div>
  );
}
