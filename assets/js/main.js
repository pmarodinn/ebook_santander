// Navegação suave entre páginas, controle de progresso e animações

(function() {
  const $ = (s, el=document) => el.querySelector(s);
  const $$ = (s, el=document) => Array.from(el.querySelectorAll(s));

  // Marca a página como carregada
  window.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => document.body.classList.add('enter'));
    updateProgress();
  });

  // Transição ao sair da página
  function go(url) {
    document.body.classList.add('fade');
    setTimeout(() => { window.location.href = url; }, 180);
  }

  // Atualiza barra de progresso
  function updateProgress() {
    const total = 30; // páginas totais
    const match = window.location.pathname.match(/page-(\d+)\.html$/);
    const i = match ? parseInt(match[1], 10) : 1;
    const pct = Math.max(0, Math.min(100, (i-1)/(total-1) * 100));
    const bar = $('#progress .bar');
    if (bar) bar.style.width = pct + '%';
  }

  // Intercepta cliques nos botões de navegação
  window.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-nav]');
    if (!a) return;
    e.preventDefault();
    go(a.href);
  });

  // Atalhos de teclado para navegação
  window.addEventListener('keydown', (e) => {
    const prev = $('a.prev');
    const next = $('a.next');
    if (e.key === 'ArrowLeft' && prev) { e.preventDefault(); go(prev.href); }
    if (e.key === 'ArrowRight' && next) { e.preventDefault(); go(next.href); }
  });

  // Exponha utilitários se necessário
  window.EBookNav = { updateProgress };
})();
