# SAIGOX — Cinematic Portfolio

A scroll-driven cinematic portfolio website for **Venkata Sai Goutham Vaddi** — Product Manager, Data Engineer, Wildlife Photographer.

## Quick Start

```bash
npm install
npm run dev        # → http://localhost:5173
npm run build      # → production build in /dist
```

## Tech Stack

| Layer       | Tech                                                    |
|-------------|---------------------------------------------------------|
| Framework   | React 18 + Vite 5                                       |
| Animation   | GSAP 3 (ScrollTrigger), Framer Motion                   |
| Scroll      | Lenis (smooth scroll)                                   |
| Icons       | lucide-react                                            |
| Fonts       | Outfit (display), Inter (body), Share Tech Mono (mono)  |
| State       | Zustand (minimal)                                       |
| Styling     | Vanilla CSS (design tokens in `tokens.css`)             |

## Architecture: Scene-Based

The site is built as a sequence of full-viewport **scenes**, each in `src/scenes/`:

```
Preloader.jsx       → Counter + loading bar
01_Intro.jsx        → Hero: "GOUTHAM" with warm orange glowing letters, particles
02_Identity.jsx     → Photo + bio + key stats
03_Arsenal.jsx      → 8 infographic metric tiles + 3 skill category groups + radar chart
04_Campaigns.jsx    → Career entries; company name as HERO, expandable details
04b_Credentials.jsx → Education (hero stat badges) + Awards (icon tiles with hover overlay)
05_Gallery.jsx      → Photography grid, category filters, lightbox
06_Signal.jsx       → Contact links (email, LinkedIn, phone)
```

**Scene flow** in `App.jsx`:
```
Intro → Identity → Arsenal → Campaigns → Credentials → Gallery → Signal
```

## Key Files

| File                     | Purpose                                                |
|--------------------------|--------------------------------------------------------|
| `src/App.jsx`            | Main layout — scene order + Lenis smooth scroll        |
| `src/App.css`            | All scene styles (~900 lines)                          |
| `src/design/tokens.css`  | CSS custom properties: colors, fonts, easing, glass    |
| `src/data/resume.js`     | **Single source of truth** — all resume content        |
| `src/data/imageManifest.js` | Photo gallery image paths + categories              |

## Design System (`tokens.css`)

- **Primary accent**: `#FF6B35` (warm orange) — used throughout
- **Void background**: `#04040a`
- **Glass card**: `rgba(255,255,255,0.03)` + `backdrop-filter: blur(16px)` + `border: 1px solid rgba(255,255,255,0.06)`
- **Fonts**: `--font-display` (Outfit), `--font-body` (Inter), `--font-mono` (Share Tech Mono)

## Resume Data (`resume.js` exports)

| Export           | Type     | Used By         |
|------------------|----------|-----------------|
| `identity`       | Object   | Identity, Signal|
| `experiences`    | Array[3] | Campaigns       |
| `education`      | Array[3] | Credentials     |
| `awards`         | Array[8] | Credentials     |
| `skillCategories`| Array[3] | Arsenal         |
| `characterStats` | Array[6] | Arsenal (radar) |
| `skills`         | Array    | (flat list)     |
| `loot`           | Array    | (legacy)        |

## GSAP Animation Rules

> **CRITICAL**: Never use `gsap.from({opacity: 0})` on inner elements. 
> ScrollTrigger may not fire in time, leaving elements permanently invisible.
> Only animate `y`, `scale`, `rotate` transforms. Keep content always visible.

## Legacy Code (not in active use)

These directories contain old code from a previous architecture. They are **not imported** by `App.jsx`:
- `src/acts/` — old Act I/II/III architecture
- `src/components/` — old component library
- `src/hooks/` — custom hooks (useCountUp, etc.)
- `src/hud/` — old navbar
- `src/store/` — Zustand store

They can be cleaned up or re-integrated as needed.

---

See `DEV_STATUS.md` for current status and next steps.
