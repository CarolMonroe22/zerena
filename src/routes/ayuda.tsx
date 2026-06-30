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
type ProfileType = "adulto" | "nino_adolescente" | "cuidador" | "adulto_mayor" | "discapacidad";
type DisabilityType = "visual" | "auditiva" | "motora" | "cognitiva" | "otra";

const FOR_WHOM_OPTIONS: { value: ForWhom; label: string }[] = [
  { value: "mi", label: "Para mí" },
  { value: "otra", label: "Para otra persona" },
  { value: "albergue", label: "Para alguien de un albergue" },
];

const PROFILE_OPTIONS: { value: ProfileType; label: string }[] = [
  { value: "adulto", label: "Adulto" },
  { value: "nino_adolescente", label: "Niño o adolescente" },
  { value: "cuidador", label: "Cuidador / a cargo de otros" },
  { value: "adulto_mayor", label: "Adulto mayor" },
  { value: "discapacidad", label: "Persona con discapacidad" },
];

const DISABILITY_OPTIONS: { value: DisabilityType; label: string }[] = [
  { value: "visual", label: "Visual" },
  { value: "auditiva", label: "Auditiva" },
  { value: "motora", label: "Motora / física" },
  { value: "cognitiva", label: "Cognitiva" },
  { value: "otra", label: "Otra" },
];

const CASE_PLACEHOLDER: Record<ForWhom, string> = {
  mi: "¿Cómo te sientes? ¿Qué está pasando? Cuéntanos lo que necesites.",
  otra: "¿Quién es la persona? Edad, situación y qué le está pasando.",
  albergue: "¿Quién es la persona y en qué albergue está? Edad, situación y qué le pasa.",
};

const schema = z.object({
  for_whom: z.enum(["mi", "otra", "albergue"], {
    errorMap: () => ({ message: "Elige para quién es el apoyo." }),
  }),
  profile: z.enum(["adulto", "nino_adolescente", "cuidador", "adulto_mayor", "discapacidad"]).optional(),
  disability_type: z.enum(["visual", "auditiva", "motora", "cognitiva", "otra"]).optional(),
  shelter_name: z.string().trim().max(300).optional(),
  shelter_location: z.string().trim().max(300).optional(),
  shelter_people_count: z.string().trim().max(100).optional(),
  shelter_contact: z.string().trim().max(300).optional(),
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
  consent: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar la política de privacidad para enviar tu solicitud." }),
  }),
});

function Ayuda() {
  const [forWhom, setForWhom] = useState<ForWhom | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [disabilityType, setDisabilityType] = useState<DisabilityType | null>(null);
  const [shelterName, setShelterName] = useState("");
  const [shelterLocation, setShelterLocation] = useState("");
  const [shelterPeopleCount, setShelterPeopleCount] = useState("");
  const [shelterContact, setShelterContact] = useState("");
  const [caseDetails, setCaseDetails] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse({
      for_whom: forWhom ?? undefined,
      profile: profile ?? undefined,
      disability_type: profile === "discapacidad" ? (disabilityType ?? undefined) : undefined,
      shelter_name: forWhom === "albergue" ? shelterName : undefined,
      shelter_location: forWhom === "albergue" ? shelterLocation : undefined,
      shelter_people_count: forWhom === "albergue" ? shelterPeopleCount : undefined,
      shelter_contact: forWhom === "albergue" ? shelterContact : undefined,
      case_details: caseDetails,
      name,
      contact,
      consent: consent ? true : undefined,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Revisa los datos, por favor.");
      return;
    }
    setStatus("sending");
    const { error: dbError } = await supabase.from("support_requests").insert({
      for_whom: parsed.data.for_whom,
      case_details: parsed.data.case_details,
      name: parsed.data.name?.length ? parsed.data.name : null,
      contact: parsed.data.contact,
      profile: parsed.data.profile ?? null,
      disability_type: parsed.data.profile === "discapacidad" ? (parsed.data.disability_type ?? null) : null,
      consent: true,
      shelter_name: parsed.data.for_whom === "albergue" && parsed.data.shelter_name?.length ? parsed.data.shelter_name : null,
      shelter_location: parsed.data.for_whom === "albergue" && parsed.data.shelter_location?.length ? parsed.data.shelter_location : null,
      shelter_people_count: parsed.data.for_whom === "albergue" && parsed.data.shelter_people_count?.length ? parsed.data.shelter_people_count : null,
      shelter_contact: parsed.data.for_whom === "albergue" && parsed.data.shelter_contact?.length ? parsed.data.shelter_contact : null,
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
    setDisabilityType(null);
    setShelterName("");
    setShelterLocation("");
    setShelterPeopleCount("");
    setShelterContact("");
    setCaseDetails("");
    setName("");
    setContact("");
    setConsent(false);
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
          Déjanos tus datos y te asignaremos un profesional. Según el caso será
          una charla grupal por videollamada o atención individual. Nos pondremos
          en contacto contigo.
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

        {forWhom === "albergue" && (
          <div className="space-y-4 rounded-2xl border border-border bg-secondary/30 p-4 sm:p-5">
            <p className="font-serif text-base text-foreground">Datos del albergue</p>
            <div>
              <label htmlFor="shelterName" className="block text-sm font-medium text-foreground">
                Nombre del albergue
              </label>
              <input
                id="shelterName"
                type="text"
                required
                value={shelterName}
                onChange={(e) => setShelterName(e.target.value)}
                maxLength={300}
                className="mt-1.5 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-base text-foreground outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="shelterLocation" className="block text-sm font-medium text-foreground">
                Ubicación / zona (ciudad, sector)
              </label>
              <input
                id="shelterLocation"
                type="text"
                required
                value={shelterLocation}
                onChange={(e) => setShelterLocation(e.target.value)}
                maxLength={300}
                className="mt-1.5 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-base text-foreground outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="shelterPeople" className="block text-sm font-medium text-foreground">
                Aproximadamente cuántas personas hay
              </label>
              <input
                id="shelterPeople"
                type="text"
                required
                value={shelterPeopleCount}
                onChange={(e) => setShelterPeopleCount(e.target.value)}
                maxLength={100}
                placeholder="Ej. 45 personas"
                className="mt-1.5 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-base text-foreground outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="shelterContact" className="block text-sm font-medium text-foreground">
                Contacto del albergue <span className="text-muted-foreground">(opcional)</span>
              </label>
              <input
                id="shelterContact"
                type="text"
                value={shelterContact}
                onChange={(e) => setShelterContact(e.target.value)}
                maxLength={300}
                placeholder="Teléfono o encargado del albergue"
                className="mt-1.5 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-base text-foreground outline-none focus:border-primary"
              />
            </div>
          </div>
        )}

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

        <div>
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-border accent-primary cursor-pointer"
            />
            <span className="text-sm leading-relaxed text-foreground/90">
              He leído y acepto la{" "}
              <Link
                to="/privacidad"
                className="text-primary underline-offset-4 hover:underline font-medium"
              >
                política de privacidad
              </Link>
              .
            </span>
          </label>
        </div>

        {error && (
          <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={status === "sending" || !consent}
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
