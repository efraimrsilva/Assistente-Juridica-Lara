import assert from 'node:assert/strict'

const response = await fetch('http://localhost:3000/')
assert.equal(response.ok, true, 'a página inicial deve responder com sucesso')

const page = await response.text()

const iconResponse = await fetch('http://localhost:3000/icon.ico')
assert.equal(iconResponse.ok, true, 'o ícone ICO deve estar disponível como ícone da página')
assert.match(iconResponse.headers.get('content-type') ?? '', /^image\/x-icon|image\/vnd\.microsoft\.icon/, 'o ícone da página deve ser um ICO')

assert.match(page, /Lara[\s\S]{0,250}Assistente Jurídica na ACF/, 'a identidade de Lara deve estar visível na página inicial')
const positionedRoleMatches = page.match(/Lara Coelho<\/span><span[^>]*>Assistente Jurídica na ACF<\/span>/g) ?? []
assert.equal(positionedRoleMatches.length, 2, 'cabeçalho e rodapé devem posicionar a função abaixo do nome de Lara')
assert.match(page, /Acolhimento inicial, organização e encaminhamento/, 'o Hero deve explicar o papel de Lara')
assert.match(page, /A análise e a orientação jurídica são conduzidas pela equipe responsável da ACF/, 'a página deve delimitar o papel da equipe jurídica')
assert.doesNotMatch(page, /Dra\. Lara Advocacia/, 'a marca de advocacia individual não deve permanecer visível')
assert.doesNotMatch(page, /23 áreas de atuação/, 'a página não deve apresentar áreas de atuação de Lara')
assert.match(page, /<title>Lara Coelho \| Assistente Jurídica na ACF<\/title>/, 'o título da aba deve usar a nova identidade')
assert.match(page, /name="description" content="Lara Coelho, Assistente Jurídica na ACF, oferece acolhimento inicial, organização e encaminhamento para atendimento presencial em Minas Gerais e online."/, 'a descrição deve explicar o papel de Lara e a área de atendimento')
assert.match(page, /https:\/\/larajur\.netlify\.app\//, 'o HTML deve apontar para o domínio canônico')
assert.match(page, /application\/ld\+json/, 'a página deve expor dados estruturados')
assert.match(page, /Atendimento presencial em Minas Gerais e online\./, 'o contexto de atendimento deve estar visível')
const laraImageMatch = page.match(/src="([^"]*lara[^"]*\.jpeg)"/)
assert.ok(laraImageMatch, 'a seção Sobre Lara deve usar a imagem local de Lara')
const laraImageTag = page.match(/<img[^>]*src="[^"]*lara[^"]*\.jpeg"[^>]*>/)
assert.ok(laraImageTag, 'a imagem local de Lara deve estar presente no conteúdo da página')
assert.match(laraImageTag[0], /rounded-xl/, 'a foto de Lara deve ter bordas discretamente arredondadas')
assert.doesNotMatch(laraImageTag[0], /opacity-85|mix-blend-luminosity/, 'a foto de Lara não deve usar o filtro azulado anterior')
assert.doesNotMatch(page, /<div class="absolute inset-0 bg-primary\/25"/, 'a foto de Lara não deve receber uma sobreposição azul')
const laraImage = await fetch(new URL(laraImageMatch[1], 'http://localhost:3000'))
assert.equal(laraImage.ok, true, 'a imagem local de Lara deve estar disponível')
assert.match(laraImage.headers.get('content-type') ?? '', /^image\/jpeg/, 'a imagem local de Lara deve ser um JPEG')
assert.doesNotMatch(page, /images\.unsplash\.com\/photo-1551836022-d5d88e9218df/, 'a imagem externa anterior não deve permanecer na página')

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

const heroStart = page.indexOf('id="inicio"')
const aboutStart = page.indexOf('id="sobre"')
const supportStart = page.indexOf('id="apoio"')
const processStart = page.indexOf('id="processo"')
const faqStart = page.indexOf('id="faq"')
const contactStart = page.indexOf('id="contato"')

assert.ok(heroStart >= 0, 'o Hero deve estar presente')
assert.ok(aboutStart > heroStart, 'a seção Sobre Lara deve aparecer após o Hero')
assert.ok(supportStart > aboutStart, 'a seção de apoio deve aparecer após Sobre Lara')
assert.ok(processStart > supportStart, 'a seção de processo deve aparecer após os apoios')
assert.ok(faqStart > processStart, 'as perguntas frequentes devem aparecer após o processo')
assert.ok(contactStart > faqStart, 'o contato deve aparecer após as perguntas frequentes')

const apoios = [
  'Acolhimento inicial',
  'Organização de informações',
  'Documentos e agendamentos',
  'Acompanhamento de comunicação',
]

for (const apoio of apoios) {
  assert.match(page, new RegExp(`>${apoio}</h3>`), `${apoio} deve aparecer como um cartão de apoio`)
}

const expectedNavigation = ['#sobre', '#apoio', '#processo', '#faq', '#contato']
const headerStart = page.indexOf('aria-label="Navegação principal"')
const headerNavigation = page.slice(headerStart, page.indexOf('</nav>', headerStart))
const footerStart = page.indexOf('<footer')
const footerNavigation = page.slice(footerStart, page.indexOf('</footer>', footerStart))

for (const [name, navigation] of [['cabeçalho', headerNavigation], ['rodapé', footerNavigation]]) {
  const links = [...navigation.matchAll(/href="(#[^"]+)"/g)].map((match) => match[1])
  assert.deepEqual(links, expectedNavigation, `${name} deve usar a ordem e as âncoras definidas`)
}

assert.match(page, /\(31\) 98713-2915/, 'o número de WhatsApp deve permanecer visível na seção de contato')
