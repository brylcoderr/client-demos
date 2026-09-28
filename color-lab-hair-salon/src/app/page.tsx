import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/sections/Gallery";
import { Reviews } from "@/components/sections/Reviews";
import { BookingCTA } from "@/components/sections/BookingCTA";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Gallery />
      <Reviews />
      <BookingCTA />
    </main>
  );
}
