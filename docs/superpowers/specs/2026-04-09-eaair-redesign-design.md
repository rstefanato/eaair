# EA Air — Site Redesign Design Spec

**Date:** 2026-04-09
**Status:** Approved
**Stack:** Next.js (App Router)

---

## 1. Overview

Redesign do site EA Air (eaair.com.br) com foco em conversao via quiz de auto-avaliacao de apneia do sono. O fluxo guia o usuario por um teste rapido baseado no STOP-Bang, captura o lead de forma progressiva, e conecta com dentistas credenciados por proximidade.

**Modelo de negocio:** B2B2C — EA Air (Esthetic Aligner AIR) e um aparelho intraoral para ronco/apneia. A empresa vende para dentistas credenciados, o site conecta pacientes aos profissionais.

---

## 2. Arquitetura: Progressive Reveal

Pagina unica com secoes sequenciais. Dois caminhos de entrada no Hero:
- **Rapido:** CTA "Fazer o teste agora" → Quiz direto
- **Educativo:** CTA "Saiba mais" → Scroll para conteudo educativo → Quiz

### Estrutura de secoes

```
1. HERO
2. MINI-EDUCATIVO (apneia + riscos)
3. QUIZ IMERSIVO (6 perguntas step-by-step)
4. RESULTADO PARCIAL (nivel de risco, conteudo bloqueado)
5. CAPTURA PROGRESSIVA (2 steps)
6. RESULTADO COMPLETO + EA AIR (produto como solucao)
7. LISTA DE CREDENCIADOS (filtrada por CEP)
8. FOOTER
```

---

## 3. Design System

### Cores

| Token | Valor | Uso |
|-------|-------|-----|
| `--blue` | `#1863DC` | Primario (brand Esthetic Aligner) |
| `--blue-deep` | `#0F4CAF` | Hover, estados ativos |
| `--blue-light` | `#EBF2FD` | Backgrounds claros, cards selecionados |
| `--orange` | `#F97316` | CTA principal |
| `--dark` | `#0F1729` | Hero background base |
| `--text` | `#1E293B` | Texto body |
| `--text-mid` | `#64748B` | Texto secundario |
| `--text-light` | `#94A3B8` | Hints, placeholders |
| `--off-white` | `#F8FAFC` | Background secoes claras |
| `--border` | `#E2E8F0` | Bordas |
| `--green` | `#16A34A` | Risco baixo |
| `--red` | `#DC2626` | Risco alto |

### Tipografia

- **Headings:** Plus Jakarta Sans (weights: 400, 500, 600)
- **Body:** DM Sans (weights: 300, 400, 500)
- **Google Fonts import:** `Plus+Jakarta+Sans:wght@200;300;400;500;600;700` + `DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500;9..40,600`

Hierarquia:
- Hero title: Plus Jakarta Sans 600, 27px, letter-spacing -0.5px
- Section titles: Plus Jakarta Sans 600, 22px
- Quiz question: Plus Jakarta Sans 600, 21px
- Body: DM Sans 400, 14px, line-height 1.65
- Captions/hints: DM Sans 400, 11-12px

### Logo

- Arquivo: `public/images/ea-logo.png` (300x65px, fundo transparente)
- Source: https://estheticaligner.com.br/wp-content/uploads/2022/02/ea-esthetic-aligner-300x65.png
- No Hero (fundo escuro): logo branco com icone "EA" em fundo branco
- No conteudo (fundo claro): logo original

---

## 4. Secoes Detalhadas

### 4.1 Hero

- Background: gradiente profundo azul-noite com orbs de glow sutis, grid de dots, noise texture
- Badge animado: "Teste gratuito em 2 min" com dot verde pulsante
- Headline: "Uma boa noite de sono muda *tudo.*" (palavra "tudo" com gradiente azul-violeta)
- Subtitle: DM Sans 300, cor 45% opacidade
- CTA primario: botao laranja com glow shadow
- CTA secundario: ghost button com backdrop-filter
- Stats strip na base: "1 em 3 / 80% / 2 min"

