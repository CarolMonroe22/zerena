export const PRACTICE_IDS = ["respiracion-426", "volver-al-presente", "descansar"] as const;

export type PracticeId = (typeof PRACTICE_IDS)[number];

export type Practice = {
  id: PracticeId;
  title: string;
  duration: string;
  description: string;
  transcript: string;
  silentPath: "/para-mi/respira" | "/para-mi/presente" | "/para-mi/descansar";
  silentLabel: string;
};

export const PRACTICES: Practice[] = [
  {
    id: "respiracion-426",
    title: "Respiración 4-2-6",
    duration: "3 min",
    description: "Una respiración guiada, lenta y sin prisa.",
    silentPath: "/para-mi/respira",
    silentLabel: "Hacer la respiración en silencio",
    transcript: `Siéntate o recuéstate si puedes. Vamos despacio.

Si necesitas parar antes, está bien.

Empezamos.

Inhala durante cuatro segundos. Uno, dos, tres, cuatro.
Sostén con suavidad. Uno, dos.
Exhala despacio durante seis. Uno, dos, tres, cuatro, cinco, seis.

Inhala. Uno, dos, tres, cuatro.
Sostén. Uno, dos.
Exhala. Uno, dos, tres, cuatro, cinco, seis.

Seguimos a tu ritmo.

Inhala. Uno, dos, tres, cuatro.
Sostén. Uno, dos.
Exhala. Uno, dos, tres, cuatro, cinco, seis.

Inhala. Uno, dos, tres, cuatro.
Sostén. Uno, dos.
Exhala. Uno, dos, tres, cuatro, cinco, seis.

Si necesitas respirar de otra manera, hazlo. No tienes que forzar nada.

Inhala. Uno, dos, tres, cuatro.
Sostén. Uno, dos.
Exhala. Uno, dos, tres, cuatro, cinco, seis.

Inhala. Uno, dos, tres, cuatro.
Sostén. Uno, dos.
Exhala. Uno, dos, tres, cuatro, cinco, seis.

Una vez más.

Inhala. Uno, dos, tres, cuatro.
Sostén. Uno, dos.
Exhala. Uno, dos, tres, cuatro, cinco, seis.

Deja que tu respiración vuelva a su ritmo natural. Puedes quedarte aquí un momento.`,
  },
  {
    id: "volver-al-presente",
    title: "Volver al presente",
    duration: "4 min",
    description: "Cuatro anclas suaves para llevar la atención al cuerpo.",
    silentPath: "/para-mi/presente",
    silentLabel: "Ver las cuatro anclas",
    transcript: `No necesitas mirar a tu alrededor si no quieres.

Vamos a llevar la atención al cuerpo, con anclas suaves. Haz solo las que sientas bien.

Primero, siente los pies.

Si están apoyados, nota el peso. Si tienes zapatos, siente la tela o el cuero. No tienes que mover nada.

Quédate aquí un momento. Solo nota lo que ya está.

Ahora, aprieta y suelta las manos.

Cierra los puños con suavidad mientras cuentas hasta tres. Uno, dos, tres. Luego suelta.

Puedes repetir si quieres. Uno, dos, tres. Y suelta.

Ahora escucha tu respiración.

No la cambies. Solo escucha cómo el aire entra y sale. Está pasando ahora mismo, en ti.

Tómate un momento para escucharla.

Por último, toca algo cerca.

Puede ser una tela, tu propia mano o el borde de algo. Nota si es liso, áspero, tibio o fresco.

No tienes que encontrar una sensación especial. Solo nota lo que está ahí.

Si te cuesta, no es falla tuya. Puedes volver cuando quieras.`,
  },
  {
    id: "descansar",
    title: "Descansar sin forzarte",
    duration: "5 min",
    description: "Una práctica para aflojar un poco, aunque el sueño no llegue.",
    silentPath: "/para-mi/descansar",
    silentLabel: "Leer la práctica para descansar",
    transcript: `No tienes que dormir. Solo descansar. Si el sueño llega, llega.

Baja la luz si puedes.

Una luz suave, o cerrar los ojos un rato. El cuerpo entiende que es momento de aflojar.

No tienes que cambiar nada más ahora. Quédate un momento como estás.

Encuentra una postura cómoda.

Sentado o acostado, como esté tu cuerpo más sostenido. Una manta encima ayuda si tienes.

Tómate tu tiempo para acomodarte. No hay prisa.

Ahora respira más largo al exhalar.

Inhala normal. Exhala despacio. No fuerces.

Otra vez. Inhala normal. Exhala despacio.

Sigue a tu propio ritmo.

Si la mente vuelve a lo que pasó, no la pelees.

Solo nota que está pensando y vuelve a la respiración. Una y otra vez. Eso también es descansar.

Inhala normal. Exhala despacio.

No tienes que dormir. Solo descansar.

Puedes quedarte aquí, respirando a tu ritmo, el tiempo que necesites.`,
  },
];

export function getPractice(id: PracticeId) {
  return PRACTICES.find((practice) => practice.id === id);
}
