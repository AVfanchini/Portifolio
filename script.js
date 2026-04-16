/* ============================================================
   script.js — Portfolio André Vinicius
   Módulos organizados como IIFEs independentes:
   1. Header — sombra ao rolar a página
   2. Internacionalização (i18n) — alternância PT/EN
   3. Navegação mobile — hamburguer toggle
   4. Animações de scroll — IntersectionObserver fade-up
   5. Scroll suave — offset para nav fixa
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
   MÓDULO 2 — INTERNACIONALIZAÇÃO (i18n)
   Gerencia alternância PT/EN com atributos data-i18n*,
   localStorage e atualização do <html lang>.
   Expõe window.i18n.t(key) para outros módulos.
   ============================================================ */
(function i18nModule() {
  'use strict';

  /* ── Dicionário completo ─────────────────────────────────── */
  var TRANSLATIONS = {
    pt: {
      meta: {
        title: 'André Fanchini | Consultor de Gestão & Especialista Six Sigma',
        description: 'André Vinicius Fanchini de Azevedo — Engenheiro, Gestor de Projetos. Especialista em Lean Six Sigma, Gestão da Qualidade e Melhoria Contínua de Processos.'
      },
      nav: {
        ariaLabel:    'Navegação principal',
        openMenu:     'Abrir menu',
        closeMenu:    'Fechar menu',
        langToggle:   'Alternar para inglês',
        numeros:      'Números',
        abordagem:    'Abordagem',
        metodologias: 'Metodologias',
        experiencias: 'Experiências',
        formacao:     'Formação',
        contato:      'Contato'
      },
      hero: {
        ariaLabel:  'Apresentação',
        eyebrow:    'Engenheiro · Gestor de projetos · Gestão Empresarial',
        headline:   'Resultados mensuráveis.<br>Operações mais eficientes.',
        subtitle:   'Transformo desafios operacionais em crescimento sustentável — unindo rigor técnico, Lean Six Sigma e gerenciamento de projetos para gerar impacto real nos resultados do negócio.',
        ctaContact: 'Entre em Contato',
        ctaExp:     'Ver Experiências',
        imgAlt:     'André Fanchini — Consultor de Gestão'
      },
      numeros: {
        ariaLabel:          'Indicadores de performance',
        title:              'Resultados que falam por si',
        subtitle:           'Impacto mensurável entregue em projetos reais.',
        highlightAriaLabel: 'Sete por cento de aumento no EBIT',
        highlightLabel:     'EBIT em cliente com indústria',
        highlightDesc:      'Principal resultado entregue via reestruturação de processos e gestão de qualidade',
        tickerAriaLabel:    'Outros indicadores de performance',
        ticker: [
          '+50 Projetos estruturados',
          '+12% em OEE em cliente industrial',
          '−30% custo não qualidade',
          '+5 anos de experiência de mercado',
          '+15% ganho de produtividade nos processos mapeados',
          'Implantação da ISO 9001'
        ]
      },
      abordagem: {
        ariaLabel: 'Metodologia de trabalho',
        title:     'Como trabalho',
        subtitle:  'Um processo estruturado em três etapas para transformar desafios operacionais em resultados sustentáveis.',
        step1: {
          title: 'Diagnóstico baseado em dados',
          body:  'Coleta estruturada de dados, análise de causa-raiz com Ishikawa e Pareto, e mapeamento detalhado do estado atual para identificar gaps operacionais com precisão técnica.'
        },
        step2: {
          title: 'Redesenho e Estruturação',
          body:  'Mapeamento de processos com BPMN, aplicação de Lean Six Sigma e DMAIC para redesenhar fluxos, eliminar desperdícios e estruturar sistemas de gestão eficientes.'
        },
        step3: {
          title: 'Resultados Sustentáveis',
          body:  'Implementação de KPIs e governança de indicadores, capacitação de equipes e dashboards para garantir a eficiência das melhorias implementadas e a tomada de decisão orientada a dados.'
        }
      },
      metodologias: {
        ariaLabel: 'Metodologias e ferramentas',
        title:     'Metodologias',
        subtitle:  'Frameworks e ferramentas aplicados com rigor técnico para gerar eficiência e crescimento mensurável.',
        card1: {
          title:         'Lean Six Sigma · DMAIC',
          desc:          'Metodologia para redução de variabilidade e eliminação de desperdícios em processos industriais, com foco em eficiência e qualidade.',
          tagsAriaLabel: 'Competências em Lean Six Sigma',
          tag5:          'Gestão'
        },
        card2: {
          title:         'Gestão da Qualidade',
          desc:          'Implantação e manutenção de sistemas de qualidade com foco em conformidade, melhoria contínua e atendimento às normas regulatórias.',
          tagsAriaLabel: 'Competências em Gestão da Qualidade',
          tag1:          'Melhoria contínua'
        },
        card3: {
          title:         'Gerenciamento de Projetos',
          desc:          'Estruturação e execução de projetos com metodologias ágeis e tradicionais, garantindo entregas dentro do escopo, prazo e custo.',
          tagsAriaLabel: 'Competências em Gerenciamento de Projetos',
          tag3:          'Gestão',
          tag4:          'Processos'
        },
        card4: {
          title:         'Business Intelligence',
          desc:          'Transformação de dados operacionais em dashboards e relatórios estratégicos para apoiar a tomada de decisão baseada em indicadores.',
          tagsAriaLabel: 'Competências em Business Intelligence',
          tag1:          'dashboards',
          tag3:          'balanço'
        }
      },
      idiomas: {
        ariaLabel: 'Idiomas',
        title:     'Idiomas',
        subtitle:  'Comunicação em múltiplos idiomas para atuação em contextos nacionais e internacionais.',
        lang1: { dotsLabel: 'Nível 5 de 5', label: 'Nativo'        },
        lang2: { dotsLabel: 'Nível 5 de 5', label: 'Fluente'       },
        lang3: { dotsLabel: 'Nível 2 de 5', label: 'Intermediário' },
        lang4: { dotsLabel: 'Nível 1 de 5', label: 'Básico'        }
      },
      experiencias: {
        ariaLabel:         'Experiência profissional',
        title:             'Experiências',
        subtitle:          'Trajetória profissional com foco em resultados e melhoria contínua em empresas do setor industrial e alimentício.',
        timelineAriaLabel: 'Linha do tempo profissional',
        clientsLabel:      'Clientes atendidos:',
        saibaMais:         'Saiba Mais',
        saibaMenos:        'Saiba Menos',
        item1: {
          role:   'Consultor Associado',
          period: 'Out 2024 – Abr 2026',
          body:   'Atuação como consultor em projetos organizacionais e de melhoria contínua, com foco no aumento de produtividade e eficiência em entrega. Condução de mapeamento e redesenho de processos utilizando Lean Six Sigma e BPMN, além de implementação de rotinas de gestão, KPIs e dashboards. Estruturação de múltiplos projetos com os clientes, com ganhos relevantes em OEE, redução de tempo e melhoria logística — resultando em geração direta no resultado financeiro dos clientes.',
          project1: {
            name: 'Karina Plásticos',
            li1:  'Redução de 15% no tempo de setup via classificação de máquinas por família de produto e SMED (Troca Rápida de Ferramental)',
            li2:  'Aumento de 12% no OEE e redução de 15–20% no tempo de máquina parada com implantação de sala de controle e apontamentos em tempo real',
            li3:  'Redução de 6% no tempo de abastecimento de matéria-prima após redesenho do fluxo logístico e sequenciamento de setup',
            li4:  'Geração de +7% de EBIT por meio do conjunto de ações implementadas',
          },
          project2: {
            name: 'Prefeitura de Guaxupé',
            li1:  'Estruturação de 50+ projetos municipais com escopo, cronograma, gestão de riscos e custos (PMBoK)',
            li2:  'Desenvolvimento de plano de voo e plataforma visual de acompanhamento de projetos',
            li3:  'Facilitação de workshops com stakeholders de múltiplas secretarias para alinhamento de escopo',
            li4:  'Dashboards em Power BI e análises quantitativas para tomada de decisão orientada a dados',
            li5:  'Implantação de gestão à vista, rituais de governança e planos de ação (5W2H, PDCA)',
          }
        },
        item2: {
          role:   'Coordenador de Qualidade',
          period: 'Abr 2023 – Out 2024',
          body:   'Responsável pela estruturação e coordenação do sistema de gestão da qualidade em ambiente industrial. Atuação na implementação da ISO 9001, definição de critérios de conformidade, qualificação de fornecedores e condução de auditorias internas e externas. Liderança de iniciativas que reduziram significativamente os custos de não qualidade, além da implantação de controle de processos, rastreabilidade e indicadores de desempenho.',
          li1:    'Redução de ~30% nos custos de não qualidade via projeto de reaproveitamento de material por moagem',
          li2:    'Estruturação completa do SGQ em indústria de transformação plástica com certificação ISO 9001 e implantação de boas práticas ISO 22000',
          li3:    'Implantação de laboratório de controle dimensional tridimensional, viabilizando atendimento a clientes de alta exigência técnica',
          li4:    'Implantação de sala limpa com ambiente controlado para produção dedicada a clientes com requisitos especiais',
          li5:    'Condução de auditorias internas e externas; qualificação de fornecedores com visitas in loco',
          li6:    'Estruturação de sistema de dados de qualidade: indicadores, RNC/CAPA, rastreabilidade e controles de processo'
        },
        item3: {
          role:   'Consultor de Processos e Qualidade',
          period: 'Jul 2022 – Dez 2022',
          body:   'Estruturação completa do SGQ em startup do setor alimentício. Desenvolvimento de documentação técnica (BPF, POPs), padronização de processos produtivos e organização do fluxo operacional. Apoio à certificação e aumento da eficiência produtiva por meio de melhorias de processo.',
          li1:    'Estruturação do SGQ do zero: Manual de BPF, POPs de produção, fichas técnicas e controle de não conformidades',
          li2:    'Redesenho do layout e fluxo da cozinha industrial, aumentando eficiência e padronização do processo produtivo',
          li3:    'Obtenção da certificação ISO 9001 — primeira certificação da empresa, viabilizando acesso a novos canais de distribuição',
          li4:    'Apoio à automação de rotinas administrativas e ao processo de faturamento, reduzindo retrabalho operacional'
        },
        item4: {
          role:   'Estagiário de Controle de Qualidade',
          period: 'Abr 2021 – Jun 2022',
          body:   'Atuação no suporte ao controle de processos produtivos e garantia de conformidade. Participação em análises laboratoriais, aplicação de boas práticas de fabricação e desenvolvimento de procedimentos operacionais.',
          li1:    'Execução de análises laboratoriais de produtos orgânicos (molhos, antepastos, condimentos) ao longo do processo produtivo',
          li2:    'Verificação de conformidade com BPF, checklists de controle de produção e avaliações de limpeza pós-produção',
          li3:    'Apoio ao desenvolvimento de procedimentos operacionais e fichas técnicas durante período de reestruturação operacional'
        }
      },
      formacao: {
        ariaLabel: 'Formação acadêmica',
        title:     'Formação',
        subtitle:  'Base técnica sólida combinando engenharia, gestão e certificações de excelência.',
        card1: { badge: 'MBA',       title: 'Gestão de Projetos',      institution: 'Fundação Getulio Vargas — FGV' },
        card2: { badge: 'Graduação', title: 'Engenharia de Alimentos',  institution: 'Faculdade de Engenharia Salvador Arena' },
        card3: { badge: 'Técnico',   title: 'Técnico em Química',       institution: 'Colégio Anchieta' }
      },
      contato: {
        ariaLabel:         'Contato',
        title:             'Vamos conversar?',
        subtitle:          'Estou disponível para novos projetos, parcerias e desafios. Entre em contato e vamos estruturar algo juntos.',
        btnEmail:          'Enviar E-mail',
        btnEmailAriaLabel: 'Enviar e-mail para André Fanchini',
        btnCV:             'Baixar CV',
        btnCVAriaLabel:    'Baixar currículo em PDF'
      },
      footer: {
        navAriaLabel: 'Links do rodapé',
        copyright:    '© 2026 André Fanchini. Todos os direitos reservados.',
        linkHome:     'Início',
        linkCV:       'Currículo',
        linkEmail:    'E-mail'
      }
    },

    en: {
      meta: {
        title: 'André Fanchini | Management Consultant & Six Sigma Specialist',
        description: 'André Vinicius Fanchini de Azevedo — Engineer, Project Manager. Specialist in Lean Six Sigma, Quality Management, and Continuous Process Improvement.'
      },
      nav: {
        ariaLabel:    'Main navigation',
        openMenu:     'Open menu',
        closeMenu:    'Close menu',
        langToggle:   'Switch to Portuguese',
        numeros:      'Numbers',
        abordagem:    'Approach',
        metodologias: 'Methodologies',
        experiencias: 'Experience',
        formacao:     'Education',
        contato:      'Contact'
      },
      hero: {
        ariaLabel:  'Introduction',
        eyebrow:    'Engineer · Project Manager · Business Management',
        headline:   'Measurable results.<br>More efficient operations.',
        subtitle:   'I turn operational challenges into sustainable growth — combining technical rigor, Lean Six Sigma, and project management to deliver real business impact.',
        ctaContact: 'Get in Touch',
        ctaExp:     'View Experience',
        imgAlt:     'André Fanchini — Management Consultant'
      },
      numeros: {
        ariaLabel:          'Performance indicators',
        title:              'Results that speak for themselves',
        subtitle:           'Measurable impact delivered in real projects.',
        highlightAriaLabel: 'Seven percent increase in EBIT',
        highlightLabel:     'EBIT at industrial client',
        highlightDesc:      'Primary result delivered through process restructuring and quality management',
        tickerAriaLabel:    'Other performance indicators',
        ticker: [
          '+50 Structured projects',
          '+12% OEE at industrial client',
          '−30% cost of non-quality',
          '+5 years of market experience',
          '+15% productivity gain in mapped processes',
          'ISO 9001 implementation'
        ]
      },
      abordagem: {
        ariaLabel: 'Working methodology',
        title:     'How I work',
        subtitle:  'A structured three-step process to transform operational challenges into sustainable results.',
        step1: {
          title: 'Data-driven diagnosis',
          body:  'Structured data collection, root-cause analysis with Ishikawa and Pareto, and detailed current-state mapping to pinpoint operational gaps with technical precision.'
        },
        step2: {
          title: 'Redesign & Structuring',
          body:  'Process mapping with BPMN, application of Lean Six Sigma and DMAIC to redesign workflows, eliminate waste, and build efficient management systems.'
        },
        step3: {
          title: 'Sustainable Results',
          body:  'KPI implementation and indicator governance, team enablement, and dashboards to sustain improvement efficiency and support data-driven decision-making.'
        }
      },
      metodologias: {
        ariaLabel: 'Methodologies and tools',
        title:     'Methodologies',
        subtitle:  'Frameworks and tools applied with technical rigor to drive efficiency and measurable growth.',
        card1: {
          title:         'Lean Six Sigma · DMAIC',
          desc:          'Methodology for reducing variability and eliminating waste in industrial processes, focused on efficiency and quality.',
          tagsAriaLabel: 'Lean Six Sigma skills',
          tag5:          'Management'
        },
        card2: {
          title:         'Quality Management',
          desc:          'Implementation and maintenance of quality management systems focused on compliance, continuous improvement, and regulatory standards.',
          tagsAriaLabel: 'Quality Management skills',
          tag1:          'Continuous improvement'
        },
        card3: {
          title:         'Project Management',
          desc:          'Structuring and executing projects with agile and traditional methodologies, ensuring deliveries within scope, time, and budget.',
          tagsAriaLabel: 'Project Management skills',
          tag3:          'Management',
          tag4:          'Processes'
        },
        card4: {
          title:         'Business Intelligence',
          desc:          'Transforming operational data into dashboards and strategic reports to support indicator-based decision-making.',
          tagsAriaLabel: 'Business Intelligence skills',
          tag1:          'dashboards',
          tag3:          'balance sheet'
        }
      },
      idiomas: {
        ariaLabel: 'Languages',
        title:     'Languages',
        subtitle:  'Multilingual communication for both domestic and international settings.',
        lang1: { dotsLabel: 'Level 5 of 5', label: 'Native'  },
        lang2: { dotsLabel: 'Level 5 of 5', label: 'Fluent'  },
        lang3: { dotsLabel: 'Level 1 of 5', label: 'Basic'   },
        lang4: { dotsLabel: 'Level 1 of 5', label: 'Basic'   }
      },
      experiencias: {
        ariaLabel:         'Professional experience',
        title:             'Experience',
        subtitle:          'Professional track record focused on results and continuous improvement in industrial and food-sector companies.',
        timelineAriaLabel: 'Professional timeline',
        clientsLabel:      'Clients served:',
        saibaMais:         'Learn More',
        saibaMenos:        'Show Less',
        item1: {
          role:   'Associate Consultant',
          period: 'Oct 2024 – Apr 2026',
          body:   'Consulting on organizational and continuous improvement projects focused on increasing productivity and delivery efficiency. Process mapping and redesign using Lean Six Sigma and BPMN, combined with implementation of management routines, KPIs, and dashboards. Structured multiple client projects with relevant gains in OEE, time reduction, and logistics improvement — directly impacting client financial results.',
          project1: {
            name: 'Karina Plastics',
            li1:  '15% reduction in setup time through machine classification by product family and SMED (Single-Minute Exchange of Dies)',
            li2:  '12% OEE increase and 15–20% reduction in total machine downtime via real-time control room and KPI governance',
            li3:  '6% reduction in raw-material replenishment time after logistics flow redesign and setup sequencing',
            li4:  '+7% EBIT gain generated by the full set of implemented actions'
          },
          project2: {
            name: 'Guaxupé City Hall',
            li1:  'Structuring of 50+ municipal projects with scope, schedule, risk management, and cost tracking (PMBoK)',
            li2:  'Development of a project flight plan and visual tracking platform',
            li3:  'Facilitation of workshops with stakeholders from multiple departments for scope alignment',
            li4:  'Power BI dashboards and quantitative analysis to support data-driven decision-making',
            li5:  'Implementation of visual management, governance rituals, and action plans (5W2H, PDCA)'
          }
        },
        item2: {
          role:   'Quality Coordinator',
          period: 'Apr 2023 – Oct 2024',
          body:   'Responsible for structuring and coordinating the quality management system in an industrial environment. Led ISO 9001 implementation, conformity criteria definition, supplier qualification, and internal and external audits. Drove initiatives that significantly reduced non-quality costs, and implemented process controls, traceability, and performance indicators.',
          li1:    '~30% reduction in non-quality costs through a material reclaim project via grinding of non-conforming parts',
          li2:    'Full QMS implementation in a plastics manufacturing plant with ISO 9001 certification and ISO 22000 best practices',
          li3:    'Implementation of a 3D dimensional inspection lab, enabling service to high-demand clients',
          li4:    'Implementation of a cleanroom with controlled environment for clients with special production requirements',
          li5:    'Conducted internal and external audits; qualified suppliers with on-site technical inspections',
          li6:    'Built quality data system: KPIs, non-conformance analysis (RNC/CAPA), traceability, and process controls'
        },
        item3: {
          role:   'Process & Quality Consultant',
          period: 'Jul 2022 – Dec 2022',
          body:   'Full QMS implementation at a food-sector startup. Development of technical documentation (GMP, SOPs), standardization of production processes, and organization of the operational flow. Supported certification and increased production efficiency through process improvements.',
          li1:    'Built the QMS from scratch: GMP manual, production SOPs, technical data sheets, and non-conformance controls',
          li2:    'Redesigned the industrial kitchen layout and production flow, increasing efficiency and standardization',
          li3:    'Obtained ISO 9001 certification — the company\'s first, enabling access to new distribution channels',
          li4:    'Supported automation of administrative routines and billing processes, reducing operational rework'
        },
        item4: {
          role:   'Quality Control Intern',
          period: 'Apr 2021 – Jun 2022',
          body:   'Support in production process control and quality compliance. Participated in laboratory analyses, applied good manufacturing practices, and contributed to the development of standard operating procedures.',
          li1:    'Conducted laboratory analyses of organic products (sauces, spreads, condiments) throughout the production process',
          li2:    'Verified GMP compliance, production control checklists, and post-production cleaning assessments',
          li3:    'Supported development of SOPs and technical data sheets during an operational restructuring period'
        }
      },
      formacao: {
        ariaLabel: 'Academic background',
        title:     'Education',
        subtitle:  'Solid technical foundation combining engineering, management, and excellence certifications.',
        card1: { badge: 'MBA',         title: 'Project Management', institution: 'Fundação Getulio Vargas — FGV' },
        card2: { badge: "Bachelor's",  title: 'Food Engineering',   institution: 'Faculdade de Engenharia Salvador Arena' },
        card3: { badge: 'Technical',   title: 'Chemical Technology', institution: 'Colégio Anchieta' }
      },
      contato: {
        ariaLabel:         'Contact',
        title:             "Let's talk?",
        subtitle:          "I'm available for new projects, partnerships, and challenges. Get in touch and let's build something together.",
        btnEmail:          'Send Email',
        btnEmailAriaLabel: 'Send email to André Fanchini',
        btnCV:             'Download CV',
        btnCVAriaLabel:    'Download resume as PDF'
      },
      footer: {
        navAriaLabel: 'Footer links',
        copyright:    '© 2026 André Fanchini. All rights reserved.',
        linkHome:     'Home',
        linkCV:       'Resume',
        linkEmail:    'Email'
      }
    }
  };

  /* ── Resolve chave com pontos: 'hero.ctaContact' → string ── */
  function resolve(lang, key) {
    var parts = key.split('.');
    var val = TRANSLATIONS[lang];
    for (var i = 0; i < parts.length; i++) {
      if (val == null) return key;
      val = val[parts[i]];
    }
    return typeof val === 'string' ? val : key;
  }

  /* ── Reconstrói o ticker traduzido ─────────────────────── */
  function rebuildTicker(lang) {
    var track = document.querySelector('.ticker__track');
    if (!track) return;
    var items = TRANSLATIONS[lang].numeros.ticker;
    var sep = '<span class="ticker__separator" aria-hidden="true">◆</span>';
    var html = '';
    items.forEach(function (text) {
      html += '<span class="ticker__item">' + text + '</span>' + sep;
    });
    items.forEach(function (text) {
      html += '<span class="ticker__item" aria-hidden="true">' + text + '</span>' + sep;
    });
    var newTrack = track.cloneNode(false);
    newTrack.innerHTML = html;
    track.parentNode.replaceChild(newTrack, track);
  }

  /* ── Aplica idioma a todos os nós data-i18n* ────────────── */
  function applyLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = resolve(lang, el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      el.innerHTML = resolve(lang, el.getAttribute('data-i18n-html'));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', resolve(lang, el.getAttribute('data-i18n-aria')));
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      el.alt = resolve(lang, el.getAttribute('data-i18n-alt'));
    });

    rebuildTicker(lang);

    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.title = resolve(lang, 'meta.title');
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', resolve(lang, 'meta.description'));

    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      var opts = btn.querySelectorAll('.lang-toggle__option');
      if (opts.length >= 2) {
        opts[0].classList.toggle('lang-toggle__option--active', lang === 'pt');
        opts[1].classList.toggle('lang-toggle__option--active', lang === 'en');
      }
      btn.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false');
    });
  }

  /* ── Alterna idioma ─────────────────────────────────────── */
  function toggle() {
    var cur  = localStorage.getItem('lang') || 'pt';
    var next = cur === 'pt' ? 'en' : 'pt';
    localStorage.setItem('lang', next);
    applyLanguage(next);
  }

  /* ── API pública para outros módulos ────────────────────── */
  window.i18n = {
    t: function (key) {
      return resolve(localStorage.getItem('lang') || 'pt', key);
    }
  };

  /* ── Init ───────────────────────────────────────────────── */
  var initialLang = localStorage.getItem('lang') || 'pt';
  applyLanguage(initialLang);

  document.querySelectorAll('.lang-toggle').forEach(function (btn) {
    btn.addEventListener('click', toggle);
  });
})();


