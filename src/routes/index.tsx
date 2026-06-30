import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, HandHeart, Users, LifeBuoy } from "lucide-react";
import { SerenaMark } from "@/components/SerenaMark";
import { PageShell } from "@/components/PageShell";
import { IconBubble } from "@/components/IconBubble";
import { InstallButton } from "@/components/InstallButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zerena — un espacio calmado" },
      {
        name: "description",
        content: "Primeros Auxilios Psicológicos. Anónimo, privado y disponible sin conexión.",
      },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  return (
    <PageShell>
      <section className="flex flex-col items-center pt-8 text-center sm:pt-14">
        <SerenaMark size={88} />
        <h1 className="mt-5 font-serif text-4xl text-foreground sm:text-5xl">Zerena</h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
          Un espacio calmado para los primeros momentos.<br />
          Respira. No tienes que apurarte.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <PathCard
          to="/para-mi"
          icon={<Heart size={18} />}
          title="Necesito calma para mí"
          desc="Respirar, sentirte acompañado y encontrar ayuda."
        />
        <PathCard
          to="/para-ayudar"
          icon={<HandHeart size={18} />}
          title="Quiero ayudar a alguien"
          desc="Acompañar a otra persona con cuidado."
        />
        <PathCard
          to="/ayuda"
          icon={<LifeBuoy size={18} />}
          title="Necesito apoyo profesional"
          desc="Déjanos tus datos y te conectamos con un profesional que te acompañe."
        />
        <PathCard
          to="/red"
          icon={<Users size={18} />}
          title="Red de apoyo"
          desc="Sumarte como voluntario, profesional u organización."
        />
      </section>

      <InstallButton />

      <section className="mt-10 rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
        <p>
          Zerena es un espacio de apoyo de primera instancia basado en los Primeros Auxilios
          Psicológicos (OMS/OPS). No es terapia, no diagnostica y no reemplaza la atención de un
          profesional ni los servicios de emergencia.
        </p>
        <p className="mt-2">
          Si tú o alguien corre peligro, llama al{" "}
          <a href="tel:911" className="font-medium text-alert underline-offset-4 hover:underline">
            911
          </a>
          .
        </p>
      </section>
    </PageShell>
  );
}

function PathCard({
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
