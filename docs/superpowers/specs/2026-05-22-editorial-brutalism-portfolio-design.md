# Portfolio Redesign: Editorial Brutalism

**Date:** 2026-05-22  
**Status:** Approved  
**Stack:** Next.js 14 + Framer Motion + Tailwind CSS  

---

## Overview

Complete reimagination of anshulp2912.github.io as an editorial brutalism portfolio. Every component and animation is replaced. The guiding principle: bold typographic authority + cinematic scroll interactions + magnetic cursor — the kind of site that makes a recruiter stop scrolling.

---

## Color System

| Token         | Value     | Usage                                  |
|---------------|-----------|----------------------------------------|
| Ink black     | `#080808` | Primary background                     |
| Cream         | `#f0ece3` | Contrast panels, large display type    |
| Neon emerald  | `#00e87a` | Accent, glows, active states, borders  |
| Muted emerald | `#10b981` | Secondary, body text tints             |
| Slate         | `#8892a4` | Body text, metadata                    |
| White         | `#fafafa` | Primary text on dark backgrounds       |

---

## Typography

- **Display** (`Space Grotesk`, weight 900): hero name, section counter numbers (8–12rem desktop, scales via `clamp()`)
- **Body** (`Inter`): paragraphs, bullets, descriptions
- **Mono** (`JetBrains Mono`): stats, dates, code snippets, footer

Font loading: `next/font` with `display: swap`.

---

## Global Interaction Systems

### Magnetic Cursor
- Custom `div` positioned `fixed`, `pointer-events: none`, `z-index: 9999`
- Follows mouse via `useMotionValue` + `useSpring` (stiffness: 150, damping: 15) for spring lag
- On hover over `[data-magnetic]` elements: cursor enlarges (40px → 80px), blends to emerald
- **Disabled on touch devices** (`window.matchMedia('(pointer: coarse)')`)

### Clip-Path Wipe Reveals
- Standard entrance: `clipPath: 'inset(100% 0% 0% 0%)'` → `'inset(0% 0% 0% 0%)'`
- Triggered by `useInView` with `margin: '-80px'`
- Duration: 0.8s, ease: `[0.76, 0, 0.24, 1]` (cubic-bezier, editorial snap)
- Text elements use per-word stagger with 0.06s delay between words

### 3D Card Tilt
- `useMotionValue` for `rotateX` / `rotateY`, `useSpring` smoothing
- Max tilt: ±12deg
- `perspective: 1200px` on container
- Resets to 0 on `mouseLeave` with spring

### Noise Texture
- SVG `<feTurbulence>` filter at 3% opacity overlaid on cream panels
- Gives tactile print/paper feel

---

## Section Architecture

### New Section Order
`Hero → About → Experience → Projects → Skills → Education → More → Contact → Footer`

Removed as standalone: `Certifications`, `Hobbies` (merged into `More` strip).

---

## Component Designs

### Navigation
- **Desktop**: fixed left rail, vertical text links rotated 90°, dot active indicators, emerald active color
- **Mobile**: hamburger top-right → full-screen overlay, massive stacked link text, clip-path stagger entrance
- Background: transparent, no glass pill

### Hero
Split-screen layout:
- **Left 45%** — cream panel, clip-path wipes in from left (0.8s)
  - `ANSHUL` / `PATEL` in Space Grotesk 900, ~8rem desktop, `clamp(3.5rem, 10vw, 8rem)` fluid
  - Each word reveals bottom-to-top with 0.1s stagger
  - Role subtitle in Inter 1rem slate
  - "Download Resume ↗" button: ink bg, cream border, hover fills cream
- **Right 55%** — ink black panel
  - Mono terminal card (glass border, emerald top-bar strip)
  - Stats type in sequentially: `> SDE II @ AWS`, `> 3 yrs cloud infra`, `> 20K+ devs at launch`, `> 40% perf improvement`
  - Neon emerald radial glow orb behind card, `scale: [1, 1.15, 1]` 8s loop
- **Mobile**: stacked — cream name block top, dark stats card bottom, full-width
- Scroll indicator: `↓` bounces, fades at `scrollY > 100`

### About
- Full-bleed ink panel
- Giant rotated `01` counter (12rem, emerald, absolute left edge, `opacity: 0.15`)
- Two-column: left pull quote in 2.5rem cream Space Grotesk italic; right 3 body paragraphs in Inter slate
- Pull quote: *"I build the infra no one sees, for the products everyone uses."*
- Clip-path wipe left→right on scroll entry
- **Mobile**: single column, counter hidden, pull quote full-width at 1.5rem

### Experience
- Sticky section container, `overflow-x: scroll` on inner track — desktop horizontal scroll
- `useScroll` maps container's vertical scroll progress → `x` translation of card track
- Section label `02 EXPERIENCE` fixed top-left of sticky container, mono uppercase
- Cards:
  - Width: `clamp(320px, 40vw, 480px)`, height: `auto`
  - Cream header strip (role in Space Grotesk bold, date in JetBrains Mono slate)
  - Ink black body (bullet list, `border-left: 2px solid #00e87a`)
  - 3D tilt on hover
  - Clip-path reveal as each card scrolls into view
- **Mobile**: vertical stack, full-width cards, clip-path reveal per card

### Projects — Bento Grid
- Section label `03 PROJECTS`, giant counter `03` emerald ghost
- Asymmetric CSS Grid:
  ```
  grid-template-columns: 2fr 1fr 1fr
  grid-template-rows: auto
  ```
  - Lekha (featured): `grid-row: span 2`, `grid-column: 1`
  - Remaining: fill 2×2 mosaic right side, overflow to new rows
