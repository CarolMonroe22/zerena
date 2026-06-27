import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { LineasButton } from "@/components/LineasButton";
import { BasedOn } from "@/components/BasedOn";

export const Route = createFileRoute("/para-ayudar/no-mejora")({
  head: () => ({ meta: [{ title: "Cuando no mejora — Zerena" }] }),
  component: NoMejora,
});

const SENALES = [
  "No puede con su día a día (no come, no duerme, no funciona) sostenido.",
  "Revive el evento sin parar; pesadillas que no bajan.",
  "Se aísla por completo; desesperanza profunda.",
  "Usa alcohol o drogas para soportarlo.",
];

const TU = [
  "No es tu trabajo curarlo, es acompañar y conectar.",
  "Díselo con cuidado: «lo que cargas es mucho, mereces apoyo de alguien preparado».",
  "Acompáñalo a contactar una línea profesional.",
  "Haz el puente. No desaparezcas de golpe.",
];

function NoMejora() {
  return (
    <PageShell>
      <BackLink to="/para-ayudar/ahora" label="Estoy con alguien" />
      <h1 className="mt-2 font-serif text-3xl text-foreground">Cuando no mejora</h1>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        La mayoría mejora con el tiempo y apoyo básico. Pero si tras varias semanas alguien sigue
        igual o peor, necesita más que acompañamiento.
      </p>

      <section className="serena-card mt-6 p-6">
        <h2 className="font-serif text-lg text-foreground">Señales de que necesita ayuda profesional</h2>
        <ul className="mt-3 space-y-3 text-base leading-relaxed text-foreground/85">
          {SENALES.map((t) => (
            <li key={t} className="flex gap-3">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4 rounded-2xl border border-alert/30 bg-[oklch(0.97_0.025_28)] p-6">
        <p className="font-serif text-base text-alert">
          Pensamientos de hacerse daño → necesita ayuda YA.
        </p>
        <p className="mt-2 text-sm text-foreground/85">
          Llama al{" "}
          <a href="tel:911" className="font-medium text-alert underline-offset-4 hover:underline">
            911
          </a>{" "}
          o a una línea de crisis del directorio.
        </p>
      </section>

      <section className="serena-card mt-4 p-6">
        <h2 className="font-serif text-lg text-foreground">Qué puedes hacer tú</h2>
        <ul className="mt-3 space-y-3 text-base leading-relaxed text-foreground/85">
          {TU.map((t) => (
            <li key={t} className="flex gap-3">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8 flex justify-center">
        <LineasButton />
      </div>
      <BasedOn source="PAP (OMS/OPS)" />
    </PageShell>
  );
}
