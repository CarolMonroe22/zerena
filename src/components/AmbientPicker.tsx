import { CloudRain, Headphones, SunMedium, Volume2 } from "lucide-react";
import type { AmbientMode } from "@/lib/ambient-sound";

const OPTIONS: Array<{
  value: AmbientMode;
  label: string;
  icon: typeof Headphones;
}> = [
  { value: "none", label: "Solo voz", icon: Headphones },
  { value: "rain", label: "Lluvia suave", icon: CloudRain },
  { value: "warm", label: "Fondo cálido", icon: SunMedium },
];

export function AmbientPicker({
  mode,
  volume,
  onModeChange,
  onVolumeChange,
}: {
  mode: AmbientMode;
  volume: number;
  onModeChange: (mode: AmbientMode) => void;
  onVolumeChange: (volume: number) => void;
}) {
  return (
    <fieldset className="mt-7 rounded-3xl border border-sage/25 bg-sage-soft p-4 sm:p-5">
      <legend className="px-2 font-serif text-lg text-foreground">Elige el ambiente</legend>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        Acompaña la voz con un fondo muy suave. Puedes cambiarlo en cualquier momento.
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2" aria-label="Sonido de fondo">
        {OPTIONS.map((option) => {
          const Icon = option.icon;
          const selected = mode === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onModeChange(option.value)}
              aria-pressed={selected}
              className={`flex min-h-20 flex-col items-center justify-center gap-2 rounded-2xl border px-2 py-3 text-center text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:text-sm ${
                selected
                  ? "border-sage-deep bg-primary text-primary-foreground shadow-sm"
                  : "border-border/80 bg-card/80 text-foreground hover:bg-card"
              }`}
            >
              <Icon size={19} aria-hidden />
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>

      {mode !== "none" && (
        <label className="mt-4 flex items-center gap-3 rounded-2xl bg-card/70 px-4 py-3">
          <Volume2 size={17} className="shrink-0 text-sage-deep" aria-hidden />
          <span className="text-xs text-muted-foreground">Volumen del fondo</span>
          <input
            type="range"
            min="8"
            max="32"
            step="1"
            value={Math.round(volume * 100)}
            onChange={(event) => onVolumeChange(Number(event.target.value) / 100)}
            className="min-w-0 flex-1 accent-[var(--color-sage-deep)]"
            aria-label="Volumen del sonido de fondo"
          />
          <span className="w-8 text-right text-xs tabular-nums text-muted-foreground">
            {Math.round(volume * 100)}%
          </span>
        </label>
      )}

      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        El ambiente se crea en tu dispositivo y también funciona sin conexión.
      </p>
    </fieldset>
  );
}
