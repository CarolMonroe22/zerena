import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { LineasButton } from "@/components/LineasButton";
import { BasedOn } from "@/components/BasedOn";

export const Route = createFileRoute("/para-ayudar/exterior")({
  head: () => ({ meta: [{ title: "Ayudar desde el exterior — Zerena" }] }),
  component: Exterior,
});

const PUNTOS = [
  "Tu voz constante ya sostiene: una llamada o un mensaje, «aquí estoy contigo», repetido.",
  "Pregunta primero si está a salvo y si hay alguien con ella. No ves su entorno.",
  "Escucha, no interrogues. Deja que cuente solo lo que quiera.",
  "Sé su punto de calma: ayuda a reunir información verificada y a coordinar con otros familiares.",
];

function Exterior() {
  return (
    <PageShell>
      <BackLink to="/para-ayudar/ahora" label="Estoy con alguien" />
      <h1 className="mt-2 font-serif text-3xl text-foreground">Ayudar desde el exterior</h1>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        Acompañar desde otro país duele distinto: la distancia, la culpa de estar a salvo, las ganas
        de hacer algo y no poder. Tu presencia, aunque sea por teléfono, sí cuenta.
      </p>

      <section className="serena-card mt-6 p-6">
        <ul className="space-y-3 text-base leading-relaxed text-foreground/85">
          {PUNTOS.map((t) => (
            <li key={t} className="flex gap-3">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-6 rounded-2xl border border-border bg-card p-5">
        <p className="text-sm font-medium text-sage-deep">Si te dice «tú no estás acá»</p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/85">
          No te defiendas ni lo tomes como rechazo: es el dolor hablando, no es contra ti. No
          compares con lo tuyo ni lo minimices. «Tienes razón, no estoy viviendo lo que tú. Y aun
          así, no te suelto.»
        </p>
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-card p-5">
        <p className="text-sm font-medium text-sage-deep">Si perdió a alguien y no puede despedirse</p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/85">
          Acompáñalo a despedirse a su manera: una foto y una vela, unas palabras, o conectarse al
          funeral por videollamada si se puede. Nombra lo que vive: «no estar allá para despedirte es
          muy duro, y es válido.»
        </p>
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-sage-soft/60 p-5">
        <p className="text-sm leading-relaxed text-foreground/85">
          Cuídate tú también: limita las noticias en bucle y apóyate en otros que viven lo mismo.
          Ayudar desde donde estás también es hacer algo.
        </p>
      </div>

      <div className="mt-8 flex justify-center">
        <LineasButton />
      </div>
      <BasedOn source="PAP remota (IFRC) · duelo desautorizado (Doka) · salud mental de la diáspora" />
    </PageShell>
  );
}