### 4.2 Mini-educativo

- 3-4 cards sobre apneia: O que e, Sintomas, Riscos
- Dado de impacto: "1 em cada 3 pessoas"
- Lista de problemas associados (hipertensao, AVC, diabetes, etc.)
- CTA: "Descubra seu risco agora"
- Background: off-white `#F8FAFC`

### 4.3 Quiz Imersivo

**6 perguntas baseadas no STOP-Bang:**

| # | Categoria | Pergunta | Opcoes |
|---|-----------|----------|--------|
| 1 | Ronco | "Voce ronca ou ja disseram que voce ronca?" | Sim / Nao / Nao sei |
| 2 | Cansaco | "Voce se sente cansado(a) ou com sono durante o dia, mesmo dormindo a noite toda?" | Sempre / As vezes / Raramente |
| 3 | Observacao | "Alguem ja percebeu que voce para de respirar ou engasga enquanto dorme?" | Sim / Nao / Nao sei |
| 4 | Pressao | "Voce tem ou esta tratando pressao alta?" | Sim / Nao / Nao sei |
| 5 | Peso | "Como voce descreveria seu peso atual?" | Acima do ideal / No peso ideal / Abaixo do ideal |
| 6 | Sintomas | "Com que frequencia voce acorda com dor de cabeca ou boca seca?" | Frequentemente / As vezes / Nunca |

**Pontuacao:**
- Resposta positiva (Sim, Sempre, Frequentemente, Acima do ideal) = 2 pontos
- Resposta intermediaria (As vezes, Nao sei) = 1 ponto
- Resposta negativa (Nao, Raramente, Nunca, No/Abaixo) = 0 pontos
- Score maximo: 12 pontos
- 0-3 = Risco BAIXO (verde `#16A34A`)
- 4-7 = Risco MODERADO (laranja `#F97316`)
- 8-12 = Risco ALTO (vermelho `#DC2626`)

**UX do quiz:**
- Uma pergunta por vez com slide horizontal
- Barra de progresso com gradiente azul-violeta e dot indicador
- Tag de categoria por pergunta (Ronco, Cansaco, Observacao, etc.)
- Opcoes com radio customizado, borda lateral azul ao selecionar
- Sub-descricao em cada opcao para contexto
- Avanca automaticamente 300ms apos selecao
- Botao voltar no topbar, botao fechar (X)
- Touch targets minimos de 56px de altura
- Transicoes: 200ms cubic-bezier(0.4, 0, 0.2, 1)

### 4.4 Resultado Parcial

- Icone de alerta com ring pulse animado (conforme nivel de risco)
- Label de risco (BAIXO/MODERADO/ALTO) em uppercase com cor correspondente
- Titulo: "Atencao aos sinais" (alto) / "Fique atento" (moderado) / "Boas indicacoes" (baixo)
- Barra de risco visual com gradiente (verde → laranja → vermelho)
- Animacao: barra cresce da esquerda ate o ponto do score
- Card trancado (borda dashed): "Seu relatorio completo inclui: analise detalhada, recomendacoes, dentista credenciado"
- CTA: "Ver relatorio completo" (azul)

### 4.5 Captura Progressiva

**Step 1 — Desbloquear relatorio:**
- Step indicator (2 dots)
- Titulo: "Quase la"
- Campos: Nome + E-mail
- CTA: "Continuar"
- Nota: "Seus dados estao seguros. Nao enviamos spam."

**Step 2 — Encontrar credenciado:**
- Titulo: "Encontre um especialista"
- Campos: CEP + Telefone
- CTA: "Ver credenciados proximos"
- `inputmode="numeric"` nos dois campos
- `autocomplete`: postal-code, tel

### 4.6 Resultado Completo + EA Air

- Relatorio detalhado do risco com explicacao por fator
- Apresentacao do EA Air como solucao:
  - O que e o aparelho
  - Beneficios: melhora do sono, saude respiratoria, conforto
  - Design estetico, confortavel, discreto
