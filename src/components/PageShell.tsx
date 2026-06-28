import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ShareZerena } from "./ShareZerena";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-[640px] px-5 pb-32 pt-2 fade-in">
      {children}
      <footer className="mt-16 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-border/60 pt-5 text-center">
        <Link
          to="/fuentes"
          className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          ¿En qué se basa Zerena?
        </Link>
        <span className="text-xs text-muted-foreground/50" aria-hidden>·</span>
        <Link
          to="/contacto"
          className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Contáctanos
        </Link>
        <span className="text-xs text-muted-foreground/50" aria-hidden>·</span>
        <ShareZerena />
      </footer>
    </main>
  );
}
