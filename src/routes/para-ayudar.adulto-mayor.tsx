import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { LineasButton } from "@/components/LineasButton";
import { BasedOn } from "@/components/BasedOn";

export const Route = createFileRoute("/para-ayudar/adulto-mayor")({
  head: () => ({ meta: [{ title: "Acompañar a un adulto mayor — Serena" }] }),
  component: AdultoMayor,
});

const PUNTOS = [
  "Háblale claro y sin prisa, de frente: quizá oiga o vea menos.",
  "Respeta su autonomía. No lo trates como incapaz ni decidas por él.",
  "Pregunta por lo que pudo perder y necesita: medicinas, lentes, bastón, audífonos.",
  "Ayúdale a reconectar con su familia y su rutina; el aislamiento les pega fuerte.",
  "Si está confundido, sin sus medicinas o solo, conéctalo con ayuda médica.",
];

function AdultoMayor() {
  return (
    <PageShell>
      <BackLink to="/para-ayudar/ahora" label="Estoy con alguien" />
      <h1 className="mt-2 font-serif text-3xl text-foreground">Acompañar a un adulto mayor</h1>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        Pueden estar más frágiles o desorientados, y a veces restan importancia a lo que sienten
        («no es nada»). Eso no significa que no necesiten apoyo.
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
      <BasedOn source="PAP (OMS/OPS)" />
    </PageShell>
  );
}
