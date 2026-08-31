# Granules India — Corporate Web Application

A modern, high-performance, responsive web application for **Granules India Limited**, built with **React 19**, **TypeScript**, **Vite**, **React Router v7**, and a **Vanilla CSS Design System**.

---

## 🚀 Quick Start & Installation

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Locally in Development
```bash
npm run dev
```
The application will be live at `http://127.0.0.1:5174/` (or `http://localhost:5173/`).

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Bundle
```bash
npm run preview
```

### 6. Typecheck Verification
```bash
npx tsc --noEmit
```

---

## 🛠️ Technology Stack

- **Core Framework**: React 19 (`react`, `react-dom`)
- **Language**: TypeScript (`.tsx`, `.ts`) with strict type safety
- **Routing**: React Router DOM v7 (`react-router-dom`)
- **Styling**: Modular Vanilla CSS with responsive design tokens, CSS grid/flexbox, glassmorphism, and micro-interactions
- **Typography**: `@fontsource/manrope` (400, 500, 600, 700, 800 weights)
- **Build Tool**: Vite 7 with ESNext bundling and asset optimization

---

## 📁 Project Structure

```
granules-india-website-main/
├── public/                     # Static assets (images, logos, SVG icons, videos)
│   └── assets/                 # Page-specific media folders (contact, career, media, etc.)
├── src/
│   ├── components/             # Reusable global components
│   │   └── company/            # Navigation, Footer, Constants, Types, and Mega-Menu
│   │       ├── NavBar.tsx      # Sticky Mega-Menu Navigation Bar
│   │       ├── CompanyFooter.tsx # Universal 4-column gradient Footer
│   │       ├── company.css     # Shared layout, grid, and navigation styles
│   │       ├── data.ts         # Navigation and directory data structures
│   │       └── types.ts        # TypeScript interfaces
│   ├── hooks/                  # Custom React hooks
│   │   └── useSwipeScroll.ts   # Touch/mouse drag carousel scroll controller
│   ├── pages/                  # 28 application pages & dedicated stylesheets
│   │   ├── HomePage.jsx        # Interactive corporate home page
│   │   ├── CompanyPage.tsx     # Corporate overview & subsidiary directory
│   │   ├── MilestonePage.tsx   # Interactive 1984–2025 timeline
│   │   ├── AwardsPage.tsx      # Categorized honors & awards catalog
│   │   ├── LeadershipPage.tsx  # Board of Directors & executive management
│   │   ├── GranulesCzroPage.tsx # Decarbonization & net-zero initiative
│   │   ├── AscelisPeptidesPage.tsx # Peptides & Swiss CDMO synthesis
│   │   ├── GranulesLifeSciencesPage.tsx # OSD & Life Sciences manufacturing
│   │   ├── OperationalExcellencePage.tsx # Lean Six Sigma & belt training
│   │   ├── FacilitiesPage.tsx  # Global manufacturing facilities directory
│   │   ├── ApiPage.tsx         # Active Pharmaceutical Ingredients portfolio
│   │   ├── PfiPage.tsx         # Pharmaceutical Formulation Intermediates
│   │   ├── FdPage.tsx          # Finished Dosages portfolio
│   │   ├── RdPage.tsx          # R&D pipelines and innovation labs
│   │   ├── QualityCompliancePage.tsx # Global QA standards & certifications
│   │   ├── PeptidesPage.tsx    # Therapeutic & cosmetic peptides
│   │   ├── SustainabilityOverviewPage.tsx # ESG framework & pillars
│   │   ├── SustainabilityStrategyPage.tsx # Decarbonization roadmap
│   │   ├── EsgInActionPage.tsx # ESG initiatives in action
│   │   ├── CommunityPage.tsx   # CSR & community outreach programs
│   │   ├── InvestorOverviewPage.tsx # Financial highlights & investor dashboard
│   │   ├── InvestorOverviewV2Page.tsx # Interactive investor metrics
│   │   ├── InvestorAnnualReportsPage.tsx # Filterable annual reports & filings
│   │   ├── MediaPage.tsx       # Press releases, coverage & media kit
│   │   ├── CareerOverviewPage.tsx # Careers overview & testimonials
│   │   ├── LifeAtGranulesPage.tsx # Culture, growth & statistics grid
│   │   ├── CareerOpportunitiesPage.tsx # Job openings & equal-width filter bar
│   │   └── ContactPage.tsx     # Redesigned Contact Us page
│   ├── main.jsx                # Application root, routing table & scroll manager
│   ├── styles.css              # Global styles, variables, typography & resets
│   └── vite-env.d.ts           # Ambient type declarations for assets and CSS
├── index.html                  # HTML entry template
├── package.json                # Project scripts and dependencies
├── tsconfig.json               # TypeScript compiler configuration
└── vite.config.js              # Vite build and dev server configuration
```