- Transicao natural: "O proximo passo e consultar um especialista credenciado"

### 4.7 Lista de Credenciados

- Filtrada por CEP/proximidade
- Card por dentista:
  - Avatar com iniciais (fundo azul claro)
  - Nome, especialidade
  - Distancia em km
  - Endereco completo
  - 2 botoes: "Ligar" (azul) + "Ver no mapa" (azul claro)
- Ordenada por proximidade

### 4.8 Footer

- Logo EA Air
- Links: Sobre, Contato, Politica de Privacidade
- Copyright

---

## 5. Especificacoes Mobile-First

### Touch & Interacao
- Touch targets minimos: 48px (botoes: 56px)
- Espacamento entre opcoes do quiz: 10px
- Sem interacoes hover-only
- Todas as interacoes via tap funcionais

### Formularios
- Inputs: font-size 14px (evita zoom iOS)
- `inputmode="numeric"` para CEP e telefone
- `autocomplete` em todos os campos (name, email, tel, postal-code)
- Labels sempre visiveis acima do campo

### Performance
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Bundle total < 150KB gzipped
- Imagens WebP com srcset
- Font subsetting: latin-ext only
- Quiz inline, sem navegacao de pagina

### Breakpoints
- Mobile: 375px (design primario, coluna unica)
- Tablet: 768px (cards em 2 colunas, quiz centralizado)
- Desktop: 1024px+ (hero split, quiz centralizado 600px max)

### Acessibilidade
- Contraste minimo 4.5:1 em todo texto
- `prefers-reduced-motion` desabilita animacoes
- Navegacao por tab no quiz
- `aria-live` para resultado do quiz
- `role="progressbar"`, `role="radiogroup"` semanticos
- Alt text em todas as imagens
- Labels em todos os form inputs

---

## 6. Stack Tecnica

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Fonts:** Google Fonts (Plus Jakarta Sans + DM Sans)
- **Icons:** Lucide React (SVG)
- **Animacoes:** CSS transitions + Framer Motion para quiz transitions
- **Deploy:** Vercel (default para Next.js, migrar se necessario)

### Estrutura de paginas Next.js

```
app/
  layout.tsx          (root layout, fonts, metadata)
  page.tsx            (landing page com todas as secoes)
  globals.css         (Tailwind + custom properties)
components/
  Hero.tsx
  Education.tsx
  Quiz/
    Quiz.tsx           (container/state management)
    QuizQuestion.tsx   (pergunta individual)
    QuizProgress.tsx   (barra de progresso)
    QuizResult.tsx     (resultado parcial)
  LeadCapture/
    LeadForm.tsx       (step 1: nome+email, step 2: cep+telefone)
  FullResult.tsx       (resultado completo + EA Air)
  Credentialed/
    CredentialedList.tsx
    CredentialedCard.tsx
  Footer.tsx
  ui/
    Button.tsx
    Input.tsx
public/
  images/
    ea-logo.png
```

---

## 7. Dados e Backend

### Quiz
- State management local (React state, nenhum backend necessario para calculo)
- Pontuacao calculada client-side

### Lead Capture
- POST para API route do Next.js (`/api/lead`)
- Armazenamento: JSON file local para MVP (migrar para Supabase/CRM quando definido)
- Campos: nome, email, telefone, cep, quiz_score, quiz_risk_level, timestamp
- **OPEN:** Integracao com CRM/email marketing a definir pelo cliente

### Lista de Credenciados
- Source de dados: JSON estatico em `data/credenciados.json` para MVP
- Filtro por CEP: match por prefixo de CEP (regiao) para MVP, geocoding para v2
- Dados por credenciado: nome, especialidade, endereco, telefone, cep_regiao
- **OPEN:** Lista real de credenciados a ser fornecida pelo cliente

---

## 8. Mockups de Referencia

Mockups hi-fi aprovados salvos em:
- `.superpowers/brainstorm/39231-1775742044/content/hifi-hero-quiz-v2.html`

Telas mockadas: Hero, Quiz (pergunta 3/6), Resultado Parcial.
