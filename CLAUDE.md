# Le Spots

Personal, curated food guide for São Paulo (PT-BR). Static site — no build step, no backend — on GitHub Pages.
A curator edits `spots.v2.json`; two pages render it: the guide (`index.html`) and a map (`map.html`).
Visual vibe: "French Burlesque meets Y2K" scrapbook — see `DESIGN.md`.

## Run / deploy

- Local: `python3 -m http.server 8080` in the repo root → http://localhost:8080 and `/map.html`. `file://` fails (both pages `fetch('spots.v2.json')`).
- No live reload: hard-refresh with `Cmd+Shift+R`. No test suite or linter — to syntax-check an inline script, extract the `<script>` body and run `node --check`.
- Deploy: push to `main` → GitHub Pages (repo root, `.nojekyll`) → https://lucasbranddao.github.io/Lespots/ in ~1 min. Repo `lucasbranddao/Lespots` is **public**.
- Never commit or push unless asked.

## Repo map

| Path | Role |
|------|------|
| `index.html` | Guide: hero, venue tabs, facet sidebar, spot cards, inline newsletter. Tailwind CDN + inline styles. |
| `map.html` | Leaflet map + venue filter + spot list. Own CSS, no Tailwind. |
| `subscribe.js` | Self-injecting floating "Assinar" button + modal, loaded by both pages. |
| `spots.v2.json` | Single data source: `{ "spots": [ … ] }` (83 spots). `spots.json` is the old v1, kept unreferenced as a rollback (ADR-009). |
| `DESIGN.md` | Design tokens and visual rules. |
| `docs/` | `technical/` (EN: architecture, debt, decisions) · `project/` (PT-BR: backlog, status). See `docs/README.md`. |

## Rules that aren't obvious from the code

- **Relative paths only** (`spots.v2.json`, `map.html`): Pages serves under `/Lespots/`, a leading `/` breaks it.
- **Spot schema** (full table in `docs/technical/ARCHITECTURE.md`): `venue` is exactly one of `Bar | Restaurante | Café`; `cuisine[]`, `occasion[]`, `badges[]` are the sidebar facets; `tags[]` are free chips (not filterable); `coords` is `[lat, lng]` and **`[0, 0]` means "not filled yet"** — the map doesn't guard it yet (TD-001). `location` starting with `PENDENTE` = unconfirmed unit.
- **Filter semantics**: venue AND one pick per facet (AND across axes, single-select per facet). Don't switch to OR without a new ADR.
- `VENUE_ICON` is duplicated in `index.html` and `map.html` — change both (TD-004). Category/filter labels are plain text on purpose: the emojis were removed on 2026-10-29, don't bring them back.
- Palette = 4 colors, hard-coded as hex everywhere: wine `#8d0b0b`, beige `#fdf8f0`, amber `#e8a12e`, teal `#1c3535` (+ blush `#ffdada`, lemon `#ffe088` accents). `map.html` variable names (`--burgundy`, `--green`, `--gold`) are legacy. Grep before renaming a color.
- Fonts: Work Sans (body), Joshico (headings), Parfumerie Script (logo), Be Vietnam Pro (labels). Joshico and Parfumerie Script are **commercial and not in the repo** (`fonts/` is missing → fallbacks Playfair Display / Great Vibes). Don't add font files without a license check.
- Spot images are `picsum.photos` placeholders until real photos arrive (the sidebar photo is real: `assets/foto-lateral.jpg`). The newsletter only writes to the visitor's `localStorage` — nothing is sent (TD-002).
- Root-level `code.html`, `files.zip`, `screen*.png` are gitignored reference material — don't edit or commit them.

## Docs workflow — how we resume work

- Technical context → `docs/technical/` (English): `ARCHITECTURE.md`, `TECH_DEBT.md` (`TD-` ids), `DECISIONS.md` (`ADR-` ids).
- Project management → `docs/project/` (Portuguese): `BACKLOG.md` (`B-` ids), `STATUS.md` (where we left off).
- Left a shortcut, bug or risk unfixed → add a `TD-` row. New work → `BACKLOG.md`. Chose between real alternatives → add an `ADR-`.
- Changed structure, data model, dependencies or deploy → update `ARCHITECTURE.md` in the same change.
- Refer to ids (`TD-007`, `B-003`) instead of repeating descriptions: one fact, one home. Verify numbers and paths before writing them.
- End of every session: run `/wrap-up` — it rewrites `STATUS.md` and syncs backlog/debt (never commits).
- Keep this file under ~100 lines; push detail into `docs/`. Repo is public — no secrets in docs.

## Where we left off

@docs/project/STATUS.md
