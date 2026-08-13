import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Pause, Play, RotateCcw, Volume2 } from "lucide-react";
import type { Practice } from "@/lib/practices";
import { getPracticeAudio } from "@/lib/tts.functions";

const storageKey = (id: string) => `zerena-practice-audio:${id}`;

function formatTime(value: number) {
  if (!Number.isFinite(value)) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function messageFromError(error: unknown) {
  if (!navigator.onLine) return "Este audio aún no está disponible sin conexión.";
  if (error instanceof Error && error.message) {
    if (error.message.includes("Muchas personas"))
      return "Muchas personas están pidiendo calma a la vez. Intenta en un momento.";
    if (error.message.includes("no está disponible"))
      return "El audio no está disponible ahora. Puedes leer la práctica aquí abajo.";
  }
  return "No pudimos cargar el audio. Intenta de nuevo.";
}

export function PracticePlayer({ practice }: { practice: Practice }) {
  const requestAudio = useServerFn(getPracticeAudio);
  const audioRef = useRef<HTMLAudioElement>(null);
  const objectUrlRef = useRef<string | null>(null);
  const [remoteUrl, setRemoteUrl] = useState<string | null>(null);
  const [playbackUrl, setPlaybackUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [online, setOnline] = useState(true);
  const pendingPlay = useRef(false);

  useEffect(() => {
    setOnline(navigator.onLine);
    const saved = window.localStorage.getItem(storageKey(practice.id));
    if (saved) setRemoteUrl(saved);

    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [practice.id]);

  useEffect(() => {
    if (!remoteUrl) return;
    let cancelled = false;

    async function loadAudio() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(remoteUrl);
        if (!response.ok) throw new Error(`Audio returned ${response.status}`);
        const blob = await response.blob();
        if (cancelled) return;
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = URL.createObjectURL(blob);
        setPlaybackUrl(objectUrlRef.current);
      } catch (loadError) {
        if (!cancelled) setError(messageFromError(loadError));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadAudio();
    return () => {
      cancelled = true;
    };
  }, [remoteUrl]);

  useEffect(() => {
    if (!playbackUrl || !pendingPlay.current || !audioRef.current) return;
    pendingPlay.current = false;
    void audioRef.current.play().catch((playError) => setError(messageFromError(playError)));
  }, [playbackUrl]);

  useEffect(
    () => () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    },
    [],
  );

  async function handlePlayPause() {
    const audio = audioRef.current;
    if (playing && audio) {
      audio.pause();
      return;
    }
    if (playbackUrl && audio) {
      await audio.play().catch((playError) => setError(messageFromError(playError)));
      return;
    }
    if (!online && !remoteUrl) {
      setError("Este audio aún no está disponible sin conexión.");
      return;
    }

    pendingPlay.current = true;
    if (remoteUrl) {
      setRemoteUrl((url) => (url ? `${url}` : url));
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await requestAudio({ data: { id: practice.id } });
      window.localStorage.setItem(storageKey(practice.id), result.url);
      setRemoteUrl(result.url);
    } catch (requestError) {
      pendingPlay.current = false;
      setError(messageFromError(requestError));
      setLoading(false);
    }
  }

  function handleRestart() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setCurrentTime(0);
    if (!audio.paused) void audio.play();
  }

  return (
    <article className="serena-card p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <span className="icon-bubble" aria-hidden>
          <Volume2 size={19} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <h2 className="font-serif text-xl text-foreground">{practice.title}</h2>
            <span className="text-xs text-muted-foreground">{practice.duration}</span>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {practice.description}
          </p>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={playbackUrl ?? undefined}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
      />

      <div className="mt-5">
        <div className="h-1.5 overflow-hidden rounded-full bg-sage-soft" aria-hidden>
          <div
            className="h-full rounded-full bg-sage-deep"
            style={{ width: `${duration ? Math.min(100, (currentTime / duration) * 100) : 0}%` }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-xs tabular-nums text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{duration ? formatTime(duration) : practice.duration}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => void handlePlayPause()}
          disabled={loading}
          aria-label={playing ? `Pausar ${practice.title}` : `Reproducir ${practice.title}`}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground disabled:cursor-wait disabled:opacity-60"
        >
          {playing ? <Pause size={17} /> : <Play size={17} />}
          {loading ? "Preparando audio…" : playing ? "Pausar" : "Reproducir"}
        </button>
        <button
          type="button"
          onClick={handleRestart}
          disabled={!playbackUrl}
          aria-label={`Reiniciar ${practice.title}`}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm text-foreground disabled:opacity-45"
        >
          <RotateCcw size={16} /> Reiniciar
        </button>
      </div>

      <div className="mt-3 min-h-5 text-sm text-muted-foreground" aria-live="polite">
        {loading && <p>La primera vez puede tomar unos segundos.</p>}
        {!online && !error && (
          <p>Sin conexión. Los audios escuchados antes pueden seguir disponibles.</p>
        )}
        {error && (
          <div className="rounded-xl bg-peach-soft px-4 py-3">
            <p>{error}</p>
            {online && (
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  pendingPlay.current = true;
                  if (remoteUrl) {
                    setRemoteUrl(null);
                    window.setTimeout(() => setRemoteUrl(remoteUrl), 0);
                  } else {
                    void handlePlayPause();
                  }
                }}
                className="mt-2 text-xs font-medium text-primary underline underline-offset-4"
              >
                Intentar de nuevo
              </button>
            )}
          </div>
        )}
      </div>

      <details className="mt-4 rounded-xl border border-border/70 bg-background/60 px-4 py-3">
        <summary className="cursor-pointer text-sm font-medium text-primary">
          Ver transcripción
        </summary>
        <div className="mt-4 space-y-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
          {practice.transcript}
        </div>
      </details>

      <Link
        to={practice.silentPath}
        className="mt-4 inline-block text-sm text-primary underline-offset-4 hover:underline"
      >
        {practice.silentLabel}
      </Link>
    </article>
  );
}
