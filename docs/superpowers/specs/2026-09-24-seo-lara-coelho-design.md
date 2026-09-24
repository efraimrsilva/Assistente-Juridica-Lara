# SEO técnico — Lara Coelho

## Objetivo

Fortalecer a descoberta orgânica do site de Lara Coelho, Assistente Jurídica na ACF, no Google e em redes sociais. O endereço canônico e origem única da indexação será `https://larajur.netlify.app`.

## Escopo de indexação

- O site será indexável na página inicial, com sitemap que lista somente `/`.
- `robots.txt` permitirá rastreamento público e apontará para o sitemap canônico.
- O arquivo entregue pelo usuário será publicado sem modificação em `/googlea3f2b8378fe5a305.html`, para verificação de propriedade no Google Search Console.
- A configuração não garantirá posição no Google: ela remove impedimentos técnicos e melhora os sinais que o mecanismo de busca usa para interpretar a página.

## Metadados e apresentação social

`app/layout.tsx` definirá o título `Lara Coelho | Assistente Jurídica na ACF`, descrição voltada ao acolhimento inicial e à disponibilidade presencial em Minas Gerais e online, canonical e metadados Open Graph/Twitter. A imagem social será produzida pelo arquivo `app/opengraph-image.tsx`, em 1200×630, usando a identidade visual existente e o nome/função de Lara.

## Dados estruturados e conteúdo

O layout entregará JSON-LD com os tipos `Person` e `WebSite`. Lara será descrita como Assistente Jurídica na ACF, com área de atendimento Minas Gerais e atendimento online; não haverá alegação de advocacia, análise ou orientação jurídica por Lara.

A seção de contato reforçará, em texto visível, o atendimento presencial em Minas Gerais e online. A frase que delimita que a análise e orientação jurídica são responsabilidade da equipe da ACF será preservada.

## Arquivos e responsabilidades

- `app/layout.tsx`: metadados, origem canônica, JSON-LD e metadados sociais.
- `app/opengraph-image.tsx`: imagem social estática gerada pelo Next.js.
- `app/robots.ts`: regras de rastreamento e URL do sitemap.
- `app/sitemap.ts`: declaração da página inicial para rastreamento.
- `app/page.tsx`: contexto local visível no contato.
- `public/googlea3f2b8378fe5a305.html`: arquivo de verificação fornecido pelo usuário.
- `tests/homepage-branding.test.mjs`: verifica HTML, canonical, JSON-LD, robots, sitemap e arquivo de verificação.

## Validação

O teste local deve confirmar as rotas de SEO e o HTML da página. O build de produção deve gerar `/robots.txt`, `/sitemap.xml` e a imagem Open Graph. Após a publicação, o usuário deve verificar o arquivo em `https://larajur.netlify.app/googlea3f2b8378fe5a305.html` no Search Console, pois a propriedade do domínio só pode ser confirmada em produção.

## Fora de escopo

- Garantir posição, prazo ou volume de tráfego no Google.
- Criar perfil no Google Business, que requer dados físicos verificáveis.
- Alterar telefone, e-mail, domínio ou hospedagem.
