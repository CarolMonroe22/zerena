import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";

export const Route = createFileRoute("/para-mi/normal")({
  head: () => ({ meta: [{ title: "Esto que sientes es normal — Serena" }] }),
  component: Normal,
});

const REACTIONS = [
  "Dormir poco, o despertarte de golpe.",
  "Sentir el cuerpo cansado aunque no hayas hecho mucho.",
  "Sobresaltarte con ruidos o movimientos.",
  "Llorar sin aviso, o no poder llorar.",
  "Olvidar cosas pequeñas, costar concentrarte.",
  "Sentir miedo, rabia, o nada en absoluto.",
  "Querer estar con gente, o necesitar estar solo.",
];

function Normal() {
  return (
    <PageShell>
      <BackLink to="/para-mi" label="Para mí" />
      <h1 className="mt-2 font-serif text-3xl text-foreground">Esto que sientes es normal</h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        Después de algo tan fuerte, el cuerpo y la mente reaccionan. No estás roto. Estás respondiendo a algo que merecía respuesta.
      </p>

      <ul className="mt-8 space-y-2">
        {REACTIONS.map((r) => (
          <li
            key={r}
            className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden />
            {r}
          </li>
        ))}
      </ul>

      <p className="mt-8 text-base leading-relaxed text-muted-foreground">
        Para muchas personas, estas reacciones se calman poco a poco. Para otras, no tanto. Si pasan
        varias semanas y sientes que no afloja, hablar con alguien preparado puede ayudar.
      </p>
    </PageShell>
  );
}
