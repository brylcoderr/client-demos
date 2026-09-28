# Color Lab 1 | Hair Salon

A high-end promotional website for a boutique hair color and styling studio based in Bay Ridge, Brooklyn.

Built with a focus on immersive aesthetics and fluid movement, this project utilizes a modern front-end stack to deliver a premium user experience.

## ✨ Features

- **Immersive 3D Hero**: Features an interactive 3D fiber system powered by `@react-three/fiber` that dynamically responds to cursor movement.
- **GSAP Scroll Storytelling**: Deeply integrated `ScrollTrigger` animations, including asymmetric gallery parallax, velocity-driven infinite marquees, and scrubbed text reveals.
- **Advanced Smooth Scroll**: Driven by `lenis`, manually synchronized with the GSAP ticker for flawless performance without jitter.
- **Contextual Magnetic Cursor**: A custom global cursor that expands on interactive elements and displays contextual text ("DRAG", "VIEW") depending on the active component.
- **Premium UI & Typography**: Custom dark-mode theme utilizing refined gold accents, paired with `Cormorant Garamond` (display) and `DM Sans` (body) for an elegant editorial feel.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+ (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Scroll & Timelines**: [GSAP](https://gsap.com/) & ScrollTrigger
- **Smooth Scroll**: [Lenis](https://lenis.studiofreight.com/)
- **3D Canvas**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) & Drei
- **Micro-Interactions**: [Framer Motion](https://www.framer.com/motion/)
- **Carousels**: [Embla Carousel](https://www.embla-carousel.com/)

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `/src/components/layout`: Global wrappers (Navbar, Footer, SmoothScroll, CustomCursor).
- `/src/components/sections`: Page sections (Hero, About, Gallery, Services, Reviews).
- `/src/components/three`: React Three Fiber components (HeroCanvas).
- `/src/components/ui`: Reusable primitive components (Buttons, Badges, Labels).
