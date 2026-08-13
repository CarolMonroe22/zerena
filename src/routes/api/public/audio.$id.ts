import { createFileRoute } from "@tanstack/react-router";
import { getPractice } from "@/lib/practices";

const BUCKET = "practice-audio";

// Voz cálida, lenta y neutra latinoamericana.
const VOICE = "alloy";
const INSTRUCTIONS =
  "Habla en español neutro latinoamericano, con voz cálida, serena y muy lenta. " +
  "Tono de acompañamiento, suave y digno, sin dramatismo. " +
  "Haz pausas largas entre frases, como en una meditación guiada.";

function audioResponse(bytes: ArrayBuffer) {
  return new Response(bytes, {
    headers: {
      "content-type": "audio/mpeg",
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}

function errorResponse(status: number, message: string) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

export const Route = createFileRoute("/api/public/audio/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const practice = getPractice(params.id);
        if (!practice) return errorResponse(404, "Práctica no encontrada");

        const objectPath = `${practice.id}.mp3`;
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        // 1) ¿Ya está generado? Se sirve tal cual: 0 créditos.
        const existing = await supabaseAdmin.storage.from(BUCKET).download(objectPath);
        if (existing.data) {
          return audioResponse(await existing.data.arrayBuffer());
        }

        // 2) Primera vez: se sintetiza con la IA de Lovable y se guarda.
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return errorResponse(503, "El audio no está disponible ahora");

        const input = practice.script.join("\n\n");
        let upstream: Response;
        try {
          upstream = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "openai/gpt-4o-mini-tts",
              input,
              voice: VOICE,
              instructions: INSTRUCTIONS,
              response_format: "mp3",
              speed: 0.85,
            }),
          });
        } catch (err) {
          console.error("[tts] fallo de red", err);
          return errorResponse(502, "No pudimos generar el audio");
        }

        if (!upstream.ok) {
          const detail = await upstream.text().catch(() => "");
          console.error("[tts] error", upstream.status, detail);
          if (upstream.status === 402) return errorResponse(402, "Sin créditos de audio");
          if (upstream.status === 429) return errorResponse(429, "Demasiadas solicitudes");
          if (upstream.status === 403 || upstream.status === 404) {
            return errorResponse(503, "Audio no disponible");
          }
          return errorResponse(502, "No pudimos generar el audio");
        }

        const bytes = await upstream.arrayBuffer();

        const uploaded = await supabaseAdmin.storage.from(BUCKET).upload(objectPath, bytes, {
          contentType: "audio/mpeg",
          cacheControl: "31536000",
          upsert: true,
        });
        if (uploaded.error) {
          // El audio ya existe en memoria: se entrega igual, se reintentará guardar después.
          console.error("[tts] no se pudo guardar", uploaded.error.message);
        }

        return audioResponse(bytes);
      },
    },
  },
});
