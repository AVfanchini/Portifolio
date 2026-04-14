---
Toda vez que for criar páginas web ou editar, utilize essa skill para construção da mesma

---

## 1. Identidade Visual

### 1.1 Logo / Marca Pessoal

Modalidade: **apenas nome tipográfico**, sem símbolo ou ícone.

Composição: `André` em peso leve (Montserrat Light 300) + `Fanchini` em peso extrabold (Montserrat ExtraBold 800), na mesma linha, mesmo corpo. O contraste de peso cria a identidade sem necessidade de elemento gráfico adicional.

| Elemento | Fonte | Peso | Cor (fundo claro) | Cor (fundo escuro) |
|----------|-------|------|-------------------|-------------------|
| André | Montserrat | 300 (Light) | `#1A2744` Navy | `#FFFFFF` |
| Fanchini | Montserrat | 800 (ExtraBold) | `#0A0A0A` Preto | `#FFFFFF` |

Variações previstas: versão escura (texto navy + preto sobre fundo branco) e versão clara (texto branco sobre fundo navy).

---

### 1.2 Paleta de Cores

#### Primária — Navy
| Token | Hex | Uso |
|-------|-----|-----|
| Primary 900 | `#0D1B2A` | Títulos, elementos de alto contraste |
| Primary 800 | `#1A2744` | Cor principal navy |
| Primary 700 | `#1E3461` | Hover de elementos primários |
| Primary 500 | `#2A4A8A` | Links, CTAs secundários |
| Primary 200 | `#B0C4E8` | Fundos de destaque suave |
| Primary 50  | `#EEF2FA` | Background tinted leve |

#### Secundária — Preto (Tipográfico)
| Token | Hex | Uso |
|-------|-----|-----|
| Secondary 900 | `#0A0A0A` | Texto principal, "Fanchini" no logo |
| Secondary 700 | `#1C1C1C` | Texto de corpo |
| Secondary 400 | `#4A4A4A` | Texto secundário, subtítulos |
| Secondary 200 | `#8A8A8A` | Placeholders, captions, labels |

#### Neutras — Branco e Cinzas
| Token | Hex | Uso |
|-------|-----|-----|
| Neutral 0   | `#FFFFFF` | Background principal |
| Neutral 50  | `#F9F9FB` | Background de seções alternadas |
| Neutral 100 | `#F0F0F4` | Background de cards |
| Neutral 200 | `#E0E0E8` | Bordas padrão |
| Neutral 300 | `#C8C8D4` | Bordas de inputs |
| Neutral 500 | `#8A8A9A` | Texto desabilitado |

#### Semânticas — Feedback
| Token | Hex | Uso |
|-------|-----|-----|
| Success | `#1A6B3C` | Confirmações, formulário enviado |
| Error   | `#B82222` | Erros, campos inválidos |
| Warning | `#A06000` | Alertas, atenção |
| Info    | `#1A2744` | Informações (reutiliza navy) |

---

### 1.3 Tipografia

**Família principal:** Montserrat (Google Fonts)
**Família de apoio:** Não é necessária — toda a escala é suprida pela família Montserrat com variação de peso.

#### Escala Tipográfica

| Tag | Tamanho | Peso | Line-height | Letter-spacing | Uso |
|-----|---------|------|-------------|----------------|-----|
| H1 | 56px / 3.5rem | 700 Bold | 1.1 | -0.02em | Título hero |
| H2 | 40px / 2.5rem | 700 Bold | 1.15 | -0.01em | Títulos de seção |
| H3 | 28px / 1.75rem | 600 SemiBold | 1.2 | 0 | Subtítulos de seção |
| H4 | 22px / 1.375rem | 600 SemiBold | 1.3 | 0 | Títulos de card |
| H5 | 18px / 1.125rem | 600 SemiBold | 1.4 | 0 | Labels de destaque |
| H6 | 16px / 1rem | 600 SemiBold | 1.4 | 0.01em | Labels menores |
| Body Large | 18px / 1.125rem | 400 Regular | 1.7 | 0 | Parágrafos de destaque |
| Body | 16px / 1rem | 400 Regular | 1.7 | 0 | Texto corrido |
| Body Small | 14px / 0.875rem | 400 Regular | 1.6 | 0 | Texto auxiliar |
| Caption | 12px / 0.75rem | 400 Regular | 1.5 | 0.02em | Legendas, metadados |
| Label | 11px / 0.6875rem | 700 Bold | 1.4 | 0.1em (uppercase) | Tags, badges, labels de seção |

