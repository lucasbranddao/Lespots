# Onde paramos

_Atualizado em 2026-10-18. Este arquivo é sobrescrito a cada sessão pelo `/wrap-up`; o histórico fica no git._

## Estado em 5 linhas

- Guia + mapa **no ar** em https://lucasbranddao.github.io/Lespots/ (branch `main`, limpo e sincronizado com o GitHub).
- 20 spots cadastrados (texto, cozinha, ocasião, selos). **As 20 fotos ainda são placeholders** (picsum).
- **O mapa está quebrado em produção**: 19 de 20 spots têm `coords: [0, 0]` e os pinos caem no oceano (TD-001).
- A newsletter **não envia nada para lugar nenhum** — só guarda no navegador de quem se inscreve (TD-002).
- As fontes Joshico e Parfumerie Script não estão no repo; o site usa fontes substitutas (TD-007).

## O que mudou nesta sessão (2026-10-18)

- Criamos o sistema de documentação: `CLAUDE.md`, `docs/technical/` (arquitetura, dívidas, decisões), `docs/project/` (backlog, status) e o comando `/wrap-up`.
- `DESIGN.md` atualizado para a paleta e as fontes atuais.
- **Nenhum código do site e nenhum dado foi alterado.**
- Achados registrados: coords zeradas, newsletter sem destino, 3 spots com unidade "PENDENTE", imagens e `imageAlt` incoerentes.

## Próximos 3 passos

1. **B-003** — decidir a unidade/endereço de `jojo-ramen`, `caco` e `botanikafe`.
2. **B-001** — preencher as `coords` dos 19 spots (10 já têm endereço) e proteger o `map.html` contra `[0, 0]`.
3. **B-002** — escolher o destino da newsletter e ligar de verdade.

## Perguntas em aberto

- Newsletter: qual serviço usar (e/ou WhatsApp)?
- Manter os acentos rosa/limão ou só as 4 cores da paleta?
- Trocar de venue deve zerar os filtros da lateral?

## Como retomar

```bash
cd ~/Developer/LeSpots && python3 -m http.server 8080
```

- Abrir http://localhost:8080 (guia) e http://localhost:8080/map.html (mapa); `Cmd+Shift+R` para recarregar.
- Publicar = commit + push na `main`; o Pages atualiza em ~1 min.
- Backlog completo: `docs/project/BACKLOG.md` · Dívidas: `docs/technical/TECH_DEBT.md`.
