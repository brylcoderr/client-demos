"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  SplitTextReveal,
  Reveal,
  Stagger,
  Counter,
  Footer,
  useReducedMotion
} from "@client-demos/core";
import { demoConfig as config } from "../demo.config";
import { Hero3DSoft } from "./components/Hero3DSoft";
import { Heart, Users, BookOpen, Home, Calendar, Clock, MapPin, Settings, Check } from "lucide-react";

const getIcon = (name: string) => {
  switch (name) {
    case "Users": return <Users size={32} className="text-[var(--accent)]" />;
    case "Heart": return <Heart size={32} className="text-[var(--accent)]" />;
    case "BookOpen": return <BookOpen size={32} className="text-[var(--accent)]" />;
    case "Home": return <Home size={32} className="text-[var(--accent)]" />;
    default: return <Heart size={32} className="text-[var(--accent)]" />;
  }
};

export default function Page() {
  const prefersReduced = useReducedMotion();
  const [reduceMotion, setReduceMotion] = useState(false);
  const [donationAmount, setDonationAmount] = useState<number>(50);

  useEffect(() => {
    setReduceMotion(prefersReduced);
  }, [prefersReduced]);

  useEffect(() => {
    if (reduceMotion) {
      document.documentElement.setAttribute("data-motion", "reduce");
    } else {
      document.documentElement.removeAttribute("data-motion");
    }
  }, [reduceMotion]);

  return (
    <>
      {/* ─── Accessible Nav ────────────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-inline-start-0 w-full z-[var(--z-nav)] px-6 py-4 bg-[var(--bg)]/95 backdrop-blur border-b border-[var(--border)] shadow-sm flex justify-between items-center transition-all">
        <div className="text-xl font-bold tracking-tight text-[var(--accent)]" style={{ fontFamily: "var(--font-display)" }}>
          {config.brand.name}
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 font-semibold text-[var(--fg)]">
            <a href="#programs" className="hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] rounded transition-colors">Programs</a>
            <a href="#events" className="hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] rounded transition-colors">Events</a>
            <a href="#impact" className="hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] rounded transition-colors">Impact</a>
          </div>
          
          <button 
            onClick={() => setReduceMotion(!reduceMotion)}
            className="flex items-center gap-2 text-sm font-semibold text-[var(--fg-muted)] hover:text-[var(--fg)] border border-[var(--border)] px-3 py-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)]"
            aria-label={reduceMotion ? "Enable animations" : "Reduce motion"}
          >
            <Settings size={16} />
            <span className="hidden md:inline">{reduceMotion ? "Motion: Off" : "Motion: On"}</span>
          </button>
          
          <a href="#donate" className="bg-[var(--accent)] text-[var(--on-accent)] px-5 py-2.5 font-bold rounded-full shadow-md hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]">
            Donate
          </a>
        </div>
      </nav>

      <main id="main-content">
        {/* ─── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-6 pt-24" data-surface="base">
          <div className="absolute inset-0 z-0 opacity-20 bg-[var(--surface)]">
             {/* Replace missing hero image if I want, or rely on Hero3DSoft */}
             <Image src="/images/hero.jpg" alt="Community gathering" fill className="object-cover object-center" sizes="100vw" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNFMUUxRTEiLz48L3N2Zz4=" />
             <div className="absolute inset-0 scrim-bottom z-0"></div>
          </div>
          <Hero3DSoft reducedMotion={reduceMotion} />
          
          <div className="relative z-[var(--z-content)] w-full max-w-4xl mx-auto flex flex-col items-center">
            <Reveal delay={reduceMotion ? 0 : 0.2}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[var(--fg)] leading-tight drop-shadow-md" style={{ fontFamily: "var(--font-display)" }}>
                A space for <span className="text-[var(--accent)] italic">everyone.</span>
              </h1>
            </Reveal>
            
            <Reveal delay={reduceMotion ? 0 : 0.4}>
              <p className="text-xl md:text-2xl text-[var(--fg)] max-w-2xl leading-relaxed mb-10 font-bold bg-[var(--bg)]/80 backdrop-blur px-4 py-2 rounded-lg border border-[var(--border)]">
                {config.brand.tagline}
              </p>
            </Reveal>
            
            <Reveal delay={reduceMotion ? 0 : 0.6}>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#events" className="bg-[var(--accent)] text-[var(--on-accent)] px-8 py-4 text-lg font-bold rounded-full shadow-lg hover:brightness-110 hover:-translate-y-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)]">
                  Join Our Community
                </a>
                <a href="#programs" className="bg-[var(--bg)] text-[var(--fg)] border border-[var(--border)] px-8 py-4 text-lg font-bold rounded-full shadow-sm hover:bg-[var(--surface)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)]">
                  View Programs
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── Programs & Services ───────────────────────────────────────────── */}
        <section id="programs" className="py-24 px-6" data-surface="raised">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--accent)]" style={{ fontFamily: "var(--font-display)" }}>Programs & Services</h2>
              <p className="text-lg text-[var(--fg-muted)] max-w-2xl mx-auto">Supporting our community through dedicated initiatives designed for every stage of life.</p>
            </div>
            
            <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {config.programs.map((prog, idx) => (
                <div key={prog.id} className="bg-[var(--bg)] rounded-[var(--radius)] shadow-sm hover:shadow-md transition-shadow border border-[var(--border)] text-center flex flex-col items-center overflow-hidden" data-surface="base">
                  <div className="w-full h-48 relative bg-[var(--surface-2)]">
                     <Image src={`/images/program-${(idx % 4) + 1}.jpg`} alt={prog.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNFMUUxRTEiLz48L3N2Zz4=" />
                     <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] to-transparent" />
                  </div>
                  <div className="p-8 -mt-12 relative z-[var(--z-content)] flex flex-col items-center">
                    <div className="w-16 h-16 bg-[var(--surface)] rounded-full flex items-center justify-center mb-6 shadow-sm border border-[var(--border)] text-[var(--fg)]">
                      {getIcon(prog.icon)}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[var(--fg)]">{prog.title}</h3>
                    <p className="text-[var(--fg-muted)] leading-relaxed">{prog.description}</p>
                  </div>
                </div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ─── Events Calendar ───────────────────────────────────────────────── */}
        <section id="events" className="py-24 px-6 relative" data-surface="base">
          <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
             <Image src="/images/pattern.png" alt="Islamic pattern background" fill className="object-cover opacity-50" />
          </div>
          <div className="max-w-4xl mx-auto relative z-[var(--z-content)]">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-[var(--accent)]" style={{ fontFamily: "var(--font-display)" }}>Upcoming Events</h2>
            
            <div className="flex flex-col gap-6">
              {config.events.map((e, i) => (
                <Reveal key={e.id} delay={reduceMotion ? 0 : i * 0.1}>
                  <div className="bg-[var(--surface)] p-6 md:p-8 rounded-[var(--radius)] shadow-sm flex flex-col md:flex-row gap-6 md:items-center border-s-8 border-s-[var(--accent)] hover:shadow-md transition-shadow" data-surface="raised">
                     <div className="flex-shrink-0 text-center bg-[var(--surface-2)] rounded-lg p-4 min-w-[100px] border border-[var(--border)]">
                       <span className="block text-sm font-bold text-[var(--fg-muted)] uppercase tracking-wider">Date</span>
                       <span className="block text-2xl font-bold text-[var(--fg)]">{e.date}</span>
                     </div>
                     
                     <div className="flex-1">
                       <h3 className="text-2xl font-bold mb-2 text-[var(--fg)]">{e.title}</h3>
                       <div className="flex flex-col sm:flex-row gap-4 text-[var(--fg-muted)] font-medium">
                         <span className="flex items-center gap-2"><Clock size={18} /> {e.time}</span>
                         <span className="flex items-center gap-2"><MapPin size={18} /> {e.location}</span>
                       </div>
                     </div>
                     
                     <button className="mt-4 md:mt-0 text-[var(--on-accent)] bg-[var(--accent)] font-bold px-6 py-3 rounded-full hover:brightness-110 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]">
                       RSVP
                     </button>
                  </div>
                </Reveal>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <button className="text-[var(--accent)] font-bold hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] rounded px-2">View Full Calendar &rarr;</button>
            </div>
          </div>
        </section>

        {/* ─── Impact Numbers ────────────────────────────────────────────────── */}
        <section id="impact" className="py-24 px-6" data-surface="accent">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-[var(--on-accent)]" style={{ fontFamily: "var(--font-display)" }}>Our Impact This Year</h2>
            
            <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {config.stats.map(s => (
                <div key={s.label}>
                  <div className="text-5xl md:text-6xl font-bold mb-3 text-[var(--accent-2)]" style={{ fontFamily: "var(--font-display)" }}>
                    {reduceMotion || s.value.includes('+') === false ? (
                      <span>{s.value}</span>
                    ) : (
                      <Counter
                        target={parseInt(s.value.replace(/\D/g, ""), 10) || 0}
                        suffix={s.value.replace(/[\d]/g, "")}
                        label=""
                      />
                    )}
                  </div>
                  <p className="text-lg font-semibold text-[var(--on-accent)]">{s.label}</p>
                </div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ─── Team & Testimonials ───────────────────────────────────────────── */}
        <section className="py-24 px-6" data-surface="raised">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
             
             {/* Team */}
             <div>
               <h2 className="text-4xl font-bold mb-10 text-[var(--accent)]" style={{ fontFamily: "var(--font-display)" }}>Leadership Team</h2>
               <div className="flex flex-col gap-8">
                 {config.team.map((member, idx) => (
                   <div key={member.name} className="flex gap-6 items-start">
                     <div className="w-16 h-16 rounded-full bg-[var(--surface-2)] flex-shrink-0 shadow-inner relative overflow-hidden border border-[var(--border)]">
                        <Image src={`/images/team-${idx+1}.jpg`} alt={member.name} fill className="object-cover" sizes="64px" loading="eager" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNFMUUxRTEiLz48L3N2Zz4=" />
                     </div>
                     <div>
                       <h3 className="text-xl font-bold text-[var(--fg)]">{member.name}</h3>
                       <p className="text-[var(--accent)] font-semibold mb-2">{member.role}</p>
                       <p className="text-[var(--fg-muted)]">{member.bio}</p>
                     </div>
                   </div>
                 ))}
               </div>
             </div>

             {/* Testimonials */}
             <div className="bg-[var(--bg)] p-10 rounded-[var(--radius)] border border-[var(--border)]" data-surface="base">
               <h2 className="text-3xl font-bold mb-10 text-[var(--accent)]" style={{ fontFamily: "var(--font-display)" }}>Community Voices</h2>
               <Stagger className="flex flex-col gap-10">
                 {config.testimonials.slice(0, 5).map(t => (
                   <div key={t.name}>
                     <p className="text-xl italic text-[var(--fg)] leading-relaxed mb-4" style={{ fontFamily: "var(--font-display)" }}>
                       "{t.text}"
                     </p>
                     <p className="font-bold text-[var(--fg-muted)]">— {t.name}</p>
                   </div>
                 ))}
               </Stagger>
             </div>
             
          </div>
        </section>

        {/* ─── Service Times & Donation ───────────────────────────────────────── */}
        <section id="donate" className="py-24 px-6 bg-[var(--surface-2)]" data-surface="base">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 bg-[var(--bg)] rounded-2xl shadow-xl overflow-hidden border border-[var(--border)]">
             
             {/* Configurable Service Times */}
             <div className="p-10 md:p-12 bg-[var(--accent)] text-[var(--on-accent)] flex flex-col justify-center" data-surface="accent">
               <h2 className="text-3xl font-bold mb-8 text-[var(--on-accent)]" style={{ fontFamily: "var(--font-display)" }}>Service & Prayer Times</h2>
               <div className="flex flex-col gap-6">
                 {config.serviceTimes.map(st => (
                   <div key={st.day} className="border-b border-[var(--on-accent)]/20 pb-4">
                     <h3 className="text-xl font-bold mb-2 text-[var(--surface-2)]">{st.day}</h3>
                     {st.times.map(t => <p key={t} className="text-lg text-[var(--on-accent)]">{t}</p>)}
                   </div>
                 ))}
               </div>
               
               <div className="mt-8 pt-8 border-t border-[var(--on-accent)]/20 text-[var(--on-accent)]">
                 <div className="flex gap-4 mb-4">
                   <MapPin className="text-[var(--accent-2)] shrink-0" />
                   <p>{config.brand.address}</p>
                 </div>
                 <div className="flex gap-4">
                   <Calendar className="text-[var(--accent-2)] shrink-0" />
                   <div>
                     {config.brand.hours.map(h => <p key={h}>{h}</p>)}
                   </div>
                 </div>
               </div>
             </div>

             {/* Donation Form */}
             <div className="p-10 md:p-12 flex flex-col justify-center">
               <h2 className="text-3xl font-bold mb-2 text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }}>Support Our Mission</h2>
               <p className="text-[var(--fg-muted)] mb-8">Your contribution helps us keep the center open and thriving.</p>
               
               <div className="mb-6">
                 <p className="font-bold mb-3 text-[var(--fg)]">Select Amount</p>
                 <div className="grid grid-cols-3 gap-4">
                   {[25, 50, 100, 250, 500].map(amount => (
                     <button 
                       key={amount}
                       onClick={() => setDonationAmount(amount)}
                       className={`py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] ${donationAmount === amount ? 'bg-[var(--accent)] border-[var(--accent)] text-[var(--on-accent)]' : 'bg-[var(--surface)] border-[var(--border)] text-[var(--fg)] hover:border-[var(--accent)]'}`}
                     >
                       ${amount}
                       {donationAmount === amount && <Check size={18} />}
                     </button>
                   ))}
                   <button 
                     onClick={() => setDonationAmount(0)}
                     className={`py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] ${donationAmount === 0 ? 'bg-[var(--accent)] border-[var(--accent)] text-[var(--on-accent)]' : 'bg-[var(--surface)] border-[var(--border)] text-[var(--fg)] hover:border-[var(--accent)]'}`}
                   >
                     Custom
                     {donationAmount === 0 && <Check size={18} />}
                   </button>
                 </div>
               </div>

               <form className="flex flex-col gap-5">
                 {donationAmount === 0 && (
                   <div>
                     <label className="block text-sm font-bold text-[var(--fg-muted)] mb-1" htmlFor="customAmount">Custom Amount ($)</label>
                     <input id="customAmount" type="number" min="1" className="w-full bg-[var(--surface)] border border-[var(--border)] px-4 py-3 rounded-lg focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none text-[var(--fg)]" placeholder="Enter amount" />
                   </div>
                 )}
                 <div>
                   <label className="block text-sm font-bold text-[var(--fg-muted)] mb-1" htmlFor="name">Full Name</label>
                   <input id="name" type="text" className="w-full bg-[var(--surface)] border border-[var(--border)] px-4 py-3 rounded-lg focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none text-[var(--fg)]" />
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-[var(--fg-muted)] mb-1" htmlFor="email">Email Address</label>
                   <input id="email" type="email" className="w-full bg-[var(--surface)] border border-[var(--border)] px-4 py-3 rounded-lg focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none text-[var(--fg)]" />
                 </div>
                 <button className="bg-[var(--accent)] text-[var(--on-accent)] py-4 font-bold rounded-lg shadow-md hover:brightness-110 transition-colors mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]">
                   Donate {donationAmount > 0 ? `$${donationAmount}` : ''}
                 </button>
               </form>
             </div>
             
          </div>
        </section>
      </main>

      {/* ─── Footer ────────────────────────────────────────────────────────── */}
      <Footer
        brand={config.brand.name}
        links={[
          { label: "About Us", href: "#" },
          { label: "Programs", href: "#programs" },
          { label: "Donate", href: "#donate" },
          { label: "Contact", href: "#" },
        ]}
      />
    </>
  );
}
