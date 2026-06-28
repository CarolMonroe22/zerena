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
      { title: "Red de apoyo — Zerena" },
      {
        name: "description",
        content:
          "Súmate a la red de Zerena como voluntario, profesional de la salud mental u organización.",
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

const AVAILABILITY_OPTIONS = ["1-3 h", "4-7 h", "8 h o más", "Flexible"] as const;

const VOLUNTEER_HELP = [
  "Acompañamiento emocional",
  "Difusión",
  "Traducción / idiomas",
  "Coordinación / logística",
  "Diseño o tecnología",
  "Otro",
];

const PRO_HELP = [
  "Atención directa",
  "Supervisión de voluntarios",
  "Formación",
  "Consultas puntuales",
  "Otro",
];

const ORG_HELP = ["Voluntarios", "Profesionales", "Recursos", "Difusión", "Fondos", "Otro"];

const ORG_TYPES = ["ONG", "Colectivo", "Institución", "Fundación"];

const PRO_SPECIALTIES = [
  "Psicólogo/a",
  "Psiquiatra",
  "Terapeuta",
  "Trabajador/a social",
  "Otra",
];

const baseSchema = z.object({
  name: z.string().trim().max(200).optional(),
  contact: z.string().trim().min(1, "Déjanos un correo o WhatsApp para poder responderte.").max(300),
  details: z.string().trim().max(5000).optional(),
  location: z.string().trim().max(200).optional(),
  availability: z.string().trim().max(50).optional(),
  help_areas: z.array(z.string()).optional(),
});

function inputClass() {
  return "mt-2 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-base text-foreground outline-none focus:border-primary";
}

function Field({
  label,
  optional,
  hint,
  children,
  htmlFor,
}: {
  label: string;
  optional?: boolean;
  hint?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-foreground">
        {label} {optional && <span className="text-muted-foreground">(opcional)</span>}
      </label>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      {children}
    </div>
  );
}

function CheckGroup({
  options,
  values,
  onChange,
  name,
}: {
  options: string[];
  values: string[];
  onChange: (next: string[]) => void;
  name: string;
}) {
  return (
    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
      {options.map((opt) => {
        const checked = values.includes(opt);
        return (
          <label
            key={opt}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-sm transition-colors ${
              checked ? "border-primary bg-secondary text-foreground" : "border-border text-foreground/85 hover:bg-secondary/60"
            }`}
          >
            <input
              type="checkbox"
              name={name}
              checked={checked}
              onChange={() => {
                onChange(checked ? values.filter((v) => v !== opt) : [...values, opt]);
              }}
              className="h-4 w-4 accent-[color:var(--color-primary,theme(colors.primary.DEFAULT))]"
            />
            {opt}
          </label>
        );
      })}
    </div>
  );
}

function RedPage() {
  const [role, setRole] = useState<Role | null>(null);

  // Shared
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [details, setDetails] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("");
  const [helpAreas, setHelpAreas] = useState<string[]>([]);

  // Volunteer
  const [trainingDone, setTrainingDone] = useState<"" | "si" | "aun-no">("");

  // Professional
  const [proStatus, setProStatus] = useState<"" | "titulado" | "estudiante">("");
  const [specialty, setSpecialty] = useState("");
  const [credential, setCredential] = useState("");
  const [institution, setInstitution] = useState("");
  const [studyYear, setStudyYear] = useState("");

  // Organization
  const [orgType, setOrgType] = useState("");
  const [website, setWebsite] = useState("");

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function resetAll() {
    setName(""); setContact(""); setDetails("");
    setLocation(""); setAvailability(""); setHelpAreas([]);
    setTrainingDone("");
    setProStatus(""); setSpecialty(""); setCredential(""); setInstitution(""); setStudyYear("");
    setOrgType(""); setWebsite("");
    setRole(null);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!role) {
      setError("Elige cómo quieres sumarte para continuar.");
      return;
    }

    const parsed = baseSchema.safeParse({
      name, contact, details, location, availability, help_areas: helpAreas,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Revisa los datos, por favor.");
      return;
    }

    if (role === "profesional") {
      if (!proStatus) {
        setError("Cuéntanos si eres profesional titulado o estudiante en formación.");
        return;
      }
      if (proStatus === "titulado" && !credential.trim()) {
        setError("Compártenos tu número de credencial o colegiatura para poder verificarla.");
        return;
      }
      if (proStatus === "estudiante" && !institution.trim()) {
        setError("Cuéntanos en qué universidad o institución estudias.");
        return;
      }
    }

    setStatus("sending");
    const payload = {
      role,
      name: name.trim() || null,
      contact: contact.trim(),
      details: details.trim() || null,
      location: location.trim() || null,
      availability: availability || null,
      help_areas: helpAreas.length ? helpAreas.join(", ") : null,
      professional_status: role === "profesional" ? proStatus || null : null,
      specialty: role === "profesional" && proStatus === "titulado" ? specialty.trim() || null : null,
      credential: role === "profesional" && proStatus === "titulado" ? credential.trim() || null : null,
      institution: role === "profesional" && proStatus === "estudiante" ? institution.trim() || null : null,
      study_year: role === "profesional" && proStatus === "estudiante" ? studyYear.trim() || null : null,
      training_done: role === "voluntario" ? trainingDone || null : null,
      org_type: role === "organizacion" ? orgType || null : null,
      website: role === "organizacion" ? website.trim() || null : null,
    };

    const { error: dbError } = await supabase.from("network_signups").insert(payload);
    if (dbError) {
      setStatus("error");
      setError("No pudimos guardar tus datos ahora. Intenta de nuevo en un momento.");
      return;
    }
    setStatus("sent");
    resetAll();
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

        <div className="serena-card mt-5 border-dashed bg-secondary/40 p-5">
          <p className="text-sm leading-relaxed text-foreground/85">
            Estamos construyendo esta red poco a poco, con cuidado. La idea es cerrar el círculo
            de salud mental: conectar a quien necesita ayuda con personas y profesionales que
            puedan acompañar.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/85">
            Todavía está en proceso. Si te sumas hoy, formas parte de los cimientos.
          </p>
        </div>
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

        {role === "voluntario" && (
          <div className="serena-card space-y-5 p-6 sm:p-7">
            <details className="group rounded-xl border border-border bg-secondary/40 p-4">
              <summary className="cursor-pointer text-sm font-medium text-foreground">
                ¿Qué implica ser voluntario?
              </summary>
              <div className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/85">
                <p>Acompañar con calma. No se da terapia ni diagnósticos.</p>
                <p>
                  Antes de acompañar, pedimos completar el entrenamiento PAP de la app —son
                  módulos breves que se hacen a tu ritmo.
                </p>
                <p>
                  El trabajo es escuchar y contener, y derivar al directorio o a un profesional
                  cuando haga falta.
                </p>
                <p>
                  Puedes ayudar desde donde estés, incluida la diáspora. No estás solo: hay
                  coordinación y materiales que te respaldan.
                </p>
              </div>
            </details>

            <Field label="Tu nombre" optional htmlFor="name">
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={200} className={inputClass()} autoComplete="name" />
            </Field>

            <Field label="Correo o WhatsApp" hint="Para poder responderte." htmlFor="contact">
              <input id="contact" type="text" required value={contact} onChange={(e) => setContact(e.target.value)} maxLength={300} className={inputClass()} />
            </Field>

            <Field label="Desde dónde ayudas" optional hint="País y, si quieres, ciudad." htmlFor="location">
              <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} maxLength={200} className={inputClass()} />
            </Field>

            <Field label="Horas de disponibilidad por semana" optional htmlFor="availability">
              <select id="availability" value={availability} onChange={(e) => setAvailability(e.target.value)} className={inputClass()}>
                <option value="">Elige una opción</option>
                {AVAILABILITY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>

            <Field label="¿Cómo puedes ayudar?" optional hint="Puedes marcar varias.">
              <CheckGroup name="help-vol" options={VOLUNTEER_HELP} values={helpAreas} onChange={setHelpAreas} />
            </Field>

            <Field label="¿Ya hiciste el entrenamiento PAP?" optional>
              <div className="mt-2 flex gap-3">
                {[
                  { v: "si", l: "Sí" },
                  { v: "aun-no", l: "Aún no" },
                ].map((o) => (
                  <label key={o.v} className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm ${trainingDone === o.v ? "border-primary bg-secondary" : "border-border hover:bg-secondary/60"}`}>
                    <input type="radio" name="training" value={o.v} checked={trainingDone === o.v} onChange={() => setTrainingDone(o.v as "si" | "aun-no")} className="sr-only" />
                    {o.l}
                  </label>
                ))}
              </div>
            </Field>

            <Field label="Algo más que quieras contarnos" optional htmlFor="details">
              <textarea id="details" value={details} onChange={(e) => setDetails(e.target.value)} maxLength={5000} rows={4} className="mt-2 w-full resize-y rounded-xl border border-border bg-card px-4 py-3 text-base leading-relaxed text-foreground outline-none focus:border-primary" />
            </Field>

            <FooterBlock error={error} status={status} />
          </div>
        )}

        {role === "profesional" && (
          <div className="serena-card space-y-5 p-6 sm:p-7">
            <Field label="Tu nombre" optional htmlFor="name">
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={200} className={inputClass()} autoComplete="name" />
            </Field>

            <Field label="Correo o WhatsApp" hint="Para poder responderte." htmlFor="contact">
              <input id="contact" type="text" required value={contact} onChange={(e) => setContact(e.target.value)} maxLength={300} className={inputClass()} />
            </Field>

            <Field label="¿Eres profesional titulado o estudiante en formación?">
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                {[
                  { v: "titulado", l: "Profesional titulado" },
                  { v: "estudiante", l: "Estudiante en formación" },
                ].map((o) => (
                  <label key={o.v} className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm ${proStatus === o.v ? "border-primary bg-secondary" : "border-border hover:bg-secondary/60"}`}>
                    <input type="radio" name="pro-status" value={o.v} checked={proStatus === o.v} onChange={() => setProStatus(o.v as "titulado" | "estudiante")} className="sr-only" />
                    {o.l}
                  </label>
                ))}
              </div>
            </Field>

            {proStatus === "titulado" && (
              <>
                <Field label="Profesión o especialidad" htmlFor="specialty">
                  <select id="specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} className={inputClass()}>
                    <option value="">Elige una opción</option>
                    {PRO_SPECIALTIES.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="Número de credencial o colegiatura" hint="Lo usamos para poder verificarla." htmlFor="credential">
                  <input id="credential" type="text" value={credential} onChange={(e) => setCredential(e.target.value)} maxLength={200} className={inputClass()} />
                </Field>
              </>
            )}

            {proStatus === "estudiante" && (
              <>
                <Field label="Universidad o institución" htmlFor="institution">
                  <input id="institution" type="text" value={institution} onChange={(e) => setInstitution(e.target.value)} maxLength={200} className={inputClass()} />
                </Field>
                <Field label="Año o semestre que cursas" optional htmlFor="study-year">
                  <input id="study-year" type="text" value={studyYear} onChange={(e) => setStudyYear(e.target.value)} maxLength={50} className={inputClass()} />
                </Field>
              </>
            )}

            <Field label="País o ciudad donde ejerces o estudias" optional htmlFor="location">
              <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} maxLength={200} className={inputClass()} />
            </Field>

            <Field label="Horas de disponibilidad por semana" optional htmlFor="availability">
              <select id="availability" value={availability} onChange={(e) => setAvailability(e.target.value)} className={inputClass()}>
                <option value="">Elige una opción</option>
                {AVAILABILITY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>

            <Field label="¿Cómo puedes ayudar?" optional hint="Puedes marcar varias.">
              <CheckGroup name="help-pro" options={PRO_HELP} values={helpAreas} onChange={setHelpAreas} />
            </Field>

            <Field label="Algo más que quieras contarnos" optional htmlFor="details">
              <textarea id="details" value={details} onChange={(e) => setDetails(e.target.value)} maxLength={5000} rows={4} className="mt-2 w-full resize-y rounded-xl border border-border bg-card px-4 py-3 text-base leading-relaxed text-foreground outline-none focus:border-primary" />
            </Field>

            <FooterBlock error={error} status={status} />
          </div>
        )}

        {role === "organizacion" && (
          <div className="serena-card space-y-5 p-6 sm:p-7">
            <Field label="Nombre de la organización y tu rol" htmlFor="name">
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={200} className={inputClass()} />
            </Field>

            <Field label="Correo o WhatsApp de contacto" hint="Déjanos al menos una vía para responderte." htmlFor="contact">
              <input id="contact" type="text" required value={contact} onChange={(e) => setContact(e.target.value)} maxLength={300} className={inputClass()} />
            </Field>

            <Field label="Sitio web" optional htmlFor="website">
              <input id="website" type="url" value={website} onChange={(e) => setWebsite(e.target.value)} maxLength={300} placeholder="https://" className={inputClass()} />
            </Field>

            <Field label="Tipo de organización" optional htmlFor="org-type">
              <select id="org-type" value={orgType} onChange={(e) => setOrgType(e.target.value)} className={inputClass()}>
                <option value="">Elige una opción</option>
                {ORG_TYPES.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>

            <Field label="País o ámbito de trabajo" optional htmlFor="location">
              <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} maxLength={200} className={inputClass()} />
            </Field>

            <Field label="¿Cómo pueden sumar?" optional hint="Puedes marcar varias.">
              <CheckGroup name="help-org" options={ORG_HELP} values={helpAreas} onChange={setHelpAreas} />
            </Field>

            <Field label="Algo más que quieras contarnos" optional htmlFor="details">
              <textarea id="details" value={details} onChange={(e) => setDetails(e.target.value)} maxLength={5000} rows={4} className="mt-2 w-full resize-y rounded-xl border border-border bg-card px-4 py-3 text-base leading-relaxed text-foreground outline-none focus:border-primary" />
            </Field>

            <FooterBlock error={error} status={status} />
          </div>
        )}

        {error && !role && (
          <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
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

function FooterBlock({ error, status }: { error: string | null; status: string }) {
  return (
    <>
      {error && (
        <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
      )}
      <p className="text-xs leading-relaxed text-muted-foreground">
        Solo usamos tus datos para ponernos en contacto. No los compartimos con nadie.{" "}
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
          {status === "sending" ? "Enviando…" : "Sumarme a la red"}
        </button>
      </div>
    </>
  );
}
