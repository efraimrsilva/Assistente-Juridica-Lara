# Lara — Assistente Jurídica na ACF Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposicionar toda a página como presença pessoal de Lara, Assistente Jurídica na ACF, com comunicação precisa sobre seu papel de acolhimento, organização e encaminhamento inicial.

**Architecture:** O único componente de página, `app/page.tsx`, continuará a concentrar o conteúdo e a interação leve (menu e FAQ), preservando a estrutura visual. A matriz de áreas jurídicas será trocada por uma matriz de apoios prestados por Lara e os textos de hero, sobre, processo, FAQ, contato e rodapé serão coerentes com essa função. `app/layout.tsx` concentrará a identidade do documento e `tests/homepage-branding.test.mjs` verificará o HTML entregue.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Node.js `assert`.

**Spec:** `docs/superpowers/specs/2026-09-23-lara-assistente-juridica-design.md`

## Global Constraints

- Lara deve ser apresentada como “Assistente Jurídica na ACF”; a ACF é somente contexto profissional secundário.
- O tom deve equilibrar acolhimento humano e objetividade profissional.
- Não atribuir a Lara serviços advocatícios, análise jurídica, defesa, estratégia processual ou decisão técnica.
- Quando aplicável, esclarecer que análises e orientações jurídicas são conduzidas pela equipe responsável da ACF.
- Preservar a composição visual, paleta, tipografia e espaçamento existentes.
- Manter telefone, e-mail e formulário local existentes; não criar backend ou integração de envio.

---

### Task 1: Definir a nova identidade no teste de integração

**Files:**

- Modify: `tests/homepage-branding.test.mjs`

**Interfaces:**

- Consumes: HTML retornado por `GET http://localhost:3000/`.
- Produces: contrato de conteúdo verificável para `app/page.tsx` e `app/layout.tsx`.

- [x] **Step 1: Substituir as asserções de marca antiga pelas asserções que devem falhar**

  Em `tests/homepage-branding.test.mjs`, substituir as asserções iniciais por este bloco:

  ```js
  assert.match(
    page,
    /Lara\s*Assistente Jurídica na ACF/,
    "a identidade de Lara deve estar visível na página inicial",
  );
  assert.match(
    page,
    /Acolhimento inicial, organização e encaminhamento/,
    "o Hero deve explicar o papel de Lara",
  );
  assert.match(
    page,
    /A análise e a orientação jurídica são conduzidas pela equipe responsável da ACF/,
    "a página deve delimitar o papel da equipe jurídica",
  );
  assert.doesNotMatch(
    page,
    /Dra\. Lara Advocacia/,
    "a marca de advocacia individual não deve permanecer visível",
  );
  assert.doesNotMatch(
    page,
    /23 áreas de atuação/,
    "a página não deve apresentar áreas de atuação de Lara",
  );
  ```

- [x] **Step 2: Atualizar os contratos de navegação e apoio para o conteúdo novo**

  Substituir `expectedNavigation` e a verificação de cada área por:

  ```js
  const expectedNavigation = [
    "#sobre",
    "#apoio",
    "#processo",
    "#faq",
    "#contato",
  ];
  const apoios = [
    "Acolhimento inicial",
    "Organização de informações",
    "Documentos e agendamentos",
    "Acompanhamento de comunicação",
  ];

  for (const apoio of apoios) {
    assert.match(
      page,
      new RegExp(`>${apoio}</h3>`),
      `${apoio} deve aparecer como um cartão de apoio`,
    );
  }
  ```

- [x] **Step 3: Executar o teste para confirmar a falha esperada**

  Run: `node tests/homepage-branding.test.mjs`

  Expected: FAIL porque a marca e as âncoras antigas ainda estão na página.

- [x] **Step 4: Salvar o teste atualizado**

  Não incluir verificações de aparência de pixel, nem chamadas de rede que não sejam a página local.

- [x] **Step 5: Commit**

  Como o diretório atual ainda não é um repositório Git, não executar commit. Quando o repositório estiver disponível, preparar somente `tests/homepage-branding.test.mjs` com a mensagem `test: define Lara assistant branding`.

### Task 2: Reescrever a página em torno do trabalho de Lara

**Files:**

- Modify: `app/page.tsx`
- Test: `tests/homepage-branding.test.mjs`

**Interfaces:**

- Consumes: contrato de strings e âncoras criado na Task 1; `lucide-react`; estado existente de menu e FAQ.
- Produces: página inicial com as âncoras `#sobre`, `#apoio`, `#processo`, `#faq` e `#contato`.

- [x] **Step 1: Substituir dados de advocacia individual por dados de apoio**

  Trocar `areas` por `apoios` com os quatro itens e descrições abaixo, mantendo o formato `{ title, description, icon }` usado na grade:

  ```ts
  const apoios = [
    {
      title: "Acolhimento inicial",
      description:
        "Recebo seu primeiro contato com atenção e registro o que é importante para o seu atendimento.",
      icon: Handshake,
    },
    {
      title: "Organização de informações",
      description:
        "Ajudo a reunir dados e contextualizar sua demanda para um encaminhamento mais claro.",
      icon: FileCheck2,
    },
    {
      title: "Documentos e agendamentos",
      description:
        "Oriento sobre documentos iniciais e organizo o melhor momento para o próximo passo.",
      icon: Clock3,
    },
    {
      title: "Acompanhamento de comunicação",
      description:
        "Mantenho uma comunicação próxima para que você saiba como seguir em cada etapa.",
      icon: Users,
    },
  ];
  ```

