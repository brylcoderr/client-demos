"use client";

import { useRef } from "react";
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
  useScrollVelocity
} from "@client-demos/core";
import { demoConfig } from "../demo.config";
import { HeroParticles } from "./components/HeroParticles";

const navLinks = [
  { label: "Programs", href: "#programs" },
  { label: "Schedule", href: "#schedule" },
  { label: "Results", href: "#results" },
  { label: "Join", href: "#join" },
];

export default function Home() {
  const velocity = useScrollVelocity();
  const skew = Math.max(-10, Math.min(10, -(velocity / 1000) * 5));

  return (
    <>
      <StickyNav logo={demoConfig.brand.name} links={navLinks} />

      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-[var(--bg)]">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <HeroCanvas 
            scene={<HeroParticles />} 
            fallback={
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg)]">
                <svg className="w-1/2 h-1/2 text-[var(--accent)] animate-pulse opacity-50" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="9" width="4" height="6" />
                  <rect x="18" y="9" width="4" height="6" />
                  <rect x="6" y="11" width="12" height="2" />
                </svg>
              </div>
            } 
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 pointer-events-none flex flex-col items-center">
          <div style={{ transform: `skewX(${skew}deg)` }} className="transition-transform duration-100 ease-out">
            <SplitTextReveal
              text={demoConfig.brand.name}
              tag="h1"
              className="text-7xl md:text-9xl lg:text-[12rem] tracking-tighter text-[var(--fg)] uppercase leading-none drop-shadow-[0_0_15px_rgba(198,255,0,0.3)]"
              style={{ fontFamily: "var(--font-display)" }}
            />
          </div>

          <Reveal delay={0.3}>
            <p className="mt-8 text-xl md:text-3xl text-[var(--fg)] max-w-2xl uppercase tracking-widest font-black italic bg-black/50 px-4 py-2 border-l-4 border-[var(--accent)]">
              {demoConfig.brand.tagline}
            </p>
          </Reveal>
          
          <Reveal delay={0.5}>
            <a href="#join" className="pointer-events-auto mt-12 inline-block px-12 py-6 bg-[var(--accent)] text-[var(--bg)] text-xl font-black uppercase tracking-tighter hover:bg-[var(--fg)] hover:scale-105 transition-all duration-300 shadow-[8px_8px_0_0_#ffffff]">
              Claim Free Trial
            </a>
          </Reveal>
        </div>
      </section>

      {/* Dual Marquee */}
      <div className="py-8 bg-[var(--accent)] overflow-hidden rotate-[-2deg] scale-110 relative z-20 shadow-2xl">
        <Marquee items={["NO EXCUSES", "BREAK LIMITS", "FORGE LEGACIES", "DO THE WORK"]} />
      </div>
      <div className="py-8 bg-[var(--fg)] overflow-hidden rotate-[2deg] scale-110 relative z-10 -mt-12 shadow-2xl">
        <Marquee items={["UNYIELDING", "RELENTLESS", "IRON SHARPENS IRON"]} />
      </div>

      {/* ─── Programs (Services) ───────────────────────────── */}
      <section id="programs" className="py-32 px-6 bg-[var(--bg)] relative z-20">
        <div className="max-w-7xl mx-auto">
          <SplitTextReveal text="The Crucible" tag="h2" className="text-6xl md:text-8xl mb-20 uppercase tracking-tighter text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }} />

          <Stagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {demoConfig.services.map((service, i) => (
              <div key={service.title} className="group p-8 bg-[var(--accent2)] border-t-4 border-transparent hover:border-[var(--accent)] hover:-translate-y-4 transition-all duration-300">
                <span className="text-[var(--accent)] font-black text-6xl opacity-20 block mb-4" style={{ fontFamily: "var(--font-display)" }}>0{i + 1}</span>
                <h3 className="text-3xl uppercase tracking-tighter text-[var(--fg)] mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  {service.title}
                </h3>
                <p className="text-[var(--muted)] font-medium leading-relaxed mb-8">{service.description}</p>
                <span className="inline-block bg-[var(--bg)] text-[var(--fg)] font-bold px-4 py-2 text-sm">{service.price}</span>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Schedule ──────────────────────────────────────── */}
      <section id="schedule" className="py-32 px-6 bg-[var(--accent2)] relative z-20">
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

      {/* ─── Pinned Transformation Timeline ────────────────── */}
      <section id="results" className="bg-[var(--bg)] relative z-20">
        <div className="py-32">
          <div className="max-w-6xl mx-auto px-6 mb-16">
            <SplitTextReveal text="The Transformation" tag="h2" className="text-6xl md:text-8xl uppercase tracking-tighter text-[var(--accent)]" style={{ fontFamily: "var(--font-display)" }} />
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
      <section className="py-32 px-6 bg-[var(--accent)] text-[var(--bg)] relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-32 border-b-4 border-[var(--bg)] pb-16">
            {demoConfig.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <Counter
                  target={parseInt(stat.value.replace(/\D/g, ""), 10) || 0}
                  suffix={stat.value.replace(/[\d]/g, "")}
                  label={stat.label}
                  className="text-6xl md:text-7xl font-black mb-2"
                />
                <p className="font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          <SplitTextReveal text="The Vanguard" tag="h2" className="text-6xl md:text-8xl mb-16 uppercase tracking-tighter" style={{ fontFamily: "var(--font-display)" }} />
          
          <Stagger className="grid md:grid-cols-3 gap-12">
            {demoConfig.team.map((member) => (
              <div key={member.name} className="bg-[var(--bg)] text-[var(--fg)] p-8 shadow-[12px_12px_0_0_#1a1a1a]">
                <h3 className="text-4xl uppercase tracking-tighter mb-2" style={{ fontFamily: "var(--font-display)" }}>{member.name}</h3>
                <p className="text-[var(--accent)] uppercase font-black text-sm mb-6 bg-[var(--accent2)] inline-block px-3 py-1">{member.role}</p>
                <p className="text-gray-400 font-medium leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Testimonials ──────────────────────────────────── */}
      <section className="py-32 px-6 bg-[var(--bg)] relative z-20">
        <div className="max-w-5xl mx-auto text-center">
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
      </section>

      {/* ─── Join / Form ───────────────────────────────────── */}
      <section id="join" className="py-32 px-6 bg-[var(--accent2)] relative z-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SplitTextReveal text="Step Into The Forge" tag="h2" className="text-6xl md:text-8xl mb-8 uppercase tracking-tighter text-[var(--fg)] leading-none" style={{ fontFamily: "var(--font-display)" }} />
            <p className="text-2xl text-[var(--muted)] font-medium mb-12">Claim your free 3-day trial pass. No commitments, just pure work.</p>
            
            <div className="bg-[var(--bg)] p-8 border-l-4 border-[var(--accent)] mb-8">
              <h4 className="text-xl font-bold text-[var(--fg)] uppercase mb-2">Location</h4>
              <p className="text-[var(--muted)]">{demoConfig.brand.address}</p>
            </div>
            
            <div className="bg-[var(--bg)] p-8 border-l-4 border-[var(--accent)]">
              <h4 className="text-xl font-bold text-[var(--fg)] uppercase mb-2">Hours</h4>
              {demoConfig.brand.hours.map(h => (
                <p key={h} className="text-[var(--muted)]">{h}</p>
              ))}
            </div>
          </div>

          <div className="bg-[var(--bg)] p-10 shadow-[16px_16px_0_0_var(--accent)]">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────── */}
      <Footer
        brand={demoConfig.brand.name}
        links={[
          { label: "Instagram", href: "#" },
          { label: "YouTube", href: "#" },
          { label: "Waiver", href: "#" },
        ]}
      />
    </>
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
    <div className="w-full bg-[var(--bg)] p-4 md:p-8 mt-8 border border-[var(--muted)]/20">
      {classes.map((c, i) => (
        <div key={i} className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-b border-[var(--muted)]/20 last:border-0 hover:bg-[var(--accent2)] px-4 transition-colors">
          <div className="text-[var(--accent)] font-black text-2xl w-40">{c.time}</div>
          <div className="text-[var(--fg)] text-xl font-bold uppercase tracking-widest flex-1">{c.name}</div>
          <div className="text-[var(--muted)] font-medium mt-2 md:mt-0">Coach: {c.trainer}</div>
        </div>
      ))}
    </div>
  );
}
