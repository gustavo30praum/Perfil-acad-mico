/* ==========================================================================
   MENU.JS  |  Encontro 7: menu responsivo (hambúrguer)
   WCAG: 2.1.1 Teclado, 2.1.2 Sem armadilha de teclado, 4.1.2 Nome, função, valor
   Melhoria progressiva: sem JavaScript, o menu continua visível.
   ========================================================================== */
(function () {
  // A classe "js" avisa o CSS de que o JavaScript está ativo.
  document.documentElement.classList.add('js');

  const botao = document.querySelector('.menu-botao');
  const menu = document.querySelector('#menu-principal');
  if (!botao || !menu) return;           // página sem menu: não faz nada

  // Abre ou fecha o menu e mantém aria-expanded sincronizado.
  function definirMenu(aberto) {
    botao.setAttribute('aria-expanded', String(aberto));
    menu.classList.toggle('aberto', aberto);
  }

  // Clique, Enter e Espaço disparam "click" em um <button> de verdade.
  botao.addEventListener('click', function () {
    const estaAberto = botao.getAttribute('aria-expanded') === 'true';
    definirMenu(!estaAberto);
  });

  // Esc fecha o menu e devolve o foco ao botão (WCAG 2.1.2).
  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && botao.getAttribute('aria-expanded') === 'true') {
      definirMenu(false);
      botao.focus();
    }
  });

  // Ao escolher um link, o menu fecha.
  menu.addEventListener('click', function (evento) {
    if (evento.target.closest('a')) definirMenu(false);
  });

  // Ao ampliar a janela para o desktop (600px ou mais), o menu volta ao
  // estado "fechado": evita aria-expanded="true" num botão que sumiu.
  window.matchMedia('(min-width: 600px)').addEventListener('change', function (evento) {
    if (evento.matches) definirMenu(false);
  });
})();