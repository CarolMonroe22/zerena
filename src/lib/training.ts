// Contenido EXACTO del entrenamiento. No editar sin revisión.
export type TrainingStep = {
  heading: string;
  body?: string;
  bullets?: { label?: string; text: string }[];
  cta?: "lineas"; // botón "Ver líneas de apoyo"
};

export type TrainingModule = {
  id: string;
  n: number;
  title: string;
  intro?: string;
  steps: TrainingStep[];
};

export const TRAINING: TrainingModule[] = [
  {
    id: "que-es-acompanar",
    n: 1,
    title: "Qué es acompañar",
    steps: [
      {
        heading: "Tu presencia basta",
        body: "Lo más valioso que ofreces es estar, con calma. Esto no es terapia y no tienes que resolverlo todo.",
      },
      {
        heading: "Qué NO es",
        body: "No es presionar a que cuente lo vivido. No es hacer que analice u ordene lo que pasó. No hace falta ser profesional.",
      },
      {
        heading: "Tus límites",
        body: "Si hay riesgo de vida o te supera, conecta con ayuda experta. Cuídate tú también.",
        cta: "lineas",
      },
    ],
  },
  {
    id: "observar",
    n: 2,
    title: "Observar",
    steps: [
      {
        heading: "Seguridad primero",
        body: "No te acerques si el lugar no es seguro. Mira quién parece herido o muy alterado.",
      },
      {
        heading: "Si ayudas a distancia",
        body: "No ves la escena. Pregunta con suavidad si está a salvo. No asumas nada.",
      },
    ],
  },
  {
    id: "escuchar",
    n: 3,
    title: "Escuchar",
    steps: [
      {
        heading: "Preséntate y pregunta",
        body: "Di tu nombre, pregunta si puedes ayudar, qué necesita y qué le preocupa.",
      },
      {
        heading: "Escucha de verdad",
        body: "Con los ojos, los oídos y el corazón. No presiones. Deja silencios.",
      },
    ],
  },
  {
    id: "conectar",
    n: 4,
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
    ],
  },
  {
    id: "que-decir",
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
          { text: "Dejar silencios." },
        ],
      },
      {
        heading: "Mejor evitar",
        bullets: [
          { text: "«No deberías sentirte así» o «tuviste suerte de sobrevivir»." },
          { text: "Presionar para que cuente." },
          { text: "Falsas promesas." },
          { text: "Tecnicismos." },
          { text: "Juzgar." },
          { text: "Contar su historia a otros." },
        ],
      },
    ],
  },
  {
    id: "panico-shock",
    n: 6,
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
      },
    ],
  },
  {
    id: "quien-necesita-mas",
    n: 7,
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
        heading: "Si no mejora",
        body: "Si tras varias semanas sigue igual o peor, derívalo a un profesional. Haz el puente, no desaparezcas de golpe.",
        cta: "lineas",
      },
    ],
  },
  {
    id: "cuidate-tu",
    n: 8,
    title: "Cuídate tú también",
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