/* ============================================================
   MÓDULO 3 — NAVEGAÇÃO MOBILE (HAMBURGUER)
   Controla abertura/fechamento do menu mobile com:
   - toggle de classes e aria-expanded
   - bloqueio de scroll do body enquanto menu está aberto
   - fechamento ao clicar em qualquer link do menu
   - fechamento com a tecla Escape
   Usa window.i18n.t() para strings de aria-label localizadas.
   ============================================================ */
(function mobileNav() {
  var toggle = document.querySelector('.nav__toggle');
  var menu   = document.querySelector('.nav__menu');
  if (!toggle || !menu) return;

  function openMenu() {
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', window.i18n ? window.i18n.t('nav.closeMenu') : 'Fechar menu');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', window.i18n ? window.i18n.t('nav.openMenu') : 'Abrir menu');
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
   MÓDULO 4 — ANIMAÇÕES DE SCROLL (FADE-UP)
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
   MÓDULO 5 — SCROLL SUAVE COM OFFSET
   Intercepta cliques em links âncora (#) e aplica scroll
   suave com compensação da altura da nav fixa (64px).
   ============================================================ */
/* ============================================================
   MÓDULO 6 — TIMELINE: EXPANDIR / RECOLHER (SAIBA MAIS)
   ============================================================ */

(function timelineToggle() {
  document.querySelectorAll('.timeline__toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card    = btn.closest('.timeline__card');
      var details = card.querySelector('.timeline__details');
      var isExpanded = card.classList.toggle('timeline__card--expanded');

      btn.setAttribute('aria-expanded', String(isExpanded));

      if (isExpanded) {
        details.removeAttribute('hidden');
      } else {
        // Reaplica hidden após o fim da transição para que leitores de tela saibam que está recolhido
        details.addEventListener('transitionend', function handler(e) {
          if (e.propertyName !== 'opacity') return;
          if (!card.classList.contains('timeline__card--expanded')) {
            details.setAttribute('hidden', '');
          }
          details.removeEventListener('transitionend', handler);
        });
      }
    });
  });
})();

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
