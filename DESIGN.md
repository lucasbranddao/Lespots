---
name: Rouge et Vert Scrapbook
colors:
  surface: '#fbfbe2'
  surface-dim: '#dbdcc3'
  surface-bright: '#fbfbe2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f5dc'
  surface-container: '#efefd7'
  surface-container-high: '#eaead1'
  surface-container-highest: '#e4e4cc'
  on-surface: '#1b1d0e'
  on-surface-variant: '#584141'
  inverse-surface: '#303221'
  inverse-on-surface: '#f2f2d9'
  outline: '#8c7071'
  outline-variant: '#e0bfbf'
  surface-tint: '#af2b3e'
  primary: '#570013'
  on-primary: '#ffffff'
  primary-container: '#800020'
  on-primary-container: '#ff828a'
  inverse-primary: '#ffb3b5'
  secondary: '#3b6751'
  on-secondary: '#ffffff'
  secondary-container: '#bbeacf'
  on-secondary-container: '#406b56'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cca730'
  on-tertiary-container: '#4f3d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdada'
  primary-fixed-dim: '#ffb3b5'
  on-primary-fixed: '#40000b'
  on-primary-fixed-variant: '#8e0f28'
  secondary-fixed: '#bdedd2'
  secondary-fixed-dim: '#a2d1b7'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#234f3b'
  tertiary-fixed: '#ffe088'
  tertiary-fixed-dim: '#e9c349'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#fbfbe2'
  on-background: '#1b1d0e'
  surface-variant: '#e4e4cc'
typography:
  display-script:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '900'
    lineHeight: 40px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Source Serif 4
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-sm:
    fontFamily: Source Serif 4
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

## Brand & Style

The design system embodies a "French Burlesque meets Y2K Maximalism" aesthetic. It is curated for a youthful, energetic audience that prizes personality over clinical precision. The mood is a sophisticated "messy" scrapbook—balancing the elegance of a Parisian lounge with the raw, eclectic energy of a 2000s digital diary.

The style is defined by **Maximalism** and **Tactile Scrapbooking**. Expect overlapping layers, physical paper textures, digital "stickers" (cups, cameras, lips, and cherubs), and hand-drawn flourishes. It rejects the "bento box" grid in favor of a composition that feels assembled by hand, using high-contrast borders and ornate accents to frame modern photography.

## Colors

The palette is anchored in a luxurious, traditional foundation with vibrant, modern pops. 

- **Primary (Burgundy):** Used for large surface areas and core branding. It provides the "theatre" backdrop.
- **Secondary (Forest Green):** Used for depth, navigation bars, and as a sophisticated alternative to black.
- **Tertiary (Gold):** Reserved for delicate line art, button borders, and specific typography highlights to evoke "Burlesque" glamour.
- **Neutral (Cream/Off-White):** The "paper" of the scrapbook. Avoid pure white; use this warm cream to maintain the vintage feel.
- **Accents:** Use Black for high-impact 2000s-style bold headers and outlines.

## Typography

The typographic hierarchy mixes high-contrast elegance with modern utility.

- **Display Titles:** Use an italicized, high-contrast serif (Playfair Display) to mimic the fluidity of Parfumerie Script while maintaining readability.
- **Headlines:** Bold, heavy serifs convey authority and vintage editorial vibes.
- **Body:** A sturdy serif (Source Serif 4) ensures long-form reviews remain legible against textured backgrounds.
- **Labels & UI:** A clean, modern sans-serif (Be Vietnam Pro) is used in all-caps for functional elements, providing a Y2K "label maker" contrast to the classic serif text.

## Layout & Spacing

This design system uses a **Fluid Grid** but encourages "intentional misalignment." 

- **Layout Model:** A standard 12-column grid provides the underlying structure, but elements (images, cards, and stickers) should frequently break the grid.
- **Overlap:** Components should overlap by approximately `sticker-offset` to create the scrapbook feel. 
- **Mobile vs Desktop:** On mobile, margins are tighter (1rem) and content stacks vertically, but sticker elements remain pinned to corners of cards to maintain the aesthetic. On desktop, whitespace is used liberally around central "islands" of content.

## Elevation & Depth

Hierarchy is achieved through physical layering rather than standard shadows.

- **Layering:** Use a "Stacking" model. Background (Burgundy) > Paper Layers (Cream) > Content (Photos/Text) > Top Layer (Stickers/Doodles).
- **Outlines:** Instead of shadows, use "Double Borders." A 1px gold border inside a 4px solid Burgundy or Green border creates a framed, tactile effect.
- **Sticker Depth:** Only the top-most "sticker" elements should have a very sharp, 1px black drop shadow at 45 degrees to make them appear "pasted" onto the screen.

## Shapes

The shape language is primarily **Soft (0.25rem)** to mimic the cut of thick cardstock or vintage photographs.

- **Cards:** Use sharp or slightly softened corners (roundedness 1).
- **Stickers:** Use irregular, "hand-cut" organic paths or masks.
- **Containers:** Frame images with "Film Strip" or "Polaroid" style borders as seen in the reference assets.

## Components

- **Buttons:** Rectangular with a 2px solid border. Hover states should swap the fill and border colors (e.g., Burgundy fill with Gold text swaps to Gold fill with Burgundy text).
- **Chips/Tags:** Styled as "Washi Tape" or "Postage Stamps." Use a serrated edge for category tags like "Cafe" or "Bar."
- **Cards:** Use the "Paper on Fabric" metaphor. A Cream container over a Burgundy background. Add a "Tape" element (semi-transparent blue or gold rectangle) at the top center of the card.
- **Inputs:** Simple underlined fields (1px Gold) or thick-bordered boxes (2px Black) reminiscent of Y2K web forms.
- **Stickers:** Distribute assets like the "Cherub," "Martini Glass," and "Lipstick Mark" randomly across the layout, often overlapping the corners of photos or cards.
- **Lists:** Use the "Key" or "Matchstick" icons as custom bullets for food guides or spot rankings.