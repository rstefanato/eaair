# EA Air — Documentacao do Projeto

## O que e este projeto

Site da **EA Air (Esthetic Aligner AIR)** — aparelho intraoral para tratamento de ronco e apneia obstrutiva do sono. O site e um funil de conversao que guia o usuario por um quiz de auto-avaliacao baseado no STOP-Bang, captura o lead de forma progressiva, e conecta com dentistas credenciados por proximidade (CEP).

**Modelo de negocio:** B2B2C. A EA Air (marca da Esthetic Aligner) vende o aparelho para dentistas credenciados. O site conecta pacientes aos profissionais.

**URL:** eaair.com.br
**Marca mae:** [Esthetic Aligner](https://estheticaligner.com.br/)

---

## Stack Tecnica

| Tecnologia | Versao | Uso |
|---|---|---|
| Next.js | 16.2.3 | App Router, SSR/SSG |
| React | 19.2.4 | UI |
| Tailwind CSS | 4.x | Estilizacao (v4 com `@theme {}`) |
| Framer Motion | 12.x | Animacoes (quiz transitions, scroll reveal, stagger) |
| Lucide React | 1.x | Icones SVG |
| TypeScript | 5.x | Tipagem |

**Sem backend dedicado.** Leads salvos em JSON local (`data/leads.json`). Lista de credenciados em JSON estatico (`data/credenciados.json`).

---

## Estrutura de Arquivos

```
app/
  layout.tsx              Root layout: fonts (Plus Jakarta Sans + DM Sans), metadata
  page.tsx                Landing page: Hero + Education + Quiz overlay + Footer
  globals.css             Tailwind v4 @theme tokens + keyframes (drift, ring-pulse)
  api/lead/route.ts       POST /api/lead — salva lead em data/leads.json

components/
  Hero.tsx                Hero escuro com gradiente, orbs, dots, staggered entrance
  Education.tsx           Secao educativa: stats 40%/33%, cards, riscos, scroll-triggered
  Footer.tsx              Logo + links + copyright

  Quiz/
    Quiz.tsx              Overlay fullscreen com 6 fases (ver abaixo)
    quiz-data.ts          Tipos, 6 perguntas STOP-Bang, BMI calc, scoring
    QuizQuestion.tsx      Pergunta radio (layout: copy top, opcoes bottom)
    QuizBmiQuestion.tsx   Pergunta peso/altura (IMC calculado internamente, nao exibido)
    QuizProgress.tsx      Barra de progresso gradiente com dot
    QuizResult.tsx        Resultado parcial: risco + card trancado

  LeadCapture.tsx         Form progressivo 2 steps (nome+email → CEP+telefone)
  FullResult.tsx          [NAO USADO EM PAGE.TSX — conteudo migrado para Quiz.tsx]

  Credentialed/
    credentialed-data.ts  Tipos, filterByCep, getInitials, formatPhone
    CredentialedList.tsx   Lista filtrada por CEP
    CredentialedCard.tsx   Card do dentista: avatar, endereco, Ligar, Ver no mapa

  ui/
    Button.tsx            Variantes: primary (laranja), ghost, secondary, blue
    Input.tsx             Input com label, error, a11y
    FadeIn.tsx            Scroll-triggered fade/slide (useInView), StaggerChildren
    CountUp.tsx           Animacao de contagem numerica

lib/
  utils.ts                cn() — clsx + tailwind-merge

data/
  credenciados.json       5 dentistas de exemplo (SP, RJ, PR, RS) — PLACEHOLDER
  leads.json              Leads capturados (gitignored)

public/images/
  ea-logo.png             Logo Esthetic Aligner (300x65, fundo transparente)
  problemas-apneia.jpeg   Infografico de referencia (6 riscos da apneia)

docs/superpowers/
  specs/2026-04-09-eaair-redesign-design.md    Spec do design aprovada
  plans/2026-04-09-eaair-implementation.md     Plano de implementacao (13 tasks)
```

---

## Fluxo do Usuario

A pagina tem 2 secoes visíveis: **Hero** e **Education**. Todo o funil de conversao acontece dentro de um **overlay fullscreen** (modal) que abre ao clicar nos CTAs.

### Pagina (sempre visivel)
```
1. Hero — gradiente noturno, titulo, CTAs, stats
2. Education — 40%/33% stats, cards sobre apneia, 6 riscos, CTA
3. Footer
```

### Overlay (6 fases sequenciais)
```
1. PERGUNTAS — 6 steps STOP-Bang com slide animation
2. RESULTADO PARCIAL — nivel de risco + card trancado + "Ver relatorio"
3. LEAD CAPTURE — step 1: nome + email → step 2: CEP + telefone
4. RELATORIO COMPLETO — score, barra, impactos, alerta, recomendacao
5. SOLUCAO EA AIR — como funciona, beneficios, indicacao
6. CREDENCIADOS — lista filtrada por CEP com Ligar/Ver no mapa
```

O usuario so retorna a pagina principal ao fechar o overlay (X) ou ao final (botao Fechar na tela de credenciados).

---

## Design System

### Cores (definidas em `@theme {}` no globals.css)

| Token | Hex | Uso |
|---|---|---|
| `blue` | `#1863DC` | Primario (brand Esthetic Aligner) |
| `blue-deep` | `#0F4CAF` | Hover, estados ativos |
| `blue-light` | `#EBF2FD` | Backgrounds claros, cards selecionados |
| `orange` | `#F97316` | CTA principal (botao "Fazer o teste") |
| `dark` | `#0F1729` | Hero background base |
| `text` | `#1E293B` | Texto body |
| `text-mid` | `#64748B` | Texto secundario |
| `text-light` | `#94A3B8` | Hints, placeholders |
| `off-white` | `#F8FAFC` | Background secoes claras |
| `border` | `#E2E8F0` | Bordas |
| `green` | `#16A34A` | Risco baixo |
| `red` | `#DC2626` | Risco alto |

### Tipografia

- **Headings:** Plus Jakarta Sans (weights 200-700)
- **Body:** DM Sans (weights 300-600)
- Carregadas via `next/font/google` com `display: "swap"`

### Hierarquia de fontes
- Hero title mobile: 27px / desktop: 52px, weight 600
- Section titles: 22px, weight 600
- Quiz question: 21px, weight 600
- Body: 13-14px, weight 400
- Captions: 11-12px

---

## Quiz — Detalhes Tecnicos

### 6 Perguntas (STOP-Bang adaptado)

| # | ID | Tipo | Categoria |
|---|---|---|---|
| 1 | ronco | radio | Ronco |
| 2 | observacao | radio | Observacao |
| 3 | cansaco | radio | Cansaco |
| 4 | imc | bmi (peso+altura) | IMC |
| 5 | sintomas | radio | Sintomas |
| 6 | pressao | radio | Pressao |

### Pontuacao
- Resposta positiva = 2pts, intermediaria = 1pt, negativa = 0pts
- IMC: >= 28 = 2pts, 25-27.9 = 1pt, < 25 = 0pts
- IMC **nao e exibido** ao usuario
- Max: 12 pontos
- 0-3: Risco Baixo (verde) / 4-7: Moderado (laranja) / 8-12: Alto (vermelho)

### UX do Quiz
- Uma pergunta por vez, slide horizontal (Framer Motion)
- Layout: copy (tag + pergunta + hint) no topo, opcoes alinhadas embaixo
- Auto-avanca 300ms apos selecao (radio), botao "Continuar" (BMI)
- Barra de progresso com gradiente azul-violeta + dot
- Botao voltar + X fechar no topbar

### Resultado — Copy por nivel de risco
- **Alto:** Tom catastrofico (infarto, morte subita, acidentes). Converte por medo.
- **Moderado:** Tom de alerta progressivo (hipertensao silenciosa, envelhecimento).
- **Baixo:** Tom preventivo (ronco como alerta, fatores mutaveis).

Cada nivel tem: sumario, 3 impactos com bold, alerta em destaque, recomendacao.

---

## Animacoes

| Componente | Tipo | Detalhe |
|---|---|---|
| Hero | Staggered entrance | Logo→titulo→subtitulo→CTAs→stats (delays 0.1-0.7s) |
| Education stats | CountUp | Numeros 40% e 33% contam de 0 ao valor |
| Education cards | Stagger reveal | Scroll-triggered, 150ms delay entre cards |
| Education riscos | Stagger | Icones circulares surgem em sequencia |
| Quiz perguntas | Slide horizontal | Framer Motion enter/exit com direcao |
| Quiz resultado | Ring pulse | Icone de risco pulsa (CSS keyframe) |
| FullResult/Credentialed | FadeIn | Scroll-triggered com stagger |
| Cards hover | Translate + shadow | `-translate-y-1` + `shadow-lg` |
| Glow orbs (Hero) | Drift | CSS keyframe com translate (10s loop) |

`prefers-reduced-motion` desabilita todas as animacoes.

---

## Decisoes de Design

1. **Quiz como overlay fullscreen** — nao inline na pagina. Mantem o usuario focado no funil sem distracao.

2. **Lead capture progressivo** — nome+email primeiro (baixo atrito), CEP+telefone depois (justificado por "encontrar credenciado proximo").

3. **Todo o funil dentro do overlay** — apos o quiz, resultado completo, solucao e credenciados ficam no overlay. O usuario nunca volta pra home no meio do fluxo.

4. **Layout "copy top, actions bottom"** — padrao consistente em TODAS as telas do overlay: informacao em cima, inputs/botoes embaixo, espaco branco respira no meio.

5. **Hero mobile: logo topo, copy embaixo** — logo fica no topo com `mb-auto`, todo o resto (titulo, subtitulo, CTAs, stats) fica na parte inferior da tela.

6. **Hero desktop: centralizado** — titulo 52px, CTAs lado a lado, stats em strip larga.

7. **Branding Esthetic Aligner** — cores e tipografia seguem o site da marca mae. Logo original usado sem filtro (drop-shadow sutil no fundo escuro).

8. **Tom do relatorio: medo converte** — copy catastrofico no risco alto (morte subita, acidentes, expectativa de vida). Tom de urgencia progressiva.

9. **Cards compactos** — padding apertado (`px-2.5 py-2`), `leading-tight` (1.25) nos textos que quebram linha. Maximizar conteudo por viewport.

10. **Sem emojis** — nunca, em nenhum output. Usar SVG icons (Lucide).

---

## O que falta / Itens em aberto

### Dados reais
- [ ] **Lista de credenciados real** — `data/credenciados.json` tem 5 dentistas de exemplo. Precisa da lista real com: nome, especialidade, endereco, cidade, estado, telefone, CEP (ou prefixo de CEP)
- [ ] **Integracao CRM / email marketing** — leads salvam em JSON local. Migrar para Supabase, Airtable, ou CRM existente
- [ ] **Geocoding** — filtro por CEP usa prefixo simples (2 digitos). Para proximidade real, precisa de API de geocoding

### Conteudo
- [ ] **Imagens do produto EA Air** — nao temos fotos do aparelho. Adicionar na tela de solucao
- [ ] **Depoimentos** — secao de testimonials nao implementada
- [ ] **Politica de privacidade** — link no footer aponta pra `#`

### Tecnico
- [ ] **Deploy** — Vercel planejado, ainda nao configurado
- [ ] **Analytics** — sem tracking (Google Analytics, Meta Pixel, etc.)
- [ ] **SEO** — metadata basica no layout.tsx. Falta: Open Graph, structured data, sitemap
- [ ] **Testes** — sem testes automatizados. Scoring logic e candidata natural para unit tests
- [ ] **Performance audit** — rodar Lighthouse e otimizar (images, fonts, bundle size)
- [ ] **Logo versao branca** — usar logo real em SVG branco pro Hero em vez de PNG com drop-shadow

### UX / Design
- [ ] **Responsividade desktop da Education** — cards e riscos podem ter layout melhor em telas largas
- [ ] **Animacao de entrada do overlay** — poderia ter efeito mais elaborado
- [ ] **Tela de sucesso pos-credenciados** — apos fechar o overlay, poderia mostrar uma mensagem de confirmacao

---

## Como rodar

```bash
cd /c/Users/alvar/documents/projetos/eeair
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producao
npm run start      # servir build de producao
```

---

## Convencoes de codigo

- **Tailwind v4** — usa `@import "tailwindcss"` e `@theme {}`, NAO `@tailwind` ou `tailwind.config.ts`
- **Componentes** — um arquivo por componente, nomeados em PascalCase
- **Dados** — tipos e logica junto do componente (ex: `quiz-data.ts` dentro de `Quiz/`)
- **Estilizacao** — Tailwind classes inline, custom properties via `@theme`, `cn()` para merge condicional
- **Animacoes** — Framer Motion para React, CSS keyframes para efeitos globais (drift, ring-pulse)
- **Sem emojis** — jamais
- **Portugues sem acento em nomes de arquivo/variavel** — acentos so no conteudo exibido ao usuario
