import type { DemoConfig } from "@client-demos/core";

/**
 * demo.config.ts
 *
 * The single file you edit to rebrand the entire demo.
 * Change brand details, colors, services, and content —
 * the rest of the site adapts automatically.
 */

export const demoConfig: DemoConfig = {
  brand: {
    name: "Acme Studio",
    tagline: "We craft digital experiences that move people",
    phone: "(555) 123-4567",
    email: "hello@acme.studio",
    address: "123 Creative Ave, New York, NY 10001",
    hours: ["Mon – Fri: 9 AM – 6 PM", "Sat: 10 AM – 4 PM", "Sun: Closed"],
  },

  theme: {
    bg: "#0a0a0a",
    fg: "#f5f5f5",
    muted: "#777",
    accent: "#c9a96e",
    accent2: "#e8d5b0",
    radius: "0px",
    fontDisplay: "'Cormorant Garamond', serif",
    fontBody: "'DM Sans', sans-serif",
  },

  services: [
    { title: "Brand Strategy", description: "We define your market position and voice.", price: "$5,000" },
    { title: "Web Design", description: "Bespoke, conversion-focused websites.", price: "$8,000" },
    { title: "Motion Design", description: "Scroll-driven animations and 3D visuals.", price: "$4,000" },
    { title: "SEO & Growth", description: "Organic traffic strategies that compound.", price: "$2,500/mo" },
  ],

  team: [
    { name: "Alex Rivera", role: "Creative Director", bio: "15 years of award-winning design." },
    { name: "Sam Chen", role: "Lead Developer", bio: "Full-stack engineer and WebGL enthusiast." },
  ],

  testimonials: [
    { name: "Jordan Lee", text: "They completely transformed our online presence.", rating: 5 },
    { name: "Taylor Smith", text: "The attention to detail is unmatched.", rating: 5 },
    { name: "Morgan Davis", text: "Our conversion rate doubled in 3 months.", rating: 5 },
  ],

  faqs: [
    { question: "How long does a project take?", answer: "Most projects are delivered within 6–8 weeks from kickoff." },
    { question: "Do you offer ongoing support?", answer: "Yes — we offer monthly retainer packages for maintenance and growth." },
    { question: "What's included in the price?", answer: "Design, development, animations, SEO setup, and 30 days of post-launch support." },
  ],

  stats: [
    { label: "Projects Delivered", value: "250+" },
    { label: "Happy Clients", value: "120+" },
    { label: "Awards Won", value: "18" },
    { label: "Years in Business", value: "10" },
  ],
};
