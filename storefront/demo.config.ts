import type { DemoConfig } from "@client-demos/core";

export type StoreType = "jewelry" | "pet" | "cards" | "fashion" | "general";

export const storeType: StoreType = "jewelry";

export interface StoreDemoConfig extends DemoConfig {
  storeType: StoreType;
  heroProduct: {
    name: string;
    description: string;
    price: string;
    features: string[];
  };
  collections: Array<{ name: string; image: string }>;
}

const configs: Record<StoreType, Omit<StoreDemoConfig, "storeType">> = {
  jewelry: {
    brand: {
      name: "Aurelia Jewelers",
      tagline: "Elegance carved in time.",
      phone: "(555) 777-8888",
      email: "concierge@aurelia.jewelers",
      address: "5th Avenue, New York, NY",
      hours: ["Mon - Sat: 10 AM - 7 PM", "Sun: Closed"],
    },
    theme: {
      bg: "#0A0A0A",
      fg: "#fcfaf5",
      muted: "#555555",
      accent: "#D4AF37",
      accent2: "#F3E5AB",
      radius: "0px",
      fontDisplay: "'Playfair Display', serif",
      fontBody: "'Inter', sans-serif",
    },
    heroProduct: {
      name: "The Aurelia Diamond",
      description: "A flawless cut that captures the light of a thousand stars.",
      price: "$12,500",
      features: ["VVS1 Clarity", "Conflict-Free", "18k White Gold Setting"],
    },
    collections: [
      { name: "Bridal", image: "/placeholder-bridal.jpg" },
      { name: "Fine Watches", image: "/placeholder-watch.jpg" },
      { name: "Everyday Elegance", image: "/placeholder-necklace.jpg" },
      { name: "High Jewelry", image: "/placeholder-high.jpg" },
    ],
    services: [
      { title: "Bespoke Design", description: "Work with our master artisans.", price: "Upon Request" },
      { title: "Jewelry Cleaning", description: "Complimentary for Aurelia pieces.", price: "$0" },
      { title: "Appraisals", description: "Certified valuation for insurance.", price: "$150" },
    ],
    team: [],
    testimonials: [
      { name: "Eleanor V.", text: "The most stunning engagement ring I could have imagined.", rating: 5 },
      { name: "James C.", text: "Impeccable service and breathtaking craftsmanship.", rating: 5 },
    ],
    faqs: [
      { question: "Do you offer international shipping?", answer: "Yes, fully insured via secure courier." },
      { question: "Are your diamonds ethically sourced?", answer: "100% of our diamonds are Kimberley Process certified." },
    ],
    stats: [
      { label: "Carats Delivered", value: "10k+" },
      { label: "Happy Couples", value: "5,000+" },
    ],
  },
  pet: {
    brand: {
      name: "Wag & Purr",
      tagline: "Joyful essentials for your furry friends.",
      phone: "(555) 111-2222",
      email: "hello@wagpurr.pet",
      address: "Sunnyville, CA",
      hours: ["Everyday: 8 AM - 8 PM"],
    },
    theme: {
      bg: "#FAFAFA",
      fg: "#111111",
      muted: "#888888",
      accent: "#FF9F1C",
      accent2: "#2EC4B6",
      radius: "16px",
      fontDisplay: "'Fredoka One', cursive",
      fontBody: "'Nunito', sans-serif",
    },
    heroProduct: {
      name: "The Ultimate Chew Toy",
      description: "Indestructible fun for the most aggressive chewers.",
      price: "$24.99",
      features: ["Non-toxic", "Bacon Scented", "Lifetime Warranty"],
    },
    collections: [
      { name: "Toys", image: "/placeholder-toys.jpg" },
      { name: "Treats", image: "/placeholder-treats.jpg" },
      { name: "Accessories", image: "/placeholder-accessories.jpg" },
    ],
    services: [], team: [], testimonials: [], faqs: [], stats: [],
  },
  cards: {
    brand: {
      name: "HoloVault",
      tagline: "Rare collectibles and holographic wonders.",
      phone: "(555) 999-0000",
      email: "support@holovault.tcg",
      address: "Tokyo, Japan",
      hours: ["Online 24/7"],
    },
    theme: {
      bg: "#050510",
      fg: "#E0E0FF",
      muted: "#4A4A6A",
      accent: "#B026FF",
      accent2: "#00F0FF",
      radius: "8px",
      fontDisplay: "'Orbitron', sans-serif",
      fontBody: "'Rajdhani', sans-serif",
    },
    heroProduct: {
      name: "Cosmic Dragon 1st Ed",
      description: "A pristine PSA 10 holographic legend.",
      price: "$4,500",
      features: ["Holographic Rare", "Mint Condition", "Verified Authentic"],
    },
    collections: [
      { name: "Booster Boxes", image: "/placeholder-booster.jpg" },
      { name: "Singles", image: "/placeholder-singles.jpg" },
      { name: "Sleeves", image: "/placeholder-sleeves.jpg" },
    ],
    services: [], team: [], testimonials: [], faqs: [], stats: [],
  },
  fashion: {
    brand: {
      name: "Elevate Streetwear",
      tagline: "Pushing boundaries in modern apparel.",
      phone: "(555) 333-4444",
      email: "info@elevate.style",
      address: "London, UK",
      hours: ["Mon - Sat: 11 AM - 8 PM"],
    },
    theme: {
      bg: "#FFFFFF",
      fg: "#000000",
      muted: "#999999",
      accent: "#FF003C",
      accent2: "#111111",
      radius: "4px",
      fontDisplay: "'Oswald', sans-serif",
      fontBody: "'Helvetica Neue', sans-serif",
    },
    heroProduct: {
      name: "Aero Glide Kicks",
      description: "Defy gravity with our latest ultra-light sneakers.",
      price: "$220",
      features: ["Flyknit Upper", "Cloud Foam Sole", "Reflective Accents"],
    },
    collections: [
      { name: "Footwear", image: "/placeholder-shoes.jpg" },
      { name: "Outerwear", image: "/placeholder-jackets.jpg" },
      { name: "Accessories", image: "/placeholder-caps.jpg" },
    ],
    services: [], team: [], testimonials: [], faqs: [], stats: [],
  },
  general: {
    brand: {
      name: "General Store",
      tagline: "Quality goods for everyday life.",
      phone: "(555) 555-5555",
      email: "hello@general.store",
      address: "Main St, USA",
      hours: ["Mon - Fri: 9 AM - 5 PM"],
    },
    theme: {
      bg: "#F4F4F4",
      fg: "#333333",
      muted: "#AAAAAA",
      accent: "#007BFF",
      accent2: "#6C757D",
      radius: "8px",
      fontDisplay: "'Georgia', serif",
      fontBody: "'Arial', sans-serif",
    },
    heroProduct: {
      name: "Premium Desk Mat",
      description: "Upgrade your workspace instantly.",
      price: "$35",
      features: ["Vegan Leather", "Water Resistant", "Anti-Slip Base"],
    },
    collections: [
      { name: "Home", image: "/placeholder-home.jpg" },
      { name: "Office", image: "/placeholder-office.jpg" },
      { name: "Tech", image: "/placeholder-tech.jpg" },
    ],
    services: [], team: [], testimonials: [], faqs: [], stats: [],
  }
};

export const config: StoreDemoConfig = {
  storeType,
  ...configs[storeType],
};
