# 🌅 Zerena

> Primeros Auxilios Psicológicos (PAP) para personas afectadas por los terremotos de Venezuela.
> Anónima. Offline. Calmada.

Zerena es una PWA (aplicación web instalable) pensada para acompañar a quien está pasando por el golpe emocional de un terremoto: la persona que sufre, quien la acompaña, y una red de voluntarios y profesionales que quieren ayudar.

🔗 **App:** [zerena.lovable.app](https://zerena.lovable.app)

> [!NOTE]
> **Estado:** en revisión clínica. El contenido está siendo validado por una psicóloga antes de difundirse ampliamente. No es una herramienta de difusión masiva todavía.

---

## Para quién es

- **Para mí** — para quien está sintiendo el impacto: respiración guiada, anclaje (grounding), descanso, duelo, "lo perdí todo", réplicas, y un diario que se queda en tu propio teléfono.
- **Para ayudar** — para quien acompaña a otra persona: una guía de Primeros Auxilios Psicológicos, qué hacer y qué evitar, y cómo hablarle a un niño, a un adulto mayor o a alguien a la distancia.
- **Red de apoyo** — voluntarios, profesionales de salud mental y organizaciones que quieren sumarse, además de un directorio de líneas de ayuda existentes.

## Cómo funciona

```
Usuario (anónimo, móvil, incluso sin señal)
        │
        ▼
 PWA — TanStack Start (SSR) + React + Tailwind
 Service Worker → cachea la ruta crítica para que funcione offline
        │
        │  solo escribe (formularios), nunca lee
        ▼
 Base de datos (PostgreSQL, gestionada en la nube)
 network_signups · contact_messages · support_requests
 Row Level Security activa: el navegador solo puede INSERTAR, nunca leer.
```

El navegador **solo puede enviar** (un formulario de la red, un mensaje de contacto). **No puede leer** los datos de nadie: eso está protegido a nivel de base de datos (Row Level Security), y la llave con permiso de lectura vive solo en el servidor, nunca en el código del cliente. Por eso este repositorio puede ser público sin exponer datos de las personas.

## Privacidad

- **Anónima:** no pide cuenta ni identidad para usar las herramientas de calma.
- **El diario es tuyo:** se guarda localmente en tu teléfono, no se sube a ningún servidor.
- **Sin rastreo.** Seguimos principios de protección de datos, guiados por marcos como el GDPR (sin afirmar certificación formal).

## Stack

- [TanStack Start](https://tanstack.com/start) (SSR) + React + TypeScript
- Tailwind CSS
- PostgreSQL (nube) con Row Level Security
- PWA con Service Worker (offline-first)
- Construida y desplegada con [Lovable](https://lovable.dev)

## Desarrollo local

```bash
npm install
npm run dev      # servidor de desarrollo (Vite)
npm run build    # build de producción
```

## Importante

Zerena **no es terapia ni un sustituto de atención profesional**. Es un apoyo de primer momento. Si tú o alguien cercano está en peligro inmediato, busca ayuda de emergencia (en Venezuela, **911**).

El contenido está **basado en** marcos de Primeros Auxilios Psicológicos de referencia (PAHO/OPS, IFRC, NCTSN, Save the Children), pero **no cuenta con aval ni certificación** de esas organizaciones.

---

Hecho con cuidado, para Venezuela. 🇻🇪
