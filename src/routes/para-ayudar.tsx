import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";

export const Route = createFileRoute("/para-ayudar")({
  head: () => ({ meta: [{ title: "Quiero ayudar — Serena" }] }),
  component: () => (
    <PageShell>
      <BackLink to="/" label="Inicio" />
      <h1 className="mt-2 font-serif text-3xl text-foreground">Quiero ayudar a alguien</h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        Estamos preparando con cuidado el espacio para acompañantes: el entrenamiento para voluntarios y la guía
        rápida para cuando estás con alguien ahora.
      </p>
      <p className="mt-3 text-sm text-muted-foreground">
        Pronto vas a poder hacer el curso aquí mismo, paso a paso, y guardarlo a tu ritmo.
      </p>
    </PageShell>
  ),
});
