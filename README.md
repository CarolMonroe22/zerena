# 🌅 Zerena

> Primeros Auxilios Psicológicos (PAP) para personas afectadas por los terremotos de Venezuela.
> Anónima. Offline. Calmada.

Cuando tiembla la tierra, también tiembla por dentro. Zerena es una aplicación web instalable (PWA) pensada para acompañar el golpe emocional de un terremoto: a quien lo está sintiendo, a quien acompaña a otra persona, y a la red de voluntarios y profesionales que quieren ayudar.

Está hecha para funcionar **en el momento difícil**: en un teléfono, con calma, y aunque no haya señal.

🔗 **App:** [zerena.lovable.app](https://zerena.lovable.app)

---

## ¿Qué son los Primeros Auxilios Psicológicos?

Son como los primeros auxilios físicos, pero para el golpe emocional. **No son terapia** y los puede dar cualquier persona con un poco de guía. La idea es simple: **observar, escuchar y conectar** a quien lo necesita con calma y con apoyo real.

## Qué encuentras dentro

### 🫂 Para mí — para quien está sintiendo el impacto
Herramientas de calma de primer momento: respiración guiada, anclaje (grounding), ayuda para dormir, acompañamiento en el duelo y en el "lo perdí todo", qué hacer con las réplicas y con la avalancha de noticias, y un diario que **se queda en tu propio teléfono**.

### 🤝 Para ayudar — para quien acompaña a otra persona
Una guía práctica de Primeros Auxilios Psicológicos por módulos: qué hacer y qué evitar, cómo estar presente, y guías específicas para hablarle a un niño, a un adulto mayor o a alguien que está lejos.

### 🌐 Red de apoyo
Un espacio para que voluntarios, profesionales de salud mental y organizaciones puedan sumarse, junto a un directorio de líneas de ayuda existentes.

## Funciona sin conexión

Zerena es **offline-first**: se instala como app y un service worker guarda la ruta crítica, para que las herramientas de calma sigan disponibles aunque la señal se caiga, justo cuando más hacen falta.

## Privacidad y protección de datos

La salud mental es un dato sensible y lo tratamos como tal. Por diseño:

- **Anónima** — no pide cuenta ni identidad para usar las herramientas de calma.
- **Tu diario es tuyo** — se guarda localmente en tu teléfono, no se sube a ningún servidor.
- **Sin rastreo** — no perfilamos ni seguimos a quien usa la app.
- **Mínimo necesario** — los formularios (red de apoyo, contacto) guardan solo lo indispensable.

Tratamos los datos siguiendo los principios del **GDPR (Reglamento General de Protección de Datos)** como marco de referencia — minimización de datos, propósito limitado, y privacidad por diseño y por defecto. Describimos prácticas reales; no afirmamos una certificación formal.

## Seguridad

Toda la información que envían las personas vive detrás de **Row Level Security (RLS)** a nivel de base de datos:

- El navegador **solo puede escribir** (enviar un formulario). **Nunca puede leer** datos de nadie.
- La llave con permiso de lectura vive **solo en el servidor**, jamás en el código del cliente.

Por eso este repositorio puede ser **público y abierto** sin exponer los datos de ninguna persona.

## Cómo colaborar

Zerena se construye en abierto y **toda ayuda suma**. Si esto te toca el corazón, hay un lugar para ti 💛

- 🧠 **Psicólogas y psicólogos** — revisar y validar el contenido clínico, proponer mejoras.
- 🌎 **Personas en Venezuela** — verificar líneas del directorio, sumar recursos locales reales.
- 🌐 **Traductores** — acercar el contenido a más comunidades.
- 💻 **Desarrolladores y diseñadores** — mejorar accesibilidad, rendimiento offline y experiencia.
- 🤝 **Organizaciones** — sumarse a la red de apoyo.

Para empezar: abre un *issue* contando cómo quieres ayudar, o un *pull request* con tu propuesta. Toda contribución se revisa con cuidado, sobre todo el contenido sensible.

## Stack

- [TanStack Start](https://tanstack.com/start) (SSR) + React + TypeScript
- Tailwind CSS
- PostgreSQL con Row Level Security
- PWA con Service Worker (offline-first)

## Desarrollo local

```bash
npm install
npm run dev      # servidor de desarrollo (Vite)
npm run build    # build de producción
```

## Importante

Zerena **no es terapia ni un sustituto de la atención profesional**. Es un apoyo de primer momento. Si tú o alguien cercano está en peligro inmediato, busca ayuda de emergencia (en Venezuela, **911**).

El contenido está **basado en** marcos de Primeros Auxilios Psicológicos de referencia (PAHO/OPS, IFRC, NCTSN, Save the Children), pero **no cuenta con aval ni certificación** de esas organizaciones.

---

Hecho con cuidado, para Venezuela. 🇻🇪
