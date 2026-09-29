import type { DemoConfig } from "@client-demos/core";

export interface RealEstateDemoConfig extends DemoConfig {
  featuredListings: Array<{
    id: string;
    title: string;
    price: string;
    beds: number;
    baths: number;
    sqft: string;
    image: string;
    tag?: string;
  }>;
  buyingJourney: Array<{
    step: string;
    title: string;
    description: string;
  }>;
  neighborhoods: Array<{
    name: string;
    description: string;
    image: string;
  }>;
  searchOptions: {
    locations: string[];
    types: string[];
  };
}

export const config: RealEstateDemoConfig = {
  brand: {
    name: "Northgate Realty",
    tagline: "Unlocking extraordinary living.",
    phone: "(555) 444-3333",
    email: "contact@northgaterealty.com",
    address: "700 Prestigious Blvd, Metro City",
    hours: ["Mon - Sat: 9 AM - 6 PM", "Sun: By Appointment"],
  },
  theme: {
    bg: "#FBF8F3",        // Warm white
    fg: "#0F3B2E",        // Deep green
    muted: "#667B73",     // Muted green-grey
    accent: "#B8935A",    // Brass accent
    accent2: "#0A281F",   // Darker green
    radius: "0px",        // Sharp edges for a refined look
    fontDisplay: "'Playfair Display', serif",
    fontBody: "'Plus Jakarta Sans', sans-serif",
  },
  searchOptions: {
    locations: ["Downtown", "Uptown", "Westside", "Suburbs", "Waterfront"],
    types: ["Single Family", "Condo", "Townhouse", "Penthouse"],
  },
  featuredListings: [
    {
      id: "1",
      title: "1422 Sycamore Lane",
      price: "$2,450,000",
      beds: 4,
      baths: 3.5,
      sqft: "3,200",
      image: "/placeholder-house1.jpg",
      tag: "Just Listed"
    },
    {
      id: "2",
      title: "The Penthouse at Riverwalk",
      price: "$5,100,000",
      beds: 3,
      baths: 4,
      sqft: "4,500",
      image: "/placeholder-house2.jpg",
      tag: "Open House"
    },
    {
      id: "3",
      title: "890 Historic Drive",
      price: "$1,295,000",
      beds: 3,
      baths: 2,
      sqft: "2,100",
      image: "/placeholder-house3.jpg",
    }
  ],
  services: [],
  team: [
    { name: "Sarah Jenkins", role: "Principal Broker", bio: "Over $100M in luxury sales." },
    { name: "Michael Thorne", role: "Neighborhood Specialist", bio: "Deep roots in the community." },
    { name: "Elena Rostova", role: "Relocation Expert", bio: "Making global moves seamless." }
  ],
  buyingJourney: [
    { step: "01", title: "Search & Discover", description: "Curated listings tailored to your exact lifestyle and needs." },
    { step: "02", title: "Private Tours", description: "Exclusive access to on-market and off-market properties." },
    { step: "03", title: "Negotiation", description: "Aggressive yet refined strategies to secure your dream home." },
    { step: "04", title: "Closing", description: "White-glove service through paperwork and key delivery." }
  ],
  neighborhoods: [
    { name: "Historic District", description: "Cobblestone streets and timeless architecture.", image: "/nh1.jpg" },
    { name: "Financial Center", description: "High-rise luxury and unparalleled convenience.", image: "/nh2.jpg" },
    { name: "The Heights", description: "Panoramic views and sprawling estates.", image: "/nh3.jpg" },
  ],
  testimonials: [
    { name: "Arthur P.", text: "Northgate found our dream home before it even hit the market.", rating: 5 },
    { name: "Clara S.", text: "The most professional and stress-free buying experience we've ever had.", rating: 5 },
  ],
  faqs: [
    { question: "How do you source off-market properties?", answer: "Our decades of networking give us access to private sales." },
    { question: "What is your commission structure?", answer: "We offer competitive rates aligned with luxury market standards." }
  ],
  stats: [
    { label: "Homes Sold", value: "850+" },
    { label: "Avg Days on Market", value: "14" },
    { label: "Client Rating", value: "5.0" },
    { label: "Volume Sold", value: "$1.2B" }
  ],
};
