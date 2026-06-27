// Contenido del entrenamiento. En revisión clínica. Punzante + con ejemplos.
export type TrainingStep = {
  heading: string;
  body?: string;
  bullets?: { label?: string; text: string }[];
  example?: string; // frase/escena concreta, se muestra resaltada
  cta?: "lineas"; // botón "Ver líneas de apoyo"
};

export type TrainingModule = {
  id: string;
  n: number;
  title: string;
  intro?: string;
  steps: TrainingStep[];
  source: string;
};

export const TRAINING: TrainingModule[] = [
  {
    id: "rol-limites",
    source: "PAP (OMS/OPS)",
    n: 1,
    title: "Tu rol y tus límites",
    steps: [
      {
        heading: "Tu presencia basta",
        body: "Lo más valioso que ofreces es estar, con calma. Esto no es terapia y no tienes que resolverlo todo.",
        example: "No necesitas la frase perfecta. A veces basta con: «aquí estoy, no te dejo solo.»",
      },
      {
        heading: "Qué NO es",
        body: "No es presionar a que cuente lo vivido. No es hacer que analice u ordene lo que pasó. No hace falta ser profesional.",
      },
      {
        heading: "Tus límites",
        body: "Si hay riesgo de vida o te supera, conecta con ayuda experta. Cuídate tú también.",
        example: "Si alguien dice «ya no quiero seguir», no lo manejes solo: «lo que sientes es muy serio y mereces ayuda ahora», y llamas al 911 con la persona.",
        cta: "lineas",
      },
    ],
  },
  {
    id: "preparate",
    source: "PAP (OMS/OPS)",
    n: 2,
    title: "Prepárate",
    steps: [
      {
        heading: "Infórmate antes",
        body: "Si puedes, entérate de qué pasó, qué servicios hay cerca y qué zonas no son seguras.",
        example: "Antes de entrar a un refugio: ¿dónde dan agua, dónde está el puesto médico, a quién derivar?",
      },
      {
        heading: "No improvises riesgos",
        body: "No vayas a un lugar que no es seguro. Tu seguridad también cuenta: si te pasa algo, no puedes ayudar.",
      },
    ],
  },
  {
    id: "observar",
    source: "PAP (OMS/OPS)",
    n: 3,
    title: "Observar",
    steps: [
      {
        heading: "Seguridad primero",
        body: "No te acerques si el lugar no es seguro. Mira quién parece herido o muy alterado.",
        example: "Mira el entorno: ¿cables sueltos, vidrios, estructura inestable? Si sí, no entres y pide ayuda.",
      },
      {
        heading: "Acércate con cuidado",
        body: "Despacio, preséntate, no invadas su espacio.",
        example: "«Hola, me llamo Ana, estoy aquí ayudando. ¿Puedo acercarme?»",
      },
      {
        heading: "Si ayudas a distancia",
        body: "No ves la escena. Pregunta con suavidad si está a salvo. No asumas nada.",
      },
    ],
  },
  {
    id: "escuchar",
    source: "PAP (OMS/OPS)",
    n: 4,
    title: "Escuchar",
    steps: [
      {
        heading: "Pregunta y deja hablar",
        body: "Di tu nombre, pregunta si puedes ayudar, qué necesita y qué le preocupa.",
        example: "Pregunta abierta: «¿qué es lo que más te preocupa ahora?» en vez de «¿estás bien?»",
      },
      {
        heading: "Escucha de verdad",
        body: "Con los ojos, los oídos y el corazón. No presiones. Deja silencios.",
      },
      {
        heading: "Tu cuerpo también habla",
        body: "Ponte a su nivel, sin apuro, con contacto visual suave. No mires el reloj.",
      },
    ],
  },
  {
    id: "que-decir",
    source: "PAP (OMS/OPS)",
    n: 5,
    title: "Qué decir y qué no",
    steps: [
      {
        heading: "Sí ayuda",
        bullets: [
          { text: "«Lo siento mucho. Imagino que esto es muy difícil para ti.»" },
          { text: "Validar lo que siente." },
          { text: "Ser honesto: «no lo sé, pero intentaré averiguarlo»." },
          { text: "Reconocer su fortaleza." },
        ],
        example: "Si llora: no la apures. «Está bien llorar. Me quedo aquí contigo.»",
      },
      {
        heading: "Mejor evitar",
        bullets: [
          { text: "«No deberías sentirte así» o «tuviste suerte de sobrevivir»." },
          { text: "Presionar para que cuente." },
          { text: "Falsas promesas." },
          { text: "Tecnicismos. Juzgar. Contar su historia a otros." },
        ],
      },
      {
        heading: "Respeta el silencio",
        body: "No lo llenes con frases hechas. Estar callado a su lado también acompaña.",
      },
    ],
  },
  {
    id: "conectar",
    source: "PAP (OMS/OPS)",
    n: 6,
    title: "Conectar",
    steps: [
      {
        heading: "Lo básico primero",
        body: "Agua, refugio, información.",
      },
      {
        heading: "Reconecta",
        body: "Ayúdale a contactar a sus seres queridos y comparte los números de ayuda.",
        cta: "lineas",
      },
      {
        heading: "No prometas de más",
        body: "Di lo que sabes; no inventes servicios que quizá no existen.",
        example: "Mejor «busco dónde dan agua» que «ya viene la ayuda».",
      },
    ],
  },
  {
    id: "panico-shock",
    source: "PAP (OMS/OPS)",
    n: 7,
    title: "Si hay pánico o shock",
    steps: [
      {
        heading: "Calmar",
        body: "Voz suave. Recuérdale que estás ahí y, si es cierto, que está a salvo. No la dejes sola.",
      },
      {
        heading: "Volver al presente",
        body: "Sin mirar lo que duele:",
        bullets: [
          { text: "Pies en el suelo y notar el contacto." },
          { text: "Apretar y soltar las manos despacio." },
          { text: "Escuchar su propia respiración." },
          { text: "Respirar despacio y profundo." },
        ],
        example: "«Vamos a respirar juntos. Pon los pies en el suelo, siéntelos. Inhala… y exhala despacio conmigo.»",
      },
    ],
  },
  {
    id: "quien-necesita-mas",
    source: "PAP (OMS/OPS) e IFRC",
    n: 8,
    title: "Quién necesita más ayuda",
    steps: [
      {
        heading: "Escalar ya",
        bullets: [
          { text: "Lesiones graves." },
          { text: "No puede cuidarse ni a sus hijos." },
          { text: "Podría hacerse daño." },
          { text: "Podría hacer daño a otros." },
        ],
        cta: "lineas",
      },
      {
        heading: "Atención especial",
        body: "Niños solos, embarazadas, adultos mayores frágiles, personas con discapacidad, mujeres en riesgo de violencia.",
      },
      {
        heading: "Tú no diagnosticas",
        body: "Ante la duda, deriva. Mejor pedir ayuda de más que de menos.",
      },
    ],
  },
  {
    id: "nino",
    source: "Save the Children · IFRC · NCTSN (duelo infantil)",
    n: 9,
    title: "Acompañar a un niño",
    intro: "Guía completa por edad y escenarios en «Estoy con alguien ahora» → «Es un niño».",
    steps: [
      {
        heading: "Tu calma lo calma",
        body: "Habla simple, ponte a su altura, no le des detalles que asusten. Antes de cuidarlo a él, respira tú.",
      },
      {
        heading: "Cambia con la edad",
        body: "El bebé siente tu tensión. El pequeño puede creer que fue su culpa. El escolar pregunta y se culpa. El adolescente se hace «el fuerte». Ajusta tu tono a su edad.",
      },
      {
        heading: "Deja que juegue",
        body: "Jugar o dibujar es como los niños sueltan lo que sienten.",
        example: "«¿Me dibujas cómo te sientes?» vale más que muchas preguntas.",
      },
      {
        heading: "Verdad sin promesas",
        body: "No prometas «no va a temblar más». Sí puedes decir: «yo estoy aquí contigo».",
        example: "Si pregunta «¿nos vamos a morir?»: «ahora estamos a salvo y te estoy cuidando.»",
      },
      {
        heading: "Si perdió a alguien",
        body: "Dile la verdad simple: «murió», no «se durmió». No es su culpa. Dile quién lo cuidará ahora. Déjalo recordar.",
        example: "Si quedó solo, sin un adulto que lo cuide, es una emergencia: conéctalo de inmediato.",
        cta: "lineas",
      },
    ],
  },
  {
    id: "perdio-todo",
    source: "PAP y duelo en emergencias",
    n: 10,
    title: "Acompañar a quien lo perdió todo",
    steps: [
      {
        heading: "Solo estar",
        body: "Cuando alguien perdió a su familia, tu trabajo no es consolar con palabras ni arreglar lo imposible. Es estar. El silencio acompañado vale más que cualquier frase.",
      },
      {
        heading: "Qué decir y qué no",
        body: "No digas «fue la voluntad de Dios», «están en un lugar mejor», «tienes que ser fuerte».",
        example: "Sí: «Estoy aquí contigo. No te dejo solo.» / «No tienes que decir nada.»",
      },
      {
        heading: "Vigila el riesgo",
        body: "Si dice que no quiere seguir, o que quiere hacerse daño, no lo manejes solo. Conéctalo de inmediato con una línea o el 911, y quédate con esa persona.",
        cta: "lineas",
      },
      {
        heading: "Cuídate después",
        body: "Esto también te pesa a ti.",
      },
    ],
  },
  {
    id: "perdida-ambigua",
    source: "pérdida ambigua (Pauline Boss / Cruz Roja)",
    n: 11,
    title: "Cuando no han encontrado a alguien",
    steps: [
      {
        heading: "Una espera imposible",
        body: "No saber si su ser querido vive o no es una de las cargas más duras. Tiene nombre: pérdida ambigua. La persona no puede despedirse ni descansar.",
      },
      {
        heading: "Cómo acompañar",
        body: "No fuerces ni la esperanza ni el cierre. Acompaña la espera tal como es.",
        example: "No «ya va a aparecer» ni «tienes que aceptar que no está». Mejor: «esto es muy duro, no estás solo en la espera.»",
      },
      {
        heading: "Lo práctico ayuda",
        body: "Apóyala con dónde reportar y buscar (Cruz Roja, reunificación familiar) y en no esperar en soledad.",
        cta: "lineas",
      },
    ],
  },
  {
    id: "replicas",
    source: "PAP y seguridad sísmica",
    n: 12,
    title: "Cuando el miedo vuelve (réplicas)",
    steps: [
      {
        heading: "El miedo tiene sentido",
        body: "Tras un terremoto, cada réplica revive el susto. No minimices.",
        example: "No «ya pasó, tranquilo». Sí: «tiene sentido que tu cuerpo se asuste, fue muy fuerte.»",
      },
      {
        heading: "Cómo ayudar",
        body: "Si tiembla, recuérdale con calma lo básico de seguridad (agacharse, cubrirse la cabeza, agarrarse de algo firme). Después, respira con la persona, despacio, y quédate cerca.",
      },
    ],
  },
  {
    id: "desde-lejos",
    source: "PAP remota (IFRC) · duelo desautorizado (Doka) · salud mental de la diáspora",
    n: 13,
    title: "Acompañar desde lejos",
    steps: [
      {
        heading: "A distancia también se acompaña",
        body: "Estar lejos no te deja afuera. Por teléfono o mensaje también se sostiene: tu voz, tu constancia y tu calma. La base es la misma: escuchar, validar, no presionar. No ves su entorno, así que pregunta con suavidad si está a salvo.",
        example: "«No estoy allá, pero estoy aquí para ti. Cuéntame cómo estás, sin apuro.»",
      },
      {
        heading: "Cuando te dicen «tú no estás acá»",
        body: "Es probable que escuches «no entiendes, no estás aquí». No te defiendas ni lo tomes como rechazo: es el dolor hablando. No compares con lo tuyo ni lo minimices.",
        example: "No «yo también la estoy pasando mal». Sí: «tienes razón, no estoy viviendo lo que tú. Y aun así, no te suelto.»",
      },
      {
        heading: "Si está lejos y perdió a alguien",
        body: "No poder ir al entierro ni despedirse rompe el cierre. Ese duelo a distancia duele de forma propia: no lo apures ni le pidas «ser fuerte».",
        bullets: [
          { text: "Acompáñalo a despedirse a su manera: una foto y una vela, unas palabras, o conectarse al funeral por videollamada si se puede." },
          { text: "Nombra lo que vive: «no estar allá para despedirte es muy duro, y es válido»." },
          { label: "Si aún no lo encuentran", text: "es una espera distinta (pérdida ambigua); no fuerces ni la esperanza ni el cierre." },
        ],
        example: "«No pudiste estar, y eso pesa. Si quieres, encendemos una vela por él, juntos, aunque sea por llamada.»",
      },
      {
        heading: "Cuídate tú también",
        body: "Sostener a alguien desde lejos, estando tú también afectado, cansa. La culpa de estar a salvo es común; no la cargues en silencio.",
        bullets: [
          { text: "Ponles pausas al teléfono y a las noticias." },
          { text: "Apóyate en otros que viven lo mismo." },
        ],
        cta: "lineas",
      },
    ],
  },
  {
    id: "cuidate-cierre",
    source: "PAP (OMS/OPS)",
    n: 14,
    title: "Cuídate y cómo cerrar",
    steps: [
      {
        heading: "Tu bienestar importa",
        body: "Acompañar cansa. Come, hidrátate, descansa. No trabajes sin parar.",
      },
      {
        heading: "Sostén tu sostén",
        bullets: [
          { text: "Habla de lo que sientes con alguien de confianza." },
          { text: "No te apoyes en alcohol o drogas." },
          { text: "Reconoce cuando TÚ necesitas apoyo y búscalo." },
        ],
      },
      {
        heading: "Cómo cerrar",
        body: "No desaparezcas de golpe. Avisa cuándo termina tu apoyo y deja una línea a la mano.",
        example: "«Hoy me tengo que ir, pero te dejo este número por si lo necesitas. No estás solo.»",
        cta: "lineas",
      },
    ],
  },
];

const KEY = "serena.training.v1";

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function readCompleted(): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x) => typeof x === "string");
  } catch {
    return [];
  }
}

export function markCompleted(id: string) {
  if (!isBrowser()) return;
  const all = new Set(readCompleted());
  all.add(id);
  window.localStorage.setItem(KEY, JSON.stringify([...all]));
}

export function unmarkCompleted(id: string) {
  if (!isBrowser()) return;
  const all = readCompleted().filter((x) => x !== id);
  window.localStorage.setItem(KEY, JSON.stringify(all));
}

export function getModule(id: string): TrainingModule | undefined {
  return TRAINING.find((m) => m.id === id);
}
