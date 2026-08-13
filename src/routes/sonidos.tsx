import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Headphones } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { BackLink } from "@/components/BackLink";
import { BasedOn } from "@/components/BasedOn";
import { PracticePlayer } from "@/components/PracticePlayer";
import { AmbientPicker } from "@/components/AmbientPicker";
import { PRACTICES } from "@/lib/practices";
import type { AmbientMode } from "@/lib/ambient-sound";

const TITLE = "Sonidos y meditaciones — Zerena";
const DESCRIPTION =
  "Prácticas guiadas breves con voz calmada: respiración 4-2-6, volver al presente y descansar sin forzarte.";

export const Route = createFileRoute("/sonidos")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Sounds,
});

function Sounds() {
  const [ambientMode, setAmbientMode] = useState<AmbientMode>("warm");
  const [ambientVolume, setAmbientVolume] = useState(0.18);

  return (
    <PageShell>
      <BackLink to="/" label="Inicio" />
      <div className="mt-3 flex items-start gap-3">
        <span className="icon-bubble" aria-hidden>
          <Headphones size={20} />
        </span>
        <div>
          <h1 className="font-serif text-3xl text-foreground">Sonidos y meditaciones</h1>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">
            Escucha o lee. Puedes parar cuando quieras. Si prefieres el silencio, cada práctica
            también está escrita.
          </p>
        </div>
      </div>

      <AmbientPicker
        mode={ambientMode}
        volume={ambientVolume}
        onModeChange={setAmbientMode}
        onVolumeChange={setAmbientVolume}
      />

      <div className="mt-8 space-y-4">
        {PRACTICES.map((practice) => (
          <PracticePlayer
            key={practice.id}
            practice={practice}
            ambientMode={ambientMode}
            ambientVolume={ambientVolume}
          />
        ))}
      </div>

      <BasedOn source="PAP (OMS/OPS)" />
    </PageShell>
  );
}