#### Pesos utilizados
- **300** Light — "André" no logo
- **400** Regular — Texto corrido, body
- **500** Medium — Destaques internos, navegação
- **600** SemiBold — Subtítulos, H3–H6
- **700** Bold — Títulos H1, H2, botões
- **800** ExtraBold — "Fanchini" no logo, números de impacto (seção Números)

---

## 2. Design Tokens (CSS Custom Properties)

```css
:root {

  /* ─── CORES ─── */

  /* Primária — Navy */
  --color-primary-900: #0D1B2A;
  --color-primary-800: #1A2744;
  --color-primary-700: #1E3461;
  --color-primary-500: #2A4A8A;
  --color-primary-200: #B0C4E8;
  --color-primary-50:  #EEF2FA;

  /* Aliases semânticos primários */
  --color-primary:        var(--color-primary-800);
  --color-primary-hover:  var(--color-primary-700);
  --color-primary-subtle: var(--color-primary-50);

  /* Secundária — Preto tipográfico */
  --color-secondary-900: #0A0A0A;
  --color-secondary-700: #1C1C1C;
  --color-secondary-400: #4A4A4A;
  --color-secondary-200: #8A8A8A;

  /* Neutras */
  --color-neutral-0:   #FFFFFF;
  --color-neutral-50:  #F9F9FB;
  --color-neutral-100: #F0F0F4;
  --color-neutral-200: #E0E0E8;
  --color-neutral-300: #C8C8D4;
  --color-neutral-500: #8A8A9A;

  /* Semânticas */
  --color-success: #1A6B3C;
  --color-error:   #B82222;
  --color-warning: #A06000;
  --color-info:    var(--color-primary-800);

  /* Backgrounds e textos alias */
  --color-bg:           var(--color-neutral-0);
  --color-bg-section:   var(--color-neutral-50);
  --color-bg-card:      var(--color-neutral-100);
  --color-text-primary: var(--color-secondary-900);
  --color-text-muted:   var(--color-secondary-400);
  --color-text-subtle:  var(--color-neutral-500);
  --color-border:       var(--color-neutral-200);
  --color-border-focus: var(--color-primary-800);


  /* ─── TIPOGRAFIA ─── */
  --font-family: 'Montserrat', sans-serif;

  --font-size-h1:    3.5rem;   /* 56px */
  --font-size-h2:    2.5rem;   /* 40px */
  --font-size-h3:    1.75rem;  /* 28px */
  --font-size-h4:    1.375rem; /* 22px */
  --font-size-h5:    1.125rem; /* 18px */
  --font-size-h6:    1rem;     /* 16px */
  --font-size-body-lg: 1.125rem;
  --font-size-body:    1rem;   /* 16px — base */
  --font-size-sm:    0.875rem; /* 14px */
  --font-size-caption: 0.75rem;
  --font-size-label:   0.6875rem;

  --font-weight-light:      300;
  --font-weight-regular:    400;
  --font-weight-medium:     500;
  --font-weight-semibold:   600;
  --font-weight-bold:       700;
  --font-weight-extrabold:  800;

  --line-height-tight:   1.1;
  --line-height-snug:    1.3;
  --line-height-normal:  1.5;
  --line-height-relaxed: 1.7;


  /* ─── ESPAÇAMENTOS ─── */
  --spacing-2xs: 0.25rem;  /*  4px */
  --spacing-xs:  0.5rem;   /*  8px */
  --spacing-sm:  0.75rem;  /* 12px */
  --spacing-md:  1rem;     /* 16px */
  --spacing-lg:  1.5rem;   /* 24px */
  --spacing-xl:  2rem;     /* 32px */
  --spacing-2xl: 3rem;     /* 48px */
  --spacing-3xl: 4rem;     /* 64px */
  --spacing-4xl: 6rem;     /* 96px */
  --spacing-5xl: 8rem;     /* 128px */


  /* ─── BORDER RADIUS ─── */
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-pill: 9999px;


  /* ─── SOMBRAS ─── */
  --shadow-xs:    0 1px 2px rgba(10, 10, 10, 0.05);
  --shadow-sm:    0 2px 6px rgba(10, 10, 10, 0.07);
  --shadow-card:  0 4px 16px rgba(26, 39, 68, 0.08);
  --shadow-modal: 0 12px 40px rgba(26, 39, 68, 0.16);
  --shadow-focus: 0 0 0 3px rgba(26, 39, 68, 0.25);


  /* ─── BREAKPOINTS ─── */
  --bp-mobile:  360px;
  --bp-tablet:  768px;
  --bp-desktop: 1280px;
  --bp-wide:    1600px;


  /* ─── TRANSIÇÕES ─── */
  --duration-fast:   150ms;
  --duration-base:   250ms;
  --duration-slow:   400ms;
  --duration-enter:  500ms;

  --ease-default:  cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in:       cubic-bezier(0.4, 0, 1, 1);
  --ease-out:      cubic-bezier(0, 0, 0.2, 1);
  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);

}
```

