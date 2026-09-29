import {
  StickyNav,
  SplitTextReveal,
  Reveal,
  Stagger,
  Counter,
  PinnedSteps,
  ContactForm,
  Footer,
  HeroCanvas,
} from "@client-demos/core";
import { demoConfig } from "../demo.config";
import { HeroBarberPole } from "./components/HeroBarberPole";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "The Process", href: "#process" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
];

export default function Home() {
  return (
    <>
      <StickyNav logo={demoConfig.brand.name} links={navLinks} />

      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-[var(--bg)]">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <HeroCanvas 
            scene={<HeroBarberPole />} 
            fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-[80vh] rounded-full overflow-hidden relative shadow-2xl rotate-12">
                   <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#801010_0_20px,#ffffff_20px_40px,#102080_40px_60px,#ffffff_60px_80px)] animate-[pulse_5s_infinite_linear] opacity-50" />
                </div>
              </div>
            } 
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 pointer-events-none flex flex-col items-center bg-[var(--bg)]/80 p-8 border border-[var(--accent)]/30 backdrop-blur-sm shadow-2xl">
          <Reveal>
            <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-[var(--accent)] mb-4 font-bold">
              Est. 2014
            </p>
          </Reveal>

          <SplitTextReveal
            text={demoConfig.brand.name}
            tag="h1"
            className="text-6xl md:text-8xl lg:text-9xl tracking-tight text-[var(--fg)] uppercase drop-shadow-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          />

          <Reveal delay={0.3}>
            <p className="mt-6 text-lg md:text-xl text-[var(--fg)] max-w-xl opacity-90 uppercase tracking-widest font-light">
              {demoConfig.brand.tagline}
            </p>
          </Reveal>
          
          <Reveal delay={0.5}>
            <a href="#booking" className="pointer-events-auto mt-10 inline-block px-8 py-4 bg-[var(--accent)] text-[var(--bg)] font-bold uppercase tracking-widest hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors">
              Book a Chair
            </a>
          </Reveal>
        </div>
      </section>

      {/* Diagonal wipe transition wrapper for next section */}
      <div className="relative z-20 -mt-20 pt-32 pb-24 px-6 bg-[var(--accent2)] border-t-[4px] border-[var(--accent)]" style={{ clipPath: "polygon(0 80px, 100% 0, 100% 100%, 0 100%)" }}>
        
        {/* ─── Stats ─────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto mb-32">
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {demoConfig.stats.map((stat) => (
              <div key={stat.label} className="border-l-4 border-[var(--accent)] pl-6 text-left">
                <Counter
                  target={parseInt(stat.value.replace(/\D/g, ""), 10) || 0}
                  suffix={stat.value.replace(/[\d]/g, "")}
                  label={stat.label}
                  className="text-5xl text-[var(--accent)] font-bold mb-2"
                />
                <p className="text-sm uppercase tracking-widest text-[var(--muted)] font-bold">{stat.label}</p>
              </div>
            ))}
          </Stagger>
        </div>

        {/* ─── Services ──────────────────────────────────────── */}
        <section id="services" className="max-w-6xl mx-auto">
          <SplitTextReveal text="Menu of Services" tag="h2" className="text-5xl md:text-7xl mb-16 uppercase tracking-tight text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }} />

          <Stagger className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {demoConfig.services.map((service) => (
              <div key={service.title} className="group cursor-default">
                <div className="flex justify-between items-end mb-2 border-b-2 border-[var(--muted)]/30 pb-2 group-hover:border-[var(--accent)] transition-colors duration-500">
                  <h3 className="text-2xl uppercase tracking-wider text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }}>
                    {service.title}
                  </h3>
                  <span className="text-[var(--accent)] font-bold text-xl">{service.price}</span>
                </div>
                <p className="text-[var(--muted)] leading-relaxed text-sm md:text-base font-light">{service.description}</p>
              </div>
            ))}
          </Stagger>
        </section>
      </div>

      {/* ─── Pinned Process ────────────────────────────────── */}
      <section id="process" className="bg-[var(--bg)] relative z-20 border-t-[4px] border-[var(--accent)]" style={{ clipPath: "polygon(0 0, 100% 80px, 100% 100%, 0 100%)" }}>
        <div className="pt-32 pb-24">
          <div className="max-w-6xl mx-auto px-6 mb-16">
            <SplitTextReveal text="The Process" tag="h2" className="text-5xl md:text-7xl uppercase tracking-tight text-[var(--accent)]" style={{ fontFamily: "var(--font-display)" }} />
          </div>
          <PinnedSteps 
            steps={[
              { title: "Consult", description: "Every great cut starts with a conversation. We discuss your hair type, lifestyle, and goals." },
              { title: "Precision Cut", description: "Our master barbers execute the cut with exacting precision and classic techniques." },
              { title: "Hot Towel", description: "Relax with a steamed towel and premium essential oils to soothe the skin." },
              { title: "Finish", description: "Styled to perfection with our in-house pomades, leaving you ready to conquer the day." }
            ]}
          />
        </div>
      </section>

      {/* ─── Barbers & Gallery ─────────────────────────────── */}
      <section id="gallery" className="py-24 px-6 bg-[var(--accent2)] relative z-20 border-t-[4px] border-[var(--accent)]" style={{ clipPath: "polygon(0 80px, 100% 0, 100% 100%, 0 100%)" }}>
        <div className="max-w-6xl mx-auto pt-16">
          <SplitTextReveal text="Our Team" tag="h2" className="text-5xl md:text-7xl mb-16 uppercase tracking-tight text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }} />
          
          <Stagger className="grid md:grid-cols-3 gap-8 mb-32">
            {demoConfig.team.map((member) => (
              <div key={member.name} className="p-8 bg-[var(--bg)] border-2 border-[var(--muted)]/10 hover:border-[var(--accent)] transition-colors duration-500 shadow-xl">
                <h3 className="text-3xl uppercase tracking-tight mb-2 text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }}>{member.name}</h3>
                <p className="text-[var(--accent)] uppercase tracking-widest text-sm mb-6 font-bold">{member.role}</p>
                <p className="text-[var(--muted)] font-light leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </Stagger>

          <SplitTextReveal text="The Work" tag="h2" className="text-5xl md:text-7xl mb-16 uppercase tracking-tight text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }} />
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-[var(--bg)] border-2 border-[var(--muted)]/20 relative group overflow-hidden">
                <div className="absolute inset-0 bg-[var(--accent)]/5 group-hover:bg-[var(--accent)]/20 transition-colors duration-500" />
                <svg className="w-1/2 h-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 text-[var(--accent)] group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  {i % 2 === 0 ? (
                     <path d="M7 21v-5a5 5 0 0 1 10 0v5 M4 10h16 M12 3v7" />
                  ) : (
                     <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 8v4l3 3" />
                  )}
                </svg>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Testimonials ──────────────────────────────────── */}
      <section className="py-32 px-6 bg-[var(--bg)] relative z-20 border-t-[4px] border-[var(--accent)]" style={{ clipPath: "polygon(0 0, 100% 80px, 100% 100%, 0 100%)" }}>
        <div className="max-w-4xl mx-auto text-center pt-16">
          <SplitTextReveal text="Word on the Street" tag="h2" className="text-5xl md:text-7xl uppercase tracking-tight text-[var(--accent)] mb-20" style={{ fontFamily: "var(--font-display)" }} />

          <Stagger className="flex flex-col gap-24">
            {demoConfig.testimonials.map((t) => (
              <Reveal key={t.name}>
                <blockquote className="text-3xl md:text-5xl uppercase tracking-tight leading-tight text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }}>
                  "{t.text}"
                </blockquote>
                <div className="mt-8 flex flex-col items-center justify-center gap-2">
                  <div className="flex gap-1 text-[var(--accent)]">
                    {[...Array(t.rating)].map((_, i) => (
                      <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm uppercase tracking-widest text-[var(--muted)] font-bold">— {t.name}</p>
                </div>
              </Reveal>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Location & Booking ────────────────────────────── */}
      <section id="location" className="bg-[var(--accent2)] relative z-20 py-32 px-6 border-t-[4px] border-[var(--accent)]" style={{ clipPath: "polygon(0 80px, 100% 0, 100% 100%, 0 100%)" }}>
        <div className="max-w-6xl mx-auto pt-16 grid md:grid-cols-2 gap-16">
          <div>
             <SplitTextReveal text="Find Us" tag="h2" className="text-5xl md:text-7xl mb-8 uppercase tracking-tight text-[var(--accent)]" style={{ fontFamily: "var(--font-display)" }} />
             <div className="mb-12">
               <p className="text-2xl text-[var(--fg)] mb-2 uppercase tracking-wider" style={{ fontFamily: "var(--font-display)" }}>{demoConfig.brand.address}</p>
               <p className="text-[var(--muted)] text-lg">{demoConfig.brand.phone}</p>
             </div>
             
             <div className="space-y-4 mb-12 border-l-4 border-[var(--accent)] pl-6">
               {demoConfig.brand.hours.map(h => (
                 <p key={h} className="text-[var(--fg)] font-light tracking-widest uppercase">{h}</p>
               ))}
             </div>

             <div id="booking" className="p-10 bg-[var(--accent2)] border-2 border-[var(--accent)]/30 shadow-2xl">
               <h3 className="text-4xl uppercase tracking-tight mb-8 text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }}>Reserve a Chair</h3>
               <ContactForm />
             </div>
          </div>

          <div className="relative aspect-square md:aspect-auto bg-[#0a0a0a] border-4 border-[var(--accent)]/20 overflow-hidden shadow-2xl">
            {/* SVG Map Block */}
            <svg className="absolute inset-0 w-full h-full opacity-30 group-hover:opacity-50 transition-opacity" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,20 L100,80 M20,0 L80,100 M0,50 L100,50 M50,0 L50,100 M30,0 L30,100 M70,0 L70,100 M0,30 L100,30 M0,70 L100,70" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="2,2" />
              <circle cx="50" cy="50" r="3" fill="var(--accent)" className="animate-pulse" />
              <path d="M50,50 L50,40 C50,30 60,30 60,20" stroke="var(--accent)" strokeWidth="1" fill="none" />
            </svg>
          </div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────── */}
      <div className="relative z-20 border-t-[4px] border-[var(--accent)]">
        <Footer
          brand={demoConfig.brand.name}
          links={[
            { label: "Instagram", href: "#" },
            { label: "Yelp", href: "#" },
            { label: "Privacy Policy", href: "#" },
          ]}
        />
      </div>
    </>
  );
}
