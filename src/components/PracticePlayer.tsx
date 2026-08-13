import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Play, Pause, RotateCcw, ChevronDown, Loader2, WifiOff } from "lucide-react";
import type { Practice } from "@/lib/practices";
import { practiceAudioUrl } from "@/lib/practices";
import { createAmbientSound, type AmbientMode, type AmbientSound } from "@/lib/ambient-sound";

type Status = "idle" | "loading" | "ready" | "error";

const MESSAGES: Record<number, string> = {
  402: "El audio no está disponible ahora mismo. Puedes leer la práctica aquí abajo.",
  429: "Muchas personas están pidiendo calma a la vez. Intenta de nuevo en un momento.",
  503: "El audio no está disponible ahora mismo. Puedes leer la práctica aquí abajo.",
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

export function PracticePlayer({
  practice,
  ambientMode,
  ambientVolume,
}: {
  practice: Practice;
  ambientMode: AmbientMode;
  ambientVolume: number;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlRef = useRef<string | null>(null);
  const ambientRef = useRef<AmbientSound | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [total, setTotal] = useState(0);
  const [showText, setShowText] = useState(false);

  const playAmbient = useCallback(async () => {
    if (ambientMode === "none") return;
    if (!ambientRef.current || ambientRef.current.mode !== ambientMode) {
      ambientRef.current?.destroy();
      ambientRef.current = createAmbientSound(ambientMode);
    }
    await ambientRef.current.play(ambientVolume);
  }, [ambientMode, ambientVolume]);

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      audioRef.current?.pause();
      ambientRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    const ambient = ambientRef.current;
    if (!ambient) return;

    if (ambient.mode !== ambientMode || ambientMode === "none") {
      ambient.destroy();
      ambientRef.current = null;
      if (playing && ambientMode !== "none") void playAmbient();
      return;
    }

    if (playing) ambient.setVolume(ambientVolume);
  }, [ambientMode, ambientVolume, playAmbient, playing]);

  async function ensureAudio(): Promise<HTMLAudioElement | null> {
    if (audioRef.current) return audioRef.current;

    setStatus("loading");
    setError(null);
    try {
      // Siempre se intenta la URL estable: si se escuchó antes, el service
      // worker puede responder desde caché aunque el dispositivo esté offline.
      const response = await fetch(practiceAudioUrl(practice.id));
      if (!response.ok) {
        const offline = typeof navigator !== "undefined" && navigator.onLine === false;
        setStatus("error");
        setError(
          offline
            ? "Este audio aún no está disponible sin conexión. Puedes leer la transcripción o hacer la práctica en silencio."
            : (MESSAGES[response.status] ??
                "No pudimos cargar el audio. Puedes intentar otra vez o leer la práctica aquí abajo."),
        );
        return null;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      urlRef.current = url;
      const audio = new Audio(url);
      audio.preload = "auto";
      audio.addEventListener("timeupdate", () => setTime(audio.currentTime));
      audio.addEventListener("loadedmetadata", () => setTotal(audio.duration));
      audio.addEventListener("ended", () => {
        setPlaying(false);
        ambientRef.current?.pause();
      });
      audio.addEventListener("pause", () => {
        setPlaying(false);
        ambientRef.current?.pause();
      });
      audio.addEventListener("play", () => setPlaying(true));
      audioRef.current = audio;
      setStatus("ready");
      return audio;
    } catch {
      const offline = typeof navigator !== "undefined" && navigator.onLine === false;
      setStatus("error");
      setError(
        offline
          ? "Este audio aún no está disponible sin conexión. Puedes leer la transcripción o hacer la práctica en silencio."
          : "No pudimos cargar el audio. Puedes intentar otra vez o leer la práctica aquí abajo.",
      );
      return null;
    }
  }

  async function toggle() {
    const audio = await ensureAudio();
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setStatus("error");
        setError("No pudimos reproducir el audio en este dispositivo.");
        return;
      }
      try {
        await playAmbient();
      } catch (ambientError) {
        console.warn("[ambient] no se pudo iniciar el fondo", ambientError);
      }
    } else {
      audio.pause();
      ambientRef.current?.pause();
    }
  }

  function restart() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setTime(0);
  }

  const offline = status === "error" && error?.includes("sin conexión");
  const progress = total > 0 ? Math.min(100, (time / total) * 100) : 0;

  return (
    <article className="serena-card p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h2 className="font-serif text-xl text-foreground">{practice.title}</h2>
        <span className="text-xs text-muted-foreground">{practice.duration}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{practice.summary}</p>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={() => void toggle()}
          aria-label={playing ? `Pausar ${practice.title}` : `Reproducir ${practice.title}`}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-60"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <Loader2 size={20} className="motion-safe:animate-spin" aria-hidden />
          ) : playing ? (
            <Pause size={20} aria-hidden />
          ) : (
            <Play size={20} aria-hidden />
          )}
        </button>
        <button
          type="button"
          onClick={restart}
          aria-label={`Reiniciar ${practice.title}`}
          disabled={!audioRef.current}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-card text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-40"
        >
          <RotateCcw size={16} aria-hidden />
        </button>
        <div className="min-w-0 flex-1">
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-secondary"
            role="progressbar"
            aria-label={`Avance de ${practice.title}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
          >
            <div className="h-full bg-sage" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {status === "loading"
              ? "Preparando el audio…"
              : total > 0
                ? `${formatTime(time)} / ${formatTime(total)}`
                : "Toca para escuchar"}
          </p>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {status === "loading" ? "Preparando el audio" : status === "error" ? (error ?? "") : ""}
      </p>

      {status === "error" && error && (
        <div className="mt-4 rounded-2xl border border-border bg-secondary/60 p-4 text-sm text-foreground">
          <p className="flex items-start gap-2">
            {offline && (
              <WifiOff size={16} className="mt-0.5 shrink-0 text-sage-deep" aria-hidden />
            )}
            <span>{error}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setError(null);
              }}
              className="rounded-full border border-border bg-card px-4 py-2 text-xs text-foreground"
            >
              Intentar otra vez
            </button>
            <button
              type="button"
              onClick={() => setShowText(true)}
              className="rounded-full border border-border bg-card px-4 py-2 text-xs text-foreground"
            >
              Leer la transcripción
            </button>
            <Link
              to={practice.silentPath}
              className="rounded-full border border-border bg-card px-4 py-2 text-xs text-foreground"
            >
              {practice.silentLabel}
            </Link>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setShowText((visible) => !visible)}
        aria-expanded={showText}
        className="mt-4 inline-flex items-center gap-1 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        <ChevronDown
          size={14}
          aria-hidden
          className={showText ? "rotate-180 transition-transform" : "transition-transform"}
        />
        {showText ? "Ocultar transcripción" : "Ver transcripción"}
      </button>

      {showText && (
        <div className="mt-3 space-y-2 rounded-2xl bg-secondary/50 p-4">
          {practice.script.map((line, index) => (
            <p key={index} className="text-sm leading-relaxed text-muted-foreground">
              {line}
            </p>
          ))}
          <Link
            to={practice.silentPath}
            className="mt-2 inline-block text-sm text-sage-deep underline-offset-4 hover:underline"
          >
            {practice.silentLabel}
          </Link>
        </div>
      )}
    </article>
  );
}
