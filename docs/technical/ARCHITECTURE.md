# Architecture

_Verified 2026-10-18 against `main` @ `2d6da04`. If you change structure, data model, dependencies or deploy, update this file in the same change._

## Overview

Static site: three runtime files + one JSON data file. **No build step, no bundler, no backend, no tests.**

```
Browser ── GET ──▶ GitHub Pages (branch main, repo root, .nojekyll)
   index.html ─┐
   map.html ───┼── fetch('spots.v2.json') ──▶ render with template strings ──▶ innerHTML
   subscribe.js┘   (loaded at the end of both pages)
```

`spots.v2.json` is the single source of truth. A curator edits it by hand; both pages re-render from it on every load.
The previous file `spots.json` (v1, 20 spots) is no longer referenced by any page; it stays in the repo as a rollback (ADR-009).

## Files

| File | Role | Notes |
|------|------|-------|
| `index.html` | Guide page | Sections: nav, hero, **venue tabs** (sticky), main (**facet sidebar** + spot feed), inline newsletter, quote, footer, mobile bottom nav. Tailwind Play CDN + a `<style>` block + heavy inline `style=""` with hex colors. |
| `map.html` | Map page | Leaflet 1.9.4. Own CSS with `:root` variables; **no Tailwind**. Left panel (venue pills + spot list) + map. Variable names are legacy (`--burgundy`, `--green`, `--gold`) but hold the current palette. |
| `subscribe.js` | Global subscribe widget | Self-contained IIFE: injects its own styles, a floating "Assinar" button and a modal. Exposes `window.LeSpotsSubscribe = { open, close }`; any element with `data-open-subscribe` opens it. |
| `assets/` | Images | Brand logo (`logo.png`), hero illustrations (`hero-*.png`), "reminder" card (`reminder.png` + `cupido.svg`, `coracao.svg`, `coelho.png`) footer moon (`footer-lua.png`) and the author photo (`foto-lateral.jpg`, 720×1280 JPEG converted from the WebP the curator sent; shown in colour in a 4:5 frame with `object-position: 50% 45%` — in the sidebar from `md` up, as a polaroid inside the hero below that, see "Mobile hero"). The PNGs are copies of the files in the curator's "lespots files" folder, trimmed of transparent margins and capped at 520–1200 px (originals are 1040 px squares, 0.4–0.9 MB each). The hero reserves a commented slot for `hero-passaro.png` (B-018). |
| `spots.v2.json` | Data | `{ "spots": [ … ] }` — 83 spots, schema below. |
| `spots.json` | Old data (v1) | 20 spots. Not loaded by any page; rollback only (ADR-009). |
| `DESIGN.md` | Visual spec | Tokens + rules. |
| `docs/` | Project docs | See `docs/README.md`. |
| `.nojekyll` | Pages config | Disables Jekyll processing. |

Gitignored working material at the repo root (not part of the site): `code.html`, `files.zip`, `screen*.png`.

## Data model — `spots.v2.json`

| Field | Type | Meaning / rules |
|-------|------|-----------------|
| `id` | string | Unique, no spaces. Also the DOM `id` of the card and the deep-link anchor (`index.html#<id>`). |
| `name` | string | Display name. |
| `location` | string | Free text, address or neighborhood. A value starting with `PENDENTE —` marks an unconfirmed unit (curation TODO). |
| `coords` | `[lat, lng]` | Used only by the map. **`[0, 0]` means "not filled yet"** — currently not guarded (TD-001). |
| `venue` | enum | Exactly one of `Bar`, `Restaurante`, `Café`. Drives the top tabs and map pin color/icon. |
| `cuisine` | string[] | Facet "Culinária" (type of food). The sidebar shows the **fixed list** in `FACETS[0].values` (`index.html`) whether or not a spot uses a value; a value in the data that is not in that list still shows on the card but cannot be filtered. |
| `occasion` | string[] | Facet "Ocasião" (type of place/moment). Same rule: fixed list in `FACETS[1].values`. |
| `badges` | string[] | Facet "Selos": `Favorito`, `Hype`, `Custo-benefício` (these get gold styling). Optional — v2 has none, so the "Selos" group is hidden (it is derived from the data). |
| `tags` | string[] | Free-form chips on the card. **Not filterable.** Optional — v2 has none. |
| `description` | string | Review text; first letter is rendered as a drop-cap. |
| `tip` / `tipLabel` | string | The highlighted tip box and its label (all current spots use `DICA DE OURO`). Optional. |
| `image` / `imageAlt` | string | Photo URL and alt text. Currently all `picsum.photos` placeholders. |
| `featured` | bool | `true`: larger card, image left, green tip box. `false`: image right, dashed tip box. |
| `rating` | string[] | Material Symbols icon names shown as the rating row. Optional — v2 has none. |

`venue` holds the **enum**, not the display text: the tab labels ("Restaurantes que abraçam", "Barzinho perfeito", "Cafés & brunch") come from `VENUE_LABEL` in `index.html` (ADR-009).

Cuisine, occasion and badge labels are rendered as plain text — no emojis, in the guide (pills, card chips, image badges) and on the map (list chips, popup). The `EMOJI` tables were removed on 2026-10-29 at the curator's request.

## Filtering

**`index.html`** — state is `filters = { venue, cuisine, occasion, badge }` (`null` = no constraint).
`matchSpot(spot)` = venue equals AND `cuisine` includes AND `occasion` includes AND `badges` includes (only for constraints that are set).
The venue tabs choose the venue (default "Todos"); the sidebar allows **one value per facet**, click again to clear. Cards are rendered once;
`applyFilters()` toggles `display`, updates the result count, the "no results" message and the clear button. See ADR-003.
The sidebar (`aside.sidebar-scroll`) is sticky under the venue bar and, from `md` up, capped at `100vh − 9rem` with its own scroll — otherwise filters below the fold stay unreachable until the whole feed has scrolled past.

