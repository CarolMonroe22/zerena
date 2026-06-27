import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { BasedOn } from "@/components/BasedOn";
import { LineasButton } from "@/components/LineasButton";

export const Route = createFileRoute("/para-ayudar/panico")({
  head: () => ({ meta: [{ title: "Pánico o shock — Zerena" }] }),
  component: Panico,
});

const PRESENTE = [
  "Pies en el suelo y notar el contacto.",
  "Apretar y soltar las manos despacio.",
  "Escuchar su propia respiración.",
  "Respirar despacio y profundo.",
];

function Panico() {
  return (
    <PageShell>
      <BackLink to="/para-ayudar/ahora" label="Estoy con alguien" />
      <h1 className="mt-2 font-serif text-3xl text-foreground">Si hay pánico o shock</h1>

      <section className="serena-card mt-6 p-6">
        <h2 className="font-serif text-lg text-foreground">Calmar</h2>
        <p className="mt-3 text-base leading-relaxed text-foreground/85">
          Voz suave. Recuérdale que estás ahí y, si es cierto, que está a salvo. No la dejes sola.
        </p>
      </section>

      <section className="serena-card mt-4 p-6">
        <h2 className="font-serif text-lg text-foreground">Volver al presente</h2>
        <p className="mt-2 text-sm text-muted-foreground">Sin mirar lo que duele:</p>
        <ul className="mt-3 space-y-2.5">
          {PRESENTE.map((t) => (
            <li key={t} className="flex gap-3 text-base leading-relaxed text-foreground/85">
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
