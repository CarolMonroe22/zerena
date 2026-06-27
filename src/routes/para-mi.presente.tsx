import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { BasedOn } from "@/components/BasedOn";

export const Route = createFileRoute("/para-mi/presente")({
  head: () => ({ meta: [{ title: "Volver al presente — Serena" }] }),
  component: Presente,
});

const ANCHORS = [
  {
    title: "Siente los pies",
    body: "Si están apoyados, nota el peso. Si tienes zapatos, siente la tela o el cuero. No tienes que mover nada.",
  },
  {
    title: "Aprieta y suelta las manos",
    body: "Cierra los puños con suavidad mientras cuentas hasta tres. Luego suelta. Repite si quieres.",
  },
  {
    title: "Escucha tu respiración",
    body: "No la cambies. Solo escucha cómo el aire entra y sale. Está pasando ahora mismo, en ti.",
  },
  {
    title: "Toca algo cerca",
    body: "Una tela, tu propia mano, el borde de algo. Nota si es liso, áspero, tibio o fresco.",
  },
];

function Presente() {
  return (
    <PageShell>
      <BackLink to="/para-mi" label="Para mí" />
      <h1 className="mt-2 font-serif text-3xl text-foreground">Volver al presente</h1>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        No necesitas mirar a tu alrededor si no quieres. Vamos a llevar la atención al cuerpo, con
        anclas suaves. Haz solo las que sientas bien.
      </p>
      <ol className="mt-8 space-y-4">
        {ANCHORS.map((a, i) => (
          <li key={a.title} className="serena-card flex gap-4 p-5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sage-soft font-serif text-sm text-sage-deep">
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="font-serif text-lg text-foreground">{a.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Si te cuesta, no es falla tuya. Vuelve cuando quieras.
      </p>
          <BasedOn source="PAP (OMS/OPS)" />
    </PageShell>
  );
}
