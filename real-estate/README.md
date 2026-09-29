# Demo0-template

Starter template for every client demo in this monorepo.

## How to create a new demo

```bash
# 1. Copy the template
cp -r Demo0-template Demo1        # macOS/Linux
Copy-Item Demo0-template Demo1 -Recurse   # Windows PowerShell

# 2. Update package name
# Open Demo1/package.json → change "name" to "Demo1"

# 3. Rebrand
# Open Demo1/demo.config.ts → change brand, theme, services, etc.

# 4. Install & run
pnpm install
pnpm --filter Demo1 dev
# or from root:
npm run dev:demo1
```

## What's included

| File | Purpose |
|---|---|
| `next.config.ts` | Enables `transpilePackages` for `@client-demos/core` |
| `app/layout.tsx` | Root layout with Google Fonts, theme injection, SmoothScrollProvider |
| `app/providers.tsx` | Client-side providers (Lenis, CustomCursor) |
| `app/page.tsx` | Skeleton page using all core components |
| `app/globals.css` | Tailwind v4 + theme tokens import |
| `demo.config.ts` | **The only file you need to edit to rebrand** |

## Architecture

Each demo consumes `@client-demos/core` as a **source-only** workspace dependency.
Next.js compiles it on-the-fly via `transpilePackages` — no separate build step needed.

All animations use:
- **GSAP + ScrollTrigger** for scroll-driven effects (parallax, counters, pinned sections)
- **Motion** (`motion/react`) for UI micro-interactions (reveals, accordions, modals)
- **Lenis** for smooth scroll, synced to GSAP's ticker

Rules followed:
- Only `transform` and `opacity` are animated — zero layout shifts
- Every GSAP setup lives inside `gsap.context()` with proper cleanup
- Mobile-first, works from 360px up, 44px minimum touch targets
- No external images — SVG, CSS gradients, and procedural 3D only
