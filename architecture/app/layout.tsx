import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { demoConfig } from "../demo.config";

const fontDisplay = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-display",
  display: "swap",
});

const fontBody = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: demoConfig.brand.name,
  description: demoConfig.brand.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable}`}>
      <body
        className="bg-[var(--bg)] text-[var(--fg)] antialiased selection:bg-[var(--accent)] selection:text-white"
        style={{
          // Inject theme variables from config so they're available before JS hydrates
          ["--bg" as string]: demoConfig.theme.bg,
          ["--fg" as string]: demoConfig.theme.fg,
          ["--muted" as string]: demoConfig.theme.muted,
          ["--accent" as string]: demoConfig.theme.accent,
          ["--accent-2" as string]: demoConfig.theme.accent2,
          ["--radius" as string]: demoConfig.theme.radius,
          ["--font-display" as string]: demoConfig.theme.fontDisplay,
          ["--font-body" as string]: demoConfig.theme.fontBody,
        }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
