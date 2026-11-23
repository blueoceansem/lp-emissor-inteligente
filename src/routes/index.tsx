import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight, Check, CheckCircle2, ChevronDown, Clock3, FileSpreadsheet, FileText, Layers,
  ListChecks, Menu, RefreshCcw, Rocket, Settings2, ShieldCheck, Sparkles, Star, TrendingUp,
  Upload, X, Zap, FolderKanban, Quote,
} from "lucide-react";
import logo from "@/assets/logo-emissor.png";
import logoNeg from "@/assets/logo-emissor-negativo.png";
import hero from "@/assets/hero-notas.jpg";
import { Diagnostico } from "@/components/Diagnostico";

const TITLE = "Emissor Inteligente — Emissão de notas para afiliados da Shopee";
const DESC = "Suba o relatório da Shopee, confira tudo em poucos cliques e emita todas as suas notas de uma vez.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const APP = "https://emissorinteligente.com.br/cadastrar";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("is-visible"), io.unobserve(e.target))),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function R({ children, d = 0, className = "" }: { children: ReactNode; d?: number; className?: string }) {
  return <div className={`reveal ${className}`} style={{ transitionDelay: `${d}ms` }}>{children}</div>;
}

function Pill({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold ${dark ? "border-hero-foreground/20 bg-hero-foreground/5 text-hero-foreground" : "border-border bg-card text-primary"}`}>
      <Sparkles className="size-3.5 text-accent animate-icon" /> {children}
    </span>
  );
}

function Words({ text, className = "", start = 0 }: { text: string; className?: string; start?: number }) {
  return <>{text.split(" ").map((w, i) => <span key={i} className={`animate-word ${className}`} style={{ animationDelay: `${start + i * 60}ms` }}>{w}&nbsp;</span>)}</>;
}

const nav = [["Como funciona", "#como-funciona"], ["Benefícios", "#beneficios"], ["Depoimentos", "#depoimentos"], ["Planos", "#planos"], ["FAQ", "#faq"]];

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const f = () => setScrolled(window.scrollY > 40); f(); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-6">
        <a href="#inicio" aria-label="Emissor Inteligente — voltar ao início" className={`flex items-center rounded-full px-4 py-2 transition-all ${scrolled ? "bg-card/85 shadow-soft backdrop-blur-xl" : ""}`}>
          <img src={scrolled ? logo : logoNeg} alt="Emissor Inteligente" className="h-9 w-auto" width={115} height={36} />
        </a>
        <nav className="hidden items-center gap-1 rounded-full border border-border bg-card/85 p-1.5 shadow-soft backdrop-blur-xl md:flex">
          {nav.map(([l, h]) => <a key={h} href={h} className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-primary">{l}</a>)}
          <span className="mx-1 h-5 w-px bg-border" />
          <a href={APP} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5">Começar grátis</a>
        </nav>
        <button onClick={() => setOpen(!open)} className="grid size-11 place-items-center rounded-full border border-border bg-card shadow-soft md:hidden" aria-label="Abrir menu">{open ? <X className="size-5" /> : <Menu className="size-5" />}</button>
      </div>
      {open && (
        <div className="mx-4 mt-2 rounded-2xl border border-border bg-card p-3 shadow-soft md:hidden">
          {nav.map(([l, h]) => <a key={h} onClick={() => setOpen(false)} href={h} className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-secondary">{l}</a>)}
          <a href={APP} className="mt-2 block rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground">Começar grátis</a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio">
      <div className="relative overflow-hidden bg-hero text-hero-foreground">
        <img src={hero} alt="" width={1600} height={1104} className="absolute inset-0 h-full w-full object-cover object-right opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-hero via-hero/85 to-hero/10" />
        <div className="absolute inset-0 grid-lines opacity-[0.06]" />
        <div className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-12 px-6 pb-16 pt-32 lg:grid-cols-[1.1fr_.9fr] lg:px-10">
          <div className="max-w-2xl">
            <R><Pill dark>Feito para afiliados Shopee com CNPJ</Pill></R>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[4rem]">
              <Words text="A emissão de notas feita especialmente para" />
              <Words text="afiliados da Shopee" className="text-accent" start={420} />
            </h1>
            <R d={500}><p className="mt-6 max-w-xl text-lg leading-8 text-hero-foreground/75">Chega de perder o fim de semana digitando nota por nota: suba o relatório da Shopee, confira tudo em poucos cliques {'\n'}e emita todas as suas notas de uma vez.</p></R>
            <R d={650} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={APP} className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-accent-gradient px-7 font-semibold text-accent-foreground shadow-glow transition hover:-translate-y-0.5">Simular com minhas notas <ArrowRight className="size-4 transition group-hover:translate-x-1" /></a>
              <a href="#planos" className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-hero-foreground/25 bg-hero-foreground/5 px-7 font-medium backdrop-blur transition hover:bg-hero-foreground/10">Conferir planos e preços</a>
            </R>
            <R d={800}><p className="mt-8 text-sm text-hero-foreground/60">Também funciona para afiliados outros marketplaces: Shopee, Mercado Livre, Amazon e Magalu.</p></R>
          </div>
          <div className="relative hidden h-[460px] lg:block">
            <div className="absolute right-6 top-6 w-72 animate-float rounded-2xl border border-hero-foreground/15 bg-hero-foreground/10 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground"><FileSpreadsheet className="size-5 animate-icon" /></span><div><strong className="block text-sm">relatorio_shopee.xlsx</strong><span className="text-xs text-hero-foreground/60">Importado · 248 linhas</span></div></div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-hero-foreground/15"><div className="h-full w-4/5 rounded-full bg-accent" /></div>
            </div>
            <div className="absolute bottom-24 left-0 w-80 animate-float rounded-2xl bg-card p-5 text-card-foreground shadow-2xl" style={{ animationDelay: "1.5s" }}>
              <div className="flex items-center justify-between"><span className="text-xs font-semibold text-muted-foreground">Lote · Agosto</span><span className="rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-bold text-accent-foreground">EM LOTE</span></div>
              {["Vendedor A · R$ 412,30", "Vendedor B · R$ 189,90", "Comissão Shopee · R$ 96,10"].map((t, i) => (
                <div key={t} className="mt-3 flex items-center gap-2 text-sm"><CheckCircle2 className="size-4 text-success" style={{ animation: `icon-pop 3s ${i * .4}s infinite` }} />{t}</div>
              ))}
            </div>
            <div className="absolute bottom-6 right-10 flex animate-float items-center gap-3 rounded-2xl bg-accent p-4 text-accent-foreground shadow-glow" style={{ animationDelay: "3s" }}>
              <span className="grid size-9 place-items-center rounded-full bg-card/40 animate-pulse-ring"><Check className="size-5" /></span><div><strong className="block text-sm">Notas emitidas</strong><span className="text-xs opacity-80">PDF e XML disponíveis</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Shopee", "Mercado Livre", "Amazon", "Magalu", "NFS-e", "PDF + XML", "Certificado A1", "Emissão em lote"];
  return (
    <div className="overflow-hidden border-b border-border py-6">
      <div className="flex w-max animate-marquee gap-12">
        {[...items, ...items].map((t, i) => <span key={i} className="flex items-center gap-3 text-lg font-semibold text-primary/70"><Star className="size-4 fill-accent text-accent" />{t}</span>)}
      </div>
    </div>
  );
}

function Head({ pill, title, sub }: { pill: string; title: ReactNode; sub?: string }) {
  return (
    <R className="mx-auto max-w-3xl text-center">
      <Pill>{pill}</Pill>
      <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">{title}</h2>
      {sub && <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{sub}</p>}
    </R>
  );
}

function Dores() {
  const d = [
    [Clock3, "Tempo", "emissão manual de várias notas por mês, copiando o relatório linha por linha."],
    [RefreshCcw, "Retrabalho", "difícil conferir vendedor, competência, valor e o que já foi emitido sem perder o controle."],
    [TrendingUp, "Escala", "suas comissões crescem, mas o fechamento fiscal continua do mesmo jeito manual, sem estrutura proporcional."],
  ] as const;
  return (
    <section className="relative px-5 py-24 lg:py-32">
      <div className="absolute inset-0 dot-pattern [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl">
        <Head pill="O problema" title={<>O que está pesando no seu <span className="text-accent">fechamento mensal</span></>} sub="Você exporta o relatório da Shopee e copia dado por dado para emitir cada nota. Quanto mais vendas, mais notas, e mais tempo preso nisso todo mês." />
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {d.map(([I, t, s], i) => (
            <R key={t} d={i * 120}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-soft transition duration-500 hover:-translate-y-2">
                <span className="absolute right-6 top-5 text-6xl font-bold text-secondary">0{i + 1}</span>
                <span className="relative grid size-14 place-items-center rounded-2xl bg-brand-soft text-accent-foreground"><I className="size-6 group-hover-icon" /></span>
                <h3 className="relative mt-6 text-xl font-semibold">{t}</h3>
                <p className="relative mt-3 leading-7 text-muted-foreground">{s}</p>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

function Como() {
  const s = [
    [Settings2, "Configuração inicial", "cadastre empresa, dados fiscais e certificado A1."],
    [FileSpreadsheet, "Relatório da Shopee", "exporte o relatório mensal de comissões (.csv/.xlsx)."],
    [Upload, "Importar e revisar", "a plataforma organiza os dados e você confere cada informação antes de emitir."],
    [FileText, "Emitir e consultar", "confirme a emissão em lote e baixe PDF e XML de cada nota no painel."],
  ] as const;
  return (
    <section id="como-funciona" className="scroll-mt-20 p-2 sm:p-3">
      <div className="relative overflow-hidden rounded-[2rem] bg-hero-gradient px-5 py-24 text-hero-foreground lg:py-32">
        <div className="absolute inset-0 grid-lines opacity-[0.06]" />
        <div className="absolute -right-40 -top-40 size-[520px] animate-spin-slow rounded-full border border-dashed border-accent/30" />
        <div className="absolute -right-20 -top-20 size-[320px] rounded-full bg-accent/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <R className="max-w-3xl"><Pill dark>Como funciona</Pill>
            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">Do relatório à nota emitida <span className="text-accent">em quatro passos</span></h2>
          </R>
          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {s.map(([I, t, d], i) => (
              <R key={t} d={i * 120}>
                <div className="group relative h-full rounded-3xl border border-hero-foreground/15 bg-hero-foreground/5 p-7 backdrop-blur transition duration-500 hover:-translate-y-2 hover:border-accent/60 hover:bg-hero-foreground/10">
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-accent text-accent-foreground"><I className="size-5 animate-icon" style={{ animationDelay: `${i * .5}s` }} /></span>
                    <span className="text-sm font-semibold text-hero-foreground/40">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{t}</h3>
                  <p className="mt-2 text-sm leading-6 text-hero-foreground/70">{d}</p>
                </div>
              </R>
            ))}
          </div>
          <R d={500}><div className="mt-10 flex items-center gap-3 rounded-2xl border border-accent/40 bg-accent/10 p-5 text-sm sm:text-base"><Layers className="size-5 shrink-0 text-accent animate-icon" />Emite tanto a nota por vendedor quanto a nota da comissão da própria Shopee.</div></R>
        </div>
      </div>
    </section>
  );
}

function Beneficios() {
  const b = [
    [Zap, "Menos digitação e retrabalho", "importa o relatório em vez de preencher nota por nota.", "lg:col-span-2"],
    [Rocket, "Fechamento mensal mais ágil", "emissão em lote no mesmo fluxo.", ""],
    [ListChecks, "Conferência antes de emitir", "revise valores e documentos sem surpresa depois.", ""],
    [FolderKanban, "Mais organização", "ideal para quem emite muitas notas por mês.", "lg:col-span-2"],
  ] as const;
  return (
    <section id="beneficios" className="scroll-mt-20 px-5 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Head pill="Benefícios" title={<>Feito para quem quer <span className="text-accent">fechar o mês rápido</span></>} />
        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {b.map(([I, t, d, c], i) => (
            <R key={t} d={i * 100} className={c}>
              <div className={`group relative h-full overflow-hidden rounded-3xl border border-border p-8 shadow-soft transition duration-500 hover:-translate-y-1 ${i === 0 || i === 3 ? "bg-card" : "bg-brand-soft"}`}>
                <div className="absolute -bottom-16 -right-16 size-48 rounded-full bg-accent/10 transition duration-700 group-hover:scale-150" />
                <span className="relative grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground"><I className="size-6 group-hover-icon" /></span>
                <h3 className="relative mt-8 text-2xl font-semibold">{t}</h3>
                <p className="relative mt-3 max-w-md leading-7 text-muted-foreground">{d}</p>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

const depo: [string, string, string][] = [
  ["Mariana S.", "Afiliada Shopee", "Eu passava o domingo inteiro emitindo nota. Agora subo o relatório, confiro e emito tudo de uma vez."],
  ["Rafael M.", "Afiliado PJ", "A conferência antes de emitir me deu segurança. Nunca mais emiti nota duplicada."],
  ["Juliana T.", "Afiliada Shopee e Magalu", "Minhas vendas cresceram e o fechamento não virou pesadelo. Vale cada centavo."],
  ["Lucas P.", "Afiliado Shopee", "Ter PDF e XML de todas as notas no painel facilitou demais a vida com o contador."],
];

function Depoimentos() {
  return (
    <section id="depoimentos" className="scroll-mt-20 border-y border-border bg-card px-5 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Head pill="Depoimentos" title={<>O que afiliados <span className="text-accent">já dizem</span></>} />
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {depo.map(([n, r, t], i) => (
            <R key={n} d={i * 100}>
              <figure className="flex h-full flex-col rounded-3xl border border-border bg-background p-7 transition duration-500 hover:-translate-y-2 hover:shadow-soft">
                <Quote className="size-8 text-accent animate-icon" style={{ animationDelay: `${i * .4}s` }} />
                <div className="mt-4 flex gap-0.5">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="size-4 fill-accent text-accent" />)}</div>
                <blockquote className="mt-4 flex-1 leading-7">“{t}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-primary font-semibold text-primary-foreground">{n.charAt(0)}</span><div><strong className="block text-sm">{n}</strong><span className="text-xs text-muted-foreground">{r}</span></div></figcaption>
              </figure>
            </R>
          ))}
        </div>
        <R d={300} className="mt-10 text-center"><a href="https://www.instagram.com/emissorinteligente/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-semibold text-primary hover:text-accent">Veja mais no Instagram <ArrowRight className="size-4" /></a></R>
      </div>
    </section>
  );
}

const planos = [
  ["Gratuito", "Grátis", "5", "Indisponível", "1"],
  ["Básico", "R$ 19", "100", "R$ 0,30", "1"],
  ["Essencial", "R$ 59", "500", "R$ 0,18", "1"],
  ["Profissional", "R$ 99", "2.500", "R$ 0,06", "até 2"],
  ["Escala", "R$ 149", "5.000", "R$ 0,05", "até 5"],
  ["Máximo", "R$ 199", "10.000", "R$ 0,03", "até 10"],
];

function Planos() {
  return (
    <section id="planos" className="relative scroll-mt-20 px-5 py-24 lg:py-32">
      <div className="absolute inset-0 dot-pattern [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto max-w-7xl">
        <Head pill="Planos e preços" title={<>Escolha o plano do <span className="text-accent">seu volume</span></>} />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {planos.map(([n, p, q, e, c], i) => {
            const top = n === "Essencial";
            return (
              <R key={n} d={(i % 3) * 100}>
                <div className={`relative flex h-full flex-col rounded-3xl border p-8 transition duration-500 hover:-translate-y-2 ${top ? "border-accent bg-hero-gradient text-hero-foreground shadow-glow" : "border-border bg-card shadow-soft"}`}>
                  {top && <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">Mais escolhido</span>}
                  <h3 className="text-lg font-semibold">{n}</h3>
                  <div className="mt-4 flex items-end gap-1"><span className="text-4xl font-bold">{p}</span>{p !== "Grátis" && <span className={`pb-1 text-sm ${top ? "text-hero-foreground/60" : "text-muted-foreground"}`}>/mês</span>}</div>
                  <ul className={`mt-6 flex-1 space-y-3 text-sm ${top ? "text-hero-foreground/85" : "text-muted-foreground"}`}>
                    {[`${q} notas/mês`, `Nota extra: ${e}`, `CNPJs: ${c}`, "PDF e XML de cada nota"].map((t) => <li key={t} className="flex items-center gap-2"><Check className="size-4 text-accent" />{t}</li>)}
                  </ul>
                  <a href={APP} className={`mt-8 inline-flex h-12 items-center justify-center rounded-full font-semibold transition hover:-translate-y-0.5 ${top ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}>Começar grátis</a>
                </div>
              </R>
            );
          })}
        </div>
        <R className="mt-14 overflow-x-auto rounded-3xl border border-border bg-card shadow-soft">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-secondary text-primary"><tr>{["Plano", "Preço/mês", "Notas/mês", "Nota extra", "CNPJs"].map((h) => <th key={h} className="px-6 py-4 font-semibold">{h}</th>)}</tr></thead>
            <tbody>{planos.map((r) => <tr key={r[0]} className={`border-t border-border ${r[0] === "Essencial" ? "bg-brand-soft" : ""}`}>{r.map((c, k) => <td key={k} className={`px-6 py-4 ${k === 0 ? "font-semibold" : "text-muted-foreground"}`}>{k === 0 && c === "Essencial" ? "Essencial (mais escolhido)" : c}</td>)}</tr>)}</tbody>
          </table>
        </R>
        <R className="mt-10 text-center">
          <p className="text-muted-foreground">Todos os planos incluem PDF e XML de cada nota. Experimente por 7 dias, sem cartão e sem compromisso.</p>
          <a href={APP} className="group mt-6 inline-flex h-14 items-center gap-2 rounded-full bg-accent-gradient px-8 font-semibold text-accent-foreground shadow-glow transition hover:-translate-y-0.5">Começar grátis <ArrowRight className="size-4 transition group-hover:translate-x-1" /></a>
        </R>
      </div>
    </section>
  );
}

