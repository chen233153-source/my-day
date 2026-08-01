---
name: "Product"
category: Brands
surface: web
colors:
  lavender-background: "#ede9fe"
  dark-ink: "#1e1b2e"
  purple: "#9b5de5"
  mint-green: "#34d399"
  white-surface: "#ffffff"
  muted-purple: "#8b85a1"
  lavender-border: "#d4cfe8"
---

# Product

> Category: Brands

> Surface: web

*A playful, mobile-first design system built on purple gradients, mint-green CTAs, and 3D depth.*

Extracted from 5 mobile app UI references (language learning, bus tickets, file manager, education, AI chat). Every screenshot shares the same DNA: purple as the dominant accent, soft lavender backgrounds, generous rounded corners, 3D-rendered icons, and mint-green secondary buttons for primary actions.

## Color Palette

| Role | Name | Hex | Usage |
| --- | --- | --- | --- |
| background | Lavender Background | `#ede9fe` | Page canvas and app background. Soft lavender wash visible in every screenshot — not plain white. |
| foreground | Dark Ink | `#1e1b2e` | Body text and headings on light surfaces. Deep purple-black, not pure black. |
| accent | Purple | `#9b5de5` | Primary brand color. Used for headers, card backgrounds, active tabs, progress bars, gradient overlays, and hero sections. Can be used as a large wash — this brand is purple-forward. |
| accent-secondary | Mint Green | `#34d399` | CTA buttons ('Start Now', 'Generate New', 'Create', 'Search'), progress indicators, and success states. High contrast against purple. |
| surface | White Surface | `#ffffff` | Card interiors, input fields, modal panels — always white inside the cards, contrasting the lavender page background. |
| muted | Muted Purple | `#8b85a1` | Secondary text, metadata, timestamps. Desaturated purple, not neutral grey. |
| border | Lavender Border | `#d4cfe8` | Dividers and card outlines. Tinted purple to match the overall palette. |

## Typography
- **Display:** Inter — weights 600, 700, 800 — fallbacks: system-ui, -apple-system, Segoe UI, Helvetica Neue, Arial, sans-serif
- **Body:** Inter — weights 400, 500, 600 — fallbacks: system-ui, -apple-system, Segoe UI, Helvetica Neue, Arial, sans-serif
- **Mono:** SFMono-Regular — weights 400 — fallbacks: Consolas, Liberation Mono, Menlo, Courier, monospace

## Voice & Tone

- **Adjectives:** friendly, playful, vibrant, approachable
- **Tone:** Warm, upbeat greeting style ('Hello Alan', 'Hi Julia!', 'Hello, Harry'). Personal, encouraging. Short sentences with exclamation points. Celebrate progress visually with progress bars and completion percentages.

### Messaging pillars
- Personal greeting — every screen opens with the user's name and a warm hello.
- Progress visibility — show completion %, loaded files, lesson counts. Users see momentum.
- Action-first CTAs — 'Start Now', 'Continue French!', 'Generate New', 'Explore'. Always imperative.

### Vocabulary
- **Use:** hello, continue, start now, explore, your, progress, completed
- **Avoid:** synergy, leverage, utilise, seamless, enterprise, robust

## Imagery

- **Style:** 3D-rendered illustrations with soft lighting and purple/pink tonal gradients. Objects float with drop shadows. Depth and dimensionality over flat icons.
- **Subjects:** 3D folder/file icons (Zomo File app), 3D headphones and books (language app), Friendly round avatar characters with big eyes, Category icons as 3D objects on gradient pedestals, Floating blob shapes as background atmosphere
- **Treatment:** Purple-to-pink gradients on hero sections and card headers. Glassmorphism on overlapping card layers. Soft shadows under every elevated element. Rounded, bubbly forms.
- **Avoid:** Stock photography, Flat monochrome line icons, Sharp/angular geometric patterns, Dark/serious imagery

## Layout

- **Radius:** 16px
- **Border weight:** 1px
- **Spacing:** 8px baseline grid

### Posture rules
- Component kit should cover: Button, Card, Form, Navigation, Badge, Input, Modal, Tab bar, Progress bar, Avatar.
- Touch targets minimum 44px on mobile surfaces.
- Cards have white surface interior on lavender background — the contrast IS the elevation; shadow optional.
- Primary CTAs use mint-green fill with dark text; secondary actions use purple fill with white text.
- Purple gradients are allowed and expected on card headers, hero sections, and navigation bars — this is not a 'sparingly' accent brand.
- Corner radius 16px for cards and buttons; 24px for full-width hero sections; pill shape (999px) for small badges and tags.
- 3D illustration icons sit on cards, never flat SVG.
