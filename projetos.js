/* ==========================================================================
   PROJETOS.JS  |  Encontro 8: cards dinâmicos e filtro por categoria
   WCAG: 4.1.3 Mensagens de status, 1.4.1 Uso de cor
   Atenção: fetch exige servidor (Live Server ou GitHub Pages), não file://.
   Segurança: os cards são criados com createElement + textContent. Assim,
   qualquer texto vindo do JSON é tratado como TEXTO, nunca como HTML (evita
   XSS). Os links só aceitam http, https ou caminhos relativos.
   ========================================================================== */
(function () {
  const lista = document.querySelector('#lista-projetos-cards');
  const filtros = document.querySelector('#filtros');
  const status = document.querySelector('#status-filtro');
  if (!lista || !filtros || !status) return;

  let projetos = [];
  const rotulos = { todos: 'Todos', web: 'Web', sistemas: 'Sistemas', dados: 'Dados' };

  // Cria um elemento com texto seguro.
  function criar(tag, texto) {
    const el = document.createElement(tag);
    el.textContent = texto;
    return el;
  }

  // Aceita apenas links http/https ou relativos; qualquer outro vira "#".
  function linkSeguro(url) {
    try {
      const u = new URL(url, window.location.href);
      return (u.protocol === 'http:' || u.protocol === 'https:') ? url : '#';
    } catch (erro) {
      return '#';
    }
  }

  // Monta um card <article> com os dados de um projeto.
  function criarCard(p) {
    const card = document.createElement('article');
    card.appendChild(criar('h3', p.titulo));

    const descricao = criar('p', p.descricao);
    descricao.className = 'texto-justificado';   // classe definida no CSS
    card.appendChild(descricao);

    const tecnologias = document.createElement('p');
    tecnologias.appendChild(criar('strong', 'Tecnologias:'));
    tecnologias.appendChild(document.createTextNode(' ' + (p.tecnologias || []).join(', ')));
    card.appendChild(tecnologias);

    const link = criar('a', 'Ver projeto ' + p.titulo);
    link.href = linkSeguro(p.link);
    card.appendChild(link);
    return card;
  }

  // Anuncia uma mensagem na região aria-live. Limpar antes garante que o
  // leitor de tela leia de novo mesmo quando o texto for igual ao anterior.
  function anunciar(mensagem) {
    status.textContent = '';
    window.setTimeout(function () { status.textContent = mensagem; }, 50);
  }

  // Mostra os cards da categoria. "anunciar" é falso na carga inicial para
  // não interromper o leitor de tela logo ao abrir a página.
  function renderizar(categoria, deveAnunciar) {
    const filtrados = categoria === 'todos'
      ? projetos
      : projetos.filter(function (p) { return p.categoria === categoria; });
    lista.replaceChildren.apply(lista, filtrados.map(criarCard));
    if (deveAnunciar) {
      anunciar(filtrados.length + ' projeto(s) exibido(s) na categoria ' + rotulos[categoria] + '.');
    }
  }

  // Clique em um botão de filtro.
  filtros.addEventListener('click', function (evento) {
    const botao = evento.target.closest('button[data-categoria]');
    if (!botao) return;
    filtros.querySelectorAll('button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b === botao));
    });
    renderizar(botao.dataset.categoria, true);
  });

  // Carrega o JSON; se falhar, mostra mensagem amigável.
  fetch('data/projetos.json')
    .then(function (resposta) {
      if (!resposta.ok) throw new Error('HTTP ' + resposta.status);
      return resposta.json();
    })
    .then(function (dados) {
      if (!Array.isArray(dados)) throw new Error('JSON inválido');
      // Mantém só os itens que têm os campos obrigatórios.
      projetos = dados.filter(function (p) {
        return p && typeof p.titulo === 'string' && typeof p.descricao === 'string';
      });
      renderizar('todos', false);
    })
    .catch(function () {
      lista.replaceChildren(criar('p', 'Não foi possível carregar os projetos agora. Tente novamente mais tarde.'));
    });
})();