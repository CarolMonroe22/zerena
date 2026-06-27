import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contáctanos — Serena" },
      {
        name: "description",
        content:
          "¿Tienes sugerencias, ideas o quieres colaborar con Serena? Escríbenos. Leemos todo, con calma.",
      },
    ],
  }),
  component: ContactoPage,
});

const schema = z.object({
  name: z.string().trim().max(200).optional(),
  contact: z
    .string()
    .trim()
    .min(1, "Déjanos un correo o WhatsApp para poder responderte.")
    .max(300),
  message: z
    .string()
    .trim()
    .min(1, "Cuéntanos tu idea o sugerencia.")
    .max(5000),
});

function ContactoPage() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse({ name, contact, message });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Revisa los datos, por favor.");
      return;
    }
    setStatus("sending");
    const { error: dbError } = await supabase.from("contact_messages").insert({
      name: parsed.data.name?.length ? parsed.data.name : null,
      contact: parsed.data.contact,
      message: parsed.data.message,
    });
    if (dbError) {
      setStatus("error");
      setError("No pudimos enviar tu mensaje ahora. Intenta de nuevo en un momento.");
      return;
    }
    setStatus("sent");
    setName("");
    setContact("");
    setMessage("");
  }

  if (status === "sent") {
    return (
      <PageShell>
        <BackLink to="/" label="Inicio" />
        <section className="serena-card mt-8 p-8 text-center">
          <h1 className="font-serif text-2xl text-foreground">Gracias</h1>
          <p className="mt-4 text-base leading-relaxed text-foreground/85">
            Recibimos tu mensaje y lo leemos.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-6 text-sm text-primary underline-offset-4 hover:underline"
          >
            Escribir otro mensaje
          </button>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <BackLink to="/" label="Inicio" />
      <header className="mt-6">
        <h1 className="font-serif text-3xl leading-tight text-foreground">
          ¿Tienes sugerencias, ideas o quieres colaborar?
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Escríbenos. Leemos todo, con calma.
        </p>
      </header>

      <form onSubmit={onSubmit} className="serena-card mt-8 space-y-5 p-6 sm:p-7">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground">
            Tu nombre <span className="text-muted-foreground">(opcional)</span>
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
          <label htmlFor="message" className="block text-sm font-medium text-foreground">
            Tu mensaje
          </label>
          <p className="mt-1 text-xs text-muted-foreground">
            Tu idea, sugerencia o cómo te gustaría colaborar.
          </p>
          <textarea
            id="message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={5000}
            rows={6}
            className="mt-2 w-full resize-y rounded-xl border border-border bg-card px-4 py-3 text-base leading-relaxed text-foreground outline-none focus:border-primary"
          />
        </div>

        {error && (
          <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <p className="text-xs leading-relaxed text-muted-foreground">
          Solo usamos esto para responderte. No lo compartimos con nadie.{" "}
          <Link to="/privacidad" className="text-primary underline-offset-4 hover:underline">
            Tu privacidad
          </Link>
          .
        </p>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-px disabled:opacity-60"
          >
            {status === "sending" ? "Enviando…" : "Enviar mensaje"}
          </button>
        </div>
      </form>
    </PageShell>
  );
}
