---
name: Rouge et Vert Scrapbook
colors:
  # Synced 2026-10-18 with the live site (tailwind.config in index.html). Tokens tagged '# legacy' are NOT used by the site;
  # some still hold old-palette values (e.g. surface-tint, *-fixed-dim) — review or delete them (see docs/technical/TECH_DEBT.md TD-006).
  surface: '#fdf8f0'
  surface-dim: '#e6dcc8'
  surface-bright: '#fdf8f0'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6efe2'
  surface-container: '#f3ebdd'
  surface-container-high: '#f3ebdd'
  surface-container-highest: '#efe5d5'
  on-surface: '#2b211b'
  on-surface-variant: '#6b5347'
  inverse-surface: '#2b211b'
  inverse-on-surface: '#f6efe2'
  outline: '#9c8478'
  outline-variant: '#e8cfc0'
  surface-tint: '#af2b3e' # legacy
  primary: '#8d0b0b'
  on-primary: '#ffffff'
  primary-container: '#6d0808'
  on-primary-container: '#ff828a' # legacy
  inverse-primary: '#ffb3b5'
  secondary: '#1c3535'
  on-secondary: '#ffffff'
  secondary-container: '#cfe1dd'
  on-secondary-container: '#406b56' # legacy
  tertiary: '#e8a12e'
  on-tertiary: '#ffffff' # legacy
  tertiary-container: '#e8a12e'
  on-tertiary-container: '#4f3d00' # legacy
  error: '#ba1a1a' # legacy
  on-error: '#ffffff' # legacy
  error-container: '#ffdad6' # legacy
  on-error-container: '#93000a' # legacy
  primary-fixed: '#ffdada'
  primary-fixed-dim: '#ffb3b5' # legacy
  on-primary-fixed: '#4a0606'
  on-primary-fixed-variant: '#8e0f28' # legacy
  secondary-fixed: '#cfe1dd'
  secondary-fixed-dim: '#a2d1b7' # legacy
  on-secondary-fixed: '#0d2020'
  on-secondary-fixed-variant: '#234f3b' # legacy
  tertiary-fixed: '#ffe088'
  tertiary-fixed-dim: '#e9c349' # legacy
  on-tertiary-fixed: '#4a3208'
  on-tertiary-fixed-variant: '#574500' # legacy
  background: '#fdf8f0'
  on-background: '#2b211b'
  surface-variant: '#efe5d5'
  secondary-tint: '#d6e8e4' # tip box (green variant)
typography:
  # Parfumerie Script and Joshico are commercial and not in the repo yet; the site falls back to Great Vibes / Playfair Display.
  display-script:
    fontFamily: Parfumerie Script
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
  headline-lg:
    fontFamily: Joshico
    fontSize: 32px
    fontWeight: '900'
    lineHeight: 40px
  headline-md:
    fontFamily: Joshico
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-sm:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-caps:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  margin-page: 2rem
  gutter: 1rem
  sticker-offset: -0.5rem
---

> **Source of truth for live values:** `tailwind.config` in `index.html` and `:root` in `map.html` (synced 2026-10-18). Palette: wine `#8d0b0b`, beige `#fdf8f0`, amber `#e8a12e`, teal `#1c3535`; small accents blush `#ffdada` / lemon `#ffe088`.

## Brand & Style

The design system embodies a "French Burlesque meets Y2K Maximalism" aesthetic. It is curated for a youthful, energetic audience that prizes personality over clinical precision. The mood is a sophisticated "messy" scrapbook—balancing the elegance of a Parisian lounge with the raw, eclectic energy of a 2000s digital diary.

The style is defined by **Maximalism** and **Tactile Scrapbooking**. Expect overlapping layers, physical paper textures, digital "stickers" (cups, cameras, lips, and cherubs), and hand-drawn flourishes. It rejects the "bento box" grid in favor of a composition that feels assembled by hand, using high-contrast borders and ornate accents to frame modern photography.

## Colors

The palette is anchored in a luxurious, traditional foundation with vibrant, modern pops. 

- **Primary (Wine):** Used for large surface areas and core branding. It provides the "theatre" backdrop.
- **Secondary (Teal):** Used for depth, navigation bars, and as a sophisticated alternative to black.
- **Tertiary (Amber):** Reserved for delicate line art, button borders, and specific typography highlights to evoke "Burlesque" glamour.
- **Neutral (Beige):** The "paper" of the scrapbook. Avoid pure white; use this warm beige to maintain the vintage feel.
- **Accents:** Use Black for high-impact 2000s-style bold headers and outlines.

## Typography

The typographic hierarchy mixes high-contrast elegance with modern utility.

- **Display Titles / logo:** Parfumerie Script (fallback: Great Vibes) — a flowing calligraphic script.
- **Headlines:** Joshico (fallback: Playfair Display), bold and heavy, for authority and a vintage editorial feel.
- **Body:** Work Sans — a clean sans that keeps long-form reviews legible against textured backgrounds.
- **Labels & UI:** A clean, modern sans-serif (Be Vietnam Pro) is used in all-caps for functional elements, providing a Y2K "label maker" contrast to the classic serif text.

## Layout & Spacing

This design system uses a **Fluid Grid** but encourages "intentional misalignment." 

- **Layout Model:** A standard 12-column grid provides the underlying structure, but elements (images, cards, and stickers) should frequently break the grid.
- **Overlap:** Components should overlap by approximately `sticker-offset` to create the scrapbook feel. 
- **Mobile vs Desktop:** On mobile, margins are tighter (1rem) and content stacks vertically, but sticker elements remain pinned to corners of cards to maintain the aesthetic. On desktop, whitespace is used liberally around central "islands" of content.

## Elevation & Depth

Hierarchy is achieved through physical layering rather than standard shadows.

- **Layering:** Use a "Stacking" model. Background (Wine) > Paper Layers (Beige) > Content (Photos/Text) > Top Layer (Stickers/Doodles).
- **Outlines:** Instead of shadows, use "Double Borders." A 1px amber border inside a 4px solid Wine or Teal border creates a framed, tactile effect.
- **Sticker Depth:** Only the top-most "sticker" elements should have a very sharp, 1px black drop shadow at 45 degrees to make them appear "pasted" onto the screen.

## Shapes

The shape language is primarily **Soft (0.25rem)** to mimic the cut of thick cardstock or vintage photographs.

- **Cards:** Use sharp or slightly softened corners (roundedness 1).
- **Stickers:** Use irregular, "hand-cut" organic paths or masks.
- **Containers:** Frame images with "Film Strip" or "Polaroid" style borders as seen in the reference assets.

## Components

- **Buttons:** Rectangular with a 2px solid border. Hover states should swap the fill and border colors (e.g., Wine fill with Amber text swaps to Amber fill with Wine text).
- **Chips/Tags:** Styled as "Washi Tape" or "Postage Stamps." Use a serrated edge for category tags like "Cafe" or "Bar."
- **Cards:** Use the "Paper on Fabric" metaphor. A Beige container over a Wine background. Add a "Tape" element (semi-transparent blue or amber rectangle) at the top center of the card.
- **Inputs:** Simple underlined fields (1px Amber) or thick-bordered boxes (2px Black) reminiscent of Y2K web forms.
- **Stickers:** Distribute assets like the "Cherub," "Martini Glass," and "Lipstick Mark" randomly across the layout, often overlapping the corners of photos or cards.
- **Lists:** Use the "Key" or "Matchstick" icons as custom bullets for food guides or spot rankings.