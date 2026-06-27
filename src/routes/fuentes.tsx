import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";

export const Route = createFileRoute("/fuentes")({
  head: () => ({
    meta: [
      { title: "¿En qué se basa Zerena? — Fuentes y protocolos" },
      {
        name: "description",
        content:
          "Zerena se basa en protocolos reconocidos de apoyo psicológico en emergencias: PAP de la OMS/OPS, IFRC, NCTSN, Save the Children y Pauline Boss.",
      },
    ],
  }),
  component: Fuentes,
});

type Fuente = {
  title: string;
  body: string;
  href?: string;
  source: string;
};

const FUENTES: Fuente[] = [
  {
    title: "Primeros Auxilios Psicológicos (PAP)",
    body: "Guía de la OMS y la OPS para trabajadores de campo, avalada por el IASC y el Proyecto Esfera.",
    href: "https://www.paho.org/en/documents/psychological-first-aid-guide-field-workers",
    source: "paho.org",
  },
  {
    title: "Cruz Roja / IFRC",
    body: "Apoyo psicológico a distancia y a la niñez.",
    href: "https://www.ifrc.org/our-work/health-and-care/community-health/mental-health-and-psychosocial-support",
    source: "ifrc.org",
  },
  {
    title: "NCTSN · Red Nacional de Estrés Traumático Infantil",
    body: "Guías para niños tras un terremoto.",
    href: "https://www.nctsn.org/what-is-child-trauma/trauma-types/disasters/earthquake-resources",
    source: "nctsn.org",
  },
  {
    title: "Save the Children",
    body: "Apoyo psicológico a niños según su edad.",
    href: "https://resourcecentre.savethechildren.net/document/save-children-psychological-first-aid-training-manual-child-practitioners/",
    source: "savethechildren.net",
  },
  {
    title: "Pauline Boss",
    body: "Concepto de pérdida ambigua, para familiares de personas no encontradas.",
    source: "Trabajo de la investigadora Pauline Boss, Universidad de Minnesota.",
  },
];

function Fuentes() {
  return (
    <PageShell>
      <BackLink to="/" label="Inicio" />
      <h1 className="mt-2 font-serif text-3xl text-foreground">¿En qué se basa Zerena?</h1>
      <p className="mt-5 text-base leading-relaxed text-foreground/85">
        Todo el contenido de Zerena se basa en protocolos reconocidos de apoyo psicológico en
        emergencias. Cuando hay un documento oficial en línea, la fuente abre directo:
      </p>

      <ul className="mt-6 space-y-3">
        {FUENTES.map((f) =>
          f.href ? (
            <li key={f.title}>
              <a
                href={f.href}
                target="_blank"
                rel="noopener noreferrer"
                className="serena-card flex items-start gap-3 p-5 transition-colors hover:bg-secondary"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-base text-foreground">{f.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                  <p className="mt-2 text-xs text-primary">{f.source}</p>
                </div>
                <ExternalLink size={16} className="mt-1 shrink-0 text-muted-foreground" />
              </a>
            </li>
          ) : (
            <li key={f.title} className="serena-card p-5">
              <p className="font-serif text-base text-foreground">{f.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              <p className="mt-2 text-xs text-muted-foreground">{f.source}</p>
            </li>
          ),
        )}
      </ul>

      <p className="mt-8 text-sm leading-relaxed text-foreground/85">
        Los números del directorio están verificados con fuentes oficiales.
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-sage-soft/60 p-5">
        <p className="text-sm leading-relaxed text-foreground/85">
          Zerena no es terapia, no diagnostica y no reemplaza la atención de un profesional ni los
          servicios de emergencia. Su contenido está en revisión por profesionales de salud mental.
        </p>
      </div>

      <p className="mt-6 rounded-2xl border border-alert/30 bg-[oklch(0.97_0.025_28)] p-4 text-sm leading-relaxed text-foreground">
        Si tú o alguien corre peligro, llama al{" "}
        <a href="tel:911" className="font-medium text-alert underline-offset-4 hover:underline">
          911
        </a>
        .
      </p>

      <div className="mt-8 flex justify-center">
        <Link
          to="/ayuda"
          className="inline-flex items-center gap-2 rounded-full bg-sage-soft px-4 py-2 text-sm text-primary ring-1 ring-border hover:bg-secondary"
        >
          Ver líneas de apoyo
        </Link>
      </div>
    </PageShell>
  );
}
