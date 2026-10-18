# Docs

Two folders, two audiences. Everything here is versioned in git and — because the repo is public and Pages serves the repo root — publicly visible. **Never put secrets, keys or personal data in these files.**

| Folder | Language | What lives here | Loaded into every Claude session? |
|--------|----------|-----------------|-----------------------------------|
| `technical/` | English | `ARCHITECTURE.md` (how it works), `TECH_DEBT.md` (known shortcuts/bugs, `TD-xxx`), `DECISIONS.md` (why, `ADR-xxx`) | No — read on demand |
| `project/` | Português (pt-BR) | `BACKLOG.md` (work to do, `B-xxx`), `STATUS.md` (where we left off) | `STATUS.md` only, via `@import` in `CLAUDE.md` |

Entry points: `CLAUDE.md` (repo root, auto-loaded) → `project/STATUS.md` → the rest.

## Rules

- **One fact, one home.** Debt lives in `TECH_DEBT.md`, work lives in `BACKLOG.md`. Cross-reference by ID (`TD-001`, `B-003`); don't copy prose.
- **Update in the same change** as the code: structure/data/deps/deploy → `ARCHITECTURE.md`; a real choice between alternatives → new ADR; a shortcut or risk left behind → new `TD-` row; new work → new `B-` item.
- **Don't delete history**: fixed debt becomes `Done (date)`, finished work moves to *Concluído* with a date, reversed decisions are superseded by a new ADR.
- **Verify before you write a number or a file path** — counts and names go stale. Re-run the check, or say "not verified".
- **Keep `STATUS.md` ≤ 60 lines** (it is loaded every session) and `CLAUDE.md` ≤ ~100 lines.
- **End of every session**: run `/wrap-up` (`.claude/commands/wrap-up.md`). It rewrites `STATUS.md` and syncs backlog/debt. It never commits.

## ID conventions

- `TD-001…` tech debt · `B-001…` backlog · `ADR-001…` decisions. IDs are never reused.
- Severity (debt): **High** user-visible breakage or data loss today · **Med** slows every change / likely to bite · **Low** polish or latent.
- Backlog buckets: **Agora** (do next) → **Próximo** → **Depois** (ideas) · plus **Perguntas em aberto** and **Concluído**.
