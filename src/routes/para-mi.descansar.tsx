import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";

export const Route = createFileRoute("/para-mi/descansar")({
  head: () => ({ meta: [{ title: "Para descansar esta noche — Serena" }] }),
  component: Descansar,
});

function Descansar() {
  return (
    <PageShell>
      <BackLink to="/para-mi" label="Para mí" />
      <h1 className="mt-2 font-serif text-3xl text-foreground">Para descansar esta noche</h1>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        No tienes que dormir. Solo descansar. Si el sueño llega, llega.
      </p>

      <ol className="mt-8 space-y-4">
        <Step n={1} title="Baja la luz si puedes">
          Una luz suave, o cerrar los ojos un rato. El cuerpo entiende que es momento de aflojar.
        </Step>
        <Step n={2} title="Encuentra una postura cómoda">
          Sentado o acostado, como esté tu cuerpo más sostenido. Una manta encima ayuda si tienes.
        </Step>
        <Step n={3} title="Respira más largo al exhalar">
          Inhala normal, exhala despacio. No fuerces. La exhalación larga le dice al cuerpo: estás a salvo por ahora.
        </Step>
        <Step n={4} title="Si la mente vuelve a lo que pasó">
          No la pelees. Solo nota que está pensando y vuelve a la respiración. Una y otra vez. Eso también es descansar.
        </Step>
      </ol>

      <p className="mt-8 rounded-2xl border border-border bg-card p-4 text-center text-sm text-muted-foreground">
        Si llevas varias noches sin poder dormir, contar con alguien puede ayudar. Tienes el directorio a una mano de distancia.
      </p>
    </PageShell>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="serena-card flex gap-4 p-5">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sage-soft font-serif text-sm text-sage-deep">
        {n}
      </span>
      <div>
        <p className="font-serif text-lg text-foreground">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{children}</p>
      </div>
    </li>
  );
}
