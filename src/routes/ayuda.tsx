import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { Directory } from "@/components/Directory";

export const Route = createFileRoute("/ayuda")({
  head: () => ({
    meta: [
      { title: "Pedir ayuda — Serena" },
      {
        name: "description",
        content: "Directorio verificado de líneas de emergencia y salud mental en Venezuela.",
      },
    ],
  }),
  component: Ayuda,
});

function Ayuda() {
  return (
    <PageShell>
      <BackLink to="/" label="Inicio" />
      <h1 className="mt-2 font-serif text-3xl text-foreground">Pedir ayuda</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Toca un número para marcar. Pedir ayuda no es debilidad, es de las cosas más valientes que puedes hacer hoy.
      </p>
      <div className="mt-8">
        <Directory />
      </div>
    </PageShell>
  );
}