const faq = [
  ["Preciso ter CNPJ para usar?", "Sim. A plataforma é para afiliados Shopee com CNPJ que emitem NFS-e sobre as comissões."],
  ["Vou precisar digitar nota por nota?", "Não. Você importa o relatório mensal, revisa os dados organizados pela plataforma e emite em lote."],
  ["A nota da própria Shopee também é emitida pela plataforma?", "Sim, além das notas por vendedor, a plataforma também emite a nota da comissão da própria Shopee."],
  ["O que preciso ter para começar?", "Dados fiscais da empresa e certificado digital A1 cadastrados, além do relatório mensal de comissões exportado da Shopee."],
  ["Tenho algum período para testar?", "Sim. Há um plano gratuito de até 5 notas/mês e a opção de experimentar por 7 dias, sem cartão e sem compromisso."],
  ["Posso trocar de plano depois?", "Sim, é possível comprar créditos extras ou trocar de plano conforme o volume de notas mudar."],
];

function Faq() {
  const [o, setO] = useState(0);
  return (
    <section id="faq" className="scroll-mt-20 border-t border-border bg-card px-5 py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <R><Pill>FAQ</Pill><h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">Perguntas <span className="text-accent">frequentes</span></h2><ShieldCheck className="mt-10 hidden size-24 text-secondary animate-float lg:block" /></R>
        <div className="space-y-3">
          {faq.map(([q, a], i) => (
            <R key={q} d={i * 60}>
              <div className={`rounded-2xl border transition ${o === i ? "border-accent bg-brand-soft" : "border-border bg-background"}`}>
                <button onClick={() => setO(o === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold">{q}<ChevronDown className={`size-5 shrink-0 transition duration-300 ${o === i ? "rotate-180 text-accent" : ""}`} /></button>
                <div className={`grid transition-all duration-300 ${o === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}><p className="overflow-hidden px-6 text-muted-foreground"><span className="block pb-5 leading-7">{a}</span></p></div>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="p-2 sm:p-3">
      <div className="relative overflow-hidden rounded-[2rem] bg-hero px-6 py-24 text-center text-hero-foreground lg:py-32">
        <img src={hero} alt="" loading="lazy" width={1600} height={1104} className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-hero via-hero/70 to-hero/40" />
        <R className="relative mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">Pronto para fechar o mês <span className="text-accent">sem digitar nota por nota?</span></h2>
          <a href={APP} className="group mt-10 inline-flex h-14 items-center gap-2 rounded-full bg-accent-gradient px-8 font-semibold text-accent-foreground shadow-glow transition hover:-translate-y-0.5">Começar grátis <ArrowRight className="size-4 transition group-hover:translate-x-1" /></a>
          <p className="mt-5 text-sm text-hero-foreground/70">Experimente por 7 dias, sem cartão e sem compromisso.</p>
        </R>
        <footer className="relative mx-auto mt-24 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-hero-foreground/10 pt-8 text-sm text-hero-foreground/60 sm:flex-row">
          <img src={logoNeg} alt="Emissor Inteligente" loading="lazy" className="h-9 w-auto" width={115} height={36} />
          <span>© {new Date().getFullYear()} Emissor Inteligente. Todos os direitos reservados.</span>
        </footer>
      </div>
    </section>
  );
}

function Index() {
  useReveal();
  const ref = useRef(null);
  return (
    <main ref={ref} className="min-h-screen bg-background">
      <Header /><Hero /><Marquee /><Dores /><Como /><Beneficios /><Depoimentos /><Diagnostico app={APP} /><Planos /><Faq /><Cta />
    </main>
  );
}
