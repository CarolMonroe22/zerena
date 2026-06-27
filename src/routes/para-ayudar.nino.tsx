import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { BasedOn } from "@/components/BasedOn";
import { LineasButton } from "@/components/LineasButton";

export const Route = createFileRoute("/para-ayudar/nino")({
  head: () => ({ meta: [{ title: "Acompañar a un niño — Serena" }] }),
  component: Nino,
});

type Edad = {
  rango: string;
  reacciona: string;
  ayuda: string;
};

const EDADES: Edad[] = [
  {
    rango: "0–2",
    reacciona: "Llora más, se pega a ti, come o duerme distinto, se asusta con ruidos.",
    ayuda:
      "Cárgalo, voz suave. Mantén rutina de comida y sueño. Tenlo contigo, evita ruidos y escenas fuertes.",
  },
  {
    rango: "3–6",
    reacciona:
      "Miedo, pesadillas, se pega. Puede volver a mojar la cama o hablar como más pequeño. Repite el temblor en su juego.",
    ayuda:
      "Cercanía y abrazos. Respuestas simples y honestas. Rutina; déjalo jugar y dibujar. No lo retes por «retroceder».",
  },
  {
    rango: "7–12",
    reacciona:
      "Miedo a que vuelva. Dolores de cabeza o panza, distraído, irritable. Preguntas repetidas, a veces culpa.",
    ayuda:
      "Explícale simple qué pasó y qué se está haciendo. Escucha sus preguntas. Dale pequeñas tareas para sentir control. Límites con cariño.",
  },
  {
    rango: "13–18",
    reacciona:
      "Se aísla o se hace «el fuerte». Irritable, triste, busca riesgos. Replantea lo que creía.",
    ayuda:
      "Trátalo como casi-adulto. Dale espacio pero hazle saber que estás. Déjalo ayudar. Valida sin minimizar. Cuida que no cargue todo solo.",
  },
];

const SI_DECIR = [
  "«Hubo un temblor. Vamos a estar juntos.»",
  "«Está bien tener miedo. A mí también a veces.»",
  "«Yo estoy aquí contigo.»",
];

const NO_DECIR = [
  "No prometas «no va a volver a temblar».",
  "No le des detalles que asusten ni lo dejes ver noticias.",
  "No lo regañes por llorar o por tener miedo.",
];

function Nino() {
  const [tab, setTab] = useState(0);
  const e = EDADES[tab];

  return (
    <PageShell>
      <BackLink to="/para-ayudar/ahora" label="Estoy con alguien" />
      <h1 className="mt-2 font-serif text-3xl text-foreground">Acompañar a un niño</h1>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        Los niños sienten el miedo aunque no lo digan. Y tu calma los calma: empieza por cuidarte
        tú.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {EDADES.map((x, i) => (
          <button
            key={x.rango}
            type="button"
            onClick={() => setTab(i)}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
              i === tab
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground ring-1 ring-border hover:bg-secondary"
            }`}
          >
            {x.rango} años
          </button>
        ))}
      </div>

      <section className="serena-card mt-5 p-6">
        <h2 className="text-xs uppercase tracking-wider text-muted-foreground">Cómo puede reaccionar</h2>
        <p className="mt-2 text-base leading-relaxed text-foreground/85">{e.reacciona}</p>
      </section>
      <section className="serena-card mt-3 p-6">
        <h2 className="text-xs uppercase tracking-wider text-muted-foreground">Qué ayuda</h2>
        <p className="mt-2 text-base leading-relaxed text-foreground/85">{e.ayuda}</p>
      </section>

      <h2 className="mt-10 mb-3 px-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Qué decirle
      </h2>
      <section className="serena-card p-6">
        <p className="font-serif text-base text-primary">Sí</p>
        <ul className="mt-2 space-y-2 text-base leading-relaxed text-foreground/85">
          {SI_DECIR.map((t) => (
            <li key={t} className="flex gap-3">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 font-serif text-base text-alert">No</p>
        <ul className="mt-2 space-y-2 text-base leading-relaxed text-foreground/85">
          {NO_DECIR.map((t) => (
            <li key={t} className="flex gap-3">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-alert/70" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <h2 className="mt-10 mb-3 px-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Para hacer juntos
      </h2>
      <section className="serena-card p-6">
        <p className="font-serif text-lg text-foreground">La respiración del globo</p>
        <p className="mt-2 text-base leading-relaxed text-foreground/85">
          Acuéstalo, pon tu mano o un peluche sobre su pancita, y que respire despacio mientras ve
          cómo sube y baja. También sirve soplar despacio una pluma o un papelito.
        </p>
      </section>
      <section className="serena-card mt-3 p-6">
        <p className="font-serif text-lg text-foreground">Dibujar lo que siente</p>
        <p className="mt-2 text-base leading-relaxed text-foreground/85">
          Dale papel y que dibuje cómo se siente. No lo corrijas, solo acompáñalo.
        </p>
      </section>

      <div className="mt-8 flex justify-center">
        <LineasButton />
      </div>
          <BasedOn source="Save the Children · IFRC · NCTSN" />
    </PageShell>
  );
}
