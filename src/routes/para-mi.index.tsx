import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Wind,
  Anchor,
  Activity,
  LifeBuoy,
  Moon,
  HeartCrack,
  Sparkles,
  BookOpen,
  Clock,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { LightOfTheDay } from "@/components/LightOfTheDay";
import { IconBubble } from "@/components/IconBubble";

export const Route = createFileRoute("/para-mi/")({
  head: () => ({
    meta: [
      { title: "Para mí — Serena" },
      { name: "description", content: "Respira, vuelve al presente y encuentra ayuda." },
    ],
  }),
  component: ParaMiHome,
});

function ParaMiHome() {
  return (
    <PageShell>
      <LightOfTheDay />

      <SectionTitle>Para este momento</SectionTitle>
      <div className="grid gap-3 sm:grid-cols-3">
        <SmallCard to="/para-mi/respira" icon={<Wind size={18} />} title="Respira conmigo" />
        <SmallCard to="/para-mi/presente" icon={<Anchor size={18} />} title="Volver al presente" />
        <SmallCard to="/para-mi/como-estas" icon={<Activity size={18} />} title="¿Cómo estás ahora?" />
      </div>
      <Link
        to="/ayuda"
        className="serena-card-peach mt-3 flex items-center gap-4 p-5 transition-transform hover:-translate-y-px"
      >
        <IconBubble tone="peach">
          <LifeBuoy size={18} />
        </IconBubble>
        <div className="min-w-0">
          <p className="font-serif text-lg">Pedir ayuda ahora</p>
          <p className="text-sm text-muted-foreground">Líneas verificadas. Marcan al tocar.</p>
        </div>
      </Link>

      <SectionTitle>Para momentos difíciles</SectionTitle>
      <div className="space-y-3">
        <WideCard to="/para-mi/descansar" icon={<Moon size={18} />} title="Para descansar esta noche" desc="Cuando el cuerpo no quiere parar." />
        <WideCard to="/para-mi/duelo" icon={<HeartCrack size={18} />} title="Si perdiste a alguien" desc="Un espacio para el duelo, a tu ritmo." />
        <PendingCard title="No he encontrado a alguien" />
        <PendingCard title="Si lo perdiste todo" />
        <PendingCard title="Si las noticias te hacen daño" />
        <PendingCard title="Si estás lejos de los tuyos" />
      </div>

      <SectionTitle>Cuando ya pasó lo peor</SectionTitle>
      <div className="space-y-3">
        <WideCard
          to="/para-mi/normal"
          icon={<Sparkles size={18} />}
          title="Esto que sientes es normal"
          desc="Lo que el cuerpo y la mente hacen después."
        />
        <WideCard
          to="/para-mi/diario"
          icon={<BookOpen size={18} />}
          title="Diario privado"
          desc="Se guarda solo en tu teléfono."
        />
      </div>
    </PageShell>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 mb-4 px-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
      {children}
    </h2>
  );
}

function SmallCard({
  to,
  icon,
  title,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <Link
      to={to}
      className="serena-card flex flex-col items-start gap-3 p-5 transition-colors hover:bg-secondary"
    >
      <IconBubble>{icon}</IconBubble>
      <p className="font-serif text-base leading-snug text-foreground">{title}</p>
    </Link>
  );
}

function WideCard({
  to,
  icon,
  title,
  desc,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Link
      to={to}
      className="serena-card flex items-center gap-4 p-5 transition-colors hover:bg-secondary"
    >
      <IconBubble>{icon}</IconBubble>
      <div className="min-w-0 flex-1">
        <p className="font-serif text-lg text-foreground">{title}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{desc}</p>
      </div>
    </Link>
  );
}

function PendingCard({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-dashed border-border bg-card/60 p-5">
      <IconBubble>
        <Clock size={18} />
      </IconBubble>
      <div className="min-w-0 flex-1">
        <p className="font-serif text-base text-foreground">{title}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Estamos preparando este espacio con cuidado.
        </p>
      </div>
    </div>
  );
}
