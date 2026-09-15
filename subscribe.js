/* ════════════════════════════════════════════════════════════════
   Le Spots — global subscribe widget
   Injects a floating "Assinar" button + a modal newsletter dialog
   onto any page that includes this script. Self-contained: styles,
   markup and logic all live here. Include on every screen with:
       <script src="subscribe.js"></script>
   ════════════════════════════════════════════════════════════════ */
(function () {
  // ── Palette / fonts (keep in sync with the site theme) ──
  const C = {
    wine:  '#8d0b0b',
    wineDeep: '#6d0808',
    beige: '#fdf8f0',
    amber: '#e8a12e',
    teal:  '#1c3535',
    ink:   '#2b211b',
    muted: '#6b5347',
  };
  const FONT_SCRIPT = "'Parfumerie Script', 'Great Vibes', cursive";
  const FONT_HEAD   = "'Joshico', 'Playfair Display', serif";
  const FONT_BODY   = "'Work Sans', sans-serif";
  const FONT_LABEL  = "'Be Vietnam Pro', sans-serif";

  // ── Inject styles ──
  const css = `
    .lsub-fab {
      position: fixed; left: 1.25rem; bottom: 1.5rem; z-index: 9000;
      display: inline-flex; align-items: center; gap: 8px;
      font-family: ${FONT_LABEL}; font-size: 11px; font-weight: 700;
      letter-spacing: 0.1em; text-transform: uppercase;
      padding: 12px 20px; cursor: pointer;
      background: ${C.wine}; color: #fff; border: 2px solid ${C.amber};
      box-shadow: 4px 4px 0 ${C.wineDeep}; transition: transform .15s, box-shadow .15s;
    }
    .lsub-fab:hover { transform: translateY(-2px); box-shadow: 6px 6px 0 ${C.wineDeep}; }
    .lsub-fab:active { transform: translateY(0); box-shadow: 2px 2px 0 ${C.wineDeep}; }
    .lsub-fab .material-symbols-outlined { font-size: 18px; font-variation-settings: 'FILL' 1; }
    @media (max-width: 768px) { .lsub-fab { bottom: 5.25rem; left: 1rem; padding: 11px 16px; } }

    .lsub-overlay {
      position: fixed; inset: 0; z-index: 9500; display: none;
      align-items: center; justify-content: center; padding: 1.25rem;
      background: rgba(43,33,27,0.55); backdrop-filter: blur(3px);
    }
    .lsub-overlay.open { display: flex; }

    .lsub-card {
      position: relative; width: 100%; max-width: 440px;
      background: ${C.beige}; border: 4px solid ${C.amber};
      box-shadow: 10px 10px 0 ${C.wineDeep};
      padding: 2rem 1.75rem 1.75rem; transform: rotate(-0.4deg);
      background-image: url("https://www.transparenttextures.com/patterns/natural-paper.png");
      animation: lsub-pop .22s ease-out;
    }
    @keyframes lsub-pop { from { opacity: 0; transform: rotate(-0.4deg) scale(.94); } to { opacity: 1; transform: rotate(-0.4deg) scale(1); } }

    .lsub-tape {
      position: absolute; top: -14px; left: 50%; transform: translateX(-50%) rotate(-2deg);
      width: 120px; height: 24px; background: rgba(232,161,46,0.7); border-radius: 2px;
    }
    .lsub-close {
      position: absolute; top: 8px; right: 10px; cursor: pointer; border: none; background: none;
      color: ${C.wine}; font-family: ${FONT_LABEL}; font-size: 22px; font-weight: 700; line-height: 1;
    }
    .lsub-eyebrow { font-family: ${FONT_LABEL}; font-size: 10px; font-weight: 700; letter-spacing: 0.3em;
      text-transform: uppercase; color: ${C.amber}; text-align: center; margin-bottom: 4px; }
    .lsub-title { font-family: ${FONT_SCRIPT}; font-size: clamp(2.4rem, 9vw, 3.2rem); line-height: 1;
      color: ${C.wine}; text-align: center; margin-bottom: 6px; }
    .lsub-sub { font-family: ${FONT_BODY}; font-style: italic; font-size: 0.9rem; color: ${C.muted};
      text-align: center; margin-bottom: 1.25rem; }

    .lsub-channels { display: flex; justify-content: center; gap: 10px; margin-bottom: 1rem; }
    .lsub-ch {
      cursor: pointer; user-select: none; display: inline-flex; align-items: center; gap: 6px;
      font-family: ${FONT_LABEL}; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
      padding: 8px 16px; border: 2px solid ${C.wine}; background: #fff; color: ${C.wine}; transition: all .15s;
    }
    .lsub-ch.active { background: ${C.wine}; color: #fff; }
    .lsub-ch .material-symbols-outlined { font-size: 15px; }

    .lsub-field { margin-bottom: 0.9rem; }
    .lsub-field.hidden { display: none; }
    .lsub-label { font-family: ${FONT_LABEL}; font-size: 9px; font-weight: 700; letter-spacing: 0.06em;
      text-transform: uppercase; color: ${C.wine}; display: block; margin-bottom: 4px; }
    .lsub-input {
      width: 100%; font-family: ${FONT_BODY}; font-size: 0.95rem; padding: 10px 14px;
      border: 2px solid ${C.wine}; background: #fff; color: ${C.ink};
    }
    .lsub-input:focus { outline: none; border-color: ${C.amber}; box-shadow: 3px 3px 0 ${C.amber}; }

    .lsub-submit {
      width: 100%; cursor: pointer; font-family: ${FONT_LABEL}; font-size: 12px; font-weight: 700;
      letter-spacing: 0.09em; text-transform: uppercase; padding: 13px; margin-top: 4px;
      background: ${C.wine}; color: #fff; border: 2px solid ${C.wine}; box-shadow: 4px 4px 0 ${C.amber};
      transition: transform .12s;
    }
    .lsub-submit:hover { transform: scale(1.02); }
    .lsub-submit:active { transform: scale(0.98); }
    .lsub-msg { font-family: ${FONT_LABEL}; font-size: 11px; text-align: center; margin-top: 10px; display: none; }
    .lsub-fine { font-family: ${FONT_BODY}; font-style: italic; font-size: 0.72rem; color: ${C.muted};
      opacity: 0.7; text-align: center; margin-top: 8px; }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ── Build markup ──
  const fab = document.createElement('button');
  fab.className = 'lsub-fab';
  fab.setAttribute('aria-label', 'Assinar a newsletter');
  fab.innerHTML = `<span class="material-symbols-outlined">mail</span> Assinar`;

  const overlay = document.createElement('div');
  overlay.className = 'lsub-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML = `
    <div class="lsub-card" role="document">
      <div class="lsub-tape"></div>
      <button class="lsub-close" aria-label="Fechar">&times;</button>
      <p class="lsub-eyebrow">Não perca nenhum spot</p>
      <p class="lsub-title">Entre na lista</p>
      <p class="lsub-sub">Receba os novos spots de SP em primeira mão — por email ou WhatsApp.</p>

      <form class="lsub-form" novalidate>
        <div class="lsub-channels">
          <span class="lsub-ch active" data-ch="email"><span class="material-symbols-outlined">mail</span> Email</span>
          <span class="lsub-ch" data-ch="whatsapp"><span class="material-symbols-outlined">chat</span> WhatsApp</span>
        </div>

        <div class="lsub-field" data-field="email">
          <label class="lsub-label">Seu email</label>
          <input type="email" class="lsub-input lsub-email" placeholder="voce@email.com" autocomplete="email">
        </div>

        <div class="lsub-field hidden" data-field="whatsapp">
          <label class="lsub-label">Seu WhatsApp (com DDD)</label>
          <input type="tel" class="lsub-input lsub-whatsapp" placeholder="(11) 99999-9999" autocomplete="tel">
        </div>

        <button type="submit" class="lsub-submit">Quero receber</button>
        <p class="lsub-msg"></p>
        <p class="lsub-fine">Sem spam. Só os bons lugares. Cancele quando quiser.</p>
      </form>
    </div>`;

  document.body.appendChild(fab);
  document.body.appendChild(overlay);

  // ── Refs ──
  const card     = overlay.querySelector('.lsub-card');
  const form     = overlay.querySelector('.lsub-form');
  const msg      = overlay.querySelector('.lsub-msg');
  const channels = { email: true, whatsapp: false };

  // ── Open / close ──
  function open() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => overlay.querySelector('.lsub-email').focus(), 60);
  }
  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  fab.addEventListener('click', open);
  overlay.querySelector('.lsub-close').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('open')) close(); });

  // ── Channel toggles ──
  overlay.querySelectorAll('.lsub-ch').forEach(ch => {
    ch.addEventListener('click', () => {
      const key = ch.dataset.ch;
      channels[key] = !channels[key];
      ch.classList.toggle('active', channels[key]);
      card.querySelector(`[data-field="${key}"]`).classList.toggle('hidden', !channels[key]);
    });
  });

  // ── Submit ──
  function showMsg(text, ok) {
    msg.textContent = text;
    msg.style.color = ok ? C.teal : '#ba1a1a';
    msg.style.display = 'block';
  }
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = overlay.querySelector('.lsub-email').value.trim();
    const whats = overlay.querySelector('.lsub-whatsapp').value.trim();

    if (!channels.email && !channels.whatsapp) return showMsg('Escolha pelo menos um canal.', false);
    if (channels.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return showMsg('Digite um email válido.', false);
    if (channels.whatsapp && whats.replace(/\D/g, '').length < 10) return showMsg('Digite um WhatsApp válido com DDD.', false);

    // Static site: persist locally. Swap for a real POST to your backend later.
    const sub = {
      email: channels.email ? email : null,
      whatsapp: channels.whatsapp ? whats : null,
      page: location.pathname,
      at: new Date().toISOString(),
    };
    try {
      const list = JSON.parse(localStorage.getItem('lespots_subscribers') || '[]');
      list.push(sub);
      localStorage.setItem('lespots_subscribers', JSON.stringify(list));
    } catch (_) {}

    form.reset();
    showMsg('🎉 Pronto! Você está na lista.', true);
    setTimeout(close, 1400);
  });

  // Allow other elements to open the dialog: <button data-open-subscribe>…</button>
  document.querySelectorAll('[data-open-subscribe]').forEach(el => el.addEventListener('click', open));
  window.LeSpotsSubscribe = { open, close };
})();
