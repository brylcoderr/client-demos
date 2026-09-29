import type { DemoConfig } from "@client-demos/core";

export const demoConfig: DemoConfig = {
  brand: {
    name: "Iron & Blade Barbers",
    tagline: "Heritage grooming for the modern gentleman.",
    phone: "(555) 019-8273",
    email: "info@ironandblade.com",
    address: "842 Industrial Way, Brooklyn, NY 11222",
    hours: ["Mon - Fri: 8 AM - 8 PM", "Sat: 9 AM - 6 PM", "Sun: 10 AM - 4 PM"],
  },

  theme: {
    bg: "#0B0B0B", // black
    fg: "#F2EDE4", // off-white
    muted: "#666666",
    accent: "#C9A227", // brass gold
    accent2: "#1A1A1A",
    radius: "0px",
    fontDisplay: "var(--font-display)",
    fontBody: "var(--font-body)",
  },

  services: [
    { title: "The Executive Cut", description: "Precision haircut tailored to your head shape, straight razor neck shave, and style.", price: "$65" },
    { title: "Hot Towel Shave", description: "Classic straight razor shave with pre-shave oils, hot towels, and soothing aftershave.", price: "$55" },
    { title: "Beard Trim & Sculpt", description: "Detailed shaping, line-up, and conditioning treatment for your beard.", price: "$40" },
    { title: "The Works", description: "Haircut, hot towel shave, and a complimentary pour of local bourbon.", price: "$110" },
    { title: "Buzz Cut", description: "One length all over, clean taper on the neck, straight razor finish.", price: "$35" }
  ],

  team: [
    { name: "Marcus 'The Razor' Vance", role: "Master Barber", bio: "15 years behind the chair. Specializes in classic pompadours and fades." },
    { name: "Elijah Stone", role: "Senior Barber", bio: "Former traditional tattoo artist. Detail obsessed, master of the straight razor." },
    { name: "Leo Rossi", role: "Barber", bio: "Brings modern texture and sharp line-ups to heritage styles." }
  ],

  testimonials: [
    { name: "James D.", text: "Best cut I've had in years. Marcus pays attention to every single detail.", rating: 5 },
    { name: "Arthur T.", text: "The hot towel shave is a religious experience. Highly recommend The Works.", rating: 5 },
    { name: "Cole B.", text: "Great atmosphere, excellent bourbon, and a perfect fade. Found my new spot.", rating: 5 },
  ],

  faqs: [
    { question: "Do I need an appointment?", answer: "We highly recommend booking ahead, but we do accept walk-ins if there is an open chair." },
    { question: "What products do you use?", answer: "We use our own in-house line of pomades and oils, formulated specifically for our clients." },
    { question: "Can I bring my son?", answer: "Yes, we offer cuts for young gentlemen 10 and older." },
  ],

  stats: [
    { label: "Years Open", value: "12" },
    { label: "Cuts Done", value: "45k+" },
    { label: "5-Star Reviews", value: "1,200+" },
    { label: "Cold Beers Served", value: "20k+" },
  ],
};
