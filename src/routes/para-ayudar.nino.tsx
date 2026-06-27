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
  etiqueta: string;
  reacciona: string[];
  ayuda: string[];
  hablar: string;
  evitar: string;
  alerta: string;
};

const EDADES: Edad[] = [
  {
    rango: "0–2",
    etiqueta: "Bebés",
    reacciona: [
      "Llora más, se irrita, se queda muy pegado a ti.",
      "Cambia el sueño y la comida; se despierta más.",
      "Se sobresalta con ruidos o movimientos.",
      "No entiende lo que pasó, pero siente tu tensión y la del ambiente.",
    ],
    ayuda: [
      "Cárgalo, mucho contacto piel a piel y voz suave.",
      "Mantén las rutinas de comida y sueño lo más posible.",
      "Tenlo contigo; un ambiente tranquilo y predecible lo calma.",
      "Cuídate tú: tu calma es, literalmente, lo que lo regula.",
    ],
    hablar: "Todavía no con palabras: tono cálido, mecerlo, cantarle, repetir lo mismo una y otra vez.",
    evitar: "Ruidos fuertes, gritos, escenas duras o noticias en pantalla. Separaciones largas si puedes evitarlas.",
    alerta: "Si deja de comer, no se calma con nada por mucho tiempo, o se ve muy apagado.",
  },
  {
    rango: "3–6",
    etiqueta: "Preescolar",
    reacciona: [
      "Miedo, pesadillas, miedo a la oscuridad o a separarse de ti.",
      "Puede «retroceder»: mojar la cama, chuparse el dedo, hablar como bebé.",
      "Repite el temblor en su juego o en sus dibujos.",
      "Puede creer que pasó por algo que él hizo o pensó.",
    ],
    ayuda: [
      "Cercanía y abrazos; dile que estás y que lo cuidas.",
      "Respuestas simples, cortas y verdaderas.",
      "Recuérdale claramente que NO fue su culpa.",
      "Rutina; déjalo jugar y dibujar, así procesa.",
    ],
    hablar: "Frases cortas y concretas. Usa su juego o sus dibujos para que exprese. Deja que pregunte lo que quiera.",
    evitar: "Regañarlo por «retroceder». Obligarlo a ser «grande». Detalles o imágenes que asusten.",
    alerta: "Si las pesadillas o el miedo son intensos y no bajan en varias semanas, o deja de jugar.",
  },
  {
    rango: "7–12",
    etiqueta: "Escolar",
    reacciona: [
      "Miedo a que vuelva a pasar; pregunta mucho sobre el peligro.",
      "Síntomas físicos: dolores de cabeza, de panza, cansancio.",
      "Distraído, irritable, le baja el rendimiento.",
      "Culpa («debí hacer algo»), rabia, o preocupación por los demás.",
    ],
    ayuda: [
      "Explícale, simple y honesto, qué pasó y qué se está haciendo.",
      "Responde sus preguntas, aunque se repitan; corrige rumores.",
      "Dale tareas pequeñas y reales para que sienta control.",
      "Mantén límites con cariño y tiempo juntos.",
    ],
    hablar: "Puedes darle un poco más de información real. Valida lo que siente: «tiene sentido que estés asustado».",
    evitar: "Minimizar («no es para tanto»). Cargarlo con preocupaciones de adulto. Exceso de noticias.",
    alerta: "Si la tristeza o ansiedad no ceden, se aísla, o los problemas en la escuela persisten.",
  },
  {
    rango: "13–18",
    etiqueta: "Adolescente",
    reacciona: [
      "Se aísla o se hace «el fuerte»; quizá no quiera hablar con adultos.",
      "Irritable, triste, o busca riesgos.",
      "Cuestiona lo que creía, su fe, o el sentido de las cosas.",
      "Puede asumir roles de adulto y cargarse de más.",
    ],
    ayuda: [
      "Trátalo como casi-adulto; respeta su espacio, pero deja claro que estás.",
      "Déjalo participar y ayudar: le da sentido y control.",
      "Valida sin minimizar; escucha más de lo que aconsejas.",
      "Cuida que no cargue todo solo ni use alcohol o drogas para aguantar.",
    ],
    hablar: "Conversaciones honestas, de igual a igual. Ofrécele que estás disponible, sin presionarlo a hablar.",
    evitar: "Sermones. Minimizar. Forzar la conversación. Tratarlo como niño chiquito.",
    alerta: "Aislamiento total, desesperanza, consumo de sustancias, o cualquier señal de querer hacerse daño → ayuda ya.",
  },
];

const SI_DECIR = [
  "«Hubo un temblor. Estamos juntos.»",
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

function Lista({ items, tono = "primary" }: { items: string[]; tono?: "primary" | "alert" }) {
  return (
    <ul className="mt-2 space-y-2 text-base leading-relaxed text-foreground/85">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span
            className={`mt-2.5 h-1 w-1 shrink-0 rounded-full ${
              tono === "alert" ? "bg-alert/70" : "bg-primary"
            }`}
          />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function Nino() {
  const [tab, setTab] = useState(0);
  const e = EDADES[tab];

  return (
    <PageShell>
      <BackLink to="/para-ayudar/ahora" label="Estoy con alguien" />
      <h1 className="mt-2 font-serif text-3xl text-foreground">Acompañar a un niño</h1>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        Los niños sienten el miedo aunque no lo digan. Y tu calma los calma: empieza por cuidarte
        tú. Cada edad lo vive distinto:
      </p>

      {/* Por edad — sección principal */}
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

      <div className="serena-card mt-5 p-6">
        <p className="font-serif text-lg text-foreground">
          {e.etiqueta} <span className="text-muted-foreground">· {e.rango} años</span>
        </p>

        <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">
          Cómo puede reaccionar
        </p>
        <Lista items={e.reacciona} />

        <p className="mt-5 text-xs uppercase tracking-wider text-primary">Qué ayuda</p>
        <Lista items={e.ayuda} />

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-sage-soft/50 p-4">
            <p className="text-xs uppercase tracking-wider text-primary/80">Cómo hablarle</p>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{e.hablar}</p>
          </div>
          <div className="rounded-xl bg-secondary p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Evitar</p>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{e.evitar}</p>
          </div>
        </div>

        <div className="mt-3 rounded-xl border-l-2 border-alert/40 bg-[oklch(0.97_0.025_28)] px-4 py-3">
          <p className="text-xs uppercase tracking-wider text-alert/80">Cuándo buscar más ayuda</p>
          <p className="mt-1 text-sm leading-relaxed text-foreground">{e.alerta}</p>
        </div>
      </div>

      {/* Qué decirle */}
      <h2 className="mt-10 mb-3 px-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Qué decirle (a cualquier edad)
      </h2>
      <section className="serena-card p-6">
        <p className="font-serif text-base text-primary">Sí</p>
        <Lista items={SI_DECIR} />
        <p className="mt-5 font-serif text-base text-alert">No</p>
        <Lista items={NO_DECIR} tono="alert" />
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
        <Lista items={DUELO} />
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
