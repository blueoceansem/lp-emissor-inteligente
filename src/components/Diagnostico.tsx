import { useRef, useState } from "react";
import { CheckCircle2, FileSpreadsheet, Lock, RefreshCcw, Upload, Zap, ShieldCheck, ArrowRight } from "lucide-react";

const PLANS = [
  { n: "Gratuito", p: "Grátis", q: 5 },
  { n: "Básico", p: "R$ 19/mês", q: 100 },
  { n: "Essencial", p: "R$ 59/mês", q: 500 },
  { n: "Profissional", p: "R$ 99/mês", q: 2500 },
  { n: "Escala", p: "R$ 149/mês", q: 5000 },
  { n: "Máximo", p: "R$ 199/mês", q: 10000 },
];

type Result = { notas: number; total: number; plano: (typeof PLANS)[number] };
const norm = (s: unknown) => String(s ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const num = (v: unknown) => {
  if (typeof v === "number") return v;
  const s = String(v ?? "").replace(/[^\d,.-]/g, "");
  const n = parseFloat(s.includes(",") ? s.replace(/\./g, "").replace(",", ".") : s);
  return isNaN(n) ? 0 : n;
};

async function analyze(file: File): Promise<Result> {
  const XLSX = await import("xlsx");
  const wb = XLSX.read(await file.arrayBuffer(), { type: "array", raw: /\.csv$/i.test(file.name) });
  const rows = XLSX.utils.sheet_to_json<unknown[]>(wb.Sheets[wb.SheetNames[0]!]!, { header: 1, defval: "" });
  const hi = rows.findIndex((r) => r.some((c) => /loja|vendedor|comiss/.test(norm(c))));
  if (hi < 0) throw new Error("formato");
  const h = rows[hi]!.map(norm);
  const lojaI = h.findIndex((c) => /nome da loja|loja|vendedor/.test(c));
  let valI = h.findIndex((c) => /comiss/.test(c));
  if (valI < 0) valI = h.findIndex((c) => /valor/.test(c));
  const lojas = new Set<string>();
  let total = 0;
  for (const r of rows.slice(hi + 1)) {
    const v = valI >= 0 ? num(r[valI]) : 0;
    const l = lojaI >= 0 ? String(r[lojaI] ?? "").trim() : "";
    if (!l && !v) continue;
    if (l) lojas.add(l);
    total += v;
  }
  const notas = lojas.size + 1; // uma nota por vendedor + a nota da própria Shopee
  const plano = PLANS.find((p) => p.q >= notas) ?? PLANS[PLANS.length - 1]!;
  return { notas, total, plano };
}

export function Diagnostico({ app }: { app: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [res, setRes] = useState<Result | null>(null);

  const go = async (f?: File) => {
    if (!f) return;
    if (!/\.(xlsx|xls|csv)$/i.test(f.name)) return setErr("Envie um arquivo .xlsx ou .csv.");
    setErr(""); setBusy(true);
    try { setRes(await analyze(f)); } catch { setErr("Não conseguimos ler este arquivo. Confira se é o Relatório Mensal da Shopee."); }
    finally { setBusy(false); }
  };

  return (
    <section id="diagnostico" className="scroll-mt-20 px-5 py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="reveal is-visible">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-primary"><Zap className="size-3.5 text-accent animate-icon" /> Diagnóstico gratuito</span>
          <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">Descubra quantas notas <span className="text-accent">você precisa emitir</span></h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">Envie seu Relatório Mensal da Shopee. Nós identificamos a quantidade de NFS-e, o valor total e o plano ideal para seu volume. A leitura acontece no seu computador: o arquivo não sobe.</p>
          <ul className="mt-8 space-y-3">
            {[[Lock, "Seu arquivo não será armazenado"], [Zap, "Análise automática em segundos"], [ShieldCheck, "Sem compromisso e sem cadastro"]].map(([I, t]: any) => (
              <li key={t} className="flex items-center gap-3 font-medium"><span className="grid size-9 place-items-center rounded-xl bg-brand-soft text-accent"><I className="size-4" /></span>{t}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-card p-3 shadow-soft">
          {res ? (
            <div className="rounded-2xl bg-hero-gradient p-8 text-hero-foreground">
              <CheckCircle2 className="size-10 text-accent animate-icon" />
              <h3 className="mt-4 text-2xl font-semibold">Seu diagnóstico</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-hero-foreground/10 p-5"><p className="text-sm text-hero-foreground/70">Notas (NFS-e)</p><p className="mt-1 text-4xl font-bold">{res.notas.toLocaleString("pt-BR")}</p></div>
                <div className="rounded-2xl bg-hero-foreground/10 p-5"><p className="text-sm text-hero-foreground/70">Valor total</p><p className="mt-1 text-3xl font-bold">{res.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p></div>
              </div>
              <div className="mt-4 rounded-2xl border border-accent/50 bg-accent/10 p-5"><p className="text-sm text-hero-foreground/70">Plano ideal</p><p className="mt-1 text-2xl font-bold">{res.plano.n} <span className="text-base font-medium text-hero-foreground/70">· {res.plano.p} · até {res.plano.q.toLocaleString("pt-BR")} notas</span></p></div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={app} className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 font-semibold text-accent-foreground shadow-glow">Começar grátis <ArrowRight className="size-4" /></a>
                <button onClick={() => setRes(null)} className="inline-flex h-12 items-center gap-2 rounded-full border border-hero-foreground/30 px-6 font-semibold"><RefreshCcw className="size-4" /> Analisar outro</button>
              </div>
            </div>
          ) : (
            <button type="button" onClick={() => input.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
              onDrop={(e) => { e.preventDefault(); setDrag(false); go(e.dataTransfer.files[0]); }}
              className={`flex min-h-[340px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition ${drag ? "border-accent bg-brand-soft" : "border-border bg-background hover:border-accent"}`}>
              <span className="grid size-16 place-items-center rounded-2xl bg-primary text-primary-foreground">{busy ? <RefreshCcw className="size-7 animate-spin" /> : <Upload className="size-7 animate-float" />}</span>
              <p className="mt-6 text-lg"><strong>{busy ? "Analisando..." : "Solte seu relatório aqui"}</strong>{!busy && " ou clique para selecionar um arquivo .xlsx ou .csv"}</p>
              <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground"><FileSpreadsheet className="size-4" /> A leitura acontece no seu navegador. O arquivo não é enviado.</p>
              {err && <p className="mt-4 text-sm font-medium text-destructive">{err}</p>}
            </button>
          )}
          <input ref={input} type="file" accept=".xlsx,.xls,.csv" hidden onChange={(e) => { go(e.target.files?.[0]); e.target.value = ""; }} />
        </div>
      </div>
    </section>
  );
}