**Mobile hero (< 768 px only)** — the full letter made the banner ~1270 px tall (1.5 screens), so on mobile `index.html` shows only the first paragraph, with the author photo as a floated polaroid (`figure.hero-polaroid`, caption `@lenanmello` → Instagram) wrapped by the text, and a "Ler mais" button (`toggleHeroMore`, `aria-expanded`) that opens the rest (`.hero-more`, animated with `grid-template-rows 0fr → 1fr`). Text goes left-aligned and smaller; the logo, padding and illustrations shrink (banner ≈ 610 px). Only 3 illustrations are shown, cropped by the edges. From `md` up the polaroid and the button are `display:none`, `.hero-more` is a plain block and the sidebar keeps its own copy of the photo — the letter exists once in the HTML. Hero illustrations take their width from `--wm` (mobile) / `--wd` (md+) set on each `<img>`.

**`map.html`** — venue filter only (`filterVenue`). Pins are added/removed from the map and the list is re-rendered. No facet filtering on the map.

## Runtime flows

**Guide boot** — `init()`: `fetch('spots.v2.json')` → `SPOTS` → `renderVenueTabs(uniqueVenues())` → `renderFilterGroups()` → render cards (`renderSpot`) →
`applyFilters()` → `initReveal()` (IntersectionObserver adds `.visible`) → `initParallax()` → `scrollToHashSpot()`.
On fetch failure it prints an error telling the user to use a local server.

**Map boot** — `init()`: fetch → keep spots with a truthy `coords` (**`[0,0]` passes**, `map.html` `filter(s => s.coords)`) → venue list → `renderFilterPills()` →
`renderList()` → one marker per spot (`createMarker`: teardrop `divIcon` colored by venue + name label; `buildPopup`: horizontal card with a "Detalhes" link) →
`fitMapToSpots()` (`fitBounds`, padding 40).
`activateSpot(id)`: highlights pin + list row, `flyTo` (zoom ≥ 15), opens the popup after 500 ms.
Base map: Esri World Light Gray Canvas (base + reference labels overlay), `maxZoom: 16`, no API key. See ADR-002.

**Deep link (map → guide)** — popup "Detalhes" links to `index.html#<id>`. `scrollToHashSpot()` waits for the feed images to load (max 2.5 s),
computes `top − 130px`, jumps **instantly** (temporarily disables the global `scroll-smooth`), re-corrects on window `load`, then flashes the card border.
Cards also carry `scroll-margin-top:150px`; the two constants must stay in sync with the sticky bars (TD-010).

**Subscribe** — `subscribe.js` validates (email regex; WhatsApp ≥ 10 digits) and appends `{ email, whatsapp, page, at }` to
`localStorage['lespots_subscribers']`, then closes after 1.4 s. **Nothing is sent anywhere** (TD-002). The inline newsletter section in `index.html`
(`handleSubscribe`, `toggleChannel`) is a separate, duplicate implementation with the same storage.

## External dependencies

| What | Host | Used by | Key needed |
|------|------|---------|-----------|
| Tailwind Play CDN | cdn.tailwindcss.com | `index.html` | no |
| Fonts: Work Sans, Be Vietnam Pro, Great Vibes, Playfair Display, Material Symbols | fonts.googleapis.com | both | no |
| Leaflet 1.9.4 (CSS + JS) | unpkg.com | `map.html` | no |
| Map tiles (base + labels) | server.arcgisonline.com | `map.html` | no |
| Paper texture | transparenttextures.com | `index.html`, `subscribe.js` | no |
| Placeholder photos | picsum.photos | via `spots.v2.json` | no |
| Joshico, Parfumerie Script | `fonts/*.woff2` (**files missing**) | both (`@font-face`) | commercial licenses |

Everything is third-party and unpinned except Leaflet; an outage on any host degrades the page without breaking it (fonts fall back, tiles go blank).

## Styling conventions

- Palette (4 tokens): wine `#8d0b0b`, beige `#fdf8f0`, amber `#e8a12e`, teal `#1c3535`; accents blush `#ffdada`, lemon `#ffe088`. Hex values are hard-coded in CSS, inline styles and JS (TD-006).
- Fonts: Work Sans (body), Joshico → Playfair Display fallback (headings), Parfumerie Script → Great Vibes fallback (script titles such as "Entre na lista"; the **logo itself is the image `assets/logo.png`** in the guide's header, hero and footer), Be Vietnam Pro (labels/chips). Titles keep the current Playfair look on purpose ("gostei de como está").
- Scrapbook motifs: hard offset shadows, double borders, washi-tape strips, sticker icons (Material Symbols for now), slight rotations. Rules live in `DESIGN.md`.
- Venue colors on the map: Restaurante wine, Bar amber, Café teal.

## Deploy

Push to `main` → GitHub Pages rebuilds in ~1 min (repo root, public). Live: `https://lucasbranddao.github.io/Lespots/` and `/map.html`.
All paths must stay **relative** — the site is served under `/Lespots/`.

## Local development

```bash
python3 -m http.server 8080   # then open http://localhost:8080 — file:// fails because of fetch()
```

There is no live reload; hard-refresh (`Cmd+Shift+R`). No linter or test suite — to syntax-check an inline script, extract the `<script>` body and run `node --check` on it.
