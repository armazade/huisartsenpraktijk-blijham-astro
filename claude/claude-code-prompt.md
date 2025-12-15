# Claude Code Project Prompt: Huisartsenpraktijk Blijham Website

## Project Context

You are building a complete replacement website for a Dutch general practitioner's (huisarts) practice called "Huisartsenpraktijk Blijham". The current website is at https://huisartsenpraktijkblijham.uwartsonline.nl/ and you need to replicate ALL functionality with modern technology.

## Technical Stack

- **Framework:** Astro (latest version)
- **Styling:** Tailwind CSS
- **Forms:** Web3Forms (free tier) for email notifications
- **Maps:** OpenStreetMap with Leaflet.js (no API key needed)
- **Analytics:** Plausible Analytics (script integration)
- **Hosting target:** Cloudflare Pages or Netlify
- **Language:** All content and UI in Dutch

## Project Requirements

### 1. Accessibility (CRITICAL - Elderly Users)

This website serves elderly patients. Implement these accessibility features:

- **Default font size:** 18px base with 1.6 line-height
- **Accessibility panel** (top right corner):
  - Contrast toggle (normal / high contrast mode)
  - Text size slider (100% to 150%)
  - Store preferences in localStorage
- **Focus states:** Visible 3px outline on all interactive elements
- **Skip to content:** Hidden link, visible on focus
- **Click targets:** Minimum 48x48px for all buttons and links
- **WCAG 2.1 AA compliance**

### 2. Site Structure (17 Pages)

Create these pages with Dutch URLs:

```
/                                    → Homepage
/team                               → Medewerkers (Staff)
/doktersassistente                  → Doctor's Assistant info
/praktijkondersteuner-somatiek      → POH Somatic info
/praktijkondersteuner-ggz           → POH Mental Health info
/apotheek                           → Pharmacy info
/afwezigheid-en-vakanties          → Absence & Holidays
/routebeschrijving                  → Route/Directions with map
/klachtenregeling                   → Complaints procedure
/afspraak-maken                     → Make Appointment info
/nieuws                             → News (external feed)
/thuisarts-nieuws                   → Thuisarts.nl news feed
/geneesmiddelen-mee-op-reis        → Medicines for travel
/herhaalrecepten                    → Repeat Prescription Form (4-step)
/privacy                            → Privacy Policy
/voorwaarden                        → Terms & Conditions
```

### 3. Layout Components

#### Header
- Logo/Practice name: "Huisartsenpraktijk Blijham"
- Address: Raadhuisstraat 28, 9697 PR Blijham
- Phone (clickable): 0597-561385
- Accessibility settings button (gear icon)
- Search bar

#### Navigation (responsive)
```
- Home
- Praktijkinformatie (dropdown)
  - Medewerkers
  - Doktersassistente
  - PraktijkOndersteuner Huisarts somatiek
  - PraktijkOndersteuner Huisarts GGZ
  - Apotheek
  - Afwezigheid en vakanties
  - Routebeschrijving
  - Klachtenregeling
- Afspraak maken
- Gezondheidsinformatie (dropdown)
  - Thuisarts nieuws
  - Geneesmiddelen mee op reis
- Herhaalreceptenformulier
```

Mobile: Hamburger menu with slide-out navigation

#### Sidebar (right side on desktop, below content on mobile)
- Address block with phone link
- "Ik geef toestemming" info block with link to ikgeeftoestemming.nl
- Latest 5 news items

#### Footer
- Links to Uw Zorg Online (uwzorgonline.nl)
- Privacy link
- Voorwaarden link
- Copyright

### 4. Homepage Content

Include these sections:
1. **Welcome message** with practice introduction
2. **Emergency numbers table:**
   - 112 for life-threatening
   - 088-3301330 (DokNoord after 17:00)
   - 0597-561385 (Practice line with options 1-5)
   - Pharmacy: 0599-792005
   - Email: assistenteblijham@ezorg.nl
