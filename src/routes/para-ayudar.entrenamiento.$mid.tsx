import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { BasedOn } from "@/components/BasedOn";
import { LineasButton } from "@/components/LineasButton";
import { getModule, markCompleted, TRAINING } from "@/lib/training";

export const Route = createFileRoute("/para-ayudar/entrenamiento/$mid")({
  head: ({ params }) => {
    const m = getModule(params.mid);
    return { meta: [{ title: m ? `${m.title} — Zerena` : "Módulo — Zerena" }] };
  },
  component: ModuleStepper,
});

function ModuleStepper() {
  const { mid } = Route.useParams();
  const navigate = useNavigate();
  const mod = getModule(mid);
  const [i, setI] = useState(0);

  if (!mod) {
    return (
      <PageShell>
        <BackLink to="/para-ayudar/entrenamiento" label="Entrenamiento" />
        <p className="mt-6 text-muted-foreground">No encontramos este módulo.</p>
      </PageShell>
    );
  }

  const m = mod;
  const step = m.steps[i];
  const isLast = i === m.steps.length - 1;
  const nextIdx = TRAINING.findIndex((x) => x.id === m.id) + 1;
  const nextModule = TRAINING[nextIdx];

  const finish = () => {
    markCompleted(m.id);
    navigate({ to: "/para-ayudar/entrenamiento" });
  };

  return (
    <PageShell>
      <BackLink to="/para-ayudar/entrenamiento" label="Entrenamiento" />
      <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
        Módulo {m.n} · {m.title}
      </p>
      {m.intro && i === 0 && (
        <p className="mt-1.5 text-xs italic text-muted-foreground">{m.intro}</p>
      )}

      <div className="mt-3 flex items-center gap-1.5">
        {m.steps.map((_, idx) => (
          <span
            key={idx}
            className={`h-1 flex-1 rounded-full ${
              idx <= i ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>

      <article className="serena-card mt-6 p-6 sm:p-7">
        <h1 className="font-serif text-2xl text-foreground">{step.heading}</h1>
        {step.body && (
          <p className="mt-4 text-base leading-relaxed text-foreground/85">{step.body}</p>
        )}
        {step.bullets && (
          <ul className="mt-4 space-y-2.5">
            {step.bullets.map((b, k) => (
              <li key={k} className="flex gap-3 text-base leading-relaxed text-foreground/85">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                <span>
                  {b.label && <strong className="font-medium">{b.label}: </strong>}
                  {b.text}
                </span>
              </li>
            ))}
          </ul>
        )}
        {step.example && (
          <div className="mt-4 rounded-xl border-l-2 border-primary/40 bg-sage-soft/40 px-4 py-3">
            <p className="text-sm uppercase tracking-wider text-primary/70">Por ejemplo</p>
            <p className="mt-1 text-base italic leading-relaxed text-foreground/85">{step.example}</p>
          </div>
        )}
        {step.cta === "lineas" && (
          <div className="mt-6">
            <LineasButton />
          </div>
        )}
      </article>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setI((v) => Math.max(0, v - 1))}
          disabled={i === 0}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-40"
        >
          <ChevronLeft size={14} />
          Atrás
        </button>
        {isLast ? (
          <button
            type="button"
            onClick={finish}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:-translate-y-px transition-transform"
          >
            <Check size={14} />
            Marcar como completado
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setI((v) => Math.min(m.steps.length - 1, v + 1))}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:-translate-y-px transition-transform"
          >
            Siguiente
            <ChevronRight size={14} />
          </button>
        )}
      </div>

      {isLast && nextModule && (
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Después sigue:{" "}
          <Link
            to="/para-ayudar/entrenamiento/$mid"
            params={{ mid: nextModule.id }}
            className="text-primary hover:underline"
          >
            Módulo {nextModule.n} · {nextModule.title}
          </Link>
        </p>
      )}
          <BasedOn source={m.source} />
    </PageShell>
  );
}
