"use client";

import React, { useState, useEffect } from "react";
import {
  SplitTextReveal,
  Reveal,
  Stagger,
  Counter,
  ContactForm,
  MagneticButton,
  Footer,
  useReducedMotion
} from "@client-demos/core";
import { config } from "../demo.config";
import { Hero3DSoft } from "./components/Hero3DSoft";
import { Heart, Users, BookOpen, Home, Calendar, Clock, MapPin, Settings } from "lucide-react";

// Helper to map icon string to Lucide component
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

  useEffect(() => {
    setReduceMotion(prefersReduced);
  }, [prefersReduced]);

  return (
    <>
      {/* ─── Accessible Nav ────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 bg-[var(--bg)]/90 backdrop-blur border-b border-[var(--muted)]/20 shadow-sm flex justify-between items-center transition-all">
        <div className="text-xl font-bold tracking-tight text-[var(--accent)]" style={{ fontFamily: "var(--font-display)" }}>
          {config.brand.name}
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 font-semibold text-[var(--fg)]">
            <a href="#programs" className="hover:text-[var(--accent)] focus-visible:outline-none transition-colors">Programs</a>
            <a href="#events" className="hover:text-[var(--accent)] focus-visible:outline-none transition-colors">Events</a>
            <a href="#impact" className="hover:text-[var(--accent)] focus-visible:outline-none transition-colors">Impact</a>
          </div>
          
          <button 
            onClick={() => setReduceMotion(!reduceMotion)}
            className="flex items-center gap-2 text-sm font-semibold text-[var(--muted)] hover:text-[var(--fg)] border border-[var(--muted)]/30 px-3 py-1.5 rounded-full focus-visible:outline-none"
            aria-label={reduceMotion ? "Enable animations" : "Reduce motion"}
          >
            <Settings size={16} />
            <span className="hidden md:inline">{reduceMotion ? "Motion: Off" : "Motion: On"}</span>
          </button>
          
          <button className="bg-[var(--accent)] text-white px-5 py-2.5 font-bold rounded-full shadow-md hover:bg-[var(--muted)] transition-colors focus-visible:outline-none">
            Donate
          </button>
        </div>
      </nav>

      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-24">
        <Hero3DSoft reducedMotion={reduceMotion} />
        
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
          <Reveal delay={reduceMotion ? 0 : 0.2}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[var(--fg)] leading-tight drop-shadow-sm" style={{ fontFamily: "var(--font-display)" }}>
              A space for <span className="text-[var(--accent)] italic">everyone.</span>
            </h1>
          </Reveal>
          
          <Reveal delay={reduceMotion ? 0 : 0.4}>
            <p className="text-xl md:text-2xl text-[var(--fg)]/80 max-w-2xl leading-relaxed mb-10 font-medium">
              {config.brand.tagline}
            </p>
          </Reveal>
          
          <Reveal delay={reduceMotion ? 0 : 0.6}>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[var(--accent)] text-white px-8 py-4 text-lg font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all focus-visible:outline-none">
                Join Our Community
              </button>
              <button className="bg-white text-[var(--fg)] border border-[var(--muted)]/20 px-8 py-4 text-lg font-bold rounded-full shadow-sm hover:bg-[var(--accent2)] transition-all focus-visible:outline-none">
                View Schedule
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Programs & Services ───────────────────────────────────────────── */}
      <section id="programs" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--accent)" }}>Programs & Services</h2>
            <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">Supporting our community through dedicated initiatives designed for every stage of life.</p>
          </div>
          
          <Stagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {config.programs.map((prog) => (
              <div key={prog.id} className="bg-[var(--bg)] p-8 rounded-[var(--radius)] shadow-sm hover:shadow-md transition-shadow border border-[var(--muted)]/10 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                  {getIcon(prog.icon)}
                </div>
                <h3 className="text-xl font-bold mb-3">{prog.title}</h3>
                <p className="text-[var(--muted)] leading-relaxed">{prog.description}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Events Calendar ───────────────────────────────────────────────── */}
      <section id="events" className="py-24 px-6 bg-[var(--bg)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12" style={{ fontFamily: "var(--font-display)", color: "var(--accent)" }}>Upcoming Events</h2>
          
          <div className="flex flex-col gap-6">
            {config.events.map((e, i) => (
              <Reveal key={e.id} delay={reduceMotion ? 0 : i * 0.1}>
                <div className="bg-white p-6 md:p-8 rounded-[var(--radius)] shadow-sm flex flex-col md:flex-row gap-6 md:items-center border-l-8 border-[var(--accent)] hover:shadow-md transition-shadow">
                   <div className="flex-shrink-0 text-center bg-[var(--accent2)]/50 rounded-lg p-4 min-w-[100px]">
                     <span className="block text-sm font-bold text-[var(--muted)] uppercase tracking-wider">Date</span>
                     <span className="block text-2xl font-bold text-[var(--accent)]">{e.date}</span>
                   </div>
                   
                   <div className="flex-1">
                     <h3 className="text-2xl font-bold mb-2">{e.title}</h3>
                     <div className="flex flex-col sm:flex-row gap-4 text-[var(--muted)] font-medium">
                       <span className="flex items-center gap-2"><Clock size={18} /> {e.time}</span>
                       <span className="flex items-center gap-2"><MapPin size={18} /> {e.location}</span>
                     </div>
                   </div>
                   
                   <button className="mt-4 md:mt-0 text-[var(--accent)] font-bold px-6 py-3 border border-[var(--accent)] rounded-full hover:bg-[var(--accent)] hover:text-white transition-colors focus-visible:outline-none">
                     RSVP
                   </button>
                </div>
              </Reveal>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="text-[var(--accent)] font-bold hover:underline underline-offset-4 focus-visible:outline-none">View Full Calendar &rarr;</button>
          </div>
        </div>
      </section>

      {/* ─── Impact Numbers ────────────────────────────────────────────────── */}
      <section id="impact" className="py-24 px-6 bg-[var(--accent)] text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16" style={{ fontFamily: "var(--font-display)" }}>Our Impact This Year</h2>
          
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {config.stats.map(s => (
              <div key={s.label}>
                <div className="text-5xl md:text-6xl font-bold mb-3" style={{ fontFamily: "var(--font-display)", color: "var(--accent2)" }}>
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
                <p className="text-lg font-semibold">{s.label}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Team & Testimonials ───────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
           
           {/* Team */}
           <div>
             <h2 className="text-4xl font-bold mb-10" style={{ fontFamily: "var(--font-display)", color: "var(--accent)" }}>Leadership Team</h2>
             <div className="flex flex-col gap-8">
               {config.team.map((member) => (
                 <div key={member.name} className="flex gap-6 items-start">
                   <div className="w-16 h-16 rounded-full bg-[var(--accent2)] flex-shrink-0 shadow-inner"></div>
                   <div>
                     <h3 className="text-xl font-bold text-[var(--fg)]">{member.name}</h3>
                     <p className="text-[var(--accent)] font-semibold mb-2">{member.role}</p>
                     <p className="text-[var(--muted)]">{member.bio}</p>
                   </div>
                 </div>
               ))}
             </div>
           </div>

           {/* Testimonials */}
           <div className="bg-[var(--bg)] p-10 rounded-[var(--radius)]">
             <h2 className="text-3xl font-bold mb-10" style={{ fontFamily: "var(--font-display)", color: "var(--accent)" }}>Community Voices</h2>
             <Stagger className="flex flex-col gap-10">
               {config.testimonials.map(t => (
                 <div key={t.name}>
                   <p className="text-xl italic text-[var(--fg)] leading-relaxed mb-4" style={{ fontFamily: "var(--font-display)" }}>
                     "{t.text}"
                   </p>
                   <p className="font-bold text-[var(--muted)]">— {t.name}</p>
                 </div>
               ))}
             </Stagger>
           </div>
           
        </div>
      </section>

      {/* ─── Service Times & Contact ───────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[var(--accent2)]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl overflow-hidden">
           
           {/* Configurable Service Times */}
           <div className="p-10 md:p-12 bg-[var(--accent)] text-white flex flex-col justify-center">
             <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: "var(--font-display)" }}>Service & Prayer Times</h2>
             <div className="flex flex-col gap-6">
               {config.serviceTimes.map(st => (
                 <div key={st.day} className="border-b border-white/20 pb-4">
                   <h3 className="text-xl font-bold mb-2 text-[var(--accent2)]">{st.day}</h3>
                   {st.times.map(t => <p key={t} className="text-lg opacity-90">{t}</p>)}
                 </div>
               ))}
             </div>
             
             <div className="mt-8 pt-8 border-t border-white/20">
               <div className="flex gap-4 mb-4">
                 <MapPin className="text-[var(--accent2)] shrink-0" />
                 <p>{config.brand.address}</p>
               </div>
               <div className="flex gap-4">
                 <Calendar className="text-[var(--accent2)] shrink-0" />
                 <div>
                   {config.brand.hours.map(h => <p key={h}>{h}</p>)}
                 </div>
               </div>
             </div>
           </div>

           {/* Contact/Donation Form */}
           <div className="p-10 md:p-12 flex flex-col justify-center">
             <h2 className="text-3xl font-bold mb-2 text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }}>Get in Touch</h2>
             <p className="text-[var(--muted)] mb-8">Have a question or want to support our mission?</p>
             
             <form className="flex flex-col gap-5">
               <div>
                 <label className="block text-sm font-bold text-[var(--muted)] mb-1" htmlFor="name">Full Name</label>
                 <input id="name" type="text" className="w-full bg-[var(--bg)] border border-[var(--muted)]/30 px-4 py-3 rounded-lg focus:border-[var(--accent)] outline-none" />
               </div>
               <div>
                 <label className="block text-sm font-bold text-[var(--muted)] mb-1" htmlFor="email">Email Address</label>
                 <input id="email" type="email" className="w-full bg-[var(--bg)] border border-[var(--muted)]/30 px-4 py-3 rounded-lg focus:border-[var(--accent)] outline-none" />
               </div>
               <div>
                 <label className="block text-sm font-bold text-[var(--muted)] mb-1" htmlFor="msg">Message</label>
                 <textarea id="msg" rows={3} className="w-full bg-[var(--bg)] border border-[var(--muted)]/30 px-4 py-3 rounded-lg focus:border-[var(--accent)] outline-none"></textarea>
               </div>
               <button className="bg-[var(--accent)] text-white py-4 font-bold rounded-lg shadow-md hover:bg-[var(--muted)] transition-colors mt-2">
                 Send Message
               </button>
             </form>
           </div>
           
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────────────────────── */}
      <Footer
        brand={config.brand.name}
        links={[
          { label: "About Us", href: "#" },
          { label: "Programs", href: "#programs" },
          { label: "Donate", href: "#" },
          { label: "Contact", href: "#" },
        ]}
      />
    </>
  );
}
