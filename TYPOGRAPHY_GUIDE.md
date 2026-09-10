# Granules India — Typography & Design System Guide

> **Official Design System & Typography Memory for Antigravity & Developers**  
> This file documents the canonical typography scale, font tokens, component sizings, and layout rules for the Granules India website.

---

## 1. Font Family & Weights

- **Primary Font Family:** `'Manrope', Arial, sans-serif` (Loaded via `@fontsource/manrope`)
- **Loaded Weights:**
  - `400` (Regular / Normal)
  - `500` (Medium)
  - `600` (SemiBold)
  - `700` (Bold)
  - `800` (ExtraBold)

### Core Color Tokens
- **Text Primary:** `#3f3f3f` (Default body text)
- **Text Strong:** `#2a2a2a` (Headings & dark emphasis)
- **Text Secondary / Soft:** `#6a6a6a` / `var(--text-soft)` (Descriptions & subtitles)
- **Brand Blue:** `#0061f8` (Primary brand color)
- **Brand Green:** `#00c21c` / `#28a745` (Sustainability accents)

---

## 2. Global Typography Design Tokens (`src/typography.css`)

| Token | Clamp / Pixel Size | Line Height | Weight | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `--fs-display` | `clamp(38px, 3.1vw, 56px)` | `1.18` | `700` | Large Hero Displays |
| `--fs-page-title` | `clamp(34px, 2.8vw, 52px)` | `1.20` | `700` | Page Titles (`h1`) |
| `--fs-section` | `clamp(26px, 2.3vw, 44px)` | `1.20` | `700` | Main Section Headings (`h2`) |
| `--fs-feature` | `clamp(20px, 1.8vw, 30px)` | `1.35` | `700` | Featured Highlights |
| `--fs-subsection` | `clamp(18px, 1.4vw, 24px)` | `1.30` | `700` | Subsection Headings (`h3`) |
| `--fs-card` | `20px` (desktop) / `18px` (mobile) | `1.40` | `700` | Cards & Small Headers (`h4`) |
| `--fs-intro` | `clamp(16px, 1.1vw, 20px)` | `1.55` | `500` | Introductory paragraphs |
| `--fs-body-lg` | `clamp(16px, 1.05vw, 18px)` | `1.55` | `500` | Prominent body copy |
| `--fs-body` | `16px` (desktop) / `14px` (mobile) | `1.55` | `400` | Standard body (`p`, `li`) |
| `--fs-body-sm` | `14px` | `1.50` | `400` | Captions, footnotes, table subtext |
| `--fs-nav` | `16px` | `1.55` | `500`–`600` | Navigation menu items |
| `--fs-button` | `16px` | `1.50` | `700` | Buttons and primary links |
| `--fs-badge` | `13.5px`–`14px` | `1.60` | `700` | Tags & section pills (`.tag`) |
| `--fs-meta` | `14px` | `1.40` | `500` | Metadata and dates |
| `--fs-breadcrumb`| `13.5px` | `1.40` | `600` | Breadcrumbs |

---

## 3. Letter Spacing (Tracking)

- **Page Titles (`h1`):** `-0.3px` (`--track-page-title`)
- **Section Headings (`h2`):** `-0.5px` (`--track-section`)
- **Body & Copy (`p`, `h4` desc):** `-0.2px` / `0.01em` (`--track-body`)
- **Buttons (`button`, `.button`):** `+0.2px` / `0.8px` (`--track-button`)
- **Badges & Tags (`.tag`, `.badge`):** `+1px` / `0.1em` (`--track-badge`)

---

## 4. Homepage Section Rules (`src/styles.css` & `src/pages/HomePage.jsx`)

### A. Section Descriptions / Sub-copy (`<h4>`)
All primary section descriptions on the Homepage use **`<h4>`** semantic elements styled as clean, readable non-bold text:
- **Selectors:** `.about-copy h4`, `.section-heading h4`, `.sustainability-copy h4`
- **Font Size:** `clamp(18px, 1.3vw, 22px) !important`
- **Font Weight:** `400 !important` (Regular, not bold)
- **Line Height:** `1.5 !important`
- **Color:** `var(--text-soft)` / `#6a6a6a` (White `#ffffff` in Sustainability)

### B. About Us Section
- **Heading (`h2`):** `clamp(34px, 2.6vw, 48px)`, weight `700`, line-height `1.15`, color `#070707`
- **Stats Numbers:** `clamp(38px, 3.2vw, 48px)`, weight `500`, line-height `1.0`, color `#0061f8`
- **Stats Labels:** `clamp(11px, 0.85vw, 12px)`, weight `600`, line-height `1.35`, uppercase, letter-spacing `0.4px`

### C. Business Verticals Section
- **Heading (`h2`):** `clamp(34px, 2.6vw, 48px)`, weight `700`
- **Product Card Title:** `21px`, weight `700`
- **Product Card Body:** `15.5px`, weight `400`, line-height `1.45`
- **Card Sizing:** `height: 520px !important; border-radius: 40px !important;`

### D. Our Presence (World Map)
- **Heading (`h2`):** `clamp(30px, 2.65vw, 50px)`, weight `700`, color `var(--deep-blue)`
- **Map Wrap Offset:** `inset: 220px 0 95px` (desktop) / `inset: 200px 0 200px` (mobile) — ensures text never overlaps the world map.
- **Section Bounds:** `min-height: 760px; height: clamp(760px, 100vh, 920px);`
- **Tab Buttons:** `min-height: 54px; font-size: 15px; font-weight: 700;`

### E. Regulatory Credentials
- **Heading (`h2`):** `clamp(29px, 2.08vw, 40px)`, weight `700`, max-width `1092px`
- **Logos:** `height: 52px; max-width: 150px;` infinite seamless marquee

### F. Sustainability Card
- **Container Size:** `min-height: 600px; border-radius: 40px; padding: 60px 80px; gap: 60px;`
- **Heading (`h2`):** `clamp(28px, 2.2vw, 40px)`, weight `700`
- **Accordion Header:** `font-size: 22px` (closed) / `26px` (open), weight `700`
- **Accordion Body:** `font-size: 15.5px`, weight `400`

### G. Careers CTA Banner
- **Container Size:** `min-height: 250px; border-radius: 28px; padding: 32px 60px;`
- **Heading (`h2`):** `clamp(28px, 2.2vw, 36px)`, weight `700`
- **Description (`p`):** `clamp(14.5px, 1.05vw, 16px)`, weight `400`

---

## 5. Layout & Spacing Rules

1. **Global Shell Container (`var(--shell)` / `.shell`):**
   - Width: `min(85%, 1632px) !important;`
   - Centering: `margin-inline: auto !important;`
2. **Section-to-Section Vertical Gaps:**
   - Standard gap between all consecutive sections: **`75px`** (applied via `margin-top: 75px` or `padding-top: 75px`).
   - Default `.section` has `padding-block: 0` to prevent unintended compound margins.
3. **Divider Lines:**
   - Decorative horizontal dividing lines have been removed on Homepage, Sustainability, and Community pages (`.section.ruled { border-top: none !important; }`).

---

## 6. Guidelines for Future AI & Human Contributors

- Always import and rely on design tokens defined in `src/typography.css`.
- When adding section subtitles or description copy, use `<h4>` with `font-weight: 400` and `clamp(18px, 1.3vw, 22px)`.
- Maintain the **85% shell width** standard across all subpages.
- Maintain the **75px section spacing** standard when adding or editing sections.
