import type { DemoConfig } from "@client-demos/core";

export interface AutoShopConfig extends DemoConfig {
  repairProcess: Array<{
    step: string;
    title: string;
    description: string;
  }>;
  beforeAfter: Array<{
    id: string;
    title: string;
    beforeImage: string;
    afterImage: string;
  }>;
}

export const config: AutoShopConfig = {
  brand: {
    name: "Apex Auto",
    tagline: "Precision Engineering. Flawless Collision Repair.",
    phone: "1-800-APEX-FIX",
    email: "service@apexauto.com",
    address: "500 Velocity Way, Motor City, MI",
    hours: ["Mon - Fri: 7 AM - 6 PM", "Sat: 8 AM - 2 PM", "Sun: Closed"],
  },
  theme: {
    bg: "#1B1F24",        // Gunmetal
    fg: "#C9CED6",        // Silver
    muted: "#5A626F",     // Darker silver
    accent: "#E11D2E",    // Racing Red
    accent2: "#FFFFFF",   // Pure White
    radius: "4px",
    fontDisplay: "'Orbitron', sans-serif",
    fontBody: "'Chakra Petch', sans-serif",
  },
  services: [
    { title: "Collision Repair", description: "State-of-the-art frame straightening and body work.", price: "Free Estimate" },
    { title: "Custom Paint", description: "Factory-matched precision painting and clear coats.", price: "Starts at $500" },
    { title: "Performance Tuning", description: "Dyno testing, exhaust systems, and ECU remaps.", price: "Custom" },
    { title: "General Maintenance", description: "Oil changes, brake pads, and fluid flushes.", price: "Starts at $89" },
  ],
  repairProcess: [
    { step: "01", title: "Damage Assessment", description: "Detailed 3D scanning and computer diagnostics." },
    { step: "02", title: "Insurance Approval", description: "We handle the paperwork and negotiate with your provider directly." },
    { step: "03", title: "Precision Repair", description: "Laser-guided frame alignment and OEM parts installation." },
    { step: "04", title: "Final Polish", description: "A multi-stage detailing process so it looks better than new." },
  ],
  beforeAfter: [
    {
      id: "1",
      title: "Front Bumper Reconstruction",
      beforeImage: "/placeholder-before1.jpg",
      afterImage: "/placeholder-after1.jpg",
    },
    {
      id: "2",
      title: "Quarter Panel Replacement",
      beforeImage: "/placeholder-before2.jpg",
      afterImage: "/placeholder-after2.jpg",
    }
  ],
  team: [],
  testimonials: [
    { name: "Marcus T.", text: "Apex got my M3 back on the road looking absolutely flawless.", rating: 5 },
    { name: "Elena R.", text: "Fast, professional, and they handled all the insurance headaches for me.", rating: 5 },
  ],
  faqs: [],
  stats: [
    { label: "Vehicles Restored", value: "10,000+" },
    { label: "Turnaround Time", value: "-30%" },
    { label: "Certified Techs", value: "25" },
    { label: "Years Experience", value: "15" },
  ],
};
