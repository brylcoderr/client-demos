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
  SmartImage,
  MagneticButton
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
  const isOpen = new Date().getHours() >= 9 && new Date().getHours() < 18;

  return (
    <main className="overflow-x-clip bg-[var(--bg)] text-[var(--fg)]">
      <StickyNav logo={demoConfig.brand.name} links={navLinks} aria-label="Main Navigation" />

      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="relative h-[100svh] w-full flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-[var(--bg)]">
        {/* 3D Background */}
        <div className="absolute inset-0 z-[var(--z-base)] pointer-events-none">
          <HeroCanvas 
            scene={<HeroBarberPole />} 
            fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-[80vh] rounded-full overflow-hidden relative shadow-2xl rotate-12">
                   <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#801010_0_20px,#ffffff_20px_40px,#102080_40px_60px,#ffffff_60px_80px)] animate-[pulse_5s_infinite_linear] opacity-10" />
                </div>
              </div>
            } 
          />
        </div>

        {/* Scrim for text readability */}
        <div className="absolute inset-0 z-[var(--z-base)] pointer-events-none scrim-bottom" />

        {/* Hero Content */}
        <div className="relative z-[var(--z-content)] pointer-events-none flex flex-col items-center p-8">
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
            <p className="mt-6 text-lg md:text-xl text-[var(--fg-muted)] max-w-xl uppercase tracking-widest font-light">
              {demoConfig.brand.tagline}
            </p>
          </Reveal>
          
          <Reveal delay={0.5}>
            <a href="#booking" className="pointer-events-auto mt-10 inline-block px-8 py-4 bg-[var(--accent)] text-[var(--on-accent)] font-bold uppercase tracking-widest hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--fg)]">
              Book a Chair
            </a>
          </Reveal>
        </div>
      </section>

      {/* Diagonal edge via clip-path */}
      <div className="relative z-[var(--z-content)] pt-32 pb-24 px-6 bg-[var(--surface)] border-t-[4px] border-[var(--border)]" style={{ clipPath: "polygon(0 80px, 100% 0, 100% 100%, 0 100%)" }} data-surface="raised">
        
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
                <p className="text-sm uppercase tracking-widest text-[var(--fg-muted)] font-bold">{stat.label}</p>
              </div>
            ))}
          </Stagger>
        </div>

        {/* ─── Services ──────────────────────────────────────── */}
        <section id="services" className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">
          <div className="flex-1">
            <SplitTextReveal text="Menu of Services" tag="h2" className="text-5xl md:text-7xl mb-16 uppercase tracking-tight text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }} />
            <Stagger className="flex flex-col gap-12">
              {demoConfig.services.map((service) => (
                <div key={service.title} className="group cursor-default">
                  <div className="flex justify-between items-end mb-2 border-b-2 border-[var(--border)] pb-2 group-hover:border-[var(--accent)] transition-colors duration-500">
                    <h3 className="text-2xl uppercase tracking-wider text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }}>
                      {service.title}
                    </h3>
                    <span className="text-[var(--accent)] font-bold text-xl">{service.price}</span>
                  </div>
                  <p className="text-[var(--fg-muted)] leading-relaxed text-sm md:text-base font-light">{service.description}</p>
                </div>
              ))}
            </Stagger>
          </div>
          <div className="flex-1 relative min-h-[400px]">
            <SmartImage src="/images/hero-barber-chair.jpg" alt="Barber Chair" width={800} height={1000} className="w-full h-full object-cover rounded-sm grayscale contrast-125" />
          </div>
        </section>
      </div>

      {/* ─── Pinned Process ────────────────────────────────── */}
      <section id="process" className="bg-[var(--bg)] relative z-[var(--z-content)] border-t-[4px] border-[var(--border)]" style={{ clipPath: "polygon(0 0, 100% 80px, 100% 100%, 0 100%)" }} data-surface="base">
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
      <section id="gallery" className="py-24 px-6 bg-[var(--surface-2)] relative z-[var(--z-content)] border-t-[4px] border-[var(--border)]" style={{ clipPath: "polygon(0 80px, 100% 0, 100% 100%, 0 100%)" }}>
        <div className="max-w-6xl mx-auto pt-16">
          <SplitTextReveal text="Our Team" tag="h2" className="text-5xl md:text-7xl mb-16 uppercase tracking-tight text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }} />
          
          <Stagger className="grid md:grid-cols-3 gap-8 mb-32">
            {demoConfig.team.map((member, i) => (
              <div key={member.name} className="bg-[var(--bg)] border-2 border-[var(--border)] hover:border-[var(--accent)] transition-colors duration-500 shadow-xl group">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <SmartImage src={`/images/barber-${i+1}.jpg`} alt={member.name} width={600} height={800} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="p-8">
                  <h3 className="text-3xl uppercase tracking-tight mb-2 text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }}>{member.name}</h3>
                  <p className="text-[var(--accent)] uppercase tracking-widest text-sm mb-6 font-bold">{member.role}</p>
                  <p className="text-[var(--fg-muted)] font-light leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </Stagger>

          <SplitTextReveal text="The Work" tag="h2" className="text-5xl md:text-7xl mb-16 uppercase tracking-tight text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }} />
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['fade-cut.jpg', 'shave-hot-towel.jpg', 'beard-trim.jpg', 'tools-flatlay.jpg'].map((img, i) => (
              <div key={i} className="aspect-square bg-[var(--bg)] border border-[var(--border)] relative overflow-hidden group">
                <SmartImage src={`/images/${img}`} alt={`Gallery ${i}`} width={600} height={600} className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Location & Booking ────────────────────────────── */}
      <section id="location" className="bg-[var(--inverse-bg)] relative z-[var(--z-content)] py-32 px-6 border-t-[4px] border-[var(--border)]" style={{ clipPath: "polygon(0 80px, 100% 0, 100% 100%, 0 100%)" }} data-surface="inverse">
        <div className="max-w-6xl mx-auto pt-16 grid md:grid-cols-2 gap-16">
          <div>
             <div className="flex items-center gap-4 mb-8">
               <SplitTextReveal text="Find Us" tag="h2" className="text-5xl md:text-7xl uppercase tracking-tight text-[var(--accent-on-light)]" style={{ fontFamily: "var(--font-display)" }} />
               <div className={`px-4 py-2 flex items-center gap-2 border-2 ${isOpen ? 'border-[var(--accent)] text-[var(--accent)]' : 'border-[var(--accent-2)] text-[var(--accent-2)]'} uppercase font-bold text-xs tracking-widest`}>
                 <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-[var(--accent)]' : 'bg-[var(--accent-2)]'}`} />
                 {isOpen ? 'Open Now' : 'Closed'}
               </div>
             </div>
             
             <div className="mb-12">
               <p className="text-2xl text-[var(--inverse-fg)] mb-2 uppercase tracking-wider" style={{ fontFamily: "var(--font-display)" }}>{demoConfig.brand.address}</p>
               <p className="text-[var(--inverse-fg)] text-lg">{demoConfig.brand.phone}</p>
             </div>
             
             <div className="space-y-4 mb-12 border-l-4 border-[var(--accent-on-light)] pl-6">
               {demoConfig.brand.hours.map(h => (
                 <p key={h} className="text-[var(--inverse-fg)] font-light tracking-widest uppercase">{h}</p>
               ))}
             </div>

             <div id="booking" className="p-10 bg-[var(--inverse-bg)] border-2 border-[var(--border)] shadow-2xl">
               <h3 className="text-4xl uppercase tracking-tight mb-8 text-[var(--inverse-fg)]" style={{ fontFamily: "var(--font-display)" }}>Reserve a Chair</h3>
               <div className="grid grid-cols-3 gap-2 mb-6">
                 {['10:00', '11:00', '13:00', '14:30', '16:00', '17:30'].map(t => (
                   <button key={t} className="p-3 border border-[var(--border)] text-[var(--inverse-fg)] hover:border-[var(--accent-on-light)] hover:text-[var(--accent-on-light)] transition-colors uppercase tracking-widest text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--inverse-fg)]">
                     {t}
                   </button>
                 ))}
               </div>
               <MagneticButton className="w-full mt-4 p-4 bg-[var(--accent-on-light)] text-[var(--inverse-bg)] font-bold uppercase tracking-widest hover:brightness-110 transition-all text-center">
                 Book Next Slot
               </MagneticButton>
             </div>
          </div>

          <div className="relative aspect-square md:aspect-auto border-4 border-[var(--border)] overflow-hidden shadow-2xl">
            <SmartImage src="/images/storefront.jpg" alt="Storefront" width={1000} height={1000} className="w-full h-full object-cover grayscale" />
          </div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────── */}
      <div className="relative z-[var(--z-content)] border-t-[4px] border-[var(--border)] bg-[var(--bg)]" data-surface="base">
        <div className="max-w-6xl mx-auto px-6 py-12 flex justify-between items-center border-b border-[var(--border)] mb-12">
           <h3 className="text-2xl uppercase tracking-widest font-bold text-[var(--fg)]">Loyalty Program</h3>
           <div className="flex gap-2">
             {[...Array(9)].map((_,i) => <div key={i} className="w-8 h-8 rounded-full border-2 border-[var(--border)]" />)}
             <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-[var(--on-accent)] font-bold text-xs">FREE</div>
           </div>
        </div>
        <Footer
          brand={demoConfig.brand.name}
          links={[
            { label: "Instagram", href: "#" },
            { label: "Yelp", href: "#" },
            { label: "Privacy Policy", href: "#" },
          ]}
        />
      </div>
    </main>
  );
}
