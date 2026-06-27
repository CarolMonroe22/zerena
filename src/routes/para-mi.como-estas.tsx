import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { BasedOn } from "@/components/BasedOn";

export const Route = createFileRoute("/para-mi/como-estas")({
  head: () => ({ meta: [{ title: "¿Cómo estás ahora? — Serena" }] }),
  component: ComoEstas,
});

type Step =
  | { kind: "q"; id: string; q: string; options: { label: string; weight: number; danger?: boolean }[] }
  | { kind: "result" };

const QUESTIONS: Step[] = [
  {
    kind: "q",
    id: "seguro",
    q: "Justo ahora, ¿estás en un lugar seguro?",
    options: [
      { label: "Sí, por ahora", weight: 0 },
      { label: "No estoy seguro", weight: 1 },
      { label: "No, estoy en peligro", weight: 99, danger: true },
    ],
  },
  {
    kind: "q",
    id: "cuerpo",
    q: "¿Cómo sientes el cuerpo?",
    options: [
      { label: "Tenso, pero puedo respirar", weight: 0 },
      { label: "Acelerado o tembloroso", weight: 1 },
      { label: "No siento nada, como lejos", weight: 2 },
    ],
  },
  {
    kind: "q",
    id: "pensamientos",
    q: "¿Cómo van los pensamientos?",
    options: [
      { label: "Difíciles, pero los puedo seguir", weight: 0 },
      { label: "Se me van, no logro pensar claro", weight: 1 },
      { label: "Tengo pensamientos de hacerme daño", weight: 99, danger: true },
    ],
  },
];

function ComoEstas() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [danger, setDanger] = useState(false);

  const done = step >= QUESTIONS.length;

  if (danger) {
    return (
      <PageShell>
        <BackLink to="/para-mi" label="Para mí" />
        <div className="mt-4 rounded-2xl border border-alert/30 bg-[oklch(0.97_0.025_28)] p-6">
          <h1 className="font-serif text-2xl text-alert">Quiero que estés a salvo</h1>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Lo que cuentas es serio y mereces ayuda humana ahora. No tienes que estar solo en esto.
          </p>
          <div className="mt-5 space-y-2">
            <a
              href="tel:911"
              className="flex items-center justify-between rounded-2xl bg-alert px-4 py-3 text-card"
            >
              <span className="font-medium">Llamar al 911</span>
              <span className="text-sm">24/7</span>
            </a>
            <a
              href="tel:04140179925"
              className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3 text-foreground"
            >
              <span className="font-medium">Médicos Sin Fronteras</span>
              <span className="text-sm tabular-nums">0414-0179925</span>
            </a>
            <Link
              to="/ayuda"
              className="block rounded-2xl border border-border bg-card px-4 py-3 text-center text-sm text-foreground"
            >
              Ver todo el directorio
            </Link>
          </div>
        </div>
      </PageShell>
    );
  }

  if (done) {
    const high = score >= 2;
    return (
      <PageShell>
        <BackLink to="/para-mi" label="Para mí" />
        <h1 className="mt-2 font-serif text-3xl text-foreground">Gracias por contarme</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {high
            ? "Lo que estás sintiendo es mucho. No tienes que sostenerlo solo. Hablar con alguien puede ayudar."
            : "Lo que sientes tiene sentido después de lo que pasó. Cuidarte ahora es un acto valiente."}
        </p>
        <div className="mt-6 space-y-2">
          {high && (
            <Link
              to="/ayuda"
              className="serena-card-peach flex items-center justify-between p-4 transition-colors"
            >
              <span className="font-medium text-foreground">Hablar con alguien ahora</span>
              <span className="text-sm text-muted-foreground">Directorio</span>
            </Link>
          )}
          <Link
            to="/para-mi/respira"
            className="serena-card flex items-center justify-between p-4 hover:bg-secondary"
          >
            <span className="text-foreground">Respira conmigo</span>
            <span className="text-sm text-muted-foreground">3 min</span>
          </Link>
          <Link
            to="/para-mi/presente"
            className="serena-card flex items-center justify-between p-4 hover:bg-secondary"
          >
            <span className="text-foreground">Volver al presente</span>
            <span className="text-sm text-muted-foreground">Anclas suaves</span>
          </Link>
        </div>
      </PageShell>
    );
  }

  const current = QUESTIONS[step] as Extract<Step, { kind: "q" }>;

  return (
    <PageShell>
      <BackLink to="/para-mi" label="Para mí" />
      <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
        Pregunta {step + 1} de {QUESTIONS.length}
      </p>
      <h1 className="mt-2 font-serif text-2xl text-foreground sm:text-3xl">{current.q}</h1>
      <div className="mt-6 space-y-2">
        {current.options.map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => {
              if (opt.danger) {
                setDanger(true);
                return;
              }
              setScore((s) => s + opt.weight);
              setStep((s) => s + 1);
            }}
            className="serena-card w-full p-4 text-left text-foreground transition-colors hover:bg-secondary"
          >
            {opt.label}
          </button>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-muted-foreground">
        Responde solo lo que quieras. Puedes salir cuando necesites.
      </p>
          <BasedOn source="PAP (OMS/OPS)" />
    </PageShell>
  );
}
