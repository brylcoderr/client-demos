import type { DemoConfig } from "@client-demos/core";

export const config: DemoConfig = {
  brand: {
    name: "Maison Lumière",
    tagline: "Elevating your natural essence through artistry and grace.",
    phone: "(212) 555-8900",
    email: "concierge@maisonlumiere.com",
    address: "752 5th Avenue, New York, NY 10019",
    hours: ["Mon - Fri: 10 AM - 8 PM", "Sat: 9 AM - 6 PM", "Sun: Closed"],
  },

  theme: {
    bg: "#F6E4E1", // blush
    fg: "#4A1942", // deep plum
    muted: "#8c6b84",
    accent: "#E8D5B5", // champagne
    accent2: "#F6E4E1",
    radius: "4px",
    fontDisplay: "var(--font-display)",
    fontBody: "var(--font-body)",
  },

  services: [
    { title: "Signature Blowout", description: "A luxurious wash, relaxing scalp massage, and lasting blowout.", price: "$85" },
    { title: "Balayage & Gloss", description: "Hand-painted highlights and customized toning for radiant dimension.", price: "$250+" },
    { title: "Classic Manicure", description: "Immaculate cuticle care and flawless polish application.", price: "$45" },
    { title: "Volume Lash Extensions", description: "Customized multi-lash fans for a dramatic, editorial look.", price: "$180" },
    { title: "Lumière Facial", description: "Deeply hydrating oxygen therapy and restorative sculpting massage.", price: "$210" }
  ],

  team: [
    { name: "Juliette Roux", role: "Master Stylist", bio: "Parisian-trained with an eye for effortless elegance." },
    { name: "Chloe Vance", role: "Aesthetician", bio: "Skin visionary specializing in transformative therapies." },
    { name: "Maya Kim", role: "Lash & Nail Artist", bio: "Detail-obsessed artisan delivering flawless results." }
  ],

  testimonials: [
    { name: "Eleanor C.", text: "The most serene, beautiful salon I've ever visited. The results are unmatched.", rating: 5 },
    { name: "Sophia M.", text: "Juliette's balayage technique is pure magic. I feel like a new woman.", rating: 5 },
    { name: "Vivienne W.", text: "An absolute oasis in the city. The Lumière Facial left me glowing for weeks.", rating: 5 },
  ],

  faqs: [
    { question: "How far in advance should I book?", answer: "We recommend booking at least 2 weeks in advance to secure your preferred stylist." },
    { question: "What is your cancellation policy?", answer: "We require 24 hours notice for any cancellations or rescheduling to avoid a 50% fee." },
    { question: "Do you offer complimentary consultations?", answer: "Yes, all new color and extension services include a 15-minute consultation." },
  ],

  stats: [
    { label: "Luxury Treatments", value: "10k+" },
    { label: "Master Artists", value: "12" },
    { label: "Years of Excellence", value: "5" },
    { label: "5-Star Reviews", value: "500+" },
  ],
};
