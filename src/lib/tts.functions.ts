import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getPractice, PRACTICE_IDS } from "./practices";

const BUCKET = "practice-audio";
const AUDIO_VERSION = "v1";
const TTS_MODEL = "google/gemini-2.5-flash-preview-tts";
const TTS_ENDPOINT = "https://ai.gateway.lovable.dev/v1/audio/speech";

export type PracticeAudioResult = {
  url: string;
  generated: boolean;
};

export class PracticeAudioError extends Error {
  code: "unavailable" | "busy" | "failed";

  constructor(code: PracticeAudioError["code"], message: string) {
    super(message);
    this.name = "PracticeAudioError";
    this.code = code;
  }
}

function audioFileName(id: string) {
  return `${id}-${AUDIO_VERSION}.mp3`;
}

export const getPracticeAudio = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ id: z.enum(PRACTICE_IDS) }).parse(data))
  .handler(async ({ data }) => {
    const practice = getPractice(data.id);
    if (!practice) {
      throw new PracticeAudioError("failed", "No encontramos esta práctica.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const fileName = audioFileName(practice.id);
    const { data: existing, error: listError } = await supabaseAdmin.storage
      .from(BUCKET)
      .list("", { limit: 10, search: fileName });

    if (listError) {
      console.error("[practice-audio] Could not inspect storage:", listError);
      throw new PracticeAudioError(
        "unavailable",
        "El audio no está disponible ahora. Puedes leer la práctica aquí abajo.",
      );
    }

    if (existing?.some((item) => item.name === fileName)) {
      const url = supabaseAdmin.storage.from(BUCKET).getPublicUrl(fileName).data.publicUrl;
      return { url, generated: false } satisfies PracticeAudioResult;
    }

    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      console.error("[practice-audio] LOVABLE_API_KEY is not available.");
      throw new PracticeAudioError(
        "unavailable",
        "El audio no está disponible ahora. Puedes leer la práctica aquí abajo.",
      );
    }

    const prompt = `# DIRECTOR'S NOTES\nSpeak slowly, warmly and calmly in neutral Latin American Spanish. Keep natural pauses between paragraphs. Do not add, remove or paraphrase any words from the transcript.\n\n# TRANSCRIPT\n${practice.transcript}`;

    let response: Response;
    try {
      response = await fetch(TTS_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: TTS_MODEL,
          input: prompt,
          voice: "Kore",
          response_format: "mp3",
        }),
      });
    } catch (error) {
      console.error("[practice-audio] TTS request failed:", error);
      throw new PracticeAudioError("failed", "No pudimos cargar el audio. Intenta de nuevo.");
    }

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(`[practice-audio] TTS returned ${response.status}:`, detail.slice(0, 500));

      if (response.status === 429) {
        throw new PracticeAudioError(
          "busy",
          "Muchas personas están pidiendo calma a la vez. Intenta en un momento.",
        );
      }

      if ([402, 403, 404].includes(response.status)) {
        throw new PracticeAudioError(
          "unavailable",
          "El audio no está disponible ahora. Puedes leer la práctica aquí abajo.",
        );
      }

      throw new PracticeAudioError("failed", "No pudimos cargar el audio. Intenta de nuevo.");
    }

    const audio = new Uint8Array(await response.arrayBuffer());
    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(fileName, audio, {
        contentType: "audio/mpeg",
        cacheControl: "31536000",
        upsert: false,
      });

    if (uploadError && !uploadError.message.toLowerCase().includes("already exists")) {
      console.error("[practice-audio] Could not persist audio:", uploadError);
      throw new PracticeAudioError("failed", "No pudimos guardar el audio. Intenta de nuevo.");
    }

    const url = supabaseAdmin.storage.from(BUCKET).getPublicUrl(fileName).data.publicUrl;
    return { url, generated: !uploadError } satisfies PracticeAudioResult;
  });
