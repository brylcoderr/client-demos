import type { DemoConfig } from "@client-demos/core";

export interface CommunityCenterConfig extends DemoConfig {
  programs: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
  events: Array<{
    id: string;
    date: string;
    title: string;
    time: string;
    location: string;
  }>;
  serviceTimes: Array<{
    day: string;
    times: string[];
  }>;
}

export const demoConfig: CommunityCenterConfig = {
  brand: {
    name: "Al-Noor Community Center",
    tagline: "A welcoming space for faith, family, and fellowship.",
    phone: "(555) 123-4567",
    email: "salam@alnoorcenter.org",
    address: "123 Unity Blvd, Peace City",
    hours: ["Open Daily: 5 AM - 10 PM"],
  },
  theme: {
    bg: "#FBF6EC",
    fg: "#1F2A28",
    muted: "#4A5A56",
    accent: "#236B67",
    accent2: "#B98A3E",
    radius: "16px",
    fontDisplay: "'Lora', serif",
    fontBody: "'Nunito', sans-serif",
  },
  services: [],
  programs: [
    {
      id: "1",
      title: "Youth Leadership",
      description: "Empowering the next generation through mentorship and civic engagement.",
      icon: "Users"
    },
    {
      id: "2",
      title: "Food Pantry",
      description: "Providing fresh, nutritious groceries to families in need every Saturday.",
      icon: "Heart"
    },
    {
      id: "3",
      title: "Adult Education",
      description: "Evening classes offering language support, financial literacy, and career skills.",
      icon: "BookOpen"
    },
    {
      id: "4",
      title: "Family Counseling",
      description: "Confidential and compassionate support for couples and families.",
      icon: "Home"
    },
    {
      id: "5",
      title: "Senior Care",
      description: "Weekly wellness check-ins, social activities, and support for our elders.",
      icon: "Users"
    },
    {
      id: "6",
      title: "Community Garden",
      description: "A shared space to grow organic produce and learn about sustainability.",
      icon: "Home"
    }
  ],
  events: [
    { id: "e1", date: "OCT 15", title: "Community Potluck", time: "6:00 PM - 8:30 PM", location: "Main Hall" },
    { id: "e2", date: "OCT 18", title: "Youth Coding Workshop", time: "4:00 PM - 6:00 PM", location: "Library" },
    { id: "e3", date: "OCT 22", title: "Charity Drive", time: "10:00 AM - 2:00 PM", location: "Front Courtyard" },
    { id: "e4", date: "NOV 01", title: "Interfaith Dialogue", time: "7:00 PM - 9:00 PM", location: "Auditorium" }
  ],
  serviceTimes: [
    { day: "Friday Congregational", times: ["1:15 PM (First Service)", "2:30 PM (Second Service)"] },
    { day: "Daily Services", times: ["Open for all 5 daily prayers"] },
  ],
  team: [
    { name: "Dr. Hassan Ali", role: "Executive Director", bio: "Serving the community for over 15 years with a focus on education." },
    { name: "Aisha Rahman", role: "Youth Director", bio: "Passionate about building resilient and confident young leaders." },
    { name: "Omar Farooq", role: "Outreach Coordinator", bio: "Connecting Al-Noor with local charities and civic organizations." },
    { name: "Mariam Khan", role: "Education Lead", bio: "Guiding our adult education programs and community garden initiatives." }
  ],
  testimonials: [
    { name: "Sara M.", text: "Al-Noor is more than a center; it's a second home for my family.", rating: 5 },
    { name: "David L.", text: "The food pantry has been a lifeline during difficult times. Thank you.", rating: 5 },
    { name: "Yusuf A.", text: "The youth programs helped my son find his passion for volunteering.", rating: 5 },
    { name: "Fatima B.", text: "A truly welcoming space for everyone, regardless of background.", rating: 5 },
    { name: "Michael R.", text: "The interfaith dialogue events are eye-opening and beautiful.", rating: 5 }
  ],
  faqs: [],
  stats: [
    { label: "Families Served", value: "2,500+" },
    { label: "Volunteers", value: "150+" },
    { label: "Weekly Programs", value: "24" },
    { label: "Meals Distributed", value: "10,000" },
  ],
};
