import type { DemoConfig } from "@client-demos/core";

export const demoConfig: DemoConfig = {
  brand: {
    name: "Maison Lumière",
    tagline: "Appointment-only luxury atelier",
    phone: "(212) 555-8900",
    email: "concierge@maisonlumiere.com",
    address: "752 5th Avenue, New York, NY 10019",
    hours: ["Mon - Fri: 10 AM - 8 PM", "Sat: 9 AM - 6 PM", "Sun: Closed"],
  },

  theme: {
    bg: "#FFFBF8",
    fg: "#2A1626",
    muted: "#6B4F63",
    accent: "#4A1942",
    accent2: "#B98A5E",
    surface: "#F6E4E1",
    surface2: "#E8D5B5",
    radius: "999px",
    fontDisplay: "'Cormorant Garamond', serif",
    fontBody: "'DM Sans', sans-serif",
  },

  services: [
    { title: "Cut and Finish", description: "Precision cutting and signature finish", price: "$85 to $165" },
    { title: "Gel Manicure", description: "Long-lasting gel with immaculate cuticle care", price: "$55" },
    { title: "Russian Manicure", description: "Advanced dry technique for flawless results", price: "$75" },
    { title: "Classic Lash Set", description: "Natural enhancement for everyday elegance", price: "$140" },
    { title: "Volume Lash Set", description: "Customized multi-lash fans for a dramatic look", price: "$185" },
    { title: "Hydrafacial", description: "Deeply hydrating oxygen therapy", price: "$195" },
    { title: "Brow Lamination", description: "Restorative sculpting for perfectly set brows", price: "$95" },
    { title: "Laser Hair Removal", description: "Painless, permanent reduction", price: "$120/session" }
  ],

  team: [
    { name: "Elise Fontaine", role: "Creative Director, hair", bio: "Editorial styling and visionary direction." },
    { name: "Marcus Reid", role: "Cutting", bio: "Precision architect specializing in modern shapes." },
    { name: "Sofia Alvarez", role: "Lash Artist", bio: "Detail-obsessed artisan delivering flawless results." },
    { name: "Naomi Park", role: "Nails and Skin", bio: "Skin visionary specializing in transformative therapies." }
  ],

  testimonials: [
    { name: "Eleanor", text: "The most serene, beautiful salon I've ever visited. The results are unmatched.", rating: 5, neighborhood: "SoHo", service: "Cut and Finish" },
    { name: "Sophia", text: "Marcus's technique is pure magic. I feel like a new woman.", rating: 5, neighborhood: "Tribeca", service: "Cut and Finish" },
    { name: "Vivienne", text: "An absolute oasis in the city. The Hydrafacial left me glowing for weeks.", rating: 5, neighborhood: "Upper East Side", service: "Hydrafacial" },
    { name: "Amelia", text: "Sofia gave me the most flawless Volume Lash set.", rating: 5, neighborhood: "West Village", service: "Volume Lash Set" },
    { name: "Grace", text: "Naomi's Russian Manicure is unparalleled. Absolute perfection.", rating: 5, neighborhood: "Chelsea", service: "Russian Manicure" },
    { name: "Isabella", text: "Best brow lamination in the city. I'm obsessed.", rating: 5, neighborhood: "Midtown", service: "Brow Lamination" }
  ] as any, // bypassing type since DemoConfig doesn't natively have neighborhood/service in base types yet, though extra is allowed.

  faqs: [
    { question: "What is your cancellation policy?", answer: "We require 24 hours notice for any cancellations or rescheduling to avoid a 50% fee." },
    { question: "Are deposits required?", answer: "Yes, a 20% deposit is required to secure your appointment." },
    { question: "Do you require patch tests?", answer: "Patch tests are required for all new lash clients 48 hours prior to service." },
    { question: "Do you offer gift cards?", answer: "Yes, luxury gift cards are available in-studio and online." }
  ],

  stats: [
    { label: "Luxury Treatments", value: "10k+" },
    { label: "Master Artists", value: "4" },
    { label: "Years of Excellence", value: "5" },
    { label: "5-Star Reviews", value: "500+" }
  ],

  extra: {
    venue: "hair",
    accentTheme: "plum",
    bookingUrl: "/booking"
  }
};
