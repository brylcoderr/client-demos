import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { config } from "../demo.config";

export const metadata: Metadata = {
  title: config.brand.name,
  description: config.brand.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className="bg-[var(--bg)] text-[var(--fg)] antialiased"
        style={{
          // Inject theme variables from config so they're available before JS hydrates
          ["--bg" as string]: config.theme.bg,
          ["--fg" as string]: config.theme.fg,
          ["--muted" as string]: config.theme.muted,
          ["--accent" as string]: config.theme.accent,
          ["--accent-2" as string]: config.theme.accent2,
          ["--radius" as string]: config.theme.radius,
          ["--font-display" as string]: config.theme.fontDisplay,
          ["--font-body" as string]: config.theme.fontBody,
        }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
