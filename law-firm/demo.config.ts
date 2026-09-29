import type { DemoConfig } from "@client-demos/core";

export const demoConfig: DemoConfig = {
  brand: {
    name: "HARTWELL & ROWE",
    tagline: "Relentless advocacy. Unwavering integrity.",
    phone: "1-800-555-ROWE",
    email: "consultations@hartwellrowe.com",
    address: "200 State Street, Suite 400, Boston, MA 02109",
    hours: ["Mon - Fri: 8 AM - 6 PM", "24/7 Emergency Line"],
  },

  theme: {
    bg: "#0F1F3D", // navy
    fg: "#F8F4EA", // ivory
    muted: "#8C9BAB", // soft slate for muted text
    accent: "#B39B5E", // muted gold
    accent2: "#16284B", // slightly lighter navy
    radius: "2px", // subtle corners
    fontDisplay: "var(--font-display)",
    fontBody: "var(--font-body)",
  },

  services: [
    { title: "Corporate Litigation", description: "Navigating complex business disputes with strategic foresight and aggressive representation.", price: "" },
    { title: "White Collar Defense", description: "Protecting the rights and reputations of executives and corporations facing state or federal scrutiny.", price: "" },
    { title: "Intellectual Property", description: "Safeguarding your innovations, patents, and trademarks in a highly competitive global market.", price: "" },
    { title: "Appellate Practice", description: "Meticulous legal analysis and compelling oral arguments for high-stakes appeals.", price: "" }
  ],

  team: [
    { name: "Jonathan Hartwell", role: "Managing Partner", bio: "Over three decades of trial experience. Recognized globally for his strategic approach to complex corporate litigation." },
    { name: "Eleanor Rowe", role: "Senior Partner", bio: "A formidable appellate attorney with a track record of overturning high-profile convictions and civil judgments." },
    { name: "David Sterling", role: "Partner", bio: "Specializes in intellectual property disputes and technology law, representing Fortune 500 tech firms." }
  ],

  testimonials: [
    { name: "Richard C., CEO", text: "Hartwell & Rowe secured our company's future during an incredibly turbulent time. Their absolute command of the law is unmatched.", rating: 5 },
    { name: "Sarah M.", text: "Eleanor Rowe is a brilliant strategist. She brought clarity and calm to a complex appellate case.", rating: 5 },
    { name: "Thomas W.", text: "When facing federal inquiry, having Jonathan Hartwell in your corner is the only choice.", rating: 5 },
  ],

  faqs: [
    { question: "Do you offer initial consultations?", answer: "Yes, we provide confidential initial consultations to assess the merits and strategy of your case." },
    { question: "What is your fee structure?", answer: "We offer tailored fee arrangements, including hourly rates, flat fees, and hybrid models depending on the nature of the matter." },
    { question: "Do you handle international disputes?", answer: "Yes. Our attorneys have extensive experience in cross-border litigation and international arbitration." },
  ],

  stats: [
    { label: "Recovered in Damages", value: "$2.5B+" },
    { label: "Cases Won", value: "450+" },
    { label: "Years of Experience", value: "85+" },
    { label: "Fortune 500 Clients", value: "50+" },
  ],
};