- [x] **Step 2: Atualizar marca, navegação e hero**

  Usar a marca `Lara` e o complemento `Assistente Jurídica na ACF`. Alterar a lista de navegação para `['Sobre Lara', 'Como posso ajudar', 'Meu processo', 'Perguntas frequentes', 'Contato']`, mapeando para as âncoras produzidas nesta tarefa. No hero, usar o selo `Assistente Jurídica na ACF`, o título `Um primeiro contato mais claro, próximo e organizado.` e a frase `Acolhimento inicial, organização e encaminhamento para que sua demanda chegue à equipe certa com mais tranquilidade.`. Os CTAs devem ser `Falar com a Lara` e `Como posso ajudar`.

- [x] **Step 3: Reescrever as seções informativas sem prometer atuação jurídica**

  Atualizar `#sobre` para explicar a atuação de Lara no acolhimento e na organização das demandas; usar `#apoio` no lugar de `#atuacao`, renderizando `apoios`; e usar `#processo` no lugar de `#metodo`, com as etapas `Acolher`, `Entender e organizar` e `Encaminhar e acompanhar`. Em todas essas seções, remover referências a “advocacia”, “áreas de atuação”, “estratégia jurídica”, “defesa” e “decisões jurídicas” atribuídas a Lara.

- [x] **Step 4: Atualizar FAQ, contato e rodapé**

  Reescrever as perguntas para primeiro contato, informações e documentos iniciais, agendamentos e encaminhamento à equipe. Incluir no texto de contato a frase exata `A análise e a orientação jurídica são conduzidas pela equipe responsável da ACF.`. Ajustar a mensagem do WhatsApp para pedir acolhimento e encaminhamento inicial, mantendo telefone, e-mail e o comportamento local do formulário. No rodapé, exibir `Lara Coelho Assistente Jurídica na ACF` e uma descrição discreta do vínculo com a ACF.

- [x] **Step 5: Executar o teste atualizado para verificar aprovação**

  Run: `node tests/homepage-branding.test.mjs`

  Expected: PASS depois de a página local em desenvolvimento refletir as alterações.

- [x] **Step 6: Commit**

  Como não há repositório Git, não executar commit. Quando disponível, preparar somente `app/page.tsx` e `tests/homepage-branding.test.mjs` com a mensagem `feat: reposition Lara as legal assistant`.

### Task 3: Atualizar metadados e validar produção

**Files:**

- Modify: `app/layout.tsx`
- Test: `tests/homepage-branding.test.mjs`

**Interfaces:**

- Consumes: nova identidade visível da Task 2.
- Produces: metadados de documento alinhados ao conteúdo e um build de produção válido.

- [x] **Step 1: Expandir o teste para os metadados renderizados**

  Adicionar após as asserções iniciais:

  ```js
  assert.match(
    page,
    /<title>Lara Coelho \| Assistente Jurídica na ACF<\/title>/,
    "o título da aba deve usar a nova identidade",
  );
  assert.match(
    page,
    /name="description" content="Lara, Assistente Jurídica na ACF, oferece acolhimento inicial, organização e encaminhamento para o atendimento jurídico."/,
    "a descrição deve explicar o papel de Lara",
  );
  ```

- [x] **Step 2: Rodar o teste para confirmar que os metadados antigos falham**

  Run: `node tests/homepage-branding.test.mjs`

  Expected: FAIL porque `app/layout.tsx` ainda contém `Dra. Lara Advocacia`.

- [x] **Step 3: Atualizar os metadados em `app/layout.tsx`**

  Definir os campos com os valores abaixo, sem modificar `metadataBase`, canonical, fontes, viewport ou Analytics:

  ```ts
  title: 'Lara Coelho | Assistente Jurídica na ACF',
  description: 'Lara, Assistente Jurídica na ACF, oferece acolhimento inicial, organização e encaminhamento para o atendimento jurídico.',
  ```

- [x] **Step 4: Executar o teste e o build de produção**

  Run: `node tests/homepage-branding.test.mjs && npm run build`

  Expected: o teste termina sem `AssertionError` e o build termina com código `0`.

- [x] **Step 5: Inspecionar a página no navegador local**

  Abrir ou recarregar `http://localhost:3000/` e verificar visualmente o hero, os quatro cartões de apoio, a ordem do menu e o texto de contato. Confirmar que a ACF aparece apenas como complemento de função e no aviso de encaminhamento.

- [x] **Step 6: Commit**

  Como não há repositório Git, não executar commit. Quando disponível, preparar somente `app/layout.tsx`, `app/page.tsx` e `tests/homepage-branding.test.mjs` com a mensagem `feat: align Lara assistant metadata`.

## Plan Self-Review

- **Cobertura da especificação:** a Task 2 cobre marca, hero, sobre, apoio, processo, FAQ, contato e rodapé; a Task 3 cobre metadados e build; a Task 1 protege a nova marca, a ausência da atuação individual e a navegação.
- **Sem lacunas:** preservação visual, ausência de backend, manutenção dos canais atuais e delimitação da atuação jurídica são restrições explícitas e verificadas pelas tarefas.
- **Sem placeholders:** nenhuma etapa depende de conteúdo indefinido; mensagens, IDs de seção, dados de apoio e comandos de validação estão definidos.
- **Consistência:** as âncoras geradas na Task 2 são as mesmas verificadas na Task 1 e a identidade de metadata da Task 3 é a mesma identidade visível da página.
