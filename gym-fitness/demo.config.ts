import type { DemoConfig } from "@client-demos/core";

export const demoConfig: DemoConfig = {
  brand: {
    name: "FORGE ATHLETIC",
    tagline: "Break your limits. Forge your legacy.",
    phone: "(555) 999-IRON",
    email: "join@forgeathletic.com",
    address: "100 Powerhouse Blvd, Chicago, IL 60607",
    hours: ["Mon - Fri: 5 AM - 11 PM", "Sat - Sun: 6 AM - 8 PM"],
  },

  theme: {
    bg: "#0A0A0A", // near black
    fg: "#FFFFFF", // white
    muted: "#555555", // dark gray
    accent: "#C6FF00", // neon lime
    accent2: "#1A1A1A", // slightly lighter black for contrast
    radius: "0px", // aggressive, sharp edges
    fontDisplay: "var(--font-display)",
    fontBody: "var(--font-body)",
  },

  services: [
    { title: "Metcon X", description: "High-intensity metabolic conditioning. Build endurance and torch calories in this 45-minute crucible.", price: "$35 / drop-in" },
    { title: "Strength Lab", description: "Periodized barbell training focusing on the big three: squat, bench, deadlift.", price: "$40 / drop-in" },
    { title: "Endurance", description: "Long-domain cardio intervals using ergs, runners, and bodyweight movements.", price: "$30 / drop-in" },
    { title: "Recovery", description: "Active recovery protocols, mobility work, and cold plunge access.", price: "$25 / drop-in" }
  ],

  team: [
    { name: "Jax 'The Anvil' Mercer", role: "Head Coach", bio: "Former elite powerlifter. Specializes in maximizing absolute strength and technical proficiency." },
    { name: "Sarah Connor", role: "Endurance Specialist", bio: "Ultra-marathoner and conditioning expert. She will find your breaking point and push you past it." },
    { name: "Marcus Thorne", role: "Mobility Coach", bio: "Movement specialist dedicated to bulletproofing joints and accelerating recovery." }
  ],

  testimonials: [
    { name: "David K.", text: "FORGE completely transformed my approach to fitness. The community is relentless and supportive.", rating: 5 },
    { name: "Elena R.", text: "The coaching in the Strength Lab is world-class. I've added 50lbs to my deadlift in 12 weeks.", rating: 5 },
    { name: "Mike T.", text: "Intense, gritty, and exactly what I needed. Metcon X is no joke.", rating: 5 },
  ],

  faqs: [
    { question: "Is this for beginners?", answer: "Yes. Every movement scales. We meet you where you are and push you forward." },
    { question: "Do you offer open gym access?", answer: "Open gym is available to Unlimited tier members between scheduled classes." },
    { question: "What is the cancellation policy?", answer: "Memberships require a 30-day notice for cancellation." },
  ],

  stats: [
    { label: "Pounds Lifted", value: "1M+" },
    { label: "Active Members", value: "850" },
    { label: "Expert Coaches", value: "12" },
    { label: "Sq Ft Facility", value: "15k" },
  ],
};
