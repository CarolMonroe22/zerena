import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Circle } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { TRAINING, readCompleted } from "@/lib/training";

export const Route = createFileRoute("/para-ayudar/entrenamiento/")({
  head: () => ({ meta: [{ title: "Entrenamiento — Serena" }] }),
  component: Entrenamiento,
});

function Entrenamiento() {
  const [done, setDone] = useState<string[]>([]);
  useEffect(() => setDone(readCompleted()), []);
  const total = TRAINING.length;
  const completed = done.length;
  const pct = Math.round((completed / total) * 100);

  return (
    <PageShell>
      <BackLink to="/para-ayudar" label="Acompañar" />
      <h1 className="mt-2 font-serif text-3xl text-foreground">Entrenamiento</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Módulos breves. Puedes salir y volver cuando quieras; tu avance queda en este teléfono.
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {completed} de {total} completados
          </span>
          <span className="tabular-nums text-muted-foreground">{pct}%</span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <ul className="mt-6 space-y-2.5">
        {TRAINING.map((m) => {
          const isDone = done.includes(m.id);
          return (
            <li key={m.id}>
              <Link
                to="/para-ayudar/entrenamiento/$mid"
                params={{ mid: m.id }}
                className="serena-card flex items-center gap-4 p-4 transition-colors hover:bg-secondary"
              >
                <div
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${
                    isDone
                      ? "bg-primary text-primary-foreground"
                      : "bg-sage-soft text-primary"
                  }`}
                >
                  {isDone ? <Check size={16} /> : <Circle size={14} />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Módulo {m.n}
                  </p>
                  <p className="font-serif text-base text-foreground">{m.title}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </PageShell>
  );
}