---

## 🌐 Complete Route Directory (28 Pages)

| Route Path | Page Component | Description |
| :--- | :--- | :--- |
| `/` | `HomePage` | Corporate introduction, pillars, stats counter, video banner, and tabs. |
| `/company` | `CompanyPage` | Overview, purpose/vision stacking panels, core values, and subsidiaries. |
| `/company/milestone` | `MilestonePage` | Chronological 1984–2025 growth timeline with milestone images. |
| `/company/awards` | `AwardsPage` | Category-filtered awards (Leadership, Sustainability, Innovation). |
| `/company/leadership` | `LeadershipPage` | Executive leadership profiles and Board of Directors directory. |
| `/company/granules-czro` | `GranulesCzroPage` | Net-zero green chemistry and Kakinada green pharma zone. |
| `/company/ascelis-peptides` | `AscelisPeptidesPage` | Peptide synthesis platform and Swiss CDMO infrastructure. |
| `/company/granules-life-sciences` | `GranulesLifeSciencesPage` | High-throughput OSD manufacturing and automated facilities. |
| `/company/operational-excellence` | `OperationalExcellencePage` | Lean Six Sigma belt framework and frontline Gemba management. |
| `/company/facilities` | `FacilitiesPage` | Global manufacturing & R&D facilities with India/USA filtering. |
| `/business/api` | `ApiPage` | Active Pharmaceutical Ingredients portfolio and global capacity. |
| `/business/pfi` | `PfiPage` | Pharmaceutical Formulation Intermediates scale and benefits. |
| `/business/fd` | `FdPage` | Finished Dosages portfolio (tablets, capsules, multi-unit pellets). |
| `/business/rd` | `RdPage` | R&D innovation pipeline, synthesis chemistry, and laboratories. |
| `/business/quality-compliance` | `QualityCompliancePage` | Global regulatory compliance and quality management systems. |
| `/business/peptides` | `PeptidesPage` | Therapeutic, cosmetic, and diagnostic peptide platforms. |
| `/sustainability` | `SustainabilityOverviewPage` | Environmental, social, and governance overview. |
| `/sustainability/strategy` | `SustainabilityStrategyPage` | Net-zero roadmap and sustainability strategy. |
| `/sustainability/esg-in-action` | `EsgInActionPage` | Active ESG initiatives, carbon mitigation, and resource circularity. |
| `/sustainability/esg-in-action/community` | `CommunityPage` | CSR, education, healthcare, and community empowerment. |
| `/investor` | `InvestorOverviewPage` | Investor relations, stock price card, and financial highlights. |
| `/investor/v2` | `InvestorOverviewV2Page` | Interactive quarterly results and investor metrics dashboard. |
| `/investor/annual-reports` | `InvestorAnnualReportsPage` | Downloadable integrated annual reports and statutory filings. |
| `/media` | `MediaPage` | Press releases, corporate news, and interactive downloadable media kit. |
| `/careers` | `CareerOverviewPage` | Career opportunities overview, talent programs, and values. |
| `/careers/life-at-granules` | `LifeAtGranulesPage` | Employee life, diversity, training, and full-width statistics grid. |
| `/careers/opportunities` | `CareerOpportunitiesPage` | 4-dropdown filter bar (Designation, Department, Level, Location) & job table. |
| `/contact` | `ContactPage` | Minimalist Contact page with floating form, directory tabs, and adverse reporting. |

