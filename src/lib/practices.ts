// Guiones fijos derivados del contenido que ya existe en Zerena.
// Lovable AI solo sintetiza la voz; no genera ni personaliza consejo.

export type Practice = {
  id: string;
  title: string;
  duration: string;
  summary: string;
  silentPath: "/para-mi/respira" | "/para-mi/presente" | "/para-mi/descansar";
  silentLabel: string;
  script: string[];
};

export const PRACTICES: readonly Practice[] = [
  {
    id: "respiracion-4-2-6",
    title: "Respiración 4-2-6",
    duration: "3 min aprox.",
    summary: "Inhalar en cuatro, sostener en dos, exhalar en seis. Vamos despacio.",
    silentPath: "/para-mi/respira",
    silentLabel: "Hacer la respiración con el círculo",
    script: [
      "Respira conmigo.",
      "Siéntate o recuéstate si puedes. Vamos despacio.",
      "Vamos a inhalar contando hasta cuatro, sostener contando hasta dos, y exhalar contando hasta seis.",
      "Inhala. Uno. Dos. Tres. Cuatro.",
      "Sostén. Uno. Dos.",
      "Exhala. Uno. Dos. Tres. Cuatro. Cinco. Seis.",
      "Otra vez. Inhala. Uno. Dos. Tres. Cuatro. Sostén. Uno. Dos. Exhala. Uno. Dos. Tres. Cuatro. Cinco. Seis.",
      "Una vez más. Inhala. Uno. Dos. Tres. Cuatro. Sostén. Uno. Dos. Exhala. Uno. Dos. Tres. Cuatro. Cinco. Seis.",
      "Si te cuesta, no es falla tuya. Puedes quedarte aquí el tiempo que necesites.",
    ],
  },
  {
    id: "volver-al-presente",
    title: "Volver al presente",
    duration: "4 min aprox.",
    summary: "Cuatro anclas suaves para llevar la atención al cuerpo.",
    silentPath: "/para-mi/presente",
    silentLabel: "Leer las anclas en silencio",
    script: [
      "Volver al presente.",
      "No necesitas mirar a tu alrededor si no quieres. Vamos a llevar la atención al cuerpo, con anclas suaves. Haz solo las que sientas bien.",
      "Primero: siente los pies. Si están apoyados, nota el peso. Si tienes zapatos, siente la tela o el cuero. No tienes que mover nada.",
      "Segundo: aprieta y suelta las manos. Cierra los puños con suavidad mientras cuentas hasta tres. Luego suelta. Repite si quieres.",
      "Tercero: escucha tu respiración. No la cambies. Solo escucha cómo el aire entra y sale. Está pasando ahora mismo, en ti.",
      "Cuarto: toca algo cerca. Una tela, tu propia mano, el borde de algo. Nota si es liso, áspero, tibio o fresco.",
      "Si te cuesta, no es falla tuya. Vuelve cuando quieras.",
    ],
  },
  {
    id: "descansar-sin-forzarte",
    title: "Descansar sin forzarte",
    duration: "5 min aprox.",
    summary: "No tienes que dormir. Solo descansar. Si el sueño llega, llega.",
    silentPath: "/para-mi/descansar",
    silentLabel: "Leer los pasos en silencio",
    script: [
      "Para descansar esta noche.",
      "No tienes que dormir. Solo descansar. Si el sueño llega, llega.",
      "Uno: baja la luz si puedes. Una luz suave, o cerrar los ojos un rato. El cuerpo entiende que es momento de aflojar.",
      "Dos: encuentra una postura cómoda. Sentado o acostado, como esté tu cuerpo más sostenido. Una manta encima ayuda si tienes.",
      "Tres: respira más largo al exhalar. Inhala normal, exhala despacio. No fuerces. La exhalación larga le dice al cuerpo: estás a salvo por ahora.",
      "Cuatro: si la mente vuelve a lo que pasó, no la pelees. Solo nota que está pensando y vuelve a la respiración. Una y otra vez. Eso también es descansar.",
      "Quédate aquí el tiempo que quieras. No tienes que apurarte.",
    ],
  },
  {
    id: "descansar-y-confiar",
    title: "Descansar y confiar",
    duration: "4 min aprox.",
    summary: "Soltar por un momento lo que no puedes resolver ahora.",
    silentPath: "/para-mi/descansar",
    silentLabel: "Leer la práctica de descanso en silencio",
    script: [
      "Descansar y confiar.",
      "Busca una postura en la que tu cuerpo se sienta un poco más sostenido. No tiene que ser perfecta.",
      "Mientras escuchas, no necesitas resolver nada. Lo que importa puede esperar unos minutos.",
      "Siente el peso de tu cuerpo donde está apoyado. Deja que la superficie debajo de ti sostenga lo que pueda sostener.",
      "Inhala a tu ritmo. Al exhalar, afloja un poco la frente, la mandíbula y los hombros. Sin forzar.",
      "Otra vez. Inhala como venga. Exhala despacio. Puedes soltar solo un poco. Eso es suficiente por ahora.",
      "Confiar no significa saber qué va a pasar. En este momento puede significar permitirte descansar sin tener todas las respuestas.",
      "Si aparece una preocupación, puedes reconocerla y decir: esto importa, y puedo volver a ello después.",
      "Por ahora, vuelve al peso de tu cuerpo y al aire que entra y sale.",
      "No tienes que hacer nada más en este momento. Quédate aquí el tiempo que necesites.",
    ],
  },
] as const;

export function getPractice(id: string): Practice | undefined {
  return PRACTICES.find((practice) => practice.id === id);
}

export function practiceAudioUrl(id: string): string {
  return `/api/public/audio/${id}`;
}
