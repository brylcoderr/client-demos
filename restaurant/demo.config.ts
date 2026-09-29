import type { DemoConfig } from "@client-demos/core";

export type CuisineType = "mediterranean" | "coffee" | "icecream" | "diner";

// CHANGE THIS VALUE TO SWAP THE ENTIRE THEME AND 3D HERO
export const cuisine: CuisineType = "mediterranean";

const palettes = {
  mediterranean: {
    bg: "#FBF3E4",
    fg: "#2B1B12",
    muted: "#A09489",
    accent: "#C65D3B",
    accent2: "#6B7A3A",
  },
  coffee: {
    bg: "#F0E9E1",
    fg: "#3B2C24",
    muted: "#B8A392",
    accent: "#8C6239",
    accent2: "#29211C",
  },
  icecream: {
    bg: "#FDF5F7",
    fg: "#3D2645",
    muted: "#C4A6B2",
    accent: "#FF9EB5",
    accent2: "#84DCC6",
  },
  diner: {
    bg: "#FDFBF7",
    fg: "#1A1A1A",
    muted: "#999999",
    accent: "#E63946",
    accent2: "#457B9D",
  }
};

const brandDetails = {
  mediterranean: { name: "OLIVE & EMBER", tagline: "Fire-roasted Mediterranean flavors." },
  coffee: { name: "THE DAILY GRIND", tagline: "Artisan espresso and morning rituals." },
  icecream: { name: "SCOOPS", tagline: "Hand-churned joy in every cone." },
  diner: { name: "ROUTE 66 DINER", tagline: "Classic Americana, served 24/7." }
};

export const demoConfig: DemoConfig = {
  brand: {
    name: brandDetails[cuisine].name,
    tagline: brandDetails[cuisine].tagline,
    phone: "(555) 867-5309",
    email: "reservations@oliveandember.com",
    address: "800 Culinary Way, Portland, OR 97209",
    hours: ["Tue - Sun: 5 PM - 11 PM", "Mon: Closed"],
  },

  theme: {
    ...palettes[cuisine],
    radius: "8px",
    fontDisplay: "var(--font-display)",
    fontBody: "var(--font-body)",
  },

  services: [
    { title: "Wood-Fired Plates", description: "Seasonal ingredients kissed by open flames.", price: "" },
    { title: "Curated Pairings", description: "A robust selection of regional wines and craft cocktails.", price: "" },
    { title: "Private Dining", description: "Intimate spaces for celebrations and corporate gatherings.", price: "" },
    { title: "Chef's Tasting", description: "An immersive 7-course journey through our seasonal menu.", price: "" }
  ],

  team: [
    { name: "Marco Rossi", role: "Executive Chef", bio: "Bringing generational recipes and a passion for fire-roasting from his hometown in Italy." },
    { name: "Lena Vance", role: "Sommelier", bio: "Curating a dynamic and surprising wine list that perfectly balances our aggressive flavors." },
  ],

  testimonials: [
    { name: "J. Peterson", text: "The wood-fired octopus is a revelation. Best dining experience I've had in Portland this year.", rating: 5 },
    { name: "S. Martinez", text: "Impeccable service, warm atmosphere, and flavors that completely transport you.", rating: 5 },
    { name: "A. Lee", text: "The chef's tasting menu is a must. Every dish was thoughtful and deeply satisfying.", rating: 5 },
  ],

  faqs: [
    { question: "Do you accept walk-ins?", answer: "We reserve a portion of our bar and patio seating for walk-ins, but reservations are highly recommended for the main dining room." },
    { question: "Can you accommodate dietary restrictions?", answer: "Yes, our culinary team is happy to accommodate most allergies and dietary preferences with advance notice." },
    { question: "Is there a dress code?", answer: "Smart casual. We want you to be comfortable while enjoying a premium dining experience." },
  ],

  stats: [
    { label: "Wines in Cellar", value: "350+" },
    { label: "Wood Fired Ovens", value: "2" },
    { label: "Years Open", value: "5" },
    { label: "Michelin Stars", value: "1" },
  ],
};
