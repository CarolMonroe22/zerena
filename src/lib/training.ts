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
        body: "Lo más valioso que ofreces es estar, con calma. No necesitas las palabras perfectas ni resolverlo todo. Tu sola compañía, tranquila y sin juzgar, ya es ayuda real para alguien que la está pasando muy mal.",
        example: "A veces basta con sentarte al lado y decir: «aquí estoy, no te dejo solo». El silencio acompañado también sostiene.",
      },
      {
        heading: "Qué NO es",
        body: "Esto no es terapia y no hace falta ser profesional. No es presionar a que cuente lo que vivió, ni hacer que «analice» o le busque sentido a lo que pasó. No es dar consejos ni opinar sobre sus decisiones.",
        example: "Si no quiere hablar, no insistas: «no tienes que contarme nada, me quedo contigo igual».",
      },
      {
        heading: "Esto también es para ti",
        body: "Quizá tú también estás afectado por lo que pasó. Querer ayudar a otro estando golpeado tú mismo dice mucho de ti, y también cansa. Reconócelo: no estás obligado a poder con todo, ni a hacerlo perfecto.",
        example: "Está bien decir «necesito un momento», tomar aire y volver. Gracias por estar aquí: no es fácil, y aun así eliges acompañar.",
      },
      {
        heading: "Tus límites",
        body: "Acompañas, no rescatas. Si hay riesgo de vida, si la persona quiere hacerse daño, o si la situación te supera, no lo cargues solo: conecta con ayuda experta o llama al 911. Saber pedir ayuda también es parte de cuidar.",
        example: "Si alguien dice «ya no quiero seguir», tómalo en serio: «lo que sientes es muy serio y mereces ayuda ahora». Quédate con la persona y llamen juntos.",
        cta: "lineas",
      },
    ],
  },
  {
    id: "preparate",
    source: "PAP (OMS/OPS) y seguridad sísmica",
    n: 2,
    title: "Prepárate",
    steps: [
      {
        heading: "Ya sabes lo esencial de lo que pasó",
        body: "Hubo un terremoto fuerte y las réplicas siguen. Eso ya lo sabes. Antes de acompañar, lo útil es enterarte de cómo está la situación ahora: qué zonas quedaron inseguras, dónde hay refugios, agua y puestos médicos, y cómo se reporta a una persona desaparecida.",
        example: "Antes de entrar a un refugio pregúntate: ¿dónde dan agua, dónde está el puesto médico, a quién se deriva a un herido o a un niño que quedó solo?",
      },
      {
        heading: "Ten los recursos a la mano",
        body: "Que no te agarre improvisando frente a la persona. Antes de salir, ten claro lo práctico: líneas de ayuda, dónde reportar y buscar desaparecidos (Cruz Roja, reunificación familiar), y los refugios o puntos de agua y comida más cercanos.",
        example: "Guarda los números de emergencia en tu teléfono ahora, con calma. Buscarlos en el momento, frente a alguien angustiado, te hace perder tiempo y temple.",
        cta: "lineas",
      },
      {
        heading: "No improvises riesgos",
        body: "Con las réplicas, las estructuras dañadas pueden ceder. No entres a edificios agrietados, no te acerques a escombros inestables ni a cables sueltos. Tu seguridad cuenta: si te pasa algo, dejas de poder ayudar a nadie.",
        example: "Si una pared tiene grietas nuevas, cae polvo o el piso cruje, no entres. Acompaña desde un lugar abierto y seguro. No intentes «sacar» a alguien tú solo.",
      },
      {
        heading: "Prepárate por dentro",
        body: "Vas a escuchar cosas duras y ver gente quebrada. Respira antes de empezar. No tienes que tener todas las respuestas: basta con estar presente, con calma, y derivar lo que te supere.",
        example: "Un minuto de respiración antes de entrar te ayuda a no llegar con tu propia angustia encima de la de la persona.",
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
        body: "Antes de acercarte, mira el entorno. No te acerques si el lugar no es seguro: estructuras agrietadas, vidrios, cables sueltos, escombros que se mueven. Con las réplicas, lo que parece firme puede caer.",
        example: "Si ves grietas nuevas, polvo cayendo o escuchas crujidos, aléjate y pide ayuda. Acompañar muerto o herido no ayuda a nadie.",
      },
      {
        heading: "Mira quién necesita apoyo",
        body: "Observa sin invadir. ¿Quién está herido, muy callado, temblando, llorando o como ausente? No siempre el que más grita es el que peor está: a veces es el que se quedó mudo y quieto.",
        example: "Alguien sentado, con la mirada perdida, que no responde a lo que pasa alrededor, puede estar en shock. Acércate con suavidad.",
      },
      {
        heading: "Acércate con cuidado",
        body: "Despacio, de frente, a su altura. Preséntate y pide permiso. No invadas su espacio ni la toques sin avisar: alguien asustado puede sobresaltarse.",
        example: "«Hola, me llamo Ana, estoy aquí ayudando. ¿Puedo acercarme y acompañarte un rato?»",
      },
      {
        heading: "Si ayudas a distancia",
        body: "Por teléfono o mensaje no ves la escena. No asumas nada de su entorno: pregunta con suavidad si está en un lugar seguro y si hay alguien con ella antes de seguir.",
        example: "«¿Estás en un sitio seguro ahora? ¿Hay alguien contigo?»",
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
        body: "Di tu nombre, pregunta si puedes ayudar y, sobre todo, qué necesita y qué le preocupa. Usa preguntas abiertas y deja que lleve el ritmo. Escuchar ya es la mayor parte de la ayuda.",
        example: "Mejor «¿qué es lo que más te preocupa ahora?» que «¿estás bien?». La primera abre; la segunda se cierra con un «sí» vacío.",
      },
      {
        heading: "Escucha de verdad",
        body: "Escucha con los ojos, los oídos y el corazón. No interrumpas, no corrijas, no apures. Deja silencios: no tienes que llenarlos. La persona no busca soluciones, busca no estar sola.",
        example: "Si se queda callada, no la empujes: «tómate tu tiempo, aquí estoy».",
      },
      {
        heading: "Valida lo que siente",
        body: "Lo que siente tiene sentido después de lo que vivió. No lo discutas ni lo minimices. Poner en palabras la emoción, sin juzgarla, ayuda a que baje.",
        example: "«Tiene todo el sentido que estés así de asustado, fue algo muy fuerte. No estás exagerando.»",
      },
      {
        heading: "Tu cuerpo también habla",
        body: "Ponte a su nivel, sin apuro, con contacto visual suave y postura abierta. No mires el reloj ni el teléfono. Tu calma se contagia: si respiras lento y hablas despacio, su cuerpo tiende a seguirte.",
        example: "Bajar tú la voz y el ritmo, sin darte cuenta, ayuda a que ella también baje un cambio.",
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
        body: "Frases que acompañan sin presionar:",
        bullets: [
          { text: "«Lo siento mucho. Imagino que esto es muy difícil para ti.»" },
          { text: "«Estoy aquí contigo, no te voy a dejar solo.»" },
          { text: "Validar: «tiene sentido que te sientas así»." },
          { text: "Ser honesto: «no lo sé, pero voy a averiguarlo»." },
          { text: "Reconocer su fortaleza: «has aguantado mucho»." },
        ],
        example: "Si llora, no la apures: «está bien llorar, me quedo aquí contigo».",
      },
      {
        heading: "Mejor evitar",
        body: "Frases que, aunque tengan buena intención, hacen daño:",
        bullets: [
          { text: "«No deberías sentirte así» o «tuviste suerte de sobrevivir»." },
          { text: "«Sé fuerte» o «todo pasa por algo»." },
          { text: "Presionar para que cuente lo que vivió." },
          { text: "Falsas promesas: «ya viene la ayuda», «todo va a estar bien»." },
          { text: "Tecnicismos, juzgar, o contar su historia a otros." },
        ],
        example: "En vez de «todo va a estar bien», di «no sé qué va a pasar, pero no te voy a dejar solo en esto».",
      },
      {
        heading: "Respeta el silencio",
        body: "No tienes que llenar cada pausa con frases hechas. Estar callado a su lado, presente y atento, también acompaña. A veces es lo que más vale.",
        example: "«No tienes que decir nada. Me quedo aquí contigo el tiempo que necesites.»",
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
        body: "Después de escuchar, ayuda con lo concreto. Las necesidades básicas calman tanto como las palabras: agua, comida, un lugar para sentarse o abrigarse, e información clara de qué está pasando y qué sigue.",
        example: "«Te traigo agua y buscamos dónde puedes sentarte a la sombra, ¿te parece?»",
      },
      {
        heading: "Reconecta con los suyos",
        body: "Muchas familias quedaron separadas. Ayúdale a contactar a un familiar o persona de confianza, y a llegar a los servicios que necesita. Volver a saber de su gente es de lo que más sostiene en una emergencia.",
        example: "«¿A quién quieres avisar que estás bien? Te ayudo a llamarlo.»",
        cta: "lineas",
      },
      {
        heading: "No prometas de más",
        body: "Di solo lo que sabes. No inventes servicios ni tiempos que no dependen de ti: una promesa rota duele más que un «no sé». Ser honesto sostiene la confianza.",
        example: "Mejor «voy a buscar dónde dan agua» que «ya viene la ayuda».",
      },
      {
        heading: "Haz el puente, no cargues todo",
        body: "Conectar es enlazar, no resolverlo tú solo. Si algo te supera, deriva a quien corresponde y no te quedes como el único apoyo de la persona. Repartir la carga también la cuida.",
        example: "«No puedo resolver esto yo, pero te acompaño a hablar con quien sí puede.»",
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
        heading: "Reconócelo",
        body: "En pánico, la persona respira agitada, tiembla, el corazón se le dispara y no puede pensar claro. En shock, puede quedar como ausente, sin reaccionar, como si nada fuera real. Ninguna de las dos «exagera»: su cuerpo está sobrepasado.",
        example: "Alguien que repite lo mismo sin parar, o que mira fijo sin responder, puede estar en shock. No la sacudas ni le grites.",
      },
      {
        heading: "Calmar",
        body: "Voz suave y lenta. Preséntate, dile que estás ahí para ayudar y, si es cierto, que ahora está a salvo. No la dejes sola y no la fuerces a mirar ni a contar lo que duele.",
        example: "«Me llamo Ana. Estoy aquí contigo. Ahora estás a salvo. Vamos a respirar juntos, sin prisa.»",
      },
      {
        heading: "Volver al presente",
        body: "Si está desbordada o desconectada, ayúdala a anclarse en el aquí y ahora, sin revivir lo que pasó:",
        bullets: [
          { text: "Poner los pies en el suelo y sentir el contacto." },
          { text: "Apretar y soltar las manos despacio." },
          { text: "Nombrar 3 cosas que ve y 3 que oye." },
          { text: "Respirar despacio y profundo, contigo." },
        ],
        example: "«Pon los pies en el suelo, siéntelos. Dime tres cosas que ves ahora mismo. Inhala conmigo… y exhala despacio.»",
      },
      {
        heading: "Después del pico",
        body: "Cuando se calme un poco, quédate cerca. No la dejes sola de golpe ni la presiones a hablar. Ofrécele agua y un lugar tranquilo para recuperarse.",
        example: "«Lo hiciste bien. Quédate aquí sentada un rato, no me voy a ningún lado.»",
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
        body: "Hay señales que necesitan ayuda experta de inmediato. No las manejes solo:",
        bullets: [
          { text: "Lesiones graves o problemas de salud urgentes." },
          { text: "No puede cuidarse ni cuidar a sus hijos." },
          { text: "Dice o da señales de querer hacerse daño." },
          { text: "Podría hacer daño a otros." },
        ],
        example: "Si alguien dice «no quiero seguir viviendo», quédate, tómalo en serio y llamen juntos al 911 o a una línea de ayuda.",
        cta: "lineas",
      },
      {
        heading: "Atención especial",
        body: "Algunas personas quedan más expuestas y conviene no perderlas de vista: niños solos o separados de su familia, embarazadas, adultos mayores frágiles, personas con discapacidad o enfermedad, y mujeres o niñas en riesgo de violencia.",
        example: "Un niño solo, sin un adulto que lo cuide, es una emergencia: conéctalo de inmediato con ayuda.",
      },
      {
        heading: "Tú no diagnosticas",
        body: "No tienes que saber «qué tiene» la persona ni ponerle nombre. Tu trabajo es notar cuándo algo te supera y derivar. Ante la duda, pide ayuda de más, no de menos.",
        example: "«No estoy seguro de cómo ayudar con esto, pero sé quién sí puede. Vamos.»",
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
        body: "Los niños leen tu cuerpo antes que tus palabras. Si tú estás alterado, él se altera. Antes de cuidarlo a él, respira tú. Háblale simple, ponte a su altura y no le des detalles que asusten.",
        example: "Agáchate a su altura, con voz suave: «estoy aquí contigo, te voy a cuidar».",
      },
      {
        heading: "Cambia con la edad",
        body: "Cada edad lo vive distinto: el bebé siente tu tensión aunque no entienda; el pequeño puede creer que fue su culpa; el escolar pregunta mucho y a veces se culpa; el adolescente se hace «el fuerte» y se guarda el miedo. Ajusta tu tono y tus palabras a su edad.",
        example: "A un adolescente que dice «estoy bien» no lo presiones: «si en algún momento quieres hablar, aquí estoy».",
      },
      {
        heading: "Deja que juegue",
        body: "Jugar o dibujar es la forma en que los niños sueltan lo que sienten, cuando todavía no tienen palabras para decirlo. Acompáñalo sin forzar y sin corregir lo que dibuja.",
        example: "«¿Me dibujas cómo te sientes?» vale más que muchas preguntas.",
      },
      {
        heading: "Verdad sin promesas",
        body: "No prometas lo que no controlas, como «no va a temblar más». Sí puedes ofrecer presencia: «yo estoy aquí contigo». Responde sus preguntas con la verdad, en simple, sin asustar de más.",
        example: "Si pregunta «¿nos vamos a morir?»: «ahora estamos a salvo y te estoy cuidando».",
      },
      {
        heading: "Si perdió a alguien",
        body: "Dile la verdad simple: «murió», no «se durmió» ni «se fue de viaje» (eso confunde y asusta más). No es su culpa, díselo claro. Cuéntale quién lo va a cuidar ahora. Déjalo recordar y preguntar las veces que necesite.",
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
        body: "Cuando alguien perdió a su familia o su casa, tu tarea no es consolar con palabras ni arreglar lo imposible. Es estar. El silencio acompañado vale más que cualquier frase bonita.",
        example: "Siéntate a su lado: «no tengo palabras para esto, pero no te voy a dejar solo».",
      },
      {
        heading: "Qué decir y qué no",
        body: "Evita las frases que buscan tapar el dolor: «fue la voluntad de Dios», «están en un lugar mejor», «tienes que ser fuerte», «al menos te salvaste». Aunque tengan buena intención, suenan a que su dolor no cabe o no se vale.",
        example: "Sí: «estoy aquí contigo, no te dejo solo» / «no tienes que decir nada».",
      },
      {
        heading: "No apures el duelo",
        body: "No hay un plazo para el dolor. No lo empujes a «pasar la página» ni a tomar decisiones grandes ahora. Acompaña hoy, este momento, sin exigir que se sienta mejor ni que «avance».",
        example: "«No tienes que estar bien hoy. Vamos paso a paso, solo por ahora.»",
      },
      {
        heading: "Vigila el riesgo",
        body: "Si dice que no quiere seguir, o que quiere hacerse daño, tómalo en serio y no lo manejes solo. Conéctalo de inmediato con una línea de ayuda o el 911, y quédate con la persona mientras tanto.",
        example: "«Lo que sientes es muy serio y mereces apoyo ahora. Llamamos juntos, no te dejo.»",
        cta: "lineas",
      },
      {
        heading: "Cuídate después",
        body: "Acompañar un dolor así también te pesa a ti. Date un espacio luego para soltar lo que cargaste y habla con alguien de confianza. No te lo guardes.",
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
        body: "No saber si su ser querido vive o no es una de las cargas más duras que existen. Tiene nombre: pérdida ambigua. Como no hay certeza, la persona no puede mantener la esperanza en paz ni despedirse: queda atrapada en el medio.",
        example: "Puede pasar de buscar con desespero a quedarse paralizada. Las dos reacciones son normales en esta espera.",
      },
      {
        heading: "Cómo acompañar",
        body: "No fuerces ni la esperanza («ya va a aparecer») ni el cierre («tienes que aceptar que no está»). No sabes qué pasó, y pretender que sí, hace daño. Acompaña la espera tal como es, sin empujarla a ningún lado.",
        example: "Mejor: «esto es muy duro y no sé qué va a pasar. No estás solo en la espera».",
      },
      {
        heading: "Lo práctico ayuda",
        body: "En medio de la incertidumbre, lo concreto da algo de sostén: ayúdala con dónde reportar y buscar (Cruz Roja, listas de hospitales y refugios, reunificación familiar) y en no quedarse esperando en soledad.",
        example: "«¿Quieres que te ayude a reportarlo y a revisar las listas? Lo hacemos juntos.»",
        cta: "lineas",
      },
      {
        heading: "Cuida los altibajos",
        body: "La esperanza y la desesperanza se van a turnar, a veces el mismo día. No la corrijas por sentir una u otra. Acompaña cada ola sin juzgarla.",
        example: "Si hoy tiene esperanza y mañana se derrumba, las dos están bien: «sea como sea que amanezcas, aquí sigo».",
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
        body: "Después de un terremoto, cada réplica revive el susto en el cuerpo, aunque sea pequeña. El corazón se acelera y vuelve el miedo. No es exagerar ni «ponerse nervioso por nada»: es una respuesta normal del cuerpo a algo que fue muy fuerte.",
        example: "No «ya pasó, tranquilo». Sí: «tiene sentido que tu cuerpo se asuste, fue algo muy fuerte».",
      },
      {
        heading: "Cuando tiembla, qué haces",
        body: "Si tiembla mientras acompañas, primero protégete tú y luego guíale con calma. Recuérdale lo básico de seguridad:",
        bullets: [
          { text: "Agacharse, cubrirse la cabeza y agarrarse de algo firme." },
          { text: "Alejarse de vidrios, ventanas y cosas que puedan caer." },
          { text: "Si están bajo un techo seguro, quedarse; no correr a ciegas." },
        ],
        example: "Voz firme y tranquila: «agáchate conmigo, cúbrete la cabeza, ya pasa».",
      },
      {
        heading: "Después de la réplica",
        body: "Cuando pase, valida el susto y ayúdale a volver a la calma respirando contigo. Quédate cerca un rato: el miedo no se va de golpe.",
        example: "«Dio miedo, es normal. Ya pasó, estás conmigo. Vamos a respirar juntos, despacio.»",
      },
      {
        heading: "Con niños y adultos mayores",
        body: "A los niños las réplicas los asustan más: abrázalos si lo permiten y háblales simple y firme. A un adulto mayor, dale tiempo y apoyo para moverse a un lugar seguro, sin apurarlo ni arrastrarlo.",
        example: "Con un niño: «te tengo, estamos juntos, ya está pasando». Con un mayor: «vamos despacio, yo te ayudo a moverte».",
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
        body: "Estar lejos no te deja afuera. Por teléfono o mensaje también se sostiene: tu voz, tu constancia y tu calma. La base es la misma: escuchar, validar, no presionar. Como no ves su entorno, pregunta con suavidad si está a salvo y si hay alguien con ella.",
        example: "«No estoy allá, pero estoy aquí para ti. Cuéntame cómo estás, sin apuro.»",
      },
      {
        heading: "Cuando te dicen «tú no estás acá»",
        body: "Es probable que escuches «no entiendes, no estás aquí». No te defiendas ni lo tomes como rechazo: es el dolor hablando, no es contra ti. No compares con lo tuyo ni lo minimices. Dale la razón en lo que tiene razón y quédate.",
        example: "No «yo también la estoy pasando mal». Sí: «tienes razón, no estoy viviendo lo que tú. Y aun así, no te suelto».",
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
        body: "Sostener a alguien desde lejos, estando tú también afectado, cansa. La culpa de estar a salvo es común; no la cargues en silencio. Ayudar desde donde estás también es hacer algo.",
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
        body: "Acompañar el dolor de otros cansa de verdad, aunque no lo notes en el momento. Come, hidrátate, duerme lo que puedas. No trabajes sin parar: un voluntario agotado se vuelve otra persona a la que hay que cuidar.",
        example: "Date pausas reales: aléjate un rato, respira, toma agua, antes de seguir.",
      },
      {
        heading: "Señales de que tú necesitas parar",
        body: "Nota tus propias alarmas: no puedes dormir, todo te irrita, lloras sin parar, o te sientes vacío y lejano de todo. No son debilidad: son señales de que ahora te toca recibir apoyo a ti.",
        example: "Si llevas días sin dormir y te cuesta funcionar, busca apoyo. Cuidarte no es abandonar a nadie.",
      },
      {
        heading: "Sostén tu sostén",
        bullets: [
          { text: "Habla de lo que sentiste con alguien de confianza." },
          { text: "No te apoyes en alcohol o drogas para aguantar." },
          { text: "Reconoce cuando TÚ necesitas ayuda y búscala." },
        ],
      },
      {
        heading: "Cómo cerrar",
        body: "No desaparezcas de golpe de la persona que acompañaste: eso puede sentirse como otro abandono. Avisa cuándo termina tu apoyo y deja una línea de ayuda a la mano.",
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