---

## 3. Grid e Layout

| Breakpoint | Colunas | Gutter | Margem lateral | Max-width container |
|------------|---------|--------|----------------|---------------------|
| Mobile (< 768px) | 4 | 16px | 20px | 100% |
| Tablet (768px–1279px) | 8 | 24px | 40px | 100% |
| Desktop (≥ 1280px) | 12 | 32px | 80px | 1200px |
| Wide (≥ 1600px) | 12 | 32px | auto (centralizado) | 1200px |

**Regras gerais:**
- Container sempre centralizado, com `max-width: 1200px` e `margin: 0 auto`
- Seções com background alternado (`--color-bg` e `--color-bg-section`) usam `width: 100%` antes do container interno
- Conteúdo de texto nunca ultrapassa 72 caracteres de linha (medida tipográfica) — usar `max-width: 680px` em blocos de corpo

---

## 4. Componentes — Atomic Design

### 4.1 Átomos

**Botão Primário**
- Background: `--color-primary` · Texto: branco · Peso: 600 · Border-radius: `--radius-md`
- Padding: `12px 28px` · Tamanho de fonte: 15px
- Hover: background `--color-primary-hover`, translateY(-1px)
- Variação outline: border 1.5px navy, texto navy, fundo transparente

**Botão Secundário / Ghost**
- Border: 1.5px `--color-primary` · Texto: `--color-primary` · Fundo: transparente
- Hover: fundo `--color-primary-subtle`

**Input de texto**
- Border: 1px `--color-border` · Border-radius: `--radius-sm` · Font: 16px / Montserrat 400
- Padding: `12px 16px` · Foco: border `--color-border-focus` + `--shadow-focus`

**Tag / Chip**
- Background: `--color-primary-50` · Texto: `--color-primary-800` · Peso: 600
- Font-size: 12px · Border-radius: `--radius-pill` · Padding: `4px 12px`
- Uso: skills, metodologias, labels de seção

**Badge**
- Variações: navy (primário), cinza (neutro)
- Font-size: 11px uppercase, letter-spacing 0.1em, peso 700

**Ícone**
- Biblioteca: Lucide Icons (linha fina, consistente com o peso leve da marca)
- Tamanho padrão: 20px · Stroke-width: 1.5px

---

### 4.2 Moléculas

**Card de Projeto**
- Background: branco · Border: 0.5px `--color-border` · Radius: `--radius-lg`
- Shadow: `--shadow-card` · Padding: `--spacing-xl`
- Estrutura interna: label (tag) → título (H4) → descrição (body-sm) → resultado destacado → link

**Card de Metodologia**
- Ícone 32px + título H5 + descrição curta (2–3 linhas)
- Background: `--color-bg-section` · Radius: `--radius-md` · Sem borda

**Card de Número / Métrica**
- Número grande: 48–64px, peso 800, cor navy
- Label descritivo abaixo: 14px, peso 500, cor muted
- Sem borda, sem sombra — tipografia faz o trabalho

