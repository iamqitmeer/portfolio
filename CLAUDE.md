# Portfolio — Qitmeer Raza

Next.js 13 (app router, server actions) + Tailwind + GSAP. All content lives in `lib/data.ts`.

## Design language: Augere Labs brand (https://augerelabs.com)

The site deliberately shares the Augere Labs visual identity. Keep it that way.

- Use the project skills in `.claude/skills/`: `frontend-design` and `impeccable` for UI work, `gsap-*` for animation.
- Colors only via the tokens in `app/globals.css`: `ink` #0c0b12, `raised` #15131d, `paper` #f2effa, `dim`, `faint`, `lilac` #dad1f9, `lilac-deep` #8f7fe0, `signal` #ffb547 (amber, used sparingly for "live"/accent dots). Dark only.
- Type: Bricolage Grotesque (`font-brand`, headings, bold with tight tracking), Geist (body), Geist Mono (dates/small data only). Self-hosted via `@fontsource-variable/*`.
- Components: `.btn-primary` (lilac pill), `.btn-ghost`, `.panel` (20px radius, hairline border), `SectionHead` (big heading left, short aside right).
- Pages: `/` (home), `/about`, `/journey` (pinned horizontal chapters on desktop), custom 404. Shared: `PageHero`, `SectionHead`, `Contact`, `Footer`.
- Social image: `public/og.png` (rendered from HTML with the brand fonts; regenerate if the headline changes).
- Motion (GSAP, always `useGSAP` with a `scope`, wrapped in `gsap.matchMedia()` for reduced motion):
  hero word reveal + "an early idea" outline-to-fill sweep on scroll, orbit + cycling ventures card, career rail fill,
  manifesto word-light scrub, case-study frame unclip + parallax, practice panel swap, velocity marquee,
  experience Gantt bars + row lines, journey pinned horizontal scroll, footer name reveal + pointer spotlight,
  nav sliding pill + mobile menu sheet.
  Don't add generic fade-up entrances to every section.
- 3D: `components/hero-scene.tsx` (plain three.js, loaded with next/dynamic, ssr:false). Particles morph cloud -> orbits on the same scroll range (+=320) as the headline fill. Pauses off-screen, static frame for reduced motion.
- Framer Motion is used only for interaction: `components/fx.tsx` (Magnetic, Tilt, Cursor), experience accordion + tooltip. Scroll-driven motion stays in GSAP.
- Don't invent metrics or claims; only use facts from the LinkedIn profile in `lib/data.ts`.