3. **Quick links:** Coronavirus info, Afspraak maken, Herhaalrecepten
4. **Important announcements** (e.g., holiday closures, pause times)
5. **LSP/VZVZ information** about medical data sharing
6. **Medication repeat instructions** via Service Apotheek App

### 5. Staff Page (/team)

Display staff members as cards with:
- Photo (use placeholder SVG silhouettes for now)
- Name
- Role (Huisarts, Doktersassistente, POH somatiek, POH GGZ, etc.)
- Available days (e.g., "Ma Wo Vr")
- Link to individual profile (optional)

Staff data (store in /src/data/staff.json):
```json
[
  {"name": "M. Khodadadzade", "role": "Huisarts", "days": "Ma Wo Vr", "gender": "unknown"},
  {"name": "V. Kalustova", "role": "Huisarts", "days": "Di Do", "gender": "unknown"},
  {"name": "Annemarie Borgeld", "role": "Doktersassistente", "days": null, "gender": "female"},
  {"name": "Wieka Meijer", "role": "Doktersassistente", "days": null, "gender": "female"},
  {"name": "Diana Drenth", "role": "Doktersassistente", "days": null, "gender": "female"},
  {"name": "Michelle Grafthuis", "role": "Doktersassistente", "days": null, "gender": "female"},
  {"name": "Erick Hilger", "role": "POH somatiek", "days": "Ma Do", "gender": "male"},
  {"name": "Marcel Flikkema", "role": "POH GGZ", "days": "Di", "gender": "male"},
  {"name": "Suzanne Sterenborg", "role": "Stagiaire doktersassistente", "days": null, "gender": "female"},
  {"name": "Ineke Wijnholds", "role": "Medewerker uitdeelpost", "days": null, "gender": "female"}
]
```

### 6. Repeat Prescription Form (CRITICAL - 4 Steps)

Create a multi-step form at `/herhaalrecepten`:

**Step 1: Persoonsgegevens (Personal Details)**
- Voorletters (initials)
- Voornaam (first name)
- Tussenvoegsel (prefix, optional)
- Achternaam* (last name, required)
- Geboorteplaats (birthplace)
- Geboortedatum* (DOB with day/month/year dropdowns, required)
- Geslacht* (gender: Man/Vrouw/Anders, required)

**Step 2: Adresgegevens (Address)**
- Straatnaam (street)
- Huisnummer (house number)
- Postcode (format: 1234AB)
- Woonplaats (city)
- Mobiel nummer (mobile)
- Telefoonnummer (landline, format: 0123456789)
- E-mailadres* (email, required)

**Step 3: Medicijnen (Medications)**
- Dynamic list of medications, each with:
  - Naam Medicijn* (medication name, required)
  - Gebruik per dag* (daily usage, required)
  - Sterkte* (strength, required)
- "Medicijn toevoegen" button to add more
- "Medicijn verwijderen" button for each item
- Naam apotheek* (pharmacy name, required)
- Opmerkingen (comments, textarea)
- Bezorgen* (delivery: Ja/Nee radio buttons, required)

**Step 4: Samenvatting (Summary)**
- Display all entered data organized by section
- "Wijzigen" buttons to go back to each section
- Privacy consent checkbox with link to privacy page
- Akkoord checkbox (required)
- Submit button "Aanvragen"

**Form behavior:**
- Client-side validation with Dutch error messages
- Previous/Next buttons for navigation
- Progress indicator showing current step
- On submit: Send email via Web3Forms to practice email
- Show success message after submission
- Store form state to prevent data loss on navigation

### 7. News Integration

#### /nieuws page
Fetch and display news from Nationale Zorggids. Since direct RSS might have CORS issues, fetch at build time using Astro's data fetching.

Each news item shows:
- Title
- Publication date
- Short description
- "Lees verder" link to external source

#### /thuisarts-nieuws page
Fetch from Thuisarts.nl RSS feed at build time.

### 8. Cookie Consent Banner

