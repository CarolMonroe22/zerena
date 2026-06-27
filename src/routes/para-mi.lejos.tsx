import { createFileRoute, Link } from "@tanstack/react-router";
import { Wind, Users, ExternalLink } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { BasedOn } from "@/components/BasedOn";

export const Route = createFileRoute("/para-mi/lejos")({
  head: () => ({ meta: [{ title: "Si estás lejos — Zerena" }] }),
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

      <div className="mt-10 rounded-2xl border border-border bg-sage-soft/60 p-5">
        <p className="text-sm font-medium text-sage-deep">Si estás en Argentina</p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/85">
          La Asociación Argentina de Salud Mental (AASM) ofrece un espacio gratuito y
          confidencial de escucha para venezolanos residentes en Argentina. Te contactan
          profesionales.
        </p>
        <a
          href="https://www.aasm.org.ar"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm text-foreground ring-1 ring-border hover:bg-secondary"
        >
          <ExternalLink size={14} /> Ingresar en aasm.org.ar
        </a>
      </div>

      <p className="mt-6 px-2 text-center text-xs leading-relaxed text-muted-foreground">
        Si llamas a Venezuela desde el exterior, marca con <span className="tabular-nums">+58</span>.
        Algunas operadoras ofrecen llamadas gratis a Venezuela en estos días: revisa la tuya.
      </p>
          <BasedOn source="salud mental de la diáspora" />
    </PageShell>
  );
}
