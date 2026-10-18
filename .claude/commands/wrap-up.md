---
description: End-of-session routine — rewrite STATUS.md and sync backlog, tech debt and decisions so the next session can resume
argument-hint: [optional note to include]
disable-model-invocation: true
allowed-tools:
  - Bash(git status *)
  - Bash(git diff *)
  - Bash(git log *)
---

Close out this working session so we can pick it up later. This is a **docs-only** routine: do not change site code or data, and **do not commit or push**.

Optional note from the user: $ARGUMENTS

1. **Gather facts.** Run `git status --short`, `git diff --stat` and `git log --oneline -5`, and review this conversation: what changed, what was decided, what was found, what was left undone. Verify any number you are about to write (re-count, re-read the file) instead of trusting an older doc.
2. **`docs/project/STATUS.md`** — *overwrite*, Portuguese (pt-BR), **≤ 60 lines**, keeping exactly these sections: `Estado em 5 linhas` · `O que mudou nesta sessão (<date>)` · `Próximos 3 passos` (reference `B-` ids) · `Perguntas em aberto` · `Como retomar`. Put the absolute date in the header.
3. **`docs/project/BACKLOG.md`** (pt-BR) — move finished items to **Concluído** with the date, add new items with the next free `B-` id in the right bucket, update **Perguntas em aberto**. Never reuse an id.
4. **`docs/technical/TECH_DEBT.md`** (English) — add a `TD-` row for any shortcut, bug or risk left unfixed; mark fixed ones `Done (<date>)` (don't delete rows). Keep the "Backlog" column in sync with BACKLOG.md.
5. **`docs/technical/DECISIONS.md`** (English) — if a real choice between alternatives was made, append an `ADR-` entry (Context / Decision / Consequences). Supersede, don't rewrite, old ones.
6. **`docs/technical/ARCHITECTURE.md`** — only if structure, data model, dependencies or deploy changed; update the "Verified" line.
7. **Check consistency**: every `B-`/`TD-`/`ADR-` id you reference exists; `STATUS.md` is ≤ 60 lines; `CLAUDE.md` still under ~100 lines; no secrets, personal data or absolute home paths (use `~/…`) — the repo is public.
8. **Reply with a short summary (≤ 10 lines)**: what was done, what is next, and anything the user must decide. Remind them that nothing was committed.
