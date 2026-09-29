import type { Metadata } from "next";
import { Nunito, Lora } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { demoConfig as config } from "../demo.config";

const fontBody = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const fontDisplay = Lora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: config.brand.name,
  description: config.brand.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontBody.variable} ${fontDisplay.variable}`}>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
