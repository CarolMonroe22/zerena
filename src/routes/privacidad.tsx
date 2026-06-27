import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, Smartphone, EyeOff, Server, Trash2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { IconBubble } from "@/components/IconBubble";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Tu privacidad — Zerena" },
      {
        name: "description",
        content:
          "Zerena es anónima. Tu diario se queda en tu teléfono. No rastreamos, no hay publicidad y no compartimos tus datos.",
      },
    ],
  }),
  component: Privacidad,
});

const PUNTOS = [
  {
    icon: <EyeOff size={18} />,
    title: "Es anónima",
    body: "No te pide nombre, correo ni cuenta para usarla. Puedes entrar y salir sin dejar rastro de quién eres.",
  },
  {
    icon: <Smartphone size={18} />,
    title: "Tu diario se queda en tu teléfono",
    body: "Lo que escribes en el diario privado se guarda solo en tu dispositivo. No se sube a internet y nosotros no podemos verlo.",
  },
  {
    icon: <EyeOff size={18} />,
    title: "Sin rastreo ni publicidad",
    body: "No usamos rastreadores, no mostramos anuncios y no vendemos ni compartimos información con nadie.",
  },
  {
    icon: <Server size={18} />,
    title: "Solo se guarda lo que tú envías",
    body: "Lo único que llega a un servidor es lo que tú decides escribir en un formulario (contacto o red de apoyo), y solo para poder responderte. Nadie más puede leerlo.",
  },
];

function Privacidad() {
  return (
    <PageShell>
      <BackLink to="/" label="Inicio" />
      <header className="mt-6 flex flex-col items-center text-center">
        <IconBubble>
          <Lock size={18} />
        </IconBubble>
        <h1 className="mt-4 font-serif text-3xl text-foreground">Tu privacidad</h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
          Zerena está pensada para que estés tranquilo. Esto es lo que cuidamos:
        </p>
      </header>

      <ul className="mt-8 space-y-3">
        {PUNTOS.map((p) => (
          <li key={p.title} className="serena-card flex items-start gap-4 p-5">
            <IconBubble>{p.icon}</IconBubble>
            <div className="min-w-0 flex-1">
              <p className="font-serif text-lg text-foreground">{p.title}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          </li>
        ))}
      </ul>

      <section className="mt-8 rounded-2xl border border-border bg-card p-5">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Seguimos principios de protección de datos: pedimos lo mínimo, guardamos lo mínimo y no lo
          compartimos. Nos guiamos por marcos reconocidos de privacidad, como el GDPR europeo.
        </p>
      </section>

      <div className="mt-4 flex items-start gap-4 rounded-2xl border border-border bg-sage-soft/60 p-5">
        <IconBubble>
          <Trash2 size={18} />
        </IconBubble>
        <div className="min-w-0 flex-1">
          <p className="font-serif text-base text-foreground">Puedes pedir que borremos tus datos</p>
          <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
            Si nos enviaste algo por un formulario y quieres que lo borremos,{" "}
            <Link to="/contacto" className="text-primary underline-offset-4 hover:underline">
              escríbenos
            </Link>{" "}
            y lo hacemos.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
