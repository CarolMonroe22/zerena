import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, HandHeart } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { IconBubble } from "@/components/IconBubble";

export const Route = createFileRoute("/para-ayudar/")({
  head: () => ({
    meta: [
      { title: "Acompañar a alguien — Zerena" },
      {
        name: "description",
        content: "Guía calmada para acompañar a otra persona tras un evento difícil.",
      },
    ],
  }),
  component: ParaAyudar,
});

function ParaAyudar() {
  return (
    <PageShell>
      <BackLink to="/" label="Inicio" />
      <h1 className="mt-2 font-serif text-3xl text-foreground sm:text-4xl">
        Acompañar a alguien
      </h1>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        Tu calma cuida. Aquí tienes dos caminos: tener a mano lo necesario cuando ya estás con
        alguien, o aprender con tiempo.
      </p>

      <div className="mt-8 space-y-3">
        <Link
          to="/para-ayudar/ahora"
          className="serena-card-peach flex items-center gap-4 p-5 transition-transform hover:-translate-y-px"
        >
          <IconBubble tone="peach">
            <HandHeart size={18} />
          </IconBubble>
          <div className="min-w-0 flex-1">
            <p className="font-serif text-lg text-foreground">Estoy con alguien ahora</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Panel rápido para este momento.
            </p>
          </div>
        </Link>

        <Link
          to="/para-ayudar/entrenamiento"
          className="serena-card flex items-center gap-4 p-5 transition-colors hover:bg-secondary"
        >
          <IconBubble>
            <GraduationCap size={18} />
          </IconBubble>
          <div className="min-w-0 flex-1">
            <p className="font-serif text-lg text-foreground">Entrenamiento para voluntarios</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Curso breve, a tu ritmo. Se guarda en tu teléfono.
            </p>
          </div>
        </Link>
      </div>

      <p className="mt-10 rounded-2xl border border-border bg-card p-5 text-xs leading-relaxed text-muted-foreground">
        Contrastada con OMS/OPS, Cruz Roja (IFRC), NCTSN y Save the Children. No reemplaza a un
        profesional.
      </p>
    </PageShell>
  );
}
