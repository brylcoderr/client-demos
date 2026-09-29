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
    bg: "#FBF8F3",
    fg: "#0F3B2E",
    muted: "#667B73",
    accent: "#B8935A",
    accent2: "#0A281F",
    radius: "0px",
    fontDisplay: "var(--font-display)",
    fontBody: "var(--font-body)",
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
      image: "/images/listing-1.jpg",
      tag: "Just Listed"
    },
    {
      id: "2",
      title: "The Penthouse at Riverwalk",
      price: "$5,100,000",
      beds: 3,
      baths: 4,
      sqft: "4,500",
      image: "/images/listing-2.jpg",
      tag: "Open House"
    },
    {
      id: "3",
      title: "890 Historic Drive",
      price: "$1,295,000",
      beds: 3,
      baths: 2,
      sqft: "2,100",
      image: "/images/listing-3.jpg",
    },
    {
      id: "4",
      title: "102 Ocean View",
      price: "$3,850,000",
      beds: 5,
      baths: 4.5,
      sqft: "5,000",
      image: "/images/listing-4.jpg",
    },
    {
      id: "5",
      title: "300 Park Avenue",
      price: "$1,750,000",
      beds: 2,
      baths: 2,
      sqft: "1,800",
      image: "/images/listing-5.jpg",
    },
    {
      id: "6",
      title: "77 Sunset Blvd",
      price: "$4,200,000",
      beds: 4,
      baths: 4,
      sqft: "4,100",
      image: "/images/listing-6.jpg",
    }
  ],
  services: [],
  team: [
    { name: "Sarah Jenkins", role: "Principal Broker", bio: "Over $100M in luxury sales." },
    { name: "Michael Thorne", role: "Neighborhood Specialist", bio: "Deep roots in the community." }
  ],
  buyingJourney: [
    { step: "01", title: "Search & Discover", description: "Curated listings tailored to your exact lifestyle and needs." },
    { step: "02", title: "Private Tours", description: "Exclusive access to on-market and off-market properties." },
    { step: "03", title: "Negotiation", description: "Aggressive yet refined strategies to secure your dream home." },
    { step: "04", title: "Closing", description: "White-glove service through paperwork and key delivery." }
  ],
  neighborhoods: [
    { name: "Historic District", description: "Cobblestone streets and timeless architecture.", image: "/images/hood-1.jpg" },
    { name: "Financial Center", description: "High-rise luxury and unparalleled convenience.", image: "/images/hood-2.jpg" },
    { name: "The Heights", description: "Panoramic views and sprawling estates.", image: "/images/hood-3.jpg" },
    { name: "Waterfront", description: "Coastal living at its finest.", image: "/images/hood-4.jpg" },
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
