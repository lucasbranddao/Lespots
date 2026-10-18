# Decisions (ADR-lite)

Short records of *why* things are the way they are, so they aren't re-decided by accident. Newest at the bottom.
**Format**: Context → Decision → Consequences. To reverse a decision, add a new ADR and mark the old one `Superseded by ADR-xxx`.
ADR-001 … 007 were **backfilled on 2026-10-18** from the project history; exact original dates weren't recorded.

---

### ADR-001 — Static site, no build step, hosted on GitHub Pages
- **Status**: Accepted
- **Context**: Solo project with one curator; content is a JSON file. Needs free hosting that a non-developer partner can watch update.
- **Decision**: Plain HTML/JS/CSS served from the repo root by GitHub Pages (`.nojekyll`). Tailwind via CDN, no bundler.
- **Consequences**: Zero tooling, ~1 min deploys on push, free. Costs: no minification/types/tests, all paths must be relative (`/Lespots/` subpath), `fetch` needs a local server (TD-005).

### ADR-002 — Leaflet + keyless Esri tiles instead of Google Maps
- **Status**: Accepted
- **Context**: Map was wanted as another view of the list. Google Maps needs an API key and a billing account; the owner chose the free option (Leaflet + OpenStreetMap-style tiles). The first basemap (CARTO Positron) later showed an "API key required" notice to the owner.
- **Decision**: Leaflet 1.9.4 with **Esri World Light Gray Canvas** (base + reference labels). Both layers were tested keyless (HTTP 200).
- **Consequences**: No key, no billing, clean light look that lets pins stand out. Max zoom is 16. Depends on a third-party tile host staying keyless.

### ADR-003 — Faceted filter: venue axis + single-select facets, AND across axes
- **Status**: Accepted
- **Context**: Originally one flat multi-select "categories" with OR logic. The owner wanted type of food, type of place/occasion and seals separated, combined with AND, plus a top-level Bar / Restaurante / Café switch.
- **Decision**: `venue` (exactly one value, horizontal tabs, default "Todos") + facets `cuisine`, `occasion`, `badges` (one pick per facet in the sidebar). A spot shows only if it matches every active constraint.
- **Consequences**: Predictable narrowing; users can't OR two cuisines. Open question: should changing venue reset the facets? (currently independent — see backlog).

### ADR-004 — `spots.json` is the single data source for both pages
- **Status**: Accepted
- **Context**: Guide and map show the same places; the curator should edit one place.
- **Decision**: Both pages `fetch('spots.json')` and render client-side. `coords` lives next to the review. _(File renamed to `spots.v2.json` by ADR-009; the one-file rule still holds.)_
- **Consequences**: Simple curation, but hand-edited JSON can break both pages (TD-003) and the schema must be documented (ARCHITECTURE).

### ADR-005 — Shared subscribe widget; localStorage as a placeholder
- **Status**: Accepted (placeholder is a known gap — TD-002)
- **Context**: Wanted a subscribe option on every screen (email and/or WhatsApp) before choosing a backend.
- **Decision**: `subscribe.js` injects a floating button + modal on any page that includes it; stores submissions in `localStorage`.
- **Consequences**: Fast to ship and consistent across pages, but no signup ever leaves the visitor's browser. Must be replaced before the form is promoted.

### ADR-006 — Commercial display fonts via `@font-face` with free fallbacks
- **Status**: Accepted (fonts still missing — TD-007)
- **Context**: Brand typography is Parfumerie Script (logo) and Joshico (headings), neither on Google Fonts.
- **Decision**: Declare them with `@font-face` pointing to `fonts/*.woff2` and list Great Vibes / Playfair Display as fallbacks. Body is Work Sans; labels stay Be Vietnam Pro.
- **Consequences**: The page works today with fallbacks; dropping licensed files into `fonts/` activates the real fonts with no code change.

### ADR-007 — Four-color palette, hard-coded hex
- **Status**: Accepted (technique is debt — TD-006)
- **Context**: Owner replaced the burgundy/green/gold/cream palette with wine `#8d0b0b`, beige `#fdf8f0`, amber `#e8a12e`, teal `#1c3535`.
- **Decision**: Remap everywhere; keep blush `#ffdada` and lemon `#ffe088` as small "Y2K pop" accents on the wine hero.
- **Consequences**: Palette is right but spread across files; the accent question (strict 4 colors?) is still open in the backlog.

### ADR-008 — Two-folder docs system with auto-loaded status
- **Status**: Accepted (2026-10-18)
- **Context**: Returning to the project after weeks had no entry point; no CLAUDE.md, architecture, debt list or backlog.
- **Decision**: `CLAUDE.md` (short, auto-loaded) imports only `docs/project/STATUS.md`. `docs/technical/` (English: architecture, debt, decisions) and `docs/project/` (Portuguese: backlog, status). `/wrap-up` rewrites the status at session end. Repo is public, so docs are public.
- **Consequences**: Cheap context per session, one home per fact. Needs discipline — enforced by a CLAUDE.md rule and the `/wrap-up` command, not by a hook.

### ADR-009 — New data file `spots.v2.json`; venue stays an enum
- **Status**: Accepted (2026-10-18)
- **Context**: The curator delivered a full review set (83 spots: 50 restaurants, 14 bars, 19 cafés, with real coords) in a new JSON. It put the tab labels ("Restaurantes que abraçam", …) in `venue`, whereas the pages key icons, pin colors and filters on `Bar | Restaurante | Café` and already map those to labels via `VENUE_LABEL`.
- **Decision**: Load the new data from `spots.v2.json` (both pages point to it) and leave `spots.json` untouched and unreferenced as a rollback. In v2, `venue` is normalized 1:1 to the enum; display labels stay in code. All other fields are kept as delivered. `badges`, `tags` and `rating` are absent in v2 (the pages treat them as optional).
- **Consequences**: Rollback = change the two `fetch` strings back. Two data files can confuse the curator or drift (TD-013). Schema rule for the curator: use the enum in `venue`, not the label.

### ADR-010 — Sidebar facets come from a curated fixed list, not from the data
- **Status**: Accepted (2026-10-18)
- **Context**: The curator supplied the exact "Culinária" (17) and "Ocasião" (10) lists and their order. Deriving the pills from `spots.json` showed whatever tags happened to exist (e.g. Ramén, Petiscos, Conforto) and in data order.
- **Decision**: `FACETS[].values` in `index.html` holds the fixed lists (shown even if no spot uses a value yet). "Selos" has no list and is still derived from the data, so it disappears when no spot has badges. Chose this over deriving + sorting, and over remapping every spot's tags automatically. Only the obvious synonyms were renamed in v1 (Encontro → Perfeito para date, Comemoração → Bom para comemorações, Trabalhar → Bom para trabalhar, Café → Cafés especiais, Hambúrguer → Hambúrguer e sanduíches); the rest was left for the curator.
- **Consequences**: The sidebar matches the brief exactly, but a new facet value needs a code edit in two places (`FACETS` and, if it should have an emoji, `EMOJI` in both pages — TD-004), and a typo in the data silently produces a card chip that no pill can filter. ADR-003 (single-select, AND across axes) is unchanged.