**Item de Timeline (Experiências)**
- Linha vertical navy à esquerda (2px)
- Ponto de nó: círculo 10px navy
- Conteúdo: período (caption, muted) → cargo (H5, navy) → empresa (body, bold) → descrição (body)

**Formulário de Contato**
- Campos: Nome, E-mail, Mensagem (textarea)
- Validação inline abaixo de cada campo (texto 13px, cor error)
- Estado de loading: botão com spinner substituindo label
- Estado de sucesso: mensagem de confirmação com ícone check

---

### 4.3 Organismos

**Header**
- Fixo no topo · Background: branco com `box-shadow: --shadow-xs`
- Esquerda: logo "André Fanchini" · Direita: nav links + botão CTA "Contato"
- Mobile: hamburguer menu com drawer lateral

**Hero**
- Layout em duas colunas no desktop (texto à esquerda, visual à direita)
- Texto: eyebrow label (tag) → H1 → subtítulo (body-lg) → botões CTA
- Fundo: branco puro, sem imagem ou padrão
- Elemento visual: pode ser uma foto profissional recortada ou composição geométrica minimalista em navy

**Seção de Projetos**
- Grid de cards: 1 coluna mobile, 2 colunas tablet, 3 colunas desktop
- Título de seção (H2) + parágrafo de contexto + grid

**Footer**
- Estrutura simples: logo à esquerda + links de rede à direita
- Segunda linha: copyright em caption
- Background: `--color-primary-900` (navy escuro) · Texto: branco e primary-200

---

## 5. Estados dos Componentes

| Componente | Default | Hover | Focus | Active | Disabled |
|------------|---------|-------|-------|--------|----------|
| Botão primário | bg navy | bg navy-700 + -1px Y | outline shadow 3px | bg navy-900 + scale 0.98 | opacity 0.4, cursor not-allowed |
| Botão ghost | border navy | bg primary-50 | outline shadow 3px | bg primary-200 | opacity 0.4 |
| Input | border neutral-300 | border neutral-500 | border navy + shadow-focus | — | bg neutral-100, opacity 0.6 |
| Link nav | texto muted | texto navy | outline underline | texto navy-900 | — |
| Card | shadow-card | shadow-modal + -2px Y | outline navy | — | — |

**Loading — Formulário:**
- Botão: label substituída por spinner animado (border-top navy, 3px, 18px, @keyframes spin)
- Campos ficam `disabled` durante o envio

**Erro — Formulário:**
- Border do campo: `--color-error`
- Texto de erro abaixo do campo: 13px, `--color-error`, ícone de alerta 14px à esquerda

---

## 6. Animações

**Biblioteca de referência:** Princípios do Ant Motion (entrada suave, sem exagero)

### Entradas de Elementos (scroll-triggered com IntersectionObserver)

| Tipo | Uso | Configuração |
|------|-----|--------------|
| Fade up | Cards, parágrafos de corpo | opacity 0→1 + translateY 20px→0 |
| Fade in | Títulos de seção | opacity 0→1 |
| Slide right | Items de timeline | translateX -30px→0 + opacity 0→1 |
| Zoom in | Números de impacto | scale 0.85→1 + opacity 0→1 |
| Stagger | Grids de cards | delay de 80ms entre itens do grid |

### Durações Padrão

| Contexto | Duração | Easing |
|----------|---------|--------|
| Microinterações (hover, focus) | 150ms | `ease-default` |
| Transições de estado (botão, input) | 250ms | `ease-default` |
| Entradas de elementos (scroll) | 500ms | `ease-out` |
| Entradas com overshooting (números) | 600ms | `ease-spring` |
| Drawer / modal | 300ms | `ease-out` |

### Easing Curves

```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);   /* Material standard */
--ease-out:     cubic-bezier(0, 0, 0.2, 1);       /* Entradas suaves */
--ease-in:      cubic-bezier(0.4, 0, 1, 1);       /* Saídas */
--ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1); /* Números, zoom */
```

**Regras gerais:**
- `prefers-reduced-motion`: todas as animações de entrada reduzem para fade simples em 200ms
- Nenhum loop infinito em elementos de conteúdo (apenas loading spinners)
- Máximo de 3 elementos animando simultaneamente na viewport

---

## 7. Conteúdo e Seções

