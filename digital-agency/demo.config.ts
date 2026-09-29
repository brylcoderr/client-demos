import type { DemoConfig } from "@client-demos/core";

export interface DigitalAgencyConfig extends DemoConfig {
  caseStudies: Array<{
    id: string;
    client: string;
    title: string;
    description: string;
    metrics: Array<{ label: string; value: string }>;
    image: string;
    tags: string[];
  }>;
  process: Array<{
    step: string;
    title: string;
    description: string;
  }>;
  techStack: string[];
  pricing: Array<{
    tier: string;
    price: string;
    description: string;
    features: string[];
    highlight?: boolean;
  }>;
}

export const config: DigitalAgencyConfig = {
  brand: {
    name: "Pulse Collective",
    tagline: "We build digital experiences that defy gravity.",
    phone: "hello@pulse.co", // Using phone field for email or just use email
    email: "hello@pulse.co",
    address: "Global / Remote",
    hours: ["24/7 Digital Operations"],
  },
  theme: {
    bg: "#07070B",        // Near-black
    fg: "#FFFFFF",        // White
    muted: "#A1A1AA",     // Muted gray
    accent: "#7C3AED",    // Violet
    accent2: "#22D3EE",   // Cyan
    radius: "24px",
    fontDisplay: "'Space Grotesk', sans-serif",
    fontBody: "'Space Grotesk', sans-serif",
  },
  services: [
    { title: "Digital Products", description: "End-to-end strategy, design, and engineering.", price: "Starts at $50k" },
    { title: "Web3 & Blockchain", description: "Smart contracts and decentralized apps.", price: "Starts at $75k" },
    { title: "Immersive 3D/AR", description: "WebGL experiences and interactive storytelling.", price: "Custom" },
    { title: "Brand Identity", description: "Visual systems for forward-thinking companies.", price: "Starts at $20k" },
  ],
  caseStudies: [
    {
      id: "1",
      client: "Neon Protocol",
      title: "The Future of DeFi",
      description: "A complete overhaul of the Neon Protocol interface, resulting in unprecedented user growth.",
      metrics: [
        { label: "TVL Increase", value: "300%" },
        { label: "User Retention", value: "+45%" },
      ],
      image: "/placeholder-neon.jpg",
      tags: ["Web3", "UI/UX", "Frontend"],
    },
    {
      id: "2",
      client: "Aura Skincare",
      title: "Interactive E-Commerce",
      description: "A WebGL-powered shopping experience that lets users interact with products in 3D.",
      metrics: [
        { label: "Conversion Rate", value: "+80%" },
        { label: "Session Time", value: "4m 20s" },
      ],
      image: "/placeholder-aura.jpg",
      tags: ["WebGL", "E-Commerce", "3D"],
    },
    {
      id: "3",
      client: "Velocity AI",
      title: "Visualizing Intelligence",
      description: "Branding and dashboard design for a next-gen machine learning platform.",
      metrics: [
        { label: "ARR Growth", value: "2.5x" },
        { label: "Onboarding Time", value: "-60%" },
      ],
      image: "/placeholder-velocity.jpg",
      tags: ["SaaS", "Dashboard", "Branding"],
    }
  ],
  process: [
    { step: "01", title: "Discovery", description: "Deep dive into your business goals, users, and technical constraints." },
    { step: "02", title: "Strategy & UX", description: "Mapping out the user journey and architectural blueprints." },
    { step: "03", title: "Visual Design", description: "Crafting the bold, unmistakable identity of your digital product." },
    { step: "04", title: "Engineering", description: "Bringing the vision to life with robust, scalable code." },
  ],
  techStack: [
    "Next.js", "React", "WebGL", "Three.js", "GSAP", "Framer Motion", "TailwindCSS", "Solidity", "Node.js", "GraphQL"
  ],
  pricing: [
    {
      tier: "Sprint",
      price: "$20k / mo",
      description: "For rapid prototyping and MVP launches.",
      features: ["1 Dedicated Designer", "1 Senior Engineer", "Weekly Sprints", "Slack Connect"],
    },
    {
      tier: "Scale",
      price: "$45k / mo",
      description: "Full product teams for fast-growing startups.",
      features: ["Product Manager", "2 Designers", "3 Engineers", "QA & DevOps", "Priority Support"],
      highlight: true,
    },
    {
      tier: "Enterprise",
      price: "Custom",
      description: "Bespoke solutions for global brands.",
      features: ["Unlimited Capacity", "Dedicated Directors", "On-site Workshops", "SLA Guarantees"],
    }
  ],
  team: [],
  testimonials: [
    { name: "CEO, Neon Protocol", text: "Pulse didn't just redesign our app; they redefined our entire brand trajectory.", rating: 5 },
    { name: "Founder, Velocity AI", text: "The most talented group of creative technologists we've ever worked with.", rating: 5 },
  ],
  faqs: [],
  stats: [],
};
