import { useEffect, useRef, useState } from "react";

type Phase = "inhala" | "sosten" | "exhala";
const SEQUENCE: { phase: Phase; label: string; seconds: number; scale: number }[] = [
  { phase: "inhala", label: "Inhala", seconds: 4, scale: 1 },
  { phase: "sosten", label: "Sostén", seconds: 2, scale: 1 },
  { phase: "exhala", label: "Exhala", seconds: 6, scale: 0.55 },
];

export function BreathingCircle() {
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(SEQUENCE[0].seconds);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    timer.current = window.setInterval(() => {
      setCount((c) => {
        if (c > 1) return c - 1;
        setStep((s) => (s + 1) % SEQUENCE.length);
        return 0; // se resetea en el siguiente efecto
      });
    }, 1000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [running]);

  useEffect(() => {
    setCount(SEQUENCE[step].seconds);
  }, [step]);

  const current = SEQUENCE[step];
  const targetScale = running ? current.scale : 0.78;
  const duration = running ? current.seconds : 1;

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative grid h-72 w-72 place-items-center">
        <div
          className="absolute inset-0 rounded-full bg-sage-soft"
          style={{
            transform: `scale(${targetScale})`,
            transition: `transform ${duration}s ease-in-out`,
          }}
          aria-hidden
        />
        <div
          className="absolute inset-6 rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.72 0.05 150) 0%, oklch(0.515 0.045 155) 100%)",
            transform: `scale(${targetScale})`,
            transition: `transform ${duration}s ease-in-out`,
            opacity: 0.85,
          }}
          aria-hidden
        />
        <div className="relative text-center text-card">
          <p className="font-serif text-2xl">{running ? current.label : "Listos"}</p>
          {running && <p className="mt-1 text-3xl font-light tabular-nums">{count}</p>}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          if (running) {
            setRunning(false);
            setStep(0);
          } else {
            setStep(0);
            setRunning(true);
          }
        }}
        className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
      >
        {running ? "Detener" : "Empezar"}
      </button>

      <p className="max-w-sm text-center text-sm text-muted-foreground">
        Inhala 4 segundos, sostén 2, exhala 6. Si necesitas parar antes, está bien.
      </p>
    </div>
  );
}
