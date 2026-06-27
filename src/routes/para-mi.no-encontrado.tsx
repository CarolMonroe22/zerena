import { createFileRoute, Link } from "@tanstack/react-router";
import { Wind } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { BasedOn } from "@/components/BasedOn";
import { LineasButton } from "@/components/LineasButton";

export const Route = createFileRoute("/para-mi/no-encontrado")({
  head: () => ({ meta: [{ title: "No he encontrado a alguien — Serena" }] }),
  component: NoEncontrado,
});

function NoEncontrado() {
  const bullets = [
    "No tienes que elegir entre la esperanza y el dolor. Pueden estar los dos a la vez, y está bien.",
    "Nadie tiene derecho a apurarte. Ni «ya va a aparecer» ni «tienes que aceptarlo»: nadie cierra por ti algo que sigue abierto.",
    "Si puedes, no esperes en soledad. Estar con otros que también esperan alivia un poco el peso.",
    "Cuida tu cuerpo aunque tu mente no descanse: un poco de agua, algo de comer, un momento de respiro. Cuidarte no es traicionar a quien buscas.",
  ];
  return (
    <PageShell>
      <BackLink to="/para-mi" label="Para mí" />
      <h1 className="mt-2 font-serif text-3xl text-foreground">No he encontrado a alguien</h1>
      <p className="mt-5 text-base leading-relaxed text-foreground/85">
        Esperar sin saber es de las cosas más duras que existen. No estás ni aquí ni allá: no puedes despedirte, pero tampoco descansar. Esto que vives tiene nombre, se llama <em>pérdida ambigua</em>, y lo que sientes es una respuesta humana a algo casi imposible de sostener.
      </p>

      <ul className="mt-8 space-y-3">
        {bullets.map((t, i) => (
          <li key={i} className="serena-card p-5 text-base leading-relaxed text-foreground/85">
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-3">
        <LineasButton />
        <Link
          to="/para-mi/respira"
          className="inline-flex items-center gap-2 rounded-full bg-sage-soft px-4 py-2 text-sm text-primary ring-1 ring-border hover:bg-secondary"
        >
          <Wind size={14} /> Respira conmigo
        </Link>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Cruz Roja Venezolana atiende reunificación familiar.
      </p>
          <BasedOn source="pérdida ambigua (Pauline Boss / Cruz Roja)" />
    </PageShell>
  );
}
