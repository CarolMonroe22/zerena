import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { BasedOn } from "@/components/BasedOn";
import { PracticePlayer } from "@/components/PracticePlayer";
import { PRACTICES } from "@/lib/practices";

const TITLE = "Sonidos y meditaciones — Zerena";
const DESC =
  "Prácticas guiadas breves con voz calmada: respiración 4-2-6, volver al presente y descansar sin forzarte.";

export const Route = createFileRoute("/sonidos")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Sonidos,
});

function Sonidos() {
  return (
    <PageShell>
      <BackLink to="/" label="Inicio" />
      <h1 className="mt-2 font-serif text-3xl text-foreground">Sonidos y meditaciones</h1>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        Prácticas guiadas breves, con voz calmada. Puedes escucharlas o leerlas. No tienes que
        apurarte: si prefieres el silencio, cada práctica también está escrita.
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Usa audífonos si tienes. Si no hay sonido en tu entorno, la transcripción alcanza.
      </p>

      <div className="mt-8 space-y-4">
        {PRACTICES.map((p) => (
          <PracticePlayer key={p.id} practice={p} />
        ))}
      </div>

      <BasedOn source="PAP (OMS/OPS)" />
    </PageShell>
  );
}
