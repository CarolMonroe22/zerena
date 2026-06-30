import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { Directory } from "@/components/Directory";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/ayuda")({
  head: () => ({
    meta: [
      { title: "Apoyo psicológico profesional — Zerena" },
      {
        name: "description",
        content:
          "Solicita apoyo psicológico profesional. Te conectamos con un experto, en charlas grupales por Zoom o de forma individual según el caso.",
      },
    ],
  }),
  component: Ayuda,
});

type ForWhom = "mi" | "otra" | "albergue";

const OPTIONS: { value: ForWhom; label: string }[] = [
  { value: "mi", label: "Para mí" },
  { value: "otra", label: "Para otra persona" },
  { value: "albergue", label: "Para alguien de un albergue" },
];

const CASE_PLACEHOLDER: Record<ForWhom, string> = {
  mi: "¿Cómo te sientes? ¿Qué está pasando? Cuéntanos lo que necesites.",
  otra: "¿Quién es la persona? Edad, situación y qué le está pasando.",
  albergue: "¿Quién es la persona y en qué albergue está? Edad, situación y qué le pasa.",
};

type Profile = "general" | "nino" | "cuidador" | "mayor" | "discapacidad";
type Disability = "visual" | "auditiva" | "motora" | "cognitiva" | "otra";

const PROFILE_OPTIONS: { value: Profile; label: string }[] = [
  { value: "general", label: "Adulto" },
  { value: "nino", label: "Niño / adolescente" },
  { value: "cuidador", label: "Madre/padre cuidador/a" },
  { value: "mayor", label: "Adulto mayor" },
  { value: "discapacidad", label: "Persona con discapacidad" },
];

const DISABILITY_OPTIONS: { value: Disability; label: string }[] = [
  { value: "visual", label: "Visual" },
  { value: "auditiva", label: "Auditiva" },
  { value: "motora", label: "Motora" },
  { value: "cognitiva", label: "Cognitiva" },
  { value: "otra", label: "Otra" },
];

const schema = z.object({
  for_whom: z.enum(["mi", "otra", "albergue"], {
    errorMap: () => ({ message: "Elige para quién es el apoyo." }),
  }),
  profile: z
    .enum(["general", "nino", "cuidador", "mayor", "discapacidad"])
    .nullable(),
  disability_type: z
    .enum(["visual", "auditiva", "motora", "cognitiva", "otra"])
    .nullable(),
  case_details: z
    .string()
    .trim()
    .min(1, "Cuéntanos el caso para poder ayudarte.")
    .max(5000),
  name: z.string().trim().max(200).optional(),
  contact: z
    .string()
    .trim()
    .min(1, "Déjanos un correo o WhatsApp para contactarte.")
    .max(300),
});

function Ayuda() {
  const [forWhom, setForWhom] = useState<ForWhom | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [disability, setDisability] = useState<Disability | null>(null);
  const [caseDetails, setCaseDetails] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse({
      for_whom: forWhom ?? undefined,
      profile,
      disability_type: profile === "discapacidad" ? disability : null,
      case_details: caseDetails,
      name,
      contact,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Revisa los datos, por favor.");
      return;
    }
    setStatus("sending");
    const { error: dbError } = await supabase.from("support_requests").insert({
      for_whom: parsed.data.for_whom,
      profile: parsed.data.profile,
      disability_type: parsed.data.disability_type,
      case_details: parsed.data.case_details,
      name: parsed.data.name?.length ? parsed.data.name : null,
      contact: parsed.data.contact,
    });
    if (dbError) {
      setStatus("error");
      setError(
        "No pudimos enviar tu solicitud ahora. Intenta de nuevo en un momento.",
      );
      return;
    }
    setStatus("sent");
    setForWhom(null);
    setProfile(null);
    setDisability(null);
    setCaseDetails("");
    setName("");
    setContact("");
  }

  if (status === "sent") {
    return (
      <PageShell>
        <BackLink to="/" label="Inicio" />
        <section className="serena-card mt-8 p-8 text-center">
          <h1 className="font-serif text-2xl text-foreground">
            Recibimos tu solicitud
          </h1>
          <p className="mt-4 text-base leading-relaxed text-foreground/85">
            Gracias por confiar. Nos contactaremos contigo para conectarte con un
            profesional.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-6 text-sm text-primary underline-offset-4 hover:underline"
          >
            Enviar otra solicitud
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
          Apoyo psicológico profesional
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Estamos trabajando para conectarte con un profesional de la salud mental.
          Según el caso, puede ser en charlas grupales por Zoom o de forma
          individual. Déjanos tus datos y cuéntanos el caso, y nos contactaremos
          contigo.
        </p>
      </header>

      <form onSubmit={onSubmit} className="serena-card mt-8 space-y-6 p-6 sm:p-7">
        <fieldset>
          <legend className="text-sm font-medium text-foreground">
            ¿Para quién es el apoyo?
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {OPTIONS.map((opt) => {
              const selected = forWhom === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForWhom(opt.value)}
                  aria-pressed={selected}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                    selected
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary/60"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-medium text-foreground">
            ¿Quién es la persona?{" "}
            <span className="text-muted-foreground">(opcional)</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {PROFILE_OPTIONS.map((opt) => {
              const selected = profile === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setProfile(selected ? null : opt.value);
                    if (opt.value !== "discapacidad") setDisability(null);
                  }}
                  aria-pressed={selected}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    selected
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary/60"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {profile === "discapacidad" && (
            <div className="mt-4">
              <p className="text-sm font-medium text-foreground">
                Tipo de apoyo que necesita
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Para adaptar cómo y por qué canal la contactamos.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {DISABILITY_OPTIONS.map((opt) => {
                  const selected = disability === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setDisability(selected ? null : opt.value)}
                      aria-pressed={selected}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                        selected
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-card text-muted-foreground hover:border-primary/60"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </fieldset>

        <div>
          <label
            htmlFor="case"
            className="block text-sm font-medium text-foreground"
          >
            Cuéntanos el caso
          </label>
          <textarea
            id="case"
            required
            value={caseDetails}
            onChange={(e) => setCaseDetails(e.target.value)}
            maxLength={5000}
            rows={6}
            placeholder={forWhom ? CASE_PLACEHOLDER[forWhom] : CASE_PLACEHOLDER.mi}
            className="mt-2 w-full resize-y rounded-xl border border-border bg-card px-4 py-3 text-base leading-relaxed text-foreground outline-none focus:border-primary"
          />
        </div>

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
          <p className="mt-1 text-xs text-muted-foreground">Para poder contactarte.</p>
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

        {error && (
          <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <p className="text-xs leading-relaxed text-muted-foreground">
          Solo usamos esto para contactarte. No lo compartimos con nadie.{" "}
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
            {status === "sending" ? "Enviando…" : "Enviar solicitud"}
          </button>
        </div>
      </form>

      <section className="mt-10">
        <h2 className="font-serif text-xl text-foreground">
          ¿Es una emergencia ahora?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Si hay riesgo en este momento, no esperes. Toca un número para marcar.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          ¿Necesitas ayudar a alguien de inmediato?{" "}
          <Link to="/para-ayudar" className="text-primary underline-offset-4 hover:underline">
            Revisa nuestras guías
          </Link>
          .
        </p>
        <div className="mt-5">
          <Directory />
        </div>
      </section>
    </PageShell>
  );
}
