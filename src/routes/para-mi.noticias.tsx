import { createFileRoute, Link } from "@tanstack/react-router";
import { Wind } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { BasedOn } from "@/components/BasedOn";

export const Route = createFileRoute("/para-mi/noticias")({
  head: () => ({ meta: [{ title: "Si las noticias te hacen daño — Zerena" }] }),
  component: Noticias,
});

function Noticias() {
  const bullets = [
    "Eso que sientes —ansiedad, no poder soltar el teléfono— es real. A menudo es tu cuerpo intentando «hacer algo» cuando se siente impotente.",
    "Mirar menos no es no importarte. Es cuidarte para poder seguir.",
    "Si puedes: elige uno o dos momentos al día para informarte, en vez de revisar sin parar. Silencia notificaciones un rato.",
    "Después de leer, haz una pausa: respira, toma agua, mira algo cercano y tranquilo.",
    "Si al mirar te tiembla el cuerpo o se acelera el corazón, deja el teléfono y respira despacio.",
  ];
  return (
    <PageShell>
      <BackLink to="/para-mi" label="Para mí" />
      <h1 className="mt-2 font-serif text-3xl text-foreground">Si las noticias te hacen daño</h1>
      <p className="mt-5 text-base leading-relaxed text-foreground/85">
        Ver las noticias una y otra vez puede sentirse como estar haciendo algo, pero a veces solo te lastima más. Tu cuerpo se queda en alerta aunque no estés en peligro directo.
      </p>

      <ul className="mt-8 space-y-3">
        {bullets.map((t, i) => (
          <li key={i} className="serena-card p-5 text-base leading-relaxed text-foreground/85">
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Link
          to="/para-mi/respira"
          className="inline-flex items-center gap-2 rounded-full bg-sage-soft px-4 py-2 text-sm text-primary ring-1 ring-border hover:bg-secondary"
        >
          <Wind size={14} /> Respira conmigo
        </Link>
      </div>
          <BasedOn source="investigación sobre trauma vicario" />
    </PageShell>
  );
}
