import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { LineasButton } from "@/components/LineasButton";

export const Route = createFileRoute("/para-ayudar/a-distancia")({
  head: () => ({ meta: [{ title: "Acompañar a distancia — Serena" }] }),
  component: ADistancia,
});

const PUNTOS = [
  "No asumas nada de su entorno. Pregunta con suavidad si está en un lugar seguro.",
  "Tu herramienta es la voz o el texto: tono calmado, frases cortas.",
  "Hazle saber que sigues ahí: «te escucho», «aquí estoy».",
  "No insistas en detalles. Deja que cuente solo lo que quiera.",
  "Ten el directorio abierto antes de empezar.",
  "Si te supera o hay riesgo de vida, conéctalo con ayuda experta.",
];

function ADistancia() {
  return (
    <PageShell>
      <BackLink to="/para-ayudar/ahora" label="Estoy con alguien" />
      <h1 className="mt-2 font-serif text-3xl text-foreground">Acompañar a distancia</h1>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        Por teléfono o mensaje no puedes ver la escena, así que el paso de «observar» cambia.
      </p>

      <section className="serena-card mt-6 p-6">
        <ul className="space-y-3 text-base leading-relaxed text-foreground/85">
          {PUNTOS.map((t) => (
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
    </PageShell>
  );
}
