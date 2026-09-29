import type { Metadata } from "next";
import { Archivo_Black, Barlow } from "next/font/google";
import "./globals.css";
import "./tokens.css";
import { Providers } from "./providers";
import { demoConfig } from "../demo.config";

const fontDisplay = Archivo_Black({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

const fontBody = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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
      <body className="bg-[var(--bg)] text-[var(--fg)] antialiased font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