### Estrutura do Portfólio

```
- Header (fixo)
- {secções especificada }
- Footer
```

---

### Hierarquia por Seção

**Hero**
1. Label/eyebrow: cargo ou área de atuação (tag)
2. H1: proposta de valor principal
3. Subtítulo: complemento em 1–2 linhas
4. CTAs: "Ver projetos" (primário) + "Baixar CV" (ghost)

**Números** *(Performance sobre resultado)*
1. Título de seção (H2): "Resultados em números"
2. Grid de 3–4 métricas: número grande + descrição
3. Parágrafo de contexto abaixo (opcional)

**Abordagem** *(Forma como trabalho)*
1. Título de seção (H2)
2. Parágrafo de abertura (body-lg)
3. Lista de 3–5 princípios: ícone + título + descrição curta

**Metodologias**
1. Título de seção (H2)
2. Grid de cards: ícone + nome da metodologia + aplicação prática

**Experiências**
1. Título de seção (H2)
2. Timeline vertical: da mais recente para a mais antiga
3. Cada item: período → cargo → empresa → descrição + tags de contexto

**Competências** *(Hard Skills)*
1. Título de seção (H2)
2. Agrupado por categoria: tags/chips com nome da competência
3. Categorias sugeridas: Planejamento, Gestão, Análise de Dados, Tecnologia, Legislação

**Formação**
1. Título de seção (H2)
2. Lista simples: período → curso → instituição
3. Inclui formações complementares e certificações relevantes

**Contato**
1. Título (H2) + frase de convite (body-lg)
2. Formulário: Nome, E-mail, Mensagem
3. Botão "Enviar mensagem"
4. Link de e-mail direto como fallback

---

### Tom de Voz / Copywriting

| Atributo | Diretriz |
|----------|----------|
| Voz | Primeira pessoa, direta, sem distância corporativa |
| Tom | Profissional mas acessível — técnico sem ser hermético |
| Estilo | Frases curtas. Dados concretos. Sem jargão vazio. |
| Títulos | Orientados a resultado: o que você fez, não o que você sabe |
| CTAs | Verbos de ação claros: "Ver projetos", "Falar comigo", "Baixar CV" |
| Evitar | "Apaixonado por…", "Profissional proativo", adjetivos sem evidência |

---

## 8. Acessibilidade

### Contraste de Cores (WCAG AA)

| Par de cores | Ratio estimado | Nível |
|--------------|---------------|-------|
| Navy `#1A2744` sobre branco `#FFFFFF` | 11.8:1 | AAA |
| Preto `#0A0A0A` sobre branco `#FFFFFF` | 20.1:1 | AAA |
| Branco sobre navy `#1A2744` | 11.8:1 | AAA |
| Muted `#4A4A4A` sobre branco | 9.7:1 | AAA |
| Texto error `#B82222` sobre branco | 5.3:1 | AA |

Mínimo exigido: **4.5:1** para texto normal, **3:1** para texto grande (≥ 18px bold).

### Tipografia

- Tamanho base: **16px** (`font-size: 100%` no `html`, nunca fixar em px no root)
- Escala em `rem` — respeita zoom e configurações do usuário
- Nenhum texto abaixo de 12px

### Foco e Navegação por Teclado

Ordem lógica de foco:

```
1. Skip link "Ir para conteúdo" (visível ao receber foco)
2. Logo / link home
3. Links de navegação (Header)
4. CTA do Header
5. CTAs do Hero
6. [Conteúdo das seções em ordem DOM]
7. Campos do formulário: Nome → E-mail → Mensagem → Botão enviar
8. Links do Footer
```

**Regras de implementação:**
- Todos os elementos interativos com `:focus-visible` explícito: `outline: 3px solid var(--color-primary)` + `outline-offset: 2px`
- Remover apenas `outline: none` sem substituto
- Imagens decorativas com `alt=""` e `aria-hidden="true"`
- Ícones sem texto com `aria-label` descritivo
- Formulário com `<label>` explícito para cada campo (não apenas placeholder)
- Mensagens de erro com `role="alert"` ou `aria-live="polite"`
- Seções com `<section>` + `aria-labelledby` apontando para o H2 da seção