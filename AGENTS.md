# Antigravity Rules & Knowledge: Granules India Website

## 1. Typography Standards
- **Font Family:** `'Manrope', Arial, sans-serif` (always loaded via `@fontsource/manrope`).
- **Global Tokens (`src/typography.css`):**
  - Display/Hero: `clamp(38px, 3.1vw, 56px)` (700)
  - Page Title (`h1`): `clamp(34px, 2.8vw, 52px)` (700)
  - Section Heading (`h2`): `clamp(26px, 2.3vw, 44px)` (700)
  - Card Heading (`h4, h5, h6`): `20px` (700)
  - Section Subtitle / Copy (`<h4>` in `.about-copy`, `.section-heading`, `.sustainability-copy`):
    - `font-size: clamp(18px, 1.3vw, 22px) !important;`
    - `font-weight: 400 !important;` (Regular / non-bold)
    - `line-height: 1.5 !important;`
  - Body Text (`p, li`): `16px` desktop / `14px` mobile (400)
  - Navigation: `16px` (600)
  - Buttons (`.button`): `16px` or `13.5px` (700)
  - Badges / Tags (`.tag`): `14px` (700)

## 2. Layout & Container Rules
- **Container Shell:** Always use `min(85%, 1632px)` centered with `margin-inline: auto` (`.shell`, `.cp-shell`, `var(--shell)`).
- **Section Spacing:** Exactly `75px` vertical gap between sections across Homepage, Sustainability, and Community pages (`margin-top: 75px` or `padding-top: 75px`).
- **Divider Lines:** Keep divider lines removed on Homepage, Sustainability, and Community pages.
- **Sustainability Card:** Height locked at `min-height: 600px` with `60px 80px` padding and `40px` border-radius.
- **Careers Banner:** Height locked at `min-height: 250px` with `32px 60px` padding and `28px` border-radius.
- **Presence Map:** `.map-wrap` must maintain `inset: 220px 0 95px` to prevent text from overlapping the world map graphic.

## 3. Reference
- Full design guide: `TYPOGRAPHY_GUIDE.md`
- Token definition file: `src/typography.css`
