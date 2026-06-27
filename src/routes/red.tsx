import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";

export const Route = createFileRoute("/red")({
  head: () => ({ meta: [{ title: "Red de apoyo — Serena" }] }),
  component: () => (
    <PageShell>
      <BackLink to="/" label="Inicio" />
      <h1 className="mt-2 font-serif text-3xl text-foreground">Red de apoyo</h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        Esta red se está activando. Pronto vas a poder sumarte como voluntario, profesional u organización, o pedir una sesión cuando haya alguien disponible.
      </p>
      <p className="mt-3 text-sm text-muted-foreground">
        Mientras tanto, si necesitas hablar con alguien hoy, el directorio tiene líneas verificadas que atienden ahora.
      </p>
    </PageShell>
  ),
});
