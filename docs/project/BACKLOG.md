# Backlog

_Atualizado em 2026-10-18. Dívidas técnicas ficam em `docs/technical/TECH_DEBT.md` (IDs `TD-xxx`); aqui ficam as tarefas (IDs `B-xxx`)._

**Como usar**: marque `[x]` e mova para **Concluído** (com a data) quando terminar. Novo item = próximo `B-` livre. Referencie dívidas pelo ID, sem repetir a descrição.

## Agora

- [ ] **B-001 · Corrigir o mapa** — o `spots.v2.json` já traz `coords` nos 83 spots e o mapa funciona com ele (2026-10-18), mas ainda falta (1) fazer o `map.html` ignorar coordenadas zeradas e (2) conferir as coordenadas, que parecem aproximadas por bairro (vários spots dividem a mesma latitude). _Refs: TD-001_
  - Dica: no Google Maps, clique com o botão direito no pino e clique nas coordenadas para copiar (já vem como `latitude, longitude`).
  - O site no ar ainda usa o v1 (19 de 20 com `[0, 0]`) até o v2 ser publicado (commit + push).
- [ ] **B-002 · Newsletter com destino real** — escolher onde as inscrições vão parar (serviço de formulário, endpoint, planilha) e enviar de verdade; mostrar erro de verdade. Enquanto isso, o formulário engana quem se inscreve. _Refs: TD-002_
- [ ] **B-003 · Confirmar unidades "PENDENTE"** — definir qual unidade/endereço entra no guia para `jojo-ramen`, `caco` (a review cita a Rua Lisboa) e `botanikafe`. _No v2 os três têm só o bairro em `location` (Paraíso, Cerqueira César, Jardins) e coords preenchidas; confirmar se isso basta ou se a unidade precisa ser explícita._

## Próximo

- [ ] **B-004 · Fotos reais** — trocar as 20 imagens placeholder (picsum) e reescrever o `imageAlt` de cada uma. _Refs: TD-012_
- [ ] **B-005 · Fontes da marca** — colocar `ParfumerieScript.woff2` e `Joshico.woff2` em `fonts/` (conferir a licença de uso na web). _Refs: TD-007_
- [ ] **B-007 · Validador do `spots.json`** — script + GitHub Action que avisa de vírgula sobrando, campo faltando, `venue` inválido, `id` repetido e coords zeradas. Importante porque a curadoria edita o JSON na mão. _Refs: TD-003_
- [ ] **B-008 · Stickers reais** — substituir os ícones Material Symbols pelos PNGs (planilhas de stickers / `files.zip`).

- [ ] **B-016 · Preencher as dicas pendentes** — `flores` e `selvagem` estão com `"tip": "[preencher dica]"` no `spots.v2.json`, e o card mostra esse texto literalmente. Preencher (ou apagar o campo `tip`) antes de publicar o v2.
- [ ] **B-017 · Decidir o destino do v1** — o `spots.json` (20 spots) ficou como backup sem uso. Antes de apagá-lo, decidir o que fazer com `badges` (Favorito/Hype/Custo-benefício), `tags` e `rating`, que o v2 não tem. _Refs: TD-013_
- [ ] **B-018 · Pássaro do banner** — o pássaro (canto superior direito do banner) não estava na pasta "icones home": colocar em `assets/hero-passaro.png` e descomentar o bloco no `index.html` (comentário "PÁSSARO"). _A foto da lateral já foi trocada (2026-10-29)._
- [ ] **B-019 · Levar o novo visual para o mapa** — logo em imagem e nomes das categorias (Restaurantes que abraçam / Barzinho perfeito / Cafés & brunch) no `map.html`. _Refs: TD-014_

## Depois

- [ ] **B-009 · Funções hoje só ilustrativas** — favoritos e perfil (ocultos por enquanto, 2026-10-29), busca, página Sobre. _Refs: TD-009_
- [ ] **B-010 · Unificar a newsletter** — a seção inline passa a abrir o mesmo diálogo do `subscribe.js`. _Refs: TD-002_
- [ ] **B-011 · `config.js` compartilhado** — um só lugar para ícones, nomes e cores de venue. _Refs: TD-004_
- [ ] **B-012 · Tokens de cor e Tailwind** — variáveis CSS como fonte única; build do Tailwind ou remoção dele. _Refs: TD-005, TD-006_
- [ ] **B-013 · Polimento do mapa** — `autoPanPadding` no popup, cores/ícones por venue em config. _Refs: TD-010_
- [ ] **B-014 · Limpar a raiz do repo** — mover `code.html`, `files.zip`, `screen*.png` para `reference/` (ignorado pelo git). _Refs: TD-011_
- [ ] **B-015 · Escapar HTML dos dados** — helper de escape e eventos sem `onclick` inline. _Refs: TD-008_

## Perguntas em aberto

- A seção de newsletter da home deve só abrir o diálogo único (sem formulário duplicado)? _(ligada a B-010)_
- Ao trocar de venue (Bar/Restaurante/Café), os filtros da lateral devem ser zerados? Hoje ficam independentes.
- Qual serviço usar para a newsletter (e/ou WhatsApp)? _(ligada a B-002)_

## Concluído

- [x] Banner e foto no celular (2026-10-30): foto da Helena (`@lenanmello`) virou polaroid dentro do banner, ao lado do 1º parágrafo; banner de ~1270px para ~610px (só o 1º parágrafo + "Ler mais", texto à esquerda e menor, logo/ícones/botões menores). Só abaixo de 768px — o desktop não mudou. Ideia ainda não feita: filtros recolhíveis no celular (a caixa "Filtros" ocupa ~560px antes do 1º spot).
- [x] Segunda rodada de ajustes (2026-10-29): foto da lateral trocada por `assets/foto-lateral.jpg` (colorida, legenda `@lenanmello`); favoritos (coração do cabeçalho e item do menu do celular) e perfil ocultos — comentados no `index.html`, é só remover o comentário para voltar; emojis removidos das categorias e filtros no guia e no mapa (sobraram só o ✕ do botão "limpar" e o 🎉 da mensagem de inscrição).
- [x] Ajustes do PDF "Ajustes Le Spots", páginas 1–5 (2026-10-18): logo em imagem no header, banner e footer; ícones novos no banner e na seção "reminder"; texto de apresentação no banner (sem o texto de rodapé); abas "Restaurantes que abraçam / Barzinho perfeito / Cafés & brunch"; listas novas de Culinária e Ocasião; Instagram e e-mail no footer; ícone do footer; lateral de filtros com rolagem própria. Cores conferidas — decisão: os 4 tons principais ficam como base e rosa/limão/menta/vinho escuro seguem como tons de apoio. **Páginas 6–7 do PDF (após o "PARA POR AQUI!") não foram feitas.** Pendências: B-018.
- [x] Guia com cards estilo scrapbook e filtros por facetas (venue + cozinha/ocasião/selos, combinados com E)
- [x] Mapa Leaflet/Esri sem chave de API, popup horizontal e botão "Detalhes" que leva ao spot no guia
- [x] Newsletter (interface) + botão e diálogo "Assinar" em todas as telas
- [x] Nova tipografia (Work Sans, Joshico, Parfumerie Script) e paleta de 4 cores
- [x] 20 spots cadastrados com texto, categorias e selos _(fotos e coordenadas ainda pendentes)_
- [x] Publicação no GitHub Pages — no ar (verificado em 2026-10-18)
- [x] Sistema de documentação (CLAUDE.md, `docs/`, `/wrap-up`) — 2026-10-18