---

## 🧩 Key Components & Features

### 1. **Navigation Mega-Menu (`NavBar.tsx`)**
- Responsive navigation bar with glassmorphism effect.
- Dropdown mega-menus for `About Us`, `Business`, `Sustainability`, `Investor`, `Media`, `Careers`, and `Contact`.
- Includes diagonal arrow links, thumbnail previews, live search modal trigger, and mobile drawer.

### 2. **Universal Footer (`CompanyFooter.tsx`)**
- 4-column gradient footer (`#0088a3` → `#006ef7` → `#0045cc`).
- Comprehensive product links, company links, copyright notices, and social links with hover micro-animations.

### 3. **Career Opportunities Filter System (`CareerOpportunitiesPage.tsx`)**
- 4 equal-width stretched dropdown filters: **Designation**, **Department**, **Level**, and **Location**.
- Real-time job filtering across all dimensions.
- Modal job application workflow with custom form validation.

### 4. **Life at Granules Statistics (`LifeAtGranulesPage.tsx`)**
- Full-width stretched stat drawer cards (`width: 85% !important; max-width: 85% !important;`).
- Hover-expandable drawer panels revealing workforce statistics and growth programs.

### 5. **Contact Us Page (`ContactPage.tsx`)**
- **Hero & Floating Form**: Laboratory scientist background photo paired with a floating white contact form.
- **Directory**: Interactive tabs (`KEY CONTACTS`, `BUSINESS CONTACTS`, `INVESTOR RELATION CONTACT`) with address details and direct contact action pills.
- **Enquiry Blocks**: Divider-separated blocks for *General Enquiries* and *Media Enquiries*.
- **Adverse Event Reporting**: Dedicated soft blue card container with toll-free phone and safety email pills.
- **Social Media Follow**: Extra-large circular buttons featuring a vibrant **emerald green → cyan → blue** gradient hover overlay animation.

### 6. **Media Kit Downloads (`MediaPage.tsx`)**
- 4 clean interactive cards (*Logos*, *Leadership*, *Offices Images*, *Videos*) with mouse-hover elevation and blue accent transitions.

### 7. **Touch & Mouse Swipe Navigation (`useSwipeScroll.ts`)**
- Custom reusable hook providing touch-drag and mouse-swipe horizontal scrolling with dynamic progress indicators for carousel components.

---

## 🔧 Changes, Fixes & Optimizations Implemented

1. **Contact Us Page Redesign**:
   - Implemented exact reference design layout with floating white card, tabbed directory, adverse reporting, and gradient social buttons.
2. **Career Opportunities Filter Bar**:
   - Refactored all 4 dropdown selectors (`DESIGNATION`, `DEPARTMENT`, `LEVEL`, `LOCATION`) with `flex: 1 1 0` equal-width styling.
3. **85% Container Layout Consistency**:
   - Standardized container side margins across all company sub-pages (`ascelis`, `awards`, `czro`, `facilities`, `gls`, `leadership`, `milestone`, `operational-excellence`).
4. **Media Kit Hover Interactions**:
   - Removed permanent default active borders; styled cards to trigger blue elevation and icon transformation on mouse hover.
5. **Route & Link Normalization**:
   - Replaced all hash navigation targets (`/#careers`, `/#footer`, `/#business`) with valid client-side React Router `<Link>` routes.
6. **Code Quality & Build Health**:
   - Added `vite-env.d.ts` for ambient CSS and asset declarations.
   - Verified 100% clean TypeScript typecheck (`npx tsc --noEmit` exited with code 0).
   - Verified production build (`npm run build` completed with 0 errors / 0 warnings).
   - Validated all 28 routes returning `200 OK`.

---

## 📄 License

Copyright © 2025 **Granules India Limited**. All rights reserved.
