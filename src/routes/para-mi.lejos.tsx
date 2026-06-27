import { createFileRoute, Link } from "@tanstack/react-router";
import { Wind, Users } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";

export const Route = createFileRoute("/para-mi/lejos")({
  head: () => ({ meta: [{ title: "Si estás lejos — Serena" }] }),
  component: Lejos,
});

function Lejos() {
  const bullets = [
    "Revisar el teléfono sin parar es tu sistema nervioso tratando de hacer algo. Es humano, y también te agota.",
    "No estás solo en esto: busca a otros que entienden sin que tengas que explicar. Compartirlo con quien lo vive alivia.",
    "Convierte la impotencia en algo a tu ritmo: ayudar, difundir, acompañar a distancia. Pero con pausa; quemarte no ayuda a nadie.",
    "Si la oración o los rituales de tu cultura te sostienen, apóyate en ellos.",
    "Cuidar tu día a día no es traicionar a quien quieres.",
  ];
  return (
    <PageShell>
      <BackLink to="/para-mi" label="Para mí" />
      <h1 className="mt-2 font-serif text-3xl text-foreground">Si estás lejos</h1>
      <p className="mt-5 text-base leading-relaxed text-foreground/85">
        Estar lejos mientras tu gente sufre tiene su propio dolor: la impotencia, la culpa de estar a salvo, las ganas de hacer algo y no poder. No estás exagerando.
      </p>

      <ul className="mt-8 space-y-3">
        {bullets.map((t, i) => (
          <li key={i} className="serena-card p-5 text-base leading-relaxed text-foreground/85">
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/para-ayudar/a-distancia"
          className="inline-flex items-center gap-2 rounded-full bg-sage-soft px-4 py-2 text-sm text-primary ring-1 ring-border hover:bg-secondary"
        >
          <Users size={14} /> Acompañar a distancia
        </Link>
        <Link
          to="/para-mi/respira"
          className="inline-flex items-center gap-2 rounded-full bg-sage-soft px-4 py-2 text-sm text-primary ring-1 ring-border hover:bg-secondary"
        >
          <Wind size={14} /> Respira conmigo
        </Link>
      </div>
    </PageShell>
  );
}
