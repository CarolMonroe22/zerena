import { createFileRoute, Link } from "@tanstack/react-router";
import { Wind, Phone, AlertCircle } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { BasedOn } from "@/components/BasedOn";
import { LineasButton } from "@/components/LineasButton";

export const Route = createFileRoute("/para-mi/perdiste-todo")({
  head: () => ({ meta: [{ title: "Si lo perdiste todo — Zerena" }] }),
  component: PerdisteTodo,
});

function PerdisteTodo() {
  const bullets = [
    "Quizá sientas culpa por estar vivo cuando otros no. Eso es una reacción humana al horror, no una verdad sobre ti.",
    "No tienes que ser fuerte. No tienes que entenderlo hoy.",
    "No estás obligado a cargar esto en silencio. Hay personas preparadas para sostener algo tan grande, y mereces ese apoyo.",
    "Cuando puedas, apóyate en quien quede cerca. El dolor compartido pesa un poco menos.",
  ];
  return (
    <PageShell>
      <BackLink to="/para-mi" label="Para mí" />
      <h1 className="mt-2 font-serif text-3xl text-foreground">Si lo perdiste todo</h1>
      <p className="mt-5 text-base leading-relaxed text-foreground/85">
        Si perdiste a tu familia, a los tuyos, no hay palabras que alcancen, y no voy a fingir que las tengo. Lo que cargas es enorme.
      </p>

      {/* BLOQUE DE RIESGO — siempre visible y arriba */}
      <div className="mt-6 rounded-2xl border p-5" style={{ borderColor: "var(--alert)", backgroundColor: "color-mix(in oklab, var(--alert) 8%, var(--surface))" }}>
        <div className="flex items-start gap-3">
          <AlertCircle size={20} style={{ color: "var(--alert)" }} className="mt-0.5 shrink-0" />
          <p className="text-base leading-relaxed text-foreground">
            Si sientes que no quieres seguir, o piensas en hacerte daño, por favor no te quedes solo con eso ahora.
          </p>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <a
            href="tel:911"
            className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-white"
            style={{ backgroundColor: "var(--alert)" }}
          >
            <span className="inline-flex items-center gap-2"><Phone size={14} /> Llamar al 911</span>
            <span className="tabular-nums">911</span>
          </a>
          <a
            href="tel:+584140179925"
            className="flex items-center justify-between rounded-xl bg-card px-4 py-3 text-sm text-foreground ring-1 ring-border"
          >
            <span className="inline-flex items-center gap-2"><Phone size={14} /> Médicos Sin Fronteras · 24/7</span>
            <span className="tabular-nums">0414-0179925</span>
          </a>
        </div>
      </div>

      <ul className="mt-8 space-y-3">
        {bullets.map((t, i) => (
          <li key={i} className="serena-card p-5 text-base leading-relaxed text-foreground/85">
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-3">
        <LineasButton />
        <Link
          to="/para-mi/respira"
          className="inline-flex items-center gap-2 rounded-full bg-sage-soft px-4 py-2 text-sm text-primary ring-1 ring-border hover:bg-secondary"
        >
          <Wind size={14} /> Respira conmigo
        </Link>
      </div>
          <BasedOn source="PAP y duelo en emergencias" />
    </PageShell>
  );
}
