/**
 * DemoConfig
 *
 * The single source of truth for every demo's business data.
 * Swap this file to re-skin an entire site in under 2 minutes.
 */

export interface DemoConfig {
  brand: {
    name: string;
    tagline: string;
    phone: string;
    email: string;
    address: string;
    hours: string[];
  };
  theme: {
    bg: string;
    fg: string;
    muted?: string;
    accent: string;
    accent2?: string;
    surface?: string;
    surface2?: string;
    radius: string;
    fontDisplay: string;
    fontBody: string;
  };
  services: Array<{ title: string; description: string; price: string }>;
  team: Array<{ name: string; role: string; bio: string }>;
  testimonials: Array<{ name: string; text: string; rating: number }>;
  faqs: Array<{ question: string; answer: string }>;
  stats: Array<{ label: string; value: string }>;
  images?: { hero?: string; gallery?: string[]; team?: string[] };
  extra?: Record<string, unknown>;
}
