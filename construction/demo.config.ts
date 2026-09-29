import type { DemoConfig } from "@client-demos/core";

export const demoFeatures = {
  heroVariant: "house" // "house" | "trees"
};

export const demoConfig: DemoConfig = {
  brand: {
    name: "SUMMIT RIDGE",
    tagline: "Built to Outlast.",
    phone: "(555) 333-BUILT",
    email: "quotes@summitridge.com",
    address: "700 Industrial Pkwy, Denver, CO 80204",
    hours: ["Mon - Fri: 7 AM - 5 PM"],
  },

  theme: {
    bg: "#1C1C1E", // charcoal
    fg: "#E5E5E5", // concrete grey
    muted: "#888888",
    accent: "#FFC400", // safety yellow
    accent2: "#111111", // darker charcoal
    radius: "0px",
    fontDisplay: "var(--font-display)",
    fontBody: "var(--font-body)",
  },

  services: [
    { title: "Custom Framing", description: "Precision structural framing for residential and commercial builds. Engineered to exacting specifications.", price: "" },
    { title: "Concrete Foundation", description: "Pouring rock-solid foundations that stand the test of time, weather, and weight.", price: "" },
    { title: "Commercial Build-Outs", description: "End-to-end commercial interior transformations, delivered on time and on budget.", price: "" },
    { title: "Roofing Systems", description: "Durable, high-performance roofing solutions designed for severe weather resistance.", price: "" }
  ],

  team: [
    { name: "John 'Mac' Macready", role: "Site Superintendent", bio: "25 years in heavy construction. Mac ensures every site operates with military precision." },
    { name: "Sarah Jenkins", role: "Lead Project Manager", bio: "Engineering background with a ruthless dedication to project timelines and safety protocols." },
    { name: "David Vance", role: "Master Carpenter", bio: "The final word on structural integrity and framing precision." }
  ],

  testimonials: [
    { name: "Robert T., Architect", text: "Summit Ridge doesn't cut corners. They are the only contractor I trust for my high-end modern builds.", rating: 5 },
    { name: "Amanda G.", text: "Our commercial build-out was finished two weeks ahead of schedule. Unheard of in this industry.", rating: 5 },
    { name: "Thomas L.", text: "The crew was professional, the site was clean, and the final structural work passed inspection first time, every time.", rating: 5 },
  ],

  faqs: [
    { question: "Are you licensed and insured?", answer: "Fully licensed, bonded, and insured up to $10M for commercial and residential projects." },
    { question: "Do you handle the permitting process?", answer: "Yes, our project managers handle all municipal permitting and zoning approvals." },
    { question: "What is your service area?", answer: "We serve the greater Denver metro area and surrounding counties within a 50-mile radius." },
  ],

  stats: [
    { label: "Projects Completed", value: "850+" },
    { label: "Years in Business", value: "20" },
    { label: "Safety Record", value: "100%" },
    { label: "Tons of Steel Placed", value: "5k+" },
  ],
};
