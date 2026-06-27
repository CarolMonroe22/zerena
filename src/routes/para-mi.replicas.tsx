import { createFileRoute, Link } from "@tanstack/react-router";
import { Wind, ShieldAlert } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { BasedOn } from "@/components/BasedOn";
import { LineasButton } from "@/components/LineasButton";

export const Route = createFileRoute("/para-mi/replicas")({
  head: () => ({ meta: [{ title: "Cuando todo tiembla otra vez — Serena" }] }),
  component: Replicas,
});

function Replicas() {
  const bullets = [
    "Es normal que el corazón se dispare o que quieras salir corriendo. Respira despacio: el cuerpo se calma, aunque tome unos minutos.",
    "Tener lo básico a mano (agua, una linterna, los zapatos cerca) ayuda a la mente a sentirse un poco más en control.",
    "Si hay alguien contigo, hablen. El miedo se sostiene mejor acompañado.",
  ];
  return (
    <PageShell>
      <BackLink to="/para-mi" label="Para mí" />
      <h1 className="mt-2 font-serif text-3xl text-foreground">Cuando todo tiembla otra vez</h1>
      <p className="mt-5 text-base leading-relaxed text-foreground/85">
        Las réplicas asustan, y tu miedo tiene todo el sentido: tu cuerpo aprendió que el suelo puede moverse. No estás exagerando.
      </p>

      <div className="mt-6 rounded-2xl border p-5" style={{ borderColor: "var(--alert)", backgroundColor: "color-mix(in oklab, var(--alert) 8%, var(--surface))" }}>
        <div className="flex items-start gap-3">
          <ShieldAlert size={20} style={{ color: "var(--alert)" }} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-serif text-lg text-foreground">Si está temblando ahora</p>
            <p className="mt-2 text-base leading-relaxed text-foreground/85">
              Agáchate, cúbrete la cabeza y la nuca, y agárrate de algo firme. Aléjate de ventanas. Si ya estás afuera en un lugar abierto, quédate ahí.
            </p>
          </div>
        </div>
      </div>

      <h2 className="mt-8 mb-3 px-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Cuando pasa
      </h2>
      <ul className="space-y-3">
        {bullets.map((t, i) => (
          <li key={i} className="serena-card p-5 text-base leading-relaxed text-foreground/85">
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/para-mi/respira"
          className="inline-flex items-center gap-2 rounded-full bg-sage-soft px-4 py-2 text-sm text-primary ring-1 ring-border hover:bg-secondary"
        >
          <Wind size={14} /> Respira conmigo
        </Link>
        <LineasButton />
      </div>
          <BasedOn source="PAP y seguridad sísmica" />
    </PageShell>
  );
}
