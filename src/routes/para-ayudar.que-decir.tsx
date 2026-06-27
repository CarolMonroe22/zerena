import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { LineasButton } from "@/components/LineasButton";

export const Route = createFileRoute("/para-ayudar/que-decir")({
  head: () => ({ meta: [{ title: "Qué decir — Zerena" }] }),
  component: QueDecir,
});

const SI = [
  "«Lo siento mucho. Imagino que esto es muy difícil para ti.»",
  "Validar lo que siente.",
  "Ser honesto: «no lo sé, pero intentaré averiguarlo».",
  "Reconocer su fortaleza.",
  "Dejar silencios.",
];

const NO = [
  "«No deberías sentirte así» o «tuviste suerte de sobrevivir».",
  "Presionar para que cuente.",
  "Falsas promesas.",
  "Tecnicismos.",
  "Juzgar.",
  "Contar su historia a otros.",
];

export function QueDecir() {
  return (
    <PageShell>
      <BackLink to="/para-ayudar/ahora" label="Estoy con alguien" />
      <h1 className="mt-2 font-serif text-3xl text-foreground">Qué decir</h1>

      <section className="serena-card mt-6 p-6">
        <h2 className="font-serif text-lg text-primary">Sí ayuda</h2>
        <ul className="mt-3 space-y-2.5">
          {SI.map((t) => (
            <li key={t} className="flex gap-3 text-base leading-relaxed text-foreground/85">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="serena-card mt-4 p-6">
        <h2 className="font-serif text-lg text-alert">Mejor evitar</h2>
        <ul className="mt-3 space-y-2.5">
          {NO.map((t) => (
            <li key={t} className="flex gap-3 text-base leading-relaxed text-foreground/85">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-alert/70" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8 flex justify-center">
        <LineasButton />
      </div>
    </PageShell>
  );
}
