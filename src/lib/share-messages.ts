// Mensajes para compartir Zerena.
// La idea: dar las palabras ya escritas, según a quién se le comparte.
// Compartir un recurso de salud mental da pena; si las palabras están listas,
// se quita el roce. Por eso cada caso tiene su propio tono.

export type ShareGroup = "personal" | "abierto";

export interface ShareCase {
  id: string;
  group: ShareGroup;
  label: string;
  hint: string;
  /** Texto listo para compartir. `url` es la dirección actual de la app. */
  build: (url: string) => string;
}

export const SHARE_CASES: ShareCase[] = [
  {
    id: "amor",
    group: "personal",
    label: "Alguien que amas",
    hint: "Un mensaje íntimo, sin presión.",
    build: (url) =>
      `Hola. Encontré algo que me hizo pensar en ti. Un espacio muy calmado para los momentos difíciles, para respirar y sentirte acompañado. No es terapia, solo un lugar tranquilo al que volver. Aquí está por si alguna vez te sirve: ${url}\n\nY yo también estoy aquí.`,
  },
  {
    id: "familia",
    group: "personal",
    label: "Tu familia",
    hint: "Para tenerlo a mano en casa.",
    build: (url) =>
      `Familia, les dejo esto para tenerlo a mano. Zerena es un espacio de calma para los primeros momentos difíciles, basado en primeros auxilios psicológicos. Guárdenlo en el grupo, ojalá nunca haga falta: ${url}`,
  },
  {
    id: "amigo",
    group: "personal",
    label: "Un amigo",
    hint: "Ligero, cero drama.",
    build: (url) =>
      `Oye, te paso esto por si alguna vez te sirve a ti o a alguien cercano. Un espacio tranquilo para esos momentos en que uno no sabe ni por dónde empezar. Sin compromiso, solo guárdalo: ${url}`,
  },
  {
    id: "redes",
    group: "abierto",
    label: "En redes",
    hint: "Un mensaje para publicar.",
    build: (url) =>
      `Hay momentos difíciles en los que uno no sabe ni por dónde empezar. Zerena es un espacio de calma para esos primeros minutos, basado en primeros auxilios psicológicos (OMS/OPS). No reemplaza a un profesional, pero ayuda a respirar y a saber qué hacer. Guárdalo o compártelo, nunca sabes quién lo va a necesitar: ${url}`,
  },
  {
    id: "enlace",
    group: "abierto",
    label: "Copiar enlace",
    hint: "Solo el link, tú escribes lo tuyo.",
    build: (url) => url,
  },
];
