"use client";

// ─── Providers ───────────────────────────────────────────────
export { SmoothScrollProvider } from "./providers/SmoothScrollProvider";

// ─── Hooks ───────────────────────────────────────────────────
export { useGsapContext } from "./hooks/useGsapContext";
export { useReducedMotion } from "./hooks/useReducedMotion";
export { useDeviceTier } from "./hooks/useDeviceTier";
export type { DeviceTier } from "./hooks/useDeviceTier";
export { useScrollVelocity } from "./hooks/useScrollVelocity";
export { useMouseParallax } from "./hooks/useMouseParallax";
export { useDeviceTilt } from "./hooks/useDeviceTilt";

// ─── Three ───────────────────────────────────────────────────
export { HeroCanvas } from "./three/HeroCanvas";

// ─── Theme ───────────────────────────────────────────────────
export { createTheme } from "./theme/createTheme";

// ─── Config ──────────────────────────────────────────────────
export type { DemoConfig } from "./config/types";

// ─── UI Components ──────────────────────────────────────────
export { StickyNav } from "./ui/StickyNav";
export { SplitTextReveal } from "./ui/SplitTextReveal";
export { Reveal } from "./ui/Reveal";
export { Stagger } from "./ui/Stagger";
export { Marquee } from "./ui/Marquee";
export { Counter } from "./ui/Counter";
export { BeforeAfterSlider } from "./ui/BeforeAfterSlider";
export { HorizontalScrollSection } from "./ui/HorizontalScrollSection";
export { PinnedSteps } from "./ui/PinnedSteps";
export { Accordion } from "./ui/Accordion";
export { Tabs } from "./ui/Tabs";
export { Modal } from "./ui/Modal";
export { Drawer } from "./ui/Drawer";
export { ContactForm } from "./ui/ContactForm";
export { CustomCursor } from "./ui/CustomCursor";
export { MagneticButton } from "./ui/MagneticButton";
export { Footer } from "./ui/Footer";
