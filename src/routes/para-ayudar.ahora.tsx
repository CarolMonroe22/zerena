import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MessageCircle,
  Wind,
  LifeBuoy,
  Baby,
  UserRound,
  Phone,
  Globe,
  Clock,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { IconBubble } from "@/components/IconBubble";

export const Route = createFileRoute("/para-ayudar/ahora")({
  head: () => ({ meta: [{ title: "Estoy con alguien — Zerena" }] }),
  component: Ahora,
});

function Ahora() {
  return (
    <PageShell>
      <BackLink to="/para-ayudar" label="Acompañar" />

      <div className="mt-3 rounded-2xl border border-border bg-sage-soft/60 p-5">
        <p className="font-serif text-lg leading-snug text-foreground">
          Escucha. No presiones. No prometes.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">Lo estás haciendo bien.</p>
      </div>

      <h2 className="mt-8 mb-3 px-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Ahora mismo
      </h2>
      <div className="grid gap-3 sm:grid-cols-3">
        <QuickCard to="/para-ayudar/que-decir" icon={<MessageCircle size={18} />} title="Qué decir" />
        <QuickCard to="/para-ayudar/panico" icon={<Wind size={18} />} title="Está en pánico" />
        <QuickCard to="/ayuda" icon={<LifeBuoy size={18} />} title="Pedir ayuda" tone="peach" />
      </div>

      <h2 className="mt-10 mb-3 px-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Según quién sea
      </h2>
      <div className="space-y-3">
        <WideCard to="/para-ayudar/nino" icon={<Baby size={18} />} title="Es un niño" desc="Por edad, qué ayuda y qué decirle." />
        <WideCard to="/para-ayudar/adulto-mayor" icon={<UserRound size={18} />} title="Es un adulto mayor" desc="Frágil o reservado. Necesita apoyo igual." />
        <WideCard to="/para-ayudar/a-distancia" icon={<Phone size={18} />} title="Lo acompaño a distancia" desc="Por teléfono o mensaje, sin ver la escena." />
        <WideCard to="/para-ayudar/exterior" icon={<Globe size={18} />} title="Estás en el exterior" desc="Desde otro país, con la distancia a cuestas." />
        <WideCard to="/para-ayudar/no-mejora" icon={<Clock size={18} />} title="No mejora con el tiempo" desc="Cuándo y cómo derivar." />
      </div>

      <p className="mt-10 rounded-2xl border border-alert/30 bg-[oklch(0.97_0.025_28)] p-5 text-sm leading-relaxed text-foreground">
        Si hay riesgo de vida o de hacerse daño, llama ahora al{" "}
        <a href="tel:911" className="font-medium text-alert underline-offset-4 hover:underline">
          911
        </a>
        .
      </p>
    </PageShell>
  );
}

function QuickCard({
  to,
  icon,
  title,
  tone,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  tone?: "peach";
}) {
  const cls =
    tone === "peach"
      ? "serena-card-peach"
      : "serena-card hover:bg-secondary";
  return (
    <Link
      to={to}
      className={`${cls} flex flex-col items-start gap-3 p-5 transition-colors`}
    >
      <IconBubble tone={tone === "peach" ? "peach" : "sage"}>{icon}</IconBubble>
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
