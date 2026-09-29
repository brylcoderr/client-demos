import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import "./tokens.css";
import { Providers } from "./providers";
import { demoConfig } from "../demo.config";

const fontDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const fontBody = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
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
      <body className="bg-[var(--bg)] text-[var(--fg)] antialiased font-sans text-[17px] lg:text-[18px]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
