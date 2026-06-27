import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";

export const Route = createFileRoute("/para-mi/duelo")({
  head: () => ({ meta: [{ title: "Si perdiste a alguien — Serena" }] }),
  component: Duelo,
});

function Duelo() {
  return (
    <PageShell>
      <BackLink to="/para-mi" label="Para mí" />
      <h1 className="mt-2 font-serif text-3xl text-foreground">Si perdiste a alguien</h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        Lo siento mucho. No hay palabras que alcancen, y no es necesario que las haya.
      </p>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        El duelo no es una línea recta. Hay momentos de mucho dolor, otros de calma, y otros donde
        parece que nada se siente. Todo eso cabe. No tienes que estar de una forma específica.
      </p>

      <div className="mt-8 space-y-3">
        <div className="serena-card p-5">
          <p className="font-serif text-lg text-foreground">Cuídate hoy en pequeño</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Tomar agua. Respirar. Sentarte. No tienes que resolver nada todavía.
          </p>
        </div>
        <div className="serena-card p-5">
          <p className="font-serif text-lg text-foreground">Si puedes, no estés solo</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Acompañarte de alguien de confianza, aunque sea en silencio, alivia. Si no tienes a quién, hay líneas hechas para esto.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-sage-soft p-5">
        <p className="text-sm font-medium text-sage-deep">Una línea de duelo en Venezuela</p>
        <a
          href="tel:04242925604"
          className="mt-2 flex items-center justify-between rounded-xl bg-card px-4 py-3 text-foreground"
        >
          <span>Psicólogos sin Fronteras / Cesap</span>
          <span className="text-sm tabular-nums">0424-2925604</span>
        </a>
        <p className="mt-2 text-xs text-muted-foreground">Atienden duelo por WhatsApp.</p>
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Ir despacio también es honrar a quien ya no está.
      </p>
    </PageShell>
  );
}
