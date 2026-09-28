import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        surface: "var(--color-surface)",
        card: "var(--color-card)",
        accent: "var(--color-accent)",
        "accent-muted": "var(--color-accent-muted)",
        "text-primary": "var(--color-text-primary)",
        "text-muted": "var(--color-text-muted)",
        border: "var(--color-border)",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
