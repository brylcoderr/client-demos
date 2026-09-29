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
  Section,
  MagneticButton,
  SmartImage,
} from "@client-demos/core";
import { demoConfig as config } from "../demo.config";
import { HeroScene } from "./components/HeroScene";
import { BookingWidget } from "./components/BookingWidget";
import { MagneticLink } from "./components/MagneticLink";

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

      <main id="main-content">
        {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="relative h-[100svh] w-full flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-[var(--bg)]" data-surface="base">
        {/* CSS Grain */}
        <div className="absolute inset-0 z-[var(--z-content)] pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'url("/images/noise.png")', backgroundRepeat: 'repeat' }} />
        
        {/* 3D Background */}
        <div className="absolute inset-0 z-[var(--z-base)]">
          <HeroCanvas 
            scene={<HeroScene />} 
            fallback={
              <div className="absolute inset-0 overflow-hidden bg-[var(--bg)]">
                <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-[var(--surface)] rounded-[var(--radius)] mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" />
                <div className="absolute top-[40%] right-[20%] w-96 h-96 bg-[var(--surface2)] rounded-[var(--radius)] mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-75" />
                <div className="absolute bottom-[20%] left-[40%] w-96 h-96 bg-[var(--accent)] rounded-[var(--radius)] mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-150" />
              </div>
            } 
          />
        </div>

        <div className="absolute inset-0 z-[var(--z-content)] pointer-events-none scrim-bottom" />

        {/* Hero Content */}
        <div className="relative z-[var(--z-content)] pointer-events-none flex flex-col items-center w-full">
          <Reveal>
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-6">
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
            <p className="mt-6 text-lg md:text-xl text-[var(--fg-muted)] max-w-xl font-light">
              {config.brand.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="pointer-events-auto mt-10">
              <MagneticLink 
                href={config.extra?.bookingUrl as string || "#"} 
                className="bg-[var(--accent)] text-[var(--on-accent)] uppercase tracking-widest text-sm hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--fg)]"
              >
                Book Appointment
              </MagneticLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Services (Tabs) ───────────────────────────────── */}
      <Section surface="raised" id="services" className="py-24 px-6 relative z-[var(--z-content)]">
        <div className="max-w-5xl mx-auto">
          <SplitTextReveal text="Our Services" tag="h2" className="text-4xl md:text-6xl font-light mb-16 text-center" style={{ fontFamily: "var(--font-display)" }} />
          
          <Tabs
            tabs={[
              {
                label: "Hair",
                content: (
                  <Stagger className="grid md:grid-cols-2 gap-8 mt-8">
                    {config.services.filter(s => s.title.includes('Cut') || s.title.includes('Blowout') || s.title.includes('Balayage')).map(service => (
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
                label: "Skin & Body",
                content: (
                  <Stagger className="grid md:grid-cols-2 gap-8 mt-8">
                    {config.services.filter(s => s.title.includes('Facial') || s.title.includes('Brow') || s.title.includes('Laser')).map(service => (
                      <ServiceCard key={service.title} service={service} />
                    ))}
                  </Stagger>
                )
              },
            ]}
          />
        </div>
      </Section>

      {/* ─── Stylist Team (Horizontal Scroll) ──────────────── */}
      <Section surface="inverse" id="team" className="pt-24 relative z-[var(--z-content)]">
        <div className="max-w-6xl mx-auto px-6 mb-12">
           <SplitTextReveal text="The Artisans" tag="h2" className="text-4xl md:text-6xl font-light" style={{ fontFamily: "var(--font-display)" }} />
        </div>
        <HorizontalScrollSection>
          {config.team.map((member, i) => (
            <div key={member.name} className="flex flex-col md:flex-row items-center gap-12 max-w-4xl mx-auto px-6">
              <div className="w-64 h-80 md:w-96 md:h-[500px] bg-[var(--surface2)] shrink-0 overflow-hidden relative rounded-[var(--radius)]">
                <SmartImage src={`/images/therapist-${i+1}.jpg`} alt={member.name} width={600} height={800} className="w-full h-full object-cover" />
              </div>
              <div className="text-center md:text-left flex-1">
                <h3 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "var(--font-display)" }}>{member.name}</h3>
                <p className="text-[var(--accent2)] uppercase tracking-[0.2em] mb-6">{member.role}</p>
                <p className="text-lg md:text-xl font-light leading-relaxed max-w-lg text-[var(--inverse-fg)]">{member.bio}</p>
              </div>
            </div>
          ))}
        </HorizontalScrollSection>
      </Section>

      {/* ─── Masonry Gallery ───────────────────────────────── */}
      <Section surface="base" id="gallery" className="py-24 px-6 relative z-[var(--z-content)]">
        <div className="max-w-6xl mx-auto">
          <SplitTextReveal text="Gallery" tag="h2" className="text-4xl md:text-6xl font-light mb-16 text-center" style={{ fontFamily: "var(--font-display)" }} />
          
          <Stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px] cursor-[url('/images/cursor-view.svg'),_pointer]">
            {['hero-spa-interior.jpg', 'hair-balayage.jpg', 'nails-macro.jpg', 'lashes-macro.jpg', 'gallery-1.jpg', 'gallery-2.jpg', 'gallery-3.jpg', 'products-shelf.jpg'].map((img, i) => (
              <div 
                key={i} 
                className={`relative overflow-hidden group bg-[var(--surface)] rounded-[var(--radius)]
                  ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}
                  ${i === 3 ? "md:col-span-2 md:row-span-1" : ""}
                  ${i === 5 ? "md:row-span-2" : ""}
                `}
              >
                <SmartImage src={`/images/${img}`} alt={`Gallery image ${i}`} width={800} height={800} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--scrim)] via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
              </div>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* ─── Pinned Before/After ───────────────────────────── */}
      <Section surface="raised" className="py-24 px-6 relative z-[var(--z-content)] flex flex-col items-center">
        <div className="max-w-4xl w-full mx-auto">
          <SplitTextReveal text="Transformations" tag="h2" className="text-4xl md:text-6xl font-light mb-16 text-center" style={{ fontFamily: "var(--font-display)" }} />
          
          <Reveal>
            <BeforeAfterSlider 
              before={
                <div className="w-full h-full relative">
                  <SmartImage src="/images/facial-photo.jpg" alt="Before facial" width={1000} height={800} className="w-full h-full object-cover filter saturate-[.6] contrast-[1.15]" />
                  <div className="absolute inset-0 scrim-bottom flex items-end p-8">
                    <span className="text-2xl font-light uppercase tracking-widest text-[var(--inverse-fg)]">Before</span>
                  </div>
                </div>
              }
              after={
                <div className="w-full h-full relative">
                  <SmartImage src="/images/facial-photo.jpg" alt="After facial" width={1000} height={800} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 scrim-bottom flex items-end p-8">
                    <span className="text-2xl font-light uppercase tracking-widest text-[var(--inverse-fg)]">After</span>
                  </div>
                </div>
              }
              className="rounded-[var(--radius)] shadow-2xl border border-[var(--border)]"
            />
            <p className="mt-4 text-center text-sm font-light uppercase tracking-widest text-[var(--fg-muted)]">Demo imagery</p>
          </Reveal>
        </div>
      </Section>

      {/* ─── Testimonials ──────────────────────────────────── */}
      <Section surface="base" className="py-32 px-6 relative z-[var(--z-content)]" data-surface="base">
        <div className="max-w-4xl mx-auto text-center">
          <SplitTextReveal text="Client Experiences" tag="h2" className="text-4xl md:text-6xl font-light mb-20" style={{ fontFamily: "var(--font-display)" }} />

          <Stagger className="flex flex-col gap-24">
            {config.testimonials.map((t: any) => (
              <Reveal key={t.name}>
                <blockquote className="text-2xl md:text-4xl italic leading-relaxed text-[var(--fg)]" style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <p className="mt-8 text-sm uppercase tracking-[0.2em] text-[var(--fg-muted)]">— {t.name}, {t.neighborhood}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.1em] text-[var(--accent)]">{t.service}</p>
              </Reveal>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* ─── Booking Widget ────────────────────────────────── */}
      <Section surface="inverse" className="py-32 px-6 relative z-[var(--z-content)]" data-surface="inverse">
        <div className="max-w-4xl mx-auto">
          <SplitTextReveal text="Secure Your Time" tag="h2" className="text-4xl md:text-6xl font-light mb-16 text-center" style={{ fontFamily: "var(--font-display)" }} />
          <Reveal>
             <BookingWidget />
          </Reveal>
        </div>
      </Section>
      
      {/* ─── Gift Card CTA ─────────────────────────────────── */}
      <Section surface="inverse" className="py-16 px-6 text-center relative z-[var(--z-content)]" data-surface="inverse">
        <Reveal>
          <h3 className="text-3xl md:text-5xl font-light mb-6" style={{ fontFamily: "var(--font-display)" }}>Give the Gift of Radiance</h3>
          <p className="mb-8 max-w-lg mx-auto font-light text-[var(--fg-muted)]">Luxury gift cards available for all services.</p>
          <MagneticLink 
            href="#"
            className="bg-[var(--bg)] text-[var(--fg)] uppercase tracking-widest text-sm hover:brightness-110 transition-all border border-[var(--border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--fg)]"
          >
            Purchase Now
          </MagneticLink>
        </Reveal>
      </Section>
      </main>

      {/* ─── Footer ────────────────────────────────────────── */}
      <div className="relative z-[var(--z-content)] border-t border-[var(--border)]" data-surface="base">
        <Footer
          brand={config.brand.name}
          links={[
            { label: "Instagram", href: "#" },
            { label: "Book Now", href: config.extra?.bookingUrl as string || "#" },
            { label: "Privacy Policy", href: "#" },
          ]}
        />
      </div>
    </>
  );
}

function ServiceCard({ service }: { service: any }) {
  const addons = service.title.includes("Balayage") ? ["Gloss", "Olaplex"] 
               : service.title.includes("Facial") ? ["LED Therapy", "Dermaplaning"] 
               : service.title.includes("Cut") ? ["Scalp Massage"] : [];

  return (
    <div className="p-8 border-b border-[var(--border)] hover:bg-[var(--surface-2)] transition-colors duration-500 bg-[var(--surface)] relative overflow-hidden group" data-surface="raised">
      <div className="flex justify-between items-start mb-4 relative z-[var(--z-content)]">
        <h3 className="text-2xl font-light text-[var(--fg)]" style={{ fontFamily: "var(--font-display)" }}>
          {service.title}
        </h3>
        <span className="text-[var(--fg-muted)] font-semibold whitespace-nowrap ml-4">{service.price}</span>
      </div>
      <p className="text-[var(--fg-muted)] leading-relaxed font-light relative z-[var(--z-content)]">{service.description}</p>
      
      {addons.length > 0 && (
        <div className="mt-4 flex gap-2 flex-wrap relative z-[var(--z-content)]">
          {addons.map((addon: string) => (
            <span key={addon} className="text-xs uppercase tracking-wider px-2 py-1 border border-[var(--border)] rounded text-[var(--fg-muted)]">
              + {addon}
            </span>
          ))}
        </div>
      )}

      {/* 1px plum rule interaction */}
      <div className="absolute bottom-0 left-0 h-[1px] bg-[var(--accent)] w-0 group-hover:w-full transition-all duration-700 ease-out" />
    </div>
  );
}
