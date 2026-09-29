import {
  StickyNav,
  SplitTextReveal,
  Reveal,
  Stagger,
  HorizontalScrollSection,
  BeforeAfterSlider,
  Tabs,
  ContactForm,
  Footer,
  HeroCanvas,
} from "@client-demos/core";
import { config } from "../demo.config";
import { HeroScene } from "./components/HeroScene";
import { BookingWidget } from "./components/BookingWidget";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  return (
    <>
      <StickyNav logo={config.brand.name} links={navLinks} />

      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <HeroCanvas 
            scene={<HeroScene />} 
            fallback={<div className="absolute inset-0 bg-gradient-to-br from-[#F6E4E1] via-[#E8D5B5] to-[#F6E4E1] animate-pulse" />} 
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 pointer-events-none flex flex-col items-center">
          <Reveal>
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--fg)] mb-6 opacity-80">
              {config.brand.address}
            </p>
          </Reveal>

          <SplitTextReveal
            text={config.brand.name}
            tag="h1"
            className="text-6xl md:text-8xl lg:text-9xl tracking-tight text-[var(--fg)] drop-shadow-md"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          />

          <Reveal delay={0.3}>
            <p className="mt-6 text-lg md:text-xl text-[var(--fg)] max-w-xl opacity-90 font-light">
              {config.brand.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="pointer-events-auto mt-10">
              <BookingWidget />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Services (Tabs) ───────────────────────────────── */}
      <section id="services" className="py-24 px-6 bg-[var(--bg)] relative z-20">
        <div className="max-w-5xl mx-auto">
          <SplitTextReveal text="Our Services" tag="h2" className="text-4xl md:text-6xl font-light mb-16" style={{ fontFamily: "var(--font-display)" }} />
          
          <Tabs
            tabs={[
              {
                label: "Hair",
                content: (
                  <Stagger className="grid md:grid-cols-2 gap-8 mt-8">
                    {config.services.filter(s => s.title.includes('Blowout') || s.title.includes('Balayage')).map(service => (
                      <ServiceCard key={service.title} service={service} />
                    ))}
                  </Stagger>
                )
              },
              {
                label: "Nails",
                content: (
                  <Stagger className="grid md:grid-cols-2 gap-8 mt-8">
                    {config.services.filter(s => s.title.includes('Manicure')).map(service => (
                      <ServiceCard key={service.title} service={service} />
                    ))}
                  </Stagger>
                )
              },
              {
                label: "Lashes",
                content: (
                  <Stagger className="grid md:grid-cols-2 gap-8 mt-8">
                    {config.services.filter(s => s.title.includes('Lash')).map(service => (
                      <ServiceCard key={service.title} service={service} />
                    ))}
                  </Stagger>
                )
              },
              {
                label: "Skin",
                content: (
                  <Stagger className="grid md:grid-cols-2 gap-8 mt-8">
                    {config.services.filter(s => s.title.includes('Facial')).map(service => (
                      <ServiceCard key={service.title} service={service} />
                    ))}
                  </Stagger>
                )
              },
            ]}
          />
        </div>
      </section>

      {/* ─── Stylist Team (Horizontal Scroll) ──────────────── */}
      <section id="team" className="bg-[var(--accent2)] text-[var(--fg)] pt-24 relative z-20">
        <div className="max-w-6xl mx-auto px-6 mb-12">
           <SplitTextReveal text="The Artisans" tag="h2" className="text-4xl md:text-6xl font-light" style={{ fontFamily: "var(--font-display)" }} />
        </div>
        <HorizontalScrollSection>
          {config.team.map((member, i) => (
            <div key={member.name} className="flex flex-col md:flex-row items-center gap-12 max-w-4xl mx-auto">
              <div className="w-64 h-80 md:w-96 md:h-[500px] bg-gradient-to-br from-[var(--bg)] to-[var(--accent)] shrink-0 overflow-hidden relative">
                {/* Minimalist Avatar Placeholder */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-20" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="50" cy="40" r="20" />
                  <path d="M 20 100 C 20 60, 80 60, 80 100" />
                </svg>
              </div>
              <div className="text-center md:text-left flex-1">
                <h3 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "var(--font-display)" }}>{member.name}</h3>
                <p className="text-[var(--accent)] uppercase tracking-[0.2em] mb-6">{member.role}</p>
                <p className="text-lg md:text-xl font-light leading-relaxed max-w-lg">{member.bio}</p>
              </div>
            </div>
          ))}
        </HorizontalScrollSection>
      </section>

      {/* ─── Pinned Before/After ───────────────────────────── */}
      <section className="py-24 px-6 bg-[var(--bg)] relative z-20 flex flex-col items-center">
        <div className="max-w-4xl w-full mx-auto">
          <SplitTextReveal text="Transformations" tag="h2" className="text-4xl md:text-6xl font-light mb-16 text-center" style={{ fontFamily: "var(--font-display)" }} />
          
          <Reveal>
            <BeforeAfterSlider 
              before={
                <div className="w-full h-full bg-[#E8D5B5] flex items-center justify-center">
                  <span className="text-2xl font-light uppercase tracking-widest text-[#4A1942]/50">Before</span>
                </div>
              }
              after={
                <div className="w-full h-full bg-[#F6E4E1] flex items-center justify-center">
                  <span className="text-2xl font-light uppercase tracking-widest text-[#4A1942]">After</span>
                </div>
              }
              className="rounded-[var(--radius)] shadow-2xl border border-[var(--muted)]/20"
            />
          </Reveal>
        </div>
      </section>

      {/* ─── Masonry Gallery ───────────────────────────────── */}
      <section id="gallery" className="py-24 px-6 bg-[var(--accent2)] relative z-20">
        <div className="max-w-6xl mx-auto">
          <SplitTextReveal text="Gallery" tag="h2" className="text-4xl md:text-6xl font-light mb-16" style={{ fontFamily: "var(--font-display)" }} />
          
          <Stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => (
              <div 
                key={i} 
                className={`relative overflow-hidden group bg-gradient-to-tr from-[var(--bg)] to-[var(--accent)] rounded-[var(--radius)]
                  ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}
                  ${i === 3 ? "md:col-span-2 md:row-span-1" : ""}
                  ${i === 6 ? "md:row-span-2" : ""}
                `}
              >
                <svg className="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay group-hover:scale-110 transition-transform duration-1000" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d={`M0,100 C${20 + i*10},${80 - i*5} ${80 - i*5},${20 + i*10} 100,0 L100,100 Z`} fill="var(--fg)" />
                </svg>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Testimonials ──────────────────────────────────── */}
      <section className="py-32 px-6 bg-[var(--bg)] relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <SplitTextReveal text="Client Experiences" tag="h2" className="text-4xl md:text-6xl font-light mb-20" style={{ fontFamily: "var(--font-display)" }} />

          <Stagger className="flex flex-col gap-24">
            {config.testimonials.map((t) => (
              <Reveal key={t.name}>
                <blockquote className="text-2xl md:text-4xl italic leading-relaxed" style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <p className="mt-8 text-sm uppercase tracking-[0.2em] text-[var(--muted)]">— {t.name}</p>
              </Reveal>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Contact & CTA ─────────────────────────────────── */}
      <section id="contact" className="py-24 px-6 bg-[var(--accent2)] relative z-20">
        <div className="max-w-xl mx-auto text-center">
          <SplitTextReveal text="Begin Your Journey" tag="h2" className="text-4xl md:text-6xl font-light mb-8" style={{ fontFamily: "var(--font-display)" }} />
          <Reveal>
            <p className="text-[var(--muted)] mb-12 font-light text-lg">{config.brand.phone} · {config.brand.email}</p>
          </Reveal>
          
          <ContactForm />
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────── */}
      <div className="relative z-20">
        <Footer
          brand={config.brand.name}
          links={[
            { label: "Instagram", href: "#" },
            { label: "Book Now", href: "#" },
            { label: "Privacy Policy", href: "#" },
          ]}
        />
      </div>
    </>
  );
}

function ServiceCard({ service }: { service: any }) {
  return (
    <div className="p-8 border border-[var(--muted)]/20 hover:border-[var(--fg)]/30 transition-colors duration-500 rounded-[var(--radius)] bg-[var(--bg)]">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-light" style={{ fontFamily: "var(--font-display)" }}>
          {service.title}
        </h3>
        <span className="text-[var(--fg)] font-semibold whitespace-nowrap ml-4">{service.price}</span>
      </div>
      <p className="text-[var(--muted)] leading-relaxed font-light">{service.description}</p>
    </div>
  );
}

