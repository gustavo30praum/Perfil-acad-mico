/* ==========================================================================
   TEMA.JS  |  Encontro 7: Modo daltonismo (paleta de cores acessível)
   WCAG: 1.4.1 Uso de cor, 4.1.2 Nome, função, valor (aria-pressed)
   O botão liga/desliga o atributo data-paleta="daltonismo" no <html>; o CSS
   (variaveis.css) troca as cores. O JavaScript NÃO mexe em cores: só em um
   atributo. A escolha é lembrada em localStorage.
   ========================================================================== */
(function () {
  const raiz = document.documentElement;                 // elemento <html>
  const botao = document.querySelector('#botao-daltonismo');
  if (!botao) return;                                    // página sem o botão

  const CHAVE = 'paleta';

  // localStorage pode falhar (modo privado, bloqueio): sempre usar try/catch.
  function lerSalvo() {
    try { return localStorage.getItem(CHAVE); } catch (erro) { return null; }
  }
  function salvar(valor) {
    try { localStorage.setItem(CHAVE, valor); } catch (erro) { /* ignora */ }
  }

  // Liga ou desliga a paleta e informa o estado ao leitor de tela.
  function aplicar(ativo) {
    if (ativo) {
      raiz.setAttribute('data-paleta', 'daltonismo');
    } else {
      raiz.removeAttribute('data-paleta');
    }
    botao.setAttribute('aria-pressed', String(ativo));
  }

  // Estado inicial: o que o usuário escolheu da última vez.
  aplicar(lerSalvo() === 'daltonismo');

  botao.addEventListener('click', function () {
    const ativar = botao.getAttribute('aria-pressed') !== 'true';
    aplicar(ativar);
    salvar(ativar ? 'daltonismo' : 'padrao');
  });
})();