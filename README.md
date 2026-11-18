# Portfólio — Seu Nome Sobrenome

Portfólio profissional do **Curso Técnico em Desenvolvimento de Sistemas** (3º ano).

**Site publicado:** https://USUARIO.github.io/portfolio-nome-sobrenome/

## Tecnologias
- HTML5 semântico
- CSS3 (Flexbox, Grid, variáveis)
- JavaScript (DOM, fetch, JSON)
- Acessibilidade: WCAG 2.2 nível AA

## Estrutura de pastas
```
portfolio-nome-sobrenome/
├── index.html          página principal (sobre, formação, habilidades, projetos, contato)
├── projetos.html       catálogo de projetos com filtro (dados vêm do JSON)
├── css/
│   ├── reset.css       neutraliza estilos padrão dos navegadores
│   ├── variaveis.css   cores, fontes, espaços e paleta para daltonismo
│   ├── base.css        texto, links, foco visível e skip link
│   ├── layout.css      cabeçalho fixo, grids e responsividade (mobile-first)
│   └── componentes.css menu, cards, tabela, formulário, botões e estados
├── js/
│   ├── menu.js         menu hambúrguer acessível
│   ├── tema.js         modo daltonismo (paleta de cores acessível)
│   ├── projetos.js     cards dinâmicos e filtro por categoria
│   └── formulario.js   validação acessível do formulário
├── img/                imagens (foto de perfil)
├── data/projetos.json  dados dos projetos
└── README.md
```

## Como executar
1. Clone o repositório.
2. Abra a pasta no VS Code e use a extensão **Live Server**.
   (O `fetch` do JSON não funciona abrindo o arquivo direto no navegador.)

## Como personalizar
- Troque "Seu Nome" e os textos em `index.html` e `projetos.html`.
- Substitua `img/perfil.jpg` pela sua foto e ajuste o `alt`.
- Edite `data/projetos.json` com seus projetos (categorias: `web`, `sistemas`, `dados`; troque os links `#` pelos endereços reais).
- Para mudar a identidade visual, altere só as variáveis em `css/variaveis.css`.
- Parágrafos com mais de uma linha usam `class="texto-justificado"`.

## Modo daltonismo
O botão **Modo daltonismo** (no cabeçalho) troca a paleta de cores por uma baseada na paleta de Okabe e Ito:
azul e laranja no lugar de verde e vermelho, que se distinguem bem nos tipos mais comuns de daltonismo.
Também liga reforços que não dependem de cor (links com sublinhado mais grosso, borda lateral nos cards, sublinhado duplo na página atual).
A escolha fica salva no navegador (`localStorage`).

## Decisões de acessibilidade
- HTML semântico, títulos em ordem e skip link.
- Informação nunca depende só da cor: links sublinhados, ✓ nos botões ativos, prefixo "Erro:" e borda tracejada nos campos inválidos.
- Contraste mínimo de 4,5:1 nas duas paletas (conferido por cálculo).
- Foco visível, áreas clicáveis de 44 px e cabeçalho/rodapé fixos sem esconder o foco.
- Menu e modo daltonismo operáveis por teclado, com `aria-expanded` e `aria-pressed`.
- Filtro anunciado por `aria-live`; erros do formulário ligados aos campos.
- Movimento reduzido respeitado (`prefers-reduced-motion`).
- Menu visível mesmo sem JavaScript (melhoria progressiva).

## Auditoria
- Lighthouse (Acessibilidade): ___ pontos
- Testado com teclado, zoom de 200% e leitor de tela: ____