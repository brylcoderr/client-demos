import {
  StickyNav,
  SplitTextReveal,
  Reveal,
  Stagger,
  Marquee,
  Counter,
  Accordion,
  ContactForm,
  MagneticButton,
  Footer,
} from "@client-demos/core";
import { config } from "../demo.config";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  return (
    <>
      <StickyNav logo={config.brand.name} links={navLinks} />

      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <Reveal>
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--muted)] mb-6">
            {config.brand.address}
          </p>
        </Reveal>

        <SplitTextReveal
          text={config.brand.name}
          tag="h1"
          className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tight"
        />

        <Reveal delay={0.3}>
          <p className="mt-6 text-lg md:text-xl text-[var(--muted)] max-w-xl">
            {config.brand.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.5}>
          <MagneticButton className="mt-10">Get Started</MagneticButton>
        </Reveal>
      </section>

      {/* ─── Marquee ───────────────────────────────────────── */}
      <Marquee items={config.services.map((s) => s.title)} />

      {/* ─── Stats ─────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <Stagger className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {config.stats.map((stat) => (
            <Counter
              key={stat.label}
              target={parseInt(stat.value.replace(/\D/g, ""), 10) || 0}
              suffix={stat.value.replace(/[\d]/g, "")}
              label={stat.label}
            />
          ))}
        </Stagger>
      </section>

      {/* ─── Services ──────────────────────────────────────── */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SplitTextReveal text="Our Services" tag="h2" className="text-4xl md:text-6xl font-bold mb-16" />

          <Stagger className="grid md:grid-cols-2 gap-8">
            {config.services.map((service) => (
              <div
                key={service.title}
                className="p-8 border border-[var(--muted)]/20 hover:border-[var(--accent)]/50 transition-colors duration-500"
                style={{ borderRadius: "var(--radius)" }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl" style={{ fontFamily: "var(--font-display)" }}>
                    {service.title}
                  </h3>
                  <span className="text-[var(--accent)] font-semibold">{service.price}</span>
                </div>
                <p className="text-[var(--muted)] leading-relaxed">{service.description}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── Testimonials ──────────────────────────────────── */}
      <section id="about" className="py-24 px-6 bg-[var(--accent)]/5">
        <div className="max-w-4xl mx-auto text-center">
          <SplitTextReveal text="What Clients Say" tag="h2" className="text-4xl md:text-6xl font-bold mb-16" />

          <Stagger className="flex flex-col gap-12">
            {config.testimonials.map((t) => (
              <Reveal key={t.name}>
                <blockquote className="text-xl md:text-2xl italic text-[var(--fg)] leading-relaxed" style={{ fontFamily: "var(--font-display)" }}>
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <p className="mt-4 text-sm uppercase tracking-[0.2em] text-[var(--muted)]">— {t.name}</p>
              </Reveal>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────── */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <SplitTextReveal text="Frequently Asked" tag="h2" className="text-4xl md:text-6xl font-bold mb-16 text-center" />
          <Accordion items={config.faqs.map((f) => ({ title: f.question, content: f.answer }))} />
        </div>
      </section>

      {/* ─── Contact ───────────────────────────────────────── */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-xl mx-auto text-center">
          <SplitTextReveal text="Get In Touch" tag="h2" className="text-4xl md:text-6xl font-bold mb-4" />
          <Reveal>
            <p className="text-[var(--muted)] mb-12">{config.brand.phone} · {config.brand.email}</p>
          </Reveal>
          <ContactForm />
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────── */}
      <Footer
        brand={config.brand.name}
        links={[
          { label: "Instagram", href: "#" },
          { label: "LinkedIn", href: "#" },
          { label: "Privacy Policy", href: "#" },
        ]}
      />
    </>
  );
}
