# Base Specification

Every demo defines these CSS variables in `app/tokens.css` and nowhere else:
- `--bg`
- `--surface`
- `--surface-2`
- `--fg`
- `--fg-muted`
- `--accent`
- `--on-accent`
- `--accent-2`
- `--border`
- `--inverse-bg`
- `--inverse-fg`
- `--scrim`

Components use only `var(--token)` (or Tailwind classes mapped to these tokens). No hex, rgb or named colors in components. Disable the default Tailwind palette (`theme.colors` replaced, or `@theme` in v4) so a stray `text-gray-500` cannot exist.

Set `:root { color-scheme: light; }` (or dark for dark-native demos). Do not add `prefers-color-scheme` overrides. The palette is the brand, it must not flip.

Set `body { background: var(--bg); color: var(--fg); }` and never rely on inheritance from the browser default.

Every section declares its surface with a data attribute and text follows automatically:
```css
[data-surface="base"]    { background: var(--bg);         color: var(--fg); }
[data-surface="raised"]  { background: var(--surface);    color: var(--fg); }
[data-surface="inverse"] { background: var(--inverse-bg); color: var(--inverse-fg); --fg-muted: var(--inverse-fg); }
[data-surface="accent"]  { background: var(--accent);     color: var(--on-accent); }
```

Muted text uses `--fg-muted`, never opacity. Opacity on text breaks contrast unpredictably.

Accent as text is banned unless the demo's token table marks it "text-safe". Accents are for fills, borders, rules, icons over 24px, and large display text (24px+ bold or 32px+).

Text over images or the 3D canvas always sits on a scrim: `linear-gradient(to top, var(--scrim), transparent 60%)`, with `--scrim` at 70 to 85% opacity of the section's dark tone. Never place text directly on a photo.

Buttons: fill `--accent`, text `--on-accent`, focus ring 2px `--fg` with 2px offset. Hover changes via `filter: brightness()` or transform, never by swapping to an untested color.

## UI Stability Rules

- Z-index scale only: `--z-base:0;`, `--z-content:10;`, `--z-sticky:100;`, `--z-nav:200;`, `--z-drawer:300;`, `--z-modal:400;`, `--z-cursor:500;`. No other z-index values.
- Use `100svh`/`100dvh`, never `100vh`, for full-height sections on mobile.
- No horizontal page scroll at any width: `html, body { overflow-x: clip; }` and test at 360px.
- The 3D canvas is `position: absolute; inset: 0; z-index: 0; pointer-events: none` unless the demo needs drag, and content sits above it at `z-index: var(--z-content)`. Hero text always sits over a scrim.
- Pinned/scrubbed sections: one ScrollTrigger per pinned block with `pinSpacing: true`, `invalidateOnRefresh: true`, refresh on font load and image load. Disable pinning under 768px unless explicitly required, and use stacked layouts there.
- Fonts via `next/font` with `display: 'swap'`, fallback stacks defined. Set font-size with `clamp()`, minimum body 16px (17 to 18px where specified).
- Sticky nav has a solid `--bg` (or blur on `--bg` at 85% opacity) once scrolled, so text under it never bleeds through.
- Touch targets 44px minimum, visible `:focus-visible` on every interactive element.
- Animate only `transform` and `opacity`. GSAP inside `gsap.context` with cleanup. Respect `prefers-reduced-motion`.
- 3D: `dpr={[1,1.5]}`, `frameloop="demand"` when off-screen, low-tier fallback via `useDeviceTier`, dynamic import with `ssr: false`.
- No lorem ipsum. Realistic, specific copy. Business details come only from `demo.config.ts`.

## Image Pipeline

(relevance guaranteed by process, not luck)
Never hotlink. Never guess a photo. Never keep a photo that fails review.

Each demo has `public/images/images.manifest.json`:
```json
[
  {
    "file": "hero-barber-chair.jpg",
    "query": "barber shop interior vintage chair",
    "orientation": "landscape",
    "must": ["barber", "chair"],
    "avoid": ["hair salon woman", "spa", "dentist", "cartoon", "illustration"],
    "alt": "Vintage leather barber chair in a dark barbershop",
    "minWidth": 1600
  }
]
```

Create `scripts/fetch-images.mjs` (usage: `node scripts/fetch-images.mjs <demo-folder>`), which for each manifest entry:
1. Queries Pexels first (`GET https://api.pexels.com/v1/search?query=...&orientation=...&per_page=20`, header `Authorization: $PEXELS_API_KEY`), and Unsplash second (`GET https://api.unsplash.com/search/photos?query=...&orientation=...&per_page=20`, header `Authorization: Client-ID $UNSPLASH_ACCESS_KEY`).
2. Filters results: width at least `minWidth`, at least one `must` word present in the photo's `alt`/`alt_description`/`description`, no `avoid` word present.
3. Picks the first survivor. Downloads it (Pexels `src.large2x`, Unsplash `urls.regular`), calls Unsplash `links.download_location` as the API requires, converts to max 2000px wide.
4. Appends photographer, photo page URL and license to `CREDITS.md`, and writes the chosen ID and alt text into `images.lock.json`.
5. If no result survives the filter, tries up to 3 fallback queries listed in the entry (`"fallbacks": [...]`). If still none, generates a branded gradient/SVG placeholder with the demo's tokens and lists the file under `NEEDS_MANUAL` in the console output.

Then visual review is mandatory: open every downloaded image and answer for each: "Does this show [subject] for a [industry]? Any wrong industry, watermark, text overlay, or off-palette color cast?" Replace failures by tightening must/avoid and rerunning. Print a review table (file, subject seen, pass/fail).

Rules: people portraits 4:5, scenes 16:9 or 3:2. Real work over generic stock smiles. Photos must suit the palette (warm/dark/pastel as noted). SmartImage component uses `next/image` with blur placeholder, explicit width/height, focal point prop.
