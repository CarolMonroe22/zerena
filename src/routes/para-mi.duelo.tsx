import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { BasedOn } from "@/components/BasedOn";
import { LineasButton } from "@/components/LineasButton";

export const Route = createFileRoute("/para-mi/duelo")({
  head: () => ({ meta: [{ title: "Si perdiste a alguien — Serena" }] }),
  component: Duelo,
});

function Duelo() {
  const bullets = [
    "El dolor no sigue un orden ni un calendario. Viene en olas: a ratos aprieta, a ratos suelta. Así es, y no significa que lo lleves mal.",
    "No tienes que ser fuerte para nadie ahora. Hablar de quien se fue, o quedarte en silencio: las dos están bien.",
    "Si puedes, no lo cargues solo. Apóyate en quien tengas cerca.",
    "Si el dolor te quita comer, dormir o seguir tu día, busca una línea de apoyo. No es exagerar.",
  ];
  return (
    <PageShell>
      <BackLink to="/para-mi" label="Para mí" />
      <h1 className="mt-2 font-serif text-3xl text-foreground">Si perdiste a alguien</h1>
      <p className="mt-5 text-base leading-relaxed text-foreground/85">
        Lo siento mucho. No hay palabras que alcancen, y no es necesario que las haya.
      </p>

      <ul className="mt-8 space-y-3">
        {bullets.map((t, i) => (
          <li key={i} className="serena-card p-5 text-base leading-relaxed text-foreground/85">
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-2xl border border-border bg-sage-soft p-5">
        <p className="text-sm font-medium text-sage-deep">Una línea de duelo en Venezuela</p>
        <a
          href="tel:+584242925604"
          className="mt-2 flex items-center justify-between rounded-xl bg-card px-4 py-3 text-foreground"
        >
          <span>Psicólogos sin Fronteras / Cesap</span>
          <span className="text-sm tabular-nums">0424-2925604</span>
        </a>
        <p className="mt-2 text-xs text-muted-foreground">Atienden duelo por WhatsApp.</p>
      </div>

      <div className="mt-6">
        <LineasButton />
      </div>
          <BasedOn source="PAP y duelo en emergencias" />
    </PageShell>
  );
}
