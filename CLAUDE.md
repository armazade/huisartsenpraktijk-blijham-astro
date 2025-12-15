# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dutch general practitioner (huisarts) website for "Huisartsenpraktijk Blijham". All content and UI must be in Dutch. The site serves elderly patients, so accessibility is critical.

## Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build for production to ./dist/
npm run preview  # Preview production build locally
```

## Tech Stack

- **Framework:** Astro 5.x (static site generation)
- **Styling:** Tailwind CSS 4.x with @tailwindcss/vite plugin
- **Typography:** DM Sans from Google Fonts
- **Maps:** Leaflet.js with OpenStreetMap (no API key)
- **Analytics:** Plausible Analytics
- **Forms:** Web3Forms for email notifications (requires `WEB3FORMS_ACCESS_KEY` env var)

## Architecture

### Directory Structure

```
src/
├── components/
│   ├── layout/          # Layout.astro (main), Header, Footer, Navigation, Sidebar
│   ├── accessibility/   # AccessibilityPanel, AccessibilityToggle, SkipToContent
│   ├── ui/              # Button, Card, Breadcrumbs, SearchBar
│   ├── content/         # StaffCard, NewsCard, EmergencyTable, ContactBlock
│   ├── forms/           # PrescriptionForm (multi-step), FormProgress
│   ├── CookieConsent.astro
│   └── Map.astro
├── pages/               # 16 Dutch-language pages (file-based routing)
├── data/                # JSON data files (contact.json, navigation.json, staff.json)
├── scripts/             # TypeScript for accessibility.ts, prescription-form.ts
└── styles/              # global.css with Tailwind @theme config
```

### Key Patterns

- **Layout:** `Layout.astro` wraps all pages with Header, Footer, optional Sidebar. Use `fullWidth={true}` for pages with custom hero sections.
- **Data:** Static JSON in `src/data/` imported directly into components
- **Styling:** Tailwind CSS 4 with CSS variables in `global.css` using `@theme` directive
- **Accessibility preferences:** Stored in localStorage, applied immediately via inline script in Layout head

### Component Conventions

- All components are `.astro` files (no React/Vue)
- Props defined with TypeScript interfaces in frontmatter
- Phone numbers use `tel:` links
- External links use `target="_blank" rel="noopener"`

## Design System (Mantelzorg-inspired)

### Color Palette

The design uses a soft, professional healthcare palette inspired by mantelzorg.nl:

```css
/* Primary - Deep Navy (text, headings) */
--color-navy: #111645
--color-navy-light: rgba(17, 22, 69, 0.65)  /* secondary text */
--color-navy-lighter: rgba(17, 22, 69, 0.15) /* borders */

/* Interactive Blue (links, secondary actions) */
--color-blue: #2170CA
--color-blue-light: #e8f1fa

/* Accent Purple (primary CTAs, important actions) */
--color-purple: #6E2473
--color-purple-light: #f5e8f6

/* Sage Green (success, positive actions) */
--color-sage: #5B7826
--color-sage-light: #f0f4e8

/* Backgrounds */
--color-bg-soft: #F3F7FA  /* section backgrounds */
--color-bg-white: #FFFFFF

/* Warning/Danger */
--color-warning: #d97706
--color-danger: #dc2626
```

### Typography

- **Font:** DM Sans (Google Fonts) - weights 300, 400, 500, 600, 700
- **Body text:** font-weight-medium (500), color-navy
- **Secondary text:** font-weight-light (300), color-navy-light
- **Headings:** font-weight-bold (700), color-navy

### Button Variants

Use the Button component with these variants:
- `primary` (default): Purple background, white text - for main CTAs
- `secondary`: Soft gray background - for secondary actions
- `blue`: Blue background - for informational actions
- `outline`: Navy border, transparent - for tertiary actions
- `sage`: Green background - for positive/success actions

Sizes: `sm`, `md` (default), `lg`

### Card Variants

Use the Card component with these variants:
- `default`: White background
- `soft`: Soft blue-gray background (#F3F7FA)
- `purple`: Light purple background
- `blue`: Light blue background
- `sage`: Light green background
- `warning`: Yellow background with left border

Props: `shadow`, `hover`, `padding` (none/sm/md/lg)

### Icon Wrappers

Use these utility classes for consistent icon presentation:
- `.icon-wrapper-purple`: Purple light background with purple icon
- `.icon-wrapper-blue`: Blue light background with blue icon
- `.icon-wrapper-sage`: Green light background with green icon

### Spacing & Layout

- **Container max-width:** 1288px (`max-w-7xl`)
- **Section padding:** 4rem vertical (`section-padding` class)
- **Card padding:** 1.5rem default
- **Border radius:** 0.75rem for cards, 1.5rem for buttons (pill shape)

## Accessibility Requirements

This site targets elderly users. Follow these patterns:

- Base font size: 16px (1rem) with 1.6 line-height
- Minimum click targets: 48x48px
- Focus outlines: 3px solid blue
- High contrast mode: Toggle via `html.high-contrast` class
- Font size scaling: CSS variable `--accessibility-font-size` (100-150%)
- Skip-to-content link visible on focus

## Form Handling

The prescription form (`/herhaalrecepten`) is a 4-step wizard:
1. Personal details (Persoonsgegevens)
2. Address (Adresgegevens)
3. Medications (Medicijnen) - dynamic list
4. Summary (Samenvatting) - review and submit

Logic is in `src/scripts/prescription-form.ts`. Form state persists during navigation between steps.

## Key CSS Classes

```css
/* Buttons */
.btn .btn-primary .btn-sm    /* Purple button, small */
.btn .btn-blue .btn-md       /* Blue button, medium */
.btn .btn-outline .btn-lg    /* Outline button, large */

/* Cards */
.card .card-shadow           /* White card with shadow */
.card .card-soft             /* Soft background card */
.card .card-hover            /* Adds hover effect */

/* Layout */
.hero                        /* Hero section styling */
.section-soft                /* Soft background section */
.divider                     /* Horizontal divider */

/* Utilities */
.icon-wrapper-purple         /* Icon container */
.badge .badge-purple         /* Small badge/tag */
```
