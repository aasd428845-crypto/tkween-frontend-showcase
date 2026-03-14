

## TKWEEN Media Production Website

A cinematic, bilingual (EN/AR) portfolio website for TKWEEN media production company. Pure frontend with static data.

### Structure
- **Language Context** (`src/context/LanguageContext.tsx`) — EN/AR toggle with RTL support, translation dictionary, localStorage persistence
- **Custom Logo** (`src/components/TkweenLogo.tsx`) — SVG with play triangle + T-shape cutout, configurable size/color/text
- **Global Styles** — Update `src/index.css` with Inter + Tajawal fonts, dark theme CSS variables, RTL support via `lang-ar` class
- **Root Layout** (`src/components/Layout.tsx`) — LanguageProvider wrapper, sticky navbar with logo + language switcher, metadata

### Pages & Sections (all in Index.tsx or split components)
1. **Hero** — Full-width cinematic section with TKWEEN logo, tagline in both languages, crimson accent CTA
2. **Portfolio Grid** — 2-3 column responsive grid of project cards with thumbnails, hover scale effect (1.02x), play button overlay
3. **About / Services** — Brief company description, service highlights (conferences, corporate ads, artistic production)
4. **Footer** — Contact info, social links, copyright

### Design Execution
- **Dark theme**: `#0A0A0A` background, `#171717` cards, `#E11D48` crimson accent
- **Typography**: Inter (EN) + Tajawal (AR), bold headings
- **Motion**: 300ms transitions, subtle card lift on hover
- **RTL**: Full layout flip when Arabic is selected, play icon stays oriented correctly
- **Static data**: All portfolio items, translations, and content hardcoded

