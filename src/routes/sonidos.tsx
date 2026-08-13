import { createFileRoute } from "@tanstack/react-router";
import { Headphones } from "lucide-react";
import { BackLink } from "@/components/BackLink";
import { PageShell } from "@/components/PageShell";
import { PracticePlayer } from "@/components/PracticePlayer";
import { PRACTICES } from "@/lib/practices";

export const Route = createFileRoute("/sonidos")({
  head: () => ({
    meta: [
      { title: "Sonidos y meditaciones — Zerena" },
      {
        name: "description",
        content:
          "Prácticas guiadas y transcripciones para respirar, volver al presente y descansar.",
      },
      { property: "og:title", content: "Sonidos y meditaciones — Zerena" },
      {
        property: "og:description",
        content: "Tres prácticas guiadas para acompañarte con calma, a tu ritmo.",
      },
    ],
  }),
  component: SoundsPage,
});

function SoundsPage() {
  return (
    <PageShell>
      <BackLink to="/" label="Inicio" />
      <div className="mt-3 flex items-center gap-3">
        <span className="icon-bubble" aria-hidden>
          <Headphones size={20} />
        </span>
        <div>
          <h1 className="font-serif text-3xl text-foreground">Sonidos y meditaciones</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Escucha o lee. Puedes parar cuando quieras.
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {PRACTICES.map((practice) => (
          <PracticePlayer key={practice.id} practice={practice} />
        ))}
      </div>

      <p className="mt-8 rounded-2xl border border-border bg-card p-4 text-center text-sm leading-relaxed text-muted-foreground">
        Estas prácticas acompañan, pero no reemplazan la atención profesional ni los servicios de
        emergencia.
      </p>
    </PageShell>
  );
}