- Alternating bg: odd cards cream, even cards ink
- Each card: 3D tilt, clip-path reveal, hover → neon emerald border glow + `scale(1.02)`
- Card content: large title, short description, `↗` link icon
- **Mobile**: single column, featured card `min-height: 280px`, rest `min-height: 180px`

### Skills — Marquee Tracks
- Section label `04 SKILLS`, stat line `40+ technologies` in mono
- 3 infinite marquee rows using CSS `animation: marquee` + Framer `animate={{ x: [0, -50%] }}` loop
  - Row 1 (→): Languages & Frameworks
  - Row 2 (←): AWS & Cloud
  - Row 3 (→): ML & Data
- Each tag: `px-4 py-2`, glass border, hover → emerald bg + ink text + glow
- Rows fade at edges via `mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent)`
- **Mobile**: same marquee, tags slightly smaller

### Education — Typographic Panel
- Full-bleed cream panel
- Giant `05` ink counter absolute left, opacity 0.08
- Two degree blocks in pure type hierarchy (no cards):
  ```
  NC STATE UNIVERSITY        NIRMA UNIVERSITY
  M.S. Computer Science      B.Tech Computer Eng.
  4.0 GPA · 2021–2022        2016–2020
  ```
- Institution names: Space Grotesk 700 ink, 2rem
- Degree: Inter 1rem ink
- Meta: JetBrains Mono 0.85rem muted
- Clip-path wipe reveals entire panel
- **Mobile**: stacked single column

### More (Certifications + Hobbies)
- Ink section, `py-16`
- **Certifications block**: 3 category rows — each row shows category name (Space Grotesk bold) + cert count in mono + horizontally scrollable pill list of cert names (linked)
  - "Machine Learning and Deep Learning" — 8 certs
  - "Data Science" — 4 certs
  - "Software and Tools" — 3 certs
  - Pills: `px-3 py-1 text-xs`, glass border, click opens cert link in new tab
- **Hobbies block**: `INTERESTS` mono label + 10 hobbies as inline tags — Soccer, Algo Trading, Cricket, Chess, Badminton, Trekking, Baking, Photo Editing, Video Editing, Anime
- Thin `border-t border-white/06` separates certs from hobbies
- No scroll-trigger animation — static section as visual breather between Education and Contact
- **Mobile**: stacked vertically, cert pill rows scroll horizontally (touch scroll)

### Contact
- Giant centered `LET'S WORK TOGETHER` — Space Grotesk 900, `clamp(2.5rem, 8vw, 5rem)`, white
- Below: email in JetBrains Mono, click → copies to clipboard, toast `"Copied!"` animates in/out
- Three icon links: GitHub, LinkedIn, email — 48px touch targets, hover glow
- Full-section neon emerald radial glow background
- No contact form
- **Mobile**: text scales down, icons larger touch targets

### Footer
- Single line: `© 2026 Anshul Patel` left · `Built with Next.js + Framer Motion` right
- JetBrains Mono 0.7rem slate
- `border-top: 1px solid rgba(255,255,255,0.06)`

---

## Responsive Breakpoints

| Breakpoint | Behavior                                                           |
|------------|--------------------------------------------------------------------|
| `< 640px`  | Single column everywhere, fluid type via `clamp()`, no 3D tilt, no magnetic cursor, marquee rows reduced to 2 |
| `640–1024px` | 2-col grids, condensed hero (stacked), experience vertical        |
| `> 1024px` | Full split hero, horizontal experience scroll, bento grid, left-rail nav |

---

## Animation Performance

- All animations use CSS `transform` + `opacity` only (GPU-composited)
- `will-change: transform` on marquee tracks and tilt cards
- `prefers-reduced-motion` media query disables all motion — static layout only
- Framer Motion `LazyMotion` + `domAnimation` feature bundle to reduce bundle size

---

## Files Affected

All existing `src/components/` files are fully replaced. New files added:

| File | Purpose |
|------|---------|
| `src/components/Cursor.tsx` | Magnetic cursor system |
| `src/components/Marquee.tsx` | Reusable infinite marquee |
| `src/components/TiltCard.tsx` | Reusable 3D tilt wrapper |
| `src/components/ClipReveal.tsx` | Reusable clip-path wipe wrapper |
| `src/components/Navigation.tsx` | Left-rail nav (replaces current) |
| `src/components/Hero.tsx` | Split-screen hero (replaces current) |
| `src/components/About.tsx` | Full-bleed ink panel (replaces current) |
| `src/components/Experience.tsx` | Horizontal scroll timeline (replaces current) |
| `src/components/Projects.tsx` | Bento grid (replaces current) |
| `src/components/Skills.tsx` | Marquee tracks (replaces current) |
| `src/components/Education.tsx` | Typographic panel (replaces current) |
| `src/components/More.tsx` | Merged certs + hobbies strip (new) |
| `src/components/Contact.tsx` | Oversized CTA (replaces current) |
| `src/components/Footer.tsx` | Single-line footer (replaces current) |
| `src/app/globals.css` | New color tokens, typography, noise filter |
| `src/app/layout.tsx` | Add Space Grotesk + JetBrains Mono fonts |

Deleted: `src/components/ScrollProgress.tsx`, `src/components/Certifications.tsx`, `src/components/Hobbies.tsx`

---

## Success Criteria

- Lighthouse performance ≥ 90 on mobile
- All animations respect `prefers-reduced-motion`
- No horizontal overflow on any viewport
- Magnetic cursor disabled on touch devices
- All existing content (jobs, projects, skills, education) preserved — only presentation changes