GDPR-compliant cookie banner with:
- Title: "Cookieverklaring"
- Description text about functional and analytical cookies
- Three buttons:
  - "Alles accepteren" (accept all)
  - "Alles weigeren" (reject all)
  - "Zelf instellen" (link to privacy page cookie section)
- Store preference in localStorage
- Don't show banner again if preference is set

### 9. OpenStreetMap Integration

On /routebeschrijving page:
- Embed Leaflet.js map
- Center on: Raadhuisstraat 28, 9697 PR Blijham
- Coordinates: approximately 53.1747, 7.0456
- Add marker with popup showing practice name and address

### 10. Search Functionality

Simple client-side search that:
- Searches through all page titles and content
- Shows results in a dropdown
- Navigates to selected page

### 11. Data Files

Create these JSON files in /src/data/:

**contact.json:**
```json
{
  "name": "Huisartsenpraktijk Blijham",
  "address": {
    "street": "Raadhuisstraat 28",
    "postal": "9697 PR",
    "city": "Blijham"
  },
  "phone": "0597-561385",
  "email": "assistenteblijham@ezorg.nl",
  "emergency": {
    "lifeThreatening": "112",
    "doknoord": "088-3301330",
    "pharmacy": "0599-792005"
  },
  "hours": {
    "appointments": "08:00-10:00 en 13:00-14:00",
    "break": "10:30-11:00 en 12:00-13:00",
    "pharmacyPickup": "14:30-17:00"
  }
}
```

**navigation.json:**
```json
{
  "main": [
    {"label": "Home", "href": "/"},
    {
      "label": "Praktijkinformatie",
      "href": "/team",
      "children": [
        {"label": "Medewerkers", "href": "/team"},
        {"label": "Doktersassistente", "href": "/doktersassistente"},
        {"label": "PraktijkOndersteuner Huisarts somatiek", "href": "/praktijkondersteuner-somatiek"},
        {"label": "PraktijkOndersteuner Huisarts GGZ", "href": "/praktijkondersteuner-ggz"},
        {"label": "Apotheek", "href": "/apotheek"},
        {"label": "Afwezigheid en vakanties", "href": "/afwezigheid-en-vakanties"},
        {"label": "Routebeschrijving", "href": "/routebeschrijving"},
        {"label": "Klachtenregeling", "href": "/klachtenregeling"}
      ]
    },
    {"label": "Afspraak maken", "href": "/afspraak-maken"},
    {
      "label": "Gezondheidsinformatie",
      "href": "/nieuws",
      "children": [
        {"label": "Thuisarts nieuws", "href": "/thuisarts-nieuws"},
        {"label": "Geneesmiddelen mee op reis", "href": "/geneesmiddelen-mee-op-reis"}
      ]
    },
    {"label": "Herhaalreceptenformulier", "href": "/herhaalrecepten"}
  ],
  "footer": [
    {"label": "Privacy", "href": "/privacy"},
    {"label": "Voorwaarden", "href": "/voorwaarden"}
  ]
}
```

### 12. Styling Guidelines

Use Tailwind CSS with these design tokens:

```javascript
// tailwind.config.mjs
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        // Healthcare-appropriate colors
        accent: '#059669', // green for positive actions
        warning: '#d97706', // amber for warnings
        danger: '#dc2626', // red for emergencies
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        base: '1.125rem', // 18px for elderly readability
      },
      lineHeight: {
        relaxed: '1.6',
      },
    },
  },
}
```

### 13. Project File Structure

