# SEO técnico — Lara Coelho Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tornar `https://larajur.netlify.app` indexável e corretamente apresentado pelo Google e redes sociais, mantendo Lara Coelho como Assistente Jurídica na ACF.

**Architecture:** O App Router fornecerá metadata estática no layout, uma imagem Open Graph baseada em código e as rotas especiais `robots.ts` e `sitemap.ts`. O arquivo de verificação do Google será servido diretamente por `public/`; o teste de integração verificará essas rotas reais e o HTML renderizado.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, `next/og`, Node.js `assert`.

**Spec:** `docs/superpowers/specs/2026-09-24-seo-lara-coelho-design.md`

## Global Constraints

- Usar `https://larajur.netlify.app` como única origem canônica.
- Não atribuir a Lara atuação, análise ou orientação jurídica.
- Declarar atendimento presencial em Minas Gerais e online.
- Preservar o aviso de que a equipe responsável da ACF conduz a análise e orientação jurídica.
- Publicar o arquivo de verificação fornecido sem alterar seu conteúdo.
- Não prometer posicionamento, prazo ou tráfego do Google.

---

### Task 1: Proteger o contrato técnico de SEO

**Files:**
- Modify: `tests/homepage-branding.test.mjs`

**Interfaces:**
- Consumes: respostas HTTP da prévia local.
- Produces: contrato para homepage, `/robots.txt`, `/sitemap.xml` e o arquivo de verificação.

- [ ] **Step 1: Escrever as expectativas que devem falhar**

  Acrescentar ao teste:

  ```js
  assert.match(page, /https:\/\/larajur\.netlify\.app\//, 'o HTML deve apontar para o domínio canônico')
  assert.match(page, /application\/ld\+json/, 'a página deve expor dados estruturados')
  assert.match(page, /Atendimento presencial em Minas Gerais e online\./, 'o contexto de atendimento deve estar visível')

  const [robots, sitemap, verification] = await Promise.all([
    fetch('http://localhost:3000/robots.txt'),
    fetch('http://localhost:3000/sitemap.xml'),
    fetch('http://localhost:3000/googlea3f2b8378fe5a305.html'),
  ])

  assert.equal(robots.ok, true, 'robots.txt deve responder com sucesso')
  assert.match(await robots.text(), /Sitemap: https:\/\/larajur\.netlify\.app\/sitemap\.xml/, 'robots deve apontar para o sitemap canônico')
  assert.equal(sitemap.ok, true, 'sitemap.xml deve responder com sucesso')
  assert.match(await sitemap.text(), /https:\/\/larajur\.netlify\.app\//, 'o sitemap deve listar a página canônica')
  assert.equal(verification.ok, true, 'o arquivo de verificação do Google deve responder com sucesso')
  assert.equal(await verification.text(), 'google-site-verification: googlea3f2b8378fe5a305.html', 'o token do Google deve permanecer inalterado')
  ```

- [ ] **Step 2: Executar para confirmar a falha**

  Run: `node tests/homepage-branding.test.mjs`

  Expected: FAIL porque o domínio, as rotas de SEO e o texto local ainda não existem.

- [ ] **Step 3: Salvar o teste atualizado**

  Manter todas as chamadas restritas ao `localhost:3000`; não testar o Search Console nem serviços externos.

### Task 2: Implementar descoberta e apresentação social

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`
- Create: `app/opengraph-image.tsx`
- Create: `public/googlea3f2b8378fe5a305.html`
- Test: `tests/homepage-branding.test.mjs`

**Interfaces:**
- Consumes: contrato da Task 1 e domínio `https://larajur.netlify.app`.
- Produces: canonical, JSON-LD, metadados sociais, `/robots.txt`, `/sitemap.xml`, `/opengraph-image` e arquivo de verificação.

- [ ] **Step 1: Atualizar metadata e JSON-LD no layout**

  Definir `metadataBase` como `new URL('https://larajur.netlify.app')`; preservar o título atual e usar a descrição:

  ```ts
  'Lara Coelho, Assistente Jurídica na ACF, oferece acolhimento inicial, organização e encaminhamento para atendimento presencial em Minas Gerais e online.'
  ```

  Acrescentar `openGraph` e `twitter` com o mesmo título, descrição e URL `/`. Inserir um `<script type="application/ld+json">` com `@graph` contendo `WebSite` e `Person`, `jobTitle: 'Assistente Jurídica'`, `worksFor: { '@type': 'Organization', name: 'ACF' }` e `areaServed: 'Minas Gerais'`.

- [ ] **Step 2: Criar as rotas de rastreamento**

  Criar `app/robots.ts`:

  ```ts
  import type { MetadataRoute } from 'next'
  export default function robots(): MetadataRoute.Robots {
    return { rules: { userAgent: '*', allow: '/' }, sitemap: 'https://larajur.netlify.app/sitemap.xml' }
  }
  ```

  Criar `app/sitemap.ts` com uma entrada para `https://larajur.netlify.app/`, `changeFrequency: 'monthly'` e `priority: 1`.

- [ ] **Step 3: Criar a imagem Open Graph**

  Criar `app/opengraph-image.tsx` que exporta `size = { width: 1200, height: 630 }`, `contentType = 'image/png'` e retorna `new ImageResponse(...)` com fundo `#142B4A`, o nome `Lara Coelho` e a função `Assistente Jurídica na ACF`.

- [ ] **Step 4: Copiar a verificação sem modificar o token**

  Copiar `F:/Downloads/googlea3f2b8378fe5a305.html` para `public/googlea3f2b8378fe5a305.html`. O conteúdo final deve ser exatamente `google-site-verification: googlea3f2b8378fe5a305.html`.

- [ ] **Step 5: Executar o teste para confirmar aprovação**

  Run: `node tests/homepage-branding.test.mjs`

  Expected: PASS.

### Task 3: Dar contexto local visível e validar produção

**Files:**
- Modify: `app/page.tsx`
- Test: `tests/homepage-branding.test.mjs`

**Interfaces:**
- Consumes: metadata e contrato da Task 2.
- Produces: frase visível de área de atendimento e build estático com todas as rotas SEO.

- [ ] **Step 1: Acrescentar a frase de área de atendimento no contato**

  Abaixo do texto introdutório da seção `#contato`, inserir:

  ```tsx
  <p className="mt-4 max-w-lg text-sm leading-6 text-background/65">
    Atendimento presencial em Minas Gerais e online.
  </p>
  ```

  Manter abaixo dela a frase existente que reserva a análise e orientação jurídica à equipe da ACF.

- [ ] **Step 2: Rodar teste, tipos e build**

  Run: `node tests/homepage-branding.test.mjs && npx tsc --noEmit && npm run build`

  Expected: todos os comandos terminam com código `0`; o build lista `/robots.txt`, `/sitemap.xml` e a imagem Open Graph.

- [ ] **Step 3: Revisar e publicar**

  Run: `git diff --check && git status --short`

  Em seguida, preparar todos os arquivos da implementação e criar o commit:

  ```bash
  git add app public tests docs
  git commit -m "feat: fortalece o SEO da Lara Coelho" -m "Adiciona rastreamento, metadados sociais, dados estruturados e verificação do Google para melhorar a descoberta do site."
  git push origin main
  ```

## Plan Self-Review

- A Task 1 cobre o contrato observável; Task 2 cobre metadata, rastreamento, social e verificação; Task 3 cobre contexto local, build e publicação.
- O plano não inclui promessas de ranking nem dados físicos não confirmados.
- Não há dependências indefinidas: domínio, token, textos, rotas e comandos de validação foram explicitados.
