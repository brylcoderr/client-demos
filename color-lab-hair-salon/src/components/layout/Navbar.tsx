"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Gallery", href: "#gallery" },
  { name: "Reviews", href: "#reviews" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Handle background blur
      setIsScrolled(currentScrollY > 50);

      // Handle visibility
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // scrolling down
      } else {
        setIsVisible(true); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl tracking-wide text-text-primary flex items-center gap-3 group">
            <Image 
              src="/logo.jpg" 
              alt="Color Lab 1 Logo" 
              width={40} 
              height={40} 
              className="rounded-full border border-border group-hover:border-accent transition-colors" 
            />
            <span className="hidden sm:inline-block">Color Lab 1<span className="text-accent">.</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-body text-eyebrow text-text-primary hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Button asChild variant="ghost" size="sm">
              <a href="https://book.squareup.com/appointments/65fcf06a-2b8e-47d5-8f50-3bfc9ecb746c/location/6KJC3F0ZJYJ7F/services?rwg_token=AE37R_iNQOjFYnq6W8oweF-BotqtgniprDfA-fpKZgFx4MYtnwsGQLRiACmhcD4TMey8MCOuiTrKUEAvFfkXaparbnw-5bbw1A%3D%3D" target="_blank" rel="noopener noreferrer">
                Book Now
              </a>
            </Button>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-text-primary focus:outline-none"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-background flex flex-col p-6"
          >
            <div className="flex justify-between items-center h-14">
              <span className="font-display text-2xl text-text-primary flex items-center gap-3">
                <Image src="/logo.jpg" alt="Color Lab 1 Logo" width={32} height={32} className="rounded-full border border-border" />
                Color Lab 1<span className="text-accent">.</span>
              </span>
              <button
                className="text-text-primary focus:outline-none"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex-1 flex flex-col justify-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-display text-5xl text-text-primary hover:text-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            
            <div className="mt-auto pt-8 border-t border-border">
              <Button asChild className="w-full" size="lg" magnetic={false}>
                <a href="https://book.squareup.com/appointments/65fcf06a-2b8e-47d5-8f50-3bfc9ecb746c/location/6KJC3F0ZJYJ7F/services?rwg_token=AE37R_iNQOjFYnq6W8oweF-BotqtgniprDfA-fpKZgFx4MYtnwsGQLRiACmhcD4TMey8MCOuiTrKUEAvFfkXaparbnw-5bbw1A%3D%3D" target="_blank" rel="noopener noreferrer">
                  Book Appointment
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

