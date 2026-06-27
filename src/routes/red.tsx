import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { HeartHandshake, Stethoscope, Building2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { IconBubble } from "@/components/IconBubble";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/red")({
  head: () => ({
    meta: [
      { title: "Red de apoyo — Serena" },
      {
        name: "description",
        content:
          "Súmate a la red de Serena como voluntario, profesional de la salud mental u organización.",
      },
    ],
  }),
  component: RedPage,
});

type Role = "voluntario" | "profesional" | "organizacion";

const ROLES: { value: Role; icon: React.ReactNode; title: string; desc: string }[] = [
  {
    value: "voluntario",
    icon: <HeartHandshake size={18} />,
    title: "Quiero ser voluntario",
    desc: "Acompañar a quien lo necesita, con calma.",
  },
  {
    value: "profesional",
    icon: <Stethoscope size={18} />,
    title: "Soy profesional de la salud mental",
    desc: "Psicólogo, psiquiatra u otra área clínica.",
  },
  {
    value: "organizacion",
    icon: <Building2 size={18} />,
    title: "Represento una organización",
    desc: "Una ONG, colectivo o institución que quiere sumar.",
  },
];

const DETAILS_HINT: Record<Role, string> = {
  voluntario: "Cuéntanos cómo te gustaría ayudar y desde dónde escribes. (opcional)",
  profesional: "Tu especialidad y número de credencial, para poder verificarla. (opcional)",
  organizacion: "El nombre de la organización y cómo quieren colaborar. (opcional)",
};

const schema = z.object({
  role: z.enum(["voluntario", "profesional", "organizacion"]),
  name: z.string().trim().max(200).optional(),
  contact: z
    .string()
    .trim()
    .min(1, "Déjanos un correo o WhatsApp para poder responderte.")
    .max(300),
  details: z.string().trim().max(5000).optional(),
});

function RedPage() {
  const [role, setRole] = useState<Role | null>(null);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse({ role, name, contact, details });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Revisa los datos, por favor.");
      return;
    }
    setStatus("sending");
    const { error: dbError } = await supabase.from("network_signups").insert({
      role: parsed.data.role,
      name: parsed.data.name?.length ? parsed.data.name : null,
      contact: parsed.data.contact,
      details: parsed.data.details?.length ? parsed.data.details : null,
    });
    if (dbError) {
      setStatus("error");
      setError("No pudimos guardar tus datos ahora. Intenta de nuevo en un momento.");
      return;
    }
    setStatus("sent");
    setName("");
    setContact("");
    setDetails("");
    setRole(null);
  }

  if (status === "sent") {
    return (
      <PageShell>
        <BackLink to="/" label="Inicio" />
        <section className="serena-card mt-8 p-8 text-center">
          <h1 className="font-serif text-2xl text-foreground">Gracias por sumarte</h1>
          <p className="mt-4 text-base leading-relaxed text-foreground/85">
            Tenemos tus datos. Te escribimos para conocernos y dar el siguiente paso juntos.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-6 text-sm text-primary underline-offset-4 hover:underline"
          >
            Registrar a alguien más
          </button>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <BackLink to="/" label="Inicio" />
      <header className="mt-6">
        <h1 className="font-serif text-3xl leading-tight text-foreground">Súmate a la red</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Esta red la sostienen personas como tú. Déjanos tus datos y nos ponemos en contacto.
        </p>
      </header>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <fieldset>
          <legend className="text-sm font-medium text-foreground">¿Cómo quieres sumarte?</legend>
          <div className="mt-3 space-y-3">
            {ROLES.map((r) => {
              const active = role === r.value;
              return (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  aria-pressed={active}
                  className={`serena-card flex w-full items-center gap-4 p-5 text-left transition-colors ${
                    active ? "border-primary bg-secondary" : "hover:bg-secondary"
                  }`}
                >
                  <IconBubble tone={active ? "peach" : "sage"}>{r.icon}</IconBubble>
                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-lg text-foreground">{r.title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{r.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </fieldset>

        {role && (
          <div className="serena-card space-y-5 p-6 sm:p-7">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground">
                {role === "organizacion" ? "Nombre y tu rol" : "Tu nombre"}{" "}
                <span className="text-muted-foreground">(opcional)</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={200}
                className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-base text-foreground outline-none focus:border-primary"
                autoComplete="name"
              />
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-foreground">
                Correo o WhatsApp
              </label>
              <p className="mt-1 text-xs text-muted-foreground">Para poder responderte.</p>
              <input
                id="contact"
                type="text"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                maxLength={300}
                className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-base text-foreground outline-none focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="details" className="block text-sm font-medium text-foreground">
                Algo más que quieras contarnos
              </label>
              <p className="mt-1 text-xs text-muted-foreground">{DETAILS_HINT[role]}</p>
              <textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                maxLength={5000}
                rows={4}
                className="mt-2 w-full resize-y rounded-xl border border-border bg-card px-4 py-3 text-base leading-relaxed text-foreground outline-none focus:border-primary"
              />
            </div>

            {error && (
              <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </p>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-px disabled:opacity-60"
              >
                {status === "sending" ? "Enviando…" : "Sumarme a la red"}
              </button>
            </div>
          </div>
        )}

        {error && !role && (
          <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
            Elige cómo quieres sumarte para continuar.
          </p>
        )}
      </form>

      <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
        ¿Tienes ideas o sugerencias, sin sumarte aún?{" "}
        <Link to="/contacto" className="text-primary underline-offset-4 hover:underline">
          Escríbenos aquí
        </Link>
        .
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Si necesitas hablar con alguien hoy, el{" "}
        <Link to="/ayuda" className="text-primary underline-offset-4 hover:underline">
          directorio
        </Link>{" "}
        tiene líneas verificadas que atienden ahora.
      </p>
    </PageShell>
  );
}
