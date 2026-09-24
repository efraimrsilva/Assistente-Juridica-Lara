"use client";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  FileCheck2,
  Handshake,
  Menu,
  MessageCircleHeart,
  Scale,
  Sparkles,
  Users,
  X,
} from "lucide-react";

const whatsappMessage =
  "Olá, Lara. Gostaria de compartilhar minha necessidade e receber um encaminhamento inicial. Você poderia me orientar sobre os próximos passos?";
const whatsappHref = `https://wa.me/5531987132915?text=${encodeURIComponent(whatsappMessage)}`;

const navigation = [
  ["Sobre Lara", "sobre"],
  ["Como posso ajudar", "apoio"],
  ["Meu processo", "processo"],
  ["Perguntas frequentes", "faq"],
  ["Contato", "contato"],
] as const;

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

const faqs = [
  [
    "Como funciona o primeiro contato?",
    "Você pode me contar brevemente o que precisa. Eu acolho as informações iniciais, organizo a demanda e indico o próximo passo mais adequado.",
  ],
  [
    "Quais informações ajudam na triagem?",
    "Uma explicação objetiva do contexto, das pessoas envolvidas e de eventuais prazos já ajuda a tornar o encaminhamento mais claro.",
  ],
  [
    "Preciso levar documentos logo no início?",
    "Se você já tiver documentos relacionados à demanda, pode mencioná-los no primeiro contato. Eu explico o que pode ser útil organizar para a próxima etapa.",
  ],
  [
    "A Lara realiza orientação jurídica?",
    "Lara cuida do acolhimento, da organização e do encaminhamento inicial. A análise e a orientação jurídica são conduzidas pela equipe responsável da ACF.",
  ],
];

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M20.52 3.48A11.82 11.82 0 0 0 12.04 0C5.5 0 .18 5.32.18 11.86c0 2.09.55 4.13 1.59 5.93L.08 24l6.36-1.67a11.84 11.84 0 0 0 5.6 1.42h.01c6.53 0 11.85-5.32 11.85-11.86 0-3.17-1.23-6.14-3.48-8.39Zm-8.48 18.27h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.78.99 1.01-3.68-.24-.38a9.85 9.85 0 0 1-1.52-5.24c0-5.44 4.43-9.87 9.88-9.87 2.64 0 5.12 1.03 6.98 2.89a9.81 9.81 0 0 1 2.89 6.99c0 5.44-4.43 9.88-9.83 9.88Zm5.41-7.39c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-1.78-.89-2.95-1.59-4.12-3.61-.31-.53.31-.49.89-1.64.1-.2.05-.37-.03-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.62.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [currentYear, setCurrentYear] = useState(() => dayjs().year());
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => setCurrentYear(dayjs().year()), []);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-primary/10 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <a
            href="#inicio"
            className="flex items-center gap-3"
            onClick={closeMenu}
            aria-label="Lara, início"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-accent">
              <MessageCircleHeart size={20} strokeWidth={1.5} />
            </span>
            <span className="flex flex-col font-serif text-xl font-semibold leading-tight tracking-tight text-primary">
              <span>Lara Coelho</span>
              <span className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-secondary">
                Assistente Jurídica na ACF
              </span>
            </span>
          </a>
          <nav
            className={`${menuOpen ? "flex" : "hidden"} absolute left-0 right-0 top-20 flex-col gap-5 border-b border-primary/10 bg-background px-6 py-6 md:static md:flex md:flex-row md:items-center md:gap-7 md:border-0 md:bg-transparent md:p-0`}
            aria-label="Navegação principal"
          >
            {navigation.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={closeMenu}
                className="text-sm font-medium text-primary/75 transition-colors hover:text-secondary"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#contato"
              className="hidden items-center gap-2 bg-accent px-5 py-3 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5 sm:flex"
            >
              Falar com a Lara <ArrowUpRight size={16} />
            </a>
            <button
              className="rounded-md p-2 text-primary md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <section
        id="inicio"
        className="relative flex min-h-[720px] items-center bg-primary pt-20"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent 49.8%, #F5F2EA 50%, transparent 50.2%), linear-gradient(0deg, transparent 49.8%, #F5F2EA 50%, transparent 50.2%)",
            backgroundSize: "120px 120px",
          }}
        />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-10 lg:py-32">
          <div className="max-w-2xl">
            <div className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              <span className="h-px w-10 bg-accent" /> Assistente Jurídica na
              ACF
            </div>
            <h1 className="max-w-3xl font-serif text-5xl leading-[1.04] tracking-tight text-background sm:text-6xl lg:text-7xl">
              Um primeiro contato mais{" "}
              <span className="text-accent">claro, próximo</span> e organizado.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-background/70">
              Acolhimento inicial, organização e encaminhamento para que sua
              demanda chegue à equipe certa com mais tranquilidade.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contato"
                className="inline-flex items-center justify-center gap-3 bg-accent px-6 py-4 text-sm font-bold text-primary transition-transform hover:-translate-y-1"
              >
                Falar com a Lara <ArrowUpRight size={18} />
              </a>
              <a
                href="#apoio"
                className="inline-flex items-center justify-center gap-3 border border-background/35 px-6 py-4 text-sm font-semibold text-background transition-colors hover:border-accent hover:text-accent"
              >
                Como posso ajudar <ChevronRight size={18} />
              </a>
            </div>
            <div className="mt-16 grid max-w-lg grid-cols-2 gap-5 border-t border-background/15 pt-6">
              <div>
                <p className="font-serif text-3xl text-accent">100%</p>
                <p className="mt-1 text-xs leading-5 text-background/55">
                  contato com atenção
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl text-accent">100%</p>
                <p className="mt-1 text-xs leading-5 text-background/55">
                  comunicação próxima
                </p>
              </div>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:ml-auto">
            <div className="relative aspect-[4/5] overflow-hidden bg-secondary/30">
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=85"
                alt="Ambiente de acolhimento e organização"
                className="h-full w-full object-cover opacity-85 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-primary/25" />
              <div className="absolute bottom-6 left-6 right-6 border border-background/40 bg-primary/80 p-5 backdrop-blur-sm">
                <p className="font-serif text-xl text-background">
                  “Todo bom atendimento começa com uma escuta atenta.”
                </p>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                  Lara Coelho · Assistente Jurídica
                </p>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 h-24 w-24 border-b border-l border-accent" />
            <div className="absolute -right-4 -top-4 flex h-20 w-20 items-center justify-center rounded-full border border-accent/70 bg-primary text-center text-[10px] font-semibold uppercase leading-4 tracking-widest text-accent">
              <Sparkles size={17} className="mb-1" />
              <span>
                Apoio
                <br />
                próximo
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="sobre" className="bg-background py-20 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-10">
          <div className="relative max-w-md">
            <div className="aspect-[4/5] overflow-hidden bg-secondary/20">
              <img
                src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=900&q=85"
                alt="Ambiente de trabalho organizado"
                className="h-full w-full object-cover grayscale"
              />
            </div>
            <div className="absolute -bottom-8 -right-6 bg-accent p-6 text-primary sm:-right-10">
              <MessageCircleHeart size={27} strokeWidth={1.3} />
              <p className="mt-4 max-w-[150px] font-serif text-lg leading-tight">
                Atenção que organiza o próximo passo.
              </p>
            </div>
          </div>
          <div className="max-w-xl">
            <p className="eyebrow">Sobre Lara</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-primary sm:text-5xl">
              Acolher bem também é cuidar do começo.
            </h2>
            <p className="mt-7 text-base leading-8 text-muted-foreground">
              Lara é Assistente Jurídica na ACF e atua no primeiro contato com
              pessoas que precisam ser ouvidas com atenção. Seu trabalho
              transforma informações iniciais em um caminho mais organizado para
              o atendimento.
            </p>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              Com uma comunicação clara e presença próxima, ela ajuda cada
              pessoa a entender o que precisa compartilhar, como se preparar e
              qual será o próximo passo.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Escuta atenta",
                "Comunicação clara",
                "Organização cuidadosa",
                "Acompanhamento próximo",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm font-medium text-primary"
                >
                  <Check size={16} className="text-secondary" />
                  {item}
                </div>
              ))}
            </div>
            <a
              href="#apoio"
              className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary"
            >
              Conheça como posso ajudar <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section id="apoio" className="bg-[#eeeae0] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Como posso ajudar</p>
              <h2 className="mt-4 font-serif text-4xl text-primary sm:text-5xl">
                Mais clareza desde o primeiro contato.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              Meu apoio organiza o início da sua jornada e facilita o
              encaminhamento para a equipe responsável.
            </p>
          </div>
          <div className="mt-12 grid gap-px bg-primary/10 sm:grid-cols-2 lg:grid-cols-4">
            {apoios.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="group bg-background p-6 transition-colors hover:bg-primary"
              >
                <Icon
                  className="text-secondary transition-colors group-hover:text-accent"
                  size={25}
                  strokeWidth={1.5}
                />
                <h3 className="mt-6 font-serif text-xl text-primary transition-colors group-hover:text-background">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground transition-colors group-hover:text-background/65">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="processo">
        <div className="bg-background py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-10">
            <div>
              <p className="eyebrow">Meu processo</p>
              <h2 className="mt-5 max-w-md font-serif text-4xl leading-tight text-primary sm:text-5xl">
                Presença humana. Caminho organizado.
              </h2>
            </div>
            <div className="grid gap-10 sm:grid-cols-3">
              {[
                [
                  Handshake,
                  "Acolher",
                  "Recebo seu contato com atenção e escuto o que você precisa compartilhar.",
                ],
                [
                  FileCheck2,
                  "Entender e organizar",
                  "Reúno as informações iniciais para tornar a demanda mais clara.",
                ],
                [
                  Users,
                  "Encaminhar e acompanhar",
                  "Direciono o próximo passo e mantenho você informado sobre como seguir.",
                ],
              ].map(([Icon, title, text]) => {
                const StepIcon = Icon as typeof Handshake;
                return (
                  <div key={title as string}>
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                      <StepIcon size={21} />
                    </div>
                    <h3 className="font-serif text-xl text-primary">
                      {title as string}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {text as string}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="bg-secondary py-20 text-background lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
              <div>
                <p className="eyebrow text-accent">Meu processo</p>
                <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
                  Menos dúvidas. Mais direção.
                </h2>
                <p className="mt-6 max-w-md leading-7 text-background/70">
                  O começo de uma demanda pode parecer confuso. Meu papel é
                  tornar esse primeiro momento mais simples, acolhedor e bem
                  encaminhado.
                </p>
              </div>
              <div className="grid gap-0 sm:grid-cols-3">
                {[
                  [
                    "01",
                    "Acolher",
                    "Você compartilha sua necessidade com tranquilidade.",
                  ],
                  [
                    "02",
                    "Organizar",
                    "Estruturamos as informações importantes para o início.",
                  ],
                  [
                    "03",
                    "Encaminhar",
                    "A equipe responsável recebe a demanda com mais contexto.",
                  ],
                ].map(([number, title, text]) => (
                  <div
                    key={number}
                    className="border-t border-background/25 px-1 py-7 sm:border-l sm:border-t-0 sm:px-7"
                  >
                    <span className="font-mono text-xs text-accent">
                      {number}
                    </span>
                    <h3 className="mt-12 font-serif text-2xl">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-background/65">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-background py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-10">
          <div>
            <p className="eyebrow">Perguntas frequentes</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-primary sm:text-5xl">
              Tudo mais claro desde o início.
            </h2>
          </div>
          <div className="border-t border-primary/15">
            {faqs.map(([question, answer], index) => (
              <div key={question} className="border-b border-primary/15">
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left font-serif text-xl text-primary"
                >
                  <span>{question}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-secondary transition-transform ${activeFaq === index ? "rotate-180" : ""}`}
                  />
                </button>
                {activeFaq === index && (
                  <p className="max-w-2xl pb-6 text-sm leading-7 text-muted-foreground">
                    {answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contato"
        className="bg-primary py-20 text-background lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_.8fr] lg:px-10">
          <div>
            <p className="eyebrow text-accent">Vamos conversar</p>
            <h2 className="mt-5 max-w-xl font-serif text-5xl leading-tight sm:text-6xl">
              Seu primeiro passo pode ser uma boa conversa.
            </h2>
            <p className="mt-7 max-w-lg text-base leading-7 text-background/65">
              Conte brevemente o que você precisa. Eu recebo sua solicitação,
              organizo as informações iniciais e conduzo o encaminhamento para o
              próximo passo.
            </p>
            <p className="mt-4 max-w-lg text-sm leading-6 text-background/65">
              Atendimento presencial em Minas Gerais e online.
            </p>
            <p className="mt-4 max-w-lg text-sm leading-6 text-accent">
              A análise e a orientação jurídica são conduzidas pela equipe
              responsável da ACF.
            </p>
            <div className="mt-10 flex flex-col gap-4 text-sm text-background/80">
              <a
                href="mailto:contato@laracoelho.adv.br"
                className="flex items-center gap-3 hover:text-accent"
              >
                <span className="flex h-9 w-9 items-center justify-center border border-background/20">
                  <FileCheck2 size={16} />
                </span>{" "}
                contato@laracoelho.adv.br
              </a>
              <a
                href={whatsappHref}
                className="flex items-center gap-3 hover:text-accent"
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex h-9 w-9 items-center justify-center border border-background/20 text-[#25D366]">
                  <WhatsAppIcon size={18} />
                </span>{" "}
                (31) 98713-2915
              </a>
            </div>
          </div>
          <form
            className="bg-background p-7 text-primary sm:p-9"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-5">
              <label className="grid gap-2 text-sm font-semibold">
                Seu nome
                <input
                  required
                  className="border-b border-primary/20 bg-transparent px-0 py-3 text-sm font-normal outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-secondary"
                  placeholder="Como posso chamar você?"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Seu e-mail
                <input
                  required
                  type="email"
                  className="border-b border-primary/20 bg-transparent px-0 py-3 text-sm font-normal outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-secondary"
                  placeholder="voce@email.com"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Como posso ajudar?
                <textarea
                  required
                  rows={3}
                  className="resize-none border-b border-primary/20 bg-transparent px-0 py-3 text-sm font-normal outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-secondary"
                  placeholder="Conte um pouco sobre sua necessidade"
                />
              </label>
              <button className="mt-3 inline-flex items-center justify-center gap-2 bg-accent px-5 py-4 text-sm font-bold text-primary transition-transform hover:-translate-y-0.5">
                Solicitar contato <ArrowUpRight size={17} />
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="bg-primary text-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 border-t border-background/15 px-6 py-8 text-sm lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className="flex flex-col font-serif text-xl leading-tight">
              <span>Lara Coelho</span>
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent">
                Assistente Jurídica na ACF
              </span>
            </p>
            <p className="mt-2 text-xs text-background/45">
              Acolhimento inicial, organização e apoio no encaminhamento dentro
              da ACF.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-5 text-xs text-background/55">
              {navigation.map(([label, id]) => (
                <a key={id} href={`#${id}`} className="hover:text-accent">
                  {label}
                </a>
              ))}
            </div>
            <p className="text-xs leading-5 text-white">
              © <span suppressHydrationWarning>{currentYear}</span> Lara Coelho·
              Assistente Jurídica na ACF. Feito com 💖 por{" "}
              <a
                href="https://www.linkedin.com/in/efraimrsilva/"
                target="_blank"
                rel="noreferrer"
                className="efraim-credit-link"
              >
                Efraim R. Silva
              </a>
              . Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
      <a
        href={whatsappHref}
        aria-label="Falar com a Lara pelo WhatsApp"
        className="fixed bottom-[114px] right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-105"
        target="_blank"
        rel="noreferrer"
      >
        <WhatsAppIcon size={28} />
      </a>
    </main>
  );
}
