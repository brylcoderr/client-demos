import type { DemoConfig } from "@client-demos/core";

export const demoConfig: DemoConfig = {
  brand: {
    name: "ATELIER NORD",
    tagline: "Architecture that breathes.",
    phone: "+47 22 55 88 00",
    email: "studio@ateliernord.com",
    address: "Storgata 15, 0155 Oslo, Norway",
    hours: ["Mon - Fri: 09:00 - 17:00"],
  },

  theme: {
    bg: "#FAFAFA", // white
    fg: "#1A1A1A", // dark for text
    muted: "#8A8A8A", // concrete grey
    accent: "#C4552D", // terracotta
    accent2: "#F0F0F0", // slight off-white for sections
    radius: "0px",
    fontDisplay: "var(--font-display)",
    fontBody: "var(--font-body)",
  },

  services: [
    { title: "Architecture", description: "Contextual and sustainable architectural design for public and private spaces. We build for the next century.", price: "" },
    { title: "Interior Design", description: "Spatial planning and material curation that harmonize the exterior environment with the internal lived experience.", price: "" },
    { title: "Urban Planning", description: "Strategic masterplanning and landscape architecture to foster vibrant, resilient communities.", price: "" },
    { title: "Bespoke Furniture", description: "Custom-designed objects and furnishings crafted in collaboration with local artisans.", price: "" }
  ],

  team: [
    { name: "Lars Vinter", role: "Principal Architect", bio: "Founder of Atelier Nord. Lars believes that architecture must fundamentally respect its natural context." },
    { name: "Elena Rostova", role: "Lead Interior Designer", bio: "With a background in fine arts, Elena brings an unparalleled sensitivity to texture, light, and material." },
    { name: "Henrik Dahl", role: "Urban Strategist", bio: "Specializing in sustainable urban ecosystems and large-scale public developments." }
  ],

  testimonials: [
    { name: "S. Berg, Director", text: "Atelier Nord completely reimagined our cultural center. The light, the flow, the respect for the landscape—it's breathtaking.", rating: 5 },
    { name: "M. Johansen", text: "Working with Lars and Elena was a revelation. Our home feels simultaneously grounded and weightless.", rating: 5 },
    { name: "K. Andersen", text: "They don't just design buildings; they craft environments that improve how people interact and live.", rating: 5 },
  ],

  faqs: [
    { question: "What is your design philosophy?", answer: "We practice critical regionalism—designing modern spaces that deeply respond to their geographical and cultural context." },
    { question: "Do you take on international projects?", answer: "Yes, we work globally, though our focus remains primarily on the Nordic and European regions." },
    { question: "How does the process start?", answer: "It begins with a dialogue and a site visit. Understanding the terrain and the client's vision is the foundation of our work." },
  ],

  stats: [
    { label: "Completed Projects", value: "112" },
    { label: "Design Awards", value: "24" },
    { label: "Active Countries", value: "8" },
    { label: "Studio Members", value: "45" },
  ],
};
