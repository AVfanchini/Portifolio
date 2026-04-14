/* ============================================================
   script.js — Portfolio André Vinicius
   Módulos organizados como IIFEs independentes:
   1. Header — sombra ao rolar a página
   2. Navegação mobile — hamburguer toggle
   3. Animações de scroll — IntersectionObserver fade-up
   4. Scroll suave — offset para nav fixa
   ============================================================ */

'use strict';

/* ============================================================
   MÓDULO 1 — HEADER SHADOW
   Adiciona a classe .is-scrolled ao header quando o usuário
   rola para baixo da posição inicial da página.
   ============================================================ */
(function headerShadow() {
  var header = document.querySelector('.header');
  if (!header) return;

  // Elemento sentinela invisível no topo de <main>
  var sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText =
    'position:absolute;top:0;left:0;height:1px;width:1px;pointer-events:none;';

  var main = document.querySelector('main');
  if (main) main.prepend(sentinel);

  var observer = new IntersectionObserver(
    function (entries) {
      // Quando o sentinela sai da viewport, o usuário rolou para baixo
      header.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    },
    { threshold: 0 }
  );

  observer.observe(sentinel);
})();


/* ============================================================
   MÓDULO 2 — NAVEGAÇÃO MOBILE (HAMBURGUER)
   Controla abertura/fechamento do menu mobile com:
   - toggle de classes e aria-expanded
   - bloqueio de scroll do body enquanto menu está aberto
   - fechamento ao clicar em qualquer link do menu
   - fechamento com a tecla Escape
   ============================================================ */
(function mobileNav() {
  var toggle = document.querySelector('.nav__toggle');
  var menu   = document.querySelector('.nav__menu');
  if (!toggle || !menu) return;

  function openMenu() {
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function () {
    var isOpen = menu.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Fecha ao clicar em qualquer link dentro do menu
  menu.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Fecha ao pressionar Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
      toggle.focus(); // Devolve foco ao botão para acessibilidade
    }
  });

  // Fecha se a janela for redimensionada para desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });
})();


/* ============================================================
   MÓDULO 3 — ANIMAÇÕES DE SCROLL (FADE-UP)
   Observa elementos e adiciona .is-visible quando entram
   na viewport, criando efeito de fade + slide para cima.
   Respeita a preferência de movimento reduzido do sistema.
   ============================================================ */
(function scrollAnimations() {
  // Não anima se o usuário preferir movimento reduzido
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var SELECTORS = [
    '.step-card',
    '.method-card',
    '.timeline__item',
    '.edu-card',
    '.numeros__highlight',
  ].join(', ');

  var elements = document.querySelectorAll(SELECTORS);
  if (!elements.length) return;

  // Adiciona .reveal a cada elemento e escalonamento entre irmãos
  elements.forEach(function (el) {
    el.classList.add('reveal');

    // Detecta posição do elemento entre seus irmãos diretos no grid/lista
    var parent = el.parentElement;
    if (!parent) return;

    var siblings = Array.from(parent.querySelectorAll(':scope > *'));
    var index = siblings.indexOf(el);

    // Aplica delay apenas para os três primeiros irmãos (evita delays muito longos)
    if (index >= 1 && index <= 3) {
      el.classList.add('reveal--delay-' + index);
    }
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Anima apenas uma vez
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px', // Ativa a animação um pouco antes do elemento ser totalmente visível
    }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();


/* ============================================================
   MÓDULO 4 — SCROLL SUAVE COM OFFSET
   Intercepta cliques em links âncora (#) e aplica scroll
   suave com compensação da altura da nav fixa (64px).
   ============================================================ */
(function smoothScrollOffset() {
  var NAV_HEIGHT = 64; // Deve coincidir com --nav-height no CSS

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (!href || href === '#') return;

      var target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      var top =
        target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;

      window.scrollTo({ top: top, behavior: 'smooth' });

      // Atualiza a URL sem acionar nova navegação
      if (history.pushState) {
        history.pushState(null, null, href);
      }
    });
  });
})();
