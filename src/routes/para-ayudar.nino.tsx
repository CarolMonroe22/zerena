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
    reacciona:
      "Llora más, se pega a ti, cambia el sueño o la comida, se sobresalta con ruidos. No entiende lo que pasó, pero siente tu tensión.",
    ayuda:
      "Cárgalo, voz suave, contacto piel a piel. Mantén la rutina de comida y sueño lo más posible. Tenlo contigo; evita ruidos fuertes y escenas duras. Tu calma es su calma.",
  },
  {
    rango: "3–6",
    reacciona:
      "Miedo, pesadillas, se pega a ti. Puede volver a mojar la cama o hablar como más pequeño. Repite el temblor en su juego. Puede creer que pasó por algo que él hizo.",
    ayuda:
      "Cercanía y abrazos. Respuestas simples, cortas y honestas. Recuérdale que no fue su culpa. Rutina; déjalo jugar y dibujar. No lo regañes por «retroceder».",
  },
  {
    rango: "7–12",
    reacciona:
      "Miedo a que vuelva. Dolores de cabeza o panza, distraído, irritable. Preguntas repetidas. Puede sentir culpa o rabia.",
    ayuda:
      "Explícale simple qué pasó y qué se está haciendo. Responde sus preguntas, aunque se repitan. Dale pequeñas tareas para sentir control. Límites con cariño. Dile que sus sentimientos están bien.",
  },
  {
    rango: "13–18",
    reacciona:
      "Se aísla o se hace «el fuerte». Irritable, triste, puede buscar riesgos. Cuestiona lo que creía o su fe.",
    ayuda:
      "Trátalo como casi-adulto. Dale espacio, pero hazle saber que estás. Déjalo ayudar, le da sentido. Valida sin minimizar. Cuida que no cargue todo solo ni con alcohol o drogas.",
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

const ESCENARIOS = [
  {
    q: "No quiere hablar, se queda callado",
    a: "No lo fuerces. Quédate cerca y ofrécele dibujar o jugar. El silencio acompañado también ayuda.",
  },
  {
    q: "Pregunta lo mismo una y otra vez",
    a: "Respóndele con calma cada vez. Repetir es su forma de entender algo demasiado grande.",
  },
  {
    q: "Pesadillas o no quiere dormir solo",
    a: "Rutina al dormir, una luz tenue, quédate hasta que se duerma. Es temporal, no lo apures.",
  },
  {
    q: "Se pone agresivo o vuelve a ser «bebé»",
    a: "Es normal tras un susto así. No lo castigues: dale más cercanía y límites suaves.",
  },
  {
    q: "No te suelta, entra en pánico si te alejas",
    a: "No lo fuerces a separarse. Dale seguridad: «no me voy, estoy aquí contigo».",
  },
  {
    q: "Pregunta «¿yo me voy a morir?» o «¿tú?»",
    a: "Con calma y verdad: «ahora estamos a salvo y te estoy cuidando». Sin prometer lo que no sabes.",
  },
];

const DUELO = [
  "Dile la verdad, simple y real: usa «murió», no «se durmió» ni «se fue de viaje». Los eufemismos confunden y dan más miedo.",
  "Dile claro que no es su culpa, aunque no lo pregunte.",
  "Dale seguridad: cuéntale quién lo va a cuidar ahora.",
  "Déjalo recordar: está bien hablar de quien murió, ver fotos, llorar. No escondas tu propia tristeza.",
  "Mantén rutinas y cercanía: dan estabilidad cuando todo se rompió.",
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

      {/* Por edad */}
      <h2 className="mt-8 mb-3 px-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Según su edad
      </h2>
      <div className="flex flex-wrap gap-2">
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
        <h3 className="text-xs uppercase tracking-wider text-muted-foreground">Cómo puede reaccionar</h3>
        <p className="mt-2 text-base leading-relaxed text-foreground/85">{e.reacciona}</p>
      </section>
      <section className="serena-card mt-3 p-6">
        <h3 className="text-xs uppercase tracking-wider text-muted-foreground">Qué ayuda</h3>
        <p className="mt-2 text-base leading-relaxed text-foreground/85">{e.ayuda}</p>
      </section>

      {/* Qué decirle */}
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

      {/* Escenarios */}
      <h2 className="mt-10 mb-3 px-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Si pasa esto…
      </h2>
      <div className="space-y-3">
        {ESCENARIOS.map((s) => (
          <section key={s.q} className="serena-card p-5">
            <p className="font-serif text-base text-foreground">{s.q}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{s.a}</p>
          </section>
        ))}
      </div>

      {/* Duelo */}
      <h2 className="mt-10 mb-3 px-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Si perdió a alguien
      </h2>
      <section className="serena-card p-6">
        <p className="text-base leading-relaxed text-foreground/85">
          Perder a un padre, una madre o un hermano es de lo más duro que un niño puede vivir.
          Acompañarlo se ve así:
        </p>
        <ul className="mt-4 space-y-2.5 text-base leading-relaxed text-foreground/85">
          {DUELO.map((t) => (
            <li key={t} className="flex gap-3">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 rounded-xl border-l-2 border-alert/40 bg-[oklch(0.97_0.025_28)] px-4 py-3">
          <p className="text-sm leading-relaxed text-foreground">
            Si el niño quedó solo, sin un adulto que lo cuide, es una emergencia de protección:
            conéctalo de inmediato. Y busca ayuda profesional si por mucho tiempo no come ni duerme,
            se culpa, revive la muerte sin parar, o se apaga del todo.
          </p>
        </div>
      </section>

      {/* Para hacer juntos */}
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
          Dale papel y que dibuje cómo se siente. No lo corrijas, solo acompáñalo y escucha lo que te
          cuente del dibujo.
        </p>
      </section>
      <section className="serena-card mt-3 p-6">
        <p className="font-serif text-lg text-foreground">Una caja de recuerdos</p>
        <p className="mt-2 text-base leading-relaxed text-foreground/85">
          Si perdió a alguien, guarden juntos una foto o un objeto de esa persona. Recordar con
          cariño también es parte de sanar.
        </p>
      </section>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Cecodap atiende a niños y adolescentes. Está en las líneas de apoyo.
      </p>
      <div className="mt-4 flex justify-center">
        <LineasButton />
      </div>
      <BasedOn source="Save the Children · IFRC · NCTSN (duelo infantil)" />
    </PageShell>
  );
}