```
huisartsenpraktijk-blijham/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.astro
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Sidebar.astro
│   │   │   └── Navigation.astro
│   │   ├── accessibility/
│   │   │   ├── AccessibilityPanel.astro
│   │   │   ├── SkipToContent.astro
│   │   │   └── AccessibilityToggle.astro
│   │   ├── ui/
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── Breadcrumbs.astro
│   │   │   └── SearchBar.astro
│   │   ├── content/
│   │   │   ├── StaffCard.astro
│   │   │   ├── NewsCard.astro
│   │   │   ├── EmergencyTable.astro
│   │   │   └── ContactBlock.astro
│   │   ├── forms/
│   │   │   ├── PrescriptionForm.astro
│   │   │   ├── FormStep1.astro
│   │   │   ├── FormStep2.astro
│   │   │   ├── FormStep3.astro
│   │   │   ├── FormStep4.astro
│   │   │   └── FormProgress.astro
│   │   ├── CookieConsent.astro
│   │   └── Map.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── team.astro
│   │   ├── doktersassistente.astro
│   │   ├── praktijkondersteuner-somatiek.astro
│   │   ├── praktijkondersteuner-ggz.astro
│   │   ├── apotheek.astro
│   │   ├── afwezigheid-en-vakanties.astro
│   │   ├── routebeschrijving.astro
│   │   ├── klachtenregeling.astro
│   │   ├── afspraak-maken.astro
│   │   ├── nieuws.astro
│   │   ├── thuisarts-nieuws.astro
│   │   ├── geneesmiddelen-mee-op-reis.astro
│   │   ├── herhaalrecepten.astro
│   │   ├── privacy.astro
│   │   └── voorwaarden.astro
│   ├── data/
│   │   ├── staff.json
│   │   ├── contact.json
│   │   └── navigation.json
│   ├── styles/
│   │   └── global.css
│   └── scripts/
│       ├── accessibility.ts
│       ├── prescription-form.ts
│       └── cookie-consent.ts
├── public/
│   ├── images/
│   │   ├── logo.png
│   │   ├── header-blijham.png
│   │   └── silhouettes/
│   │       ├── male.svg
│   │       ├── female.svg
│   │       └── default.svg
│   └── favicon.ico
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── README.md
```

### 14. Key Implementation Notes

1. **All text in Dutch** - Every button, label, error message must be in Dutch
2. **Phone links** - All phone numbers use `tel:` protocol
3. **External links** - Open in new tab with `target="_blank" rel="noopener"`
4. **Form validation** - Use HTML5 validation + custom JavaScript for UX
5. **Image optimization** - Use Astro's built-in image optimization
6. **Build-time data fetching** - Fetch RSS feeds during build, not runtime
7. **No client-side routing** - Standard page navigation for simplicity
8. **Print styles** - Important pages should be printable

### 15. Environment Variables

Create `.env` file:
```
WEB3FORMS_ACCESS_KEY=your_key_here
PLAUSIBLE_DOMAIN=huisartsenpraktijkblijham.nl
```

### 16. Commands to Start

```bash
# Create new Astro project
npm create astro@latest huisartsenpraktijk-blijham

# Navigate to project
cd huisartsenpraktijk-blijham

# Add Tailwind CSS
npx astro add tailwind

# Install additional dependencies
npm install leaflet @types/leaflet

# Start development server
npm run dev
```

---

## Build Instructions

1. Start with project setup and base layout
2. Create all static content pages first
3. Implement accessibility features
4. Build the 4-step prescription form
5. Add news feed integration
6. Implement cookie consent
7. Add map integration
8. Test everything thoroughly
9. Deploy to Cloudflare Pages

## Important: Content Sources

The actual content for each page should be copied from the current website. Key URLs to reference:
- https://huisartsenpraktijkblijham.uwartsonline.nl/ (all pages)

Make sure to preserve all important information while modernizing the presentation.

---

## Success Criteria

- [ ] All 17 pages are accessible and functional
- [ ] Prescription form works and sends email
- [ ] Accessibility panel works (contrast + text size)
- [ ] Cookie consent is GDPR compliant
- [ ] Site scores 90+ on Lighthouse accessibility
- [ ] Site loads in under 3 seconds
- [ ] Fully responsive (mobile, tablet, desktop)
- [ ] All phone numbers are clickable
- [ ] Map displays correctly
- [ ] News feeds display recent items