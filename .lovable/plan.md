# Sonidos y meditaciones + mensaje para Colombia

## Qué se construye

1. Un mensaje breve y discreto para Colombia en la bienvenida.
2. Una nueva sección principal `/sonidos` con tres prácticas guiadas en audio.
3. Voz generada una sola vez con la IA nativa de Lovable y guardada en el backend, para no gastar créditos en cada reproducción.

Zerena sigue siendo general: nada de la app se vuelve "solo Colombia" ni "solo terremoto".

## 1. Mensaje para Colombia (bienvenida)

En la home, debajo del subtítulo y antes de las tarjetas, una nota discreta (tarjeta suave salvia, sin iconos de alarma):

> Colombia, estamos contigo. Si necesitas un momento de calma, este espacio también es para ti.

Sin fechas, cifras ni detalles del evento. Texto fijo en un solo archivo, fácil de quitar más adelante.

## 2. Sección "Sonidos y meditaciones"

Ruta: `/sonidos`. Entradas nuevas:
- Tarjeta en la bienvenida, al mismo nivel que las otras cuatro.
- Tarjeta en "Para mí", dentro de "Para este momento".

Contenido inicial (tres prácticas, texto derivado **solo** de lo que ya existe en Zerena; sin consejo clínico nuevo):

| Práctica | Origen actual | Duración aprox. |
|---|---|---|
| Respiración 4-2-6 | `BreathingCircle` / `/para-mi/respira` | ~3 min |
| Volver al presente | `/para-mi/presente` (las 4 anclas) | ~4 min |
| Descansar sin forzarte | `/para-mi/descansar` (los 4 pasos) | ~5 min |

Cada tarjeta de práctica muestra: título, duración aproximada, explicación breve, botones accesibles de **reproducir / pausar / reiniciar** (con `aria-label` y foco visible), barra de progreso, estado de carga y de error, y un botón "Ver transcripción" que despliega el texto completo leído. Respeta `prefers-reduced-motion` (sin animaciones de onda; solo un indicador estático).

Si el audio no está disponible (sin conexión y aún no guardado, o error), la tarjeta lo dice con claridad y ofrece dos salidas: leer la transcripción, o hacer la versión silenciosa equivalente (enlace a la práctica escrita que ya existe).

## 3. Audio: cómo se genera y por qué así

Se genera **una sola vez por práctica** y queda guardada como archivo en el almacenamiento del backend (bucket público de solo lectura). El navegador reproduce ese archivo directamente.

Flujo:
1. La página pide el audio de una práctica a una función de servidor.
2. Si el archivo ya existe en el almacenamiento, devuelve su URL de inmediato (0 créditos).
3. Si no existe, lo sintetiza con la IA de Lovable, lo guarda y devuelve la URL.

**Tradeoff:** la primera persona que abra una práctica espera unos segundos mientras se genera; a cambio, todas las demás reproducciones (de cualquier persona, siempre) son gratis y rápidas. La alternativa —transmitir la voz en vivo cada vez— suena antes pero cobra créditos en cada reproducción; se descarta.

Modelo: `google/gemini-2.5-flash-tts` (opción costo-eficiente, buena dicción en español), con dirección de tono en el propio texto ("Con voz cálida, lenta y serena, en español neutro latinoamericano: ..."). Si el resultado en español no convence al escuchar, se cambia a `openai/gpt-4o-mini-tts` con voz cálida y `speed` reducido; el cambio es de una línea. Formato guardado: MP3 (compacto y cacheable). La IA **solo** sintetiza la voz: los guiones son texto fijo en el código.

## 4. Offline y PWA

- Los MP3 ya reproducidos quedan en la caché del service worker (se añade `.mp3`/`.m4a` al patrón de assets y una regla de red para el dominio de almacenamiento), así que vuelven a sonar sin conexión.
- Nunca se promete descarga: si no está en caché y no hay red, la tarjeta muestra "Este audio aún no está disponible sin conexión" + transcripción + práctica silenciosa.
- La página `/sonidos` y sus transcripciones funcionan offline siempre, porque el texto viaja en el código.

## 5. Errores

| Situación | Qué ve la persona |
|---|---|
| Sin créditos (402) / no habilitado (403/404) | "El audio no está disponible ahora. Puedes leer la práctica aquí abajo." + transcripción |
| Límite de uso (429) | "Muchas personas pidiendo calma a la vez. Intenta en un momento." + reintento |
| Falla del servicio (500/502) | "No pudimos cargar el audio." + botón reintentar |
| Sin conexión | Mensaje offline + transcripción + práctica silenciosa |

Nunca se muestra un error técnico crudo; siempre hay una salida útil.

## Detalles técnicos

Archivos nuevos:
- `src/lib/practices.ts` — datos fijos: id, título, duración, descripción, guion/transcripción, ruta de la práctica escrita equivalente.
- `src/lib/tts.functions.ts` — `getPracticeAudio` (`createServerFn`, sin auth): revisa el bucket; si falta, llama a `https://ai.gateway.lovable.dev/v1/audio/speech` con `LOVABLE_API_KEY` (leído dentro del `.handler()`), sube el MP3 con el cliente admin importado dinámicamente dentro del handler, devuelve URL pública. Mapea los códigos 402/403/404/429/5xx a mensajes de la tabla de arriba.
- `src/routes/sonidos.tsx` — página con `head()` propio (título, descripción, og:title, og:description) y las tres tarjetas.
- `src/components/PracticePlayer.tsx` — reproductor accesible (audio HTML nativo controlado por React), estados carga/error/offline, transcripción desplegable.
- `src/components/ColombiaNote.tsx` — la nota de la bienvenida.

Archivos modificados:
- `src/routes/index.tsx` — nota de Colombia + tarjeta "Sonidos y meditaciones".
- `src/routes/para-mi.index.tsx` — tarjeta hacia `/sonidos`.
- `public/sw.js` — subir versión de caché, cachear audio y el origen de almacenamiento.

Backend (Lovable Cloud): una sola migración crea el bucket público `practice-audio` con lectura anónima y escritura solo desde el servidor. Sin tablas nuevas, sin datos de personas, sin login, sin micrófono.

No se toca: directorio de emergencias, `/ayuda`, `/recepcion`, entrenamiento, ni ninguna tabla clínica.

## Qué tendría que habilitar Carol

Nada. La IA de Lovable ya está disponible en el proyecto y su clave es automática; el consumo de créditos ocurre solo en la primera generación de cada práctica (tres audios en total). No se publica nada en este cambio.
