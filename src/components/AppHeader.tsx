import { Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { SerenaMark } from "./SerenaMark";

export function AppHeader() {
  return (
    <header className="w-full">
      <div className="mx-auto flex max-w-[640px] items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2 text-foreground" aria-label="Inicio de Serena">
          <SerenaMark size={28} />
          <span className="font-serif text-lg">Serena</span>
        </Link>
        <span
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground"
          aria-label="Esta app es anónima"
        >
          <Shield size={12} className="text-sage-deep" />
          Anónimo
        </span>
      </div>
    </header>
  );
}
